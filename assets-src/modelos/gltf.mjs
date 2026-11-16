/**
 * Escritor mínimo de glTF 2.0 en GLB.
 *
 * ¿Por qué a mano y no con Blender? Porque Blender no es una dependencia del
 * proyecto: si el pipeline de assets necesita un programa de 300 MB que puede no
 * estar instalado, el repositorio deja de ser reproducible. Este escritor son
 * ~300 líneas, no tiene dependencias y garantiza que los nombres de nodo sean
 * exactamente los que citan las lecciones.
 *
 * Lo que implementa del estándar:
 *   · GLB con chunk JSON + chunk BIN.
 *   · Mallas no indexadas (cada triángulo con sus tres vértices y su normal).
 *   · Materiales metallic-roughness, con emisivo y `KHR_materials_emissive_strength`.
 *   · Jerarquía de nodos con translation / rotation (cuaternión) / scale.
 *   · Animaciones por nodo con interpolación LINEAR o STEP sobre rotation.
 *
 * Lo que no implementa (y no hace falta aquí): texturas, skinning, morph targets,
 * KHR_draco_mesh_compression. Draco se aplica después con gltf-transform.
 */

import { mkdirSync, writeFileSync } from 'node:fs'
import { dirname } from 'node:path'

const ALINEACION = 4

function rellenar(buffer, multiplo = ALINEACION, byte = 0) {
  const resto = buffer.length % multiplo
  if (resto === 0) return buffer
  return Buffer.concat([buffer, Buffer.alloc(multiplo - resto, byte)])
}

/** sRGB `#rrggbb` → [r, g, b] lineal, que es lo que exige glTF. */
export function colorLineal(hexadecimal, alfa = 1) {
  const valor = hexadecimal.replace('#', '')
  const canales = [0, 2, 4].map((i) => parseInt(valor.slice(i, i + 2), 16) / 255)
  const lineales = canales.map((c) => (c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4))
  return [...lineales, alfa]
}

/** Euler en grados (orden XYZ) → cuaternión [x, y, z, w]. */
export function eulerACuaternion(grados) {
  const [rx, ry, rz] = grados.map((g) => (g * Math.PI) / 180)
  const cx = Math.cos(rx / 2)
  const sx = Math.sin(rx / 2)
  const cy = Math.cos(ry / 2)
  const sy = Math.sin(ry / 2)
  const cz = Math.cos(rz / 2)
  const sz = Math.sin(rz / 2)

  return [
    sx * cy * cz + cx * sy * sz,
    cx * sy * cz - sx * cy * sz,
    cx * cy * sz + sx * sy * cz,
    cx * cy * cz - sx * sy * sz,
  ]
}

/** Cuaternión a partir de un eje y un ángulo en grados. */
export function ejeAngulo(eje, grados) {
  const [x, y, z] = eje
  const longitud = Math.hypot(x, y, z) || 1
  const mitad = (grados * Math.PI) / 360
  const seno = Math.sin(mitad)
  return [(x / longitud) * seno, (y / longitud) * seno, (z / longitud) * seno, Math.cos(mitad)]
}

/** Interpolación esférica entre dos cuaterniones, para claves intermedias. */
export function slerp(a, b, t) {
  let coseno = a[0] * b[0] + a[1] * b[1] + a[2] * b[2] + a[3] * b[3]
  let destino = b
  if (coseno < 0) {
    coseno = -coseno
    destino = b.map((v) => -v)
  }
  if (coseno > 0.9995) {
    const mezcla = a.map((v, i) => v + (destino[i] - v) * t)
    const norma = Math.hypot(...mezcla)
    return mezcla.map((v) => v / norma)
  }
  const angulo = Math.acos(coseno)
  const seno = Math.sin(angulo)
  const pesoA = Math.sin((1 - t) * angulo) / seno
  const pesoB = Math.sin(t * angulo) / seno
  return a.map((v, i) => v * pesoA + destino[i] * pesoB)
}

export class Modelo {
  constructor(nombre) {
    this.nombre = nombre
    this.materiales = []
    this.meshes = []
    this.nodos = []
    this.animaciones = []
    this.raices = []
  }

  // ----------------------------------------------------------------------- //
  // Materiales
  // ----------------------------------------------------------------------- //

  material({ nombre, color, metal = 0, rugosidad = 0.5, emisivo = null, fuerza = 1 }) {
    const existente = this.materiales.findIndex((m) => m.name === nombre)
    if (existente >= 0) return existente

    const pbr = {
      baseColorFactor: colorLineal(color),
      metallicFactor: metal,
      roughnessFactor: rugosidad,
    }

    const material = { name: nombre, pbrMetallicRoughness: pbr, doubleSided: false }

    if (emisivo) {
      const [r, g, b] = colorLineal(emisivo)
      // glTF limita emissiveFactor a [0,1]; el exceso va en la extensión.
      const maximo = Math.max(r, g, b)
      const factor = maximo > 1 ? 1 / maximo : 1
      material.emissiveFactor = [r * factor, g * factor, b * factor]
      if (fuerza !== 1) {
        material.extensions = {
          KHR_materials_emissive_strength: { emissiveStrength: fuerza },
        }
        this.extensionesUsadas.add('KHR_materials_emissive_strength')
      }
    }

    this.materiales.push(material)
    return this.materiales.length - 1
  }

  get extensionesUsadas() {
    if (!this._extensiones) this._extensiones = new Set()
    return this._extensiones
  }

  // ----------------------------------------------------------------------- //
  // Nodos
  // ----------------------------------------------------------------------- //

  _nodo(entrada) {
    const indice = this.nodos.length
    this.nodos.push(entrada)
    if (entrada.padre === undefined) {
      this.raices.push(indice)
    }
    return indice
  }

  /** Nodo vacío, para agrupar o para servir de pivote de rotación. */
  vacio(nombre, { posicion = [0, 0, 0], rotacion = [0, 0, 0], padre } = {}) {
    return this._nodo({
      name: nombre,
      translation: posicion,
      rotation: eulerACuaternion(rotacion),
      padre,
    })
  }

  /**
   * Nodo con geometría.
   * `geometria` es `{ posiciones: number[], normales: number[] }`.
   */
  malla(nombre, geometria, material, { posicion = [0, 0, 0], rotacion = [0, 0, 0], escala = [1, 1, 1], padre } = {}) {
    const mesh = {
      name: nombre,
      primitives: [
        {
          attributes: {},
          material,
          mode: 4, // TRIANGLES
        },
      ],
    }
    this.meshes.push(mesh)
    const indiceMalla = this.meshes.length - 1

    // Las posiciones y normales se guardan como arrays planos y se empaquetan al
    // final: así el orden de los accessors es estable y predecible.
    this._geometrias ??= []
    this._geometrias[indiceMalla] = geometria

    return this._nodo({
      name: nombre,
      mesh: indiceMalla,
      translation: posicion,
      rotation: eulerACuaternion(rotacion),
      scale: escala,
      padre,
    })
  }

  /**
   * Añade un clip de animación.
   *
   * `canales`: [{ nodo, claves: [{ t, rotacion: [x,y,z] }] }]
   * `t` en segundos. La rotación se interpola con quaterniones.
   */
  animacion(nombre, canales) {
    this.animaciones.push({ name: nombre, canales })
    return this.animaciones.length - 1
  }

  // ----------------------------------------------------------------------- //
  // Serialización
  // ----------------------------------------------------------------------- //

  _empaquetar() {
    const trozosBin = []
    const accessors = []
    const bufferViews = []
    let desplazamiento = 0

    const añadirFloat = (valores, componente, tipo) => {
      const array = new Float32Array(valores)
      const buffer = Buffer.from(array.buffer, array.byteOffset, array.byteLength)
      bufferViews.push({ buffer: 0, byteOffset: desplazamiento, byteLength: buffer.length })
      trozosBin.push(buffer)
      desplazamiento += buffer.length
      desplazamiento = Math.ceil(desplazamiento / ALINEACION) * ALINEACION

      const accessor = {
        bufferView: bufferViews.length - 1,
        componentType: 5126, // FLOAT
        count: array.length / componente,
        type: tipo,
      }

      if (tipo === 'VEC3') {
        const minimo = [Infinity, Infinity, Infinity]
        const maximo = [-Infinity, -Infinity, -Infinity]
        for (let i = 0; i < array.length; i += 3) {
          for (let eje = 0; eje < 3; eje += 1) {
            minimo[eje] = Math.min(minimo[eje], array[i + eje])
            maximo[eje] = Math.max(maximo[eje], array[i + eje])
          }
        }
        accessor.min = minimo
        accessor.max = maximo
      }

      if (tipo === 'SCALAR') {
        let minimo = Infinity
        let maximo = -Infinity
        for (const valor of array) {
          minimo = Math.min(minimo, valor)
          maximo = Math.max(maximo, valor)
        }
        accessor.min = [minimo]
        accessor.max = [maximo]
      }

      accessors.push(accessor)
      return accessors.length - 1
    }

    // 1. Geometría
    for (const mesh of this.meshes) {
      const indice = this.meshes.indexOf(mesh)
      const geometria = this._geometrias[indice]
      const posiciones = añadirFloat(geometria.posiciones, 3, 'VEC3')
      const normales = añadirFloat(geometria.normales, 3, 'VEC3')

      mesh.primitives[0].attributes.POSITION = posiciones
      mesh.primitives[0].attributes.NORMAL = normales
    }

    // 2. Animaciones
    const animaciones = []
    for (const animacion of this.animaciones) {
      const samplers = []
      const channels = []

      for (const canal of animacion.canales) {
        const tiempos = canal.claves.map((clave) => clave.t)
        const cuaterniones = canal.claves.map((clave) =>
          clave.cuaternion ?? eulerACuaternion(clave.rotacion),
        )

        const entrada = añadirFloat(tiempos, 1, 'SCALAR')
        const salida = añadirFloat(cuaterniones.flat(), 4, 'VEC4')

        samplers.push({
          input: entrada,
          output: salida,
          interpolation: canal.interpolacion ?? 'LINEAR',
        })
        channels.push({
          sampler: samplers.length - 1,
          target: { node: canal.nodo, path: canal.ruta ?? 'rotation' },
        })
      }

      animaciones.push({ name: animacion.name, samplers, channels })
    }

    // 3. Buffers
    const binario = rellenar(Buffer.concat(trozosBin), ALINEACION, 0)

    const documento = {
      asset: {
        version: '2.0',
        generator: 'curso-react-three-fiber · assets-src/modelos/gltf.mjs',
      },
      extensionsUsed: [...this.extensionesUsadas],
      scene: 0,
      scenes: [{ name: this.nombre, nodes: this.raices }],
      nodes: this.nodos.map(({ padre, ...nodo }) => nodo),
      meshes: this.meshes,
      materials: this.materiales,
      accessors,
      bufferViews,
      buffers: [{ byteLength: binario.length }],
    }

    if (documento.extensionsUsed.length === 0) delete documento.extensionsUsed
    if (animaciones.length > 0) documento.animations = animaciones

    // Los hijos se declaran en el padre, no al revés.
    for (const [indice, nodo] of this.nodos.entries()) {
      if (nodo.padre === undefined) continue
      const padre = documento.nodes[nodo.padre]
      padre.children ??= []
      padre.children.push(indice)
    }

    return { documento, binario }
  }

  glb() {
    const { documento, binario } = this._empaquetar()

    const json = Buffer.from(JSON.stringify(documento), 'utf8')
    const jsonRelleno = rellenar(json, ALINEACION, 0x20) // espacios: lo pide la spec
    const binRelleno = rellenar(binario, ALINEACION, 0)

    const largoTotal = 12 + 8 + jsonRelleno.length + (binRelleno.length > 0 ? 8 + binRelleno.length : 0)

    const cabecera = Buffer.alloc(12)
    cabecera.writeUInt32LE(0x46546c67, 0) // "glTF"
    cabecera.writeUInt32LE(2, 4)
    cabecera.writeUInt32LE(largoTotal, 8)

    const trozoJson = Buffer.alloc(8)
    trozoJson.writeUInt32LE(jsonRelleno.length, 0)
    trozoJson.writeUInt32LE(0x4e4f534a, 4) // "JSON"

    const trozos = [cabecera, trozoJson, jsonRelleno]

    if (binRelleno.length > 0) {
      const trozoBin = Buffer.alloc(8)
      trozoBin.writeUInt32LE(binRelleno.length, 0)
      trozoBin.writeUInt32LE(0x004e4942, 4) // "BIN"
      trozos.push(trozoBin, binRelleno)
    }

    return Buffer.concat(trozos)
  }

  guardar(ruta) {
    mkdirSync(dirname(ruta), { recursive: true })
    const buffer = this.glb()
    writeFileSync(ruta, buffer)

    const triangulos = this.meshes.reduce(
      (suma, _, indice) => suma + this._geometrias[indice].posiciones.length / 9,
      0,
    )

    return {
      ruta,
      bytes: buffer.length,
      nodos: this.nodos.length,
      mallas: this.meshes.length,
      triangulos,
      animaciones: this.animaciones.map((a) => a.name),
    }
  }
}

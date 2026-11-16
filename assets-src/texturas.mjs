#!/usr/bin/env node
/**
 * Genera las texturas del módulo 7 y del proyecto final.
 *
 * Todo es procedural y determinista: no hay imágenes de terceros, así que la
 * licencia es CC BY 4.0 y el resultado se puede regenerar byte a byte. El
 * escritor de PNG es propio (zlib + CRC32) para no añadir `sharp` como
 * dependencia nativa solo por compilar assets.
 *
 * Uso:
 *   npm run assets:texturas
 */

import { deflateSync } from 'node:zlib'
import { mkdirSync, writeFileSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const aqui = dirname(fileURLToPath(import.meta.url))
const raiz = resolve(aqui, '..')
const destino = join(raiz, 'public', 'texturas')

// --------------------------------------------------------------------------- //
// Escritor de PNG (8 bits, RGB, sin filtros)
// --------------------------------------------------------------------------- //

const TABLA_CRC = (() => {
  const tabla = new Uint32Array(256)
  for (let n = 0; n < 256; n += 1) {
    let c = n
    for (let k = 0; k < 8; k += 1) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1
    tabla[n] = c >>> 0
  }
  return tabla
})()

function crc32(buffer) {
  let crc = 0xffffffff
  for (const byte of buffer) crc = TABLA_CRC[(crc ^ byte) & 0xff] ^ (crc >>> 8)
  return (crc ^ 0xffffffff) >>> 0
}

function trozo(tipo, datos) {
  const largo = Buffer.alloc(4)
  largo.writeUInt32BE(datos.length, 0)

  const cuerpo = Buffer.concat([Buffer.from(tipo, 'ascii'), datos])
  const crc = Buffer.alloc(4)
  crc.writeUInt32BE(crc32(cuerpo), 0)

  return Buffer.concat([largo, cuerpo, crc])
}

function paeth(a, b, c) {
  const p = a + b - c
  const pa = Math.abs(p - a)
  const pb = Math.abs(p - b)
  const pc = Math.abs(p - c)
  if (pa <= pb && pa <= pc) return a
  if (pb <= pc) return b
  return c
}

/**
 * Codifica un PNG de 8 bits RGB con filtrado adaptativo por scanline.
 *
 * El filtro importa mucho: un mapa normal es un degradado suave con ruido
 * encima, y sin filtrar deflate no lo comprime (750 KB). Probando los cinco
 * filtros por fila y quedándose con el que menor suma de valores absolutos da
 * —la heurística que recomienda la especificación— baja a una décima parte.
 */
function png(ancho, alto, pixeles) {
  const cabecera = Buffer.alloc(13)
  cabecera.writeUInt32BE(ancho, 0)
  cabecera.writeUInt32BE(alto, 4)
  cabecera[8] = 8 // bits por canal
  cabecera[9] = 2 // RGB
  cabecera[10] = 0 // deflate
  cabecera[11] = 0 // filtro adaptativo
  cabecera[12] = 0 // sin entrelazado

  const anchoBytes = ancho * 3
  const crudo = Buffer.alloc(alto * (1 + anchoBytes))

  const anterior = new Uint8Array(anchoBytes)
  const actual = new Uint8Array(anchoBytes)
  const candidato = new Uint8Array(anchoBytes)

  for (let y = 0; y < alto; y += 1) {
    actual.set(pixeles.subarray(y * anchoBytes, (y + 1) * anchoBytes))

    let mejorFiltro = 0
    let mejorCoste = Infinity
    let mejorSalida = null

    for (let filtro = 0; filtro <= 4; filtro += 1) {
      let coste = 0

      for (let x = 0; x < anchoBytes; x += 1) {
        const a = x >= 3 ? actual[x - 3] : 0
        const b = anterior[x]
        const c = x >= 3 ? anterior[x - 3] : 0
        let valor

        switch (filtro) {
          case 0:
            valor = actual[x]
            break
          case 1:
            valor = actual[x] - a
            break
          case 2:
            valor = actual[x] - b
            break
          case 3:
            valor = actual[x] - ((a + b) >> 1)
            break
          default:
            valor = actual[x] - paeth(a, b, c)
        }

        valor &= 0xff
        candidato[x] = valor
        // Los valores filtrados son enteros con signo: se mide la magnitud.
        coste += valor < 128 ? valor : 256 - valor
      }

      if (coste < mejorCoste) {
        mejorCoste = coste
        mejorFiltro = filtro
        mejorSalida = Uint8Array.from(candidato)
      }
    }

    const destinoFila = y * (1 + anchoBytes)
    crudo[destinoFila] = mejorFiltro
    crudo.set(mejorSalida, destinoFila + 1)
    anterior.set(actual)
  }

  return Buffer.concat([
    Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
    trozo('IHDR', cabecera),
    trozo('IDAT', deflateSync(crudo, { level: 9 })),
    trozo('IEND', Buffer.alloc(0)),
  ])
}

// --------------------------------------------------------------------------- //
// Ruido determinista
// --------------------------------------------------------------------------- //

function hash(x, y, semilla) {
  let h = x * 374761393 + y * 668265263 + semilla * 1442695040888963407
  h = (h ^ (h >>> 13)) * 1274126177
  return ((h ^ (h >>> 16)) >>> 0) / 4294967295
}

function suavizar(t) {
  return t * t * (3 - 2 * t)
}

function ruido(x, y, semilla) {
  const xi = Math.floor(x)
  const yi = Math.floor(y)
  const xf = x - xi
  const yf = y - yi

  const a = hash(xi, yi, semilla)
  const b = hash(xi + 1, yi, semilla)
  const c = hash(xi, yi + 1, semilla)
  const d = hash(xi + 1, yi + 1, semilla)

  const u = suavizar(xf)
  const v = suavizar(yf)

  return (a * (1 - u) + b * u) * (1 - v) + (c * (1 - u) + d * u) * v
}

/** Ruido fractal: suma de octavas con la mitad de amplitud cada vez. */
function fbm(x, y, { octavas = 4, frecuencia = 4, semilla = 1 } = {}) {
  let valor = 0
  let amplitud = 0.5
  let escala = frecuencia

  for (let i = 0; i < octavas; i += 1) {
    valor += ruido(x * escala, y * escala, semilla + i * 31) * amplitud
    amplitud *= 0.5
    escala *= 2
  }

  return valor
}

// --------------------------------------------------------------------------- //
// Paletas
// --------------------------------------------------------------------------- //

function hex(codigo) {
  const valor = codigo.replace('#', '')
  return [0, 2, 4].map((i) => parseInt(valor.slice(i, i + 2), 16))
}

function mezclar(a, b, t) {
  return [
    Math.round(a[0] + (b[0] - a[0]) * t),
    Math.round(a[1] + (b[1] - a[1]) * t),
    Math.round(a[2] + (b[2] - a[2]) * t),
  ]
}

function acotar(v) {
  return Math.max(0, Math.min(255, Math.round(v)))
}

// --------------------------------------------------------------------------- //
// Texturas
// --------------------------------------------------------------------------- //

/** Baldosas claras/oscuras con junta. Base de la lección 7.1. */
function rejillaColor(lado = 512, divisiones = 8) {
  const pixeles = new Uint8Array(lado * lado * 3)
  const claro = hex('#c9cfd8')
  const oscuro = hex('#8e97a6')
  const junta = hex('#5d6472')
  const celda = lado / divisiones

  for (let y = 0; y < lado; y += 1) {
    for (let x = 0; x < lado; x += 1) {
      const cx = Math.floor(x / celda)
      const cy = Math.floor(y / celda)
      const enJunta = x % celda < 3 || y % celda < 3

      let color = (cx + cy) % 2 === 0 ? claro : oscuro
      const grano = fbm(x / lado, y / lado, { octavas: 3, frecuencia: 24, semilla: 7 }) * 18
      color = mezclar(color, [255, 255, 255], grano / 255)

      if (enJunta) color = junta

      const i = (y * lado + x) * 3
      pixeles[i] = color[0]
      pixeles[i + 1] = color[1]
      pixeles[i + 2] = color[2]
    }
  }

  return pixeles
}

/** Mapa normal de la misma rejilla, calculado desde un campo de altura. */
function rejillaNormal(lado = 512, divisiones = 8, fuerza = 3.2) {
  const celda = lado / divisiones
  const altura = (x, y) => {
    const enJunta = x % celda < 3 || y % celda < 3
    const grano = fbm(x / lado, y / lado, { octavas: 3, frecuencia: 30, semilla: 11 })
    return (enJunta ? 0 : 1) + grano * 0.08
  }

  const pixeles = new Uint8Array(lado * lado * 3)

  for (let y = 0; y < lado; y += 1) {
    for (let x = 0; x < lado; x += 1) {
      const dx = (altura((x + 1 + lado) % lado, y) - altura((x - 1 + lado) % lado, y)) * fuerza
      const dy = (altura(x, (y + 1 + lado) % lado) - altura(x, (y - 1 + lado) % lado)) * fuerza

      const n = [-dx, -dy, 1]
      const longitud = Math.hypot(...n)

      const i = (y * lado + x) * 3
      pixeles[i] = acotar(((n[0] / longitud) * 0.5 + 0.5) * 255)
      pixeles[i + 1] = acotar(((n[1] / longitud) * 0.5 + 0.5) * 255)
      pixeles[i + 2] = acotar(((n[2] / longitud) * 0.5 + 0.5) * 255)
    }
  }

  return pixeles
}

/** Metal cepillado: rayas alargadas en X. */
function metalColor(lado = 512) {
  const pixeles = new Uint8Array(lado * lado * 3)
  const base = hex('#aeb6c4')
  const brillo = hex('#e6ebf2')

  for (let y = 0; y < lado; y += 1) {
    for (let x = 0; x < lado; x += 1) {
      const raya = fbm(x / lado, (y / lado) * 90, { octavas: 4, frecuencia: 3, semilla: 23 })
      const mancha = fbm(x / lado, y / lado, { octavas: 4, frecuencia: 6, semilla: 5 })
      const color = mezclar(base, brillo, raya * 0.55 + mancha * 0.2)

      const i = (y * lado + x) * 3
      pixeles[i] = color[0]
      pixeles[i + 1] = color[1]
      pixeles[i + 2] = color[2]
    }
  }

  return pixeles
}

/** Rugosidad del metal: donde hay brillo, menos rugosidad. */
function metalRugosidad(lado = 256) {
  const pixeles = new Uint8Array(lado * lado * 3)

  for (let y = 0; y < lado; y += 1) {
    for (let x = 0; x < lado; x += 1) {
      const raya = fbm(x / lado, (y / lado) * 90, { octavas: 4, frecuencia: 3, semilla: 23 })
      const valor = acotar(90 + raya * 120)

      const i = (y * lado + x) * 3
      pixeles[i] = valor
      pixeles[i + 1] = valor
      pixeles[i + 2] = valor
    }
  }

  return pixeles
}

/** Madera con vetas sinusoidales deformadas por ruido. */
function maderaColor(lado = 512) {
  const pixeles = new Uint8Array(lado * lado * 3)
  const claro = hex('#b98a5e')
  const oscuro = hex('#6d4526')

  for (let y = 0; y < lado; y += 1) {
    for (let x = 0; x < lado; x += 1) {
      const deformacion = fbm(x / lado, y / lado, { octavas: 3, frecuencia: 4, semilla: 17 }) * 6
      const veta = Math.sin((y / lado) * 42 + deformacion + x / lado * 2.5)
      const t = (veta * 0.5 + 0.5) * 0.75 + fbm(x / lado, y / lado, { frecuencia: 30, semilla: 3 }) * 0.25
      const color = mezclar(oscuro, claro, t)

      const i = (y * lado + x) * 3
      pixeles[i] = color[0]
      pixeles[i + 1] = color[1]
      pixeles[i + 2] = color[2]
    }
  }

  return pixeles
}

/** Hormigón: ruido fBm con motas. */
function hormigonColor(lado = 512) {
  const pixeles = new Uint8Array(lado * lado * 3)
  const base = hex('#7d838f')
  const claro = hex('#b6bcc6')

  for (let y = 0; y < lado; y += 1) {
    for (let x = 0; x < lado; x += 1) {
      const suave = fbm(x / lado, y / lado, { octavas: 5, frecuencia: 5, semilla: 41 })
      const mota = hash(x * 3, y * 7, 13) > 0.986 ? 0.35 : 0
      const color = mezclar(base, claro, suave * 0.8 + mota)

      const i = (y * lado + x) * 3
      pixeles[i] = color[0]
      pixeles[i + 1] = color[1]
      pixeles[i + 2] = color[2]
    }
  }

  return pixeles
}

/** Mapa normal genérico a partir de un campo de altura fBm. */
function normalGenerica(lado, semilla, frecuencia, fuerza = 2.4, repeticion = true) {
  const envuelto = (v, maximo) => (repeticion ? (v + maximo) % maximo : Math.max(0, Math.min(maximo - 1, v)))
  // Tres octavas, no cinco: el detalle de alta frecuencia encarece el PNG sin
  // que se note a la escala a la que se ve en las lecciones.
  const altura = (x, y) => fbm(x / lado, y / lado, { octavas: 3, frecuencia, semilla })

  const pixeles = new Uint8Array(lado * lado * 3)

  for (let y = 0; y < lado; y += 1) {
    for (let x = 0; x < lado; x += 1) {
      const dx = (altura(envuelto(x + 1, lado), y) - altura(envuelto(x - 1, lado), y)) * fuerza * lado * 0.06
      const dy = (altura(x, envuelto(y + 1, lado)) - altura(x, envuelto(y - 1, lado))) * fuerza * lado * 0.06

      const n = [-dx, -dy, 1]
      const longitud = Math.hypot(...n)

      const i = (y * lado + x) * 3
      pixeles[i] = acotar(((n[0] / longitud) * 0.5 + 0.5) * 255)
      pixeles[i + 1] = acotar(((n[1] / longitud) * 0.5 + 0.5) * 255)
      pixeles[i + 2] = acotar(((n[2] / longitud) * 0.5 + 0.5) * 255)
    }
  }

  return pixeles
}

/** Líneas emisivas para el efecto de escaneo del proyecto final. */
function rejillaEmisiva(lado = 256) {
  const pixeles = new Uint8Array(lado * lado * 3)

  for (let y = 0; y < lado; y += 1) {
    for (let x = 0; x < lado; x += 1) {
      const lineaX = x % 32 < 2 ? 1 : 0
      const lineaY = y % 32 < 2 ? 1 : 0
      const intensidad = Math.max(lineaX, lineaY) * 255

      const i = (y * lado + x) * 3
      pixeles[i] = acotar(intensidad * 0.45)
      pixeles[i + 1] = acotar(intensidad * 0.85)
      pixeles[i + 2] = acotar(intensidad)
    }
  }

  return pixeles
}

// --------------------------------------------------------------------------- //
// Ejecución
// --------------------------------------------------------------------------- //

const TEXTURAS = [
  { nombre: 'rejilla-color.png', ancho: 512, alto: 512, generar: () => rejillaColor(512, 8) },
  { nombre: 'rejilla-normal.png', ancho: 256, alto: 256, generar: () => rejillaNormal(256, 8) },
  { nombre: 'metal-color.png', ancho: 512, alto: 512, generar: () => metalColor(512) },
  { nombre: 'metal-rugosidad.png', ancho: 256, alto: 256, generar: () => metalRugosidad(256) },
  { nombre: 'metal-normal.png', ancho: 256, alto: 256, generar: () => normalGenerica(256, 29, 20, 1.6) },
  { nombre: 'madera-color.png', ancho: 512, alto: 512, generar: () => maderaColor(512) },
  { nombre: 'madera-normal.png', ancho: 256, alto: 256, generar: () => normalGenerica(256, 17, 9, 2.1) },
  { nombre: 'hormigon-color.png', ancho: 512, alto: 512, generar: () => hormigonColor(512) },
  { nombre: 'hormigon-normal.png', ancho: 256, alto: 256, generar: () => normalGenerica(256, 41, 6, 2.6) },
  { nombre: 'emisivo-rejilla.png', ancho: 256, alto: 256, generar: () => rejillaEmisiva(256) },
]

mkdirSync(destino, { recursive: true })

let total = 0
for (const textura of TEXTURAS) {
  const pixeles = textura.generar()
  const buffer = png(textura.ancho, textura.alto, pixeles)
  writeFileSync(join(destino, textura.nombre), buffer)
  total += buffer.length
  console.log(`[textura] ${textura.nombre.padEnd(24)} ${textura.ancho}×${textura.alto} · ${(buffer.length / 1024).toFixed(1)} KB`)
}

console.log(`\n[texturas] ${TEXTURAS.length} ficheros · ${(total / 1024).toFixed(1)} KB · public/texturas/`)

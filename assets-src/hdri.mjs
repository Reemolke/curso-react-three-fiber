#!/usr/bin/env node
/**
 * Genera los mapas de entorno equirectangulares del curso en `public/hdri/`.
 *
 * Formato Radiance `.hdr` (RGBE), que es lo que carga `RGBELoader` de three.js y
 * lo que espera `<Environment files="…">` de drei. Se escribe a mano porque el
 * formato es sencillo y así no se depende de ninguna herramienta externa ni se
 * descargan HDRIs de terceros con licencias dudosas.
 *
 * Los tres mapas son sintéticos: no representan ninguna fotografía real, así que
 * la licencia es CC BY 4.0 (ver ASSETS.md).
 *
 * Uso:
 *   npm run assets:hdri
 */

import { mkdirSync, writeFileSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const aqui = dirname(fileURLToPath(import.meta.url))
const raiz = resolve(aqui, '..')
const destino = join(raiz, 'public', 'hdri')

// --------------------------------------------------------------------------- //
// Vectorcitos
// --------------------------------------------------------------------------- //

const normalizar = (v) => {
  const l = Math.hypot(v[0], v[1], v[2]) || 1
  return [v[0] / l, v[1] / l, v[2] / l]
}

const punto = (a, b) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2]

const acotar = (v) => (v < 0 ? 0 : v > 1 ? 1 : v)

const suave = (borde0, borde1, x) => {
  const t = acotar((x - borde0) / (borde1 - borde0))
  return t * t * (3 - 2 * t)
}

/** Coseno del ángulo entre dos direcciones, sin acos: sirve de caída. */
const cosenoAngulo = (a, b) => punto(a, b)

// --------------------------------------------------------------------------- //
// Escritor de Radiance RGBE con RLE
// --------------------------------------------------------------------------- //

function aRGBE(r, g, b) {
  const maximo = Math.max(r, g, b)
  if (maximo < 1e-32) return [0, 0, 0, 0]

  // Exponente en base 2 al estilo frexp: maximo = m · 2^e con m en [0.5, 1).
  const e = Math.floor(Math.log2(maximo)) + 1
  const escala = 256 / 2 ** e

  return [
    Math.min(255, Math.max(0, Math.floor(r * escala))),
    Math.min(255, Math.max(0, Math.floor(g * escala))),
    Math.min(255, Math.max(0, Math.floor(b * escala))),
    Math.min(255, Math.max(0, e + 128)),
  ]
}

/**
 * Codifica una panorámica RGBE en Radiance RLE.
 *
 * En RLE el flujo se recorre en grupos de 4 bytes (un píxel completo):
 *   · un byte de cuenta > 128 → los siguientes 4 bytes se repiten (cuenta − 128) veces;
 *   · un byte de cuenta ≤ 128 → los siguientes cuenta × 4 bytes son literales.
 * Sin RLE, una panorámica de 512×256 pesaría 1,5 MB y no habría forma de
 * servírsela a nadie.
 */
function codificarRadiance(ancho, alto, pixeles) {
  const partes = []
  partes.push(Buffer.from('#?RADIANCE\n# curso-react-three-fiber · assets-src/hdri.mjs\nFORMAT=32-bit_rle_rgbe\n\n', 'ascii'))
  partes.push(Buffer.from(`-Y ${alto} +X ${ancho}\n`, 'ascii'))

  const fila = Buffer.alloc(ancho * 4)

  for (let y = 0; y < alto; y += 1) {
    for (let x = 0; x < ancho; x += 1) {
      const i = (y * ancho + x) * 4
      fila[x * 4] = pixeles[i]
      fila[x * 4 + 1] = pixeles[i + 1]
      fila[x * 4 + 2] = pixeles[i + 2]
      fila[x * 4 + 3] = pixeles[i + 3]
    }

    // Cabecera de scanline en formato "new RLE": 2 2 alto ancho.
    partes.push(Buffer.from([2, 2, (ancho >> 8) & 0xff, ancho & 0xff]))

    // El RLE se aplica por canal y los canales van en planos separados.
    for (let canal = 0; canal < 4; canal += 1) {
      const valores = new Uint8Array(ancho)
      for (let x = 0; x < ancho; x += 1) valores[x] = fila[x * 4 + canal]

      let x = 0
      while (x < ancho) {
        // ¿Cuántos píxeles iguales seguidos hay desde x?
        let repeticiones = 1
        while (x + repeticiones < ancho && valores[x + repeticiones] === valores[x] && repeticiones < 127) {
          repeticiones += 1
        }

        if (repeticiones >= 4) {
          partes.push(Buffer.from([128 + repeticiones, valores[x]]))
          x += repeticiones
        } else {
          // Literales hasta el siguiente tramo de 4 iguales.
          const inicio = x
          let literal = 0
          while (x < ancho && literal < 128) {
            const siguienteIgual =
              x + 3 < ancho &&
              valores[x] === valores[x + 1] &&
              valores[x] === valores[x + 2] &&
              valores[x] === valores[x + 3]
            if (siguienteIgual && x > inicio) break
            x += 1
            literal += 1
          }
          partes.push(Buffer.from([literal]))
          partes.push(Buffer.from(valores.subarray(inicio, x)))
        }
      }
    }
  }

  return Buffer.concat(partes)
}

// --------------------------------------------------------------------------- //
// Dirección de cada píxel
// --------------------------------------------------------------------------- //

function direccionDe(u, v) {
  // u: 0..1 alrededor (phi), v: 0 arriba (theta).
  const phi = (u - 0.5) * Math.PI * 2
  const theta = v * Math.PI
  const senoTheta = Math.sin(theta)
  return normalizar([Math.cos(phi) * senoTheta, Math.cos(theta), Math.sin(phi) * senoTheta])
}

// --------------------------------------------------------------------------- //
// Panorámicas
// --------------------------------------------------------------------------- //

/** Estudio oscuro con tres softboxes: el mapa que enseña reflejos especulares. */
function estudio(ancho, alto) {
  const pixeles = new Uint8Array(ancho * alto * 4)

  // Cada softbox: dirección, apertura (coseno del borde) e intensidad.
  const luces = [
    { direccion: normalizar([0.15, 0.82, 0.55]), borde: 0.86, potencia: 26, color: [1, 0.97, 0.92] },
    { direccion: normalizar([-0.9, 0.25, -0.35]), borde: 0.9, potencia: 9, color: [0.82, 0.9, 1] },
    { direccion: normalizar([0.75, 0.05, -0.65]), borde: 0.93, potencia: 5, color: [1, 0.86, 0.7] },
  ]

  for (let y = 0; y < alto; y += 1) {
    for (let x = 0; x < ancho; x += 1) {
      const v = (y + 0.5) / alto
      const u = (x + 0.5) / ancho
      const direccion = direccionDe(u, v)

      // Fondo: degradado vertical muy tenue, más claro arriba.
      const base = 0.012 + suave(0.75, 0.05, v) * 0.02
      let r = base * 0.9
      let g = base * 0.95
      let b = base * 1.15

      for (const luz of luces) {
        const caida = suave(luz.borde, luz.borde + 0.09, cosenoAngulo(direccion, luz.direccion))
        // Borde interior un poco más brillante: da forma al reflejo.
        const nucleo = suave(luz.borde + 0.02, luz.borde + 0.06, cosenoAngulo(direccion, luz.direccion))
        const intensidad = luz.potencia * (caida * 0.65 + nucleo * 0.35)
        r += intensidad * luz.color[0]
        g += intensidad * luz.color[1]
        b += intensidad * luz.color[2]
      }

      // Suelo oscuro (v > 0.5 son direcciones con Y negativa).
      if (direccion[1] < 0) {
        const suelo = suave(0, 0.35, -direccion[1])
        r *= 1 - suelo * 0.75
        g *= 1 - suelo * 0.75
        b *= 1 - suelo * 0.7
      }

      const [R, G, B, E] = aRGBE(r, g, b)
      const i = (y * ancho + x) * 4
      pixeles[i] = R
      pixeles[i + 1] = G
      pixeles[i + 2] = B
      pixeles[i + 3] = E
    }
  }

  return pixeles
}

/** Cielo con sol y horizonte: el mapa de exterior. */
function exterior(ancho, alto) {
  const pixeles = new Uint8Array(ancho * alto * 4)

  const sol = normalizar([0.42, 0.36, -0.83])
  const cenit = [0.16, 0.32, 0.72]
  const horizonte = [0.62, 0.72, 0.86]
  const suelo = [0.11, 0.11, 0.10]

  for (let y = 0; y < alto; y += 1) {
    for (let x = 0; x < ancho; x += 1) {
      const v = (y + 0.5) / alto
      const u = (x + 0.5) / ancho
      const direccion = direccionDe(u, v)
      const altura = direccion[1]

      let r
      let g
      let b

      if (altura >= 0) {
        const t = Math.pow(altura, 0.55)
        r = horizonte[0] + (cenit[0] - horizonte[0]) * t
        g = horizonte[1] + (cenit[1] - horizonte[1]) * t
        b = horizonte[2] + (cenit[2] - horizonte[2]) * t
      } else {
        const t = suave(0, 0.22, -altura)
        r = horizonte[0] + (suelo[0] - horizonte[0]) * t
        g = horizonte[1] + (suelo[1] - horizonte[1]) * t
        b = horizonte[2] + (suelo[2] - horizonte[2]) * t
      }

      // Sol: disco duro más halo amplio.
      const coseno = cosenoAngulo(direccion, sol)
      if (coseno > 0) {
        const halo = Math.pow(coseno, 220) * 18 + Math.pow(coseno, 12) * 0.5
        const disco = coseno > 0.99985 ? 260 : 0
        r += halo * 1.0 + disco
        g += halo * 0.96 + disco * 0.97
        b += halo * 0.86 + disco * 0.9
      }

      const [R, G, B, E] = aRGBE(r, g, b)
      const i = (y * ancho + x) * 4
      pixeles[i] = R
      pixeles[i + 1] = G
      pixeles[i + 2] = B
      pixeles[i + 3] = E
    }
  }

  return pixeles
}

/** Noche lunar: casi sin ambiente, para el proyecto final. */
function luna(ancho, alto) {
  const pixeles = new Uint8Array(ancho * alto * 4)
  const estrella = normalizar([0.6, 0.5, 0.62])

  for (let y = 0; y < alto; y += 1) {
    for (let x = 0; x < ancho; x += 1) {
      const v = (y + 0.5) / alto
      const u = (x + 0.5) / ancho
      const direccion = direccionDe(u, v)
      const altura = direccion[1]

      const t = altura >= 0 ? Math.pow(altura, 0.7) : 1
      let r = 0.004 + t * 0.012
      let g = 0.005 + t * 0.014
      let b = 0.01 + t * 0.028

      if (altura < 0) {
        const suelo = suave(0, 0.4, -altura)
        r = r * (1 - suelo) + 0.055 * suelo
        g = g * (1 - suelo) + 0.055 * suelo
        b = b * (1 - suelo) + 0.06 * suelo
      }

      const coseno = cosenoAngulo(direccion, estrella)
      if (coseno > 0) {
        const halo = Math.pow(coseno, 400) * 2.2 + Math.pow(coseno, 20) * 0.12
        r += halo
        g += halo * 0.99
        b += halo * 0.95
      }

      const [R, G, B, E] = aRGBE(r, g, b)
      const i = (y * ancho + x) * 4
      pixeles[i] = R
      pixeles[i + 1] = G
      pixeles[i + 2] = B
      pixeles[i + 3] = E
    }
  }

  return pixeles
}

// --------------------------------------------------------------------------- //
// Ejecución
// --------------------------------------------------------------------------- //

const MAPAS = [
  { nombre: 'estudio.hdr', ancho: 512, alto: 256, generar: estudio },
  { nombre: 'exterior.hdr', ancho: 1024, alto: 512, generar: exterior },
  { nombre: 'luna.hdr', ancho: 1024, alto: 512, generar: luna },
]

mkdirSync(destino, { recursive: true })

let total = 0
for (const mapa of MAPAS) {
  const pixeles = mapa.generar(mapa.ancho, mapa.alto)
  const buffer = codificarRadiance(mapa.ancho, mapa.alto, pixeles)
  writeFileSync(join(destino, mapa.nombre), buffer)
  total += buffer.length
  console.log(
    `[hdri] ${mapa.nombre.padEnd(14)} ${mapa.ancho}×${mapa.alto} · ${(buffer.length / 1024).toFixed(1)} KB`,
  )
}

console.log(`\n[hdri] ${MAPAS.length} mapas · ${(total / 1024).toFixed(1)} KB · public/hdri/`)

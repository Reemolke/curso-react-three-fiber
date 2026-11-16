#!/usr/bin/env node
/**
 * Genera los sonidos del curso en `public/audio/`.
 *
 * Son WAV PCM de 16 bits, mono, 22 050 Hz. Se sintetizan aquí para no depender de
 * bancos de sonido de terceros: la licencia del resultado es CC BY 4.0 (ver
 * ASSETS.md) y cualquiera puede regenerarlos con `npm run assets:audio`.
 *
 * Los que se reproducen en bucle (`motor-bucle`) están construidos con un número
 * entero de ciclos para que el salto de fin a principio no se oiga.
 *
 * Uso:
 *   npm run assets:audio
 */

import { mkdirSync, writeFileSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const aqui = dirname(fileURLToPath(import.meta.url))
const raiz = resolve(aqui, '..')
const destino = join(raiz, 'public', 'audio')

const FRECUENCIA = 22050

// --------------------------------------------------------------------------- //
// Escritor de WAV
// --------------------------------------------------------------------------- //

/** `muestras`: Float32Array en [-1, 1]. */
function wav(muestras, frecuencia = FRECUENCIA) {
  const datos = Buffer.alloc(muestras.length * 2)

  for (let i = 0; i < muestras.length; i += 1) {
    // Recorte antes de cuantizar: un pico fuera de rango suena a chasquido.
    const v = Math.max(-1, Math.min(1, muestras[i]))
    datos.writeInt16LE(Math.round(v * 32767), i * 2)
  }

  const cabecera = Buffer.alloc(44)
  cabecera.write('RIFF', 0, 'ascii')
  cabecera.writeUInt32LE(36 + datos.length, 4)
  cabecera.write('WAVE', 8, 'ascii')
  cabecera.write('fmt ', 12, 'ascii')
  cabecera.writeUInt32LE(16, 16) // tamaño del bloque fmt
  cabecera.writeUInt16LE(1, 20) // PCM
  cabecera.writeUInt16LE(1, 22) // mono
  cabecera.writeUInt32LE(frecuencia, 24)
  cabecera.writeUInt32LE(frecuencia * 2, 28) // bytes por segundo
  cabecera.writeUInt16LE(2, 32) // alineación de bloque
  cabecera.writeUInt16LE(16, 34) // bits por muestra
  cabecera.write('data', 36, 'ascii')
  cabecera.writeUInt32LE(datos.length, 40)

  return Buffer.concat([cabecera, datos])
}

// --------------------------------------------------------------------------- //
// Utilidades de síntesis
// --------------------------------------------------------------------------- //

const dosPi = Math.PI * 2

const silencio = (segundos) => new Float32Array(Math.round(segundos * FRECUENCIA))

/** Envolvente de ataque y caída exponencial, en segundos. */
function envolvente(t, ataque, caida) {
  if (t < ataque) return t / ataque
  return Math.exp(-(t - ataque) / caida)
}

/** Ruido determinista: misma semilla, mismo fichero. */
function ruidoAleatorio(semilla) {
  let estado = semilla >>> 0
  return () => {
    estado = (estado * 1664525 + 1013904223) >>> 0
    return (estado / 4294967295) * 2 - 1
  }
}

/** Filtro paso bajo de un polo: suaviza el ruido hasta convertirlo en soplido. */
function pasoBajo(muestras, corte) {
  const alpha = 1 - Math.exp((-dosPi * corte) / FRECUENCIA)
  let anterior = 0
  const salida = new Float32Array(muestras.length)
  for (let i = 0; i < muestras.length; i += 1) {
    anterior += alpha * (muestras[i] - anterior)
    salida[i] = anterior
  }
  return salida
}

/** Mezcla `fuente` dentro de `destino` a partir de `desfase` en segundos. */
function mezclar(destino, fuente, desfase = 0, ganancia = 1) {
  const inicio = Math.round(desfase * FRECUENCIA)
  for (let i = 0; i < fuente.length; i += 1) {
    const j = inicio + i
    if (j < 0 || j >= destino.length) continue
    destino[j] += fuente[i] * ganancia
  }
}

// --------------------------------------------------------------------------- //
// Sonidos
// --------------------------------------------------------------------------- //

/** Clic seco de interfaz: dos transitorios muy cortos. */
function clic() {
  const salida = silencio(0.09)
  const ruido = ruidoAleatorio(7)
  const chasquido = new Float32Array(Math.round(0.03 * FRECUENCIA))

  for (let i = 0; i < chasquido.length; i += 1) {
    const t = i / FRECUENCIA
    chasquido[i] = ruido() * envolvente(t, 0.0008, 0.005) * 0.7
  }

  const cuerpo = new Float32Array(Math.round(0.06 * FRECUENCIA))
  for (let i = 0; i < cuerpo.length; i += 1) {
    const t = i / FRECUENCIA
    cuerpo[i] = Math.sin(dosPi * 1180 * t) * envolvente(t, 0.001, 0.012) * 0.45
  }

  mezclar(salida, chasquido, 0, 1)
  mezclar(salida, cuerpo, 0.004, 1)
  return salida
}

/** Paso metálico sobre chapa: golpe grave con cola corta y algo de ruido. */
function paso() {
  const salida = silencio(0.28)
  const ruido = ruidoAleatorio(19)
  const golpe = new Float32Array(Math.round(0.25 * FRECUENCIA))

  for (let i = 0; i < golpe.length; i += 1) {
    const t = i / FRECUENCIA
    // Dos parciales graves desafinados: da la sensación de metal, no de tambor.
    const cuerpo =
      Math.sin(dosPi * 92 * t) * 0.5 + Math.sin(dosPi * 137 * t) * 0.25
    golpe[i] = cuerpo * envolvente(t, 0.002, 0.045)
  }

  // La suciedad del impacto se filtra para que no suene a estática.
  const suciedad = pasoBajo(
    Float32Array.from({ length: Math.round(0.05 * FRECUENCIA) }, () => ruido()),
    2400,
  )
  for (let i = 0; i < suciedad.length; i += 1) {
    suciedad[i] *= envolvente(i / FRECUENCIA, 0.0005, 0.008) * 1.6
  }

  mezclar(salida, golpe, 0, 0.9)
  mezclar(salida, suciedad, 0, 0.6)
  return salida
}

/** Motor en bucle: diente de sierra grave + su soplido, con un ciclo exacto. */
function motorBucle() {
  // 1,5 s con un número entero de ciclos de la fundamental (60 Hz → 90 ciclos).
  const segundos = 1.5
  const fundamental = 60
  const salida = silencio(segundos)
  const ruido = ruidoAleatorio(31)

  const soplido = pasoBajo(
    Float32Array.from({ length: salida.length }, () => ruido()),
    900,
  )

  for (let i = 0; i < salida.length; i += 1) {
    const t = i / FRECUENCIA
    const fase = (t * fundamental) % 1

    // Onda con armónicos impares: más «motor» que un seno puro.
    const sierra = 2 * fase - 1
    const armonico = Math.sin(dosPi * fundamental * 3 * t) * 0.22 * (0.6 + 0.4 * Math.sin(dosPi * 0.5 * t))

    salida[i] = sierra * 0.22 + armonico + soplido[i] * 0.5
  }

  // Igualar la amplitud de los extremos evita el chasquido del bucle.
  const cruzado = Math.min(1, Math.round(0.02 * FRECUENCIA))
  for (let i = 0; i < cruzado; i += 1) {
    const w = i / cruzado
    salida[i] *= w
    salida[salida.length - 1 - i] *= w
  }

  return salida
}

/** Alerta: dos tonos cortos y agudos. */
function alerta() {
  const salida = silencio(0.62)

  const tono = (frecuencia, duracion, retardo, ganancia) => {
    const trozo = new Float32Array(Math.round(duracion * FRECUENCIA))
    for (let i = 0; i < trozo.length; i += 1) {
      const t = i / FRECUENCIA
      // Un poco de segunda armónica para que corte en un altavoz pequeño.
      trozo[i] =
        (Math.sin(dosPi * frecuencia * t) * 0.8 +
          Math.sin(dosPi * frecuencia * 2 * t) * 0.2) *
        envolvente(t, 0.004, 0.09)
    }
    mezclar(salida, trozo, retardo, ganancia)
  }

  tono(880, 0.16, 0, 0.5)
  tono(1046, 0.22, 0.22, 0.5)
  return salida
}

/** Confirmación: arpegio de tres notas. */
function exito() {
  const salida = silencio(0.9)
  const notas = [523.25, 659.25, 783.99]

  notas.forEach((frecuencia, indice) => {
    const duracion = 0.5
    const trozo = new Float32Array(Math.round(duracion * FRECUENCIA))
    for (let i = 0; i < trozo.length; i += 1) {
      const t = i / FRECUENCIA
      trozo[i] =
        (Math.sin(dosPi * frecuencia * t) * 0.5 +
          Math.sin(dosPi * frecuencia * 2 * t) * 0.14) *
        envolvente(t, 0.005, 0.12)
    }
    mezclar(salida, trozo, indice * 0.13, 0.42)
  })

  return salida
}

// --------------------------------------------------------------------------- //
// Ejecución
// --------------------------------------------------------------------------- //

const SONIDOS = [
  { nombre: 'clic.wav', generar: clic },
  { nombre: 'paso.wav', generar: paso },
  { nombre: 'motor-bucle.wav', generar: motorBucle },
  { nombre: 'alerta.wav', generar: alerta },
  { nombre: 'exito.wav', generar: exito },
]

mkdirSync(destino, { recursive: true })

let total = 0
for (const sonido of SONIDOS) {
  const muestras = sonido.generar()
  const buffer = wav(muestras)
  writeFileSync(join(destino, sonido.nombre), buffer)
  total += buffer.length

  let pico = 0
  for (const muestra of muestras) pico = Math.max(pico, Math.abs(muestra))

  console.log(
    `[audio] ${sonido.nombre.padEnd(18)} ${(muestras.length / FRECUENCIA).toFixed(2)} s · ` +
      `${(buffer.length / 1024).toFixed(1)} KB · pico ${(pico * 100).toFixed(0)} %`,
  )
}

console.log(`\n[audio] ${SONIDOS.length} ficheros · ${(total / 1024).toFixed(1)} KB · public/audio/`)

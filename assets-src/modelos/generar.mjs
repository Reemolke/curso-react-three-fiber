#!/usr/bin/env node
/**
 * Genera los modelos del curso en `public/modelos/`.
 *
 * Uso:
 *   npm run assets:modelos
 *   npm run assets:modelos -- --solo rover,robot
 *   npm run assets:modelos -- --sin-draco     (salta la optimización)
 *
 * No necesita Blender ni ninguna herramienta externa: es Node puro, así que
 * cualquiera puede regenerar los assets con `npm install`.
 */

import { mkdirSync, statSync } from 'node:fs'
import { dirname, join, relative, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

import { MODELOS } from './modelos.mjs'
import { optimizar } from '../optimizar.mjs'

const aqui = dirname(fileURLToPath(import.meta.url))
const raiz = resolve(aqui, '..', '..')
const destino = join(raiz, 'public', 'modelos')

function leerArgumentos() {
  const argumentos = process.argv.slice(2)
  const opciones = { solo: [], draco: true }

  for (let i = 0; i < argumentos.length; i += 1) {
    const argumento = argumentos[i]
    if (argumento === '--solo' && argumentos[i + 1]) {
      opciones.solo = argumentos[i + 1].split(',').map((nombre) => nombre.trim())
      i += 1
    } else if (argumento === '--sin-draco') {
      opciones.draco = false
    }
  }

  return opciones
}

async function main() {
  const { solo, draco } = leerArgumentos()
  mkdirSync(destino, { recursive: true })

  const elegidos = Object.entries(MODELOS).filter(([nombre]) => solo.length === 0 || solo.includes(nombre))

  if (elegidos.length === 0) {
    console.error(`No hay ningún modelo que coincida con: ${solo.join(', ')}`)
    console.error(`Disponibles: ${Object.keys(MODELOS).join(', ')}`)
    process.exit(1)
  }

  const informes = []

  for (const [nombre, constructor] of elegidos) {
    const modelo = constructor()
    const ruta = join(destino, `${nombre}.glb`)
    const informe = modelo.guardar(ruta)
    informes.push(informe)

    console.log(
      `[modelo] ${nombre.padEnd(8)} ${(informe.bytes / 1024).toFixed(1).padStart(7)} KB · ` +
        `${String(informe.triangulos).padStart(5)} tris · ${String(informe.nodos).padStart(2)} nodos · ` +
        `${informe.animaciones.length} clips` +
        (informe.animaciones.length ? ` (${informe.animaciones.join(', ')})` : ''),
    )
  }

  if (draco) {
    console.log('\n[optimizar] Draco')
    for (const informe of informes) {
      await optimizar(informe.ruta)
    }
  }

  const totalOriginal = informes.reduce((suma, i) => suma + i.bytes, 0)
  const totalFinal = informes.reduce((suma, i) => suma + statSync(i.ruta).size, 0)

  console.log('\n[resumen]')
  console.log(`  modelos:   ${informes.length}`)
  console.log(`  sin Draco: ${(totalOriginal / 1024 / 1024).toFixed(2)} MB`)
  console.log(`  finales:   ${(totalFinal / 1024 / 1024).toFixed(2)} MB`)
  console.log(`  destino:   ${relative(raiz, destino)}`)
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})

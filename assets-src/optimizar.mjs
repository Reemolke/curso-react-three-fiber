#!/usr/bin/env node
/**
 * Optimiza los GLB de `public/modelos/`.
 *
 * Qué hace y en qué orden:
 *   1. `dedup`   — fusiona accessors y materiales idénticos.
 *   2. `prune`   — elimina nodos y datos que no usa nadie.
 *   3. `draco`   — comprime la geometría con cuantización + Draco.
 *
 * Es el mismo proceso que se enseña en la lección 8.9, con los mismos parámetros,
 * para que las cifras de la lección se puedan reproducir con `npm run assets:modelos`.
 *
 * Uso:
 *   npm run assets:optimizar
 *   npm run assets:optimizar -- --nivel alto
 */

import { readdirSync, statSync } from 'node:fs'
import { dirname, join, relative, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const aqui = dirname(fileURLToPath(import.meta.url))
const raiz = resolve(aqui, '..')
const carpeta = join(raiz, 'public', 'modelos')

/**
 * Niveles de cuantización. `medio` es el equilibrio por defecto del curso:
 * 14 bits de posición es ~0,06 mm de error en una escena de 1 m.
 */
const NIVELES = {
  suave: { quantizePosition: 16, quantizeNormal: 12, quantizeTexcoord: 14 },
  medio: { quantizePosition: 14, quantizeNormal: 10, quantizeTexcoord: 12 },
  alto: { quantizePosition: 11, quantizeNormal: 8, quantizeTexcoord: 10 },
}

async function cargarDependencias() {
  const [{ NodeIO }, { ALL_EXTENSIONS }, funciones, draco3d] = await Promise.all([
    import('@gltf-transform/core'),
    import('@gltf-transform/extensions'),
    import('@gltf-transform/functions'),
    import('draco3dgltf'),
  ])

  const io = new NodeIO().registerExtensions(ALL_EXTENSIONS).registerDependencies({
    'draco3d.decoder': await draco3d.createDecoderModule(),
    'draco3d.encoder': await draco3d.createEncoderModule(),
  })

  return { io, funciones }
}

/**
 * Optimiza un GLB en su sitio. Devuelve las cifras antes/después.
 * @param {string} ruta
 * @param {keyof typeof NIVELES} nivel
 */
export async function optimizar(ruta, nivel = 'medio') {
  const antes = statSync(ruta).size

  const { io, funciones } = await cargarDependencias()
  const documento = await io.read(ruta)

  await documento.transform(
    funciones.dedup(),
    funciones.prune(),
    funciones.draco({ ...NIVELES[nivel], method: 'edgebreaker' }),
  )

  await io.write(ruta, documento)

  const despues = statSync(ruta).size
  const porcentaje = antes === 0 ? 0 : Math.round((1 - despues / antes) * 100)

  console.log(
    `[draco] ${relative(raiz, ruta).padEnd(28)} ` +
      `${(antes / 1024).toFixed(1).padStart(7)} KB → ${(despues / 1024).toFixed(1).padStart(6)} KB ` +
      `(−${porcentaje} %)`,
  )

  return { ruta, antes, despues, porcentaje }
}

async function main() {
  const argumentos = process.argv.slice(2)
  const indiceNivel = argumentos.indexOf('--nivel')
  const nivel = indiceNivel >= 0 ? argumentos[indiceNivel + 1] : 'medio'

  if (!(nivel in NIVELES)) {
    console.error(`Nivel desconocido: ${nivel}. Usa: ${Object.keys(NIVELES).join(', ')}`)
    process.exit(1)
  }

  const archivos = readdirSync(carpeta).filter((nombre) => nombre.endsWith('.glb'))

  if (archivos.length === 0) {
    console.error(`No hay GLB en ${relative(raiz, carpeta)}. Ejecuta antes: npm run assets:modelos`)
    process.exit(1)
  }

  let totalAntes = 0
  let totalDespues = 0

  for (const nombre of archivos) {
    const resultado = await optimizar(join(carpeta, nombre), nivel)
    totalAntes += resultado.antes
    totalDespues += resultado.despues
  }

  console.log(
    `\n[total] ${archivos.length} modelos · ` +
      `${(totalAntes / 1024).toFixed(1)} KB → ${(totalDespues / 1024).toFixed(1)} KB ` +
      `(−${Math.round((1 - totalDespues / totalAntes) * 100)} %)`,
  )
}

// Solo actúa como CLI si se ejecuta directamente, no al importarlo desde generar.mjs.
const ejecutadoDirectamente =
  process.argv[1] && resolve(process.argv[1]) === resolve(fileURLToPath(import.meta.url))

if (ejecutadoDirectamente) {
  main().catch((error) => {
    console.error(error)
    process.exit(1)
  })
}

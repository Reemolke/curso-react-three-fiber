#!/usr/bin/env node
/**
 * Inspecciona los GLB de `public/modelos/` sin abrir el navegador.
 *
 * Sirve para dos cosas:
 *   · Verificar el pipeline después de generar u optimizar.
 *   · Obtener las cifras reales que se citan en las lecciones 8.1 y 8.9.
 *
 * Uso:
 *   node assets-src/modelos/inspeccionar.mjs
 *   node assets-src/modelos/inspeccionar.mjs rover
 */

import { readdirSync, statSync } from 'node:fs'
import { dirname, join, relative, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

import { NodeIO } from '@gltf-transform/core'
import { ALL_EXTENSIONS } from '@gltf-transform/extensions'
import draco3d from 'draco3dgltf'

const aqui = dirname(fileURLToPath(import.meta.url))
const raiz = resolve(aqui, '..', '..')
const carpeta = join(raiz, 'public', 'modelos')

function bytes(n) {
  if (n < 1024) return `${n} B`
  if (n < 1024 * 1024) return `${(n / 1024).toFixed(1)} KB`
  return `${(n / 1024 / 1024).toFixed(2)} MB`
}

const io = new NodeIO().registerExtensions(ALL_EXTENSIONS).registerDependencies({
  'draco3d.decoder': await draco3d.createDecoderModule(),
})

const filtro = process.argv[2]
const archivos = readdirSync(carpeta)
  .filter((nombre) => nombre.endsWith('.glb'))
  .filter((nombre) => !filtro || nombre.startsWith(filtro))

for (const nombre of archivos) {
  const ruta = join(carpeta, nombre)
  const documento = await io.read(ruta)
  const raizDoc = documento.getRoot()

  let primitivas = 0
  let triangulos = 0
  let vertices = 0

  for (const malla of raizDoc.listMeshes()) {
    for (const primitiva of malla.listPrimitives()) {
      primitivas += 1
      const posiciones = primitiva.getAttribute('POSITION')
      const indices = primitiva.getIndices()
      if (!posiciones) continue
      vertices += posiciones.getCount()
      triangulos += indices ? indices.getCount() / 3 : posiciones.getCount() / 3
    }
  }

  const extensiones = documento.getRoot().listExtensionsUsed().map((e) => e.extensionName)
  const animaciones = raizDoc.listAnimations()
  const materiales = raizDoc.listMaterials()

  console.log(`\n${nombre}  ·  ${bytes(statSync(ruta).size)}`)
  console.log(`  nodos        ${raizDoc.listNodes().length}`)
  console.log(`  mallas       ${raizDoc.listMeshes().length} (${primitivas} primitivas)`)
  console.log(`  triángulos   ${triangulos}`)
  console.log(`  vértices     ${vertices}`)
  console.log(`  materiales   ${materiales.length}`)
  console.log(`  animaciones  ${animaciones.length}${animaciones.length ? ` (${animaciones.map((a) => a.getName()).join(', ')})` : ''}`)
  console.log(`  extensiones  ${extensiones.length ? extensiones.join(', ') : '—'}`)
  console.log(`  raíz         ${raizDoc.listScenes()[0].listChildren().map((n) => n.getName()).join(', ')}`)
}

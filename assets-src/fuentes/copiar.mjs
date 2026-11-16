/**
 * Copia las fuentes tipográficas del curso a `public/fuentes/`.
 *
 * drei `Text` usa troika, que necesita un archivo de fuente real (`.woff`), no un
 * typeface JSON. La fuente se toma de `@fontsource/roboto` (SIL OFL 1.1) para que
 * la web funcione sin red: si se deja el valor por defecto, troika descarga la
 * fuente de un CDN y la demo se queda sin texto en un entorno offline.
 *
 * Ejecutar con `npm run assets:fuentes` después de `npm install`.
 */
import { copyFile, mkdir } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const aqui = dirname(fileURLToPath(import.meta.url))
const raiz = join(aqui, '..', '..')
const destino = join(raiz, 'public', 'fuentes')

const archivos = [
  ['@fontsource/roboto/files/roboto-latin-400-normal.woff', 'roboto-400.woff'],
  ['@fontsource/roboto/files/roboto-latin-700-normal.woff', 'roboto-700.woff'],
]

await mkdir(destino, { recursive: true })

for (const [origen, nombre] of archivos) {
  const rutaOrigen = join(raiz, 'node_modules', origen)
  const rutaDestino = join(destino, nombre)
  await copyFile(rutaOrigen, rutaDestino)
  console.log(`${nombre} ← ${origen}`)
}

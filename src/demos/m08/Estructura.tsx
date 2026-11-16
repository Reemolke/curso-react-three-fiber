import { useEffect, useState } from 'react'
import { MODELOS } from '../../tres/rutas'
import { Marco } from '../marco'
import { leerGlb } from './glb'
import type { ResumenGlb } from './glb'

const MODELOS_DISPONIBLES: { clave: keyof typeof MODELOS; texto: string }[] = [
  { clave: 'rover', texto: 'rover' },
  { clave: 'taller', texto: 'taller' },
  { clave: 'lampara', texto: 'lampara' },
  { clave: 'caja', texto: 'caja' },
  { clave: 'tuerca', texto: 'tuerca' },
  { clave: 'robot', texto: 'robot' },
]

function kilobytes(bytes: number): string {
  return `${(bytes / 1024).toFixed(1)} KB`
}

/**
 * Lee el GLB con `fetch` y `DataView`, sin WebGL ni decodificadores.
 *
 * Sirve para que la lección 8.1 no sea una lista de palabras: el alumno ve el
 * mismo archivo que carga la escena y comprueba cuántos nodos, mallas y
 * animaciones hay dentro. El conteo de triángulos es por geometría única, que es
 * como lo cuenta `inspeccionar.mjs`; no se multiplica por instancias.
 */
export default function Estructura() {
  const [clave, setClave] = useState<keyof typeof MODELOS>('rover')
  const [resumen, setResumen] = useState<ResumenGlb | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let vivo = true
    setResumen(null)
    setError(null)

    leerGlb(MODELOS[clave])
      .then((datos) => {
        if (vivo) setResumen(datos)
      })
      .catch((fallo: unknown) => {
        if (vivo) setError(fallo instanceof Error ? fallo.message : 'Error al leer el GLB')
      })

    return () => {
      vivo = false
    }
  }, [clave])

  return (
    <Marco titulo="Dentro de un .glb, sin abrirlo en Blender">
      <div className="space-y-3 p-3">
        <div className="flex flex-wrap gap-1.5">
          {MODELOS_DISPONIBLES.map((modelo) => (
            <button
              key={modelo.clave}
              type="button"
              onClick={() => setClave(modelo.clave)}
              className={`rounded-lg border px-2.5 py-1 font-mono text-xs transition ${
                clave === modelo.clave
                  ? 'border-acento bg-acento/15 text-texto'
                  : 'border-borde text-texto-suave hover:bg-superficie-alta'
              }`}
            >
              {modelo.texto}
            </button>
          ))}
        </div>

        {error && (
          <p className="rounded-lg border border-red-500/40 bg-red-500/10 px-3 py-2 text-xs text-red-300">
            {error}
          </p>
        )}

        {!resumen && !error && (
          <p className="py-8 text-center font-mono text-xs text-texto-tenue">leyendo el contenedor…</p>
        )}

        {resumen && (
          <>
            <dl className="grid grid-cols-2 gap-2 sm:grid-cols-4">
              {[
                ['peso', kilobytes(resumen.bytes)],
                ['nodos', String(resumen.nodos)],
                ['mallas', String(resumen.mallas)],
                ['materiales', String(resumen.materiales)],
                ['triángulos', resumen.triangulos.toLocaleString('es-ES')],
                ['accessors', String(resumen.accessors)],
                ['texturas', String(resumen.texturas)],
                ['animaciones', String(resumen.animaciones.length)],
              ].map(([etiqueta, valor]) => (
                <div key={etiqueta} className="rounded-lg bg-fondo-alto/70 px-2.5 py-1.5">
                  <dt className="font-mono text-[10px] uppercase tracking-widest text-texto-tenue">
                    {etiqueta}
                  </dt>
                  <dd className="font-mono text-sm text-texto">{valor}</dd>
                </div>
              ))}
            </dl>

            <div className="grid gap-2 text-xs sm:grid-cols-2">
              <div className="rounded-lg border border-borde px-2.5 py-2">
                <p className="mb-1 font-mono text-[10px] uppercase tracking-widest text-texto-tenue">
                  generador
                </p>
                <p className="text-texto-suave">{resumen.generador}</p>
                <p className="mt-2 font-mono text-[10px] uppercase tracking-widest text-texto-tenue">
                  extensiones
                </p>
                <p className="font-mono text-texto-suave">
                  {resumen.extensiones.length ? resumen.extensiones.join(', ') : 'ninguna'}
                </p>
              </div>

              <div className="rounded-lg border border-borde px-2.5 py-2">
                <p className="mb-1 font-mono text-[10px] uppercase tracking-widest text-texto-tenue">
                  clips
                </p>
                <p className="text-texto-suave">
                  {resumen.animaciones.length ? resumen.animaciones.join(', ') : 'sin animación'}
                </p>
              </div>
            </div>

            <details className="rounded-lg border border-borde px-2.5 py-2">
              <summary className="cursor-pointer font-mono text-[11px] uppercase tracking-widest text-texto-tenue">
                {resumen.nombresDeNodos.length} nombres de nodo
              </summary>
              <p className="mt-2 font-mono text-[11px] leading-relaxed text-texto-suave">
                {resumen.nombresDeNodos.join(' · ')}
              </p>
            </details>

            <p className="text-[11px] leading-relaxed text-texto-tenue">
              El peso es el del archivo servido, ya comprimido con Draco. Los triángulos se cuentan
              por geometría única: una malla reutilizada por dos nodos suma una vez.
            </p>
          </>
        )}
      </div>
    </Marco>
  )
}

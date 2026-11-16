import { Suspense, lazy, useState } from 'react'
import type { Ejercicio } from '../contenido/tipos'
import { Codigo } from './Codigo'
import { ErrorBoundary } from '../tres/ErrorBoundary'

/**
 * Sandpack se carga en un chunk aparte: son ~400 kB que solo necesita quien
 * pulsa «abrir editor». La lección se lee perfectamente sin descargarlo.
 */
const Sandpack = lazy(() =>
  import('@codesandbox/sandpack-react').then((modulo) => ({ default: modulo.Sandpack })),
)

/**
 * Dependencias del sandbox.
 *
 * `three` va fijado a 0.185.1 y NO a la 0.187 del sitio: desde la 0.186 la
 * entrada CommonJS de three llama a `process.emitWarning`, que el bundler del
 * navegador de Sandpack no implementa y rompe el preview. Es un conflicto real
 * documentado en RESEARCH.md §6.1. El código del curso se escribe contra la
 * intersección de ambas versiones, así que el mismo snippet funciona aquí y en
 * el proyecto local.
 */
const DEPENDENCIAS: Record<string, string> = {
  react: '19.3.1',
  'react-dom': '19.3.1',
  three: '0.185.1',
  '@react-three/fiber': '9.8.2',
  '@react-three/drei': '10.7.9',
  '@types/react': '19.3.0',
  '@types/react-dom': '19.3.0',
  '@types/three': '0.185.4',
}

type Props = {
  ejercicio: Ejercicio
  /** Dependencias extra que necesite el ejercicio concreto. */
  dependencias?: Record<string, string>
}

export function Sandbox({ ejercicio, dependencias }: Props) {
  const [abierto, setAbierto] = useState(false)

  return (
    <section aria-labelledby="pruébalo-tu" className="tarjeta overflow-hidden">
      <div className="border-b border-borde bg-acento/5 px-5 py-4">
        <h2 id="pruébalo-tu" className="flex items-center gap-2 text-lg font-semibold">
          <span aria-hidden className="text-acento">
            ▸
          </span>
          Pruébalo tú
        </h2>
        <p className="mt-1 text-sm text-texto-suave">{ejercicio.reto}</p>

        {ejercicio.pistas && ejercicio.pistas.length > 0 && (
          <details className="mt-3 text-sm">
            <summary className="cursor-pointer text-acento underline decoration-dotted underline-offset-4">
              Pistas ({ejercicio.pistas.length})
            </summary>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-texto-suave">
              {ejercicio.pistas.map((pista, i) => (
                <li key={i}>{pista}</li>
              ))}
            </ul>
          </details>
        )}
      </div>

      <div className="p-4">
        {abierto ? (
          <ErrorBoundary etiqueta="editor en vivo">
            <Suspense
              fallback={
                <div className="grid h-[380px] place-items-center rounded-lg border border-borde text-sm text-texto-tenue">
                  Cargando el editor…
                </div>
              }
            >
              <Sandpack
                template="react-ts"
                theme="dark"
                files={{ '/App.tsx': ejercicio.inicial, ...ejercicio.archivos }}
                customSetup={{ dependencies: { ...DEPENDENCIAS, ...dependencias } }}
                options={{
                  editorHeight: 380,
                  showLineNumbers: true,
                  showInlineErrors: true,
                  showTabs: Boolean(ejercicio.archivos),
                  editorWidthPercentage: 52,
                }}
              />
            </Suspense>
          </ErrorBoundary>
        ) : (
          <div className="grid gap-4">
            <Codigo
              titulo="punto de partida · App.tsx"
              lenguaje="tsx"
              codigo={ejercicio.inicial}
            />
            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => setAbierto(true)}
                className="rounded-lg bg-acento px-4 py-2 text-sm font-semibold text-fondo transition hover:bg-acento-alto"
              >
                Abrir editor en vivo
              </button>
              <span className="text-xs text-texto-tenue">
                El editor instala dependencias la primera vez; puede tardar unos segundos.
              </span>
            </div>
          </div>
        )}

        <details className="mt-4 rounded-lg border border-borde/70 bg-fondo-alto/50 p-3">
          <summary className="cursor-pointer text-sm font-medium text-texto-suave">
            Ver la solución
          </summary>
          <div className="mt-3">
            <Codigo titulo="solución · App.tsx" lenguaje="tsx" codigo={ejercicio.solucion} />
          </div>
        </details>
      </div>
    </section>
  )
}

import { Suspense, lazy, useEffect, useState } from 'react'
import { aplicarTema, useProgreso } from './estado/progreso'
import { useRuta } from './router/useRuta'
import { BarraLateral } from './ui/BarraLateral'
import { Buscador } from './ui/Buscador'
import { Cabecera } from './ui/Cabecera'
import { PaginaCreditos } from './ui/PaginaCreditos'
import { PaginaInicio } from './ui/PaginaInicio'
import { PaginaModulo } from './ui/PaginaModulo'
import { PaginaProgreso } from './ui/PaginaProgreso'

/*
 * Las páginas que arrastran three.js (~1,2 MB comprimido) o Sandpack (~266 KB)
 * van en chunks propios y se piden solo al entrar en su ruta. Si se importan
 * de forma estática, Vite las mete en el grafo de entrada y el HTML acaba
 * precargando 1,8 MB antes de pintar nada: en móvil eso son diez segundos de
 * pantalla en blanco. El inicio y el índice no necesitan nada de eso.
 */
const PaginaLeccion = lazy(() =>
  import('./ui/PaginaLeccion').then((modulo) => ({ default: modulo.PaginaLeccion })),
)
const PaginaPlayground = lazy(() =>
  import('./playground/PaginaPlayground').then((modulo) => ({ default: modulo.PaginaPlayground })),
)
const PaginaProyecto = lazy(() =>
  import('./proyecto-final/PaginaProyecto').then((modulo) => ({ default: modulo.PaginaProyecto })),
)
const Visor = lazy(() => import('./visor/Visor'))

/** Lo que se ve mientras se descarga el chunk de una página. */
function Cargando({ que }: { que: string }) {
  return (
    <div className="grid min-h-[60vh] place-items-center">
      <p role="status" className="text-sm text-texto-tenue">
        Cargando {que}…
      </p>
    </div>
  )
}

const ETIQUETA_CARGA: Partial<Record<ReturnType<typeof useRuta>['ruta']['nombre'], string>> = {
  leccion: 'la lección',
  playground: 'el playground',
  visor: 'el visor',
  proyecto: 'el proyecto',
}

export function App() {
  const { ruta } = useRuta()
  const tema = useProgreso((estado) => estado.tema)

  const [menuAbierto, setMenuAbierto] = useState(false)
  const [buscadorAbierto, setBuscadorAbierto] = useState(false)

  useEffect(() => {
    aplicarTema(tema)
  }, [tema])

  useEffect(() => {
    const alPulsar = (evento: KeyboardEvent) => {
      if ((evento.ctrlKey || evento.metaKey) && evento.key.toLowerCase() === 'k') {
        evento.preventDefault()
        setBuscadorAbierto((abierto) => !abierto)
      }
    }
    window.addEventListener('keydown', alPulsar)
    return () => window.removeEventListener('keydown', alPulsar)
  }, [])

  // Cerrar el menú móvil al cambiar de ruta.
  useEffect(() => {
    setMenuAbierto(false)
  }, [ruta])

  const leccionActiva = ruta.nombre === 'leccion' ? ruta.id : undefined
  const moduloActivo = ruta.nombre === 'modulo' ? ruta.numero : undefined

  return (
    <div className="min-h-dvh">
      <Cabecera
        alAbrirMenu={() => setMenuAbierto(true)}
        alAbrirBuscador={() => setBuscadorAbierto(true)}
      />

      <div className="mx-auto flex max-w-[1500px]">
        <aside className="sticky top-14 hidden h-[calc(100dvh-3.5rem)] w-[286px] shrink-0 overflow-y-auto border-r border-borde lg:block">
          <BarraLateral leccionActiva={leccionActiva} moduloActivo={moduloActivo} />
        </aside>

        <main className="min-w-0 flex-1">
          <Suspense fallback={<Cargando que={ETIQUETA_CARGA[ruta.nombre] ?? 'la página'} />}>
            <Contenido ruta={ruta} />
          </Suspense>
        </main>
      </div>

      {menuAbierto && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            type="button"
            aria-label="Cerrar el índice"
            onClick={() => setMenuAbierto(false)}
            className="absolute inset-0 bg-fondo/70 backdrop-blur-sm"
          />
          <div className="absolute inset-y-0 left-0 w-[86%] max-w-[320px] animate-[aparecer_0.2s_ease-out] border-r border-borde bg-fondo shadow-flotante">
            <div className="flex items-center justify-between border-b border-borde px-3 py-2.5">
              <span className="text-xs font-semibold uppercase tracking-wider text-texto-tenue">
                Índice del curso
              </span>
              <button
                type="button"
                onClick={() => setMenuAbierto(false)}
                aria-label="Cerrar"
                className="grid size-8 place-items-center rounded-lg text-texto-suave hover:bg-superficie"
              >
                ✕
              </button>
            </div>
            <div className="h-[calc(100%-3rem)] overflow-y-auto">
              <BarraLateral
                leccionActiva={leccionActiva}
                moduloActivo={moduloActivo}
                alNavegar={() => setMenuAbierto(false)}
              />
            </div>
          </div>
        </div>
      )}

      <Buscador abierto={buscadorAbierto} alCerrar={() => setBuscadorAbierto(false)} />
    </div>
  )
}

function Contenido({ ruta }: { ruta: ReturnType<typeof useRuta>['ruta'] }) {
  switch (ruta.nombre) {
    case 'inicio':
      return <PaginaInicio />
    case 'leccion':
      return <PaginaLeccion id={ruta.id} />
    case 'modulo':
      return <PaginaModulo numero={ruta.numero} />
    case 'playground':
      return <PaginaPlayground />
    case 'visor':
      return <Visor />
    case 'proyecto':
      return <PaginaProyecto />
    case 'progreso':
      return <PaginaProgreso />
    case 'creditos':
      return <PaginaCreditos />
    case 'no-encontrada':
      return (
        <div className="mx-auto max-w-xl px-6 py-16 text-center">
          <p className="font-mono text-xs uppercase tracking-widest text-acento">404</p>
          <h1 className="mt-2 text-2xl font-semibold">Esa página no existe</h1>
          <p className="mt-2 text-sm text-texto-suave">
            La ruta <code className="font-mono">{ruta.ruta}</code> no corresponde a ninguna sección del
            curso.
          </p>
          <a
            href="#/"
            className="mt-5 inline-block rounded-lg bg-acento px-4 py-2 text-sm font-semibold text-fondo"
          >
            Volver al inicio
          </a>
        </div>
      )
  }
}

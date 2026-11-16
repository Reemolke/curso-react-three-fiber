import { progresoGlobal } from '../contenido/indice'
import { useProgreso } from '../estado/progreso'

type Props = {
  alAbrirMenu: () => void
  alAbrirBuscador: () => void
}

export function Cabecera({ alAbrirMenu, alAbrirBuscador }: Props) {
  const tema = useProgreso((estado) => estado.tema)
  const alternarTema = useProgreso((estado) => estado.alternarTema)
  const completadas = useProgreso((estado) => estado.completadas)
  const progreso = progresoGlobal(completadas)

  return (
    <header className="sticky top-0 z-40 border-b border-borde bg-fondo/80 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-[1500px] items-center gap-3 px-3 sm:px-5">
        <button
          type="button"
          onClick={alAbrirMenu}
          aria-label="Abrir el índice del curso"
          className="-ml-1 grid size-9 place-items-center rounded-lg text-texto-suave transition hover:bg-superficie hover:text-texto lg:hidden"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
          </svg>
        </button>

        <a href="#/" className="group flex min-w-0 items-center gap-2.5">
          <span
            aria-hidden
            className="grid size-8 shrink-0 place-items-center rounded-lg border border-acento/40 bg-acento/10 font-mono text-[13px] font-bold text-acento transition group-hover:bg-acento/20"
          >
            R3F
          </span>
          <span className="min-w-0">
            <span className="block truncate text-sm font-semibold leading-tight">
              React Three Fiber
            </span>
            <span className="block truncate text-[11px] leading-tight text-texto-tenue">
              Curso práctico · de cero a avanzado
            </span>
          </span>
        </a>

        <div className="ml-auto flex items-center gap-1.5">
          {/* La palabra «Buscar» se oculta en pantallas pequeñas: sin `aria-label`
              el botón se quedaría solo con el icono y sin nombre accesible. */}
          <button
            type="button"
            onClick={alAbrirBuscador}
            aria-label="Buscar en el curso"
            className="flex items-center gap-2 rounded-lg border border-borde bg-superficie/60 px-2.5 py-1.5 text-xs text-texto-tenue transition hover:border-texto-tenue hover:text-texto"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="7" />
              <path d="m20 20-3.5-3.5" strokeLinecap="round" />
            </svg>
            <span className="hidden sm:inline">Buscar</span>
            <kbd className="hidden rounded border border-borde px-1 font-mono text-[10px] sm:inline">
              Ctrl K
            </kbd>
          </button>

          <a
            href="#/progreso"
            className="hidden items-center gap-2 rounded-lg border border-borde px-2.5 py-1.5 text-xs text-texto-suave transition hover:border-texto-tenue hover:text-texto sm:flex"
            title="Ver tu progreso"
          >
            <span className="font-mono text-[11px] text-acento">{progreso.porcentaje}%</span>
            <span className="hidden md:inline">completado</span>
          </a>

          <button
            type="button"
            onClick={alternarTema}
            aria-label={tema === 'oscuro' ? 'Cambiar a tema claro' : 'Cambiar a tema oscuro'}
            className="grid size-9 place-items-center rounded-lg text-texto-suave transition hover:bg-superficie hover:text-texto"
          >
            {tema === 'oscuro' ? (
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="4" />
                <path
                  d="M12 2v2m0 16v2M2 12h2m16 0h2M4.9 4.9l1.4 1.4m11.4 11.4 1.4 1.4M19.1 4.9l-1.4 1.4M6.3 17.7l-1.4 1.4"
                  strokeLinecap="round"
                />
              </svg>
            ) : (
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z" strokeLinejoin="round" />
              </svg>
            )}
          </button>
        </div>
      </div>
    </header>
  )
}

import { buscarModulo, progresoDeModulo } from '../contenido/indice'
import { useProgreso } from '../estado/progreso'
import { enlaceLeccion } from '../router/rutas'
import { Texto } from './Texto'

const ETIQUETA_NIVEL: Record<string, string> = {
  intro: 'intro',
  medio: 'medio',
  alto: 'alto',
}

export function PaginaModulo({ numero }: { numero: number }) {
  const modulo = buscarModulo(numero)
  const completadas = useProgreso((estado) => estado.completadas)

  if (!modulo) {
    return (
      <div className="p-8">
        <h1 className="text-2xl font-semibold">Módulo no encontrado</h1>
        <p className="mt-2 text-texto-suave">No existe el módulo {numero}.</p>
        <a href="#/" className="mt-4 inline-block text-acento underline">
          Volver al inicio
        </a>
      </div>
    )
  }

  const progreso = progresoDeModulo(modulo, completadas)
  const minutos = modulo.lecciones.reduce((suma, l) => suma + l.minutos, 0)

  return (
    <div className="mx-auto max-w-4xl px-4 pb-16 pt-6 sm:px-6 lg:px-8">
      <nav aria-label="Migas de pan" className="text-xs text-texto-tenue">
        <a href="#/" className="hover:text-texto">
          Curso
        </a>{' '}
        <span aria-hidden>/</span> Módulo {modulo.numero}
      </nav>

      <header className="mt-3 border-b border-borde pb-6">
        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-acento">
          Módulo {modulo.numero} · {modulo.lecciones.length} lecciones · ≈ {minutos} min
        </p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
          <Texto>{modulo.titulo}</Texto>
        </h1>
        <p className="mt-3 max-w-2xl text-[15px] leading-7 text-texto-suave">{modulo.descripcion}</p>

        <div className="mt-5 flex items-center gap-3">
          <div
            className="h-1.5 flex-1 overflow-hidden rounded-full bg-borde/60"
            role="progressbar"
            aria-valuenow={progreso.porcentaje}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label={`Progreso del módulo ${modulo.numero}`}
          >
            <div
              className="h-full rounded-full bg-acento transition-all"
              style={{ width: `${progreso.porcentaje}%` }}
            />
          </div>
          <span className="font-mono text-xs text-texto-tenue">
            {progreso.completadas}/{progreso.total} · {progreso.porcentaje}%
          </span>
        </div>
      </header>

      <ol className="mt-6 space-y-2">
        {modulo.lecciones.map((leccion, i) => {
          const hecha = Boolean(completadas[leccion.id])
          return (
            <li key={leccion.id}>
              <a
                href={enlaceLeccion(leccion.id)}
                className="group flex items-start gap-4 rounded-caja border border-borde bg-superficie p-4 transition hover:border-acento/40 hover:bg-superficie-alta"
              >
                <span className="grid size-9 shrink-0 place-items-center rounded-lg border border-borde font-mono text-xs text-texto-tenue group-hover:border-acento/40 group-hover:text-acento">
                  {hecha ? <span className="text-exito">✓</span> : String(i + 1).padStart(2, '0')}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="flex flex-wrap items-center gap-2">
                    <span className="text-sm font-semibold group-hover:text-acento">
                      <Texto>{leccion.titulo}</Texto>
                    </span>
                    <span className="font-mono text-[10px] uppercase tracking-wider text-texto-tenue">
                      {ETIQUETA_NIVEL[leccion.nivel]} · {leccion.minutos} min
                    </span>
                  </span>
                  <span className="mt-1 block text-xs leading-5 text-texto-suave">
                    <Texto>{leccion.objetivo}</Texto>
                  </span>
                </span>
              </a>
            </li>
          )
        })}
      </ol>
    </div>
  )
}

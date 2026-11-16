import { modulos, progresoDeModulo, siguientePendiente } from '../contenido/indice'
import { useProgreso } from '../estado/progreso'
import { enlaceLeccion, enlaceModulo } from '../router/rutas'
import { Texto } from './Texto'

type Props = {
  leccionActiva?: string
  moduloActivo?: number
  alNavegar?: () => void
}

const ENLACES_HERRAMIENTAS = [
  { href: '#/playground', texto: 'Playground libre', icono: '◈' },
  { href: '#/visor', texto: 'Visor de modelos', icono: '◎' },
  { href: '#/proyecto', texto: 'Proyecto final', icono: '★' },
  { href: '#/progreso', texto: 'Mi progreso', icono: '▤' },
  { href: '#/creditos', texto: 'Créditos y licencias', icono: '©' },
]

export function BarraLateral({ leccionActiva, moduloActivo, alNavegar }: Props) {
  const completadas = useProgreso((estado) => estado.completadas)
  const pendiente = siguientePendiente(completadas)

  return (
    <div className="flex h-full flex-col">
      <div className="p-3">
        <a
          href={enlaceLeccion(pendiente.id)}
          onClick={alNavegar}
          className="block rounded-caja border border-acento/30 bg-acento/5 p-3 transition hover:border-acento/60 hover:bg-acento/10"
        >
          <span className="font-mono text-[10px] uppercase tracking-widest text-acento">
            Continuar · {pendiente.id}
          </span>
          <span className="mt-0.5 block text-sm font-semibold leading-snug"><Texto>{pendiente.titulo}</Texto></span>
        </a>
      </div>

      <nav aria-label="Módulos del curso" className="flex-1 overflow-y-auto px-2 pb-4">
        {modulos.map((modulo) => {
          const progreso = progresoDeModulo(modulo, completadas)
          return (
            <section key={modulo.numero} className="mb-1">
              <a
                href={enlaceModulo(modulo.numero)}
                onClick={alNavegar}
                className={`group flex items-center gap-2 rounded-lg px-2 py-1.5 transition hover:bg-superficie ${
                  moduloActivo === modulo.numero ? 'bg-superficie' : ''
                }`}
              >
                <span className="grid size-5 shrink-0 place-items-center rounded border border-borde font-mono text-[10px] text-texto-tenue group-hover:border-acento/40 group-hover:text-acento">
                  {modulo.numero}
                </span>
                <span className="min-w-0 flex-1 truncate text-xs font-semibold uppercase tracking-wider text-texto-suave group-hover:text-texto">
                  <Texto>{modulo.titulo}</Texto>
                </span>
                <span className="font-mono text-[10px] text-texto-tenue">
                  {progreso.completadas}/{progreso.total}
                </span>
              </a>

              <div className="mx-2 mb-1 ml-4 h-px bg-borde/60" aria-hidden />
              <div
                className="mb-1 ml-4 h-0.5 overflow-hidden rounded-full bg-borde/50"
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

              <ul className="space-y-0.5">
                {modulo.lecciones.map((leccion) => {
                  const activa = leccion.id === leccionActiva
                  const hecha = Boolean(completadas[leccion.id])
                  return (
                    <li key={leccion.id}>
                      <a
                        href={enlaceLeccion(leccion.id)}
                        onClick={alNavegar}
                        aria-current={activa ? 'page' : undefined}
                        className={`flex items-start gap-2 rounded-lg py-1 pl-4 pr-2 text-[13px] leading-snug transition ${
                          activa
                            ? 'bg-acento/10 text-texto ring-1 ring-inset ring-acento/30'
                            : 'text-texto-suave hover:bg-superficie hover:text-texto'
                        }`}
                      >
                        <span
                          className={`mt-0.5 w-7 shrink-0 font-mono text-[10px] ${
                            activa ? 'text-acento' : 'text-texto-tenue'
                          }`}
                        >
                          {leccion.id}
                        </span>
                        <span className="min-w-0 flex-1">
                          <Texto>{leccion.titulo}</Texto>
                        </span>
                        {hecha && (
                          <span aria-label="completada" className="mt-0.5 text-[10px] text-exito">
                            ✓
                          </span>
                        )}
                      </a>
                    </li>
                  )
                })}
              </ul>
            </section>
          )
        })}
      </nav>

      <div className="border-t border-borde p-2">
        <ul className="space-y-0.5">
          {ENLACES_HERRAMIENTAS.map((enlace) => (
            <li key={enlace.href}>
              <a
                href={enlace.href}
                onClick={alNavegar}
                className="flex items-center gap-2 rounded-lg px-2 py-1.5 text-[13px] text-texto-suave transition hover:bg-superficie hover:text-texto"
              >
                <span aria-hidden className="w-4 text-center text-acento/70">
                  {enlace.icono}
                </span>
                {enlace.texto}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

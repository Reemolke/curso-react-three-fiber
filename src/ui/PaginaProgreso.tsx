import { modulos, progresoDeModulo, progresoGlobal } from '../contenido/indice'
import { useProgreso } from '../estado/progreso'
import { enlaceModulo } from '../router/rutas'
import { Texto } from './Texto'

export function PaginaProgreso() {
  const completadas = useProgreso((estado) => estado.completadas)
  const quizzes = useProgreso((estado) => estado.quizzes)
  const fases = useProgreso((estado) => estado.fases)
  const reiniciar = useProgreso((estado) => estado.reiniciar)

  const progreso = progresoGlobal(completadas)
  const intentos = Object.entries(quizzes)
  const aciertosTotales = intentos.reduce((suma, [, r]) => suma + r.aciertos, 0)
  const preguntasTotales = intentos.reduce((suma, [, r]) => suma + r.total, 0)
  const fasesHechas = Object.values(fases).filter(Boolean).length

  return (
    <div className="mx-auto max-w-3xl px-4 pb-16 pt-8 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold tracking-tight">Mi progreso</h1>
      <p className="mt-2 text-sm text-texto-suave">
        Todo se guarda en este navegador (localStorage). Si borras los datos del sitio, se pierde.
      </p>

      <div className="mt-6 grid gap-3 sm:grid-cols-3">
        {[
          {
            valor: `${progreso.porcentaje}%`,
            etiqueta: 'del curso',
            detalle: `${progreso.completadas} de ${progreso.total} lecciones`,
          },
          {
            valor: preguntasTotales > 0 ? `${Math.round((aciertosTotales / preguntasTotales) * 100)}%` : '—',
            etiqueta: 'en los quizzes',
            detalle:
              preguntasTotales > 0
                ? `${aciertosTotales} aciertos de ${preguntasTotales} preguntas`
                : 'Aún no has hecho ningún quiz',
          },
          {
            valor: `${fasesHechas}/8`,
            etiqueta: 'fases del proyecto',
            detalle: 'Taller K-7',
          },
        ].map((tarjeta) => (
          <div key={tarjeta.etiqueta} className="rounded-caja border border-borde bg-superficie p-4">
            <p className="text-2xl font-semibold tabular-nums">{tarjeta.valor}</p>
            <p className="text-xs uppercase tracking-wider text-texto-tenue">{tarjeta.etiqueta}</p>
            <p className="mt-1 text-xs text-texto-suave">{tarjeta.detalle}</p>
          </div>
        ))}
      </div>

      <section className="mt-10">
        <h2 className="text-lg font-semibold">Por módulo</h2>
        <ul className="mt-4 space-y-3">
          {modulos.map((modulo) => {
            const p = progresoDeModulo(modulo, completadas)
            return (
              <li key={modulo.numero}>
                <a href={enlaceModulo(modulo.numero)} className="block rounded-caja p-2 transition hover:bg-superficie">
                  <div className="flex items-baseline justify-between gap-3">
                    <span className="text-sm">
                      <span className="font-mono text-[11px] text-texto-tenue">{modulo.numero} · </span>
                      <Texto>{modulo.titulo}</Texto>
                    </span>
                    <span className="font-mono text-xs text-texto-tenue">
                      {p.completadas}/{p.total}
                    </span>
                  </div>
                  <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-borde/60">
                    <div className="h-full rounded-full bg-acento" style={{ width: `${p.porcentaje}%` }} />
                  </div>
                </a>
              </li>
            )
          })}
        </ul>
      </section>

      {intentos.length > 0 && (
        <section className="mt-10">
          <h2 className="text-lg font-semibold">Últimos quizzes</h2>
          <ul className="mt-3 divide-y divide-borde rounded-caja border border-borde bg-superficie text-sm">
            {intentos.slice(-8).reverse().map(([id, resultado]) => (
              <li key={id} className="flex items-center justify-between gap-3 px-3 py-2">
                <span className="font-mono text-xs text-texto-tenue">Lección {id}</span>
                <span className="tabular-nums">
                  {resultado.aciertos}/{resultado.total}
                </span>
              </li>
            ))}
          </ul>
        </section>
      )}

      <section className="mt-10 rounded-caja border border-error/30 bg-error/5 p-4">
        <h2 className="text-sm font-semibold text-error">Zona de peligro</h2>
        <p className="mt-1 text-xs text-texto-suave">
          Borra lecciones completadas, resultados de quiz y fases del proyecto. No se puede deshacer.
        </p>
        <button
          type="button"
          onClick={() => {
            if (window.confirm('¿Seguro que quieres borrar todo tu progreso?')) reiniciar()
          }}
          className="mt-3 rounded-lg border border-error/50 px-3 py-1.5 text-xs font-medium text-error transition hover:bg-error/10"
        >
          Reiniciar mi progreso
        </button>
      </section>
    </div>
  )
}

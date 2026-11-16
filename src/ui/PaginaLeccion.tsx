import { useEffect } from 'react'
import { buscarLeccion, leccionAnterior, leccionSiguiente, moduloDeLeccion } from '../contenido/indice'
import { useProgreso } from '../estado/progreso'
import { enlaceLeccion, enlaceModulo } from '../router/rutas'
import { BloqueContenido } from './Bloques'
import { Quiz } from './Quiz'
import { Texto } from './Texto'
import { Sandbox } from './Sandbox'

const ETIQUETA_NIVEL: Record<string, string> = {
  intro: 'Intro',
  medio: 'Medio',
  alto: 'Alto',
}

export function PaginaLeccion({ id }: { id: string }) {
  const leccion = buscarLeccion(id)
  const completada = useProgreso((estado) => Boolean(estado.completadas[id]))
  const marcarCompletada = useProgreso((estado) => estado.marcarCompletada)

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [id])

  if (!leccion) {
    return (
      <div className="p-8">
        <h1 className="text-2xl font-semibold">Lección no encontrada</h1>
        <p className="mt-2 text-texto-suave">
          No existe la lección <code className="font-mono">{id}</code>. Puede que el enlace esté mal
          escrito o que esa lección todavía no esté publicada.
        </p>
        <a href="#/" className="mt-4 inline-block text-acento underline">
          Volver al inicio
        </a>
      </div>
    )
  }

  const modulo = moduloDeLeccion(id)
  const anterior = leccionAnterior(id)
  const siguiente = leccionSiguiente(id)

  return (
    <article className="mx-auto max-w-3xl px-4 pb-28 pt-6 sm:px-6 lg:px-8">
      <nav aria-label="Migas de pan" className="flex flex-wrap items-center gap-1.5 text-xs text-texto-tenue">
        <a href="#/" className="hover:text-texto">
          Curso
        </a>
        <span aria-hidden>/</span>
        {modulo && (
          <a href={enlaceModulo(modulo.numero)} className="hover:text-texto">
            Módulo {modulo.numero} · {modulo.titulo}
          </a>
        )}
      </nav>

      <header className="mt-4 border-b border-borde pb-6">
        <div className="flex flex-wrap items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-texto-tenue">
          <span className="rounded border border-borde px-1.5 py-0.5 text-acento">Lección {leccion.id}</span>
          <span>{ETIQUETA_NIVEL[leccion.nivel]}</span>
          <span aria-hidden>·</span>
          <span>≈ {leccion.minutos} min</span>
          {completada && (
            <span className="rounded bg-exito/15 px-1.5 py-0.5 text-exito">completada</span>
          )}
        </div>

        <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
        <Texto>{leccion.titulo}</Texto>
      </h1>

        <p className="mt-3 border-l-2 border-acento/60 pl-3 text-[15px] leading-7 text-texto-suave">
          <span className="font-semibold text-texto">Al terminar sabrás </span>
          <Texto>{leccion.objetivo.charAt(0).toLowerCase() + leccion.objetivo.slice(1)}</Texto>
        </p>
      </header>

      <div className="mt-8 space-y-6">
        {leccion.bloques.map((bloque, i) => (
          <BloqueContenido key={i} bloque={bloque} />
        ))}
      </div>

      {leccion.errores.length > 0 && (
        <section aria-labelledby="errores" className="mt-12">
          <h2 id="errores" className="text-xl font-semibold">
            Errores típicos y cómo depurarlos
          </h2>
          <div className="mt-4 overflow-x-auto rounded-caja border border-borde">
            <table className="w-full border-collapse text-left text-sm">
              <thead>
                <tr className="bg-superficie-alta/60">
                  <th scope="col" className="px-3 py-2 text-xs uppercase tracking-wider text-texto-tenue">
                    Síntoma
                  </th>
                  <th scope="col" className="px-3 py-2 text-xs uppercase tracking-wider text-texto-tenue">
                    Causa
                  </th>
                  <th scope="col" className="px-3 py-2 text-xs uppercase tracking-wider text-texto-tenue">
                    Arreglo
                  </th>
                </tr>
              </thead>
              <tbody>
                {leccion.errores.map((error, i) => (
                  <tr key={i} className="border-t border-borde/60 align-top">
                    <td className="px-3 py-2.5 text-texto"><Texto>{error.sintoma}</Texto></td>
                    <td className="px-3 py-2.5 text-texto-suave"><Texto>{error.causa}</Texto></td>
                    <td className="px-3 py-2.5 text-texto-suave"><Texto>{error.arreglo}</Texto></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {leccion.ejercicio && (
        <div className="mt-12">
          <Sandbox ejercicio={leccion.ejercicio} />
        </div>
      )}

      <div className="mt-12">
        <Quiz leccionId={leccion.id} preguntas={leccion.quiz} />
      </div>

      <section aria-labelledby="profundizar" className="mt-10">
        <h2 id="profundizar" className="text-xl font-semibold">
          Para profundizar
        </h2>
        <ul className="mt-3 space-y-2">
          {leccion.recursos.map((recurso) => (
            <li key={recurso.url}>
              <a
                href={recurso.url}
                target="_blank"
                rel="noreferrer noopener"
                className="group flex items-start gap-2 rounded-lg border border-transparent px-2 py-1.5 transition hover:border-borde hover:bg-superficie"
              >
                <span aria-hidden className="mt-0.5 text-acento">
                  ↗
                </span>
                <span>
                  <span className="text-sm font-medium text-frio group-hover:underline">
                    <Texto>{recurso.titulo}</Texto>
                  </span>
                  {recurso.nota && (
                    <span className="block text-xs text-texto-tenue">{recurso.nota}</span>
                  )}
                </span>
              </a>
            </li>
          ))}
        </ul>
      </section>

      <div className="mt-10 flex flex-wrap items-center gap-3 rounded-caja border border-borde bg-superficie p-4">
        <button
          type="button"
          onClick={() => marcarCompletada(leccion.id, !completada)}
          aria-pressed={completada}
          className={`rounded-lg px-4 py-2 text-sm font-semibold transition ${
            completada
              ? 'border border-exito/50 bg-exito/10 text-exito'
              : 'bg-acento text-fondo hover:bg-acento-alto'
          }`}
        >
          {completada ? '✓ Lección completada' : 'Marcar como completada'}
        </button>
        <p className="text-xs text-texto-tenue">
          El progreso se guarda en tu navegador, en localStorage.
        </p>
      </div>

      <nav aria-label="Navegación entre lecciones" className="mt-8 grid gap-3 sm:grid-cols-2">
        {anterior ? (          <a
            href={enlaceLeccion(anterior.id)}
            className="group rounded-caja border border-borde p-3 transition hover:border-acento/40 hover:bg-superficie"
          >
            <span className="font-mono text-[10px] uppercase tracking-widest text-texto-tenue">
              ← Anterior · {anterior.id}
            </span>
            <span className="mt-0.5 block text-sm font-medium group-hover:text-acento">
              <Texto>{anterior.titulo}</Texto>
            </span>
          </a>
        ) : (
          <span />
        )}
        {siguiente && (
          <a
            href={enlaceLeccion(siguiente.id)}
            className="group rounded-caja border border-borde p-3 text-right transition hover:border-acento/40 hover:bg-superficie sm:col-start-2"
          >
            <span className="font-mono text-[10px] uppercase tracking-widest text-texto-tenue">
              Siguiente · {siguiente.id} →
            </span>
            <span className="mt-0.5 block text-sm font-medium group-hover:text-acento">
              <Texto>{siguiente.titulo}</Texto>
            </span>
          </a>
        )}
      </nav>

      {siguiente && (
        <div className="fixed inset-x-0 bottom-0 z-30 border-t border-borde bg-fondo/95 p-2 backdrop-blur lg:hidden">
          <a
            href={enlaceLeccion(siguiente.id)}
            className="flex items-center gap-3 rounded-lg bg-acento px-3 py-2 text-fondo"
          >
            <span className="shrink-0 text-[11px] font-bold uppercase tracking-wider">
              Siguiente
            </span>
            <span className="min-w-0 flex-1 truncate text-xs font-medium"><Texto>{siguiente.titulo}</Texto></span>
            <span aria-hidden>→</span>
          </a>
        </div>
      )}
    </article>
  )
}

import { useMemo, useState } from 'react'
import type { Pregunta } from '../contenido/tipos'
import { useProgreso } from '../estado/progreso'
import { Texto } from './Texto'

type Respuesta = number | number[] | boolean

type Props = {
  leccionId: string
  preguntas: Pregunta[]
}

function respondida(pregunta: Pregunta, respuesta: Respuesta | undefined): boolean {
  if (respuesta === undefined) return false
  if (pregunta.tipo === 'multiple') return Array.isArray(respuesta) && respuesta.length > 0
  if (pregunta.tipo === 'unica') return typeof respuesta === 'number' && respuesta >= 0
  return typeof respuesta === 'boolean'
}

function esCorrecta(pregunta: Pregunta, respuesta: Respuesta | undefined): boolean {
  if (respuesta === undefined) return false
  switch (pregunta.tipo) {
    case 'unica':
      return respuesta === pregunta.correcta
    case 'verdadero-falso':
      return respuesta === pregunta.correcta
    case 'multiple': {
      if (!Array.isArray(respuesta)) return false
      const elegidas = [...respuesta].sort()
      const correctas = [...pregunta.correctas].sort()
      return elegidas.length === correctas.length && elegidas.every((v, i) => v === correctas[i])
    }
  }
}

export function Quiz({ leccionId, preguntas }: Props) {
  const guardarQuiz = useProgreso((estado) => estado.guardarQuiz)
  const anterior = useProgreso((estado) => estado.quizzes[leccionId])

  const [respuestas, setRespuestas] = useState<Record<number, Respuesta>>({})
  const [corregido, setCorregido] = useState(false)

  const totalRespondidas = useMemo(
    () => preguntas.filter((p, i) => respondida(p, respuestas[i])).length,
    [preguntas, respuestas],
  )

  const aciertos = useMemo(
    () => preguntas.filter((p, i) => esCorrecta(p, respuestas[i])).length,
    [preguntas, respuestas],
  )

  function elegirUnica(indice: number, opcion: number) {
    setRespuestas((previas) => ({ ...previas, [indice]: opcion }))
    setCorregido(false)
  }

  function alternarMultiple(indice: number, opcion: number) {
    setRespuestas((previas) => {
      const actual = previas[indice]
      const lista = Array.isArray(actual) ? actual : []
      const siguiente = lista.includes(opcion)
        ? lista.filter((v) => v !== opcion)
        : [...lista, opcion]
      return { ...previas, [indice]: siguiente }
    })
    setCorregido(false)
  }

  function elegirBooleano(indice: number, valor: boolean) {
    setRespuestas((previas) => ({ ...previas, [indice]: valor }))
    setCorregido(false)
  }

  function corregir() {
    setCorregido(true)
    guardarQuiz(leccionId, aciertos, preguntas.length)
  }

  function reiniciar() {
    setRespuestas({})
    setCorregido(false)
  }

  return (
    <section aria-labelledby="quiz-titulo" className="tarjeta p-5">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h2 id="quiz-titulo" className="text-lg font-semibold">
          Comprueba que lo tienes
        </h2>
        <span className="font-mono text-xs text-texto-tenue">
          {preguntas.length} preguntas
          {anterior ? ` · mejor: ${anterior.aciertos}/${anterior.total}` : ''}
        </span>
      </div>

      <ol className="mt-5 space-y-6">
        {preguntas.map((pregunta, indice) => {
          const respuesta = respuestas[indice]
          const acertada = esCorrecta(pregunta, respuesta)

          return (
            <li key={indice}>
              <fieldset>
                <legend className="flex gap-2 text-sm font-medium">
                  <span className="font-mono text-texto-tenue">{indice + 1}.</span>
                  <span>
                <Texto>{pregunta.enunciado}</Texto>
              </span>
                  {pregunta.tipo === 'multiple' && (
                    <span className="font-mono text-[11px] text-texto-tenue">(varias)</span>
                  )}
                </legend>

                <div className="mt-3 grid gap-2">
                  {opcionesDe(pregunta).map((opcion, i) => {
                    const seleccionada = seleccionada_(pregunta, respuesta, i)
                    const esLaCorrecta = esCorrectaLaOpcion(pregunta, i)
                    const mostrarEstado = corregido

                    const base =
                      'flex w-full items-start gap-3 rounded-lg border px-3 py-2 text-left text-sm transition'
                    let aspecto =
                      'border-borde bg-fondo-alto hover:border-texto-tenue hover:bg-superficie-alta'
                    if (seleccionada) aspecto = 'border-acento/60 bg-acento/10'
                    if (mostrarEstado && esLaCorrecta)
                      aspecto = 'border-exito/60 bg-exito/10 text-texto'
                    if (mostrarEstado && seleccionada && !esLaCorrecta)
                      aspecto = 'border-error/60 bg-error/10'

                    return (
                      <button
                        key={i}
                        type="button"
                        aria-pressed={seleccionada}
                        onClick={() => {
                          if (pregunta.tipo === 'multiple') alternarMultiple(indice, i)
                          else if (pregunta.tipo === 'unica') elegirUnica(indice, i)
                          else elegirBooleano(indice, i === 0)
                        }}
                        className={`${base} ${aspecto}`}
                      >
                        <span
                          aria-hidden
                          className={`mt-0.5 grid size-4 shrink-0 place-items-center border font-mono text-[10px] ${
                            pregunta.tipo === 'multiple' ? 'rounded-[3px]' : 'rounded-full'
                          } ${
                            seleccionada
                              ? 'border-acento bg-acento text-fondo'
                              : 'border-borde text-transparent'
                          }`}
                        >
                          ✓
                        </span>
                        <span>
                      <Texto>{opcion}</Texto>
                    </span>
                      </button>
                    )
                  })}
                </div>
              </fieldset>

              {corregido && (
                <p
                  className={`mt-2 rounded-lg border px-3 py-2 text-xs ${
                    acertada
                      ? 'border-exito/40 bg-exito/5 text-texto-suave'
                      : 'border-error/40 bg-error/5 text-texto-suave'
                  }`}
                >
                  <strong className={acertada ? 'text-exito' : 'text-error'}>
                    {acertada ? 'Correcto. ' : 'Revisa esto. '}
                  </strong>
                  <Texto>{pregunta.explicacion}</Texto>
                </p>
              )}
            </li>
          )
        })}
      </ol>

      <div className="mt-6 flex flex-wrap items-center gap-3">
        {corregido ? (
          <>
            <p className="text-sm font-medium">
              {aciertos} de {preguntas.length}
              {aciertos === preguntas.length ? ' — perfecto.' : ' — vuelve a intentarlo.'}
            </p>
            <button
              type="button"
              onClick={reiniciar}
              className="rounded-lg border border-borde px-3 py-1.5 text-sm font-medium transition hover:bg-superficie-alta"
            >
              Repetir el quiz
            </button>
          </>
        ) : (
          <>
            <button
              type="button"
              onClick={corregir}
              disabled={totalRespondidas < preguntas.length}
              className="rounded-lg bg-acento px-4 py-1.5 text-sm font-semibold text-fondo transition hover:bg-acento-alto disabled:cursor-not-allowed disabled:opacity-40"
            >
              Corregir
            </button>
            <span className="font-mono text-xs text-texto-tenue">
              {totalRespondidas}/{preguntas.length} respondidas
            </span>
          </>
        )}
      </div>
    </section>
  )
}

function opcionesDe(pregunta: Pregunta): string[] {
  if (pregunta.tipo === 'verdadero-falso') return ['Verdadero', 'Falso']
  return pregunta.opciones
}

function seleccionada_(pregunta: Pregunta, respuesta: Respuesta | undefined, i: number): boolean {
  if (respuesta === undefined) return false
  if (pregunta.tipo === 'multiple') return Array.isArray(respuesta) && respuesta.includes(i)
  if (pregunta.tipo === 'unica') return respuesta === i
  return respuesta === (i === 0)
}

function esCorrectaLaOpcion(pregunta: Pregunta, i: number): boolean {
  if (pregunta.tipo === 'multiple') return pregunta.correctas.includes(i)
  if (pregunta.tipo === 'unica') return pregunta.correcta === i
  return pregunta.correcta === (i === 0)
}

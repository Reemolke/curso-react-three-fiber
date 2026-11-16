import { Fragment, type ReactNode } from 'react'

/**
 * Texto enriquecido de las lecciones.
 *
 * El contenido se escribe en TypeScript con un subconjunto mínimo de Markdown:
 * `**negrita**` y `` `código` `` en línea. No se usa un parser completo a
 * propósito (ni `dangerouslySetInnerHTML`): el temario es nuestro, el
 * subconjunto es suficiente y así no hay forma de inyectar HTML desde una
 * lección.
 *
 * El `split` con grupo de captura conserva los separadores, de modo que se
 * puede recorrer el resultado y decidir qué es texto y qué es marcado.
 */
const PATRON = /(`[^`]+`|\*\*[^*]+\*\*)/g

/** Convierte el marcado en línea en nodos de React. */
export function Texto({ children }: { children: string }): ReactNode {
  return (
    <>
      {children.split(PATRON).map((pieza, indice) => {
        if (pieza.length > 2 && pieza.startsWith('`') && pieza.endsWith('`')) {
          return (
            <code
              key={indice}
              className="rounded bg-superficie-alta px-1 py-px font-mono text-[0.9em] text-acento normal-case"
            >
              {pieza.slice(1, -1)}
            </code>
          )
        }

        if (pieza.length > 4 && pieza.startsWith('**') && pieza.endsWith('**')) {
          return (
            <strong key={indice} className="font-semibold text-texto">
              {pieza.slice(2, -2)}
            </strong>
          )
        }

        return <Fragment key={indice}>{pieza}</Fragment>
      })}
    </>
  )
}

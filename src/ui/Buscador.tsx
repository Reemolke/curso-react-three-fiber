import { useEffect, useMemo, useRef, useState } from 'react'
import { buscarEnCurso } from '../contenido/indice'
import { enlaceLeccion } from '../router/rutas'
import { Texto } from './Texto'

type Props = {
  abierto: boolean
  alCerrar: () => void
}

const MAX_RESULTADOS = 12

export function Buscador({ abierto, alCerrar }: Props) {
  const [consulta, setConsulta] = useState('')
  const [seleccion, setSeleccion] = useState(0)
  const entrada = useRef<HTMLInputElement>(null)

  const resultados = useMemo(() => buscarEnCurso(consulta).slice(0, MAX_RESULTADOS), [consulta])

  useEffect(() => {
    if (!abierto) return
    setConsulta('')
    setSeleccion(0)
    const temporizador = window.setTimeout(() => entrada.current?.focus(), 30)
    return () => window.clearTimeout(temporizador)
  }, [abierto])

  useEffect(() => {
    if (!abierto) return
    const alPulsar = (evento: KeyboardEvent) => {
      if (evento.key === 'Escape') {
        evento.preventDefault()
        alCerrar()
      }
    }
    window.addEventListener('keydown', alPulsar)
    const desbordamiento = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', alPulsar)
      document.body.style.overflow = desbordamiento
    }
  }, [abierto, alCerrar])

  if (!abierto) return null

  function abrir(indice: number) {
    const resultado = resultados[indice]
    if (!resultado) return
    window.location.hash = enlaceLeccion(resultado.leccion.id)
    alCerrar()
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center bg-fondo/70 p-4 pt-[10vh] backdrop-blur-sm"
      onClick={alCerrar}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Buscar en el curso"
        onClick={(evento) => evento.stopPropagation()}
        className="w-full max-w-xl overflow-hidden rounded-caja border border-borde bg-superficie shadow-flotante"
      >
        <div className="flex items-center gap-2 border-b border-borde px-3">
          <svg
            aria-hidden
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="text-texto-tenue"
          >
            <circle cx="11" cy="11" r="7" />
            <path d="m20 20-3.5-3.5" strokeLinecap="round" />
          </svg>
          <input
            ref={entrada}
            value={consulta}
            onChange={(evento) => {
              setConsulta(evento.target.value)
              setSeleccion(0)
            }}
            onKeyDown={(evento) => {
              if (evento.key === 'ArrowDown') {
                evento.preventDefault()
                setSeleccion((s) => Math.min(s + 1, resultados.length - 1))
              } else if (evento.key === 'ArrowUp') {
                evento.preventDefault()
                setSeleccion((s) => Math.max(s - 1, 0))
              } else if (evento.key === 'Enter') {
                evento.preventDefault()
                abrir(seleccion)
              }
            }}
            placeholder="Busca «useFrame», «Draco», «sombras»…"
            aria-label="Término de búsqueda"
            className="h-12 flex-1 bg-transparent text-sm outline-none placeholder:text-texto-tenue"
          />
          <kbd className="rounded border border-borde px-1.5 py-0.5 font-mono text-[10px] text-texto-tenue">
            Esc
          </kbd>
        </div>

        <div className="max-h-[55vh] overflow-y-auto p-2">
          {consulta.trim().length < 2 && (
            <p className="px-3 py-6 text-center text-xs text-texto-tenue">
              Escribe al menos dos letras. Se busca en títulos, objetivos y texto de las lecciones.
            </p>
          )}

          {consulta.trim().length >= 2 && resultados.length === 0 && (
            <p className="px-3 py-6 text-center text-xs text-texto-tenue">
              Nada por aquí. Prueba con el nombre de la API o el concepto.
            </p>
          )}

          {resultados.map((resultado, indice) => (
            <button
              key={resultado.leccion.id}
              type="button"
              onClick={() => abrir(indice)}
              onMouseEnter={() => setSeleccion(indice)}
              className={`block w-full rounded-lg px-3 py-2 text-left transition ${
                indice === seleccion ? 'bg-acento/10 ring-1 ring-acento/30' : 'hover:bg-superficie-alta'
              }`}
            >
              <span className="flex items-baseline gap-2">
                <span className="font-mono text-[10px] text-acento">{resultado.leccion.id}</span>
                <span className="text-sm font-medium"><Texto>{resultado.leccion.titulo}</Texto></span>
              </span>
              <span className="mt-0.5 block truncate text-xs text-texto-tenue">
                Módulo {resultado.modulo.numero} · <Texto>{resultado.modulo.titulo}</Texto>
                {resultado.contexto ? ` — ${resultado.contexto}` : ''}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

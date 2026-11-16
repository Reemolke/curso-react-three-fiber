import { useState, type ReactNode } from 'react'

type Props = {
  codigo: string
  lenguaje?: string
  titulo?: string
  /** Oculta el botón de copiar (por ejemplo en fragmentos de una línea). */
  copiable?: boolean
}

/**
 * Visor de código con resaltado mínimo y botón de copiar.
 *
 * No se usa Prism ni Shiki a propósito: añadir un resaltador completo engorda el
 * bundle de una página que ya carga three.js. Este tokenizador cubre lo que
 * aparece en el curso (comentarios, cadenas, palabras clave y números).
 */
export function Codigo({ codigo, lenguaje, titulo, copiable = true }: Props) {
  const [copiado, setCopiado] = useState(false)

  async function copiar() {
    try {
      await navigator.clipboard.writeText(codigo)
      setCopiado(true)
      window.setTimeout(() => setCopiado(false), 1600)
    } catch {
      // Sin permiso de portapapeles: no es un fallo que deba romper la lección.
    }
  }

  return (
    <div className="group relative overflow-hidden rounded-caja border border-borde bg-fondo-alto">
      <div className="flex items-center justify-between gap-3 border-b border-borde/70 px-3 py-1.5">
        <span className="truncate font-mono text-[11px] uppercase tracking-widest text-texto-tenue">
          {titulo ?? lenguaje ?? 'código'}
        </span>
        {copiable && (
          <button
            type="button"
            onClick={copiar}
            className="rounded-md border border-transparent px-2 py-0.5 font-mono text-[11px] text-texto-tenue transition hover:border-borde hover:text-texto"
          >
            {copiado ? 'copiado ✓' : 'copiar'}
          </button>
        )}
      </div>
      <pre className="overflow-x-auto p-3 font-mono text-[12.5px] leading-relaxed">
        <code>{resaltar(codigo)}</code>
      </pre>
    </div>
  )
}

const PALABRAS =
  'import|from|export|const|let|var|function|return|if|else|for|of|in|new|class|extends|type|interface|as|default|await|async|true|false|null|undefined|void|number|string|boolean|useState|useRef|useMemo|useEffect'

const PATRON = new RegExp(
  [
    '\\/\\/[^\\n]*',
    '\\/\\*[\\s\\S]*?\\*\\/',
    "'(?:[^'\\\\]|\\\\.)*'",
    '"(?:[^"\\\\]|\\\\.)*"',
    '`(?:[^`\\\\]|\\\\.)*`',
    `\\b(?:${PALABRAS})\\b`,
    '\\b\\d+(?:\\.\\d+)?\\b',
    '&lt;|&gt;', // no aplica, el texto va sin escapar: se deja por claridad
  ].join('|'),
  'g',
)

function resaltar(codigo: string): ReactNode[] {
  const nodos: ReactNode[] = []
  let ultimo = 0

  for (const coincidencia of codigo.matchAll(PATRON)) {
    const indice = coincidencia.index ?? 0
    if (indice > ultimo) nodos.push(codigo.slice(ultimo, indice))

    const token = coincidencia[0]
    let clase = 'text-acento'
    if (token.startsWith('//') || token.startsWith('/*')) clase = 'italic text-texto-tenue'
    else if (/^['"`]/.test(token)) clase = 'text-exito'
    else if (/^\d/.test(token)) clase = 'text-frio'
    else if (/^(true|false|null|undefined)$/.test(token)) clase = 'text-error'

    nodos.push(
      <span key={`${indice}-${token}`} className={clase}>
        {token}
      </span>,
    )
    ultimo = indice + token.length
  }

  if (ultimo < codigo.length) nodos.push(codigo.slice(ultimo))
  return nodos
}

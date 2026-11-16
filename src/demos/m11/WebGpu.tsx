import { useEffect, useState } from 'react'
import { Marco } from '../marco'

type Estado = 'comprobando' | 'adaptador' | 'sin-soporte' | 'sin-adaptador'

const ETIQUETAS: Record<Estado, string> = {
  comprobando: 'comprobando…',
  adaptador: 'WebGPU disponible',
  'sin-soporte': 'sin navigator.gpu',
  'sin-adaptador': 'sin adaptador',
}

const COLORES: Record<Estado, string> = {
  comprobando: 'border-borde text-texto-suave',
  adaptador: 'border-exito/40 text-exito',
  'sin-soporte': 'border-borde text-texto-tenue',
  'sin-adaptador': 'border-aviso/40 text-aviso',
}

const CODIGO = `import { WebGPURenderer } from 'three/webgpu'
import * as THREE from 'three/webgpu'

const renderer = new WebGPURenderer({ antialias: true })
await renderer.init()

// En R3F, el renderer se pasa por la prop \`gl\` del Canvas:
<Canvas gl={async (props) => {
  const r = new WebGPURenderer({ ...props, antialias: true })
  await r.init()
  return r
}} />`

/**
 * Comprobación de WebGPU sin ejecutar WebGPU.
 *
 * Esta web se renderiza con WebGL a propósito: WebGPU no está en todos los
 * navegadores y el curso tiene que funcionar igual en todos. El widget solo
 * pregunta si hay adaptador y enseña lo que el navegador quiera contar.
 */
export default function WebGpu() {
  const [estado, setEstado] = useState<Estado>('comprobando')
  const [datos, setDatos] = useState<string[]>([])

  useEffect(() => {
    let vivo = true
    const navegador = navigator as unknown as {
      gpu?: { requestAdapter: () => Promise<unknown> }
    }

    if (!navegador.gpu) {
      setEstado('sin-soporte')
      return
    }

    navegador.gpu
      .requestAdapter()
      .then((adaptador) => {
        if (!vivo) return
        if (!adaptador) {
          setEstado('sin-adaptador')
          return
        }
        const info = (adaptador as { info?: Record<string, unknown> }).info
        if (info) {
          setDatos(
            Object.entries(info)
              .filter(([, valor]) => typeof valor === 'string' || typeof valor === 'number')
              .map(([clave, valor]) => `${clave}: ${String(valor)}`),
          )
        }
        setEstado('adaptador')
      })
      .catch(() => {
        if (vivo) setEstado('sin-adaptador')
      })

    return () => {
      vivo = false
    }
  }, [])

  return (
    <Marco titulo="¿Tu navegador tiene WebGPU?">
      <div className="space-y-4 p-4">
        <div className="flex flex-wrap items-center gap-3">
          <span
            className={`rounded-lg border px-2.5 py-1 font-mono text-xs ${COLORES[estado]}`}
          >
            {ETIQUETAS[estado]}
          </span>
          <span className="text-xs text-texto-suave">
            La comprobación no crea ningún dispositivo: solo pide un adaptador.
          </span>
        </div>

        {datos.length > 0 && (
          <pre className="overflow-x-auto rounded-lg border border-borde bg-fondo/70 p-3 font-mono text-[11px] leading-relaxed text-texto-suave">
            {datos.join('\n')}
          </pre>
        )}

        <pre className="overflow-x-auto rounded-lg border border-borde bg-fondo/70 p-3 font-mono text-[11px] leading-relaxed text-texto">
          <code>{CODIGO}</code>
        </pre>

        <div className="grid gap-3 text-xs text-texto-suave sm:grid-cols-2">
          <div className="rounded-lg border border-borde bg-superficie/40 p-3">
            <p className="mb-1 font-semibold text-texto">WebGL 2 (lo que usa este curso)</p>
            <p>
              Disponible en todos los navegadores modernos. Shaders en GLSL. Es el camino que
              entiende cualquier móvil de los últimos ocho años.
            </p>
          </div>
          <div className="rounded-lg border border-borde bg-superficie/40 p-3">
            <p className="mb-1 font-semibold text-texto">WebGPU (el relevo)</p>
            <p>
              Requiere un navegador y una GPU compatibles. Shaders en WGSL y TSL. Más trabajo por
              hilo y menos coste de dibujado, pero todavía no universal.
            </p>
          </div>
        </div>

        <p className="text-xs text-texto-tenue">
          Esta página no ejecuta WebGPU aunque tu equipo la soporte: el curso entero se renderiza
          con WebGL para que todas las lecciones funcionen en el mismo navegador. El día que migres,
          el cambio es el renderer y los materiales; la escena, los hooks y la cámara se quedan.
        </p>
      </div>
    </Marco>
  )
}

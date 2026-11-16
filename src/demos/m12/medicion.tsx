import { useEffect, useRef, type RefObject } from 'react'
import { useFrame, useThree } from '@react-three/fiber'

/**
 * Medición de rendimiento compartida por las demos del módulo 12.
 *
 * La regla es la misma en las seis lecciones: se mide dentro del bucle de
 * render y se escribe **en el DOM**, no en el estado de React. Publicar los fps
 * con `setState` cada medio segundo provoca renders de React que ensucian la
 * propia medición; escribir `textContent` no.
 */

/** Referencias a los cinco huecos del panel de métricas. */
export type Salidas = {
  fps: RefObject<HTMLSpanElement | null>
  ms: RefObject<HTMLSpanElement | null>
  llamadas: RefObject<HTMLSpanElement | null>
  triangulos: RefObject<HTMLSpanElement | null>
  memoria: RefObject<HTMLSpanElement | null>
}

/** Crea las cinco referencias. Se llama en el componente de fuera del canvas. */
export function useSalidas(): Salidas {
  const fps = useRef<HTMLSpanElement>(null)
  const ms = useRef<HTMLSpanElement>(null)
  const llamadas = useRef<HTMLSpanElement>(null)
  const triangulos = useRef<HTMLSpanElement>(null)
  const memoria = useRef<HTMLSpanElement>(null)
  return { fps, ms, llamadas, triangulos, memoria }
}

/** Escribe solo si el texto cambia: evita repintados inútiles del navegador. */
function escribir(ref: RefObject<HTMLElement | null>, texto: string): void {
  const nodo = ref.current
  if (nodo && nodo.textContent !== texto) nodo.textContent = texto
}

function miles(valor: number): string {
  if (valor < 1000) return String(valor)
  return `${(valor / 1000).toFixed(1).replace('.', ',')} k`
}

/**
 * Muestreador: vive dentro del `<Canvas>`.
 *
 * Cada 400 ms calcula fps, tiempo medio de frame, draw calls, triángulos y
 * memoria de GPU a partir de `gl.info`, y los vuelca en el DOM.
 */
export function Medidor({ salidas }: { salidas: Salidas }) {
  const gl = useThree((estado) => estado.gl)
  const acumulado = useRef(0)
  const frames = useRef(0)
  const tiempo = useRef(0)

  // Con `EffectComposer` hay varios renders por frame y `gl.info` se reinicia en
  // cada uno: sin esto, solo se leería el último pase (un cuadrilátero).
  useEffect(() => {
    gl.info.autoReset = false
    return () => {
      gl.info.autoReset = true
    }
  }, [gl])

  useFrame((_, delta) => {
    acumulado.current += delta
    frames.current += 1
    tiempo.current += delta * 1000

    if (acumulado.current >= 0.4) {
      escribir(salidas.fps, String(Math.round(frames.current / acumulado.current)))
      escribir(salidas.ms, (tiempo.current / frames.current).toFixed(2))
      escribir(salidas.llamadas, String(gl.info.render.calls))
      escribir(salidas.triangulos, miles(gl.info.render.triangles))
      escribir(salidas.memoria, `${gl.info.memory.geometries}/${gl.info.memory.textures}`)

      acumulado.current = 0
      frames.current = 0
      tiempo.current = 0
    }

    // Se lee lo acumulado del frame anterior y se abre el siguiente.
    gl.info.reset()
  })

  return null
}

const DATOS: { clave: keyof Salidas; etiqueta: string; ayuda: string }[] = [
  { clave: 'fps', etiqueta: 'fps', ayuda: 'frames por segundo reales' },
  { clave: 'ms', etiqueta: 'ms/frame', ayuda: '16,7 ms es el presupuesto a 60 fps' },
  { clave: 'llamadas', etiqueta: 'draw calls', ayuda: 'una por malla visible' },
  { clave: 'triangulos', etiqueta: 'triángulos', ayuda: 'los que llegan a la GPU' },
  { clave: 'memoria', etiqueta: 'geo/tex', ayuda: 'geometrías y texturas en GPU' },
]

/** Panel de lectura. Vive **fuera** del canvas, junto a los controles. */
export function PanelMetricas({ salidas }: { salidas: Salidas }) {
  return (
    <dl className="grid w-full grid-cols-2 gap-2 sm:grid-cols-5">
      {DATOS.map((dato) => (
        <div key={dato.clave} className="rounded-lg border border-borde bg-fondo/60 px-2.5 py-1.5">
          <dt className="font-mono text-[10px] uppercase tracking-wider text-texto-tenue">
            {dato.etiqueta}
          </dt>
          <dd className="font-mono text-sm text-texto" title={dato.ayuda}>
            <span ref={salidas[dato.clave]}>—</span>
          </dd>
        </div>
      ))}
    </dl>
  )
}

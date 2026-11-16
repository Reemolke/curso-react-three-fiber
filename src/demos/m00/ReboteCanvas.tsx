import { useEffect, useRef, useState } from 'react'
import { Interruptor, Marco } from '../marco'

const ALTO = 260
const RADIO = 16
/** Píxeles por frame cuando NO se usa delta (el error clásico). */
const PASO_FIJO = 4.5

type Medidas = { fps: number; delta: number }

/**
 * 0.3 — El bucle de dibujo a mano.
 *
 * Un canvas 2D con requestAnimationFrame. No hay React Three Fiber todavía: el
 * objetivo es ver con los ojos qué es el `delta` y por qué una animación que
 * suma una constante por frame se rompe cuando cambia la tasa de refresco.
 */
export default function ReboteCanvas() {
  const lienzo = useRef<HTMLCanvasElement>(null)
  const contenedor = useRef<HTMLDivElement>(null)

  const [usarDelta, setUsarDelta] = useState(true)
  const [simularLento, setSimularLento] = useState(false)
  const [medidas, setMedidas] = useState<Medidas>({ fps: 0, delta: 0 })

  // Los valores que lee el bucle van en refs: si dependieran del estado, cada
  // cambio volvería a montar el bucle y perderíamos la continuidad.
  const usarDeltaRef = useRef(usarDelta)
  const lentoRef = useRef(simularLento)
  usarDeltaRef.current = usarDelta
  lentoRef.current = simularLento

  useEffect(() => {
    const canvas = lienzo.current
    const caja = contenedor.current
    if (!canvas || !caja) return
    const contexto = canvas.getContext('2d')
    if (!contexto) return

    let ancho = caja.clientWidth
    let dpr = Math.min(window.devicePixelRatio || 1, 2)

    const ajustar = () => {
      ancho = caja.clientWidth
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = Math.round(ancho * dpr)
      canvas.height = Math.round(ALTO * dpr)
      canvas.style.width = `${ancho}px`
      canvas.style.height = `${ALTO}px`
      contexto.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    ajustar()

    const observador = new ResizeObserver(ajustar)
    observador.observe(caja)

    const cuerpo = { x: ancho / 2, y: ALTO / 2, vx: 190, vy: 150 }
    const estela: { x: number; y: number }[] = []

    let raf = 0
    let ultimo = performance.now()
    let ultimoDibujo = performance.now()
    let frames = 0
    let ventanaFps = performance.now()

    const dibujar = (ahora: number) => {
      raf = requestAnimationFrame(dibujar)

      // Simulación de 20 fps: se descartan frames a propósito.
      if (lentoRef.current && ahora - ultimoDibujo < 1000 / 20) return
      ultimoDibujo = ahora

      const dtCrudo = (ahora - ultimo) / 1000
      ultimo = ahora
      const dt = Math.min(dtCrudo, 0.05)

      // Aquí está toda la lección: cómo se avanza la posición.
      if (usarDeltaRef.current) {
        cuerpo.x += cuerpo.vx * dt
        cuerpo.y += cuerpo.vy * dt
      } else {
        cuerpo.x += Math.sign(cuerpo.vx) * PASO_FIJO
        cuerpo.y += Math.sign(cuerpo.vy) * PASO_FIJO
      }

      if (cuerpo.x < RADIO) {
        cuerpo.x = RADIO
        cuerpo.vx = Math.abs(cuerpo.vx)
      } else if (cuerpo.x > ancho - RADIO) {
        cuerpo.x = ancho - RADIO
        cuerpo.vx = -Math.abs(cuerpo.vx)
      }
      if (cuerpo.y < RADIO) {
        cuerpo.y = RADIO
        cuerpo.vy = Math.abs(cuerpo.vy)
      } else if (cuerpo.y > ALTO - RADIO) {
        cuerpo.y = ALTO - RADIO
        cuerpo.vy = -Math.abs(cuerpo.vy)
      }

      estela.push({ x: cuerpo.x, y: cuerpo.y })
      if (estela.length > 14) estela.shift()

      contexto.clearRect(0, 0, ancho, ALTO)

      // Rejilla suave para que se aprecie el movimiento.
      contexto.strokeStyle = 'rgba(255,255,255,0.045)'
      contexto.lineWidth = 1
      for (let x = 0; x < ancho; x += 40) {
        contexto.beginPath()
        contexto.moveTo(x + 0.5, 0)
        contexto.lineTo(x + 0.5, ALTO)
        contexto.stroke()
      }
      for (let y = 0; y < ALTO; y += 40) {
        contexto.beginPath()
        contexto.moveTo(0, y + 0.5)
        contexto.lineTo(ancho, y + 0.5)
        contexto.stroke()
      }

      estela.forEach((punto, i) => {
        const t = (i + 1) / estela.length
        contexto.fillStyle = `rgba(245,165,36,${t * 0.18})`
        const lado = RADIO * 2 * t
        contexto.fillRect(punto.x - lado / 2, punto.y - lado / 2, lado, lado)
      })

      contexto.fillStyle = '#f5a524'
      contexto.fillRect(cuerpo.x - RADIO, cuerpo.y - RADIO, RADIO * 2, RADIO * 2)

      // Métricas reales del bucle.
      frames += 1
      if (ahora - ventanaFps >= 500) {
        const fps = Math.round((frames * 1000) / (ahora - ventanaFps))
        setMedidas({ fps, delta: dtCrudo * 1000 })
        frames = 0
        ventanaFps = ahora
      }
    }

    raf = requestAnimationFrame(dibujar)

    return () => {
      cancelAnimationFrame(raf)
      observador.disconnect()
    }
  }, [])

  const velocidadAprox = usarDelta
    ? '190 px por segundo, siempre'
    : simularLento
      ? '4,5 px × 20 fps ≈ 90 px por segundo'
      : '4,5 px × 60 fps ≈ 270 px por segundo'

  return (
    <Marco titulo="requestAnimationFrame, delta y velocidad">
      <div ref={contenedor} className="relative bg-fondo">
        <canvas ref={lienzo} className="block" aria-label="Cuadrado rebotando en un canvas 2D" />
        <div className="pointer-events-none absolute right-2 top-2 rounded-md border border-borde bg-fondo/80 px-2 py-1 font-mono text-[10px] text-texto-suave backdrop-blur">
          {medidas.fps} fps · Δ {medidas.delta.toFixed(1)} ms
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-borde bg-superficie/40 px-3 py-2.5">
        <Interruptor etiqueta="Avanzar con delta" activo={usarDelta} onChange={setUsarDelta} />
        <Interruptor
          etiqueta="Simular 20 fps"
          activo={simularLento}
          onChange={setSimularLento}
        />
        <span className="font-mono text-[11px] text-texto-tenue">{velocidadAprox}</span>
      </div>

      <p className="border-t border-borde/60 bg-fondo-alto/60 px-3 py-2 text-xs text-texto-tenue">
        Desactiva «delta», activa «20 fps» y mira cómo el cuadrado se arrastra. Vuelve a activar
        «delta»: la velocidad se recupera. Ese es todo el secreto.
      </p>
    </Marco>
  )
}

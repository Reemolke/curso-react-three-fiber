import { useState } from 'react'
import type { PointerEvent } from 'react'
import { Marco } from '../marco'

/**
 * 6.2 — De píxeles a coordenadas normalizadas.
 *
 * R3F no entrega el puntero en píxeles: lo normaliza a NDC, el espacio que
 * entiende la cámara (-1 a 1 en los dos ejes). Este widget enseña el mapeo sin
 * abrir un contexto WebGL.
 */
export default function WidgetNdc() {
  const [punto, setPunto] = useState({ x: 0.5, y: 0.5 })

  const mover = (evento: PointerEvent<HTMLDivElement>) => {
    const caja = evento.currentTarget.getBoundingClientRect()
    setPunto({
      x: (evento.clientX - caja.left) / caja.width,
      y: (evento.clientY - caja.top) / caja.height,
    })
  }

  const ndcX = punto.x * 2 - 1
  const ndcY = -(punto.y * 2 - 1)

  return (
    <Marco titulo="Del píxel a NDC: los dos ejes que ve la cámara">
      <div className="grid gap-3 p-3 sm:grid-cols-[1fr_auto]">
        <div
          onPointerMove={mover}
          className="relative h-52 cursor-crosshair overflow-hidden rounded-lg border border-borde bg-[radial-gradient(circle_at_50%_50%,oklch(0.26_0.03_265),oklch(0.16_0.014_265))]"
          style={{ touchAction: 'none' }}
        >
          <div className="absolute inset-y-0 left-1/2 w-px bg-borde/70" />
          <div className="absolute inset-x-0 top-1/2 h-px bg-borde/70" />

          <div
            className="absolute inset-y-0 w-px bg-acento/50"
            style={{ left: `${punto.x * 100}%` }}
          />
          <div
            className="absolute inset-x-0 h-px bg-acento/50"
            style={{ top: `${punto.y * 100}%` }}
          />
          <div
            className="absolute size-2.5 rounded-full border border-fondo bg-acento shadow"
            style={{
              left: `${punto.x * 100}%`,
              top: `${punto.y * 100}%`,
              transform: 'translate(-50%, -50%)',
            }}
          />

          <span className="pointer-events-none absolute left-2 top-1.5 font-mono text-[10px] text-texto-tenue">
            -1, 1
          </span>
          <span className="pointer-events-none absolute bottom-1.5 right-2 font-mono text-[10px] text-texto-tenue">
            1, -1
          </span>
          <span className="pointer-events-none absolute bottom-1.5 left-2 text-[11px] text-texto-suave">
            mueve el puntero
          </span>
        </div>

        <dl className="grid content-center gap-2 font-mono text-xs">
          <div className="rounded-lg border border-borde bg-fondo px-3 py-2">
            <dt className="text-[10px] uppercase tracking-widest text-texto-tenue">píxeles</dt>
            <dd className="text-texto">
              {(punto.x * 100).toFixed(0)} % · {(punto.y * 100).toFixed(0)} %
            </dd>
          </div>
          <div className="rounded-lg border border-borde bg-fondo px-3 py-2">
            <dt className="text-[10px] uppercase tracking-widest text-texto-tenue">NDC</dt>
            <dd className="text-texto">
              x {ndcX.toFixed(2)} · y {ndcY.toFixed(2)}
            </dd>
          </div>
        </dl>
      </div>
      <p className="border-t border-borde/60 px-3 py-2 text-xs text-texto-tenue">
        El centro del lienzo es (0, 0). El borde derecho es x = 1 y el superior es y = 1: el eje Y
        va al revés que en CSS. Ese par de valores es exactamente <code>state.pointer</code>.
      </p>
    </Marco>
  )
}

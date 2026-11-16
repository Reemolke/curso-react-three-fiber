import type { ReactNode } from 'react'
import { DemoCanvas } from '../tres/DemoCanvas'

/** Cabecera común de todos los marcos de demo. */
function CabeceraDemo({ titulo, activo }: { titulo: string; activo?: boolean }) {
  return (
    <div className="flex items-center justify-between gap-3 border-b border-borde bg-superficie/50 px-3 py-2">
      <span className="truncate text-xs font-medium tracking-wide text-texto-suave">{titulo}</span>
      <span className="shrink-0 font-mono text-[10px] uppercase tracking-widest text-texto-tenue">
        {activo === undefined ? 'interactivo' : activo ? 'r3f · 60 fps' : 'pausada'}
      </span>
    </div>
  )
}

type MarcoProps = {
  titulo: string
  children: ReactNode
  className?: string
}

/** Marco para demos que no usan WebGL (diagramas, canvas 2D). */
export function Marco({ titulo, children, className }: MarcoProps) {
  return (
    <figure className={`marco-demo ${className ?? ''}`}>
      <CabeceraDemo titulo={titulo} />
      {children}
    </figure>
  )
}

type DemoEscenaProps = {
  titulo: string
  /** Texto para lectores de pantalla. */
  descripcion: string
  children: ReactNode
  /** Controles HTML, siempre fuera del canvas. */
  controles?: ReactNode
  /** Capa HTML sobre el lienzo (pantalla de carga, HUD). */
  capa?: ReactNode
  alto?: number
  camara?: [number, number, number]
  fov?: number
  sombras?: boolean
  nota?: string
}

/**
 * Composición estándar de una demo del curso: lienzo 3D perezoso + controles
 * HTML debajo. Los controles viven fuera de `<Canvas>` a propósito: son React
 * normal, y mezclarlos con la escena es justo lo que confunde al principiante.
 */
export function DemoEscena({
  titulo,
  descripcion,
  children,
  controles,
  capa,
  alto = 340,
  camara,
  fov,
  sombras,
  nota,
}: DemoEscenaProps) {
  return (
    <DemoCanvas
      titulo={titulo}
      descripcion={descripcion}
      alto={alto}
      camara={camara}
      fov={fov}
      sombras={sombras}
      controles={controles}
      capa={capa}
      nota={nota}
    >
      {children}
    </DemoCanvas>
  )
}

/** Grupo de botones excluyentes, para elegir una opción de la demo. */
export function GrupoOpciones<T extends string | number>({
  etiqueta,
  valor,
  opciones,
  onChange,
}: {
  etiqueta: string
  valor: T
  opciones: { valor: T; texto: string }[]
  onChange: (valor: T) => void
}) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-[11px] uppercase tracking-wider text-texto-tenue">{etiqueta}</span>
      <div role="group" aria-label={etiqueta} className="flex overflow-hidden rounded-lg border border-borde">
        {opciones.map((opcion) => (
          <button
            key={String(opcion.valor)}
            type="button"
            aria-pressed={opcion.valor === valor}
            onClick={() => onChange(opcion.valor)}
            className={`px-2.5 py-1 text-xs font-medium transition ${
              opcion.valor === valor
                ? 'bg-acento text-fondo'
                : 'bg-transparent text-texto-suave hover:bg-superficie-alta'
            }`}
          >
            {opcion.texto}
          </button>
        ))}
      </div>
    </div>
  )
}

/** Deslizador con etiqueta y valor visible. */
export function Deslizador({
  etiqueta,
  valor,
  min,
  max,
  paso = 0.01,
  sufijo,
  onChange,
}: {
  etiqueta: string
  valor: number
  min: number
  max: number
  paso?: number
  sufijo?: string
  onChange: (valor: number) => void
}) {
  return (
    <label className="flex items-center gap-2 text-xs text-texto-suave">
      <span className="uppercase tracking-wider text-texto-tenue">{etiqueta}</span>
      <input
        type="range"
        min={min}
        max={max}
        step={paso}
        value={valor}
        onChange={(evento) => onChange(Number(evento.target.value))}
        className="h-1 w-28 cursor-pointer appearance-none rounded-full bg-borde accent-acento"
      />
      <span className="w-12 font-mono text-texto">
        {valor.toFixed(paso >= 1 ? 0 : paso >= 0.1 ? 1 : 2).replace('.', ',')}
        {sufijo}
      </span>
    </label>
  )
}

/** Interruptor con etiqueta, para activar o desactivar una función. */
export function Interruptor({
  etiqueta,
  activo,
  onChange,
}: {
  etiqueta: string
  activo: boolean
  onChange: (activo: boolean) => void
}) {
  return (
    <label className="flex cursor-pointer items-center gap-2 text-xs text-texto-suave">
      <input
        type="checkbox"
        checked={activo}
        onChange={(evento) => onChange(evento.target.checked)}
        className="size-3.5 accent-acento"
      />
      {etiqueta}
    </label>
  )
}

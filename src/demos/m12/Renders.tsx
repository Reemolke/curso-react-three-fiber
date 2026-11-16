import { memo, useEffect, useRef, useState, type RefObject } from 'react'
import { useFrame } from '@react-three/fiber'
import type { Mesh } from 'three'
import { DemoEscena, Deslizador, Interruptor } from '../marco'

type Contadores = {
  escena: number
  sinMemo: number
  conMemo: number
  fps: number
}

/** Caja que gira en `useFrame` y cuenta sus renders de React. */
function CajaSinMemo({ contadores }: { contadores: RefObject<Contadores> }) {
  contadores.current.sinMemo += 1
  const malla = useRef<Mesh>(null)

  useFrame((_, delta) => {
    if (malla.current) malla.current.rotation.y += delta * 0.9
  })

  return (
    <mesh ref={malla} position={[-1.25, 0.6, 0]}>
      <boxGeometry args={[1.1, 1.1, 1.1]} />
      <meshStandardMaterial color="#e05f7a" roughness={0.4} metalness={0.2} />
    </mesh>
  )
}

/** La misma caja, sin `memo`: se re-renderiza con el padre. */
function CajaConMemoBase({ contadores }: { contadores: RefObject<Contadores> }) {
  contadores.current.conMemo += 1
  const malla = useRef<Mesh>(null)

  useFrame((_, delta) => {
    if (malla.current) malla.current.rotation.y -= delta * 0.9
  })

  return (
    <mesh ref={malla} position={[1.25, 0.6, 0]}>
      <boxGeometry args={[1.1, 1.1, 1.1]} />
      <meshStandardMaterial color="#3fbf87" roughness={0.4} metalness={0.2} />
    </mesh>
  )
}

const CajaConMemo = memo(CajaConMemoBase)

/** Cuenta frames dibujados y fps: esto NO es un render de React. */
function Frames({ contadores }: { contadores: RefObject<Contadores> }) {
  const marca = useRef({ tiempo: 0, frames: 0 })

  useFrame((_, delta) => {
    marca.current.tiempo += delta
    marca.current.frames += 1
    if (marca.current.tiempo < 1) return
    contadores.current.fps = Math.round(marca.current.frames / marca.current.tiempo)
    marca.current.tiempo = 0
    marca.current.frames = 0
  })

  return null
}

/** Dentro del canvas: cuenta su propio render y decide qué hijo monta. */
function Escena({
  contadores,
  conMemo,
}: {
  contadores: RefObject<Contadores>
  conMemo: boolean
}) {
  contadores.current.escena += 1

  return (
    <>
      <ambientLight intensity={0.55} />
      <directionalLight position={[4, 7, 5]} intensity={2.4} />

      <CajaSinMemo contadores={contadores} />
      {conMemo ? (
        <CajaConMemo contadores={contadores} />
      ) : (
        <CajaConMemoBase contadores={contadores} />
      )}

      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
        <planeGeometry args={[14, 10]} />
        <meshStandardMaterial color="#151d2e" roughness={0.95} />
      </mesh>

      <Frames contadores={contadores} />
    </>
  )
}

function Dato({ etiqueta, valor, tono }: { etiqueta: string; valor: number; tono: string }) {
  return (
    <div className="rounded-lg border border-borde bg-fondo/60 px-2.5 py-1.5">
      <p className="font-mono text-[10px] uppercase tracking-wider text-texto-tenue">{etiqueta}</p>
      <p className={`font-mono text-sm ${tono}`}>{valor}</p>
    </div>
  )
}

/**
 * Re-renders: React y el bucle de render son dos relojes distintos.
 *
 * Un `setState` en el padre re-renderiza su subárbol de React, pero no dibuja
 * nada por sí mismo: el dibujado lo hace `useFrame` a 60 Hz. El panel separa las
 * dos cuentas: cuántas veces se ha renderizado cada componente y cuántos frames
 * se han dibujado. La caja verde, con `memo`, demuestra que se puede tener un
 * hijo que gira 60 veces por segundo y se re-renderiza cero veces.
 */
export default function Renders() {
  const [periodo, setPeriodo] = useState(700)
  const [conMemo, setConMemo] = useState(true)
  const contadores = useRef<Contadores>({ escena: 0, sinMemo: 0, conMemo: 0, fps: 0 })
  const [, setLatido] = useState(0)

  // El padre cambia de estado cada `periodo` ms: ese es el motor del experimento.
  useEffect(() => {
    const id = window.setInterval(() => setLatido((valor) => valor + 1), periodo)
    return () => window.clearInterval(id)
  }, [periodo])

  return (
    <DemoEscena
      titulo="Quién re-renderiza y por qué"
      descripcion="Dos cajas que giran igual de rápido. La roja se re-renderiza cada vez que su padre cambia de estado; la verde está envuelta en memo y no. Un panel cuenta los renders de cada componente y los frames dibujados por segundo."
      alto={380}
      camara={[0, 3.4, 6.4]}
      controles={
        <div className="w-full space-y-3">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
            <Deslizador
              etiqueta="periodo"
              valor={periodo}
              min={200}
              max={2000}
              paso={100}
              onChange={setPeriodo}
            />
            <Interruptor etiqueta="memo" activo={conMemo} onChange={setConMemo} />
            <button
              type="button"
              onClick={() => {
                contadores.current = { escena: 0, sinMemo: 0, conMemo: 0, fps: 0 }
                setLatido((valor) => valor + 1)
              }}
              className="rounded-lg border border-borde bg-fondo/60 px-2.5 py-1 text-xs text-texto-suave transition hover:border-acento/50 hover:text-texto"
            >
              reiniciar contadores
            </button>
            <span className="ml-auto font-mono text-[11px] text-texto-tenue">
              {conMemo ? 'verde: memo activo' : 'verde: memo desactivado'}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            <Dato etiqueta="escena (padre)" valor={contadores.current.escena} tono="text-texto" />
            <Dato etiqueta="roja sin memo" valor={contadores.current.sinMemo} tono="text-aviso" />
            <Dato
              etiqueta="verde con memo"
              valor={contadores.current.conMemo}
              tono={conMemo ? 'text-exito' : 'text-aviso'}
            />
            <Dato etiqueta="frames dibujados/s" valor={contadores.current.fps} tono="text-acento" />
          </div>
        </div>
      }
      nota="Los contadores se actualizan cuando el padre re-renderiza; por eso la columna «frames» es un número por segundo y no un total. Quita `memo` y verás la cifra verde subir al ritmo de la roja. Nada de eso cambia lo que se dibuja: las dos cajas giran igual, porque el giro vive en `useFrame`, no en el estado."
    >
      <Escena contadores={contadores} conMemo={conMemo} />
    </DemoEscena>
  )
}

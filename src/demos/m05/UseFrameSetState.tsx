import { memo, useEffect, useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import type { Mesh } from 'three'
import { DemoEscena } from '../marco'

type Registro = { current: number }

/**
 * 5.1 — El mismo giro, dos formas de actualizarlo.
 *
 * El cubo azul muta su rotación en `useFrame`: cero renders de React. El cubo
 * naranja llama a `setState` en cada frame: la escena funciona, pero React
 * reconcilia 60 veces por segundo. Los contadores lo dejan a la vista.
 */

const CuboUseFrame = memo(function CuboUseFrame({ registro }: { registro: Registro }) {
  const malla = useRef<Mesh>(null)
  registro.current += 1

  useFrame((_, delta) => {
    if (!malla.current) return
    malla.current.rotation.y += delta * 1.35
    malla.current.rotation.x += delta * 0.42
  })

  return (
    <group position={[-1.15, 0, 0]}>
      <mesh ref={malla} castShadow>
        <boxGeometry args={[1.1, 1.1, 1.1]} />
        <meshStandardMaterial color="#4d8df6" roughness={0.32} metalness={0.12} />
      </mesh>
      <mesh position={[0, -0.92, 0]} receiveShadow>
        <cylinderGeometry args={[0.7, 0.82, 0.12, 40]} />
        <meshStandardMaterial color="#2a3040" roughness={0.8} />
      </mesh>
    </group>
  )
})

function CuboSetState({ registro }: { registro: Registro }) {
  const [giro, setGiro] = useState(0)
  registro.current += 1

  useFrame((_, delta) => {
    // Un setState por frame: exactamente lo que no hay que hacer.
    setGiro((valor) => valor + delta * 1.35)
  })

  return (
    <group position={[1.15, 0, 0]}>
      <mesh rotation={[0.42, giro, 0]} castShadow>
        <boxGeometry args={[1.1, 1.1, 1.1]} />
        <meshStandardMaterial color="#f5a524" roughness={0.32} metalness={0.12} />
      </mesh>
      <mesh position={[0, -0.92, 0]} receiveShadow>
        <cylinderGeometry args={[0.7, 0.82, 0.12, 40]} />
        <meshStandardMaterial color="#2a3040" roughness={0.8} />
      </mesh>
    </group>
  )
}

function Medidor({ onMedida }: { onMedida: (fps: number) => void }) {
  const frames = useRef(0)
  const ventana = useRef(0)

  useFrame((state) => {
    frames.current += 1
    const ahora = state.clock.getElapsedTime()
    const transcurrido = ahora - ventana.current
    if (transcurrido >= 0.5) {
      onMedida(Math.round(frames.current / transcurrido))
      frames.current = 0
      ventana.current = ahora
    }
  })

  return null
}

export default function UseFrameSetState() {
  const rendersFrame = useRef(0)
  const rendersEstado = useRef(0)
  const fps = useRef(0)
  const [lectura, setLectura] = useState({ fps: 0, frame: 0, estado: 0 })

  useEffect(() => {
    const id = window.setInterval(() => {
      setLectura({
        fps: fps.current,
        frame: rendersFrame.current,
        estado: rendersEstado.current,
      })
    }, 400)
    return () => window.clearInterval(id)
  }, [])

  return (
    <DemoEscena
      titulo="useFrame frente a setState"
      descripcion="Dos cubos idénticos girando. El azul muta su rotación con useFrame y el naranja usa setState en cada frame. Un panel muestra los renders de cada cubo y los FPS."
      camara={[2.8, 2.2, 4.6]}
      sombras
      controles={
        <>
          <span className="font-mono text-[11px] text-texto-suave">
            useFrame · renders: <span className="text-[#4d8df6]">{lectura.frame}</span>
          </span>
          <span className="font-mono text-[11px] text-texto-suave">
            setState · renders: <span className="text-[#f5a524]">{lectura.estado}</span>
          </span>
          <span className="font-mono text-[11px] text-texto-tenue">{lectura.fps} fps</span>
        </>
      }
      nota="El cubo azul se mueve igual de fino, pero el contador de renders se queda quieto. El naranja hace trabajar a React en cada frame para conseguir lo mismo."
    >
      <ambientLight intensity={0.55} />
      <directionalLight position={[4, 6, 3]} intensity={2.2} castShadow />
      <CuboUseFrame registro={rendersFrame} />
      <CuboSetState registro={rendersEstado} />
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1, 0]} receiveShadow>
        <planeGeometry args={[8, 6]} />
        <meshStandardMaterial color="#171b24" roughness={0.95} />
      </mesh>
      <Medidor onMedida={(valor) => (fps.current = valor)} />
    </DemoEscena>
  )
}

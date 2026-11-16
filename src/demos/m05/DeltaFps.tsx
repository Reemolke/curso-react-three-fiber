import { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import type { Group } from 'three'
import { DemoEscena, Deslizador } from '../marco'

const ANCHO = 3.4
const MIN = -ANCHO / 2
/** Unidades que avanza el cubo naranja en cada frame simulado. */
const PASO_POR_FRAME = 0.02
/** Su equivalente en unidades por segundo cuando se juega a 60 fps. */
const VELOCIDAD_POR_SEGUNDO = PASO_POR_FRAME * 60

function envolver(x: number) {
  return MIN + ((((x - MIN) % ANCHO) + ANCHO) % ANCHO)
}

function Escena({ fps }: { fps: number }) {
  const fija = useRef<Group>(null)
  const delta = useRef<Group>(null)
  const posFija = useRef(MIN)
  const posDelta = useRef(MIN)
  const acumulado = useRef(0)
  const fpsRef = useRef(fps)
  fpsRef.current = fps

  useFrame((_, deltaReal) => {
    const segundosPorFrame = 1 / fpsRef.current
    acumulado.current += Math.min(deltaReal, 0.1)

    // La simulación avanza a la tasa elegida, no a la del monitor.
    let pasos = 0
    while (acumulado.current >= segundosPorFrame && pasos < 24) {
      acumulado.current -= segundosPorFrame
      posFija.current = envolver(posFija.current + PASO_POR_FRAME)
      posDelta.current = envolver(posDelta.current + VELOCIDAD_POR_SEGUNDO * segundosPorFrame)
      pasos += 1
    }

    if (fija.current) fija.current.position.x = posFija.current
    if (delta.current) delta.current.position.x = posDelta.current
  })

  return (
    <group>
      <ambientLight intensity={0.65} />
      <directionalLight position={[3, 5, 4]} intensity={2} />

      <mesh position={[0, 0.72, -0.05]}>
        <boxGeometry args={[ANCHO + 0.5, 0.03, 0.9]} />
        <meshStandardMaterial color="#232938" roughness={0.9} />
      </mesh>
      <mesh position={[0, -0.72, -0.05]}>
        <boxGeometry args={[ANCHO + 0.5, 0.03, 0.9]} />
        <meshStandardMaterial color="#232938" roughness={0.9} />
      </mesh>

      <group ref={fija} position={[MIN, 1.05, 0]}>
        <mesh>
          <boxGeometry args={[0.42, 0.42, 0.42]} />
          <meshStandardMaterial color="#f5a524" roughness={0.35} />
        </mesh>
      </group>

      <group ref={delta} position={[MIN, -0.39, 0]}>
        <mesh>
          <boxGeometry args={[0.42, 0.42, 0.42]} />
          <meshStandardMaterial color="#4d8df6" roughness={0.35} />
        </mesh>
      </group>

      <mesh position={[0, 1.05, -0.46]}>
        <planeGeometry args={[ANCHO, 0.02]} />
        <meshBasicMaterial color="#f5a524" transparent opacity={0.35} />
      </mesh>
      <mesh position={[0, -0.39, -0.46]}>
        <planeGeometry args={[ANCHO, 0.02]} />
        <meshBasicMaterial color="#4d8df6" transparent opacity={0.35} />
      </mesh>
    </group>
  )
}

export default function DeltaFps() {
  const [fps, setFps] = useState(60)

  return (
    <DemoEscena
      titulo="La misma animación a distintos FPS"
      descripcion="Dos cubos en dos carriles. El naranja avanza una cantidad fija por frame; el azul multiplica su velocidad por delta. Un deslizador simula entre 10 y 144 FPS."
      camara={[0, 0, 6.2]}
      fov={42}
      controles={
        <>
          <Deslizador
            etiqueta="FPS simulados"
            valor={fps}
            min={10}
            max={144}
            paso={1}
            onChange={setFps}
          />
          <span className="font-mono text-[11px] text-texto-tenue">
            naranja: {fps} × 0,02 = {(fps * PASO_POR_FRAME).toFixed(2)} u/s
          </span>
        </>
      }
      nota="A 60 FPS los dos cubos van igualados. Baja a 20 o sube a 144: el naranja cambia de velocidad y el azul mantiene el ritmo. Esa es la diferencia entre sumar por frame y multiplicar por delta."
    >
      <Escena fps={fps} />
    </DemoEscena>
  )
}

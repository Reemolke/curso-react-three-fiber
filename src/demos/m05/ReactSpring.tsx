import { useState } from 'react'
import { a, useSpring } from '@react-spring/three'
import { DemoEscena, Deslizador } from '../marco'

function Caja({ tension, friction }: { tension: number; friction: number }) {
  const [abierta, setAbierta] = useState(false)
  const { x, giro } = useSpring({
    x: abierta ? 1.35 : -1.35,
    giro: abierta ? Math.PI / 3 : 0,
    config: { tension, friction },
  })

  return (
    <a.mesh
      position-x={x}
      rotation-y={giro}
      onClick={() => setAbierta((valor) => !valor)}
      castShadow
    >
      <boxGeometry args={[0.9, 0.9, 0.9]} />
      <meshStandardMaterial color={abierta ? '#f5a524' : '#4d8df6'} roughness={0.3} metalness={0.12} />
    </a.mesh>
  )
}

export default function ReactSpring() {
  const [tension, setTension] = useState(170)
  const [friction, setFriction] = useState(12)

  return (
    <DemoEscena
      titulo="Un muelle con rigidez y amortiguación ajustables"
      descripcion="Una caja se mueve entre dos posiciones al hacer clic. Dos deslizadores cambian la rigidez y la amortiguación del muelle de react-spring; con poca amortiguación la caja rebota antes de pararse."
      camara={[0, 1.6, 5]}
      fov={42}
      sombras
      controles={
        <>
          <Deslizador
            etiqueta="Rigidez"
            valor={tension}
            min={40}
            max={400}
            paso={10}
            onChange={setTension}
          />
          <Deslizador
            etiqueta="Amortiguación"
            valor={friction}
            min={4}
            max={40}
            paso={1}
            onChange={setFriction}
          />
        </>
      }
      nota="Pulsa la caja. Con amortiguación baja verás el rebote propio de un muelle subamortiguado; con amortiguación alta llega y se detiene sin pasarse. Cambia los valores a mitad del movimiento: el muelle reacciona sin reiniciarse."
    >
      <ambientLight intensity={0.7} />
      <directionalLight position={[3, 6, 4]} intensity={2.2} castShadow />
      <Caja tension={tension} friction={friction} />

      <mesh position={[-1.35, -0.58, 0]} receiveShadow>
        <cylinderGeometry args={[0.42, 0.42, 0.08, 40]} />
        <meshStandardMaterial color="#2a3040" roughness={0.85} />
      </mesh>
      <mesh position={[1.35, -0.58, 0]} receiveShadow>
        <cylinderGeometry args={[0.42, 0.42, 0.08, 40]} />
        <meshStandardMaterial color="#2a3040" roughness={0.85} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.62, 0]} receiveShadow>
        <planeGeometry args={[7, 5]} />
        <meshStandardMaterial color="#171b24" roughness={0.95} />
      </mesh>
    </DemoEscena>
  )
}

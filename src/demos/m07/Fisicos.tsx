import { useState } from 'react'
import { Environment } from '@react-three/drei'
import { HDRIS } from '../../tres/rutas'
import { DemoEscena, Interruptor } from '../marco'
import { MedidorFps } from '../m03/medidor'

type Capa = 'clearcoat' | 'transmission' | 'sheen' | 'iridescence'

const ETIQUETAS: { clave: Capa; texto: string }[] = [
  { clave: 'clearcoat', texto: 'clearcoat' },
  { clave: 'transmission', texto: 'transmission' },
  { clave: 'sheen', texto: 'sheen' },
  { clave: 'iridescence', texto: 'iridescence' },
]

/**
 * Cuatro capas de `MeshPhysicalMaterial`, una por esfera.
 *
 * `transmission` es la cara: obliga al renderer a dibujar la escena en un render
 * target aparte para poder refractarla. Se controla con
 * `gl.transmissionResolutionScale` —a 0,5 cuesta la cuarta parte— a cambio de
 * perder nitidez detrás del cristal.
 */
function Esferas({ activas }: { activas: Record<Capa, boolean> }) {
  return (
    <group>
      <mesh position={[-1.65, 1, 0]}>
        <sphereGeometry args={[0.62, 64, 40]} />
        <meshPhysicalMaterial
          color="#d94f4f"
          roughness={0.35}
          clearcoat={activas.clearcoat ? 1 : 0}
          clearcoatRoughness={0.06}
        />
      </mesh>

      <mesh position={[-0.55, 1, 0]}>
        <sphereGeometry args={[0.62, 64, 40]} />
        <meshPhysicalMaterial
          color="#dfe9f5"
          roughness={0.05}
          metalness={0}
          transmission={activas.transmission ? 1 : 0}
          thickness={0.9}
          ior={1.5}
        />
      </mesh>

      <mesh position={[0.55, 1, 0]}>
        <sphereGeometry args={[0.62, 64, 40]} />
        <meshPhysicalMaterial
          color="#4a5a78"
          roughness={0.65}
          sheen={activas.sheen ? 1 : 0}
          sheenColor="#ffc9a3"
          sheenRoughness={0.4}
        />
      </mesh>

      <mesh position={[1.65, 1, 0]}>
        <sphereGeometry args={[0.62, 64, 40]} />
        <meshPhysicalMaterial
          color="#1d2333"
          roughness={0.08}
          metalness={0.9}
          iridescence={activas.iridescence ? 1 : 0}
          iridescenceIOR={1.3}
          iridescenceThicknessRange={[120, 460]}
        />
      </mesh>

      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[5, 64]} />
        <meshStandardMaterial color="#161c2c" roughness={0.5} metalness={0.15} />
      </mesh>
    </group>
  )
}

export default function Fisicos() {
  const [activas, setActivas] = useState<Record<Capa, boolean>>({
    clearcoat: true,
    transmission: true,
    sheen: true,
    iridescence: true,
  })
  const [fps, setFps] = useState(0)

  const alternar = (clave: Capa) =>
    setActivas((actual) => ({ ...actual, [clave]: !actual[clave] }))

  return (
    <DemoEscena
      titulo="Cuatro capas físicas y su coste"
      descripcion="Cuatro esferas, cada una con una capa distinta de material físico: barniz, transmisión, sheen e iridiscencia. Los interruptores las desactivan una a una y el contador muestra los frames dibujados por segundo."
      alto={380}
      camara={[0, 1.2, 5]}
      controles={
        <>
          {ETIQUETAS.map((entrada) => (
            <Interruptor
              key={entrada.clave}
              etiqueta={entrada.texto}
              activo={activas[entrada.clave]}
              onChange={() => alternar(entrada.clave)}
            />
          ))}
          <span className="ml-auto font-mono text-xs text-texto">{fps} fps</span>
        </>
      }
      nota="Desactiva `transmission` y mira el contador: es la capa más cara porque exige una pasada extra de render. `clearcoat`, `sheen` e `iridescence` añaden cálculo por fragmento, pero no pasadas adicionales."
    >
      <MedidorFps alMedir={setFps} />
      <Environment files={HDRIS.estudio} environmentIntensity={1.1} />

      <ambientLight intensity={0.15} />
      <directionalLight position={[3, 5, 3]} intensity={2} />

      <Esferas activas={activas} />
    </DemoEscena>
  )
}

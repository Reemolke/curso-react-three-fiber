import { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { CuboidCollider, Physics, RigidBody, type RapierRigidBody } from '@react-three/rapier'
import { Text } from '@react-three/drei'
import { FUENTES } from '../../tres/rutas'
import { DemoEscena, Interruptor } from '../marco'

const IMPULSO = { x: 0, y: 7, z: 0 }

type Cuerpos = {
  dinamico: { current: RapierRigidBody | null }
  fijo: { current: RapierRigidBody | null }
  cinematico: { current: RapierRigidBody | null }
}

/** El cuerpo cinemático se mueve por guion, no por física. */
function Cinematico({ cuerpo }: { cuerpo: { current: RapierRigidBody | null } }) {
  const reloj = useRef(0)

  useFrame((_, delta) => {
    const actual = cuerpo.current
    if (!actual) return
    reloj.current += delta
    const subida = Math.sin(reloj.current * 1.6) * 0.8
    actual.setNextKinematicTranslation({ x: 1.7, y: 1.4 + subida, z: 0 })
  })

  return null
}

/**
 * Tres tipos de cuerpo ante el mismo impulso.
 *
 * `dynamic` responde a fuerzas y gravedad. `fixed` no se mueve nunca: es el
 * suelo, una pared. `kinematicPosition` se mueve solo cuando el código le dice
 * dónde estar, empuja a los dinámicos y no le afecta ningún impulso.
 */
export default function Cuerpos() {
  const [ultimo, setUltimo] = useState('pulsa «impulso» para lanzar los tres')
  const [mostrarGuia, setMostrarGuia] = useState(true)
  const cuerpos = useRef<Cuerpos>({
    dinamico: { current: null },
    fijo: { current: null },
    cinematico: { current: null },
  })

  function impulsar() {
    const aplicados: string[] = []
    for (const [nombre, referencia] of Object.entries(cuerpos.current)) {
      const actual = referencia.current
      if (!actual) continue
      actual.applyImpulse(IMPULSO, true)
      aplicados.push(nombre)
    }
    setUltimo(`applyImpulse en ${aplicados.join(', ')}: solo el dinámico se mueve`)
  }

  return (
    <DemoEscena
      titulo="Dinámico, fijo y cinemático"
      descripcion="Tres cubos etiquetados. Al pulsar impulso se aplica la misma fuerza hacia arriba a los tres; solo el cuerpo dinámico reacciona. El cinemático se mueve por código, ignorando la gravedad."
      alto={400}
      camara={[0.4, 2.4, 6.2]}
      controles={
        <>
          <button
            type="button"
            onClick={impulsar}
            className="rounded-lg bg-acento px-3 py-1 text-xs font-semibold text-fondo transition hover:opacity-90"
          >
            impulso ↑
          </button>
          <Interruptor etiqueta="mostrar suelo-guía" activo={mostrarGuia} onChange={setMostrarGuia} />
          <span className="ml-auto max-w-[22rem] truncate font-mono text-[11px] text-texto-suave">
            {ultimo}
          </span>
        </>
      }
      nota="`type` es la decisión más importante de un cuerpo rígido. Si mezclas tipos sin querer, el síntoma es siempre el mismo: «no reacciona» o «atraviesa». Un `fixed` no se mueve por impulso ni por gravedad; un `kinematicPosition` solo obedece a `setNextKinematicTranslation`."
      sombras
    >
      <ambientLight intensity={0.55} />
      <directionalLight position={[3, 7, 5]} intensity={2.3} castShadow />
      <directionalLight position={[-5, 2, -3]} intensity={0.45} color="#9fc2ff" />

      <Physics gravity={[0, -9.81, 0]}>
        <Cinematico cuerpo={cuerpos.current.cinematico} />

        {/* Dinámico */}
        <RigidBody
          ref={cuerpos.current.dinamico}
          position={[-1.7, 1.4, 0]}
          colliders={false}
          restitution={0.25}
          friction={0.7}
        >
          <CuboidCollider args={[0.42, 0.42, 0.42]} />
          <mesh castShadow receiveShadow>
            <boxGeometry args={[0.84, 0.84, 0.84]} />
            <meshStandardMaterial color="#4d8df6" roughness={0.4} metalness={0.1} />
          </mesh>
        </RigidBody>

        {/* Fijo */}
        <RigidBody
          ref={cuerpos.current.fijo}
          type="fixed"
          position={[0, 1.4, 0]}
          colliders={false}
        >
          <CuboidCollider args={[0.42, 0.42, 0.42]} />
          <mesh castShadow receiveShadow>
            <boxGeometry args={[0.84, 0.84, 0.84]} />
            <meshStandardMaterial color="#5c6885" roughness={0.75} metalness={0.05} />
          </mesh>
        </RigidBody>

        {/* Cinemático */}
        <RigidBody
          ref={cuerpos.current.cinematico}
          type="kinematicPosition"
          position={[1.7, 1.4, 0]}
          colliders={false}
        >
          <CuboidCollider args={[0.42, 0.42, 0.42]} />
          <mesh castShadow receiveShadow>
            <boxGeometry args={[0.84, 0.84, 0.84]} />
            <meshStandardMaterial color="#f5a524" roughness={0.5} metalness={0.1} />
          </mesh>
        </RigidBody>

        <RigidBody type="fixed" colliders={false}>
          <CuboidCollider args={[5, 0.2, 3]} position={[0, -0.2, 0]} />
        </RigidBody>
      </Physics>

      <Text
        font={FUENTES.regular}
        fontSize={0.18}
        anchorX="center"
        anchorY="middle"
        position={[-1.7, -0.75, 1.2]}
        color="#8fa3c8"
      >
        dynamic
      </Text>
      <Text
        font={FUENTES.regular}
        fontSize={0.18}
        anchorX="center"
        anchorY="middle"
        position={[0, -0.75, 1.2]}
        color="#8fa3c8"
      >
        fixed
      </Text>
      <Text
        font={FUENTES.regular}
        fontSize={0.18}
        anchorX="center"
        anchorY="middle"
        position={[1.7, -0.75, 1.2]}
        color="#8fa3c8"
      >
        kinematicPosition
      </Text>

      {mostrarGuia && (
        <gridHelper args={[10, 10, '#2b3554', '#1d2338']} position={[0, 0, 0]} />
      )}
    </DemoEscena>
  )
}

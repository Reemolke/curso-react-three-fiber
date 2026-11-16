import { useState } from 'react'
import {
  BallCollider,
  CapsuleCollider,
  ConeCollider,
  CuboidCollider,
  Physics,
  RigidBody,
  RoundCuboidCollider,
} from '@react-three/rapier'
import { DemoEscena } from '../marco'

const FORMAS = ['cuboid', 'ball', 'capsule', 'cone', 'roundCuboid'] as const
type Forma = (typeof FORMAS)[number]

const MEDIO = 0.38
const SALIDA = 1.9
const COLORES = ['#4d8df6', '#3fbf87', '#f5a524', '#e05f7a', '#a78bfa']

function Colision({ forma }: { forma: Forma }) {
  switch (forma) {
    case 'ball':
      return <BallCollider args={[MEDIO]} />
    case 'capsule':
      return <CapsuleCollider args={[0.16, MEDIO * 0.8]} rotation={[0, 0, Math.PI / 2]} />
    case 'cone':
      return <ConeCollider args={[MEDIO, MEDIO]} />
    case 'roundCuboid':
      return <RoundCuboidCollider args={[MEDIO, MEDIO, MEDIO, 0.16]} />
    default:
      return <CuboidCollider args={[MEDIO, MEDIO, MEDIO]} />
  }
}

/**
 * Cinco colliders, la misma caja visible.
 *
 * La malla que se dibuja es idéntica en las cinco columnas. Lo que cambia es la
 * forma con la que el motor resuelve los contactos: caja, esfera, cápsula, cono
 * y caja redondeada. Por eso una «caja» rueda como una pelota o gira como un
 * cono: el collider manda, la malla solo se dibuja.
 */
export default function Colliders() {
  const [reinicio, setReinicio] = useState(0)

  return (
    <DemoEscena
      titulo="El mismo objeto con cinco colliders"
      descripcion="Cinco cajas idénticas caen sobre una rampa suave. Cada una lleva un collider distinto —caja, esfera, cápsula, cono y caja redondeada— así que cada una baja de forma distinta."
      alto={420}
      camara={[0, 3.6, 6.2]}
      controles={
        <>
          <button
            type="button"
            onClick={() => setReinicio((valor) => valor + 1)}
            className="rounded-lg border border-borde px-2.5 py-1 text-xs text-texto-suave transition hover:bg-superficie-alta"
          >
            soltar otra vez
          </button>
          <ul className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-texto-suave">
            {FORMAS.map((forma, indice) => (
              <li key={forma} className="flex items-center gap-1.5">
                <span
                  className="size-2.5 rounded-sm"
                  style={{ backgroundColor: COLORES[indice] }}
                  aria-hidden
                />
                <span className="font-mono">{forma}</span>
              </li>
            ))}
          </ul>
        </>
      }
      nota="Coste de cada forma: la esfera es la más barata y estable; la caja es exacta y también barata; la cápsula y el cono cuestan más contactos; la caja redondeada evita que las esquinas se enganchen. El trimesh, que no está aquí, es el más caro y solo se usa para geometría que no se puede aproximar."
      sombras
    >
      <ambientLight intensity={0.6} />
      <directionalLight position={[3, 8, 5]} intensity={2.3} castShadow />
      <directionalLight position={[-5, 3, -6]} intensity={0.45} color="#9fc2ff" />

      <Physics gravity={[0, -9.81, 0]} timeStep={1 / 60}>
        {/* Rampa: inclinada hacia el fondo, para que los objetos se alejen. */}
        <RigidBody type="fixed" colliders={false} rotation={[-0.18, 0, 0]} position={[0, 0.6, 0]}>
          <CuboidCollider args={[4.2, 0.1, 2.2]} friction={0.08} />
          <mesh receiveShadow>
            <boxGeometry args={[8.4, 0.2, 4.4]} />
            <meshStandardMaterial color="#33405f" roughness={0.8} />
          </mesh>
        </RigidBody>

        {/* Tope: recoge a los que llegan abajo para que no salgan de cuadro. */}
        <RigidBody type="fixed" colliders={false} position={[0, 0.75, -2.5]}>
          <CuboidCollider args={[4.2, 0.6, 0.15]} friction={0.4} />
          <mesh receiveShadow>
            <boxGeometry args={[8.4, 1.2, 0.3]} />
            <meshStandardMaterial color="#3a4a70" roughness={0.85} />
          </mesh>
        </RigidBody>

        {/* Suelo de recogida: aquí acaban las que se salen de la rampa. */}
        <RigidBody type="fixed" colliders={false} position={[0, -0.09, 0]}>
          <CuboidCollider args={[7, 0.25, 7]} />
        </RigidBody>

        {FORMAS.map((forma, indice) => {
          const x = (indice - (FORMAS.length - 1) / 2) * 1.16
          return (
            <RigidBody
              key={`${forma}-${reinicio}`}
              position={[x, 1.5, SALIDA]}
              colliders={false}
              friction={0.08}
              restitution={0.08}
            >
              <Colision forma={forma} />
              <mesh castShadow receiveShadow>
                <boxGeometry args={[MEDIO * 2, MEDIO * 2, MEDIO * 2]} />
                <meshStandardMaterial
                  color={COLORES[indice]}
                  roughness={0.45}
                  metalness={0.1}
                />
              </mesh>
            </RigidBody>
          )
        })}
      </Physics>

      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.16, 0]} receiveShadow>
        <planeGeometry args={[16, 14]} />
        <meshStandardMaterial color="#151b2a" roughness={0.96} />
      </mesh>
    </DemoEscena>
  )
}

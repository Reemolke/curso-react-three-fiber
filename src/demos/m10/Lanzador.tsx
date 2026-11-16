import { useRef, useState } from 'react'
import { CuboidCollider, Physics, RigidBody, type RapierRigidBody } from '@react-three/rapier'
import { DemoEscena, Deslizador } from '../marco'

const LADO = 0.34
const POSICION = [0, 1.15, 2.4] as const

/** Pila de seis cajas: tres abajo, dos en medio, una arriba. */
function Diana({ reinicio }: { reinicio: number }) {
  const piezas: [number, number][] = [
    [-0.78, 0.4],
    [0, 0.4],
    [0.78, 0.4],
    [-0.39, 1.13],
    [0.39, 1.13],
    [0, 1.86],
  ]

  return (
    <>
      {piezas.map(([x, y], indice) => (
        <RigidBody
          key={`${reinicio}-${indice}`}
          position={[x, y, -2.1]}
          colliders={false}
          friction={0.6}
          restitution={0.05}
        >
          <CuboidCollider args={[LADO, LADO, LADO]} />
          <mesh castShadow receiveShadow>
            <boxGeometry args={[LADO * 2, LADO * 2, LADO * 2]} />
            <meshStandardMaterial color={indice % 2 === 0 ? '#e05f7a' : '#f5a524'} roughness={0.65} />
          </mesh>
        </RigidBody>
      ))}
    </>
  )
}

/**
 * Lanzador: impulso, masa y gravedad.
 *
 * El mismo impulso con más masa da menos velocidad: es la definición de impulso
 * (`J = m · Δv`) y se ve en el marcador antes de lanzar. La gravedad cambia la
 * parábola, no la velocidad de salida. Los controles no son adorno: el alumno
 * puede comprobar que el número que predice el marcador es el que sale.
 */
export default function Lanzador() {
  const [impulso, setImpulso] = useState(9)
  const [masa, setMasa] = useState(1.5)
  const [gravedad, setGravedad] = useState(9.81)
  const [reinicio, setReinicio] = useState(0)
  const proyectil = useRef<RapierRigidBody>(null)

  const velocidadEstimada = impulso / masa

  function lanzar() {
    proyectil.current?.applyImpulse({ x: 0, y: impulso * 0.22, z: -impulso }, true)
  }

  return (
    <DemoEscena
      titulo="Impulso, masa y gravedad"
      descripcion="Un proyectil se lanza con un impulso configurable contra una pila de seis cajas. Se puede cambiar la masa del proyectil y la gravedad del mundo, y reiniciar la escena."
      alto={420}
      camara={[4.4, 2.6, 5.2]}
      controles={
        <>
          <Deslizador etiqueta="impulso" valor={impulso} min={2} max={30} paso={0.5} onChange={setImpulso} />
          <Deslizador etiqueta="masa" valor={masa} min={0.4} max={6} paso={0.1} sufijo=" kg" onChange={setMasa} />
          <Deslizador
            etiqueta="gravedad"
            valor={gravedad}
            min={0}
            max={25}
            paso={0.1}
            sufijo=" m/s²"
            onChange={setGravedad}
          />
          <button
            type="button"
            onClick={lanzar}
            className="rounded-lg bg-acento px-3 py-1 text-xs font-semibold text-fondo transition hover:opacity-90"
          >
            lanzar
          </button>
          <button
            type="button"
            onClick={() => setReinicio((valor) => valor + 1)}
            className="rounded-lg border border-borde px-2.5 py-1 text-xs text-texto-suave transition hover:bg-superficie-alta"
          >
            reiniciar
          </button>
          <span className="ml-auto font-mono text-[11px] text-texto-suave">
            v₀ ≈ {velocidadEstimada.toFixed(1)} m/s
          </span>
        </>
      }
      nota="`applyImpulse` cambia la velocidad en el instante de la llamada según la masa. `addForce` actúa mientras se llame, frame a frame, y depende del tiempo. Si quieres un salto o un disparo, impulso; si quieres un viento o un motor, fuerza. Cambiar la masa no se puede en caliente sin recrear el collider: aquí el proyectil se remonta con una `key`."
      sombras
    >
      <ambientLight intensity={0.55} />
      <directionalLight position={[5, 8, 5]} intensity={2.3} castShadow />
      <directionalLight position={[-5, 3, -5]} intensity={0.45} color="#9fc2ff" />

      <Physics gravity={[0, -gravedad, 0]}>
        <RigidBody
          key={`${masa}-${reinicio}`}
          ref={proyectil}
          position={[POSICION[0], POSICION[1], POSICION[2]]}
          colliders={false}
          ccd
          restitution={0.2}
        >
          <CuboidCollider args={[0.26, 0.26, 0.26]} mass={masa} />
          <mesh castShadow receiveShadow>
            <boxGeometry args={[0.52, 0.52, 0.52]} />
            <meshStandardMaterial color="#4d8df6" roughness={0.35} metalness={0.25} />
          </mesh>
        </RigidBody>

        <Diana reinicio={reinicio} />

        <RigidBody type="fixed" colliders={false}>
          <CuboidCollider args={[6, 0.2, 6]} position={[0, -0.2, 0]} />
        </RigidBody>
      </Physics>

      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[12, 12]} />
        <meshStandardMaterial color="#161d2d" roughness={0.95} />
      </mesh>
    </DemoEscena>
  )
}

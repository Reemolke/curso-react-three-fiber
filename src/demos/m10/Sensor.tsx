import { useRef, useState } from 'react'
import { BallCollider, CuboidCollider, Physics, RigidBody } from '@react-three/rapier'
import { Text } from '@react-three/drei'
import { FUENTES } from '../../tres/rutas'
import { DemoEscena } from '../marco'

const ALTURAS = [4.4, 5.2, 4.8, 5.6, 4.3, 5.0, 5.4, 4.6]
const POSICIONES = [-2.2, -1.5, -0.8, -0.2, 0.5, 1.1, 1.9, 2.4]
const TOTAL = POSICIONES.length
const SENSOR_Y = 0.9

/**
 * Zona de meta con sensor.
 *
 * El sensor no resuelve contactos: solo avisa cuando algo lo atraviesa. Aquí
 * cuenta esferas únicas con un `Set` de identificadores, porque
 * `onIntersectionEnter` puede dispararse más de una vez y porque un sensor que
 * toca dos colliders del mismo cuerpo contaría doble.
 */
export default function Sensor() {
  const [cuenta, setCuenta] = useState(0)
  const [brillo, setBrillo] = useState(false)
  const [reinicio, setReinicio] = useState(0)
  const vistas = useRef(new Set<number>())
  const apagado = useRef<number | null>(null)

  function cruzar(identificador: number) {
    if (vistas.current.has(identificador)) return
    vistas.current.add(identificador)
    setCuenta(vistas.current.size)
    setBrillo(true)
    if (apagado.current !== null) window.clearTimeout(apagado.current)
    apagado.current = window.setTimeout(() => setBrillo(false), 300)
  }

  function reiniciar() {
    vistas.current.clear()
    setCuenta(0)
    setBrillo(false)
    setReinicio((valor) => valor + 1)
  }

  return (
    <DemoEscena
      titulo="Sensor de meta que cuenta"
      descripcion="Ocho esferas caen a través de una zona marcada como sensor. Cada esfera que la atraviesa incrementa el contador una sola vez y la zona se ilumina."
      alto={400}
      camara={[0.4, 2.6, 7]}
      controles={
        <>
          <span className="font-mono text-xs text-texto">
            {cuenta} / {TOTAL} esferas
          </span>
          <button
            type="button"
            onClick={reiniciar}
            className="rounded-lg border border-borde px-2.5 py-1 text-xs text-texto-suave transition hover:bg-superficie-alta"
          >
            reiniciar
          </button>
          <span className="ml-auto font-mono text-[11px] text-texto-tenue">
            {cuenta === TOTAL ? 'todas han pasado' : 'caen desde arriba'}
          </span>
        </>
      }
      nota="Un sensor es un collider con `sensor`: no empuja ni frena, solo emite `onIntersectionEnter` / `onIntersectionExit`. Para un objetivo, una zona de daño o una puerta es lo correcto; para una pared, no. Contar por eventos exige deduplicar: guarda el identificador del cuerpo, no el número de eventos."
      sombras
    >
      <ambientLight intensity={0.6} />
      <directionalLight position={[4, 8, 5]} intensity={2.2} castShadow />
      <directionalLight position={[-4, 3, -4]} intensity={0.45} color="#9fc2ff" />

      <Physics gravity={[0, -9.81, 0]}>
        <RigidBody type="fixed" colliders={false}>
          <CuboidCollider
            args={[2.9, 0.06, 1.1]}
            position={[0, SENSOR_Y, 0]}
            sensor
            onIntersectionEnter={({ other }) => {
              const cuerpo = other.rigidBody
              if (cuerpo) cruzar(cuerpo.handle)
            }}
          />
        </RigidBody>

        {POSICIONES.map((x, indice) => (
          <RigidBody
            key={`${reinicio}-${indice}`}
            position={[x, ALTURAS[indice], 0]}
            colliders={false}
            restitution={0.35}
            friction={0.4}
          >
            <BallCollider args={[0.21]} />
            <mesh castShadow>
              <sphereGeometry args={[0.21, 24, 18]} />
              <meshStandardMaterial
                color={indice % 2 === 0 ? '#3fbf87' : '#4d8df6'}
                roughness={0.35}
                metalness={0.2}
              />
            </mesh>
          </RigidBody>
        ))}

        <RigidBody type="fixed" colliders={false}>
          <CuboidCollider args={[6, 0.2, 4]} position={[0, -0.2, 0]} />
        </RigidBody>
      </Physics>

      {/* Volumen visible del sensor. Cambia de emisión al detectar algo. */}
      <mesh position={[0, SENSOR_Y, 0]}>
        <boxGeometry args={[5.8, 0.12, 2.2]} />
        <meshStandardMaterial
          color={brillo ? '#3fbf87' : '#2b3554'}
          emissive={brillo ? '#3fbf87' : '#141a29'}
          emissiveIntensity={brillo ? 1.6 : 0.35}
          transparent
          opacity={0.55}
          roughness={0.8}
        />
      </mesh>

      <Text
        font={FUENTES.regular}
        fontSize={0.2}
        anchorX="center"
        anchorY="middle"
        position={[0, SENSOR_Y + 0.55, 1.3]}
        color="#8fa3c8"
      >
        sensor
      </Text>

      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[12, 8]} />
        <meshStandardMaterial color="#1e2740" roughness={0.95} />
      </mesh>
    </DemoEscena>
  )
}

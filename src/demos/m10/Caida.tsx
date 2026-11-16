import { useEffect, useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import {
  BallCollider,
  CuboidCollider,
  Physics,
  RigidBody,
  type RapierRigidBody,
} from '@react-three/rapier'
import { Text } from '@react-three/drei'
import type { Mesh } from 'three'
import { FUENTES } from '../../tres/rutas'
import { DemoEscena, Deslizador } from '../marco'

const SUELO = -1.1
const RADIO = 0.42
const ALTURA = 3.4
const REPOSO = SUELO + RADIO

type Lecturas = { manual: number; rapier: number }

type Medicion = {
  lecturas: { current: Lecturas }
  alInformar: (texto: string) => void
}

/** Publica la altura de las dos esferas cinco veces por segundo. */
function Informe({ lecturas, alInformar }: Medicion) {
  const reloj = useRef(0)

  useFrame((_, delta) => {
    reloj.current += delta
    if (reloj.current < 0.2) return
    reloj.current = 0
    const { manual, rapier } = lecturas.current
    alInformar(
      `a mano y=${manual.toFixed(2)} · rapier y=${rapier.toFixed(2)}`,
    )
  })

  return null
}

/** Integración escrita a mano: gravedad, velocidad y un rebote con restitución. */
function EsferaManual({
  gravedad,
  reinicio,
  lecturas,
}: {
  gravedad: number
  reinicio: number
  lecturas: { current: Lecturas }
}) {
  const malla = useRef<Mesh>(null)
  const velocidad = useRef(0)
  const altura = useRef(ALTURA)

  useEffect(() => {
    velocidad.current = 0
    altura.current = ALTURA
    if (malla.current) malla.current.position.y = ALTURA
  }, [reinicio])

  useFrame((_, delta) => {
    const paso = Math.min(delta, 1 / 30)
    velocidad.current -= gravedad * paso
    altura.current += velocidad.current * paso

    if (altura.current < REPOSO) {
      altura.current = REPOSO
      velocidad.current = -velocidad.current * 0.55
      if (Math.abs(velocidad.current) < 0.35) velocidad.current = 0
    }

    if (malla.current) malla.current.position.y = altura.current
    lecturas.current.manual = altura.current
  })

  return (
    <mesh ref={malla} position={[-1.5, ALTURA, 0]} castShadow>
      <sphereGeometry args={[RADIO, 32, 24]} />
      <meshStandardMaterial color="#4d8df6" roughness={0.35} metalness={0.15} />
    </mesh>
  )
}

/** La misma esfera, resuelta por Rapier: una línea de configuración. */
function EsferaRapier({
  reinicio,
  lecturas,
}: {
  reinicio: number
  lecturas: { current: Lecturas }
}) {
  const cuerpo = useRef<RapierRigidBody>(null)

  useEffect(() => {
    const actual = cuerpo.current
    if (!actual) return
    actual.setTranslation({ x: 1.5, y: ALTURA, z: 0 }, true)
    actual.setLinvel({ x: 0, y: 0, z: 0 }, true)
    actual.setAngvel({ x: 0, y: 0, z: 0 }, true)
  }, [reinicio])

  useFrame(() => {
    const actual = cuerpo.current
    if (!actual) return
    lecturas.current.rapier = actual.translation().y
  })

  return (
    <RigidBody
      ref={cuerpo}
      position={[1.5, ALTURA, 0]}
      colliders={false}
      restitution={0.55}
      friction={0.6}
      ccd
    >
      <BallCollider args={[RADIO]} />
      <mesh castShadow>
        <sphereGeometry args={[RADIO, 32, 24]} />
        <meshStandardMaterial color="#3fbf87" roughness={0.35} metalness={0.15} />
      </mesh>
    </RigidBody>
  )
}

/**
 * Caída libre: la misma esfera dos veces.
 *
 * A la izquierda, la simulación escrita a mano en un `useFrame`: integrar la
 * velocidad, mover, detectar el suelo, rebotar. A la derecha, la misma esfera
 * como cuerpo rígido de Rapier. La comparación sirve para ver qué se paga por
 * hacerlo uno mismo: el contacto, la rotación y la estabilidad no están en el
 * código de la izquierda porque no se han resuelto.
 */
export default function Caida() {
  const [gravedad, setGravedad] = useState(9.81)
  const [reinicio, setReinicio] = useState(0)
  const [auto, setAuto] = useState(true)
  const [informe, setInforme] = useState('')
  const lecturas = useRef<Lecturas>({ manual: ALTURA, rapier: ALTURA })

  // Vuelve a soltar las esferas cada pocos segundos: al llegar a la lección la
  // demo nunca está ya terminada.
  useEffect(() => {
    if (!auto) return
    const temporizador = window.setTimeout(() => setReinicio((valor) => valor + 1), 3800)
    return () => window.clearTimeout(temporizador)
  }, [reinicio, auto, gravedad])

  return (
    <DemoEscena
      titulo="Caída libre: a mano frente a Rapier"
      descripcion="Dos esferas caen desde la misma altura. La de la izquierda se mueve con una integración escrita en un useFrame; la de la derecha la simula Rapier."
      alto={400}
      camara={[0.6, 2.2, 6.4]}
      controles={
        <>
          <Deslizador
            etiqueta="gravedad"
            valor={gravedad}
            min={1}
            max={25}
            paso={0.1}
            sufijo=" m/s²"
            onChange={setGravedad}
          />
          <button
            type="button"
            onClick={() => setReinicio((valor) => valor + 1)}
            className="rounded-lg border border-borde px-2.5 py-1 text-xs text-texto-suave transition hover:bg-superficie-alta"
          >
            soltar otra vez
          </button>
          <label className="flex cursor-pointer items-center gap-2 text-xs text-texto-suave">
            <input
              type="checkbox"
              checked={auto}
              onChange={(evento) => setAuto(evento.target.checked)}
              className="size-3.5 accent-acento"
            />
            repetir
          </label>
          <span className="ml-auto font-mono text-[11px] text-texto-suave">{informe}</span>
        </>
      }
      nota="La esfera azul solo cae y rebota: no gira, no choca con nada más y su rebote es una constante inventada. La verde entrega posición, rotación, contacto y reposo al motor. Ese es el intercambio: Rapier no es magia, es código que ya resolvió los casos raros."
      sombras
    >
      <ambientLight intensity={0.55} />
      <directionalLight position={[4, 7, 5]} intensity={2.2} castShadow />
      <directionalLight position={[-4, 2, -4]} intensity={0.5} color="#9fc2ff" />

      <Informe lecturas={lecturas} alInformar={setInforme} />

      <EsferaManual gravedad={gravedad} reinicio={reinicio} lecturas={lecturas} />

      <Text
        font={FUENTES.regular}
        fontSize={0.16}
        anchorX="center"
        anchorY="middle"
        position={[-1.5, -0.5, 2]}
        color="#8fa3c8"
      >
        a mano
      </Text>
      <Text
        font={FUENTES.regular}
        fontSize={0.16}
        anchorX="center"
        anchorY="middle"
        position={[1.5, -0.5, 2]}
        color="#8fa3c8"
      >
        Rapier
      </Text>

      <Physics gravity={[0, -gravedad, 0]}>
        <EsferaRapier reinicio={reinicio} lecturas={lecturas} />

        <RigidBody type="fixed" colliders={false}>
          <CuboidCollider args={[5, 0.2, 3]} position={[0, SUELO - 0.2, 0]} />
        </RigidBody>
      </Physics>

      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, SUELO, 0]} receiveShadow>
        <planeGeometry args={[10, 6]} />
        <meshStandardMaterial color="#1b2438" roughness={0.95} />
      </mesh>
    </DemoEscena>
  )
}

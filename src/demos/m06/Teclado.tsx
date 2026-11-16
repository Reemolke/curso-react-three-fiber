import { useEffect, useMemo, useRef, useState } from 'react'
import type { RefObject } from 'react'
import { useFrame } from '@react-three/fiber'
import { MathUtils } from 'three'
import type { Group } from 'three'
import { DemoEscena } from '../marco'

type EscenaProps = {
  renders: RefObject<number>
  teclas: RefObject<Set<string>>
}

type Muro = {
  posicion: [number, number, number]
  escala: [number, number, number]
}

const MUROS: Muro[] = [
  { posicion: [0, 0.08, -3.5], escala: [7.2, 0.16, 0.08] },
  { posicion: [0, 0.08, 3.5], escala: [7.2, 0.16, 0.08] },
  { posicion: [-3.5, 0.08, 0], escala: [0.08, 0.16, 7.2] },
  { posicion: [3.5, 0.08, 0], escala: [0.08, 0.16, 7.2] },
]

function Monitor({ renders, teclas }: EscenaProps) {
  const [datos, setDatos] = useState({ renders: 0, teclas: 0 })

  useEffect(() => {
    const id = window.setInterval(() => {
      setDatos({ renders: renders.current, teclas: teclas.current.size })
    }, 300)
    return () => window.clearInterval(id)
  }, [renders, teclas])

  return (
    <p className="flex w-full flex-wrap items-center gap-x-5 gap-y-1 text-xs text-texto-suave">
      <span>
        <span className="mr-2 font-mono text-[10px] uppercase tracking-widest text-texto-tenue">
          renders
        </span>
        <span className="font-mono text-sm text-acento">{datos.renders}</span>
      </span>
      <span>
        <span className="mr-2 font-mono text-[10px] uppercase tracking-widest text-texto-tenue">
          teclas
        </span>
        <span className="font-mono text-sm text-texto">{datos.teclas}</span>
      </span>
      <span className="text-texto-tenue">
        Mueve la nave: el contador de teclas sube, el de renders no.
      </span>
    </p>
  )
}

function Escena({ renders, teclas }: EscenaProps) {
  // Se ejecuta en cada render del componente: es el termómetro de la demo.
  renders.current += 1

  const nave = useRef<Group>(null)
  const banco = useRef<Group>(null)
  const rumbo = useRef(0)

  const posiciones = useMemo(() => {
    const datos = new Float32Array(600)
    for (let i = 0; i < 600; i += 3) {
      const angulo = Math.random() * Math.PI * 2
      const radio = 7 + Math.random() * 9
      datos[i] = Math.cos(angulo) * radio
      datos[i + 1] = 1 + Math.random() * 8
      datos[i + 2] = Math.sin(angulo) * radio
    }
    return datos
  }, [])

  useEffect(() => {
    const abajo = (evento: KeyboardEvent) => {
      const objetivo = evento.target
      if (
        objetivo instanceof HTMLElement &&
        (objetivo.tagName === 'INPUT' ||
          objetivo.tagName === 'TEXTAREA' ||
          objetivo.isContentEditable)
      ) {
        return
      }
      teclas.current.add(evento.code)
    }

    const arriba = (evento: KeyboardEvent) => {
      teclas.current.delete(evento.code)
    }

    // Si la ventana pierde el foco, el keyup nunca llega: sin esto, la nave
    // se quedaría acelerando para siempre.
    const perderFoco = () => teclas.current.clear()

    window.addEventListener('keydown', abajo)
    window.addEventListener('keyup', arriba)
    window.addEventListener('blur', perderFoco)

    return () => {
      window.removeEventListener('keydown', abajo)
      window.removeEventListener('keyup', arriba)
      window.removeEventListener('blur', perderFoco)
      teclas.current.clear()
    }
  }, [teclas])

  useFrame((estado, delta) => {
    const dt = Math.min(delta, 0.05)
    const pulsadas = teclas.current

    let x = 0
    let z = 0
    if (pulsadas.has('KeyW')) z -= 1
    if (pulsadas.has('KeyS')) z += 1
    if (pulsadas.has('KeyA')) x -= 1
    if (pulsadas.has('KeyD')) x += 1

    const grupo = nave.current
    if (grupo) {
      if (x !== 0 || z !== 0) {
        const longitud = Math.hypot(x, z)
        x /= longitud
        z /= longitud

        const velocidad = 2.8
        grupo.position.x = MathUtils.clamp(
          grupo.position.x + x * velocidad * dt,
          -3.4,
          3.4,
        )
        grupo.position.z = MathUtils.clamp(
          grupo.position.z + z * velocidad * dt,
          -3.4,
          3.4,
        )
        rumbo.current = Math.atan2(x, z)
      }

      grupo.position.y = 0.85 + Math.sin(estado.clock.elapsedTime * 2.2) * 0.035
      grupo.rotation.y = MathUtils.damp(grupo.rotation.y, rumbo.current, 8, dt)
    }

    if (banco.current) {
      banco.current.rotation.z = MathUtils.damp(
        banco.current.rotation.z,
        -x * 0.4,
        7,
        dt,
      )
    }
  })

  return (
    <>
      <ambientLight intensity={0.55} />
      <directionalLight position={[4, 8, 5]} intensity={2.4} />
      <pointLight position={[0, 2.2, 0]} intensity={4} distance={6} color="#4d8df6" />

      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[posiciones, 3]} />
        </bufferGeometry>
        <pointsMaterial color="#8fa3c8" size={0.07} sizeAttenuation />
      </points>

      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
        <circleGeometry args={[8, 64]} />
        <meshStandardMaterial color="#0f131c" roughness={1} />
      </mesh>

      {MUROS.map((muro, i) => (
        <mesh key={i} position={muro.posicion} scale={muro.escala}>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial color="#2a3040" roughness={0.7} />
        </mesh>
      ))}

      <group ref={nave} position={[0, 0.85, 0]}>
        <group ref={banco}>
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <coneGeometry args={[0.28, 0.95, 16]} />
            <meshStandardMaterial color="#4d8df6" roughness={0.25} metalness={0.35} />
          </mesh>

          <mesh position={[0, 0, 0.16]}>
            <sphereGeometry args={[0.18, 20, 20]} />
            <meshStandardMaterial
              color="#d9e6ff"
              roughness={0.1}
              metalness={0.2}
              emissive="#4d8df6"
              emissiveIntensity={0.6}
            />
          </mesh>

          <mesh position={[-0.34, 0, -0.12]} rotation={[0, 0, 0.35]}>
            <boxGeometry args={[0.42, 0.06, 0.26]} />
            <meshStandardMaterial color="#f5a524" roughness={0.4} />
          </mesh>
          <mesh position={[0.34, 0, -0.12]} rotation={[0, 0, -0.35]}>
            <boxGeometry args={[0.42, 0.06, 0.26]} />
            <meshStandardMaterial color="#f5a524" roughness={0.4} />
          </mesh>

          <mesh position={[0, 0, -0.54]}>
            <sphereGeometry args={[0.12, 16, 16]} />
            <meshBasicMaterial color="#f5a524" />
          </mesh>
        </group>
      </group>
    </>
  )
}

export default function Teclado() {
  const renders = useRef(0)
  const teclas = useRef(new Set<string>())

  return (
    <DemoEscena
      titulo="WASD sin re-renders"
      descripcion="Una nave espacial se mueve por un recinto cuadrado con las teclas W, A, S y D. El movimiento se aplica en useFrame leyendo un Set de teclas guardado en un ref. Debajo se muestra el número de renders del componente y las teclas pulsadas."
      alto={400}
      camara={[0, 4.4, 6.4]}
      fov={44}
      controles={<Monitor renders={renders} teclas={teclas} />}
      nota="El contador se lee cada 300 ms para no repintar la interfaz en cada frame. En desarrollo, StrictMode puede duplicar el valor inicial; lo importante es que no suba mientras mueves la nave. Haz clic fuera del lienzo y pulsa W: el listener es global mientras la demo está montada."
    >
      <Escena renders={renders} teclas={teclas} />
    </DemoEscena>
  )
}

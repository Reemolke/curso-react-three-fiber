import { useEffect, useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import type { Group, MeshStandardMaterial, PointLight } from 'three'
import { DemoEscena } from '../marco'

function tramo(t: number, inicio: number, duracion: number) {
  return Math.min(1, Math.max(0, (t - inicio) / duracion))
}

function easeOutCubic(t: number) {
  return 1 - Math.pow(1 - t, 3)
}

function easeInOutCubic(t: number) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
}

function easeOutBack(t: number) {
  const c1 = 1.70158
  const c3 = c1 + 1
  return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2)
}

const MONEDAS: [number, number, number][] = [
  [-0.45, 0, -0.25],
  [-0.12, 0.02, 0.1],
  [0.2, -0.01, -0.3],
  [0.5, 0.01, 0.15],
  [0.05, 0.03, 0.34],
  [-0.3, 0.02, 0.38],
]

function Escena({ clave, paso }: { clave: number; paso: { current: HTMLSpanElement | null } }) {
  const t = useRef(0)
  const tapa = useRef<Group>(null)
  const cerradura = useRef<Group>(null)
  const brillo = useRef<PointLight>(null)
  const monedas = useRef<Group>(null)
  const orbe = useRef<MeshStandardMaterial>(null)

  useEffect(() => {
    t.current = 0
  }, [clave])

  useFrame((_, delta) => {
    t.current += Math.min(delta, 0.05)
    const ahora = t.current

    const pCerradura = tramo(ahora, 0, 0.5)
    const pTapa = tramo(ahora, 0.55, 1.2)
    const pBrillo = tramo(ahora, 1.6, 0.8)
    const pMonedas = tramo(ahora, 2.3, 1.1)

    if (cerradura.current) {
      const subida = easeOutBack(pCerradura)
      cerradura.current.position.y = 0.82 + subida * 0.34
      cerradura.current.rotation.y = subida * Math.PI * 0.5
    }

    if (tapa.current) {
      tapa.current.rotation.x = -easeInOutCubic(pTapa) * 1.95
    }

    const intensidad = easeOutCubic(pBrillo)
    if (brillo.current) brillo.current.intensity = intensidad * 3.2
    if (orbe.current) orbe.current.emissiveIntensity = intensidad * 2.4
    if (monedas.current) {
      monedas.current.position.y = 0.68 + easeOutCubic(pMonedas) * 0.8
      monedas.current.rotation.y += Math.min(delta, 0.05) * (0.4 + pMonedas * 2.6)
    }

    if (paso.current) {
      const numero = ahora >= 2.3 ? 4 : ahora >= 1.6 ? 3 : ahora >= 0.55 ? 2 : 1
      const texto = ahora >= 3.4 ? 'secuencia completada' : `paso ${numero} de 4`
      if (paso.current.textContent !== texto) paso.current.textContent = texto
    }
  })

  return (
    <group>
      <ambientLight intensity={0.55} />
      <directionalLight position={[4, 6, 3]} intensity={2} castShadow />

      <mesh position={[0, 0.5, 0]} castShadow receiveShadow>
        <boxGeometry args={[2.4, 1, 1.4]} />
        <meshStandardMaterial color="#6f4327" roughness={0.65} metalness={0.05} />
      </mesh>

      <group ref={tapa} position={[0, 1.02, -0.7]}>
        <mesh position={[0, 0, 0.7]} castShadow>
          <boxGeometry args={[2.4, 0.2, 1.4]} />
          <meshStandardMaterial color="#7d4c2c" roughness={0.6} metalness={0.05} />
        </mesh>
        <mesh position={[-0.7, 0.12, 0.7]}>
          <boxGeometry args={[0.16, 0.04, 1.42]} />
          <meshStandardMaterial color="#c9a227" roughness={0.25} metalness={0.8} />
        </mesh>
        <mesh position={[0.7, 0.12, 0.7]}>
          <boxGeometry args={[0.16, 0.04, 1.42]} />
          <meshStandardMaterial color="#c9a227" roughness={0.25} metalness={0.8} />
        </mesh>
      </group>

      <group ref={cerradura} position={[0, 0.82, 0.74]}>
        <mesh castShadow>
          <boxGeometry args={[0.24, 0.34, 0.1]} />
          <meshStandardMaterial color="#d8b23a" roughness={0.22} metalness={0.85} />
        </mesh>
        <mesh position={[0, -0.05, 0.06]}>
          <torusGeometry args={[0.055, 0.02, 8, 20]} />
          <meshStandardMaterial color="#8a6a12" roughness={0.3} metalness={0.8} />
        </mesh>
      </group>

      <pointLight ref={brillo} position={[0, 1.15, 0]} color="#ffb64a" intensity={0} distance={4} />
      <mesh position={[0, 0.9, 0]}>
        <sphereGeometry args={[0.12, 20, 20]} />
        <meshStandardMaterial ref={orbe} color="#3a2a12" emissive="#ffb64a" emissiveIntensity={0} />
      </mesh>

      <group ref={monedas} position={[0, 0.68, 0]}>
        {MONEDAS.map((posicion, i) => (
          <mesh key={i} position={posicion} rotation={[0, i * 0.7, 0]} castShadow>
            <cylinderGeometry args={[0.16, 0.16, 0.06, 24]} />
            <meshStandardMaterial color="#e0b93f" roughness={0.28} metalness={0.9} />
          </mesh>
        ))}
      </group>

      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]} receiveShadow>
        <planeGeometry args={[9, 7]} />
        <meshStandardMaterial color="#171b24" roughness={0.95} />
      </mesh>
    </group>
  )
}

export default function Cofre() {
  const [clave, setClave] = useState(0)
  const paso = useRef<HTMLSpanElement>(null)

  return (
    <DemoEscena
      titulo="Apertura de un cofre en cuatro pasos"
      descripcion="Un cofre de madera se abre en una secuencia de cuatro pasos: la cerradura se levanta, la tapa gira, aparece un brillo interior y las monedas suben. Un botón reinicia la secuencia y un indicador muestra el paso actual."
      camara={[3.6, 2.8, 5]}
      sombras
      controles={
        <>
          <button
            type="button"
            onClick={() => setClave((valor) => valor + 1)}
            className="rounded-lg border border-borde bg-superficie-alta px-3 py-1 text-xs font-medium text-texto transition hover:border-acento"
          >
            Reproducir de nuevo
          </button>
          <span ref={paso} className="font-mono text-[11px] text-texto-tenue">
            paso 1 de 4
          </span>
        </>
      }
      nota="Cada paso tiene su propio tramo de tiempo y su propia curva: back para la cerradura, in-out para la tapa, out para el brillo y out para las monedas. Todo ocurre en un único useFrame."
    >
      <Escena clave={clave} paso={paso} />
    </DemoEscena>
  )
}

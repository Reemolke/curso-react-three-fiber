import { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing'
import type { Group } from 'three'
import { DemoEscena, Interruptor } from '../marco'

/** Publica fps y milisegundos por frame dos veces por segundo. */
function Medidor({ alInformar }: { alInformar: (texto: string) => void }) {
  const acumulado = useRef({ tiempo: 0, frames: 0 })

  useFrame((_, delta) => {
    const datos = acumulado.current
    datos.tiempo += delta
    datos.frames += 1
    if (datos.tiempo < 0.5) return
    const fps = Math.round(datos.frames / datos.tiempo)
    const ms = (datos.tiempo / datos.frames) * 1000
    alInformar(`${fps} fps · ${ms.toFixed(2)} ms/frame`)
    datos.tiempo = 0
    datos.frames = 0
  })

  return null
}

function Escena() {
  const grupo = useRef<Group>(null)

  useFrame((_, delta) => {
    if (grupo.current) grupo.current.rotation.y += delta * 0.4
  })

  return (
    <group ref={grupo}>
      <mesh position={[0, 0.35, 0]}>
        <torusKnotGeometry args={[0.55, 0.17, 140, 20]} />
        <meshStandardMaterial
          color="#1b2b47"
          emissive="#4d8df6"
          emissiveIntensity={0.45}
          roughness={0.25}
          metalness={0.6}
        />
      </mesh>

      <mesh position={[-1.35, -0.5, 0.5]}>
        <sphereGeometry args={[0.32, 32, 24]} />
        <meshStandardMaterial
          color="#1a1220"
          emissive="#e05f7a"
          emissiveIntensity={0.7}
          roughness={0.3}
        />
      </mesh>

      <mesh position={[1.35, -0.35, -0.3]}>
        <boxGeometry args={[0.5, 0.5, 0.5]} />
        <meshStandardMaterial
          color="#1b2b47"
          emissive="#3fbf87"
          emissiveIntensity={0.5}
          roughness={0.4}
        />
      </mesh>

      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.85, 0]}>
        <planeGeometry args={[8, 8]} />
        <meshStandardMaterial color="#0e1421" roughness={0.9} />
      </mesh>
    </group>
  )
}

/**
 * Postprocesado con interruptor y coste medido.
 *
 * Sin `EffectComposer` la escena se dibuja directo al lienzo. Con él, se dibuja
 * primero a una textura, se aplican los pases y esa textura se pinta al final.
 * Ese viaje extra es el precio: aquí se ve en milisegundos por frame.
 */
export default function Composer() {
  const [activo, setActivo] = useState(true)
  const [medida, setMedida] = useState('midiendo…')

  return (
    <DemoEscena
      titulo="EffectComposer: encender y apagar"
      descripcion="Tres objetos emisivos giran sobre un suelo oscuro. Con el postprocesado activo hay bloom y viñeta; sin él, la escena se dibuja directamente. El marcador muestra el coste en milisegundos por frame."
      alto={380}
      camara={[0, 1.1, 4.6]}
      controles={
        <>
          <Interruptor etiqueta="postprocesado" activo={activo} onChange={setActivo} />
          <span className="ml-auto font-mono text-[11px] text-texto-suave">{medida}</span>
        </>
      }
      nota="La cadena de efectos no está en la escena: es un segundo pase sobre el lienzo. Cada efecto añade una pasada completa de pantalla completa, así que el coste crece con la resolución, no con el número de objetos. En pantallas grandes, dos efectos ya se notan."
    >
      <Medidor alInformar={setMedida} />

      <ambientLight intensity={0.5} />
      <directionalLight position={[4, 5, 3]} intensity={1.4} />

      <Escena />

      {activo && (
        <EffectComposer multisampling={0}>
          <Bloom intensity={0.8} luminanceThreshold={0.4} luminanceSmoothing={0.3} mipmapBlur />
          <Vignette offset={0.28} darkness={0.72} />
        </EffectComposer>
      )}
    </DemoEscena>
  )
}

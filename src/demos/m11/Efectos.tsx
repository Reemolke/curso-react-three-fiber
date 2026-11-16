import { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import {
  EffectComposer,
  Bloom,
  ChromaticAberration,
  DepthOfField,
  Noise,
  SSAO,
  Vignette,
} from '@react-three/postprocessing'
import type { Group } from 'three'
import { DemoEscena } from '../marco'

type Clave = 'bloom' | 'ssao' | 'dof' | 'vineta' | 'ruido' | 'aberración'

const EFECTOS: { clave: Clave; etiqueta: string; coste: string }[] = [
  { clave: 'bloom', etiqueta: 'Bloom', coste: 'medio' },
  { clave: 'ssao', etiqueta: 'SSAO', coste: 'alto' },
  { clave: 'dof', etiqueta: 'Profundidad de campo', coste: 'alto' },
  { clave: 'vineta', etiqueta: 'Viñeta', coste: 'bajo' },
  { clave: 'ruido', etiqueta: 'Ruido', coste: 'bajo' },
  { clave: 'aberración', etiqueta: 'Aberración cromática', coste: 'bajo' },
]

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
    if (grupo.current) grupo.current.rotation.y += delta * 0.25
  })

  return (
    <>
      <ambientLight intensity={0.3} />
      <directionalLight position={[5, 7, 4]} intensity={1.6} />

      <group ref={grupo}>
        <mesh position={[0, 0.15, 0]}>
          <torusKnotGeometry args={[0.48, 0.15, 128, 18]} />
          <meshStandardMaterial
            color="#1b2b47"
            emissive="#4d8df6"
            emissiveIntensity={0.45}
            roughness={0.3}
            metalness={0.5}
          />
        </mesh>
      </group>

      <mesh position={[-1.5, -0.35, 1.4]}>
        <icosahedronGeometry args={[0.34, 0]} />
        <meshStandardMaterial color="#1b2b47" emissive="#e05f7a" emissiveIntensity={0.65} />
      </mesh>

      <mesh position={[1.6, 0.15, -1.8]}>
        <boxGeometry args={[0.62, 0.62, 0.62]} />
        <meshStandardMaterial color="#1b2b47" emissive="#3fbf87" emissiveIntensity={0.5} />
      </mesh>

      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.95, 0]} receiveShadow>
        <planeGeometry args={[10, 10]} />
        <meshStandardMaterial color="#0e1421" roughness={0.92} />
      </mesh>
    </>
  )
}

/**
 * Seis efectos conmutables.
 *
 * El panel no es una lista de la compra: sirve para comprobar que bloom y viñeta
 * son baratos, SSAO y profundidad de campo caros, y que tres efectos a la vez ya
 * cuestan más que toda la geometría de la escena.
 */
export default function Efectos() {
  const [activos, setActivos] = useState<Record<Clave, boolean>>({
    bloom: true,
    ssao: false,
    dof: false,
    vineta: true,
    ruido: false,
    aberración: false,
  })
  const [medida, setMedida] = useState('midiendo…')

  const alternar = (clave: Clave) =>
    setActivos((previos) => ({ ...previos, [clave]: !previos[clave] }))

  const ninguno = EFECTOS.every((efecto) => !activos[efecto.clave])

  return (
    <DemoEscena
      titulo="Seis efectos, todos opcionales"
      descripcion="Escena con tres objetos emisivos a distintas profundidades. Cada casilla añade o quita un efecto de postprocesado, y el marcador muestra el coste en milisegundos por frame."
      alto={400}
      camara={[0, 1, 4.4]}
      controles={
        <>
          {EFECTOS.map((efecto) => (
            <label
              key={efecto.clave}
              className="flex cursor-pointer items-center gap-1.5 text-xs text-texto-suave"
            >
              <input
                type="checkbox"
                checked={activos[efecto.clave]}
                onChange={() => alternar(efecto.clave)}
                className="size-3.5 accent-acento"
              />
              {efecto.etiqueta}
              <span className="font-mono text-[10px] text-texto-tenue">{efecto.coste}</span>
            </label>
          ))}
          <span className="ml-auto font-mono text-[11px] text-texto-suave">{medida}</span>
        </>
      }
      nota="El orden importa: SSAO necesita el normal pass y va antes que bloom; la viñeta se pone al final porque oscurece los bordes de lo ya compuesto. Un efecto desactivado no cuesta, pero el `EffectComposer` sí: aunque no haya ninguno activo, la escena se sigue dibujando a una textura."
    >
      <Medidor alInformar={setMedida} />

      <Escena />

      {!ninguno && (
        <EffectComposer
          key={activos.ssao ? 'con-normal' : 'sin-normal'}
          multisampling={0}
          enableNormalPass={activos.ssao}
        >
          {activos.ssao ? <SSAO intensity={22} radius={0.06} luminanceInfluence={0.4} /> : null}
          {activos.dof ? (
            <DepthOfField focusDistance={0.03} focalLength={0.06} bokehScale={3.2} />
          ) : null}
          {activos.bloom ? (
            <Bloom intensity={0.85} luminanceThreshold={0.4} luminanceSmoothing={0.25} mipmapBlur />
          ) : null}
          {activos.aberración ? (
            <ChromaticAberration offset={[0.0018, 0.0018]} radialModulation={false} />
          ) : null}
          {activos.ruido ? <Noise opacity={0.12} /> : null}
          {activos.vineta ? <Vignette offset={0.3} darkness={0.7} /> : null}
        </EffectComposer>
      )}
    </DemoEscena>
  )
}

import { useRef } from 'react'
import type { RefObject } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { ScrollControls, useScroll } from '@react-three/drei'
import { MathUtils, Vector3 } from 'three'
import type { Group } from 'three'
import { DemoEscena } from '../marco'

const ESTACIONES = [-3.8, 0, 3.8]
const COLORES = ['#f5a524', '#4d8df6', '#3fbf87']

const CAMARAS = [
  new Vector3(-3.8, 2.0, 4.6),
  new Vector3(0, 3.2, 5.6),
  new Vector3(3.8, 2.0, 4.6),
]

const OBJETIVOS = [
  new Vector3(-3.8, 0.85, 0),
  new Vector3(0, 1.0, 0),
  new Vector3(3.8, 0.75, 0),
]

function Estacion({
  x,
  color,
  indice,
}: {
  x: number
  color: string
  indice: number
}) {
  const grupo = useRef<Group>(null)
  const scroll = useScroll()

  useFrame(() => {
    const t = scroll.offset * (CAMARAS.length - 1)
    const cercania = Math.max(0, 1 - Math.abs(t - indice))
    const actual = grupo.current
    if (!actual) return

    actual.scale.setScalar(0.85 + cercania * 0.35)
    actual.rotation.y = cercania * 0.55
  })

  return (
    <group ref={grupo} position={[x, 0, 0]}>
      <mesh position={[0, 0.2, 0]}>
        <cylinderGeometry args={[0.62, 0.76, 0.4, 6]} />
        <meshStandardMaterial color="#242a38" roughness={0.85} />
      </mesh>

      {indice === 0 && (
        <mesh position={[0, 0.85, 0]} rotation={[0.15, 0.4, 0]}>
          <boxGeometry args={[0.9, 0.9, 0.9]} />
          <meshStandardMaterial color={color} roughness={0.3} metalness={0.15} />
        </mesh>
      )}

      {indice === 1 && (
        <mesh position={[0, 0.9, 0]}>
          <torusKnotGeometry args={[0.38, 0.13, 80, 10]} />
          <meshStandardMaterial color={color} roughness={0.25} metalness={0.3} />
        </mesh>
      )}

      {indice === 2 && (
        <mesh position={[0, 1.0, 0]} rotation={[0, 0.5, 0]}>
          <coneGeometry args={[0.6, 1.15, 6]} />
          <meshStandardMaterial color={color} roughness={0.35} />
        </mesh>
      )}
    </group>
  )
}

function CamaraScroll({ seccion }: { seccion: RefObject<HTMLSpanElement | null> }) {
  const camara = useThree((estado) => estado.camera)
  const scroll = useScroll()
  const objetivo = useRef(new Vector3(0, 1, 0))
  const ultimaPagina = useRef(-1)

  useFrame(() => {
    const recorrido = scroll.offset * (CAMARAS.length - 1)
    const t = MathUtils.clamp(recorrido, 0, CAMARAS.length - 1)
    const i = Math.min(Math.floor(t), CAMARAS.length - 2)
    const fraccion = t - i
    // Suaviza los empalmes entre tramos sin tocar la amortiguación del scroll.
    const suave = fraccion * fraccion * (3 - 2 * fraccion)

    camara.position.lerpVectors(CAMARAS[i]!, CAMARAS[i + 1]!, suave)
    objetivo.current.lerpVectors(OBJETIVOS[i]!, OBJETIVOS[i + 1]!, suave)
    camara.lookAt(objetivo.current)

    const pagina = Math.round(scroll.offset * (CAMARAS.length - 1)) + 1
    if (pagina !== ultimaPagina.current) {
      ultimaPagina.current = pagina
      if (seccion.current) seccion.current.textContent = `${pagina} de 3`
    }
  })

  return null
}

export default function Scroll() {
  const seccion = useRef<HTMLSpanElement>(null)

  return (
    <DemoEscena
      titulo="ScrollControls: tres estaciones"
      descripcion="Una página 3D con tres estaciones alineadas. Al desplazar la rueda sobre el lienzo, la cámara viaja de una a otra y la estación más cercana crece y gira. Un indicador muestra en qué sección estás."
      alto={430}
      camara={[0, 3.2, 5.6]}
      fov={45}
      controles={
        <p className="flex w-full flex-wrap items-center gap-x-4 gap-y-1 text-xs text-texto-suave">
          <span className="font-mono text-[10px] uppercase tracking-widest text-texto-tenue">
            sección
          </span>
          <span ref={seccion} className="font-mono text-sm text-acento">
            1 de 3
          </span>
          <span className="text-texto-tenue">
            Rueda sobre el lienzo. Fuera de él, la rueda sigue moviendo la página de la lección.
          </span>
        </p>
      }
      nota="ScrollControls crea un contenedor con scroll dentro del canvas. Por eso la demo tiene una altura fija de 430 px: sin una altura explícita no hay nada que desplazar. El offset va de 0 a 1 y se lee en useFrame, no en el render."
    >
      <ScrollControls pages={3} damping={0.28}>
        <CamaraScroll seccion={seccion} />

        <ambientLight intensity={0.6} />
        <directionalLight position={[4, 7, 5]} intensity={2.3} />

        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.03, 0]}>
          <planeGeometry args={[34, 20]} />
          <meshStandardMaterial color="#10141c" roughness={0.95} />
        </mesh>

        {ESTACIONES.map((x, i) => (
          <Estacion key={i} x={x} color={COLORES[i]!} indice={i} />
        ))}
      </ScrollControls>
    </DemoEscena>
  )
}

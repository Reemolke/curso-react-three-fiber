import { useEffect, useState } from 'react'
import { useThree } from '@react-three/fiber'
import { Bloom, EffectComposer, Vignette } from '@react-three/postprocessing'
import { DemoEscena, GrupoOpciones, Interruptor } from '../marco'
import { Medidor, PanelMetricas, useSalidas } from './medicion'

type Resolucion = '0.5' | '1' | '1.5' | '2'

const RESOLUCIONES: { valor: Resolucion; texto: string }[] = [
  { valor: '0.5', texto: '0,5' },
  { valor: '1', texto: '1' },
  { valor: '1.5', texto: '1,5' },
  { valor: '2', texto: '2' },
]

const PIEZAS = [
  { x: -2.4, z: -1.2, color: '#4d8df6' },
  { x: -1.1, z: -2.1, color: '#3fbf87' },
  { x: 0.4, z: -1.6, color: '#f5a524' },
  { x: 1.8, z: -2.2, color: '#e05f7a' },
  { x: 2.6, z: -0.4, color: '#a78bfa' },
  { x: 1.2, z: 1.1, color: '#4d8df6' },
  { x: -0.6, z: 1.6, color: '#3fbf87' },
  { x: -2.2, z: 1.2, color: '#f5a524' },
]

/** Aplica el `dpr` desde React: es un ajuste del renderer, no de la escena. */
function Resolucion({ dpr }: { dpr: number }) {
  const setDpr = useThree((estado) => estado.setDpr)

  useEffect(() => {
    setDpr(dpr)
  }, [dpr, setDpr])

  return null
}

/** Dentro del canvas: escena, sombras, postprocesado y medidor. */
function Escena({
  dpr,
  sombras,
  post,
  salidas,
}: {
  dpr: number
  sombras: boolean
  post: boolean
  salidas: ReturnType<typeof useSalidas>
}) {
  return (
    <>
      <Resolucion dpr={dpr} />

      <ambientLight intensity={0.5} />
      <directionalLight
        position={[6, 9, 4]}
        intensity={2.4}
        castShadow={sombras}
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-camera-left={-8}
        shadow-camera-right={8}
        shadow-camera-top={8}
        shadow-camera-bottom={-8}
      />
      <directionalLight position={[-6, 3, -5]} intensity={0.5} color="#9fc2ff" />

      {PIEZAS.map((pieza, indice) => (
        <mesh
          key={indice}
          position={[pieza.x, 0.55, pieza.z]}
          castShadow
          receiveShadow
        >
          <boxGeometry args={[0.8, 0.8, 0.8]} />
          <meshStandardMaterial
            color={pieza.color}
            emissive={pieza.color}
            emissiveIntensity={0.5}
            roughness={0.4}
            metalness={0.2}
          />
        </mesh>
      ))}

      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[18, 14]} />
        <meshStandardMaterial color="#151d2e" roughness={0.95} />
      </mesh>

      {post ? (
        <EffectComposer key="con-post" multisampling={0}>
          <Bloom intensity={0.9} luminanceThreshold={0.4} luminanceSmoothing={0.3} mipmapBlur />
          <Vignette offset={0.32} darkness={0.65} />
        </EffectComposer>
      ) : null}

      <Medidor salidas={salidas} />
    </>
  )
}

/**
 * Presupuesto móvil: bajar resolución antes que bajar contenido.
 *
 * Los tres controles son las tres palancas que de verdad mueven el coste en un
 * teléfono: píxeles (dpr), sombras y pases de postprocesado. Ninguna toca la
 * escena. La idea es degradar en ese orden hasta que el frame vuelva a caber en
 * 16,7 ms, y no al revés.
 */
export default function Movil() {
  const [resolucion, setResolucion] = useState<Resolucion>('1')
  const [sombras, setSombras] = useState(true)
  const [post, setPost] = useState(true)
  const salidas = useSalidas()

  return (
    <DemoEscena
      titulo="Modo móvil simulado: dpr, sombras y postprocesado"
      descripcion="Una escena sencilla con ocho piezas y su suelo. Tres controles degradan el coste: la resolución interna del lienzo, las sombras y el postprocesado. El panel mide fps, milisegundos por frame, draw calls, triángulos y memoria."
      alto={400}
      camara={[5.5, 5, 7.5]}
      sombras
      controles={
        <div className="w-full space-y-3">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
            <GrupoOpciones
              etiqueta="dpr"
              valor={resolucion}
              opciones={RESOLUCIONES}
              onChange={setResolucion}
            />
            <Interruptor etiqueta="sombras" activo={sombras} onChange={setSombras} />
            <Interruptor etiqueta="postprocesado" activo={post} onChange={setPost} />
            <span className="ml-auto font-mono text-[11px] text-texto-tenue">
              presupuesto: 16,7 ms
            </span>
          </div>
          <PanelMetricas salidas={salidas} />
        </div>
      }
      nota="Bajar el dpr de 2 a 0,5 reduce los píxeles a la cuarta parte y es lo que más se nota en un móvil de gama media. Las sombras cuestan una pasada extra de la escena por cada luz que las proyecta. El postprocesado cuesta un pase de pantalla completa por efecto, más copias. Se degrada en ese orden: primero resolución, después sombras, al final efectos."
    >
      <Escena dpr={Number(resolucion)} sombras={sombras} post={post} salidas={salidas} />
    </DemoEscena>
  )
}

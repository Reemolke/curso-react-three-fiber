import { useState } from 'react'
import { MeshReflectorMaterial } from '@react-three/drei'
import { DemoEscena, Deslizador, GrupoOpciones } from '../marco'

type Resolucion = '256' | '512' | '1024'

const RESOLUCIONES: { valor: Resolucion; texto: string }[] = [
  { valor: '256', texto: '256' },
  { valor: '512', texto: '512' },
  { valor: '1024', texto: '1024' },
]

const PIEZAS = [
  { posicion: [-1.5, 1.05, -0.4], color: '#4d8df6', forma: 'caja' },
  { posicion: [0, 1.75, 0.2], color: '#f5a524', forma: 'nudo' },
  { posicion: [1.6, 1.15, -0.5], color: '#e05f7a', forma: 'esfera' },
  { posicion: [0.6, 0.62, 1.35], color: '#3fbf87', forma: 'caja' },
  { posicion: [-0.9, 0.7, 1.5], color: '#a78bfa', forma: 'esfera' },
] as const

/** Dentro del canvas: el suelo es el espejo. */
function EspejoEscena({ resolucion, desenfoque }: { resolucion: number; desenfoque: number }) {
  const borroso = desenfoque > 0.02

  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[3.5, 6, 4]} intensity={2.4} />
      <directionalLight position={[-4, 2.5, -3]} intensity={0.7} color="#9fc2ff" />

      {PIEZAS.map((pieza, indice) => (
        <mesh key={indice} position={pieza.posicion as unknown as [number, number, number]}>
          {pieza.forma === 'caja' ? (
            <boxGeometry args={[0.85, 0.85, 0.85]} />
          ) : pieza.forma === 'esfera' ? (
            <sphereGeometry args={[0.55, 32, 24]} />
          ) : (
            <torusKnotGeometry args={[0.42, 0.15, 96, 16]} />
          )}
          <meshStandardMaterial
            color={pieza.color}
            emissive={pieza.color}
            emissiveIntensity={0.18}
            roughness={0.32}
            metalness={0.35}
          />
        </mesh>
      ))}

      {/* El espejo: un plano con un material que hace su propio render a textura. */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
        <planeGeometry args={[14, 14]} />
        <MeshReflectorMaterial
          resolution={resolucion}
          blur={[220 * desenfoque, 70 * desenfoque]}
          mixBlur={Math.max(desenfoque, 0.01)}
          mixStrength={5.5}
          mirror={borroso ? 0.5 : 0.9}
          roughness={0.85}
          metalness={0.4}
          depthScale={1.1}
          minDepthThreshold={0.4}
          maxDepthThreshold={1.4}
          color="#101623"
        />
      </mesh>
    </>
  )
}

/**
 * Espejo real con render target.
 *
 * `MeshReflectorMaterial` de drei hace exactamente lo que la lección explica a
 * mano en el minimapa: crea un `WebGLRenderTarget`, coloca una cámara reflejada
 * respecto al plano del suelo, dibuja la escena desde ahí y proyecta la textura
 * sobre el plano con la matriz de la cámara. Añade dos cosas que el minimapa no
 * necesita: un plano de recorte oblicuo, para que no se cuele lo que queda por
 * debajo del espejo, y un desenfoque por profundidad, que es lo que hace que el
 * reflejo parezca un suelo pulido y no una lámina perfecta.
 */
export default function Espejo() {
  const [resolucion, setResolucion] = useState<Resolucion>('512')
  const [desenfoque, setDesenfoque] = useState(0.55)

  const lado = Number(resolucion)

  return (
    <DemoEscena
      titulo="Espejo real, con cámara reflejada"
      descripcion="Cinco piezas geométricas flotan sobre un suelo que refleja la escena. El reflejo se dibuja a una textura con una cámara reflejada respecto al plano del suelo."
      alto={380}
      camara={[3.6, 2.7, 5.4]}
      fov={45}
      controles={
        <>
          <GrupoOpciones
            etiqueta="resolución"
            valor={resolucion}
            opciones={RESOLUCIONES}
            onChange={setResolucion}
          />
          <Deslizador
            etiqueta="desenfoque"
            valor={desenfoque}
            min={0}
            max={1}
            paso={0.05}
            onChange={setDesenfoque}
          />
          <span className="ml-auto font-mono text-[11px] text-texto-tenue">
            {lado}×{lado} · {desenfoque < 0.05 ? 'reflejo nítido' : 'reflejo difuso'}
          </span>
        </>
      }
      nota="El reflejo no es una segunda escena: es una textura que se repinta cada frame desde una cámara colocada debajo del suelo, simétrica a la tuya. Con 256 px y desenfoque alto no se nota; con 1024 px y desenfoque a cero se ven los bordes de las piezas y el coste sube."
    >
      <EspejoEscena resolucion={lado} desenfoque={desenfoque} />
    </DemoEscena>
  )
}

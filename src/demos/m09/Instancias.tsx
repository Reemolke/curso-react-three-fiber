import { useRef, useState } from 'react'
import { Instance, Instances } from '@react-three/drei'
import { useFrame, useThree } from '@react-three/fiber'
import type { Group } from 'three'
import { DemoEscena, GrupoOpciones } from '../marco'

type Modo = 'mallas' | 'instancias'

const MODOS: { valor: Modo; texto: string }[] = [
  { valor: 'mallas', texto: '1 000 mallas' },
  { valor: 'instancias', texto: 'Instances' },
]

const LADO = 10
const CANTIDAD = LADO * LADO

/** Publica fps, draw calls y triángulos dos veces por segundo. */
function MedidorEscena({ alMedir }: { alMedir: (datos: string) => void }) {
  const gl = useThree((estado) => estado.gl)
  const tiempo = useRef(0)
  const frames = useRef(0)

  useFrame((_, delta) => {
    tiempo.current += delta
    frames.current += 1

    if (tiempo.current >= 0.5) {
      const fps = Math.round(frames.current / tiempo.current)
      const llamadas = gl.info.render.calls
      const triangulos = gl.info.render.triangles
      alMedir(`${fps} fps · ${llamadas} draw calls · ${triangulos.toLocaleString('es-ES')} triángulos`)
      tiempo.current = 0
      frames.current = 0
    }
  })

  return null
}

function Cuadricula({ modo }: { modo: Modo }) {
  const grupo = useRef<Group>(null)

  useFrame((_, delta) => {
    if (grupo.current) grupo.current.rotation.y += delta * 0.08
  })

  const posiciones = Array.from({ length: CANTIDAD }, (_, indice) => {
    const fila = Math.floor(indice / LADO)
    const columna = indice % LADO
    return [
      (columna - (LADO - 1) / 2) * 0.62,
      Math.sin(indice * 0.7) * 0.22,
      (fila - (LADO - 1) / 2) * 0.62,
    ] as [number, number, number]
  })

  if (modo === 'instancias') {
    return (
      <group ref={grupo}>
        <Instances limit={CANTIDAD} castShadow receiveShadow>
          <boxGeometry args={[0.34, 0.34, 0.34]} />
          <meshStandardMaterial color="#4d8df6" roughness={0.45} metalness={0.1} />
          {posiciones.map((posicion, indice) => (
            <Instance key={indice} position={posicion} />
          ))}
        </Instances>
      </group>
    )
  }

  return (
    <group ref={grupo}>
      {posiciones.map((posicion, indice) => (
        <mesh key={indice} position={posicion} castShadow>
          <boxGeometry args={[0.34, 0.34, 0.34]} />
          <meshStandardMaterial color="#4d8df6" roughness={0.45} metalness={0.1} />
        </mesh>
      ))}
    </group>
  )
}

export default function Instancias() {
  const [modo, setModo] = useState<Modo>('mallas')
  const [medida, setMedida] = useState('midiendo…')

  return (
    <DemoEscena
      titulo="Mil cajas: mallas sueltas frente a instancias"
      descripcion="La misma cuadrícula de mil cajas montada de dos formas. El marcador muestra frames por segundo, draw calls y triángulos dibujados en cada caso."
      alto={380}
      camara={[7, 6, 9]}
      controles={
        <>
          <GrupoOpciones etiqueta="montaje" valor={modo} opciones={MODOS} onChange={setModo} />
          <span className="ml-auto font-mono text-[11px] text-texto-suave">{medida}</span>
        </>
      }
      nota="Con 1 000 mallas, three.js envía 1 000 draw calls por frame; con `Instances`, una sola. El coste de CPU no está en los vértices (son cajas) sino en preparar y enviar cada objeto. Instancing no sirve si cada copia necesita su propio material o su propia geometría."
    >
      <MedidorEscena alMedir={setMedida} />

      <ambientLight intensity={0.5} />
      <directionalLight position={[6, 9, 4]} intensity={2.2} />
      <directionalLight position={[-6, 3, -5]} intensity={0.5} color="#9fc2ff" />

      <Cuadricula modo={modo} />

      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.9, 0]} receiveShadow>
        <planeGeometry args={[26, 26]} />
        <meshStandardMaterial color="#141a29" roughness={0.95} />
      </mesh>
    </DemoEscena>
  )
}

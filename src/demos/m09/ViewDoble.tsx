import { useRef, useState, type RefObject } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { View } from '@react-three/drei'
import type { Group } from 'three'
import { GrupoOpciones, Marco } from '../marco'

type Modo = 'dos' | 'view'

const MODOS: { valor: Modo; texto: string }[] = [
  { valor: 'dos', texto: 'dos Canvas' },
  { valor: 'view', texto: 'un Canvas + View' },
]

function Escena({ color, rapidez }: { color: string; rapidez: number }) {
  const grupo = useRef<Group>(null)

  useFrame((_, delta) => {
    if (grupo.current) grupo.current.rotation.y += delta * rapidez
  })

  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight position={[3, 5, 4]} intensity={2.2} />

      <group ref={grupo}>
        <mesh position={[-0.55, 0.2, 0]}>
          <torusKnotGeometry args={[0.34, 0.11, 96, 16]} />
          <meshStandardMaterial color={color} roughness={0.3} metalness={0.35} />
        </mesh>
        <mesh position={[0.62, -0.15, 0]} rotation={[0.4, 0.6, 0]}>
          <boxGeometry args={[0.62, 0.62, 0.62]} />
          <meshStandardMaterial color="#f5a524" roughness={0.45} />
        </mesh>
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.62, 0]}>
          <circleGeometry args={[1.7, 48]} />
          <meshStandardMaterial color="#171d2e" roughness={0.95} />
        </mesh>
      </group>
    </>
  )
}

/**
 * Dos viewports con un solo contexto WebGL.
 *
 * Con dos `<Canvas>` hay dos contextos, dos escenas y dos bucles de render. Con
 * `<View>` hay un contexto y varias cámaras que se dibujan en regiones distintas
 * del mismo lienzo. La demo monta las dos versiones para que se pueda comparar
 * el coste real en la misma máquina.
 */
export default function ViewDoble() {
  const [modo, setModo] = useState<Modo>('dos')
  const raiz = useRef<HTMLDivElement>(null)

  return (
    <Marco titulo="Dos viewports: dos contextos frente a uno">
      <div className="space-y-2 p-2">
        <GrupoOpciones etiqueta="montaje" valor={modo} opciones={MODOS} onChange={setModo} />

        {modo === 'dos' ? (
          <div className="grid gap-2 sm:grid-cols-2">
            <div className="h-[230px] overflow-hidden rounded-lg border border-borde">
              <Canvas camera={{ position: [2.6, 1.8, 3.2] }} dpr={[1, 1.5]}>
                <Escena color="#4d8df6" rapidez={0.6} />
              </Canvas>
            </div>
            <div className="h-[230px] overflow-hidden rounded-lg border border-borde">
              <Canvas camera={{ position: [2.6, 1.8, 3.2] }} dpr={[1, 1.5]}>
                <Escena color="#3fbf87" rapidez={1.2} />
              </Canvas>
            </div>
          </div>
        ) : (
          <div ref={raiz} className="relative">
            <Canvas
              eventSource={raiz as RefObject<HTMLElement>}
              style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}
              dpr={[1, 1.5]}
            >
              <View.Port />
            </Canvas>

            <div className="relative grid gap-2 sm:grid-cols-2">
              <div className="h-[230px] overflow-hidden rounded-lg border border-borde">
                <View style={{ width: '100%', height: '100%' }}>
                  <Escena color="#4d8df6" rapidez={0.6} />
                </View>
              </div>
              <div className="h-[230px] overflow-hidden rounded-lg border border-borde">
                <View style={{ width: '100%', height: '100%' }}>
                  <Escena color="#3fbf87" rapidez={1.2} />
                </View>
              </div>
            </div>
          </div>
        )}

        <p className="text-[11px] leading-relaxed text-texto-tenue">
          {modo === 'dos'
            ? 'Dos contextos WebGL: dos lienzos, dos escenas, dos bucles. Es lo simple y lo que hace casi todo el mundo hasta que la página empieza a ir lenta.'
            : 'Un contexto WebGL y dos cámaras con `setViewport` y `setScissor`. Cada `View` tiene su propia escena y su propio bucle de render, pero comparten GPU, texturas y memoria.'}
        </p>
      </div>
    </Marco>
  )
}

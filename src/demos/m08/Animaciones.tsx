import { useEffect, useRef, useState } from 'react'
import { LoopOnce } from 'three'
import type { Group } from 'three'
import { useAnimations } from '@react-three/drei'
import { MODELOS } from '../../tres/rutas'
import { useGLTF } from '../../tres/gltf'
import { DemoEscena, Deslizador } from '../marco'

type Clip = 'saludar' | 'asentir'

const CLIPS: { valor: Clip; texto: string }[] = [
  { valor: 'saludar', texto: 'saludar' },
  { valor: 'asentir', texto: 'asentir' },
]

/**
 * El robot del curso con sus dos clips.
 *
 * `useAnimations` envuelve un `AnimationMixer` y devuelve las acciones por
 * nombre. Aquí se reproduce un clip una vez y se encadena al otro con
 * `crossFadeTo`, que mezcla las dos poses durante el tiempo indicado en lugar
 * de cortar en seco.
 */
function Robot({
  clip,
  orden,
  fundido,
  alTerminar,
}: {
  clip: Clip
  orden: number
  fundido: number
  alTerminar: (nombre: string) => void
}) {
  const grupo = useRef<Group>(null)
  const { scene, animations } = useGLTF(MODELOS.robot)
  const { actions } = useAnimations(animations, grupo)

  useEffect(() => {
    const accion = actions[clip]
    if (!accion) return

    accion.reset()
    accion.setLoop(LoopOnce, 1)
    accion.clampWhenFinished = true
    accion.fadeIn(fundido).play()
    alTerminar(clip)

    return () => {
      accion.fadeOut(fundido)
    }
  }, [clip, orden, fundido, actions, alTerminar])

  return (
    <group ref={grupo}>
      <primitive object={scene} position={[0, -0.1, 0]} scale={1.7} />
    </group>
  )
}

export default function Animaciones() {
  const [clip, setClip] = useState<Clip>('saludar')
  const [orden, setOrden] = useState(1)
  const [fundido, setFundido] = useState(0.35)
  const [ultimo, setUltimo] = useState('—')

  const lanzar = (siguiente: Clip) => {
    setClip(siguiente)
    setOrden((valor) => valor + 1)
  }

  return (
    <DemoEscena
      titulo="Dos clips, una mezcla"
      descripcion="El robot del curso reproduce sus clips saludar y asentir. Al cambiar de clip, el anterior se desvanece mientras el nuevo entra durante el tiempo de fundido."
      alto={400}
      camara={[2.4, 1.6, 3.4]}
      controles={
        <>
          {CLIPS.map((entrada) => (
            <button
              key={entrada.valor}
              type="button"
              onClick={() => lanzar(entrada.valor)}
              className={`rounded-lg border px-2.5 py-1 text-xs font-medium transition ${
                clip === entrada.valor
                  ? 'border-acento bg-acento/15 text-texto'
                  : 'border-borde text-texto-suave hover:bg-superficie-alta'
              }`}
            >
              {entrada.texto}
            </button>
          ))}
          <Deslizador
            etiqueta="fundido (s)"
            valor={fundido}
            min={0}
            max={1.2}
            paso={0.05}
            onChange={setFundido}
          />
          <span className="ml-auto font-mono text-xs text-texto-suave">último: {ultimo}</span>
        </>
      }
      nota="`clipAction` devuelve una acción por nombre de clip. `reset()` vuelve a empezar, `LoopOnce` evita que se repita y `clampWhenFinished` deja la última pose. Con fundido 0 el corte es seco: se ve el salto entre poses."
    >
      <ambientLight intensity={0.55} />
      <directionalLight position={[3, 5, 3]} intensity={2.4} />
      <directionalLight position={[-3, 2, -2]} intensity={0.6} color="#9fc2ff" />

      <Robot clip={clip} orden={orden} fundido={fundido} alTerminar={setUltimo} />

      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.12, 0]} receiveShadow>
        <circleGeometry args={[4.5, 64]} />
        <meshStandardMaterial color="#171d2e" roughness={0.92} />
      </mesh>
    </DemoEscena>
  )
}

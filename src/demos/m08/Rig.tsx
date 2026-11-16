import { useEffect, useRef, useState } from 'react'
import { AxesHelper, LoopRepeat } from 'three'
import type { Group, Object3D } from 'three'
import { useAnimations } from '@react-three/drei'
import { MODELOS } from '../../tres/rutas'
import { useGLTF } from '../../tres/gltf'
import { DemoEscena, GrupoOpciones, Interruptor } from '../marco'

type Clip = 'saludar' | 'asentir' | 'ninguno'

const CLIPS: { valor: Clip; texto: string }[] = [
  { valor: 'saludar', texto: 'saludar' },
  { valor: 'asentir', texto: 'asentir' },
  { valor: 'ninguno', texto: 'parado' },
]

/**
 * Los clips del curso son animación de nodos, no de vértices.
 *
 * El robot no tiene `SkinnedMesh` ni huesos: `saludar` rota el nodo
 * `hombro_der` y `asentir` rota `cabeza`. Por eso los ejes que se dibujan aquí
 * son los del nodo, y por eso la pieza se mueve entera. Un modelo riggeado de
 * verdad tendría una `Armature` con huesos y pesos por vértice; el resultado en
 * pantalla puede ser idéntico, pero el coste y el proceso no.
 */
function Robot({ clip, ejes }: { clip: Clip; ejes: boolean }) {
  const grupo = useRef<Group>(null)
  const { scene, animations, nodes } = useGLTF(MODELOS.robot)
  const { actions } = useAnimations(animations, grupo)

  useEffect(() => {
    for (const accion of Object.values(actions)) accion?.stop()

    if (clip === 'ninguno') return

    const accion = actions[clip]
    if (!accion) return

    accion.reset().setLoop(LoopRepeat, Infinity).play()
    return () => {
      accion.stop()
    }
  }, [clip, actions])

  useEffect(() => {
    if (!ejes) return

    const objetivos = [nodes.hombro_der, nodes.cabeza].filter(Boolean) as Object3D[]
    const ayudantes = objetivos.map((nodo) => {
      const ayudante = new AxesHelper(0.22)
      nodo.add(ayudante)
      return { nodo, ayudante }
    })

    return () => {
      for (const { nodo, ayudante } of ayudantes) nodo.remove(ayudante)
    }
  }, [ejes, nodes])

  return (
    <group ref={grupo}>
      <primitive object={scene} position={[0, -0.1, 0]} scale={1.7} />
    </group>
  )
}

export default function Rig() {
  const [clip, setClip] = useState<Clip>('saludar')
  const [ejes, setEjes] = useState(true)

  return (
    <DemoEscena
      titulo="Dónde están los pivotes que se mueven"
      descripcion="El robot con los ejes locales de los dos nodos animados: el hombro derecho y la cabeza. Se puede cambiar de clip o pararlo y mostrar u ocultar los ejes."
      alto={400}
      camara={[2.2, 1.5, 3.2]}
      controles={
        <>
          <GrupoOpciones etiqueta="clip" valor={clip} opciones={CLIPS} onChange={setClip} />
          <Interruptor etiqueta="ejes de los nodos" activo={ejes} onChange={setEjes} />
        </>
      }
      nota="Los ejes rojo, verde y azul son el origen local de cada nodo. Al reproducir el clip, el eje viaja con el nodo: la rotación se aplica ahí y arrastra toda la geometría hija. No hay deformación de vértices en este modelo."
    >
      <ambientLight intensity={0.55} />
      <directionalLight position={[3, 5, 3]} intensity={2.4} />
      <directionalLight position={[-3, 2, -2]} intensity={0.6} color="#9fc2ff" />

      <Robot clip={clip} ejes={ejes} />

      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.12, 0]}>
        <circleGeometry args={[4.5, 64]} />
        <meshStandardMaterial color="#171d2e" roughness={0.92} />
      </mesh>
    </DemoEscena>
  )
}

import { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import type { Group } from 'three'
import { MODELOS } from '../../tres/rutas'
import { useGLTF } from '../../tres/gltf'
import { DemoEscena, Interruptor } from '../marco'

/**
 * La pieza que se modela en la lección 8.6, vista desde el visor.
 *
 * La lección no puede repartir un `.blend` (Blender no forma parte del
 * repositorio), pero sí puede enseñar el resultado: la tuerca es el objeto más
 * pequeño del curso, 96 triángulos, y sirve para comprobar que un modelo se
 * puede revisar sin abrir el programa que lo creó.
 */
function Tuerca({ alambre }: { alambre: boolean }) {
  const grupo = useRef<Group>(null)
  const { scene } = useGLTF(MODELOS.tuerca)

  useFrame((_, delta) => {
    if (grupo.current) grupo.current.rotation.y += delta * 0.5
  })

  return (
    <group ref={grupo} scale={3.2} rotation={[0.35, 0, 0]}>
      <primitive object={scene} />
      {alambre && (
        <mesh position={[0, 0, 0]}>
          <torusGeometry args={[0.42, 0.28, 12, 6]} />
          <meshBasicMaterial color="#f5a524" wireframe />
        </mesh>
      )}
    </group>
  )
}

export default function Pieza() {
  const [alambre, setAlambre] = useState(false)

  return (
    <DemoEscena
      titulo="Resultado del modelado: una tuerca de 96 triángulos"
      descripcion="La tuerca del curso girando sobre un suelo. Un interruptor superpone una malla alámbrica aproximada para comparar la silueta con la topología."
      alto={360}
      camara={[2.6, 2, 3.4]}
      controles={<Interruptor etiqueta="ver la topología" activo={alambre} onChange={setAlambre} />}
      nota="Un modelo ligero no es un modelo pobre: esta pieza tiene 96 triángulos y 63 vértices. La malla alámbrica es una aproximación didáctica, no la topología real del GLB; para verla de verdad, carga tuerca.glb en el visor y activa el alambre."
    >
      <ambientLight intensity={0.45} />
      <directionalLight position={[3, 5, 3]} intensity={2.6} />
      <directionalLight position={[-4, 2, -3]} intensity={0.7} color="#9fc2ff" />

      <Tuerca alambre={alambre} />

      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.55, 0]}>
        <circleGeometry args={[4, 64]} />
        <meshStandardMaterial color="#171d2e" roughness={0.92} />
      </mesh>
    </DemoEscena>
  )
}

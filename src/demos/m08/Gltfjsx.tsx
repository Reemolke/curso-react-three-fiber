import { useState } from 'react'
import { MODELOS } from '../../tres/rutas'
import { useGLTF } from '../../tres/gltf'
import type * as THREE from 'three'
import { DemoEscena, GrupoOpciones } from '../marco'

type Vista = 'primitiva' | 'componente'

const VISTAS: { valor: Vista; texto: string }[] = [
  { valor: 'primitiva', texto: '<primitive>' },
  { valor: 'componente', texto: 'componente' },
]

/**
 * El componente que genera `gltfjsx`, reducido a lo esencial.
 *
 * No se ha ejecutado la herramienta sobre este archivo: se escribe a mano el
 * mismo patrón que produce (acceder a `nodes` y `materials` por nombre y usar
 * `geometry` / `material` como props). Así se ve qué gana y qué pierde frente a
 * `<primitive>` sin inventar código generado.
 */
function CajaPorNodos() {
  const { nodes, materials } = useGLTF(MODELOS.caja)
  const n = nodes as unknown as Record<string, THREE.Mesh>
  const m = materials as Record<string, THREE.Material>

  return (
    <group>
      <mesh geometry={n.cuerpo.geometry} material={m.caja_madera} />
      <mesh geometry={n.liston_norte_1.geometry} material={m.caja_liston} />
      <mesh geometry={n.liston_este_1.geometry} material={m.caja_liston} />
      <mesh geometry={n.esquinera_1.geometry} material={m.caja_metal} />
      <mesh geometry={n.etiqueta.geometry} material={m.caja_marca} />
    </group>
  )
}

function Primitiva() {
  const { scene } = useGLTF(MODELOS.caja)
  return <primitive object={scene} />
}

export default function Gltfjsx() {
  const [vista, setVista] = useState<Vista>('primitiva')

  return (
    <DemoEscena
      titulo="<primitive> frente al componente generado"
      descripcion="Dos copias de la misma caja de madera. La de la izquierda se monta con <primitive object={scene} />; la de la derecha, con mallas sueltas que usan geometry y material por nombre, que es el patrón que genera gltfjsx."
      alto={360}
      camara={[0, 1.8, 5.4]}
      controles={<GrupoOpciones etiqueta="montaje" valor={vista} opciones={VISTAS} onChange={setVista} />}
      nota="`<primitive>` monta el grafo entero tal cual: una línea y cero control. El componente generado repite cada malla con nombre, así que puedes cambiar un material, ocultar una pieza o animar un nodo concreto; a cambio, el archivo crece con el modelo."
    >
      <ambientLight intensity={0.45} />
      <directionalLight position={[3, 5, 3]} intensity={2.6} />
      <directionalLight position={[-4, 2, -2]} intensity={0.6} color="#9fc2ff" />

      <group position={[-1.35, 0, 0]} scale={1.05}>
        {vista === 'primitiva' ? <Primitiva /> : <CajaPorNodos />}
      </group>

      <group position={[1.35, 0, 0]} scale={1.05} rotation={[0, -0.35, 0]}>
        {vista === 'componente' ? <Primitiva /> : <CajaPorNodos />}
      </group>

      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.36, 0]}>
        <planeGeometry args={[9, 9]} />
        <meshStandardMaterial color="#161c2c" roughness={0.95} />
      </mesh>
    </DemoEscena>
  )
}

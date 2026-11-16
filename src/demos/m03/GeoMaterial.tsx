import { useState } from 'react'
import { DemoEscena, GrupoOpciones } from '../marco'

type Forma = 'caja' | 'esfera' | 'toro' | 'cono' | 'icosaedro'
type Material = 'basic' | 'standard' | 'physical' | 'normal'

const FORMAS: { valor: Forma; texto: string }[] = [
  { valor: 'caja', texto: 'caja' },
  { valor: 'esfera', texto: 'esfera' },
  { valor: 'toro', texto: 'toro' },
  { valor: 'cono', texto: 'cono' },
  { valor: 'icosaedro', texto: 'icosaedro' },
]

const MATERIALES: { valor: Material; texto: string }[] = [
  { valor: 'basic', texto: 'basic' },
  { valor: 'standard', texto: 'standard' },
  { valor: 'physical', texto: 'physical' },
  { valor: 'normal', texto: 'normal' },
]

/**
 * Geometría y material se eligen por separado porque son objetos distintos: el
 * `<mesh>` solo los une. Cambiar cualquiera de los dos desmonta un objeto de
 * three.js y monta otro, y se nota en que las aristas y el sombreado cambian a
 * la vez.
 */
function Pieza({ forma, material }: { forma: Forma; material: Material }) {
  return (
    <mesh position={[0, 0.9, 0]} rotation={[0.35, 0.6, 0]}>
      {forma === 'caja' && <boxGeometry args={[1.5, 1.5, 1.5]} />}
      {forma === 'esfera' && <sphereGeometry args={[0.95, 48, 32]} />}
      {forma === 'toro' && <torusGeometry args={[0.72, 0.31, 32, 72]} />}
      {forma === 'cono' && <coneGeometry args={[0.9, 1.6, 48]} />}
      {forma === 'icosaedro' && <icosahedronGeometry args={[1, 1]} />}

      {material === 'basic' && <meshBasicMaterial color="#f5a524" />}
      {material === 'standard' && (
        <meshStandardMaterial color="#f5a524" roughness={0.34} metalness={0.2} />
      )}
      {material === 'physical' && (
        <meshPhysicalMaterial
          color="#f5a524"
          roughness={0.06}
          metalness={0.35}
          clearcoat={1}
          clearcoatRoughness={0.08}
        />
      )}
      {material === 'normal' && <meshNormalMaterial />}
    </mesh>
  )
}

export default function GeoMaterial() {
  const [forma, setForma] = useState<Forma>('esfera')
  const [material, setMaterial] = useState<Material>('standard')

  return (
    <DemoEscena
      titulo="Recompón la malla en vivo"
      descripcion="Una pieza central sobre una plataforma. Dos selectores cambian por separado su geometría y su material, y el texto inferior indica qué etiquetas JSX se están usando."
      alto={340}
      camara={[2.6, 2.2, 3.6]}
      controles={
        <>
          <GrupoOpciones etiqueta="geometría" valor={forma} opciones={FORMAS} onChange={setForma} />
          <GrupoOpciones
            etiqueta="material"
            valor={material}
            opciones={MATERIALES}
            onChange={setMaterial}
          />
        </>
      }
      nota={`El árbol actual es <mesh> → <${forma}Geometry /> + <mesh${material === 'normal' ? 'Normal' : material === 'basic' ? 'Basic' : material === 'standard' ? 'Standard' : 'Physical'}Material />. La geometría no sabe qué material la va a pintar, y el material no sabe qué forma va a cubrir.`}
    >
      <ambientLight intensity={0.35} />
      <directionalLight position={[3.5, 5, 3]} intensity={2.4} />
      <directionalLight position={[-4, 2.5, -2]} intensity={0.8} color="#8fb4ff" />

      <Pieza forma={forma} material={material} />

      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
        <circleGeometry args={[2.1, 64]} />
        <meshStandardMaterial color="#1a2033" roughness={0.85} />
      </mesh>
    </DemoEscena>
  )
}

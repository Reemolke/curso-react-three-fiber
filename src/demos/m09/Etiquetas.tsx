import { useMemo, useState } from 'react'
import { Html } from '@react-three/drei'
import { Vector3 } from 'three'
import { MODELOS } from '../../tres/rutas'
import { useGLTF } from '../../tres/gltf'
import { DemoEscena, Interruptor } from '../marco'

const PIEZAS = ['panel_solar', 'antena_plato', 'faro_izq', 'pinza_izq', 'bandeja'] as const

/**
 * Etiquetas HTML ancladas a piezas concretas del modelo.
 *
 * La posición se calcula recorriendo un clon del `scene` y leyendo la posición
 * de cada nodo en el espacio del modelo. Las etiquetas se montan dentro del
 * mismo grupo que el modelo, así que heredan su escala y su rotación sin
 * conversiones a mano.
 */
export default function Etiquetas() {
  const { scene } = useGLTF(MODELOS.rover)
  const [ocluir, setOcluir] = useState(true)
  const [transformar, setTransformar] = useState(false)
  const [distancia, setDistancia] = useState(true)

  const puntos = useMemo(() => {
    const copia = scene.clone(true)
    copia.updateMatrixWorld(true)

    return PIEZAS.flatMap((nombre) => {
      const nodo = copia.getObjectByName(nombre)
      if (!nodo) return []
      const posicion = new Vector3()
      nodo.getWorldPosition(posicion)
      return [{ nombre, posicion: posicion.toArray() as [number, number, number] }]
    })
  }, [scene])

  return (
    <DemoEscena
      titulo="HTML anclado a piezas del modelo"
      descripcion="Cinco etiquetas HTML sobre piezas del rover. Se puede activar la oclusión, el modo transformado en 3D y el escalado por distancia."
      alto={420}
      camara={[3.6, 2.4, 4.4]}
      controles={
        <>
          <Interruptor etiqueta="occlude" activo={ocluir} onChange={setOcluir} />
          <Interruptor etiqueta="transform" activo={transformar} onChange={setTransformar} />
          <Interruptor etiqueta="distanceFactor" activo={distancia} onChange={setDistancia} />
        </>
      }
      nota="`occlude` pregunta al renderer si hay geometría delante y oculta la etiqueta: sin él, las etiquetas se ven a través del modelo. `transform` convierte la etiqueta en un plano 3D real (rota con la cámara solo si usas `sprite`). Ojo: cada etiqueta es un nodo del DOM; cien etiquetas cuestan más que cien mallas."
    >
      <ambientLight intensity={0.55} />
      <directionalLight position={[4, 6, 3]} intensity={2.4} />
      <directionalLight position={[-4, 2, -3]} intensity={0.6} color="#9fc2ff" />

      <group scale={2.1} position={[0, -0.55, 0]}>
        <primitive object={scene} />

        {puntos.map((punto) => (
          <Html
            key={punto.nombre}
            position={punto.posicion}
            center
            occlude={ocluir}
            transform={transformar}
            distanceFactor={distancia ? 3.2 : undefined}
            zIndexRange={[20, 0]}
            style={{ pointerEvents: 'none' }}
          >
            <span className="whitespace-nowrap rounded-full border border-acento/60 bg-fondo/90 px-2 py-0.5 font-mono text-[10px] text-texto shadow-lg">
              {punto.nombre}
            </span>
          </Html>
        ))}
      </group>

      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.56, 0]}>
        <circleGeometry args={[5, 64]} />
        <meshStandardMaterial color="#171d2e" roughness={0.92} />
      </mesh>
    </DemoEscena>
  )
}

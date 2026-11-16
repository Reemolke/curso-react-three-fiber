import { useEffect, useMemo, useState } from 'react'
import { Mesh } from 'three'
import type { Material } from 'three'
import { MODELOS } from '../../tres/rutas'
import { useGLTF } from '../../tres/gltf'
import { DemoEscena, Interruptor } from '../marco'

type MaterialMetalico = Material & { metalness?: number; roughness?: number }

type Fallo = 'escala' | 'pivote' | 'duplicado' | 'metal'

/**
 * Cuatro fallos clásicos, reproducidos sin salir de la demo.
 *
 * No están todos los de la lección porque algunos (falta el decodificador,
 * archivo 404, extensión no soportada) rompen la carga antes de dibujar. Los
 * que se pueden ver en pantalla son estos cuatro, y son los que se diagnostican
 * mirando la escena.
 */
function Rover({
  escala,
  pivote,
  duplicado,
  metal,
}: {
  escala: boolean
  pivote: boolean
  duplicado: boolean
  metal: boolean
}) {
  const { scene } = useGLTF(MODELOS.rover)

  const copia = useMemo(() => scene.clone(true), [scene])

  useEffect(() => {
    // El fallo del metal: todo a metalness 1 y rugosidad baja, sin entorno.
    // Sin HDRI no hay nada que reflejar y las piezas quedan casi negras.
    copia.traverse((objeto) => {
      if (!(objeto instanceof Mesh)) return
      const materiales = (
        Array.isArray(objeto.material) ? objeto.material : [objeto.material]
      ) as MaterialMetalico[]

      for (const material of materiales) {
        if (metal) {
          material.metalness = 1
          material.roughness = 0.08
        }
      }
    })
  }, [copia, metal])

  return (
    <>
      {[0, 1].map((indice) => (
        <group
          key={indice}
          visible={indice === 0 || duplicado}
          position={[
            (pivote ? 1.2 : 0) + indice * 0.04,
            -0.35,
            indice * 0.04,
          ]}
          scale={escala ? 0.06 : 1.5}
        >
          <primitive object={indice === 0 ? copia : scene} />
        </group>
      ))}
    </>
  )
}

export default function Errores() {
  const [fallos, setFallos] = useState<Record<Fallo, boolean>>({
    escala: false,
    pivote: false,
    duplicado: false,
    metal: false,
  })

  const alternar = (clave: Fallo) =>
    setFallos((actual) => ({ ...actual, [clave]: !actual[clave] }))

  return (
    <DemoEscena
      titulo="Cuatro modelos «rotos», un interruptor cada uno"
      descripcion="El rover con cuatro fallos reproducibles: escala equivocada, pivote desplazado, dos copias superpuestas y un ajuste de material metálico sin entorno. Cada interruptor activa o desactiva su fallo."
      alto={400}
      camara={[3.4, 2.4, 4.2]}
      controles={
        <>
          <Interruptor etiqueta="escala 100×" activo={fallos.escala} onChange={() => alternar('escala')} />
          <Interruptor etiqueta="pivote desplazado" activo={fallos.pivote} onChange={() => alternar('pivote')} />
          <Interruptor etiqueta="doble copia" activo={fallos.duplicado} onChange={() => alternar('duplicado')} />
          <Interruptor etiqueta="metal sin entorno" activo={fallos.metal} onChange={() => alternar('metal')} />
        </>
      }
      nota="Los cuatro síntomas se ven distintos: el de escala deja el modelo del tamaño de una miga; el de pivote lo desplaza respecto a su suelo; el de doble copia produce z-fighting (parpadeo en las caras); el de metal deja la superficie casi negra. El arreglo, en los cuatro casos, es un número o una línea."
    >
      <ambientLight intensity={0.45} />
      <directionalLight position={[4, 6, 3]} intensity={2.5} />
      <directionalLight position={[-4, 2, -3]} intensity={0.6} color="#9fc2ff" />

      <Rover
        escala={fallos.escala}
        pivote={fallos.pivote}
        duplicado={fallos.duplicado}
        metal={fallos.metal}
      />

      {/* Suelo: sirve de referencia para ver si el modelo flota o se hunde. */}
      <gridHelper args={[10, 10, '#2b3554', '#1d2338']} position={[0, -0.36, 0]} />
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.37, 0]}>
        <circleGeometry args={[5, 64]} />
        <meshStandardMaterial color="#171d2e" roughness={0.92} />
      </mesh>
    </DemoEscena>
  )
}

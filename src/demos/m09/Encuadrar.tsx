import { useState } from 'react'
import { Bounds, Center, Float } from '@react-three/drei'
import { MODELOS } from '../../tres/rutas'
import { useGLTF } from '../../tres/gltf'
import { DemoEscena, Interruptor } from '../marco'

/**
 * `Center` recoloca el origen y `Bounds` encuadra la cámara.
 *
 * El rover se monta primero desplazado, girado y a otra escala. Con un
 * interruptor se le aplica `Center` (origen en el centro geométrico) y `Bounds`
 * con `fit` (la cámara se coloca para que todo quepa). El `key` fuerza el
 * recálculo: las dos utilidades miden al montar, no en cada frame.
 */
export default function Encuadrar() {
  const rover = useGLTF(MODELOS.rover)
  const [corregido, setCorregido] = useState(false)
  const [flotar, setFlotar] = useState(false)

  const contenido = (
    <group
      position={corregido ? [0, 0, 0] : [1.5, -1.1, -0.6]}
      rotation={corregido ? [0, 0, 0] : [0.35, 1.1, 0.22]}
      scale={corregido ? 1 : 0.45}
    >
      <primitive object={rover.scene} />
    </group>
  )

  return (
    <DemoEscena
      titulo="Un modelo descolocado, enderezado y encuadrado"
      descripcion="El rover aparece desplazado, girado y a escala reducida. Al activar la corrección, Center pone su origen en el centro y Bounds coloca la cámara para que ocupe el encuadre."
      alto={400}
      camara={[3.2, 2.2, 4.2]}
      controles={
        <>
          <Interruptor etiqueta="Center + Bounds" activo={corregido} onChange={setCorregido} />
          <Interruptor etiqueta="Float" activo={flotar} onChange={setFlotar} />
        </>
      }
      nota="`Center` mide la caja envolvente y desplaza los hijos para que el origen caiga en el centro. `Bounds` mide esa misma caja y mueve la cámara hasta que el contenido entra en el frustum con el margen que le pidas. Ninguna de las dos recoloca tus datos: son transformaciones de escena."
    >
      <ambientLight intensity={0.5} />
      <directionalLight position={[4, 6, 3]} intensity={2.4} />
      <directionalLight position={[-4, 2, -3]} intensity={0.6} color="#9fc2ff" />

      <Bounds fit clip observe margin={1.35}>
        <Center key={corregido ? 'corregido' : 'suelto'}>
          {flotar ? (
            <Float speed={2.2} rotationIntensity={0.35} floatIntensity={0.7}>
              {contenido}
            </Float>
          ) : (
            contenido
          )}
        </Center>
      </Bounds>

      {/* Suelo de referencia: 1 unidad de rejilla = 1 metro. */}
      <gridHelper args={[12, 12, '#2b3554', '#1d2338']} position={[0, -1.6, 0]} />
    </DemoEscena>
  )
}

import { useState } from 'react'
import { DemoEscena, Interruptor } from '../marco'

/**
 * Las tres esferas usan el mismo color, la misma geometría y la misma luz.
 * La única diferencia es la clase de material. Si apagas las luces, dos se
 * quedan negras y una no: esa es toda la lección.
 */
function Esferas({ luces }: { luces: boolean }) {
  return (
    <group>
      {luces && (
        <>
          <ambientLight intensity={0.28} />
          <directionalLight position={[4, 6, 3]} intensity={2.6} />
          <directionalLight position={[-4, 2, -3]} intensity={0.7} color="#9fbcff" />
        </>
      )}

      <mesh position={[-1.55, 1, 0]}>
        <sphereGeometry args={[0.72, 48, 32]} />
        <meshBasicMaterial color="#f5a524" />
      </mesh>

      <mesh position={[0, 1, 0]}>
        <sphereGeometry args={[0.72, 48, 32]} />
        <meshStandardMaterial color="#f5a524" roughness={0.35} metalness={0.15} />
      </mesh>

      <mesh position={[1.55, 1, 0]}>
        <sphereGeometry args={[0.72, 48, 32]} />
        <meshPhysicalMaterial
          color="#f5a524"
          roughness={0.1}
          metalness={0.3}
          clearcoat={1}
          clearcoatRoughness={0.05}
        />
      </mesh>

      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[8, 8]} />
        <meshStandardMaterial color="#161c2c" roughness={0.95} />
      </mesh>
    </group>
  )
}

export default function Materiales() {
  const [luces, setLuces] = useState(true)

  return (
    <DemoEscena
      titulo="basic · standard · physical, con la luz en un interruptor"
      descripcion="Tres esferas del mismo color. La de la izquierda usa meshBasicMaterial, la del centro meshStandardMaterial y la de la derecha meshPhysicalMaterial. Un interruptor apaga todas las luces."
      alto={340}
      camara={[0, 1.5, 4.6]}
      controles={<Interruptor etiqueta="luces encendidas" activo={luces} onChange={setLuces} />}
      nota="Apaga las luces. La esfera ámbar de la izquierda no cambia porque `basic` no calcula iluminación. Las otras dos se quedan negras: sin luz no hay nada que reflejar."
    >
      <Esferas luces={luces} />
    </DemoEscena>
  )
}

import { DemoEscena } from '../marco'

/**
 * Escena de referencia del checkpoint 3.5.
 *
 * Cumple los cinco requisitos del enunciado a propósito y sin adornos: cinco
 * objetos, una jerarquía real (todo cuelga de un grupo), tres clases de material
 * distintas y una fuente de luz que hace visible la diferencia entre ellas.
 * Es estática: no hace falta animación para comprobar la composición.
 */
function Escena() {
  return (
    <>
      <ambientLight intensity={0.32} />
      <directionalLight position={[4, 6, 3]} intensity={2.4} />
      <directionalLight position={[-4, 2, -3]} intensity={0.6} color="#9fbcff" />

      {/* La jerarquía: los cinco objetos cuelgan de un mismo grupo. */}
      <group rotation={[0, 0.6, 0]}>
        {/* 1. Base: cilindro bajo, material estándar mate. */}
        <mesh position={[0, 0.12, 0]}>
          <cylinderGeometry args={[1.5, 1.6, 0.24, 64]} />
          <meshStandardMaterial color="#2a3354" roughness={0.85} metalness={0.05} />
        </mesh>

        {/* 2. Núcleo: icosaedro, material normal (no depende de la luz). */}
        <mesh position={[0, 1.05, 0]}>
          <icosahedronGeometry args={[0.52, 0]} />
          <meshNormalMaterial flatShading />
        </mesh>

        {/* 3 y 4. Dos satélites en órbita, material estándar con distinto metal. */}
        {[0, 1].map((indice) => {
          const angulo = indice * Math.PI
          return (
            <mesh
              key={indice}
              position={[Math.cos(angulo) * 1.05, 0.85, Math.sin(angulo) * 1.05]}
              rotation={[0.4, angulo, 0.2]}
            >
              <boxGeometry args={[0.34, 0.34, 0.34]} />
              <meshStandardMaterial
                color={indice === 0 ? '#f5a524' : '#3fbf87'}
                roughness={0.3}
                metalness={indice === 0 ? 0.75 : 0.05}
              />
            </mesh>
          )
        })}

        {/* 5. Anillo: toro, material físico con clearcoat. */}
        <mesh position={[0, 0.24, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <torusGeometry args={[1.16, 0.045, 12, 96]} />
          <meshPhysicalMaterial
            color="#cfd8ff"
            roughness={0.15}
            metalness={0.6}
            clearcoat={1}
            clearcoatRoughness={0.1}
          />
        </mesh>
      </group>

      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
        <circleGeometry args={[4, 64]} />
        <meshStandardMaterial color="#12172a" roughness={1} />
      </mesh>
    </>
  )
}

export default function EscenaCheckpoint() {
  return (
    <DemoEscena
      titulo="Escena de referencia del checkpoint"
      descripcion="Un grupo con cinco objetos: una base cilíndrica, un icosaedro central, dos satélites cúbicos en órbita y un anillo toroidal. Usa tres clases de material distintas y dos luces direccionales."
      alto={380}
      camara={[3.4, 3, 4.4]}
      nota="Compara esta escena con la tuya: cinco objetos, todos dentro de un `<group>`, tres materiales distintos y una luz que permita distinguirlos. Los controles de cámara llegan en el módulo 6."
    >
      <Escena />
    </DemoEscena>
  )
}

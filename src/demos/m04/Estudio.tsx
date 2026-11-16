import { useState } from 'react'
import { AccumulativeShadows, ContactShadows, RandomizedLight, Stage } from '@react-three/drei'
import { DemoEscena, Deslizador, GrupoOpciones } from '../marco'

type Montaje = 'contacto' | 'acumulativa' | 'stage'

const MONTAJES: { valor: Montaje; texto: string }[] = [
  { valor: 'contacto', texto: 'ContactShadows' },
  { valor: 'acumulativa', texto: 'AccumulativeShadows' },
  { valor: 'stage', texto: 'Stage' },
]

/** La misma pieza en los tres montajes, para que la comparación sea justa. */
function Pieza() {
  return (
    <group>
      <mesh position={[-0.55, 0.55, 0]} rotation={[0, 0.5, 0]}>
        <boxGeometry args={[0.9, 0.9, 0.9]} />
        <meshStandardMaterial color="#e9e3d4" roughness={0.5} metalness={0.1} />
      </mesh>
      <mesh position={[0.6, 0.42, 0.15]} rotation={[0.4, 0.4, 0]}>
        <torusKnotGeometry args={[0.28, 0.11, 128, 20]} />
        <meshStandardMaterial color="#c99a54" roughness={0.3} metalness={0.75} />
      </mesh>
      <mesh position={[0.1, 0.22, -0.7]}>
        <icosahedronGeometry args={[0.26, 0]} />
        <meshStandardMaterial color="#93a4c2" roughness={0.6} />
      </mesh>
    </group>
  )
}

export default function Estudio() {
  const [montaje, setMontaje] = useState<Montaje>('contacto')
  const [difuminado, setDifuminado] = useState(2.4)

  return (
    <DemoEscena
      titulo="Tres formas de montar un estudio de producto"
      descripcion="Las mismas tres piezas presentadas con tres técnicas de sombra de drei: sombra de contacto, sombras acumulativas con luz aleatoria y el componente Stage que lo empaqueta todo."
      alto={380}
      camara={[3, 2.4, 4] }
      controles={
        <>
          <GrupoOpciones
            etiqueta="técnica"
            valor={montaje}
            opciones={MONTAJES}
            onChange={setMontaje}
          />
          {montaje === 'contacto' && (
            <Deslizador
              etiqueta="blur"
              valor={difuminado}
              min={0}
              max={8}
              paso={0.2}
              onChange={setDifuminado}
            />
          )}
        </>
      }
      nota="`ContactShadows` es una sombra falsa: proyecta la silueta sobre un plano con un mapa de profundidad. Es barata y no depende de luces. `AccumulativeShadows` acumula muchos frames con luces aleatorias hasta converger. `Stage` monta cámara, luces y sombras en un solo componente."
    >
      {montaje === 'contacto' && (
        <>
          <ambientLight intensity={0.5} />
          <directionalLight position={[3, 5, 3]} intensity={2.4} />
          <Pieza />
          <ContactShadows
            position={[0, 0, 0]}
            opacity={0.6}
            scale={9}
            blur={difuminado}
            far={4}
            resolution={512}
            color="#000000"
          />
        </>
      )}

      {montaje === 'acumulativa' && (
        <>
          <ambientLight intensity={0.25} />
          <Pieza />
          <AccumulativeShadows
            temporal
            frames={90}
            alphaTest={0.85}
            opacity={0.85}
            scale={9}
            position={[0, 0.001, 0]}
          >
            <RandomizedLight amount={6} radius={5} intensity={2.2} position={[4, 6, 4]} />
          </AccumulativeShadows>
        </>
      )}

      {montaje === 'stage' && (
        <Stage
          environment={null}
          intensity={0.75}
          adjustCamera={false}
          shadows={{ type: 'contact', opacity: 0.6, blur: 2.4, scale: 9, far: 4 }}
          preset="soft"
        >
          <Pieza />
        </Stage>
      )}
    </DemoEscena>
  )
}

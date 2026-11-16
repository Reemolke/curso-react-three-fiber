import { useState } from 'react'
import { DemoEscena, Deslizador, GrupoOpciones } from '../marco'

type Tipo = 'ambiente' | 'direccional' | 'puntual' | 'foco' | 'hemisferica'

const TIPOS: { valor: Tipo; texto: string }[] = [
  { valor: 'ambiente', texto: 'ambiente' },
  { valor: 'direccional', texto: 'direccional' },
  { valor: 'puntual', texto: 'puntual' },
  { valor: 'foco', texto: 'foco' },
  { valor: 'hemisferica', texto: 'hemisférica' },
]

/**
 * El mismo conjunto de objetos con un solo tipo de luz.
 *
 * La intensidad del deslizador es 0..1, pero cada luz la multiplica por una
 * escala distinta: una luz puntual se mide en candelas y una direccional en lux,
 * así que no son intercambiables. Eso es exactamente lo que cuesta entender al
 * principio: no hay un «2» universal.
 */
function Escena({ tipo, intensidad }: { tipo: Tipo; intensidad: number }) {
  return (
    <>
      {tipo === 'ambiente' && <ambientLight intensity={intensidad * 2} />}
      {tipo === 'direccional' && (
        <directionalLight position={[4, 6, 3]} intensity={intensidad * 4} />
      )}
      {tipo === 'puntual' && (
        <pointLight position={[0, 2.4, 0]} intensity={intensidad * 30} distance={0} decay={2} />
      )}
      {tipo === 'foco' && (
        <spotLight
          position={[0, 4.2, 1.4]}
          angle={0.55}
          penumbra={0.45}
          intensity={intensidad * 80}
          distance={0}
          decay={2}
        />
      )}
      {tipo === 'hemisferica' && (
        <hemisphereLight args={['#9fc2ff', '#241c14', intensidad * 2.2]} />
      )}

      {/* Marca del punto emisor, solo para las luces que tienen posición. */}
      {(tipo === 'puntual' || tipo === 'foco') && (
        <mesh position={tipo === 'puntual' ? [0, 2.4, 0] : [0, 4.2, 1.4]}>
          <sphereGeometry args={[0.06, 16, 12]} />
          <meshBasicMaterial color="#fff3d0" />
        </mesh>
      )}

      <mesh position={[0, 0.55, 0]}>
        <sphereGeometry args={[0.55, 40, 28]} />
        <meshStandardMaterial color="#d8dce8" roughness={0.45} />
      </mesh>

      <mesh position={[-1.35, 0.4, -0.4]} rotation={[0, 0.6, 0]}>
        <boxGeometry args={[0.7, 0.8, 0.7]} />
        <meshStandardMaterial color="#c9c2b4" roughness={0.7} />
      </mesh>

      <mesh position={[1.35, 0.5, -0.3]}>
        <coneGeometry args={[0.42, 1, 32]} />
        <meshStandardMaterial color="#b9c6dd" roughness={0.5} />
      </mesh>

      <mesh position={[0.55, 0.16, 1.15]} rotation={[Math.PI / 2, 0, 0.4]}>
        <torusGeometry args={[0.38, 0.11, 16, 48]} />
        <meshStandardMaterial color="#c7cdd8" roughness={0.35} metalness={0.2} />
      </mesh>

      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[12, 12]} />
        <meshStandardMaterial color="#22283a" roughness={0.95} />
      </mesh>
    </>
  )
}

export default function Luces() {
  const [tipo, setTipo] = useState<Tipo>('direccional')
  const [intensidad, setIntensidad] = useState(0.6)

  return (
    <DemoEscena
      titulo="Cinco luces, la misma escena"
      descripcion="Cuatro objetos sobre un suelo, iluminados por un único tipo de luz seleccionable. Un deslizador cambia la intensidad y una esfera pequeña marca la posición del emisor cuando la luz es puntual o de foco."
      alto={350}
      camara={[3.2, 2.6, 4]}
      controles={
        <>
          <GrupoOpciones etiqueta="luz" valor={tipo} opciones={TIPOS} onChange={setTipo} />
          <Deslizador etiqueta="intensidad" valor={intensidad} min={0} max={1} onChange={setIntensidad} />
        </>
      }
      nota="`ambiente` ilumina todo por igual y aplana la escena. `direccional` simula el sol: rayos paralelos, sin distancia. `puntual` sale de un punto y decae con el cuadrado de la distancia. `foco` es un cono. `hemisférica` mezcla cielo y suelo."
    >
      <Escena tipo={tipo} intensidad={intensidad} />
    </DemoEscena>
  )
}

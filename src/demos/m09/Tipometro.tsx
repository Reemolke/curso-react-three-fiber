import { useState } from 'react'
import { Text } from '@react-three/drei'
import { FUENTES } from '../../tres/rutas'
import { DemoEscena, Deslizador, GrupoOpciones } from '../marco'

type Anclaje = 'left' | 'center' | 'right'

const ANCLAJES: { valor: Anclaje; texto: string }[] = [
  { valor: 'left', texto: 'left' },
  { valor: 'center', texto: 'center' },
  { valor: 'right', texto: 'right' },
]

/**
 * Tipómetro 3D.
 *
 * `Text` de drei genera una malla a partir de una fuente y la dibuja como
 * cualquier otro objeto: recibe luz, proyecta sombra y se puede mover en el
 * espacio. Aquí se ven tres propiedades que casi nadie ajusta al principio
 * (`anchorX`, `letterSpacing`, `lineHeight`) y que explican por qué el texto
 * «no queda donde se espera».
 */
export default function Tipometro() {
  const [tamano, setTamano] = useState(0.42)
  const [interletra, setInterletra] = useState(0)
  const [anclaje, setAnclaje] = useState<Anclaje>('center')
  const [alto, setAlto] = useState(1.1)

  return (
    <DemoEscena
      titulo="Texto en 3D con anclaje y medidas"
      descripcion="Tres líneas de texto en 3D sobre una guía vertical. Se puede cambiar el tamaño, el espacio entre letras, el anclaje horizontal y el alto de línea."
      alto={380}
      camara={[0, 0.6, 4.6]}
      controles={
        <>
          <Deslizador etiqueta="tamaño" valor={tamano} min={0.18} max={0.9} paso={0.02} onChange={setTamano} />
          <Deslizador
            etiqueta="interletra"
            valor={interletra}
            min={-0.1}
            max={0.3}
            paso={0.01}
            onChange={setInterletra}
          />
          <Deslizador etiqueta="alto de línea" valor={alto} min={0.8} max={2} paso={0.05} onChange={setAlto} />
          <GrupoOpciones etiqueta="anchorX" valor={anclaje} opciones={ANCLAJES} onChange={setAnclaje} />
        </>
      }
      nota="`anchorX` decide desde dónde crece el texto: con `center` un texto más largo se sale por los dos lados; con `left`, siempre empieza en el mismo punto. `fontSize` está en unidades de escena, no en píxeles: si la cámara está a 4 unidades, 0,4 de tamaño se lee bien."
    >
      <ambientLight intensity={0.75} />
      <directionalLight position={[2, 3, 4]} intensity={2} />

      {/* Guía: muestra dónde está el origen y el alto de línea. */}
      <mesh position={[0, 0, -0.08]}>
        <planeGeometry args={[3.6, 2.6]} />
        <meshBasicMaterial color="#111726" />
      </mesh>
      <mesh position={[0, 0.9, -0.06]}>
        <planeGeometry args={[3.4, 0.008]} />
        <meshBasicMaterial color="#2b3554" />
      </mesh>
      <mesh position={[0, -0.9, -0.06]}>
        <planeGeometry args={[3.4, 0.008]} />
        <meshBasicMaterial color="#2b3554" />
      </mesh>

      <Text
        font={FUENTES.regular}
        fontSize={tamano}
        letterSpacing={interletra}
        lineHeight={alto}
        anchorX={anclaje}
        anchorY="middle"
        textAlign={anclaje === 'center' ? 'center' : 'left'}
        position={[0, 0.72, 0]}
        color="#e8edf7"
        maxWidth={3.2}
      >
        Taller K-7
      </Text>

      <Text
        font={FUENTES.regular}
        fontSize={tamano * 0.62}
        letterSpacing={interletra}
        lineHeight={alto}
        anchorX={anclaje}
        anchorY="middle"
        position={[0, 0, 0]}
        color="#8fa3c8"
        maxWidth={3.2}
      >
        Texto generado con una fuente local
      </Text>

      <Text
        font={FUENTES.negrita}
        fontSize={tamano * 0.5}
        letterSpacing={interletra}
        anchorX={anclaje}
        anchorY="middle"
        position={[0, -0.72, 0]}
        color="#f5a524"
        maxWidth={3.2}
      >
        0,42 unidades de alto
      </Text>
    </DemoEscena>
  )
}

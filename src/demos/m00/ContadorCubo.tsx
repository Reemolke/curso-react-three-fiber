import { useState } from 'react'
import { DemoEscena, Deslizador, GrupoOpciones } from '../marco'

const COLORES = [
  { valor: 'ambar', texto: 'Ámbar', hex: '#f5a524' },
  { valor: 'frio', texto: 'Azul', hex: '#4d8df6' },
  { valor: 'verde', texto: 'Verde', hex: '#3fbf87' },
] as const

type NombreColor = (typeof COLORES)[number]['valor']

/**
 * 0.2 — El estado de React cambia la escena.
 *
 * Sin `useFrame` y sin luces a propósito: el objetivo es ver que un `useState`
 * normal y corriente atraviesa el `<Canvas>` y llega a las props de una malla.
 * (El cubo y el material se explican en el módulo 3; aquí son el conejillo de indias.)
 */
export default function ContadorCubo() {
  const [color, setColor] = useState<NombreColor>('ambar')
  const [escala, setEscala] = useState(1)

  const hex = COLORES.find((c) => c.valor === color)?.hex ?? '#f5a524'

  return (
    <DemoEscena
      titulo="Un useState dentro de un canvas"
      descripcion="Un cubo de color ámbar en el centro de la escena. Sus botones cambian el color y el tamaño del cubo."
      alto={320}
      camara={[2.6, 2.1, 3.4]}
      controles={
        <>
          <GrupoOpciones
            etiqueta="Color"
            valor={color}
            opciones={COLORES.map((c) => ({ valor: c.valor, texto: c.texto }))}
            onChange={setColor}
          />
          <Deslizador
            etiqueta="Escala"
            valor={escala}
            min={0.4}
            max={1.8}
            paso={0.05}
            onChange={setEscala}
          />
        </>
      }
      nota="El cubo no se anima: solo cambia cuando cambia el estado. Eso es exactamente lo que hace React."
    >
      <mesh scale={escala} rotation={[0.45, 0.7, 0]}>
        <boxGeometry args={[1.3, 1.3, 1.3]} />
        <meshBasicMaterial color={hex} />
      </mesh>
    </DemoEscena>
  )
}

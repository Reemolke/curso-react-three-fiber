import { useMemo, useState } from 'react'
import { useTexture } from '@react-three/drei'
import * as THREE from 'three'
import { TEXTURAS } from '../../tres/rutas'
import { DemoEscena, Deslizador } from '../marco'

/**
 * Inspector de UVs.
 *
 * A la izquierda, un cubo con la textura repetida y desplazada. A la derecha, la
 * textura completa y un recuadro translúcido que marca exactamente la ventana
 * que se está muestreando: `uv * repeat + offset`. Es la forma más directa de
 * ver que `repeat` y `offset` no mueven el objeto, mueven la ventana.
 */
function CuboTexturizado({
  base,
  repeticion,
  desplazamiento,
}: {
  base: THREE.Texture
  repeticion: [number, number]
  desplazamiento: [number, number]
}) {
  const textura = useMemo(() => {
    // Se clona porque el plano de la derecha usa la misma imagen con otros
    // parámetros. Compartir una textura con distinto `repeat` no funciona:
    // el último que escribe gana.
    const copia = base.clone()
    copia.wrapS = THREE.RepeatWrapping
    copia.wrapT = THREE.RepeatWrapping
    copia.repeat.set(repeticion[0], repeticion[1])
    copia.offset.set(desplazamiento[0], desplazamiento[1])
    copia.colorSpace = THREE.SRGBColorSpace
    copia.needsUpdate = true
    return copia
  }, [base, repeticion, desplazamiento])

  return (
    <mesh position={[-1.15, 1, 0]}>
      <boxGeometry args={[1.4, 1.4, 1.4]} />
      <meshStandardMaterial map={textura} roughness={0.55} metalness={0.05} />
    </mesh>
  )
}

export default function Uvs() {
  const base = useTexture(TEXTURAS.rejillaColor)
  const [repeatX, setRepeatX] = useState(1)
  const [repeatY, setRepeatY] = useState(1)
  const [offsetX, setOffsetX] = useState(0)
  const [offsetY, setOffsetY] = useState(0)

  const ancho = Math.min(1, (repeatX / 4) * 2)
  const alto = Math.min(1, (repeatY / 4) * 2)

  return (
    <DemoEscena
      titulo="Dónde cae cada UV"
      descripcion="A la izquierda, un cubo con una textura de rejilla repetida y desplazada. A la derecha, la misma textura completa con un recuadro que indica la porción que se está usando."
      alto={380}
      camara={[0.4, 2.1, 4.6]}
      controles={
        <>
          <Deslizador etiqueta="repeat X" valor={repeatX} min={0.25} max={4} paso={0.25} onChange={setRepeatX} />
          <Deslizador etiqueta="repeat Y" valor={repeatY} min={0.25} max={4} paso={0.25} onChange={setRepeatY} />
          <Deslizador etiqueta="offset X" valor={offsetX} min={-1} max={1} onChange={setOffsetX} />
          <Deslizador etiqueta="offset Y" valor={offsetY} min={-1} max={1} onChange={setOffsetY} />
        </>
      }
      nota="El cubo tiene seis caras y cada una recibe los mismos UV: por eso la rejilla se repite igual en todas. Con `repeat` mayor que 1 se muestrea la textura en mosaico; `offset` desplaza el origen."
    >
      <ambientLight intensity={0.6} />
      <directionalLight position={[3, 5, 4]} intensity={2.2} />

      <CuboTexturizado
        base={base}
        repeticion={[repeatX, repeatY]}
        desplazamiento={[offsetX, offsetY]}
      />

      {/* Atlas completo, sin repetir: el cuadrado de referencia. */}
      <mesh position={[1.35, 1, 0]}>
        <planeGeometry args={[2.2, 2.2]} />
        <meshBasicMaterial map={base} toneMapped={false} />
      </mesh>

      {/* Ventana muestreada: uv * repeat + offset. */}
      <mesh position={[1.35 + offsetX * 2.2, 1 + offsetY * 2.2, 0.01]}>
        <planeGeometry args={[ancho * 2.2, alto * 2.2]} />
        <meshBasicMaterial color="#f5a524" transparent opacity={0.3} depthWrite={false} />
      </mesh>
    </DemoEscena>
  )
}

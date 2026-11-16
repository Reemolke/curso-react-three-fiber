import { useMemo, useState } from 'react'
import { RepeatWrapping, type Texture } from 'three'
import { useKTX2, useTexture } from '@react-three/drei'
import { DemoEscena, Deslizador } from '../marco'
import { BASIS, KTX2, TEXTURAS } from '../../tres/rutas'

/**
 * Comparar el mismo mapa de color en PNG y en KTX2.
 *
 * Las dos texturas son la misma imagen de 512 × 512: una pesa 70,3 KB y la otra
 * 23,0 KB. Lo que se ve distinto no es el tamaño del archivo, es la compresión
 * con pérdida del ETC1S: bloques de 4 × 4 y una ligera pérdida de detalle fino.
 * Subiendo las repeticiones se ve el patrón de bloques; con una sola repetición
 * la diferencia es casi invisible, que es justo el argumento para usarlo.
 */
function Panel({ mapa, x, repeticiones }: { mapa: Texture; x: number; repeticiones: number }) {
  const textura = useMemo(() => {
    const copia = mapa.clone()
    copia.wrapS = RepeatWrapping
    copia.wrapT = RepeatWrapping
    copia.repeat.set(repeticiones, repeticiones)
    copia.needsUpdate = true
    return copia
  }, [mapa, repeticiones])

  return (
    <mesh position={[x, 0, 0]}>
      <planeGeometry args={[1.6, 1.6, 1, 1]} />
      <meshStandardMaterial map={textura} roughness={0.82} metalness={0} />
    </mesh>
  )
}

function ConPng({ x, repeticiones }: { x: number; repeticiones: number }) {
  const mapa = useTexture(TEXTURAS.hormigonColor)
  return <Panel mapa={mapa} x={x} repeticiones={repeticiones} />
}

function ConKtx2({ x, repeticiones }: { x: number; repeticiones: number }) {
  // El segundo argumento es la carpeta del transcoder; el CDN por defecto no
  // se usa porque el curso se sirve también sin red externa.
  const mapa = useKTX2(KTX2.hormigonColor, BASIS)
  return <Panel mapa={mapa} x={x} repeticiones={repeticiones} />
}

export default function Ktx2() {
  const [repeticiones, setRepeticiones] = useState(2)

  return (
    <DemoEscena
      titulo="PNG vs KTX2, la misma imagen"
      descripcion="Dos paneles con la misma textura de hormigón: a la izquierda el PNG original y a la derecha su versión KTX2 comprimida con ETC1S."
      alto={340}
      camara={[0, 0.55, 3.1]}
      fov={42}
      controles={
        <>
          <Deslizador
            etiqueta="repeticiones"
            valor={repeticiones}
            min={1}
            max={5}
            paso={1}
            onChange={setRepeticiones}
          />
          <p className="w-full text-xs leading-5 text-texto-suave">
            Izquierda: <span className="font-mono text-texto">PNG · 70,3 KB</span> · Derecha:{' '}
            <span className="font-mono text-texto">KTX2 ETC1S · 23,0 KB</span>. Con una repetición no
            se distingue; con cinco aparece el bloque de 4 × 4 del ETC1S en los bordes de alto contraste.
          </p>
        </>
      }
    >
      <ambientLight intensity={0.7} />
      <directionalLight position={[2.5, 3, 4]} intensity={2.2} />
      <ConPng x={-0.86} repeticiones={repeticiones} />
      <ConKtx2 x={0.86} repeticiones={repeticiones} />
      <mesh position={[0, 0, -0.01]}>
        <planeGeometry args={[3.6, 1.9]} />
        <meshBasicMaterial color="#141821" />
      </mesh>
    </DemoEscena>
  )
}

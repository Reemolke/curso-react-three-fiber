import { useMemo, useState } from 'react'
import { useTexture } from '@react-three/drei'
import * as THREE from 'three'
import { TEXTURAS } from '../../tres/rutas'
import { DemoEscena, Interruptor } from '../marco'

/**
 * Una esfera con los mapas reales del curso, activables uno a uno.
 *
 * Los cuatro mapas disponibles son color, normal, rugosidad y emisivo. Un mapa
 * de metalicidad no existe como archivo aparte: en el estándar glTF va
 * empaquetado con la rugosidad (canal verde) y la oclusión (canal rojo) en la
 * misma imagen ORM. Y el AO necesita un segundo juego de UV, que estos modelos
 * no traen: por eso aquí no se puede activar.
 */
function Esfera({
  color,
  normal,
  rugosidad,
  emisivo,
}: {
  color: boolean
  normal: boolean
  rugosidad: boolean
  emisivo: boolean
}) {
  const [colorBase, mapaNormal, mapaRugosidad, mapaEmisivo] = useTexture([
    TEXTURAS.metalColor,
    TEXTURAS.metalNormal,
    TEXTURAS.metalRugosidad,
    TEXTURAS.emisivoRejilla,
  ])

  const texturas = useMemo(() => {
    const colorListo = colorBase.clone()
    colorListo.colorSpace = THREE.SRGBColorSpace
    colorListo.wrapS = THREE.RepeatWrapping
    colorListo.wrapT = THREE.RepeatWrapping
    colorListo.repeat.set(2, 2)
    colorListo.needsUpdate = true

    const normalListo = mapaNormal.clone()
    normalListo.colorSpace = THREE.NoColorSpace
    normalListo.wrapS = THREE.RepeatWrapping
    normalListo.wrapT = THREE.RepeatWrapping
    normalListo.repeat.set(2, 2)
    normalListo.needsUpdate = true

    const rugosidadLista = mapaRugosidad.clone()
    rugosidadLista.colorSpace = THREE.NoColorSpace
    rugosidadLista.wrapS = THREE.RepeatWrapping
    rugosidadLista.wrapT = THREE.RepeatWrapping
    rugosidadLista.repeat.set(2, 2)
    rugosidadLista.needsUpdate = true

    const emisivoListo = mapaEmisivo.clone()
    emisivoListo.colorSpace = THREE.SRGBColorSpace
    emisivoListo.wrapS = THREE.RepeatWrapping
    emisivoListo.wrapT = THREE.RepeatWrapping
    emisivoListo.repeat.set(2, 2)
    emisivoListo.needsUpdate = true

    return { colorListo, normalListo, rugosidadLista, emisivoListo }
  }, [colorBase, mapaNormal, mapaRugosidad, mapaEmisivo])

  return (
    <mesh position={[0, 1.05, 0]}>
      <sphereGeometry args={[1, 96, 64]} />
      <meshStandardMaterial
        color="#ffffff"
        map={color ? texturas.colorListo : null}
        normalMap={normal ? texturas.normalListo : null}
        roughnessMap={rugosidad ? texturas.rugosidadLista : null}
        roughness={rugosidad ? 1 : 0.42}
        metalness={0.35}
        emissive={emisivo ? '#ffffff' : '#000000'}
        emissiveMap={emisivo ? texturas.emisivoListo : null}
        emissiveIntensity={emisivo ? 1.4 : 0}
      />
    </mesh>
  )
}

export default function MapasPbr() {
  const [color, setColor] = useState(true)
  const [normal, setNormal] = useState(true)
  const [rugosidad, setRugosidad] = useState(true)
  const [emisivo, setEmisivo] = useState(false)

  return (
    <DemoEscena
      titulo="Cada mapa, por separado"
      descripcion="Una esfera metálica con cuatro mapas reales que se pueden activar y desactivar: color, normal, rugosidad y emisivo. La iluminación es fija."
      alto={360}
      camara={[0, 1.1, 3.8]}
      controles={
        <>
          <Interruptor etiqueta="map (color)" activo={color} onChange={setColor} />
          <Interruptor etiqueta="normalMap" activo={normal} onChange={setNormal} />
          <Interruptor etiqueta="roughnessMap" activo={rugosidad} onChange={setRugosidad} />
          <Interruptor etiqueta="emissiveMap" activo={emisivo} onChange={setEmisivo} />
        </>
      }
      nota="Desactiva `normalMap`: la superficie se vuelve lisa aunque el color siga teniendo detalle. Desactiva `roughnessMap`: el brillo se uniformiza. El color manda en el tono; el normal y la rugosidad mandan en cómo responde a la luz."
    >
      <ambientLight intensity={0.35} />
      <directionalLight position={[3, 5, 3]} intensity={2.6} />
      <directionalLight position={[-4, 1, -2]} intensity={0.7} color="#9fc2ff" />

      <Esfera color={color} normal={normal} rugosidad={rugosidad} emisivo={emisivo} />

      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[10, 10]} />
        <meshStandardMaterial color="#151a2a" roughness={0.95} />
      </mesh>
    </DemoEscena>
  )
}

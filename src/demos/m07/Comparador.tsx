import { useMemo, useState } from 'react'
import { useTexture } from '@react-three/drei'
import * as THREE from 'three'
import { TEXTURAS } from '../../tres/rutas'
import { DemoEscena, GrupoOpciones } from '../marco'

type Nivel = 'principiante' | 'correcto'

const NIVELES: { valor: Nivel; texto: string }[] = [
  { valor: 'principiante', texto: 'de principiante' },
  { valor: 'correcto', texto: 'correcto' },
]

/**
 * El mismo objeto con dos configuraciones de material.
 *
 * La versión «de principiante» tiene los fallos más comunes juntos: textura de
 * color sin `colorSpace`, sin mapa de normal, rugosidad plana y metalicidad
 * inventada. La versión correcta corrige las cuatro cosas sin cambiar de
 * archivos.
 */
function Pieza({ nivel }: { nivel: Nivel }) {
  const [colorBase, mapaNormal, mapaRugosidad] = useTexture([
    TEXTURAS.maderaColor,
    TEXTURAS.maderaNormal,
    TEXTURAS.metalRugosidad,
  ])

  const mapas = useMemo(() => {
    const preparar = (textura: THREE.Texture, srgb: boolean) => {
      const copia = textura.clone()
      copia.wrapS = THREE.RepeatWrapping
      copia.wrapT = THREE.RepeatWrapping
      copia.repeat.set(1.5, 1.5)
      copia.colorSpace = srgb ? THREE.SRGBColorSpace : THREE.NoColorSpace
      copia.needsUpdate = true
      return copia
    }

    return {
      color: preparar(colorBase, nivel === 'correcto'),
      normal: preparar(mapaNormal, false),
      rugosidad: preparar(mapaRugosidad, false),
    }
  }, [colorBase, mapaNormal, mapaRugosidad, nivel])

  return (
    <mesh position={[0, 1, 0]} rotation={[0.15, 0.6, 0]}>
      <boxGeometry args={[1.6, 1.6, 1.6]} />
      {nivel === 'principiante' ? (
        <meshStandardMaterial map={mapas.color} roughness={0.9} metalness={0.8} />
      ) : (
        <meshStandardMaterial
          map={mapas.color}
          normalMap={mapas.normal}
          normalScale={new THREE.Vector2(0.8, 0.8)}
          roughnessMap={mapas.rugosidad}
          roughness={1}
          metalness={0.25}
        />
      )}
    </mesh>
  )
}

export default function Comparador() {
  const [nivel, setNivel] = useState<Nivel>('principiante')

  return (
    <DemoEscena
      titulo="Material de principiante frente a material correcto"
      descripcion="Una caja de madera con dos configuraciones de material. La incorrecta mezcla textura lineal, rugosidad plana y metalicidad alta; la correcta usa color en sRGB, mapa de normal y mapa de rugosidad."
      alto={360}
      camara={[2.8, 2.2, 3.6]}
      controles={<GrupoOpciones etiqueta="versión" valor={nivel} opciones={NIVELES} onChange={setNivel} />}
      nota="Las dos versiones usan los mismos tres archivos. La diferencia está en cómo se declaran: espacio de color del mapa de color, presencia del normal y rugosidad leída del mapa en lugar de un valor fijo."
    >
      <ambientLight intensity={0.4} />
      <directionalLight position={[3.5, 5, 2.5]} intensity={2.6} />
      <directionalLight position={[-4, 1.5, -2.5]} intensity={0.7} color="#9fc2ff" />

      <Pieza nivel={nivel} />

      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[12, 12]} />
        <meshStandardMaterial color="#161c2c" roughness={0.9} />
      </mesh>
    </DemoEscena>
  )
}

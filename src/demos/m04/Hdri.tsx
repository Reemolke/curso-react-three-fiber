import { useState } from 'react'
import { Environment } from '@react-three/drei'
import { HDRIS } from '../../tres/rutas'
import { DemoEscena, Deslizador, GrupoOpciones, Interruptor } from '../marco'

type Mapa = 'estudio' | 'exterior' | 'luna'

const MAPAS: { valor: Mapa; texto: string }[] = [
  { valor: 'estudio', texto: 'estudio' },
  { valor: 'exterior', texto: 'exterior' },
  { valor: 'luna', texto: 'luna' },
]

/**
 * Los tres HDRI del curso son sintéticos y locales: están en `public/hdri/` y se
 * generan con `npm run assets:hdri`. No se descarga nada de un CDN, así que la
 * demo funciona sin red y la licencia es la del curso.
 */
export default function Hdri() {
  const [mapa, setMapa] = useState<Mapa>('estudio')
  const [intensidad, setIntensidad] = useState(1)
  const [fondo, setFondo] = useState(false)

  return (
    <DemoEscena
      titulo="Tres entornos, la misma esfera"
      descripcion="Una esfera metálica y un toro sobre un suelo, iluminados solo por un mapa de entorno equirectangular. Se puede cambiar entre tres HDRIs locales, ajustar la intensidad del entorno y mostrar u ocultar el fondo."
      alto={360}
      camara={[3, 2.2, 3.8]}
      controles={
        <>
          <GrupoOpciones etiqueta="hdri" valor={mapa} opciones={MAPAS} onChange={setMapa} />
          <Deslizador
            etiqueta="environmentIntensity"
            valor={intensidad}
            min={0}
            max={2.5}
            onChange={setIntensidad}
          />
          <Interruptor etiqueta="fondo visible" activo={fondo} onChange={setFondo} />
        </>
      }
      nota="`background` pinta el mapa detrás de la escena; `environment` lo usa para iluminar y para los reflejos. Son dos usos del mismo archivo y se controlan por separado: puedes iluminar con un estudio y tener el fondo en negro."
    >
      <Environment files={HDRIS[mapa]} environmentIntensity={intensidad} background={fondo} />

      <mesh position={[-0.9, 0.62, 0]}>
        <sphereGeometry args={[0.62, 64, 40]} />
        <meshStandardMaterial color="#dfe4ee" roughness={0.12} metalness={1} />
      </mesh>

      <mesh position={[0.85, 0.55, 0.2]} rotation={[0.4, 0.6, 0]}>
        <torusKnotGeometry args={[0.32, 0.13, 128, 24]} />
        <meshStandardMaterial color="#d8a05a" roughness={0.35} metalness={0.9} />
      </mesh>

      <mesh position={[0.1, 0.25, -0.9]}>
        <icosahedronGeometry args={[0.3, 0]} />
        <meshStandardMaterial color="#7d8ba3" roughness={0.9} metalness={0} />
      </mesh>

      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[5, 64]} />
        <meshStandardMaterial color="#1b2133" roughness={0.6} metalness={0.2} />
      </mesh>
    </DemoEscena>
  )
}

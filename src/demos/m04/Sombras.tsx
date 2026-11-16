import { useState } from 'react'
import { DemoEscena, Deslizador, GrupoOpciones } from '../marco'

const TAMANOS = [
  { valor: 256, texto: '256' },
  { valor: 512, texto: '512' },
  { valor: 1024, texto: '1024' },
  { valor: 2048, texto: '2048' },
]

/**
 * Sombras con las cuatro perillas que de verdad importan.
 *
 * `mapSize` es la resolución del mapa; `bias` y `normalBias` empujan la
 * comparación de profundidad para evitar el patrón de Moiré; `radius` suaviza
 * el borde cuando el renderer usa PCF suave (el valor por defecto de R3F).
 */
export default function Sombras() {
  const [mapSize, setMapSize] = useState(512)
  const [bias, setBias] = useState(0)
  const [normalBias, setNormalBias] = useState(0)
  const [radio, setRadio] = useState(2)

  return (
    <DemoEscena
      titulo="Cuatro perillas para una sombra"
      descripcion="Una caja y una esfera sobre un suelo iluminados por una luz direccional. Los controles ajustan la resolución del mapa de sombras, el sesgo, el sesgo por normal y el suavizado del borde."
      alto={380}
      camara={[3.6, 3, 4.2]}
      sombras
      controles={
        <>
          <GrupoOpciones etiqueta="mapSize" valor={mapSize} opciones={TAMANOS} onChange={setMapSize} />
          <Deslizador etiqueta="bias" valor={bias} min={-0.004} max={0.004} paso={0.0002} onChange={setBias} />
          <Deslizador
            etiqueta="normalBias"
            valor={normalBias}
            min={0}
            max={0.08}
            paso={0.002}
            onChange={setNormalBias}
          />
          <Deslizador etiqueta="radius" valor={radio} min={0} max={8} paso={0.5} onChange={setRadio} />
        </>
      }
      nota="Baja `mapSize` a 256 y pon `bias` y `normalBias` a 0: aparece el patrón de rayas dentro de la sombra (shadow acne). Sube `normalBias` poco a poco hasta que desaparezca; si te pasas, la sombra se separa del objeto (peter-panning)."
    >
      <ambientLight intensity={0.35} />
      <directionalLight
        position={[4.5, 7, 3.5]}
        intensity={3}
        castShadow
        shadow-mapSize-width={mapSize}
        shadow-mapSize-height={mapSize}
        shadow-bias={bias}
        shadow-normalBias={normalBias}
        shadow-radius={radio}
        shadow-camera-left={-6}
        shadow-camera-right={6}
        shadow-camera-top={6}
        shadow-camera-bottom={-6}
        shadow-camera-near={0.5}
        shadow-camera-far={20}
      />
      <directionalLight position={[-4, 2, -3]} intensity={0.5} color="#8fa8ff" />

      <mesh position={[-0.75, 0.6, 0]} rotation={[0, 0.5, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.1, 1.1, 1.1]} />
        <meshStandardMaterial color="#e8e2d4" roughness={0.6} />
      </mesh>

      <mesh position={[0.85, 0.5, 0.35]} castShadow receiveShadow>
        <sphereGeometry args={[0.5, 40, 28]} />
        <meshStandardMaterial color="#9fb6d8" roughness={0.4} metalness={0.25} />
      </mesh>

      {/* Un objeto casi pegado al suelo: la peor situación para el acne. */}
      <mesh position={[0.2, 0.06, -0.9]} castShadow receiveShadow>
        <boxGeometry args={[0.9, 0.12, 0.5]} />
        <meshStandardMaterial color="#cbbfa6" roughness={0.75} />
      </mesh>

      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[16, 16]} />
        <meshStandardMaterial color="#2a3044" roughness={0.95} />
      </mesh>
    </DemoEscena>
  )
}

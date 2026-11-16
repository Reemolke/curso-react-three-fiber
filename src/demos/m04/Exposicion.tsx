import { useEffect, useMemo, useState } from 'react'
import { useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { DemoEscena, Deslizador } from '../marco'

/**
 * Aproximación de temperatura de color a RGB (Tanner Helland).
 *
 * No es un espectro físico: es la curva que usan casi todas las herramientas
 * para pasar de kelvin a un color que se vea «cálido» o «frío». Sirve para
 * entender que una luz blanca no existe: todas tienen temperatura.
 */
function kelvinARgb(kelvin: number): string {
  const t = Math.min(40000, Math.max(1000, kelvin)) / 100
  let r: number
  let g: number
  let b: number

  if (t <= 66) {
    r = 255
    g = 99.4708025861 * Math.log(t) - 161.1195681661
    b = t <= 19 ? 0 : 138.5177312231 * Math.log(t - 10) - 305.0447927307
  } else {
    r = 329.698727446 * Math.pow(t - 60, -0.1332047592)
    g = 288.1221695283 * Math.pow(t - 60, -0.0755148492)
    b = 255
  }

  const acotar = (v: number) => Math.min(255, Math.max(0, Math.round(v)))
  return `rgb(${acotar(r)}, ${acotar(g)}, ${acotar(b)})`
}

/** El renderer es quien tiene la exposición y el mapeo tonal, no la escena. */
function Exposicion({ valor }: { valor: number }) {
  const gl = useThree((estado) => estado.gl)

  useEffect(() => {
    gl.toneMapping = THREE.ACESFilmicToneMapping
    gl.toneMappingExposure = valor
  }, [gl, valor])

  return null
}

export default function ExposicionDemo() {
  const [exposicion, setExposicion] = useState(1)
  const [kelvin, setKelvin] = useState(5600)

  const color = useMemo(() => kelvinARgb(kelvin), [kelvin])

  return (
    <DemoEscena
      titulo="Termostato de exposición y temperatura"
      descripcion="Una esfera metálica y varias piezas de distinto color iluminadas por una luz direccional cuya temperatura se ajusta en kelvin. La exposición del renderer se controla por separado."
      alto={360}
      camara={[3, 2.4, 3.8]}
      controles={
        <>
          <Deslizador
            etiqueta="exposición"
            valor={exposicion}
            min={0.2}
            max={2.4}
            onChange={setExposicion}
          />
          <Deslizador
            etiqueta="temperatura"
            valor={kelvin}
            min={2200}
            max={9000}
            paso={100}
            sufijo=" K"
            onChange={setKelvin}
          />
          <span
            className="size-4 rounded-full border border-borde"
            style={{ background: color }}
            aria-hidden
          />
        </>
      }
      nota="La exposición multiplica la luz antes del mapeo tonal: por encima de 1,5 las zonas claras se van a blanco. La temperatura no cambia el brillo, cambia el color: 2700 K es una bombilla cálida, 6500 K es luz de día."
    >
      <Exposicion valor={exposicion} />

      <ambientLight intensity={0.12} />
      <directionalLight position={[4, 5, 3]} intensity={3.2} color={color} />
      <directionalLight position={[-4, 2, -2]} intensity={0.6} color="#7f9dff" />

      <mesh position={[-1.15, 0.6, 0]}>
        <sphereGeometry args={[0.6, 48, 32]} />
        <meshStandardMaterial color="#cfd6e6" roughness={0.28} metalness={0.85} />
      </mesh>

      <mesh position={[0.15, 0.5, 0]}>
        <boxGeometry args={[0.85, 0.85, 0.85]} />
        <meshStandardMaterial color="#f2ede2" roughness={0.6} />
      </mesh>

      <mesh position={[1.35, 0.45, -0.15]} rotation={[0, 0.7, 0]}>
        <torusKnotGeometry args={[0.3, 0.11, 96, 16]} />
        <meshPhysicalMaterial color="#e8b06a" roughness={0.2} metalness={0.4} clearcoat={0.8} />
      </mesh>

      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[12, 12]} />
        <meshStandardMaterial color="#20263a" roughness={0.9} />
      </mesh>
    </DemoEscena>
  )
}

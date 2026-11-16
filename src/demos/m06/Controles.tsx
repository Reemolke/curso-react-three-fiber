import { useState } from 'react'
import { CameraControls, OrbitControls } from '@react-three/drei'
import { DoubleSide, MathUtils } from 'three'
import { DemoEscena, GrupoOpciones } from '../marco'

type Modo = 'orbit' | 'camera'

type Limites = {
  min: number
  max: number
  polar: number
  azimut: number
}

/**
 * Cada juego de controles tiene límites distintos a propósito: al cambiar de
 * modo también cambian los anillos y las líneas que los dibujan.
 */
const LIMITES: Record<Modo, Limites> = {
  orbit: { min: 2.6, max: 6, polar: 65, azimut: 55 },
  camera: { min: 1.8, max: 8, polar: 85, azimut: 115 },
}

function Anillo({
  radio,
  color,
  y = 0.012,
}: {
  radio: number
  color: string
  y?: number
}) {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, y, 0]}>
      <ringGeometry args={[Math.max(0.01, radio - 0.03), radio + 0.03, 96]} />
      <meshBasicMaterial color={color} transparent opacity={0.75} side={DoubleSide} />
    </mesh>
  )
}

function LimitesAzimut({ radio, grados }: { radio: number; grados: number }) {
  const angulo = MathUtils.degToRad(grados)
  const datos = new Float32Array([
    0, 0.02, 0, Math.sin(angulo) * radio, 0.02, Math.cos(angulo) * radio,
    0, 0.02, 0, -Math.sin(angulo) * radio, 0.02, -Math.cos(angulo) * radio,
  ])

  return (
    <lineSegments>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[datos, 3]} />
      </bufferGeometry>
      <lineBasicMaterial color="#3fbf87" transparent opacity={0.45} />
    </lineSegments>
  )
}

function Escena({ modo }: { modo: Modo }) {
  const limites = LIMITES[modo]
  const polar = MathUtils.degToRad(limites.polar)
  const yPolar = limites.max * Math.cos(polar)
  const radioPolar = Math.abs(limites.max * Math.sin(polar))

  return (
    <>
      <ambientLight intensity={0.65} />
      <directionalLight position={[4, 7, 4]} intensity={2.3} />

      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]}>
        <circleGeometry args={[9.5, 64]} />
        <meshStandardMaterial color="#151922" roughness={0.95} />
      </mesh>

      <mesh position={[0, 0.5, 0]}>
        <cylinderGeometry args={[0.42, 0.56, 1, 6]} />
        <meshStandardMaterial color="#232938" roughness={0.75} />
      </mesh>
      <mesh position={[0, 1.25, 0]} rotation={[0.4, 0.6, 0]}>
        <icosahedronGeometry args={[0.6, 1]} />
        <meshStandardMaterial color="#f5a524" roughness={0.32} metalness={0.15} />
      </mesh>

      <Anillo radio={limites.min} color="#4d8df6" />
      <Anillo radio={limites.max} color="#f5a524" />
      <Anillo radio={radioPolar} y={yPolar} color="#3fbf87" />
      <LimitesAzimut radio={limites.max} grados={limites.azimut} />

      {modo === 'orbit' ? (
        <OrbitControls
          makeDefault
          enableDamping
          dampingFactor={0.08}
          minDistance={limites.min}
          maxDistance={limites.max}
          maxPolarAngle={polar}
          minAzimuthAngle={-MathUtils.degToRad(limites.azimut)}
          maxAzimuthAngle={MathUtils.degToRad(limites.azimut)}
        />
      ) : (
        <CameraControls
          makeDefault
          minDistance={limites.min}
          maxDistance={limites.max}
          maxPolarAngle={polar}
          minAzimuthAngle={-MathUtils.degToRad(limites.azimut)}
          maxAzimuthAngle={MathUtils.degToRad(limites.azimut)}
          smoothTime={0.35}
        />
      )}
    </>
  )
}

export default function Controles() {
  const [modo, setModo] = useState<Modo>('orbit')
  const limites = LIMITES[modo]

  return (
    <DemoEscena
      titulo="Los límites de la cámara, dibujados"
      descripcion="Una escultura central rodeada por los límites del juego de controles activo. El anillo azul marca la distancia mínima, el ámbar la máxima y el verde la altura máxima de la cámara. Dos líneas verdes limitan el giro horizontal. Se puede alternar entre OrbitControls y CameraControls."
      alto={400}
      camara={[0, 2.2, 5.4]}
      fov={40}
      controles={
        <div className="flex w-full flex-wrap items-center gap-x-5 gap-y-3">
          <GrupoOpciones
            etiqueta="Controles"
            valor={modo}
            opciones={[
              { valor: 'orbit', texto: 'OrbitControls' },
              { valor: 'camera', texto: 'CameraControls' },
            ]}
            onChange={setModo}
          />
          <span className="text-xs text-texto-suave">
            {modo === 'orbit' ? 'Orbit' : 'Camera'}: {limites.min.toString().replace('.', ',')}–
            {limites.max} · polar {limites.polar}° · azimut ±{limites.azimut}°
          </span>
        </div>
      }
      nota="Los anillos están centrados en el objetivo de los controles (el origen), no en la cámara: minDistance y maxDistance se miden desde el target. Arrastra y usa la rueda hasta chocar con cada límite."
    >
      <Escena modo={modo} />
    </DemoEscena>
  )
}

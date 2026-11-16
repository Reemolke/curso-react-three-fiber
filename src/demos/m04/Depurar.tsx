import { useEffect, useState } from 'react'
import { useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { Environment } from '@react-three/drei'
import { HDRIS } from '../../tres/rutas'
import { DemoEscena, Interruptor } from '../marco'

/**
 * Escena con cinco fallos sembrados y un interruptor por fallo.
 *
 * Cada interruptor significa «esto ya está corregido», no «esto está roto»: es
 * la forma de que el alumno reproduzca el síntoma, lo arregle y vea el cambio
 * sin recargar. Los cinco fallos son los que aparecen de verdad al iluminar.
 */
type Arreglos = {
  luces: boolean
  exposicion: boolean
  metal: boolean
  sesgo: boolean
  material: boolean
}

function ExposicionCorrecta({ activo }: { activo: boolean }) {
  const gl = useThree((estado) => estado.gl)

  useEffect(() => {
    gl.toneMapping = THREE.ACESFilmicToneMapping
    gl.toneMappingExposure = activo ? 1 : 2.6
  }, [gl, activo])

  return null
}

export default function Depurar() {
  const [arreglos, setArreglos] = useState<Arreglos>({
    luces: false,
    exposicion: false,
    metal: false,
    sesgo: false,
    material: false,
  })

  const alternar = (clave: keyof Arreglos) =>
    setArreglos((actual) => ({ ...actual, [clave]: !actual[clave] }))

  return (
    <DemoEscena
      titulo="Cinco fallos, cinco interruptores"
      descripcion="Una escena oscura con cinco problemas de iluminación. Cada interruptor corrige uno: las luces ausentes, la exposición quemada, el metal sin entorno, el sesgo de sombra y el material sin respuesta a la luz."
      alto={400}
      camara={[3.4, 2.6, 4]}
      sombras
      controles={
        <>
          <Interruptor
            etiqueta="1 · luces"
            activo={arreglos.luces}
            onChange={() => alternar('luces')}
          />
          <Interruptor
            etiqueta="2 · exposición"
            activo={arreglos.exposicion}
            onChange={() => alternar('exposicion')}
          />
          <Interruptor
            etiqueta="3 · entorno del metal"
            activo={arreglos.metal}
            onChange={() => alternar('metal')}
          />
          <Interruptor
            etiqueta="4 · sesgo de sombra"
            activo={arreglos.sesgo}
            onChange={() => alternar('sesgo')}
          />
          <Interruptor
            etiqueta="5 · material con luz"
            activo={arreglos.material}
            onChange={() => alternar('material')}
          />
        </>
      }
      nota="Síntomas: 1) todo negro; 2) todo blanco sin detalle; 3) la esfera metálica negra; 4) rayas dentro de la sombra; 5) los objetos se ven planos y sin volumen. Cada síntoma tiene una causa y un arreglo de una línea, y ese es el método del checkpoint."
    >
      <ExposicionCorrecta activo={arreglos.exposicion} />

      {arreglos.metal && <Environment files={HDRIS.estudio} environmentIntensity={0.9} />}

      {arreglos.luces && (
        <>
          <ambientLight intensity={0.4} />
          <directionalLight
            position={[4.5, 7, 3.5]}
            intensity={3}
            castShadow
            shadow-mapSize-width={512}
            shadow-mapSize-height={512}
            shadow-bias={arreglos.sesgo ? -0.0005 : 0}
            shadow-normalBias={arreglos.sesgo ? 0.03 : 0}
            shadow-camera-left={-6}
            shadow-camera-right={6}
            shadow-camera-top={6}
            shadow-camera-bottom={-6}
          />
          <directionalLight position={[-4, 2, -3]} intensity={0.6} color="#8fa8ff" />
        </>
      )}

      <group>
        <mesh position={[-0.8, 0.6, 0]} rotation={[0, 0.5, 0]} castShadow receiveShadow>
          <boxGeometry args={[1.1, 1.1, 1.1]} />
          {arreglos.material ? (
            <meshStandardMaterial color="#e6dfd0" roughness={0.55} metalness={0.1} />
          ) : (
            <meshBasicMaterial color="#e6dfd0" />
          )}
        </mesh>

        <mesh position={[0.85, 0.5, 0.2]} castShadow receiveShadow>
          <sphereGeometry args={[0.5, 40, 28]} />
          {arreglos.material ? (
            <meshStandardMaterial color="#cfd8e8" roughness={0.15} metalness={1} />
          ) : (
            <meshBasicMaterial color="#cfd8e8" />
          )}
        </mesh>

        <mesh position={[0.1, 0.05, -1]} castShadow receiveShadow>
          <boxGeometry args={[1, 0.1, 0.5]} />
          <meshStandardMaterial color="#c8bda6" roughness={0.8} />
        </mesh>

        <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
          <planeGeometry args={[16, 16]} />
          <meshStandardMaterial color="#2a3044" roughness={0.95} />
        </mesh>
      </group>
    </DemoEscena>
  )
}

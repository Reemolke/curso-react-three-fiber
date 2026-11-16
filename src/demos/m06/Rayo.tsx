import { useEffect, useMemo, useRef } from 'react'
import type { RefObject } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { DemoEscena } from '../marco'

type Props = {
  cuenta: RefObject<HTMLSpanElement | null>
}

function Escena({ cuenta }: Props) {
  const escena = useThree((estado) => estado.scene)
  const raycaster = useRef(new THREE.Raycaster())
  const fin = useRef(new THREE.Vector3())
  const ultimo = useRef(-1)

  /**
   * La línea se crea una sola vez. Su geometría tiene dos vértices que se
   * reescriben en cada frame: el origen del rayo y el punto de impacto.
   */
  const rayo = useMemo(() => {
    const geometria = new THREE.BufferGeometry()
    geometria.setAttribute(
      'position',
      new THREE.BufferAttribute(new Float32Array(6), 3),
    )
    const linea = new THREE.Line(
      geometria,
      new THREE.LineBasicMaterial({ color: '#4d8df6' }),
    )
    linea.frustumCulled = false
    // Sin esto, el rayo se intersectaría a sí mismo en el recuento.
    linea.raycast = () => {}
    return linea
  }, [])

  useEffect(() => {
    return () => {
      rayo.geometry.dispose()
      ;(rayo.material as THREE.Material).dispose()
    }
  }, [rayo])

  useFrame((estado) => {
    const camara = estado.camera
    // La cámara puede haberse movido en este mismo frame.
    camara.updateMatrixWorld()

    const trazador = raycaster.current
    trazador.setFromCamera(estado.pointer, camara)

    // Este es un raycast explícito, distinto del que R3F hace por cada evento.
    const impactos = trazador.intersectObjects(escena.children, true)
    const primero = impactos[0]

    if (primero) {
      fin.current.copy(primero.point)
    } else {
      fin.current.copy(trazador.ray.origin).addScaledVector(trazador.ray.direction, 18)
    }

    const atributo = rayo.geometry.getAttribute('position') as THREE.BufferAttribute
    atributo.setXYZ(
      0,
      trazador.ray.origin.x,
      trazador.ray.origin.y,
      trazador.ray.origin.z,
    )
    atributo.setXYZ(1, fin.current.x, fin.current.y, fin.current.z)
    atributo.needsUpdate = true

    const material = rayo.material as THREE.LineBasicMaterial
    material.color.set(impactos.length > 0 ? '#f5a524' : '#4d8df6')

    // La UI se actualiza mutando el DOM, no con setState: esto corre a 60 fps.
    if (impactos.length !== ultimo.current) {
      ultimo.current = impactos.length
      if (cuenta.current) cuenta.current.textContent = String(impactos.length)
    }
  })

  return (
    <>
      <ambientLight intensity={0.75} />
      <directionalLight position={[4, 7, 5]} intensity={2.2} />

      <primitive object={rayo} />

      <mesh position={[0, 0.75, 0]} rotation={[0.3, 0.4, 0]}>
        <torusKnotGeometry args={[0.45, 0.14, 96, 12]} />
        <meshStandardMaterial color="#f5a524" roughness={0.3} metalness={0.2} />
      </mesh>

      <mesh position={[-1.85, 0.55, 0.1]} rotation={[0.2, 0.5, 0]}>
        <boxGeometry args={[0.8, 0.8, 0.8]} />
        <meshStandardMaterial color="#4d8df6" roughness={0.4} />
      </mesh>

      <mesh position={[1.85, 0.55, -0.1]}>
        <sphereGeometry args={[0.5, 24, 24]} />
        <meshStandardMaterial color="#3fbf87" roughness={0.35} />
      </mesh>

      <mesh position={[0.95, 1.65, -0.3]}>
        <coneGeometry args={[0.4, 0.85, 20]} />
        <meshStandardMaterial color="#e05a8a" roughness={0.4} />
      </mesh>

      <mesh position={[-0.95, 1.6, -0.2]} rotation={[0.5, 0, 0.4]}>
        <icosahedronGeometry args={[0.44, 0]} />
        <meshStandardMaterial color="#b48ef5" roughness={0.4} />
      </mesh>

      <mesh position={[0, 0.15, 0.9]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.85, 0.08, 12, 48]} />
        <meshStandardMaterial color="#8fa3c8" roughness={0.5} />
      </mesh>
    </>
  )
}

export default function Rayo() {
  const cuenta = useRef<HTMLSpanElement>(null)

  return (
    <DemoEscena
      titulo="Un rayo explícito, frame a frame"
      descripcion="Una línea sale de la cámara y atraviesa el punto donde está el puntero. Si toca algún objeto se pinta en ámbar y el contador indica cuántos impactos ha encontrado; si no toca nada, queda azul. Los objetos flotan alrededor del centro."
      alto={380}
      camara={[0, 1.8, 6.2]}
      fov={45}
      controles={
        <p className="w-full text-xs text-texto-suave">
          <span className="mr-2 font-mono text-[10px] uppercase tracking-widest text-texto-tenue">
            impactos
          </span>
          <span ref={cuenta} className="font-mono text-sm text-acento">
            0
          </span>
          <span className="ml-3 text-texto-tenue">
            Cuenta intersecciones, no objetos únicos: una malla puede aportar más de una.
          </span>
        </p>
      }
      nota="El puntero no elige el origen del rayo: el rayo siempre nace en la cámara. El puntero solo decide su dirección. Mueve el ratón por el lienzo y observa cómo cambia el recuento."
    >
      <Escena cuenta={cuenta} />
    </DemoEscena>
  )
}

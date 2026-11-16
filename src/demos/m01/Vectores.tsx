import { useEffect, useMemo, useState } from 'react'
import * as THREE from 'three'
import { DemoEscena, Deslizador, Interruptor } from '../marco'

const ARRIBA = new THREE.Vector3(0, 1, 0)
const VELOCIDAD = 1.4 // metros por segundo

/**
 * 1.3 — Vectores: posición, dirección y distancia.
 *
 * El dron persigue un objetivo móvil. La flecha es el vector que va del dron al
 * objetivo; para avanzar a velocidad constante se normaliza (longitud 1) y se
 * multiplica por la velocidad y por el delta. Sin useFrame a propósito: el bucle
 * es el de la lección 0.3.
 */
export default function Vectores() {
  const [objetivoX, setObjetivoX] = useState(2)
  const [objetivoZ, setObjetivoZ] = useState(-1.5)
  const [perseguir, setPerseguir] = useState(true)
  const [dron, setDron] = useState<[number, number, number]>([-2, 0.9, 1.4])

  const objetivo = useMemo<[number, number, number]>(() => [objetivoX, 1.1, objetivoZ], [objetivoX, objetivoZ])

  useEffect(() => {
    if (!perseguir) return

    let raf = 0
    let anterior = performance.now()

    const paso = (ahora: number) => {
      const delta = Math.min((ahora - anterior) / 1000, 0.05)
      anterior = ahora

      setDron(([x, y, z]) => {
        const dx = objetivo[0] - x
        const dy = objetivo[1] - y
        const dz = objetivo[2] - z
        const distancia = Math.hypot(dx, dy, dz)

        if (distancia < 0.04) return [x, y, z]

        const avance = Math.min(VELOCIDAD * delta, distancia)
        return [x + (dx / distancia) * avance, y + (dy / distancia) * avance, z + (dz / distancia) * avance]
      })

      raf = requestAnimationFrame(paso)
    }

    raf = requestAnimationFrame(paso)
    return () => cancelAnimationFrame(raf)
  }, [perseguir, objetivo])

  const dx = objetivo[0] - dron[0]
  const dy = objetivo[1] - dron[1]
  const dz = objetivo[2] - dron[2]
  const distancia = Math.hypot(dx, dy, dz)

  const direccion =
    distancia > 0.0001
      ? new THREE.Vector3(dx / distancia, dy / distancia, dz / distancia)
      : ARRIBA.clone()

  const posicionDron = new THREE.Vector3(dron[0], dron[1], dron[2])
  const largoFlecha = Math.max(distancia - 0.32, 0.001)
  const centroFlecha = posicionDron.clone().addScaledVector(direccion, largoFlecha / 2)
  const puntaFlecha = posicionDron.clone().addScaledVector(direccion, distancia - 0.15)
  const orientacion = new THREE.Quaternion().setFromUnitVectors(ARRIBA, direccion)
  const euler = new THREE.Euler().setFromQuaternion(orientacion)

  return (
    <DemoEscena
      titulo="El dron persigue el punto: la flecha es el vector"
      descripcion="Un dron azul persigue una esfera roja. Una flecha ámbar une el dron con el objetivo y muestra la dirección y la distancia que quedan."
      alto={360}
      camara={[5, 4, 6]}
      controles={
        <>
          <Deslizador etiqueta="Objetivo X" valor={objetivoX} min={-3} max={3} paso={0.1} sufijo=" m" onChange={setObjetivoX} />
          <Deslizador etiqueta="Objetivo Z" valor={objetivoZ} min={-3} max={3} paso={0.1} sufijo=" m" onChange={setObjetivoZ} />
          <Interruptor etiqueta="Perseguir" activo={perseguir} onChange={setPerseguir} />
          <span className="font-mono text-[11px] text-texto-tenue">
            d = {distancia.toFixed(2)} m · dir = ({direccion.x.toFixed(2)}, {direccion.y.toFixed(2)},{' '}
            {direccion.z.toFixed(2)})
          </span>
        </>
      }
      nota="La flecha no se dibuja con una API mágica: es un cilindro y un cono orientados con un cuaternión. Su longitud es la distancia; su dirección, el vector normalizado."
    >
      <gridHelper args={[10, 10, '#2b3242', '#1b2130']} />

      <mesh position={dron}>
        <octahedronGeometry args={[0.28, 0]} />
        <meshBasicMaterial color="#4d8df6" />
      </mesh>

      <mesh position={objetivo}>
        <sphereGeometry args={[0.16, 16, 16]} />
        <meshBasicMaterial color="#ff5a5a" />
      </mesh>

      {distancia > 0.25 && (
        <>
          <mesh position={[centroFlecha.x, centroFlecha.y, centroFlecha.z]} rotation={[euler.x, euler.y, euler.z]}>
            <cylinderGeometry args={[0.035, 0.035, largoFlecha, 10]} />
            <meshBasicMaterial color="#f5a524" />
          </mesh>
          <mesh position={[puntaFlecha.x, puntaFlecha.y, puntaFlecha.z]} rotation={[euler.x, euler.y, euler.z]}>
            <coneGeometry args={[0.13, 0.32, 12]} />
            <meshBasicMaterial color="#f5a524" />
          </mesh>
        </>
      )}
    </DemoEscena>
  )
}

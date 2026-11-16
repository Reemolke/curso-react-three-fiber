import { useState } from 'react'
import { DemoEscena, Deslizador } from '../marco'

/**
 * 1.2 — Coordenadas, unidades y el eje Y.
 *
 * Cada celda del grid mide un metro. El cubo se mueve con tres deslizadores y
 * deja una marca en el suelo y una línea vertical hasta su altura para que la
 * lectura de [x, y, z] no dependa solo de la perspectiva.
 */
export default function Coordenadas() {
  const [x, setX] = useState(0.8)
  const [y, setY] = useState(1.2)
  const [z, setZ] = useState(-0.6)

  return (
    <DemoEscena
      titulo="Coordenadas en metros: mueve el cubo por el espacio"
      descripcion="Una rejilla de diez por diez celdas de un metro, con los ejes X, Y y Z en el origen. Tres deslizadores mueven un cubo por el espacio; una marca en el suelo y una línea vertical indican su proyección y su altura."
      alto={360}
      camara={[4.2, 3.2, 5]}
      controles={
        <>
          <Deslizador etiqueta="X" valor={x} min={-3} max={3} paso={0.1} sufijo=" m" onChange={setX} />
          <Deslizador etiqueta="Y" valor={y} min={-3} max={3} paso={0.1} sufijo=" m" onChange={setY} />
          <Deslizador etiqueta="Z" valor={z} min={-3} max={3} paso={0.1} sufijo=" m" onChange={setZ} />
          <span className="font-mono text-[11px] text-texto-tenue">
            posición = [{x.toFixed(1)}, {y.toFixed(1)}, {z.toFixed(1)}] m
          </span>
        </>
      }
      nota="Cada celda de la rejilla mide 1 m. El eje X es rojo, el Y verde y el Z azul; el eje Y apunta hacia arriba."
    >
      <gridHelper args={[10, 10, '#3b4c6b', '#222a39']} />
      <axesHelper args={[3]} />

      <mesh position={[x, y, z]}>
        <boxGeometry args={[0.6, 0.6, 0.6]} />
        <meshBasicMaterial color="#f5a524" />
      </mesh>

      <axesHelper args={[0.8]} position={[x, y, z]} />

      <mesh position={[x, 0.01, z]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.2, 0.26, 32]} />
        <meshBasicMaterial color="#f5a524" transparent opacity={0.7} />
      </mesh>

      {Math.abs(y) > 0.02 && (
        <mesh position={[x, y / 2, z]}>
          <cylinderGeometry args={[0.012, 0.012, Math.abs(y), 8]} />
          <meshBasicMaterial color="#f5a524" transparent opacity={0.45} />
        </mesh>
      )}
    </DemoEscena>
  )
}

import { useState } from 'react'
import { BackSide } from 'three'
import { DemoEscena, Interruptor } from '../marco'

/**
 * 1.1 — El trípode: escena, cámara y luz.
 *
 * La cámara no se puede quitar de verdad sin romper el renderer, así que el
 * interruptor «Cámara» simula el efecto tapando el objetivo con una esfera negra
 * alrededor del punto de vista. El interruptor «Luz» no usa un material
 * fotorrealista a propósito: iluminar de verdad es el módulo 4; aquí cambiamos
 * el color a mano para que se vea el concepto sin adelantar materia.
 */
export default function Tripode() {
  const [verCamara, setVerCamara] = useState(true)
  const [verLuz, setVerLuz] = useState(true)
  const [verObjeto, setVerObjeto] = useState(true)

  return (
    <DemoEscena
      titulo="Escena, cámara y luz: quita una pieza y mira"
      descripcion="Un cubo sobre una rejilla, con una pequeña lámpara a la derecha. Tres interruptores permiten ocultar la cámara, la luz o el cubo para ver qué produce cada pieza."
      alto={320}
      camara={[3, 2.4, 4.4]}
      controles={
        <>
          <Interruptor etiqueta="Cámara" activo={verCamara} onChange={setVerCamara} />
          <Interruptor etiqueta="Luz" activo={verLuz} onChange={setVerLuz} />
          <Interruptor etiqueta="Objeto" activo={verObjeto} onChange={setVerObjeto} />
          <span className="font-mono text-[11px] text-texto-tenue">
            {verCamara ? 'renderer(cámara, escena)' : 'sin cámara: no hay imagen'}
          </span>
        </>
      }
      nota="El cubo usa meshBasicMaterial: no reacciona a la luz real. El color oscuro solo simula la luz apagada para no adelantar los materiales del módulo 3."
    >
      <gridHelper args={[10, 10, '#2b3242', '#1b2130']} />

      {verObjeto && (
        <mesh position={[0, 0.8, 0]} rotation={[0.4, 0.7, 0]}>
          <boxGeometry args={[1.4, 1.4, 1.4]} />
          <meshBasicMaterial color={verLuz ? '#f5a524' : '#343a46'} />
        </mesh>
      )}

      {verLuz && (
        <group position={[2.2, 2.4, 1.2]}>
          <mesh>
            <sphereGeometry args={[0.18, 16, 16]} />
            <meshBasicMaterial color="#ffd166" />
          </mesh>
          <mesh>
            <torusGeometry args={[0.34, 0.015, 8, 48]} />
            <meshBasicMaterial color="#ffd166" />
          </mesh>
        </group>
      )}

      {/* Esfera invertida centrada en la cámara: todo lo que mira es negro. */}
      {!verCamara && (
        <mesh position={[3, 2.4, 4.4]}>
          <sphereGeometry args={[0.45, 16, 16]} />
          <meshBasicMaterial color="#05070c" side={BackSide} />
        </mesh>
      )}
    </DemoEscena>
  )
}

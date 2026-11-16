import { useState } from 'react'
import * as THREE from 'three'
import { DemoEscena, Deslizador, GrupoOpciones } from '../marco'

type Modo = 'euler' | 'cuaternion'

const GRADOS = Math.PI / 180
const RADIANES = Math.PI / 2

function Anillo({ eje }: { eje: 'x' | 'y' | 'z' }) {
  const rotacion: [number, number, number] =
    eje === 'x' ? [0, RADIANES, 0] : eje === 'y' ? [RADIANES, 0, 0] : [0, 0, 0]
  const color = eje === 'x' ? '#ff6b6b' : eje === 'y' ? '#3fbf87' : '#4d8df6'

  return (
    <mesh rotation={rotacion}>
      <torusGeometry args={[1.5, 0.012, 8, 64]} />
      <meshBasicMaterial color={color} transparent opacity={0.75} />
    </mesh>
  )
}

function EscenaEuler({ x, y, z, bloqueado }: { x: number; y: number; z: number; bloqueado: boolean }) {
  return (
    <group rotation={[x * GRADOS, 0, 0]}>
      <Anillo eje="x" />
      <group rotation={[0, y * GRADOS, 0]}>
        <Anillo eje="y" />
        <group rotation={[0, 0, z * GRADOS]}>
          <Anillo eje="z" />
          <mesh>
            <boxGeometry args={[0.8, 0.8, 0.8]} />
            <meshNormalMaterial />
          </mesh>
          <mesh>
            <torusGeometry args={[1.1, 0.035, 8, 48]} />
            <meshBasicMaterial color={bloqueado ? '#ff5a5a' : '#3fbf87'} />
          </mesh>
        </group>
      </group>
    </group>
  )
}

function EscenaCuaternion({ t }: { t: number }) {
  // Dos orientaciones de partida y llegada. El slerp recorre el arco más corto
  // entre cuaterniones; el lerp de Euler interpola cada ángulo por separado.
  const qA = new THREE.Quaternion().setFromEuler(new THREE.Euler(0, 0, 0))
  const qB = new THREE.Quaternion().setFromEuler(new THREE.Euler(0, RADIANES, RADIANES))
  const q = new THREE.Quaternion().slerpQuaternions(qA, qB, t)
  const eSlerp = new THREE.Euler().setFromQuaternion(q)
  const eLerp = new THREE.Euler(0, RADIANES * t, RADIANES * t)

  return (
    <>
      <group position={[-1.1, 0, 0]} rotation={[eSlerp.x, eSlerp.y, eSlerp.z]}>
        <mesh>
          <boxGeometry args={[0.9, 0.9, 0.9]} />
          <meshNormalMaterial />
        </mesh>
        <axesHelper args={[0.9]} />
      </group>

      <group position={[1.1, 0, 0]} rotation={[eLerp.x, eLerp.y, eLerp.z]}>
        <mesh>
          <boxGeometry args={[0.9, 0.9, 0.9]} />
          <meshNormalMaterial />
        </mesh>
        <axesHelper args={[0.9]} />
      </group>
    </>
  )
}

/**
 * 1.4 y 1.5 — Rotaciones con Euler y cuaterniones, en una sola demo.
 *
 * Dos lecciones comparten mecánica (elegir una orientación y moverla), así que
 * comparten componente. El modo Euler sirve a 1.4; el modo Cuaternión, a 1.5.
 */
export default function Rotaciones() {
  const [modo, setModo] = useState<Modo>('euler')

  const [rx, setRx] = useState(0)
  const [ry, setRy] = useState(0)
  const [rz, setRz] = useState(0)
  const [t, setT] = useState(0.35)

  const bloqueado = Math.abs(Math.abs(ry) - 90) < 3

  return (
    <DemoEscena
      titulo="Euler y cuaterniones: dos formas de orientar"
      descripcion="En modo Euler, tres anillos concéntricos representan los ejes de rotación y tres deslizadores los giran. En modo Cuaternión, dos cubos comparan la interpolación slerp con la interpolación lineal de ángulos Euler."
      alto={360}
      camara={[4.4, 3.4, 5.2]}
      controles={
        <>
          <GrupoOpciones
            etiqueta="Modo"
            valor={modo}
            opciones={[
              { valor: 'euler', texto: 'Euler' },
              { valor: 'cuaternion', texto: 'Cuaternión' },
            ]}
            onChange={setModo}
          />

          {modo === 'euler' ? (
            <>
              <Deslizador etiqueta="X" valor={rx} min={-180} max={180} paso={1} sufijo="°" onChange={setRx} />
              <Deslizador etiqueta="Y" valor={ry} min={-180} max={180} paso={1} sufijo="°" onChange={setRy} />
              <Deslizador etiqueta="Z" valor={rz} min={-180} max={180} paso={1} sufijo="°" onChange={setRz} />
              <span className={`font-mono text-[11px] ${bloqueado ? 'text-error' : 'text-texto-tenue'}`}>
                {bloqueado ? 'gimbal lock: un eje deja de ser independiente' : 'tres ejes independientes'}
              </span>
            </>
          ) : (
            <>
              <Deslizador etiqueta="slerp" valor={t} min={0} max={1} paso={0.01} onChange={setT} />
              <span className="font-mono text-[11px] text-texto-tenue">izquierda: slerp · derecha: lerp de Euler</span>
            </>
          )}
        </>
      }
      nota={
        modo === 'euler'
          ? 'Los anillos son el orden X → Y → Z. Lleva Y a ±90° y verás cómo los anillos X y Z se solapan: has perdido un grado de libertad.'
          : 'Las dos orientaciones de los extremos son las mismas para ambos métodos. Lo que cambia es el camino: el slerp gira en arco; el lerp de Euler avanza cada ángulo por separado.'
      }
    >
      {modo === 'euler' ? (
        <EscenaEuler x={rx} y={ry} z={rz} bloqueado={bloqueado} />
      ) : (
        <EscenaCuaternion t={t} />
      )}
    </DemoEscena>
  )
}

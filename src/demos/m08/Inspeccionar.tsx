import { useCallback, useEffect, useMemo, useState } from 'react'
import type { ThreeEvent } from '@react-three/fiber'
import { Mesh } from 'three'
import type { Material } from 'three'
import { MODELOS } from '../../tres/rutas'
import { useGLTF } from '../../tres/gltf'
import { DemoEscena, Deslizador, Interruptor } from '../marco'

type MaterialConColor = Material & {
  color?: { set: (color: string) => void }
  emissive?: { set: (color: string) => void }
}

/**
 * Recorre el grafo de un modelo real y deja tocar piezas concretas.
 *
 * Se trabaja sobre un clon del `scene` porque el original está cacheado por
 * `useGLTF`: si se modifica, la siguiente demo que lo cargue lo recibe sucio.
 * El clon comparte geometría (barato) y aquí se clona también el material de
 * cada malla, que es lo que permite recolorear una pieza sin tocar las demás.
 */
function Rover({
  seleccion,
  ocultar,
  recolorear,
  separacion,
  ordenDeClonar,
  alPreparar,
  alSeleccionar,
}: {
  seleccion: string
  ocultar: boolean
  recolorear: boolean
  separacion: number
  ordenDeClonar: number
  alPreparar: (nombres: string[]) => void
  alSeleccionar: (nombre: string) => void
}) {
  const { scene } = useGLTF(MODELOS.rover)
  const [clones, setClones] = useState<Mesh[]>([])

  const copia = useMemo(() => {
    const clon = scene.clone(true)
    // Material propio por malla: el clon de `scene` comparte materiales.
    clon.traverse((objeto) => {
      if (objeto instanceof Mesh) {
        objeto.material = Array.isArray(objeto.material)
          ? objeto.material.map((material) => material.clone())
          : objeto.material.clone()
      }
    })
    return clon
  }, [scene])

  useEffect(() => {
    const nombres: string[] = []
    copia.traverse((objeto) => {
      if (objeto instanceof Mesh && objeto.name) nombres.push(objeto.name)
    })
    alPreparar(nombres)
  }, [copia, alPreparar])

  useEffect(() => {
    copia.traverse((objeto) => {
      if (!(objeto instanceof Mesh)) return

      const materiales = (
        Array.isArray(objeto.material) ? objeto.material : [objeto.material]
      ) as MaterialConColor[]
      const elegido = objeto.name === seleccion

      objeto.visible = elegido ? !ocultar : true

      for (const material of materiales) {
        if (material.emissive) {
          material.emissive.set(elegido && !recolorear ? '#f5a524' : '#000000')
        }
        if (material.color && elegido && recolorear) {
          material.color.set('#3fbf87')
        }
      }
    })
  }, [copia, seleccion, ocultar, recolorear])

  useEffect(() => {
    if (ordenDeClonar === 0) return

    const original = copia.getObjectByName(seleccion)
    if (!(original instanceof Mesh)) return

    setClones((actuales) => {
      if (actuales.length >= 8) return actuales
      const clon = original.clone()
      clon.material = Array.isArray(original.material)
        ? original.material.map((material) => material.clone())
        : original.material.clone()
      clon.position.x += separacion * (actuales.length + 1)
      clon.position.y += 0.35
      return [...actuales, clon]
    })
  }, [ordenDeClonar, copia, seleccion, separacion])

  return (
    <group scale={1.5} position={[0, -0.35, 0]}>
      <primitive
        object={copia}
        onClick={(evento: ThreeEvent<MouseEvent>) => {
          evento.stopPropagation()
          if (evento.object.name) alSeleccionar(evento.object.name)
        }}
      />
      {clones.map((clon, indice) => (
        <primitive key={`${indice}-${clon.uuid}`} object={clon} />
      ))}
    </group>
  )
}

export default function Inspeccionar() {
  const [nombres, setNombres] = useState<string[]>([])
  const [seleccion, setSeleccion] = useState('chasis')
  const [ocultar, setOcultar] = useState(false)
  const [recolorear, setRecolorear] = useState(true)
  const [separacion, setSeparacion] = useState(0.6)
  const [ordenDeClonar, setOrdenDeClonar] = useState(0)

  const preparar = useCallback((lista: string[]) => {
    setNombres((actual) => (actual.join('|') === lista.join('|') ? actual : lista))
  }, [])

  return (
    <DemoEscena
      titulo="Aisla, oculta y recolorea piezas del rover"
      descripcion="El rover del curso con una lista de sus mallas. Al pulsar una pieza de la lista o del modelo se resalta, se puede ocultar y recolorear. Un botón clona la pieza elegida en el espacio."
      alto={430}
      camara={[3.4, 2.4, 4.2]}
      controles={
        <>
          <Interruptor etiqueta="ocultar la pieza" activo={ocultar} onChange={setOcultar} />
          <Interruptor etiqueta="recolorear" activo={recolorear} onChange={setRecolorear} />
          <Deslizador
            etiqueta="separación de clones"
            valor={separacion}
            min={0.2}
            max={1.2}
            paso={0.05}
            onChange={setSeparacion}
          />
          <button
            type="button"
            onClick={() => setOrdenDeClonar((valor) => valor + 1)}
            className="rounded-lg border border-borde px-2.5 py-1 text-xs font-medium text-texto-suave transition hover:bg-superficie-alta"
          >
            Clonar la pieza
          </button>
          <span className="ml-auto font-mono text-xs text-texto-suave">
            {nombres.length} piezas · {seleccion}
          </span>
        </>
      }
      nota="El modelo se recorre con `traverse` y cada malla se identifica por `name`. El clon comparte geometría y búferes: duplicar una pieza cuesta un objeto, no un modelo nuevo. Los materiales sí se clonan, porque si no, recolorear una pieza pintaría todas."
    >
      <ambientLight intensity={0.5} />
      <directionalLight position={[4, 6, 3]} intensity={2.5} />
      <directionalLight position={[-4, 2, -3]} intensity={0.6} color="#9fc2ff" />

      <Rover
        seleccion={seleccion}
        ocultar={ocultar}
        recolorear={recolorear}
        separacion={separacion}
        ordenDeClonar={ordenDeClonar}
        alPreparar={preparar}
        alSeleccionar={setSeleccion}
      />

      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.37, 0]}>
        <circleGeometry args={[5, 64]} />
        <meshStandardMaterial color="#171d2e" roughness={0.92} />
      </mesh>
    </DemoEscena>
  )
}

/** Nombres de malla disponibles, exportados para el texto de la lección. */
export const PIEZAS_ROVER = [
  'chasis',
  'blindaje',
  'bandeja',
  'panel_solar',
  'brazo_base',
  'brazo_art1',
  'brazo_art2',
  'pinza_izq',
  'pinza_der',
  'antena_plato',
  'faro_izq',
  'faro_der',
]

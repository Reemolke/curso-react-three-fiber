import { Suspense, useEffect, useRef, useState } from 'react'
import { useProgress } from '@react-three/drei'
import { MODELOS } from '../../tres/rutas'
import { useGLTF } from '../../tres/gltf'
import { DemoEscena } from '../marco'

/** Los tres modelos que se cargan en la demo. */
const PIEZAS = [
  { url: MODELOS.robot, posicion: [-1.65, 0, 0.1] as [number, number, number], escala: 1.05 },
  { url: MODELOS.lampara, posicion: [0, 0, 0] as [number, number, number], escala: 1.15 },
  { url: MODELOS.rover, posicion: [1.75, 0, 0.05] as [number, number, number], escala: 0.95 },
]

/** Un modelo: suspende hasta que su `.glb` está descargado y decodificado. */
function Modelo({
  url,
  posicion,
  escala,
}: {
  url: string
  posicion: [number, number, number]
  escala: number
}) {
  const { scene } = useGLTF(url)
  return <primitive object={scene} position={posicion} scale={escala} />
}

function Escena() {
  return (
    <>
      <ambientLight intensity={0.55} />
      <directionalLight position={[5, 8, 5]} intensity={2.4} />
      <directionalLight position={[-6, 4, -5]} intensity={0.6} color="#9fc2ff" />

      {/* Todo el grupo baja para que el centro visual quede donde mira la cámara. */}
      <group position={[0, -0.85, 0]}>
        {PIEZAS.map((pieza) => (
          <Modelo key={pieza.url} {...pieza} />
        ))}

        <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
          <circleGeometry args={[3.9, 64]} />
          <meshStandardMaterial color="#161e2f" roughness={0.95} />
        </mesh>
      </group>
    </>
  )
}

/**
 * Pantalla de carga.
 *
 * Tres estados, y conviene distinguirlos porque no son lo mismo: `active` dice
 * si hay algo en vuelo; `progress` es el porcentaje del gestor de carga de
 * three; `item` es la última URL pedida. La pantalla se retira cuando el gestor
 * ha terminado **y** ha pasado un tiempo mínimo, para que no parpadee en
 * conexiones rápidas.
 */
export default function Cargar() {
  const { active, progress, item, loaded, total } = useProgress()
  const [epoca, setEpoca] = useState(0)
  const [minimo, setMinimo] = useState(false)
  const montado = useRef(true)

  useEffect(() => {
    montado.current = true
    setMinimo(false)

    // Tiempo mínimo en pantalla: 1,9 s. En localhost los assets llegan en
    // milisegundos y sin esto solo verías un destello.
    const id = window.setTimeout(() => {
      if (montado.current) setMinimo(true)
    }, 1900)

    return () => {
      montado.current = false
      window.clearTimeout(id)
    }
  }, [epoca])

  const cargando = active || !minimo
  const porcentaje = Math.round(progress)

  const vaciarYCargar = () => {
    // `useGLTF` guarda en caché cada modelo resuelto. Vaciar es lo que convierte
    // una recarga instantánea en una carga de verdad, con su progreso.
    PIEZAS.forEach((pieza) => useGLTF.clear(pieza.url))
    setEpoca((valor) => valor + 1)
  }

  return (
    <DemoEscena
      titulo="Pantalla de carga con progreso real"
      descripcion="Tres modelos se cargan a la vez. Mientras llegan, una capa sobre el lienzo muestra el porcentaje del gestor de carga y el nombre del archivo en vuelo. Al terminar, la capa se retira y aparecen las piezas."
      alto={380}
      camara={[0, 1.1, 5.6]}
      controles={
        <div className="flex w-full flex-wrap items-center gap-x-5 gap-y-2">
          <button
            type="button"
            onClick={vaciarYCargar}
            className="rounded-lg border border-borde bg-fondo/60 px-2.5 py-1 text-xs text-texto-suave transition hover:border-acento/50 hover:text-texto"
          >
            vaciar caché y recargar
          </button>
          <span className="font-mono text-[11px] text-texto-tenue">
            {active
              ? `en vuelo · ${loaded}/${total}`
              : `gestor inactivo · ${loaded}/${total} resueltos`}
          </span>
          <span className="ml-auto font-mono text-[11px] text-texto-tenue">
            tiempo mínimo: 1,9 s
          </span>
        </div>
      }
      nota="Pulsa «vaciar caché y recargar» y mira cómo el porcentaje sube de golpe: los tres archivos pesan menos de 40 kB entre todos. En una escena real con un HDRI y diez texturas de 2K, ese mismo código tarda segundos y el porcentaje sí avanza a saltos visibles."
      capa={
        cargando ? (
          <div className="absolute inset-0 grid place-items-center bg-fondo/85 px-6 backdrop-blur-sm">
            <div className="w-full max-w-xs space-y-3 text-center">
              <div className="mx-auto size-10 animate-spin rounded-full border-2 border-acento/25 border-t-acento" />
              <p className="text-sm font-medium text-texto">Preparando el taller</p>
              <div
                role="progressbar"
                aria-valuenow={porcentaje}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label="progreso de carga"
                className="h-1.5 w-full overflow-hidden rounded-full bg-borde"
              >
                <div
                  className="h-full rounded-full bg-acento transition-[width] duration-300"
                  style={{ width: `${porcentaje}%` }}
                />
              </div>
              <p className="font-mono text-xs text-texto-tenue">
                {porcentaje} %{active && item ? ` · ${item.split('/').pop()}` : ''}
              </p>
              <p className="text-[11px] leading-relaxed text-texto-tenue">
                La capa se retira cuando el gestor termina y ha pasado el tiempo mínimo.
              </p>
            </div>
          </div>
        ) : null
      }
    >
      <Suspense fallback={null}>
        <Escena key={epoca} />
      </Suspense>
    </DemoEscena>
  )
}

import { useEffect, useMemo, useRef, useState } from 'react'
import { BoxGeometry, DataTexture, MeshStandardMaterial, SRGBColorSpace } from 'three'
import { DemoEscena, Interruptor } from '../marco'
import { Medidor, PanelMetricas, useSalidas } from './medicion'

const MAXIMO = 150

/** Una pieza con recursos propios: geometría, textura y material. */
function Pieza({ indice, liberar }: { indice: number; liberar: boolean }) {
  const recursos = useMemo(() => {
    const geometria = new BoxGeometry(0.52, 0.52, 0.52)

    // Textura de un píxel: lo mínimo para que el contador de texturas suba.
    const datos = new Uint8Array([
      (indice * 47) % 200 + 40,
      (indice * 91) % 180 + 60,
      (indice * 29) % 160 + 80,
      255,
    ])
    const textura = new DataTexture(datos, 1, 1)
    textura.colorSpace = SRGBColorSpace
    textura.needsUpdate = true

    const material = new MeshStandardMaterial({
      map: textura,
      roughness: 0.5,
      metalness: 0.2,
    })

    return { geometria, textura, material }
  }, [indice])

  // El valor de `liberar` se lee al desmontar, no al montar: el interruptor
  // puede cambiar mientras la pieza está viva.
  const liberarAlSalir = useRef(liberar)
  liberarAlSalir.current = liberar

  useEffect(() => {
    return () => {
      if (!liberarAlSalir.current) return
      recursos.geometria.dispose()
      recursos.material.dispose()
      recursos.textura.dispose()
    }
  }, [recursos])

  const columna = indice % 10
  const fila = Math.floor(indice / 10)

  return (
    <mesh
      geometry={recursos.geometria}
      material={recursos.material}
      position={[(columna - 4.5) * 0.66, 0.3, (fila - 3) * 0.66]}
    />
  )
}

/** Dentro del canvas: piezas y medidor. */
function Escena({
  piezas,
  liberar,
  salidas,
}: {
  piezas: number[]
  liberar: boolean
  salidas: ReturnType<typeof useSalidas>
}) {
  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 8, 5]} intensity={2.3} />

      {piezas.map((id) => (
        <Pieza key={id} indice={id} liberar={liberar} />
      ))}

      <Medidor salidas={salidas} />
    </>
  )
}

/**
 * Memoria: lo que creas a mano, lo liberas a mano.
 *
 * Cada pieza crea su propia geometría, su textura y su material con `new`. Al
 * desmontarse, R3F no puede adivinar que esos objetos son tuyos: hay que llamar
 * a `dispose()`. El panel enseña las geometrías y texturas que el renderer tiene
 * subidas a la GPU (`gl.info.memory`), que es la cifra que importa. Crear y
 * destruir con el interruptor apagado deja el contador clavado.
 */
export default function Memoria() {
  // Arranca con una cuadrícula ya poblada: una demo vacía no enseña nada.
  const [piezas, setPiezas] = useState<number[]>(() =>
    Array.from({ length: 40 }, (_, indice) => indice),
  )
  const [liberar, setLiberar] = useState(true)
  const siguiente = useRef(40)
  const salidas = useSalidas()

  const crear = (cantidad: number) => {
    setPiezas((actual) => {
      const nuevas = Array.from({ length: cantidad }, () => siguiente.current++)
      return [...actual, ...nuevas].slice(-MAXIMO)
    })
  }

  const destruir = (cantidad: number) => {
    setPiezas((actual) => actual.slice(0, Math.max(0, actual.length - cantidad)))
  }

  return (
    <DemoEscena
      titulo="Crear, destruir y liberar recursos"
      descripcion="Una cuadrícula de piezas que se pueden crear y destruir. Cada pieza tiene su propia geometría, textura y material. Con el interruptor de liberar encendido, al destruirlas se devuelven sus recursos a la GPU; con él apagado, se quedan en memoria. El panel muestra las geometrías y texturas vivas."
      alto={360}
      camara={[0, 6.5, 8.5]}
      controles={
        <div className="w-full space-y-3">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-3">
            <button
              type="button"
              onClick={() => crear(25)}
              className="rounded-lg border border-borde bg-fondo/60 px-2.5 py-1 text-xs text-texto-suave transition hover:border-acento/50 hover:text-texto"
            >
              crear 25
            </button>
            <button
              type="button"
              onClick={() => destruir(25)}
              className="rounded-lg border border-borde bg-fondo/60 px-2.5 py-1 text-xs text-texto-suave transition hover:border-acento/50 hover:text-texto"
            >
              destruir 25
            </button>
            <button
              type="button"
              onClick={() => setPiezas([])}
              className="rounded-lg border border-borde bg-fondo/60 px-2.5 py-1 text-xs text-texto-suave transition hover:border-acento/50 hover:text-texto"
            >
              destruir todo
            </button>
            <Interruptor etiqueta="liberar al destruir" activo={liberar} onChange={setLiberar} />
            <span className="ml-auto font-mono text-[11px] text-texto-tenue">
              {piezas.length} / {MAXIMO} piezas
            </span>
          </div>
          <PanelMetricas salidas={salidas} />
        </div>
      }
      nota="Crea 100 piezas con «liberar» encendido y apagado: la cifra de geo/tex sube en los dos casos. Ahora destruye con el interruptor apagado y verás que no baja: esos objetos siguen ocupando GPU aunque ya no estén en la escena. Nunca es un problema de la demo de al lado; es el patrón que hace que una página con vistas que se abren y se cierran acabe consumiendo memoria sin fin."
    >
      <Escena piezas={piezas} liberar={liberar} salidas={salidas} />
    </DemoEscena>
  )
}

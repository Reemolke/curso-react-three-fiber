import { useEffect, useRef, type RefObject } from 'react'
import { useFrame } from '@react-three/fiber'
import { create } from 'zustand'
import type { Mesh } from 'three'
import { DemoEscena, Deslizador, Interruptor } from '../marco'

/**
 * Una tienda de Zustand normal y corriente.
 *
 * No tiene nada que ver con three: es un objeto fuera de React con un `set`.
 * La escena y la interfaz leen de aquí, y cada uno elige **cuánto** quiere
 * escuchar. Esa elección es toda la lección.
 */
type Tienda = {
  color: string
  altura: number
  girando: boolean
  fijarColor: (color: string) => void
  fijarAltura: (altura: number) => void
  alternarGiro: () => void
}

const useTienda = create<Tienda>((set) => ({
  color: '#6ea8fe',
  altura: 0.9,
  girando: true,
  fijarColor: (color) => set({ color }),
  fijarAltura: (altura) => set({ altura }),
  alternarGiro: () => set((estado) => ({ girando: !estado.girando })),
}))

const COLORES = [
  { valor: '#6ea8fe', texto: 'azul' },
  { valor: '#3fbf87', texto: 'verde' },
  { valor: '#f5a524', texto: 'ámbar' },
  { valor: '#e05f7a', texto: 'rosa' },
]

/** Cuenta ejecuciones del componente y las deja escritas en el panel. */
function useContador(destino: RefObject<HTMLSpanElement | null>) {
  const cuenta = useRef(0)
  cuenta.current += 1

  useEffect(() => {
    if (destino.current) destino.current.textContent = String(cuenta.current)
  })
}

/** Suscrito solo al color y a la altura: el giro no lo despierta. */
function Cubo({ contador }: { contador: RefObject<HTMLSpanElement | null> }) {
  const color = useTienda((estado) => estado.color)
  const altura = useTienda((estado) => estado.altura)
  useContador(contador)

  return (
    <mesh position={[-0.85, altura / 2 + 0.02, 0]} castShadow receiveShadow>
      <boxGeometry args={[0.9, altura, 0.9]} />
      <meshStandardMaterial color={color} roughness={0.38} metalness={0.25} />
    </mesh>
  )
}

/** Suscrita solo a `girando`: cambiar el color no la re-renderiza. */
function Esfera({ contador }: { contador: RefObject<HTMLSpanElement | null> }) {
  const girando = useTienda((estado) => estado.girando)
  useContador(contador)
  const malla = useRef<Mesh>(null)

  useFrame((_, delta) => {
    if (girando && malla.current) malla.current.rotation.y += delta * 1.4
  })

  return (
    <mesh ref={malla} position={[1.05, 0.65, 0]} castShadow receiveShadow>
      <sphereGeometry args={[0.62, 32, 20]} />
      <meshStandardMaterial color="#c8d3f5" roughness={0.22} metalness={0.55} />
    </mesh>
  )
}

/**
 * Lee la tienda sin suscribirse: `getState()` devuelve el valor del momento y
 * no crea dependencia. Este componente se renderiza una vez y nunca más.
 */
function Giro({ contador }: { contador: RefObject<HTMLSpanElement | null> }) {
  useContador(contador)
  const anillo = useRef<Mesh>(null)

  useFrame((_, delta) => {
    if (!anillo.current) return
    const { girando } = useTienda.getState()
    if (girando) anillo.current.rotation.z += delta * 0.7
  })

  return (
    <mesh ref={anillo} position={[0, 0.05, -1.1]} rotation={[-Math.PI / 2, 0, 0]}>
      <torusGeometry args={[1.75, 0.035, 8, 96]} />
      <meshStandardMaterial color="#4a5878" roughness={0.6} metalness={0.4} />
    </mesh>
  )
}

function Escena({
  cubo,
  esfera,
  giro,
}: {
  cubo: RefObject<HTMLSpanElement | null>
  esfera: RefObject<HTMLSpanElement | null>
  giro: RefObject<HTMLSpanElement | null>
}) {
  return (
    <>
      <ambientLight intensity={0.55} />
      <directionalLight
        position={[4, 7, 4]}
        intensity={2.5}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-camera-left={-4}
        shadow-camera-right={4}
        shadow-camera-top={4}
        shadow-camera-bottom={-4}
      />
      <directionalLight position={[-5, 3, -3]} intensity={0.6} color="#9fc2ff" />

      <Cubo contador={cubo} />
      <Esfera contador={esfera} />
      <Giro contador={giro} />

      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[12, 12]} />
        <meshStandardMaterial color="#151d2e" roughness={0.95} />
      </mesh>
    </>
  )
}

/** Cada control se suscribe a un solo campo. El padre no se suscribe a nada. */
function PanelColor() {
  const color = useTienda((estado) => estado.color)
  const fijarColor = useTienda((estado) => estado.fijarColor)

  return (
    <div className="flex items-center gap-2">
      <span className="text-[11px] uppercase tracking-wider text-texto-tenue">color</span>
      <div role="group" aria-label="color" className="flex gap-1.5">
        {COLORES.map((opcion) => (
          <button
            key={opcion.valor}
            type="button"
            aria-label={opcion.texto}
            aria-pressed={opcion.valor === color}
            onClick={() => fijarColor(opcion.valor)}
            style={{ backgroundColor: opcion.valor }}
            className={`size-6 rounded-md border transition ${
              opcion.valor === color
                ? 'border-texto ring-2 ring-acento/60'
                : 'border-transparent opacity-70 hover:opacity-100'
            }`}
          />
        ))}
      </div>
    </div>
  )
}

function PanelAltura() {
  const altura = useTienda((estado) => estado.altura)
  const fijarAltura = useTienda((estado) => estado.fijarAltura)
  return <Deslizador etiqueta="altura" valor={altura} min={0.3} max={2} paso={0.05} onChange={fijarAltura} />
}

function PanelGiro() {
  const girando = useTienda((estado) => estado.girando)
  const alternar = useTienda((estado) => estado.alternarGiro)
  return <Interruptor etiqueta="girar" activo={girando} onChange={alternar} />
}

function Reiniciar({
  cubo,
  esfera,
  giro,
}: {
  cubo: RefObject<HTMLSpanElement | null>
  esfera: RefObject<HTMLSpanElement | null>
  giro: RefObject<HTMLSpanElement | null>
}) {
  return (
    <button
      type="button"
      onClick={() => {
        // `getState()` también sirve para escribir, no solo para leer.
        const tienda = useTienda.getState()
        if (cubo.current) cubo.current.textContent = '0'
        if (esfera.current) esfera.current.textContent = '0'
        if (giro.current) giro.current.textContent = '0'
        tienda.fijarColor('#6ea8fe')
        tienda.fijarAltura(0.9)
        if (!tienda.girando) tienda.alternarGiro()
      }}
      className="rounded-lg border border-borde bg-fondo/60 px-2.5 py-1 text-xs text-texto-suave transition hover:border-acento/50 hover:text-texto"
    >
      reiniciar
    </button>
  )
}

function Contador({
  etiqueta,
  destino,
  ayuda,
}: {
  etiqueta: string
  destino: RefObject<HTMLSpanElement | null>
  ayuda: string
}) {
  return (
    <div className="rounded-lg border border-borde bg-fondo/60 px-2.5 py-1.5" title={ayuda}>
      <p className="font-mono text-[10px] uppercase tracking-wider text-texto-tenue">{etiqueta}</p>
      <p className="font-mono text-sm text-texto">
        <span ref={destino}>0</span>
      </p>
    </div>
  )
}

/**
 * Zustand: estado compartido sin re-renderizar el mundo.
 *
 * Tres consumidores de la misma tienda, tres formas de leerla. El cubo escucha
 * dos campos con selectores y se re-renderiza cuando cambian; la esfera escucha
 * uno solo; el anillo lee con `getState()` dentro de `useFrame` y no se
 * re-renderiza nunca. Los contadores están ahí para que la diferencia se vea en
 * vez de creerse.
 */
export default function Zustand() {
  const cubo = useRef<HTMLSpanElement>(null)
  const esfera = useRef<HTMLSpanElement>(null)
  const giro = useRef<HTMLSpanElement>(null)

  return (
    <DemoEscena
      titulo="Una tienda, tres formas de escucharla"
      descripcion="Un cubo y una esfera controlados por una tienda de Zustand. El panel cambia el color, la altura y si giran. Tres contadores muestran cuántas veces se ha re-renderizado cada componente: el cubo sube al cambiar color o altura, la esfera solo al alternar el giro y el anillo no sube nunca."
      alto={380}
      camara={[2.6, 2.4, 4.6]}
      sombras
      controles={
        <div className="w-full space-y-3">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
            <PanelColor />
            <PanelAltura />
            <PanelGiro />
            <Reiniciar cubo={cubo} esfera={esfera} giro={giro} />
          </div>

          <div className="grid grid-cols-3 gap-2">
            <Contador
              etiqueta="cubo · color + altura"
              destino={cubo}
              ayuda="Se suscribe a dos campos con selectores"
            />
            <Contador
              etiqueta="esfera · girando"
              destino={esfera}
              ayuda="Solo se suscribe al booleano de giro"
            />
            <Contador etiqueta="anillo · getState()" destino={giro} ayuda="No se suscribe a nada" />
          </div>
        </div>
      }
      nota="Cambia el color cuatro veces: el contador del cubo sube cuatro y los otros dos no se mueven. Alterna el giro: sube la esfera. El anillo se queda en 1 para siempre porque lee el valor dentro de useFrame, sin crear dependencia. En desarrollo, con StrictMode, los números salen doblados; en producción no."
    >
      <Escena cubo={cubo} esfera={esfera} giro={giro} />
    </DemoEscena>
  )
}

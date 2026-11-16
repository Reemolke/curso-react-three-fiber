import { useEffect, useRef, useState, type KeyboardEvent } from 'react'
import { useFrame } from '@react-three/fiber'
import { MathUtils, type Group } from 'three'
import { MODELOS } from '../../tres/rutas'
import { useGLTF } from '../../tres/gltf'
import { DemoEscena, Interruptor } from '../marco'

export type Destino = { x: number; z: number; giro: number }

/**
 * `prefers-reduced-motion` es una preferencia del sistema operativo, no una
 * idea del navegador: la persona la activa porque el movimiento le marea. Se
 * lee con `matchMedia` y se puede cambiar en caliente.
 */
function useMovimientoReducido(): [boolean, (valor: boolean) => void] {
  const [reducido, setReducido] = useState(false)

  useEffect(() => {
    const consulta = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReducido(consulta.matches)

    const alCambiar = (evento: MediaQueryListEvent) => setReducido(evento.matches)
    consulta.addEventListener('change', alCambiar)
    return () => consulta.removeEventListener('change', alCambiar)
  }, [])

  return [reducido, setReducido]
}

/**
 * La pieza obedece a un destino, no a un evento de teclado.
 *
 * Con movimiento normal se interpola hasta el destino; con movimiento reducido
 * salta directamente. Es la misma escena, dos comportamientos, y el cambio se
 * hace en un solo sitio.
 */
function Pieza({ destino, reducido }: { destino: Destino; reducido: boolean }) {
  const { scene } = useGLTF(MODELOS.rover)
  const grupo = useRef<Group>(null)

  useFrame((estado, delta) => {
    const nodo = grupo.current
    if (!nodo) return

    if (reducido) {
      nodo.position.set(destino.x, 0.06, destino.z)
      nodo.rotation.y = destino.giro
      return
    }

    nodo.position.x = MathUtils.damp(nodo.position.x, destino.x, 7, delta)
    nodo.position.z = MathUtils.damp(nodo.position.z, destino.z, 7, delta)
    nodo.rotation.y = MathUtils.damp(nodo.rotation.y, destino.giro, 7, delta)
    // Un balanceo suave mientras no se mueve: es lo que se quita primero.
    nodo.position.y = 0.06 + Math.sin(estado.clock.elapsedTime * 1.6) * 0.012
  })

  return (
    <group ref={grupo}>
      <primitive object={scene} scale={1.15} />
    </group>
  )
}

/** Marcas en el suelo para que el movimiento se pueda juzgar. */
function Pista() {
  const esquinas: [number, number][] = [
    [-2.4, -2.4],
    [2.4, -2.4],
    [-2.4, 2.4],
    [2.4, 2.4],
  ]

  return (
    <>
      {esquinas.map(([x, z]) => (
        <mesh key={`${x}-${z}`} position={[x, 0.02, z]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[0.16, 0.22, 24]} />
          <meshBasicMaterial color="#3d4a6b" />
        </mesh>
      ))}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <circleGeometry args={[3.1, 64]} />
        <meshStandardMaterial color="#161e2f" roughness={0.95} />
      </mesh>
      <gridHelper args={[6, 12, '#2b3554', '#212a42']} position={[0, 0.01, 0]} />
    </>
  )
}

function Escena({ destino, reducido }: { destino: Destino; reducido: boolean }) {
  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight position={[4, 7, 5]} intensity={2.3} />
      <directionalLight position={[-5, 3, -4]} intensity={0.5} color="#9fc2ff" />

      <Pieza destino={destino} reducido={reducido} />
      <Pista />
    </>
  )
}

const PASO = 0.6

/**
 * Accesibilidad en 3D.
 *
 * El ratón no es el único dispositivo. Aquí el rover se mueve con botones HTML
 * de verdad: tienen foco, se activan con Intro y con Espacio y aceptan las
 * flechas del teclado. La escena solo recibe un destino, así que el mismo
 * código sirve para un clic, una tecla o un lector de pantalla.
 */
export default function Accesible() {
  const [destino, setDestino] = useState<Destino>({ x: 0, z: 0, giro: 0 })
  const [preferencia, fijarPreferencia] = useMovimientoReducido()
  const [forzado, setForzado] = useState<boolean | null>(null)
  const reducido = forzado ?? preferencia

  const mover = (dx: number, dz: number) =>
    setDestino((actual) => ({
      ...actual,
      x: MathUtils.clamp(actual.x + dx, -2.4, 2.4),
      z: MathUtils.clamp(actual.z + dz, -2.4, 2.4),
    }))

  const girar = () => setDestino((actual) => ({ ...actual, giro: actual.giro + Math.PI / 4 }))

  const alPulsar = (evento: KeyboardEvent<HTMLDivElement>) => {
    const acciones: Record<string, () => void> = {
      ArrowLeft: () => mover(-PASO, 0),
      ArrowRight: () => mover(PASO, 0),
      ArrowUp: () => mover(0, -PASO),
      ArrowDown: () => mover(0, PASO),
      r: girar,
    }
    const accion = acciones[evento.key]
    if (!accion) return
    evento.preventDefault()
    accion()
  }

  const boton =
    'rounded-lg border border-borde bg-fondo/60 px-2.5 py-1 text-xs text-texto-suave transition hover:border-acento/50 hover:text-texto focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-acento'

  return (
    <DemoEscena
      titulo="Mover el rover sin ratón"
      descripcion="Un rover sobre una pista cuadrada. Se mueve con botones HTML que aceptan el ratón, el teclado y un lector de pantalla. Hay un interruptor de movimiento reducido que sustituye la interpolación por saltos directos y apaga el balanceo."
      alto={400}
      camara={[3.6, 3.1, 5.6]}
      sombras
      controles={
        <div className="w-full space-y-3">
          <div className="flex flex-wrap items-start gap-x-6 gap-y-3">
            <div
              role="group"
              aria-label="mover el rover"
              onKeyDown={alPulsar}
              className="grid grid-cols-3 gap-1"
            >
              <span />
              <button type="button" aria-label="avanzar" onClick={() => mover(0, -PASO)} className={boton}>
                ↑
              </button>
              <span />
              <button type="button" aria-label="izquierda" onClick={() => mover(-PASO, 0)} className={boton}>
                ←
              </button>
              <button type="button" aria-label="retroceder" onClick={() => mover(0, PASO)} className={boton}>
                ↓
              </button>
              <button type="button" aria-label="derecha" onClick={() => mover(PASO, 0)} className={boton}>
                →
              </button>
            </div>

            <div className="flex flex-col gap-2">
              <button type="button" aria-label="girar un octavo de vuelta" onClick={girar} className={boton}>
                girar 45°
              </button>
              <button
                type="button"
                onClick={() => setDestino({ x: 0, z: 0, giro: 0 })}
                className={boton}
              >
                centrar
              </button>
            </div>

            <div className="flex flex-col gap-2">
              <Interruptor
                etiqueta="movimiento reducido"
                activo={reducido}
                onChange={(valor) => {
                  setForzado(valor)
                  fijarPreferencia(valor)
                }}
              />
              <p className="max-w-[15rem] text-[11px] leading-relaxed text-texto-tenue">
                {forzado === null
                  ? 'Siguiendo la preferencia del sistema.'
                  : 'Preferencia forzada en esta demo.'}
              </p>
            </div>
          </div>

          <p aria-live="polite" className="font-mono text-[11px] text-texto-tenue">
            posición {destino.x.toFixed(1)} , {destino.z.toFixed(1)} · giro{' '}
            {Math.round((destino.giro * 180) / Math.PI)}° · movimiento{' '}
            {reducido ? 'reducido' : 'normal'}
          </p>
        </div>
      }
      nota="Tabula hasta los botones y muévelos con las flechas o con Espacio: no hay ningún manejador en window, así que la escena no secuestra el teclado de la página. El movimiento reducido no cambia lo que se ve, cambia cómo llega: sin interpolación y sin balanceo. Es lo mínimo que se le pide a una escena 3D accesible."
    >
      <Escena destino={destino} reducido={reducido} />
    </DemoEscena>
  )
}

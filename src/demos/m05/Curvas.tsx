import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { MathUtils } from 'three'
import type { Mesh } from 'three'
import { DemoEscena } from '../marco'

/** Posiciones del objetivo. Se repiten en bucle para poder comparar curvas. */
const OBJETIVOS = [-1.7, 1.5, -0.4, 1.8, -1.2, 0.6]
const INTERVALO = 1.25

const CARRILES = [
  { nombre: 'lerp', y: 1.55, color: '#4d8df6' },
  { nombre: 'damp', y: 0.52, color: '#3fbf87' },
  { nombre: 'muelle', y: -0.52, color: '#f5a524' },
  { nombre: 'easing', y: -1.55, color: '#e05a8a' },
]

function easeOutCubic(t: number) {
  return 1 - Math.pow(1 - t, 3)
}

type Estado = {
  lerp: number
  damp: number
  muelle: number
  muelleV: number
  easing: number
  easingDesde: number
  tEase: number
  objetivo: number
}

function Escena() {
  const mallas = useRef<(Mesh | null)[]>([])
  const marcador = useRef<Mesh>(null)
  const estado = useRef<Estado>({
    lerp: OBJETIVOS[0],
    damp: OBJETIVOS[0],
    muelle: OBJETIVOS[0],
    muelleV: 0,
    easing: OBJETIVOS[0],
    easingDesde: OBJETIVOS[0],
    tEase: 1,
    objetivo: OBJETIVOS[0],
  })

  useFrame((state, delta) => {
    const dt = Math.min(delta, 0.05)
    const t = state.clock.getElapsedTime()
    const indice = Math.floor(t / INTERVALO) % OBJETIVOS.length
    const objetivo = OBJETIVOS[indice] ?? 0
    const s = estado.current

    if (objetivo !== s.objetivo) {
      s.objetivo = objetivo
      s.easingDesde = s.easing
      s.tEase = 0
    }

    // 1. Interpolación exponencial: el factor depende de delta.
    s.lerp += (objetivo - s.lerp) * (1 - Math.exp(-3.2 * dt))

    // 2. damp de three: la misma idea, empaquetada y con lambda explícito.
    s.damp = MathUtils.damp(s.damp, objetivo, 7, dt)

    // 3. Muelle con velocidad: se pasa de largo y vuelve.
    s.muelleV += (objetivo - s.muelle) * 22 * dt
    s.muelleV *= Math.exp(-5 * dt)
    s.muelle += s.muelleV * dt

    // 4. Easing con tiempo normalizado: llega en 0,55 s y se detiene.
    s.tEase = Math.min(1, s.tEase + dt / 0.55)
    s.easing = s.easingDesde + (objetivo - s.easingDesde) * easeOutCubic(s.tEase)

    const valores = [s.lerp, s.damp, s.muelle, s.easing]
    valores.forEach((x, i) => {
      const malla = mallas.current[i]
      if (malla) malla.position.x = x
    })
    if (marcador.current) marcador.current.position.x = objetivo
  })

  return (
    <group>
      <ambientLight intensity={0.7} />
      <directionalLight position={[2, 5, 4]} intensity={2} />

      {CARRILES.map((carril) => (
        <mesh key={carril.nombre} position={[0, carril.y, -0.15]}>
          <boxGeometry args={[4.5, 0.035, 0.62]} />
          <meshStandardMaterial color="#232938" roughness={0.9} />
        </mesh>
      ))}

      {CARRILES.map((carril, i) => (
        <mesh
          key={carril.nombre}
          ref={(malla) => {
            mallas.current[i] = malla
          }}
          position={[OBJETIVOS[0] ?? 0, carril.y + 0.3, 0]}
        >
          <boxGeometry args={[0.46, 0.46, 0.46]} />
          <meshStandardMaterial color={carril.color} roughness={0.32} metalness={0.1} />
        </mesh>
      ))}

      <mesh ref={marcador} position={[OBJETIVOS[0] ?? 0, 0, 0.15]}>
        <boxGeometry args={[0.045, 4.1, 0.045]} />
        <meshBasicMaterial color="#e8ecf5" transparent opacity={0.55} />
      </mesh>
    </group>
  )
}

export default function Curvas() {
  return (
    <DemoEscena
      titulo="Cuatro formas de llegar al mismo sitio"
      descripcion="Un marcador vertical salta cada 1,25 segundos entre varias posiciones. Cuatro cubos, uno por carril, persiguen el marcador con interpolación, damp, muelle y easing. Se aprecia la diferencia en la llegada y en el rebote."
      camara={[0, 0, 7]}
      fov={42}
      controles={
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
          {CARRILES.map((carril) => (
            <span key={carril.nombre} className="flex items-center gap-1.5 text-[11px] text-texto-suave">
              <span className="inline-block size-2.5 rounded-sm" style={{ background: carril.color }} />
              {carril.nombre}
            </span>
          ))}
        </div>
      }
      nota="El marcador blanco marca el objetivo. El azul se acerca poco a poco; el verde usa damp; el naranja es un muelle que se pasa de largo; el rosa llega con una curva de easing y se queda clavado."
    >
      <Escena />
    </DemoEscena>
  )
}

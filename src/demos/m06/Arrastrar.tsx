import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import type { ThreeEvent } from '@react-three/fiber'
import { MathUtils, Plane, Vector3 } from 'three'
import type { Mesh } from 'three'
import { DemoEscena } from '../marco'

const ALTURA = 0.5
const LIMITE_X = 3.05
const LIMITE_Z = 2.05

type Forma = 'caja' | 'cilindro' | 'esfera' | 'toro'

type Datos = {
  id: string
  color: string
  inicial: [number, number, number]
  forma: Forma
}

const PIEZAS: Datos[] = [
  { id: 'caja', color: '#f5a524', inicial: [-2.1, 0.75, -0.9], forma: 'caja' },
  { id: 'cilindro', color: '#4d8df6', inicial: [-0.7, 0.75, 0.9], forma: 'cilindro' },
  { id: 'esfera', color: '#3fbf87', inicial: [0.8, 0.75, -0.8], forma: 'esfera' },
  { id: 'toro', color: '#e05a8a', inicial: [2.1, 0.75, 0.8], forma: 'toro' },
]

/** Plano matemático a la altura de la mesa: y = 0,5. */
const PLANO = new Plane(new Vector3(0, 1, 0), -ALTURA)

const BORDE = new Float32Array([
  -LIMITE_X, ALTURA + 0.01, -LIMITE_Z,
  LIMITE_X, ALTURA + 0.01, -LIMITE_Z,
  LIMITE_X, ALTURA + 0.01, -LIMITE_Z,
  LIMITE_X, ALTURA + 0.01, LIMITE_Z,
  LIMITE_X, ALTURA + 0.01, LIMITE_Z,
  -LIMITE_X, ALTURA + 0.01, LIMITE_Z,
  -LIMITE_X, ALTURA + 0.01, LIMITE_Z,
  -LIMITE_X, ALTURA + 0.01, -LIMITE_Z,
])

type PiezaProps = {
  datos: Datos
  activa: boolean
  registrar: (malla: Mesh | null) => void
  onDown: (evento: ThreeEvent<PointerEvent>) => void
  onUp: (evento: ThreeEvent<PointerEvent>) => void
}

function Pieza({ datos, activa, registrar, onDown, onUp }: PiezaProps) {
  const malla = useRef<Mesh>(null)

  // La posición se fija una sola vez. Si fuera una prop, cada re-render
  // devolvería la pieza a su sitio en mitad de un arrastre.
  useLayoutEffect(() => {
    const actual = malla.current
    if (actual) actual.position.set(datos.inicial[0], datos.inicial[1], datos.inicial[2])
  }, [datos.inicial])

  let geometria
  if (datos.forma === 'caja') {
    geometria = <boxGeometry args={[0.62, 0.62, 0.62]} />
  } else if (datos.forma === 'cilindro') {
    geometria = <cylinderGeometry args={[0.3, 0.3, 0.56, 24]} />
  } else if (datos.forma === 'esfera') {
    geometria = <sphereGeometry args={[0.34, 24, 24]} />
  } else {
    geometria = <torusGeometry args={[0.3, 0.12, 16, 32]} />
  }

  return (
    <mesh
      ref={(nodo) => {
        malla.current = nodo
        registrar(nodo)
      }}
      rotation={datos.forma === 'toro' ? [Math.PI / 2, 0, 0] : [0, 0, 0]}
      onPointerDown={onDown}
      onPointerUp={onUp}
      onPointerCancel={onUp}
      onPointerOver={() => {
        document.body.style.cursor = 'grab'
      }}
      onPointerOut={() => {
        document.body.style.cursor = 'auto'
      }}
    >
      {geometria}
      <meshStandardMaterial
        color={datos.color}
        emissive={datos.color}
        emissiveIntensity={activa ? 0.5 : 0}
        roughness={0.38}
        metalness={0.12}
      />
    </mesh>
  )
}

export default function Arrastrar() {
  const mallas = useRef<Record<string, Mesh | null>>({})
  const arrastrando = useRef<string | null>(null)
  const desplazamiento = useRef(new Vector3())
  const puntoPlano = useRef(new Vector3())

  const [activa, setActiva] = useState<string | null>(null)
  const [aviso, setAviso] = useState('Arrastra una pieza sobre la mesa')

  useEffect(() => {
    return () => {
      document.body.style.cursor = 'auto'
    }
  }, [])

  const bajar = (id: string) => (evento: ThreeEvent<PointerEvent>) => {
    evento.stopPropagation()
    const malla = mallas.current[id]
    if (!malla) return

    arrastrando.current = id

    // Diferencia entre el centro de la pieza y el punto de la mesa bajo el
    // puntero: evita que la pieza salte al centro del cursor.
    if (evento.ray.intersectPlane(PLANO, puntoPlano.current)) {
      desplazamiento.current.set(
        malla.position.x - puntoPlano.current.x,
        0,
        malla.position.z - puntoPlano.current.z,
      )
    } else {
      desplazamiento.current.set(0, 0, 0)
    }

    malla.position.y = ALTURA + 0.34
    setActiva(id)
    setAviso(`Arrastrando ${id}`)

    // La captura hace que el canvas siga recibiendo el pointerup aunque el
    // puntero salga del lienzo.
    ;(evento.target as Element).setPointerCapture(evento.pointerId)
  }

  const soltar = (id: string) => (evento: ThreeEvent<PointerEvent>) => {
    if (arrastrando.current !== id) return
    evento.stopPropagation()

    const malla = mallas.current[id]
    if (malla) malla.position.y = ALTURA + 0.25

    arrastrando.current = null
    setActiva(null)
    setAviso(`${id} colocada`)

    try {
      ;(evento.target as Element).releasePointerCapture(evento.pointerId)
    } catch {
      // La captura ya se había perdido (pointercancel, cambio de ventana).
    }
  }

  // La mesa es la superficie de referencia. Su event.point sí se recalcula en
  // cada pointermove, a diferencia del de la pieza capturada.
  const moverSobreMesa = (evento: ThreeEvent<PointerEvent>) => {
    const id = arrastrando.current
    if (!id) return

    const malla = mallas.current[id]
    if (!malla) return

    malla.position.x = MathUtils.clamp(
      evento.point.x + desplazamiento.current.x,
      -LIMITE_X,
      LIMITE_X,
    )
    malla.position.z = MathUtils.clamp(
      evento.point.z + desplazamiento.current.z,
      -LIMITE_Z,
      LIMITE_Z,
    )
  }

  return (
    <DemoEscena
      titulo="Piezas arrastrables sobre una mesa"
      descripcion="Cuatro piezas geométricas descansan sobre una mesa. Se pueden arrastrar con el puntero y quedan limitadas al rectángulo útil de la mesa. La pieza activa se ilumina y el rótulo indica cuándo se agarra y cuándo se suelta."
      alto={420}
      camara={[0, 4.6, 6.2]}
      fov={44}
      controles={
        <p className="w-full text-xs text-texto-suave" aria-live="polite">
          <span className="mr-2 font-mono text-[10px] uppercase tracking-widest text-texto-tenue">
            estado
          </span>
          {aviso}
          <span className="ml-3 text-texto-tenue">
            Límites: x ±{LIMITE_X.toString().replace('.', ',')} · z ±
            {LIMITE_Z.toString().replace('.', ',')}
          </span>
        </p>
      }
      nota="La posición se muta en el mesh, no en el estado: un setState por pointermove serían decenas de renders por segundo. El estado solo cambia al agarrar y al soltar, para el brillo y el rótulo."
    >
      <ambientLight intensity={0.6} />
      <directionalLight position={[4, 8, 5]} intensity={2.4} />

      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.02, 0]}>
        <planeGeometry args={[26, 18]} />
        <meshStandardMaterial color="#0f131c" roughness={0.95} />
      </mesh>

      <mesh position={[0, 0.25, 0]} onPointerMove={moverSobreMesa}>
        <boxGeometry args={[7, 0.5, 5]} />
        <meshStandardMaterial color="#2a3040" roughness={0.75} />
      </mesh>

      <lineSegments>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[BORDE, 3]} />
        </bufferGeometry>
        <lineBasicMaterial color="#f5a524" transparent opacity={0.5} />
      </lineSegments>

      {PIEZAS.map((datos) => (
        <Pieza
          key={datos.id}
          datos={datos}
          activa={activa === datos.id}
          registrar={(malla) => {
            mallas.current[datos.id] = malla
          }}
          onDown={bajar(datos.id)}
          onUp={soltar(datos.id)}
        />
      ))}
    </DemoEscena>
  )
}

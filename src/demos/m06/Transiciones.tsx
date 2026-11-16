import { useEffect, useRef, useState } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { MathUtils, Vector3 } from 'three'
import { DemoEscena, GrupoOpciones } from '../marco'

type Tipo = 'damp' | 'exponencial' | 'smoothstep'

type Vista = {
  nombre: string
  tipo: Tipo
  posicion: [number, number, number]
  objetivo: [number, number, number]
  duracion: number
}

const VISTAS: Vista[] = [
  {
    nombre: 'Frontal',
    tipo: 'damp',
    posicion: [0, 1.7, 5.4],
    objetivo: [0, 0.9, 0],
    duracion: 0,
  },
  {
    nombre: 'Lateral',
    tipo: 'exponencial',
    posicion: [4.8, 2.3, 1.2],
    objetivo: [0, 0.8, 0],
    duracion: 0,
  },
  {
    nombre: 'Cenital',
    tipo: 'smoothstep',
    posicion: [0.3, 5.4, 0.5],
    objetivo: [0, 0.6, 0],
    duracion: 1.3,
  },
]

const TEXTOS: Record<Tipo, string> = {
  damp: 'MathUtils.damp',
  exponencial: '1 - exp(-k · delta)',
  smoothstep: 'smoothstep con duración',
}

function Camara({ indice }: { indice: number }) {
  const camara = useThree((estado) => estado.camera)

  const animacion = useRef({
    origen: new Vector3(),
    origenObjetivo: new Vector3(),
    destino: new Vector3(),
    destinoObjetivo: new Vector3(),
    objetivoActual: new Vector3(0, 0.9, 0),
    tipo: 'damp' as Tipo,
    t: 1,
    duracion: 1,
  })

  useEffect(() => {
    const vista = VISTAS[indice] ?? VISTAS[0]!
    const estado = animacion.current
    // Cada transición arranca desde donde esté la cámara ahora mismo.
    estado.origen.copy(camara.position)
    estado.origenObjetivo.copy(estado.objetivoActual)
    estado.destino.set(vista.posicion[0], vista.posicion[1], vista.posicion[2])
    estado.destinoObjetivo.set(
      vista.objetivo[0],
      vista.objetivo[1],
      vista.objetivo[2],
    )
    estado.tipo = vista.tipo
    estado.duracion = vista.duracion || 0.8
    estado.t = 0
  }, [indice, camara])

  useFrame((_, delta) => {
    const dt = Math.min(delta, 0.05)
    const estado = animacion.current

    if (estado.tipo === 'damp') {
      // Amortiguación exponencial: lambda mayor, llegada más rápida.
      camara.position.x = MathUtils.damp(camara.position.x, estado.destino.x, 4, dt)
      camara.position.y = MathUtils.damp(camara.position.y, estado.destino.y, 4, dt)
      camara.position.z = MathUtils.damp(camara.position.z, estado.destino.z, 4, dt)

      estado.objetivoActual.x = MathUtils.damp(
        estado.objetivoActual.x,
        estado.destinoObjetivo.x,
        4,
        dt,
      )
      estado.objetivoActual.y = MathUtils.damp(
        estado.objetivoActual.y,
        estado.destinoObjetivo.y,
        4,
        dt,
      )
      estado.objetivoActual.z = MathUtils.damp(
        estado.objetivoActual.z,
        estado.destinoObjetivo.z,
        4,
        dt,
      )
    } else if (estado.tipo === 'exponencial') {
      // El factor depende de delta: misma sensación a 60 y a 144 Hz.
      const alfa = 1 - Math.exp(-3.2 * dt)
      camara.position.lerp(estado.destino, alfa)
      estado.objetivoActual.lerp(estado.destinoObjetivo, alfa)
    } else {
      // Duración fija y curva simétrica: empieza y acaba despacio.
      estado.t = Math.min(1, estado.t + dt / estado.duracion)
      const x = estado.t
      const suave = x * x * (3 - 2 * x)
      camara.position.lerpVectors(estado.origen, estado.destino, suave)
      estado.objetivoActual.lerpVectors(
        estado.origenObjetivo,
        estado.destinoObjetivo,
        suave,
      )
    }

    camara.lookAt(estado.objetivoActual)
  })

  return null
}

function Escultura() {
  return (
    <group>
      <mesh position={[0, 0.35, 0]}>
        <cylinderGeometry args={[1.25, 1.45, 0.7, 8]} />
        <meshStandardMaterial color="#232938" roughness={0.8} />
      </mesh>

      <mesh position={[0, 1.15, 0]} rotation={[0.35, 0.5, 0.1]}>
        <boxGeometry args={[1.5, 1.5, 1.5]} />
        <meshStandardMaterial color="#f5a524" roughness={0.3} metalness={0.2} />
      </mesh>

      <mesh position={[1.35, 1.35, 0.3]}>
        <torusGeometry args={[0.32, 0.11, 16, 40]} />
        <meshStandardMaterial color="#4d8df6" roughness={0.3} />
      </mesh>

      <mesh position={[-1.3, 1.05, -0.4]}>
        <sphereGeometry args={[0.32, 24, 24]} />
        <meshStandardMaterial color="#3fbf87" roughness={0.35} />
      </mesh>

      <mesh position={[0.2, 2.15, -0.5]} rotation={[0.6, 0.3, 0]}>
        <coneGeometry args={[0.35, 0.75, 6]} />
        <meshStandardMaterial color="#e05a8a" roughness={0.4} />
      </mesh>
    </group>
  )
}

export default function Transiciones() {
  const [indice, setIndice] = useState(0)
  const vista = VISTAS[indice] ?? VISTAS[0]!

  return (
    <DemoEscena
      titulo="Tres vistas, tres formas de volar"
      descripcion="Una escultura central observada desde tres puntos de vista. Al elegir una vista, la cámara viaja hasta ella con un método distinto: amortiguación, interpolación exponencial o una curva smoothstep con duración fija. La cámara siempre gira para mirar al objetivo mientras se desplaza."
      alto={400}
      camara={[3, 2.4, 4.4]}
      fov={42}
      controles={
        <div className="flex w-full flex-wrap items-center gap-x-5 gap-y-3">
          <GrupoOpciones
            etiqueta="Vista"
            valor={indice}
            opciones={VISTAS.map((entrada, i) => ({
              valor: i,
              texto: entrada.nombre,
            }))}
            onChange={setIndice}
          />
          <span className="text-xs text-texto-suave">
            Transición: <span className="font-mono text-texto">{TEXTOS[vista.tipo]}</span>
            {vista.duracion > 0 ? ` · ${vista.duracion} s` : ''}
          </span>
        </div>
      }
      nota="Si pulsas otra vista a mitad de vuelo, la transición arranca desde la posición actual: nunca hay un salto. Las dos primeras se acercan al destino sin terminar nunca de forma matemática; la tercera llega y se detiene."
    >
      <ambientLight intensity={0.6} />
      <directionalLight position={[4, 7, 5]} intensity={2.4} />

      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.02, 0]}>
        <circleGeometry args={[8, 64]} />
        <meshStandardMaterial color="#151922" roughness={0.95} />
      </mesh>

      <Escultura />
      <Camara indice={indice} />
    </DemoEscena>
  )
}

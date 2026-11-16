import { useRef, useState } from 'react'
import { OrbitControls, PositionalAudio } from '@react-three/drei'
import type { PositionalAudio as Sonido } from 'three'
import { AUDIO } from '../../tres/rutas'
import { DemoEscena, Deslizador, Interruptor } from '../marco'

/** Cuatro pilares para tener referencias espaciales mientras giras la cámara. */
function Pilares() {
  const posiciones: [number, number, number][] = [
    [-2.2, 0.85, -2.2],
    [2.2, 0.85, -2.2],
    [-2.2, 0.85, 2.2],
    [2.2, 0.85, 2.2],
  ]

  return (
    <>
      {posiciones.map((posicion, indice) => (
        <mesh key={indice} position={posicion} castShadow>
          <boxGeometry args={[0.3, 1.7, 0.3]} />
          <meshStandardMaterial color="#2b3554" roughness={0.7} metalness={0.2} />
        </mesh>
      ))}
    </>
  )
}

/** El objeto que emite: una esfera con dos anillos que laten. */
function Fuente() {
  return (
    <group position={[0, 1, 0]}>
      <mesh castShadow>
        <sphereGeometry args={[0.32, 24, 16]} />
        <meshStandardMaterial
          color="#f5a524"
          emissive="#f5a524"
          emissiveIntensity={0.6}
          roughness={0.35}
        />
      </mesh>

      {[1, 1.7].map((radio, indice) => (
        <mesh key={radio} rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.98, 0]}>
          <torusGeometry args={[radio, 0.012, 6, 64]} />
          <meshBasicMaterial color="#f5a524" transparent opacity={indice === 0 ? 0.5 : 0.22} />
        </mesh>
      ))}
    </group>
  )
}

/**
 * Audio posicional.
 *
 * `PositionalAudio` es un objeto de three (`THREE.PositionalAudio`) con la
 * misma idea que una `mesh`: tiene posición y se atenúa con la distancia al
 * oyente. El oyente es la cámara: drei crea un `AudioListener` y lo cuelga de
 * ella, así que mover la cámara con el ratón cambia el volumen y el balance.
 *
 * Dos cosas que no se pueden saltar: el bucle de audio necesita un gesto del
 * usuario para arrancar (política de reproducción automática del navegador) y
 * `distance` no es el alcance del sonido, es la distancia a la que suena al
 * volumen de referencia.
 */
export default function Audio() {
  const sonido = useRef<Sonido>(null)
  const [reproduciendo, setReproduciendo] = useState(false)
  const [distancia, setDistancia] = useState(2)
  const [bucle, setBucle] = useState(true)
  const [estado, setEstado] = useState('pulsa reproducir')

  const alternar = async () => {
    const nodo = sonido.current
    if (!nodo) return

    try {
      if (nodo.isPlaying) {
        nodo.stop()
        setReproduciendo(false)
        setEstado('detenido')
        return
      }

      // El contexto puede estar suspendido hasta que el usuario interactúa.
      if (nodo.context.state === 'suspended') await nodo.context.resume()
      nodo.play()
      setReproduciendo(true)
      setEstado('sonando')
    } catch (error) {
      setEstado(`sin audio: ${(error as Error).message.slice(0, 40)}`)
      setReproduciendo(false)
    }
  }

  return (
    <DemoEscena
      titulo="Una fuente de sonido colocada en el espacio"
      descripcion="Un objeto con sonido posicional en el centro de cuatro pilares. Al girar la cámara con el ratón, el volumen y el balance cambian según la distancia y la orientación respecto a la fuente. Hay un control para arrancar y parar el sonido y otro para cambiar la distancia de referencia."
      alto={400}
      camara={[4.8, 4.0, 6.3]}
      controles={
        <div className="w-full space-y-3">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
            <button
              type="button"
              onClick={alternar}
              className="rounded-lg border border-acento/60 bg-acento/10 px-3 py-1 text-xs font-medium text-texto transition hover:bg-acento/20"
            >
              {reproduciendo ? 'detener' : 'reproducir'}
            </button>
            <Deslizador
              etiqueta="distancia ref."
              valor={distancia}
              min={0.5}
              max={6}
              paso={0.1}
              onChange={(valor) => {
                setDistancia(valor)
                sonido.current?.setRefDistance(valor)
              }}
            />
            <Interruptor
              etiqueta="bucle"
              activo={bucle}
              onChange={(valor) => {
                setBucle(valor)
                sonido.current?.setLoop(valor)
              }}
            />
            <span className="ml-auto font-mono text-[11px] text-texto-tenue">{estado}</span>
          </div>
          <p className="text-[11px] leading-relaxed text-texto-tenue">
            Arrastra para orbitar: el sonido se apaga al alejarte y se desplaza al lado del oído en el
            que esté la fuente.
          </p>
        </div>
      }
      nota="Sube «distancia ref.» y el sonido se oye fuerte desde más lejos: no cambia el volumen máximo, cambia el punto en el que empieza a caer. Este modelo de atenuación es el inverso al cuadrado suavizado de WebAudio; para un motor de coche o unos pasos lejanos se ajusta con esta única cifra."
    >
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 8, 4]} intensity={2.2} />
      <directionalLight position={[-5, 3, -4]} intensity={0.5} color="#9fc2ff" />

      <Fuente />

      <group position={[0, 1, 0]}>
        <PositionalAudio
          ref={sonido}
          url={AUDIO.motor}
          distance={distancia}
          loop={bucle}
          autoplay={false}
        />
      </group>

      <Pilares />

      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <circleGeometry args={[5.4, 64]} />
        <meshStandardMaterial color="#151d2e" roughness={0.95} />
      </mesh>

      <OrbitControls makeDefault enablePan={false} minDistance={2.2} maxDistance={12} target={[0, 1, 0]} />
    </DemoEscena>
  )
}

import { Component, Suspense, useState, type ReactNode } from 'react'
import { useProgress } from '@react-three/drei'
import { MODELOS } from '../../tres/rutas'
import { useGLTF } from '../../tres/gltf'
import { DemoEscena, Interruptor } from '../marco'

const ROTA = 'modelos/no-existe.glb'

/** Cuenta lo que ha llegado en el `gltf` ya resuelto. */
function Contenido({ url, onCargado }: { url: string; onCargado?: (mensaje: string) => void }) {
  const { scene, animations, nodes } = useGLTF(url)
  const nombres = Object.keys(nodes).length

  if (onCargado) onCargado(`${nombres} nodos · ${animations.length} clips`)

  return <primitive object={scene} position={[0, -0.4, 0]} scale={1.6} />
}

/**
 * Error boundary local: no usa el de la app para poder mostrar el reintento
 * dentro de la propia demo. Un fallo de red no debe tumbar la lección.
 */
class LimiteLocal extends Component<{ children: ReactNode; alFallar: (error: Error) => void }, { error: Error | null }> {
  state = { error: null as Error | null }

  static getDerivedStateFromError(error: Error) {
    return { error }
  }

  componentDidCatch(error: Error) {
    this.props.alFallar(error)
  }

  render() {
    if (this.state.error) {
      return (
        <mesh>
          <boxGeometry args={[0.6, 0.6, 0.6]} />
          <meshBasicMaterial color="#e0574f" wireframe />
        </mesh>
      )
    }
    return this.props.children
  }
}

function MedidorGlobal() {
  const { progress, active } = useProgress()
  return (
    <span className="font-mono text-xs text-texto-suave">
      {active ? `cargando ${progress.toFixed(0)} %` : 'caché lista'}
    </span>
  )
}

export default function Cargar() {
  const [rota, setRota] = useState(false)
  const [intento, setIntento] = useState(0)
  const [estado, setEstado] = useState('sin cargar')
  const [error, setError] = useState<string | null>(null)

  const recargar = () => {
    useGLTF.clear(MODELOS.rover)
    setError(null)
    setEstado('sin cargar')
    setIntento((valor) => valor + 1)
  }

  return (
    <DemoEscena
      titulo="Cargar un modelo, fallar y reintentar"
      descripcion="El rover del curso cargado con useGLTF dentro de un Suspense. Un interruptor apunta a una URL inexistente para provocar el error y el botón vuelve a cargar el modelo bueno."
      alto={380}
      camara={[3.2, 2.2, 4]}
      controles={
        <>
          <MedidorGlobal />
          <Interruptor etiqueta="URL rota" activo={rota} onChange={setRota} />
          <button
            type="button"
            onClick={recargar}
            className="rounded-lg border border-borde px-2.5 py-1 text-xs font-medium text-texto-suave transition hover:bg-superficie-alta"
          >
            Vaciar caché y recargar
          </button>
          <span className="ml-auto max-w-56 truncate font-mono text-xs text-texto-suave">
            {error ? `error: ${error.slice(0, 40)}` : estado}
          </span>
        </>
      }
      nota="`useGLTF` cachea por URL: al volver a montar no hay descarga. `useGLTF.clear(url)` borra esa entrada y la siguiente petición vuelve a leer el archivo. El error de la URL rota lo captura un límite local, no la página."
    >
      <ambientLight intensity={0.4} />
      <directionalLight position={[4, 6, 3]} intensity={2.6} castShadow />
      <directionalLight position={[-4, 2, -3]} intensity={0.6} color="#9fc2ff" />

      <group key={intento}>
        <Suspense fallback={<Fallback />}>
          <LimiteLocal alFallar={(fallo) => setError(fallo.message)}>
            <Contenido
              url={rota ? ROTA : MODELOS.rover}
              onCargado={(mensaje) => {
                if (!rota) setEstado(mensaje)
              }}
            />
          </LimiteLocal>
        </Suspense>
      </group>

      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.42, 0]} receiveShadow>
        <circleGeometry args={[5, 64]} />
        <meshStandardMaterial color="#171d2e" roughness={0.9} />
      </mesh>
    </DemoEscena>
  )
}

/** Lo que se ve mientras el modelo no ha llegado. */
function Fallback() {
  return (
    <mesh position={[0, 0.4, 0]}>
      <boxGeometry args={[0.8, 0.8, 0.8]} />
      <meshBasicMaterial color="#2b3554" wireframe />
    </mesh>
  )
}

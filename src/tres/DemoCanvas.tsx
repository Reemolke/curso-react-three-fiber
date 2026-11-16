import { Canvas } from '@react-three/fiber'
import { Suspense, useEffect, useRef, useState, type ReactNode } from 'react'
import { ErrorBoundary } from './ErrorBoundary'

type Props = {
  children: ReactNode
  /** Altura del lienzo en píxeles. */
  alto?: number
  /** Posición de cámara por defecto. */
  camara?: [number, number, number]
  fov?: number
  sombras?: boolean
  /** Texto para lectores de pantalla: qué muestra la escena. */
  descripcion: string
  /** Etiqueta que se muestra en la cabecera del marco. */
  titulo?: string
  /** Controles HTML, siempre fuera del canvas. */
  controles?: ReactNode
  /** Capa HTML dibujada encima del lienzo (pantallas de carga, HUD). */
  capa?: ReactNode
  /** Aclaración al pie de la demo. */
  nota?: string
  className?: string
}

/**
 * Contenedor de todas las demos 3D del curso.
 *
 * Tres decisiones que se explican en la lección 3.1 y que aquí ya están tomadas:
 *
 * 1. **Montaje perezoso.** El `<Canvas>` no se crea hasta que el contenedor entra
 *    en el viewport (con 240 px de margen). Una lección con tres demos no abre
 *    tres contextos WebGL a la vez mientras el alumno lee el primer párrafo.
 * 2. **Pausa al salir de pantalla.** `frameloop="never"` detiene el bucle de
 *    render. La demo sigue montada (conserva su estado) pero no consume GPU.
 * 3. **Aislamiento de errores.** Un `ErrorBoundary` por demo: si una falla, las
 *    demás siguen vivas y la lección se puede leer igual.
 */
export function DemoCanvas({
  children,
  alto = 360,
  camara = [3, 2.4, 4.4],
  fov = 45,
  sombras = false,
  descripcion,
  titulo,
  controles,
  capa,
  nota,
  className,
}: Props) {
  const contenedor = useRef<HTMLDivElement>(null)
  const [montado, setMontado] = useState(false)
  const [visible, setVisible] = useState(true)
  const [sinWebGL, setSinWebGL] = useState(false)

  useEffect(() => {
    const elemento = contenedor.current
    if (!elemento) return

    // Comprobación barata de soporte WebGL2 antes de crear el contexto de R3F.
    try {
      const prueba = document.createElement('canvas')
      const contexto = prueba.getContext('webgl2')
      if (!contexto) setSinWebGL(true)
    } catch {
      setSinWebGL(true)
    }

    const observador = new IntersectionObserver(
      (entradas) => {
        const entrada = entradas[0]
        if (!entrada) return
        if (entrada.isIntersecting) {
          setMontado(true)
          setVisible(true)
        } else {
          setVisible(false)
        }
      },
      { rootMargin: '240px 0px', threshold: 0.01 },
    )

    observador.observe(elemento)
    return () => observador.disconnect()
  }, [])

  return (
    <figure className={`marco-demo ${className ?? ''}`}>
      <div className="flex items-center justify-between gap-3 border-b border-borde bg-superficie/50 px-3 py-2">
        <div className="flex items-center gap-2">
          <span className="relative flex size-2">
            <span
              className={`absolute inline-flex size-2 rounded-full ${
                visible ? 'animate-ping bg-exito/70' : 'bg-texto-tenue'
              }`}
            />
            <span
              className={`relative inline-flex size-2 rounded-full ${
                visible ? 'bg-exito' : 'bg-texto-tenue'
              }`}
            />
          </span>
          <span className="text-xs font-medium tracking-wide text-texto-suave">
            {titulo ?? 'Demo en vivo'}
          </span>
        </div>
        <span className="font-mono text-[10px] uppercase tracking-widest text-texto-tenue">
          {visible ? 'r3f · 60 fps' : 'pausada'}
        </span>
      </div>

      <div
        ref={contenedor}
        style={{ height: alto }}
        className="relative w-full bg-[radial-gradient(circle_at_50%_0%,oklch(0.28_0.03_265),oklch(0.17_0.014_265))]"
      >
        {sinWebGL ? (
          <div className="grid h-full place-items-center p-6 text-center text-sm text-texto-suave">
            <p>
              Tu navegador no ofrece WebGL2, así que las demos 3D no se pueden mostrar. El contenido de
              la lección y los ejercicios de código siguen disponibles.
            </p>
          </div>
        ) : montado ? (
          <ErrorBoundary etiqueta={titulo}>
            <Canvas
              shadows={sombras}
              dpr={[1, 2]}
              frameloop={visible ? 'always' : 'never'}
              camera={{ position: camara, fov }}
              gl={{ antialias: true, alpha: true }}
              style={{ touchAction: 'none' }}
              onCreated={({ camera }) => camera.lookAt(0, 0, 0)}
            >
              <Suspense fallback={null}>{children}</Suspense>
            </Canvas>
          </ErrorBoundary>
        ) : (
          <div className="grid h-full place-items-center text-xs text-texto-tenue">
            La escena se carga al acercarte…
          </div>
        )}

        {/* Capa HTML sobre el lienzo: pantallas de carga, HUD, etiquetas. */}
        {capa && <div className="absolute inset-0">{capa}</div>}

        {/* Descripción accesible: el canvas es decorativo, el texto es la fuente. */}
        <p className="sr-only">{descripcion}</p>
      </div>

      {controles && (
        <div className="flex flex-wrap items-center gap-x-5 gap-y-3 border-t border-borde bg-superficie/40 px-3 py-2.5">
          {controles}
        </div>
      )}

      {nota && (
        <p className="border-t border-borde/60 bg-fondo-alto/60 px-3 py-2 text-xs text-texto-tenue">{nota}</p>
      )}
    </figure>
  )
}

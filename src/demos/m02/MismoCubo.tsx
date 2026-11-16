import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { DemoEscena, Marco } from '../marco'

const CODIGO_THREE = `const escena = new THREE.Scene()
const camara = new THREE.PerspectiveCamera(45, 1, 0.1, 100)
camara.position.set(2.6, 2, 3.4)
camara.lookAt(0, 0, 0)

const cubo = new THREE.Mesh(
  new THREE.BoxGeometry(1.3, 1.3, 1.3),
  new THREE.MeshBasicMaterial({ color: '#f5a524' }),
)
escena.add(cubo)

const renderer = new THREE.WebGLRenderer({ canvas, antialias: true })
renderer.setSize(ancho, alto, false)

function frame(ahora) {
  cubo.rotation.y = ahora / 1000 * 0.8
  renderer.render(escena, camara)
  requestAnimationFrame(frame)
}`

const CODIGO_R3F = `function Cubo() {
  const [giro, setGiro] = useState(0)

  useEffect(() => {
    const id = setInterval(() => {
      setGiro((valor) => valor + 0.033)
    }, 33)
    return () => clearInterval(id)
  }, [])

  return (
    <mesh rotation={[giro * 0.3, giro * 0.8, 0]}>
      <boxGeometry args={[1.3, 1.3, 1.3]} />
      <meshBasicMaterial color="#f5a524" />
    </mesh>
  )
}

// El <Canvas> pone la escena, la cámara y el renderer.
<Canvas camera={{ position: [2.6, 2, 3.4], fov: 45 }}>
  <Cubo />
</Canvas>`

/** El mismo cubo, escrito a mano con three.js. */
function CuboThree() {
  const lienzo = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = lienzo.current
    if (!canvas) return

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

    const escena = new THREE.Scene()
    const camara = new THREE.PerspectiveCamera(45, 1, 0.1, 100)
    camara.position.set(2.6, 2, 3.4)
    camara.lookAt(0, 0, 0)

    const geometria = new THREE.BoxGeometry(1.3, 1.3, 1.3)
    const material = new THREE.MeshBasicMaterial({ color: '#f5a524' })
    const cubo = new THREE.Mesh(geometria, material)
    escena.add(cubo)

    const ajustar = () => {
      const ancho = Math.max(canvas.clientWidth, 1)
      const alto = Math.max(canvas.clientHeight, 1)
      renderer.setSize(ancho, alto, false)
      camara.aspect = ancho / alto
      camara.updateProjectionMatrix()
    }
    ajustar()

    const observador = new ResizeObserver(ajustar)
    observador.observe(canvas)

    let raf = 0
    const inicio = performance.now()

    const dibujar = (ahora: number) => {
      const segundos = (ahora - inicio) / 1000
      cubo.rotation.y = segundos * 0.8
      cubo.rotation.x = segundos * 0.3
      renderer.render(escena, camara)
      raf = requestAnimationFrame(dibujar)
    }

    raf = requestAnimationFrame(dibujar)

    return () => {
      cancelAnimationFrame(raf)
      observador.disconnect()
      geometria.dispose()
      material.dispose()
      renderer.dispose()
    }
  }, [])

  return (
    <div style={{ height: 210 }}>
      <canvas ref={lienzo} className="block size-full" aria-label="Cubo girando en un canvas de three.js puro" />
    </div>
  )
}

/** El mismo cubo, descrito con JSX. */
function CuboR3F() {
  const [giro, setGiro] = useState(0)

  useEffect(() => {
    const id = window.setInterval(() => setGiro((valor) => valor + 0.033), 33)
    return () => window.clearInterval(id)
  }, [])

  return (
    <mesh rotation={[giro * 0.3, giro * 0.8, 0]}>
      <boxGeometry args={[1.3, 1.3, 1.3]} />
      <meshBasicMaterial color="#f5a524" />
    </mesh>
  )
}

/**
 * 2.1 — El mismo cubo, dos veces.
 *
 * El lienzo izquierdo es three.js puro: el alumno ve la creación del renderer y
 * el bucle. El derecho es R3F y no tiene ni una línea de renderer. Aquí sí se
 * usa un canvas propio a propósito: el objetivo es comparar ambos mundos, no
 * envolver el primero en DemoEscena.
 */
export default function MismoCubo() {
  return (
    <div className="grid gap-3 md:grid-cols-2">
      <Marco titulo="three.js puro: describes los pasos">
        <CuboThree />
        <pre className="overflow-x-auto border-t border-borde bg-fondo p-3 font-mono text-[10px] leading-relaxed text-texto-suave">
          {CODIGO_THREE}
        </pre>
      </Marco>

      <div>
        <DemoEscena
          titulo="React Three Fiber: describes el resultado"
          descripcion="El mismo cubo ámbar girando, esta vez descrito con JSX y sin crear un renderer a mano."
          alto={210}
          camara={[2.6, 2, 3.4]}
        >
          <CuboR3F />
        </DemoEscena>
        <pre className="mt-1 overflow-x-auto rounded-b-caja border border-t-0 border-borde bg-fondo p-3 font-mono text-[10px] leading-relaxed text-texto-suave">
          {CODIGO_R3F}
        </pre>
      </div>
    </div>
  )
}

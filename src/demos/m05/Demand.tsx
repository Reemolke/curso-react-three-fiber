import { useEffect, useRef, useState } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import type { Group } from 'three'
import { DemoEscena, GrupoOpciones } from '../marco'

type Modo = 'always' | 'demand'

function Escena({
  modo,
  invalidar,
  contador,
}: {
  modo: Modo
  invalidar: number
  contador: { current: HTMLSpanElement | null }
}) {
  const setFrameloop = useThree((state) => state.setFrameloop)
  const invalidate = useThree((state) => state.invalidate)
  const frameloop = useThree((state) => state.frameloop)
  const grupo = useRef<Group>(null)
  const total = useRef(0)
  const ventanaFrames = useRef(0)
  const ventana = useRef(0)
  const ritmo = useRef(0)

  // Reaplica el modo si el canvas vuelve de estar fuera de pantalla.
  useEffect(() => {
    if (frameloop !== 'never' && frameloop !== modo) setFrameloop(modo)
  }, [frameloop, modo, setFrameloop])

  useEffect(() => {
    if (invalidar > 0) invalidate()
  }, [invalidar, invalidate])

  useFrame((state, delta) => {
    total.current += 1
    ventanaFrames.current += 1

    const ahora = state.clock.getElapsedTime()
    const transcurrido = ahora - ventana.current
    if (transcurrido >= 0.5) {
      ritmo.current = Math.round(ventanaFrames.current / transcurrido)
      ventanaFrames.current = 0
      ventana.current = ahora
    }

    if (grupo.current) {
      const dt = Math.min(delta, 0.05)
      grupo.current.rotation.y += dt * 1.1
      grupo.current.rotation.x += dt * 0.35
    }

    if (contador.current) {
      const texto = `frames dibujados: ${total.current} · ${ritmo.current}/s`
      if (contador.current.textContent !== texto) contador.current.textContent = texto
    }
  })

  return (
    <group>
      <ambientLight intensity={0.6} />
      <directionalLight position={[4, 6, 4]} intensity={2.2} />
      <group ref={grupo} position={[0, 0.55, 0]}>
        <mesh>
          <torusKnotGeometry args={[0.75, 0.24, 140, 18]} />
          <meshStandardMaterial color="#4d8df6" roughness={0.28} metalness={0.35} />
        </mesh>
      </group>
      <gridHelper args={[9, 18, '#2c3345', '#202634']} position={[0, -0.35, 0]} />
    </group>
  )
}

export default function Demand() {
  const [modo, setModo] = useState<Modo>('always')
  const [invalidar, setInvalidar] = useState(0)
  const contador = useRef<HTMLSpanElement>(null)

  return (
    <DemoEscena
      titulo="frameloop always frente a demand"
      descripcion="Un nudo de toro girando. En modo always se dibuja en cada frame; en modo demand se queda quieto hasta que se pulsa el botón invalidate. Un contador muestra cuántos frames ha dibujado el canvas."
      camara={[0, 1.8, 5]}
      fov={45}
      controles={
        <>
          <GrupoOpciones
            etiqueta="frameloop"
            valor={modo}
            opciones={[
              { valor: 'always', texto: 'always' },
              { valor: 'demand', texto: 'demand' },
            ]}
            onChange={setModo}
          />
          <button
            type="button"
            disabled={modo === 'always'}
            onClick={() => setInvalidar((valor) => valor + 1)}
            className="rounded-lg border border-borde bg-superficie-alta px-3 py-1 font-mono text-xs text-texto transition hover:border-acento disabled:cursor-not-allowed disabled:opacity-35"
          >
            invalidate()
          </button>
          <span ref={contador} className="font-mono text-[11px] text-texto-tenue">
            frames dibujados: 0 · 0/s
          </span>
        </>
      }
      nota="Cambia a demand y mira el contador: deja de subir. Cada clic en invalidate() pinta exactamente un frame. Si la escena tiene animación continua, demand no es la opción; si está quieta esperando interacción, sí."
    >
      <Escena modo={modo} invalidar={invalidar} contador={contador} />
    </DemoEscena>
  )
}

import { useMemo, useRef, useState } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import {
  CuboidCollider,
  Physics,
  RigidBody,
  useAfterPhysicsStep,
  useBeforePhysicsStep,
} from '@react-three/rapier'
import { DemoEscena, Deslizador, GrupoOpciones } from '../marco'

type Paso = '1/60' | '1/30' | 'vary'

const PASOS: { valor: Paso; texto: string }[] = [
  { valor: '1/60', texto: '1/60' },
  { valor: '1/30', texto: '1/30' },
  { valor: 'vary', texto: 'vary' },
]

const LADO = 10
const CAPAS = 2
const TOTAL = LADO * LADO * CAPAS

/** Mide fps, coste del paso de física y draw calls. */
function Metricas({ alInformar }: { alInformar: (texto: string) => void }) {
  const gl = useThree((estado) => estado.gl)
  const inicio = useRef(0)
  const acumulado = useRef({ tiempo: 0, frames: 0, paso: 0, pasos: 0 })

  useBeforePhysicsStep(() => {
    inicio.current = performance.now()
  })

  useAfterPhysicsStep(() => {
    acumulado.current.paso += performance.now() - inicio.current
    acumulado.current.pasos += 1
  })

  useFrame((_, delta) => {
    const datos = acumulado.current
    datos.tiempo += delta
    datos.frames += 1
    if (datos.tiempo < 0.5) return

    const fps = Math.round(datos.frames / datos.tiempo)
    const msPaso = datos.pasos > 0 ? datos.paso / datos.pasos : 0
    alInformar(
      `${fps} fps · ${msPaso.toFixed(2)} ms/paso · ${gl.info.render.calls} draw calls`,
    )
    datos.tiempo = 0
    datos.frames = 0
    datos.paso = 0
    datos.pasos = 0
  })

  return null
}

/**
 * Estabilidad y coste con 200 cuerpos.
 *
 * El `timeStep` fijo desacopla la simulación del refresco de la pantalla: si el
 * monitor va a 144 Hz, la física sigue a 60 pasos por segundo. `vary` usa el
 * delta real del frame: se adapta a la pantalla pero el resultado deja de ser
 * reproducible y puede explotar con tirones. El marcador muestra los
 * milisegundos que cuesta cada paso: ahí está el límite.
 */
export default function Estabilidad() {
  const [paso, setPaso] = useState<Paso>('1/60')
  const [iteraciones, setIteraciones] = useState(4)
  const [substeps, setSubsteps] = useState(1)
  const [reinicio, setReinicio] = useState(0)
  const [informe, setInforme] = useState('midiendo…')

  const piezas = useMemo(() => {
    const lista: { posicion: [number, number, number]; giro: number }[] = []
    for (let capa = 0; capa < CAPAS; capa += 1) {
      for (let fila = 0; fila < LADO; fila += 1) {
        for (let columna = 0; columna < LADO; columna += 1) {
          lista.push({
            posicion: [
              (columna - (LADO - 1) / 2) * 0.62,
              2.4 + capa * 1.1 + ((fila + columna) % 3) * 0.35,
              (fila - (LADO - 1) / 2) * 0.62,
            ],
            giro: ((fila * 13 + columna * 7 + capa * 3) % 90) * (Math.PI / 180),
          })
        }
      }
    }
    return lista
  }, [])

  return (
    <DemoEscena
      titulo={`${TOTAL} cuerpos: paso, iteraciones y coste`}
      descripcion="Doscientas cajas caen y forman una pila. El marcador muestra frames por segundo, milisegundos por paso de física y draw calls. Se puede cambiar el paso de simulación, las iteraciones del solver y los substeps de CCD."
      alto={420}
      camara={[7.5, 6.5, 9.5]}
      controles={
        <>
          <GrupoOpciones etiqueta="timeStep" valor={paso} opciones={PASOS} onChange={setPaso} />
          <Deslizador
            etiqueta="solver"
            valor={iteraciones}
            min={1}
            max={12}
            paso={1}
            onChange={setIteraciones}
          />
          <Deslizador
            etiqueta="ccd"
            valor={substeps}
            min={1}
            max={6}
            paso={1}
            onChange={setSubsteps}
          />
          <button
            type="button"
            onClick={() => setReinicio((valor) => valor + 1)}
            className="rounded-lg border border-borde px-2.5 py-1 text-xs text-texto-suave transition hover:bg-superficie-alta"
          >
            reiniciar
          </button>
          <span className="ml-auto font-mono text-[11px] text-texto-suave">{informe}</span>
        </>
      }
      nota="Subir `numSolverIterations` hace la pila más rígida y cuesta más; subir `maxCcdSubsteps` solo sirve contra el tunneling de objetos rápidos y finos, y es caro. Si la pila tiembla, casi siempre es falta de iteraciones, masas muy dispares o `lengthUnit` mal ajustado, no el render."
      sombras
    >
      <ambientLight intensity={0.6} />
      <directionalLight position={[7, 11, 6]} intensity={2.1} castShadow />
      <directionalLight position={[-7, 4, -6]} intensity={0.4} color="#9fc2ff" />

      <Physics
        gravity={[0, -9.81, 0]}
        timeStep={paso === 'vary' ? 'vary' : paso === '1/60' ? 1 / 60 : 1 / 30}
        numSolverIterations={iteraciones}
        maxCcdSubsteps={substeps}
      >
        <Metricas alInformar={setInforme} />

        {piezas.map((pieza, indice) => (
          <RigidBody
            key={`${reinicio}-${indice}`}
            position={pieza.posicion}
            rotation={[pieza.giro, pieza.giro * 0.6, 0]}
            colliders={false}
            friction={0.62}
            restitution={0.02}
          >
            <CuboidCollider args={[0.15, 0.15, 0.15]} />
            <mesh castShadow receiveShadow>
              <boxGeometry args={[0.3, 0.3, 0.3]} />
              <meshStandardMaterial
                color={indice % 7 === 0 ? '#f5a524' : '#4d8df6'}
                roughness={0.55}
                metalness={0.08}
              />
            </mesh>
          </RigidBody>
        ))}

        <RigidBody type="fixed" colliders={false}>
          <CuboidCollider args={[8, 0.3, 8]} position={[0, -0.3, 0]} />
        </RigidBody>
      </Physics>

      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[16, 16]} />
        <meshStandardMaterial color="#151b2a" roughness={0.96} />
      </mesh>
    </DemoEscena>
  )
}

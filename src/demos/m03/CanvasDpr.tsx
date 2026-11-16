import { useEffect, useState } from 'react'
import { useThree } from '@react-three/fiber'
import { DemoEscena, GrupoOpciones } from '../marco'
import { MedidorFps } from './medidor'

type Modo = 'always' | 'demand'

/**
 * Aplica `dpr` y `frameloop` sobre un canvas que ya existe.
 *
 * Es la parte que casi nadie ve: el `<Canvas>` de R3F crea el renderer con una
 * densidad de píxeles y un modo de bucle. Aquí los cambiamos en caliente para que
 * el efecto se pueda medir sin recargar.
 */
function Ajustes({ dpr, modo }: { dpr: number; modo: Modo }) {
  const gl = useThree((estado) => estado.gl)
  const setFrameloop = useThree((estado) => estado.setFrameloop)
  const invalidate = useThree((estado) => estado.invalidate)

  useEffect(() => {
    // setPixelRatio reajusta el tamaño real del búfer y vuelve a llamar a
    // setSize con el mismo tamaño CSS: no hay que tocar nada más.
    gl.setPixelRatio(dpr)
  }, [gl, dpr])

  useEffect(() => {
    setFrameloop(modo)
    // Al entrar en `demand` hace falta pedir el primer frame a mano.
    if (modo === 'demand') invalidate()
  }, [modo, setFrameloop, invalidate])

  return null
}

function Cubo({ giro }: { giro: number }) {
  return (
    <mesh rotation={[0.5, giro, 0]} position={[0, 0.72, 0]}>
      <boxGeometry args={[1.2, 1.2, 1.2]} />
      <meshStandardMaterial color="#f5a524" roughness={0.32} metalness={0.18} />
    </mesh>
  )
}

export default function CanvasDpr() {
  const [dpr, setDpr] = useState(1)
  const [modo, setModo] = useState<Modo>('always')
  const [giro, setGiro] = useState(0.6)
  const [fps, setFps] = useState(0)

  return (
    <DemoEscena
      titulo="Un cubo, dos perillas: densidad de píxeles y bucle"
      descripcion="Un cubo ámbar sobre una rejilla. Los controles cambian la densidad de píxeles del lienzo y el modo del bucle de render; el contador muestra cuántos frames se dibujan por segundo."
      alto={360}
      camara={[3.2, 2.6, 4.2]}
      controles={
        <>
          <GrupoOpciones
            etiqueta="dpr"
            valor={dpr}
            opciones={[
              { valor: 0.5, texto: '0,5' },
              { valor: 1, texto: '1' },
              { valor: 1.5, texto: '1,5' },
              { valor: 2, texto: '2' },
            ]}
            onChange={setDpr}
          />
          <GrupoOpciones
            etiqueta="frameloop"
            valor={modo}
            opciones={[
              { valor: 'always' as Modo, texto: 'always' },
              { valor: 'demand' as Modo, texto: 'demand' },
            ]}
            onChange={setModo}
          />
          <button
            type="button"
            onClick={() => setGiro((valor) => valor + 0.45)}
            className="rounded-lg border border-borde px-2.5 py-1 text-xs font-medium text-texto-suave transition hover:bg-superficie-alta"
          >
            Girar un paso
          </button>
          <span className="ml-auto font-mono text-xs text-texto">{fps} fps dibujados</span>
        </>
      }
      nota="En `demand` el cubo deja de girar y el contador baja: no hay bucle, solo los frames que alguien pide. El botón «Girar» cambia una prop y R3F invalida el frame por su cuenta."
    >
      <Ajustes dpr={dpr} modo={modo} />
      <MedidorFps alMedir={setFps} />

      <ambientLight intensity={0.45} />
      <directionalLight position={[3, 5, 2]} intensity={2.2} />
      <Cubo giro={giro} />

      <gridHelper args={[12, 12, '#2b3554', '#1d2338']} />
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]} receiveShadow>
        <planeGeometry args={[12, 12]} />
        <meshStandardMaterial color="#151a2a" roughness={1} />
      </mesh>
    </DemoEscena>
  )
}

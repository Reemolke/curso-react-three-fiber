import { useRef, useState } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { useFBO, PerspectiveCamera } from '@react-three/drei'
import {
  type Mesh,
  type PerspectiveCamera as CamaraPerspectiva,
} from 'three'
import { DemoEscena, Deslizador, GrupoOpciones, Interruptor } from '../marco'

type Resolucion = '128' | '256' | '512'

const RESOLUCIONES: { valor: Resolucion; texto: string }[] = [
  { valor: '128', texto: '128' },
  { valor: '256', texto: '256' },
  { valor: '512', texto: '512' },
]

const PIEZAS = [
  { x: -1.9, z: -1.4, color: '#4d8df6' },
  { x: -0.7, z: -2.1, color: '#3fbf87' },
  { x: 1.2, z: -1.7, color: '#f5a524' },
  { x: 2.1, z: 0.2, color: '#e05f7a' },
  { x: 0.9, z: 1.8, color: '#a78bfa' },
  { x: -0.9, z: 2.0, color: '#4d8df6' },
  { x: -2.2, z: 0.6, color: '#3fbf87' },
  { x: 0, z: 0, color: '#f5a524' },
]

/** Dentro del canvas: cámaras, target y doble render. */
function Vista({
  lado,
  congelado,
  giro,
}: {
  lado: number
  congelado: boolean
  giro: number
}) {
  const { gl, scene, camera } = useThree()
  const destino = useFBO(lado, lado)

  const panel = useRef<Mesh>(null)
  const piezas = useRef<Mesh[]>([])
  const cenital = useRef<CamaraPerspectiva>(null)
  const reloj = useRef(0)

  useFrame((_, delta) => {
    reloj.current += delta

    // 1. La escena se mueve, para que el minimapa tenga algo que enseñar.
    piezas.current.forEach((pieza, indice) => {
      if (!pieza) return
      pieza.rotation.y = reloj.current * (giro * 0.9 + indice * 0.05)
      pieza.position.y = 0.55 + Math.sin(reloj.current * 1.3 + indice) * 0.12
    })

    // 2. El panel se coloca delante de la cámara principal, como un HUD.
    const visor = panel.current
    if (visor) {
      visor.position.copy(camera.position)
      visor.quaternion.copy(camera.quaternion)
      const distancia = 2.4
      const alto = 2 * distancia * Math.tan(((camera as CamaraPerspectiva).fov * Math.PI) / 360)
      const ancho = alto * (camera as CamaraPerspectiva).aspect
      visor.translateX(ancho / 2 - 0.56)
      visor.translateY(alto / 2 - 0.56)
      visor.translateZ(-distancia)
    }

    // 3. Render a la textura, con el panel oculto para que no se vea a sí mismo.
    if (congelado) return
    const camara = cenital.current
    if (!camara) return

    camara.up.set(0, 0, -1)
    camara.lookAt(0, 0, 0)
    camara.updateMatrixWorld()

    if (visor) visor.visible = false
    const anterior = gl.getRenderTarget()
    gl.setRenderTarget(destino)
    gl.clear()
    gl.render(scene, camara)
    gl.setRenderTarget(anterior)
    if (visor) visor.visible = true
  })

  return (
    <>
      <PerspectiveCamera
        ref={cenital}
        makeDefault={false}
        fov={42}
        aspect={1}
        position={[0, 8.6, 0]}
        near={0.1}
        far={40}
      />

      <group>
        {PIEZAS.map((pieza, indice) => (
          <mesh
            key={indice}
            ref={(nodo) => {
              if (nodo) piezas.current[indice] = nodo
            }}
            position={[pieza.x, 0.55, pieza.z]}
          >
            <boxGeometry args={[0.62, 0.62, 0.62]} />
            <meshStandardMaterial
              color={pieza.color}
              emissive={pieza.color}
              emissiveIntensity={0.35}
              roughness={0.4}
              metalness={0.2}
            />
          </mesh>
        ))}

        <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
          <planeGeometry args={[14, 14]} />
          <meshStandardMaterial color="#131a29" roughness={0.95} />
        </mesh>
      </group>

      <mesh ref={panel} renderOrder={999} frustumCulled={false}>
        <planeGeometry args={[0.72, 0.72]} />
        <meshBasicMaterial
          map={destino.texture}
          toneMapped={false}
          depthTest={false}
          depthWrite={false}
          transparent
        />
      </mesh>
    </>
  )
}

/**
 * Render a textura con `useFBO` y úsala como fuente.
 *
 * Cada frame se dibuja la escena desde una cámara cenital en un render target.
 * Esa textura se pega en un panel que flota delante de la cámara principal: un
 * minimapa en vivo. El truco no tiene nada de especial: es el mismo
 * `gl.render` que hace R3F, llamado a mano y con otro destino.
 */
export default function Fbo() {
  const [resolucion, setResolucion] = useState<Resolucion>('256')
  const [congelado, setCongelado] = useState(false)
  const [giro, setGiro] = useState(0.35)

  const lado = Number(resolucion)

  return (
    <DemoEscena
      titulo="Minimapa en vivo con useFBO"
      descripcion="Una escena con ocho piezas girando. Arriba a la derecha, un panel muestra la misma escena desde una cámara cenital, renderizada a una textura con useFBO. Se puede congelar la textura y cambiar su resolución."
      alto={420}
      camara={[0, 3.4, 7.4]}
      controles={
        <>
          <GrupoOpciones
            etiqueta="resolución"
            valor={resolucion}
            opciones={RESOLUCIONES}
            onChange={setResolucion}
          />
          <Interruptor etiqueta="congelar textura" activo={congelado} onChange={setCongelado} />
          <Deslizador
            etiqueta="giro"
            valor={giro}
            min={0}
            max={1}
            paso={0.05}
            onChange={setGiro}
          />
          <span className="ml-auto font-mono text-[11px] text-texto-tenue">
            {lado}×{lado} · {congelado ? 'textura fija' : 'render por frame'}
          </span>
        </>
      }
      nota="Se dibuja dos veces por frame: una a la textura y otra al lienzo. Con 128 px el segundo render es casi gratis; con 512 ya se nota. Al congelar, la textura deja de actualizarse y el panel se queda con la última imagen, que es la prueba de que es una textura y no una segunda escena. El espejo de la demo siguiente usa el mismo patrón: una cámara reflejada y una textura."
    >
      <ambientLight intensity={0.55} />
      <directionalLight position={[4, 7, 4]} intensity={2} />
      <directionalLight position={[-5, 2, -4]} intensity={0.5} color="#9fc2ff" />

      <Vista lado={lado} congelado={congelado} giro={giro} />
    </DemoEscena>
  )
}

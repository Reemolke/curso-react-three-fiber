import { useEffect, useMemo, useRef, useState, type RefObject } from 'react'
import { useFrame, useThree, type ThreeEvent } from '@react-three/fiber'
import { Environment, OrbitControls, PositionalAudio } from '@react-three/drei'
import { BallCollider, CuboidCollider, Physics, RigidBody } from '@react-three/rapier'
import { Bloom, EffectComposer, Vignette } from '@react-three/postprocessing'
import {
  Vector3,
  type Material,
  type Mesh,
  type MeshStandardMaterial,
  type Object3D,
  type PositionalAudio as Sonido,
} from 'three'
import { AUDIO, HDRIS, MODELOS } from '../tres/rutas'
import { useGLTF } from '../tres/gltf'
import { DemoEscena } from '../demos/marco'
import { Medidor, useSalidas, type Salidas } from '../demos/m12/medicion'
import { Escaner } from './escaner'
import { FICHA, MODULOS, calcularFicha, useTaller, type Vista } from './tienda'

/** El rover vive aquí: encima de la plataforma del taller. */
const ROVER: [number, number, number] = [0.7, 0.12, 0.9]

/**
 * Giro actual del plato, en radianes.
 *
 * Vive fuera de React a propósito: `useFrame` lo escribe y la cámara lo lee en el
 * instante de pedir un encuadre. Los encuadres de módulo están definidos para el
 * rover sin girar; al volar hay que rotarlos con este ángulo o la cámara enfoca
 * al aire. Guardarlo en el estado de React sería peor: un render por frame.
 */
const giro = { y: -0.82 }

/**
 * `prefers-reduced-motion`, otra vez. En este proyecto no cambia el contenido,
 * cambia el transporte: la cámara salta en vez de volar y el plato deja de girar.
 */
function useMovimientoReducido(): boolean {
  const [reducido, setReducido] = useState(false)

  useEffect(() => {
    const consulta = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReducido(consulta.matches)
    const alCambiar = (evento: MediaQueryListEvent) => setReducido(evento.matches)
    consulta.addEventListener('change', alCambiar)
    return () => consulta.removeEventListener('change', alCambiar)
  }, [])

  return reducido
}

/** ¿Este objeto, o alguno de sus padres hasta la raíz, se llama así? */
function pertenece(objeto: Object3D, raiz: Object3D, nombre: string): boolean {
  let actual: Object3D | null = objeto
  while (actual && actual !== raiz) {
    if (actual.name === nombre) return true
    actual = actual.parent
  }
  return false
}

type Brillo = { color: string; intensidad: number }

/**
 * El rover, con sus módulos intercambiables.
 *
 * Tres decisiones que vienen de lecciones anteriores y se ven aquí juntas:
 *
 * 1. **Clon profundo.** El `scene` de `useGLTF` es compartido entre todas las
 *    demos. Para poder ocultar módulos y resaltar piezas hace falta un árbol
 *    propio; `clone(true)` lo da, y el material se clona por malla para no pintar
 *    de azul el rover de otra lección (8.4).
 * 2. **Visibilidad por nombre de nodo.** Los módulos no son componentes nuevos:
 *    son nodos del glTF que se apagan y se encienden (8.3).
 * 3. **Nada de `setState` dentro de `useFrame`.** El giro del plato es una
 *    rotación imperativa; la selección, que sí se pinta, vive en la tienda.
 */
function Rover({ reducido, sonido }: { reducido: boolean; sonido: RefObject<Sonido | null> }) {
  const { scene } = useGLTF(MODELOS.rover)
  const modulos = useTaller((estado) => estado.modulos)
  const seleccion = useTaller((estado) => estado.seleccion)
  const seleccionar = useTaller((estado) => estado.seleccionar)
  const vista = useTaller((estado) => estado.vista)
  const plato = useRef<Object3D>(null)

  // El plato arranca girado para que el primer encuadre enseñe el brazo y el
  // panel en escorzo, no de canto.
  useEffect(() => {
    if (plato.current) plato.current.rotation.y = giro.y
  }, [])

  const clon = useMemo(() => {
    const copia = scene.clone(true)
    copia.traverse((objeto) => {
      const malla = objeto as Mesh
      if (!malla.isMesh) return
      malla.castShadow = true
      malla.receiveShadow = true
      const material = (malla.material as Material).clone() as MeshStandardMaterial
      malla.material = material

      // Guardamos el brillo original: el rover tiene faros emisivos y hay que
      // poder devolverlos a su sitio al deseleccionar.
      malla.userData.brillo = {
        color: `#${material.emissive.getHexString()}`,
        intensidad: material.emissiveIntensity,
      } satisfies Brillo
    })
    return copia
  }, [scene])

  // Montar y desmontar módulos: apagar los nodos que lista la ficha.
  useEffect(() => {
    clon.traverse((objeto) => {
      for (const modulo of MODULOS) {
        if (FICHA[modulo].nodos.includes(objeto.name)) objeto.visible = modulos[modulo]
      }
    })
  }, [clon, modulos])

  // Resaltar la pieza seleccionada, o su grupo: `panel_pivote` no es una malla.
  useEffect(() => {
    clon.traverse((objeto) => {
      const malla = objeto as Mesh
      if (!malla.isMesh) return
      const material = malla.material as MeshStandardMaterial
      const brillo = malla.userData.brillo as Brillo | undefined
      if (!brillo) return

      if (seleccion && pertenece(malla, clon, seleccion)) {
        material.emissive.set('#2f6df6')
        material.emissiveIntensity = 0.85
      } else {
        material.emissive.set(brillo.color)
        material.emissiveIntensity = brillo.intensidad
      }
    })
  }, [clon, seleccion])

  // El plato gira despacio en la vista general y se queda quieto al inspeccionar
  // un módulo: una cámara que persigue una pieza que se mueve no deja mirarla.
  useFrame((_, delta) => {
    if (!plato.current || reducido || vista !== 'general') return
    plato.current.rotation.y += delta * 0.12
    giro.y = plato.current.rotation.y
  })

  return (
    <group position={ROVER}>
      <group ref={plato}>
        <primitive
          object={clon}
          onPointerMove={(evento: ThreeEvent<PointerEvent>) => {
            evento.stopPropagation()
            seleccionar(evento.object.name)
          }}
          onPointerOut={() => seleccionar(null)}
        />
      </group>

      <Escaner activo={Boolean(seleccion)} centro={[0, 0.85, 0]} />

      <group position={[0, 0.5, 0]}>
        <PositionalAudio ref={sonido} url={AUDIO.motor} distance={1.8} loop autoplay={false} />
      </group>
    </group>
  )
}

/** El diorama: solo geometría, sin física. Recibe sombras y no se mueve. */
function Taller() {
  const { scene } = useGLTF(MODELOS.taller)

  const clon = useMemo(() => {
    const copia = scene.clone(true)
    copia.traverse((objeto) => {
      const malla = objeto as Mesh
      if (!malla.isMesh) return
      malla.receiveShadow = true
      malla.castShadow = true
    })
    return copia
  }, [scene])

  return <primitive object={clon} />
}

/** Suelo y plataforma, invisibles: solo existen para la simulación. */
function Suelos() {
  return (
    <RigidBody type="fixed" colliders={false}>
      <CuboidCollider args={[4, 0.05, 4]} position={[0, -0.05, 0]} />
      <CuboidCollider args={[1.6, 0.06, 1.6]} position={[0.7, 0.06, 0.9]} />
    </RigidBody>
  )
}

/**
 * Tuercas que caen.
 *
 * Cada una es un cuerpo rígido independiente: son doce y el coste es
 * despreciable. La lección 10.6 explica cuándo conviene dormirlas; aquí bastan
 * `friction` alto y `restitution` baja para que no boten sin parar.
 */
function Tuercas({ ids }: { ids: number[] }) {
  return (
    <Physics gravity={[0, -9.81, 0]}>
      <Suelos />
      {ids.map((id) => (
        <RigidBody
          key={id}
          colliders={false}
          friction={0.9}
          restitution={0.08}
          position={[
            0.7 + ((id % 5) - 2) * 0.22,
            2.05 + (id % 4) * 0.16,
            0.9 + ((id % 3) - 1) * 0.24,
          ]}
        >
          <BallCollider args={[0.1]} />
          <mesh castShadow>
            <torusGeometry args={[0.085, 0.038, 8, 18]} />
            <meshStandardMaterial color="#d8b24a" metalness={1} roughness={0.3} />
          </mesh>
        </RigidBody>
      ))}
    </Physics>
  )
}

/**
 * Los cuatro encuadres del configurador.
 *
 * Están escritos para el rover **sin girar** (giro 0). Los tres de módulo se
 * rotan con el ángulo actual del plato al pedir el viaje; el general es fijo
 * porque ya está centrado y es el único que se ve mientras el plato gira.
 */
const VISTAS: Record<Vista, { posicion: [number, number, number]; mira: [number, number, number] }> = {
  general: { posicion: [3.6, 2.3, 3.5], mira: [0.55, 0.8, 0.6] },
  ruedas: { posicion: [2.75, 1.15, 3.05], mira: [1.05, 0.34, 1.3] },
  panel: { posicion: [-1.45, 2.25, 2.85], mira: [0.2, 1.1, 0.9] },
  brazo: { posicion: [2.95, 2.25, 2.95], mira: [1.3, 1.1, 0.62] },
}

/**
 * Gira un punto alrededor del rover en el plano XZ.
 *
 * Es la rotación en Y de three aplicada a mano: mismo resultado, sin crear
 * `Vector3` nuevos en cada viaje de cámara.
 */
function rotarY(
  punto: [number, number, number],
  centro: [number, number, number],
  angulo: number,
): [number, number, number] {
  const dx = punto[0] - centro[0]
  const dz = punto[2] - centro[2]
  const cos = Math.cos(angulo)
  const sin = Math.sin(angulo)
  return [centro[0] + dx * cos + dz * sin, punto[1], centro[2] - dx * sin + dz * cos]
}

/**
 * Vuelo de cámara.
 *
 * `OrbitControls` manda mientras no hay viaje en curso; al pedir una vista se
 * interpolan posición y objetivo, y al llegar se devuelve el control. Interpolar
 * en `useFrame` es correcto aquí porque cada frame parte del estado actual: no
 * es una animación con principio y final fijos, es una persecución.
 */
function Camara({ reducido }: { reducido: boolean }) {
  const camara = useThree((estado) => estado.camera)
  const controles = useThree((estado) => estado.controls) as unknown as {
    target: Vector3
    update: () => void
  } | null
  const vista = useTaller((estado) => estado.vista)
  const viaje = useTaller((estado) => estado.viaje)

  const destino = useRef(new Vector3(...VISTAS.general.posicion))
  const mira = useRef(new Vector3(...VISTAS.general.mira))
  const viajando = useRef(false)

  useEffect(() => {
    const preset = VISTAS[vista]
    const posicion =
      vista === 'general' ? preset.posicion : rotarY(preset.posicion, ROVER, giro.y)
    const objetivo = vista === 'general' ? preset.mira : rotarY(preset.mira, ROVER, giro.y)

    destino.current.set(...posicion)
    mira.current.set(...objetivo)

    if (reducido) {
      camara.position.copy(destino.current)
      if (controles) {
        controles.target.copy(mira.current)
        controles.update()
      }
      viajando.current = false
      return
    }

    viajando.current = true
  }, [vista, viaje, reducido, camara, controles])

  useFrame((_, delta) => {
    if (!viajando.current) return
    // Suavizado independiente del framerate: mismo resultado a 30 y a 144 fps.
    const t = 1 - Math.exp(-7 * delta)
    camara.position.lerp(destino.current, t)
    if (controles) {
      controles.target.lerp(mira.current, t)
      controles.update()
    }
    if (camara.position.distanceTo(destino.current) < 0.02) {
      camara.position.copy(destino.current)
      viajando.current = false
    }
  })

  return null
}

function Escena({
  reducido,
  tuercas,
  sonido,
  salidas,
}: {
  reducido: boolean
  tuercas: number[]
  sonido: RefObject<Sonido | null>
  salidas: Salidas
}) {
  return (
    <>
      <color attach="background" args={['#0a0d17']} />
      <fog attach="fog" args={['#0a0d17', 7, 16]} />

      <Environment files={HDRIS.estudio} environmentIntensity={0.32} />

      <ambientLight intensity={0.22} />
      <directionalLight
        position={[4.5, 6.5, 3.5]}
        intensity={1.5}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-camera-left={-5}
        shadow-camera-right={5}
        shadow-camera-top={5}
        shadow-camera-bottom={-5}
        shadow-bias={-0.0005}
      />
      {/* El foco de trabajo: cálido y cerca de la plataforma. */}
      <spotLight
        position={[0.4, 2.9, 0.9]}
        angle={0.7}
        penumbra={0.75}
        intensity={5}
        color="#ffe3b0"
        distance={8}
      />
      <pointLight position={[-2.6, 2.2, 2.2]} intensity={1.2} color="#8fb6ff" distance={8} />

      <Taller />
      <Rover reducido={reducido} sonido={sonido} />
      <Tuercas ids={tuercas} />

      <OrbitControls
        makeDefault
        enablePan={false}
        target={[0.55, 0.8, 0.6]}
        minDistance={1.8}
        maxDistance={6.5}
        minPolarAngle={0.2}
        maxPolarAngle={Math.PI / 2 - 0.06}
      />
      <Camara reducido={reducido} />

      <EffectComposer multisampling={0}>
        <Bloom intensity={0.75} luminanceThreshold={0.55} luminanceSmoothing={0.25} mipmapBlur />
        <Vignette offset={0.3} darkness={0.7} />
      </EffectComposer>

      <Medidor salidas={salidas} />
    </>
  )
}

/** Tres cifras en una línea. El panel completo está en la lección 12.1. */
function Metricas({ salidas }: { salidas: Salidas }) {
  const filas: { etiqueta: string; ref: Salidas[keyof Salidas] }[] = [
    { etiqueta: 'fps', ref: salidas.fps },
    { etiqueta: 'draw', ref: salidas.llamadas },
    { etiqueta: 'tris', ref: salidas.triangulos },
  ]

  return (
    <dl className="flex items-center gap-3">
      {filas.map((fila) => (
        <div key={fila.etiqueta} className="flex items-baseline gap-1">
          <dt className="font-mono text-[9px] uppercase tracking-wider text-texto-tenue">
            {fila.etiqueta}
          </dt>
          <dd className="font-mono text-[11px] text-texto">
            <span ref={fila.ref}>—</span>
          </dd>
        </div>
      ))}
    </dl>
  )
}

/**
 * Taller K-7: la escena completa del proyecto final.
 *
 * Todo lo que hay aquí se ha practicado en un módulo anterior: modelos (8),
 * PBR y entorno (4 y 7), estado (13.1), selección (6), cámara (6.4), física
 * (10), postprocesado y shader (11), audio (13.4), carga (13.3) y medición (12).
 */
export default function TallerK7() {
  const reducido = useMovimientoReducido()
  const salidas = useSalidas()

  const modulos = useTaller((estado) => estado.modulos)
  const seleccion = useTaller((estado) => estado.seleccion)
  const alternarModulo = useTaller((estado) => estado.alternarModulo)
  const seleccionar = useTaller((estado) => estado.seleccionar)
  const vista = useTaller((estado) => estado.vista)
  const irA = useTaller((estado) => estado.irA)
  const reiniciar = useTaller((estado) => estado.reiniciar)

  const [tuercas, setTuercas] = useState<number[]>([])
  const [sonando, setSonando] = useState(false)
  const [aviso, setAviso] = useState('')
  const sonido = useRef<Sonido>(null)
  const siguiente = useRef(0)

  const ficha = calcularFicha(modulos)

  const soltar = () => {
    const id = siguiente.current
    siguiente.current += 1
    setTuercas((actuales) => [...actuales.slice(-11), id])
  }

  const alternarSonido = async () => {
    const nodo = sonido.current
    if (!nodo) return

    try {
      if (nodo.isPlaying) {
        nodo.stop()
        setSonando(false)
        setAviso('motor en silencio')
        return
      }
      if (nodo.context.state === 'suspended') await nodo.context.resume()
      nodo.play()
      setSonando(true)
      setAviso('motor en marcha')
    } catch (error) {
      setAviso(`sin audio: ${(error as Error).message.slice(0, 40)}`)
      setSonando(false)
    }
  }

  const boton = (activo: boolean) =>
    `rounded-lg border px-2.5 py-1 text-xs transition ${
      activo
        ? 'border-acento/70 bg-acento/15 text-texto'
        : 'border-borde bg-fondo/60 text-texto-suave hover:border-acento/50 hover:text-texto'
    }`

  return (
    <DemoEscena
      titulo="Taller K-7 · configurador y explorador"
      descripcion="Un rover lunar sobre una plataforma dentro de un taller. El panel permite montar y desmontar cuatro módulos, y cada uno suma peso y consumo en la ficha técnica. Al pasar el cursor sobre una pieza se resalta y un plano de escaneo la barre. La cámara vuela a cuatro encuadres, se pueden soltar tuercas que caen con física y el motor suena en la posición del rover."
      alto={470}
      camara={[3.6, 2.3, 3.5]}
      fov={47}
      sombras
      capa={
        <div className="pointer-events-none absolute inset-0 flex flex-col justify-between p-3">
          <div className="pointer-events-auto w-[16rem] rounded-xl border border-borde/70 bg-fondo/85 p-2.5 shadow-lg backdrop-blur">
            <div className="flex items-baseline justify-between">
              <p className="text-[10px] font-semibold uppercase tracking-widest text-texto-tenue">
                Módulos
              </p>
              <span className="font-mono text-[10px] text-texto-tenue">{ficha.montados}/4</span>
            </div>

            <div className="mt-1.5 space-y-1">
              {MODULOS.map((modulo) => {
                const activo = modulos[modulo]
                return (
                  <button
                    key={modulo}
                    type="button"
                    aria-pressed={activo}
                    onClick={() => {
                      alternarModulo(modulo)
                      setAviso(`${FICHA[modulo].nombre} ${activo ? 'desmontado' : 'montado'}`)
                    }}
                    className={`flex w-full items-center justify-between gap-2 rounded-md px-2 py-1 text-left text-[11px] transition ${
                      activo ? 'bg-acento/15 text-texto' : 'text-texto-tenue hover:bg-superficie-alta'
                    }`}
                  >
                    <span className="flex items-center gap-1.5">
                      <span
                        aria-hidden
                        className={`size-1.5 rounded-full ${activo ? 'bg-acento' : 'bg-texto-tenue/50'}`}
                      />
                      {FICHA[modulo].nombre}
                    </span>
                    <span className="font-mono text-[10px] text-texto-tenue">
                      {activo ? `${FICHA[modulo].kg.toFixed(1).replace('.', ',')} kg` : '—'}
                    </span>
                  </button>
                )
              })}
            </div>

            <dl className="mt-2 grid grid-cols-2 gap-1 border-t border-borde/60 pt-2">
              <div>
                <dt className="font-mono text-[9px] uppercase tracking-wider text-texto-tenue">masa</dt>
                <dd className="font-mono text-[11px] text-texto">
                  {ficha.kg.toFixed(1).replace('.', ',')} kg
                </dd>
              </div>
              <div>
                <dt className="font-mono text-[9px] uppercase tracking-wider text-texto-tenue">
                  consumo
                </dt>
                <dd className="font-mono text-[11px] text-texto">
                  {ficha.w > 0 ? `${ficha.w} W` : `${Math.abs(ficha.w)} W a favor`}
                </dd>
              </div>
            </dl>
          </div>

          <div className="flex flex-wrap items-end justify-between gap-2">
            <p className="rounded-lg bg-fondo/80 px-2 py-1 font-mono text-[10px] text-texto-tenue backdrop-blur">
              {seleccion ? `pieza · ${seleccion.replace(/_/g, ' ')}` : 'pasa el cursor por el rover'}
            </p>
            {aviso && (
              <p
                aria-live="polite"
                className="rounded-lg bg-fondo/80 px-2 py-1 font-mono text-[10px] text-acento backdrop-blur"
              >
                {aviso}
              </p>
            )}
          </div>
        </div>
      }
      controles={
        <div className="flex w-full flex-wrap items-center gap-x-4 gap-y-2">
          <div role="group" aria-label="encuadre de cámara" className="flex flex-wrap gap-1">
            {(['general', 'ruedas', 'panel', 'brazo'] as Vista[]).map((nombre) => (
              <button
                key={nombre}
                type="button"
                aria-pressed={vista === nombre}
                onClick={() => irA(nombre)}
                className={boton(vista === nombre)}
              >
                {nombre}
              </button>
            ))}
          </div>

          <button type="button" onClick={soltar} className={boton(false)}>
            soltar tuerca
          </button>
          <button type="button" onClick={() => setTuercas([])} className={boton(false)}>
            recoger
          </button>
          <button type="button" onClick={alternarSonido} className={boton(sonando)}>
            {sonando ? 'motor: on' : 'motor: off'}
          </button>
          <button
            type="button"
            onClick={() => {
              reiniciar()
              setTuercas([])
              seleccionar(null)
              setAviso('')
            }}
            className={boton(false)}
          >
            reiniciar
          </button>

          <div className="ml-auto">
            <Metricas salidas={salidas} />
          </div>
        </div>
      }
      nota="El panel de la izquierda es HTML normal colocado encima del lienzo: se puede tabular y activar con el teclado. Al montar un módulo se apagan nodos concretos del glTF, no se carga otro modelo. Las tuercas las simula Rapier, el escaneo es un shader propio y el motor es audio posicional anclado al rover."
    >
      <Escena reducido={reducido} tuercas={tuercas} sonido={sonido} salidas={salidas} />
    </DemoEscena>
  )
}

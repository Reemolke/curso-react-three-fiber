import { Bounds, OrbitControls } from '@react-three/drei'
import { Canvas, useFrame } from '@react-three/fiber'
import { useEffect, useMemo, useRef, useState } from 'react'
import * as THREE from 'three'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { KTX2Loader } from 'three/examples/jsm/loaders/KTX2Loader.js'

type Pieza = {
  nombre: string
  tipo: string
  triangulos: number
  material: string
}

type Info = {
  peso: number
  nodos: number
  mallas: number
  triangulos: number
  vertices: number
  materiales: number
  animaciones: { nombre: string; duracion: number }[]
  piezas: Pieza[]
}

type Cargado = {
  escena: THREE.Group
  info: Info
  clips: THREE.AnimationClip[]
  nombre: string
}

/** Libera geometrías, materiales y texturas del modelo anterior. */
function liberar(raiz: THREE.Object3D): void {
  raiz.traverse((objeto) => {
    const malla = objeto as THREE.Mesh
    if (malla.geometry) malla.geometry.dispose()
    const material = malla.material
    if (!material) return
    const materiales = Array.isArray(material) ? material : [material]
    for (const m of materiales) {
      for (const valor of Object.values(m)) {
        if (valor instanceof THREE.Texture) valor.dispose()
      }
      m.dispose()
    }
  })
}

function crearCargador(): GLTFLoader {
  const cargador = new GLTFLoader()

  const draco = new DRACOLoader()
  draco.setDecoderPath(new URL('draco/', document.baseURI).href)
  cargador.setDRACOLoader(draco)

  try {
    const ktx2 = new KTX2Loader()
    ktx2.setTranscoderPath(new URL('basis/', document.baseURI).href)
    ktx2.detectSupport(new THREE.WebGLRenderer())
    cargador.setKTX2Loader(ktx2)
  } catch {
    // Sin WebGL para detectar soporte: el modelo sin KTX2 se sigue pudiendo ver.
  }

  return cargador
}

function analizar(escena: THREE.Group, clips: THREE.AnimationClip[], peso: number): Info {
  let nodos = 0
  let mallas = 0
  let triangulos = 0
  let vertices = 0
  const materiales = new Set<string>()
  const piezas: Pieza[] = []

  escena.traverse((objeto) => {
    nodos += 1
    const malla = objeto as THREE.Mesh
    if (!malla.isMesh || !malla.geometry) return

    mallas += 1
    const geometria = malla.geometry as THREE.BufferGeometry
    const posiciones = geometria.getAttribute('position')
    const cantidad = geometria.index ? geometria.index.count : (posiciones?.count ?? 0)
    const tris = Math.round(cantidad / 3)
    triangulos += tris
    vertices += posiciones?.count ?? 0

    const material = Array.isArray(malla.material) ? malla.material[0] : malla.material
    const nombreMaterial = material?.name || material?.type || 'sin material'
    materiales.add(nombreMaterial)

    piezas.push({
      nombre: malla.name || '(sin nombre)',
      tipo: (geometria as THREE.BufferGeometry).type.replace('Geometry', ''),
      triangulos: tris,
      material: nombreMaterial,
    })
  })

  return {
    peso,
    nodos,
    mallas,
    triangulos,
    vertices,
    materiales: materiales.size,
    animaciones: clips.map((clip) => ({ nombre: clip.name || '(sin nombre)', duracion: clip.duration })),
    piezas,
  }
}

function formatearPeso(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`
}

/** Reproduce el clip seleccionado dentro del canvas. */
function Reproductor({
  escena,
  clips,
  indice,
}: {
  escena: THREE.Group
  clips: THREE.AnimationClip[]
  indice: number
}) {
  const mixer = useMemo(() => new THREE.AnimationMixer(escena), [escena])
  const clip = clips[indice]

  useEffect(() => {
    if (!clip) return
    const accion = mixer.clipAction(clip)
    accion.reset().play()
    return () => {
      accion.stop()
    }
  }, [mixer, clip])

  useEffect(() => {
    return () => {
      mixer.stopAllAction()
    }
  }, [mixer])

  useFrame((_, delta) => mixer.update(delta))
  return null
}

type Props = {
  /** Versión reducida para incrustar dentro de una lección. */
  compacto?: boolean
}

export default function Visor({ compacto = false }: Props) {
  const [cargado, setCargado] = useState<Cargado | null>(null)
  const [cargando, setCargando] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [arrastrando, setArrastrando] = useState(false)
  const [clip, setClip] = useState(0)
  const anterior = useRef<THREE.Group | null>(null)
  const entrada = useRef<HTMLInputElement>(null)

  useEffect(() => {
    return () => {
      if (anterior.current) liberar(anterior.current)
    }
  }, [])

  async function abrirArchivo(archivo: File) {
    if (!/\.(glb|gltf)$/i.test(archivo.name)) {
      setError('El archivo debe ser .glb o .gltf. Si tienes un .fbx o .obj, expórtalo antes a glTF.')
      return
    }

    setCargando(true)
    setError(null)

    try {
      const buffer = await archivo.arrayBuffer()
      const resultado = await new Promise<{ escena: THREE.Group; clips: THREE.AnimationClip[] }>(
        (resolver, rechazar) => {
          crearCargador().parse(
            buffer,
            '',
            (gltf) => resolver({ escena: gltf.scene, clips: gltf.animations }),
            rechazar,
          )
        },
      )

      if (anterior.current) liberar(anterior.current)
      anterior.current = resultado.escena

      const info = analizar(resultado.escena, resultado.clips, archivo.size)
      setCargado({ escena: resultado.escena, info, clips: resultado.clips, nombre: archivo.name })
      setClip(0)
    } catch (fallo) {
      const mensaje = fallo instanceof Error ? fallo.message : String(fallo)
      setError(
        `No se pudo leer el modelo: ${mensaje}. Causas habituales: el GLB usa una extensión requerida que no está soportada (Draco o KTX2 sin decodificador) o el archivo está incompleto.`,
      )
    } finally {
      setCargando(false)
    }
  }

  function alSoltar(evento: React.DragEvent) {
    evento.preventDefault()
    setArrastrando(false)
    const archivo = evento.dataTransfer.files[0]
    if (archivo) void abrirArchivo(archivo)
  }

  return (
    <div className={compacto ? '' : 'mx-auto max-w-6xl px-4 pb-16 pt-6 sm:px-6 lg:px-8'}>
      {!compacto && (
        <>
          <h1 className="text-3xl font-bold tracking-tight">Visor de modelos</h1>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-texto-suave">
            Arrastra un <code className="font-mono text-xs">.glb</code> o{' '}
            <code className="font-mono text-xs">.gltf</code> y compruébalo antes de meterlo en tu
            escena: peso, nodos, polígonos, materiales y animaciones. Todo se procesa en tu navegador;
            el archivo no se sube a ningún servidor.
          </p>
        </>
      )}

      <div
        onDragOver={(evento) => {
          evento.preventDefault()
          setArrastrando(true)
        }}
        onDragLeave={() => setArrastrando(false)}
        onDrop={alSoltar}
        className={`mt-5 overflow-hidden rounded-caja border-2 border-dashed transition ${
          arrastrando ? 'border-acento bg-acento/5' : 'border-borde bg-fondo-alto'
        }`}
      >
        {cargado ? (
          <div>
            <div className={compacto ? 'h-[300px]' : 'h-[min(55vh,480px)]'}>
              <Canvas shadows dpr={[1, 2]} camera={{ position: [3.2, 2.2, 4.2], fov: 45 }}>
                <color attach="background" args={['#151922']} />
                <ambientLight intensity={0.5} />
                <directionalLight position={[4, 8, 5]} intensity={2.6} castShadow />
                <directionalLight position={[-5, 3, -4]} intensity={0.9} color="#7aa2ff" />

                <Bounds fit clip observe margin={1.25}>
                  <primitive object={cargado.escena} />
                </Bounds>

                {cargado.clips.length > 0 && (
                  <Reproductor escena={cargado.escena} clips={cargado.clips} indice={clip} />
                )}

                <OrbitControls makeDefault enableDamping />
              </Canvas>
            </div>

            <div className="flex flex-wrap items-center gap-2 border-t border-borde bg-superficie/50 px-3 py-2">
              <span className="truncate text-xs font-medium text-texto">{cargado.nombre}</span>
              <span className="font-mono text-[11px] text-texto-tenue">
                {formatearPeso(cargado.info.peso)} · {cargado.info.triangulos.toLocaleString('es-ES')} triángulos
              </span>
              <div className="ml-auto flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => entrada.current?.click()}
                  className="rounded-md border border-borde px-2 py-1 text-[11px] text-texto-suave transition hover:bg-superficie-alta"
                >
                  Cambiar modelo
                </button>
              </div>
            </div>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => entrada.current?.click()}
            className="grid h-56 w-full place-items-center px-6 text-center"
          >
            <span>
              <span className="block text-3xl text-acento/70" aria-hidden>
                ⇩
              </span>
              <span className="mt-2 block text-sm font-medium">
                {cargando ? 'Leyendo el modelo…' : 'Arrastra un .glb aquí o pulsa para elegirlo'}
              </span>
              <span className="mt-1 block text-xs text-texto-tenue">
                Se analiza en local. Nada sale de tu navegador.
              </span>
            </span>
          </button>
        )}

        <input
          ref={entrada}
          type="file"
          accept=".glb,.gltf,model/gltf-binary,model/gltf+json"
          className="hidden"
          onChange={(evento) => {
            const archivo = evento.target.files?.[0]
            if (archivo) void abrirArchivo(archivo)
            evento.target.value = ''
          }}
        />
      </div>

      {error && (
        <p role="alert" className="mt-3 rounded-caja border border-error/40 bg-error/10 p-3 text-sm text-texto-suave">
          {error}
        </p>
      )}

      {cargado && (
        <div className={`mt-4 grid gap-4 ${compacto ? '' : 'lg:grid-cols-3'}`}>
          <dl className="grid grid-cols-2 gap-2 rounded-caja border border-borde bg-superficie p-3 sm:grid-cols-3 lg:col-span-1 lg:grid-cols-2">
            {[
              { etiqueta: 'Peso', valor: formatearPeso(cargado.info.peso) },
              { etiqueta: 'Nodos', valor: String(cargado.info.nodos) },
              { etiqueta: 'Mallas', valor: String(cargado.info.mallas) },
              { etiqueta: 'Triángulos', valor: cargado.info.triangulos.toLocaleString('es-ES') },
              { etiqueta: 'Vértices', valor: cargado.info.vertices.toLocaleString('es-ES') },
              { etiqueta: 'Materiales', valor: String(cargado.info.materiales) },
            ].map((dato) => (
              <div key={dato.etiqueta}>
                <dt className="text-[10px] uppercase tracking-wider text-texto-tenue">{dato.etiqueta}</dt>
                <dd className="font-mono text-sm text-texto">{dato.valor}</dd>
              </div>
            ))}
          </dl>

          <div className="rounded-caja border border-borde bg-superficie p-3">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-texto-tenue">
              Animaciones ({cargado.clips.length})
            </h2>
            {cargado.clips.length === 0 ? (
              <p className="mt-2 text-xs text-texto-tenue">
                Este modelo no trae animaciones. Si debería tenerlas, revisa que al exportar elegiste
                «Actions».
              </p>
            ) : (
              <ul className="mt-2 space-y-1">
                {cargado.info.animaciones.map((animacion, i) => (
                  <li key={`${animacion.nombre}-${i}`}>
                    <button
                      type="button"
                      onClick={() => setClip(i)}
                      aria-pressed={i === clip}
                      className={`flex w-full items-center justify-between gap-2 rounded-md px-2 py-1 text-left text-xs transition ${
                        i === clip ? 'bg-acento/15 text-texto' : 'text-texto-suave hover:bg-superficie-alta'
                      }`}
                    >
                      <span className="truncate">{animacion.nombre}</span>
                      <span className="font-mono text-[10px] text-texto-tenue">
                        {animacion.duracion.toFixed(2)} s
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="rounded-caja border border-borde bg-superficie p-3">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-texto-tenue">
              Piezas ({cargado.info.piezas.length})
            </h2>
            <ul className="mt-2 max-h-56 space-y-1 overflow-y-auto pr-1">
              {cargado.info.piezas.map((pieza, i) => (
                <li key={`${pieza.nombre}-${i}`} className="rounded-md bg-fondo-alto/60 px-2 py-1">
                  <span className="block truncate font-mono text-[11px] text-texto">{pieza.nombre}</span>
                  <span className="block text-[10px] text-texto-tenue">
                    {pieza.tipo} · {pieza.triangulos.toLocaleString('es-ES')} tris · {pieza.material}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  )
}

import { useMemo, useState } from 'react'
import { Marco } from '../marco'

/**
 * Catálogo navegable de los componentes de drei que usa el curso.
 *
 * No es una demo 3D: es un índice con la pregunta que resuelve cada componente.
 * Sirve para lo que de verdad hace falta al empezar con drei: saber que existe
 * algo antes de programarlo a mano.
 */
type Entrada = { nombre: string; grupo: string; para: string; desde: string }

const ENTRADAS: Entrada[] = [
  { nombre: 'OrbitControls', grupo: 'cámara', para: 'Orbitar, hacer zoom y desplazar con el ratón o el dedo.', desde: '6.3' },
  { nombre: 'Center', grupo: 'escena', para: 'Recolocar el origen de un modelo en su centro geométrico.', desde: '9.3' },
  { nombre: 'Bounds', grupo: 'escena', para: 'Encuadrar la cámara para que todo lo que hay dentro se vea.', desde: '9.3' },
  { nombre: 'Float', grupo: 'animación', para: 'Flotación suave y continua sin escribir un bucle.', desde: '9.3' },
  { nombre: 'Stage', grupo: 'escena', para: 'Montar un plató con luces, sombras y entorno en una línea.', desde: '9.3' },
  { nombre: 'Environment', grupo: 'escena', para: 'Iluminación basada en imagen desde un HDRI o una escena propia.', desde: '4.4' },
  { nombre: 'Text', grupo: 'texto', para: 'Texto en 3D con malla generada a partir de una fuente.', desde: '9.2' },
  { nombre: 'Text3D', grupo: 'texto', para: 'Texto extruido a partir de un typeface JSON.', desde: '9.2' },
  { nombre: 'Html', grupo: 'ui', para: 'Anclar HTML real a una posición 3D.', desde: '9.4' },
  { nombre: 'Instances', grupo: 'rendimiento', para: 'Dibujar muchas copias de una geometría con una llamada.', desde: '9.5' },
  { nombre: 'Clone', grupo: 'rendimiento', para: 'Clonar un objeto con materiales y geometría compartidos.', desde: '9.5' },
  { nombre: 'Preload', grupo: 'carga', para: 'Lanzar la descarga de todos los assets antes de necesitarlos.', desde: '9.5' },
  { nombre: 'View', grupo: 'render', para: 'Varios viewports con un solo contexto WebGL.', desde: '9.6' },
  { nombre: 'useTexture', grupo: 'carga', para: 'Cargar texturas con Suspense y caché por URL.', desde: '7.2' },
  { nombre: 'useGLTF', grupo: 'carga', para: 'Cargar modelos glTF con Suspense y decodificador local.', desde: '8.2' },
  { nombre: 'useAnimations', grupo: 'animación', para: 'Reproducir clips de un modelo con un mixer.', desde: '8.5' },
  { nombre: 'useProgress', grupo: 'carga', para: 'Saber cuánto falta para terminar de cargar.', desde: '13.3' },
  { nombre: 'Billboard', grupo: 'escena', para: 'Mantener un objeto mirando siempre a la cámara.', desde: '9.3' },
  { nombre: 'Grid', grupo: 'escena', para: 'Suelo de rejilla con desvanecido, sin textura.', desde: '3.6' },
  { nombre: 'shaderMaterial', grupo: 'shaders', para: 'Convertir un shader GLSL en un material de React.', desde: '11.4' },
]

const GRUPOS = ['todos', 'escena', 'cámara', 'texto', 'ui', 'carga', 'animación', 'rendimiento', 'shaders', 'render']

export default function Catalogo() {
  const [busqueda, setBusqueda] = useState('')
  const [grupo, setGrupo] = useState('todos')

  const filas = useMemo(() => {
    const termino = busqueda.trim().toLowerCase()
    return ENTRADAS.filter((entrada) => {
      const coincideGrupo = grupo === 'todos' || entrada.grupo === grupo
      const coincideTexto =
        termino.length === 0 ||
        entrada.nombre.toLowerCase().includes(termino) ||
        entrada.para.toLowerCase().includes(termino)
      return coincideGrupo && coincideTexto
    })
  }, [busqueda, grupo])

  return (
    <Marco titulo="Qué hay en drei y para qué sirve">
      <div className="space-y-3 p-3">
        <div className="flex flex-wrap items-center gap-2">
          <input
            type="search"
            value={busqueda}
            onChange={(evento) => setBusqueda(evento.target.value)}
            placeholder="buscar: sombras, texto, carga…"
            className="min-w-40 flex-1 rounded-lg border border-borde bg-fondo-alto px-2.5 py-1.5 text-xs text-texto outline-none placeholder:text-texto-tenue focus:border-acento"
          />
          <span className="font-mono text-[11px] text-texto-tenue">{filas.length} componentes</span>
        </div>

        <div className="flex flex-wrap gap-1.5">
          {GRUPOS.map((nombre) => (
            <button
              key={nombre}
              type="button"
              onClick={() => setGrupo(nombre)}
              aria-pressed={grupo === nombre}
              className={`rounded-full border px-2.5 py-1 text-[11px] transition ${
                grupo === nombre
                  ? 'border-acento bg-acento/15 text-texto'
                  : 'border-borde text-texto-suave hover:bg-superficie-alta'
              }`}
            >
              {nombre}
            </button>
          ))}
        </div>

        <ul className="divide-y divide-borde/60 overflow-hidden rounded-lg border border-borde">
          {filas.map((entrada) => (
            <li key={entrada.nombre} className="grid gap-1 px-2.5 py-2 sm:grid-cols-[11rem_1fr_3.5rem] sm:items-baseline">
              <span className="font-mono text-xs text-texto">{entrada.nombre}</span>
              <span className="text-[11px] leading-relaxed text-texto-suave">{entrada.para}</span>
              <span className="font-mono text-[10px] text-texto-tenue sm:text-right">lección {entrada.desde}</span>
            </li>
          ))}
        </ul>

        {filas.length === 0 && (
          <p className="py-6 text-center text-xs text-texto-tenue">Ningún componente coincide con esa búsqueda.</p>
        )}
      </div>
    </Marco>
  )
}

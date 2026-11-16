import { Component, useEffect, useState, type ErrorInfo, type ReactNode } from 'react'
import { Marco } from '../marco'

type Capacidades = {
  soportado: boolean
  motivo?: string
  renderer: string
  maxTextura: number
  maxMuestras: number
  float: boolean
  aniso: boolean
}

/**
 * Comprobación real, en tu navegador, ahora mismo.
 *
 * Es la misma comprobación que hace `DemoCanvas` antes de montar un `<Canvas>`:
 * crear un contexto desechable, preguntar lo que interesa y soltarlo. Nada de
 * `!!window.WebGLRenderingContext`, que dice que la API existe aunque el
 * contexto no se pueda crear (drivers bloqueados, GPU en lista negra, modo
 * ahorro extremo).
 */
function detectar(): Capacidades {
  const vacio: Capacidades = {
    soportado: false,
    renderer: '—',
    maxTextura: 0,
    maxMuestras: 0,
    float: false,
    aniso: false,
  }

  try {
    const lienzo = document.createElement('canvas')
    const gl = lienzo.getContext('webgl2')
    if (!gl) return { ...vacio, motivo: 'no hay contexto WebGL2' }

    const debug = gl.getExtension('WEBGL_debug_renderer_info')
    const renderer = debug
      ? String(gl.getParameter(debug.UNMASKED_RENDERER_WEBGL))
      : String(gl.getParameter(gl.RENDERER))

    const resultado: Capacidades = {
      soportado: true,
      renderer,
      maxTextura: Number(gl.getParameter(gl.MAX_TEXTURE_SIZE)),
      maxMuestras: Number(gl.getParameter(gl.MAX_SAMPLES)),
      float: Boolean(gl.getExtension('EXT_color_buffer_float')),
      aniso: Boolean(gl.getExtension('EXT_texture_filter_anisotropic')),
    }

    // Se suelta el contexto de prueba: no hace falta para nada más y cada
    // contexto vivo cuenta contra el límite del navegador (16 en Chrome).
    gl.getExtension('WEBGL_lose_context')?.loseContext()
    return resultado
  } catch (error) {
    return { ...vacio, motivo: (error as Error).message }
  }
}

/**
 * El `renderer` que devuelve Chrome es larguísimo:
 * `ANGLE (NVIDIA, NVIDIA GeForce RTX 4060 Direct3D11 vs_5_0 ps_5_0, D3D11)`.
 * Aquí se queda solo con el nombre de la GPU, que es lo que se quiere leer. El
 * texto completo sigue disponible en el `title` de la fila.
 */
function nombreCorto(renderer: string): string {
  const dentro = renderer.startsWith('ANGLE (') ? renderer.slice(7, -1) : renderer
  const partes = dentro.split(',').map((parte) => parte.trim())
  const gpu = partes.length > 1 ? partes[1] : partes[0]
  return gpu
    .replace(/^ANGLE Metal Renderer:\s*/i, '')
    .replace(/\s+Direct3D\d+.*$/i, '')
    .replace(/\s+vs_[\d_]+\s+ps_[\d_]+.*$/i, '')
    .trim()
}

/** Lo que se puede saber de la GPU sin lanzar la escena. */
function CapacidadesReales() {
  const [datos, setDatos] = useState<Capacidades | null>(null)

  useEffect(() => {
    setDatos(detectar())
  }, [])

  const filas: { etiqueta: string; valor: string; bien: boolean; completa?: boolean }[] = datos
    ? [
        { etiqueta: 'WebGL2', valor: datos.soportado ? 'disponible' : 'ausente', bien: datos.soportado },
        {
          etiqueta: 'renderer',
          valor: nombreCorto(datos.renderer),
          bien: true,
          completa: true,
        },
        { etiqueta: 'textura máx.', valor: `${datos.maxTextura} px`, bien: datos.maxTextura >= 4096 },
        { etiqueta: 'muestras MSAA', valor: String(datos.maxMuestras), bien: datos.maxMuestras > 0 },
        { etiqueta: 'float targets', valor: datos.float ? 'sí' : 'no', bien: datos.float },
        { etiqueta: 'anisotropía', valor: datos.aniso ? 'sí' : 'no', bien: datos.aniso },
      ]
    : []

  return (
    <div className="overflow-hidden rounded-xl border border-borde bg-fondo/50 p-3">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-texto-tenue">
        Comprobación en tu navegador
      </p>

      {datos === null ? (
        <p className="text-xs text-texto-tenue">Preguntando al driver…</p>
      ) : (
        <>
          {datos.motivo && <p className="mb-2 text-xs text-aviso">{datos.motivo}</p>}
          <dl className="grid gap-x-4 gap-y-1.5 sm:grid-cols-2">
            {filas.map((fila) => (
              <div
                key={fila.etiqueta}
                className={`flex min-w-0 items-baseline justify-between gap-2 ${
                  fila.completa ? 'sm:col-span-2' : ''
                }`}
                title={fila.completa ? datos.renderer : undefined}
              >
                <dt className="shrink-0 font-mono text-[10px] uppercase tracking-wider text-texto-tenue">
                  {fila.etiqueta}
                </dt>
                <dd
                  className={`min-w-0 truncate text-right font-mono text-[11px] ${fila.bien ? 'text-exito' : 'text-aviso'}`}
                >
                  {fila.valor}
                </dd>
              </div>
            ))}
          </dl>
        </>
      )}
    </div>
  )
}

/** Componente que revienta a propósito cuando se le pide. */
function Explota({ activo }: { activo: boolean }) {
  if (activo) throw new Error('faltan los datos del modelo: nodo «chasis» no encontrado')
  return (
    <div className="rounded-lg border border-borde bg-superficie/60 p-3 text-xs text-texto-suave">
      Escena funcionando. Nada que reportar.
    </div>
  )
}

type PropsLimite = { children: ReactNode; alFallar: (error: Error) => void }
type EstadoLimite = { error: Error | null }

/**
 * Límite de error mínimo. Es una clase porque no hay equivalente con hooks:
 * React necesita `getDerivedStateFromError` para sustituir el subárbol.
 */
class Limite extends Component<PropsLimite, EstadoLimite> {
  state: EstadoLimite = { error: null }

  static getDerivedStateFromError(error: Error): EstadoLimite {
    return { error }
  }

  componentDidCatch(error: Error, info: ErrorInfo): void {
    this.props.alFallar(error)
    if (import.meta.env.DEV) console.warn('[limite]', info.componentStack?.slice(0, 200))
  }

  reiniciar = () => this.setState({ error: null })

  render(): ReactNode {
    if (!this.state.error) return this.props.children

    return (
      <div role="alert" className="rounded-lg border border-error/40 bg-error/10 p-3 text-xs">
        <p className="font-semibold text-error">Esta escena no ha podido montarse.</p>
        <p className="mt-1 text-texto-suave">
          El resto de la página sigue viva: eso es lo que compra un límite de error por demo.
        </p>
        <pre className="mt-2 overflow-auto rounded bg-fondo/60 p-2 font-mono text-[10px] text-texto-tenue">
          {this.state.error.message}
        </pre>
        <button
          type="button"
          onClick={this.reiniciar}
          className="mt-2 rounded-md border border-borde px-2 py-1 font-medium transition hover:bg-superficie-alta"
        >
          reintentar
        </button>
      </div>
    )
  }
}

/**
 * Robustez.
 *
 * Dos comprobaciones que sí se pueden hacer aquí, sin simular nada: preguntar
 * al navegador por sus límites reales y comprobar que un fallo de una escena no
 * se lleva por delante la lección.
 */
export default function Robusto() {
  const [romper, setRomper] = useState(false)
  const [error, setError] = useState<string | null>(null)

  return (
    <Marco titulo="Comprobar, aislar, seguir">
      <div className="w-full space-y-3 p-3">
        <CapacidadesReales />

        <div className="rounded-xl border border-borde bg-fondo/50 p-3">
          <div className="mb-2 flex flex-wrap items-center gap-3">
            <p className="text-xs font-semibold uppercase tracking-wider text-texto-tenue">
              Límite de error
            </p>
            <button
              type="button"
              onClick={() => {
                setRomper((valor) => !valor)
                setError(null)
              }}
              className="rounded-md border border-borde bg-superficie px-2 py-1 text-xs text-texto-suave transition hover:border-aviso/50 hover:text-texto"
            >
              {romper ? 'dejar de romper' : 'provocar un fallo'}
            </button>
            {error && <span className="font-mono text-[10px] text-aviso">capturado</span>}
          </div>

          <Limite key={romper ? 'roto' : 'sano'} alFallar={(e) => setError(e.message)}>
            <Explota activo={romper} />
          </Limite>
        </div>

        <ul className="grid gap-1.5 text-xs leading-relaxed text-texto-suave sm:grid-cols-2">
          {[
            'Un contexto WebGL por lienzo: pasarse del límite del navegador pierde el más antiguo.',
            'Al perder el contexto (`webglcontextlost`) hay que pausar y reconstruir recursos.',
            'Un límite de error por demo evita que un fallo deje la lección en blanco.',
            'Comprueba WebGL2 creando un contexto real, no mirando si existe la API.',
          ].map((texto) => (
            <li key={texto} className="flex gap-2">
              <span className="text-acento">·</span>
              {texto}
            </li>
          ))}
        </ul>
      </div>
    </Marco>
  )
}

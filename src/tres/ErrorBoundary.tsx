import { Component, type ErrorInfo, type ReactNode } from 'react'

type Props = {
  children: ReactNode
  /** Etiqueta que aparece en el mensaje de error. */
  etiqueta?: string
}

type State = { error: Error | null }

/**
 * Aísla el fallo de una demo 3D para que no tumbe la lección entera.
 *
 * En un curso esto importa mucho: si un alumno abre la web en un portátil sin
 * WebGL, debe poder seguir leyendo el resto del contenido.
 */
export class ErrorBoundary extends Component<Props, State> {
  state: State = { error: null }

  static getDerivedStateFromError(error: Error): State {
    return { error }
  }

  componentDidCatch(error: Error, info: ErrorInfo): void {
    // En desarrollo ayuda a localizar el componente que falló.
    if (import.meta.env.DEV) {
      console.error('[demo]', this.props.etiqueta ?? 'sin etiqueta', error, info.componentStack)
    }
  }

  render(): ReactNode {
    const { error } = this.state
    if (!error) return this.props.children

    return (
      <div
        role="alert"
        className="rounded-caja border border-error/40 bg-error/10 p-4 text-sm"
      >
        <p className="font-semibold text-error">
          Esta demo no ha podido renderizar{this.props.etiqueta ? ` (${this.props.etiqueta})` : ''}.
        </p>
        <p className="mt-1 text-texto-suave">
          El resto de la lección sigue funcionando. Causa habitual: el navegador no tiene WebGL2
          disponible o una dependencia no se ha cargado.
        </p>
        <pre className="mt-3 max-h-32 overflow-auto rounded-lg bg-fondo/60 p-2 font-mono text-xs text-texto-tenue">
          {error.message}
        </pre>
        <button
          type="button"
          onClick={() => this.setState({ error: null })}
          className="mt-3 rounded-lg border border-borde px-3 py-1.5 text-xs font-medium transition hover:bg-superficie-alta"
        >
          Reintentar
        </button>
      </div>
    )
  }
}

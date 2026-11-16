import { lazy } from 'react'
import type { RegistroDemos } from '../registro'

/** Demos 3D del módulo 9. */
export const demosM09: RegistroDemos = {
  'm9-tipometro': lazy(() => import('./Tipometro')),
  'm9-encuadrar': lazy(() => import('./Encuadrar')),
  'm9-etiquetas': lazy(() => import('./Etiquetas')),
  'm9-instancias': lazy(() => import('./Instancias')),
  'm9-view': lazy(() => import('./ViewDoble')),
}

/** Widgets sin WebGL del módulo 9. */
export const widgetsM09: RegistroDemos = {
  'm9-catalogo': lazy(() => import('./Catalogo')),
}

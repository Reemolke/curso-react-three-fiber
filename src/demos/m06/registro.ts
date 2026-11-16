import { lazy } from 'react'
import type { RegistroDemos } from '../registro'

/** Demos 3D del módulo 6. */
export const demosM06: RegistroDemos = {
  'm6-galeria-eventos': lazy(() => import('./GaleriaEventos')),
  'm6-raycast': lazy(() => import('./Rayo')),
  'm6-controles': lazy(() => import('./Controles')),
  'm6-transiciones': lazy(() => import('./Transiciones')),
  'm6-teclado': lazy(() => import('./Teclado')),
  'm6-scroll': lazy(() => import('./Scroll')),
  'm6-arrastrar': lazy(() => import('./Arrastrar')),
}

/** Widgets sin WebGL del módulo 6. */
export const widgetsM06: RegistroDemos = {
  'm6-puntero-ndc': lazy(() => import('./WidgetNdc')),
}

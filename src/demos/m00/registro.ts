import { lazy } from 'react'
import type { RegistroDemos } from '../registro'

/** Demos 3D del módulo 0. */
export const demosM00: RegistroDemos = {
  'contador-cubo': lazy(() => import('./ContadorCubo')),
}

/** Demos sin WebGL del módulo 0. */
export const widgetsM00: RegistroDemos = {
  capas: lazy(() => import('./Capas')),
  'rebote-canvas': lazy(() => import('./ReboteCanvas')),
}

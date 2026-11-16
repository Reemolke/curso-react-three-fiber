import { lazy } from 'react'
import type { RegistroDemos } from '../registro'

/** Demos 3D del módulo 2. */
export const demosM02: RegistroDemos = {
  'm2-mismo-cubo': lazy(() => import('./MismoCubo')),
  'm2-inspector': lazy(() => import('./Inspector')),
  'm2-primitive': lazy(() => import('./Primitive')),
}

/** Widgets sin WebGL del módulo 2. */
export const widgetsM02: RegistroDemos = {}

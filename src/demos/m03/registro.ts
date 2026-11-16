import { lazy } from 'react'
import type { RegistroDemos } from '../registro'

/** Demos 3D del módulo 3. */
export const demosM03: RegistroDemos = {
  'm3-canvas-dpr': lazy(() => import('./CanvasDpr')),
  'm3-geo-material': lazy(() => import('./GeoMaterial')),
  'm3-triangulos': lazy(() => import('./Triangulos')),
  'm3-materiales': lazy(() => import('./Materiales')),
  'm3-escena': lazy(() => import('./Escena')),
}

/** El módulo 3 no necesita widgets sin WebGL. */
export const widgetsM03: RegistroDemos = {}

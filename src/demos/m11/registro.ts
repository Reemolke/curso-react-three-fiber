import { lazy } from 'react'
import type { RegistroDemos } from '../registro'

/** Demos 3D del módulo 11. */
export const demosM11: RegistroDemos = {
  'm11-composer': lazy(() => import('./Composer')),
  'm11-efectos': lazy(() => import('./Efectos')),
  'm11-pipeline': lazy(() => import('./Pipeline')),
  'm11-material-propio': lazy(() => import('./MaterialPropio')),
  'm11-efectos-practicos': lazy(() => import('./EfectosPracticos')),
  'm11-parchear': lazy(() => import('./Parchear')),
  'm11-fbo': lazy(() => import('./Fbo')),
  'm11-espejo': lazy(() => import('./Espejo')),
}

/** Widgets sin WebGL del módulo 11. */
export const widgetsM11: RegistroDemos = {
  'm11-webgpu': lazy(() => import('./WebGpu')),
}

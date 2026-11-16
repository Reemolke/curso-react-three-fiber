import { lazy } from 'react'
import type { RegistroDemos } from '../registro'

/** Demos 3D del módulo 12. */
export const demosM12: RegistroDemos = {
  'm12-metricas': lazy(() => import('./Metricas')),
  'm12-renders': lazy(() => import('./Renders')),
  'm12-instancing': lazy(() => import('./Instancing')),
  'm12-lod': lazy(() => import('./Lod')),
  'm12-movil': lazy(() => import('./Movil')),
  'm12-memoria': lazy(() => import('./Memoria')),
}

/** El módulo 12 no tiene widgets sin WebGL: todo se mide en el canvas. */
export const widgetsM12: RegistroDemos = {}

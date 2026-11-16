import { lazy } from 'react'
import type { RegistroDemos } from '../registro'

/** Demos 3D del módulo 8. */
export const demosM08: RegistroDemos = {
  'm8-cargar': lazy(() => import('./Cargar')),
  'm8-gltfjsx': lazy(() => import('./Gltfjsx')),
  'm8-inspeccionar': lazy(() => import('./Inspeccionar')),
  'm8-animaciones': lazy(() => import('./Animaciones')),
  'm8-pieza': lazy(() => import('./Pieza')),
  'm8-rig': lazy(() => import('./Rig')),
  'm8-errores': lazy(() => import('./Errores')),
  'm8-ktx2': lazy(() => import('./Ktx2')),
}

/** Widgets sin WebGL: estructura del GLB, desplegado y tabla de pesos. */
export const widgetsM08: RegistroDemos = {
  'm8-estructura': lazy(() => import('./Estructura')),
  'm8-uv': lazy(() => import('./UvDesplegado')),
  'm8-optimizar': lazy(() => import('./Optimizar')),
}

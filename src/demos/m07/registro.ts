import { lazy } from 'react'
import type { RegistroDemos } from '../registro'

/** Demos 3D del módulo 7. */
export const demosM07: RegistroDemos = {
  'm7-uvs': lazy(() => import('./Uvs')),
  'm7-cargar': lazy(() => import('./CargarTexturas')),
  'm7-colorspace': lazy(() => import('./ColorSpace')),
  'm7-mapas': lazy(() => import('./MapasPbr')),
  'm7-fisicos': lazy(() => import('./Fisicos')),
  'm7-comparador': lazy(() => import('./Comparador')),
}

/** El módulo 7 no necesita widgets sin WebGL. */
export const widgetsM07: RegistroDemos = {}

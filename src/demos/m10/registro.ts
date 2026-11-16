import { lazy } from 'react'
import type { RegistroDemos } from '../registro'

/** Demos 3D del módulo 10. */
export const demosM10: RegistroDemos = {
  'm10-caida': lazy(() => import('./Caida')),
  'm10-cuerpos': lazy(() => import('./Cuerpos')),
  'm10-colliders': lazy(() => import('./Colliders')),
  'm10-lanzador': lazy(() => import('./Lanzador')),
  'm10-sensor': lazy(() => import('./Sensor')),
  'm10-estabilidad': lazy(() => import('./Estabilidad')),
}

/** Widgets sin WebGL del módulo 10. */
export const widgetsM10: RegistroDemos = {}

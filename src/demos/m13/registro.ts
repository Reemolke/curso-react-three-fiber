import { lazy } from 'react'
import type { RegistroDemos } from '../registro'

/** Demos 3D del módulo 13. */
export const demosM13: RegistroDemos = {
  'm13-zustand': lazy(() => import('./Zustand')),
  'm13-carga': lazy(() => import('./Cargar')),
  'm13-audio': lazy(() => import('./Audio')),
  'm13-accesible': lazy(() => import('./Accesible')),
}

/** Widgets sin WebGL: arquitectura y comprobaciones del navegador. */
export const widgetsM13: RegistroDemos = {
  'm13-arquitectura': lazy(() => import('./Arquitectura')),
  'm13-robusto': lazy(() => import('./Robusto')),
}

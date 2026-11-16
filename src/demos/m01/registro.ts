import { lazy } from 'react'
import type { RegistroDemos } from '../registro'

/** Demos 3D del módulo 1. */
export const demosM01: RegistroDemos = {
  'm1-tripode': lazy(() => import('./Tripode')),
  'm1-coordenadas': lazy(() => import('./Coordenadas')),
  'm1-vectores': lazy(() => import('./Vectores')),
  'm1-rotaciones': lazy(() => import('./Rotaciones')),
  'm1-jerarquia': lazy(() => import('./Jerarquia')),
}

/** Widgets sin WebGL del módulo 1. */
export const widgetsM01: RegistroDemos = {}

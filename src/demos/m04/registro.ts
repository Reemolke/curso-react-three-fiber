import { lazy } from 'react'
import type { RegistroDemos } from '../registro'

/** Demos 3D del módulo 4. */
export const demosM04: RegistroDemos = {
  'm4-luces': lazy(() => import('./Luces')),
  'm4-exposicion': lazy(() => import('./Exposicion')),
  'm4-sombras': lazy(() => import('./Sombras')),
  'm4-hdri': lazy(() => import('./Hdri')),
  'm4-estudio': lazy(() => import('./Estudio')),
  'm4-depurar': lazy(() => import('./Depurar')),
}

/** El módulo 4 no necesita widgets sin WebGL. */
export const widgetsM04: RegistroDemos = {}

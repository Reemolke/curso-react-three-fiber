import { lazy } from 'react'
import type { RegistroDemos } from '../registro'

/**
 * Demos del módulo 14.
 *
 * No viven en `src/demos/m14/` porque no son demos de una lección suelta: el
 * taller es el proyecto final y su código de solución se queda en
 * `src/proyecto-final/`. El registro solo necesita saber dónde encontrarlo.
 */
export const demosM14: RegistroDemos = {
  'm14-taller': lazy(() => import('../../proyecto-final/Taller')),
}

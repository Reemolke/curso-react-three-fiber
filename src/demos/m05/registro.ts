import { lazy } from 'react'
import type { RegistroDemos } from '../registro'

/** Demos 3D del módulo 5. */
export const demosM05: RegistroDemos = {
  'm5-useframe-setstate': lazy(() => import('./UseFrameSetState')),
  'm5-delta-fps': lazy(() => import('./DeltaFps')),
  'm5-curvas': lazy(() => import('./Curvas')),
  'm5-react-spring': lazy(() => import('./ReactSpring')),
  'm5-cofre': lazy(() => import('./Cofre')),
  'm5-demand': lazy(() => import('./Demand')),
}

/** El módulo 5 no necesita widgets sin WebGL. */
export const widgetsM05: RegistroDemos = {}

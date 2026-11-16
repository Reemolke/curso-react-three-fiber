import type { ComponentType, LazyExoticComponent } from 'react'
import { demosM00, widgetsM00 } from './m00/registro'
import { demosM01, widgetsM01 } from './m01/registro'
import { demosM02, widgetsM02 } from './m02/registro'
import { demosM03, widgetsM03 } from './m03/registro'
import { demosM04, widgetsM04 } from './m04/registro'
import { demosM05, widgetsM05 } from './m05/registro'
import { demosM06, widgetsM06 } from './m06/registro'
import { demosM07, widgetsM07 } from './m07/registro'
import { demosM08, widgetsM08 } from './m08/registro'
import { demosM09, widgetsM09 } from './m09/registro'
import { demosM10, widgetsM10 } from './m10/registro'
import { demosM11, widgetsM11 } from './m11/registro'
import { demosM12, widgetsM12 } from './m12/registro'
import { demosM13, widgetsM13 } from './m13/registro'
import { demosM14 } from './m14/registro'

/**
 * Registro de demos.
 *
 * El contenido en `.ts` no puede importar componentes TSX sin arrastrar three.js
 * a todos los módulos, así que referencia las demos por id y este registro las
 * resuelve con `lazy`. Cada demo acaba en su propio chunk.
 *
 * Cada módulo mantiene su propio `src/demos/mNN/registro.ts` para que varias
 * personas puedan escribir módulos en paralelo sin tocar el mismo archivo: aquí
 * solo se hace el `spread` de todos ellos.
 *
 * Para añadir una demo: crea el componente con export por defecto, decláralo en
 * el registro de su módulo y úsalo en el contenido con
 * `{ tipo: 'demo', id: 'mi-id' }`.
 */

export type RegistroDemos = Record<string, LazyExoticComponent<ComponentType>>

/** Demos con `<Canvas>` de React Three Fiber. */
export const demos3d: RegistroDemos = {
  ...demosM00,
  ...demosM01,
  ...demosM02,
  ...demosM03,
  ...demosM04,
  ...demosM05,
  ...demosM06,
  ...demosM07,
  ...demosM08,
  ...demosM09,
  ...demosM10,
  ...demosM11,
  ...demosM12,
  ...demosM13,
  ...demosM14,
}

/** Demos sin WebGL: diagramas, canvas 2D, simulaciones de interfaz. */
export const widgets: RegistroDemos = {
  ...widgetsM00,
  ...widgetsM01,
  ...widgetsM02,
  ...widgetsM03,
  ...widgetsM04,
  ...widgetsM05,
  ...widgetsM06,
  ...widgetsM07,
  ...widgetsM08,
  ...widgetsM09,
  ...widgetsM10,
  ...widgetsM11,
  ...widgetsM12,
  ...widgetsM13,
}

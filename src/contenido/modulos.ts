import type { Modulo } from './tipos'
import { modulo0 } from './m00'
import { modulo1 } from './m01'
import { modulo2 } from './m02'
import { modulo3 } from './m03'
import { modulo4 } from './m04'
import { modulo5 } from './m05'
import { modulo6 } from './m06'
import { modulo7 } from './m07'
import { modulo8 } from './m08'
import { modulo9 } from './m09'
import { modulo10 } from './m10'
import { modulo11 } from './m11'
import { modulo12 } from './m12'
import { modulo13 } from './m13'
import { modulo14 } from './m14'

/**
 * Índice de módulos, en orden de curso.
 *
 * Añadir un módulo = crear `mNN.ts` y añadirlo a este array. El sidebar, el
 * buscador, el progreso y el «siguiente» se recalculan solos.
 */
export const modulos: Modulo[] = [modulo0, modulo1, modulo2, modulo3, modulo4, modulo5, modulo6, modulo7, modulo8, modulo9, modulo10, modulo11, modulo12, modulo13, modulo14]

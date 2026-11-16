/**
 * Modelo de contenido del curso.
 *
 * El contenido NO está en MDX a propósito: cada lección necesita demos tipadas,
 * quizzes evaluables y referencias a un registro de componentes. Con TypeScript
 * el temario se valida con `tsc` y añadir una lección es añadir un objeto.
 */

/** Dificultad declarada de la lección. */
export type Nivel = 'intro' | 'medio' | 'alto'

/** Tono de un bloque destacado. Cada uno tiene un significado estable. */
export type Tono = 'info' | 'ojo' | 'truco' | 'porque'

/** Lenguaje del bloque de código, solo para el resaltado del visor. */
export type Lenguaje = 'tsx' | 'ts' | 'js' | 'glsl' | 'bash' | 'json' | 'texto'

/** Un bloque es la unidad mínima de una lección. */
export type Bloque =
  | { tipo: 'parrafo'; texto: string }
  /** Fórmula corta, nombre de API o fragmento en línea destacado. */
  | { tipo: 'destacado'; tono: Tono; titulo?: string; texto: string }
  | { tipo: 'lista'; ordenada?: boolean; items: string[] }
  | { tipo: 'codigo'; lenguaje?: Lenguaje; titulo?: string; codigo: string }
  /** Demo 3D en vivo: `id` apunta a `src/demos/registro.ts`. */
  | { tipo: 'demo'; id: string; titulo?: string; alto?: number; nota?: string }
  /** Demo sin WebGL (diagramas, canvas 2D, simulaciones de UI). */
  | { tipo: 'widget'; id: string; titulo?: string; alto?: number }
  /** Comparación de dos demos lado a lado (mismo concepto, distinto enfoque). */
  | { tipo: 'demo-doble'; izquierda: string; derecha: string; titulo?: string; alto?: number }
  | { tipo: 'tabla'; cabecera: string[]; filas: string[][] }
  | { tipo: 'pasos'; items: { titulo: string; texto: string }[] }
  | { tipo: 'imagen'; src: string; alt: string; pie?: string }
  /** Visor de modelos .glb por arrastrar y soltar, incrustado en la lección. */
  | { tipo: 'visor'; titulo?: string }
  | { tipo: 'descarga'; archivos: { nombre: string; href: string; descripcion: string }[] }
  /** Lista de comprobación al cerrar un módulo o una fase del proyecto. */
  | { tipo: 'checkpoint'; titulo?: string; items: string[] }

/** Pregunta de quiz. Tres formas, todas evaluables sin ambigüedad. */
export type Pregunta =
  | {
      tipo: 'unica'
      enunciado: string
      opciones: string[]
      correcta: number
      explicacion: string
    }
  | {
      tipo: 'multiple'
      enunciado: string
      opciones: string[]
      correctas: number[]
      explicacion: string
    }
  | {
      tipo: 'verdadero-falso'
      enunciado: string
      correcta: boolean
      explicacion: string
    }

/** Error típico: síntoma → causa → arreglo. Se muestra siempre en tabla. */
export type ErrorTipico = {
  sintoma: string
  causa: string
  arreglo: string
}

/** Recurso externo para «Para profundizar». */
export type Recurso = {
  titulo: string
  url: string
  nota?: string
}

/**
 * Ejercicio «Pruébalo tú».
 *
 * Se guarda también `inicial` y `solucion` como texto para poder mostrarlos en un
 * bloque de código normal: si Sandpack no puede instalar dependencias (red, CDN),
 * el ejercicio sigue siendo útil como lectura y como punto de partida local.
 */
export type Ejercicio = {
  /** Qué debe conseguir el alumno, en una frase imperativa. */
  reto: string
  /** Código de partida que se carga en el editor. */
  inicial: string
  /** Solución de referencia, también visible si el alumno la despliega. */
  solucion: string
  /** Pistas progresivas. */
  pistas?: string[]
  /** Ficheros adicionales para Sandpack, por ruta. */
  archivos?: Record<string, string>
}

export type Leccion = {
  /** Identificador estable y legible en la URL: `0.1`, `8.9`, `14.C`. */
  id: string
  modulo: number
  titulo: string
  /** 1-2 frases: qué sabrá hacer el alumno al terminar. */
  objetivo: string
  nivel: Nivel
  /** Minutos estimados de trabajo real (leer + ejercitar). */
  minutos: number
  bloques: Bloque[]
  errores: ErrorTipico[]
  quiz: Pregunta[]
  recursos: Recurso[]
  ejercicio?: Ejercicio
}

export type Modulo = {
  numero: number
  titulo: string
  /** Una frase que vende el módulo, usada en la portada y en la navegación. */
  descripcion: string
  lecciones: Leccion[]
}

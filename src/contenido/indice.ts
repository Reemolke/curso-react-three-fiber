import { modulos } from './modulos'
import type { Leccion, Modulo } from './tipos'

export { modulos }

/** Todas las lecciones en orden de curso. */
export const todasLasLecciones: Leccion[] = modulos.flatMap((m) => m.lecciones)

/** Índice id → lección, para resolver rutas en O(1). */
const porId = new Map(todasLasLecciones.map((l) => [l.id, l]))

/** Índice numero de módulo → módulo. */
const modulosPorNumero = new Map(modulos.map((m) => [m.numero, m]))

export function buscarLeccion(id: string): Leccion | undefined {
  return porId.get(id)
}

export function buscarModulo(numero: number): Modulo | undefined {
  return modulosPorNumero.get(numero)
}

export function moduloDeLeccion(id: string): Modulo | undefined {
  const leccion = porId.get(id)
  return leccion ? modulosPorNumero.get(leccion.modulo) : undefined
}

export function posicionDeLeccion(id: string): number {
  return todasLasLecciones.findIndex((l) => l.id === id)
}

export function leccionSiguiente(id: string): Leccion | undefined {
  const posicion = posicionDeLeccion(id)
  if (posicion < 0) return undefined
  return todasLasLecciones[posicion + 1]
}

export function leccionAnterior(id: string): Leccion | undefined {
  const posicion = posicionDeLeccion(id)
  if (posicion <= 0) return undefined
  return todasLasLecciones[posicion - 1]
}

/** Primera lección no completada, siguiendo el orden del curso. */
export function siguientePendiente(completadas: Record<string, string>): Leccion {
  return todasLasLecciones.find((l) => !completadas[l.id]) ?? todasLasLecciones[0]
}

export type ProgresoModulo = {
  completadas: number
  total: number
  porcentaje: number
}

export function progresoDeModulo(
  modulo: Modulo,
  completadas: Record<string, string>,
): ProgresoModulo {
  const total = modulo.lecciones.length
  const hechas = modulo.lecciones.filter((l) => completadas[l.id]).length
  return {
    completadas: hechas,
    total,
    porcentaje: total === 0 ? 0 : Math.round((hechas / total) * 100),
  }
}

export function progresoGlobal(completadas: Record<string, string>): ProgresoModulo & {
  minutosTotales: number
  minutosHechos: number
} {
  const total = todasLasLecciones.length
  const hechas = todasLasLecciones.filter((l) => completadas[l.id])
  const minutosTotales = todasLasLecciones.reduce((suma, l) => suma + l.minutos, 0)
  const minutosHechos = hechas.reduce((suma, l) => suma + l.minutos, 0)
  return {
    completadas: hechas.length,
    total,
    porcentaje: total === 0 ? 0 : Math.round((hechas.length / total) * 100),
    minutosTotales,
    minutosHechos,
  }
}

/** Minutos totales del curso, para la portada. */
export const minutosDelCurso = todasLasLecciones.reduce((suma, l) => suma + l.minutos, 0)

export type ResultadoBusqueda = {
  leccion: Leccion
  modulo: Modulo
  /** Fragmento de texto donde aparece la coincidencia, si no está en el título. */
  contexto?: string
}

/**
 * Búsqueda simple sobre títulos, objetivos y texto de los bloques.
 * Sin índice invertido: son ~100 lecciones y el corpus es pequeño.
 */
export function buscarEnCurso(consulta: string): ResultadoBusqueda[] {
  const q = normalizar(consulta)
  if (q.length < 2) return []

  const resultados: ResultadoBusqueda[] = []

  for (const modulo of modulos) {
    for (const leccion of modulo.lecciones) {
      const enTitulo = normalizar(leccion.titulo).includes(q)
      const enObjetivo = normalizar(leccion.objetivo).includes(q)
      const enId = leccion.id.startsWith(q)
      let contexto: string | undefined

      if (!enTitulo && !enObjetivo && !enId) {
        contexto = textoDondeAparece(leccion, q)
        if (!contexto) continue
      }

      resultados.push({ leccion, modulo, contexto })
    }
  }

  // Prioriza coincidencias en el título.
  return resultados.sort((a, b) => {
    const aTitulo = normalizar(a.leccion.titulo).includes(q) ? 0 : 1
    const bTitulo = normalizar(b.leccion.titulo).includes(q) ? 0 : 1
    return aTitulo - bTitulo
  })
}

function normalizar(texto: string): string {
  return texto
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim()
}

function textoDondeAparece(leccion: Leccion, q: string): string | undefined {
  for (const bloque of leccion.bloques) {
    const texto = textoDeBloque(bloque)
    if (!texto) continue
    const indice = normalizar(texto).indexOf(q)
    if (indice >= 0) {
      const desde = Math.max(0, indice - 45)
      return (desde > 0 ? '… ' : '') + texto.slice(desde, indice + 70).trim() + ' …'
    }
  }
  return undefined
}

function textoDeBloque(bloque: Leccion['bloques'][number]): string | undefined {
  switch (bloque.tipo) {
    case 'parrafo':
      return bloque.texto
    case 'destacado':
      return `${bloque.titulo ?? ''} ${bloque.texto}`
    case 'lista':
      return bloque.items.join(' ')
    case 'pasos':
      return bloque.items.map((i) => `${i.titulo} ${i.texto}`).join(' ')
    case 'checkpoint':
      return bloque.items.join(' ')
    case 'codigo':
      return bloque.codigo
    default:
      return undefined
  }
}

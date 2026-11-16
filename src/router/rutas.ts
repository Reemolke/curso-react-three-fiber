/**
 * Router propio basado en hash.
 *
 * ¿Por qué a mano y no react-router?
 * - Cero dependencias: un curso que enseña a montar una app no debería arrastrar
 *   otra librería solo para 8 rutas.
 * - Funciona igual en Vercel, Netlify y GitHub Pages sin rewrites ni 404.html,
 *   porque todo vive detrás de `#`.
 * - Son ~70 líneas legibles: el alumno puede leer el código de la web que usa.
 */

export type Ruta =
  | { nombre: 'inicio' }
  | { nombre: 'leccion'; id: string }
  | { nombre: 'modulo'; numero: number }
  | { nombre: 'playground' }
  | { nombre: 'visor' }
  | { nombre: 'proyecto' }
  | { nombre: 'progreso' }
  | { nombre: 'creditos' }
  | { nombre: 'no-encontrada'; ruta: string }

export function parsearRuta(hash: string): Ruta {
  const limpio = decodeURIComponent(hash.replace(/^#/, '').split('?')[0] ?? '')
  const partes = limpio.split('/').filter(Boolean)

  if (partes.length === 0) return { nombre: 'inicio' }

  const [primera, segunda] = partes

  switch (primera) {
    case 'leccion':
      return segunda ? { nombre: 'leccion', id: segunda } : { nombre: 'inicio' }
    case 'modulo': {
      const numero = Number(segunda)
      return Number.isFinite(numero) ? { nombre: 'modulo', numero } : { nombre: 'inicio' }
    }
    case 'playground':
      return { nombre: 'playground' }
    case 'visor':
      return { nombre: 'visor' }
    case 'proyecto':
    case 'proyecto-final':
      return { nombre: 'proyecto' }
    case 'progreso':
      return { nombre: 'progreso' }
    case 'creditos':
      return { nombre: 'creditos' }
    default:
      return { nombre: 'no-encontrada', ruta: limpio }
  }
}

export function rutaAHash(ruta: Ruta): string {
  switch (ruta.nombre) {
    case 'inicio':
      return '#/'
    case 'leccion':
      return `#/leccion/${ruta.id}`
    case 'modulo':
      return `#/modulo/${ruta.numero}`
    case 'proyecto':
      return '#/proyecto'
    default:
      return `#/${ruta.nombre}`
  }
}

export function enlaceLeccion(id: string): string {
  return `#/leccion/${id}`
}

export function enlaceModulo(numero: number): string {
  return `#/modulo/${numero}`
}

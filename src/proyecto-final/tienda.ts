import { create } from 'zustand'

/**
 * Estado global del Taller K-7.
 *
 * Es la pieza que une la interfaz HTML con la escena 3D, y por eso está fuera de
 * las dos: ningún componente la posee. La lección 13.1 explica el porqué; aquí
 * se aplica sin adornos.
 *
 * Regla que se respeta en todo el proyecto: **la tienda no importa `three`**.
 * Guarda cadenas, booleanos y números. Convertir eso en vectores y colores es
 * trabajo de la capa de escena.
 */

/** Los cuatro módulos intercambiables del rover. */
export type Modulo = 'ruedas' | 'panel' | 'brazo' | 'antena'

/** Presets de cámara. Cada uno enfoca una parte del rover. */
export type Vista = 'general' | 'ruedas' | 'panel' | 'brazo'

export const MODULOS: Modulo[] = ['ruedas', 'panel', 'brazo', 'antena']

/**
 * Ficha técnica de cada módulo.
 *
 * Los números no son decorativos: la interfaz los suma y los muestra, así que el
 * alumno ve que el estado global sirve para algo más que para pintar un botón.
 */
export const FICHA: Record<Modulo, { nombre: string; nodos: string[]; kg: number; w: number }> = {
  ruedas: {
    nombre: 'Tren de ruedas',
    nodos: [
      'rueda_del_izq',
      'rueda_del_der',
      'rueda_tras_izq',
      'rueda_tras_der',
      'buje_del_izq',
      'buje_del_der',
      'buje_tras_izq',
      'buje_tras_der',
    ],
    kg: 12.4,
    w: 8,
  },
  panel: {
    nombre: 'Panel solar',
    nodos: ['panel_pivote'],
    kg: 9.1,
    w: -30,
  },
  brazo: {
    nombre: 'Brazo robótico',
    nodos: ['brazo_base', 'brazo_art1', 'brazo_art2', 'pinza_izq', 'pinza_der'],
    kg: 6.8,
    w: 14,
  },
  antena: {
    nombre: 'Antena de banda X',
    nodos: ['antena_mastil', 'antena_plato'],
    kg: 3.2,
    w: 5,
  },
}

/** Peso y consumo del chasis sin módulos. */
export const BASE = { kg: 48.2, w: 22 }

type Tienda = {
  modulos: Record<Modulo, boolean>
  /** Nombre del nodo del rover bajo el cursor o seleccionado. */
  seleccion: string | null
  vista: Vista
  /** Cambia cada vez que se pide volar a una vista, aunque sea la misma. */
  viaje: number
  alternarModulo: (modulo: Modulo) => void
  seleccionar: (nodo: string | null) => void
  irA: (vista: Vista) => void
  reiniciar: () => void
}

const TODOS: Record<Modulo, boolean> = { ruedas: true, panel: true, brazo: true, antena: true }

export const useTaller = create<Tienda>((set) => ({
  modulos: { ...TODOS },
  seleccion: null,
  vista: 'general',
  viaje: 0,
  alternarModulo: (modulo) =>
    set((estado) => ({
      modulos: { ...estado.modulos, [modulo]: !estado.modulos[modulo] },
    })),
  seleccionar: (nodo) => set({ seleccion: nodo }),
  irA: (vista) => set((estado) => ({ vista, viaje: estado.viaje + 1 })),
  reiniciar: () => set((estado) => ({ modulos: { ...TODOS }, seleccion: null, vista: 'general', viaje: estado.viaje + 1 })),
}))

/** Suma la ficha técnica de los módulos montados. Función pura, fuera de React. */
export function calcularFicha(modulos: Record<Modulo, boolean>) {
  const montados = MODULOS.filter((modulo) => modulos[modulo])
  return {
    kg: BASE.kg + montados.reduce((total, modulo) => total + FICHA[modulo].kg, 0),
    w: BASE.w + montados.reduce((total, modulo) => total + FICHA[modulo].w, 0),
    montados: montados.length,
  }
}

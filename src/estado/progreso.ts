import { create } from 'zustand'
import { persist } from 'zustand/middleware'

/**
 * Progreso del alumno, persistido en localStorage.
 *
 * ¿Por qué Zustand y no Context? Porque el curso enseña Zustand en el módulo 13
 * y sería incoherente usar otra cosa en la propia web. Además `persist` evita
 * escribir a mano el JSON y la migración de versión.
 */

export type Tema = 'oscuro' | 'claro'

export type ResultadoQuiz = {
  aciertos: number
  total: number
  /** ISO date del último intento. */
  fecha: string
}

type EstadoProgreso = {
  /** Lecciones marcadas como completadas, con fecha. */
  completadas: Record<string, string>
  /** Último resultado de cada quiz, por id de lección. */
  quizzes: Record<string, ResultadoQuiz>
  /** Fases del proyecto final completadas (`A`…`H`). */
  fases: Record<string, boolean>
  /** Preferencia de tema. Se guarda aquí para no crear otro store. */
  tema: Tema

  marcarCompletada: (id: string, completada?: boolean) => void
  guardarQuiz: (id: string, aciertos: number, total: number) => void
  marcarFase: (fase: string, completada: boolean) => void
  alternarTema: () => void
  reiniciar: () => void
}

export const useProgreso = create<EstadoProgreso>()(
  persist(
    (set) => ({
      completadas: {},
      quizzes: {},
      fases: {},
      tema: 'oscuro',

      marcarCompletada: (id, completada = true) =>
        set((estado) => {
          const siguiente = { ...estado.completadas }
          if (completada) siguiente[id] = new Date().toISOString()
          else delete siguiente[id]
          return { completadas: siguiente }
        }),

      guardarQuiz: (id, aciertos, total) =>
        set((estado) => {
          const anterior = estado.quizzes[id]
          // Solo se guarda el mejor intento, pero siempre se actualiza la fecha.
          const mejor =
            anterior && anterior.aciertos / anterior.total > aciertos / total
              ? anterior.aciertos
              : aciertos
          return {
            quizzes: {
              ...estado.quizzes,
              [id]: { aciertos: mejor, total, fecha: new Date().toISOString() },
            },
          }
        }),

      marcarFase: (fase, completada) =>
        set((estado) => ({ fases: { ...estado.fases, [fase]: completada } })),

      alternarTema: () =>
        set((estado) => ({ tema: estado.tema === 'oscuro' ? 'claro' : 'oscuro' })),

      reiniciar: () => set({ completadas: {}, quizzes: {}, fases: {} }),
    }),
    {
      name: 'curso-r3f-progreso',
      version: 1,
      partialize: (estado) => ({
        completadas: estado.completadas,
        quizzes: estado.quizzes,
        fases: estado.fases,
        tema: estado.tema,
      }),
    },
  ),
)

/** Aplica el tema al `<html>`. Se llama desde un efecto en `App`. */
export function aplicarTema(tema: Tema): void {
  const raiz = document.documentElement
  raiz.classList.toggle('dark', tema === 'oscuro')
  raiz.style.colorScheme = tema === 'oscuro' ? 'dark' : 'light'
}

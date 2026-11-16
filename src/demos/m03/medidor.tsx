import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'

/**
 * Mide los frames realmente dibujados y los publica dos veces por segundo.
 *
 * Se usa en las demos del módulo 3 para que el alumno vea el coste de `dpr`, de
 * los segmentos de una geometría o de un material físico. Es una medición local
 * y ruidosa: depende de la pantalla, de la GPU y de lo que haga el resto del
 * navegador. Sirve para comparar dentro de la misma demo, no como nota.
 */
export function MedidorFps({ alMedir }: { alMedir: (fps: number) => void }) {
  const tiempo = useRef(0)
  const frames = useRef(0)

  useFrame((_, delta) => {
    tiempo.current += delta
    frames.current += 1

    if (tiempo.current >= 0.5) {
      alMedir(Math.round(frames.current / tiempo.current))
      tiempo.current = 0
      frames.current = 0
    }
  })

  return null
}

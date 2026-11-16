import { useGLTF } from '@react-three/drei'
import { DRACO } from './rutas'

/**
 * Punto único de carga de modelos.
 *
 * Los `.glb` del curso están comprimidos con Draco, y el decodificador tiene que
 * salir de `public/draco/`, no de un CDN: la web funciona sin red y en GitHub
 * Pages con un `base` relativo. Se configura una vez, aquí, antes de que ningún
 * componente llame a `useGLTF`.
 */
useGLTF.setDecoderPath(DRACO)

export { useGLTF }

/** Lanza la descarga antes de montar el componente que la necesita. */
export function precargarModelo(url: string): void {
  useGLTF.preload(url, true)
}

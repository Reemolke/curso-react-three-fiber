import { useCallback, useEffect, useState } from 'react'
import { parsearRuta, type Ruta } from './rutas'

/**
 * Se suscribe a `hashchange` y devuelve la ruta actual ya tipada.
 * También expone `navegar`, que es un `location.hash = ...` con esteroides.
 */
export function useRuta(): { ruta: Ruta; navegar: (hash: string) => void } {
  const [ruta, setRuta] = useState<Ruta>(() => parsearRuta(window.location.hash))

  useEffect(() => {
    const alCambiar = () => setRuta(parsearRuta(window.location.hash))
    window.addEventListener('hashchange', alCambiar)
    return () => window.removeEventListener('hashchange', alCambiar)
  }, [])

  const navegar = useCallback((hash: string) => {
    if (window.location.hash === hash) return
    window.location.hash = hash
  }, [])

  return { ruta, navegar }
}

import { useMemo, useState } from 'react'
import { Marco, GrupoOpciones } from '../marco'

type Fila = { nombre: string; original: number; draco: number }

/**
 * Cifras medidas con `npm run assets:optimizar` + `inspeccionar.mjs`.
 *
 * «Original» es el GLB recién generado; «Draco» es después de dedup, prune y
 * compresión Draco a 14/10/12 bits. No se mezclan con el conteo de triángulos
 * por instancia: aquí solo se comparan pesos de archivo.
 */
const FILAS: Fila[] = [
  { nombre: 'rover', original: 83.4, draco: 16.8 },
  { nombre: 'taller', original: 123.8, draco: 19.9 },
  { nombre: 'lampara', original: 52.6, draco: 10.5 },
  { nombre: 'caja', original: 21.1, draco: 5.3 },
  { nombre: 'tuerca', original: 7.8, draco: 1.6 },
  { nombre: 'robot', original: 37.7, draco: 11.9 },
]

type Orden = 'nombre' | 'ahorro'

const ORDENES: { valor: Orden; texto: string }[] = [
  { valor: 'nombre', texto: 'por nombre' },
  { valor: 'ahorro', texto: 'por ahorro' },
]

function ahorro(fila: Fila): number {
  return 1 - fila.draco / fila.original
}

export default function Optimizar() {
  const [orden, setOrden] = useState<Orden>('nombre')

  const filas = useMemo(() => {
    const copia = [...FILAS]
    if (orden === 'ahorro') copia.sort((a, b) => ahorro(b) - ahorro(a))
    return copia
  }, [orden])

  const totalOriginal = FILAS.reduce((suma, fila) => suma + fila.original, 0)
  const totalDraco = FILAS.reduce((suma, fila) => suma + fila.draco, 0)
  const maximo = Math.max(...FILAS.map((fila) => fila.original))

  return (
    <Marco titulo="Peso real antes y después de Draco">
      <div className="space-y-3 p-3">
        <div className="flex flex-wrap items-center gap-2">
          <GrupoOpciones etiqueta="orden" valor={orden} opciones={ORDENES} onChange={setOrden} />
          <span className="ml-auto font-mono text-xs text-texto">
            {(totalOriginal / 1024).toFixed(2)} MB → {(totalDraco / 1024).toFixed(2)} MB
          </span>
        </div>

        <ul className="space-y-2">
          {filas.map((fila) => {
            const porcentaje = Math.round(ahorro(fila) * 100)
            return (
              <li key={fila.nombre} className="space-y-1">
                <div className="flex items-baseline justify-between gap-2 font-mono text-[11px]">
                  <span className="text-texto">{fila.nombre}</span>
                  <span className="text-texto-suave">
                    {fila.original.toFixed(1)} KB → {fila.draco.toFixed(1)} KB · −{porcentaje} %
                  </span>
                </div>
                <div className="relative h-3 overflow-hidden rounded-sm bg-fondo-alto">
                  <div
                    className="absolute inset-y-0 left-0 bg-borde-fuerte/60"
                    style={{ width: `${(fila.original / maximo) * 100}%` }}
                  />
                  <div
                    className="absolute inset-y-0 left-0 bg-acento"
                    style={{ width: `${(fila.draco / maximo) * 100}%` }}
                  />
                </div>
              </li>
            )
          })}
        </ul>

        <div className="rounded-lg border border-borde px-2.5 py-2 text-[11px] leading-relaxed text-texto-suave">
          <p>
            <span className="text-texto">Gris:</span> GLB generado.{' '}
            <span className="text-texto">Ámbar:</span> tras dedup + prune + Draco.
          </p>
          <p className="mt-1 text-texto-tenue">
            KTX2 no está medido: este entorno no tiene `toktx` ni KTX-Software, así que no hay
            cifras que dar. La lección 8.9 explica los comandos y por qué no se inventan números.
          </p>
        </div>
      </div>
    </Marco>
  )
}

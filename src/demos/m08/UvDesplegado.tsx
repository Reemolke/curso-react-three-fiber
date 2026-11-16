import { useState } from 'react'
import { Marco, GrupoOpciones } from '../marco'

type Caso = 'correcto' | 'estirado' | 'solapado'

const CASOS: { valor: Caso; texto: string }[] = [
  { valor: 'correcto', texto: 'correcto' },
  { valor: 'estirado', texto: 'estirado' },
  { valor: 'solapado', texto: 'solapado' },
]

/**
 * Diagrama del desplegado de una caja.
 *
 * Una caja son seis caras. Si el desplegado está bien, ninguna se estira y
 * ninguna comparte píxeles con otra. Los dos casos malos son los que se ven en
 * cualquier modelo descargado: una cara ocupa el doble de ancho del que le toca,
 * o dos caras caen en la misma región y se pintan a la vez.
 */
export default function UvDesplegado() {
  const [caso, setCaso] = useState<Caso>('correcto')

  const ancho = caso === 'estirado' ? 96 : 48
  const solapa = caso === 'solapado'

  return (
    <Marco titulo="El mismo desplegado, tres resultados">
      <div className="space-y-3 p-3">
        <GrupoOpciones etiqueta="desplegado" valor={caso} opciones={CASOS} onChange={setCaso} />

        <svg viewBox="0 0 240 150" className="mx-auto block w-full max-w-md" role="img" aria-label={`Desplegado de caja: ${caso}`}>
          <rect x="8" y="8" width="224" height="134" rx="6" fill="#0f1420" stroke="#2b3554" />

          {/* Cruz de seis caras: la textura es el cuadrado completo. */}
          <g strokeWidth="1.5">
            {/* Arriba */}
            <rect x="86" y="20" width="48" height="34" fill="#1d2a44" stroke={solapa ? '#e0574f' : '#4d8df6'} />
            {/* Centro (ancho variable en el caso estirado) */}
            <rect x="86" y="54" width={ancho} height="34" fill="#22314f" stroke={solapa ? '#e0574f' : '#4d8df6'} />
            {/* Abajo, si hay solape pisa el centro */}
            <rect
              x={solapa ? 110 : 86}
              y="88"
              width="48"
              height="34"
              fill={solapa ? '#3a1f2a' : '#1d2a44'}
              stroke={solapa ? '#e0574f' : '#4d8df6'}
            />
            {/* Izquierda y derecha */}
            <rect x="38" y="54" width="48" height="34" fill="#1d2a44" stroke="#4d8df6" />
            <rect
              x={caso === 'estirado' ? 182 : 134}
              y="54"
              width="48"
              height="34"
              fill={caso === 'estirado' ? '#3a2a1a' : '#1d2a44'}
              stroke={caso === 'estirado' ? '#f5a524' : '#4d8df6'}
            />

            {solapa && (
              <text x="140" y="107" fill="#e0574f" fontSize="9" fontFamily="monospace">
                solape
              </text>
            )}
            {caso === 'estirado' && (
              <text x="140" y="133" fill="#f5a524" fontSize="9" fontFamily="monospace">
                estirado 2×
              </text>
            )}
          </g>

          <text x="16" y="136" fill="#8892a6" fontSize="9" fontFamily="monospace">
            {caso === 'correcto'
              ? 'seis islas, sin solape'
              : caso === 'estirado'
                ? 'una isla ocupa el doble'
                : 'dos islas comparten píxeles'}
          </text>
        </svg>

        <p className="text-xs leading-relaxed text-texto-suave">
          {caso === 'correcto' &&
            'Cada cara tiene su región y la densidad de texels es parecida. Es lo que se busca al desplegar: sin estiramientos y sin desperdiciar imagen.'}
          {caso === 'estirado' &&
            'La cara central ocupa el doble de ancho: recibe el doble de texels por unidad y el patrón se ve más fino ahí que en el resto. Se arregla con «Average Island Scale» o marcando costuras antes de desplegar.'}
          {caso === 'solapado' &&
            'Dos caras caen sobre los mismos píxeles. Al pintar una, se pinta la otra. Es el error más caro porque no se ve hasta que alguien mira la pieza desde el otro lado.'}
        </p>
      </div>
    </Marco>
  )
}

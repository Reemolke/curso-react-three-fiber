import { Suspense, lazy } from 'react'
import type { Bloque, Tono } from '../contenido/tipos'
import { demos3d, widgets } from '../demos/registro'
import { ErrorBoundary } from '../tres/ErrorBoundary'
import { Codigo } from './Codigo'
import { Texto } from './Texto'

const Visor = lazy(() => import('../visor/Visor'))

const TONOS: Record<Tono, { borde: string; fondo: string; texto: string; etiqueta: string; icono: string }> = {
  info: {
    borde: 'border-frio/40',
    fondo: 'bg-frio/5',
    texto: 'text-frio',
    etiqueta: 'Nota',
    icono: 'i',
  },
  ojo: {
    borde: 'border-aviso/40',
    fondo: 'bg-aviso/5',
    texto: 'text-aviso',
    etiqueta: 'Ojo con esto',
    icono: '!',
  },
  truco: {
    borde: 'border-exito/40',
    fondo: 'bg-exito/5',
    texto: 'text-exito',
    etiqueta: 'Truco',
    icono: '✓',
  },
  porque: {
    borde: 'border-acento/40',
    fondo: 'bg-acento/5',
    texto: 'text-acento',
    etiqueta: 'Por qué',
    icono: '?',
  },
}

export function BloqueContenido({ bloque }: { bloque: Bloque }) {
  switch (bloque.tipo) {
    case 'parrafo':
      return <p className="text-[15px] leading-7 text-texto-suave">
        <Texto>{bloque.texto}</Texto>
      </p>

    case 'destacado': {
      const tono = TONOS[bloque.tono]
      return (
        <aside className={`rounded-caja border ${tono.borde} ${tono.fondo} p-4`}>
          <p className={`flex items-center gap-2 text-xs font-semibold uppercase tracking-wider ${tono.texto}`}>
            <span
              aria-hidden
              className={`grid size-4 place-items-center rounded-full border ${tono.borde} font-mono text-[10px]`}
            >
              {tono.icono}
            </span>
            {bloque.titulo ? <Texto>{bloque.titulo}</Texto> : tono.etiqueta}
          </p>
          <p className="mt-1.5 text-sm leading-6 text-texto-suave">
            <Texto>{bloque.texto}</Texto>
          </p>
        </aside>
      )
    }

    case 'lista':
      return bloque.ordenada ? (
        <ol className="ml-5 list-decimal space-y-1.5 text-[15px] leading-7 text-texto-suave">
          {bloque.items.map((item, i) => (
            <li key={i} className="pl-1">
              {item}
            </li>
          ))}
        </ol>
      ) : (
        <ul className="space-y-1.5 text-[15px] leading-7 text-texto-suave">
          {bloque.items.map((item, i) => (
            <li key={i} className="flex gap-2.5">
              <span aria-hidden className="mt-2.5 size-1.5 shrink-0 rounded-full bg-acento/70" />
              <span>
                <Texto>{item}</Texto>
              </span>
            </li>
          ))}
        </ul>
      )

    case 'codigo':
      return (
        <Codigo
          codigo={bloque.codigo}
          lenguaje={bloque.lenguaje}
          titulo={bloque.titulo}
        />
      )

    case 'demo':
      return (
        <DemoPorId
          id={bloque.id}
          tipo="demo"
          alto={bloque.alto}
          nota={bloque.nota}
        />
      )

    case 'widget':
      return <DemoPorId id={bloque.id} tipo="widget" alto={bloque.alto} />

    case 'demo-doble':
      return (
        <div className="grid gap-4 lg:grid-cols-2">
          <DemoPorId id={bloque.izquierda} tipo="demo" alto={bloque.alto} />
          <DemoPorId id={bloque.derecha} tipo="demo" alto={bloque.alto} />
        </div>
      )

    case 'tabla':
      return (
        <div className="overflow-x-auto rounded-caja border border-borde">
          <table className="w-full border-collapse text-left text-sm">
            <thead>
              <tr className="bg-superficie-alta/60">
                {bloque.cabecera.map((celda) => (
                  <th
                    key={celda}
                    scope="col"
                    className="whitespace-nowrap px-3 py-2 text-xs font-semibold uppercase tracking-wider text-texto-tenue"
                  >
                    <Texto>{celda}</Texto>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {bloque.filas.map((fila, i) => (
                <tr key={i} className="border-t border-borde/60">
                  {fila.map((celda, j) => (
                    <td
                      key={j}
                      className={`px-3 py-2 align-top ${
                        j === 0 ? 'font-medium text-texto' : 'text-texto-suave'
                      }`}
                    >
                      <Texto>{celda}</Texto>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )

    case 'pasos':
      return (
        <ol className="space-y-4">
          {bloque.items.map((paso, i) => (
            <li key={i} className="flex gap-3">
              <span className="grid size-6 shrink-0 place-items-center rounded-full border border-acento/40 bg-acento/10 font-mono text-xs text-acento">
                {i + 1}
              </span>
              <div>
                <p className="text-sm font-semibold">
                  <Texto>{paso.titulo}</Texto>
                </p>
                <p className="mt-0.5 text-sm leading-6 text-texto-suave">
                  <Texto>{paso.texto}</Texto>
                </p>
              </div>
            </li>
          ))}
        </ol>
      )

    case 'imagen':
      return (
        <figure>
          <img
            src={bloque.src}
            alt={bloque.alt}
            loading="lazy"
            decoding="async"
            className="w-full rounded-caja border border-borde"
          />
          {bloque.pie && (
            <figcaption className="mt-2 text-center text-xs text-texto-tenue"><Texto>{bloque.pie}</Texto></figcaption>
          )}
        </figure>
      )

    case 'visor':
      return (
        <div className="rounded-caja border border-borde bg-fondo-alto p-3">
          {bloque.titulo && (
            <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-texto-tenue">
              {bloque.titulo}
            </p>
          )}
          <ErrorBoundary etiqueta="visor de modelos">
            <Suspense fallback={<Esqueleto alto={340} />}>
              <Visor compacto />
            </Suspense>
          </ErrorBoundary>
        </div>
      )

    case 'descarga':
      return (
        <div className="grid gap-2 sm:grid-cols-2">
          {bloque.archivos.map((archivo) => (
            <a
              key={archivo.href}
              href={archivo.href}
              download
              className="group flex items-center gap-3 rounded-caja border border-borde bg-superficie p-3 transition hover:border-acento/50 hover:bg-superficie-alta"
            >
              <span aria-hidden className="text-lg text-acento">
                ↓
              </span>
              <span>
                <span className="block text-sm font-medium group-hover:text-acento">
                  {archivo.nombre}
                </span>
                <span className="block text-xs text-texto-tenue"><Texto>{archivo.descripcion}</Texto></span>
              </span>
            </a>
          ))}
        </div>
      )

    case 'checkpoint':
      return (
        <div className="rounded-caja border border-exito/40 bg-exito/5 p-4">
          <p className="text-xs font-semibold uppercase tracking-wider text-exito">
            <Texto>{bloque.titulo ?? 'Checkpoint'}</Texto>
          </p>
          <ul className="mt-2 space-y-1.5 text-sm text-texto-suave">
            {bloque.items.map((item, i) => (
              <li key={i} className="flex gap-2">
                <span aria-hidden className="text-exito">
                  □
                </span>
                <Texto>{item}</Texto>
              </li>
            ))}
          </ul>
        </div>
      )
  }
}

function DemoPorId({
  id,
  tipo,
  alto,
  nota,
}: {
  id: string
  tipo: 'demo' | 'widget'
  alto?: number
  nota?: string
}) {
  const registro = tipo === 'demo' ? demos3d : widgets
  const Componente = registro[id]

  if (!Componente) {
    return (
      <div className="rounded-caja border border-error/40 bg-error/5 p-4 text-sm text-texto-suave">
        No existe ninguna demo con el id <code className="font-mono text-error">{id}</code> en{' '}
        <code className="font-mono">src/demos/registro.ts</code>.
      </div>
    )
  }

  return (
    <ErrorBoundary etiqueta={`demo ${id}`}>
      <Suspense fallback={<Esqueleto alto={alto ?? 340} />}>
        <Componente />
      </Suspense>
      {nota && <p className="mt-1 text-xs text-texto-tenue">{nota}</p>}
    </ErrorBoundary>
  )
}

function Esqueleto({ alto = 340 }: { alto?: number }) {
  return (
    <div
      style={{ height: alto }}
      className="grid animate-pulse place-items-center rounded-caja border border-borde bg-fondo-alto text-xs text-texto-tenue"
    >
      Cargando demo…
    </div>
  )
}

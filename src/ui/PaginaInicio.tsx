import {
  minutosDelCurso,
  modulos,
  progresoDeModulo,
  progresoGlobal,
  siguientePendiente,
  todasLasLecciones,
} from '../contenido/indice'
import { useProgreso } from '../estado/progreso'
import { enlaceLeccion, enlaceModulo } from '../router/rutas'
import { Texto } from './Texto'

const RUTAS = [
  {
    nombre: 'Completa',
    detalle: 'Módulos 0 → 14',
    para: 'Quien quiere dominar el ecosistema entero, del canvas al despliegue.',
  },
  {
    nombre: 'Express',
    detalle: '0, 3, 4, 5, 6, 8.1–8.5, 9, 13.1',
    para: 'Quien ya sabe three.js y quiere producir con R3F cuanto antes.',
  },
  {
    nombre: 'Solo modelos',
    detalle: '0.2, 1.2, 3.2, 7, 8, 9.3, 12.3',
    para: 'Artistas técnicos que llegan con modelos ya hechos.',
  },
  {
    nombre: 'Solo rendimiento',
    detalle: '5.1, 5.6, 12, 11.1, 13.1',
    para: 'Quien tiene una escena que ya funciona pero va lenta.',
  },
]

export function PaginaInicio() {
  const completadas = useProgreso((estado) => estado.completadas)
  const progreso = progresoGlobal(completadas)
  const siguiente = siguientePendiente(completadas)
  const empezado = progreso.completadas > 0

  return (
    <div className="mx-auto max-w-5xl px-4 pb-16 pt-8 sm:px-6 lg:px-8">
      <section className="relative overflow-hidden rounded-2xl border border-borde bg-superficie p-6 sm:p-10">
        <div aria-hidden className="fondo-plano absolute inset-0 opacity-40" />
        <div className="relative">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-acento">
            Curso práctico · en español
          </p>
          <h1 className="mt-3 max-w-2xl text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl">
            React Three Fiber, de cero a un mundo 3D interactivo
          </h1>
          <p className="mt-4 max-w-2xl text-[15px] leading-7 text-texto-suave">
            {todasLasLecciones.length} lecciones con demo en vivo, ejercicio editable, errores típicos
            y quiz. Incluye el pipeline completo de modelos 3D — Blender, glTF, Draco y KTX2 — y un
            proyecto final integrador desplegable.
          </p>

          <div className="mt-7 flex flex-wrap items-center gap-3">
            <a
              href={enlaceLeccion(siguiente.id)}
              className="rounded-lg bg-acento px-5 py-2.5 text-sm font-semibold text-fondo transition hover:bg-acento-alto"
            >
              {empezado ? `Continuar: ${siguiente.id}` : 'Empezar por el principio'}
            </a>
            <a
              href="#/proyecto"
              className="rounded-lg border border-borde px-5 py-2.5 text-sm font-medium transition hover:bg-superficie-alta"
            >
              Ver el proyecto final
            </a>
          </div>

          <dl className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {[
              { valor: String(modulos.length), etiqueta: 'módulos' },
              { valor: String(todasLasLecciones.length), etiqueta: 'lecciones' },
              { valor: `${Math.round(minutosDelCurso / 60)} h`, etiqueta: 'de trabajo' },
              { valor: `${progreso.porcentaje}%`, etiqueta: 'completado' },
            ].map((dato) => (
              <div key={dato.etiqueta}>
                <dt className="sr-only">{dato.etiqueta}</dt>
                <dd>
                  <span className="block text-2xl font-semibold tabular-nums">{dato.valor}</span>
                  <span className="text-xs uppercase tracking-wider text-texto-tenue">
                    {dato.etiqueta}
                  </span>
                </dd>
              </div>
            ))}
          </dl>

          {empezado && (
            <div className="mt-6">
              <div
                className="h-1.5 overflow-hidden rounded-full bg-borde/60"
                role="progressbar"
                aria-valuenow={progreso.porcentaje}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label="Progreso del curso"
              >
                <div
                  className="h-full rounded-full bg-acento transition-all"
                  style={{ width: `${progreso.porcentaje}%` }}
                />
              </div>
              <p className="mt-2 text-xs text-texto-tenue">
                {progreso.completadas} de {progreso.total} lecciones · {progreso.minutosHechos} min
                invertidos de {progreso.minutosTotales}
              </p>
            </div>
          )}
        </div>
      </section>

      <section className="mt-10">
        <h2 className="text-lg font-semibold">Ruta de aprendizaje recomendada</h2>
        <p className="mt-1 text-sm text-texto-suave">
          Si es tu primera vez, empieza por el módulo 0 y sigue el orden. Cada módulo da por sabido lo
          anterior.
        </p>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {RUTAS.map((ruta, i) => (
            <div
              key={ruta.nombre}
              className={`rounded-caja border p-4 ${
                i === 0 ? 'border-acento/40 bg-acento/5' : 'border-borde bg-superficie'
              }`}
            >
              <p className="text-sm font-semibold">
                {ruta.nombre}
                {i === 0 && <span className="ml-2 text-[10px] uppercase text-acento">recomendada</span>}
              </p>
              <p className="mt-1 font-mono text-[11px] text-texto-tenue">{ruta.detalle}</p>
              <p className="mt-2 text-xs leading-5 text-texto-suave">{ruta.para}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-10">
        <h2 className="text-lg font-semibold">Módulos</h2>
        <ul className="mt-4 grid gap-3 sm:grid-cols-2">
          {modulos.map((modulo) => {
            const progresoModulo = progresoDeModulo(modulo, completadas)
            return (
              <li key={modulo.numero}>
                <a
                  href={enlaceModulo(modulo.numero)}
                  className="group flex h-full flex-col rounded-caja border border-borde bg-superficie p-4 transition hover:border-acento/40 hover:bg-superficie-alta"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-mono text-[10px] uppercase tracking-widest text-texto-tenue">
                      Módulo {modulo.numero}
                    </span>
                    <span className="font-mono text-[10px] text-texto-tenue">
                      {modulo.lecciones.length} lecciones
                    </span>
                  </div>
                  <h3 className="mt-1 text-base font-semibold group-hover:text-acento">
                    <Texto>{modulo.titulo}</Texto>
                  </h3>
                  <p className="mt-1 flex-1 text-xs leading-5 text-texto-suave">{modulo.descripcion}</p>
                  <div className="mt-3 h-1 overflow-hidden rounded-full bg-borde/60">
                    <div
                      className="h-full rounded-full bg-acento"
                      style={{ width: `${progresoModulo.porcentaje}%` }}
                    />
                  </div>
                </a>
              </li>
            )
          })}
        </ul>
      </section>
    </div>
  )
}

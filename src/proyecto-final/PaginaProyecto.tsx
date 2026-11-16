import { buscarLeccion } from '../contenido/indice'
import { useProgreso } from '../estado/progreso'
import { enlaceLeccion } from '../router/rutas'
import { BloqueContenido } from '../ui/Bloques'

type Fase = {
  id: string
  titulo: string
  objetivo: string
  checkpoint: string
}

const FASES: Fase[] = [
  {
    id: 'A',
    titulo: 'Planificación y estructura',
    objetivo: 'Definir contratos de datos, carpetas y límites entre escena, estado y UI.',
    checkpoint: 'El proyecto arranca y muestra un canvas vacío con el panel de configuración.',
  },
  {
    id: 'B',
    titulo: 'Escena base, cámara y luces',
    objetivo: 'Construir el diorama del taller, encuadrarlo y resolver la iluminación con sombras.',
    checkpoint: 'Se puede orbitar el taller y las sombras caen correctamente sobre la plataforma.',
  },
  {
    id: 'C',
    titulo: 'Modelos y materiales',
    objetivo: 'Cargar el rover y el taller optimizados, con materiales PBR correctos.',
    checkpoint: 'Todos los nodos del rover se pueden listar por nombre desde la consola.',
  },
  {
    id: 'D',
    titulo: 'Interacción y estado',
    objetivo: 'Selección, hover, vuelo de cámara y panel de configuración sincronizado.',
    checkpoint: 'Elegir un módulo en el HTML cambia la escena, y al revés.',
  },
  {
    id: 'E',
    titulo: 'Animación y física',
    objetivo: 'Clips de montaje, piezas que caen y ruedas que giran con Rapier.',
    checkpoint: 'Montar un módulo dispara su clip y la pieza se asienta sin vibrar.',
  },
  {
    id: 'F',
    titulo: 'Efectos, sonido y pulido',
    objetivo: 'Postprocesado, shader de escaneo, audio posicional y transiciones.',
    checkpoint: 'Seleccionar una pieza la escanea visualmente y suena en su posición.',
  },
  {
    id: 'G',
    titulo: 'Optimización y rendimiento',
    objetivo: 'Instancing, LOD, dpr adaptativo y medición con la escena completa.',
    checkpoint: '60 fps en escritorio; menos de 30 draw calls sin contar instancias.',
  },
  {
    id: 'H',
    titulo: 'Despliegue y revisión',
    objetivo: 'Build, despliegue estático, accesibilidad y revisión final.',
    checkpoint: 'URL pública funcionando en móvil con Lighthouse ≥ 90.',
  },
]

const REQUISITOS: { requisito: string; modulo: string }[] = [
  { requisito: 'Modelos propios optimizados con Draco y KTX2, cargados con gltfjsx', modulo: '8' },
  { requisito: 'Animaciones y piezas intercambiables', modulo: '8.5 · 5.5' },
  { requisito: 'Materiales PBR, HDRI local y sombras', modulo: '4 · 7' },
  { requisito: 'Raycasting, selección y transiciones de cámara', modulo: '6' },
  { requisito: 'Física con Rapier', modulo: '10' },
  { requisito: 'Postprocesado y un shader propio', modulo: '11' },
  { requisito: 'Estado global con Zustand', modulo: '13.1' },
  { requisito: 'UI HTML sobre el canvas, sincronizada', modulo: '9.4 · 13.1' },
  { requisito: 'Audio posicional', modulo: '13.4' },
  { requisito: 'Pantalla de carga con progreso y móvil', modulo: '13.3 · 12.5' },
  { requisito: 'Rendimiento medido y documentado', modulo: '12' },
  { requisito: 'Desplegado en la web', modulo: '14.H' },
]

export function PaginaProyecto() {
  const fases = useProgreso((estado) => estado.fases)
  const marcarFase = useProgreso((estado) => estado.marcarFase)
  const hechas = FASES.filter((f) => fases[f.id]).length

  return (
    <div className="mx-auto max-w-4xl px-4 pb-16 pt-6 sm:px-6 lg:px-8">
      <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-acento">
        Proyecto final integrador
      </p>
      <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">Taller K-7</h1>
      <p className="mt-3 max-w-2xl text-[15px] leading-7 text-texto-suave">
        Un configurador-explorador de un rover lunar dentro de un taller. Eliges módulos (ruedas,
        panel solar, brazo, antena), los montas y puedes lanzar tuercas al suelo. La escena no es un
        decorado: las piezas intercambiables son el producto, la física tiene una excusa narrativa y el
        estado global es el corazón de la aplicación.
      </p>

      <div className="mt-5 flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-2 rounded-lg border border-borde bg-superficie px-3 py-2">
          <span className="font-mono text-xs text-acento">{hechas}/8</span>
          <span className="text-xs text-texto-suave">fases completadas</span>
        </div>
        <a
          href="#/visor"
          className="rounded-lg border border-borde px-3 py-2 text-xs transition hover:bg-superficie"
        >
          Abrir el visor de modelos
        </a>
      </div>

      <section className="mt-8">
        <h2 className="text-lg font-semibold">El resultado, funcionando aquí mismo</h2>
        <p className="mt-1 max-w-2xl text-sm text-texto-suave">
          Esta es la escena terminada: el mismo código que vas a escribir en las ocho fases. Pruébala
          antes de empezar para saber exactamente a dónde vas.
        </p>
        <div className="mt-3">
          <BloqueContenido bloque={{ tipo: 'demo', id: 'm14-taller' }} />
        </div>
      </section>

      <section className="mt-10">
        <h2 className="text-lg font-semibold">Las ocho fases</h2>
        <p className="mt-1 text-sm text-texto-suave">
          Cada fase es una lección guiada con código de partida, pasos y un checkpoint verificable. Marca
          la fase cuando su checkpoint pase de verdad.
        </p>

        <ol className="mt-4 space-y-2">
          {FASES.map((fase) => {
            const leccion = buscarLeccion(`14.${fase.id}`)
            const completada = Boolean(fases[fase.id])
            return (
              <li
                key={fase.id}
                className={`rounded-caja border p-4 transition ${
                  completada ? 'border-exito/40 bg-exito/5' : 'border-borde bg-superficie'
                }`}
              >
                <div className="flex items-start gap-3">
                  <button
                    type="button"
                    aria-pressed={completada}
                    aria-label={`Marcar la fase ${fase.id} como completada`}
                    onClick={() => marcarFase(fase.id, !completada)}
                    className={`mt-0.5 grid size-6 shrink-0 place-items-center rounded border font-mono text-[11px] transition ${
                      completada
                        ? 'border-exito bg-exito/20 text-exito'
                        : 'border-borde text-texto-tenue hover:border-acento/50 hover:text-acento'
                    }`}
                  >
                    {completada ? '✓' : fase.id}
                  </button>

                  <div className="min-w-0 flex-1">
                    <h3 className="text-sm font-semibold">
                      Fase {fase.id} — {fase.titulo}
                    </h3>
                    <p className="mt-1 text-xs leading-5 text-texto-suave">{fase.objetivo}</p>
                    <p className="mt-2 rounded-md bg-fondo-alto/70 px-2 py-1.5 text-xs text-texto-tenue">
                      <span className="font-semibold text-texto-suave">Checkpoint: </span>
                      {fase.checkpoint}
                    </p>
                    {leccion && (
                      <a
                        href={enlaceLeccion(leccion.id)}
                        className="mt-2 inline-block text-xs text-frio hover:underline"
                      >
                        Ir a la lección {leccion.id} →
                      </a>
                    )}
                  </div>
                </div>
              </li>
            )
          })}
        </ol>
      </section>

      <section className="mt-10">
        <h2 className="text-lg font-semibold">Qué módulo usa cada parte</h2>
        <p className="mt-1 text-sm text-texto-suave">
          Nada del proyecto es nuevo: todo se ha practicado antes en una lección.
        </p>
        <div className="mt-3 overflow-x-auto rounded-caja border border-borde">
          <table className="w-full border-collapse text-left text-sm">
            <thead>
              <tr className="bg-superficie-alta/60">
                <th scope="col" className="px-3 py-2 text-xs uppercase tracking-wider text-texto-tenue">
                  Parte del proyecto
                </th>
                <th scope="col" className="px-3 py-2 text-xs uppercase tracking-wider text-texto-tenue">
                  Módulos
                </th>
              </tr>
            </thead>
            <tbody>
              {REQUISITOS.map((fila) => (
                <tr key={fila.requisito} className="border-t border-borde/60">
                  <td className="px-3 py-2 text-texto-suave">{fila.requisito}</td>
                  <td className="whitespace-nowrap px-3 py-2 font-mono text-xs text-acento">{fila.modulo}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mt-10 rounded-caja border border-borde bg-superficie p-4">
        <h2 className="text-sm font-semibold">Retos extra (opcionales)</h2>
        <ul className="mt-2 space-y-1.5 text-xs text-texto-suave">
          {[
            'Modo noche: se apagan las luces y solo iluminan el panel solar y las luces de estado.',
            'Segundo rover lado a lado con <View> y un único canvas.',
            'Guardar la configuración en la URL para compartirla.',
            'Recorrido cinematográfico de cámara con CatmullRomCurve3.',
            'Editor de piezas: subir un .glb propio y asignarlo a un slot.',
          ].map((reto) => (
            <li key={reto} className="flex gap-2">
              <span aria-hidden className="text-acento">
                +
              </span>
              {reto}
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}

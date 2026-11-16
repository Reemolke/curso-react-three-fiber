import { useState } from 'react'
import { Marco } from '../marco'

type Capa = {
  id: string
  nombre: string
  carpeta: string
  papel: string
  permite: string
  prohibe: string
  ejemplo: string
  nodos: { nombre: string; detalle: string }[]
}

/**
 * Las cuatro capas del proyecto final, de arriba abajo.
 *
 * La regla es la de siempre en arquitectura de software: las flechas van en un
 * solo sentido. Una capa puede importar de la de debajo; nunca de la de arriba.
 * Cuando el sentido se rompe, el proyecto se convierte en un círculo de imports.
 */
const CAPAS: Capa[] = [
  {
    id: 'entrada',
    nombre: 'Entrada',
    carpeta: 'src/main.tsx · src/App.tsx',
    papel: 'Monta la aplicación, decide la ruta y envuelve todo en los proveedores.',
    permite: 'Pantallas, estado global, contenido estático.',
    prohibe: 'Nada de escena ni de three. Aquí no se importa `three` jamás.',
    ejemplo: `// App.tsx: solo enruta y provee
export function App() {
  return (
    <ProveedorProgreso>
      <Rutas />
    </ProveedorProgreso>
  )
}`,
    nodos: [
      { nombre: 'main.tsx', detalle: 'createRoot y StrictMode' },
      { nombre: 'App.tsx', detalle: 'router por hash y providers' },
      { nombre: 'Rutas', detalle: 'tabla de pantallas' },
    ],
  },
  {
    id: 'pantallas',
    nombre: 'Pantallas',
    carpeta: 'src/ui · src/paginas',
    papel: 'Componen la interfaz: barra lateral, lección, playground, visor, proyecto.',
    permite: 'Componentes de escena, estado, contenido. Siempre a través de props o tienda.',
    prohibe: 'No crean objetos de three (`new Mesh`, `new Vector3`) ni deciden materiales.',
    ejemplo: `// Una pantalla no sabe de three: pide datos y los pinta
<DemoEscena titulo="..." controles={<PanelAltura />}>
  <Escena altura={altura} />
</DemoEscena>`,
    nodos: [
      { nombre: 'Leccion.tsx', detalle: 'bloques y demos' },
      { nombre: 'BarraLateral.tsx', detalle: 'navegación y progreso' },
      { nombre: 'PaginaProyecto.tsx', detalle: 'fases del capstone' },
    ],
  },
  {
    id: 'escena',
    nombre: 'Escena',
    carpeta: 'src/tres · src/demos',
    papel: 'Todo lo que vive dentro del `<Canvas>`: mallas, luces, materiales, animación.',
    permite: 'Estado global (lectura), utilidades de datos, assets por `rutas.ts`.',
    prohibe: 'No renderiza HTML dentro del canvas ni importa pantallas completas.',
    ejemplo: `// La escena recibe datos y devuelve objetos 3D
function Escena({ altura }: { altura: number }) {
  return <mesh position-y={altura / 2}>{/* ... */}</mesh>
}`,
    nodos: [
      { nombre: 'DemoCanvas.tsx', detalle: 'lazy, pausa, error boundary' },
      { nombre: 'rutas.ts', detalle: 'única fuente de rutas de assets' },
      { nombre: 'gltf.ts', detalle: 'decoder de Draco configurado una vez' },
    ],
  },
  {
    id: 'datos',
    nombre: 'Datos y estado',
    carpeta: 'src/estado · src/contenido',
    papel: 'Estado global, persistencia y contenido. No sabe que existe una escena.',
    permite: 'Solo tipos y utilidades puras. `localStorage` en un único sitio.',
    prohibe: 'Ningún import de React Three Fiber, drei ni three.',
    ejemplo: `// Una tienda no conoce la escena: guarda datos
export const useTienda = create<Tienda>((set) => ({
  color: '#6ea8fe',
  fijarColor: (color) => set({ color }),
}))`,
    nodos: [
      { nombre: 'progreso.ts', detalle: 'lecciones, quiz y capstone' },
      { nombre: 'contenido/', detalle: 'lecciones como datos' },
      { nombre: 'tienda.ts', detalle: 'selección y configuración' },
    ],
  },
]

/**
 * Arquitectura navegable.
 *
 * Sin WebGL a propósito: la lección va de dónde poner cada archivo, no de
 * renderizar. Se elige una capa y el mapa marca a quién puede llamar.
 */
export default function Arquitectura() {
  const [activa, setActiva] = useState<string>('escena')
  const capa = CAPAS.find((item) => item.id === activa) ?? CAPAS[0]
  const indice = CAPAS.indexOf(capa)

  // Una capa puede importar de sí misma o de las de debajo.
  const permitida = (otra: Capa) => CAPAS.indexOf(otra) >= indice

  return (
    <Marco titulo="Las cuatro capas y el sentido de las flechas">
      <div className="w-full space-y-4 p-3">
        <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
          {CAPAS.map((item, posicion) => {
            const esActiva = item.id === capa.id
            const alcanzable = permitida(item)
            return (
              <button
                key={item.id}
                type="button"
                aria-pressed={esActiva}
                onClick={() => setActiva(item.id)}
                className={`rounded-xl border p-2.5 text-left transition ${
                  esActiva
                    ? 'border-acento bg-acento/10'
                    : alcanzable
                      ? 'border-borde bg-superficie/60 hover:border-acento/50'
                      : 'border-borde/60 bg-fondo/40 opacity-45'
                }`}
              >
                <div className="flex items-baseline justify-between">
                  <span className="text-xs font-semibold text-texto">{item.nombre}</span>
                  <span className="font-mono text-[10px] text-texto-tenue">{posicion + 1}</span>
                </div>
                <p className="mt-0.5 font-mono text-[10px] leading-tight text-texto-tenue">
                  {item.carpeta}
                </p>
              </button>
            )
          })}
        </div>

        <div className="grid gap-3 lg:grid-cols-[1.05fr_1fr]">
          <div className="space-y-2 rounded-xl border border-borde bg-fondo/50 p-3">
            <p className="text-sm leading-relaxed text-texto-suave">{capa.papel}</p>
            <dl className="space-y-1.5 text-xs">
              <div className="flex gap-2">
                <dt className="w-16 shrink-0 uppercase tracking-wider text-texto-tenue">puede</dt>
                <dd className="text-exito">{capa.permite}</dd>
              </div>
              <div className="flex gap-2">
                <dt className="w-16 shrink-0 uppercase tracking-wider text-texto-tenue">nunca</dt>
                <dd className="text-aviso">{capa.prohibe}</dd>
              </div>
            </dl>
            <div className="flex flex-wrap gap-1.5 pt-1">
              {capa.nodos.map((nodo) => (
                <span
                  key={nodo.nombre}
                  title={nodo.detalle}
                  className="rounded-md border border-borde bg-superficie px-2 py-1 font-mono text-[10px] text-texto-suave"
                >
                  {nodo.nombre}
                </span>
              ))}
            </div>
          </div>

          <pre className="overflow-x-auto rounded-xl border border-borde bg-[#0b1020] p-3 font-mono text-[11px] leading-relaxed text-[#c8d3f5]">
            {capa.ejemplo}
          </pre>
        </div>

        <p className="text-xs leading-relaxed text-texto-tenue">
          Al elegir una capa se iluminan las que puede importar y se apagan las de arriba. La
          entrada en gris no es un defecto: es la señal de que el import invertido está prohibido.
        </p>
      </div>
    </Marco>
  )
}

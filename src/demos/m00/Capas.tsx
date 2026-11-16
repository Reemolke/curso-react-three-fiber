import { useState } from 'react'
import { Marco } from '../marco'

type Capa = {
  id: string
  nombre: string
  etiqueta: string
  resumen: string
  hace: string[]
  noHace: string
}

const CAPAS: Capa[] = [
  {
    id: 'react',
    nombre: 'React',
    etiqueta: 'Capa 3 · tu código',
    resumen:
      'Describe la interfaz con componentes, props y estado. No sabe nada de 3D: solo sabe que hay que pintar algo y volver a pintarlo cuando cambie el estado.',
    hace: [
      'Mantiene el estado (qué está seleccionado, qué color tiene la pieza)',
      'Decide cuándo un componente debe volver a renderizar',
      'Gestiona eventos de la interfaz HTML: botones, paneles, formularios',
    ],
    noHace: 'No habla con la GPU ni conoce el concepto de escena, cámara o material.',
  },
  {
    id: 'r3f',
    nombre: 'React Three Fiber',
    etiqueta: 'Capa 2 · el traductor',
    resumen:
      'Es un renderer de React, como react-dom, pero en vez de crear etiquetas del DOM crea objetos de three.js. Traduce <mesh> a new THREE.Mesh() y las props a setters.',
    hace: [
      'Convierte tu JSX en un grafo de objetos three.js',
      'Sincroniza props y estado con las propiedades reales',
      'Libera geometrías y materiales cuando un componente desaparece',
      'Te da hooks: useFrame, useThree, useLoader',
    ],
    noHace: 'No dibuja nada por sí mismo: delega el dibujo en three.js.',
  },
  {
    id: 'three',
    nombre: 'three.js',
    etiqueta: 'Capa 1 · el motor',
    resumen:
      'Construye la escena, la cámara y los materiales, y decide cómo se ve la luz. Cuando llega el momento, emite las llamadas de dibujo a WebGL.',
    hace: [
      'Calcula matrices de transformación y frustum culling',
      'Compila materiales a shaders GLSL',
      'Ordena objetos y emite las draw calls',
      'Carga texturas, modelos y animaciones',
    ],
    noHace: 'No sabe qué es un componente de React, ni cuándo tu estado cambió.',
  },
  {
    id: 'gpu',
    nombre: 'WebGL / GPU',
    etiqueta: 'Capa 0 · el hardware',
    resumen:
      'Recibe vértices y shaders, y pinta píxeles. Es rapidísima dibujando triángulos y terrible haciendo decisiones: por eso todo lo que piensa ocurre en JavaScript.',
    hace: ['Ejecuta vertex y fragment shaders en paralelo', 'Rasteriza triángulos y aplica texturas'],
    noHace: 'No conoce tu aplicación, tu estado ni el concepto de «lección»; solo recibe buffers.',
  },
]

/** 0.1 — El mapa de capas: quién hace qué. */
export default function Capas() {
  const [activa, setActiva] = useState('r3f')
  const capa = CAPAS.find((c) => c.id === activa) ?? CAPAS[1]

  return (
    <Marco titulo="El mapa: WebGL → three.js → R3F">
      <div className="grid gap-0 md:grid-cols-[minmax(0,240px)_1fr]">
        <div className="border-b border-borde p-2 md:border-b-0 md:border-r">
          {CAPAS.map((c, i) => (
            <div key={c.id}>
              <button
                type="button"
                onClick={() => setActiva(c.id)}
                aria-pressed={c.id === activa}
                className={`w-full rounded-lg px-3 py-2 text-left transition ${
                  c.id === activa
                    ? 'bg-acento/15 text-texto ring-1 ring-acento/50'
                    : 'text-texto-suave hover:bg-superficie-alta'
                }`}
              >
                <span className="block font-mono text-[10px] uppercase tracking-widest text-texto-tenue">
                  {c.etiqueta}
                </span>
                <span className="text-sm font-medium">{c.nombre}</span>
              </button>
              {i < CAPAS.length - 1 && (
                <div className="ml-5 h-3 border-l border-dashed border-borde" aria-hidden />
              )}
            </div>
          ))}
        </div>

        <div className="p-4">
          <h3 className="text-sm font-semibold">{capa.nombre}</h3>
          <p className="mt-1.5 text-sm leading-relaxed text-texto-suave">{capa.resumen}</p>

          <p className="mt-4 font-mono text-[10px] uppercase tracking-widest text-texto-tenue">
            Qué hace
          </p>
          <ul className="mt-1.5 space-y-1 text-sm text-texto-suave">
            {capa.hace.map((item) => (
              <li key={item} className="flex gap-2">
                <span className="text-exito" aria-hidden>
                  ✓
                </span>
                {item}
              </li>
            ))}
          </ul>

          <p className="mt-3 rounded-lg border border-aviso/30 bg-aviso/5 px-3 py-2 text-xs text-texto-suave">
            <span className="font-semibold text-aviso">Lo que no hace: </span>
            {capa.noHace}
          </p>
        </div>
      </div>
    </Marco>
  )
}

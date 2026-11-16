import type { Modulo } from './tipos'

export const modulo0: Modulo = {
  numero: 0,
  titulo: 'Prerrequisitos rápidos',
  descripcion:
    'Qué capa hace qué, el React mínimo que necesitas y cómo se dibuja un canvas 60 veces por segundo. Sin esto, el resto del curso se aprende de memoria.',
  lecciones: [
    {
      id: '0.1',
      modulo: 0,
      titulo: 'El mapa: WebGL → three.js → R3F',
      objetivo:
        'Situar las tres capas del stack y saber qué problema resuelve cada una antes de escribir la primera línea de 3D.',
      nivel: 'intro',
      minutos: 15,
      bloques: [
        {
          tipo: 'parrafo',
          texto:
            'Cuando alguien dice «hago 3D en la web» suele haber cuatro capas trabajando a la vez, y casi todos los tutoriales las mezclan. Si no sabes cuál hace qué, cada error parece magia negra. Este es el mapa completo, de arriba abajo.',
        },
        { tipo: 'widget', id: 'capas', titulo: 'Pulsa cada capa para ver su trabajo' },
        {
          tipo: 'parrafo',
          texto:
            'Piensa en un rodaje: React es el guion (dice qué hay en escena y cuándo cambia), React Three Fiber es el director de fotografía (traduce el guion a órdenes concretas), three.js es el equipo de cámara y luces, y WebGL es el objetivo que impresiona el fotograma. Cada uno hace su trabajo y ninguno hace el del otro.',
        },
        {
          tipo: 'destacado',
          tono: 'ojo',
          titulo: 'El error de modelo mental más común',
          texto:
            'React Three Fiber NO renderiza React dentro de un canvas. En el DOM solo hay un <canvas>. React se usa como descriptor de una escena de three.js: no hay divs, ni CSS, ni nodos del DOM dentro de la escena.',
        },
        {
          tipo: 'codigo',
          lenguaje: 'tsx',
          titulo: 'El mismo cubo, dos paradigmas',
          codigo: `// three.js puro: describes los pasos
const escena = new THREE.Scene()
const cubo = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshStandardMaterial({ color: '#f5a524' }),
)
cubo.position.x = 1
escena.add(cubo)

// React Three Fiber: describes el resultado
<Canvas>
  <mesh position={[1, 0, 0]}>
    <boxGeometry args={[1, 1, 1]} />
    <meshStandardMaterial color="#f5a524" />
  </mesh>
</Canvas>`,
        },
        {
          tipo: 'tabla',
          cabecera: ['Capa', 'La pregunta que responde', 'Lo que NO hace'],
          filas: [
            ['React', '¿Qué debe existir y qué cambió?', 'No habla con la GPU'],
            ['React Three Fiber', '¿Cómo traduzco JSX a objetos 3D?', 'No dibuja píxeles'],
            ['three.js', '¿Cómo se ve la escena y cómo se dibuja?', 'No conoce tu estado'],
            ['WebGL / GPU', '¿Qué píxeles resultan?', 'No toma decisiones'],
          ],
        },
        {
          tipo: 'destacado',
          tono: 'porque',
          texto:
            '¿Por qué aprender R3F en vez de three.js puro? Porque el 80 % del trabajo real de una escena web no es dibujar: es manejar estado, cargar assets, reaccionar a eventos y mantener la interfaz sincronizada. Eso es exactamente lo que React ya resuelve bien. En el módulo 2 verás el mismo cubo en ambos mundos y decidirás tú cuándo bajar al three.js puro.',
        },
        {
          tipo: 'lista',
          items: [
            'React describe, no ordena pasos: cambias el estado y React decide qué actualizar.',
            'three.js ordena pasos: creas objetos, los añades a la escena y llamas a render.',
            'R3F es el puente: te deja describir three.js con la sintaxis de React.',
            'WebGL es la capa final, y casi nunca la tocarás a mano.',
          ],
        },
      ],
      errores: [
        {
          sintoma: 'Metes un <div> dentro de <Canvas> y no aparece nada, o ves un error de tipo.',
          causa: 'Dentro del canvas no hay DOM: el árbol de hijos se interpreta como objetos 3D.',
          arreglo:
            'Para interfaz HTML usa el componente <Html> de drei (módulo 9.4) o saca el HTML fuera del canvas y comunícalo por estado.',
        },
        {
          sintoma: '«Mi componente React no se actualiza» al cambiar una variable 3D.',
          causa: 'Has mutado un objeto de three.js dentro de un render; React no se entera de las mutaciones.',
          arreglo:
            'Para datos que cambian y deben verse en la UI usa estado de React; para animación por frame, muta en useFrame (módulo 5).',
        },
        {
          sintoma: 'Crees que un fallo de CSS está rompiendo la escena.',
          causa: 'El canvas no hereda estilos de los componentes internos: no existen.',
          arreglo:
            'El tamaño del canvas lo controla su contenedor. Si la escena se ve estirada, revisa el alto del div padre.',
        },
      ],
      quiz: [
        {
          tipo: 'unica',
          enunciado: '¿Qué hay realmente en el DOM cuando renderizas un <Canvas> de R3F?',
          opciones: [
            'Un div por cada malla de la escena',
            'Un único elemento <canvas>',
            'Un iframe con un documento 3D',
            'Nada: R3F dibuja directamente en el body',
          ],
          correcta: 1,
          explicacion:
            'R3F crea un contexto WebGL sobre un único canvas. Los <mesh>, <boxGeometry> y demás no generan nodos del DOM: generan objetos de three.js.',
        },
        {
          tipo: 'unica',
          enunciado: '¿Qué capa decide cuándo hay que volver a renderizar por un cambio de estado?',
          opciones: ['WebGL', 'three.js', 'React', 'El navegador'],
          correcta: 2,
          explicacion:
            'React gestiona el estado y la reconciliación. R3F reacciona a esa reconciliación creando o actualizando objetos de three.js.',
        },
        {
          tipo: 'verdadero-falso',
          enunciado: 'React Three Fiber sustituye a three.js.',
          correcta: false,
          explicacion:
            'No lo sustituye: lo usa. R3F es un renderer de React cuyo trabajo es mantener un grafo de objetos three.js sincronizado con tu JSX.',
        },
        {
          tipo: 'multiple',
          enunciado: '¿Qué tareas hace three.js por ti?',
          opciones: [
            'Calcular matrices de transformación',
            'Compilar materiales a shaders',
            'Decidir qué componente de React debe re-renderizar',
            'Emitir las draw calls a WebGL',
          ],
          correctas: [0, 1, 3],
          explicacion:
            'La reconciliación de componentes es de React. Todo lo demás es trabajo del motor: transformaciones, materiales y dibujo.',
        },
      ],
      recursos: [
        {
          titulo: 'React Three Fiber — Introduction',
          url: 'https://r3f.docs.pmnd.rs/getting-started/introduction',
          nota: 'La explicación oficial de qué es un renderer de React.',
        },
        {
          titulo: 'three.js Manual — Fundamentals',
          url: 'https://threejs.org/manual/#en/fundamentals',
          nota: 'El modelo mental de escena, cámara y renderer, sin React de por medio.',
        },
        {
          titulo: 'MDN — WebGL API',
          url: 'https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API',
          nota: 'Para cuando quieras saber qué hay debajo de la capa 1.',
        },
      ],
      ejercicio: {
        reto: 'Completa el panel de capas: al pulsar un botón debe resaltarse y mostrar la función de esa capa.',
        inicial: `import { useState } from 'react'

const CAPAS = [
  { id: 'react', nombre: 'React', funcion: 'Describe la interfaz y guarda el estado' },
  { id: 'r3f', nombre: 'R3F', funcion: 'Traduce JSX a objetos de three.js' },
  { id: 'three', nombre: 'three.js', funcion: 'Construye y dibuja la escena' },
  { id: 'webgl', nombre: 'WebGL', funcion: 'Pinta píxeles en la GPU' },
]

export default function App() {
  const [activa, setActiva] = useState('react')

  return (
    <div style={{ padding: 16, fontFamily: 'system-ui', color: '#eee', background: '#111', minHeight: '100vh' }}>
      <h2>Capas del stack 3D</h2>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        {CAPAS.map((capa) => (
          <button key={capa.id} onClick={() => setActiva(capa.id)}>
            {capa.nombre}
          </button>
        ))}
      </div>

      {/* TODO: muestra el nombre y la función de la capa activa */}
      <p>Activa: {activa}</p>
    </div>
  )
}`,
        solucion: `import { useState } from 'react'

const CAPAS = [
  { id: 'react', nombre: 'React', funcion: 'Describe la interfaz y guarda el estado' },
  { id: 'r3f', nombre: 'R3F', funcion: 'Traduce JSX a objetos de three.js' },
  { id: 'three', nombre: 'three.js', funcion: 'Construye y dibuja la escena' },
  { id: 'webgl', nombre: 'WebGL', funcion: 'Pinta píxeles en la GPU' },
]

export default function App() {
  const [activa, setActiva] = useState('react')
  const capa = CAPAS.find((c) => c.id === activa)!

  return (
    <div style={{ padding: 16, fontFamily: 'system-ui', color: '#eee', background: '#111', minHeight: '100vh' }}>
      <h2>Capas del stack 3D</h2>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        {CAPAS.map((c) => (
          <button
            key={c.id}
            onClick={() => setActiva(c.id)}
            style={{
              background: c.id === activa ? '#f5a524' : '#222',
              color: c.id === activa ? '#111' : '#eee',
              border: '1px solid #444',
              borderRadius: 8,
              padding: '6px 12px',
              fontWeight: 600,
            }}
          >
            {c.nombre}
          </button>
        ))}
      </div>

      <div style={{ marginTop: 16, border: '1px solid #333', borderRadius: 12, padding: 12 }}>
        <strong>{capa.nombre}</strong>
        <p style={{ margin: '6px 0 0' }}>{capa.funcion}</p>
      </div>
    </div>
  )
}`,
        pistas: [
          'Busca la capa activa dentro del array con find().',
          'El estilo del botón puede depender de si su id coincide con `activa`.',
          'No necesitas estado nuevo: todo lo que necesitas ya está en `activa`.',
        ],
      },
    },
    {
      id: '0.2',
      modulo: 0,
      titulo: 'React que necesitas (y solo ese)',
      objetivo:
        'Usar componentes, props, useState y el paso de datos al canvas sin repasar React entero.',
      nivel: 'intro',
      minutos: 30,
      bloques: [
        {
          tipo: 'parrafo',
          texto:
            'No hace falta dominar React para empezar. Hacen falta cuatro cosas: un componente que devuelve JSX, props para pasar datos hacia abajo, useState para recordar algo y una Idea muy simple de cuándo se vuelve a pintar. Todo lo demás lo irás aprendiendo sobre la marcha.',
        },
        {
          tipo: 'destacado',
          tono: 'porque',
          texto:
            'La regla que gobierna todo el curso: React pinta cuando cambia el estado o las props. Si quieres que algo cambie 60 veces por segundo, no uses estado (módulo 5); si quieres que cambie cuando el alumno pulsa un botón, el estado es exactamente lo correcto.',
        },
        {
          tipo: 'demo',
          id: 'contador-cubo',
          titulo: 'Un useState dentro de un canvas',
          alto: 320,
          nota: 'Esto es un adelanto del módulo 3: el cubo y el material se explican allí. Hoy solo mira el flujo del dato.',
        },
        {
          tipo: 'parrafo',
          texto:
            'Fíjate en el camino del dato: el botón llama a setColor → React vuelve a ejecutar el componente → el nuevo valor entra en <Canvas> como prop → R3F actualiza el color del material. Ningún objeto de three.js se toca a mano. Ese es el pacto: tú describes, R3F sincroniza.',
        },
        {
          tipo: 'codigo',
          lenguaje: 'tsx',
          titulo: 'Los cuatro conceptos, en un solo bloque',
          codigo: `// 1. Componente: una función que devuelve JSX
function Ficha({ nombre }: { nombre: string }) {   // 2. Props: datos de fuera
  return <p>{nombre}</p>
}

function App() {
  // 3. Estado: un valor que, al cambiar, repinta
  const [veces, setVeces] = useState(0)

  return (
    <button onClick={() => setVeces(veces + 1)}>
      Pulsado {veces} veces {/* 4. Render: se recalcula al cambiar el estado */}
    </button>
  )
}`,
        },
        {
          tipo: 'lista',
          items: [
            'Un componente es una función que devuelve JSX. Nada más.',
            'Las props son de solo lectura: si el hijo necesita cambiarlas, recibe también una función.',
            'useState devuelve el valor y una función para cambiarlo; nunca lo asignes directamente.',
            'Las claves (`key`) son obligatorias al pintar listas, y en 3D también: identifican qué objeto es cuál.',
          ],
        },
        {
          tipo: 'destacado',
          tono: 'truco',
          texto:
            'Truco de lectura de código R3F: cualquier prop que empiece por `on` es un evento (onClick, onPointerOver), cualquier prop con nombre de propiedad de three.js es un setter (position, rotation, visible) y `args` son los argumentos del constructor. Con esas tres reglas entiendes el 80 % del código que verás.',
        },
      ],
      errores: [
        {
          sintoma: 'El contador se queda en 0 por muchos clics.',
          causa: 'Estás mutando el valor en vez de llamar al setter, o usando el valor antiguo en una función asíncrona.',
          arreglo:
            'Usa la forma funcional: setVeces((v) => v + 1). React agrupa actualizaciones y la forma funcional siempre parte del último valor.',
        },
        {
          sintoma: 'La escena no refleja el estado que acabas de cambiar.',
          causa: 'El estado vive en un componente que no envuelve al `<Canvas>`, o el valor se capturó en un cierre antiguo.',
          arreglo:
            'Comprueba que el estado está por encima del canvas en el árbol y que lo pasas por props al hijo que lo usa.',
        },
        {
          sintoma: 'Poner un objeto nuevo en `useState` provoca renders infinitos.',
          causa: 'Un objeto o array literal cambia de identidad en cada render; si se usa como dependencia de un efecto, el efecto se repite.',
          arreglo: 'Memoriza con useMemo o guarda valores primitivos (números, cadenas) en el estado.',
        },
      ],
      quiz: [
        {
          tipo: 'unica',
          enunciado: '¿Cuándo vuelve a ejecutarse un componente de React?',
          opciones: [
            'Solo la primera vez que se monta',
            'Cuando cambian sus props o su estado',
            'En cada frame del navegador',
            'Cuando three.js lo pide',
          ],
          correcta: 1,
          explicacion:
            'React vuelve a ejecutar el componente cuando cambian sus props o su estado (o cuando su padre se re-renderiza). Si quieres algo por frame, eso es useFrame, no estado.',
        },
        {
          tipo: 'verdadero-falso',
          enunciado: 'Puedes modificar directamente una prop dentro del componente que la recibe.',
          correcta: false,
          explicacion:
            'Las props son de solo lectura. Si necesitas cambiarlas, el padre debe pasar también una función que actualice su estado.',
        },
        {
          tipo: 'unica',
          enunciado: '¿Cuál es la forma correcta de incrementar un contador que puede actualizarse varias veces seguidas?',
          opciones: [
            'setCuenta(cuenta + 1)',
            'cuenta = cuenta + 1',
            'setCuenta((actual) => actual + 1)',
            'setCuenta(cuenta++)',
          ],
          correcta: 2,
          explicacion:
            'La forma funcional recibe el último valor confirmado por React y evita perder actualizaciones cuando se agrupan.',
        },
        {
          tipo: 'multiple',
          enunciado: 'En R3F, ¿qué significan `args`, `position` y `onClick` en un `<mesh>`?',
          opciones: [
            '`args` son los argumentos del constructor',
            '`position` es un setter de la propiedad position',
            '`onClick` es un evento de puntero',
            '`args` son los estilos CSS del canvas',
          ],
          correctas: [0, 1, 2],
          explicacion:
            'Esa es la gramática de R3F: `args` construye, el resto de props asignan propiedades, y las que empiezan por `on` son eventos.',
        },
      ],
      recursos: [
        {
          titulo: 'React — Learn (guía oficial)',
          url: 'https://react.dev/learn',
          nota: 'Describe UI, estado y renderizado. Con leer «State: A Component’s Memory» tienes suficiente.',
        },
        {
          titulo: 'React — useRef',
          url: 'https://react.dev/reference/react/useRef',
          nota: 'Lo usarás en cada demo para hablar con objetos de three.js sin re-renderizar.',
        },
        {
          titulo: 'React Three Fiber — Canvas',
          url: 'https://r3f.docs.pmnd.rs/api/canvas',
          nota: 'Las props del canvas que iremos viendo: camera, shadows, dpr, frameloop.',
        },
      ],
      ejercicio: {
        reto: 'Añade un botón azul y otro que doble el tamaño del cubo, usando el estado que ya existe.',
        inicial: `import { useState } from 'react'
import { Canvas } from '@react-three/fiber'

export default function App() {
  const [color, setColor] = useState('#f5a524')

  return (
    <div style={{ height: 320, background: '#111' }}>
      <div style={{ display: 'flex', gap: 8, padding: 8 }}>
        <button onClick={() => setColor('#f5a524')}>Ámbar</button>
        {/* TODO: botón azul (#4d8df6) */}
      </div>

      <Canvas camera={{ position: [0, 0, 4] }}>
        <mesh>
          <boxGeometry args={[1.4, 1.4, 1.4]} />
          <meshBasicMaterial color={color} />
        </mesh>
      </Canvas>
    </div>
  )
}`,
        solucion: `import { useState } from 'react'
import { Canvas } from '@react-three/fiber'

export default function App() {
  const [color, setColor] = useState('#f5a524')
  const [escala, setEscala] = useState(1)

  return (
    <div style={{ height: 320, background: '#111' }}>
      <div style={{ display: 'flex', gap: 8, padding: 8 }}>
        <button onClick={() => setColor('#f5a524')}>Ámbar</button>
        <button onClick={() => setColor('#4d8df6')}>Azul</button>
        <button onClick={() => setEscala((e) => e * 2)}>Doblar tamaño</button>
      </div>

      <Canvas camera={{ position: [0, 0, 4] }}>
        <mesh scale={escala}>
          <boxGeometry args={[1.4, 1.4, 1.4]} />
          <meshBasicMaterial color={color} />
        </mesh>
      </Canvas>
    </div>
  )
}`,
        pistas: [
          'Para el tamaño necesitas un segundo useState; no reutilices el del color.',
          'La prop `scale` acepta un número: escala uniforme en los tres ejes.',
          'Doblar el tamaño es una actualización funcional: setEscala((e) => e * 2).',
        ],
      },
    },
    {
      id: '0.3',
      modulo: 0,
      titulo: 'Qué es un canvas y cómo se dibuja 60 veces por segundo',
      objetivo:
        'Explicar el bucle de requestAnimationFrame, qué es el delta y por qué animar sumando una constante por frame rompe a otras tasas de refresco.',
      nivel: 'intro',
      minutos: 35,
      bloques: [
        {
          tipo: 'parrafo',
          texto:
            'Un canvas es una superficie opaca donde alguien dibuja píxeles. No guarda objetos: no hay un cubo dentro del canvas, hay píxeles que se parecen a un cubo. Por eso, para animar, hay que volver a dibujar la escena entera muchas veces por segundo.',
        },
        {
          tipo: 'parrafo',
          texto:
            'El navegador expone requestAnimationFrame: le pides que te llame justo antes del siguiente pintado de pantalla, y te pasa un tiempo en milisegundos. Si tu función vuelve a pedir otro frame, tienes un bucle. Ese bucle es el corazón de cualquier escena 3D y de ahí sale el famoso «60 fps» (o 120, o 144, según la pantalla).',
        },
        { tipo: 'widget', id: 'rebote-canvas', titulo: 'El bucle en directo: delta y frames' },
        {
          tipo: 'destacado',
          tono: 'porque',
          titulo: 'Qué es el delta y por qué te salva',
          texto:
            'Delta es el tiempo que ha pasado desde el frame anterior. Si multiplicas la velocidad por delta, el objeto avanza «tantos píxeles por segundo» sea cual sea la tasa de refresco. Si sumas una constante por frame, avanza «tantos píxeles por frame»: en una pantalla de 144 Hz irá más del doble de rápido que en una de 60.',
        },
        {
          tipo: 'codigo',
          lenguaje: 'ts',
          titulo: 'El bucle, escrito a mano',
          codigo: `let anterior = performance.now()

function frame(ahora: number) {
  const delta = (ahora - anterior) / 1000   // segundos, no milisegundos
  anterior = ahora

  posicion += velocidad * delta             // independiente de los fps
  dibujar()

  requestAnimationFrame(frame)              // pide el siguiente
}

requestAnimationFrame(frame)`,
        },
        {
          tipo: 'lista',
          items: [
            'rAF se pausa solo cuando la pestaña no es visible: no hace falta gestionarlo.',
            'delta se mide en segundos si divides entre 1000; es la unidad que usan las APIs de three.js.',
            'En R3F el bucle ya existe: `useFrame((estado, delta) => …)` te lo da hecho (módulo 5).',
            'Si un frame tarda muchísimo (cambio de pestaña), acota el delta para que nada se teletransporte.',
          ],
        },
        {
          tipo: 'destacado',
          tono: 'truco',
          texto:
            'Cuando una animación «se acelera en mi portátil nuevo», casi siempre es esto: la lógica avanzaba por frame y el portátil va a 120 Hz. Antes de tocar la velocidad, comprueba si estás multiplicando por delta.',
        },
      ],
      errores: [
        {
          sintoma: 'La animación va al doble de velocidad en un monitor de 120 Hz.',
          causa: 'Se suma una constante por frame en vez de multiplicar por delta.',
          arreglo: 'Multiplica siempre por delta (en segundos) y define la velocidad en unidades por segundo.',
        },
        {
          sintoma: 'Los objetos «saltan» al volver a la pestaña después de un rato.',
          causa: 'El delta acumulado es enorme porque rAF estuvo pausado.',
          arreglo: 'Acota el delta: `const dt = Math.min(delta, 0.05)`.',
        },
        {
          sintoma: 'El canvas se ve borroso o estirado.',
          causa: 'El tamaño en píxeles del canvas no coincide con su tamaño en CSS, o falta el devicePixelRatio.',
          arreglo:
            'Fija `canvas.width = anchoCss * dpr` y `canvas.height = altoCss * dpr`, y ajusta el contexto con `ctx.setTransform(dpr, 0, 0, dpr, 0, 0)`.',
        },
      ],
      quiz: [
        {
          tipo: 'unica',
          enunciado: '¿Qué unidad usa el delta que entrega requestAnimationFrame si divides entre 1000?',
          opciones: ['Milisegundos', 'Segundos', 'Frames', 'Píxeles'],
          correcta: 1,
          explicacion:
            'rAF entrega milisegundos. Dividiendo entre 1000 obtienes segundos, que es la unidad que espera `useFrame` en R3F.',
        },
        {
          tipo: 'verdadero-falso',
          enunciado: 'Si multiplicas la velocidad por delta, la animación se mueve igual a 30, 60 o 144 fps.',
          correcta: true,
          explicacion:
            'Ese es justo el motivo de existir del delta: convertir «por frame» en «por segundo».',
        },
        {
          tipo: 'unica',
          enunciado: 'Un objeto debe recorrer 200 unidades por segundo. ¿Qué escribes dentro del frame?',
          opciones: [
            'posicion += 200',
            'posicion += 200 * delta',
            'posicion += 200 / delta',
            'posicion = 200',
          ],
          correcta: 1,
          explicacion:
            'Velocidad (unidades por segundo) por tiempo transcurrido (segundos) da unidades recorridas en ese frame.',
        },
        {
          tipo: 'multiple',
          enunciado: '¿Qué hace exactamente requestAnimationFrame?',
          opciones: [
            'Llama a tu función antes del siguiente pintado',
            'Te entrega un timestamp en milisegundos',
            'Limita la animación a 60 fps siempre',
            'Se pausa cuando la pestaña no es visible',
          ],
          correctas: [0, 1, 3],
          explicacion:
            'rAF no impone 60 fps: se sincroniza con la pantalla, sea de 60, 120 o 144 Hz.',
        },
      ],
      recursos: [
        {
          titulo: 'MDN — window.requestAnimationFrame',
          url: 'https://developer.mozilla.org/en-US/docs/Web/API/Window/requestAnimationFrame',
          nota: 'La referencia exacta, incluido el timestamp y el comportamiento en pestañas ocultas.',
        },
        {
          titulo: 'MDN — Canvas API',
          url: 'https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API',
          nota: 'El canvas 2D que usamos en la demo; la misma idea de superficie que en WebGL.',
        },
        {
          titulo: 'Discover three.js',
          url: 'https://www.discoverthreejs.com/',
          nota: 'Explica el render loop desde cero, sin dar por hecho que sabes WebGL.',
        },
      ],
      ejercicio: {
        reto: 'Cambia el bucle para que el cuadrado se mueva a 120 píxeles por segundo, independientemente de los fps.',
        inicial: `import { useEffect, useRef } from 'react'

export default function App() {
  const lienzo = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = lienzo.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let x = 20
    let raf = 0

    const dibujar = () => {
      x = x + 2            // ← esto va por frame, no por segundo
      if (x > 260) x = 20

      ctx.clearRect(0, 0, 300, 120)
      ctx.fillStyle = '#f5a524'
      ctx.fillRect(x, 40, 32, 32)

      raf = requestAnimationFrame(dibujar)
    }

    raf = requestAnimationFrame(dibujar)
    return () => cancelAnimationFrame(raf)
  }, [])

  return <canvas ref={lienzo} width={300} height={120} style={{ background: '#111' }} />
}`,
        solucion: `import { useEffect, useRef } from 'react'

export default function App() {
  const lienzo = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = lienzo.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let x = 20
    let anterior = performance.now()
    let raf = 0
    const VELOCIDAD = 120 // píxeles por segundo

    const dibujar = (ahora: number) => {
      const delta = Math.min((ahora - anterior) / 1000, 0.05)
      anterior = ahora

      x = x + VELOCIDAD * delta
      if (x > 260) x = 20

      ctx.clearRect(0, 0, 300, 120)
      ctx.fillStyle = '#f5a524'
      ctx.fillRect(x, 40, 32, 32)

      raf = requestAnimationFrame(dibujar)
    }

    raf = requestAnimationFrame(dibujar)
    return () => cancelAnimationFrame(raf)
  }, [])

  return <canvas ref={lienzo} width={300} height={120} style={{ background: '#111' }} />
}`,
        pistas: [
          'requestAnimationFrame pasa un timestamp a la función; úsalo para calcular el delta.',
          'Convierte a segundos antes de multiplicar.',
          'Acota el delta con Math.min para evitar saltos tras cambiar de pestaña.',
        ],
      },
    },
  ],
}

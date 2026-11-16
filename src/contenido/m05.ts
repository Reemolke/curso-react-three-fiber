import type { Modulo } from './tipos'

export const modulo5: Modulo = {
  numero: 5,
  titulo: 'Movimiento: useFrame, delta y animación',
  descripcion:
    'Todo lo que se mueve en una escena pasa por el bucle de render. Aprender dónde escribir ese movimiento —y dónde no— es la diferencia entre 60 fps estables y una escena que se arrastra.',
  lecciones: [
    {
      id: '5.1',
      modulo: 5,
      titulo: '`useFrame` y el render loop',
      objetivo:
        'Mover un objeto desde `useFrame` mutando su `ref`, y explicar por qué hacerlo con `setState` también funciona pero cuesta caro.',
      nivel: 'intro',
      minutos: 50,
      bloques: [
        {
          tipo: 'parrafo',
          texto:
            'R3F ejecuta un bucle de render mientras el canvas está visible. `useFrame` te suscribe a ese bucle: la función que le pasas se llama una vez por frame, antes de dibujar, y recibe el estado y el `delta` en segundos. Es el equivalente al `requestAnimationFrame` de three.js puro, pero con el registro y la limpieza hechos.',
        },
        { tipo: 'demo', id: 'm5-useframe-setstate', titulo: 'Dos cubos, dos formas de girar' },
        {
          tipo: 'parrafo',
          texto:
            'Los dos cubos giran igual. La diferencia está en el contador de renders. El azul muta `malla.current.rotation` dentro de `useFrame`: React no se entera y no vuelve a renderizar nada. El naranja llama a `setGiro` en cada frame: React reconcilia el componente 60 veces por segundo para producir exactamente el mismo árbol de JSX con un número distinto.',
        },
        {
          tipo: 'codigo',
          lenguaje: 'tsx',
          titulo: 'El patrón correcto',
          codigo: `import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import type { Mesh } from 'three'

function Cubo() {
  const malla = useRef<Mesh>(null)

  useFrame((_, delta) => {
    if (!malla.current) return
    malla.current.rotation.y += delta * 1.35
    malla.current.rotation.x += delta * 0.42
  })

  return (
    <mesh ref={malla}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="#4d8df6" />
    </mesh>
  )
}`,
        },
        {
          tipo: 'destacado',
          tono: 'porque',
          titulo: 'Por qué mutar un ref no es «hacer trampas»',
          texto:
            'Porque el objeto three.js no forma parte del árbol de React: es un objeto imperativo que vive fuera. React decide qué objetos existen; el bucle decide cómo se mueven. Mezclar ambas responsabilidades es lo que produce los tirones. El estado de React es para lo que cambia al pulsar; el frame es para lo que cambia 60 veces por segundo.',
        },
        {
          tipo: 'lista',
          items: [
            '`delta` es el tiempo transcurrido desde el frame anterior, en segundos. A 60 fps vale ≈0,0167.',
            'El orden de ejecución entre varios `useFrame` es el de montaje, salvo que uses el segundo argumento (`renderPriority`).',
            '`useFrame` no se ejecuta si el canvas está pausado (`frameloop="never"`).',
            'El primer frame puede traer un `delta` grande: conviene acotarlo (`Math.min(delta, 0.1)`).',
            'Puedes leer `state.clock.elapsedTime` para animaciones basadas en tiempo absoluto.',
          ],
        },
        {
          tipo: 'destacado',
          tono: 'ojo',
          titulo: 'No todo va en `useFrame`',
          texto:
            'Un cambio de color al pulsar un botón no necesita el bucle: es `setState` normal y React lo aplica una vez. Usar `useFrame` para eso te obliga a gestionar tú mismo cuándo parar y a leer estado mutable que React no ve. Regla práctica: si el valor cambia con un evento, estado; si cambia con el tiempo, `useFrame`.',
        },
      ],
      errores: [
        {
          sintoma: '`malla.current` es `null` dentro de `useFrame`.',
          causa: 'El `ref` no está asignado al objeto, o el objeto está dentro de un componente que aún no ha montado.',
          arreglo: 'Comprueba el `ref={malla}` y añade la guarda `if (!malla.current) return`.',
        },
        {
          sintoma: 'La animación va a trompicones y el perfil muestra renders constantes.',
          causa: 'Se llama a `setState` dentro de `useFrame`.',
          arreglo: 'Muta el objeto por `ref`. Si necesitas mostrar el valor en HTML, actualízalo como mucho 4-5 veces por segundo.',
        },
        {
          sintoma: 'Al volver a la pestaña, los objetos dan un salto enorme.',
          causa: 'El `delta` acumulado mientras la pestaña estaba en segundo plano se aplica de golpe.',
          arreglo: 'Acota: `const dt = Math.min(delta, 0.1)`.',
        },
      ],
      quiz: [
        {
          tipo: 'unica',
          enunciado: '¿Cuántas veces se ejecuta la función de `useFrame`?',
          opciones: ['Una por frame dibujado', 'Una por render de React', 'Una por segundo', 'Solo cuando cambia el estado'],
          correcta: 0,
          explicacion: 'Está atada al bucle de render, no al ciclo de React. Si el canvas está pausado, no se ejecuta.',
        },
        {
          tipo: 'verdadero-falso',
          enunciado: 'Mutar `ref.current.rotation` dentro de `useFrame` provoca un render de React.',
          correcta: false,
          explicacion: 'React no observa objetos three.js. Solo el bucle de render ve el cambio, que es justo lo que quieres.',
        },
        {
          tipo: 'multiple',
          enunciado: '¿Qué cosas sí deberían ir por `setState` y no por `useFrame`?',
          opciones: [
            'El color que cambia al pulsar un botón',
            'La rotación continua de un molino',
            'El elemento seleccionado en una lista',
            'La posición de un objeto que sigue al ratón',
          ],
          correctas: [0, 2],
          explicacion:
            'Los eventos puntuales van por estado. Lo que depende del tiempo o del puntero en cada frame va por `useFrame`.',
        },
        {
          tipo: 'unica',
          enunciado: '¿En qué unidades llega `delta`?',
          opciones: ['Segundos', 'Milisegundos', 'Frames', 'Radianes'],
          correcta: 0,
          explicacion: 'Segundos, con coma flotante. De ahí que se multiplique por una velocidad en unidades por segundo.',
        },
      ],
      recursos: [
        {
          titulo: 'R3F: useFrame',
          url: 'https://r3f.docs.pmnd.rs/api/hooks#useframe',
          nota: 'Incluye el parámetro de prioridad y el orden de ejecución.',
        },
        {
          titulo: 'three.js: Clock',
          url: 'https://threejs.org/docs/#api/en/core/Clock',
          nota: 'De dónde sale `delta` y qué es `elapsedTime`.',
        },
        {
          titulo: 'React: state as a snapshot',
          url: 'https://react.dev/learn/state-as-a-snapshot',
          nota: 'Por qué actualizar estado 60 veces por segundo es caro por diseño.',
        },
      ],
      ejercicio: {
        reto: 'Haz que un cubo se mueva en círculo a 0,6 vueltas por segundo sin provocar ni un render de React.',
        inicial: `import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import type { Mesh } from 'three'

function Cubo() {
  const malla = useRef<Mesh>(null)

  useFrame((_, delta) => {
    if (!malla.current) return
    // TODO: avanza el ángulo y coloca el cubo en un círculo de radio 1.3
  })

  return (
    <mesh ref={malla}>
      <boxGeometry args={[0.5, 0.5, 0.5]} />
      <meshNormalMaterial />
    </mesh>
  )
}

export default function App() {
  return (
    <div style={{ height: 320 }}>
      <Canvas camera={{ position: [0, 2.5, 4] }}>
        <Cubo />
      </Canvas>
    </div>
  )
}`,
        solucion: `import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import type { Mesh } from 'three'

const RADIO = 1.3
const VUELTAS_POR_SEGUNDO = 0.6

function Cubo() {
  const malla = useRef<Mesh>(null)
  const angulo = useRef(0)

  useFrame((_, delta) => {
    if (!malla.current) return
    const dt = Math.min(delta, 0.1)
    angulo.current += dt * VUELTAS_POR_SEGUNDO * Math.PI * 2

    malla.current.position.x = Math.cos(angulo.current) * RADIO
    malla.current.position.z = Math.sin(angulo.current) * RADIO
    malla.current.rotation.y = angulo.current
  })

  return (
    <mesh ref={malla}>
      <boxGeometry args={[0.5, 0.5, 0.5]} />
      <meshNormalMaterial />
    </mesh>
  )
}

export default function App() {
  return (
    <div style={{ height: 320 }}>
      <Canvas camera={{ position: [0, 2.5, 4] }}>
        <Cubo />
      </Canvas>
    </div>
  )
}`,
        pistas: [
          'Guarda el ángulo en un `useRef`, no en estado.',
          'Una vuelta completa son `Math.PI * 2` radianes.',
          'Con `Math.cos` y `Math.sin` del mismo ángulo obtienes el círculo en XZ.',
        ],
      },
    },
    {
      id: '5.2',
      modulo: 5,
      titulo: 'Delta y velocidad independiente',
      objetivo:
        'Escribir movimiento que se vea igual a 30, 60 o 144 fps, y detectar el error de sumar una constante por frame.',
      nivel: 'intro',
      minutos: 45,
      bloques: [
        {
          tipo: 'parrafo',
          texto:
            'Un monitor de 144 Hz dibuja 144 frames por segundo; uno de 60, sesenta. Si tu código suma `0.01` a la posición en cada frame, el objeto irá 2,4 veces más rápido en la pantalla buena. El `delta` existe para que el movimiento dependa del tiempo y no del número de frames.',
        },
        { tipo: 'demo', id: 'm5-delta-fps', titulo: 'Baja los FPS y mira quién cambia de velocidad' },
        {
          tipo: 'parrafo',
          texto:
            'El cubo naranja suma `0.02` unidades por frame. El azul suma `velocidad × delta`, donde `velocidad` está en unidades por segundo. A 60 fps coinciden porque `0.02 × 60 = 1.2` unidades por segundo. A 20 fps el naranja se arrastra y el azul mantiene el ritmo: misma fórmula, distinto número de frames.',
        },
        {
          tipo: 'codigo',
          lenguaje: 'tsx',
          titulo: 'Mal y bien, lado a lado',
          codigo: `// Mal: la velocidad depende del hardware
useFrame(() => {
  malla.current.position.x += 0.02
})

// Bien: la velocidad está en unidades por segundo
const VELOCIDAD = 1.2 // unidades/s

useFrame((_, delta) => {
  malla.current.position.x += VELOCIDAD * Math.min(delta, 0.1)
})`,
        },
        {
          tipo: 'destacado',
          tono: 'porque',
          titulo: 'Por qué el límite de `delta` no es opcional',
          texto:
            'Si el navegador se congela medio segundo (una pestaña en segundo plano, un `console.log` gigante, un breakpoint), el siguiente `delta` vale 0,5 y tu objeto puede teletransportarse fuera de la pantalla. Acotarlo a 0,1 s convierte un salto en un tirón pequeño y evita que la física o la cámara se desestabilicen.',
        },
        {
          tipo: 'tabla',
          cabecera: ['Frecuencia', '`delta` medio', 'Frames en un segundo de animación'],
          filas: [
            ['30 fps', '0,0333 s', '30'],
            ['60 fps', '0,0167 s', '60'],
            ['120 fps', '0,0083 s', '120'],
            ['144 fps', '0,0069 s', '144'],
          ],
        },
        {
          tipo: 'lista',
          items: [
            'Velocidad en unidades por segundo, siempre.',
            'Rotación en radianes por segundo.',
            'Un temporizador de «2 segundos» se hace acumulando `delta`, no contando frames.',
            'Para animaciones de duración fija es más simple usar una curva por tiempo absoluto (`clock.elapsedTime`).',
            'En tests, `delta` se puede forzar: el bucle de R3F acepta que se controle el reloj, lo que permite resultados deterministas.',
          ],
        },
      ],
      errores: [
        {
          sintoma: 'La animación va el doble de rápida en un portátil gaming que en el monitor de la oficina.',
          causa: 'Se suma una constante por frame en vez de multiplicar por `delta`.',
          arreglo: 'Multiplica: `velocidad * delta`, con la velocidad expresada por segundo.',
        },
        {
          sintoma: 'Al volver de otra pestaña el objeto aparece al otro lado de la escena.',
          causa: 'El `delta` acumulado se aplicó entero.',
          arreglo: '`Math.min(delta, 0.1)` antes de usarlo.',
        },
        {
          sintoma: 'La animación se acelera justo después de un tirón.',
          causa: 'Un `delta` grande hace que varias actualizaciones se apliquen en un solo frame grande.',
          arreglo:
            'Para movimiento simple basta el límite. Para simulación, acumula tiempo y ejecuta pasos fijos (lo verás con física en el módulo 10).',
        },
      ],
      quiz: [
        {
          tipo: 'unica',
          enunciado: 'Un objeto debe avanzar 2 unidades por segundo. ¿Qué escribes?',
          opciones: [
            '`position.x += 2 * delta`',
            '`position.x += 2`',
            '`position.x += 2 / 60`',
            '`position.x += delta / 2`',
          ],
          correcta: 0,
          explicacion: 'Velocidad por segundo multiplicada por el tiempo transcurrido.',
        },
        {
          tipo: 'verdadero-falso',
          enunciado: 'Usar `delta` hace que la animación sea independiente de los FPS.',
          correcta: true,
          explicacion: 'Es exactamente su propósito: el resultado depende del tiempo, no del número de frames.',
        },
        {
          tipo: 'multiple',
          enunciado: '¿Qué consecuencias tiene no acotar `delta`?',
          opciones: [
            'Saltos tras volver de segundo plano',
            'Objetos que atraviesan paredes',
            'Que `delta` sea negativo',
            'Inestabilidad en simulaciones',
          ],
          correctas: [0, 1, 3],
          explicacion: '`delta` no puede ser negativo, pero sí enorme. Un paso grande atraviesa colisiones y desestabiliza.',
        },
        {
          tipo: 'unica',
          enunciado: 'A 144 fps, ¿cómo es el `delta` respecto a 60 fps?',
          opciones: ['Unas 2,4 veces menor', 'Igual', '2,4 veces mayor', 'No existe'],
          correcta: 0,
          explicacion: '144/60 = 2,4, y el tiempo por frame es inversamente proporcional a la frecuencia.',
        },
      ],
      recursos: [
        {
          titulo: 'three.js: Clock',
          url: 'https://threejs.org/docs/#api/en/core/Clock',
          nota: '`getDelta()` es la fuente del valor que recibe `useFrame`.',
        },
        {
          titulo: 'R3F: useFrame',
          url: 'https://r3f.docs.pmnd.rs/api/hooks#useframe',
          nota: 'La firma `(state, delta)` y el orden de llamada.',
        },
        {
          titulo: 'Glenn Fiedler: Fix Your Timestep!',
          url: 'https://gafferongames.com/post/fix_your_timestep/',
          nota: 'El artículo clásico sobre pasos fijos frente a variables. Denso, pero es la referencia.',
        },
      ],
      ejercicio: {
        reto: 'Haz que dos cubos recorran la misma distancia en el mismo tiempo: uno con delta y otro con un temporizador basado en tiempo absoluto.',
        inicial: `import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import type { Mesh } from 'three'

function Cubos() {
  const a = useRef<Mesh>(null)
  const b = useRef<Mesh>(null)
  const t = useRef(0)

  useFrame((state, delta) => {
    // TODO: ambos deben ir de x=-2 a x=2 en 3 segundos, con la misma fórmula de tiempo
    if (a.current) a.current.position.x = -2
    if (b.current) b.current.position.x = -2
  })

  return (
    <>
      <mesh ref={a} position={[0, 0.4, 0]}>
        <boxGeometry args={[0.4, 0.4, 0.4]} />
        <meshBasicMaterial color="#4d8df6" />
      </mesh>
      <mesh ref={b} position={[0, -0.4, 0]}>
        <boxGeometry args={[0.4, 0.4, 0.4]} />
        <meshBasicMaterial color="#f5a524" />
      </mesh>
    </>
  )
}

export default function App() {
  return (
    <div style={{ height: 300 }}>
      <Canvas camera={{ position: [0, 1.5, 5] }}>
        <Cubos />
      </Canvas>
    </div>
  )
}`,
        solucion: `import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import type { Mesh } from 'three'

const DURACION = 3
const DESDE = -2
const HASTA = 2

function Cubos() {
  const a = useRef<Mesh>(null)
  const b = useRef<Mesh>(null)
  const t = useRef(0)

  useFrame((state, delta) => {
    // Opción A: acumular delta, reiniciando al llegar al final.
    t.current = (t.current + Math.min(delta, 0.1)) % DURACION
    const avance = t.current / DURACION

    if (a.current) a.current.position.x = DESDE + (HASTA - DESDE) * avance

    // Opción B: reloj absoluto del renderer.
    const absoluto = state.clock.elapsedTime % DURACION
    if (b.current) b.current.position.x = DESDE + (HASTA - DESDE) * (absoluto / DURACION)
  })

  return (
    <>
      <mesh ref={a} position={[0, 0.4, 0]}>
        <boxGeometry args={[0.4, 0.4, 0.4]} />
        <meshBasicMaterial color="#4d8df6" />
      </mesh>
      <mesh ref={b} position={[0, -0.4, 0]}>
        <boxGeometry args={[0.4, 0.4, 0.4]} />
        <meshBasicMaterial color="#f5a524" />
      </mesh>
    </>
  )
}

export default function App() {
  return (
    <div style={{ height: 300 }}>
      <Canvas camera={{ position: [0, 1.5, 5] }}>
        <Cubos />
      </Canvas>
    </div>
  )
}`,
        pistas: [
          'Guarda el tiempo transcurrido en un `useRef` y reinícialo con `% DURACION`.',
          'La posición es `DESDE + (HASTA - DESDE) * (t / DURACION)`.',
          'El reloj absoluto está en `state.clock.elapsedTime`.',
        ],
      },
    },
    {
      id: '5.3',
      modulo: 5,
      titulo: 'Interpolación y damping',
      objetivo:
        'Suavizar el movimiento con `lerp`, `damp` y curvas de easing, y elegir la técnica según si el objetivo es fijo o se mueve.',
      nivel: 'medio',
      minutos: 55,
      bloques: [
        {
          tipo: 'parrafo',
          texto:
            'Mover algo de A a B en línea recta a velocidad constante se ve robótico. Casi todo lo que quieres en una escena es una aproximación suave: el objeto no salta al objetivo, se acerca. La demo enfrenta cuatro técnicas sobre el mismo blanco. Cambia el objetivo y observa quién se pasa, quién se queda corto y quién nunca llega del todo.',
        },
        { tipo: 'demo', id: 'm5-curvas', titulo: 'Cuatro formas de llegar al mismo punto' },
        {
          tipo: 'codigo',
          lenguaje: 'tsx',
          titulo: 'Las tres fórmulas que vas a usar',
          codigo: `// 1. Interpolación simple: depende del frame, NO uses esto para animar.
posicion.lerp(objetivo, 0.1)

// 2. Interpolación independiente del frame.
const t = 1 - Math.exp(-8 * delta) // 8 = rapidez
posicion.lerp(objetivo, t)

// 3. Damping de three.js: hace lo anterior y admite objetivo móvil.
posicion.x = THREE.MathUtils.damp(posicion.x, objetivo.x, 8, delta)

// 4. Muelle (react-spring o cálculo propio): se pasa de largo y vuelve.`,
        },
        {
          tipo: 'destacado',
          tono: 'porque',
          titulo: 'Por qué `lerp` con un factor fijo está mal',
          texto:
            'Porque `lerp(a, b, 0.1)` avanza el 10 % de la distancia restante en cada frame. A 144 fps ese 10 % se aplica 144 veces por segundo y el objeto llega 2,4 veces antes. `damp` y el exponencial corrigen eso: el factor se calcula a partir de `delta`, así que el resultado es el mismo a cualquier frecuencia.',
        },
        {
          tipo: 'tabla',
          cabecera: ['Técnica', 'Se pasa de largo', 'Objetivo móvil', 'Cuándo usarla'],
          filas: [
            ['`lerp` fijo', 'No', 'Sí, pero a destiempo', 'Nunca para animar'],
            ['`lerp` con exponencial', 'No', 'Sí', 'Seguimiento suave de cámara o cursor'],
            ['`MathUtils.damp`', 'No', 'Sí', 'La opción por defecto en `useFrame`'],
            ['Muelle', 'Sí', 'Sí', 'Cuando quieres rebote, no solo suavidad'],
            ['Easing con `t` normalizado', 'No', 'No', 'Animaciones con duración conocida'],
          ],
        },
        {
          tipo: 'lista',
          items: [
            'Un `lambda` mayor en `damp` acerca más rápido: es una frecuencia, no un porcentaje.',
            'El damping nunca alcanza el objetivo exacto; se queda asintóticamente cerca. Umbraliza si necesitas precisión.',
            'Para una animación con principio y fin, normaliza el tiempo (`0..1`) y aplica una curva de easing.',
            '`THREE.MathUtils.smoothstep(x, min, max)` devuelve una transición suave entre dos umbrales.',
            'Las curvas de easing se pueden compartir entre objetos: escribe la función una vez.',
          ],
        },
      ],
      errores: [
        {
          sintoma: 'El objeto se acerca pero nunca se detiene del todo.',
          causa: 'Estás usando `damp` o un `lerp` exponencial, que son asintóticos.',
          arreglo:
            'Si la distancia es menor que una épsilon (por ejemplo 0,001), asigna el objetivo exacto y deja de actualizar.',
        },
        {
          sintoma: 'El movimiento vibra alrededor del objetivo a FPS altos.',
          causa: 'Un `lerp` con factor cercano a 1 aplicado muchas veces por segundo.',
          arreglo: 'Cambia a `damp` con el `delta`, o reduce el factor.',
        },
        {
          sintoma: 'La cámara sigue al jugador con retraso perceptible.',
          causa: 'El `lambda` del damping es demasiado bajo para la velocidad del objetivo.',
          arreglo: 'Súbelo (de 4 a 10) y comprueba con el objetivo moviéndose rápido, no quieto.',
        },
      ],
      quiz: [
        {
          tipo: 'unica',
          enunciado: '¿Qué hace `THREE.MathUtils.damp(actual, objetivo, lambda, delta)`?',
          opciones: [
            'Acerca `actual` a `objetivo` de forma independiente de los FPS',
            'Devuelve un número aleatorio alrededor del objetivo',
            'Interpola linealmente con un factor fijo',
            'Reinicia la animación',
          ],
          correcta: 0,
          explicacion: 'Es la versión correcta de un `lerp` continuo: el factor se deriva de `lambda` y `delta`.',
        },
        {
          tipo: 'verdadero-falso',
          enunciado: 'Un muelle y un damping producen el mismo resultado visual.',
          correcta: false,
          explicacion: 'El muelle puede pasarse de largo y volver; el damping se acerca sin sobrepasar.',
        },
        {
          tipo: 'multiple',
          enunciado: '¿Qué técnicas sirven para un objetivo que se mueve?',
          opciones: ['`MathUtils.damp`', 'Muelle', 'Easing con `t` normalizado', '`lerp` con factor exponencial'],
          correctas: [0, 1, 3],
          explicacion:
            'El easing con `t` normalizado supone un destino fijo: si el objetivo se mueve, la animación apunta a un sitio al que ya no va.',
        },
        {
          tipo: 'unica',
          enunciado: '¿Qué valor de `lambda` acerca más rápido?',
          opciones: ['12', '4', '0.1', 'Depende solo de `delta`'],
          correcta: 0,
          explicacion: '`lambda` es una frecuencia: cuanto mayor, menos tiempo tarda en recorrer la distancia.',
        },
      ],
      recursos: [
        {
          titulo: 'three.js: MathUtils',
          url: 'https://threejs.org/docs/#api/en/math/MathUtils',
          nota: '`damp`, `lerp`, `smoothstep` y compañía, con la firma exacta.',
        },
        {
          titulo: 'easings.net',
          url: 'https://easings.net/',
          nota: 'Catálogo visual de curvas con sus fórmulas. Elige mirando, no adivinando.',
        },
        {
          titulo: 'The book of shaders: shaping functions',
          url: 'https://thebookofshaders.com/05/',
          nota: 'Aunque sea de shaders, es la mejor explicación gráfica de `smoothstep` y las curvas.',
        },
      ],
      ejercicio: {
        reto: 'Haz que un cubo siga al puntero sobre un plano y se detenga con suavidad, sin pasarse del objetivo.',
        inicial: `import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import type { Mesh } from 'three'
import * as THREE from 'three'

function Perseguidor() {
  const malla = useRef<Mesh>(null)
  const objetivo = useRef(new THREE.Vector3())

  useFrame((state, delta) => {
    if (!malla.current) return
    // TODO: mueve el objetivo con el puntero y acerca la malla con damping
    objetivo.current.set(0, 0, 0)
    malla.current.position.lerp(objetivo.current, 0.05)
  })

  return (
    <mesh ref={malla}>
      <boxGeometry args={[0.5, 0.5, 0.5]} />
      <meshNormalMaterial />
    </mesh>
  )
}

export default function App() {
  return (
    <div style={{ height: 320 }}>
      <Canvas camera={{ position: [0, 0, 5] }}>
        <Perseguidor />
      </Canvas>
    </div>
  )
}`,
        solucion: `import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import type { Mesh } from 'three'
import * as THREE from 'three'

function Perseguidor() {
  const malla = useRef<Mesh>(null)
  const objetivo = useRef(new THREE.Vector3())

  useFrame((state, delta) => {
    if (!malla.current) return
    const dt = Math.min(delta, 0.1)

    // El puntero de R3F está normalizado: -1..1 en ambos ejes.
    objetivo.current.set(state.pointer.x * 1.6, state.pointer.y * 1.6, 0)

    malla.current.position.x = THREE.MathUtils.damp(malla.current.position.x, objetivo.current.x, 8, dt)
    malla.current.position.y = THREE.MathUtils.damp(malla.current.position.y, objetivo.current.y, 8, dt)
  })

  return (
    <mesh ref={malla}>
      <boxGeometry args={[0.5, 0.5, 0.5]} />
      <meshNormalMaterial />
    </mesh>
  )
}

export default function App() {
  return (
    <div style={{ height: 320 }}>
      <Canvas camera={{ position: [0, 0, 5] }}>
        <Perseguidor />
      </Canvas>
    </div>
  )
}`,
        pistas: [
          'El puntero está en `state.pointer`, con valores entre -1 y 1.',
          'Multiplica por un radio para no salirte de la pantalla.',
          '`MathUtils.damp(actual, objetivo, lambda, delta)` es la pieza que falta.',
        ],
      },
    },
    {
      id: '5.4',
      modulo: 5,
      titulo: 'react-spring: animación declarativa',
      objetivo:
        'Animar propiedades de three.js con `useSpring` y `animated`, y ajustar rigidez y amortiguación con criterio.',
      nivel: 'medio',
      minutos: 55,
      bloques: [
        {
          tipo: 'parrafo',
          texto:
            'Hasta ahora animas tú: calculas el factor, aplicas el damping, decides cuándo parar. react-spring invierte la responsabilidad. Declaras el estado final y la librería calcula los frames intermedios con un modelo de muelle físico. Tú eliges cómo se siente (rigidez, amortiguación, masa) y ella se encarga del resto, incluidas las interrupciones.',
        },
        { tipo: 'demo', id: 'm5-react-spring', titulo: 'Pulsa la caja y cambia el muelle a mitad de vuelo' },
        {
          tipo: 'codigo',
          lenguaje: 'tsx',
          titulo: 'Un muelle sobre la escala',
          codigo: `import { a, useSpring } from '@react-spring/three'

function Caja({ activo }: { activo: boolean }) {
  const { escala } = useSpring({
    escala: activo ? 1.4 : 1,
    config: { tension: 220, friction: 18 },
  })

  return (
    <a.mesh scale={escala}>
      <boxGeometry args={[1, 1, 1]} />
      <meshNormalMaterial />
    </a.mesh>
  )
}`,
        },
        {
          tipo: 'destacado',
          tono: 'porque',
          titulo: 'Por qué `a.mesh` y no `mesh`',
          texto:
            'Porque un `<mesh>` normal espera números, y `escala` aquí es un valor animado que cambia cada frame. `a.mesh` es la misma clase envuelta para aceptar valores de spring: los aplica por el mecanismo de R3F (mutando la propiedad) sin provocar renders de React.',
        },
        {
          tipo: 'tabla',
          cabecera: ['Parámetro', 'Qué controla', 'Subirlo produce'],
          filas: [
            ['`tension`', 'Fuerza del muelle', 'Más velocidad, más rebote'],
            ['`friction`', 'Amortiguación', 'Menos rebote, llegada más seca'],
            ['`mass`', 'Inercia', 'Movimiento más pesado y lento'],
            ['`precision`', 'Umbral de parada', 'Cortar antes el cálculo cuando está cerca'],
          ],
        },
        {
          tipo: 'lista',
          items: [
            '`useSprings` para muchas animaciones independientes; `useTrail` para que vayan en cadena.',
            '`config` puede ser un preset (`"wobbly"`, `"gentle"`, `"stiff"`) o números.',
            'Cambiar el valor destino a mitad de animación no la reinicia: el muelle reacciona desde donde está.',
            '`immediate: true` salta sin animar, útil para teletransportes.',
            'El paquete es `@react-spring/three`; importar `react-spring` a secas no sirve para `a.mesh`.',
          ],
        },
      ],
      errores: [
        {
          sintoma: '`a.mesh` lanza un error de tipos con `scale`.',
          causa: 'El valor del spring es un `SpringValue<number>` y la prop espera tres números.',
          arreglo: 'Usa `scale={escala}` con `escala` animando un solo número, o anima un array `[x, y, z]` completo.',
        },
        {
          sintoma: 'La animación no arranca.',
          causa: 'Se importó `useSpring` de `react-spring` en lugar de `@react-spring/three`.',
          arreglo: 'Cambia el import: la versión de three trae `a.*` y el puente con R3F.',
        },
        {
          sintoma: 'Cada cambio de estado reinicia el muelle desde cero.',
          causa: 'Se está remontando el componente (una `key` que cambia, o una condición que lo desmonta).',
          arreglo: 'Mantén el componente montado y cambia solo el valor destino.',
        },
      ],
      quiz: [
        {
          tipo: 'unica',
          enunciado: '¿Qué hace `a.mesh` de `@react-spring/three`?',
          opciones: [
            'Un `mesh` que acepta valores animados como props',
            'Una malla de un solo triángulo',
            'Un atajo para un `<mesh>`',
            'Un componente de física',
          ],
          correcta: 0,
          explicacion: 'Envuelve las props para que puedan venir de un spring y se apliquen sin re-render.',
        },
        {
          tipo: 'verdadero-falso',
          enunciado: 'Cambiar el destino a mitad de animación reinicia el muelle desde la posición inicial.',
          correcta: false,
          explicacion: 'Continúa desde el estado actual. Es una de sus ventajas frente a una animación por keyframes.',
        },
        {
          tipo: 'multiple',
          enunciado: '¿Qué parámetros cambian el tacto de un muelle?',
          opciones: ['`tension`', '`friction`', '`mass`', '`colorSpace`'],
          correctas: [0, 1, 2],
          explicacion: '`colorSpace` no tiene nada que ver: es de texturas.',
        },
        {
          tipo: 'unica',
          enunciado: 'Para que diez objetos entren en cascada, ¿qué hook conviene?',
          opciones: ['`useTrail`', '`useSpring`', '`useTransition`', '`useFrame`'],
          correcta: 0,
          explicacion: '`useTrail` encadena animaciones idénticas con un retardo entre ellas.',
        },
      ],
      recursos: [
        {
          titulo: 'react-spring: three.js',
          url: 'https://react-spring.dev/docs/guides/three-js',
          nota: 'La guía oficial de la integración con R3F.',
        },
        {
          titulo: 'react-spring: config',
          url: 'https://react-spring.dev/docs/advanced/config',
          nota: 'Qué significan tensión, fricción y masa, con presets.',
        },
        {
          titulo: 'R3F: animation',
          url: 'https://r3f.docs.pmnd.rs/getting-started/installation',
          nota: 'Contexto de por qué la animación va fuera del ciclo de React.',
        },
      ],
      ejercicio: {
        reto: 'Haz que un cubo cambie de escala y de color al pulsar, con un muelle que se pueda interrumpir sin reiniciarse.',
        inicial: `import { useState } from 'react'
import { Canvas } from '@react-three/fiber'

function Caja({ activo }: { activo: boolean }) {
  // TODO: anima la escala entre 1 y 1.5 con useSpring
  return (
    <mesh scale={1}>
      <boxGeometry args={[1, 1, 1]} />
      <meshNormalMaterial />
    </mesh>
  )
}

export default function App() {
  const [activo, setActivo] = useState(false)
  return (
    <div style={{ height: 320 }}>
      <button onClick={() => setActivo(!activo)}>Alternar</button>
      <Canvas camera={{ position: [0, 0, 4] }}>
        <Caja activo={activo} />
      </Canvas>
    </div>
  )
}`,
        solucion: `import { useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { THREE } from 'three'
import { a, useSpring } from '@react-spring/three'

function Caja({ activo }: { activo: boolean }) {
  const { escala } = useSpring({
    escala: activo ? 1.5 : 1,
    config: { tension: 240, friction: 16 },
  })

  return (
    <a.mesh scale={escala}>
      <boxGeometry args={[1, 1, 1]} />
      <meshNormalMaterial />
    </a.mesh>
  )
}

export default function App() {
  const [activo, setActivo] = useState(false)
  return (
    <div style={{ height: 320 }}>
      <button onClick={() => setActivo(!activo)}>Alternar</button>
      <Canvas camera={{ position: [0, 0, 4] }}>
        <Caja activo={activo} />
      </Canvas>
    </div>
  )
}`,
        pistas: [
          'Necesitas `useSpring` de `@react-spring/three` y `a.mesh`.',
          'El valor destino es `activo ? 1.5 : 1`.',
          'Importa `a` y `useSpring` del paquete `@react-spring/three`, no de `react-spring`.',
        ],
      },
    },
    {
      id: '5.5',
      modulo: 5,
      titulo: 'Coreografía y secuencias',
      objetivo:
        'Encadenar varios pasos con duraciones, retardos y curvas distintas dentro de un único `useFrame`, sin temporizadores sueltos.',
      nivel: 'alto',
      minutos: 55,
      bloques: [
        {
          tipo: 'parrafo',
          texto:
            'Una animación interesante casi nunca es una sola interpolación: son cuatro o cinco cosas que ocurren en un orden, con solapes. Un cofre se abre, la tapa gira, la cerradura salta y las monedas salen despedidas. Si cada paso lleva su propio `setTimeout`, tendrás una carrera de temporizadores que no puedes pausar, reiniciar ni sincronizar con el frame.',
        },
        { tipo: 'demo', id: 'm5-cofre', titulo: 'Cuatro pasos, cuatro curvas, un solo reloj' },
        {
          tipo: 'codigo',
          lenguaje: 'tsx',
          titulo: 'Una línea de tiempo explícita',
          codigo: `const PASOS = [
  { inicio: 0.0, fin: 0.35, curva: 'back' },   // cerradura
  { inicio: 0.3, fin: 1.1, curva: 'inOut' },   // tapa
  { inicio: 1.0, fin: 1.4, curva: 'out' },     // brillo
  { inicio: 1.15, fin: 2.0, curva: 'out' },    // monedas
]

function avance(t, inicio, fin) {
  return Math.min(1, Math.max(0, (t - inicio) / (fin - inicio)))
}

useFrame((state) => {
  const t = state.clock.elapsedTime % CICLO
  tapa.current.rotation.x = -1.9 * easeInOut(avance(t, 0.3, 1.1))
})`,
        },
        {
          tipo: 'destacado',
          tono: 'porque',
          titulo: 'Por qué un reloj único y no temporizadores',
          texto:
            'Porque un reloj es determinista: en cualquier frame puedes calcular el estado completo a partir del tiempo. Eso te da pausa, reinicio, cámara lenta y repetición gratis. Cinco `setTimeout` no se pueden rebobinar, y si el usuario cambia de pestaña se desincronizan entre sí.',
        },
        {
          tipo: 'pasos',
          items: [
            {
              titulo: '1. Define la línea de tiempo',
              texto:
                'Escribe los pasos con su inicio y su fin en segundos. Es una tabla, no código disperso por el componente.',
            },
            {
              titulo: '2. Normaliza cada tramo',
              texto:
                'Convierte el tiempo absoluto en un 0..1 por paso. A partir de ahí todo es una función pura de ese número.',
            },
            {
              titulo: '3. Aplica la curva a cada paso',
              texto:
                '`back` para lo que debe anticipar, `inOut` para lo grande, `out` para lo que aparece y se queda.',
            },
            {
              titulo: '4. Compón el estado final',
              texto:
                'Cada propiedad se calcula desde su curva. Nada de acumular incrementos: siempre desde el tiempo.',
            },
          ],
        },
        {
          tipo: 'lista',
          items: [
            'Solapa los pasos un poco: el movimiento se ve más vivo que si van en bloque.',
            'Usa un solo `useFrame` para toda la secuencia; varios compiten por el orden.',
            'Si la secuencia debe poder pausarse, guarda el tiempo acumulado en un `ref` y no uses `elapsedTime` directamente.',
            'Para secuencias disparadas por eventos, react-spring con `useChain` es una alternativa válida.',
            'Un ciclo completo debe cerrar: si empieza y acaba en el mismo estado, se puede repetir sin salto.',
          ],
        },
      ],
      errores: [
        {
          sintoma: 'Los pasos van a destiempo después de un rato.',
          causa: 'Cada paso lleva su propio `setInterval`, y los intervalos derivan entre sí.',
          arreglo: 'Un único reloj y funciones puras del tiempo: todos los pasos leen la misma fuente.',
        },
        {
          sintoma: 'Al cambiar de pestaña la secuencia se queda a medias.',
          causa: 'Se usan temporizadores que no se pausan con el frame.',
          arreglo: 'Acumula `delta` acotado; si el canvas se pausa, el tiempo deja de avanzar.',
        },
        {
          sintoma: 'La secuencia se reinicia al mover el ratón.',
          causa: 'Se recalcula el tiempo en función de un estado que cambia con el puntero.',
          arreglo: 'El tiempo debe venir del reloj, no del estado de la interfaz.',
        },
      ],
      quiz: [
        {
          tipo: 'unica',
          enunciado: '¿Qué ventaja tiene calcular la secuencia como función del tiempo?',
          opciones: [
            'Se puede pausar, rebobinar y repetir',
            'Ocupa menos memoria',
            'Evita tener que usar `useFrame`',
            'Mejora la resolución del canvas',
          ],
          correcta: 0,
          explicacion:
            'Con una función pura del tiempo, cualquier fotograma se puede reconstruir. Con incrementos acumulados, no.',
        },
        {
          tipo: 'verdadero-falso',
          enunciado: 'Es mejor un `setTimeout` por paso para que no interfieran.',
          correcta: false,
          explicacion: 'Justo lo contrario: los temporizadores derivan, no se pausan con el render y no se pueden sincronizar.',
        },
        {
          tipo: 'multiple',
          enunciado: '¿Qué hace que una secuencia se vea «de dibujos animados»?',
          opciones: [
            'Solapar los pasos',
            'Usar curvas distintas por paso',
            'Que todos los pasos empiecen y acaben a la vez',
            'Que la anticipación sea visible',
          ],
          correctas: [0, 1, 3],
          explicacion: 'Empezar y acabar todo a la vez es la receta del movimiento robótico.',
        },
        {
          tipo: 'unica',
          enunciado: 'Para una pausa fiable, ¿qué guardas?',
          opciones: [
            'Tiempo acumulado en un `ref`',
            '`performance.now()` de cada frame',
            'El número de frames dibujados',
            'El estado en `localStorage`',
          ],
          correcta: 0,
          explicacion: 'Acumular `delta` (acotado) te da un reloj que solo avanza cuando la escena avanza.',
        },
      ],
      recursos: [
        {
          titulo: 'react-spring: useChain',
          url: 'https://react-spring.dev/docs/components/use-chain',
          nota: 'Alternativa declarativa para encadenar animaciones disparadas por eventos.',
        },
        {
          titulo: 'R3F: useFrame',
          url: 'https://r3f.docs.pmnd.rs/api/hooks#useframe',
          nota: 'Recordatorio de que la prioridad importa cuando hay varias animaciones.',
        },
        {
          titulo: 'easings.net',
          url: 'https://easings.net/',
          nota: 'Para elegir la curva de cada paso con criterio visual.',
        },
      ],
      ejercicio: {
        reto: 'Encadena tres pasos sobre un mismo cubo: crece, gira y cambia de color, con la mitad de duración cada uno y solapando un 20 %.',
        inicial: `import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import type { Mesh } from 'three'

const CICLO = 3

function avance(t: number, inicio: number, fin: number) {
  return Math.min(1, Math.max(0, (t - inicio) / (fin - inicio)))
}

function Cubo() {
  const malla = useRef<Mesh>(null)

  useFrame((state) => {
    const t = state.clock.elapsedTime % CICLO
    if (!malla.current) return

    // TODO: paso 1 (0 → 1s) escala; paso 2 (0.8 → 1.8) rotación; paso 3 (1.6 → 2.6) color
    malla.current.scale.setScalar(1)
    malla.current.rotation.y = 0
  })

  return (
    <mesh ref={malla}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="#4d8df6" />
    </mesh>
  )
}

export default function App() {
  return (
    <div style={{ height: 320 }}>
      <Canvas camera={{ position: [0, 1.5, 4] }}>
        <ambientLight intensity={0.8} />
        <directionalLight position={[3, 4, 2]} intensity={2} />
        <Cubo />
      </Canvas>
    </div>
  )
}`,
        solucion: `import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import type { Mesh, MeshStandardMaterial } from 'three'

const CICLO = 3

function avance(t: number, inicio: number, fin: number) {
  return Math.min(1, Math.max(0, (t - inicio) / (fin - inicio)))
}

function Cubo() {
  const malla = useRef<Mesh>(null)
  const material = useRef<MeshStandardMaterial>(null)

  useFrame((state) => {
    const t = state.clock.elapsedTime % CICLO
    if (!malla.current || !material.current) return

    const escala = avance(t, 0, 1)
    const giro = avance(t, 0.8, 1.8)
    const mezcla = avance(t, 1.6, 2.6)

    malla.current.scale.setScalar(1 + escala * 0.6)
    malla.current.rotation.y = giro * Math.PI * 2

    material.current.color.setRGB(0.3 + mezcla * 0.65, 0.55 - mezcla * 0.3, 0.96 - mezcla * 0.6)
  })

  return (
    <mesh ref={malla}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial ref={material} color="#4d8df6" />
    </mesh>
  )
}

export default function App() {
  return (
    <div style={{ height: 320 }}>
      <Canvas camera={{ position: [0, 1.5, 4] }}>
        <ambientLight intensity={0.8} />
        <directionalLight position={[3, 4, 2]} intensity={2} />
        <Cubo />
      </Canvas>
    </div>
  )
}`,
        pistas: [
          'Cada paso se calcula con `avance(t, inicio, fin)`, que devuelve 0..1.',
          'Para el color puedes usar `material.current.color.setRGB(r, g, b)`.',
          'Necesitas un `ref` al material además del de la malla.',
        ],
      },
    },
    {
      id: '5.6',
      modulo: 5,
      titulo: '`frameloop="demand"` e `invalidate`',
      objetivo:
        'Pintar solo cuando hay algo que pintar, y decidir con criterio cuándo un canvas debe estar siempre activo y cuándo no.',
      nivel: 'alto',
      minutos: 40,
      bloques: [
        {
          tipo: 'parrafo',
          texto:
            'Un canvas en `frameloop="always"` dibuja 60 veces por segundo aunque no cambie nada. En una escena con tres demos, eso son tres contextos WebGL trabajando para producir imágenes idénticas. `demand` cambia el contrato: dibuja un frame cuando se lo pides, y tú eres responsable de pedirlo cuando algo cambia.',
        },
        { tipo: 'demo', id: 'm5-demand', titulo: 'El contador deja de subir' },
        {
          tipo: 'codigo',
          lenguaje: 'tsx',
          titulo: 'Pedir un frame a mano',
          codigo: `<Canvas frameloop="demand">
  <Escena />
</Canvas>

function Escena() {
  const invalidate = useThree((estado) => estado.invalidate)
  const [girado, setGirado] = useState(false)

  // Al cambiar el estado, R3F ya invalida solo.
  return (
    <mesh
      rotation={[0, girado ? Math.PI / 4 : 0, 0]}
      onClick={() => setGirado((v) => !v)}
    >
      <boxGeometry />
      <meshNormalMaterial />
    </mesh>
  )
}

// Si mutas algo fuera de React, pide el frame tú:
// malla.current.rotation.y += 0.1
// invalidate()`,
        },
        {
          tipo: 'destacado',
          tono: 'porque',
          titulo: 'Por qué `demand` no rompe `useFrame`',
          texto:
            'Porque `useFrame` se ejecuta durante el frame que se dibuja, no en un bucle propio. En `demand`, se ejecuta una vez por cada frame pedido. Si esperabas que animara sola, el objeto se queda quieto: es el síntoma clásico de activar `demand` y olvidar quién invalidaba.',
        },
        {
          tipo: 'tabla',
          cabecera: ['Modo', 'Cuándo dibuja', 'Coste', 'Cuándo usarlo'],
          filas: [
            ['`always`', 'Continuamente', 'Constante', 'Animación continua, juegos, demos'],
            ['`demand`', 'Al invalidar', 'Solo cuando hace falta', 'Visores, configuradores, gráficos estáticos'],
            ['`never`', 'Nunca (manual)', 'Control total', 'Cuándo tú llevas el bucle, casos raros'],
          ],
        },
        {
          tipo: 'lista',
          items: [
            '`invalidate()` pide un frame; varias llamadas en el mismo tick se agrupan.',
            'Los cambios de estado y de props de R3F invalidan automáticamente.',
            '`OrbitControls` invalida al moverse, así que `demand` funciona con él.',
            'Un cambio en la resolución del canvas o en el tamaño del contenedor también invalida.',
            'En el visor de este curso se usa `demand` porque el modelo está quieto hasta que lo arrastras.',
          ],
        },
      ],
      errores: [
        {
          sintoma: 'Con `demand`, la escena no se mueve.',
          causa: 'Hay animación en `useFrame` pero nadie llama a `invalidate()`.',
          arreglo: 'Llama a `invalidate()` cuando cambie algo, o vuelve a `always` si la animación es continua.',
        },
        {
          sintoma: 'La escena parpadea o se ve a medias al redimensionar.',
          causa: 'Se pintó mientras el canvas estaba a tamaño 0.',
          arreglo: 'No pidas frames durante el montaje; deja que el primer `ResizeObserver` lo haga.',
        },
        {
          sintoma: 'Con `demand` la primera imagen no aparece.',
          causa: 'Nadie ha invalidado tras el montaje en un caso raro (contenido inyectado por `primitive`).',
          arreglo: 'Un `invalidate()` en el primer `useEffect` lo resuelve.',
        },
      ],
      quiz: [
        {
          tipo: 'unica',
          enunciado: 'En `frameloop="demand"`, ¿cuándo se ejecuta `useFrame`?',
          opciones: ['Una vez por frame pedido', 'Nunca', 'Sesenta veces por segundo igualmente', 'Solo al desmontar'],
          correcta: 0,
          explicacion: 'El bucle no existe: cada `invalidate()` produce un frame y ahí corre `useFrame`.',
        },
        {
          tipo: 'verdadero-falso',
          enunciado: 'Cambiar el estado de React invalida el frame automáticamente.',
          correcta: true,
          explicacion: 'R3F pide un frame cuando cambia el árbol o las props. Solo las mutaciones manuales necesitan `invalidate()`.',
        },
        {
          tipo: 'multiple',
          enunciado: '¿Qué escenas se benefician de `demand`?',
          opciones: [
            'Un configurador de producto que gira solo al arrastrar',
            'Un juego con animación continua',
            'Un visor de modelos quieto',
            'Un gráfico 3D que solo cambia al elegir una opción',
          ],
          correctas: [0, 2, 3],
          explicacion: 'Si hay movimiento constante, `always` es lo correcto: en `demand` tendrías que invalidar en cada frame.',
        },
        {
          tipo: 'unica',
          enunciado: '¿Qué hace falta para mover un objeto mutando su `ref` en modo `demand`?',
          opciones: ['Llamar a `invalidate()`', 'Nada, se dibuja solo', 'Volver a montar el canvas', 'Usar `setState`'],
          correcta: 0,
          explicacion: 'La mutación no la ve nadie: hay que pedir explícitamente el frame.',
        },
      ],
      recursos: [
        {
          titulo: 'R3F: canvas',
          url: 'https://r3f.docs.pmnd.rs/api/canvas',
          nota: 'La prop `frameloop` y sus tres valores.',
        },
        {
          titulo: 'R3F: useThree',
          url: 'https://r3f.docs.pmnd.rs/api/hooks#usethree',
          nota: 'De dónde sale `invalidate` y qué más hay en el estado.',
        },
        {
          titulo: 'three.js: WebGLRenderer',
          url: 'https://threejs.org/docs/#api/en/renderers/WebGLRenderer',
          nota: '`setAnimationLoop` es lo que R3F usa por debajo.',
        },
      ],
      ejercicio: {
        reto: 'Convierte una escena animada en una que solo dibuja al pulsar, con un contador visible de frames.',
        inicial: `import { useRef, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import type { Mesh } from 'three'

function Cubo({ pasos }: { pasos: number }) {
  const malla = useRef<Mesh>(null)
  useFrame(() => {
    if (malla.current) malla.current.rotation.y = pasos * 0.2
  })
  return (
    <mesh ref={malla}>
      <boxGeometry />
      <meshNormalMaterial />
    </mesh>
  )
}

export default function App() {
  const [pasos, setPasos] = useState(0)
  return (
    <div style={{ height: 300 }}>
      <button onClick={() => setPasos(pasos + 1)}>Girar</button>
      <Canvas frameloop="demand" camera={{ position: [2, 2, 3] }}>
        <Cubo pasos={pasos} />
      </Canvas>
    </div>
  )
}`,
        solucion: `import { useEffect, useRef, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import type { Mesh } from 'three'

function Cubo({ pasos }: { pasos: number }) {
  const malla = useRef<Mesh>(null)
  useFrame(() => {
    if (malla.current) malla.current.rotation.y = pasos * 0.2
  })
  return (
    <mesh ref={malla}>
      <boxGeometry />
      <meshNormalMaterial />
    </mesh>
  )
}

/** Cuenta los frames realmente dibujados, sin provocar renders. */
function ContadorFrames({ alCambiar }: { alCambiar: (n: number) => void }) {
  const invalidate = useThree((estado) => estado.invalidate)
  const frames = useRef(0)

  useEffect(() => {
    // El contenido inicial no invalida por sí solo en algunos casos.
    invalidate()
  }, [invalidate])

  useFrame(() => {
    frames.current += 1
    if (frames.current % 5 === 0) alCambiar(frames.current)
  })

  return null
}

export default function App() {
  const [pasos, setPasos] = useState(0)
  const [dibujados, setDibujados] = useState(0)

  return (
    <div style={{ height: 300 }}>
      <button onClick={() => setPasos(pasos + 1)}>Girar</button>
      <p>frames dibujados: {dibujados}</p>
      <Canvas frameloop="demand" camera={{ position: [2, 2, 3] }}>
        <Cubo pasos={pasos} />
        <ContadorFrames alCambiar={setDibujados} />
      </Canvas>
    </div>
  )
}`,
        pistas: [
          'Cada clic cambia una prop, y eso ya invalida el frame.',
          'Para contar frames, un `useFrame` con un `ref` y actualizar el HTML de vez en cuando.',
          'No pongas el contador en estado en cada frame: eso anula el ahorro que buscas.',
        ],
      },
    },
  ],
}

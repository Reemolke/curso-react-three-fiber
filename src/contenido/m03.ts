import type { Modulo } from './tipos'

export const modulo3: Modulo = {
  numero: 3,
  titulo: 'El lienzo, las mallas y los materiales',
  descripcion:
    'Las tres piezas con las que se construye cualquier escena: un canvas que sabe adaptarse, mallas que unen forma y superficie, y materiales que deciden cómo responde esa superficie a la luz.',
  lecciones: [
    {
      id: '3.1',
      modulo: 3,
      titulo: '`<Canvas>`: el componente que lo cambia todo',
      objetivo:
        'Configurar un `<Canvas>` con `dpr`, `camera`, `shadows` y `gl`, y explicar qué cuesta cada una de esas decisiones.',
      nivel: 'intro',
      minutos: 45,
      bloques: [
        {
          tipo: 'parrafo',
          texto:
            'El `<Canvas>` parece una etiqueta más, pero es el componente que hace posible todo lo demás. Cuando se monta, crea un `WebGLRenderer`, un canvas HTML, una cámara por defecto, un `ResizeObserver` y el bucle de render. Tú no ves nada de eso: solo escribes hijos. Entender qué configura cada prop es la diferencia entre una demo que va fina y una que calienta el portátil.',
        },
        { tipo: 'demo', id: 'm3-canvas-dpr', titulo: 'Cambia `dpr` y `frameloop` y mira el contador' },
        {
          tipo: 'parrafo',
          texto:
            '`dpr` es la densidad de píxeles: cuántos píxeles reales se dibujan por cada píxel CSS. Con `dpr={1}` un lienzo de 800×400 usa 320 000 píxeles; con `dpr={2}` usa 1 280 000. El cuádruple de fragmentos para exactamente la misma imagen, solo más nítida. En pantallas retina se nota; en una tele a dos metros, no.',
        },
        {
          tipo: 'codigo',
          lenguaje: 'tsx',
          titulo: 'Las props que de verdad se usan',
          codigo: `<Canvas
  dpr={[1, 2]}                       // mínimo 1, máximo 2 (acotado por el dispositivo)
  camera={{ position: [3, 2.4, 4], fov: 45, near: 0.1, far: 100 }}
  shadows                            // activa el shadow map del renderer
  gl={{ antialias: true, alpha: true }}
  frameloop="always"                 // 'always' | 'demand' | 'never'
  onCreated={({ camera }) => camera.lookAt(0, 0, 0)}
>
  <Escena />
</Canvas>`,
        },
        {
          tipo: 'tabla',
          cabecera: ['Prop', 'Qué configura', 'Coste o efecto'],
          filas: [
            ['`dpr`', 'Píxeles reales por píxel CSS', 'Cuadrático: 2 duplica la nitidez y cuadruplica los fragmentos'],
            ['`camera`', 'Cámara por defecto', 'Ninguno; pero `fov` cambia toda la composición'],
            ['`shadows`', 'Shadow map del renderer', 'Cada luz con sombra añade una pasada de render'],
            ['`gl`', 'Opciones del `WebGLRenderer`', '`antialias` mejora bordes y cuesta memoria'],
            ['`frameloop`', 'Cuándo se dibuja', '`demand` ahorra batería; `always` anima sin pensar'],
          ],
        },
        {
          tipo: 'destacado',
          tono: 'porque',
          titulo: 'Por qué `dpr={[1, 2]}` y no `dpr={2}`',
          texto:
            'Porque un móvil de gama media con `dpr` 3 no puede con 9 veces los píxeles. El array fija un rango: R3F toma el `devicePixelRatio` real y lo recorta. Así la escena se ve nítida donde hay margen y no se hunde donde no lo hay.',
        },
        {
          tipo: 'destacado',
          tono: 'ojo',
          titulo: 'Una cosa que aún no toca',
          texto:
            'En la demo y en el contador aparece `useFrame`, que es el hook del módulo 5. Aquí solo hace dos cosas: girar el cubo un paso y contar frames dibujados cada medio segundo. No hace falta entenderlo todavía; basta con saber que ejecuta código una vez por frame.',
        },
        {
          tipo: 'lista',
          items: [
            'El canvas necesita altura: si el contenedor mide 0 px, no se ve nada y no hay error.',
            '`camera.fov` es el ángulo vertical en grados. Menos fov, más teleobjetivo.',
            'Con `frameloop="demand"` hay que pedir los frames; el módulo 5 lo explica a fondo.',
            '`gl={{ powerPreference: "high-performance" }}` ayuda en portátiles con dos GPUs.',
            'No cambies `dpr` en cada frame: cada cambio reasigna el búfer de dibujo.',
          ],
        },
      ],
      errores: [
        {
          sintoma: 'La demo se ve pero ocupa una franja de 150 px o nada en absoluto.',
          causa: 'El canvas hereda la altura de su contenedor, y el contenedor no tiene altura definida.',
          arreglo: 'Da altura explícita al contenedor (por ejemplo `height: 340`) o usa una clase con altura.',
        },
        {
          sintoma: 'En un móvil el canvas va a tirones y el ventilador del portátil se dispara.',
          causa: '`dpr` sin acotar: un dispositivo con densidad 3 dibuja nueve veces más píxeles.',
          arreglo: '`dpr={[1, 2]}`, o incluso `[1, 1.5]` en escenas con postprocesado.',
        },
        {
          sintoma: 'La escena aparece en negro hasta que redimensionas la ventana.',
          causa: 'El canvas se montó con tamaño 0 (por ejemplo, dentro de un contenedor oculto con `display: none`).',
          arreglo: 'Móntalo cuando el contenedor tenga tamaño, o fuerza un `resize` después de mostrarlo.',
        },
      ],
      quiz: [
        {
          tipo: 'unica',
          enunciado: '¿Qué crea `<Canvas>` además del contexto WebGL?',
          opciones: [
            'El canvas HTML, una cámara por defecto, un observador de tamaño y el bucle de render',
            'Solo el canvas HTML',
            'Una escena con una luz y un cubo de ejemplo',
            'Un servidor de desarrollo',
          ],
          correcta: 0,
          explicacion:
            'Es un componente de fontanería: renderer, cámara, resize y bucle. La escena la pones tú.',
        },
        {
          tipo: 'verdadero-falso',
          enunciado: 'Pasar de `dpr={1}` a `dpr={2}` duplica el número de píxeles que se sombrean.',
          correcta: false,
          explicacion:
            'Lo cuadruplica: el ancho y el alto se multiplican por dos, y el área por cuatro.',
        },
        {
          tipo: 'multiple',
          enunciado: '¿Qué props de estas pertenecen a `<Canvas>`?',
          opciones: ['`dpr`', '`camera`', '`geometry`', '`frameloop`'],
          correctas: [0, 1, 3],
          explicacion: '`geometry` es de `<mesh>`; no tiene sentido en el lienzo.',
        },
        {
          tipo: 'unica',
          enunciado: '¿Cuándo conviene `frameloop="demand"`?',
          opciones: [
            'En un visor quieto que solo cambia al interactuar',
            'En un juego con animación continua',
            'Cuando no hay luces',
            'Cuando el canvas es pequeño',
          ],
          correcta: 0,
          explicacion:
            'Si no hay movimiento continuo, dibujar sesenta veces por segundo la misma imagen es gasto puro.',
        },
      ],
      recursos: [
        {
          titulo: 'R3F: Canvas',
          url: 'https://r3f.docs.pmnd.rs/api/canvas',
          nota: 'Todas las props, incluidos `dpr`, `gl` y `frameloop`.',
        },
        {
          titulo: 'R3F: scaling performance',
          url: 'https://r3f.docs.pmnd.rs/advanced/scaling-performance',
          nota: 'Qué hacer cuando la escena empieza a ir lenta. `dpr` es el primer botón.',
        },
        {
          titulo: 'three.js: WebGLRenderer',
          url: 'https://threejs.org/docs/#api/en/renderers/WebGLRenderer',
          nota: 'El objeto que hay debajo; `setPixelRatio` y `setSize` son sus métodos.',
        },
      ],
      ejercicio: {
        reto: 'Añade un selector de densidad al canvas: un botón que alterne entre `dpr={1}` y `dpr={2}`, y una cámara con `fov` 35.',
        inicial: `import { useState } from 'react'
import { Canvas } from '@react-three/fiber'

export default function App() {
  const [nitido, setNitido] = useState(false)

  return (
    <div style={{ height: 320 }}>
      <button onClick={() => setNitido(!nitido)}>Alternar densidad</button>
      <Canvas camera={{ position: [2.6, 2, 3.6] }} frameloop="always">
        <ambientLight intensity={0.5} />
        <directionalLight position={[3, 4, 2]} intensity={2} />
        <mesh rotation={[0.4, 0.7, 0]}>
          <boxGeometry args={[1.2, 1.2, 1.2]} />
          <meshStandardMaterial color="#f5a524" />
        </mesh>
      </Canvas>
    </div>
  )
}`,
        solucion: `import { useState } from 'react'
import { Canvas } from '@react-three/fiber'

export default function App() {
  const [nitido, setNitido] = useState(false)

  return (
    <div style={{ height: 320 }}>
      <button onClick={() => setNitido(!nitido)}>Alternar densidad</button>
      <Canvas
        dpr={nitido ? 2 : 1}
        camera={{ position: [2.6, 2, 3.6], fov: 35 }}
        frameloop="always"
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[3, 4, 2]} intensity={2} />
        <mesh rotation={[0.4, 0.7, 0]}>
          <boxGeometry args={[1.2, 1.2, 1.2]} />
          <meshStandardMaterial color="#f5a524" />
        </mesh>
      </Canvas>
    </div>
  )
}`,
        pistas: [
          '`dpr` puede ser un número o un rango `[min, max]`.',
          '`camera` acepta `position`, `fov`, `near` y `far`.',
          'Si el cubo se ve muy grande con fov 35, es normal: el teleobjetivo comprime la perspectiva.',
        ],
      },
    },
    {
      id: '3.2',
      modulo: 3,
      titulo: 'Mallas: geometría + material',
      objetivo:
        'Explicar qué es una malla, qué aporta cada uno de sus dos objetos y cuándo conviene compartirlos entre varias mallas.',
      nivel: 'intro',
      minutos: 50,
      bloques: [
        {
          tipo: 'parrafo',
          texto:
            'Una malla es la unión de dos objetos que no se conocen entre sí: una geometría, que solo describe puntos y caras en el espacio local, y un material, que solo describe cómo responde una superficie a la luz. El `<mesh>` los junta y añade la transformación (posición, rotación, escala). Si te falta uno de los dos, no se dibuja nada.',
        },
        { tipo: 'demo', id: 'm3-geo-material', titulo: 'Dos selectores, una sola malla' },
        {
          tipo: 'parrafo',
          texto:
            'Prueba todas las combinaciones. La geometría decide la silueta y el número de triángulos; el material decide el color, el brillo y si la luz le afecta. Con el mismo material, el toro y la caja se ven radicalmente distintos; con la misma geometría, `basic` y `standard` también. Son dos ejes independientes, y por eso se eligen por separado.',
        },
        {
          tipo: 'codigo',
          lenguaje: 'tsx',
          titulo: 'Anatomía de una malla',
          codigo: `<mesh
  position={[0, 1, 0]}          // dónde está
  rotation={[0, Math.PI / 4, 0]} // cómo está girada (radianes)
  scale={[1, 1.4, 1]}            // cuánto mide
  castShadow
>
  <boxGeometry args={[1, 1, 1]} />              {/* la forma */}
  <meshStandardMaterial                         {/* la superficie */}
    color="#f5a524"
    roughness={0.35}
    metalness={0.2}
  />
</mesh>`,
        },
        {
          tipo: 'tabla',
          cabecera: ['Pregunta', 'La responde la geometría', 'La responde el material'],
          filas: [
            ['¿Qué forma tiene?', 'Sí', 'No'],
            ['¿De qué color es?', 'No', 'Sí'],
            ['¿Cuántos triángulos cuesta?', 'Sí', 'No'],
            ['¿Brilla o es mate?', 'No', 'Sí'],
            ['¿Se puede reutilizar en otra malla?', 'Sí', 'Sí'],
          ],
        },
        {
          tipo: 'destacado',
          tono: 'truco',
          titulo: 'Compartir no es copiar',
          texto:
            'Si creas veinte cajas con la misma geometría y el mismo material, en la GPU hay un solo búfer y un solo programa de shader: veinte transformaciones distintas. En R3F basta con guardar la geometría en una constante fuera del componente. Lo que no puedes compartir es la textura con distinto `repeat`; eso se clona.',
        },
        {
          tipo: 'lista',
          items: [
            'Sin `<mesh>` no hay nada que dibujar, aunque tengas geometría y material.',
            '`args` de la geometría alimenta el constructor y solo se lee al crearla.',
            'Un material puede ir en varias mallas; un color cambiado en uno se ve en todas.',
            'Los nombres (`name="pieza"`) no cambian el dibujo, pero permiten encontrarlas después.',
          ],
        },
      ],
      errores: [
        {
          sintoma: 'Aparece un aviso de que el objeto no tiene geometría o material y no se ve nada.',
          causa: 'Se olvidó uno de los dos hijos del `<mesh>`.',
          arreglo: 'Todo `<mesh>` necesita `<…Geometry />` y `<…Material />`.',
        },
        {
          sintoma: 'Cambiar el color de una malla cambia también el de otras cinco.',
          causa: 'El material es el mismo objeto compartido.',
          arreglo:
            'Crea un material por malla, o clónalo (`material.clone()`) antes de modificarlo.',
        },
        {
          sintoma: 'El objeto se ve, pero siempre del mismo color aunque muevas las luces.',
          causa: 'El material es `meshBasicMaterial`, que no calcula iluminación.',
          arreglo: 'Cambia a `meshStandardMaterial`; si no hay luces, añade al menos una ambiental.',
        },
      ],
      quiz: [
        {
          tipo: 'unica',
          enunciado: '¿Qué dos objetos forman una malla?',
          opciones: ['Geometría y material', 'Cámara y luz', 'Escena y renderer', 'Textura y shader'],
          correcta: 0,
          explicacion: 'La geometría aporta la forma; el material, la superficie.',
        },
        {
          tipo: 'verdadero-falso',
          enunciado: 'Dos mallas pueden compartir la misma geometría y el mismo material.',
          correcta: true,
          explicacion:
            'Es lo habitual: se reutilizan los búferes y cambia solo la transformación de cada malla.',
        },
        {
          tipo: 'multiple',
          enunciado: '¿Qué decide el material?',
          opciones: ['El color', 'El brillo', 'El número de triángulos', 'Si la luz le afecta'],
          correctas: [0, 1, 3],
          explicacion: 'El número de triángulos es cosa de la geometría.',
        },
        {
          tipo: 'unica',
          enunciado: '¿Dónde va la rotación de una malla?',
          opciones: [
            'En el propio `<mesh>`, en radianes',
            'En la geometría',
            'En el material',
            'En el `<Canvas>`',
          ],
          correcta: 0,
          explicacion:
            'La transformación vive en el `Object3D`. La geometría no sabe dónde está colocada.',
        },
      ],
      recursos: [
        {
          titulo: 'three.js: Mesh',
          url: 'https://threejs.org/docs/#api/en/objects/Mesh',
          nota: 'La clase que une geometría y material.',
        },
        {
          titulo: 'three.js: BufferGeometry',
          url: 'https://threejs.org/docs/#api/en/core/BufferGeometry',
          nota: 'Cómo se guardan vértices e índices, y por qué se comparten tan bien.',
        },
        {
          titulo: 'R3F: objects and properties',
          url: 'https://r3f.docs.pmnd.rs/api/objects',
          nota: 'Recordatorio de `args`, `attach` y las props de transformación.',
        },
      ],
      ejercicio: {
        reto: 'Crea tres mallas que compartan la misma geometría y el mismo material, en tres posiciones distintas, y una cuarta que reutilice la geometría con otro material.',
        inicial: `import { Canvas } from '@react-three/fiber'

export default function App() {
  return (
    <div style={{ height: 320 }}>
      <Canvas camera={{ position: [3, 2.4, 4] }} frameloop="always">
        <ambientLight intensity={0.5} />
        <directionalLight position={[3, 4, 2]} intensity={2} />
        {/* TODO: tres mallas con la misma geometría y material, y una cuarta con otro material */}
        <mesh>
          <boxGeometry args={[0.6, 0.6, 0.6]} />
          <meshStandardMaterial color="#4d8df6" />
        </mesh>
      </Canvas>
    </div>
  )
}`,
        solucion: `import { Canvas } from '@react-three/fiber'

export default function App() {
  return (
    <div style={{ height: 320 }}>
      <Canvas camera={{ position: [3, 2.4, 4] }} frameloop="always">
        <ambientLight intensity={0.5} />
        <directionalLight position={[3, 4, 2]} intensity={2} />

        {/* Mismo aspecto: misma geometría y mismo material. */}
        <mesh position={[-0.9, 0, 0]}>
          <boxGeometry args={[0.6, 0.6, 0.6]} />
          <meshStandardMaterial color="#4d8df6" />
        </mesh>
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[0.6, 0.6, 0.6]} />
          <meshStandardMaterial color="#4d8df6" />
        </mesh>
        <mesh position={[0.9, 0, 0]}>
          <boxGeometry args={[0.6, 0.6, 0.6]} />
          <meshStandardMaterial color="#4d8df6" />
        </mesh>

        {/* Misma forma, otra superficie. */}
        <mesh position={[0, 0, -1.1]}>
          <boxGeometry args={[0.6, 0.6, 0.6]} />
          <meshStandardMaterial color="#f5a524" roughness={0.15} metalness={0.7} />
        </mesh>
      </Canvas>
    </div>
  )
}`,
        pistas: [
          'Repite el bloque `<mesh>` cambiando solo `position`.',
          'En JSX no hay forma de «reutilizar» un bloque sin crear un componente: extrae uno si te molesta repetir.',
          'La cuarta malla cambia el color y el metalness, no la geometría.',
        ],
      },
    },
    {
      id: '3.3',
      modulo: 3,
      titulo: 'Geometrías y su coste',
      objetivo:
        'Elegir el número de segmentos de una geometría en función de lo que se va a ver, midiendo triángulos en lugar de adivinando.',
      nivel: 'intro',
      minutos: 45,
      bloques: [
        {
          tipo: 'parrafo',
          texto:
            'Una esfera no existe: es una aproximación hecha de trozos planos. Cuantos más segmentos, más redonda se ve y más triángulos hay que transformar y sombrear. El presupuesto es finito y se reparte: 3 000 triángulos para un objeto que ocupa media pantalla es razonable; para una taza en una estantería del fondo, es tirar recursos.',
        },
        { tipo: 'demo', id: 'm3-triangulos', titulo: 'Sube los segmentos y lee la cuenta exacta' },
        {
          tipo: 'parrafo',
          texto:
            'El contador no es una estimación: sale de `geometry.index.count / 3`, el número de índices de la geometría dividido entre tres. Activa el modo alambre para ver de dónde salen: cada cuadrilátero son dos triángulos y los polos cierran en abanico. Con 48 segmentos y 24 anillos, la esfera ronda los 3 000 triángulos.',
        },
        {
          tipo: 'codigo',
          lenguaje: 'tsx',
          titulo: 'Contar triángulos de verdad',
          codigo: `function Contador({ malla }: { malla: THREE.Mesh }) {
  const indice = malla.geometry.index
  // Cada triángulo gasta tres índices.
  const triangulos = indice ? indice.count / 3 : 0
  console.log(triangulos)
}

// Lo mismo para cualquiera de estas geometrías:
<sphereGeometry args={[1, 32, 16]} />
<torusGeometry args={[0.7, 0.3, 16, 64]} />
<cylinderGeometry args={[0.5, 0.5, 1, 24]} />
<icosahedronGeometry args={[1, 2]} />   // el 2 son subdivisiones, no segmentos`,
        },
        {
          tipo: 'tabla',
          cabecera: ['Geometría', 'Triángulos con los valores de la demo', 'Para qué sirve'],
          filas: [
            ['`planeGeometry`', '2', 'Suelos, paredes, carteles'],
            ['`boxGeometry`', '12', 'Casi todo lo que parece una caja'],
            ['`cylinderGeometry` (24 lados)', '≈ 96', 'Postes, latas, columnas'],
            ['`torusGeometry` (16×64)', '≈ 1 024', 'Anillos y ruedas'],
            ['`sphereGeometry` (48×24)', '≈ 3 000', 'Esferas cercanas y bolas de cristal'],
          ],
        },
        {
          tipo: 'destacado',
          tono: 'porque',
          titulo: 'Por qué el giro no cuesta pero el detalle sí',
          texto:
            'Los vértices se transforman una vez por frame, los triángulos se rasterizan y cada fragmento cubierto ejecuta el shader del material. Por eso el coste depende de la superficie que ocupa en pantalla y de la complejidad del material, no solo del número de caras. Una esfera de 3 000 triángulos que ocupa 600 píxeles es mucho más barata que diez de esas esferas en pantalla completa.',
        },
        {
          tipo: 'lista',
          items: [
            'Elige el mínimo de segmentos que no se note a la distancia real de la cámara.',
            '`boxGeometry` siempre cuesta 12 triángulos: no hay razón para sustituirla por otra cosa.',
            '`icosahedronGeometry` acepta subdivisiones (`detail`) y da esferas de triángulos más regulares.',
            'Los objetos que no se ven no se dibujan si están fuera del frustum, pero siguen ocupando memoria.',
            'Mide con el contador, no por intuición: la diferencia entre 24 y 32 segmentos a veces es invisible.',
          ],
        },
      ],
      errores: [
        {
          sintoma: 'La escena va lenta y hay una esfera que parece perfecta de cerca.',
          causa: 'Segmentos muy altos (128×128) sin necesidad; son decenas de miles de triángulos.',
          arreglo: 'Baja a 32×16 y comprueba si se nota a la distancia de uso.',
        },
        {
          sintoma: 'La esfera tiene una costura visible y los polos se ven raros.',
          causa: 'Pocos segmentos, no un error de sombreado.',
          arreglo: 'Sube segmentos o cambia a `icosahedronGeometry` con `detail`, que reparte mejor.',
        },
        {
          sintoma: '`icosahedronGeometry args={[1, 20]}` congela el navegador.',
          causa: 'El segundo argumento son subdivisiones exponenciales, no segmentos.',
          arreglo: 'Usa valores entre 0 y 3; a partir de ahí el crecimiento es brutal.',
        },
      ],
      quiz: [
        {
          tipo: 'unica',
          enunciado: '¿Cuántos triángulos tiene una `boxGeometry` sin subdividir?',
          opciones: ['12', '6', '24', 'Depende de `args`'],
          correcta: 0,
          explicacion: 'Seis caras, dos triángulos por cara: doce.',
        },
        {
          tipo: 'verdadero-falso',
          enunciado: 'En `icosahedronGeometry`, el segundo argumento indica el número de segmentos.',
          correcta: false,
          explicacion:
            'Indica subdivisiones: cada nivel multiplica por cuatro el número de caras.',
        },
        {
          tipo: 'multiple',
          enunciado: '¿De qué depende el coste real de una geometría?',
          opciones: [
            'Del número de triángulos',
            'De la superficie que ocupa en pantalla',
            'De la complejidad del material',
            'Del nombre del objeto',
          ],
          correctas: [0, 1, 2],
          explicacion: 'El nombre no afecta al rendimiento; es solo una etiqueta.',
        },
        {
          tipo: 'unica',
          enunciado: '¿De dónde sale el número exacto de triángulos que muestra la demo?',
          opciones: [
            'De `geometry.index.count / 3`',
            'De `geometry.attributes.position.count`',
            'De `renderer.info.render.calls`',
            'De la propiedad `geometry.triangles`',
          ],
          correcta: 0,
          explicacion:
            'El atributo de posición da vértices, no triángulos; muchos vértices se comparten por índice.',
        },
      ],
      recursos: [
        {
          titulo: 'three.js: SphereGeometry',
          url: 'https://threejs.org/docs/#api/en/geometries/SphereGeometry',
          nota: 'Qué significan `widthSegments` y `heightSegments` exactamente.',
        },
        {
          titulo: 'three.js: BufferGeometry',
          url: 'https://threejs.org/docs/#api/en/core/BufferGeometry',
          nota: '`index`, `attributes` y cómo se cuenta lo que hay dentro.',
        },
        {
          titulo: 'R3F: scaling performance',
          url: 'https://r3f.docs.pmnd.rs/advanced/scaling-performance',
          nota: 'Dónde mirar cuando el problema no es la geometría sino el número de objetos.',
        },
      ],
      ejercicio: {
        reto: 'Muestra una esfera cuyo número de segmentos cambie con un botón (8 → 16 → 32 → 64) y calcula sus triángulos sin usar `geometry.index` a mano: recórrela con una `ref`.',
        inicial: `import { useRef, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import type { Mesh } from 'three'

const NIVELES = [8, 16, 32, 64]

export default function App() {
  const [nivel, setNivel] = useState(0)
  const malla = useRef<Mesh>(null)
  const segmentos = NIVELES[nivel]

  return (
    <div style={{ height: 320 }}>
      <button onClick={() => setNivel((nivel + 1) % NIVELES.length)}>
        {segmentos} segmentos
      </button>
      <Canvas camera={{ position: [0, 0, 4] }} frameloop="always">
        <ambientLight intensity={0.6} />
        <directionalLight position={[3, 4, 2]} intensity={2} />
        <mesh ref={malla}>
          <sphereGeometry args={[1.1, segmentos, segmentos / 2]} />
          <meshStandardMaterial color="#4d8df6" />
        </mesh>
      </Canvas>
    </div>
  )
}`,
        solucion: `import { useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import type { Mesh } from 'three'

const NIVELES = [8, 16, 32, 64]

export default function App() {
  const [nivel, setNivel] = useState(0)
  const malla = useRef<Mesh>(null)
  const [triangulos, setTriangulos] = useState(0)
  const segmentos = NIVELES[nivel]

  useFrame(() => {
    const indice = malla.current?.geometry.index
    if (indice) setTriangulos(indice.count / 3)
  })

  return (
    <div style={{ height: 320 }}>
      <button onClick={() => setNivel((nivel + 1) % NIVELES.length)}>
        {segmentos} segmentos · {triangulos} triángulos
      </button>
      <Canvas camera={{ position: [0, 0, 4] }} frameloop="always">
        <ambientLight intensity={0.6} />
        <directionalLight position={[3, 4, 2]} intensity={2} />
        <mesh ref={malla}>
          <sphereGeometry args={[1.1, segmentos, segmentos / 2]} />
          <meshStandardMaterial color="#4d8df6" />
        </mesh>
      </Canvas>
    </div>
  )
}`,
        pistas: [
          'El número de segmentos tiene que ser entero: `sphereGeometry` redondea por dentro, pero mejor pasa enteros.',
          'Con `useFrame` puedes leer la geometría ya montada; aquí solo se usa como termómetro.',
          'Si prefieres no llamar a `setState` en cada frame, guarda el valor en un `ref` y muéstralo al cambiar de nivel.',
        ],
      },
    },
    {
      id: '3.4',
      modulo: 3,
      titulo: 'Materiales: basic, standard, physical',
      objetivo:
        'Elegir la clase de material adecuada y predecir si necesitará luces para verse.',
      nivel: 'intro',
      minutos: 50,
      bloques: [
        {
          tipo: 'parrafo',
          texto:
            'Un material no es un color: es un pequeño programa que decide cómo se calcula cada píxel de la superficie. `meshBasicMaterial` devuelve el color tal cual, sin preguntar por las luces. `meshStandardMaterial` aplica un modelo físicamente plausible (metal-roughness) y necesita luz. `meshPhysicalMaterial` añade capas encima de ese modelo: barniz, transmisión, iridiscencia.',
        },
        { tipo: 'demo', id: 'm3-materiales', titulo: 'Apaga las luces y mira quién sobrevive' },
        {
          tipo: 'parrafo',
          texto:
            'Las tres esferas comparten geometría, color y luces. La de la izquierda no cambia al apagar: `basic` no consulta la iluminación. Las otras dos se quedan negras porque su color es una reflectancia, no un color de pantalla. Ese es el motivo por el que una escena «desaparece» cuando alguien cambia el material y olvida añadir luces.',
        },
        {
          tipo: 'codigo',
          lenguaje: 'tsx',
          titulo: 'El mismo color, tres comportamientos',
          codigo: `// Se ve siempre igual: no necesita luces. Útil para interfaces y depuración.
<meshBasicMaterial color="#f5a524" />

// El caballo de batalla: color + rugosidad + metalicidad.
<meshStandardMaterial color="#f5a524" roughness={0.35} metalness={0.2} />

// Para cristal, barniz, tela: añade capas al modelo estándar.
<meshPhysicalMaterial
  color="#f5a524"
  roughness={0.06}
  metalness={0.3}
  clearcoat={1}
  clearcoatRoughness={0.05}
/>

// No es un color: pinta la normal como si fuera RGB. Para depurar formas.
<meshNormalMaterial />`,
        },
        {
          tipo: 'tabla',
          cabecera: ['Material', '¿Usa luces?', 'Coste', 'Cuándo usarlo'],
          filas: [
            ['`meshBasicMaterial`', 'No', 'Muy bajo', 'Interfaces, ayudantes, depuración'],
            ['`meshStandardMaterial`', 'Sí', 'Medio', 'Casi todo lo opaco de una escena'],
            ['`meshPhysicalMaterial`', 'Sí', 'Alto', 'Cristal, barniz, tela, burbujas'],
            ['`meshNormalMaterial`', 'No', 'Bajo', 'Comprobar geometría sin luces'],
            ['`meshLambertMaterial`', 'Sí', 'Bajo', 'Estilo plano, móviles modestos'],
          ],
        },
        {
          tipo: 'destacado',
          tono: 'porque',
          titulo: 'Por qué `metalness` a 1 sin entorno se ve negro',
          texto:
            'Porque un metal no tiene color difuso: refleja el entorno. Si no hay mapa de entorno ni luces que reflejar, no hay nada que devolver y la superficie queda oscura. En el módulo 4 se resuelve con un HDRI; hasta entonces, usa metalness bajo o añade luces directas.',
        },
        {
          tipo: 'lista',
          items: [
            '`roughness` alto dispersa la luz (mate); bajo la concentra (brillante).',
            '`metalness` a 1 desactiva el color difuso: solo refleja.',
            '`flatShading` muestra las caras planas; es una prop del material, no de la geometría.',
            '`transparent` y `opacity` activan mezcla y desordenan el dibujado: cuestan más de lo que parece.',
            'Cambiar una prop de material no reconstruye la geometría, solo actualiza un uniforme.',
          ],
        },
      ],
      errores: [
        {
          sintoma: 'Todo negro al cambiar de `basic` a `standard`.',
          causa: 'No hay luces en la escena.',
          arreglo: 'Añade `ambientLight` para lo mínimo y una `directionalLight` para el volumen.',
        },
        {
          sintoma: 'Una esfera metálica se ve gris oscura y sucia.',
          causa: '`metalness={1}` sin entorno que reflejar.',
          arreglo: 'Baja `metalness` o añade un HDRI (`<Environment>`, módulo 4).',
        },
        {
          sintoma: 'Los objetos transparentes se ven unos a través de otros en orden raro.',
          causa: 'El renderer ordena los transparentes por distancia al centro, no por píxel.',
          arreglo: 'Reduce la transparencia, usa `alphaTest` para recortes o separa capas.',
        },
      ],
      quiz: [
        {
          tipo: 'unica',
          enunciado: '¿Qué material se ve igual con luces que sin ellas?',
          opciones: ['`meshBasicMaterial`', '`meshStandardMaterial`', '`meshPhysicalMaterial`', '`meshLambertMaterial`'],
          correcta: 0,
          explicacion: 'No calcula iluminación: devuelve el color directamente.',
        },
        {
          tipo: 'verdadero-falso',
          enunciado: '`meshPhysicalMaterial` cuesta más que `meshStandardMaterial`.',
          correcta: true,
          explicacion: 'Añade capas y cálculos por fragmento: clearcoat, transmisión, sheen…',
        },
        {
          tipo: 'multiple',
          enunciado: '¿Qué props controlan el aspecto de `meshStandardMaterial`?',
          opciones: ['`roughness`', '`metalness`', '`color`', '`segments`'],
          correctas: [0, 1, 2],
          explicacion: '`segments` no existe: la forma la decide la geometría.',
        },
        {
          tipo: 'unica',
          enunciado: '¿Qué pasa si pones `metalness={1}` sin entorno ni luces?',
          opciones: [
            'Se ve casi negro',
            'Se ve blanco',
            'Se ve el color difuso',
            'three.js lanza un error',
          ],
          correcta: 0,
          explicacion: 'Un metal sin nada que reflejar no devuelve luz.',
        },
      ],
      recursos: [
        {
          titulo: 'three.js: MeshStandardMaterial',
          url: 'https://threejs.org/docs/#api/en/materials/MeshStandardMaterial',
          nota: 'La lista completa de props y qué significa cada una.',
        },
        {
          titulo: 'three.js: MeshPhysicalMaterial',
          url: 'https://threejs.org/docs/#api/en/materials/MeshPhysicalMaterial',
          nota: 'Clearcoat, transmission, sheen, iridescence: qué añade y a qué precio.',
        },
        {
          titulo: 'three.js: material gallery',
          url: 'https://threejs.org/examples/?q=material',
          nota: 'Ejemplos oficiales para comparar materiales en vivo.',
        },
      ],
      ejercicio: {
        reto: 'Ten dos esferas con el mismo color: una `basic` y otra `standard`. Añade un botón que apague y encienda todas las luces, y explica en un comentario qué esperabas ver.',
        inicial: `import { useState } from 'react'
import { Canvas } from '@react-three/fiber'

export default function App() {
  const [luces, setLuces] = useState(true)

  return (
    <div style={{ height: 320 }}>
      <button onClick={() => setLuces(!luces)}>Luces: {luces ? 'on' : 'off'}</button>
      <Canvas camera={{ position: [0, 0, 4.5] }} frameloop="always">
        {luces && <ambientLight intensity={0.4} />}
        {luces && <directionalLight position={[3, 4, 2]} intensity={2} />}

        <mesh position={[-0.9, 0, 0]}>
          <sphereGeometry args={[0.75, 32, 24]} />
          <meshBasicMaterial color="#f5a524" />
        </mesh>

        <mesh position={[0.9, 0, 0]}>
          <sphereGeometry args={[0.75, 32, 24]} />
          {/* TODO: cambia a un material que sí use la luz */}
          <meshBasicMaterial color="#f5a524" />
        </mesh>
      </Canvas>
    </div>
  )
}`,
        solucion: `import { useState } from 'react'
import { Canvas } from '@react-three/fiber'

export default function App() {
  const [luces, setLuces] = useState(true)

  return (
    <div style={{ height: 320 }}>
      <button onClick={() => setLuces(!luces)}>Luces: {luces ? 'on' : 'off'}</button>
      <Canvas camera={{ position: [0, 0, 4.5] }} frameloop="always">
        {luces && <ambientLight intensity={0.4} />}
        {luces && <directionalLight position={[3, 4, 2]} intensity={2} />}

        {/* basic: se ve siempre igual */}
        <mesh position={[-0.9, 0, 0]}>
          <sphereGeometry args={[0.75, 32, 24]} />
          <meshBasicMaterial color="#f5a524" />
        </mesh>

        {/* standard: sin luces se queda negra */}
        <mesh position={[0.9, 0, 0]}>
          <sphereGeometry args={[0.75, 32, 24]} />
          <meshStandardMaterial color="#f5a524" roughness={0.4} metalness={0.1} />
        </mesh>
      </Canvas>
    </div>
  )
}`,
        pistas: [
          'Sustituye solo el material de la segunda esfera.',
          'Las luces condicionales con `{luces && …}` se desmontan de verdad: no basta con intensidad 0.',
          'La ambiental evita que la escena quede completamente negra antes de añadir la direccional.',
        ],
      },
    },
    {
      id: '3.5',
      modulo: 3,
      titulo: 'Checkpoint: tu primera escena',
      objetivo:
        'Componer una escena propia con cinco objetos, jerarquía y tres clases de material, y verificarla contra una referencia.',
      nivel: 'intro',
      minutos: 50,
      bloques: [
        {
          tipo: 'parrafo',
          texto:
            'Ya tienes las tres piezas: lienzo, mallas y materiales. El checkpoint no añade conceptos nuevos; pide montarlos juntos sin copiar. La escena de referencia tiene cinco objetos, todos colgando de un mismo grupo, con tres materiales distintos y dos luces. Tu versión no tiene que parecerse: tiene que cumplir los mismos requisitos.',
        },
        { tipo: 'demo', id: 'm3-escena', titulo: 'Referencia: cinco objetos, un grupo, tres materiales' },
        {
          tipo: 'pasos',
          items: [
            {
              titulo: '1. Elige una pieza central',
              texto:
                'Un objeto que se vea bien y que puedas describir: un icosaedro, un toro, una caja inclinada. Es el ancla de la composición.',
            },
            {
              titulo: '2. Añade cuatro objetos de apoyo',
              texto:
                'Un suelo o base, dos repetidos (satélites, postes, baldosas) y un detalle. Que ninguno esté en el mismo plano que el centro.',
            },
            {
              titulo: '3. Agrupa y coloca',
              texto:
                'Todo dentro de un `<group>` con una rotación: así compruebas que la jerarquía funciona de verdad.',
            },
            {
              titulo: '4. Usa tres materiales distintos',
              texto:
                'Uno debe ser `basic` o `normal` para que no dependa de la luz; los otros dos, `standard` y `physical` con ajustes diferentes.',
            },
            {
              titulo: '5. Ilumina con intención',
              texto:
                'Una luz principal desde arriba y un relleno tenue del lado contrario. Si todo está igual de iluminado, no hay volumen.',
            },
          ],
        },
        {
          tipo: 'codigo',
          lenguaje: 'tsx',
          titulo: 'Esqueleto mínimo para empezar',
          codigo: `export default function App() {
  return (
    <Canvas camera={{ position: [3.4, 3, 4.4], fov: 45 }}>
      <ambientLight intensity={0.3} />
      <directionalLight position={[4, 6, 3]} intensity={2.4} />
      <directionalLight position={[-4, 2, -3]} intensity={0.6} color="#9fbcff" />

      <group rotation={[0, 0.6, 0]}>
        {/* 1: base */}
        {/* 2: pieza central con material normal */}
        {/* 3 y 4: dos apoyos con material estándar */}
        {/* 5: detalle con material físico */}
      </group>
    </Canvas>
  )
}`,
        },
        {
          tipo: 'checkpoint',
          titulo: 'Antes de dar el módulo por cerrado',
          items: [
            'La escena tiene al menos cinco objetos visibles y distinguibles.',
            'Todos cuelgan de un único `<group>` con rotación aplicada.',
            'Hay tres clases de material diferentes, y se nota cuál es cuál.',
            'Al menos una luz direccional y una ambiental; nada queda negro sin motivo.',
            'No hay avisos en la consola del navegador.',
            'Sabes señalar qué objeto cuesta más triángulos y por qué.',
          ],
        },
        {
          tipo: 'destacado',
          tono: 'truco',
          titulo: 'Cómo saber si tu escena está bien',
          texto:
            'Gírala mentalmente: si no sabrías decir dónde está la luz principal, la escena no tiene dirección. Si dos objetos comparten el mismo color y el mismo material, probablemente uno sobra. Y si al desmontar el grupo desaparece todo, la jerarquía estaba bien hecha.',
        },
      ],
      errores: [
        {
          sintoma: 'Solo se ve un objeto aunque hay cinco en el JSX.',
          causa: 'Todos están en la misma posición o dentro de otro objeto a escala 0.',
          arreglo: 'Comprueba las `position` y separa al menos 0,8 unidades entre piezas.',
        },
        {
          sintoma: 'La escena se ve plana, sin volumen.',
          causa: 'Una sola luz frontal con intensidad alta y sin relleno.',
          arreglo: 'Añade una segunda luz lateral más tenue y baja la principal.',
        },
        {
          sintoma: 'Al girar el grupo, las piezas se separan.',
          causa: 'Algunas mallas están fuera del `<group>` y giran con la escena, no con el grupo.',
          arreglo: 'Mete todas las piezas dentro del mismo grupo.',
        },
      ],
      quiz: [
        {
          tipo: 'unica',
          enunciado: '¿Qué comprueba realmente el checkpoint?',
          opciones: [
            'Que sabes componer con lo aprendido, sin conceptos nuevos',
            'Que memorizas la API de three.js',
            'Que tu escena se parece a la de referencia',
            'Que usas todos los materiales que existen',
          ],
          correcta: 0,
          explicacion: 'Es una composición libre con requisitos verificables, no una copia.',
        },
        {
          tipo: 'verdadero-falso',
          enunciado: 'Un `<group>` con rotación hace girar a todos sus hijos a la vez.',
          correcta: true,
          explicacion: 'La transformación del padre se compone con la de cada hijo.',
        },
        {
          tipo: 'multiple',
          enunciado: '¿Qué señales indican que la iluminación está mal?',
          opciones: [
            'No sabrías decir de dónde viene la luz',
            'Todo está igual de brillante',
            'Hay zonas completamente negras sin intención',
            'La escena tiene cinco objetos',
          ],
          correctas: [0, 1, 2],
          explicacion: 'El número de objetos no dice nada sobre la luz.',
        },
        {
          tipo: 'unica',
          enunciado: 'Si dos objetos deben compartir geometría pero no color, ¿qué haces?',
          opciones: [
            'Reutilizar la geometría y crear dos materiales',
            'Duplicar la geometría y compartir el material',
            'Cambiar el color del material compartido',
            'No se puede',
          ],
          correcta: 0,
          explicacion:
            'La geometría es inmutable en la práctica; el material es lo que varía por objeto.',
        },
      ],
      recursos: [
        {
          titulo: 'three.js: Object3D',
          url: 'https://threejs.org/docs/#api/en/core/Object3D',
          nota: 'La clase de la que hereda todo lo que se puede añadir a una escena.',
        },
        {
          titulo: 'R3F: examples',
          url: 'https://r3f.docs.pmnd.rs/getting-started/examples',
          nota: 'Galería oficial: útil para ver composiciones hechas por otros.',
        },
        {
          titulo: 'three.js: WebGLRenderer.info',
          url: 'https://threejs.org/docs/#api/en/renderers/WebGLRenderer',
          nota: '`info.render.triangles` da el total dibujado por frame: la siguiente medida que harás.',
        },
      ],
      ejercicio: {
        reto: 'Monta tu escena del checkpoint: cinco objetos en un grupo, tres materiales distintos y dos luces. Cuando la tengas, mide cuántos triángulos dibuja con `gl.info.render.triangles`.',
        inicial: `import { Canvas } from '@react-three/fiber'

export default function App() {
  return (
    <div style={{ height: 360 }}>
      <Canvas camera={{ position: [3.4, 3, 4.4] }} frameloop="always">
        <ambientLight intensity={0.3} />
        <directionalLight position={[4, 6, 3]} intensity={2.4} />
        <directionalLight position={[-4, 2, -3]} intensity={0.6} color="#9fbcff" />

        <group rotation={[0, 0.6, 0]}>
          {/* TODO: cinco objetos, tres materiales distintos */}
          <mesh position={[0, 0.6, 0]}>
            <icosahedronGeometry args={[0.6, 0]} />
            <meshNormalMaterial flatShading />
          </mesh>
        </group>
      </Canvas>
    </div>
  )
}`,
        solucion: `import { Canvas } from '@react-three/fiber'

export default function App() {
  return (
    <div style={{ height: 360 }}>
      <Canvas camera={{ position: [3.4, 3, 4.4] }} frameloop="always">
        <ambientLight intensity={0.3} />
        <directionalLight position={[4, 6, 3]} intensity={2.4} />
        <directionalLight position={[-4, 2, -3]} intensity={0.6} color="#9fbcff" />

        <group rotation={[0, 0.6, 0]}>
          {/* 1. Base */}
          <mesh position={[0, 0.12, 0]}>
            <cylinderGeometry args={[1.4, 1.5, 0.24, 48]} />
            <meshStandardMaterial color="#2a3354" roughness={0.85} />
          </mesh>

          {/* 2. Pieza central */}
          <mesh position={[0, 1, 0]}>
            <icosahedronGeometry args={[0.52, 0]} />
            <meshNormalMaterial flatShading />
          </mesh>

          {/* 3 y 4. Dos satélites */}
          <mesh position={[-1, 0.8, 0]} rotation={[0.4, 0.2, 0.2]}>
            <boxGeometry args={[0.32, 0.32, 0.32]} />
            <meshStandardMaterial color="#f5a524" roughness={0.3} metalness={0.7} />
          </mesh>
          <mesh position={[1, 0.8, 0]} rotation={[0.4, 0.2, 0.2]}>
            <boxGeometry args={[0.32, 0.32, 0.32]} />
            <meshStandardMaterial color="#3fbf87" roughness={0.5} metalness={0.05} />
          </mesh>

          {/* 5. Anillo */}
          <mesh position={[0, 0.24, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <torusGeometry args={[1.1, 0.045, 12, 96]} />
            <meshPhysicalMaterial color="#cfd8ff" roughness={0.15} metalness={0.6} clearcoat={1} />
          </mesh>
        </group>
      </Canvas>
    </div>
  )
}`,
        pistas: [
          'Empieza por la base y la pieza central; luego añade los apoyos a izquierda y derecha.',
          'El anillo del final es un toro tumbado: `rotation={[-Math.PI / 2, 0, 0]}`.',
          'Para medir triángulos, `useThree((estado) => estado.gl).info.render.triangles` dentro de un `useFrame`, como en 3.3.',
        ],
      },
    },
  ],
}

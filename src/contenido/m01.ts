import type { Modulo } from './tipos'

export const modulo1: Modulo = {
  numero: 1,
  titulo: 'El espacio 3D: coordenadas, vectores y rotaciones',
  descripcion:
    'El modelo mental que hay debajo de cualquier escena: tres objetos en el trípode, un sistema de coordenadas en metros, vectores que se normalizan y rotaciones que a veces pierden un eje.',
  lecciones: [
    {
      id: '1.1',
      modulo: 1,
      titulo: 'El trípode: escena, cámara, renderer',
      objetivo:
        'Montar una escena mínima con three.js y explicar qué papel cumple cada uno de sus tres objetos antes de tocar React.',
      nivel: 'intro',
      minutos: 40,
      bloques: [
        {
          tipo: 'parrafo',
          texto:
            'Una escena 3D no es una foto: es una receta que alguien ejecuta en tu nombre. Para que aparezca algo en pantalla hacen falta tres piezas distintas. La escena guarda los objetos, la cámara decide desde dónde se miran y el renderer convierte esa información en píxeles. Si una falla, la pantalla se queda vacía aunque las otras dos estén perfectas.',
        },
        { tipo: 'demo', id: 'm1-tripode', titulo: 'Quita la cámara, la luz o el cubo' },
        {
          tipo: 'parrafo',
          texto:
            'Piensa en un plató de cine. La escena es el decorado con sus muebles y actores; la cámara es el objetivo que encuadra; el renderer es el equipo que impresiona el fotograma. El decorado no sabe si le están grabando, y la cámara no sabe qué hay fuera de su encuadre. Cada pieza tiene una responsabilidad y ninguna sustituye a las demás.',
        },
        {
          tipo: 'destacado',
          tono: 'porque',
          titulo: 'Por qué el renderer no vive dentro de la escena',
          texto:
            'Porque el renderer no es un objeto que se coloca en el mundo: es el motor que lee la escena y la cámara para dibujar. No tiene posición ni rotación. Por eso en three.js se llama a renderer.render(escena, camara) en lugar de añadirlo a la escena.',
        },
        {
          tipo: 'codigo',
          lenguaje: 'ts',
          titulo: 'La escena mínima, sin React de por medio',
          codigo: `import * as THREE from 'three'

const canvas = document.querySelector('canvas')!
const ancho = canvas.clientWidth
const alto = canvas.clientHeight

const escena = new THREE.Scene()

const camara = new THREE.PerspectiveCamera(45, ancho / alto, 0.1, 100)
camara.position.set(3, 2.4, 4.4)
camara.lookAt(0, 0, 0)

const renderer = new THREE.WebGLRenderer({ canvas, antialias: true })
renderer.setSize(ancho, alto, false)

const cubo = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial({ color: '#f5a524' }),
)
escena.add(cubo)

renderer.render(escena, camara)`,
        },
        {
          tipo: 'parrafo',
          texto:
            'Fíjate en dos detalles que se olvidan siempre. Primero, la cámara no está añadida a la escena: three.js no la necesita dentro porque el renderer la recibe como argumento. Segundo, renderer.render dibuja un fotograma y termina; si no lo vuelves a llamar, la imagen se queda congelada aunque muevas el cubo.',
        },
        {
          tipo: 'lista',
          items: [
            'La escena es un contenedor: no dibuja, solo organiza objetos.',
            'La cámara define el punto de vista y el tipo de proyección (perspectiva u ortográfica).',
            'El renderer posee el contexto WebGL y emite las draw calls.',
            'El canvas es la superficie del DOM donde aparece el resultado.',
            'Cambiar la posición de un objeto no actualiza la pantalla por sí solo: hay que volver a renderizar.',
          ],
        },
        {
          tipo: 'tabla',
          cabecera: ['Pieza', 'Qué guarda', 'Qué pasa si la quitas'],
          filas: [
            ['Escena', 'Objetos y sus transformaciones', 'No hay nada que dibujar'],
            ['Cámara', 'Posición, orientación y proyección', 'El renderer no tiene punto de vista'],
            ['Renderer', 'Contexto WebGL y estado de dibujo', 'No se emite ni un píxel'],
          ],
        },
        {
          tipo: 'destacado',
          tono: 'ojo',
          texto:
            'En la demo, «sin cámara» se simula tapando el objetivo con una esfera negra: no se puede eliminar la cámara sin romper el renderer. El concepto es el mismo: sin un punto de vista válido, no hay imagen. La luz tampoco es un objeto obligatorio del trípode, pero sí lo es para los materiales que reaccionan a ella; eso llega en el módulo 4.',
        },
      ],
      errores: [
        {
          sintoma: 'La escena se ve completamente negra o vacía.',
          causa:
            'La cámara no apunta al objeto, está dentro de él, o su near/far deja fuera la geometría.',
          arreglo:
            'Coloca la cámara a una distancia razonable, llama a camara.lookAt(0, 0, 0) y comprueba que near sea menor y far mayor que las distancias de la escena.',
        },
        {
          sintoma: 'El canvas aparece con altura cero o estirado.',
          causa: 'Se llamó a setSize con un tamaño que no coincide con el del contenedor CSS.',
          arreglo:
            'Mide el contenedor con clientWidth y clientHeight, pasa esos valores a setSize y actualiza camera.aspect cuando cambie el tamaño.',
        },
        {
          sintoma: 'Mueves un cubo y la imagen no cambia.',
          causa: 'Has mutado la posición después del último render y nadie ha vuelto a dibujar.',
          arreglo:
            'Llama a renderer.render(escena, camara) después de cada cambio o dentro de un bucle de requestAnimationFrame.',
        },
      ],
      quiz: [
        {
          tipo: 'unica',
          enunciado: '¿Qué objeto guarda las mallas y sus transformaciones?',
          opciones: ['El renderer', 'La escena', 'La cámara', 'El canvas'],
          correcta: 1,
          explicacion:
            'La escena es el contenedor del grafo de objetos. La cámara solo define el punto de vista y el renderer dibuja.',
        },
        {
          tipo: 'unica',
          enunciado: '¿Qué necesita renderer.render para dibujar un fotograma?',
          opciones: [
            'Solo la escena',
            'Solo la cámara',
            'La escena y la cámara',
            'El canvas y una textura',
          ],
          correcta: 2,
          explicacion:
            'La firma es render(scene, camera): necesita el grafo que dibujar y el punto de vista desde el que mirarlo.',
        },
        {
          tipo: 'verdadero-falso',
          enunciado: 'La cámara tiene que ser hija de la escena para que three.js la use.',
          correcta: false,
          explicacion:
            'No es obligatorio: se pasa directamente a render. Añadirla a la escena solo sirve si quieres que otros objetos la traten como parte del grafo.',
        },
        {
          tipo: 'multiple',
          enunciado: '¿Qué hace falta para que un cubo se vea en pantalla?',
          opciones: [
            'Una geometría y un material',
            'Que la cámara lo encuadre',
            'Una llamada a render',
            'Que el cubo esté añadido al DOM',
          ],
          correctas: [0, 1, 2],
          explicacion:
            'El cubo es un objeto de three.js, no un nodo del DOM. Necesita geometría, material, cámara que lo vea y una llamada de dibujo.',
        },
      ],
      recursos: [
        {
          titulo: 'three.js Manual — Fundamentals',
          url: 'https://threejs.org/manual/#en/fundamentals',
          nota: 'Escena, cámara, renderer y el primer bucle, explicados desde cero.',
        },
        {
          titulo: 'three.js Docs — PerspectiveCamera',
          url: 'https://threejs.org/docs/#api/en/cameras/PerspectiveCamera',
          nota: 'Qué significan fov, aspect, near y far, y cómo se actualiza la proyección.',
        },
        {
          titulo: 'three.js Docs — WebGLRenderer',
          url: 'https://threejs.org/docs/#api/en/renderers/WebGLRenderer',
          nota: 'La referencia de setSize, setPixelRatio y render.',
        },
      ],
      ejercicio: {
        reto: 'Añade un segundo cubo a la escena, colócalo a la derecha del primero y comprueba que ambos se ven con la misma cámara.',
        inicial: `import { useEffect, useRef } from 'react'
import * as THREE from 'three'

export default function App() {
  const lienzo = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = lienzo.current
    if (!canvas) return

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true })
    renderer.setSize(420, 280, false)

    const escena = new THREE.Scene()
    const camara = new THREE.PerspectiveCamera(45, 420 / 280, 0.1, 100)
    camara.position.set(3, 2.4, 4.4)
    camara.lookAt(0, 0, 0)

    const cubo = new THREE.Mesh(
      new THREE.BoxGeometry(1, 1, 1),
      new THREE.MeshBasicMaterial({ color: '#f5a524' }),
    )
    cubo.position.set(-0.8, 0, 0)
    escena.add(cubo)

    // TODO: crea un segundo cubo azul en x = 0.8 y añádelo a la escena
    renderer.render(escena, camara)

    return () => {
      renderer.dispose()
    }
  }, [])

  return <canvas ref={lienzo} width={420} height={280} style={{ background: '#111' }} />
}`,
        solucion: `import { useEffect, useRef } from 'react'
import * as THREE from 'three'

export default function App() {
  const lienzo = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = lienzo.current
    if (!canvas) return

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true })
    renderer.setSize(420, 280, false)

    const escena = new THREE.Scene()
    const camara = new THREE.PerspectiveCamera(45, 420 / 280, 0.1, 100)
    camara.position.set(3, 2.4, 4.4)
    camara.lookAt(0, 0, 0)

    const cubo = new THREE.Mesh(
      new THREE.BoxGeometry(1, 1, 1),
      new THREE.MeshBasicMaterial({ color: '#f5a524' }),
    )
    cubo.position.set(-0.8, 0, 0)
    escena.add(cubo)

    const segundo = new THREE.Mesh(
      new THREE.BoxGeometry(1, 1, 1),
      new THREE.MeshBasicMaterial({ color: '#4d8df6' }),
    )
    segundo.position.set(0.8, 0, 0)
    escena.add(segundo)

    renderer.render(escena, camara)

    return () => {
      renderer.dispose()
    }
  }, [])

  return <canvas ref={lienzo} width={420} height={280} style={{ background: '#111' }} />
}`,
        pistas: [
          'Un segundo cubo es otra llamada a new THREE.Mesh con su propia geometría y su propio material.',
          'La posición se cambia con position.set(x, y, z), no con style.',
          'No olvides escena.add(segundo) antes de renderizar.',
        ],
      },
    },
    {
      id: '1.2',
      modulo: 1,
      titulo: 'Coordenadas, unidades y el eje Y',
      objetivo:
        'Leer una posición [x, y, z] y predecir dónde aparece un objeto, usando una escala de metros y el eje Y como altura.',
      nivel: 'intro',
      minutos: 45,
      bloques: [
        {
          tipo: 'parrafo',
          texto:
            'Una posición en three.js es una terna [x, y, z]. No hay más misterio, pero casi todos los errores de «mi objeto aparece donde no toca» vienen de confundir el orden o de no saber qué eje apunta hacia arriba. En este curso, un metro es una unidad y el eje Y es la altura. Siempre.',
        },
        { tipo: 'demo', id: 'm1-coordenadas', titulo: 'Mueve el cubo y lee su posición en metros' },
        {
          tipo: 'parrafo',
          texto:
            'Imagina que estás de pie en el origen. El eje X va hacia tu derecha, el eje Y sube hacia el techo y el eje Z viene hacia ti, fuera de la pantalla. Es un sistema dextrógiro: si pones el pulgar en X y el índice en Y, el corazón te apunta en la dirección de Z. Ese detalle importa cuando importas modelos o mezclas librerías con convenciones distintas.',
        },
        {
          tipo: 'destacado',
          tono: 'porque',
          titulo: 'Por qué conviene medir en metros',
          texto:
            'Porque las cámaras, las luces y las físicas usan las mismas unidades que tus objetos. Si modelas una taza de 1 unidad y un edificio de 1000, cualquier ajuste de cámara o de sombra se vuelve imposible de afinar. Elige una escala desde el primer día y respétala.',
        },
        {
          tipo: 'codigo',
          lenguaje: 'ts',
          titulo: 'Posición, rejilla y ejes de referencia',
          codigo: `const cubo = new THREE.Mesh(
  new THREE.BoxGeometry(0.6, 0.6, 0.6),
  new THREE.MeshBasicMaterial({ color: '#f5a524' }),
)

// [x, y, z]: 1,5 m a la derecha, 2 m de altura, 0,5 m hacia la cámara
cubo.position.set(1.5, 2, -0.5)

// Una rejilla de 10 × 10 celdas: cada celda mide 1 m
const rejilla = new THREE.GridHelper(10, 10)

// Tres ejes de 3 m: X rojo, Y verde, Z azul
const ejes = new THREE.AxesHelper(3)

escena.add(cubo, rejilla, ejes)`,
        },
        {
          tipo: 'lista',
          items: [
            'x: izquierda y derecha. Valores negativos a la izquierda del origen.',
            'y: abajo y arriba. El suelo suele ser y = 0; los objetos «flotan» si y > 0.',
            'z: profundidad. En la cámara por defecto, valores positivos se acercan a ti.',
            'La posición es local al padre: si el objeto está dentro de un grupo, se suma a la transformación del grupo.',
            'La rotación también se mide en radianes, no en grados: 180° son Math.PI.',
          ],
        },
        {
          tipo: 'tabla',
          cabecera: ['Eje', 'Dirección', 'Color del AxesHelper'],
          filas: [
            ['X', 'Derecha', 'Rojo'],
            ['Y', 'Arriba', 'Verde'],
            ['Z', 'Hacia la cámara', 'Azul'],
          ],
        },
        {
          tipo: 'destacado',
          tono: 'truco',
          texto:
            'Para calibrar el ojo, pon una rejilla de 1 m y un cubo de 1 m. Si el cubo ocupa exactamente una celda, ya sabes leer la escala. Si ocupa diez, tu modelo está en centímetros y vas a tener que escalarlo.',
        },
      ],
      errores: [
        {
          sintoma: 'El objeto aparece a la altura del suelo cuando querías ponerlo arriba.',
          causa: 'Has escrito [x, y, z] pero has puesto la altura en la tercera posición.',
          arreglo: 'Recuerda el orden: primero X (derecha), después Y (arriba) y por último Z (profundidad).',
        },
        {
          sintoma: 'Un modelo importado se ve gigante o diminuto.',
          causa: 'El modelo está en centímetros o en pulgadas y la escena está en metros.',
          arreglo:
            'Decide una escala antes de importar. Si el modelo viene en centímetros, aplícale scale 0.01 una sola vez en el contenedor, no a cada malla.',
        },
        {
          sintoma: 'Mueves el objeto en X y se mueve en diagonal.',
          causa: 'El objeto está dentro de un grupo rotado: su posición es local, no mundial.',
          arreglo:
            'Comprueba la rotación de los padres o usa getWorldPosition si necesitas la posición absoluta para una comparación.',
        },
      ],
      quiz: [
        {
          tipo: 'unica',
          enunciado: '¿Qué eje apunta hacia arriba en la convención de three.js?',
          opciones: ['X', 'Y', 'Z', 'Depende de la cámara'],
          correcta: 1,
          explicacion:
            'En three.js el eje Y es la altura. La cámara puede mirar desde cualquier sitio, pero el sistema de coordenadas no cambia.',
        },
        {
          tipo: 'unica',
          enunciado: '¿Qué posición coloca un cubo 2 m a la derecha, 1 m sobre el suelo y 3 m hacia la cámara?',
          opciones: ['[1, 2, 3]', '[2, 1, 3]', '[2, 3, 1]', '[3, 1, 2]'],
          correcta: 1,
          explicacion: 'El orden es [x, y, z]: 2 de derecha, 1 de altura y 3 de profundidad.',
        },
        {
          tipo: 'verdadero-falso',
          enunciado: 'Cambiar solo position.x de un objeto garantiza que se vea en otra posición en el siguiente fotograma.',
          correcta: false,
          explicacion:
            'La matriz se actualiza, pero la pantalla solo cambia cuando se vuelve a renderizar. En una escena estática hay que llamar a render después del cambio.',
        },
        {
          tipo: 'multiple',
          enunciado: '¿Qué afirmaciones son ciertas sobre la rejilla de la demo?',
          opciones: [
            'Cada celda mide 1 m',
            'La rejilla está en el plano XZ',
            'El eje Y sale perpendicular a la rejilla',
            'La rejilla dibuja los objetos por ti',
          ],
          correctas: [0, 1, 2],
          explicacion:
            'La rejilla es una ayuda visual en el plano del suelo. No participa en el render de las mallas ni en la lógica de la escena.',
        },
      ],
      recursos: [
        {
          titulo: 'three.js Docs — Object3D',
          url: 'https://threejs.org/docs/#api/en/core/Object3D',
          nota: 'La base de todo objeto: position, rotation, scale, matriz local y mundial.',
        },
        {
          titulo: 'three.js Docs — GridHelper',
          url: 'https://threejs.org/docs/#api/en/helpers/GridHelper',
          nota: 'El helper que usamos como regla de 1 m en las demos.',
        },
        {
          titulo: 'three.js Docs — AxesHelper',
          url: 'https://threejs.org/docs/#api/en/helpers/AxesHelper',
          nota: 'Los tres ejes de colores y su escala.',
        },
      ],
      ejercicio: {
        reto: 'Conecta el deslizador de Y para que el cubo suba y baje, y comprueba que la marca del suelo se queda quieta.',
        inicial: `import { useState } from 'react'
import { Canvas } from '@react-three/fiber'

export default function App() {
  const [x, setX] = useState(0)
  const [y, setY] = useState(1)
  const [z, setZ] = useState(0)

  return (
    <div style={{ height: 340, background: '#111', color: '#ddd', fontFamily: 'system-ui' }}>
      <div style={{ display: 'flex', gap: 12, padding: 8, fontSize: 12 }}>
        <label>X <input type="range" min={-3} max={3} step={0.1} value={x} onChange={(e) => setX(Number(e.target.value))} /></label>
        <label>Y <input type="range" min={0} max={3} step={0.1} value={y} onChange={(e) => setY(Number(e.target.value))} /></label>
        <label>Z <input type="range" min={-3} max={3} step={0.1} value={z} onChange={(e) => setZ(Number(e.target.value))} /></label>
        <span>posición = [{x.toFixed(1)}, {y.toFixed(1)}, {z.toFixed(1)}]</span>
      </div>

      <div style={{ height: 280 }}>
        <Canvas camera={{ position: [4, 3, 5], fov: 45 }}>
          <gridHelper args={[10, 10, '#3b4c6b', '#222a39']} />
          <axesHelper args={[3]} />

          {/* TODO: aplica la posición [x, y, z] al cubo */}
          <mesh>
            <boxGeometry args={[0.6, 0.6, 0.6]} />
            <meshBasicMaterial color="#f5a524" />
          </mesh>

          <mesh position={[x, 0.01, z]} rotation={[-Math.PI / 2, 0, 0]}>
            <ringGeometry args={[0.2, 0.26, 32]} />
            <meshBasicMaterial color="#f5a524" transparent opacity={0.7} />
          </mesh>
        </Canvas>
      </div>
    </div>
  )
}`,
        solucion: `import { useState } from 'react'
import { Canvas } from '@react-three/fiber'

export default function App() {
  const [x, setX] = useState(0)
  const [y, setY] = useState(1)
  const [z, setZ] = useState(0)

  return (
    <div style={{ height: 340, background: '#111', color: '#ddd', fontFamily: 'system-ui' }}>
      <div style={{ display: 'flex', gap: 12, padding: 8, fontSize: 12 }}>
        <label>X <input type="range" min={-3} max={3} step={0.1} value={x} onChange={(e) => setX(Number(e.target.value))} /></label>
        <label>Y <input type="range" min={0} max={3} step={0.1} value={y} onChange={(e) => setY(Number(e.target.value))} /></label>
        <label>Z <input type="range" min={-3} max={3} step={0.1} value={z} onChange={(e) => setZ(Number(e.target.value))} /></label>
        <span>posición = [{x.toFixed(1)}, {y.toFixed(1)}, {z.toFixed(1)}]</span>
      </div>

      <div style={{ height: 280 }}>
        <Canvas camera={{ position: [4, 3, 5], fov: 45 }}>
          <gridHelper args={[10, 10, '#3b4c6b', '#222a39']} />
          <axesHelper args={[3]} />

          <mesh position={[x, y, z]}>
            <boxGeometry args={[0.6, 0.6, 0.6]} />
            <meshBasicMaterial color="#f5a524" />
          </mesh>

          <mesh position={[x, 0.01, z]} rotation={[-Math.PI / 2, 0, 0]}>
            <ringGeometry args={[0.2, 0.26, 32]} />
            <meshBasicMaterial color="#f5a524" transparent opacity={0.7} />
          </mesh>
        </Canvas>
      </div>
    </div>
  )
}`,
        pistas: [
          'La prop position de una malla acepta un array [x, y, z].',
          'La marca del suelo ya usa x y z: cópiale esa parte y añade y en el medio.',
          'Si cambias y, la marca debe seguir en y = 0,01 para no desaparecer dentro de la rejilla.',
        ],
      },
    },
    {
      id: '1.3',
      modulo: 1,
      titulo: 'Vectores: posición, dirección y distancia',
      objetivo:
        'Restar dos posiciones, normalizar el resultado y usarlo para mover un objeto hacia otro a velocidad constante.',
      nivel: 'intro',
      minutos: 45,
      bloques: [
        {
          tipo: 'parrafo',
          texto:
            'Un vector no es una flecha decorativa: es la forma de decir «desde aquí hasta allí». Si restas la posición del dron a la del objetivo, obtienes un vector que apunta al objetivo. Su longitud es la distancia. Si lo divides por esa longitud, obtienes una dirección de longitud 1, perfecta para multiplicar por una velocidad.',
        },
        { tipo: 'demo', id: 'm1-vectores', titulo: 'Un dron, un objetivo y la flecha que los une' },
        {
          tipo: 'parrafo',
          texto:
            'La analogía útil es la de caminar: la distancia es lo que mide el camino en línea recta; la dirección es hacia dónde tienes que apuntar los pies. No necesitas saber cuánto mide el camino para saber hacia dónde ir, pero sí para saber cuándo has llegado. Por eso se calculan las dos cosas: dirección para avanzar, distancia para parar.',
        },
        {
          tipo: 'destacado',
          tono: 'porque',
          titulo: 'Por qué normalizar antes de multiplicar',
          texto:
            'Si multiplicas un vector de 10 m por 2 m/s, avanzas 20 m en un segundo: la velocidad dependería de lo lejos que esté el objetivo. Al normalizarlo primero, siempre avanzas 2 m por segundo. El vector larguirucho sigue diciendo la dirección; solo deja de contaminar la velocidad.',
        },
        {
          tipo: 'codigo',
          lenguaje: 'ts',
          titulo: 'El cálculo completo del perseguidor',
          codigo: `const dron = new THREE.Vector3(-2, 0.9, 1.4)
const objetivo = new THREE.Vector3(2, 1.1, -1.5)

// 1. Vector que va del dron al objetivo
const haciaObjetivo = objetivo.clone().sub(dron)

// 2. Distancia = longitud del vector
const distancia = haciaObjetivo.length()

// 3. Dirección de longitud 1
const direccion = haciaObjetivo.clone().normalize()

// 4. Avanzar a 1,4 m/s durante el delta del frame
const delta = 0.016
dron.addScaledVector(direccion, 1.4 * delta)

// 5. No pasarse del objetivo
if (dron.distanceTo(objetivo) < 0.04) {
  dron.copy(objetivo)
}`,
        },
        {
          tipo: 'lista',
          items: [
            'Restar posiciones da un vector de desplazamiento: objetivo - posición.',
            'length() devuelve la distancia euclídea, en las mismas unidades que la escena.',
            'normalize() conserva la dirección y deja la longitud en 1.',
            'distanceTo() es el atajo de restar y medir la longitud.',
            'clone() evita mutar el vector original cuando encadenas operaciones.',
          ],
        },
        {
          tipo: 'destacado',
          tono: 'ojo',
          texto:
            'No normalices un vector cero. Si el dron ya está en el objetivo, la dirección no existe y la división por cero te devuelve NaN. Comprueba siempre si la distancia es menor que un umbral antes de normalizar.',
        },
        {
          tipo: 'destacado',
          tono: 'truco',
          texto:
            'Para depurar un vector, dibuja sus tres componentes como líneas desde el origen. Si la flecha apunta al objetivo pero la longitud no coincide con la distancia, tienes un problema de escala; si apunta mal, tienes un problema de orden de coordenadas.',
        },
      ],
      errores: [
        {
          sintoma: 'El dron se mueve más rápido cuando el objetivo está lejos.',
          causa: 'Estás multiplicando el vector sin normalizar y la velocidad hereda la distancia.',
          arreglo: 'Normaliza el vector antes de multiplicarlo por la velocidad y por el delta.',
        },
        {
          sintoma: 'El dron vibra alrededor del objetivo sin llegar a pararse.',
          causa: 'Avanza una cantidad fija por frame y se pasa del punto, luego vuelve y se vuelve a pasar.',
          arreglo: 'Acota el avance a la distancia restante con Math.min(velocidad * delta, distancia).',
        },
        {
          sintoma: 'La dirección vale NaN y el objeto desaparece.',
          causa: 'Has normalizado un vector de longitud cero cuando el dron y el objetivo coinciden.',
          arreglo: 'Comprueba la distancia antes de normalizar y trata el caso de distancia casi cero como «ya he llegado».',
        },
      ],
      quiz: [
        {
          tipo: 'unica',
          enunciado: 'Tienes las posiciones A y B. ¿Qué vector apunta de A a B?',
          opciones: ['A + B', 'B - A', 'A - B', 'B × A'],
          correcta: 1,
          explicacion:
            'El vector de A a B es la posición final menos la inicial. Restar al revés te da la dirección contraria.',
        },
        {
          tipo: 'unica',
          enunciado: '¿Qué longitud tiene un vector normalizado?',
          opciones: ['0', '1', 'Depende de la escena', 'La distancia original'],
          correcta: 1,
          explicacion:
            'Normalizar consiste precisamente en dividir por la longitud para quedarse con una dirección de longitud 1.',
        },
        {
          tipo: 'verdadero-falso',
          enunciado: 'La distancia entre dos objetos se puede obtener con distanceTo.',
          correcta: true,
          explicacion:
            'distanceTo resta las posiciones y devuelve la longitud del vector resultante, sin que tengas que hacerlo a mano.',
        },
        {
          tipo: 'multiple',
          enunciado: '¿Qué necesitas para mover un objeto hacia otro a velocidad constante?',
          opciones: [
            'La dirección normalizada',
            'La distancia restante',
            'El delta del frame',
            'El ángulo de Euler del objetivo',
          ],
          correctas: [0, 1, 2],
          explicacion:
            'Dirección, distancia y tiempo son suficientes. La orientación del objetivo no interviene en el desplazamiento.',
        },
      ],
      recursos: [
        {
          titulo: 'three.js Docs — Vector3',
          url: 'https://threejs.org/docs/#api/en/math/Vector3',
          nota: 'La clase que usarás para posiciones, direcciones y distancias.',
        },
        {
          titulo: 'three.js Docs — Vector3.normalize',
          url: 'https://threejs.org/docs/#api/en/math/Vector3#normalize',
          nota: 'Qué hace exactamente y qué devuelve cuando el vector es cero.',
        },
        {
          titulo: 'three.js Docs — Vector3.distanceTo',
          url: 'https://threejs.org/docs/#api/en/math/Vector3#distanceTo',
          nota: 'El atajo para medir sin construir un vector intermedio a mano.',
        },
      ],
      ejercicio: {
        reto: 'Acerca el dron al objetivo un 20 % de la distancia restante usando la dirección normalizada.',
        inicial: `import { useState } from 'react'
import { Canvas } from '@react-three/fiber'
import * as THREE from 'three'

const OBJETIVO = new THREE.Vector3(2, 1, -1)

export default function App() {
  const [dron, setDron] = useState(() => new THREE.Vector3(-2, 0.5, 1))

  const acercar = () => {
    // TODO: dirección = (OBJETIVO - dron).normalize()
    // TODO: avanza 0.2 * distancia en esa dirección
    setDron(dron.clone())
  }

  const distancia = dron.distanceTo(OBJETIVO)

  return (
    <div style={{ height: 340, background: '#111', color: '#ddd', fontFamily: 'system-ui' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: 8, fontSize: 13 }}>
        <button onClick={acercar}>Acercar un 20 %</button>
        <button onClick={() => setDron(new THREE.Vector3(-2, 0.5, 1))}>Reiniciar</button>
        <span>distancia = {distancia.toFixed(2)} m</span>
      </div>

      <div style={{ height: 280 }}>
        <Canvas camera={{ position: [4, 3, 5], fov: 45 }}>
          <gridHelper args={[10, 10, '#3b4c6b', '#222a39']} />
          <mesh position={[dron.x, dron.y, dron.z]}>
            <octahedronGeometry args={[0.25, 0]} />
            <meshBasicMaterial color="#4d8df6" />
          </mesh>
          <mesh position={[OBJETIVO.x, OBJETIVO.y, OBJETIVO.z]}>
            <sphereGeometry args={[0.15, 16, 16]} />
            <meshBasicMaterial color="#ff5a5a" />
          </mesh>
        </Canvas>
      </div>
    </div>
  )
}`,
        solucion: `import { useState } from 'react'
import { Canvas } from '@react-three/fiber'
import * as THREE from 'three'

const OBJETIVO = new THREE.Vector3(2, 1, -1)

export default function App() {
  const [dron, setDron] = useState(() => new THREE.Vector3(-2, 0.5, 1))

  const acercar = () => {
    const distancia = dron.distanceTo(OBJETIVO)
    if (distancia < 0.001) return

    const direccion = OBJETIVO.clone().sub(dron).normalize()
    const siguiente = dron.clone().addScaledVector(direccion, distancia * 0.2)
    setDron(siguiente)
  }

  const distancia = dron.distanceTo(OBJETIVO)

  return (
    <div style={{ height: 340, background: '#111', color: '#ddd', fontFamily: 'system-ui' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: 8, fontSize: 13 }}>
        <button onClick={acercar}>Acercar un 20 %</button>
        <button onClick={() => setDron(new THREE.Vector3(-2, 0.5, 1))}>Reiniciar</button>
        <span>distancia = {distancia.toFixed(2)} m</span>
      </div>

      <div style={{ height: 280 }}>
        <Canvas camera={{ position: [4, 3, 5], fov: 45 }}>
          <gridHelper args={[10, 10, '#3b4c6b', '#222a39']} />
          <mesh position={[dron.x, dron.y, dron.z]}>
            <octahedronGeometry args={[0.25, 0]} />
            <meshBasicMaterial color="#4d8df6" />
          </mesh>
          <mesh position={[OBJETIVO.x, OBJETIVO.y, OBJETIVO.z]}>
            <sphereGeometry args={[0.15, 16, 16]} />
            <meshBasicMaterial color="#ff5a5a" />
          </mesh>
        </Canvas>
      </div>
    </div>
  )
}`,
        pistas: [
          'Restar dos Vector3 devuelve un Vector3 nuevo: OBJETIVO.clone().sub(dron).',
          'normalize() deja la dirección en longitud 1; después multiplica por la distancia que quieras recorrer.',
          'addScaledVector(direccion, cantidad) es la forma corta de sumar dirección × cantidad sin mutar la dirección.',
        ],
      },
    },
  ],
}

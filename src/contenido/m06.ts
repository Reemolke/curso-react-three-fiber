import type { Modulo } from './tipos'

export const modulo6: Modulo = {
  numero: 6,
  titulo: 'Interacción: eventos, cámara y controles',
  descripcion:
    'Una escena que no reacciona es una fotografía. Aquí aprendes a escuchar el puntero, mover la cámara con límites, leer el teclado sin re-renderizar y convertir el scroll en parte de la puesta en escena.',
  lecciones: [
    {
      id: '6.1',
      modulo: 6,
      titulo: 'Eventos de puntero',
      objetivo:
        'Manejar onClick, onPointerOver y onPointerOut sobre objetos 3D, leer el punto de impacto y cortar la propagación cuando haga falta.',
      nivel: 'intro',
      minutos: 50,
      bloques: [
        {
          tipo: 'parrafo',
          texto:
            'En una página normal, un botón recibe clics porque el navegador sabe dónde está y qué tamaño tiene. Un cubo en WebGL no es un elemento del DOM: es geometría dibujada dentro de un canvas. Para que reaccione al puntero, alguien tiene que calcular qué objeto hay debajo y a qué distancia. Ese cálculo es un raycast, y React Three Fiber lo hace por ti en cada evento de puntero.',
        },
        {
          tipo: 'demo',
          id: 'm6-galeria-eventos',
          titulo: 'Cinco piezas, cinco formas de reaccionar',
          alto: 380,
          nota: 'El rótulo de debajo del lienzo muestra el último evento y sus coordenadas. El suelo también escucha: las piezas llaman a stopPropagation para que el clic no llegue hasta él.',
        },
        {
          tipo: 'parrafo',
          texto:
            'Pasa el puntero por las piezas y pulsa. El cubo cambia de color al entrar y alterna su tono al hacer clic; la esfera crece y gira; el cono se eleva; el toro gira en dos pasos; el icosaedro pasa a modo alambre. Ninguno de esos efectos está programado en el objeto: todos son estado de React que cambia porque un handler se ha ejecutado. Fíjate también en el suelo del fondo: si pulsas fuera de las piezas, recibes el clic con sus coordenadas de mundo.',
        },
        {
          tipo: 'destacado',
          tono: 'porque',
          titulo: 'Por qué el orden importa',
          texto:
            'R3F no añade un listener a cada objeto. Escucha en el canvas, lanza un rayo desde la cámara por el puntero y recorre los objetos atravesados del más cercano al más lejano. A cada uno le llama su handler. Por eso una pieza que está delante puede impedir que el suelo de detrás reciba el mismo evento: basta con llamar a stopPropagation.',
        },
        {
          tipo: 'codigo',
          lenguaje: 'tsx',
          titulo: 'Los tres handlers que usarás el 90 % del tiempo',
          codigo: `function Cubo() {
  const [hover, setHover] = useState(false)

  return (
    <mesh
      onPointerOver={(e) => {
        e.stopPropagation()            // el suelo de detrás no recibe el evento
        setHover(true)
        document.body.style.cursor = 'pointer'
      }}
      onPointerOut={(e) => {
        e.stopPropagation()
        setHover(false)
        document.body.style.cursor = 'auto'
      }}
      onClick={(e) => {
        e.stopPropagation()
        // e.point está en coordenadas de mundo, no en píxeles
        console.log(e.point.x, e.point.y, e.point.z)
      }}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={hover ? '#f5a524' : '#4d8df6'} />
    </mesh>
  )
}`,
        },
        {
          tipo: 'tabla',
          cabecera: ['Evento', 'Cuándo llega', 'Para qué sirve'],
          filas: [
            ['onPointerOver', 'El puntero entra en el objeto', 'Resaltar, cambiar el cursor'],
            ['onPointerOut', 'El puntero sale del objeto', 'Deshacer el resaltado'],
            ['onClick', 'Baja y sube el botón sobre el mismo objeto', 'Seleccionar, alternar un valor'],
            ['onPointerMove', 'El puntero se mueve sobre el objeto', 'Arrastrar; nunca para setState'],
          ],
        },
        {
          tipo: 'lista',
          items: [
            '`event.object` es la malla intersectada; `event.eventObject` es la que registró el handler, que puede ser un grupo padre.',
            '`event.point` es el punto de impacto en coordenadas de mundo. Es el dato que usarás para colocar cosas sobre una superficie.',
            '`event.distance` mide desde la cámara hasta el impacto. Sirve para ordenar o para descartar lo que está demasiado lejos.',
            '`event.intersections` contiene todas las intersecciones ordenadas; `event.stopPropagation()` corta las que vienen después.',
            '`onPointerMissed` no va en un objeto: si lo necesitas, se declara en el `<Canvas>`.',
          ],
        },
        {
          tipo: 'destacado',
          tono: 'ojo',
          titulo: 'El cursor y el estado son globales',
          texto:
            'Si cambias document.body.style.cursor al entrar, tienes que restaurarlo al salir y también al desmontar la demo. Y no metas setState dentro de onPointerMove: ese evento se dispara decenas de veces por segundo. Para lo que cambia en cada frame, guarda el dato en un ref y muévelo en useFrame.',
        },
      ],
      errores: [
        {
          sintoma: 'El cursor se queda como una mano por toda la página después de salir del lienzo.',
          causa:
            'Solo restauras el cursor en onPointerOut, pero ese evento no siempre llega si el objeto desaparece o el puntero abandona el canvas de golpe.',
          arreglo:
            'Restaura el cursor en onPointerOut y añade un useEffect con limpieza que lo devuelva a auto al desmontar la demo.',
        },
        {
          sintoma: 'Al pulsar una pieza también se ejecuta el handler del suelo que hay detrás.',
          causa:
            'El evento recorre todas las intersecciones del rayo, de la más cercana a la más lejana, y el suelo está detrás.',
          arreglo:
            'Llama a event.stopPropagation() en el handler de la pieza. Si quieres que el suelo reciba el evento cuando la pieza no lo maneja, no lo llames.',
        },
        {
          sintoma: 'La escena se entrecorta al mover el puntero por encima de un objeto.',
          causa:
            'Estás guardando la posición del puntero en useState dentro de onPointerMove, lo que provoca un render de React por cada movimiento.',
          arreglo:
            'Guarda el valor en un ref y úsalo desde useFrame, o limita las actualizaciones de UI a eventos puntuales como over, out o clic.',
        },
      ],
      quiz: [
        {
          tipo: 'unica',
          enunciado: '¿Qué contiene event.point en un handler de R3F?',
          opciones: [
            'La posición del puntero en píxeles de pantalla',
            'El punto de impacto del rayo en coordenadas de mundo',
            'La normal de la cara intersectada',
            'La posición actual de la cámara',
          ],
          correcta: 1,
          explicacion:
            'El punto de impacto se calcula en el espacio de la escena. Para píxeles está event.nativeEvent.clientX, y para la normal, event.face.normal.',
        },
        {
          tipo: 'multiple',
          enunciado: '¿Qué eventos pertenecen al sistema de punteros de R3F?',
          opciones: ['onClick', 'onPointerOver', 'onPointerOut', 'onMouseEnter'],
          correctas: [0, 1, 2],
          explicacion:
            'R3F trabaja con eventos de puntero. onMouseEnter es un evento del DOM que R3F no replica; el equivalente es onPointerEnter.',
        },
        {
          tipo: 'verdadero-falso',
          enunciado:
            'Un objeto sin ningún handler de evento sigue participando en el raycast de los eventos de puntero.',
          correcta: false,
          explicacion:
            'R3F solo prueba los objetos que tienen handlers registrados. Si no hay handler, el objeto no entra en la lista de intersecciones de los eventos.',
        },
        {
          tipo: 'unica',
          enunciado: '¿Qué hace event.stopPropagation() dentro de un handler de R3F?',
          opciones: [
            'Cancela el evento nativo del navegador',
            'Impide que las intersecciones más lejanas reciban el mismo evento',
            'Elimina el handler del objeto',
            'Detiene el bucle de render',
          ],
          correcta: 1,
          explicacion:
            'El evento se reparte por las intersecciones ordenadas por distancia. stopPropagation corta ese reparto; no tiene nada que ver con el bucle de render.',
        },
      ],
      recursos: [
        {
          titulo: 'React Three Fiber — Events',
          url: 'https://r3f.docs.pmnd.rs/api/events',
          nota: 'La referencia de los eventos, la propagación y onPointerMissed.',
        },
        {
          titulo: 'three.js — Raycaster',
          url: 'https://threejs.org/docs/#api/en/core/Raycaster',
          nota: 'El cálculo que hay debajo de cada hover. Útil para entender el coste.',
        },
        {
          titulo: 'MDN — Pointer events',
          url: 'https://developer.mozilla.org/en-US/docs/Web/API/Pointer_events',
          nota: 'El modelo de eventos del navegador: pointerdown, pointermove, pointerup y captura.',
        },
      ],
      ejercicio: {
        reto: 'Convierte una rejilla de 3×3 cubos en una galería: cada cubo se ilumina al pasar el puntero y cambia de color al hacer clic, sin que el clic se propague a los demás.',
        inicial: `import { useState } from 'react'
import { Canvas } from '@react-three/fiber'

function Cubo({ x, z }: { x: number; z: number }) {
  const [hover, setHover] = useState(false)
  const [color, setColor] = useState('#4d8df6')

  return (
    <mesh
      position={[x, 0, z]}
      // TODO: añade onPointerOver, onPointerOut y onClick
    >
      <boxGeometry args={[0.7, 0.7, 0.7]} />
      <meshStandardMaterial color={hover ? '#3fbf87' : color} />
    </mesh>
  )
}

export default function App() {
  const posiciones = [-1.1, 0, 1.1]

  return (
    <div style={{ height: 340, background: '#111' }}>
      <Canvas camera={{ position: [0, 4, 5] }}>
        <ambientLight intensity={0.7} />
        <directionalLight position={[3, 6, 4]} intensity={2} />
        {posiciones.map((x) =>
          posiciones.map((z) => <Cubo key={x + '-' + z} x={x} z={z} />),
        )}
      </Canvas>
    </div>
  )
}`,
        solucion: `import { useState } from 'react'
import { Canvas } from '@react-three/fiber'

function Cubo({ x, z }: { x: number; z: number }) {
  const [hover, setHover] = useState(false)
  const [color, setColor] = useState('#4d8df6')

  return (
    <mesh
      position={[x, 0, z]}
      onPointerOver={(e) => {
        e.stopPropagation()
        setHover(true)
      }}
      onPointerOut={() => setHover(false)}
      onClick={(e) => {
        e.stopPropagation()
        setColor((actual) => (actual === '#4d8df6' ? '#f5a524' : '#4d8df6'))
      }}
    >
      <boxGeometry args={[0.7, 0.7, 0.7]} />
      <meshStandardMaterial color={hover ? '#3fbf87' : color} />
    </mesh>
  )
}

export default function App() {
  const posiciones = [-1.1, 0, 1.1]

  return (
    <div style={{ height: 340, background: '#111' }}>
      <Canvas camera={{ position: [0, 4, 5] }}>
        <ambientLight intensity={0.7} />
        <directionalLight position={[3, 6, 4]} intensity={2} />
        {posiciones.map((x) =>
          posiciones.map((z) => <Cubo key={x + '-' + z} x={x} z={z} />),
        )}
      </Canvas>
    </div>
  )
}`,
        pistas: [
          'Los tres handlers se colocan en el <mesh>, como si fueran props de React normales.',
          'El hover puede ser un booleano; el clic, un contador o un color que alterna.',
          'No olvides event.stopPropagation() en el clic y en el hover para que el cubo de detrás no responda.',
        ],
      },
    },
    {
      id: '6.2',
      modulo: 6,
      titulo: 'Raycasting',
      objetivo:
        'Explicar qué hace un raycast, dibujar el rayo del puntero y medir cuántos objetos atraviesa sin disparar renders de React.',
      nivel: 'medio',
      minutos: 55,
      bloques: [
        {
          tipo: 'parrafo',
          texto:
            'R3F ya lanza un rayo cada vez que mueves o pulsas el puntero: eso es lo que hace posible la lección anterior. En esta vas a lanzar otro rayo a mano, uno por frame, para verlo y medirlo. Es el mismo cálculo, pero explícito. Y como es explícito, también es tuyo su coste: cada frame recorres los objetos que le pidas y pruebas sus triángulos. Verlo dibujado ayuda a entender por qué conviene limitarlo.',
        },
        {
          tipo: 'widget',
          id: 'm6-puntero-ndc',
          titulo: 'El puntero no llega en píxeles: llega en NDC',
        },
        {
          tipo: 'parrafo',
          texto:
            'El widget muestra el mapeo: el centro del lienzo es (0, 0), el borde derecho es x = 1, el superior es y = 1 y el eje vertical va al revés que en CSS. Ese par de valores es state.pointer, y es exactamente lo que espera raycaster.setFromCamera. Si conviertes otra vez a píxeles antes de llamarlo, el rayo apuntará a cualquier sitio menos a donde está el puntero.',
        },
        {
          tipo: 'demo',
          id: 'm6-raycast',
          titulo: 'El rayo, la intersección y el recuento',
          alto: 400,
          nota: 'El rayo nace en la cámara y pasa por el puntero. Se pinta en ámbar cuando encuentra algo y en azul cuando no. El contador es el número de impactos, no el número de objetos: una misma malla puede aportar más de una intersección.',
        },
        {
          tipo: 'parrafo',
          texto:
            'Mueve el puntero por los huecos entre las piezas y luego por encima de ellas. El rayo no cambia de origen: siempre sale de la cámara. Lo único que cambia es su dirección. Cuando atraviesa el toro, el cubo y la esfera, el recuento sube; cuando pasa entre ellos, cae a cero y la línea se vuelve azul. Esa línea no es un objeto especial de three.js: es una Line normal cuya geometría tiene dos vértices que se reescriben en cada frame.',
        },
        {
          tipo: 'destacado',
          tono: 'porque',
          titulo: 'R3F ya raycasta. ¿Por qué otro rayo?',
          texto:
            'Porque el de R3F solo existe mientras se está despachando un evento: sirve para decidir qué handler llamar. El de la demo mide de forma continua, aunque no pulses nada. Son dos necesidades distintas y dos costes distintos. El de la demo corre 60 veces por segundo; por eso se limita a una escena pequeña y se reutilizan el raycaster y los vectores en lugar de crear objetos dentro del frame.',
        },
        {
          tipo: 'codigo',
          lenguaje: 'tsx',
          titulo: 'El rayo completo, frame a frame',
          codigo: `const raycaster = useRef(new THREE.Raycaster())
const fin = useRef(new THREE.Vector3())

useFrame((state) => {
  // La cámara pudo moverse en este frame: las matrices deben estar al día.
  state.camera.updateMatrixWorld()
  raycaster.current.setFromCamera(state.pointer, state.camera)

  const impactos = raycaster.current
    .intersectObjects(state.scene.children, true)   // true = recursivo

  const primero = impactos[0]
  if (primero) {
    fin.current.copy(primero.point)
  } else {
    // Sin impacto, el rayo se dibuja hasta 20 unidades.
    fin.current
      .copy(raycaster.current.ray.origin)
      .addScaledVector(raycaster.current.ray.direction, 20)
  }

  // Actualiza los dos vértices de la línea sin crear una geometría nueva.
  const posiciones = linea.current.geometry.getAttribute('position')
  posiciones.setXYZ(0, raycaster.current.ray.origin.x, raycaster.current.ray.origin.y, raycaster.current.ray.origin.z)
  posiciones.setXYZ(1, fin.current.x, fin.current.y, fin.current.z)
  posiciones.needsUpdate = true
})`,
        },
        {
          tipo: 'lista',
          items: [
            'state.pointer ya está en NDC. No lo normalices dos veces.',
            'Reutiliza el raycaster y los vectores: crear un Vector3 por frame es basura para el recolector.',
            'intersectObjects(..., true) recorre los hijos; con false solo prueba el primer nivel.',
            'raycaster.layers permite decidir qué objetos son candidatos, sin tocar la escena.',
            'raycaster.far acota la distancia: lo que esté más lejos ni se prueba.',
            'Para actualizar la UI usa refs o mutaciones del DOM; un setState por frame es una reconciliación de React por frame.',
          ],
        },
        {
          tipo: 'destacado',
          tono: 'ojo',
          titulo: 'El coste no es fijo',
          texto:
            'Un raycast cuesta más cuantos más objetos candidatos haya y cuanta más geometría tenga cada uno. three.js descarta antes por esfera envolvente, pero no es gratis. Si la escena crece, no lances el rayo contra todo cada frame: limita por capas, por grupo o hazlo cada dos o tres frames. Y mide antes de optimizar; no hay una cifra universal de milisegundos.',
        },
      ],
      errores: [
        {
          sintoma: 'La línea no aparece o se queda clavada en el centro de la escena.',
          causa:
            'La geometría tiene dos vértices, pero nunca actualizas sus posiciones o te olvidas de needsUpdate.',
          arreglo:
            'Escribe los dos vértices con setXYZ y marca el atributo con needsUpdate = true en cada frame.',
        },
        {
          sintoma: 'El recuento se queda a cero aunque el puntero esté encima de una malla.',
          causa:
            'Estás lanzando el rayo contra un array que no contiene los objetos, o la cámara se ha movido sin actualizar su matriz de mundo.',
          arreglo:
            'Comprueba qué le pasas a intersectObjects y llama a camera.updateMatrixWorld() antes de setFromCamera si mueves la cámara por código.',
        },
        {
          sintoma: 'Al añadir objetos, la demo empieza a ir a tirones.',
          causa: 'Lanzas el rayo contra la escena entera en cada frame, con recursión.',
          arreglo:
            'Limita el raycast a un grupo reducido, usa raycaster.layers o lánzalo cada pocos frames. El rayo de la demo nunca necesita probar la escena completa.',
        },
      ],
      quiz: [
        {
          tipo: 'unica',
          enunciado: '¿Qué coordenadas espera raycaster.setFromCamera como primer argumento?',
          opciones: [
            'Píxeles desde la esquina superior izquierda',
            'Coordenadas normalizadas entre -1 y 1',
            'Coordenadas de mundo',
            'Grados de rotación de la cámara',
          ],
          correcta: 1,
          explicacion:
            'setFromCamera trabaja con NDC, el mismo espacio que state.pointer. El centro es (0, 0) y los bordes llegan a ±1.',
        },
        {
          tipo: 'verdadero-falso',
          enunciado:
            'El raycast que hace R3F para despachar un evento y el que hace esta demo en useFrame son el mismo cálculo reutilizado.',
          correcta: false,
          explicacion:
            'Son dos raycasts independientes. El de R3F solo vive durante el evento; el de la demo se ejecuta en cada frame aunque no pase nada.',
        },
        {
          tipo: 'multiple',
          enunciado: '¿Qué decisiones reducen el coste de un raycast continuo?',
          opciones: [
            'Lanzarlo contra un grupo reducido en vez de contra toda la escena',
            'Limitar los candidatos con raycaster.layers',
            'Lanzarlo contra la escena completa en cada frame',
            'Reutilizar el raycaster y los vectores auxiliares',
          ],
          correctas: [0, 1, 3],
          explicacion:
            'Cuantos menos candidatos y menos asignaciones por frame, mejor. Lanzarlo contra todo cada frame es justo lo que hay que evitar.',
        },
        {
          tipo: 'unica',
          enunciado: '¿Qué devuelve intersectObjects cuando el rayo no toca nada?',
          opciones: [
            'null',
            'Un array vacío',
            'Una intersección con distancia infinita',
            'Lanza un error',
          ],
          correcta: 1,
          explicacion:
            'Siempre devuelve un array. Si está vacío, no hay impacto; puedes comprobar length o leer el primer elemento con cuidado.',
        },
      ],
      recursos: [
        {
          titulo: 'three.js — Raycaster',
          url: 'https://threejs.org/docs/#api/en/core/Raycaster',
          nota: 'setFromCamera, intersectObjects, layers y far: todo lo que usa la demo.',
        },
        {
          titulo: 'three.js — Vector2',
          url: 'https://threejs.org/docs/#api/en/math/Vector2',
          nota: 'El tipo de state.pointer y de las coordenadas NDC.',
        },
        {
          titulo: 'React Three Fiber — Events',
          url: 'https://r3f.docs.pmnd.rs/api/events',
          nota: 'Para comparar el raycast de los eventos con el que haces tú a mano.',
        },
      ],
      ejercicio: {
        reto: 'Completa la línea del rayo: debe ir desde la cámara hasta el primer impacto, o hasta 20 unidades si no toca nada. El contador de impactos ya funciona.',
        inicial: `import { useMemo, useRef } from 'react'
import type { RefObject } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

function Escena({ cuenta }: { cuenta: RefObject<HTMLSpanElement | null> }) {
  const escena = useThree((estado) => estado.scene)
  const raycaster = useRef(new THREE.Raycaster())
  const fin = useRef(new THREE.Vector3())

  const rayo = useMemo(() => {
    const geometria = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(),
      new THREE.Vector3(),
    ])
    const linea = new THREE.Line(
      geometria,
      new THREE.LineBasicMaterial({ color: '#f5a524' }),
    )
    linea.raycast = () => {}
    return linea
  }, [])

  useFrame((estado) => {
    estado.camera.updateMatrixWorld()
    raycaster.current.setFromCamera(estado.pointer, estado.camera)

    const impactos = raycaster.current.intersectObjects(escena.children, true)
    const primero = impactos[0]

    if (primero) fin.current.copy(primero.point)
    else {
      fin.current
        .copy(raycaster.current.ray.origin)
        .addScaledVector(raycaster.current.ray.direction, 20)
    }

    if (cuenta.current) cuenta.current.textContent = String(impactos.length)

    // TODO: escribe el origen y el final en los dos vértices de la línea.
  })

  return (
    <>
      <primitive object={rayo} />
      <ambientLight intensity={0.8} />
      <directionalLight position={[4, 6, 4]} intensity={2} />
      <mesh position={[-1.2, 0.5, 0]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="#4d8df6" />
      </mesh>
      <mesh position={[1.2, 0.5, 0]}>
        <sphereGeometry args={[0.6, 24, 24]} />
        <meshStandardMaterial color="#3fbf87" />
      </mesh>
    </>
  )
}

export default function App() {
  const cuenta = useRef<HTMLSpanElement>(null)

  return (
    <div style={{ height: 340, background: '#111' }}>
      <p style={{ color: '#eee', fontFamily: 'system-ui', padding: 8, margin: 0 }}>
        Impactos: <span ref={cuenta}>0</span>
      </p>
      <Canvas style={{ height: 290 }} camera={{ position: [0, 1.5, 5] }}>
        <Escena cuenta={cuenta} />
      </Canvas>
    </div>
  )
}`,
        solucion: `import { useMemo, useRef } from 'react'
import type { RefObject } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

function Escena({ cuenta }: { cuenta: RefObject<HTMLSpanElement | null> }) {
  const escena = useThree((estado) => estado.scene)
  const raycaster = useRef(new THREE.Raycaster())
  const fin = useRef(new THREE.Vector3())

  const rayo = useMemo(() => {
    const geometria = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(),
      new THREE.Vector3(),
    ])
    const linea = new THREE.Line(
      geometria,
      new THREE.LineBasicMaterial({ color: '#f5a524' }),
    )
    linea.raycast = () => {}
    return linea
  }, [])

  useFrame((estado) => {
    estado.camera.updateMatrixWorld()
    raycaster.current.setFromCamera(estado.pointer, estado.camera)

    const impactos = raycaster.current.intersectObjects(escena.children, true)
    const primero = impactos[0]

    if (primero) fin.current.copy(primero.point)
    else {
      fin.current
        .copy(raycaster.current.ray.origin)
        .addScaledVector(raycaster.current.ray.direction, 20)
    }

    if (cuenta.current) cuenta.current.textContent = String(impactos.length)

    const geometria = rayo.geometry
    const posiciones = geometria.getAttribute('position') as THREE.BufferAttribute
    const origen = raycaster.current.ray.origin
    posiciones.setXYZ(0, origen.x, origen.y, origen.z)
    posiciones.setXYZ(1, fin.current.x, fin.current.y, fin.current.z)
    posiciones.needsUpdate = true
  })

  return (
    <>
      <primitive object={rayo} />
      <ambientLight intensity={0.8} />
      <directionalLight position={[4, 6, 4]} intensity={2} />
      <mesh position={[-1.2, 0.5, 0]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="#4d8df6" />
      </mesh>
      <mesh position={[1.2, 0.5, 0]}>
        <sphereGeometry args={[0.6, 24, 24]} />
        <meshStandardMaterial color="#3fbf87" />
      </mesh>
    </>
  )
}

export default function App() {
  const cuenta = useRef<HTMLSpanElement>(null)

  return (
    <div style={{ height: 340, background: '#111' }}>
      <p style={{ color: '#eee', fontFamily: 'system-ui', padding: 8, margin: 0 }}>
        Impactos: <span ref={cuenta}>0</span>
      </p>
      <Canvas style={{ height: 290 }} camera={{ position: [0, 1.5, 5] }}>
        <Escena cuenta={cuenta} />
      </Canvas>
    </div>
  )
}`,
        pistas: [
          'La geometría ya tiene un atributo position con dos vértices: no la recrees.',
          'getAttribute("position") devuelve un BufferAttribute; usa setXYZ con el índice 0 y el 1.',
          'Después de escribir, asigna needsUpdate = true para que la GPU reciba los cambios.',
        ],
      },
    },
    {
      id: '6.3',
      modulo: 6,
      titulo: 'Controles de cámara',
      objetivo:
        'Configurar OrbitControls y CameraControls con límites de distancia, ángulo polar y azimut, y leer esos límites en la escena.',
      nivel: 'intro',
      minutos: 50,
      bloques: [
        {
          tipo: 'parrafo',
          texto:
            'Una cámara libre es estupenda hasta que el usuario la mete debajo del suelo o la atraviesa. Los controles de cámara no solo mueven la cámara: también la frenan. OrbitControls orbita alrededor de un objetivo y es el estándar para inspeccionar un objeto. CameraControls añade desplazamientos, transiciones y un suavizado más fino. En esta lección vas a montar los dos y a dibujar sus límites para que dejen de ser números invisibles.',
        },
        {
          tipo: 'demo',
          id: 'm6-controles',
          titulo: 'Dos controles, dos conjuntos de límites',
          alto: 420,
          nota: 'El anillo azul es minDistance, el ámbar es maxDistance y el verde marca la altura máxima de la cámara. Las dos líneas verdes limitan el giro horizontal. Cambia de control y verás que los límites también cambian.',
        },
        {
          tipo: 'parrafo',
          texto:
            'Con OrbitControls, arrastra para orbitar y usa la rueda para acercarte. Verás que la cámara se detiene en el anillo azul y en el ámbar. Si intentas subir por encima del límite polar, se queda en el borde; si giras más allá del azimut permitido, también. Con CameraControls el gesto es más suave y los límites son otros. No son límites decorativos: son los mismos valores que recibe la cámara, así que lo que ves dibujado es lo que se aplica.',
        },
        {
          tipo: 'destacado',
          tono: 'porque',
          titulo: 'Medidos desde el objetivo, no desde el origen',
          texto:
            'minDistance y maxDistance no son distancias al origen del mundo: son distancias al target de los controles. Si mueves el target, los anillos deberían moverse con él. Lo mismo pasa con el ángulo polar, que se mide desde el eje +Y, y con el azimut, que gira alrededor de ese eje. Por eso la demo centra el objetivo en el origen: así los límites dibujados y los aplicados coinciden.',
        },
        {
          tipo: 'codigo',
          lenguaje: 'tsx',
          titulo: 'OrbitControls con los cuatro límites',
          codigo: `<OrbitControls
  makeDefault
  enableDamping
  dampingFactor={0.08}
  target={[0, 0, 0]}
  minDistance={2.6}
  maxDistance={6}
  maxPolarAngle={MathUtils.degToRad(65)}
  minAzimuthAngle={MathUtils.degToRad(-55)}
  maxAzimuthAngle={MathUtils.degToRad(55)}
/>`,
        },
        {
          tipo: 'codigo',
          lenguaje: 'tsx',
          titulo: 'El mismo encargo con CameraControls',
          codigo: `<CameraControls
  makeDefault
  minDistance={1.8}
  maxDistance={8}
  maxPolarAngle={MathUtils.degToRad(85)}
  minAzimuthAngle={MathUtils.degToRad(-115)}
  maxAzimuthAngle={MathUtils.degToRad(115)}
  smoothTime={0.35}
/>`,
        },
        {
          tipo: 'tabla',
          cabecera: ['Propiedad', 'Qué limita', 'Unidad'],
          filas: [
            ['minDistance / maxDistance', 'Acercarse y alejarse del target', 'Unidades de mundo'],
            ['minPolarAngle / maxPolarAngle', 'Subir o bajar respecto al eje +Y', 'Radianes'],
            ['minAzimuthAngle / maxAzimuthAngle', 'Girar alrededor del eje +Y', 'Radianes'],
          ],
        },
        {
          tipo: 'lista',
          items: [
            '`makeDefault` registra el control como el activo para el resto de componentes de drei.',
            '`enableDamping` suaviza el movimiento, pero necesita que alguien llame a update en cada frame; drei ya lo hace.',
            'Si montas dos controles a la vez, los dos escuchan los mismos gestos y la cámara se pelea consigo misma.',
            'Los límites se recortan antes de aplicar el movimiento: la cámara no salta, se queda en el borde.',
            'Para que la cámara no baje del suelo, maxPolarAngle debe ser menor o igual que PI/2 si el target está a la altura del suelo.',
          ],
        },
        {
          tipo: 'destacado',
          tono: 'truco',
          titulo: 'Dibuja los límites mientras los diseñas',
          texto:
            'Un anillo con RingGeometry a la distancia mínima y otro a la máxima te dicen en un vistazo si los números tienen sentido. Para el ángulo polar, un anillo a la altura maxDistance · cos(polar) y radio maxDistance · sin(polar) marca el techo de la cámara. No es magia: es la intersección de la esfera de distancia máxima con el cono de ángulo máximo.',
        },
      ],
      errores: [
        {
          sintoma: 'La cámara atraviesa el suelo o mira la escena desde abajo.',
          causa: 'No hay límite polar o maxPolarAngle es mayor que PI/2 con el target a nivel del suelo.',
          arreglo:
            'Ajusta maxPolarAngle a MathUtils.degToRad(85) o menos y comprueba que el target está donde crees.',
        },
        {
          sintoma: 'Al cambiar de OrbitControls a CameraControls la cámara salta o se mueve sola.',
          causa:
            'Los dos controles están montados a la vez, o el nuevo arranca con un target distinto al que tenía la cámara.',
          arreglo:
            'Monta uno u otro con una condición, usa makeDefault en el activo y mantén el mismo target en ambos.',
        },
        {
          sintoma: 'Los anillos de límite no coinciden con el sitio donde se detiene la cámara.',
          causa: 'Estás dibujando los anillos centrados en el origen, pero el target de los controles está en otro punto.',
          arreglo:
            'Dibuja los anillos en la posición del target, o mueve el target al origen mientras diseñas los límites.',
        },
      ],
      quiz: [
        {
          tipo: 'unica',
          enunciado: '¿Respecto a qué se miden minDistance y maxDistance en OrbitControls?',
          opciones: [
            'Respecto al origen del mundo',
            'Respecto al target de los controles',
            'Respecto al centro del canvas',
            'Respecto a la posición inicial de la cámara',
          ],
          correcta: 1,
          explicacion:
            'La distancia se mide entre la cámara y el target. Si mueves el target, los límites se desplazan con él.',
        },
        {
          tipo: 'multiple',
          enunciado: '¿Qué límites acepta OrbitControls de drei?',
          opciones: [
            'minDistance y maxDistance',
            'maxPolarAngle',
            'minAzimuthAngle y maxAzimuthAngle',
            'maxFramerate',
          ],
          correctas: [0, 1, 2],
          explicacion:
            'Los tres primeros son propiedades de los controles. maxFramerate no existe: el límite de frames se gestiona en el canvas.',
        },
        {
          tipo: 'verdadero-falso',
          enunciado: 'makeDefault permite que otros componentes de drei encuentren el control activo.',
          correcta: true,
          explicacion:
            'Registra el control en el estado de R3F. Es lo que usan, por ejemplo, los componentes que necesitan saber qué controles mandan en la escena.',
        },
        {
          tipo: 'unica',
          enunciado:
            'Con el target a la altura del suelo, ¿qué valor de maxPolarAngle impide que la cámara baje de ese plano?',
          opciones: ['0', 'Math.PI / 4', 'Math.PI / 2', 'Math.PI'],
          correcta: 2,
          explicacion:
            'PI/2 es el plano horizontal que pasa por el target. Por encima de ese valor la cámara queda por debajo del suelo.',
        },
      ],
      recursos: [
        {
          titulo: 'drei — OrbitControls',
          url: 'https://drei.docs.pmnd.rs/controls/orbit-controls',
          nota: 'Las props que envuelven el OrbitControls de three.js, incluida makeDefault.',
        },
        {
          titulo: 'three.js — OrbitControls',
          url: 'https://threejs.org/docs/#examples/en/controls/OrbitControls',
          nota: 'La implementación original y el significado exacto de cada límite.',
        },
        {
          titulo: 'drei — CameraControls',
          url: 'https://drei.docs.pmnd.rs/controls/camera-controls',
          nota: 'La alternativa con transiciones y desplazamiento de cámara.',
        },
      ],
      ejercicio: {
        reto: 'Limita la órbita de la torre: la cámara no debe acercarse a menos de 3 unidades, alejarse a más de 7 ni bajar del plano del suelo.',
        inicial: `import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'

function Torre() {
  return (
    <group>
      <mesh position={[0, 1.1, 0]}>
        <cylinderGeometry args={[0.45, 0.6, 2.2, 8]} />
        <meshStandardMaterial color="#4d8df6" />
      </mesh>
      <mesh position={[0, 2.5, 0]}>
        <coneGeometry args={[0.7, 1, 8]} />
        <meshStandardMaterial color="#f5a524" />
      </mesh>
    </group>
  )
}

export default function App() {
  return (
    <div style={{ height: 340, background: '#111' }}>
      <Canvas camera={{ position: [0, 1.5, 6] }}>
        <ambientLight intensity={0.7} />
        <directionalLight position={[4, 8, 4]} intensity={2} />
        <Torre />
        <mesh rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[20, 20]} />
          <meshStandardMaterial color="#222" />
        </mesh>
        <OrbitControls target={[0, 1.2, 0]} />
      </Canvas>
    </div>
  )
}`,
        solucion: `import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { MathUtils } from 'three'

function Torre() {
  return (
    <group>
      <mesh position={[0, 1.1, 0]}>
        <cylinderGeometry args={[0.45, 0.6, 2.2, 8]} />
        <meshStandardMaterial color="#4d8df6" />
      </mesh>
      <mesh position={[0, 2.5, 0]}>
        <coneGeometry args={[0.7, 1, 8]} />
        <meshStandardMaterial color="#f5a524" />
      </mesh>
    </group>
  )
}

export default function App() {
  return (
    <div style={{ height: 340, background: '#111' }}>
      <Canvas camera={{ position: [0, 1.5, 6] }}>
        <ambientLight intensity={0.7} />
        <directionalLight position={[4, 8, 4]} intensity={2} />
        <Torre />
        <mesh rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[20, 20]} />
          <meshStandardMaterial color="#222" />
        </mesh>
        <OrbitControls
          target={[0, 1.2, 0]}
          enableDamping
          minDistance={3}
          maxDistance={7}
          maxPolarAngle={MathUtils.degToRad(88)}
        />
      </Canvas>
    </div>
  )
}`,
        pistas: [
          'Las tres restricciones son props de OrbitControls: minDistance, maxDistance y maxPolarAngle.',
          'El ángulo se escribe en radianes; MathUtils.degToRad convierte desde grados.',
          'PI/2 es el plano horizontal del target. Un poco menos (88°) evita que la cámara roce el suelo.',
        ],
      },
    },
    {
      id: '6.4',
      modulo: 6,
      titulo: 'Transiciones de cámara',
      objetivo:
        'Mover la cámara a un objetivo con tres métodos de suavizado distintos, interpolando también el punto al que mira.',
      nivel: 'medio',
      minutos: 55,
      bloques: [
        {
          tipo: 'parrafo',
          texto:
            'Cambiar camera.position de golpe es un corte: el usuario pierde la referencia de dónde estaba. Una transición bien hecha mantiene la orientación, evita atravesar la geometría y termina con una frenada perceptible. No hay un único método correcto: hay métodos con características distintas. En esta lección vas a comparar tres, todos escritos a mano en useFrame.',
        },
        {
          tipo: 'demo',
          id: 'm6-transiciones',
          titulo: 'Frontal, lateral y cenital: tres formas de llegar',
          alto: 420,
          nota: 'Cada vista usa un método distinto. Pulsa una y luego otra a mitad de vuelo: la transición arranca desde donde esté la cámara, nunca da un salto.',
        },
        {
          tipo: 'parrafo',
          texto:
            'La vista frontal usa MathUtils.damp: avanza mucho al principio y se frena al acercarse. La lateral usa una interpolación exponencial con 1 - exp(-k · delta), que es la misma idea pero con la constante de tiempo explícita. La cenital usa smoothstep con una duración fija de 1,3 segundos: empieza despacio, acelera y vuelve a frenar, y termina exactamente en el destino. Fíjate en que no solo cambia la posición: el punto al que mira la cámara también se interpola. Si no lo hicieras, la cámara viajaría mirando al sitio anterior y la escena se torcería.',
        },
        {
          tipo: 'destacado',
          tono: 'porque',
          titulo: 'Suavizar no es lo mismo que durar',
          texto:
            'damp y la exponencial son asintóticas: se acercan al destino sin llegar nunca de forma matemática. Eso está bien para seguir un objetivo que se mueve, porque siempre hay una pequeña corrección pendiente. Para un corte de cámara con principio y final claros, quieres una duración y una curva que llegue al 100 %. Ahí entra smoothstep: t normalizado de 0 a 1, y una función que empieza y acaba con pendiente cero.',
        },
        {
          tipo: 'codigo',
          lenguaje: 'tsx',
          titulo: 'Los tres métodos en el mismo useFrame',
          codigo: `useFrame((_, delta) => {
  const dt = Math.min(delta, 0.05)
  const e = estado.current

  if (e.tipo === 'damp') {
    camara.position.x = MathUtils.damp(camara.position.x, e.destino.x, 4, dt)
    camara.position.y = MathUtils.damp(camara.position.y, e.destino.y, 4, dt)
    camara.position.z = MathUtils.damp(camara.position.z, e.destino.z, 4, dt)
  } else if (e.tipo === 'exponencial') {
    const alfa = 1 - Math.exp(-3.2 * dt)   // el factor depende de delta
    camara.position.lerp(e.destino, alfa)
  } else {
    e.t = Math.min(1, e.t + dt / e.duracion)
    const x = e.t
    const suave = x * x * (3 - 2 * x)      // smoothstep
    camara.position.lerpVectors(e.origen, e.destino, suave)
  }

  camara.lookAt(e.objetivoActual)
})`,
        },
        {
          tipo: 'tabla',
          cabecera: ['Método', 'Cómo se comporta', '¿Llega exactamente?', 'Cuándo usarlo'],
          filas: [
            ['MathUtils.damp', 'Rápido al principio, se frena', 'No, es asintótico', 'Seguir un objetivo vivo'],
            ['1 - exp(-k · delta)', 'Igual, con k explícito', 'No, es asintótico', 'Ajustar la constante con precisión'],
            ['smoothstep con duración', 'Empieza y acaba despacio', 'Sí, en t = 1', 'Cortes y cinemáticas'],
          ],
        },
        {
          tipo: 'lista',
          items: [
            'Interpola siempre dos cosas: la posición y el punto al que mira la cámara.',
            'Guarda el origen al empezar la transición; si lo recalculas cada frame, la curva se aplana.',
            'Acota delta con Math.min(delta, 0.05) para que un cambio de pestaña no teletransporte la cámara.',
            'Si usas OrbitControls, desactívalos durante el vuelo o la cámara tendrá dos dueños.',
            'Un cambio de FOV también se puede interpolar, pero hazlo con el mismo método y el mismo reloj.',
          ],
        },
        {
          tipo: 'destacado',
          tono: 'ojo',
          titulo: 'No compares con igualdad',
          texto:
            'Con damp o con la exponencial, la cámara nunca es igual al destino: solo se acerca. Si escribes if (camara.position.x === destino.x) para terminar, no terminarás nunca. Usa una distancia mínima o cambia a un método con duración fija cuando necesites un final exacto.',
        },
      ],
      errores: [
        {
          sintoma: 'La cámara llega a tirones y se nota más en un monitor de 60 Hz que en uno de 144.',
          causa: 'Usas un factor de interpolación constante por frame en lugar de uno que dependa de delta.',
          arreglo:
            'Cambia alpha por 1 - Math.exp(-k * delta) o usa MathUtils.damp con delta en segundos.',
        },
        {
          sintoma: 'Durante el vuelo, la cámara mira al sitio anterior y la escena se ve torcida.',
          causa: 'Solo interpolas la posición y dejas el lookAt fijo hasta el final.',
          arreglo:
            'Interpola también el punto objetivo y llama a camera.lookAt con ese valor en cada frame.',
        },
        {
          sintoma: 'La transición se queda a medio camino y no hay forma de que termine.',
          causa:
            'Estás usando un método asintótico y comprobando la llegada con una igualdad exacta, o reinicias el origen en cada frame.',
          arreglo:
            'Guarda el origen una sola vez al empezar y comprueba la distancia con un umbral, o usa smoothstep con duración fija.',
        },
      ],
      quiz: [
        {
          tipo: 'unica',
          enunciado:
            '¿Cuál de estas expresiones produce un suavizado independiente de los fps?',
          opciones: [
            'posicion += (destino - posicion) * 0.1',
            'posicion += (destino - posicion) * (1 - Math.exp(-3 * delta))',
            'posicion += (destino - posicion) / 60',
            'posicion = destino * 0.1',
          ],
          correcta: 1,
          explicacion:
            'La exponencial usa delta para que el avance por segundo sea el mismo a cualquier tasa de refresco.',
        },
        {
          tipo: 'verdadero-falso',
          enunciado: 'MathUtils.damp espera el delta en segundos.',
          correcta: true,
          explicacion:
            'Como useFrame entrega delta en segundos, se pasa tal cual (acotado). Si lo pasas en milisegundos, el movimiento será casi instantáneo.',
        },
        {
          tipo: 'multiple',
          enunciado: '¿Qué conviene interpolar en una transición de cámara?',
          opciones: [
            'La posición de la cámara',
            'El punto al que mira',
            'El campo de visión, si quieres un efecto de zoom',
            'El tamaño del canvas',
          ],
          correctas: [0, 1, 2],
          explicacion:
            'El tamaño del canvas lo gestiona el layout, no la cámara. Los otros tres son parámetros visuales de la transición.',
        },
        {
          tipo: 'unica',
          enunciado: '¿Qué ventaja tiene smoothstep con duración fija frente a damp?',
          opciones: [
            'Es más barato de calcular',
            'Llega exactamente al destino en un tiempo conocido',
            'No necesita delta',
            'No necesita interpolar el objetivo',
          ],
          correcta: 1,
          explicacion:
            'La duración y el final exacto son su razón de ser. Sigue necesitando delta y sigue necesitando interpolar el objetivo.',
        },
      ],
      recursos: [
        {
          titulo: 'three.js — MathUtils',
          url: 'https://threejs.org/docs/#api/en/math/MathUtils',
          nota: 'damp, lerp, smoothstep y clamp, con la firma exacta de cada uno.',
        },
        {
          titulo: 'React Three Fiber — useFrame',
          url: 'https://r3f.docs.pmnd.rs/api/hooks#useframe',
          nota: 'El delta, el orden de ejecución y por qué aquí no se usa setState.',
        },
        {
          titulo: 'The Book of Shaders — Smoothstep',
          url: 'https://thebookofshaders.com/glossary/?term=smoothstep',
          nota: 'La curva 3t² - 2t³ explicada visualmente, aunque el artículo sea de shaders.',
        },
      ],
      ejercicio: {
        reto: 'Haz que la cámara vuele hasta la vista B en 1,2 segundos con smoothstep, en lugar de saltar de golpe.',
        inicial: `import { useEffect, useRef, useState } from 'react'
import { Canvas, useThree } from '@react-three/fiber'
import * as THREE from 'three'

const DESTINO = new THREE.Vector3(3.5, 2.2, 1.5)
const OBJETIVO = new THREE.Vector3(0, 0.8, 0)

function Vuelo({ viaje }: { viaje: number }) {
  const camara = useThree((estado) => estado.camera)

  useEffect(() => {
    // TODO: en vez de saltar, arranca una transición de 1,2 s.
    camara.position.copy(DESTINO)
    camara.lookAt(OBJETIVO)
  }, [viaje, camara])

  return null
}

export default function App() {
  const [viaje, setViaje] = useState(0)

  return (
    <div style={{ height: 320, background: '#111' }}>
      <button onClick={() => setViaje((v) => v + 1)}>Volar a B</button>
      <Canvas style={{ height: 280 }} camera={{ position: [0, 1.8, 5] }}>
        <ambientLight intensity={0.7} />
        <directionalLight position={[4, 6, 4]} intensity={2} />
        <mesh position={[0, 0.4, 0]}>
          <boxGeometry args={[1.2, 0.8, 1.2]} />
          <meshStandardMaterial color="#f5a524" />
        </mesh>
        <Vuelo viaje={viaje} />
      </Canvas>
    </div>
  )
}`,
        solucion: `import { useEffect, useRef, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

const DESTINO = new THREE.Vector3(3.5, 2.2, 1.5)
const OBJETIVO = new THREE.Vector3(0, 0.8, 0)

function Vuelo({ viaje }: { viaje: number }) {
  const camara = useThree((estado) => estado.camera)
  const estado = useRef({ t: 1, origen: new THREE.Vector3() })

  useEffect(() => {
    estado.current.origen.copy(camara.position)
    estado.current.t = 0
  }, [viaje, camara])

  useFrame((_, delta) => {
    const e = estado.current
    if (e.t >= 1) return

    const dt = Math.min(delta, 0.05)
    e.t = Math.min(1, e.t + dt / 1.2)
    const x = e.t
    const suave = x * x * (3 - 2 * x)

    camara.position.lerpVectors(e.origen, DESTINO, suave)
    camara.lookAt(OBJETIVO)
  })

  return null
}

export default function App() {
  const [viaje, setViaje] = useState(0)

  return (
    <div style={{ height: 320, background: '#111' }}>
      <button onClick={() => setViaje((v) => v + 1)}>Volar a B</button>
      <Canvas style={{ height: 280 }} camera={{ position: [0, 1.8, 5] }}>
        <ambientLight intensity={0.7} />
        <directionalLight position={[4, 6, 4]} intensity={2} />
        <mesh position={[0, 0.4, 0]}>
          <boxGeometry args={[1.2, 0.8, 1.2]} />
          <meshStandardMaterial color="#f5a524" />
        </mesh>
        <Vuelo viaje={viaje} />
      </Canvas>
    </div>
  )
}`,
        pistas: [
          'El efecto de arranque debe guardar la posición actual y poner t a 0.',
          'En useFrame, incrementa t con delta / 1.2 y acótalo a 1.',
          'Aplica smoothstep con x * x * (3 - 2 * x) y usa lerpVectors entre el origen y el destino.',
        ],
      },
    },
    {
      id: '6.5',
      modulo: 6,
      titulo: 'Teclado y estado sin re-render',
      objetivo:
        'Leer el teclado con listeners nativos, guardar las teclas en un Set dentro de un ref y mover la nave en useFrame sin provocar renders.',
      nivel: 'medio',
      minutos: 55,
      bloques: [
        {
          tipo: 'parrafo',
          texto:
            'Mover algo con el teclado parece el caso más simple del mundo: escuchas keydown y cambias una posición. El problema es dónde guardas esa posición. Si la guardas en useState, cada tecla pulsada es un render de React, y mantener la tecla produce repeticiones del sistema operativo. Si además actualizas por frame, tienes sesenta renders por segundo. La solución es la misma que en el módulo 5: el teclado se lee en un ref y el movimiento se aplica en useFrame.',
        },
        {
          tipo: 'demo',
          id: 'm6-teclado',
          titulo: 'La nave y el contador de renders',
          alto: 420,
          nota: 'Pulsa W, A, S y D. El contador de teclas sube; el de renders no. Si haces clic fuera del lienzo, el listener sigue activo porque está en window, no en el canvas.',
        },
        {
          tipo: 'parrafo',
          texto:
            'La nave tiene un rumbo y una posición que solo viven en el mundo de three.js. Cada keydown añade un código al Set; cada keyup lo quita. En cada frame, useFrame mira qué códigos hay, normaliza la dirección, multiplica por delta y aplica el resultado. El estado de React no interviene. El contador de renders que ves abajo se incrementa en el cuerpo del componente, así que si todo va bien se queda casi quieto mientras conduces. La interfaz que lo muestra está fuera del canvas y se actualiza cada 300 ms con un intervalo, no por frame.',
        },
        {
          tipo: 'destacado',
          tono: 'porque',
          titulo: 'event.code frente a event.key',
          texto:
            'event.key depende de la distribución del teclado: en un teclado AZERTY, la tecla física que está donde tú tienes la W produce otra letra. event.code identifica la tecla física (KeyW, KeyA, KeyS, KeyD), que es lo que quieres para un control de movimiento. Para atajos que dependen de la letra escrita, usa key.',
        },
        {
          tipo: 'codigo',
          lenguaje: 'tsx',
          titulo: 'El patrón completo: Set, listeners y useFrame',
          codigo: `const teclas = useRef(new Set<string>())

useEffect(() => {
  const abajo = (e: KeyboardEvent) => {
    if (e.target instanceof HTMLInputElement) return   // no secuestres un formulario
    teclas.current.add(e.code)
  }
  const arriba = (e: KeyboardEvent) => teclas.current.delete(e.code)
  const perderFoco = () => teclas.current.clear()      // sin keyup, las teclas se quedan pegadas

  window.addEventListener('keydown', abajo)
  window.addEventListener('keyup', arriba)
  window.addEventListener('blur', perderFoco)

  return () => {
    window.removeEventListener('keydown', abajo)
    window.removeEventListener('keyup', arriba)
    window.removeEventListener('blur', perderFoco)
    teclas.current.clear()
  }
}, [])

useFrame((_, delta) => {
  const dt = Math.min(delta, 0.05)
  let x = 0
  let z = 0
  if (teclas.current.has('KeyW')) z -= 1
  if (teclas.current.has('KeyS')) z += 1
  if (teclas.current.has('KeyA')) x -= 1
  if (teclas.current.has('KeyD')) x += 1

  if (x !== 0 || z !== 0) {
    const longitud = Math.hypot(x, z)
    nave.current.position.x += (x / longitud) * VELOCIDAD * dt
    nave.current.position.z += (z / longitud) * VELOCIDAD * dt
  }
})`,
        },
        {
          tipo: 'lista',
          items: [
            'Un Set elimina duplicados: las repeticiones de keydown mientras mantienes la tecla no acumulan nada.',
            'El listener va en window, no en el canvas: el teclado no necesita que el lienzo tenga el foco.',
            'Limpia siempre en el return del useEffect; si no, cada montaje deja un listener vivo.',
            'El evento blur de window es tu red de seguridad: al cambiar de pestaña se pierde el keyup.',
            'Mueve en useFrame con delta; el teclado solo dice qué teclas están pulsadas, no cuánto mover.',
          ],
        },
        {
          tipo: 'destacado',
          tono: 'ojo',
          titulo: 'Los listeners globales tienen consecuencias',
          texto:
            'Mientras la demo está montada, cualquier W que pulses en la página mueve la nave, aunque estés escribiendo en un buscador. En una aplicación real, o compruebas el elemento activo, o solo activas el control cuando el lienzo tiene el foco. Aquí se usa window a propósito para que el teclado funcione sin hacer clic primero, pero es una decisión que hay que tomar, no un detalle.',
        },
      ],
      errores: [
        {
          sintoma: 'La nave sigue moviéndose después de soltar las teclas o al volver de otra pestaña.',
          causa:
            'El keyup se pierde cuando la ventana pierde el foco, o los listeners no se limpian al desmontar.',
          arreglo:
            'Añade un listener de blur que vacíe el Set y limpia todos los listeners en el return del useEffect.',
        },
        {
          sintoma: 'En un monitor de 144 Hz la nave va mucho más rápido que en uno de 60.',
          causa: 'El movimiento se aplica por frame sin multiplicar por delta.',
          arreglo: 'Multiplica la velocidad por delta en segundos y acota delta con Math.min(delta, 0.05).',
        },
        {
          sintoma: 'Cada pulsación de tecla repinta toda la escena y el contador de renders sube sin parar.',
          causa: 'Las teclas pulsadas están en useState en lugar de en un ref.',
          arreglo:
            'Guarda el Set en useRef. Un ref no dispara renders; el cambio se aplica en useFrame, donde ya toca dibujar.',
        },
      ],
      quiz: [
        {
          tipo: 'unica',
          enunciado: '¿Por qué las teclas se guardan en un Set dentro de useRef?',
          opciones: [
            'Porque un Set es más rápido que un array al buscar',
            'Porque mutar el ref no provoca renders y el valor sobrevive entre frames',
            'Porque useState no acepta teclas',
            'Porque el Set se borra solo al soltar la tecla',
          ],
          correcta: 1,
          explicacion:
            'Las dos razones se complementan: el ref persiste entre renders y no dispara la reconciliación cuando cambia.',
        },
        {
          tipo: 'verdadero-falso',
          enunciado: 'Mientras mantienes una tecla pulsada, el navegador repite keydown varias veces.',
          correcta: true,
          explicacion:
            'Es la repetición automática del sistema operativo. Un Set evita que esas repeticiones dupliquen el estado.',
        },
        {
          tipo: 'multiple',
          enunciado: '¿Qué debe hacer la limpieza del efecto del teclado?',
          opciones: [
            'Quitar los listeners de keydown y keyup',
            'Quitar el listener de blur',
            'Vaciar el Set de teclas',
            'Destruir el canvas',
          ],
          correctas: [0, 1, 2],
          explicacion:
            'El canvas lo gestiona R3F. La limpieza es de los listeners y del estado que has creado tú.',
        },
        {
          tipo: 'unica',
          enunciado: '¿Dónde se aplica el movimiento de la nave?',
          opciones: [
            'En el handler de keydown',
            'En un useEffect que observa las teclas',
            'En useFrame, multiplicando por delta',
            'En el render del componente',
          ],
          correcta: 2,
          explicacion:
            'El teclado solo marca intención. La posición se actualiza por frame con delta, que es la unidad de tiempo del bucle.',
        },
      ],
      recursos: [
        {
          titulo: 'MDN — KeyboardEvent',
          url: 'https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent',
          nota: 'La diferencia entre key y code, y el comportamiento de repeat.',
        },
        {
          titulo: 'React — useRef',
          url: 'https://react.dev/reference/react/useRef',
          nota: 'Por qué un ref no provoca renders y cuándo es la herramienta correcta.',
        },
        {
          titulo: 'React Three Fiber — useFrame',
          url: 'https://r3f.docs.pmnd.rs/api/hooks#useframe',
          nota: 'El delta y el orden de ejecución de los callbacks por frame.',
        },
      ],
      ejercicio: {
        reto: 'Mueve el cubo con W, A, S y D usando un Set en un ref y useFrame, sin un render por tecla.',
        inicial: `import { useEffect, useState } from 'react'
import { Canvas } from '@react-three/fiber'

export default function App() {
  const [x, setX] = useState(0)

  useEffect(() => {
    const abajo = (e: KeyboardEvent) => {
      // Esto funciona, pero re-renderiza en cada pulsación.
      if (e.code === 'KeyA') setX((v) => Math.max(-2, v - 0.2))
      if (e.code === 'KeyD') setX((v) => Math.min(2, v + 0.2))
    }
    window.addEventListener('keydown', abajo)
    return () => window.removeEventListener('keydown', abajo)
  }, [])

  return (
    <div style={{ height: 320, background: '#111' }}>
      <Canvas camera={{ position: [0, 2.5, 5] }}>
        <ambientLight intensity={0.7} />
        <directionalLight position={[3, 6, 4]} intensity={2} />
        <mesh position={[x, 0, 0]}>
          <boxGeometry args={[0.8, 0.8, 0.8]} />
          <meshStandardMaterial color="#f5a524" />
        </mesh>
      </Canvas>
    </div>
  )
}`,
        solucion: `import { useEffect, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import type { Group } from 'three'

function Cubo({ teclas }: { teclas: React.RefObject<Set<string>> }) {
  const grupo = useRef<Group>(null)

  useFrame((_, delta) => {
    const dt = Math.min(delta, 0.05)
    let x = 0
    let z = 0
    if (teclas.current.has('KeyA')) x -= 1
    if (teclas.current.has('KeyD')) x += 1
    if (teclas.current.has('KeyW')) z -= 1
    if (teclas.current.has('KeyS')) z += 1

    if ((x !== 0 || z !== 0) && grupo.current) {
      const longitud = Math.hypot(x, z)
      grupo.current.position.x = Math.max(
        -2,
        Math.min(2, grupo.current.position.x + (x / longitud) * 2.5 * dt),
      )
      grupo.current.position.z = Math.max(
        -2,
        Math.min(2, grupo.current.position.z + (z / longitud) * 2.5 * dt),
      )
    }
  })

  return (
    <group ref={grupo}>
      <mesh>
        <boxGeometry args={[0.8, 0.8, 0.8]} />
        <meshStandardMaterial color="#f5a524" />
      </mesh>
    </group>
  )
}

export default function App() {
  const teclas = useRef(new Set<string>())

  useEffect(() => {
    const abajo = (e: KeyboardEvent) => teclas.current.add(e.code)
    const arriba = (e: KeyboardEvent) => teclas.current.delete(e.code)
    const perderFoco = () => teclas.current.clear()

    window.addEventListener('keydown', abajo)
    window.addEventListener('keyup', arriba)
    window.addEventListener('blur', perderFoco)
    return () => {
      window.removeEventListener('keydown', abajo)
      window.removeEventListener('keyup', arriba)
      window.removeEventListener('blur', perderFoco)
      teclas.current.clear()
    }
  }, [])

  return (
    <div style={{ height: 320, background: '#111' }}>
      <Canvas camera={{ position: [0, 2.5, 5] }}>
        <ambientLight intensity={0.7} />
        <directionalLight position={[3, 6, 4]} intensity={2} />
        <Cubo teclas={teclas} />
      </Canvas>
    </div>
  )
}`,
        pistas: [
          'Sustituye el useState por un useRef con un Set: el cubo ya no necesita estado de React.',
          'El listener solo añade y quita códigos; no mueve nada.',
          'La posición se actualiza en useFrame, multiplicando por delta y limitando el resultado.',
        ],
      },
    },
    {
      id: '6.6',
      modulo: 6,
      titulo: 'ScrollControls',
      objetivo:
        'Sincronizar cámara y objetos con el scroll de drei usando ScrollControls y useScroll, sin re-renderizar por cada píxel.',
      nivel: 'medio',
      minutos: 60,
      bloques: [
        {
          tipo: 'parrafo',
          texto:
            'Hasta ahora la interacción venía del puntero o del teclado. El scroll es otra entrada, más lenta y más narrativa: sirve para recorrer una historia, no para controlar un personaje. ScrollControls de drei crea un contenedor desplazable dentro del canvas y te expone un offset normalizado entre 0 y 1. Tú decides qué significa ese offset: mover la cámara, cambiar luces, escalar objetos o todo a la vez.',
        },
        {
          tipo: 'demo',
          id: 'm6-scroll',
          titulo: 'Tres estaciones, una sola página',
          alto: 440,
          nota: 'La demo tiene una altura fija de 430 px a propósito: ScrollControls necesita un contenedor con altura para tener algo que desplazar. La rueda sobre el lienzo mueve la escena; fuera del lienzo, mueve la lección.',
        },
        {
          tipo: 'parrafo',
          texto:
            'Desplaza la rueda sobre el lienzo. La cámara viaja de la primera estación a la segunda y a la tercera, y el objeto más cercano crece y gira. El indicador de sección se actualiza sin que React vuelva a renderizar la escena: useFrame lee scroll.offset, calcula la página y escribe en el span del DOM. Es la misma idea que el contador de la lección anterior: los datos que cambian muchas veces por segundo no pasan por useState.',
        },
        {
          tipo: 'destacado',
          tono: 'porque',
          titulo: 'Por qué pages no es el número de objetos',
          texto:
            'pages define cuántas alturas de viewport mide el recorrido del scroll. Con pages={3} tienes el equivalente a tres pantallas de desplazamiento virtual, pero el offset sigue yendo de 0 a 1: las tres se reparten ese intervalo. Tú decides si cada tercio es una sección, una parada de cámara o simplemente más recorrido para el mismo movimiento.',
        },
        {
          tipo: 'codigo',
          lenguaje: 'tsx',
          titulo: 'La estructura mínima',
          codigo: `<Canvas>
  <ScrollControls pages={3} damping={0.28}>
    <Camara />
  </ScrollControls>
</Canvas>

function Camara() {
  const scroll = useScroll()
  const camara = useThree((estado) => estado.camera)

  useFrame(() => {
    const t = scroll.offset * 2           // de 0..1 a 0..2
    const tramo = Math.min(Math.floor(t), 1)
    const fraccion = t - tramo
    const suave = fraccion * fraccion * (3 - 2 * fraccion)

    camara.position.lerpVectors(
      POSICIONES[tramo],
      POSICIONES[tramo + 1],
      suave,
    )
    camara.lookAt(OBJETIVOS[tramo])
  })

  return null
}`,
        },
        {
          tipo: 'tabla',
          cabecera: ['Prop de ScrollControls', 'Qué hace', 'Valor típico'],
          filas: [
            ['pages', 'Longitud del recorrido en pantallas virtuales', '1–5'],
            ['damping', 'Suavizado del offset; 0 es respuesta inmediata', '0,1–0,4'],
            ['distance', 'Factor de escala de la distancia de scroll', '0,8–1,2'],
            ['enabled', 'Permite desactivar el scroll sin desmontarlo', 'true / false'],
          ],
        },
        {
          tipo: 'lista',
          items: [
            '`useScroll()` solo funciona dentro de `ScrollControls`; fuera lanza un error.',
            '`scroll.offset` es el progreso global de 0 a 1; `scroll.range(0, 1/3)` devuelve un tramo normalizado.',
            '`scroll.curve()` aplica una curva de suavizado al tramo; útil para que las secciones no empiecen de golpe.',
            '`scroll.visible(from, distance)` te dice si un tramo está en pantalla.',
            'Lee el offset en `useFrame`, no en el cuerpo del componente: cambia fuera del ciclo de React.',
          ],
        },
        {
          tipo: 'destacado',
          tono: 'ojo',
          titulo: 'El scroll secuestra la rueda sobre el lienzo',
          texto:
            'Mientras el puntero está sobre el canvas, la rueda mueve ScrollControls y no la página. En una demo es aceptable y se explica; en una página real puede ser frustrante. Decide si el lienzo ocupa toda la pantalla, si el scroll empieza solo al entrar en la sección o si ofreces una alternativa con botones. No es un detalle de implementación: es parte de la experiencia.',
        },
      ],
      errores: [
        {
          sintoma: 'Al hacer scroll no ocurre nada.',
          causa:
            'El canvas o su contenedor no tienen altura, así que ScrollControls no tiene recorrido que medir.',
          arreglo:
            'Dale una altura explícita al contenedor del canvas (por ejemplo, 100vh o 430px) y comprueba que ningún padre la colapsa.',
        },
        {
          sintoma: 'La cámara tiembla o va a saltos mientras se hace scroll.',
          causa:
            'Estás leyendo scroll.offset en el render o lo copias a useState, y el valor cambia muchas veces por segundo.',
          arreglo:
            'Lee el offset dentro de useFrame y aplica el resultado directamente a la cámara o a los objetos.',
        },
        {
          sintoma: 'La página deja de desplazarse cuando el puntero pasa por encima de la escena.',
          causa: 'ScrollControls captura la rueda en su contenedor para poder mover la escena.',
          arreglo:
            'Asume el comportamiento y diseña la sección para que el lienzo sea el protagonista, o desactiva el scroll con enabled cuando no interese.',
        },
      ],
      quiz: [
        {
          tipo: 'unica',
          enunciado: '¿Qué devuelve scroll.offset?',
          opciones: [
            'El número de píxeles desplazados',
            'Un valor normalizado entre 0 y 1 a lo largo de pages',
            'El índice de la página actual',
            'La velocidad del scroll en píxeles por segundo',
          ],
          correcta: 1,
          explicacion:
            'Es un progreso normalizado. Multiplícalo por el número de tramos que quieras definir.',
        },
        {
          tipo: 'verdadero-falso',
          enunciado: 'pages={3} crea tres copias de la escena.',
          correcta: false,
          explicacion:
            'No duplica nada: define la longitud del recorrido. La escena es una y tú decides cómo reacciona al offset.',
        },
        {
          tipo: 'multiple',
          enunciado: '¿Qué ofrece el estado que devuelve useScroll?',
          opciones: ['offset', 'range()', 'curve()', 'un renderer propio'],
          correctas: [0, 1, 2],
          explicacion:
            'El renderer sigue siendo el del Canvas. useScroll te da medidas y utilidades para interpretar el recorrido.',
        },
        {
          tipo: 'unica',
          enunciado: '¿Dónde conviene leer scroll.offset para mover la cámara?',
          opciones: [
            'En el cuerpo del componente',
            'En un useState con un useEffect',
            'Dentro de useFrame',
            'En el handler de onPointerMove',
          ],
          correcta: 2,
          explicacion:
            'El offset cambia en el bucle de scroll, no en el de React. useFrame te da el momento y evita renders.',
        },
      ],
      recursos: [
        {
          titulo: 'drei — ScrollControls',
          url: 'https://drei.docs.pmnd.rs/controls/scroll-controls',
          nota: 'pages, damping, distance y el componente Scroll para HTML.',
        },
        {
          titulo: 'React Three Fiber — useFrame',
          url: 'https://r3f.docs.pmnd.rs/api/hooks#useframe',
          nota: 'El lugar donde leer el offset y aplicar la transformación.',
        },
        {
          titulo: 'MDN — Scroll-driven animations',
          url: 'https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_scroll-driven_animations',
          nota: 'La versión CSS de la misma idea, útil para comparar enfoques.',
        },
      ],
      ejercicio: {
        reto: 'Sincroniza la cámara con el scroll: en la primera página debe mirar al cubo y en la tercera, al cono. Usa el offset y una interpolación suave.',
        inicial: `import { Canvas, useThree } from '@react-three/fiber'
import { ScrollControls } from '@react-three/drei'
import * as THREE from 'three'

const POSICIONES = [
  new THREE.Vector3(0, 1.6, 4.5),
  new THREE.Vector3(2.6, 2.2, 2.2),
  new THREE.Vector3(0, 1.6, 4.5),
]
const OBJETIVOS = [
  new THREE.Vector3(-1.4, 0.6, 0),
  new THREE.Vector3(0, 0.6, 0),
  new THREE.Vector3(1.4, 0.6, 0),
]

function Camara() {
  const camara = useThree((estado) => estado.camera)

  // TODO: usa useScroll y useFrame para interpolar entre las tres posiciones.

  return null
}

export default function App() {
  return (
    <div style={{ height: 400, background: '#111' }}>
      <Canvas camera={{ position: [0, 1.6, 4.5] }}>
        <ScrollControls pages={3} damping={0.25}>
          <ambientLight intensity={0.7} />
          <directionalLight position={[4, 6, 4]} intensity={2} />
          <mesh position={[-1.4, 0.6, 0]}>
            <boxGeometry args={[0.8, 0.8, 0.8]} />
            <meshStandardMaterial color="#f5a524" />
          </mesh>
          <mesh position={[0, 0.6, 0]}>
            <torusGeometry args={[0.4, 0.15, 16, 32]} />
            <meshStandardMaterial color="#4d8df6" />
          </mesh>
          <mesh position={[1.4, 0.6, 0]}>
            <coneGeometry args={[0.45, 0.9, 16]} />
            <meshStandardMaterial color="#3fbf87" />
          </mesh>
          <Camara />
        </ScrollControls>
      </Canvas>
    </div>
  )
}`,
        solucion: `import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { ScrollControls, useScroll } from '@react-three/drei'
import * as THREE from 'three'

const POSICIONES = [
  new THREE.Vector3(0, 1.6, 4.5),
  new THREE.Vector3(2.6, 2.2, 2.2),
  new THREE.Vector3(0, 1.6, 4.5),
]
const OBJETIVOS = [
  new THREE.Vector3(-1.4, 0.6, 0),
  new THREE.Vector3(0, 0.6, 0),
  new THREE.Vector3(1.4, 0.6, 0),
]

function Camara() {
  const camara = useThree((estado) => estado.camera)
  const scroll = useScroll()
  const objetivo = new THREE.Vector3()

  useFrame(() => {
    const t = scroll.offset * 2
    const tramo = Math.min(Math.floor(t), 1)
    const fraccion = t - tramo
    const suave = fraccion * fraccion * (3 - 2 * fraccion)

    camara.position.lerpVectors(POSICIONES[tramo], POSICIONES[tramo + 1], suave)
    objetivo.lerpVectors(OBJETIVOS[tramo], OBJETIVOS[tramo + 1], suave)
    camara.lookAt(objetivo)
  })

  return null
}

export default function App() {
  return (
    <div style={{ height: 400, background: '#111' }}>
      <Canvas camera={{ position: [0, 1.6, 4.5] }}>
        <ScrollControls pages={3} damping={0.25}>
          <ambientLight intensity={0.7} />
          <directionalLight position={[4, 6, 4]} intensity={2} />
          <mesh position={[-1.4, 0.6, 0]}>
            <boxGeometry args={[0.8, 0.8, 0.8]} />
            <meshStandardMaterial color="#f5a524" />
          </mesh>
          <mesh position={[0, 0.6, 0]}>
            <torusGeometry args={[0.4, 0.15, 16, 32]} />
            <meshStandardMaterial color="#4d8df6" />
          </mesh>
          <mesh position={[1.4, 0.6, 0]}>
            <coneGeometry args={[0.45, 0.9, 16]} />
            <meshStandardMaterial color="#3fbf87" />
          </mesh>
          <Camara />
        </ScrollControls>
      </Canvas>
    </div>
  )
}`,
        pistas: [
          'Camara debe llamar a useScroll; por eso va dentro de ScrollControls.',
          'Multiplica offset por 2 para obtener un valor de 0 a 2 entre las tres paradas.',
          'En useFrame, interpola posición y objetivo con el mismo factor suave.',
        ],
      },
    },
    {
      id: '6.7',
      modulo: 6,
      titulo: 'Arrastrar objetos en el plano',
      objetivo:
        'Arrastrar una pieza sobre una mesa convirtiendo el puntero en una posición 3D, con captura de puntero y límites.',
      nivel: 'alto',
      minutos: 60,
      bloques: [
        {
          tipo: 'parrafo',
          texto:
            'Arrastrar en 3D no es arrastrar en 2D. En una página normal mueves un div con clientX y clientY; en una escena, el puntero es una dirección desde la cámara y necesitas decidir sobre qué superficie del mundo cae. La receta tiene tres piezas: capturar el puntero al agarrar, proyectar cada movimiento sobre el plano de la mesa y limitar el resultado a los bordes. Si falta una, la pieza salta, se escapa o se queda pegada al soltar.',
        },
        {
          tipo: 'demo',
          id: 'm6-arrastrar',
          titulo: 'Cuatro piezas sobre una mesa con límites',
          alto: 440,
          nota: 'Agarra una pieza y llévala hasta el borde: se detiene en el rectángulo ámbar. Suéltala fuera del lienzo y comprobarás que la captura de puntero sigue funcionando.',
        },
        {
          tipo: 'parrafo',
          texto:
            'La mesa es la superficie de referencia. Su handler onPointerMove recibe un event.point que se recalcula en cada movimiento; ese punto está en coordenadas de mundo y cae sobre la cara superior de la mesa. Con él, la pieza sigue al puntero. Para que no salte al centro, al agarrar se guarda la diferencia entre el centro de la pieza y el punto de la mesa bajo el cursor. Y para que el gesto no se pierda cuando el puntero sale del canvas, se llama a setPointerCapture en el pointerdown y a releasePointerCapture al soltar.',
        },
        {
          tipo: 'destacado',
          tono: 'porque',
          titulo: 'El event.point de la pieza capturada está congelado',
          texto:
            'Cuando R3F captura un puntero, sigue enviando eventos a la pieza, pero la intersección que adjunta es la del pointerdown, no una nueva. Si mueves la pieza usando el event.point de la pieza capturada, se queda clavada en el punto donde la agarraste. Usa el event.point de la mesa (que no está capturada) o calcula tú la intersección con event.ray.intersectPlane.',
        },
        {
          tipo: 'codigo',
          lenguaje: 'tsx',
          titulo: 'Agarre, movimiento y suelta',
          codigo: `const plano = new THREE.Plane(new THREE.Vector3(0, 1, 0), -ALTURA)

const bajar = (e) => {
  e.stopPropagation()
  arrastrando.current = id
  if (e.ray.intersectPlane(plano, punto)) {
    // compensa el punto de agarre para que no salte al centro
    desplazamiento.current.set(pieza.position.x - punto.x, 0, pieza.position.z - punto.z)
  }
  e.target.setPointerCapture(e.pointerId)
}

const moverSobreMesa = (e) => {
  if (!arrastrando.current) return
  pieza.position.x = MathUtils.clamp(
    e.point.x + desplazamiento.current.x,
    -LIMITE_X,
    LIMITE_X,
  )
  pieza.position.z = MathUtils.clamp(
    e.point.z + desplazamiento.current.z,
    -LIMITE_Z,
    LIMITE_Z,
  )
}

const soltar = (e) => {
  arrastrando.current = null
  e.target.releasePointerCapture(e.pointerId)
}`,
        },
        {
          tipo: 'lista',
          items: [
            'Captura en `onPointerDown` y libera en `onPointerUp` y en `onPointerCancel`.',
            'El plano de la mesa se define una vez: normal (0, 1, 0) y constante -altura.',
            '`event.ray.intersectPlane(plano, salida)` devuelve null si el rayo es paralelo al plano.',
            'Limita siempre la posición final: sin clamp, la pieza puede acabar debajo del suelo.',
            'Muta la posición del mesh en el handler; no uses setState por cada pointermove.',
            'Si el objeto está rotado o escalado, la posición que lees es la del padre, no la del punto de impacto.',
          ],
        },
        {
          tipo: 'destacado',
          tono: 'truco',
          titulo: 'Arrastrar fuera de la mesa',
          texto:
            'Si quieres que el gesto siga funcionando cuando el puntero sale de la superficie, no dependas del event.point de la mesa: usa event.ray.intersectPlane contra un plano matemático grande. El rayo siempre existe, aunque el puntero esté fuera de cualquier malla. La mesa solo aporta la referencia visual; el plano es lo que hace el cálculo.',
        },
      ],
      errores: [
        {
          sintoma: 'Al agarrar una pieza, salta para quedar centrada bajo el puntero.',
          causa: 'Colocas la pieza en el punto de impacto sin compensar el desfase del agarre.',
          arreglo:
            'Al empezar, guarda pieza.position menos el punto del plano y suma ese desplazamiento en cada movimiento.',
        },
        {
          sintoma: 'Si sueltas el botón fuera del lienzo, la pieza se queda pegada al puntero.',
          causa: 'No hay captura de puntero o no se libera el estado de arrastre al salir.',
          arreglo:
            'Llama a setPointerCapture en pointerdown, libera en pointerup y pointercancel, y escucha onLostPointerCapture para limpiar el estado.',
        },
        {
          sintoma: 'La pieza se sale de la mesa y ya no hay forma de recuperarla.',
          causa: 'No limitas la posición a los bordes de la superficie.',
          arreglo:
            'Aplica MathUtils.clamp a x y z con los límites de la mesa, dejando un margen para el tamaño de la pieza.',
        },
      ],
      quiz: [
        {
          tipo: 'unica',
          enunciado: '¿Qué devuelve ray.intersectPlane(plano, salida) si el rayo es paralelo al plano?',
          opciones: ['Un vector en el infinito', 'null', 'El origen del rayo', 'Lanza un error'],
          correcta: 1,
          explicacion:
            'Sin intersección devuelve null. Comprueba el resultado antes de usar el vector de salida.',
        },
        {
          tipo: 'verdadero-falso',
          enunciado: 'Con setPointerCapture, el canvas sigue recibiendo pointerup aunque el puntero salga del lienzo.',
          correcta: true,
          explicacion:
            'Esa es precisamente su función. Sin captura, el pointerup puede ocurrir fuera y el estado de arrastre se queda abierto.',
        },
        {
          tipo: 'multiple',
          enunciado: '¿Qué formas válidas hay de obtener la posición del puntero sobre la mesa?',
          opciones: [
            'El event.point del onPointerMove de la mesa',
            'La posición de la cámara',
            'event.ray.intersectPlane contra el plano de la mesa',
            'El event.point de la malla capturada, sin más',
          ],
          correctas: [0, 2],
          explicacion:
            'La mesa no está capturada, así que su point es fresco. El rayo y un plano matemático también sirven. La cámara no es el puntero, y el point de la malla capturada es el del agarre.',
        },
        {
          tipo: 'unica',
          enunciado: '¿Por qué no conviene guardar la posición de la pieza en useState durante el arrastre?',
          opciones: [
            'Porque useState no acepta números negativos',
            'Porque cada pointermove provoca un render y la escena se resiente',
            'Porque la posición se pierde al soltar',
            'Porque three.js no lee el estado de React',
          ],
          correcta: 1,
          explicacion:
            'Un arrastre puede generar decenas de eventos por segundo. La posición es estado de animación: vive en el mesh y se actualiza en el handler o en useFrame.',
        },
      ],
      recursos: [
        {
          titulo: 'React Three Fiber — Events',
          url: 'https://r3f.docs.pmnd.rs/api/events',
          nota: 'La captura de puntero y el orden de propagación en los eventos de R3F.',
        },
        {
          titulo: 'MDN — Element.setPointerCapture',
          url: 'https://developer.mozilla.org/en-US/docs/Web/API/Element/setPointerCapture',
          nota: 'Cómo funciona la captura a nivel del navegador y cuándo se libera.',
        },
        {
          titulo: 'three.js — Plane',
          url: 'https://threejs.org/docs/#api/en/math/Plane',
          nota: 'La ecuación del plano y la intersección con un rayo.',
        },
      ],
      ejercicio: {
        reto: 'Arrastra la caja sobre la mesa con captura de puntero y límites, sin actualizar el estado en cada movimiento.',
        inicial: `import { useState } from 'react'
import { Canvas } from '@react-three/fiber'

export default function App() {
  const [posicion, setPosicion] = useState<[number, number]>([0, 0])
  const [arrastrando, setArrastrando] = useState(false)

  return (
    <div style={{ height: 340, background: '#111' }}>
      <Canvas camera={{ position: [0, 4, 5] }}>
        <ambientLight intensity={0.7} />
        <directionalLight position={[3, 6, 4]} intensity={2} />

        <mesh
          position={[0, 0.25, 0]}
          onPointerMove={(e) => {
            if (!arrastrando) return
            setPosicion([e.point.x, e.point.z])
          }}
        >
          <boxGeometry args={[6, 0.5, 4]} />
          <meshStandardMaterial color="#333" />
        </mesh>

        <mesh
          position={[posicion[0], 0.75, posicion[1]]}
          onPointerDown={(e) => {
            e.stopPropagation()
            setArrastrando(true)
          }}
          onPointerUp={() => setArrastrando(false)}
        >
          <boxGeometry args={[0.6, 0.6, 0.6]} />
          <meshStandardMaterial color="#f5a524" />
        </mesh>
      </Canvas>
    </div>
  )
}`,
        solucion: `import { useRef } from 'react'
import { Canvas } from '@react-three/fiber'
import type { Mesh } from 'three'

export default function App() {
  const caja = useRef<Mesh>(null)
  const arrastrando = useRef(false)

  return (
    <div style={{ height: 340, background: '#111' }}>
      <Canvas camera={{ position: [0, 4, 5] }}>
        <ambientLight intensity={0.7} />
        <directionalLight position={[3, 6, 4]} intensity={2} />

        <mesh
          position={[0, 0.25, 0]}
          onPointerMove={(e) => {
            if (!arrastrando.current || !caja.current) return
            caja.current.position.x = Math.max(-2.7, Math.min(2.7, e.point.x))
            caja.current.position.z = Math.max(-1.7, Math.min(1.7, e.point.z))
          }}
        >
          <boxGeometry args={[6, 0.5, 4]} />
          <meshStandardMaterial color="#333" />
        </mesh>

        <mesh
          ref={caja}
          position={[0, 0.75, 0]}
          onPointerDown={(e) => {
            e.stopPropagation()
            arrastrando.current = true
            e.target.setPointerCapture(e.pointerId)
          }}
          onPointerUp={(e) => {
            arrastrando.current = false
            e.target.releasePointerCapture(e.pointerId)
          }}
          onPointerCancel={() => {
            arrastrando.current = false
          }}
        >
          <boxGeometry args={[0.6, 0.6, 0.6]} />
          <meshStandardMaterial color="#f5a524" />
        </mesh>
      </Canvas>
    </div>
  )
}`,
        pistas: [
          'La mesa ya te da event.point en coordenadas de mundo; no necesitas raycast manual.',
          'Cambia el estado de arrastre por un ref y actualiza la posición del mesh directamente.',
          'Limita x y z con Math.max/Math.min para que la caja no salga de la mesa.',
        ],
      },
    },
  ],
}

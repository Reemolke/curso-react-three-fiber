import type { Modulo } from './tipos'

export const modulo2: Modulo = {
  numero: 2,
  titulo: 'Qué hace React Three Fiber (y qué no)',
  descripcion:
    'R3F no es three.js con otro nombre: es un reconciliador que traduce JSX a objetos three.js. Entender esa traducción es lo que separa «copiar ejemplos» de saber qué está pasando cuando algo no aparece.',
  lecciones: [
    {
      id: '2.1',
      modulo: 2,
      titulo: 'El mismo cubo, dos veces',
      objetivo:
        'Escribir la misma escena en three.js puro y en R3F, y señalar exactamente qué líneas desaparecen al usar React.',
      nivel: 'intro',
      minutos: 45,
      bloques: [
        {
          tipo: 'parrafo',
          texto:
            'Antes de aprender la API de React Three Fiber conviene ver el problema que resuelve. La demo de abajo dibuja el mismo cubo ámbar girando dos veces: a la izquierda con three.js a pelo, a la derecha con JSX. Mismo resultado en pantalla, dos formas de pensar distintas. Lee los dos bloques de código antes de tocar nada.',
        },
        { tipo: 'demo', id: 'm2-mismo-cubo', titulo: 'Izquierda: pasos. Derecha: resultado' },
        {
          tipo: 'parrafo',
          texto:
            'En la versión de three.js tú escribes los pasos: creas el renderer, creas la cámara, añades el cubo a la escena, pides un frame, cambias la rotación, vuelves a dibujar. En la versión de R3F declaras el resultado: «quiero un cubo con esta rotación». R3F se encarga de que la escena de three.js coincida con lo que has declarado, frame a frame, sin que tú escribas el bucle.',
        },
        {
          tipo: 'destacado',
          tono: 'porque',
          titulo: 'Por qué esto no es azúcar sintáctico',
          texto:
            'Porque no hay una traducción de una vez: cada render de React se compara con el anterior y solo se aplican las diferencias. Si la rotación no cambia, el objeto three.js no se toca. Si añades un cubo, se crea; si lo quitas, se destruye. Eso es un reconciliador, no una plantilla de código.',
        },
        {
          tipo: 'codigo',
          lenguaje: 'tsx',
          titulo: 'La escena mínima en R3F',
          codigo: `import { Canvas } from '@react-three/fiber'

function Cubo() {
  return (
    <mesh rotation={[0.4, 0.9, 0]}>
      <boxGeometry args={[1.3, 1.3, 1.3]} />
      <meshBasicMaterial color="#f5a524" />
    </mesh>
  )
}

export default function App() {
  return (
    <Canvas camera={{ position: [2.6, 2, 3.4], fov: 45 }}>
      <Cubo />
    </Canvas>
  )
}`,
        },
        {
          tipo: 'lista',
          items: [
            'No hay `new THREE.Scene()`, ni `new THREE.WebGLRenderer()`, ni `requestAnimationFrame`.',
            'Cada etiqueta (`mesh`, `boxGeometry`, `meshBasicMaterial`) corresponde a una clase de three.js.',
            'Los argumentos del constructor van en `args`; el resto son propiedades del objeto.',
            'El `<Canvas>` crea el renderer, la cámara por defecto y el bucle de render.',
            'Al desmontar el componente, R3F destruye los objetos y libera la geometría y los materiales que creó.',
          ],
        },
        {
          tipo: 'parrafo',
          texto:
            'Esa última línea es la que más se agradece con el tiempo. En three.js puro, olvidar `renderer.dispose()` o `geometry.dispose()` deja memoria retenida en la GPU. En R3F ocurre solo mientras no salgas del sistema: si creas objetos a mano y los inyectas, la limpieza vuelve a ser tuya. Lo verás en la lección 2.3.',
        },
        {
          tipo: 'destacado',
          tono: 'ojo',
          titulo: 'Lo que R3F no hace',
          texto:
            'No sabe de física, ni de cargar modelos, ni de controles de cámara, ni de animaciones complejas. No adivina tu intención: si escribes un material imposible, te dejará con la pantalla en negro. Y no sustituye a three.js; lo manipula. Cuando algo se rompe, la respuesta casi siempre está en la API de three.js, no en la de React.',
        },
      ],
      errores: [
        {
          sintoma: 'La pantalla se queda negra y no hay ningún error en consola.',
          causa: 'Hay un `<Canvas>` pero dentro no hay cámara válida o la escena está vacía.',
          arreglo:
            'Empieza con un `<mesh>` y un `meshBasicMaterial` de color vivo. El material básico no necesita luces: descarta dos causas de golpe.',
        },
        {
          sintoma: '`Cannot read properties of undefined (reading "position")`.',
          causa: 'Un componente devuelve `undefined` porque el `return` está dentro de un `if` sin `else`.',
          arreglo: 'Devuelve siempre algo, aunque sea `null`. R3F acepta `null` como «nada»; `undefined` no.',
        },
        {
          sintoma: 'El cubo se ve, pero no gira aunque cambies el estado.',
          causa: 'Se está mutando un `ref` o una variable en vez de pasar la rotación como prop.',
          arreglo:
            'Si el valor cambia al pulsar, pásalo como prop (`rotation={[0, giro, 0]}`). Si cambia 60 veces por segundo, eso es el módulo 5.',
        },
      ],
      quiz: [
        {
          tipo: 'unica',
          enunciado: '¿Qué pieza crea R3F por ti y en three.js puro tendrías que crear a mano?',
          opciones: [
            'La cámara, el renderer y el bucle de render',
            'El DOM de la página',
            'El sistema de módulos de JavaScript',
            'El canvas HTML',
          ],
          correcta: 0,
          explicacion:
            'El `<Canvas>` monta el renderer, crea una cámara por defecto y arranca el bucle. El canvas HTML existe, pero lo crea el componente, no tú.',
        },
        {
          tipo: 'verdadero-falso',
          enunciado: 'En R3F cada render de React vuelve a crear todos los objetos de la escena.',
          correcta: false,
          explicacion:
            'Al contrario: el reconciliador compara con el render anterior y solo aplica diferencias. Por eso es viable tener cientos de objetos.',
        },
        {
          tipo: 'multiple',
          enunciado: '¿Qué desaparece de tu código al pasar de three.js puro a R3F?',
          opciones: [
            'La llamada a `renderer.render` en un bucle',
            'La creación del `WebGLRenderer`',
            'La necesidad de pensar en coordenadas 3D',
            'El `new THREE.Scene()`',
          ],
          correctas: [0, 1, 3],
          explicacion:
            'Las coordenadas siguen siendo tuyas: R3F no adivina dónde va nada. Lo que se va es la fontanería: escena, renderer y bucle.',
        },
        {
          tipo: 'unica',
          enunciado: '¿Dónde se escribe `boxGeometry(1, 1, 1)` en JSX?',
          opciones: ['<boxGeometry args={[1, 1, 1]} />', '<boxGeometry width={1} height={1} depth={1} />', '<boxGeometry size={1} />', '<boxGeometry geometry={[1,1,1]} />'],
          correcta: 0,
          explicacion:
            'Los argumentos posicionales del constructor van en `args`. Las propiedades con nombre (`width`, `height`…) también existen, pero `args` es la forma general.',
        },
      ],
      recursos: [
        {
          titulo: 'React Three Fiber: introducción',
          url: 'https://r3f.docs.pmnd.rs/getting-started/introduction',
          nota: 'La primera página que hay que leer, y la que explica el modelo mental en dos minutos.',
        },
        {
          titulo: 'three.js: Creating a scene',
          url: 'https://threejs.org/docs/#manual/en/introduction/Creating-a-scene',
          nota: 'La versión imperativa de lo mismo. Comparar ambas es el objetivo de esta lección.',
        },
        {
          titulo: 'React: render and commit',
          url: 'https://react.dev/learn/render-and-commit',
          nota: 'Qué significa «renderizar» en React, que es distinto de «dibujar» en WebGL.',
        },
      ],
      ejercicio: {
        reto: 'Haz que el cubo cambie de color entre dos tonos cada vez que pulses un botón, sin tocar su rotación.',
        inicial: `import { useState } from 'react'
import { Canvas } from '@react-three/fiber'

export default function App() {
  const [n, setN] = useState(0)

  // TODO: elige el color a partir de \`n\` (par → ámbar, impar → azul)
  const color = '#f5a524'

  return (
    <div style={{ height: 320 }}>
      <button onClick={() => setN(n + 1)}>Cambiar color</button>
      <Canvas camera={{ position: [2.5, 2, 3.2] }}>
        <mesh rotation={[0.4, 0.6, 0]}>
          <boxGeometry args={[1.2, 1.2, 1.2]} />
          <meshBasicMaterial color={color} />
        </mesh>
      </Canvas>
    </div>
  )
}`,
        solucion: `import { useState } from 'react'
import { Canvas } from '@react-three/fiber'

export default function App() {
  const [n, setN] = useState(0)

  // El estado de React decide el color. La escena solo lo refleja.
  const color = n % 2 === 0 ? '#f5a524' : '#4d8df6'

  return (
    <div style={{ height: 320 }}>
      <button onClick={() => setN(n + 1)}>Cambiar color</button>
      <Canvas camera={{ position: [2.5, 2, 3.2] }}>
        <mesh rotation={[0.4, 0.6, 0]}>
          <boxGeometry args={[1.2, 1.2, 1.2]} />
          <meshBasicMaterial color={color} />
        </mesh>
      </Canvas>
    </div>
  )
}`,
        pistas: [
          'El color ya está en una variable: solo hay que calcularla a partir de `n`.',
          '`n % 2 === 0` distingue pares de impares.',
          'No toques la rotación: si no la cambias, R3F no la reaplica y eso es exactamente lo que quieres.',
        ],
      },
    },
    {
      id: '2.2',
      modulo: 2,
      titulo: 'Qué hace R3F por ti',
      objetivo:
        'Leer un árbol de JSX y predecir el grafo de objetos three.js que va a generar, incluyendo qué se convierte en hijo y qué se «attacha».',
      nivel: 'medio',
      minutos: 45,
      bloques: [
        {
          tipo: 'parrafo',
          texto:
            'Aquí está el detalle que más confunde al principio: en JSX, `<boxGeometry>` y `<meshBasicMaterial>` parecen hijos del `<mesh>`, pero no lo son. R3F los detecta, los crea y los «attacha» como propiedades del objeto padre. La demo escribe JSX de verdad y lee la escena resultante con `useThree`, así que lo que ves abajo es el árbol real, no una ilustración.',
        },
        { tipo: 'demo', id: 'm2-inspector', titulo: 'Del JSX al árbol de three.js' },
        {
          tipo: 'parrafo',
          texto:
            'Prueba las tres opciones del selector. Con un solo cubo el árbol es mínimo. Con un grupo aparece la jerarquía real: un `Group` con dos `Mesh` dentro. Con nombres verás que `name` pasa tal cual al objeto, que es lo que después te permite buscar una pieza con `getObjectByName`.',
        },
        {
          tipo: 'tabla',
          cabecera: ['En JSX', 'Se convierte en', 'Relación con el padre'],
          filas: [
            ['<mesh>', 'THREE.Mesh', 'Hijo verdadero (va a `children`)'],
            ['<boxGeometry>', 'THREE.BoxGeometry', 'Attach: se asigna a `mesh.geometry`'],
            ['<meshBasicMaterial>', 'THREE.MeshBasicMaterial', 'Attach: se asigna a `mesh.material`'],
            ['<group>', 'THREE.Group', 'Hijo verdadero'],
            ['<primitive object={x}>', 'El objeto `x` tal cual', 'Hijo verdadero, sin crearse'],
          ],
        },
        {
          tipo: 'destacado',
          tono: 'porque',
          titulo: 'Por qué `attach` y no `children`',
          texto:
            'Porque en three.js la geometría y el material no son parte del grafo de escena: son propiedades de la malla. Si fueran hijos, el renderer intentaría dibujarlas y habría que recorrer el árbol para encontrar la geometría de cada objeto. R3F respeta esa estructura en lugar de inventarse otra.',
        },
        {
          tipo: 'codigo',
          lenguaje: 'tsx',
          titulo: 'Un grupo con dos mallas y nombres',
          codigo: `<group name="constelacion" rotation={[0, 0.6, 0]}>
  <mesh name="nucleo">
    <icosahedronGeometry args={[0.5, 0]} />
    <meshNormalMaterial />
  </mesh>

  <group name="satelites" position={[0.9, 0, 0]}>
    <mesh name="satelite">
      <boxGeometry args={[0.3, 0.3, 0.3]} />
      <meshBasicMaterial color="#3fbf87" />
    </mesh>
  </group>
</group>

// El árbol resultante:
// Group «constelacion»
//   Mesh «nucleo»
//   Group «satelites»
//     Mesh «satelite»`,
        },
        {
          tipo: 'destacado',
          tono: 'truco',
          titulo: '`args` frente a propiedades',
          texto:
            '`args` es la lista de argumentos del constructor y solo se aplica al crear el objeto. Cambiar `args` reconstruye la geometría entera. Cualquier otra prop (`position`, `color`, `intensity`) se asigna a la propiedad. Por eso `args={[1, 1, 1]}` se escribe con corchetes: es un array, no tres props.',
        },
        {
          tipo: 'lista',
          items: [
            '`className` y `style` no existen dentro del `<Canvas>`: no hay DOM que estilizar.',
            'Las props con guion (`rotation-y={0.4}`) son atajo de una componente del array (`rotation={[0, 0.4, 0]}`).',
            'Una prop que no existe en la clase se asigna igual: three.js no valida. Si escribes `colour`, no pasa nada y no se ve nada.',
            'Puedes usar cualquier objeto de three.js, incluidos los de `three/examples/jsm`, con `<primitive>`.',
            'Los objetos con `dispose()` reciben una limpieza automática solo si los creó R3F.',
          ],
        },
      ],
      errores: [
        {
          sintoma: '`<mesh color="red">` no colorea nada.',
          causa: '`color` no es una propiedad de `Mesh`: pertenece al material.',
          arreglo: 'Ponlo en el material: `<meshBasicMaterial color="red" />`.',
        },
        {
          sintoma: '`rotation={90}` deja el objeto en una orientación rara.',
          causa: 'En R3F una rotación es un array de radianes, no un número de grados.',
          arreglo: '`rotation={[0, Math.PI / 2, 0]}`. Si trabajas en grados, `THREE.MathUtils.degToRad(90)`.',
        },
        {
          sintoma: 'La geometría se reconstruye en cada render y bajan los FPS.',
          causa: 'Estás pasando un array nuevo a `args` en cada render, o creando geometría en el cuerpo del componente.',
          arreglo:
            '`args` con valores literales es estable. Si el array viene de estado, memorízalo con `useMemo`.',
        },
      ],
      quiz: [
        {
          tipo: 'unica',
          enunciado: '¿Qué hace R3F con `<boxGeometry args={[1, 2, 3]} />` dentro de un `<mesh>`?',
          opciones: [
            'Crea la geometría y la asigna a `mesh.geometry`',
            'La añade como hija del mesh en `children`',
            'La guarda en un array global de geometrías',
            'La dibuja aparte, como una segunda malla',
          ],
          correcta: 0,
          explicacion:
            'Es un attach: la geometría es una propiedad de la malla, no un nodo del grafo de escena.',
        },
        {
          tipo: 'verdadero-falso',
          enunciado: 'Se puede usar `className` en un `<mesh>` para darle estilos.',
          correcta: false,
          explicacion:
            'Dentro del canvas no hay DOM. El aspecto se controla con materiales y propiedades de three.js.',
        },
        {
          tipo: 'multiple',
          enunciado: '¿Qué props de estas son equivalentes a `rotation={[0, 0.5, 0]}`?',
          opciones: ['rotation-y={0.5}', 'rotateY={0.5}', 'rotation={[0, 0.5]}', 'rotationY={0.5}'],
          correctas: [0],
          explicacion:
            'Solo la forma con guion (`rotation-y`) es un atajo válido de R3F. Las demás son props inventadas que three.js aceptará en silencio sin hacer nada.',
        },
        {
          tipo: 'unica',
          enunciado: '¿Cuándo se aplica `args`?',
          opciones: [
            'Al crear el objeto; cambiarlo lo reconstruye',
            'En cada frame',
            'Solo al desmontar',
            'Solo la primera vez, nunca más',
          ],
          correcta: 0,
          explicacion:
            '`args` alimenta el constructor. Si cambia, R3F crea un objeto nuevo y destruye el anterior.',
        },
      ],
      recursos: [
        {
          titulo: 'R3F: objects, properties and args',
          url: 'https://r3f.docs.pmnd.rs/api/objects',
          nota: 'La referencia de `args`, `attach` y las props con guion.',
        },
        {
          titulo: 'three.js: Object3D',
          url: 'https://threejs.org/docs/#api/en/core/Object3D',
          nota: '`children`, `name`, `position`: lo que R3F está rellenando por ti.',
        },
        {
          titulo: 'three.js: Mesh',
          url: 'https://threejs.org/docs/#api/en/objects/Mesh',
          nota: 'Comprueba que `geometry` y `material` son propiedades, no hijos.',
        },
      ],
      ejercicio: {
        reto: 'Construye un grupo llamado «estacion» con un núcleo y tres satélites, y comprueba con `getObjectByName` que los nombres existen.',
        inicial: `import { Canvas } from '@react-three/fiber'

function Estacion() {
  return (
    <group name="estacion">
      <mesh name="nucleo">
        <icosahedronGeometry args={[0.5, 0]} />
        <meshNormalMaterial />
      </mesh>
      {/* TODO: añade tres satélites llamados satelite-1, satelite-2 y satelite-3 */}
    </group>
  )
}

export default function App() {
  return (
    <div style={{ height: 320 }}>
      <Canvas camera={{ position: [3, 2.4, 4] }}>
        <Estacion />
      </Canvas>
    </div>
  )
}`,
        solucion: `import { Canvas, useThree } from '@react-three/fiber'
import { useEffect } from 'react'

function Estacion() {
  return (
    <group name="estacion">
      <mesh name="nucleo">
        <icosahedronGeometry args={[0.5, 0]} />
        <meshNormalMaterial />
      </mesh>

      {[0, 1, 2].map((i) => {
        const angulo = (i / 3) * Math.PI * 2
        return (
          <mesh
            key={i}
            name={\`satelite-\${i + 1}\`}
            position={[Math.cos(angulo) * 1.1, (i - 1) * 0.3, Math.sin(angulo) * 1.1]}
          >
            <boxGeometry args={[0.28, 0.28, 0.28]} />
            <meshBasicMaterial color="#3fbf87" />
          </mesh>
        )
      })}
    </group>
  )
}

function Comprobacion() {
  const escena = useThree((estado) => estado.scene)
  useEffect(() => {
    const estacion = escena.getObjectByName('estacion')
    console.log('nodos encontrados:', estacion?.children.length)
  }, [escena])
  return null
}

export default function App() {
  return (
    <div style={{ height: 320 }}>
      <Canvas camera={{ position: [3, 2.4, 4] }}>
        <Estacion />
        <Comprobacion />
      </Canvas>
    </div>
  )
}`,
        pistas: [
          'Dentro de JSX puedes usar `map` como en cualquier lista de React; la `key` es obligatoria.',
          'Los nombres se construyen con plantilla: `satelite-${i + 1}`.',
          'Para comprobar el árbol, `useThree((estado) => estado.scene)` y `getObjectByName`.',
        ],
      },
    },
    {
      id: '2.3',
      modulo: 2,
      titulo: 'Cuándo bajar a three.js puro',
      objetivo:
        'Inyectar objetos three.js creados a mano con `<primitive>` y asumir su ciclo de vida, incluida la liberación de memoria.',
      nivel: 'medio',
      minutos: 30,
      bloques: [
        {
          tipo: 'parrafo',
          texto:
            'R3F cubre el 95 % de los casos. El 5 % restante es real: una librería que solo devuelve objetos three.js, un algoritmo que crea miles de vértices, un objeto compuesto que ya existe y no quieres reescribir. Para eso está `<primitive>`.',
        },
        { tipo: 'demo', id: 'm2-primitive', titulo: 'Un grupo creado a mano, inyectado en la escena' },
        {
          tipo: 'parrafo',
          texto:
            'La demo construye una hélice de 36 esferas y una línea con `new THREE.Mesh(...)`, `new THREE.SphereGeometry(...)` y `new THREE.Line(...)`. Nada de JSX en esa función: es three.js puro, como el que encontrarías en un ejemplo de 2017. Después la inyecta con `<primitive object={grupo} />` y R3F la coloca en el grafo sin recrearla.',
        },
        {
          tipo: 'codigo',
          lenguaje: 'tsx',
          titulo: 'El patrón completo, con su limpieza',
          codigo: `function crearHelice() {
  const grupo = new THREE.Group()
  const geometria = new THREE.SphereGeometry(0.09, 8, 8)
  const material = new THREE.MeshBasicMaterial({ color: '#f5a524' })

  for (let i = 0; i < 36; i += 1) {
    const esfera = new THREE.Mesh(geometria, material)
    esfera.position.set(Math.cos(i) * 1.2, i * 0.05 - 1, Math.sin(i) * 1.2)
    grupo.add(esfera)
  }
  return grupo
}

function Helice() {
  // Se crea UNA vez: sin useMemo se crearía en cada render.
  const grupo = useMemo(crearHelice, [])

  // R3F no ha creado estos recursos, así que no los libera.
  useEffect(() => {
    return () => {
      grupo.traverse((objeto) => {
        if (objeto instanceof THREE.Mesh) {
          objeto.geometry.dispose()
          objeto.material.dispose()
        }
      })
    }
  }, [grupo])

  return <primitive object={grupo} />
}`,
        },
        {
          tipo: 'destacado',
          tono: 'ojo',
          titulo: 'La regla de propiedad',
          texto:
            'Quien crea, libera. Lo que monta R3F con JSX lo limpia R3F. Lo que creas tú y pasas por `primitive` lo limpias tú, y a mano. Si no, cada montaje deja geometrías colgadas en la GPU hasta que se cierra la pestaña. En una demo no se nota; en una aplicación con navegación sí.',
        },
        {
          tipo: 'tabla',
          cabecera: ['Situación', '¿Merece la pena bajar a three.js?', 'Por qué'],
          filas: [
            ['Una malla con geometría y material', 'No', 'JSX lo describe en tres líneas'],
            ['Una librería que devuelve un `Object3D`', 'Sí', 'No hay versión JSX que reescribir'],
            ['Un `InstancedMesh` con 10 000 elementos', 'Sí', 'Se configura mejor de forma imperativa'],
            ['Un objeto de `three/examples/jsm`', 'Sí, con `primitive`', 'No existe como etiqueta JSX'],
            ['Un shader propio', 'No', '`shaderMaterial` es JSX normal (módulo 11)'],
          ],
        },
        {
          tipo: 'lista',
          items: [
            '`<primitive>` acepta un `object`, no un componente.',
            'Cambiar de `object` desmonta el anterior y monta el nuevo: no se fusionan.',
            'Puedes seguir añadiendo hijos JSX dentro de `<primitive>`; se cuelgan del objeto inyectado.',
            'Si el objeto viene de fuera y se comparte, no lo liberes: lo hará su dueño.',
            'El estado que cambia a 60 fps conviene mutarlo en `useFrame` (módulo 5), no con `setState`.',
          ],
        },
      ],
      errores: [
        {
          sintoma: 'El objeto cambia de identidad en cada render y la escena parpadea.',
          causa: 'La función que crea el objeto se llama en el cuerpo del componente.',
          arreglo: 'Envuélvela en `useMemo` con un array de dependencias vacío, o crea el objeto fuera del componente si es estático.',
        },
        {
          sintoma: 'Tras navegar varias veces, el contexto WebGL se pierde.',
          causa: 'Las geometrías y materiales creados a mano nunca se liberan.',
          arreglo:
            'Recorre el grupo en el `return` del `useEffect` y llama a `dispose()` en cada geometría y material, sin duplicarlos (usa un `Set`).',
        },
        {
          sintoma: '`primitive` con un array de objetos lanza un error.',
          causa: '`object` espera un solo `Object3D`.',
          arreglo: 'Inyecta un `<group>` que los contenga, o mapea y crea un `<primitive>` por elemento con su `key`.',
        },
      ],
      quiz: [
        {
          tipo: 'unica',
          enunciado: '¿Quién libera la memoria de un objeto creado con `new THREE.Mesh(...)` e inyectado con `<primitive>`?',
          opciones: ['Tú, en un `useEffect` de limpieza', 'R3F automáticamente', 'El recolector de basura de JavaScript', 'El renderer, al cerrar la pestaña'],
          correcta: 0,
          explicacion:
            'R3F solo libera lo que ha creado él. Los recursos de GPU no los recoge el recolector de basura: hay que llamar a `dispose()`.',
        },
        {
          tipo: 'verdadero-falso',
          enunciado: 'Dentro de `<primitive>` se pueden seguir escribiendo hijos en JSX.',
          correcta: true,
          explicacion:
            'Sí: se cuelgan del objeto inyectado. Es útil para añadir luces o ayudantes a un grupo que ya existía.',
        },
        {
          tipo: 'multiple',
          enunciado: '¿Qué casos justifican bajar a three.js puro?',
          opciones: [
            'Una librería de terceros que devuelve un `Object3D`',
            'Un `InstancedMesh` con miles de instancias',
            'Un cubo con un color',
            'Un objeto de `three/examples/jsm` sin equivalente JSX',
          ],
          correctas: [0, 1, 3],
          explicacion:
            'Un cubo con color es exactamente el caso en el que JSX gana: una línea frente a cinco.',
        },
        {
          tipo: 'unica',
          enunciado: '¿Qué pasa si `object` cambia por un objeto distinto en un render?',
          opciones: [
            'Se desmonta el anterior y se monta el nuevo',
            'Se fusionan ambos en un grupo',
            'R3F lanza un error',
            'Se reutiliza el anterior ignorando el nuevo',
          ],
          correcta: 0,
          explicacion:
            '`primitive` no reconcilia el interior del objeto: cambia la referencia completa. Por eso el objeto debe ser estable.',
        },
      ],
      recursos: [
        {
          titulo: 'R3F: primitive',
          url: 'https://r3f.docs.pmnd.rs/api/objects#putting-already-existing-objects-into-the-scene-graph',
          nota: 'La documentación oficial del caso y sus advertencias.',
        },
        {
          titulo: 'three.js: How to dispose of objects',
          url: 'https://threejs.org/docs/#manual/en/introduction/How-to-dispose-of-objects',
          nota: 'Qué hay que liberar exactamente y por qué el recolector de basura no basta.',
        },
        {
          titulo: 'React: useMemo',
          url: 'https://react.dev/reference/react/useMemo',
          nota: 'Cuándo memorizar de verdad y cuándo es ruido.',
        },
      ],
      ejercicio: {
        reto: 'Crea un anillo de 24 cajas con three.js puro, inyéctalo con `<primitive>` y libera sus recursos al desmontar.',
        inicial: `import { useEffect, useMemo } from 'react'
import { Canvas } from '@react-three/fiber'
import * as THREE from 'three'

function crearAnillo() {
  const grupo = new THREE.Group()
  const geometria = new THREE.BoxGeometry(0.2, 0.2, 0.2)
  const material = new THREE.MeshBasicMaterial({ color: '#4d8df6' })

  // TODO: crea 24 cajas repartidas en un círculo de radio 1.2
  const caja = new THREE.Mesh(geometria, material)
  grupo.add(caja)

  return grupo
}

function Anillo() {
  const grupo = useMemo(crearAnillo, [])

  useEffect(() => {
    // TODO: libera geometrías y materiales al desmontar
    return () => {}
  }, [grupo])

  return <primitive object={grupo} />
}

export default function App() {
  return (
    <div style={{ height: 320 }}>
      <Canvas camera={{ position: [0, 3, 4.5] }}>
        <Anillo />
      </Canvas>
    </div>
  )
}`,
        solucion: `import { useEffect, useMemo } from 'react'
import { Canvas } from '@react-three/fiber'
import * as THREE from 'three'

function crearAnillo() {
  const grupo = new THREE.Group()
  const geometria = new THREE.BoxGeometry(0.2, 0.2, 0.2)
  const material = new THREE.MeshBasicMaterial({ color: '#4d8df6' })

  for (let i = 0; i < 24; i += 1) {
    const angulo = (i / 24) * Math.PI * 2
    const caja = new THREE.Mesh(geometria, material)
    caja.position.set(Math.cos(angulo) * 1.2, 0, Math.sin(angulo) * 1.2)
    caja.rotation.y = angulo
    grupo.add(caja)
  }

  return grupo
}

function Anillo() {
  const grupo = useMemo(crearAnillo, [])

  useEffect(() => {
    return () => {
      // Un Set evita liberar 24 veces la misma geometría.
      const geometrias = new Set<THREE.BufferGeometry>()
      const materiales = new Set<THREE.Material>()

      grupo.traverse((objeto) => {
        if (objeto instanceof THREE.Mesh) {
          geometrias.add(objeto.geometry)
          materiales.add(objeto.material as THREE.Material)
        }
      })

      geometrias.forEach((g) => g.dispose())
      materiales.forEach((m) => m.dispose())
    }
  }, [grupo])

  return <primitive object={grupo} />
}

export default function App() {
  return (
    <div style={{ height: 320 }}>
      <Canvas camera={{ position: [0, 3, 4.5] }}>
        <Anillo />
      </Canvas>
    </div>
  )
}`,
        pistas: [
          'Un bucle de 24 con ángulo `(i / 24) * Math.PI * 2`.',
          'Comparte la misma geometría y el mismo material: 24 mallas, dos recursos.',
          'Al liberar, usa un `Set` para no llamar 24 veces a `dispose()` sobre el mismo objeto.',
        ],
      },
    },
  ],
}

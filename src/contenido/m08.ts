import type { Modulo } from './tipos'

export const modulo8: Modulo = {
  numero: 8,
  titulo: 'Modelos: del archivo a la escena',
  descripcion:
    'Todo lo que hay entre un `.glb` y un objeto que puedes tocar: qué contiene el archivo, cómo se carga, cómo se recorre, cómo se anima, cómo se modela y cómo se adelgaza sin romperlo.',
  lecciones: [
    {
      id: '8.1',
      modulo: 8,
      titulo: 'Anatomía de un modelo y formatos',
      objetivo:
        'Describir qué hay dentro de un `.glb` y por qué glTF es el formato natural de la web.',
      nivel: 'intro',
      minutos: 60,
      bloques: [
        {
          tipo: 'parrafo',
          texto:
            'Un `.glb` es un contenedor, no una imagen del objeto. Dentro hay dos bloques: un JSON con el grafo completo (nodos, mallas, materiales, animaciones) y un búfer binario con los vértices, los índices y las claves de animación. El JSON no describe la forma: la referencia. Cada malla apunta a unos `accessors` que dicen «en tal búfer, desde tal byte, hay 606 vectores de tres floats».',
        },
        { tipo: 'widget', id: 'm8-estructura', titulo: 'Abre un `.glb` del curso y cuenta lo que hay dentro' },
        {
          tipo: 'parrafo',
          texto:
            'La demo lee el archivo con `fetch` y `DataView`, sin WebGL y sin decodificadores. Cambia de modelo y compara: la tuerca son 2 nodos y 96 triángulos; el taller son 30 nodos y 1 108 triángulos. El peso no crece con los nodos, crece con la geometría, las texturas y las claves de animación. Y el rover pesa 16,8 KB con 444 triángulos porque está comprimido con Draco.',
        },
        {
          tipo: 'codigo',
          lenguaje: 'json',
          titulo: 'Lo mínimo que hay en el JSON de un glTF',
          codigo: `{
  "asset": { "version": "2.0", "generator": "..." },
  "nodes": [
    { "name": "chasis", "mesh": 0 },
    { "name": "rueda_del_izq", "mesh": 1, "translation": [-0.6, 0.2, 0.4] }
  ],
  "meshes": [
    { "name": "chasis", "primitives": [{ "attributes": { "POSITION": 3 }, "indices": 4, "material": 0 }] }
  ],
  "materials": [{ "name": "chasis_metal", "pbrMetallicRoughness": { "metallicFactor": 0.8 } }],
  "animations": [{ "name": "desplegar_panel", "channels": [], "samplers": [] }],
  "accessors": [{ "bufferView": 0, "count": 606, "type": "VEC3" }]
}`,
        },
        {
          tipo: 'tabla',
          cabecera: ['Formato', 'Qué guarda', 'Peso', 'Para qué'],
          filas: [
            ['`.glb`', 'Todo en un binario', 'Compacto', 'Web, tiempo real'],
            ['`.gltf` + binarios', 'JSON separado', 'Más archivos', 'Depurar a mano'],
            ['`.obj`', 'Solo geometría', 'Ligero', 'Intercambio antiguo, sin animación'],
            ['`.fbx`', 'Geometría, rig, animación', 'Pesado', 'Pipeline de DCC'],
            ['`.usdz`', 'Escena de Apple', 'Medio', 'AR en iOS'],
          ],
        },
        {
          tipo: 'destacado',
          tono: 'ojo',
          titulo: 'Draco cambia el interior, no el formato',
          texto:
            'Un GLB con Draco sigue siendo glTF: el JSON es normal y añade `KHR_draco_mesh_compression` a `extensionsRequired`. Lo que cambia es que los accessors de geometría ya no están en claro; hay que decodificarlos. Por eso `useGLTF` necesita el decodificador en `public/draco/` y no basta con descargar el archivo.',
        },
        {
          tipo: 'lista',
          items: [
            'Un nodo puede no tener malla: sirve de pivote o de grupo.',
            'Una malla puede tener varias primitivas: una por material.',
            'Una escena puede tener varias raíces; el visor elige una.',
            'Las texturas viajan aparte (`images`), aunque el GLB las empaqueta.',
            'Un `.glb` no guarda luces ni cámara del curso salvo que las incluyas.',
          ],
        },
      ],
      errores: [
        {
          sintoma: 'El archivo pesa 40 MB y la escena tarda diez segundos en aparecer.',
          causa: 'Texturas a 4096 px y geometría sin comprimir metidas en el mismo GLB.',
          arreglo: 'Reduce texturas, aplica Draco y separa lo que no se ve al principio.',
        },
        {
          sintoma: 'El modelo se carga pero no tiene animaciones.',
          causa: 'Se exportó solo la malla, sin el `armature` ni las acciones.',
          arreglo: 'Vuelve a exportar con las animaciones marcadas y comprueba `animations` en el JSON.',
        },
        {
          sintoma: 'Al abrir el GLB en otro programa aparecen objetos en posiciones raras.',
          causa: 'Transformaciones negativas o jerarquías con escala no uniforme.',
          arreglo: 'Aplica escala y rotación en el DCC antes de exportar; no las dejes en el nodo raíz.',
        },
      ],
      quiz: [
        {
          tipo: 'unica',
          enunciado: '¿Qué dos partes tiene un GLB?',
          opciones: [
            'Un chunk JSON y un chunk binario',
            'Un HTML y un JS',
            'Una textura y una malla',
            'Un ZIP y un manifiesto',
          ],
          correcta: 0,
          explicacion: 'El JSON describe el grafo; el binario guarda los datos de los accessors.',
        },
        {
          tipo: 'verdadero-falso',
          enunciado: 'Un nodo de un glTF siempre tiene una malla.',
          correcta: false,
          explicacion: 'Puede ser un grupo o un pivote sin geometría propia.',
        },
        {
          tipo: 'multiple',
          enunciado: '¿Qué puede contener un GLB?',
          opciones: ['Nodos y mallas', 'Materiales', 'Animaciones', 'El servidor que lo sirve'],
          correctas: [0, 1, 2],
          explicacion: 'El archivo no incluye infraestructura: solo datos de escena.',
        },
        {
          tipo: 'unica',
          enunciado: '¿Qué indica `KHR_draco_mesh_compression`?',
          opciones: [
            'Que la geometría está comprimida y hay que decodificarla',
            'Que el archivo está dañado',
            'Que usa texturas KTX2',
            'Que no tiene animaciones',
          ],
          correcta: 0,
          explicacion: 'Es una extensión requerida: sin decodificador, el modelo no se puede leer.',
        },
      ],
      recursos: [
        {
          titulo: 'glTF 2.0: especificación',
          url: 'https://registry.khronos.org/glTF/specs/2.0/glTF-2.0.html',
          nota: 'La referencia de nodos, mallas, accessors y extensiones.',
        },
        {
          titulo: 'Khronos: glTF-Validator',
          url: 'https://github.com/KhronosGroup/glTF-Validator',
          nota: 'Comprueba si un archivo cumple el estándar antes de publicarlo.',
        },
        {
          titulo: 'three.js: GLTFLoader',
          url: 'https://threejs.org/docs/#examples/en/loaders/GLTFLoader',
          nota: 'Qué lee de cada parte del archivo y qué extensiones soporta.',
        },
      ],
      ejercicio: {
        reto: 'Cuenta los triángulos de este glTF mínimo a partir de sus accessors, sin usar three.js.',
        inicial: `const gltf = {
  meshes: [
    { primitives: [{ attributes: { POSITION: 0 }, indices: 1 }] },
    { primitives: [{ attributes: { POSITION: 2 } }] },
  ],
  accessors: [
    { count: 24, type: 'VEC3' },
    { count: 36, type: 'SCALAR' },
    { count: 12, type: 'VEC3' },
  ],
}

// TODO: recorre las primitivas y suma triángulos.
// Con índices: count / 3. Sin índices: POSITION.count / 3.
console.log(0)`,
        solucion: `const gltf = {
  meshes: [
    { primitives: [{ attributes: { POSITION: 0 }, indices: 1 }] },
    { primitives: [{ attributes: { POSITION: 2 } }] },
  ],
  accessors: [
    { count: 24, type: 'VEC3' },
    { count: 36, type: 'SCALAR' },
    { count: 12, type: 'VEC3' },
  ],
}

let triangulos = 0

for (const malla of gltf.meshes) {
  for (const primitiva of malla.primitives) {
    const indice = primitiva.indices
    const posicion = primitiva.attributes.POSITION

    if (indice !== undefined) {
      triangulos += Math.floor(gltf.accessors[indice].count / 3)
    } else {
      triangulos += Math.floor(gltf.accessors[posicion].count / 3)
    }
  }
}

console.log(triangulos) // 12 + 4 = 16`,
        pistas: [
          'Cada triángulo indexado gasta tres índices.',
          'Sin índice, cada tres vértices forman un triángulo.',
          'La primera malla son 12 triángulos y la segunda 4.',
        ],
      },
    },
    {
      id: '8.2',
      modulo: 8,
      titulo: 'Cargar con `useGLTF`',
      objetivo:
        'Cargar un modelo con `Suspense`, precargarlo, cachearlo y resolver sus rutas en Vite.',
      nivel: 'intro',
      minutos: 55,
      bloques: [
        {
          tipo: 'parrafo',
          texto:
            '`useGLTF` es un `useLoader` especializado: lanza la descarga, suspende el componente hasta que el archivo está listo y devuelve `{ scene, nodes, materials, animations }`. El `scene` es un `Group` de three.js normal; `nodes` y `materials` son diccionarios por nombre para poder tocar piezas concretas sin recorrer nada a mano.',
        },
        { tipo: 'demo', id: 'm8-cargar', titulo: 'Carga, falla a propósito y reintenta' },
        {
          tipo: 'codigo',
          lenguaje: 'tsx',
          titulo: 'La forma mínima, con decodificador local',
          codigo: `// src/tres/gltf.ts: una sola vez, antes de cualquier carga.
import { useGLTF } from '@react-three/drei'
import { DRACO } from './rutas'

useGLTF.setDecoderPath(DRACO)
export { useGLTF }

// Uso:
import { Suspense } from 'react'
import { MODELOS } from '../tres/rutas'
import { useGLTF } from '../tres/gltf'

function Rover() {
  const { scene } = useGLTF(MODELOS.rover)
  return <primitive object={scene} />
}

export function Escena() {
  return (
    <Suspense fallback={<p>Cargando rover…</p>}>
      <Rover />
    </Suspense>
  )
}

// Lanza la descarga antes de montar:
useGLTF.preload(MODELOS.rover, true)`,
        },
        {
          tipo: 'tabla',
          cabecera: ['Propiedad', 'Qué es', 'Uso típico'],
          filas: [
            ['`scene`', 'El `Group` raíz', 'Montarlo con `<primitive>`'],
            ['`nodes`', 'Diccionario nombre → objeto', '`nodes.chasis`, `nodes.rueda_del_izq`'],
            ['`materials`', 'Diccionario nombre → material', 'Recolorear una pieza'],
            ['`animations`', 'Array de `AnimationClip`', 'Pasarlo a `useAnimations`'],
          ],
        },
        {
          tipo: 'destacado',
          tono: 'porque',
          titulo: 'Por qué la ruta no puede ser `/modelos/rover.glb`',
          texto:
            'Porque `vite.config.ts` usa `base: \'./\'` para que la web funcione en un subdirectorio de GitHub Pages. Una ruta absoluta se resuelve contra la raíz del dominio y da 404 en producción aunque funcione en local. Por eso todas las rutas pasan por `rutaAsset`, que compone con `import.meta.env.BASE_URL`.',
        },
        {
          tipo: 'lista',
          items: [
            '`useGLTF` cachea por URL: dos componentes que piden el mismo archivo lo descargan una vez.',
            '`useGLTF.clear(url)` borra esa entrada; la siguiente petición vuelve a leer el archivo.',
            '`useGLTF.preload` acelera la primera lección que usa el modelo.',
            'El `scene` cacheado se comparte: si lo modificas, la modificación persiste en la siguiente demo.',
            'El decodificador de Draco debe ser local si la web tiene que funcionar sin red.',
          ],
        },
      ],
      errores: [
        {
          sintoma: '«A component suspended while responding to synchronous input».',
          causa: 'Se llamó a `useGLTF` sin un `<Suspense>` por encima.',
          arreglo: 'Envuelve el subárbol en `<Suspense fallback={…}>`.',
        },
        {
          sintoma: 'El modelo no carga y la consola habla de `DRACOLoader` o de un `.wasm` perdido.',
          causa: 'La ruta del decodificador apunta al CDN o no existe.',
          arreglo: 'Copia los decodificadores a `public/draco/` y llama a `useGLTF.setDecoderPath(DRACO)`.',
        },
        {
          sintoma: 'En local carga y en GitHub Pages da 404.',
          causa: 'Ruta absoluta en lugar de relativa al `base`.',
          arreglo: 'Usa `rutaAsset(\'modelos/rover.glb\')`, nunca una cadena con `/` inicial.',
        },
      ],
      quiz: [
        {
          tipo: 'unica',
          enunciado: '¿Qué devuelve `useGLTF`?',
          opciones: [
            'Un objeto con `scene`, `nodes`, `materials` y `animations`',
            'Un `Mesh` ya montado',
            'Una promesa',
            'Un array de geometrías',
          ],
          correcta: 0,
          explicacion: 'Es un `useLoader` con el resultado del `GLTFLoader` y mapas por nombre.',
        },
        {
          tipo: 'verdadero-falso',
          enunciado: 'Dos componentes que cargan el mismo `.glb` lo descargan dos veces.',
          correcta: false,
          explicacion: 'La caché de `useLoader` es por URL.',
        },
        {
          tipo: 'multiple',
          enunciado: '¿Qué hace falta para un GLB comprimido con Draco?',
          opciones: [
            'Los archivos del decodificador accesibles',
            'Llamar a `setDecoderPath`',
            'Activar sombras',
            'Un HDRI',
          ],
          correctas: [0, 1],
          explicacion: 'Sombras y entorno no tienen relación con la decodificación.',
        },
        {
          tipo: 'unica',
          enunciado: '¿Para qué sirve `useGLTF.preload`?',
          opciones: [
            'Para empezar la descarga antes de montar el componente',
            'Para comprimir el modelo',
            'Para cambiar la cámara',
            'Para liberar memoria',
          ],
          correcta: 0,
          explicacion: 'Adelanta la petición y evita el salto al entrar en la lección.',
        },
      ],
      recursos: [
        {
          titulo: 'drei: useGLTF',
          url: 'https://drei.docs.pmnd.rs/loaders/use-gltf',
          nota: 'Firma, precarga, caché y decodificador.',
        },
        {
          titulo: 'three.js: GLTFLoader',
          url: 'https://threejs.org/docs/#examples/en/loaders/GLTFLoader',
          nota: 'Qué hace el cargador que envuelve el hook.',
        },
        {
          titulo: 'R3F: loading assets',
          url: 'https://r3f.docs.pmnd.rs/tutorials/loading-assets',
          nota: 'El patrón de `Suspense` y `useLoader` explicado desde cero.',
        },
      ],
      ejercicio: {
        reto: 'Reproduce el patrón de carga con un cargador falso: una promesa que tarda 800 ms y un `Suspense` con fallback. Sin archivos, para que funcione en el sandbox.',
        inicial: `import { Suspense, use } from 'react'

// TODO: crea una promesa que resuelva tras 800 ms con un objeto { nombre: 'rover' }
const carga = Promise.resolve({ nombre: 'rover' })

function Modelo() {
  const datos = use(carga)
  return <p>Cargado: {datos.nombre}</p>
}

export default function App() {
  return (
    <div style={{ padding: 16 }}>
      {/* TODO: envuelve Modelo en Suspense con un fallback */}
      <Modelo />
    </div>
  )
}`,
        solucion: `import { Suspense, use } from 'react'

const carga = new Promise<{ nombre: string }>((resolver) => {
  setTimeout(() => resolver({ nombre: 'rover' }), 800)
})

function Modelo() {
  const datos = use(carga)
  return <p>Cargado: {datos.nombre}</p>
}

export default function App() {
  return (
    <div style={{ padding: 16 }}>
      <Suspense fallback={<p>Cargando…</p>}>
        <Modelo />
      </Suspense>
    </div>
  )
}`,
        pistas: [
          '`use` de React 19 lee una promesa y suspende el componente.',
          'La promesa debe crearse fuera del componente: si se crea en cada render, nunca termina.',
          '`Suspense` necesita un `fallback` visible para que se note la espera.',
        ],
      },
    },
    {
      id: '8.3',
      modulo: 8,
      titulo: '`gltfjsx`',
      objetivo:
        'Entender qué genera `gltfjsx` y decidir cuándo conviene un componente frente a `<primitive>`.',
      nivel: 'medio',
      minutos: 55,
      bloques: [
        {
          tipo: 'parrafo',
          texto:
            '`<primitive object={scene} />` monta el grafo entero en una línea: perfecto para un visor, inútil para tocar una pieza. `gltfjsx` lee el GLB y escribe un componente con una etiqueta por nodo, usando `nodes` y `materials` por nombre. El resultado ocupa más y se lee peor, pero cada malla pasa a ser un elemento de React con props.',
        },
        { tipo: 'demo', id: 'm8-gltfjsx', titulo: 'La misma caja, dos montajes' },
        {
          tipo: 'codigo',
          lenguaje: 'tsx',
          titulo: 'El patrón que genera, sin herramienta',
          codigo: `import { useGLTF } from '@react-three/drei'
import { MODELOS } from '../tres/rutas'

export function Caja() {
  const { nodes, materials } = useGLTF(MODELOS.caja)

  return (
    <group>
      <mesh geometry={nodes.cuerpo.geometry} material={materials.caja_madera} />
      <mesh geometry={nodes.liston_norte_1.geometry} material={materials.caja_liston} />
      <mesh geometry={nodes.esquinera_1.geometry} material={materials.caja_metal} />
    </group>
  )
}

// Equivalente con el grafo entero:
export function CajaPrimitiva() {
  const { scene } = useGLTF(MODELOS.caja)
  return <primitive object={scene} />
}`,
        },
        {
          tipo: 'tabla',
          cabecera: ['Enfoque', 'Ventaja', 'Coste', 'Cuándo'],
          filas: [
            ['`<primitive>`', 'Una línea, monta todo', 'Sin acceso por pieza', 'Visores, modelos de una pieza'],
            ['Componente generado', 'Cada nodo es JSX', 'Archivo grande y verboso', 'Cuando hay que animar o configurar piezas'],
            ['Recorrido manual', 'Sin código generado', 'Nombres en cadenas', 'Pocas piezas y cambios concretos'],
          ],
        },
        {
          tipo: 'destacado',
          tono: 'truco',
          titulo: 'Ejecútalo con `--transform`',
          texto:
            '`npx gltfjsx modelo.glb --transform` no solo genera el componente: optimiza el GLB (dedup, prune, Draco) y deja el archivo listo para producción. Sin `--transform` genera el componente pero el modelo sigue pesando lo mismo. Son dos problemas distintos: el código y el peso.',
        },
        {
          tipo: 'lista',
          items: [
            'El componente generado usa `nodes.X.geometry` y `materials.Y`, no valores copiados.',
            'Si renombras un nodo en el DCC, el componente deja de encontrarlo.',
            '`dispose={null}` en el grupo evita que React libere geometrías compartidas al desmontar.',
            'No edites a mano el archivo generado si vas a regenerarlo: se pierde.',
            'Para un modelo de 30 nodos, el componente puede ocupar más que el propio GLB.',
          ],
        },
      ],
      errores: [
        {
          sintoma: 'El componente generado lanza «Cannot read properties of undefined (reading geometry)».',
          causa: 'Un nombre de nodo no coincide: el GLB cambió o el nombre lleva sufijo.',
          arreglo: 'Imprime `Object.keys(nodes)` y corrige el nombre; no inventes el identificador.',
        },
        {
          sintoma: 'Al desmontar la escena, otra demo pierde las texturas.',
          causa: 'React liberó materiales compartidos que seguían en uso.',
          arreglo: 'Añade `dispose={null}` en el grupo raíz del componente generado.',
        },
        {
          sintoma: 'El modelo se ve entero pero no puedes ocultar una pieza.',
          causa: 'Se montó con `<primitive>` y no hay referencias por nodo.',
          arreglo: 'Usa el componente generado o busca la pieza con `scene.getObjectByName`.',
        },
      ],
      quiz: [
        {
          tipo: 'unica',
          enunciado: '¿Qué hace `gltfjsx`?',
          opciones: [
            'Genera un componente React a partir de un GLB',
            'Comprime el GLB siempre',
            'Convierte GLB a OBJ',
            'Sube el modelo a un CDN',
          ],
          correcta: 0,
          explicacion: 'Escribe JSX con una etiqueta por nodo; la optimización es opcional.',
        },
        {
          tipo: 'verdadero-falso',
          enunciado: 'El componente generado copia la geometría dentro del archivo `.tsx`.',
          correcta: false,
          explicacion: 'Referencia `nodes.X.geometry`; la geometría sigue en el GLB.',
        },
        {
          tipo: 'multiple',
          enunciado: '¿Qué ganas con el componente generado?',
          opciones: [
            'Acceso por pieza',
            'Poder aplicar props de React a cada malla',
            'Poder ocultar o recolorear un nodo',
            'Un archivo más pequeño',
          ],
          correctas: [0, 1, 2],
          explicacion: 'El archivo de código crece; el GLB es el mismo.',
        },
        {
          tipo: 'unica',
          enunciado: '¿Qué añade `--transform`?',
          opciones: [
            'Optimización del GLB además del componente',
            'Un servidor de desarrollo',
            'Animaciones nuevas',
            'Un HDRI',
          ],
          correcta: 0,
          explicacion: 'Aplica dedup, prune y Draco al archivo de salida.',
        },
      ],
      recursos: [
        {
          titulo: 'gltfjsx',
          url: 'https://github.com/pmndrs/gltfjsx',
          nota: 'Opciones, `--transform` y ejemplos de salida.',
        },
        {
          titulo: 'drei: useGLTF',
          url: 'https://drei.docs.pmnd.rs/loaders/use-gltf',
          nota: 'De dónde salen `nodes` y `materials`.',
        },
        {
          titulo: 'gltf-transform: CLI',
          url: 'https://gltf-transform.dev/cli',
          nota: 'Lo que hace `--transform` por dentro.',
        },
      ],
      ejercicio: {
        reto: 'Escribe un componente que reciba un mapa de nodos y pinte cada malla con su geometría y su material, en lugar de usar `<primitive>`.',
        inicial: `import { Canvas } from '@react-three/fiber'
import * as THREE from 'three'

const geometria = new THREE.BoxGeometry(0.7, 0.7, 0.7)
const materialRojo = new THREE.MeshStandardMaterial({ color: '#e0574f' })
const materialAzul = new THREE.MeshStandardMaterial({ color: '#4d8df6' })

const nodes = {
  caja_roja: { geometry: geometria, material: materialRojo, position: [-0.6, 0, 0] },
  caja_azul: { geometry: geometria, material: materialAzul, position: [0.6, 0, 0] },
}

// TODO: pinta las dos cajas recorriendo \`nodes\`
function Piezas() {
  return null
}

export default function App() {
  return (
    <div style={{ height: 320 }}>
      <Canvas camera={{ position: [2.4, 2, 3.4] }} frameloop="always">
        <ambientLight intensity={0.6} />
        <directionalLight position={[3, 4, 2]} intensity={2} />
        <Piezas />
      </Canvas>
    </div>
  )
}`,
        solucion: `import { Canvas } from '@react-three/fiber'
import * as THREE from 'three'

const geometria = new THREE.BoxGeometry(0.7, 0.7, 0.7)
const materialRojo = new THREE.MeshStandardMaterial({ color: '#e0574f' })
const materialAzul = new THREE.MeshStandardMaterial({ color: '#4d8df6' })

const nodes = {
  caja_roja: { geometry: geometria, material: materialRojo, position: [-0.6, 0, 0] },
  caja_azul: { geometry: geometria, material: materialAzul, position: [0.6, 0, 0] },
}

function Piezas() {
  return (
    <group>
      {Object.entries(nodes).map(([nombre, pieza]) => (
        <mesh
          key={nombre}
          geometry={pieza.geometry}
          material={pieza.material}
          position={pieza.position as [number, number, number]}
        />
      ))}
    </group>
  )
}

export default function App() {
  return (
    <div style={{ height: 320 }}>
      <Canvas camera={{ position: [2.4, 2, 3.4] }} frameloop="always">
        <ambientLight intensity={0.6} />
        <directionalLight position={[3, 4, 2]} intensity={2} />
        <Piezas />
      </Canvas>
    </div>
  )
}`,
        pistas: [
          '`Object.entries(nodes)` te da el nombre y la pieza.',
          'Pasa `geometry` y `material` como props del `<mesh>`.',
          'La `key` evita que React reutilice la malla equivocada.',
        ],
      },
    },
    {
      id: '8.4',
      modulo: 8,
      titulo: 'Inspeccionar y manipular el grafo',
      objetivo:
        'Recorrer los nodos de un modelo real, encontrar piezas por nombre y modificarlas sin contaminar la caché.',
      nivel: 'medio',
      minutos: 65,
      bloques: [
        {
          tipo: 'parrafo',
          texto:
            'Un modelo cargado es un árbol de `Object3D`. `traverse` lo recorre en profundidad y te da cada nodo; `getObjectByName` busca uno concreto. Con esas dos funciones y `instanceof Mesh` ya puedes hacer casi todo lo que se hace en un configurador: resaltar, ocultar, recolorear, clonar y mover piezas.',
        },
        { tipo: 'demo', id: 'm8-inspeccionar', titulo: 'Pulsa una pieza, resáltala, escóndela, clónala' },
        {
          tipo: 'codigo',
          lenguaje: 'tsx',
          titulo: 'Las cuatro operaciones, sobre un clon',
          codigo: `const { scene } = useGLTF(MODELOS.rover)

// 1. Clonar para no ensuciar la caché.
const copia = useMemo(() => scene.clone(true), [scene])

// 2. Recorrer y preparar materiales propios.
copia.traverse((objeto) => {
  if (objeto instanceof Mesh) {
    objeto.material = objeto.material.clone()
  }
})

// 3. Buscar por nombre.
const chasis = copia.getObjectByName('chasis') as Mesh | undefined

// 4. Modificar.
if (chasis) {
  chasis.material.emissive.set('#f5a524')
  chasis.visible = false
}`,
        },
        {
          tipo: 'tabla',
          cabecera: ['Operación', 'API', 'Coste'],
          filas: [
            ['Recorrer', '`traverse`', 'Lineal en nodos'],
            ['Buscar', '`getObjectByName`', 'Lineal, pero barato'],
            ['Clonar', '`clone(true)`', 'Copia objetos; comparte geometría'],
            ['Material propio', '`material.clone()`', 'Duplica uniforms, no texturas'],
            ['Ocultar', '`visible = false`', 'Gratis: no se dibuja'],
          ],
        },
        {
          tipo: 'destacado',
          tono: 'ojo',
          titulo: 'El `scene` de `useGLTF` está compartido',
          texto:
            'La caché devuelve el mismo objeto a todas las demos. Si haces `scene.traverse` y cambias un material sin clonar, la siguiente lección abre el modelo ya pintado. La regla es simple: para leer, usa el original; para modificar, clona primero, aunque el clon comparta geometría.',
        },
        {
          tipo: 'lista',
          items: [
            'Los nombres duplicados existen: `getObjectByName` devuelve el primero.',
            '`clone()` copia la jerarquía y las transformaciones, no los materiales.',
            'Un `Group` no tiene geometría: comprueba con `instanceof Mesh`.',
            'Ocultar con `visible` es más barato que desmontar y volver a montar.',
            'Para muchos cambios por frame, guarda la referencia y no busques por nombre cada vez.',
          ],
        },
      ],
      errores: [
        {
          sintoma: 'Tras visitar la demo, otra lección muestra el modelo recoloreado.',
          causa: 'Se modificó el `scene` cacheado en lugar de un clon.',
          arreglo: 'Clona el `scene` antes de tocar materiales o transformaciones.',
        },
        {
          sintoma: 'Al recolorear una pieza se pintan tres.',
          causa: 'Las tres mallas comparten el mismo material.',
          arreglo: 'Clona el material por malla antes de asignar `color` o `emissive`.',
        },
        {
          sintoma: '`getObjectByName` devuelve `undefined`.',
          causa: 'El nombre real no coincide: sufijos, mayúsculas o nodos renombrados.',
          arreglo: 'Lista los nombres con `traverse` y compáralos con los del GLB.',
        },
      ],
      quiz: [
        {
          tipo: 'unica',
          enunciado: '¿Qué hace `clone(true)` en un `Object3D`?',
          opciones: [
            'Copia el objeto y toda su jerarquía',
            'Copia solo la geometría',
            'Duplica el archivo GLB',
            'Reinicia la escena',
          ],
          correcta: 0,
          explicacion: 'El argumento `true` incluye los hijos.',
        },
        {
          tipo: 'verdadero-falso',
          enunciado: '`clone()` duplica también los materiales.',
          correcta: false,
          explicacion: 'Los materiales se comparten; hay que clonarlos aparte.',
        },
        {
          tipo: 'multiple',
          enunciado: '¿Qué necesitas para resaltar una pieza sin afectar a las demás?',
          opciones: [
            'Encontrarla por nombre',
            'Un material propio para esa malla',
            'Modificar el original cacheado',
            'Volver a montar la escena',
          ],
          correctas: [0, 1],
          explicacion: 'Modificar el original contamina la caché; remontar no es necesario.',
        },
        {
          tipo: 'unica',
          enunciado: '¿Qué operación es gratis en render?',
          opciones: [
            '`visible = false`',
            'Clonar el modelo',
            'Buscar por nombre',
            'Clonar un material',
          ],
          correcta: 0,
          explicacion: 'Un objeto invisible no entra en la lista de dibujado.',
        },
      ],
      recursos: [
        {
          titulo: 'three.js: Object3D',
          url: 'https://threejs.org/docs/#api/en/core/Object3D',
          nota: '`traverse`, `getObjectByName`, `clone` y `visible`.',
        },
        {
          titulo: 'three.js: Mesh',
          url: 'https://threejs.org/docs/#api/en/objects/Mesh',
          nota: 'La clase que tiene `geometry` y `material`.',
        },
        {
          titulo: 'drei: useGLTF',
          url: 'https://drei.docs.pmnd.rs/loaders/use-gltf',
          nota: 'Qué se cachea y cómo se limpia.',
        },
      ],
      ejercicio: {
        reto: 'Dado un grupo con tres mallas, oculta la del centro y resalta la de la derecha cambiando su emisivo. Sin cargar archivos.',
        inicial: `import { Canvas } from '@react-three/fiber'
import * as THREE from 'three'

function Piezas() {
  // TODO: oculta la caja central y resalta la derecha
  return (
    <group>
      <mesh position={[-1, 0, 0]}>
        <boxGeometry args={[0.6, 0.6, 0.6]} />
        <meshStandardMaterial color="#4d8df6" />
      </mesh>
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[0.6, 0.6, 0.6]} />
        <meshStandardMaterial color="#4d8df6" />
      </mesh>
      <mesh position={[1, 0, 0]}>
        <boxGeometry args={[0.6, 0.6, 0.6]} />
        <meshStandardMaterial color="#4d8df6" />
      </mesh>
    </group>
  )
}

export default function App() {
  return (
    <div style={{ height: 320 }}>
      <Canvas camera={{ position: [2.6, 2, 3.6] }} frameloop="always">
        <ambientLight intensity={0.5} />
        <directionalLight position={[3, 4, 2]} intensity={2} />
        <Piezas />
      </Canvas>
    </div>
  )
}`,
        solucion: `import { Canvas } from '@react-three/fiber'
import * as THREE from 'three'

function Piezas() {
  return (
    <group>
      <mesh position={[-1, 0, 0]}>
        <boxGeometry args={[0.6, 0.6, 0.6]} />
        <meshStandardMaterial color="#4d8df6" />
      </mesh>
      <mesh position={[0, 0, 0]} visible={false}>
        <boxGeometry args={[0.6, 0.6, 0.6]} />
        <meshStandardMaterial color="#4d8df6" />
      </mesh>
      <mesh position={[1, 0, 0]}>
        <boxGeometry args={[0.6, 0.6, 0.6]} />
        <meshStandardMaterial color="#4d8df6" emissive="#f5a524" emissiveIntensity={0.8} />
      </mesh>
    </group>
  )
}

export default function App() {
  return (
    <div style={{ height: 320 }}>
      <Canvas camera={{ position: [2.6, 2, 3.6] }} frameloop="always">
        <ambientLight intensity={0.5} />
        <directionalLight position={[3, 4, 2]} intensity={2} />
        <Piezas />
      </Canvas>
    </div>
  )
}`,
        pistas: [
          'Ocultar en JSX es `visible={false}`.',
          'El emisivo se ve aunque la luz no llegue: prueba `emissive` y `emissiveIntensity`.',
          'Si cada caja tiene su propio material, cambiar una no toca las otras.',
        ],
      },
    },
    {
      id: '8.5',
      modulo: 8,
      titulo: 'Animaciones con `useAnimations`',
      objetivo:
        'Reproducir clips, encadenarlos con fundido y decidir qué clip manda en cada estado.',
      nivel: 'alto',
      minutos: 70,
      bloques: [
        {
          tipo: 'parrafo',
          texto:
            'Un clip de glTF es una lista de pistas: cada pista dice «en tal nodo, la rotación (o la posición, o la escala) vale esto en este instante». `AnimationMixer` evalúa todas las pistas y escribe el resultado en los nodos. `useAnimations` crea el mixer, lo actualiza en cada frame y te devuelve un diccionario de acciones por nombre de clip.',
        },
        { tipo: 'demo', id: 'm8-animaciones', titulo: 'Saludar y asentir, con fundido ajustable' },
        {
          tipo: 'codigo',
          lenguaje: 'tsx',
          titulo: 'Un clip, una acción',
          codigo: `const grupo = useRef<Group>(null)
const { scene, animations } = useGLTF(MODELOS.robot)
const { actions } = useAnimations(animations, grupo)

useEffect(() => {
  const accion = actions.saludar
  if (!accion) return

  accion
    .reset()
    .setLoop(LoopOnce, 1)
    .fadeIn(0.35)
    .play()

  accion.clampWhenFinished = true

  return () => {
    accion.fadeOut(0.35)
  }
}, [actions])

return (
  <group ref={grupo}>
    <primitive object={scene} />
  </group>
)`,
        },
        {
          tipo: 'tabla',
          cabecera: ['Método', 'Qué hace', 'Cuándo'],
          filas: [
            ['`reset()`', 'Vuelve al inicio y activa', 'Antes de relanzar'],
            ['`play()` / `stop()`', 'Activa o detiene', 'Control manual'],
            ['`fadeIn(t)` / `fadeOut(t)`', 'Entra o sale con fundido', 'Cambios de estado'],
            ['`crossFadeTo(otra, t)`', 'Mezcla dos acciones', 'Encadenar sin salto'],
            ['`setLoop(LoopOnce)`', 'Una sola vez', 'Gestos y acciones'],
          ],
        },
        {
          tipo: 'destacado',
          tono: 'porque',
          titulo: 'Por qué `clampWhenFinished` importa',
          texto:
            'Sin él, al terminar un clip de una sola pasada el nodo vuelve a la pose de reposo de golpe. Con él, la acción se queda en el último frame. En un saludo eso es la diferencia entre «termina el gesto y baja la mano» y «termina el gesto y la mano se teletransporta».',
        },
        {
          tipo: 'lista',
          items: [
            'Los nombres de los clips son los que exportó el DCC: respétalos o renómbralos al exportar.',
            'Dos acciones sobre el mismo nodo se suman si las dos están activas: hay que mezclar con intención.',
            '`useAnimations` acepta un segundo argumento que actúa de raíz para resolver los nombres.',
            'Los clips se pueden reproducir a distinta velocidad con `timeScale`.',
            'El mixer se actualiza solo; no hace falta llamar a `update` a mano.',
          ],
        },
      ],
      errores: [
        {
          sintoma: 'La acción termina y el modelo vuelve de golpe a la pose inicial.',
          causa: 'Clip de una pasada sin `clampWhenFinished`.',
          arreglo: 'Asigna `accion.clampWhenFinished = true`.',
        },
        {
          sintoma: 'El modelo se mueve solo o se queda a medias entre dos poses.',
          causa: 'Hay dos acciones activas sobre los mismos nodos.',
          arreglo: 'Detén la anterior (`fadeOut` o `stop`) antes de lanzar la siguiente.',
        },
        {
          sintoma: '`actions.saludar` es `undefined`.',
          causa: 'El nombre no coincide o el clip no se exportó.',
          arreglo: 'Imprime `animations.map(a => a.name)` y usa el nombre exacto.',
        },
      ],
      quiz: [
        {
          tipo: 'unica',
          enunciado: '¿Qué evalúa un `AnimationMixer`?',
          opciones: [
            'Las pistas de un clip y escribe el resultado en los nodos',
            'La física de los objetos',
            'El color de los materiales',
            'La cámara',
          ],
          correcta: 0,
          explicacion: 'Es el reproductor de animaciones de three.js.',
        },
        {
          tipo: 'verdadero-falso',
          enunciado: 'Hay que llamar a `mixer.update` a mano en cada frame.',
          correcta: false,
          explicacion: '`useAnimations` ya lo hace dentro del bucle de R3F.',
        },
        {
          tipo: 'multiple',
          enunciado: '¿Qué hace falta para encadenar dos clips sin salto?',
          opciones: [
            'Detener o desvanecer el anterior',
            'Un tiempo de fundido',
            'El mismo número de pistas en los dos',
            'Activar sombras',
          ],
          correctas: [0, 1],
          explicacion: 'Los clips pueden tener pistas distintas; el mixer interpola lo que exista.',
        },
        {
          tipo: 'unica',
          enunciado: '¿Qué hace `clampWhenFinished`?',
          opciones: [
            'Dejar la última pose al terminar',
            'Repetir el clip',
            'Acelerar el clip',
            'Silenciar el clip',
          ],
          correcta: 0,
          explicacion: 'Evita el salto a la pose de reposo.',
        },
      ],
      recursos: [
        {
          titulo: 'three.js: AnimationMixer',
          url: 'https://threejs.org/docs/#api/en/animation/AnimationMixer',
          nota: 'El objeto que evalúa las pistas.',
        },
        {
          titulo: 'drei: useAnimations',
          url: 'https://drei.docs.pmnd.rs/animations/use-animations',
          nota: 'Firma, raíz y actualización automática.',
        },
        {
          titulo: 'three.js: AnimationAction',
          url: 'https://threejs.org/docs/#api/en/animation/AnimationAction',
          nota: '`fadeIn`, `crossFadeTo`, `setLoop`, `timeScale`.',
        },
      ],
      ejercicio: {
        reto: 'Crea un clip a mano con `KeyframeTrack` que haga girar una caja una vuelta en dos segundos, y reprodúcelo en bucle con un mixer.',
        inicial: `import { useEffect, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import type { Mesh } from 'three'

function Caja() {
  const malla = useRef<Mesh>(null)

  useEffect(() => {
    if (!malla.current) return

    // TODO: crea un AnimationClip con una pista de rotación en Y
    // de 0 a Math.PI * 2 en 2 segundos, y reprodúcelo en bucle.
  }, [])

  return (
    <mesh ref={malla}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="#f5a524" />
    </mesh>
  )
}

export default function App() {
  return (
    <div style={{ height: 320 }}>
      <Canvas camera={{ position: [2.4, 2, 3.4] }} frameloop="always">
        <ambientLight intensity={0.6} />
        <directionalLight position={[3, 4, 2]} intensity={2} />
        <Caja />
      </Canvas>
    </div>
  )
}`,
        solucion: `import { useEffect, useRef } from 'react'
import { Canvas } from '@react-three/fiber'
import * as THREE from 'three'
import type { Mesh } from 'three'

function Caja() {
  const malla = useRef<Mesh>(null)

  useEffect(() => {
    if (!malla.current) return

    const pista = new THREE.QuaternionKeyframeTrack(
      '.rotation',
      [0, 2],
      [
        0, 0, 0, 1,
        0, Math.sin(Math.PI / 2), 0, Math.cos(Math.PI / 2),
      ],
    )

    const clip = new THREE.AnimationClip('giro', 2, [pista])
    const mixer = new THREE.AnimationMixer(malla.current)
    mixer.clipAction(clip).play()

    // Sin este bucle el mixer nunca avanza.
    const reloj = new THREE.Clock()
    let frame = 0
    const animar = () => {
      mixer.update(reloj.getDelta())
      frame = requestAnimationFrame(animar)
    }
    animar()

    return () => {
      cancelAnimationFrame(frame)
      mixer.stopAllAction()
    }
  }, [])

  return (
    <mesh ref={malla}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="#f5a524" />
    </mesh>
  )
}

export default function App() {
  return (
    <div style={{ height: 320 }}>
      <Canvas camera={{ position: [2.4, 2, 3.4] }} frameloop="always">
        <ambientLight intensity={0.6} />
        <directionalLight position={[3, 4, 2]} intensity={2} />
        <Caja />
      </Canvas>
    </div>
  )
}`,
        pistas: [
          'Una pista de rotación se expresa con cuaterniones, no con ángulos de Euler.',
          'Un cuarto de vuelta en Y es `(0, sin(π/4), 0, cos(π/4))`; media vuelta, `(0, 1, 0, 0)`.',
          'Con `useFrame` de R3F puedes actualizar el mixer sin montar tu propio bucle.',
        ],
      },
    },
    {
      id: '8.6',
      modulo: 8,
      titulo: 'Blender I: modelado básico',
      objetivo:
        'Modelar una pieza sencilla con extrusión, cortes de bucle, bisel y modificador espejo, y exportarla sin sorpresas.',
      nivel: 'medio',
      minutos: 90,
      bloques: [
        {
          tipo: 'parrafo',
          texto:
            'Esta lección no reparte un `.blend`: Blender no forma parte del repositorio y un archivo de 300 MB no cabe en un curso que se instala con `npm install`. Lo que sí hay es el resultado —la tuerca del curso— y una guía de los cuatro gestos que resuelven casi cualquier pieza mecánica. Si sigues los pasos en tu copia de Blender, obtendrás algo equivalente, no idéntico. Descarga la tuerca y una caja con UVs para importarlas en Blender (`File → Import → glTF 2.0`) y comparar la topología que buscas con la que hay:',
        },
        {
          tipo: 'descarga',
          archivos: [
            {
              nombre: 'tuerca.glb',
              href: 'modelos/tuerca.glb',
              descripcion: 'La pieza de la lección: 6 lados, bisel y agujero, 1,6 KB.',
            },
            {
              nombre: 'caja.glb',
              href: 'modelos/caja.glb',
              descripcion: 'Un cubo con UVs desplegadas, para practicar extrusión sin partir de cero.',
            },
          ],
        },
        {
          tipo: 'pasos',
          items: [
            {
              titulo: '1. Unidades y escala',
              texto:
                'Empieza con la escena vacía y fija la unidad en metros. Un objeto de 1 unidad debe medir 1 metro en la escena de three.js; si modelas en centímetros, el modelo aparecerá 100 veces más grande.',
            },
            {
              titulo: '2. La forma base',
              texto:
                'Añade un cilindro de 6 u 8 lados para una tuerca. En el panel de operación baja el número de vértices antes de tocar nada más: la topología se decide al principio.',
            },
            {
              titulo: '3. Extrusión y cortes de bucle',
              texto:
                'Selecciona la cara superior, `E` para extruir y `Ctrl+R` para insertar un corte de bucle. Los cortes mantienen la densidad donde hace falta el bisel, no en toda la pieza.',
            },
            {
              titulo: '4. Bisel',
              texto:
                'Con `Ctrl+B` redondea las aristas que recibirían luz. Un bisel de 0,01–0,03 m es suficiente en una pieza pequeña; más grande y la pieza parece de juguete.',
            },
            {
              titulo: '5. Espejo si es simétrica',
              texto:
                'Modela media pieza y añade un modificador `Mirror` con `Clipping`. Aplicarlo antes de exportar evita que el GLB incluya el modificador sin evaluar.',
            },
            {
              titulo: '6. Exportar',
              texto:
                '`File → Export → glTF 2.0`, formato `glTF Binary (.glb)`, con `Apply Modifiers` activado. Comprueba el peso y ábrelo en el visor de esta web antes de darlo por bueno.',
            },
          ],
        },
        {
          tipo: 'codigo',
          lenguaje: 'texto',
          titulo: 'Los atajos que se usan de verdad',
          codigo: `E        extruir la selección
Ctrl+R   corte de bucle
Ctrl+B   bisel
Alt+clic seleccionar un bucle de aristas
Shift+D  duplicar
Ctrl+A   aplicar escala/rotación
Tab      modo edición / objeto
Numpad 1 vista frontal
Numpad 7 vista superior`,
        },
        {
          tipo: 'destacado',
          tono: 'ojo',
          titulo: 'Aplica la escala antes de exportar',
          texto:
            'Si el objeto tiene escala 0,01 en el nodo raíz, three.js la arrastra y luego cuesta compensarla. `Ctrl+A → Scale` deja la escala en 1 y mete el tamaño en los vértices. Es el primer sitio donde mirar cuando un modelo «sale enorme» o «no se ve».',
        },
        { tipo: 'demo', id: 'm8-pieza', titulo: 'El resultado: tuerca de 96 triángulos' },
        {
          tipo: 'lista',
          items: [
            'Empieza con la topología mínima y añade detalle solo donde se ve.',
            'Los cortes de bucle van donde luego va el bisel, no en todas partes.',
            'Aplica modificadores antes de exportar; el GLB no los entiende.',
            'Nombra los objetos mientras modelas: esos nombres llegan a `nodes`.',
            'Exporta pronto y prueba en el visor: los errores de escala se ven antes así.',
          ],
        },
      ],
      errores: [
        {
          sintoma: 'El modelo aparece gigante o diminuto en la escena.',
          causa: 'La escena de Blender estaba en centímetros o la escala no se aplicó.',
          arreglo: 'Trabaja en metros, aplica escala y comprueba el tamaño en el visor.',
        },
        {
          sintoma: 'Las caras interiores se ven negras o invisibles.',
          causa: 'Normales invertidas por una extrusión negativa.',
          arreglo: 'Selecciona todo y recalcula normales hacia fuera (`Shift+N`).',
        },
        {
          sintoma: 'El GLB pesa el triple de lo esperado.',
          causa: 'Se exportaron modificadores sin aplicar y objetos ocultos.',
          arreglo: 'Aplica modificadores, borra lo que no se ve y exporta solo la selección.',
        },
      ],
      quiz: [
        {
          tipo: 'unica',
          enunciado: '¿Qué hace `Ctrl+R` en el modo edición?',
          opciones: [
            'Inserta un corte de bucle',
            'Rota la vista',
            'Renderiza',
            'Añade un material',
          ],
          correcta: 0,
          explicacion: 'Añade una arista que recorre el bucle de la malla.',
        },
        {
          tipo: 'verdadero-falso',
          enunciado: 'Un GLB guarda los modificadores de Blender sin aplicar.',
          correcta: false,
          explicacion: 'glTF no conoce modificadores: hay que aplicarlos al exportar.',
        },
        {
          tipo: 'multiple',
          enunciado: '¿Qué conviene comprobar antes de exportar?',
          opciones: [
            'Escala aplicada',
            'Normales hacia fuera',
            'Nombres de los objetos',
            'Que la cámara esté en la escena',
          ],
          correctas: [0, 1, 2],
          explicacion: 'La cámara y las luces no hacen falta en un modelo de producto.',
        },
        {
          tipo: 'unica',
          enunciado: '¿Por qué modelar en metros?',
          opciones: [
            'Porque three.js trabaja en unidades de escena y el tamaño importa',
            'Porque Blender no admite otra unidad',
            'Porque el GLB lo exige',
            'Porque reduce el peso',
          ],
          correcta: 0,
          explicacion: 'Un modelo de 1 unidad debe medir 1 metro para no escalarlo luego.',
        },
      ],
      recursos: [
        {
          titulo: 'Blender Manual: modeling',
          url: 'https://docs.blender.org/manual/en/latest/modeling/index.html',
          nota: 'La referencia de extrusión, bucles y bisel.',
        },
        {
          titulo: 'Blender: glTF 2.0 exporter',
          url: 'https://docs.blender.org/manual/en/latest/addons/import_export/scene_gltf2.html',
          nota: 'Qué opciones del exportador afectan a three.js.',
        },
        {
          titulo: 'Blender Studio: fundamentals',
          url: 'https://studio.blender.org/training/blender-fundamentals/',
          nota: 'Curso gratuito oficial para los primeros pasos.',
        },
      ],
      ejercicio: {
        reto: 'Sin Blender en el sandbox, reproduce la pieza con geometría procedural: un cilindro de 6 lados con un bisel simulado y compara el número de triángulos al subir los lados.',
        inicial: `import { useState } from 'react'
import { Canvas } from '@react-three/fiber'

export default function App() {
  const [lados, setLados] = useState(6)

  return (
    <div style={{ height: 320 }}>
      <input
        type="range"
        min={3}
        max={32}
        value={lados}
        onChange={(e) => setLados(Number(e.target.value))}
      />
      <Canvas camera={{ position: [2.4, 2, 3.4] }} frameloop="always">
        <ambientLight intensity={0.6} />
        <directionalLight position={[3, 4, 2]} intensity={2} />
        {/* TODO: cambia el cilindro por uno de \`lados\` caras y añade un toro fino como bisel */}
        <mesh>
          <cylinderGeometry args={[0.9, 0.9, 0.3, 32]} />
          <meshStandardMaterial color="#9aa6b8" metalness={0.8} roughness={0.3} />
        </mesh>
      </Canvas>
    </div>
  )
}`,
        solucion: `import { useState } from 'react'
import { Canvas } from '@react-three/fiber'

export default function App() {
  const [lados, setLados] = useState(6)

  return (
    <div style={{ height: 320 }}>
      <input
        type="range"
        min={3}
        max={32}
        value={lados}
        onChange={(e) => setLados(Number(e.target.value))}
      />
      <Canvas camera={{ position: [2.4, 2, 3.4] }} frameloop="always">
        <ambientLight intensity={0.6} />
        <directionalLight position={[3, 4, 2]} intensity={2} />
        <mesh>
          <cylinderGeometry args={[0.9, 0.9, 0.3, lados]} />
          <meshStandardMaterial color="#9aa6b8" metalness={0.8} roughness={0.3} />
        </mesh>
        {/* Bisel simulado: un toro fino alrededor del borde superior. */}
        <mesh position={[0, 0.15, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.86, 0.03, 8, lados]} />
          <meshStandardMaterial color="#b8c2d0" metalness={0.9} roughness={0.25} />
        </mesh>
      </Canvas>
    </div>
  )
}`,
        pistas: [
          '`cylinderGeometry` acepta `radialSegments` como cuarto argumento.',
          'Un toro tumbado (`rotation={[Math.PI / 2, 0, 0]}`) rodea el borde.',
          'Con 6 lados parece una tuerca; con 32, un disco.',
        ],
      },
    },
    {
      id: '8.7',
      modulo: 8,
      titulo: 'Blender II: UVs y materiales PBR',
      objetivo:
        'Desplegar UVs sin estiramientos, montar un material metallic-roughness y exportarlo con los mapas en el espacio correcto.',
      nivel: 'medio',
      minutos: 90,
      bloques: [
        {
          tipo: 'parrafo',
          texto:
            'Un desplegado es un plano de la superficie. Se hace cortando la malla por costuras y estirándola hasta que quepa en el cuadrado 0..1 sin solaparse. Si una isla ocupa el doble de espacio, recibe el doble de texels y el patrón se ve más fino ahí. Si dos islas se pisan, se pintan a la vez y el error no aparece hasta mirar la pieza desde el otro lado.',
        },
        {
          tipo: 'descarga',
          archivos: [
            {
              nombre: 'taller.glb',
              href: 'modelos/taller.glb',
              descripcion: 'El diorama del curso con sus materiales, para abrirlo en Blender y ver cómo se agrupan.',
            },
            {
              nombre: 'madera-color.png',
              href: 'texturas/madera-color.png',
              descripcion: 'Mapa de color de la madera, para practicar el desplegado encima.',
            },
            {
              nombre: 'madera-normal.png',
              href: 'texturas/madera-normal.png',
              descripcion: 'Su normal en espacio tangente (sin flip de Y).',
            },
          ],
        },
        { tipo: 'widget', id: 'm8-uv', titulo: 'Tres desplegados: correcto, estirado y solapado' },
        {
          tipo: 'pasos',
          items: [
            {
              titulo: '1. Marca costuras',
              texto:
                'En modo edición, selecciona aristas y `Ctrl+E → Mark Seam`. Las costuras son donde se va a abrir la malla; conviene esconderlas en zonas que no se miren.',
            },
            {
              titulo: '2. Desplegar',
              texto:
                'Selecciona todo y `U → Unwrap`. Si el resultado tiene islas deformadas, revisa las costuras antes de tocar la escala.',
            },
            {
              titulo: '3. Igualar densidad',
              texto:
                '`U → Average Island Scale` reparte el espacio según el área real. Después, `Pack Islands` coloca las islas sin solaparse y con margen.',
            },
            {
              titulo: '4. Comprobar',
              texto:
                'Activa el mapa de tablero de ajedrez. Si los cuadrados se ven rectángulos en alguna cara, esa isla está estirada.',
            },
            {
              titulo: '5. Material metallic-roughness',
              texto:
                'Conecta la textura de color a `Base Color`, la de normales a `Normal Map` y la de rugosidad a `Roughness`. En Blender no existe «mapa de metalicidad» separado del estándar: va en el canal azul del ORM.',
            },
            {
              titulo: '6. Exportar los mapas',
              texto:
                'Guarda el color en sRGB y los mapas de datos en lineal. En el exportador de glTF, revisa que las imágenes se empaqueten y que el material no lleve nodos que glTF no entiende.',
            },
          ],
        },
        {
          tipo: 'tabla',
          cabecera: ['Mapa', 'Se guarda en', 'Blender lo conecta a', 'Espacio'],
          filas: [
            ['Color', 'PNG/JPG', 'Base Color', 'sRGB'],
            ['Normal', 'PNG', 'Normal Map', 'Lineal'],
            ['Rugosidad', 'PNG en gris', 'Roughness', 'Lineal'],
            ['Metalicidad', 'Canal azul del ORM', 'Metallic', 'Lineal'],
            ['Oclusión', 'Canal rojo del ORM', 'AO (segundo UV)', 'Lineal'],
          ],
        },
        {
          tipo: 'destacado',
          tono: 'porque',
          titulo: 'El error de color no se ve en Blender',
          texto:
            'Blender etiqueta internamente las texturas y aplica la conversión al renderizar. Exportas, cargas en la web y la madera se ve lavada: el GLB lleva la imagen, pero tu código la declara como lineal. El modelo estaba bien; el fallo era de `colorSpace` en three.js (lección 7.3).',
        },
        {
          tipo: 'lista',
          items: [
            'Las costuras se esconden; no se evitan.',
            'Un desplegado con islas grandes y pocas suele ser mejor que muchas islas pequeñas.',
            'El margen entre islas evita que el filtrado tome píxeles de la vecina.',
            'Los mapas de datos no llevan sRGB, ni en Blender ni en three.js.',
            'Si el material usa nodos que glTF no entiende, el exportador avisa o lo simplifica.',
          ],
        },
      ],
      errores: [
        {
          sintoma: 'La textura se ve borrosa en una cara y nítida en otra.',
          causa: 'Densidad de texels desigual entre islas.',
          arreglo: '`Average Island Scale` y vuelve a empaquetar.',
        },
        {
          sintoma: 'Aparecen manchas que no están pintadas.',
          causa: 'Dos islas solapadas comparten píxeles.',
          arreglo: 'Revisa el desplegado con el tablero de ajedrez y separa las islas.',
        },
        {
          sintoma: 'El material se ve distinto en Blender y en la web.',
          causa: 'Nodos no compatibles con glTF o espacios de color mal declarados al cargar.',
          arreglo: 'Usa el material principled y declara `colorSpace` al cargar en three.js.',
        },
      ],
      quiz: [
        {
          tipo: 'unica',
          enunciado: '¿Qué es una costura en un desplegado?',
          opciones: [
            'Una arista por la que se abre la malla',
            'Un tipo de material',
            'Un hueso del rig',
            'Una luz',
          ],
          correcta: 0,
          explicacion: 'Define dónde se corta la superficie para poder extenderla.',
        },
        {
          tipo: 'verdadero-falso',
          enunciado: 'Un desplegado puede tener islas solapadas si no se nota.',
          correcta: false,
          explicacion: 'Se notará: dos caras comparten los mismos píxeles.',
        },
        {
          tipo: 'multiple',
          enunciado: '¿Qué compruebas con el tablero de ajedrez?',
          opciones: [
            'Estiramientos',
            'Densidad desigual',
            'Solapes',
            'El número de triángulos',
          ],
          correctas: [0, 1, 2],
          explicacion: 'La topología se mide en otra vista.',
        },
        {
          tipo: 'unica',
          enunciado: '¿En qué canal del ORM va la metalicidad en glTF?',
          opciones: ['Azul', 'Rojo', 'Verde', 'Alfa'],
          correcta: 0,
          explicacion: 'Rojo: oclusión; verde: rugosidad; azul: metalicidad.',
        },
      ],
      recursos: [
        {
          titulo: 'Blender Manual: UV unwrapping',
          url: 'https://docs.blender.org/manual/en/latest/modeling/meshes/uv/unwrapping/index.html',
          nota: 'Costuras, desplegado y empaquetado.',
        },
        {
          titulo: 'glTF 2.0: materials',
          url: 'https://registry.khronos.org/glTF/specs/2.0/glTF-2.0.html#materials',
          nota: 'El material metallic-roughness y el empaquetado ORM.',
        },
        {
          titulo: 'Poly Haven: textures',
          url: 'https://polyhaven.com/textures',
          nota: 'Texturas CC0 para practicar el desplegado con material real.',
        },
      ],
      ejercicio: {
        reto: 'Genera en canvas una textura de tablero de ajedrez y proyéctala en una esfera. Decide si el patrón se estira en los polos y por qué.',
        inicial: `import { useMemo } from 'react'
import { Canvas } from '@react-three/fiber'
import * as THREE from 'three'

export default function App() {
  const textura = useMemo(() => {
    const c = document.createElement('canvas')
    c.width = 256
    c.height = 256
    const ctx = c.getContext('2d')!
    for (let y = 0; y < 8; y++) {
      for (let x = 0; x < 8; x++) {
        ctx.fillStyle = (x + y) % 2 === 0 ? '#d8dee9' : '#2b3554'
        ctx.fillRect(x * 32, y * 32, 32, 32)
      }
    }
    const t = new THREE.CanvasTexture(c)
    t.colorSpace = THREE.SRGBColorSpace
    return t
  }, [])

  return (
    <div style={{ height: 320 }}>
      <Canvas camera={{ position: [0, 0, 3.4] }} frameloop="always">
        <ambientLight intensity={0.7} />
        <mesh>
          <sphereGeometry args={[1.1, 48, 32]} />
          {/* TODO: aplica la textura */}
          <meshStandardMaterial color="#8892a6" />
        </mesh>
      </Canvas>
    </div>
  )
}`,
        solucion: `import { useMemo } from 'react'
import { Canvas } from '@react-three/fiber'
import * as THREE from 'three'

export default function App() {
  const textura = useMemo(() => {
    const c = document.createElement('canvas')
    c.width = 256
    c.height = 256
    const ctx = c.getContext('2d')!
    for (let y = 0; y < 8; y++) {
      for (let x = 0; x < 8; x++) {
        ctx.fillStyle = (x + y) % 2 === 0 ? '#d8dee9' : '#2b3554'
        ctx.fillRect(x * 32, y * 32, 32, 32)
      }
    }
    const t = new THREE.CanvasTexture(c)
    t.colorSpace = THREE.SRGBColorSpace
    return t
  }, [])

  return (
    <div style={{ height: 320 }}>
      <Canvas camera={{ position: [0, 0, 3.4] }} frameloop="always">
        <ambientLight intensity={0.7} />
        <mesh>
          <sphereGeometry args={[1.1, 48, 32]} />
          <meshStandardMaterial map={textura} roughness={0.6} />
        </mesh>
      </Canvas>
    </div>
  )
}`,
        pistas: [
          'La esfera tiene UVs propios: cada triángulo del ecuador ocupa más ancho que uno del polo.',
          'El estiramiento en los polos es del desplegado, no de la textura.',
          'Prueba `sphereGeometry` con menos segmentos para verlo más exagerado.',
        ],
      },
    },
    {
      id: '8.8',
      modulo: 8,
      titulo: 'Blender III: rigging y animación',
      objetivo:
        'Distinguir animación de nodos de animación esqueletal, y exportar clips con nombre y duración correctas.',
      nivel: 'alto',
      minutos: 100,
      bloques: [
        {
          tipo: 'parrafo',
          texto:
            'Hay dos formas de animar un modelo. La primera mueve nodos enteros: `saludar` rota el nodo del hombro y toda la geometría hija le sigue. La segunda deforma vértices con un `Armature`: los huesos mueven la malla según pesos por vértice. La primera es barata y suficiente para máquinas; la segunda hace falta para personas y telas.',
        },
        {
          tipo: 'descarga',
          archivos: [
            {
              nombre: 'robot.glb',
              href: 'modelos/robot.glb',
              descripcion: 'La malla del robot sin esqueleto: el punto de partida para practicar pesos.',
            },
            {
              nombre: 'rover.glb',
              href: 'modelos/rover.glb',
              descripcion: 'Con dos clips de nodo (`desplegar_panel`, `girar_antena`) para comparar ambas técnicas.',
            },
          ],
        },
        { tipo: 'demo', id: 'm8-rig', titulo: 'Los pivotes que se mueven en el robot del curso' },
        {
          tipo: 'parrafo',
          texto:
            'El robot de esta web no tiene huesos: sus dos clips rotan `hombro_der` y `cabeza`. Por eso los ejes que se dibujan viajan con el nodo y la pieza se mueve rígida. Un modelo riggeado tendría un `SkinnedMesh`, una lista de huesos y un atributo de pesos; el resultado en pantalla puede ser idéntico, pero el archivo pesa más y la GPU calcula más por vértice.',
        },
        {
          tipo: 'pasos',
          items: [
            {
              titulo: '1. Prepara la malla',
              texto:
                'La malla debe estar limpia: sin caras interiores, con la topología suficiente en las articulaciones. Un codo con dos aristas no se dobla, se parte.',
            },
            {
              titulo: '2. Crea el armature',
              texto:
                'Añade un `Armature` y extruye huesos desde la raíz. Cada hueso tiene un nombre; esos nombres viajan al glTF y son los que buscarás en `nodes`.',
            },
            {
              titulo: '3. Pesa los vértices',
              texto:
                'Padre la malla con `Armature Deform → With Automatic Weights` y corrige a mano los pesos donde la deformación se rompa. Un peso mal puesto se ve como un pellizco.',
            },
            {
              titulo: '4. Anima en pose mode',
              texto:
                'Un clip es una acción. Nombra cada acción (`saludar`, `asentir`) y ajusta su duración; el nombre es lo que `useAnimations` recibe.',
            },
            {
              titulo: '5. Exporta los clips',
              texto:
                'En el exportador de glTF, activa `Animation` y elige `Actions`. Comprueba en el visor que aparecen los clips con su nombre y que la duración no se ha multiplicado por la tasa de frames.',
            },
          ],
        },
        {
          tipo: 'tabla',
          cabecera: ['Tipo', 'Qué mueve', 'Peso', 'Cuándo'],
          filas: [
            ['Nodo (TRS)', 'Objetos enteros', 'Muy bajo', 'Máquinas, puertas, cámaras'],
            ['Esqueletal', 'Vértices por pesos', 'Medio-alto', 'Personajes, animales, telas'],
            ['Morph targets', 'Formas alternativas', 'Alto', 'Caras, expresiones'],
          ],
        },
        {
          tipo: 'destacado',
          tono: 'ojo',
          titulo: 'Los nombres de clip son API',
          texto:
            '`actions.saludar` solo existe si el clip se llama exactamente `saludar`. Renombrar en Blender y olvidar el cambio en React produce un `undefined` silencioso: el modelo se queda quieto y no hay error. Fija los nombres al exportar y trátalos como parte del contrato.',
        },
        {
          tipo: 'lista',
          items: [
            'Un armature sin pesos deforma nada: la malla se queda rígida.',
            'Los pesos se normalizan: la suma por vértice debe ser 1.',
            'Los clips de una sola pasada necesitan `LoopOnce` y `clampWhenFinished`.',
            'Puedes tener varios clips en un GLB y reproducirlos con el mismo mixer.',
            'Exporta con `Apply Modifiers` y sin animaciones de cámara o luz si no las usas.',
          ],
        },
      ],
      errores: [
        {
          sintoma: 'El personaje se deforma como chicle al doblar un codo.',
          causa: 'Pesos automáticos mal repartidos o topología insuficiente.',
          arreglo: 'Corrige pesos a mano y añade aristas de soporte en la articulación.',
        },
        {
          sintoma: 'El clip se reproduce al doble de velocidad.',
          causa: 'Duración exportada en frames en lugar de segundos, o `timeScale` alterado.',
          arreglo: 'Revisa la duración del clip y no toques `timeScale` sin motivo.',
        },
        {
          sintoma: 'En la web no aparece ninguna animación.',
          causa: 'Se exportó la malla sin el armature o sin las acciones.',
          arreglo: 'Exporta con `Animation` activo y comprueba `animations` en el GLB.',
        },
      ],
      quiz: [
        {
          tipo: 'unica',
          enunciado: '¿Qué diferencia la animación de nodos de la esqueletal?',
          opciones: [
            'La primera mueve objetos; la segunda deforma vértices con pesos',
            'La primera es más cara',
            'La segunda no se puede exportar',
            'Son lo mismo',
          ],
          correcta: 0,
          explicacion: 'Un nodo se transforma entero; un hueso deforma la malla.',
        },
        {
          tipo: 'verdadero-falso',
          enunciado: 'Un `SkinnedMesh` siempre pesa menos que una animación de nodos.',
          correcta: false,
          explicacion: 'Añade huesos, pesos y cálculo por vértice.',
        },
        {
          tipo: 'multiple',
          enunciado: '¿Qué hay que revisar al exportar un rig?',
          opciones: [
            'Nombres de los clips',
            'Que el armature esté incluido',
            'La duración de cada acción',
            'Que la cámara esté animada',
          ],
          correctas: [0, 1, 2],
          explicacion: 'La cámara no forma parte del modelo.',
        },
        {
          tipo: 'unica',
          enunciado: '¿Qué pasa si el nombre del clip no coincide?',
          opciones: [
            '`actions.nombre` es `undefined` y no se reproduce nada',
            'Se reproduce el primer clip',
            'three.js lanza un error de compilación',
            'Se duplica el modelo',
          ],
          correcta: 0,
          explicacion: 'El diccionario de acciones se indexa por el nombre exacto.',
        },
      ],
      recursos: [
        {
          titulo: 'Blender Manual: armatures',
          url: 'https://docs.blender.org/manual/en/latest/animation/armatures/index.html',
          nota: 'Huesos, pose mode y pesos.',
        },
        {
          titulo: 'Blender: glTF animations',
          url: 'https://docs.blender.org/manual/en/latest/addons/import_export/scene_gltf2.html#animations',
          nota: 'Cómo se exportan las acciones y los nombres.',
        },
        {
          titulo: 'three.js: SkinnedMesh',
          url: 'https://threejs.org/docs/#api/en/objects/SkinnedMesh',
          nota: 'Lo que hay al otro lado cuando el modelo sí tiene huesos.',
        },
      ],
      ejercicio: {
        reto: 'Anima dos nodos de un grupo: uno que gire y otro que suba y baje, con dos acciones separadas y un botón para alternar.',
        inicial: `import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import type { Group, Mesh } from 'three'

export default function App() {
  const gira = useRef<Group>(null)
  const sube = useRef<Mesh>(null)

  useFrame((estado) => {
    // TODO: gira el grupo y haz que la esfera suba y baje
    void estado
  })

  return (
    <div style={{ height: 320 }}>
      <Canvas camera={{ position: [2.6, 2, 3.6] }} frameloop="always">
        <ambientLight intensity={0.6} />
        <directionalLight position={[3, 4, 2]} intensity={2} />
        <group ref={gira}>
          <mesh position={[-0.6, 0, 0]}>
            <boxGeometry args={[0.6, 0.6, 0.6]} />
            <meshStandardMaterial color="#4d8df6" />
          </mesh>
        </group>
        <mesh ref={sube} position={[0.6, 0, 0]}>
          <sphereGeometry args={[0.35, 32, 24]} />
          <meshStandardMaterial color="#f5a524" />
        </mesh>
      </Canvas>
    </div>
  )
}`,
        solucion: `import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import type { Group, Mesh } from 'three'

export default function App() {
  const gira = useRef<Group>(null)
  const sube = useRef<Mesh>(null)

  useFrame((estado) => {
    const t = estado.clock.getElapsedTime()
    if (gira.current) gira.current.rotation.y = t * 1.2
    if (sube.current) sube.current.position.y = Math.sin(t * 2) * 0.35
  })

  return (
    <div style={{ height: 320 }}>
      <Canvas camera={{ position: [2.6, 2, 3.6] }} frameloop="always">
        <ambientLight intensity={0.6} />
        <directionalLight position={[3, 4, 2]} intensity={2} />
        <group ref={gira}>
          <mesh position={[-0.6, 0, 0]}>
            <boxGeometry args={[0.6, 0.6, 0.6]} />
            <meshStandardMaterial color="#4d8df6" />
          </mesh>
        </group>
        <mesh ref={sube} position={[0.6, 0, 0]}>
          <sphereGeometry args={[0.35, 32, 24]} />
          <meshStandardMaterial color="#f5a524" />
        </mesh>
      </Canvas>
    </div>
  )
}`,
        pistas: [
          'Un nodo animado equivale a un `Object3D` con TRS cambiante.',
          'El reloj de R3F da el tiempo en segundos: úsalo para que la velocidad no dependa de los FPS.',
          'Aquí no hay mixer: es animación procedural, la misma que harías con clips.',
        ],
      },
    },
    {
      id: '8.9',
      modulo: 8,
      titulo: 'Optimizar: gltf-transform, Draco y KTX2',
      objetivo:
        'Reducir el peso de un modelo sin destruir la calidad y medir cada paso en lugar de confiar en la intuición.',
      nivel: 'alto',
      minutos: 80,
      bloques: [
        {
          tipo: 'parrafo',
          texto:
            'Optimizar un GLB es una cadena de tres pasos que se pueden medir por separado: quitar lo que sobra (`prune`), unir lo idéntico (`dedup`) y comprimir la geometría (`draco`). El orden importa: comprimir antes de deduplicar deja duplicados comprimidos. Y ninguna de las tres cosas toca las texturas, que suelen ser el verdadero peso.',
        },
        { tipo: 'widget', id: 'm8-optimizar', titulo: 'Los seis modelos del curso, antes y después' },
        {
          tipo: 'codigo',
          lenguaje: 'bash',
          titulo: 'La cadena, con números de este curso',
          codigo: `# 1. dedup: fusiona mallas idénticas
npx gltf-transform dedup rover.glb rover-dedup.glb

# 2. prune: borra lo que no se usa
npx gltf-transform prune rover-dedup.glb rover-prune.glb

# 3. draco: comprime la geometría (14/10/12 bits)
npx gltf-transform draco rover-prune.glb rover-draco.glb \\
  --encode-speed 5 --decode-speed 5

# Medir antes de aceptar
node assets-src/modelos/inspeccionar.mjs

# KTX2 para texturas: comandos y cifras de este curso
toktx --t2 --encode etc1s --clevel 4 --qlevel 128 --genmipmap \\
  texturas/hormigon-color.ktx2 texturas/hormigon-color.png

# Las normales son lineales, no sRGB: hay que declararlo o toktx se niega
toktx --t2 --encode etc1s --clevel 4 --qlevel 128 \\
  --assign_oetf linear --normal_mode \\
  texturas/hormigon-normal.ktx2 texturas/hormigon-normal.png

# Y dentro de un GLB, con gltf-transform
npx gltf-transform etc1s entrada.glb salida.glb`,
        },
        {
          tipo: 'tabla',
          cabecera: ['Modelo', 'Original', 'Con Draco', 'Ahorro'],
          filas: [
            ['rover', '83,4 KB', '16,8 KB', '−80 %'],
            ['taller', '123,8 KB', '19,9 KB', '−84 %'],
            ['lampara', '52,6 KB', '10,5 KB', '−80 %'],
            ['caja', '21,1 KB', '5,3 KB', '−75 %'],
            ['tuerca', '7,8 KB', '1,6 KB', '−80 %'],
            ['robot', '37,7 KB', '11,9 KB', '−68 %'],
          ],
        },
        {
          tipo: 'tabla',
          cabecera: ['Textura', 'PNG', 'KTX2', 'Ahorro'],
          filas: [
            ['hormigon-color 512² (ETC1S, sin mips)', '70,3 KB', '13,7 KB', '−80 %'],
            ['hormigon-color 512² (ETC1S, con mips)', '70,3 KB', '23,0 KB', '−67 %'],
            ['hormigon-normal 256² (ETC1S, `--normal_mode`)', '90,9 KB', '18,8 KB', '−79 %'],
            ['madera-color 512² (UASTC + zstd)', '134,0 KB', '148,5 KB', '+11 %'],
          ],
        },
        { tipo: 'demo', id: 'm8-ktx2', titulo: 'La misma textura, en PNG y en KTX2' },
        {
          tipo: 'destacado',
          tono: 'porque',
          titulo: 'KTX2 no es «PNG pero más pequeño»',
          texto:
            'El PNG se descomprime en memoria y se sube a la GPU como RGBA de 8 bits: una textura de 512 × 512 ocupa 1 MB de VRAM, pese a los 70 KB del archivo. El `.ktx2` se queda comprimido en un formato que la GPU lee directamente (ETC1S o UASTC, transcodificados a BC7, ASTC o ETC2), así que también ahorra memoria de vídeo. Y **no siempre ahorra peso**: UASTC conserva mucho más detalle y, en una textura sintética como la madera de este curso, sale un 11 % más grande que el PNG. Está medido con `toktx` 4.4.2, no estimado.',
        },
        {
          tipo: 'codigo',
          lenguaje: 'tsx',
          titulo: 'Cargarla en R3F',
          codigo: `import { useKTX2 } from '@react-three/drei'

function Panel({ mapa }: { mapa: THREE.Texture }) {
  return (
    <mesh>
      <planeGeometry args={[1, 1]} />
      <meshStandardMaterial map={mapa} />
    </mesh>
  )
}

function Hormigon() {
  // Segundo argumento: carpeta del transcoder de Basis. Aquí se sirve desde
  // public/basis/ porque el curso no depende de un CDN externo.
  const mapa = useKTX2(KTX2.hormigonColor, BASIS)
  return <Panel mapa={mapa} />
}`,
        },
        {
          tipo: 'lista',
          items: [
            'Mide siempre el mismo archivo y con la misma herramienta antes y después.',
            'Draco reduce peso de descarga y añade tiempo de decodificación en el cliente.',
            'La decodificación de Draco cuesta CPU al cargar, no en cada frame.',
            'Si el modelo se ve mal tras Draco, sube la precisión (16/12/12) antes de culpar al material.',
            'Las texturas no las toca Draco: para eso está KTX2 o bajar la resolución.',
            'ETC1S para color y rugosidad; UASTC para normales o detalle fino. ETC1S en una normal se nota.',
            'Genera mipmaps con `--genmipmap` o la textura parpadeará al alejar la cámara.',
          ],
        },
      ],
      errores: [
        {
          sintoma: 'El modelo pesa menos pero tarda más en aparecer.',
          causa: 'El tiempo de decodificación de Draco supera lo que ahorra la descarga.',
          arreglo: 'Comprueba el perfil de red; en 3G compensa, en local puede no compensar.',
        },
        {
          sintoma: 'Tras Draco, las normales se ven facetadas.',
          causa: 'Cuantización demasiado agresiva en las normales.',
          arreglo: 'Sube los bits de normales (por ejemplo 10 → 12) y vuelve a medir.',
        },
        {
          sintoma: 'El GLB optimizado no carga en la web.',
          causa: 'Falta el decodificador de Draco en `public/draco/`.',
          arreglo: 'Copia los decodificadores y configura `useGLTF.setDecoderPath`.',
        },
        {
          sintoma: 'La textura `.ktx2` da 404 con `basis_transcoder.wasm` o se queda en negro.',
          causa: '`KTX2Loader` busca el transcoder de Basis en otra carpeta o en un CDN que no existe.',
          arreglo:
            'Pasa la carpeta como segundo argumento: `useKTX2(url, rutaAsset("basis/"))`, y comprueba que `basis_transcoder.js` y `.wasm` están en `public/basis/`.',
        },
      ],
      quiz: [
        {
          tipo: 'unica',
          enunciado: '¿Qué hace `prune`?',
          opciones: [
            'Elimina datos no usados',
            'Comprime la geometría',
            'Reduce las texturas',
            'Añade animaciones',
          ],
          correcta: 0,
          explicacion: 'Borra accessors, materiales y nodos que nadie referencia.',
        },
        {
          tipo: 'verdadero-falso',
          enunciado: 'Draco también comprime las texturas.',
          correcta: false,
          explicacion: 'Solo geometría; para texturas está KTX2.',
        },
        {
          tipo: 'multiple',
          enunciado: '¿Qué hay que medir después de optimizar?',
          opciones: [
            'Peso del archivo',
            'Calidad visual',
            'Tiempo de decodificación',
            'Número de luces',
          ],
          correctas: [0, 1, 2],
          explicacion: 'Las luces no forman parte del modelo.',
        },
        {
          tipo: 'unica',
          enunciado: 'Además del peso del archivo, ¿qué ahorra KTX2 frente a un PNG?',
          opciones: [
            'Memoria de GPU: la textura sigue comprimida en VRAM',
            'Tiempo de modelado',
            'Draw calls',
            'Nada más, solo peso',
          ],
          correcta: 0,
          explicacion:
            'Un PNG de 512 × 512 ocupa 1 MB de VRAM como RGBA8; el .ktx2 se transcodifica a un formato comprimido de la GPU.',
        },
      ],
      recursos: [
        {
          titulo: 'gltf-transform: CLI',
          url: 'https://gltf-transform.dev/cli',
          nota: '`dedup`, `prune`, `draco`, `etc1s`, `uastc`.',
        },
        {
          titulo: 'gltf-transform: Draco',
          url: 'https://gltf-transform.dev/modules/draco',
          nota: 'Qué significa cada nivel de compresión.',
        },
        {
          titulo: 'Khronos: KTX2',
          url: 'https://github.com/KhronosGroup/KTX-Software',
          nota: '`toktx` 4.4.2 es la versión con la que se midieron las cifras de la tabla.',
        },
      ],
      ejercicio: {
        reto: 'Escribe una función que, dado un tamaño original y uno comprimido, devuelva el ahorro y el veredicto (útil si ahorra más del 60 %). Sin modelos reales.',
        inicial: `type Medida = { nombre: string; original: number; comprimido: number }

const medidas: Medida[] = [
  { nombre: 'rover', original: 83.4, comprimido: 16.8 },
  { nombre: 'robot', original: 37.7, comprimido: 11.9 },
]

// TODO: devuelve nombre, ahorro en % y si merece la pena (> 60 %)
console.log(medidas)`,
        solucion: `type Medida = { nombre: string; original: number; comprimido: number }

const medidas: Medida[] = [
  { nombre: 'rover', original: 83.4, comprimido: 16.8 },
  { nombre: 'robot', original: 37.7, comprimido: 11.9 },
]

const informe = medidas.map((medida) => {
  const ahorro = 1 - medida.comprimido / medida.original
  return {
    nombre: medida.nombre,
    ahorro: Math.round(ahorro * 100),
    mereceLaPena: ahorro > 0.6,
  }
})

console.log(informe)`,
        pistas: [
          'El ahorro es `1 - comprimido / original`.',
          'Redondea solo al mostrar: no redondees antes de comparar.',
          'El umbral del 60 % es una decisión de producto, no una ley física.',
        ],
      },
    },
    {
      id: '8.10',
      modulo: 8,
      titulo: 'Los 10 errores con modelos',
      objetivo:
        'Diagnosticar los fallos clásicos de carga y montaje con un procedimiento, no por prueba y error.',
      nivel: 'medio',
      minutos: 70,
      bloques: [
        {
          tipo: 'parrafo',
          texto:
            'Casi todos los problemas con modelos se reducen a cinco preguntas: ¿llegó el archivo?, ¿se decodificó?, ¿está en cámara?, ¿tiene la escala correcta?, ¿el material espera algo que no hay? La demo reproduce cuatro de los diez errores porque los otros seis rompen la carga antes de dibujar y no se pueden enseñar en pantalla. La tabla los recoge todos con síntoma, causa y arreglo.',
        },
        { tipo: 'demo', id: 'm8-errores', titulo: 'Cuatro fallos visibles, uno por interruptor' },
        {
          tipo: 'tabla',
          cabecera: ['Error', 'Síntoma', 'Causa', 'Arreglo'],
          filas: [
            ['1. Ruta rota', '404 en consola, nada en escena', 'Ruta absoluta o `base` mal', '`rutaAsset`'],
            ['2. Falta Draco', 'Error de decodificador', '`public/draco/` ausente', 'Copiar decodificadores'],
            ['3. Sin `Suspense`', 'Aviso de suspensión', 'Hook fuera de límite', 'Envolver en `Suspense`'],
            ['4. Escala', 'Modelo invisible o gigante', 'Unidades del DCC', 'Aplicar escala y ajustar'],
            ['5. Pivote', 'Flota o se hunde', 'Origen lejos del objeto', 'Recolocar origen en el DCC'],
            ['6. Fuera de cámara', 'Escena vacía', 'Cámara dentro o lejos', '`Bounds` o encuadrar a mano'],
            ['7. `scene` compartido', 'Otra demo sale modificada', 'Mutar la caché', 'Clonar antes de tocar'],
            ['8. Metal negro', 'Superficie casi negra', '`metalness` 1 sin entorno', 'HDRI o bajar metalness'],
            ['9. Doble copia', 'Parpadeo en caras', 'Dos mallas en el mismo plano', 'Separar o quitar una'],
            ['10. Color lavado', 'Textura sin contraste', '`colorSpace` incorrecto', 'sRGB en color, lineal en datos'],
          ],
        },
        {
          tipo: 'pasos',
          items: [
            {
              titulo: '1. ¿Está el archivo?',
              texto:
                'Abre la URL del modelo en una pestaña. Si da 404, ningún código lo va a arreglar: revisa `rutaAsset` y el `base`.',
            },
            {
              titulo: '2. ¿Se decodifica?',
              texto:
                'Si la petición es 200 y falla igual, mira si el GLB usa Draco o Meshopt. Sin decodificador, el error aparece antes de dibujar.',
            },
            {
              titulo: '3. ¿Está en pantalla?',
              texto:
                'Sustituye el modelo por una caja de 1 unidad en el origen. Si la caja se ve, el problema es de escala, pivote o cámara.',
            },
            {
              titulo: '4. ¿Se ve la geometría?',
              texto:
                'Pon `meshNormalMaterial` en todo. Si aparece la forma, el fallo es de material o de luz. Si no aparece, es de transformación.',
            },
            {
              titulo: '5. ¿Qué cambió desde la última vez que funcionó?',
              texto:
                'Modelos, rutas y versiones de three.js son las tres fuentes habituales. Aísla una cada vez.',
            },
          ],
        },
        {
          tipo: 'destacado',
          tono: 'truco',
          titulo: 'La caja de calibración',
          texto:
            'Ten siempre una escena de prueba con una caja de 1×1×1 en el origen, una luz y una cámara a 3 unidades. Cuando un modelo no aparece, móntalo junto a la caja: si la caja se ve y el modelo no, ya sabes que el archivo está mal colocado o escalado; si no se ve nada, el problema es del canvas o de la cámara.',
        },
        {
          tipo: 'checkpoint',
          titulo: 'Antes de cerrar el módulo',
          items: [
            'Sé abrir un GLB y decir cuántos nodos, mallas y clips tiene.',
            'Cargo modelos con `useGLTF` dentro de `Suspense` y con decodificador local.',
            'Sé recorrer un modelo y modificar una pieza sin contaminar la caché.',
            'Reproduzco clips con `useAnimations` y los encadeno con fundido.',
            'Sé modelar una pieza simple, desplegarla y exportarla.',
            'He medido el peso de un GLB antes y después de Draco.',
            'Puedo diagnosticar una escena vacía con las cinco preguntas del método.',
          ],
        },
      ],
      errores: [
        {
          sintoma: 'El modelo se ve pero está enterrado en el suelo.',
          causa: 'El origen del modelo no está en la base.',
          arreglo: 'Recoloca el origen en el DCC o compensa la `position` en la escena.',
        },
        {
          sintoma: 'Al cambiar de lección, el modelo aparece con otro color.',
          causa: 'Una demo anterior mutó el `scene` cacheado.',
          arreglo: 'Clonar antes de modificar y no tocar el original.',
        },
        {
          sintoma: 'La carga funciona en local y falla en el despliegue.',
          causa: 'Rutas absolutas o decodificadores fuera del `base`.',
          arreglo: 'Prueba el build servido desde un subdirectorio, como en GitHub Pages.',
        },
      ],
      quiz: [
        {
          tipo: 'unica',
          enunciado: '¿Cuál es la primera comprobación si no aparece nada?',
          opciones: [
            'Abrir la URL del modelo en una pestaña',
            'Cambiar el material',
            'Añadir más luces',
            'Subir el `dpr`',
          ],
          correcta: 0,
          explicacion: 'Un 404 no se arregla desde la escena.',
        },
        {
          tipo: 'verdadero-falso',
          enunciado: 'Un modelo que carga en local puede fallar en GitHub Pages por la ruta.',
          correcta: true,
          explicacion: 'El `base` cambia y las rutas absolutas se rompen.',
        },
        {
          tipo: 'multiple',
          enunciado: '¿Qué causa una escena vacía con un modelo correcto?',
          opciones: [
            'Escala equivocada',
            'Cámara dentro del objeto',
            'Pivote muy lejos',
            'Un material con `roughness` alto',
          ],
          correctas: [0, 1, 2],
          explicacion: 'La rugosidad cambia el brillo, no la posición.',
        },
        {
          tipo: 'unica',
          enunciado: '¿Para qué sirve la caja de calibración?',
          opciones: [
            'Para separar problemas de archivo de problemas de canvas o cámara',
            'Para medir FPS',
            'Para comprimir el modelo',
            'Para activar sombras',
          ],
          correcta: 0,
          explicacion: 'Es un testigo conocido en una escena desconocida.',
        },
      ],
      recursos: [
        {
          titulo: 'Khronos: glTF-Validator',
          url: 'https://github.com/KhronosGroup/glTF-Validator',
          nota: 'Detecta archivos mal formados antes de culpar al código.',
        },
        {
          titulo: 'three.js: GLTFLoader troubleshooting',
          url: 'https://threejs.org/docs/#examples/en/loaders/GLTFLoader',
          nota: 'Extensiones soportadas y errores típicos.',
        },
        {
          titulo: 'gltf-transform: inspect',
          url: 'https://gltf-transform.dev/cli#inspect',
          nota: 'Ver la estructura de un GLB desde la terminal.',
        },
      ],
      ejercicio: {
        reto: 'Escribe una función de diagnóstico que reciba un estado de carga y devuelva la siguiente comprobación a hacer, en orden.',
        inicial: `type Estado = {
  urlOk: boolean
  decodificadorOk: boolean
  suspensoOk: boolean
  visible: boolean
}

// TODO: devuelve la primera comprobación que falla, en este orden:
// url → decodificador → suspenso → visibilidad
export function diagnosticar(estado: Estado): string {
  return 'sin diagnóstico'
}

console.log(diagnosticar({ urlOk: true, decodificadorOk: false, suspensoOk: true, visible: false }))`,
        solucion: `type Estado = {
  urlOk: boolean
  decodificadorOk: boolean
  suspensoOk: boolean
  visible: boolean
}

export function diagnosticar(estado: Estado): string {
  if (!estado.urlOk) return 'El archivo no llega: revisa la ruta y el base.'
  if (!estado.decodificadorOk) return 'El archivo llega pero no se decodifica: revisa Draco.'
  if (!estado.suspensoOk) return 'Falta un Suspense por encima del componente.'
  if (!estado.visible) return 'El modelo carga pero no se ve: escala, pivote o cámara.'
  return 'Todo correcto: el fallo estará en el material o en la luz.'
}

console.log(diagnosticar({ urlOk: true, decodificadorOk: false, suspensoOk: true, visible: false }))`,
        pistas: [
          'El orden importa: no tiene sentido comprobar la cámara si el archivo no llegó.',
          'Devuelve una frase accionable, no un código numérico.',
          'El último caso no es «todo bien»: es «queda el material».',
        ],
      },
    },
  ],
}

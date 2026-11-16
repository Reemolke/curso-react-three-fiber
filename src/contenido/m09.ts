import type { Modulo } from './tipos'

export const modulo9: Modulo = {
  numero: 9,
  titulo: 'Drei: el catálogo de atajos',
  descripcion:
    'La librería que evita reescribir controles, textos, etiquetas y optimizaciones: qué hay, cuándo usarlo y cuánto cuesta cada atajo.',
  lecciones: [
    {
      id: '9.1',
      modulo: 9,
      titulo: 'Drei: el mapa de atajos',
      objetivo:
        'Saber qué problema resuelve drei, cómo importar sin inflar el bundle y cuándo conviene no usarlo.',
      nivel: 'intro',
      minutos: 40,
      bloques: [
        {
          tipo: 'parrafo',
          texto:
            'drei es a three.js lo que una caja de herramientas a un taller: no añade capacidades nuevas, ahorra las mismas cien líneas que todo el mundo escribe. Está hecho de componentes y hooks que envuelven patrones comunes: controles de cámara, carga de assets, texto, instancias, sombras de contacto. Usar drei no es hacer trampa; es no reimplementar lo que ya está probado.',
        },
        { tipo: 'widget', id: 'm9-catalogo', titulo: 'Busca el componente que resuelve tu problema' },
        {
          tipo: 'parrafo',
          texto:
            'La tentación es importar de todo. Cada componente arrastra dependencias: `Text` trae troika, `Environment` trae el cargador de HDR, `View` trae el sistema de túneles. Con imports con nombre y el troceado de Vite, solo entra en el bundle lo que se usa, pero un componente cargado en la portada sí pesa. La regla es la de siempre: importar donde se usa, no en un archivo de barril.',
        },
        {
          tipo: 'codigo',
          lenguaje: 'tsx',
          titulo: 'Importar bien',
          codigo: `// Bien: el import con nombre permite el tree-shaking.
import { OrbitControls, Text, useTexture } from '@react-three/drei'

// Mal: un barril propio que reexporta drei entero impide descartar lo no usado.
// export * from '@react-three/drei'

// Lo que no es un componente también está:
import { useGLTF, useAnimations, useProgress } from '@react-three/drei'`,
        },
        {
          tipo: 'tabla',
          cabecera: ['Categoría', 'Qué entra', 'Cuándo tirar de drei'],
          filas: [
            ['Cámara', '`OrbitControls`, `FlyControls`, `CameraControls`', 'Casi siempre'],
            ['Carga', '`useGLTF`, `useTexture`, `useProgress`, `Preload`', 'Siempre'],
            ['Escena', '`Center`, `Bounds`, `Environment`, `Stage`, `Grid`', 'Prototipos y producto'],
            ['Texto y UI', '`Text`, `Text3D`, `Html`, `Billboard`', 'Cuando hay etiquetas'],
            ['Rendimiento', '`Instances`, `Clone`, `Detailed`, `Bvh`', 'Con muchos objetos'],
          ],
        },
        {
          tipo: 'destacado',
          tono: 'ojo',
          titulo: 'Drei no sustituye a entender three.js',
          texto:
            'Todos los componentes de drei devuelven objetos de three.js: `OrbitControls` monta un `OrbitControls`, `Text` monta una `Mesh` con una geometría generada. Si no sabes qué hay debajo, no vas a poder depurarlo cuando falle. Este curso enseña primero el objeto y después el atajo.',
        },
        {
          tipo: 'lista',
          items: [
            'Un componente de drei es siempre un objeto de three.js con props de React.',
            'Los hooks de carga (`useGLTF`, `useTexture`) cachean por URL.',
            'Muchos componentes aceptan `ref` y exponen métodos imperativos (`fit`, `reset`).',
            'Si un componente de drei no encaja, casi siempre puedes montar el objeto de three.js a mano.',
            'La documentación de drei está separada por categorías y suele incluir el código fuente.',
          ],
        },
      ],
      errores: [
        {
          sintoma: 'El bundle crece cientos de kB después de «usar solo un componente».',
          causa: 'Se importó desde un barril propio o desde el paquete entero.',
          arreglo: 'Importa con nombre desde `@react-three/drei` en el archivo que lo usa.',
        },
        {
          sintoma: '«R3F: X is not part of the THREE namespace».',
          causa: 'Se usó un componente de drei dentro del `<Canvas>` sin importarlo de drei (o se puso HTML dentro del canvas).',
          arreglo: 'Comprueba el import y que el elemento sea de three o de drei, no HTML.',
        },
        {
          sintoma: 'Los controles de cámara se comen el scroll de la página.',
          causa: '`OrbitControls` captura la rueda dentro del canvas.',
          arreglo: 'Desactiva `enableZoom` o monta el canvas a pantalla completa solo cuando toque.',
        },
      ],
      quiz: [
        {
          tipo: 'unica',
          enunciado: '¿Qué es drei?',
          opciones: [
            'Un conjunto de componentes y hooks sobre three.js y R3F',
            'Un motor 3D distinto',
            'Un compilador de GLSL',
            'Un formato de modelo',
          ],
          correcta: 0,
          explicacion: 'No añade un motor: envuelve patrones de three.js en componentes.',
        },
        {
          tipo: 'verdadero-falso',
          enunciado: 'Usar un componente de drei evita tener que entender three.js.',
          correcta: false,
          explicacion: 'Por debajo sigue habiendo objetos de three.js que hay que saber depurar.',
        },
        {
          tipo: 'multiple',
          enunciado: '¿Qué componentes de drei se usan en este curso?',
          opciones: ['`OrbitControls`', '`useGLTF`', '`Instances`', '`WebGPURenderer`'],
          correctas: [0, 1, 2],
          explicacion: 'El renderer no es un componente de drei.',
        },
        {
          tipo: 'unica',
          enunciado: '¿Por qué importar con nombre y no desde un barril?',
          opciones: [
            'Para que el bundler pueda descartar lo que no se usa',
            'Porque el barril no compila en TypeScript',
            'Para cargar más rápido en desarrollo',
            'Porque drei lo prohíbe',
          ],
          correcta: 0,
          explicacion: 'El tree-shaking necesita ver los imports reales.',
        },
      ],
      recursos: [
        {
          titulo: 'drei: documentación',
          url: 'https://drei.docs.pmnd.rs/',
          nota: 'Catálogo por categorías, con ejemplos por componente.',
        },
        {
          titulo: 'drei: repositorio',
          url: 'https://github.com/pmndrs/drei',
          nota: 'Cada componente está en `src/core`; leerlo es la mejor documentación.',
        },
        {
          titulo: 'R3F: ecosistema',
          url: 'https://r3f.docs.pmnd.rs/getting-started/ecosystem',
          nota: 'Qué piezas forman el stack de pmndrs y cómo encajan.',
        },
      ],
      ejercicio: {
        reto: 'Escribe una función que, dado un nombre de componente, diga si es de three.js, de drei o HTML. Sirve para el error clásico de meter `<div>` dentro del canvas.',
        inicial: `const conocidos = {
  mesh: 'three',
  group: 'three',
  OrbitControls: 'drei',
  Text: 'drei',
  div: 'html',
  span: 'html',
}

// TODO: devuelve 'three', 'drei', 'html' o 'desconocido'
export function clasificar(nombre: string): string {
  return 'desconocido'
}

console.log(clasificar('Text'), clasificar('mesh'), clasificar('div'))`,
        solucion: `const conocidos: Record<string, string> = {
  mesh: 'three',
  group: 'three',
  OrbitControls: 'drei',
  Text: 'drei',
  div: 'html',
  span: 'html',
}

export function clasificar(nombre: string): string {
  return conocidos[nombre] ?? 'desconocido'
}

console.log(clasificar('Text'), clasificar('mesh'), clasificar('div'))`,
        pistas: [
          'Un objeto literal con `Record<string, string>` es suficiente.',
          'El operador `??` devuelve el valor de la derecha solo si el de la izquierda es `undefined`.',
          'En R3F, un elemento desconocido lanza el error de «not part of the THREE namespace».',
        ],
      },
    },
    {
      id: '9.2',
      modulo: 9,
      titulo: 'Texto en 3D',
      objetivo:
        'Escribir texto en la escena con una fuente local, ajustar anclaje y medidas, y saber cuándo usar `Text3D`.',
      nivel: 'medio',
      minutos: 50,
      bloques: [
        {
          tipo: 'parrafo',
          texto:
            'Hay dos formas de poner texto en una escena. `Text` genera una malla a partir de la silueta de cada glifo: es rápida, se cambia en caliente y aguanta bien tamaños pequeños. `Text3D` extruye un typeface JSON y necesita geometría por letra: pesa más, se ve mejor de cerca y permite biseles. Para etiquetas y titulares, `Text`; para una pieza tipográfica que se mira de cerca, `Text3D`.',
        },
        { tipo: 'demo', id: 'm9-tipometro', titulo: 'Cambia tamaño, interletra y anclaje' },
        {
          tipo: 'codigo',
          lenguaje: 'tsx',
          titulo: 'Texto con fuente local',
          codigo: `import { Text } from '@react-three/drei'
import { FUENTES } from '../tres/rutas'

// FUENTES.regular apunta a public/fuentes/roboto-400.woff
export function Titulo() {
  return (
    <Text
      font={FUENTES.regular}
      fontSize={0.42}
      anchorX="center"
      anchorY="middle"
      maxWidth={3.2}
      lineHeight={1.1}
      letterSpacing={0}
      color="#e8edf7"
    >
      Taller K-7
    </Text>
  )
}`,
        },
        {
          tipo: 'tabla',
          cabecera: ['Propiedad', 'Unidad', 'Qué controla'],
          filas: [
            ['`fontSize`', 'unidades de escena', 'Altura de la letra, no píxeles'],
            ['`anchorX` / `anchorY`', '—', 'Desde dónde crece el texto'],
            ['`maxWidth`', 'unidades de escena', 'Ancho máximo antes de partir línea'],
            ['`lineHeight`', 'múltiplo del tamaño', 'Distancia entre líneas'],
            ['`letterSpacing`', 'fracción del tamaño', 'Espacio entre glifos'],
          ],
        },
        {
          tipo: 'destacado',
          tono: 'porque',
          titulo: 'Por qué la fuente tiene que ser local',
          texto:
            'Troika (el motor detrás de `Text`) carga por defecto una fuente desde un CDN. Si la web tiene que funcionar sin red o en un entorno con la red restringida, el texto simplemente no aparece, sin error visible. En este curso las fuentes se copian a `public/fuentes/` con `npm run assets:fuentes` y se pasan por `font`.',
        },
        {
          tipo: 'lista',
          items: [
            'El texto con `Text` es una malla: recibe luz, proyecta sombra y se puede animar.',
            'Cada cambio de `children` regenera la malla: no lo uses para un contador a 60 fps.',
            '`Text3D` necesita un typeface JSON; este curso no lo incluye y lo explica como alternativa.',
            'El texto se mide en unidades de escena: si la cámara está lejos, hay que subir `fontSize`.',
            'Para HTML real (enlaces, botones) usa `Html`, no `Text`.',
          ],
        },
      ],
      errores: [
        {
          sintoma: 'El texto no aparece y la consola no da error.',
          causa: 'La fuente no se pudo cargar (CDN bloqueado o ruta mal).',
          arreglo: 'Copia la fuente a `public/` y pásala en `font`.',
        },
        {
          sintoma: 'El texto se sale del encuadre al crecer.',
          causa: '`anchorX` centrado: crece hacia los dos lados.',
          arreglo: 'Usa `anchorX="left"` con una posición fija.',
        },
        {
          sintoma: 'Las letras se ven borrosas o con dientes.',
          causa: 'Tamaño muy pequeño combinado con `dpr` bajo.',
          arreglo: 'Sube `fontSize` o el `dpr` del canvas antes que la resolución de la fuente.',
        },
      ],
      quiz: [
        {
          tipo: 'unica',
          enunciado: '¿Qué genera `Text` de drei?',
          opciones: [
            'Una malla a partir de la silueta de los glifos',
            'Una textura con el texto',
            'Un `<div>` flotante',
            'Un archivo de fuente',
          ],
          correcta: 0,
          explicacion: 'El texto pasa a formar parte de la escena como cualquier malla.',
        },
        {
          tipo: 'verdadero-falso',
          enunciado: '`fontSize` se mide en píxeles.',
          correcta: false,
          explicacion: 'Se mide en unidades de escena, como el resto de la geometría.',
        },
        {
          tipo: 'multiple',
          enunciado: '¿Qué controla `anchorX`?',
          opciones: [
            'Desde dónde crece el texto en horizontal',
            'El color del texto',
            'Cómo se parte en líneas',
            'La fuente usada',
          ],
          correctas: [0],
          explicacion: 'Solo el punto de anclaje horizontal; el corte lo decide `maxWidth`.',
        },
        {
          tipo: 'unica',
          enunciado: '¿Cuándo conviene `Text3D`?',
          opciones: [
            'Cuando el texto se mira de cerca y necesita volumen',
            'Siempre que haya texto',
            'Para etiquetas de interfaz',
            'Para textos largos',
          ],
          correcta: 0,
          explicacion: 'Extruir geometría por letra es caro y solo compensa de cerca.',
        },
      ],
      recursos: [
        {
          titulo: 'drei: Text',
          url: 'https://drei.docs.pmnd.rs/abstractions/text',
          nota: 'Props de troika: anclaje, ancho máximo, interletra.',
        },
        {
          titulo: 'drei: Text3D',
          url: 'https://drei.docs.pmnd.rs/abstractions/text3d',
          nota: 'Typeface JSON, bisel y altura de extrusión.',
        },
        {
          titulo: 'troika-three-text',
          url: 'https://github.com/protectwise/troika/tree/main/packages/troika-three-text',
          nota: 'Qué hay debajo de `Text` y cómo se procesa la fuente.',
        },
      ],
      ejercicio: {
        reto: 'Calcula cuántas unidades de ancho ocupa un texto aproximado: cada carácter mide 0,55 veces el tamaño y hay interletra entre caracteres.',
        inicial: `// TODO: devuelve el ancho estimado en unidades de escena.
export function anchoAproximado(texto: string, tamano: number, interletra: number): number {
  return 0
}

console.log(anchoAproximado('Taller K-7', 0.42, 0.02))`,
        solucion: `export function anchoAproximado(texto: string, tamano: number, interletra: number): number {
  const porGlifo = tamano * 0.55
  const separaciones = Math.max(0, texto.length - 1) * tamano * interletra
  return texto.length * porGlifo + separaciones
}

console.log(anchoAproximado('Taller K-7', 0.42, 0.02))`,
        pistas: [
          'El ancho por glifo se multiplica por el número de caracteres.',
          'La interletra se aplica entre caracteres, no después del último.',
          'Es una estimación: la fuente real cambia el ancho de cada letra.',
        ],
      },
    },
    {
      id: '9.3',
      modulo: 9,
      titulo: 'Helpers de escena',
      objetivo:
        'Enderezar, encuadrar y animar un modelo con `Center`, `Bounds`, `Float`, `Environment` y `Stage` sin abusar de ellos.',
      nivel: 'medio',
      minutos: 50,
      bloques: [
        {
          tipo: 'parrafo',
          texto:
            'Un modelo exportado casi nunca llega como uno quiere: el origen no está en el centro, la escala es la del DCC y la cámara no lo encuadra. `Center` recoloca el origen, `Bounds` mueve la cámara para encuadrar, `Float` añade una flotación suave y `Stage` monta un plató completo. Son atajos de composición, no correcciones del archivo: si el modelo está mal, sigue estando mal.',
        },
        { tipo: 'demo', id: 'm9-encuadrar', titulo: 'De descolocado a encuadrado' },
        {
          tipo: 'codigo',
          lenguaje: 'tsx',
          titulo: 'Encuadrar sin tocar el modelo',
          codigo: `import { Bounds, Center } from '@react-three/drei'

export function Pieza({ scene }: { scene: THREE.Group }) {
  return (
    <Bounds fit clip observe margin={1.3}>
      <Center>
        <primitive object={scene} />
      </Center>
    </Bounds>
  )
}

// Con ref, para encuadrar cuando el usuario pulse un botón:
// const bounds = useRef(null)
// <Bounds ref={bounds}>…</Bounds>
// bounds.current.fit()`,
        },
        {
          tipo: 'tabla',
          cabecera: ['Helper', 'Qué hace', 'Coste'],
          filas: [
            ['`Center`', 'Mueve los hijos para que el origen caiga en el centro', 'Mide una vez al montar'],
            ['`Bounds`', 'Coloca la cámara para encuadrar el contenido', 'Mide y recoloca'],
            ['`Float`', 'Flotación con ruido suave', 'Un `useFrame`'],
            ['`Environment`', 'Ilumina con un HDRI o una escena propia', 'Una textura de entorno'],
            ['`Stage`', 'Luces, sombras, fondo y encuadre en un componente', 'Varios objetos y una sombra'],
          ],
        },
        {
          tipo: 'destacado',
          tono: 'ojo',
          titulo: '`Environment preset` descarga de un CDN',
          texto:
            'Los presets de `Environment` (`city`, `sunset`, `warehouse`…) apuntan a archivos alojados fuera de tu web. Funciona, pero rompe el modo offline y añade una dependencia que no controlas. Aquí se usa `files={HDRIS.estudio}` con un HDRI local. Si necesitas un preset concreto, descarga el HDRI a `public/` y sírvelo tú.',
        },
        {
          tipo: 'lista',
          items: [
            '`Center` y `Bounds` miden al montar: si cambias los hijos, remonta con una `key`.',
            '`Bounds` con `observe` vuelve a encuadrar cuando cambia el tamaño del contenedor.',
            '`Float` se usa para un objecto decorativo; en un configurador distrae.',
            '`Stage` está pensado para mostrar un producto, no para una escena de juego.',
            'Todo lo que hacen estos helpers se puede escribir a mano con `Box3` y `camera.position`.',
          ],
        },
      ],
      errores: [
        {
          sintoma: '`Center` no hace nada después de cambiar la escala.',
          causa: 'Mide en el montaje y no vuelve a medir.',
          arreglo: 'Cambia la `key` del componente o llama a su método de refresco.',
        },
        {
          sintoma: '`Bounds` encuadra pero la cámara acaba dentro del modelo.',
          causa: 'Caja envolvente mal calculada (geometría con `frustumCulled` desactivado o vacía).',
          arreglo: 'Añade `margin` y revisa que el modelo tenga geometría real.',
        },
        {
          sintoma: 'La escena se ve distinta según el orden de los componentes.',
          causa: '`Bounds` y `OrbitControls` compiten por la cámara.',
          arreglo: 'Monta los controles después de encuadrar, o sincroniza el target.',
        },
      ],
      quiz: [
        {
          tipo: 'unica',
          enunciado: '¿Qué hace `Center`?',
          opciones: [
            'Desplaza los hijos para que el origen caiga en el centro',
            'Centra la cámara',
            'Escala el modelo a 1 unidad',
            'Aplica sombras',
          ],
          correcta: 0,
          explicacion: 'No toca la cámara: cambia la posición de los hijos.',
        },
        {
          tipo: 'verdadero-falso',
          enunciado: '`Bounds` corrige la escala del modelo.',
          correcta: false,
          explicacion: 'Solo mueve la cámara para encuadrar lo que ya hay.',
        },
        {
          tipo: 'multiple',
          enunciado: '¿Qué problemas resuelven estos helpers?',
          opciones: [
            'Origen descentrado',
            'Encuadre de cámara',
            'Flotación decorativa',
            'Geometría con normales invertidas',
          ],
          correctas: [0, 1, 2],
          explicacion: 'Las normales se arreglan en el modelo, no en la escena.',
        },
        {
          tipo: 'unica',
          enunciado: '¿Por qué evitar `Environment preset`?',
          opciones: [
            'Descarga el HDRI de un CDN externo',
            'No funciona en WebGL2',
            'Solo admite interiores',
            'Consume mucha CPU',
          ],
          correcta: 0,
          explicacion: 'Rompe el offline y añade una dependencia de red.',
        },
      ],
      recursos: [
        {
          titulo: 'drei: Bounds',
          url: 'https://drei.docs.pmnd.rs/abstractions/bounds',
          nota: '`fit`, `clip`, `observe` y margen.',
        },
        {
          titulo: 'drei: Center',
          url: 'https://drei.docs.pmnd.rs/abstractions/center',
          nota: 'Qué ejes centra y cómo alinear a una cara.',
        },
        {
          titulo: 'three.js: Box3',
          url: 'https://threejs.org/docs/#api/en/math/Box3',
          nota: 'La caja envolvente que usan por dentro.',
        },
      ],
      ejercicio: {
        reto: 'Calcula el centro y el tamaño de una caja envolvente a partir de sus mínimos y máximos, y decide si cabe en un encuadre de 4 unidades.',
        inicial: `type Caja = { min: [number, number, number]; max: [number, number, number] }

// TODO: devuelve centro, tamaño y si el mayor lado cabe en 4 unidades.
export function analizar(caja: Caja) {
  return { centro: [0, 0, 0], tamano: [0, 0, 0], cabe: false }
}

console.log(analizar({ min: [-1, -0.5, -2], max: [3, 1.5, 2] }))`,
        solucion: `type Caja = { min: [number, number, number]; max: [number, number, number] }

export function analizar(caja: Caja) {
  const centro = caja.min.map((valor, i) => (valor + caja.max[i]) / 2)
  const tamano = caja.min.map((valor, i) => caja.max[i] - valor)
  const mayor = Math.max(...tamano)
  return { centro, tamano, cabe: mayor <= 4 }
}

console.log(analizar({ min: [-1, -0.5, -2], max: [3, 1.5, 2] }))`,
        pistas: [
          'El centro es la media entre mínimo y máximo, eje a eje.',
          'El tamaño es `max - min`.',
          'El lado mayor decide si cabe: `Math.max(...tamano)`.',
        ],
      },
    },
    {
      id: '9.4',
      modulo: 9,
      titulo: '`Html`: UI anclada a objetos',
      objetivo:
        'Anclar HTML a un punto 3D, controlar su oclusión y entender por qué no es gratis.',
      nivel: 'medio',
      minutos: 45,
      bloques: [
        {
          tipo: 'parrafo',
          texto:
            '`Html` de drei no dibuja en el canvas: crea un `<div>` real, lo posiciona con la cámara y lo mueve en cada frame. Eso permite usar CSS, enlaces y formularios dentro de una escena 3D. El precio es que cada etiqueta es un nodo del DOM que se reposiciona: diez van bien, doscientas no.',
        },
        { tipo: 'demo', id: 'm9-etiquetas', titulo: 'Cinco etiquetas sobre el rover' },
        {
          tipo: 'codigo',
          lenguaje: 'tsx',
          titulo: 'Anclar a una pieza y ocultarla tras el modelo',
          codigo: `import { Html } from '@react-three/drei'

<group scale={2.1} position={[0, -0.55, 0]}>
  <primitive object={scene} />

  <Html
    position={[0.2, 0.6, 0.1]}   // espacio del grupo, no de pantalla
    center
    occlude                          // se oculta si hay geometría delante
    distanceFactor={3.2}             // escala con la distancia
    zIndexRange={[20, 0]}
    style={{ pointerEvents: 'none' }}
  >
    <span className="etiqueta">panel_solar</span>
  </Html>
</group>`,
        },
        {
          tipo: 'tabla',
          cabecera: ['Prop', 'Efecto', 'Coste'],
          filas: [
            ['`center`', 'Centra el div en el punto', 'Ninguno'],
            ['`occlude`', 'Oculta tras geometría', 'Una consulta de raycast'],
            ['`transform`', 'Convierte el div en un plano 3D', 'Matriz + CSS 3D'],
            ['`distanceFactor`', 'Escala con la distancia', 'Recálculo por frame'],
            ['`sprite`', 'Siempre mira a la cámara', 'Recálculo por frame'],
          ],
        },
        {
          tipo: 'destacado',
          tono: 'truco',
          titulo: 'Etiquetas que no cuestan: proyectar una sola vez',
          texto:
            'Si las etiquetas no necesitan seguir al objeto en tiempo real (por ejemplo, un plano con leyendas), calcula sus posiciones una vez, conviértelas a coordenadas del contenedor y pinta HTML normal fuera del canvas. Cero coste por frame y accesible de serie.',
        },
        {
          tipo: 'lista',
          items: [
            '`position` está en el espacio del padre, no en píxeles.',
            '`occlude` puede recibir un array de objetos concretos que deben ocultarla.',
            '`pointerEvents: none` evita que la etiqueta robe clics a la escena.',
            'El HTML se apila con `z-index`: úsalo para que no tape menús reales.',
            'Para muchas etiquetas, usa `Billboard` con `Text` o proyecta posiciones a mano.',
          ],
        },
      ],
      errores: [
        {
          sintoma: 'La etiqueta se ve a través del modelo.',
          causa: '`occlude` desactivado.',
          arreglo: 'Actívalo o acepta el efecto si es lo que buscabas.',
        },
        {
          sintoma: 'La etiqueta no se mueve con el objeto.',
          causa: 'Está fuera del grupo del objeto: se ancla en el espacio de la escena.',
          arreglo: 'Anídala dentro del mismo grupo que el modelo.',
        },
        {
          sintoma: 'Al girar la cámara el texto se ve del revés.',
          causa: '`transform` sin `sprite`.',
          arreglo: 'Añade `sprite` o vuelve al modo plano.',
        },
      ],
      quiz: [
        {
          tipo: 'unica',
          enunciado: '¿Qué crea `Html`?',
          opciones: ['Un div real posicionado sobre el canvas', 'Una textura', 'Una malla', 'Un shader'],
          correcta: 0,
          explicacion: 'Es DOM, no WebGL.',
        },
        {
          tipo: 'verdadero-falso',
          enunciado: 'Cien etiquetas `Html` cuestan lo mismo que cien mallas.',
          correcta: false,
          explicacion: 'Cada etiqueta es un nodo del DOM que se reposiciona por frame.',
        },
        {
          tipo: 'multiple',
          enunciado: '¿Qué hace `occlude`?',
          opciones: [
            'Oculta la etiqueta si hay geometría delante',
            'Usa raycasting',
            'Acepta una lista de objetos',
            'Comprime el DOM',
          ],
          correctas: [0, 1, 2],
          explicacion: 'No comprime nada: consulta si el punto está tapado.',
        },
        {
          tipo: 'unica',
          enunciado: '¿Qué propiedad evita que la etiqueta robe clics?',
          opciones: ['`pointerEvents: none`', '`opacity`', '`zIndexRange`', '`center`'],
          correcta: 0,
          explicacion: 'Es CSS normal aplicado al div.',
        },
      ],
      recursos: [
        {
          titulo: 'drei: Html',
          url: 'https://drei.docs.pmnd.rs/misc/html',
          nota: 'Todas las props, con ejemplos de oclusión.',
        },
        {
          titulo: 'MDN: pointer-events',
          url: 'https://developer.mozilla.org/es/docs/Web/CSS/pointer-events',
          nota: 'Por qué el div se come los clics de la escena.',
        },
        {
          titulo: 'R3F: events',
          url: 'https://r3f.docs.pmnd.rs/api/events',
          nota: 'Cómo interactúan el DOM y el raycasting.',
        },
      ],
      ejercicio: {
        reto: 'Dado un array de etiquetas con posición 3D, decide cuáles deben ocultarse al estar detrás de la cámara según su z.',
        inicial: `type Etiqueta = { nombre: string; z: number }

const etiquetas: Etiqueta[] = [
  { nombre: 'panel_solar', z: 1.2 },
  { nombre: 'antena', z: -0.4 },
  { nombre: 'faro', z: 2.4 },
]

// TODO: devuelve solo las que tienen z mayor que 0.
export function visibles(lista: Etiqueta[]): Etiqueta[] {
  return []
}

console.log(visibles(etiquetas))`,
        solucion: `type Etiqueta = { nombre: string; z: number }

const etiquetas: Etiqueta[] = [
  { nombre: 'panel_solar', z: 1.2 },
  { nombre: 'antena', z: -0.4 },
  { nombre: 'faro', z: 2.4 },
]

export function visibles(lista: Etiqueta[]): Etiqueta[] {
  return lista.filter((etiqueta) => etiqueta.z > 0)
}

console.log(visibles(etiquetas))`,
        pistas: [
          '`filter` devuelve un array nuevo con los que cumplen la condición.',
          'En coordenadas de cámara, z negativo está detrás.',
          'La comprobación real usa el frustum, no solo z: esto es una simplificación.',
        ],
      },
    },
    {
      id: '9.5',
      modulo: 9,
      titulo: '`Instances`, `Clone` y `Preload`',
      objetivo:
        'Repetir geometría con una sola llamada, clonar sin duplicar memoria y adelantar la carga de assets.',
      nivel: 'alto',
      minutos: 45,
      bloques: [
        {
          tipo: 'parrafo',
          texto:
            'Dibujar mil objetos iguales con mil mallas es enviar mil órdenes de dibujo por frame. `Instances` envía una y le dice a la GPU «pinta esta geometría mil veces, con estas matrices». `Clone` hace lo contrario: muchos objetos distintos que comparten geometría y materiales. `Preload` no dibuja nada: adelanta la descarga.',
        },
        { tipo: 'demo', id: 'm9-instancias', titulo: '1 000 mallas frente a 1 000 instancias' },
        {
          tipo: 'codigo',
          lenguaje: 'tsx',
          titulo: 'La misma cuadrícula, dos montajes',
          codigo: `// 1 000 draw calls
{posiciones.map((p, i) => (
  <mesh key={i} position={p}>
    <boxGeometry args={[0.34, 0.34, 0.34]} />
    <meshStandardMaterial color="#4d8df6" />
  </mesh>
))}

// 1 draw call
<Instances limit={1000}>
  <boxGeometry args={[0.34, 0.34, 0.34]} />
  <meshStandardMaterial color="#4d8df6" />
  {posiciones.map((p, i) => (
    <Instance key={i} position={p} />
  ))}
</Instances>`,
        },
        {
          tipo: 'tabla',
          cabecera: ['Técnica', 'Qué comparte', 'Cuándo'],
          filas: [
            ['`Instances`', 'Geometría y material', 'Muchas copias idénticas'],
            ['`Clone`', 'Geometría y material', 'Pocas copias con transformaciones distintas'],
            ['`BatchedMesh`', 'Un solo buffer', 'Objetos distintos, mismo material'],
            ['`Preload`', 'Nada: adelanta la descarga', 'Antes de una transición'],
          ],
        },
        {
          tipo: 'destacado',
          tono: 'porque',
          titulo: 'Por qué la GPU no es el cuello de botella',
          texto:
            'Mil cubos son doce mil triángulos: nada para una GPU moderna. Lo caro es la CPU preparando mil objetos, mil matrices y mil órdenes de dibujo cada frame. Instancing mueve ese trabajo a la GPU, que ya sabe hacerlo en paralelo. Mide draw calls, no solo FPS: es el número que delata el problema.',
        },
        {
          tipo: 'lista',
          items: [
            'Una instancia no puede tener material propio: todas comparten el del grupo.',
            'Puedes actualizar la matriz de una instancia concreta y animarla.',
            '`<Clone>` clona materiales si se lo pides; por defecto comparte.',
            '`Preload all` descarga todo lo que esté en la escena en ese momento.',
            'Instancing no reduce memoria de geometría: la comparte.',
          ],
        },
      ],
      errores: [
        {
          sintoma: 'Con `Instances` todos los objetos son del mismo color.',
          causa: 'El material es uno para todo el grupo.',
          arreglo: 'Usa `instanceColor` o separa en dos grupos.',
        },
        {
          sintoma: 'Las sombras de las instancias no aparecen.',
          causa: '`castShadow` no está en el grupo de instancias.',
          arreglo: 'Activa `castShadow` y `receiveShadow` en `<Instances>`.',
        },
        {
          sintoma: '`Preload` no acelera nada.',
          causa: 'Se llama después de montar la escena que necesita el asset.',
          arreglo: 'Llámalo al principio del módulo o antes de la transición.',
        },
      ],
      quiz: [
        {
          tipo: 'unica',
          enunciado: '¿Qué reduce `Instances`?',
          opciones: ['Las draw calls', 'Los triángulos', 'La memoria de texturas', 'El tamaño del GLB'],
          correcta: 0,
          explicacion: 'Dibuja muchas copias con una sola llamada.',
        },
        {
          tipo: 'verdadero-falso',
          enunciado: 'Cada instancia puede tener su propio material.',
          correcta: false,
          explicacion: 'Comparten el material del grupo; el color por instancia es la excepción.',
        },
        {
          tipo: 'multiple',
          enunciado: '¿Qué comparte un clon de `Object3D`?',
          opciones: ['Geometría', 'Materiales', 'Texturas', 'La jerarquía'],
          correctas: [0, 1, 2],
          explicacion: 'La jerarquía sí se duplica; la memoria pesada se comparte.',
        },
        {
          tipo: 'unica',
          enunciado: '¿Qué hace `Preload`?',
          opciones: [
            'Adelanta la descarga de assets',
            'Precompila shaders',
            'Congela la escena',
            'Reduce el dpr',
          ],
          correcta: 0,
          explicacion: 'Lanza la carga antes de que el componente la necesite.',
        },
      ],
      recursos: [
        {
          titulo: 'drei: Instances',
          url: 'https://drei.docs.pmnd.rs/performances/instances',
          nota: 'Límite, matrices y color por instancia.',
        },
        {
          titulo: 'three.js: InstancedMesh',
          url: 'https://threejs.org/docs/#api/en/objects/InstancedMesh',
          nota: 'El objeto que monta drei por debajo.',
        },
        {
          titulo: 'three.js: BatchedMesh',
          url: 'https://threejs.org/docs/#api/en/objects/BatchedMesh',
          nota: 'Alternativa para geometrías distintas con un material.',
        },
      ],
      ejercicio: {
        reto: 'Escribe una función que calcule cuántas draw calls ahorras al instanciar: recibe objetos y devuelve el total antes y después (1 si hay al menos uno).',
        inicial: `// TODO: devuelve { antes, despues, ahorro }
export function calcular(objetos: number) {
  return { antes: 0, despues: 0, ahorro: 0 }
}

console.log(calcular(1000))`,
        solucion: `export function calcular(objetos: number) {
  const antes = objetos
  const despues = objetos > 0 ? 1 : 0
  return { antes, despues, ahorro: antes - despues }
}

console.log(calcular(1000))`,
        pistas: [
          'Sin instancing, cada objeto es una draw call.',
          'Con instancing, todos los objetos del grupo son una.',
          'El ahorro es la diferencia entre los dos números.',
        ],
      },
    },
    {
      id: '9.6',
      modulo: 9,
      titulo: '`View`: varios viewports, un canvas',
      objetivo:
        'Renderizar varias cámaras en un solo contexto WebGL y decidir cuándo merece la pena.',
      nivel: 'alto',
      minutos: 45,
      bloques: [
        {
          tipo: 'parrafo',
          texto:
            'Un `<Canvas>` crea un contexto WebGL, una escena y un bucle. Dos `<Canvas>` en la misma página son dos de todo. Con `<View>` hay un solo contexto y varias cámaras que se dibujan en regiones distintas del lienzo con `setViewport` y `setScissor`. Para comparar dos versiones de un modelo, dos cámaras o una vista de detalle, es la diferencia entre pagar dos veces la GPU y pagarla una.',
        },
        { tipo: 'demo', id: 'm9-view', titulo: 'Cambia entre dos canvas y un canvas con dos View' },
        {
          tipo: 'codigo',
          lenguaje: 'tsx',
          titulo: 'El patrón de `View`',
          codigo: `const raiz = useRef<HTMLDivElement>(null)

<div ref={raiz} style={{ position: 'relative' }}>
  <Canvas eventSource={raiz} style={{ position: 'absolute', inset: 0 }}>
    <View.Port />
  </Canvas>

  <div className="grid grid-cols-2 gap-2">
    <div style={{ height: 240 }}>
      <View>
        <Escena color="azul" />
      </View>
    </div>
    <div style={{ height: 240 }}>
      <View>
        <Escena color="verde" />
      </View>
    </div>
  </div>
</div>`,
        },
        {
          tipo: 'tabla',
          cabecera: ['Enfoque', 'Contextos', 'Escenas', 'Cuándo'],
          filas: [
            ['Un `<Canvas>`', '1', '1', 'Una vista'],
            ['Dos `<Canvas>`', '2', '2', 'Vistas independientes de verdad'],
            ['`<View>`', '1', '1 por viewport', 'Varias cámaras coordinadas'],
            ['`CanvasTexture`', '1', '1 más la fuente', 'Minimapa o espejo'],
          ],
        },
        {
          tipo: 'destacado',
          tono: 'ojo',
          titulo: 'Un navegador limita los contextos WebGL',
          texto:
            'Chrome ronda los 16 contextos simultáneos por página y descarta los más antiguos al pasarse. Una galería con doce canvas puede funcionar en tu máquina y fallar en un móvil. Si la página va a tener muchas vistas, un solo canvas con `View` no es una optimización: es el requisito para que funcione.',
        },
        {
          tipo: 'lista',
          items: [
            '`View` necesita que el contenedor tenga tamaño: si mide 0, no dibuja nada.',
            'Cada `View` tiene su propia escena: las luces van dentro.',
            'El canvas debe ser `position: absolute` y el contenedor `relative`.',
            'Los eventos se conectan con `eventSource` al contenedor.',
            'No compartas objetos entre dos escenas: usa clon o dos cargas cacheadas.',
          ],
        },
      ],
      errores: [
        {
          sintoma: 'El viewport sale en blanco.',
          causa: 'El contenedor de `View` no tiene altura definida.',
          arreglo: 'Dale una altura en píxeles o `aspect-ratio` al div.',
        },
        {
          sintoma: 'El segundo canvas de la página deja de dibujar.',
          causa: 'Se superó el límite de contextos WebGL del navegador.',
          arreglo: 'Unifica vistas en un solo canvas con `View`.',
        },
        {
          sintoma: 'Los objetos aparecen en el sitio equivocado.',
          causa: 'Se reutiliza el mismo `Object3D` en dos escenas.',
          arreglo: 'Clona el objeto o carga dos instancias desde la caché.',
        },
      ],
      quiz: [
        {
          tipo: 'unica',
          enunciado: '¿Cuántos contextos WebGL usa un canvas con tres `View`?',
          opciones: ['Uno', 'Tres', 'Dos', 'Depende de la GPU'],
          correcta: 0,
          explicacion: 'Los viewports comparten contexto; cada uno tiene su escena.',
        },
        {
          tipo: 'verdadero-falso',
          enunciado: 'Las luces puestas en el canvas principal iluminan todos los `View`.',
          correcta: false,
          explicacion: 'Cada `View` renderiza su propia escena: las luces van dentro.',
        },
        {
          tipo: 'multiple',
          enunciado: '¿Qué hay que preparar para usar `View`?',
          opciones: [
            'Un contenedor con tamaño',
            'Un canvas absoluto dentro de un contenedor relativo',
            '`eventSource` para los eventos',
            'Un segundo renderer',
          ],
          correctas: [0, 1, 2],
          explicacion: 'El renderer es uno solo.',
        },
        {
          tipo: 'unica',
          enunciado: '¿Cuál es el límite práctico de contextos por página?',
          opciones: [
            'Un número bajo, distinto por navegador',
            'Cien',
            'Ilimitado',
            'Dos exactos',
          ],
          correcta: 0,
          explicacion: 'Chrome ronda los 16 y descarta los más antiguos.',
        },
      ],
      recursos: [
        {
          titulo: 'drei: View',
          url: 'https://drei.docs.pmnd.rs/misc/view',
          nota: 'El patrón con `View.Port` y `eventSource`.',
        },
        {
          titulo: 'three.js: WebGLRenderer.setViewport',
          url: 'https://threejs.org/docs/#api/en/renderers/WebGLRenderer.setViewport',
          nota: 'Lo que usa `View` por debajo.',
        },
        {
          titulo: 'MDN: WebGL context limits',
          url: 'https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API',
          nota: 'Contextos, pérdida de contexto y límites del navegador.',
        },
      ],
      ejercicio: {
        reto: 'Escribe una función que reparta un contenedor de ancho W en N viewports con separación fija, y devuelva el ancho de cada uno.',
        inicial: `// TODO: devuelve el ancho de un viewport
export function anchoViewport(anchoTotal: number, columnas: number, separacion: number): number {
  return 0
}

console.log(anchoViewport(1200, 2, 16))`,
        solucion: `export function anchoViewport(anchoTotal: number, columnas: number, separacion: number): number {
  if (columnas <= 0) return 0
  const huecos = (columnas - 1) * separacion
  return (anchoTotal - huecos) / columnas
}

console.log(anchoViewport(1200, 2, 16))`,
        pistas: [
          'Hay `columnas - 1` huecos, no `columnas`.',
          'Resta los huecos antes de dividir.',
          'Protege el caso de cero columnas para no dividir por cero.',
        ],
      },
    },
  ],
}

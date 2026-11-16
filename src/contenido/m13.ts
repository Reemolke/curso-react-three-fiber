import type { Modulo } from './tipos'

export const modulo13: Modulo = {
  numero: 13,
  titulo: 'Estado y arquitectura',
  descripcion:
    'Cuando la demo pasa a ser producto: una tienda global que no re-renderiza el mundo, carpetas con reglas, pantallas de carga que no parpadean, sonido colocado en el espacio, fallos que no se llevan la página por delante y una escena que se puede usar sin ratón.',
  lecciones: [
    {
      id: '13.1',
      modulo: 13,
      titulo: 'Zustand',
      objetivo:
        'Compartir estado entre la interfaz y la escena sin re-renderizar componentes que no lo necesitan.',
      nivel: 'medio',
      minutos: 55,
      bloques: [
        {
          tipo: 'parrafo',
          texto:
            'El problema de una escena con interfaz no es dónde guardar los datos, es cuántos componentes se enteran de cada cambio. Con `useState` en el padre, mover un deslizador re-renderiza la lección entera. Con un contexto, pasa lo mismo: cualquier consumidor se re-renderiza cuando cambia el valor, aunque solo use un campo. Zustand es una caja fuera de React con suscripciones por selector: cada componente dice exactamente qué campo le interesa, y solo se despierta cuando ese campo cambia. Nada más.',
        },
        { tipo: 'demo', id: 'm13-zustand', titulo: 'Un cubo, una esfera y un anillo leyendo la misma tienda' },
        {
          tipo: 'codigo',
          lenguaje: 'ts',
          titulo: 'Tienda, suscripción y lectura sin suscripción',
          codigo: `import { create } from 'zustand'

type Tienda = {
  color: string
  girando: boolean
  fijarColor: (color: string) => void
  alternarGiro: () => void
}

export const useTienda = create<Tienda>((set) => ({
  color: '#6ea8fe',
  girando: true,
  fijarColor: (color) => set({ color }),
  alternarGiro: () => set((estado) => ({ girando: !estado.girando })),
}))

// 1. Suscripción por campo: solo despierta al color.
function Cubo() {
  const color = useTienda((estado) => estado.color)
  return <meshStandardMaterial color={color} />
}

// 2. Lectura puntual dentro del bucle: cero renders.
function Giro() {
  useFrame((_, delta) => {
    const { girando } = useTienda.getState()
    if (girando) anillo.current.rotation.z += delta
  })
  return null
}`,
        },
        {
          tipo: 'tabla',
          cabecera: ['Dónde vive el estado', 'Quién se re-renderiza', 'Cuándo usarlo'],
          filas: [
            ['`useState` local', 'El componente y sus hijos', 'Un control que solo afecta a su demo'],
            ['Contexto', 'Todos los consumidores', 'Valores que casi nunca cambian: tema, idioma'],
            ['Zustand', 'Cada componente según su selector', 'Escena + interfaz + varias pantallas'],
            ['`useRef`', 'Nadie', 'Animación por frame y datos que no se pintan'],
          ],
        },
        {
          tipo: 'destacado',
          tono: 'porque',
          titulo: 'Por qué `getState()` dentro de `useFrame` es la combinación más barata',
          texto:
            '`useFrame` corre sesenta veces por segundo: si dentro de él se usara un hook de suscripción, se pagarían sesenta renders por segundo. `getState()` lee el valor actual sin registrar dependencia, así que el componente se monta una vez y el bucle lee lo que haya en ese instante. Es exactamente lo contrario de lo que hace falta en la interfaz, donde el valor debe pintarse. Dos ritmos, dos formas de leer.',
        },
        {
          tipo: 'lista',
          items: [
            'Cada selector devuelve un campo primitivo: comparar objetos con `===` provoca renders que no esperabas.',
            'Si necesitas varias cosas, varios selectores; o `useShallow` cuando de verdad es un objeto.',
            'Las acciones (`fijarColor`) se leen del estado y son estables: no cambian entre renders.',
            'Nunca llames a `set` dentro del render: hazlo en eventos, efectos o `useFrame`.',
            'Guarda en la tienda lo que varias piezas comparten; lo demás, local.',
          ],
        },
      ],
      errores: [
        {
          sintoma: 'Todos los componentes se re-renderizan al mover un deslizador.',
          causa: 'El componente padre se suscribe a la tienda y pasa valores por props.',
          arreglo: 'Que cada control y cada consumidor se suscriban por su cuenta.',
        },
        {
          sintoma: 'El selector devuelve un objeto nuevo cada vez y hay bucles de renders.',
          causa: '`useTienda((estado) => ({ a: estado.a, b: estado.b }))` crea un objeto distinto cada vez.',
          arreglo: 'Usa dos selectores de campos primitivos o `useShallow`.',
        },
        {
          sintoma: 'Animando con la tienda, el framerate se hunde.',
          causa: 'El valor animado está en la tienda y se lee con un hook dentro de `useFrame`.',
          arreglo: 'Lee con `getState()` o guarda el valor en un `ref`.',
        },
      ],
      quiz: [
        {
          tipo: 'unica',
          enunciado: '¿Qué determina que un componente se re-renderice con Zustand?',
          opciones: [
            'El valor que devuelve su selector',
            'El número de campos de la tienda',
            'El tamaño del componente',
            'La posición en el árbol',
          ],
          correcta: 0,
          explicacion: 'Las suscripciones se comparan por el resultado del selector.',
        },
        {
          tipo: 'verdadero-falso',
          enunciado: 'Cambiar un valor de la tienda re-renderiza todos los componentes que la importan.',
          correcta: false,
          explicacion: 'Solo los que se suscriben al campo que ha cambiado.',
        },
        {
          tipo: 'multiple',
          enunciado: '¿Qué formas hay de leer una tienda de Zustand?',
          opciones: [
            'Con un hook y un selector',
            'Con `getState()` fuera del render',
            'Suscribiéndose a mano con `subscribe`',
            'Con `useState`',
          ],
          correctas: [0, 1, 2],
          explicacion: '`useState` es de React y no conoce la tienda.',
        },
        {
          tipo: 'unica',
          enunciado: '¿Qué selector provoca renders de más?',
          opciones: [
            'Uno que devuelve un objeto nuevo en cada llamada',
            'Uno que devuelve un número',
            'Uno que devuelve un booleano',
            'Uno que devuelve una función estable',
          ],
          correcta: 0,
          explicacion: 'La comparación por identidad falla con objetos nuevos.',
        },
      ],
      recursos: [
        {
          titulo: 'Zustand: documentación',
          url: 'https://zustand.docs.pmnd.rs/getting-started/introduction',
          nota: 'Selectores, `useShallow` y suscripciones manuales.',
        },
        {
          titulo: 'Zustand: actualizaciones transitorias',
          url: 'https://zustand.docs.pmnd.rs/guides/prevent-rerenders-with-use-shallow',
          nota: 'El patrón de leer sin re-renderizar, que es el de `useFrame`.',
        },
        {
          titulo: 'R3F: gestión de estado',
          url: 'https://r3f.docs.pmnd.rs/getting-started/installation',
          nota: 'Contexto de R3F como proveedor de su propio estado interno.',
        },
      ],
      ejercicio: {
        reto: 'Escribe un selector que, dado el estado `{ color, altura, girando }`, devuelva solo si la pieza es «alta» (altura mayor o igual que 1,5). Debe devolver un booleano, no un objeto.',
        inicial: `type Estado = { color: string; altura: number; girando: boolean }

export function selectorAlta(estado: Estado): boolean {
  // TODO: un booleano, no un objeto.
  return false
}

console.log(selectorAlta({ color: '#fff', altura: 2, girando: true }))`,
        solucion: `type Estado = { color: string; altura: number; girando: boolean }

export function selectorAlta(estado: Estado): boolean {
  return estado.altura >= 1.5
}

console.log(selectorAlta({ color: '#fff', altura: 2, girando: true }))`,
        pistas: [
          'Un selector es una función del estado al valor que quieres escuchar.',
          'Los booleanos se comparan por valor: no hay falsos positivos.',
          'Devuelve la comparación, no un objeto con ella dentro.',
        ],
      },
    },
    {
      id: '13.2',
      modulo: 13,
      titulo: 'Estructura de un proyecto real',
      objetivo:
        'Separar entrada, pantallas, escena y datos, con el sentido de los imports en una sola dirección.',
      nivel: 'medio',
      minutos: 45,
      bloques: [
        {
          tipo: 'parrafo',
          texto:
            'Un proyecto de R3F se estropea por dos sitios: la escena acaba importando la interfaz y la interfaz acaba creando objetos de three. Cuando eso pasa, cada cambio pequeño arrastra medio proyecto y ya no hay forma de reutilizar nada. La regla que lo evita es sencilla: cuatro capas, y las flechas van en un solo sentido. La entrada monta pantallas, las pantallas componen escena, la escena lee datos, y los datos no saben que existe nada de lo anterior.',
        },
        { tipo: 'widget', id: 'm13-arquitectura', titulo: 'El mapa de capas, navegable' },
        {
          tipo: 'codigo',
          lenguaje: 'ts',
          titulo: 'La carpeta, en cuatro líneas',
          codigo: `src/
  main.tsx          // createRoot, nada más
  App.tsx           // router por hash y proveedores
  pantallas/        // lección, playground, visor, proyecto
  tres/             // DemoCanvas, gltf.ts, rutas.ts
  demos/m01..m13/   // una escena por demo, con su registro
  estado/           // tienda.ts, progreso.ts
  contenido/        // las lecciones como datos

// Y una única fuente de verdad para los assets:
export const MODELOS = {
  rover: rutaAsset('modelos/rover.glb'),
} as const`,
        },
        {
          tipo: 'destacado',
          tono: 'ojo',
          titulo: 'El import invertido',
          texto:
            'Si `estado/tienda.ts` importa `three` para guardar un `Vector3`, ya no se puede probar sin WebGL ni reutilizar en el servidor. Si `tres/DemoCanvas.tsx` importa una pantalla, la escena depende de la navegación. El síntoma llega tarde: un ciclo de imports que solo se nota cuando el bundler devuelve `undefined` en tiempo de ejecución.',
        },
        {
          tipo: 'lista',
          items: [
            'Las rutas de assets viven en un solo archivo: si mañana cambia la carpeta, se cambia una vez.',
            'Un registro por módulo evita que dos personas editen el mismo archivo de demos.',
            'La escena recibe datos por props o los lee de la tienda; nunca consulta la URL ni el router.',
            'La persistencia (`localStorage`) se concentra en un módulo, no se reparte por componentes.',
            'Los tipos compartidos van en un archivo aparte: `tipos.ts` no importa nada de nadie.',
          ],
        },
      ],
      errores: [
        {
          sintoma: 'El bundler avisa de un ciclo de imports y alguna constante llega `undefined`.',
          causa: 'Dos capas se importan mutuamente.',
          arreglo: 'Mueve el tipo o la constante compartida a una capa inferior.',
        },
        {
          sintoma: 'No hay manera de probar la lógica sin abrir un navegador.',
          causa: 'El módulo de estado importa three o R3F.',
          arreglo: 'Guarda números y cadenas en el estado; convierte a vectores en la escena.',
        },
        {
          sintoma: 'Cambiar una ruta de assets rompe media web.',
          causa: 'Las rutas están escritas a mano en cada demo.',
          arreglo: 'Centralízalas en `rutas.ts` y usa `rutaAsset`.',
        },
      ],
      quiz: [
        {
          tipo: 'unica',
          enunciado: '¿Qué capa no debe importar three?',
          opciones: ['Datos y estado', 'Escena', 'Pantallas', 'Entrada'],
          correcta: 0,
          explicacion: 'El estado debe poder existir sin WebGL.',
        },
        {
          tipo: 'verdadero-falso',
          enunciado: 'Una pantalla puede crear objetos de three como `new Vector3()`.',
          correcta: false,
          explicacion: 'Eso es trabajo de la capa de escena.',
        },
        {
          tipo: 'multiple',
          enunciado: '¿Qué se gana con un registro por módulo?',
          opciones: [
            'Menos conflictos al trabajar en paralelo',
            'Cargas perezosas por demo',
            'Un único lugar donde buscar cada id',
            'Menos memoria en la GPU',
          ],
          correctas: [0, 1, 2],
          explicacion: 'La memoria depende de los recursos, no de cómo se registren.',
        },
        {
          tipo: 'unica',
          enunciado: '¿Dónde se resuelve la ruta de un `.glb`?',
          opciones: [
            'En un único módulo de rutas',
            'En cada demo, a mano',
            'En el HTML',
            'En el router',
          ],
          correcta: 0,
          explicacion: 'Una sola fuente de verdad para el `base` de Vite.',
        },
      ],
      recursos: [
        {
          titulo: 'R3F: estructura de proyecto',
          url: 'https://r3f.docs.pmnd.rs/getting-started/installation',
          nota: 'Cómo organiza pmndrs sus propios ejemplos.',
        },
        {
          titulo: 'Vite: `base` y assets',
          url: 'https://vite.dev/guide/build.html#public-base-path',
          nota: 'Por qué una ruta absoluta se rompe en GitHub Pages.',
        },
        {
          titulo: 'TypeScript: ciclos de imports',
          url: 'https://www.typescriptlang.org/docs/handbook/modules/reference.html',
          nota: 'Qué pasa con las constantes cuando dos módulos se importan entre sí.',
        },
      ],
      ejercicio: {
        reto: 'Detecta si un import va en sentido contrario: recibe el índice de la capa que importa y el de la importada (0 = entrada, 3 = datos) y devuelve `true` si el import está permitido.',
        inicial: `export function permitido(desde: number, hacia: number): boolean {
  // TODO: solo se puede importar de la propia capa o de una inferior.
  return true
}

console.log(permitido(2, 3), permitido(3, 1))`,
        solucion: `export function permitido(desde: number, hacia: number): boolean {
  return hacia >= desde
}

console.log(permitido(2, 3), permitido(3, 1))`,
        pistas: [
          'Los índices crecen hacia abajo: 0 es la entrada.',
          'Importar de una capa inferior está bien.',
          'Importar de una capa superior es el error.',
        ],
      },
    },
    {
      id: '13.3',
      modulo: 13,
      titulo: 'Carga de assets y pantallas de carga',
      objetivo:
        'Usar `useProgress`, `Suspense` y la precarga para que la espera se sienta corta y no parpadee.',
      nivel: 'medio',
      minutos: 50,
      bloques: [
        {
          tipo: 'parrafo',
          texto:
            'Un `.glb` de veinte megas tarda lo que tarda, y no hay truco que lo acelere. Lo que sí se controla es lo que ocurre mientras llega: si la pantalla está vacía, la persona piensa que la web está rota. `Suspense` resuelve la mecánica (no se monta lo que aún no tiene datos) y `useProgress` da las cifras, porque todos los cargadores de three comparten el mismo gestor: `DefaultLoadingManager`. La pantalla se retira cuando el gestor termina y ha pasado un tiempo mínimo, para que no aparezca y desaparezca en un parpadeo.',
        },
        { tipo: 'demo', id: 'm13-carga', titulo: 'Tres modelos, una barra y un tiempo mínimo' },
        {
          tipo: 'codigo',
          lenguaje: 'tsx',
          titulo: 'El esqueleto de una pantalla de carga',
          codigo: `import { Suspense } from 'react'
import { useProgress } from '@react-three/drei'

function Cargador() {
  const { active, progress, item } = useProgress()
  if (!active) return null

  return (
    <div role="progressbar" aria-valuenow={progress} aria-valuemin={0} aria-valuemax={100}>
      {Math.round(progress)} % — {item.split('/').pop()}
    </div>
  )
}

// La precarga empieza antes de que la escena exista.
useGLTF.preload(MODELOS.rover)

<Canvas>
  <Suspense fallback={null}>
    <Rover />
  </Suspense>
</Canvas>`,
        },
        {
          tipo: 'tabla',
          cabecera: ['Concepto', 'Qué hace', 'Qué no hace'],
          filas: [
            ['`Suspense`', 'Retiene el subárbol hasta que hay datos', 'No muestra nada por sí solo'],
            ['`useProgress`', 'Porcentaje y archivo en vuelo', 'No conoce descargas hechas con `fetch`'],
            ['`preload`', 'Lanza la descarga antes de montar', 'No evita esperar si el archivo es grande'],
            ['Caché de `useGLTF`', 'La segunda vez es instantánea', 'No crece sola: hay que vaciarla a mano'],
          ],
        },
        {
          tipo: 'destacado',
          tono: 'truco',
          titulo: 'Tiempo mínimo, no tiempo máximo',
          texto:
            'Retrasar la retirada de la pantalla 300 o 400 ms evita el destello cuando todo está en caché. Pero un tiempo mínimo solo se pone si el contenido tarda: si tu pantalla de carga dura dos segundos porque lo has decidido tú, la estás usando para tapar una escena lenta. Con un límite inferior pequeño basta; el resto del trabajo es optimizar el peso.',
        },
        {
          tipo: 'lista',
          items: [
            'Carga siempre con los cargadores de three (`useGLTF`, `useTexture`, `HDRLoader`): comparten gestor.',
            'Reserva el hueco: un contenedor con la altura final evita el salto de layout.',
            'Precarga lo que sabes que viene en la siguiente lección o en el siguiente paso.',
            'Muestra el nombre del archivo solo si es útil; a la persona no le dice nada un hash.',
            'Si el progreso se queda en 0 y no avanza, hay una descarga fuera del gestor.',
          ],
        },
      ],
      errores: [
        {
          sintoma: 'La pantalla de carga se queda al 0 % para siempre.',
          causa: 'El asset se descarga con `fetch` e se pasa a `useLoader` cuando ya está.',
          arreglo: 'Deja que el cargador haga la descarga para que el gestor la cuente.',
        },
        {
          sintoma: 'La escena aparece vacía y luego salta de golpe.',
          causa: 'No hay `Suspense` y el componente se monta sin geometría.',
          arreglo: 'Envuelve el contenido que carga en un `Suspense`.',
        },
        {
          sintoma: 'Al volver a la lección ya no se ve la pantalla de carga.',
          causa: '`useGLTF` guarda el resultado en caché.',
          arreglo: 'Es lo deseado. Para probar la pantalla, vacía la caché con `useGLTF.clear`.',
        },
      ],
      quiz: [
        {
          tipo: 'unica',
          enunciado: '¿Qué hace `Suspense` con un componente que aún no tiene su modelo?',
          opciones: [
            'No lo monta hasta que los datos están',
            'Lo monta con una caja de prueba',
            'Lo monta sin geometría',
            'Cancela la descarga',
          ],
          correcta: 0,
          explicacion: 'El subárbol espera; el fallback sustituye al contenido.',
        },
        {
          tipo: 'verdadero-falso',
          enunciado: '`useProgress` cuenta también las descargas hechas con `fetch`.',
          correcta: false,
          explicacion: 'Solo ve lo que pasa por el gestor de carga de three.',
        },
        {
          tipo: 'multiple',
          enunciado: '¿Qué mejora la sensación de espera?',
          opciones: [
            'Una barra con el porcentaje',
            'Reservar el hueco del contenido',
            'Precargar los assets siguientes',
            'Alargar la pantalla cinco segundos',
          ],
          correctas: [0, 1, 2],
          explicacion: 'Alargarla sin motivo solo hace la espera más larga.',
        },
        {
          tipo: 'unica',
          enunciado: '¿Por qué la segunda visita carga al instante?',
          opciones: [
            'Por la caché de `useGLTF`',
            'Porque el modelo se ha reducido',
            'Porque el navegador desactiva Draco',
            'Porque ya no hay `Suspense`',
          ],
          correcta: 0,
          explicacion: 'El resultado resuelto se guarda por URL.',
        },
      ],
      recursos: [
        {
          titulo: 'drei: `useProgress`',
          url: 'https://drei.pmnd.rs/?path=/docs/loaders-useprogress--docs',
          nota: 'Los campos que devuelve y su origen.',
        },
        {
          titulo: 'three: `LoadingManager`',
          url: 'https://threejs.org/docs/#api/en/loaders/managers/LoadingManager',
          nota: 'El gestor compartido que hay detrás de `useProgress`.',
        },
        {
          titulo: 'React: `Suspense`',
          url: 'https://react.dev/reference/react/Suspense',
          nota: 'Qué significa exactamente «suspender» un componente.',
        },
      ],
      ejercicio: {
        reto: 'Traduce bytes descargados a porcentaje entero: recibe descargados y totales, y devuelve 0–100 sin pasarse de 100 ni bajar de 0.',
        inicial: `export function porcentaje(descargados: number, total: number): number {
  // TODO: redondeado y acotado.
  return 0
}

console.log(porcentaje(512, 2048), porcentaje(3000, 2048))`,
        solucion: `export function porcentaje(descargados: number, total: number): number {
  if (total <= 0) return 0
  return Math.min(100, Math.round((descargados / total) * 100))
}

console.log(porcentaje(512, 2048), porcentaje(3000, 2048))`,
        pistas: [
          'Si el total es cero, no hay porcentaje que calcular.',
          'Redondea después de dividir.',
          'Acota el resultado a 100 con `Math.min`.',
        ],
      },
    },
    {
      id: '13.4',
      modulo: 13,
      titulo: 'Audio posicional',
      objetivo:
        'Colocar sonido en el espacio 3D, entender que el oyente es la cámara y arrancarlo con un gesto del usuario.',
      nivel: 'medio',
      minutos: 50,
      bloques: [
        {
          tipo: 'parrafo',
          texto:
            'Un sonido normal suena igual a la derecha que a la izquierda. Uno posicional tiene coordenadas: se atenúa con la distancia al oyente y se reparte entre los dos oídos según de dónde venga. En three, `PositionalAudio` es un objeto de escena más, como una malla: se coloca, se mueve y se le cuelga un búfer. El oyente no lo eliges: es la cámara. Por eso orbitar alrededor de la fuente cambia el volumen sin tocar el volumen.',
        },
        { tipo: 'demo', id: 'm13-audio', titulo: 'Una fuente entre cuatro pilares' },
        {
          tipo: 'codigo',
          lenguaje: 'tsx',
          titulo: 'Colocar y arrancar',
          codigo: `import { PositionalAudio } from '@react-three/drei'

function Altavoz() {
  const sonido = useRef<THREE.PositionalAudio>(null)

  const arrancar = async () => {
    const nodo = sonido.current
    if (!nodo) return

    // Sin gesto del usuario, el contexto está suspendido.
    if (nodo.context.state === 'suspended') await nodo.context.resume()
    nodo.play()
  }

  return (
    <group position={[0, 1, 0]}>
      <PositionalAudio ref={sonido} url={AUDIO.motor} distance={2} loop />
    </group>
  )
}`,
        },
        {
          tipo: 'tabla',
          cabecera: ['Tipo', 'Dónde suena', 'Cuándo'],
          filas: [
            ['`<audio>` HTML', 'Igual en los dos oídos', 'Música de fondo, avisos de interfaz'],
            ['`THREE.Audio`', 'En todas partes, sin posición', 'Ambiente global y locución'],
            ['`THREE.PositionalAudio`', 'Colocado y atenuado por distancia', 'Motores, pasos, máquinas, naturaleza'],
          ],
        },
        {
          tipo: 'destacado',
          tono: 'ojo',
          titulo: 'La política de reproducción automática no es un bug',
          texto:
            'Ningún navegador deja sonar audio sin una interacción previa. Un `play()` en el montaje no falla con un error visible: devuelve una promesa que no se cumple y el contexto se queda suspendido. Por eso hay que arrancar desde un `onClick` y llamar a `resume()` antes de `play()`. Si además el usuario lleva auriculares, el efecto envolvente se nota el triple: prueba la demo con ellos.',
        },
        {
          tipo: 'lista',
          items: [
            'Un solo `AudioListener` por escena: dos oyentes dan resultados incoherentes.',
            'La atenuación se ajusta con `distance` (distancia de referencia) y `rolloff`.',
            'Los bucles necesitan un número entero de ciclos o se oye el corte.',
            'En móvil, el audio se corta al bloquear: escucha `visibilitychange` y pausa.',
            'Comprime a mono 22 kHz para efectos cortos: pesa la mitad y no se nota.',
          ],
        },
      ],
      errores: [
        {
          sintoma: 'No suena nada y no hay ningún error.',
          causa: 'El contexto de audio está suspendido por falta de gesto del usuario.',
          arreglo: 'Arranca desde un clic y llama a `context.resume()` antes de `play()`.',
        },
        {
          sintoma: 'El sonido no se atenúa al alejarse.',
          causa: 'Se está usando `THREE.Audio` en vez de `PositionalAudio`, o no hay listener.',
          arreglo: 'Comprueba el componente y que la cámara tenga su `AudioListener`.',
        },
        {
          sintoma: 'El bucle hace un chasquido cada vez que reinicia.',
          causa: 'El archivo no empieza y acaba en el mismo punto de la onda.',
          arreglo: 'Recorta el bucle en un cruce por cero o usa un número entero de ciclos.',
        },
      ],
      quiz: [
        {
          tipo: 'unica',
          enunciado: '¿Quién es el oyente en una escena de R3F?',
          opciones: ['La cámara', 'El origen de coordenadas', 'La primera luz', 'El centro de la escena'],
          correcta: 0,
          explicacion: 'drei cuelga el `AudioListener` de la cámara.',
        },
        {
          tipo: 'verdadero-falso',
          enunciado: 'Un sonido posicional suena igual en los dos oídos si la fuente está centrada.',
          correcta: true,
          explicacion: 'El balance solo se desplaza si la fuente sale del eje.',
        },
        {
          tipo: 'multiple',
          enunciado: '¿Qué hace falta para que suene un audio en el navegador?',
          opciones: [
            'Un gesto del usuario',
            'Un contexto reanudado',
            'Un búfer cargado',
            'Un `AudioListener` por malla',
          ],
          correctas: [0, 1, 2],
          explicacion: 'Basta con un oyente por escena.',
        },
        {
          tipo: 'unica',
          enunciado: '¿Qué controla `distance` en `PositionalAudio`?',
          opciones: [
            'La distancia a la que el sonido está a volumen de referencia',
            'El alcance máximo del sonido',
            'El volumen general',
            'El número de altavoces',
          ],
          correcta: 0,
          explicacion: 'Es la distancia de referencia del modelo de atenuación.',
        },
      ],
      recursos: [
        {
          titulo: 'three: `PositionalAudio`',
          url: 'https://threejs.org/docs/#api/en/audio/PositionalAudio',
          nota: 'Atenuación, distancia de referencia y orientación.',
        },
        {
          titulo: 'drei: `PositionalAudio`',
          url: 'https://drei.pmnd.rs/?path=/docs/abstractions-positionalaudio--docs',
          nota: 'Props y el ejemplo con listener en cámara.',
        },
        {
          titulo: 'MDN: política de reproducción automática',
          url: 'https://developer.mozilla.org/en-US/docs/Web/Media/Guides/Autoplay',
          nota: 'Por qué el sonido necesita un clic.',
        },
      ],
      ejercicio: {
        reto: 'Calcula la atenuación inversa: recibe la distancia y la distancia de referencia, y devuelve el factor de volumen (1 en la referencia, la mitad al doble de distancia), sin bajar de 0.',
        inicial: `export function atenuacion(distancia: number, referencia: number): number {
  // TODO: modelo inverso simple, acotado a 0.
  return 1
}

console.log(atenuacion(2, 2), atenuacion(4, 2))`,
        solucion: `export function atenuacion(distancia: number, referencia: number): number {
  if (distancia <= 0) return 1
  return Math.max(0, referencia / distancia)
}

console.log(atenuacion(2, 2), atenuacion(4, 2))`,
        pistas: [
          'El modelo inverso es referencia dividido entre distancia.',
          'A distancia igual a la referencia, el factor es 1.',
          'Al doble de distancia, la mitad: 0,5.',
        ],
      },
    },
    {
      id: '13.5',
      modulo: 13,
      titulo: 'Robustez',
      objetivo:
        'Detectar la falta de WebGL, aislar los fallos por demo y reaccionar a la pérdida de contexto.',
      nivel: 'alto',
      minutos: 50,
      bloques: [
        {
          tipo: 'parrafo',
          texto:
            'Una escena 3D puede fallar de cuatro maneras: el navegador no tiene WebGL2, la GPU entra en lista negra y el contexto no se crea, el contexto se pierde a mitad de sesión (pestaña en segundo plano, driver que se reinicia, memoria), o un dato del modelo no es el que esperabas. Las tres primeras no son errores de tu código; la cuarta sí. En los cuatro casos la página debe seguir siendo usable, porque el contenido de la lección no depende de que se dibuje un cubo.',
        },
        { tipo: 'widget', id: 'm13-robusto', titulo: 'Comprobación real y límite de error' },
        {
          tipo: 'codigo',
          lenguaje: 'tsx',
          titulo: 'Detectar, aislar y escuchar la pérdida',
          codigo: `// 1. Comprobar de verdad: crear un contexto desechable.
function hayWebGL2(): boolean {
  try {
    const lienzo = document.createElement('canvas')
    const gl = lienzo.getContext('webgl2')
    if (!gl) return false
    gl.getExtension('WEBGL_lose_context')?.loseContext()
    return true
  } catch {
    return false
  }
}

// 2. Un límite por demo: si falla una, las demás siguen.
<ErrorBoundary etiqueta="mi demo">
  <Canvas>…</Canvas>
</ErrorBoundary>

// 3. La pérdida de contexto no lanza excepción: llega como evento.
lienzo.addEventListener('webglcontextlost', (evento) => {
  evento.preventDefault()   // permite que se pueda restaurar
  pausar()
})

lienzo.addEventListener('webglcontextrestored', () => {
  reconstruirRecursos()
})`,
        },
        {
          tipo: 'tabla',
          cabecera: ['Fallo', 'Síntoma', 'Qué hacer'],
          filas: [
            ['Sin WebGL2', 'El contexto devuelve `null`', 'Mensaje claro y contenido alternativo'],
            ['Contexto perdido', 'El lienzo se queda congelado', '`preventDefault`, pausar, reconstruir al volver'],
            ['Fuga de memoria', 'El contexto se pierde al rato', '`dispose` de lo creado a mano'],
            ['Modelo corrupto', '`useGLTF` rechaza la promesa', 'Límite de error con reintento'],
          ],
        },
        {
          tipo: 'destacado',
          tono: 'porque',
          titulo: 'Un límite de error no captura todo',
          texto:
            'Los límites de React atrapan errores del render y del ciclo de vida. No atrapan errores asíncronos, ni los de un `setTimeout`, ni los de un listener de eventos, ni la pérdida de contexto WebGL. Por eso hacen falta las dos cosas: el límite para los fallos de montaje y los listeners para lo que ocurre después. Confundirlos es la razón de que una demo se quede en negro sin mensaje.',
        },
        {
          tipo: 'lista',
          items: [
            'Comprueba creando un contexto, no mirando si existe la clase `WebGL2RenderingContext`.',
            'Un límite por demo, no uno por aplicación: aísla el fallo sin matar la página.',
            'El mensaje de error debe decir qué pasó y qué puede hacer la persona.',
            'El límite de contextos del navegador es real: no dejes lienzos olvidados.',
            'Prueba con WebGL desactivado (`chrome://flags`) al menos una vez.',
          ],
        },
      ],
      errores: [
        {
          sintoma: 'La página entera se queda en blanco por una demo.',
          causa: 'No hay límite de error alrededor de la escena.',
          arreglo: 'Envuelve cada demo en su propio límite con mensaje y reintento.',
        },
        {
          sintoma: '`!!window.WebGLRenderingContext` es `true` pero el canvas no arranca.',
          causa: 'La API existe aunque el contexto no se pueda crear.',
          arreglo: 'Intenta crear el contexto y comprueba el resultado.',
        },
        {
          sintoma: 'Al volver de otra pestaña la escena está en negro.',
          causa: 'El contexto se perdió y nadie lo escuchó.',
          arreglo: 'Maneja `webglcontextlost` y `webglcontextrestored`.',
        },
      ],
      quiz: [
        {
          tipo: 'unica',
          enunciado: '¿Cómo se comprueba si hay WebGL2?',
          opciones: [
            'Creando un contexto y mirando si es `null`',
            'Mirando si existe `window.WebGL2RenderingContext`',
            'Comprobando el user agent',
            'Preguntando a `navigator.gpu`',
          ],
          correcta: 0,
          explicacion: 'La existencia de la API no garantiza el contexto.',
        },
        {
          tipo: 'verdadero-falso',
          enunciado: 'Un límite de error de React captura la pérdida de contexto WebGL.',
          correcta: false,
          explicacion: 'Llega como evento, no como excepción de render.',
        },
        {
          tipo: 'multiple',
          enunciado: '¿Qué hay que hacer al perder el contexto?',
          opciones: [
            'Llamar a `preventDefault` en el evento',
            'Pausar el bucle',
            'Reconstruir los recursos al restaurarse',
            'Recargar la página entera',
          ],
          correctas: [0, 1, 2],
          explicacion: 'Recargar es el último recurso, no el primero.',
        },
        {
          tipo: 'unica',
          enunciado: '¿Por qué un límite por demo y no uno global?',
          opciones: [
            'Para que un fallo no tumbe el resto de la página',
            'Porque React solo permite uno',
            'Porque ocupa menos memoria',
            'Porque el global no funciona con R3F',
          ],
          correcta: 0,
          explicacion: 'El aislamiento es el objetivo del límite.',
        },
      ],
      recursos: [
        {
          titulo: 'MDN: `webglcontextlost`',
          url: 'https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/webglcontextlost_event',
          nota: 'El evento y su pareja de restauración.',
        },
        {
          titulo: 'React: límites de error',
          url: 'https://react.dev/reference/react/Component#catching-rendering-errors-with-an-error-boundary',
          nota: 'Qué capturan y qué no.',
        },
        {
          titulo: 'three: gestión de contexto',
          url: 'https://threejs.org/docs/#api/en/renderers/WebGLRenderer',
          nota: '`dispose` y el ciclo de vida del renderer.',
        },
      ],
      ejercicio: {
        reto: 'Decide si merece la pena reintentar: recibe el número de intentos ya hechos y devuelve `true` hasta tres intentos inclusive.',
        inicial: `export function reintentar(intentos: number): boolean {
  // TODO: como mucho tres intentos.
  return true
}

console.log(reintentar(1), reintentar(4))`,
        solucion: `export function reintentar(intentos: number): boolean {
  return intentos <= 3
}

console.log(reintentar(1), reintentar(4))`,
        pistas: [
          '«Hasta tres intentos inclusive» significa que el 3 todavía cuenta.',
          'Es una comparación simple.',
          'Sin bucles ni acumuladores.',
        ],
      },
    },
    {
      id: '13.6',
      modulo: 13,
      titulo: 'Accesibilidad en 3D',
      objetivo:
        'Hacer usable una escena con teclado, lector de pantalla y movimiento reducido, sin renunciar a la escena.',
      nivel: 'medio',
      minutos: 55,
      bloques: [
        {
          tipo: 'parrafo',
          texto:
            'Un `<canvas>` es una imagen opaca para un lector de pantalla: no hay nodos que anunciar. Eso no se arregla con `aria-label` en el lienzo; se arregla con la interfaz de al lado. Si la escena se puede manipular con botones HTML de verdad, entonces se puede usar con teclado, con lector y con switch. Además hay una preferencia que se ignora casi siempre: `prefers-reduced-motion`. No es un capricho; hay personas a las que el movimiento en pantalla les provoca mareo o migraña.',
        },
        { tipo: 'demo', id: 'm13-accesible', titulo: 'Mover el rover con botones y con el teclado' },
        {
          tipo: 'codigo',
          lenguaje: 'tsx',
          titulo: 'Preferencia del sistema y movimiento que se adapta',
          codigo: `function useMovimientoReducido() {
  const [reducido, setReducido] = useState(false)

  useEffect(() => {
    const consulta = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReducido(consulta.matches)

    const alCambiar = (evento: MediaQueryListEvent) => setReducido(evento.matches)
    consulta.addEventListener('change', alCambiar)
    return () => consulta.removeEventListener('change', alCambiar)
  }, [])

  return reducido
}

// Interpolar o saltar: la diferencia, en una línea.
useFrame((_, delta) => {
  if (reducido) {
    grupo.current.position.set(destino.x, 0, destino.z)
    return
  }
  grupo.current.position.x = damp(grupo.current.position.x, destino.x, 7, delta)
})

// Y el estado, anunciado para quien no ve el lienzo:
<p aria-live="polite">posición {x.toFixed(1)} , {z.toFixed(1)}</p>`,
        },
        {
          tipo: 'tabla',
          cabecera: ['Barrera', 'Por qué', 'Solución'],
          filas: [
            ['Sin ratón', 'Arrastrar una cámara no tiene equivalente con teclado', 'Botones HTML que mueven o giran'],
            ['Sin visión', 'El canvas no expone estructura', 'Descripción en texto y estado con `aria-live`'],
            ['Movimiento', 'Interpolación y balanceos marean', '`prefers-reduced-motion`: saltos, sin vaivén'],
            ['Contraste', 'Escenas oscuras con controles tenues', 'Controles con contraste 4,5:1 sobre el fondo'],
            ['Solo color', 'Elegir por color deja fuera a quien no lo distingue', 'Forma, texto o patrón además del color'],
          ],
        },
        {
          tipo: 'destacado',
          tono: 'porque',
          titulo: 'El canvas es decorativo; el contenido no',
          texto:
            'En todas las demos de este curso hay un párrafo `sr-only` que describe la escena, porque el lienzo no dice nada por sí mismo. Si la pieza central de tu web es un configurador, la descripción no basta: hace falta que la configuración se pueda completar sin verla. Es más trabajo, y es la diferencia entre una web que se ve y una que se usa.',
        },
        {
          tipo: 'lista',
          items: [
            'No pongas manejadores en `window` para el teclado: secuestran la página entera.',
            'Usa botones de verdad (`<button>`) antes que `div` con `onClick`.',
            'Visibiliza el foco con `focus-visible`: el navegador ya sabe cuándo dibujarlo.',
            'Anuncia los cambios con `aria-live="polite"`, no en cada frame de la animación.',
            'Con movimiento reducido, quita el vaivén y la interpolación; el resultado debe seguir siendo el mismo.',
          ],
        },
      ],
      errores: [
        {
          sintoma: 'El lienzo no se puede usar con teclado.',
          causa: 'Toda la interacción depende de `pointermove` y arrastre.',
          arreglo: 'Añade controles HTML con foco que hagan lo mismo.',
        },
        {
          sintoma: 'El lector de pantalla lee «lienzo» y nada más.',
          causa: 'No hay texto alternativo ni estado anunciado.',
          arreglo: 'Describe la escena y publica el estado en una región `aria-live`.',
        },
        {
          sintoma: 'El estado se anuncia sesenta veces por segundo.',
          causa: 'La región `aria-live` se actualiza dentro de `useFrame`.',
          arreglo: 'Anuncia solo cambios de intención: posición final, selección, modo.',
        },
      ],
      quiz: [
        {
          tipo: 'unica',
          enunciado: '¿Qué hace `prefers-reduced-motion`?',
          opciones: [
            'Indica que la persona prefiere menos movimiento',
            'Desactiva WebGL',
            'Reduce la resolución del lienzo',
            'Bloquea las animaciones de CSS',
          ],
          correcta: 0,
          explicacion: 'Es una preferencia que tu código decide respetar.',
        },
        {
          tipo: 'verdadero-falso',
          enunciado: 'Un `aria-label` en el `<canvas>` hace la escena accesible.',
          correcta: false,
          explicacion: 'El lienzo no expone estructura interna; hace falta interfaz alternativa.',
        },
        {
          tipo: 'multiple',
          enunciado: '¿Qué mejora la accesibilidad de una escena 3D?',
          opciones: [
            'Controles HTML con foco',
            'Descripción textual de la escena',
            'Estado anunciado con `aria-live`',
            'Más animación de fondo',
          ],
          correctas: [0, 1, 2],
          explicacion: 'La animación extra es justo lo contrario.',
        },
        {
          tipo: 'unica',
          enunciado: '¿Dónde deben vivir los atajos de teclado de una demo?',
          opciones: [
            'En el contenedor de la demo, con foco',
            'En `window`',
            'En `document.body`',
            'En el `<canvas>` sin foco',
          ],
          correcta: 0,
          explicacion: 'Así no se secuestra el teclado del resto de la página.',
        },
      ],
      recursos: [
        {
          titulo: 'MDN: `prefers-reduced-motion`',
          url: 'https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion',
          nota: 'Cómo se activa y qué se espera de tu código.',
        },
        {
          titulo: 'WCAG: movimiento de la interacción',
          url: 'https://www.w3.org/WAI/WCAG22/Understanding/animation-from-interactions.html',
          nota: 'El criterio que pide poder desactivar el movimiento.',
        },
        {
          titulo: 'W3C: accesibilidad de canvas',
          url: 'https://www.w3.org/WAI/tutorials/images/',
          nota: 'Alternativas textuales y contenido equivalente.',
        },
      ],
      ejercicio: {
        reto: 'Decide la duración de una transición: recibe la duración normal en milisegundos y si hay movimiento reducido, y devuelve 0 en ese caso.',
        inicial: `export function duracion(ms: number, reducido: boolean): number {
  // TODO: con movimiento reducido, la transición no existe.
  return ms
}

console.log(duracion(400, false), duracion(400, true))`,
        solucion: `export function duracion(ms: number, reducido: boolean): number {
  return reducido ? 0 : Math.max(0, ms)
}

console.log(duracion(400, false), duracion(400, true))`,
        pistas: [
          'Cero significa salto instantáneo, no «sin transición definida».',
          'Es una elección entre dos valores.',
          'No hace falta tocar la duración normal.',
        ],
      },
    },
  ],
}

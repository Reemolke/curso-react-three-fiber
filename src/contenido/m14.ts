import type { Modulo } from './tipos'

export const modulo14: Modulo = {
  numero: 14,
  titulo: 'Proyecto final: Taller K-7',
  descripcion:
    'Ocho fases guiadas para construir un configurador-explorador de un rover lunar dentro de un taller: modelos, PBR, selección, física, shaders, audio, medición y despliegue. Todo lo que has practicado, junto y funcionando.',
  lecciones: [
    {
      id: '14.0',
      modulo: 14,
      titulo: 'Presentación y checklist',
      objetivo:
        'Entender qué vas a construir, con qué criterios se evalúa y en qué orden hacerlo sin bloquearte.',
      nivel: 'intro',
      minutos: 20,
      bloques: [
        {
          tipo: 'parrafo',
          texto:
            'El proyecto final no es un ejercicio nuevo: es el mismo temario, aplicado de una vez. Un **configurador-explorador** de un rover lunar dentro de un taller. La escena es un diorama con plataforma giratoria, mesa de trabajo, estantería y un ventanal al paisaje lunar. Eliges módulos (ruedas, panel solar, brazo, antena), los montas, seleccionas piezas con el cursor y puedes soltar tuercas que caen con física. No hay ningún requisito pegado con cinta: la física tiene excusa narrativa (un taller), el estado es el corazón del producto y el audio tiene un sitio donde sonar.',
        },
        {
          tipo: 'destacado',
          tono: 'porque',
          titulo: 'Por qué este proyecto y no un portfolio',
          texto:
            'Un portfolio 3D queda muy bien y no obliga a casi nada: ni física, ni piezas intercambiables, ni estado complejo. Una escena de scroll es más lucida todavía y usa aún menos interacción real. El taller, en cambio, obliga a las tres cosas que cuestan: un grafo de nodos que se manipula, un estado que se comparte entre HTML y escena, y una simulación que se tiene que estabilizar. Y como los modelos son propios, recorres el pipeline completo en vez de descargar un `.glb` de Sketchfab.',
        },
        {
          tipo: 'parrafo',
          texto:
            'Abajo tienes el resultado terminado, corriendo en esta página con el mismo código que vas a escribir. Pruébalo antes de empezar: monta y desmonta módulos, mira cómo cambia la ficha técnica, pasa el cursor por las piezas, vuela a los cuatro encuadres y suelta un par de tuercas. Saber a dónde vas hace que las ocho fases se lean distinto.',
        },
        { tipo: 'demo', id: 'm14-taller', titulo: 'El proyecto terminado, no una captura' },
        {
          tipo: 'tabla',
          cabecera: ['Requisito del enunciado', 'Dónde se cumple', 'Módulo'],
          filas: [
            ['Modelos propios con Draco y KTX2, cargados con gltfjsx', 'Rover y taller generados, comprimidos y medidos', '8'],
            ['Animaciones y partes intercambiables', 'Clips del brazo y los nodos de cada módulo', '8.5 · 5.5'],
            ['PBR, HDRI y sombras', '`Environment` local + direccional con sombra + foco', '4 · 7'],
            ['Raycasting, selección y cámara animada', 'Hover, resaltado y cuatro encuadres', '6'],
            ['Física con Rapier', 'Tuercas que caen y se asientan', '10'],
            ['Postprocesado y shader propio', 'Bloom, viñeta y plano de escaneo', '11'],
            ['Estado global con Zustand', 'Módulos, selección y vista', '13.1'],
            ['UI HTML sobre el canvas', 'Panel de módulos y ficha técnica', '9.4 · 13.1'],
            ['Audio posicional', 'Motor anclado al rover', '13.4'],
            ['Carga, móvil y rendimiento medido', 'Caché, dpr y panel de métricas', '12 · 13.3'],
            ['Desplegado en la web', 'Build estático con rutas relativas', '14.H'],
          ],
        },
        {
          tipo: 'pasos',
          items: [
            {
              titulo: 'Una rama, ocho commits',
              texto:
                'Crea una rama por fase o un commit por fase con el mensaje de la fase. Si una fase sale mal, vuelves a un punto que funcionaba: eso es lo que separa un proyecto de un experimento.',
            },
            {
              titulo: 'No pases de fase sin checkpoint',
              texto:
                'Cada lección termina con una lista de comprobación. Si no pasa, no sigas: los errores se esconden mejor cuando hay menos cosas encima.',
            },
            {
              titulo: 'Mide desde la fase B',
              texto:
                'Abre el panel de métricas en cuanto haya escena. Un proyecto que empieza a medir en la fase G descubre tarde que el problema estaba en la fase C.',
            },
            {
              titulo: 'Deja el README para el final, pero escríbelo',
              texto:
                'Un proyecto sin instrucciones no se puede evaluar. En la fase H se pide URL, capturas y la tabla de presupuesto.',
            },
          ],
        },
        {
          tipo: 'checkpoint',
          titulo: 'Antes de empezar, comprueba que tienes esto',
          items: [
            'Node 20 o superior y `npm` funcionando.',
            'El proyecto del curso arrancando en local (`npm install && npm run dev`).',
            'Las versiones verificadas: `three` 0.187, `@react-three/fiber` 9.8, `drei` 10.7.',
            'Una cuenta de GitHub (o Vercel/Netlify) para el despliegue de la fase H.',
            'Ganas de mirar la consola del navegador: no es opcional.',
          ],
        },
        {
          tipo: 'destacado',
          tono: 'ojo',
          titulo: 'Qué NO se evalúa',
          texto:
            'No se evalúa que tu rover sea bonito ni que el taller tenga más props que el de referencia. Se evalúa que la escena cargue sin errores, que el estado esté en un sitio coherente, que la física no explote, que la medición exista y que la URL pública funcione en un móvil. Un proyecto feo y correcto aprueba; uno precioso que pierde el contexto WebGL al cambiar de módulo, no.',
        },
      ],
      errores: [
        {
          sintoma: 'Empiezas por los efectos y a la semana no hay escena.',
          causa: 'El postprocesado y los shaders son lo más vistoso y lo menos estructural.',
          arreglo: 'Respeta el orden A–H. Bloom sobre una escena vacía no impresiona a nadie.',
        },
        {
          sintoma: 'Copias el código de la solución y no sabes qué cambia qué.',
          causa: 'Se lee el resultado, no el proceso.',
          arreglo: 'Escribe cada fase desde el código de partida y compara después. La solución está para desbloquearte.',
        },
        {
          sintoma: 'Todo funciona en tu portátil y en el móvil no.',
          causa: 'Nunca se probó en móvil ni se midió el presupuesto.',
          arreglo: 'Prueba en un móvil real desde la fase B, no en la H.',
        },
      ],
      quiz: [
        {
          tipo: 'unica',
          enunciado: '¿Qué hace que la física del taller no sea un requisito artificial?',
          opciones: [
            'Que las piezas se montan y caen, y eso tiene sentido en un taller',
            'Que Rapier es más rápido que Cannon',
            'Que la gravedad se puede desactivar',
            'Que las tuercas son instanced',
          ],
          correcta: 0,
          explicacion: 'La simulación tiene una excusa narrativa, no es un adorno técnico.',
        },
        {
          tipo: 'verdadero-falso',
          enunciado: 'El proyecto final introduce conceptos que no se han visto en ningún módulo anterior.',
          correcta: false,
          explicacion: 'Todo se ha practicado antes; el proyecto los junta.',
        },
        {
          tipo: 'multiple',
          enunciado: '¿Qué debe existir al terminar cada fase?',
          opciones: [
            'Un checkpoint que se pueda comprobar',
            'Un commit o rama con ese estado',
            'Una medición o una comprobación en consola',
            'Un despliegue nuevo en producción',
          ],
          correctas: [0, 1, 2],
          explicacion: 'Se despliega una vez, en la fase H; no en cada fase.',
        },
      ],
      recursos: [
        {
          titulo: 'React Three Fiber: documentación',
          url: 'https://r3f.docs.pmnd.rs/getting-started/introduction',
          nota: 'El punto de partida de todo el proyecto.',
        },
        {
          titulo: 'drei: catálogo de helpers',
          url: 'https://drei.pmnd.rs/',
          nota: '`Environment`, `OrbitControls`, `PositionalAudio`, `useProgress`.',
        },
        {
          titulo: 'Rapier: documentación',
          url: 'https://rapier.rs/docs/',
          nota: 'Colliders, masas y estabilidad.',
        },
      ],
      ejercicio: {
        reto: 'Suma el peso de los módulos activos. `PESOS` ya está dado; devuelve el total redondeado a un decimal.',
        inicial: `export type Modulo = 'ruedas' | 'panel' | 'brazo' | 'antena'

const PESOS: Record<Modulo, number> = { ruedas: 12.4, panel: 9.1, brazo: 6.8, antena: 3.2 }

export function peso(modulos: Record<Modulo, boolean>): number {
  // TODO: suma solo los activos y redondea a un decimal.
  return 0
}

console.log(peso({ ruedas: true, panel: true, brazo: false, antena: false }))`,
        solucion: `export type Modulo = 'ruedas' | 'panel' | 'brazo' | 'antena'

const PESOS: Record<Modulo, number> = { ruedas: 12.4, panel: 9.1, brazo: 6.8, antena: 3.2 }

export function peso(modulos: Record<Modulo, boolean>): number {
  const activos = (Object.keys(PESOS) as Modulo[]).filter((modulo) => modulos[modulo])
  const total = activos.reduce((suma, modulo) => suma + PESOS[modulo], 0)
  return Math.round(total * 10) / 10
}

console.log(peso({ ruedas: true, panel: true, brazo: false, antena: false }))`,
        pistas: [
          '`Object.keys` devuelve cadenas: hay que decirle a TypeScript que son `Modulo`.',
          'Filtra antes de sumar, o multiplica por 0 y 1.',
          'Redondear a un decimal es `Math.round(x * 10) / 10`.',
        ],
      },
    },
    {
      id: '14.A',
      modulo: 14,
      titulo: 'Fase A — Planificación y estructura',
      objetivo:
        'Definir los contratos de datos y las carpetas antes de escribir una sola malla, con los imports en un solo sentido.',
      nivel: 'medio',
      minutos: 45,
      bloques: [
        {
          tipo: 'parrafo',
          texto:
            'La fase A no produce nada visible y ahorra la mitad de los problemas. Se decide qué datos existen y quién puede tocar a quién. En este proyecto hay cuatro capas, como en la lección 13.2: entrada, pantallas, escena y datos. La regla es que una capa solo importa de las de abajo. Si la escena importa la pantalla, el proyecto se convierte en un círculo y el bundler empieza a devolver `undefined` en sitios imposibles.',
        },
        {
          tipo: 'codigo',
          lenguaje: 'ts',
          titulo: 'El contrato antes del código',
          codigo: `// src/taller/estado/tienda.ts — no importa three, ni R3F, ni nada visual.
export type Modulo = 'ruedas' | 'panel' | 'brazo' | 'antena'
export type Vista = 'general' | 'ruedas' | 'panel' | 'brazo'

export type Ficha = {
  kg: number
  w: number
  nodos: string[]   // nombres de nodo del glTF, no objetos de three
}

export const FICHA: Record<Modulo, Ficha> = {
  ruedas: { kg: 12.4, w: 8, nodos: ['rueda_del_izq', 'rueda_del_der'] },
  panel: { kg: 9.1, w: -30, nodos: ['panel_pivote'] },
  brazo: { kg: 6.8, w: 14, nodos: ['brazo_base', 'brazo_art1'] },
  antena: { kg: 3.2, w: 5, nodos: ['antena_mastil', 'antena_plato'] },
}

// Lo que la escena necesita saber: nada más.
export type EstadoTaller = {
  modulos: Record<Modulo, boolean>
  seleccion: string | null
  vista: Vista
  alternarModulo: (modulo: Modulo) => void
  seleccionar: (nodo: string | null) => void
  irA: (vista: Vista) => void
}`,
        },
        {
          tipo: 'pasos',
          items: [
            {
              titulo: 'Crea la carpeta y los tres límites',
              texto:
                '`src/taller/estado`, `src/taller/escena`, `src/taller/ui`. Si un archivo no encaja en ninguno, probablemente está en el sitio equivocado.',
            },
            {
              titulo: 'Escribe los tipos antes que las funciones',
              texto:
                '`Modulo`, `Vista`, `Ficha`. Cuando los tipos están claros, las funciones se escriben solas y los errores salen en `tsc`, no en el navegador.',
            },
            {
              titulo: 'Centraliza las rutas de assets',
              texto:
                'Un único `rutas.ts` con `rutaAsset`. Con `base: \'./\'` en Vite, una barra inicial se rompe al desplegar en un subdirectorio.',
            },
            {
              titulo: 'Monta el panel con la escena vacía',
              texto:
                'Un panel de módulos que escribe en la tienda y un `<Canvas>` sin nada dentro. Si el panel cambia el estado, la fase A está hecha.',
            },
          ],
        },
        {
          tipo: 'checkpoint',
          titulo: 'Checkpoint de la fase A',
          items: [
            'El proyecto arranca y muestra un canvas vacío con el panel al lado.',
            '`npx tsc --noEmit` pasa sin errores ni variables sin usar.',
            '`src/taller/estado/tienda.ts` no importa `three` ni `@react-three/fiber`.',
            'Las rutas de los `.glb` salen todas de un único archivo.',
            'Puedes decir en voz alta qué capa importa de cuál, sin mirar el código.',
          ],
        },
        {
          tipo: 'destacado',
          tono: 'truco',
          titulo: 'Los nombres de nodo son un contrato',
          texto:
            'La ficha guarda cadenas (`rueda_del_izq`), no referencias a objetos. Eso mantiene el estado serializable, comprobable en una consola y válido fuera del navegador. El día que el modelo cambie de nombre, `tsc` no te salvará: por eso la fase C incluye listar los nodos reales antes de dar por buena la ficha.',
        },
      ],
      errores: [
        {
          sintoma: 'El estado guarda un `Vector3` y el módulo de estado deja de ser testeable.',
          causa: 'Se importó `three` en la capa de datos.',
          arreglo: 'Guarda `{ x, y, z }` o números; convierte en la escena.',
        },
        {
          sintoma: 'Al desplegar, los modelos dan 404 y en local funcionan.',
          causa: 'Rutas absolutas (`/modelos/rover.glb`) con `base` relativo.',
          arreglo: 'Usa `import.meta.env.BASE_URL` en un único helper.',
        },
        {
          sintoma: 'Dos archivos se importan entre sí y una constante llega `undefined`.',
          causa: 'Se rompió el sentido de las capas.',
          arreglo: 'Baja el tipo compartido a la capa de datos.',
        },
      ],
      quiz: [
        {
          tipo: 'unica',
          enunciado: '¿Qué guarda la ficha de un módulo para referirse al modelo?',
          opciones: [
            'Los nombres de los nodos del glTF',
            'Una referencia al `Object3D`',
            'Un `Mesh` clonado',
            'Una textura',
          ],
          correcta: 0,
          explicacion: 'Cadenas: serializables, comparables y sin dependencia de three.',
        },
        {
          tipo: 'verdadero-falso',
          enunciado: 'La capa de estado puede importar la de escena si solo usa tipos.',
          correcta: false,
          explicacion: 'Un import de tipos se borra, pero la dependencia conceptual sigue ahí y acaba siendo real.',
        },
        {
          tipo: 'multiple',
          enunciado: '¿Qué entra en la fase A?',
          opciones: [
            'Tipos y contratos de datos',
            'Carpetas y límites entre capas',
            'Helper de rutas de assets',
            'El shader de escaneo',
          ],
          correctas: [0, 1, 2],
          explicacion: 'Los efectos son fase F, y con razón.',
        },
      ],
      recursos: [
        {
          titulo: 'Vite: base path',
          url: 'https://vite.dev/guide/build.html#public-base-path',
          nota: 'Por qué `base: \'./\'` cambia cómo se escriben las rutas.',
        },
        {
          titulo: 'TypeScript: módulos',
          url: 'https://www.typescriptlang.org/docs/handbook/modules/reference.html',
          nota: 'Imports de tipos y ciclos.',
        },
        {
          titulo: 'Zustand: TypeScript',
          url: 'https://zustand.docs.pmnd.rs/guides/typescript',
          nota: 'Tipar la tienda sin castings.',
        },
      ],
      ejercicio: {
        reto: 'Escribe `problemas(config)`: devuelve una lista con los módulos incompatibles. El brazo necesita el tren de ruedas y la antena necesita el panel.',
        inicial: `export type Modulo = 'ruedas' | 'panel' | 'brazo' | 'antena'
export type Config = Record<Modulo, boolean>

export function problemas(config: Config): string[] {
  // TODO: devuelve [] si todo es compatible.
  return []
}

console.log(problemas({ ruedas: false, panel: true, brazo: true, antena: false }))`,
        solucion: `export type Modulo = 'ruedas' | 'panel' | 'brazo' | 'antena'
export type Config = Record<Modulo, boolean>

export function problemas(config: Config): string[] {
  const fallos: string[] = []
  if (config.brazo && !config.ruedas) fallos.push('el brazo necesita el tren de ruedas')
  if (config.antena && !config.panel) fallos.push('la antena necesita el panel solar')
  return fallos
}

console.log(problemas({ ruedas: false, panel: true, brazo: true, antena: false }))`,
        pistas: [
          'Es una función pura: recibe datos y devuelve datos.',
          'Un array vacío significa «sin problemas».',
          'Las dos reglas son independientes: pueden fallar las dos.',
        ],
      },
    },
    {
      id: '14.B',
      modulo: 14,
      titulo: 'Fase B — Escena base, cámara y luces',
      objetivo:
        'Levantar el diorama navegable con un presupuesto de luces que se sostenga en móvil, y límites de cámara que no dejen mirar debajo del suelo.',
      nivel: 'medio',
      minutos: 50,
      bloques: [
        {
          tipo: 'parrafo',
          texto:
            'Una escena se encuadra antes de decorarse. Tres cosas y ninguna más: el `<Canvas>` con su `dpr`, una cámara con límites de órbita, y **una** luz que proyecta sombra. La tentación es poner cinco luces, cuatro con sombra, y descubrir en un móvil que el frame dura 60 ms. La regla del presupuesto: una direccional con sombra de 1024, un foco sin sombra y un ambiente. Todo lo demás es HDRI, que cuesta una textura una sola vez.',
        },
        {
          tipo: 'codigo',
          lenguaje: 'tsx',
          titulo: 'Escena mínima con presupuesto de luces',
          codigo: `import { Canvas } from '@react-three/fiber'
import { Environment, OrbitControls } from '@react-three/drei'
import { HDRIS } from './rutas'

<Canvas shadows dpr={[1, 2]} camera={{ position: [3.5, 2.4, 3.4], fov: 42 }}>
  <Environment files={HDRIS.estudio} environmentIntensity={0.32} />

  <ambientLight intensity={0.22} />

  {/* La única que proyecta sombra. */}
  <directionalLight
    position={[4.5, 6.5, 3.5]}
    intensity={1.5}
    castShadow
    shadow-mapSize-width={1024}
    shadow-mapSize-height={1024}
    shadow-camera-left={-5}
    shadow-camera-right={5}
    shadow-camera-top={5}
    shadow-camera-bottom={-5}
    shadow-bias={-0.0005}
  />

  {/* Foco cálido de trabajo: sin sombra, es barato. */}
  <spotLight position={[0.4, 2.9, 0.9]} angle={0.7} penumbra={0.75} intensity={5} distance={8} />

  <OrbitControls
    makeDefault
    enablePan={false}
    target={[0.5, 0.72, 0.6]}
    minDistance={1.8}
    maxDistance={6.5}
    minPolarAngle={0.2}
    maxPolarAngle={Math.PI / 2 - 0.06}
  />
</Canvas>`,
        },
        {
          tipo: 'tabla',
          cabecera: ['Luz', 'Coste', 'Para qué'],
          filas: [
            ['Ambiente', 'Casi cero', 'Que las sombras no sean negras'],
            ['Direccional con sombra', 'Medio (un pase extra por sombra)', 'Sombra principal y volumen'],
            ['Foco sin sombra', 'Bajo', 'Un punto cálido de interés'],
            ['Puntual', 'Bajo', 'Relleno de color'],
            ['HDRI', 'Una textura, una vez', 'Reflejos y luz indirecta creíble'],
          ],
        },
        {
          tipo: 'destacado',
          tono: 'porque',
          titulo: '`maxPolarAngle` no es un detalle',
          texto:
            'Sin límite polar, arrastrar hacia arriba mete la cámara debajo del suelo y el diorama se ve por dentro: paredes sin cara interior, sombras invertidas, sensación de estar roto. Dos números (`0.2` y `PI/2 - 0.06`) bastan para que la cámara nunca haga algo que el decorado no soporta. Es más barato limitar la cámara que modelar el suelo por las dos caras.',
        },
        {
          tipo: 'checkpoint',
          titulo: 'Checkpoint de la fase B',
          items: [
            'Se puede orbitar el taller y la cámara no atraviesa el suelo ni las paredes.',
            'La plataforma proyecta y recibe sombra, y la sombra no tiene dientes raros.',
            'El panel de métricas marca 60 fps o el máximo del monitor con la escena base.',
            'Quitar el HDRI oscurece los metales: eso demuestra que el entorno está iluminando.',
            'El `Canvas` no parpadea al cambiar de tamaño la ventana.',
          ],
        },
      ],
      errores: [
        {
          sintoma: 'La sombra tiene bordes dentados o separada del objeto.',
          causa: '`shadow-camera` demasiado grande o `shadow-bias` mal ajustado.',
          arreglo: 'Ajusta el frustum al tamaño real de la escena y usa `-0.0005`.',
        },
        {
          sintoma: 'Todo se ve planchado y sin reflejos.',
          causa: 'No hay `Environment`, solo luces.',
          arreglo: 'Añade un HDRI local con `environmentIntensity` bajo.',
        },
        {
          sintoma: 'En móvil la escena va a 20 fps con cuatro objetos.',
          causa: 'Varias luces con sombra y `dpr` fijo en 2.',
          arreglo: 'Una sola sombra y `dpr={[1, 2]}`.',
        },
      ],
      quiz: [
        {
          tipo: 'unica',
          enunciado: '¿Cuántas luces deberían proyectar sombra en este proyecto?',
          opciones: ['Una', 'Todas', 'Ninguna', 'Una por objeto'],
          correcta: 0,
          explicacion: 'Cada sombra es un pase de render adicional.',
        },
        {
          tipo: 'verdadero-falso',
          enunciado: '`Environment` ilumina la escena aunque no se ponga `background`.',
          correcta: true,
          explicacion: 'Son dos usos independientes del mismo mapa.',
        },
        {
          tipo: 'multiple',
          enunciado: '¿Qué evita que la cámara se meta debajo del suelo?',
          opciones: [
            '`maxPolarAngle`',
            '`minDistance` / `maxDistance`',
            '`enablePan={false}`',
            '`dpr={[1, 2]}`',
          ],
          correctas: [0, 1, 2],
          explicacion: 'El `dpr` afecta a la resolución, no a la órbita.',
        },
      ],
      recursos: [
        {
          titulo: 'three: luces y sombras',
          url: 'https://threejs.org/manual/#en/lights',
          nota: 'Qué hace cada tipo y cuánto cuesta.',
        },
        {
          titulo: 'drei: `Environment`',
          url: 'https://drei.pmnd.rs/?path=/docs/staging-environment--docs',
          nota: 'HDRI local, intensidad y fondo.',
        },
        {
          titulo: 'drei: `OrbitControls`',
          url: 'https://drei.pmnd.rs/?path=/docs/controls-orbitcontrols--docs',
          nota: 'Límites de órbita: los cuatro que importan.',
        },
      ],
      ejercicio: {
        reto: 'Limita el ángulo polar de la cámara entre 0,2 y `PI/2 − 0,06` radianes.',
        inicial: `export function limitarPolar(angulo: number): number {
  // TODO: recorta el valor al rango permitido.
  return angulo
}

console.log(limitarPolar(-1), limitarPolar(0.5), limitarPolar(3))`,
        solucion: `export function limitarPolar(angulo: number): number {
  const minimo = 0.2
  const maximo = Math.PI / 2 - 0.06
  return Math.min(maximo, Math.max(minimo, angulo))
}

console.log(limitarPolar(-1), limitarPolar(0.5), limitarPolar(3))`,
        pistas: [
          'Dos comparaciones: no bajar del mínimo, no pasar del máximo.',
          '`Math.max` con el mínimo y `Math.min` con el máximo.',
          'El orden da igual aquí, pero encadenarlos como en la solución se lee mejor.',
        ],
      },
    },
    {
      id: '14.C',
      modulo: 14,
      titulo: 'Fase C — Modelos y materiales',
      objetivo:
        'Cargar el rover y el taller, clonarlos para poder manipularlos y comprobar los nombres reales de los nodos.',
      nivel: 'medio',
      minutos: 60,
      bloques: [
        {
          tipo: 'parrafo',
          texto:
            'Llega el momento que más se atasca a los principiantes: el modelo carga, se ve, y a partir de ahí no sabes qué tocar. El `scene` que devuelve `useGLTF` es un `Object3D` normal, con nombre y jerarquía, pero **es compartido**: si lo usas tal cual, ocultar un nodo lo oculta en todas las demos. La solución es `clone(true)`, que copia el árbol y comparte geometrías. Los materiales siguen compartidos, así que si quieres resaltar una pieza hay que clonar también el material: es barato y evita efectos colaterales.',
        },
        {
          tipo: 'codigo',
          lenguaje: 'tsx',
          titulo: 'Clonar, recorrer y quedarse con los nombres',
          codigo: `import { useMemo } from 'react'
import { useGLTF } from './gltf'
import { MODELOS } from './rutas'

function Rover() {
  const { scene } = useGLTF(MODELOS.rover)

  const clon = useMemo(() => {
    const copia = scene.clone(true)

    copia.traverse((objeto) => {
      const malla = objeto as THREE.Mesh
      if (!malla.isMesh) return

      malla.castShadow = true
      malla.receiveShadow = true
      malla.material = malla.material.clone() // para poder resaltar sin contaminar
    })

    // Esto es el checkpoint de la fase: los nombres que existen de verdad.
    console.log(
      copia.children.map((hijo) => hijo.name),
    )

    return copia
  }, [scene])

  return <primitive object={clon} />
}`,
        },
        {
          tipo: 'tabla',
          cabecera: ['Nodo del rover', 'Qué es', 'Módulo al que pertenece'],
          filas: [
            ['`chasis`, `blindaje`, `bandeja`', 'Estructura fija', '—'],
            ['`rueda_del_izq` … `rueda_tras_der`', 'Cuatro ruedas', 'ruedas'],
            ['`buje_*`', 'Los cubos de las ruedas', 'ruedas'],
            ['`panel_pivote`', 'Pivote del panel; sus hijos cuelgan de él', 'panel'],
            ['`brazo_base`, `brazo_art1/2`, `pinza_*`', 'Brazo articulado', 'brazo'],
            ['`antena_mastil`, `antena_plato`', 'Antena de banda X', 'antena'],
            ['`faro_izq`, `faro_der`', 'Emisivos: cuidado al tocar `emissive`', '—'],
          ],
        },
        {
          tipo: 'destacado',
          tono: 'ojo',
          titulo: 'Ocultar un padre oculta a sus hijos',
          texto:
            '`panel_pivote` no es una malla: es un grupo con el panel y tres celdas dentro. Poner `visible = false` en el grupo apaga todo lo que cuelga de él, que es justo lo que quieres. Pero si tu resaltado recorre solo mallas (`isMesh`), seleccionar el grupo no encontrará nada: hay que comprobar si el nombre está en algún antecesor. Ese detalle es la diferencia entre «se selecciona» y «a veces no hace nada».',
        },
        {
          tipo: 'checkpoint',
          titulo: 'Checkpoint de la fase C',
          items: [
            'Todos los nodos del rover se pueden listar por nombre desde la consola.',
            'El taller y el rover llevan sombra y no aparecen negros ni transparentes.',
            'Puedes ocultar `panel_pivote` a mano y el panel desaparece entero.',
            'No hay avisos de texturas 404 ni de `colorSpace` en la consola.',
            'El peso total de los `.glb` está anotado en tu README.',
          ],
        },
      ],
      errores: [
        {
          sintoma: 'Al ocultar una pieza desaparece también en otras vistas.',
          causa: 'Se está usando el `scene` compartido de `useGLTF`.',
          arreglo: 'Clona con `scene.clone(true)` una vez, en `useMemo`.',
        },
        {
          sintoma: 'Resaltar una pieza pinta de azul media escena.',
          causa: 'El material es compartido entre mallas del glTF.',
          arreglo: 'Clona el material por malla antes de tocar `emissive`.',
        },
        {
          sintoma: 'El modelo aparece a escala diminuta o gigante.',
          causa: 'Unidades del exportador (centímetros o metros).',
          arreglo: 'Mide el `Box3` y normaliza la escala en el grupo que lo envuelve.',
        },
      ],
      quiz: [
        {
          tipo: 'unica',
          enunciado: '¿Qué comparte y qué copia `scene.clone(true)`?',
          opciones: [
            'Copia el árbol de nodos y comparte geometrías y materiales',
            'Copia todo, incluidos materiales',
            'Comparte el árbol y copia las geometrías',
            'No copia nada: devuelve el mismo objeto',
          ],
          correcta: 0,
          explicacion: 'Por eso hay que clonar el material a mano si se va a modificar.',
        },
        {
          tipo: 'verdadero-falso',
          enunciado: 'Seleccionar `panel_pivote` requiere mirar si el nombre está en un antecesor de la malla.',
          correcta: true,
          explicacion: 'El pivote es un grupo, no una malla.',
        },
        {
          tipo: 'multiple',
          enunciado: '¿Qué se comprueba en esta fase?',
          opciones: [
            'Los nombres reales de los nodos',
            'Que las sombras funcionan en el modelo',
            'Que no hay 404 ni avisos de color',
            'Que el shader compila',
          ],
          correctas: [0, 1, 2],
          explicacion: 'El shader llega en la fase F.',
        },
      ],
      recursos: [
        {
          titulo: 'R3F: `useGLTF`',
          url: 'https://r3f.docs.pmnd.rs/api/hooks#usegltf',
          nota: 'Caché, precarga y `clear`.',
        },
        {
          titulo: 'three: `Object3D.traverse`',
          url: 'https://threejs.org/docs/#api/en/core/Object3D.traverse',
          nota: 'El recorrido que se usa para todo.',
        },
        {
          titulo: 'gltf-transform',
          url: 'https://gltf-transform.dev/',
          nota: 'Inspeccionar y optimizar el `.glb` desde la terminal.',
        },
      ],
      ejercicio: {
        reto: 'Recorre un árbol de nodos y devuelve los nombres que empiezan por un prefijo. Es la misma lógica que `traverse`, sin three.',
        inicial: `export type Nodo = { nombre: string; hijos?: Nodo[] }

export function conPrefijo(arbol: Nodo, prefijo: string): string[] {
  // TODO: recorre en profundidad y acumula.
  return []
}

const rover: Nodo = {
  nombre: 'rover',
  hijos: [
    { nombre: 'chasis' },
    { nombre: 'rueda_del_izq' },
    { nombre: 'rueda_del_der' },
    { nombre: 'panel_pivote', hijos: [{ nombre: 'panel_solar' }] },
  ],
}

console.log(conPrefijo(rover, 'rueda_'))`,
        solucion: `export type Nodo = { nombre: string; hijos?: Nodo[] }

export function conPrefijo(arbol: Nodo, prefijo: string): string[] {
  const encontrados: string[] = []

  function recorrer(nodo: Nodo) {
    if (nodo.nombre.startsWith(prefijo)) encontrados.push(nodo.nombre)
    nodo.hijos?.forEach(recorrer)
  }

  recorrer(arbol)
  return encontrados
}

const rover: Nodo = {
  nombre: 'rover',
  hijos: [
    { nombre: 'chasis' },
    { nombre: 'rueda_del_izq' },
    { nombre: 'rueda_del_der' },
    { nombre: 'panel_pivote', hijos: [{ nombre: 'panel_solar' }] },
  ],
}

console.log(conPrefijo(rover, 'rueda_'))`,
        pistas: [
          'Una función interna recursiva es más limpia que pasar el acumulador.',
          'Comprueba el nodo antes de bajar a los hijos.',
          '`hijos?.forEach` se salta los nodos hoja sin `if`.',
        ],
      },
    },
    {
      id: '14.D',
      modulo: 14,
      titulo: 'Fase D — Interacción y estado',
      objetivo:
        'Sincronizar el panel HTML con la escena: selección por cursor, resaltado de la pieza y ficha técnica calculada.',
      nivel: 'medio',
      minutos: 60,
      bloques: [
        {
          tipo: 'parrafo',
          texto:
            'Aquí el proyecto deja de ser una escena y empieza a ser una aplicación. El flujo va en los dos sentidos: el panel escribe en la tienda y la escena reacciona; el cursor escribe en la tienda y el panel reacciona. La clave para que no se pise es que **solo la tienda decide**. La escena no guarda copia del estado, y el panel no calcula totales por su cuenta: los dos leen de la misma fuente.',
        },
        {
          tipo: 'codigo',
          lenguaje: 'tsx',
          titulo: 'Selección que no re-renderiza el mundo',
          codigo: `// Estado: un nombre de nodo, no un objeto 3D.
const seleccion = useTaller((estado) => estado.seleccion)
const seleccionar = useTaller((estado) => estado.seleccionar)

// Escena: el cursor escribe, el material se ajusta en un efecto.
<primitive
  object={clon}
  onPointerMove={(evento) => {
    evento.stopPropagation()
    seleccionar(evento.object.name)
  }}
  onPointerOut={() => seleccionar(null)}
/>

// Resaltado: padre o hijo, sin tocar los materiales de otras demos.
useEffect(() => {
  clon.traverse((objeto) => {
    const malla = objeto as THREE.Mesh
    if (!malla.isMesh) return
    const material = malla.material as THREE.MeshStandardMaterial
    const resaltada = seleccion !== null && pertenece(malla, clon, seleccion)
    material.emissive.set(resaltada ? '#2f6df6' : brillo.color)
    material.emissiveIntensity = resaltada ? 0.85 : brillo.intensidad
  })
}, [clon, seleccion])`,
        },
        {
          tipo: 'destacado',
          tono: 'truco',
          titulo: 'Evita notificar cuando el valor no cambia',
          texto:
            '`onPointerMove` se dispara decenas de veces por segundo, casi siempre con el mismo nombre de nodo. Si la acción de la tienda crea un objeto de estado nuevo cada vez, React vuelve a renderizar sin que nada haya cambiado y el resaltado recorre el árbol en balde. Una línea lo arregla: si el valor es el mismo, devuelve el estado actual y Zustand no notifica a nadie.',
        },
        {
          tipo: 'checkpoint',
          titulo: 'Checkpoint de la fase D',
          items: [
            'Elegir un módulo en el panel cambia la escena, y al revés: seleccionar una pieza en la escena se refleja en el panel.',
            'La ficha técnica (masa y consumo) cambia al montar y desmontar, y los números cuadran a mano.',
            'Pasar el cursor por una pieza la resalta; salir del rover la deselecciona.',
            'Un módulo desmontado no se puede seleccionar (no está visible).',
            'El panel funciona con teclado: tabulador y `Enter`.',
          ],
        },
      ],
      errores: [
        {
          sintoma: 'Al mover el ratón la escena va a tirones.',
          causa: 'Cada `pointermove` provoca renders y recorridos del árbol.',
          arreglo: 'No notifiques si el valor no cambia y no guardes objetos en el estado.',
        },
        {
          sintoma: 'El panel y la escena se desincronizan.',
          causa: 'Hay dos copias del estado: una en el panel y otra en la escena.',
          arreglo: 'Una sola tienda; todo lo demás deriva de ella.',
        },
        {
          sintoma: 'El resaltado se queda pegado tras desmontar un módulo.',
          causa: 'La selección apunta a un nodo que ya no es visible.',
          arreglo: 'Limpia la selección al cambiar de módulos.',
        },
      ],
      quiz: [
        {
          tipo: 'unica',
          enunciado: '¿Qué se guarda en la tienda al seleccionar una pieza?',
          opciones: [
            'El nombre del nodo',
            'El objeto `Mesh`',
            'El material',
            'La posición en pantalla',
          ],
          correcta: 0,
          explicacion: 'Cadenas: comparables, serializables y sin three.',
        },
        {
          tipo: 'verdadero-falso',
          enunciado: 'Sincronizar panel y escena exige dos estados independientes que se copian.',
          correcta: false,
          explicacion: 'Exige un único estado y dos consumidores.',
        },
        {
          tipo: 'multiple',
          enunciado: '¿Qué evita renders innecesarios al mover el cursor?',
          opciones: [
            'No notificar cuando el valor no cambia',
            'Leer con `getState()` dentro de `useFrame`',
            'Guardar primitivos en la tienda',
            'Duplicar el estado en la escena',
          ],
          correctas: [0, 1, 2],
          explicacion: 'Duplicar el estado es la causa del problema, no la solución.',
        },
      ],
      recursos: [
        {
          titulo: 'R3F: eventos',
          url: 'https://r3f.docs.pmnd.rs/api/events',
          nota: 'Qué objeto llega en cada evento y cómo parar la propagación.',
        },
        {
          titulo: 'Zustand: selectores',
          url: 'https://zustand.docs.pmnd.rs/guides/prevent-rerenders-with-use-shallow',
          nota: 'Suscripciones finas.',
        },
        {
          titulo: 'React: `useEffect`',
          url: 'https://react.dev/reference/react/useEffect',
          nota: 'Cuándo sincronizar con algo externo.',
        },
      ],
      ejercicio: {
        reto: 'Calcula la ficha técnica a partir de los módulos activos: masa total, consumo y cuántos van montados.',
        inicial: `export type Modulo = 'ruedas' | 'panel' | 'brazo' | 'antena'
type Ficha = { kg: number; w: number }

const FICHA: Record<Modulo, Ficha> = {
  ruedas: { kg: 12.4, w: 8 },
  panel: { kg: 9.1, w: -30 },
  brazo: { kg: 6.8, w: 14 },
  antena: { kg: 3.2, w: 5 },
}
const BASE: Ficha = { kg: 48.2, w: 22 }

export function ficha(modulos: Record<Modulo, boolean>) {
  // TODO: devuelve { kg, w, montados } con un decimal en kg.
  return { kg: BASE.kg, w: BASE.w, montados: 0 }
}

console.log(ficha({ ruedas: true, panel: true, brazo: false, antena: false }))`,
        solucion: `export type Modulo = 'ruedas' | 'panel' | 'brazo' | 'antena'
type Ficha = { kg: number; w: number }

const FICHA: Record<Modulo, Ficha> = {
  ruedas: { kg: 12.4, w: 8 },
  panel: { kg: 9.1, w: -30 },
  brazo: { kg: 6.8, w: 14 },
  antena: { kg: 3.2, w: 5 },
}
const BASE: Ficha = { kg: 48.2, w: 22 }

export function ficha(modulos: Record<Modulo, boolean>) {
  const activos = (Object.keys(FICHA) as Modulo[]).filter((modulo) => modulos[modulo])
  const kg = activos.reduce((total, modulo) => total + FICHA[modulo].kg, BASE.kg)
  const w = activos.reduce((total, modulo) => total + FICHA[modulo].w, BASE.w)
  return { kg: Math.round(kg * 10) / 10, w, montados: activos.length }
}

console.log(ficha({ ruedas: true, panel: true, brazo: false, antena: false }))`,
        pistas: [
          'Empieza por la base y suma encima.',
          'El panel resta: su `w` es negativo.',
          '`montados` es la longitud de la lista de activos.',
        ],
      },
    },
    {
      id: '14.E',
      modulo: 14,
      titulo: 'Fase E — Animación y física',
      objetivo:
        'Disparar clips al montar un módulo y hacer que las piezas caigan y se asienten sin vibrar.',
      nivel: 'alto',
      minutos: 60,
      bloques: [
        {
          tipo: 'parrafo',
          texto:
            'Dos animaciones distintas conviven aquí y conviene no confundirlas. La del **clip** viene del glTF y la reproduce un `AnimationMixer`: tiene duración, se puede mezclar y no la controla React. La de **física** la calcula Rapier en su propio mundo: tú solo creas cuerpos y lees posiciones. Si intentas animar un cuerpo rígido con `useFrame` y `position.set`, la simulación se pelea contigo y aparece el temblor.',
        },
        {
          tipo: 'codigo',
          lenguaje: 'tsx',
          titulo: 'Mezclar clips y soltar una tuerca',
          codigo: `import { useAnimations } from '@react-three/drei'
import { BallCollider, Physics, RigidBody } from '@react-three/rapier'

// 1. Clips: mezcla con crossFade, no cambies de acción a secas.
const { actions } = useAnimations(animaciones, grupo)

useEffect(() => {
  const accion = actions[desplegado ? 'desplegar_panel' : 'plegar']
  if (!accion) return
  accion.reset().fadeIn(0.35).play()
  return () => {
    accion.fadeOut(0.35)
  }
}, [desplegado, actions])

// 2. Física: el cuerpo manda, el mesh obedece.
<Physics gravity={[0, -9.81, 0]}>
  <RigidBody type="fixed" colliders={false}>
    <CuboidCollider args={[4, 0.05, 4]} position={[0, -0.05, 0]} />
    <CuboidCollider args={[1.6, 0.06, 1.6]} position={[0.7, 0.06, 0.9]} />
  </RigidBody>

  {tuercas.map((id) => (
    <RigidBody key={id} colliders={false} friction={0.9} restitution={0.08} position={[0.7, 2.1, 0.9]}>
      <BallCollider args={[0.1]} />
      <mesh castShadow>
        <torusGeometry args={[0.085, 0.038, 8, 18]} />
        <meshStandardMaterial color="#d8b24a" metalness={1} roughness={0.3} />
      </mesh>
    </RigidBody>
  ))}
</Physics>`,
        },
        {
          tipo: 'tabla',
          cabecera: ['Síntoma', 'Causa habitual', 'Arreglo'],
          filas: [
            ['La tuerca vibra en el suelo', 'Collider más pequeño que la malla', 'Ajusta el collider o sube la fricción'],
            ['Atraviesa el suelo', 'Falta el collider fijo del suelo', 'Añade un `CuboidCollider` estático'],
            ['El clip no arranca', 'Se llama a `play()` antes de que exista la acción', 'Comprueba `actions[nombre]`'],
            ['El personaje se queda a medias entre dos clips', '`crossFade` sin `reset()`', '`reset().fadeIn().play()`'],
          ],
        },
        {
          tipo: 'destacado',
          tono: 'porque',
          titulo: 'Por qué la tuerca no debe animarse con código',
          texto:
            'Un cuerpo rígido tiene posición, rotación y velocidad gestionadas por el solver. Si además le escribes `position.set` cada frame, el solver corrige lo que tú acabas de escribir y el resultado es un temblor de un píxel que no se quita con más frames. La regla es simple: si tiene `RigidBody`, lo mueves con impulsos (`applyImpulse`, `setLinvel`) o lo dejas en paz.',
        },
        {
          tipo: 'checkpoint',
          titulo: 'Checkpoint de la fase E',
          items: [
            'Montar un módulo dispara su clip y desmontarlo lo repliega, con mezcla suave.',
            'Una tuerca soltada cae, bota un par de veces y se queda quieta.',
            'Ninguna pieza atraviesa la plataforma ni el suelo.',
            'Con ocho tuercas el framerate no baja de 55 fps.',
            'Recoger las tuercas las elimina del mundo de física, no solo de la pantalla.',
          ],
        },
      ],
      errores: [
        {
          sintoma: 'El primer clic en un módulo no anima nada.',
          causa: 'El clip solo se dispara al cambiar el estado, no al montar.',
          arreglo: 'Dispara el estado inicial en un efecto de montaje o asume el clip «plegado».',
        },
        {
          sintoma: 'Las tuercas se hunden en la plataforma.',
          causa: 'El collider de la plataforma está desplazado respecto a la malla.',
          arreglo: 'Coloca el `CuboidCollider` en la misma posición que la geometría.',
        },
        {
          sintoma: 'Con veinte cuerpos la simulación va a tirones.',
          causa: 'Se crean cuerpos nuevos cada frame en lugar de reciclar.',
          arreglo: 'Limita la lista (`slice(-11)`) y reutiliza posiciones.',
        },
      ],
      quiz: [
        {
          tipo: 'unica',
          enunciado: '¿Quién manda en un cuerpo rígido?',
          opciones: ['El solver de física', '`useFrame`', 'React', 'El `AnimationMixer`'],
          correcta: 0,
          explicacion: 'Escribir la posición a mano pelea con el solver.',
        },
        {
          tipo: 'verdadero-falso',
          enunciado: 'Para cambiar de clip basta con llamar a `play()` del nuevo.',
          correcta: false,
          explicacion: 'Sin `fadeIn`/`fadeOut` el cambio es un corte seco.',
        },
        {
          tipo: 'multiple',
          enunciado: '¿Qué ayuda a que una pieza se asiente sin vibrar?',
          opciones: [
            'Fricción alta',
            'Restitución baja',
            'Un collider que coincida con la malla',
            'Escribir su posición cada frame',
          ],
          correctas: [0, 1, 2],
          explicacion: 'Escribir la posición es justo lo que provoca el temblor.',
        },
      ],
      recursos: [
        {
          titulo: 'drei: `useAnimations`',
          url: 'https://drei.pmnd.rs/?path=/docs/abstractions-useanimations--docs',
          nota: 'Acciones, mezcla y nombres de clip.',
        },
        {
          titulo: 'Rapier: colliders',
          url: 'https://rapier.rs/docs/user_guides/javascript/colliders/',
          nota: 'Formas, masas y sensores.',
        },
        {
          titulo: 'three: `AnimationMixer`',
          url: 'https://threejs.org/docs/#api/en/animation/AnimationMixer',
          nota: '`crossFadeTo` y pesos.',
        },
      ],
      ejercicio: {
        reto: 'Calcula los pesos de una mezcla entre dos clips: a `t = 0` manda el primero, a `t = 1` el segundo, y `t` se recorta a [0, 1].',
        inicial: `export function pesos(t: number): [number, number] {
  // TODO: devuelve [pesoEntrante, pesoSaliente].
  return [1, 0]
}

console.log(pesos(-0.5), pesos(0.25), pesos(1.4))`,
        solucion: `export function pesos(t: number): [number, number] {
  const s = Math.min(1, Math.max(0, t))
  return [1 - s, s]
}

console.log(pesos(-0.5), pesos(0.25), pesos(1.4))`,
        pistas: [
          'Recorta primero y calcula después.',
          'Los dos pesos suman 1.',
          'Devuelve una tupla: el tipo ya lo dice.',
        ],
      },
    },
    {
      id: '14.F',
      modulo: 14,
      titulo: 'Fase F — Efectos, sonido y pulido',
      objetivo:
        'Añadir bloom y viñeta con criterio, escribir el shader de escaneo y colocar el audio en el espacio.',
      nivel: 'alto',
      minutos: 55,
      bloques: [
        {
          tipo: 'parrafo',
          texto:
            'Los efectos son la parte que más se disfruta y la que más se descontrola. Tres reglas: el postprocesado entra al final, con la escena ya correcta; cada efecto se justifica por lo que comunica, no por lo que impresiona; y todo lo que se enciende tiene que poder apagarse en un ajuste de calidad. En el taller quedan tres: bloom (los faros y el foco parecen luces), viñeta (centra la mirada en el rover) y un plano de escaneo con shader propio (dice qué pieza has seleccionado).',
        },
        {
          tipo: 'codigo',
          lenguaje: 'glsl',
          titulo: 'El shader del escáner, sin misterio',
          codigo: `// Fragment: franjas que suben y bordes suaves. No hay luces ni texturas.
precision highp float;

uniform float uTiempo;
uniform float uOpacidad;
uniform vec3 uColor;
varying vec2 vUv;

void main() {
  float franja = smoothstep(0.35, 0.65, fract(vUv.y * 18.0 - uTiempo * 1.4));
  float bordeX = smoothstep(0.0, 0.12, vUv.x) * (1.0 - smoothstep(0.88, 1.0, vUv.x));
  float bordeY = smoothstep(0.0, 0.08, vUv.y) * (1.0 - smoothstep(0.92, 1.0, vUv.y));

  float alfa = (0.10 + franja * 0.55) * bordeX * bordeY * uOpacidad;
  gl_FragColor = vec4(uColor * (0.55 + franja * 1.1), alfa);
}`,
        },
        {
          tipo: 'codigo',
          lenguaje: 'tsx',
          titulo: 'Composer y audio posicional',
          codigo: `import { Bloom, EffectComposer, Vignette } from '@react-three/postprocessing'
import { PositionalAudio } from '@react-three/drei'

<EffectComposer multisampling={0}>
  <Bloom intensity={0.75} luminanceThreshold={0.55} luminanceSmoothing={0.25} mipmapBlur />
  <Vignette offset={0.3} darkness={0.7} />
</EffectComposer>

// El oyente es la cámara: mover la cámara cambia el volumen.
<PositionalAudio ref={sonido} url={AUDIO.motor} distance={1.8} loop autoplay={false} />

const alternar = async () => {
  const nodo = sonido.current
  if (!nodo) return
  if (nodo.context.state === 'suspended') await nodo.context.resume()
  nodo.isPlaying ? nodo.stop() : nodo.play()
}`,
        },
        {
          tipo: 'destacado',
          tono: 'ojo',
          titulo: 'El bloom miente sobre el brillo',
          texto:
            'Con `luminanceThreshold` bajo, cualquier superficie clara brilla y la escena parece de neón. Con un umbral alto, solo los emisivos florecen y la luz se lee como luz. Si el suelo te brilla y no quieres, el problema no es el bloom: es que el suelo es demasiado blanco. Arregla el material antes de bajar el umbral.',
        },
        {
          tipo: 'checkpoint',
          titulo: 'Checkpoint de la fase F',
          items: [
            'Al seleccionar una pieza, el plano de escaneo la barre y se apaga al deseleccionar.',
            'El bloom solo afecta a los emisivos y al foco, no al suelo.',
            'El motor suena anclado al rover y se apaga al alejar la cámara.',
            'El audio solo arranca tras un gesto del usuario y no hay errores de política de reproducción.',
            'Se puede desactivar el postprocesado sin que la escena se rompa (ajuste de calidad).',
          ],
        },
      ],
      errores: [
        {
          sintoma: 'El shader no compila y la consola no dice nada útil.',
          causa: 'Un `uniform` mal declarado o una precisión ausente.',
          arreglo: 'Declara `precision highp float;` y revisa nombres y tipos.',
        },
        {
          sintoma: 'El plano de escaneo tapa todo el rover.',
          causa: 'Alfa alto sin mezcla: `transparent` sin `depthWrite={false}`.',
          arreglo: 'Marca `transparent`, desactiva la escritura de profundidad y baja el alfa.',
        },
        {
          sintoma: '`play()` no suena y no hay error.',
          causa: 'Contexto de audio suspendido por falta de gesto.',
          arreglo: 'Llama a `context.resume()` desde un `onClick`.',
        },
      ],
      quiz: [
        {
          tipo: 'unica',
          enunciado: '¿Qué hace `fract` en GLSL?',
          opciones: [
            'Devuelve la parte decimal',
            'Redondea al entero más cercano',
            'Recorta a [0, 1]',
            'Invierte el signo',
          ],
          correcta: 0,
          explicacion: 'Es la base de los patrones repetidos y las franjas.',
        },
        {
          tipo: 'verdadero-falso',
          enunciado: 'Un plano con shader personalizado necesita luces para verse.',
          correcta: false,
          explicacion: 'El shader decide el color; no usa luces si no las consulta.',
        },
        {
          tipo: 'multiple',
          enunciado: '¿Qué hace falta para que un sonido posicional suene bien?',
          opciones: [
            'Un `AudioListener` (lo pone drei en la cámara)',
            'Un gesto del usuario para reanudar el contexto',
            'Una distancia de referencia razonable',
            'Un oyente por cada malla',
          ],
          correctas: [0, 1, 2],
          explicacion: 'Un oyente por escena, no por malla.',
        },
      ],
      recursos: [
        {
          titulo: 'The Book of Shaders',
          url: 'https://thebookofshaders.com/',
          nota: '`fract`, `smoothstep` y patrones, desde cero.',
        },
        {
          titulo: 'drei: `shaderMaterial`',
          url: 'https://drei.pmnd.rs/?path=/docs/shaders-shadermaterial--docs',
          nota: 'La forma corta de escribir un material propio.',
        },
        {
          titulo: 'postprocessing: efectos disponibles',
          url: 'https://pmndrs.github.io/postprocessing/public/docs/',
          nota: 'Qué existe y qué cuesta cada efecto.',
        },
      ],
      ejercicio: {
        reto: 'Reproduce en TypeScript la franja del shader: `fract(y * 18 - tiempo * 1.4)` y luego `smoothstep(0.35, 0.65, x)`.',
        inicial: `function fract(valor: number): number {
  return valor - Math.floor(valor)
}

function smoothstep(borde0: number, borde1: number, x: number): number {
  const t = Math.min(1, Math.max(0, (x - borde0) / (borde1 - borde0)))
  return t * t * (3 - 2 * t)
}

export function franja(y: number, tiempo: number): number {
  // TODO: encadena fract y smoothstep como en el shader.
  return 0
}

console.log(franja(0.3, 1), franja(0.6, 1))`,
        solucion: `function fract(valor: number): number {
  return valor - Math.floor(valor)
}

function smoothstep(borde0: number, borde1: number, x: number): number {
  const t = Math.min(1, Math.max(0, (x - borde0) / (borde1 - borde0)))
  return t * t * (3 - 2 * t)
}

export function franja(y: number, tiempo: number): number {
  const ciclo = fract(y * 18 - tiempo * 1.4)
  return smoothstep(0.35, 0.65, ciclo)
}

console.log(franja(0.3, 1), franja(0.6, 1))`,
        pistas: [
          'Es literalmente la misma expresión que en el fragment shader.',
          'Primero el ciclo, después el suavizado.',
          '`smoothstep` no recorta el ciclo: ya lo hace `fract`.',
        ],
      },
    },
    {
      id: '14.G',
      modulo: 14,
      titulo: 'Fase G — Optimización y rendimiento',
      objetivo:
        'Medir con cifras, cumplir un presupuesto escrito y saber qué recortar primero en móvil.',
      nivel: 'alto',
      minutos: 50,
      bloques: [
        {
          tipo: 'parrafo',
          texto:
            'Optimizar sin medir es cambiar cosas al azar. El proyecto se mide con el panel de la lección 12.1: fps, milisegundos por frame, draw calls, triángulos y memoria. Con `EffectComposer` hay que desactivar el autoreset de `gl.info` y reiniciarlo a mano cada frame, o solo se lee el último pase (un cuadrilátero) y las cifras mienten. Con eso claro, el presupuesto del taller es: 60 fps en escritorio, 30 fps en móvil de gama media, y **menos de 130 draw calls con la escena completa**, que incluye el pase de sombras.',
        },
        {
          tipo: 'codigo',
          lenguaje: 'tsx',
          titulo: 'Medir de verdad, dentro del bucle',
          codigo: `const gl = useThree((estado) => estado.gl)

// Con postprocesado, \`gl.info\` se reinicia en cada pase.
useEffect(() => {
  gl.info.autoReset = false
  return () => {
    gl.info.autoReset = true
  }
}, [gl])

useFrame((_, delta) => {
  acumulado.current += delta
  frames.current += 1

  if (acumulado.current >= 0.4) {
    fps.current.textContent = String(Math.round(frames.current / acumulado.current))
    llamadas.current.textContent = String(gl.info.render.calls)
    triangulos.current.textContent = String(gl.info.render.triangles)
    acumulado.current = 0
    frames.current = 0
  }

  gl.info.reset() // cierra el frame que acaba de empezar
})`,
        },
        {
          tipo: 'tabla',
          cabecera: ['Recorte', 'Cuándo', 'Qué se gana'],
          filas: [
            ['`dpr` adaptativo', 'Móvil o GPU integrada', 'Hasta un 40 % de tiempo de frame'],
            ['Instancing de props repetidos', 'Más de 20 copias del mismo objeto', 'De N draw calls a 1'],
            ['LOD en objetos lejanos', 'Escena con profundidad', 'Triángulos, sobre todo en sombras'],
            ['Sombras a 1024 y frustum ajustado', 'Siempre', 'Nitidez y menos pase de sombra'],
            ['Apagar el composer', 'Móvil de gama baja', 'Uno o dos pases completos'],
            ['`frameloop="never"` fuera de pantalla', 'Siempre', 'GPU a cero al hacer scroll'],
          ],
        },
        {
          tipo: 'destacado',
          tono: 'porque',
          titulo: 'Los draw calls importan más que los triángulos',
          texto:
            'Una escena con 300 000 triángulos y 40 draw calls va mejor que otra con 30 000 y 400. Cada draw call es trabajo de CPU y de driver: validar estado, enlazar buffers, lanzar. Por eso `BatchedMesh` o `<Instances>` ganan tanto con objetos repetidos, y por eso el taller instancia las tuercas del suelo en lugar de crear cuarenta mallas. Los triángulos preocupan cuando ya no puedes bajar el número de llamadas.',
        },
        {
          tipo: 'checkpoint',
          titulo: 'Checkpoint de la fase G',
          items: [
            'El README tiene una tabla con fps, ms y draw calls medidos en escritorio y en móvil.',
            'El objetivo de 60 fps se cumple en escritorio con la escena completa.',
            'Los draw calls están por debajo de 130 sin contar los objetos instanciados.',
            'En móvil, el `dpr` baja y el postprocesado se puede desactivar desde un ajuste.',
            'Ningún objeto del proyecto se ha quedado sin `dispose` al desmontarse.',
          ],
        },
      ],
      errores: [
        {
          sintoma: 'El panel marca 1 draw call y 1 triángulo.',
          causa: '`gl.info.autoReset` activo con `EffectComposer`.',
          arreglo: 'Desactívalo y llama a `gl.info.reset()` al final de cada frame.',
        },
        {
          sintoma: 'Los fps se hunden al añadir el bloom.',
          causa: 'Blooms con `mipmapBlur` a resolución completa en un móvil.',
          arreglo: 'Baja el `dpr` o apaga el composer por debajo de un umbral.',
        },
        {
          sintoma: 'La memoria de geometrías sube y no baja nunca.',
          causa: 'Geometrías creadas a mano sin `dispose` al desmontar.',
          arreglo: 'Libera en el `cleanup` del efecto, como en la lección 12.6.',
        },
      ],
      quiz: [
        {
          tipo: 'unica',
          enunciado: '¿Por qué hay que reiniciar `gl.info` a mano con postprocesado?',
          opciones: [
            'Porque cada pase lo reinicia y solo leerías el último',
            'Porque el composer lo desactiva',
            'Porque los fps se calculan aparte',
            'Porque three lo bloquea en WebGL2',
          ],
          correcta: 0,
          explicacion: 'El último pase es un cuadrilátero a pantalla completa.',
        },
        {
          tipo: 'verdadero-falso',
          enunciado: 'Reducir triángulos siempre mejora más que reducir draw calls.',
          correcta: false,
          explicacion: 'Casi siempre es al contrario cuando hay objetos repetidos.',
        },
        {
          tipo: 'multiple',
          enunciado: '¿Qué es un presupuesto de rendimiento útil?',
          opciones: [
            'Un número de fps objetivo por dispositivo',
            'Un límite de draw calls',
            'Un tamaño máximo de assets',
            'Una corazonada de que «va fluido»',
          ],
          correctas: [0, 1, 2],
          explicacion: 'Sin cifras no hay presupuesto, solo esperanza.',
        },
      ],
      recursos: [
        {
          titulo: 'three: `WebGLRenderer.info`',
          url: 'https://threejs.org/docs/#api/en/renderers/WebGLRenderer.info',
          nota: 'Qué cuenta y cuándo se reinicia.',
        },
        {
          titulo: 'R3F: performance',
          url: 'https://r3f.docs.pmnd.rs/advanced/scaling-performance',
          nota: '`frameloop`, `dpr` y patrones de escala.',
        },
        {
          titulo: 'three: `InstancedMesh`',
          url: 'https://threejs.org/docs/#api/en/objects/InstancedMesh',
          nota: 'Una malla, muchas copias.',
        },
      ],
      ejercicio: {
        reto: 'Decide si una medición cumple el presupuesto del taller: al menos 55 fps en escritorio y como mucho 130 draw calls.',
        inicial: `export function cumple(fps: number, llamadas: number): boolean {
  // TODO: ambas condiciones a la vez.
  return true
}

console.log(cumple(60, 114), cumple(40, 114), cumple(60, 200))`,
        solucion: `export function cumple(fps: number, llamadas: number): boolean {
  return fps >= 55 && llamadas <= 130
}

console.log(cumple(60, 114), cumple(40, 114), cumple(60, 200))`,
        pistas: [
          'Dos condiciones unidas con `&&`.',
          'El margen de 55 sobre 60 absorbe el ruido de la medición.',
          'Devuelve la comparación directamente.',
        ],
      },
    },
    {
      id: '14.H',
      modulo: 14,
      titulo: 'Fase H — Despliegue y revisión final',
      objetivo:
        'Publicar el proyecto con rutas que funcionen en un subdirectorio y cerrar con una revisión honesta.',
      nivel: 'medio',
      minutos: 40,
      bloques: [
        {
          tipo: 'parrafo',
          texto:
            'Desplegar una SPA con tres.js tiene dos trampas y ninguna es de React. La primera: las rutas de los assets. Con `base: \'./\'` en Vite todo se resuelve contra la URL del documento, así que funciona en la raíz y en `/mi-repo/`. Con rutas absolutas (`/modelos/rover.glb`) funciona en local y da 404 en GitHub Pages. La segunda: el router. Con rutas por hash (`#/leccion/1.1`) no hay que configurar nada en el servidor; con rutas por path hace falta una reescritura a `index.html` en cada host.',
        },
        {
          tipo: 'codigo',
          lenguaje: 'bash',
          titulo: 'Construir, comprobar y publicar',
          codigo: `# 1. Construir. Si hay errores de tipos, no sigas.
npm run build

# 2. Servir el resultado tal como lo verá el servidor.
npx vite preview --port 4173

# 3. Comprobar en la URL de preview:
#    - los modelos cargan (pestaña Red, sin 404)
#    - el router por hash funciona al recargar
#    - el canvas se ve en una ventana de 390 x 844

# 4. Publicar en GitHub Pages (rama gh-pages) o en Vercel/Netlify.
#    En GitHub Pages, el repo se sirve en /nombre-del-repo/:
#    por eso \`base: './'\` y \`rutaAsset()\` no son opcionales.`,
        },
        {
          tipo: 'codigo',
          lenguaje: 'texto',
          titulo: 'GitHub Actions: build y despliegue en Pages',
          codigo: `name: desplegar

on:
  push:
    branches: [main]

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm
      - run: npm ci
      - run: npm run build
      - uses: actions/upload-pages-artifact@v3
        with:
          path: dist

  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment: github-pages
    steps:
      - uses: actions/deploy-pages@v4`,
        },
        {
          tipo: 'destacado',
          tono: 'ojo',
          titulo: 'Lighthouse mide la página, no la escena',
          texto:
            'Un 95 en Lighthouse con la escena sin cargar no significa nada. Mide con el proyecto ya hidratado y con el canvas visible: el rendimiento de WebGL no lo ve Lighthouse, así que el número de fps lo aportas tú con el panel. Las dos cifras juntas —Lighthouse y fps medidos— son la entrega; por separado, ninguna de las dos dice si el proyecto va bien.',
        },
        {
          tipo: 'checkpoint',
          titulo: 'Checkpoint de la fase H (y del curso)',
          items: [
            'URL pública funcionando, con los modelos cargando sin 404.',
            'Recargar en cualquier ruta por hash devuelve la misma página, no un 404 del servidor.',
            'En un móvil real: se puede girar la cámara, montar módulos y el texto se lee.',
            'Lighthouse ≥ 90 en accesibilidad y en buenas prácticas con la escena cargada.',
            'El README explica cómo arrancar, cómo desplegar y qué se ha medido.',
            'La tabla de trazabilidad está rellena: cada parte del proyecto apunta a su módulo.',
          ],
        },
      ],
      errores: [
        {
          sintoma: 'En GitHub Pages los modelos dan 404 y el resto carga.',
          causa: 'Rutas absolutas en lugar de `import.meta.env.BASE_URL`.',
          arreglo: 'Pasa todas las rutas por `rutaAsset()`.',
        },
        {
          sintoma: 'Al recargar en una ruta interna el host devuelve 404.',
          causa: 'Router por path sin reescritura a `index.html`.',
          arreglo: 'Usa rutas por hash o configura el fallback del host.',
        },
        {
          sintoma: 'La build pasa y la página se queda en blanco.',
          causa: 'Un `import` dinámico con una ruta que no existe en producción.',
          arreglo: 'Prueba siempre con `vite preview`, no con el servidor de desarrollo.',
        },
      ],
      quiz: [
        {
          tipo: 'unica',
          enunciado: '¿Por qué `base: \'./\'` evita el 404 en un subdirectorio?',
          opciones: [
            'Porque las rutas se resuelven contra la URL del documento',
            'Porque comprime los assets',
            'Porque cambia el nombre de los archivos',
            'Porque desactiva el router',
          ],
          correcta: 0,
          explicacion: 'Las rutas relativas funcionan en la raíz y en un subdirectorio.',
        },
        {
          tipo: 'verdadero-falso',
          enunciado: 'Lighthouse mide los fps de una escena WebGL.',
          correcta: false,
          explicacion: 'Mide la página; los fps se miden con `gl.info` o un contador propio.',
        },
        {
          tipo: 'multiple',
          enunciado: '¿Qué hay que probar en la URL publicada?',
          opciones: [
            'Que los modelos cargan sin 404',
            'Que recargar en una ruta interna funciona',
            'Que se puede usar en un móvil real',
            'Que el bundle pesa menos de 10 kB',
          ],
          correctas: [0, 1, 2],
          explicacion: 'El tamaño del bundle de three no baja de 10 kB ni queriendo.',
        },
      ],
      recursos: [
        {
          titulo: 'Vite: desplegar en GitHub Pages',
          url: 'https://vite.dev/guide/static-deploy.html#github-pages',
          nota: 'El `base` y el flujo con Actions.',
        },
        {
          titulo: 'GitHub: publicar sitios con Actions',
          url: 'https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site',
          nota: 'Origen de publicación y permisos.',
        },
        {
          titulo: 'Lighthouse: cómo se mide',
          url: 'https://developer.chrome.com/docs/lighthouse/overview',
          nota: 'Qué evalúa y qué no.',
        },
      ],
      ejercicio: {
        reto: 'Compón la ruta de un asset a partir de un `base` que puede acabar en barra o no, sin duplicar separadores.',
        inicial: `export function urlAsset(base: string, ruta: string): string {
  // TODO: une sin barras dobles y sin perder la barra final del base.
  return base + ruta
}

console.log(urlAsset('./', 'modelos/rover.glb'), urlAsset('/curso', '/modelos/rover.glb'))`,
        solucion: `export function urlAsset(base: string, ruta: string): string {
  const izquierda = base.endsWith('/') ? base : base + '/'
  const derecha = ruta.replace(/^\\/+/, '')
  return izquierda + derecha
}

console.log(urlAsset('./', 'modelos/rover.glb'), urlAsset('/curso', '/modelos/rover.glb'))`,
        pistas: [
          'Normaliza el `base` a que acabe en barra.',
          'Quita las barras iniciales de la ruta con una expresión regular.',
          'No uses `path.join`: esto corre en el navegador.',
        ],
      },
    },
  ],
}

import type { Modulo } from './tipos'

export const modulo10: Modulo = {
  numero: 10,
  titulo: 'Física con Rapier',
  descripcion:
    'Cuerpos, colliders, impulsos y sensores con @react-three/rapier: cuándo tiene sentido simular, cuánto cuesta y cómo evitar los tres fallos clásicos.',
  lecciones: [
    {
      id: '10.1',
      modulo: 10,
      titulo: 'Física en el navegador y Rapier',
      objetivo:
        'Entender qué resuelve un motor de física y por qué Rapier se compila a WebAssembly en lugar de escribirse a mano.',
      nivel: 'intro',
      minutos: 45,
      bloques: [
        {
          tipo: 'parrafo',
          texto:
            'Hasta aquí, mover un objeto era cambiar su `position` en un `useFrame`. Eso funciona para una animación, pero no para doscientos objetos que se apilan: en cuanto hay contacto, cada objeto depende de los demás. Un motor de física resuelve esa red de dependencias cada frame: integra velocidades, detecta qué se toca, calcula cuánto penetra y aplica impulsos para separarlo. Es un problema que se puede escribir a mano para un caso simple y que se vuelve inmanejable al tercer caso raro.',
        },
        { tipo: 'demo', id: 'm10-caida', titulo: 'La misma esfera: integrada a mano y simulada' },
        {
          tipo: 'parrafo',
          texto:
            'Escribir la caída a mano ocupa veinte líneas y funciona: gravedad, velocidad, suelo, rebote. Lo que no tiene es rotación, contacto con otras formas, fricción, reposo ni estabilidad. Rapier entrega todo eso con una configuración. Esa es la razón de usarlo: no por la gravedad, que es una multiplicación, sino por los contactos.',
        },
        {
          tipo: 'codigo',
          lenguaje: 'tsx',
          titulo: 'El mínimo absoluto',
          codigo: `import { Physics, RigidBody } from '@react-three/rapier'

<Physics gravity={[0, -9.81, 0]}>
  {/* Suelo: nunca se mueve. */}
  <RigidBody type="fixed">
    <mesh receiveShadow>
      <boxGeometry args={[10, 0.4, 10]} />
      <meshStandardMaterial color="#161d2d" />
    </mesh>
  </RigidBody>

  {/* Caja dinámica: cae y choca. */}
  <RigidBody position={[0, 3, 0]} colliders="cuboid">
    <mesh castShadow>
      <boxGeometry args={[0.8, 0.8, 0.8]} />
      <meshStandardMaterial color="#4d8df6" />
    </mesh>
  </RigidBody>
</Physics>`,
        },
        {
          tipo: 'tabla',
          cabecera: ['Motor', 'Lenguaje', 'Encaje con R3F', 'Nota'],
          filas: [
            ['Rapier', 'Rust → WASM', '`@react-three/rapier`', 'El que usa este curso'],
            ['cannon-es', 'JavaScript', '`@react-three/cannon`', 'Ligero y depurable, menos preciso'],
            ['Ammo.js', 'C++ → WASM', '`@react-three/ammo`', 'Port de Bullet, pesado'],
          ],
        },
        {
          tipo: 'destacado',
          tono: 'porque',
          titulo: 'Por qué WebAssembly',
          texto:
            'La detección de contactos es un bucle numérico que se ejecuta miles de veces por frame. En JavaScript puro, cada operación pasa por objetos y comprobaciones de tipo. Compilado a WebAssembly, Rapier ejecuta ese bucle con instrucciones nativas y memoria contigua. El paquete incluye el binario dentro del JS, así que no hay petición extra: cuando `<Physics>` aparece, se inicializa un módulo WASM de un par de megas.',
        },
        {
          tipo: 'lista',
          items: [
            'Simula lo que necesita contacto: pilas, vehículos, escombros, lanzamientos.',
            'No simules lo que ya está guionizado: una puerta que se abre, un ascensor.',
            'No simules cientos de objetos a la vez en un móvil: 200 cuerpos ya se notan.',
            'Un cuerpo físico sin collider no colisiona; un collider sin malla es invisible y válido.',
            'La física corre a un paso fijo por defecto (1/60 s), independiente de los FPS.',
          ],
        },
      ],
      errores: [
        {
          sintoma: '«Cannot read properties of undefined (reading init)».',
          causa: 'Se importó `@dimforge/rapier3d-compat` directamente sin `await init()`.',
          arreglo: 'Importa `Physics` de `@react-three/rapier` y deja que lo inicialice.',
        },
        {
          sintoma: 'El objeto cae pero atraviesa el suelo.',
          causa: 'El suelo es una malla sin cuerpo rígido o con `type="dynamic"`.',
          arreglo: 'Pon el suelo como `type="fixed"` con su collider.',
        },
        {
          sintoma: 'La escena arranca en blanco un instante y luego aparece.',
          causa: 'El módulo WASM se está inicializando (suspende).',
          arreglo: 'Envuelve en `Suspense` y usa el fallback como pantalla de carga.',
        },
      ],
      quiz: [
        {
          tipo: 'unica',
          enunciado: '¿Qué aporta un motor de física que no da animar `position` a mano?',
          opciones: [
            'Resolución de contactos entre muchos cuerpos',
            'Mejores materiales',
            'Más FPS',
            'Texturas automáticas',
          ],
          correcta: 0,
          explicacion: 'La gravedad es trivial; los contactos son el problema real.',
        },
        {
          tipo: 'verdadero-falso',
          enunciado: 'Rapier descarga su binario de un CDN cada vez que se usa.',
          correcta: false,
          explicacion: 'El WASM va empaquetado dentro del JS del paquete.',
        },
        {
          tipo: 'multiple',
          enunciado: '¿Qué NO conviene simular con física?',
          opciones: [
            'Una puerta con animación fija',
            'Un ascensor con recorrido definido',
            'Una pila de cajas que se derrumba',
            'Un menú que se abre',
          ],
          correctas: [0, 1, 3],
          explicacion: 'Si el movimiento está guionizado, la física solo añade imprevisibilidad y coste.',
        },
        {
          tipo: 'unica',
          enunciado: '¿A qué ritmo corre la simulación por defecto?',
          opciones: ['1/60 s por paso', 'Los FPS de la pantalla', '1 paso por segundo', 'Depende de la GPU'],
          correcta: 0,
          explicacion: 'El paso fijo desacopla la física del refresco.',
        },
      ],
      recursos: [
        {
          titulo: 'react-three-rapier: introducción',
          url: 'https://rapier.rs/docs/user_guides/javascript/getting_started_js',
          nota: 'Cómo se usa Rapier sin React, para ver qué envuelve el paquete.',
        },
        {
          titulo: 'Rapier: rigid bodies',
          url: 'https://rapier.rs/docs/user_guides/javascript/rigid_bodies',
          nota: 'La teoría de cuerpos rígidos que aplica todo el módulo.',
        },
        {
          titulo: '@react-three/rapier',
          url: 'https://github.com/pmndrs/react-three-rapier',
          nota: 'API de los componentes y ejemplos ejecutables.',
        },
      ],
      ejercicio: {
        reto: 'Escribe la integración de una caída libre con rebote: recibe altura, gravedad y número de pasos, y devuelve la altura final. Sin física, solo un bucle.',
        inicial: `// TODO: simula 'pasos' con paso de 1/60 s y rebote de 0,5.
export function caer(altura: number, gravedad: number, pasos: number): number {
  return altura
}

console.log(caer(3, 9.81, 120))`,
        solucion: `export function caer(altura: number, gravedad: number, pasos: number): number {
  const dt = 1 / 60
  let y = altura
  let v = 0
  for (let i = 0; i < pasos; i += 1) {
    v -= gravedad * dt
    y += v * dt
    if (y < 0) {
      y = 0
      v = -v * 0.5
    }
  }
  return y
}

console.log(caer(3, 9.81, 120))`,
        pistas: [
          'La velocidad se actualiza antes que la posición, o cambia el resultado.',
          'El paso es fijo: `1/60`, no el delta real.',
          'Al tocar el suelo, invierte la velocidad y multiplícala por la restitución.',
        ],
      },
    },
    {
      id: '10.2',
      modulo: 10,
      titulo: '`Physics` y `RigidBody`',
      objetivo:
        'Configurar el mundo y elegir entre cuerpo dinámico, fijo y cinemático sin confundirlos.',
      nivel: 'intro',
      minutos: 55,
      bloques: [
        {
          tipo: 'parrafo',
          texto:
            '`<Physics>` crea el mundo: gravedad, paso de simulación, iteraciones. `<RigidBody>` crea un cuerpo dentro de ese mundo y, por defecto, genera un collider a partir de las mallas que contiene. Todo lo que esté fuera de `<Physics>` no existe para el motor.',
        },
        { tipo: 'demo', id: 'm10-cuerpos', titulo: 'El mismo impulso en tres tipos de cuerpo' },
        {
          tipo: 'codigo',
          lenguaje: 'tsx',
          titulo: 'Los tres tipos',
          codigo: `import { Physics, RigidBody } from '@react-three/rapier'

<Physics gravity={[0, -9.81, 0]} timeStep={1 / 60}>
  {/* Cae, choca, gira: lo normal. */}
  <RigidBody type="dynamic" position={[-1.5, 2, 0]}>…</RigidBody>

  {/* Suelo, pared, rampa: nunca se mueve. */}
  <RigidBody type="fixed" position={[0, 0, 0]}>…</RigidBody>

  {/* Se mueve por código y empuja a los demás. */}
  <RigidBody type="kinematicPosition" position={[1.5, 2, 0]}>…</RigidBody>
</Physics>

// Movimiento del cinemático:
cuerpo.current?.setNextKinematicTranslation({ x: 1.5, y: 2.4, z: 0 })`,
        },
        {
          tipo: 'tabla',
          cabecera: ['Tipo', 'Gravedad', 'Impulsos', 'Se mueve por', 'Uso típico'],
          filas: [
            ['`dynamic`', 'Sí', 'Sí', 'Física', 'Cajas, pelotas, escombros'],
            ['`fixed`', 'No', 'No', 'Nada', 'Suelo, paredes, rampas'],
            ['`kinematicPosition`', 'No', 'No', '`setNextKinematicTranslation`', 'Plataformas, puertas, ascensores'],
            ['`kinematicVelocity`', 'No', 'No', '`setLinvel`', 'Cintas, vehículos guiados'],
          ],
        },
        {
          tipo: 'destacado',
          tono: 'ojo',
          titulo: 'Un cuerpo debe tener una sola fuente de verdad',
          texto:
            'Si actualizas `position` a mano en un `useFrame` sobre un cuerpo dinámico, peleas contra el motor: la física escribe la posición después y el objeto tiembla o se teletransporta. Para mover un dinámico, usa impulsos, fuerzas o `setTranslation`. Para moverlo a voluntad, cambia el tipo a cinemático.',
        },
        {
          tipo: 'lista',
          items: [
            '`<Physics>` debe envolver todos los cuerpos; los de fuera no colisionan.',
            '`colliders="cuboid" | "ball" | "hull" | "trimesh" | false` decide el collider automático.',
            '`fixed` no es lo mismo que «sin collider»: un fixed sin collider no bloquea nada.',
            '`linearDamping` y `angularDamping` frenan sin escribir código.',
            '`canSleep` desactivado mantiene despiertos objetos que ya no se mueven: evítalo.',
          ],
        },
      ],
      errores: [
        {
          sintoma: '«It is not possible to add a collider to a fixed body…» o el cuerpo no reacciona.',
          causa: 'Se esperaba movimiento de un `fixed` o de un cinemático.',
          arreglo: 'Cambia `type` a `dynamic` si debe caer o recibir impulsos.',
        },
        {
          sintoma: 'El objeto vibra en el aire.',
          causa: 'Se actualiza su posición por frame además de la simulación.',
          arreglo: 'Deja que la física controle la transformación; usa `setTranslation` solo para teleportar.',
        },
        {
          sintoma: 'Los objetos se hunden lentamente en el suelo.',
          causa: 'Escalas no uniformes en la malla o collider mal ajustado.',
          arreglo: 'Aplica la escala en el collider, no en el `scale` del cuerpo.',
        },
      ],
      quiz: [
        {
          tipo: 'unica',
          enunciado: '¿Qué tipo de cuerpo es una rampa fija?',
          opciones: ['`fixed`', '`dynamic`', '`kinematicPosition`', '`kinematicVelocity`'],
          correcta: 0,
          explicacion: 'No se mueve ni recibe impulsos.',
        },
        {
          tipo: 'verdadero-falso',
          enunciado: 'Un cuerpo cinemático cae por la gravedad si no se mueve.',
          correcta: false,
          explicacion: 'Solo obedece a la posición o velocidad que le marque el código.',
        },
        {
          tipo: 'multiple',
          enunciado: '¿Qué se puede configurar en `<Physics>`?',
          opciones: ['Gravedad', 'Paso de simulación', 'Iteraciones del solver', 'El color de fondo'],
          correctas: [0, 1, 2],
          explicacion: 'El fondo es del `<Canvas>` o de la escena, no de la física.',
        },
        {
          tipo: 'unica',
          enunciado: '¿Qué hace `colliders="hull"`?',
          opciones: [
            'Genera una envolvente convexa a partir de la malla',
            'Usa la malla exacta',
            'Desactiva los colliders',
            'Crea una esfera',
          ],
          correcta: 0,
          explicacion: 'Es una aproximación convexa: barata y suficiente para la mayoría de piezas.',
        },
      ],
      recursos: [
        {
          titulo: 'react-three-rapier: RigidBody',
          url: 'https://rapier.rs/docs/user_guides/javascript/rigid_bodies',
          nota: 'Tipos de cuerpo y qué los diferencia.',
        },
        {
          titulo: 'Rapier: kinematic bodies',
          url: 'https://rapier.rs/docs/user_guides/javascript/rigid_bodies#kinematic-rigid-bodies',
          nota: 'Cómo se mueven las plataformas y los ascensores.',
        },
        {
          titulo: 'react-three-rapier: Physics',
          url: 'https://github.com/pmndrs/react-three-rapier#physics',
          nota: 'Todos los props del mundo y su valor por defecto.',
        },
      ],
      ejercicio: {
        reto: 'Clasifica una lista de objetos por tipo de cuerpo y devuelve cuántos hay de cada tipo.',
        inicial: `type Objeto = { nombre: string; tipo: 'dynamic' | 'fixed' | 'kinematicPosition' }

const objetos: Objeto[] = [
  { nombre: 'suelo', tipo: 'fixed' },
  { nombre: 'caja', tipo: 'dynamic' },
  { nombre: 'puerta', tipo: 'kinematicPosition' },
  { nombre: 'pelota', tipo: 'dynamic' },
]

// TODO: devuelve { dynamic: n, fixed: n, kinematicPosition: n }
export function contar(lista: Objeto[]) {
  return { dynamic: 0, fixed: 0, kinematicPosition: 0 }
}

console.log(contar(objetos))`,
        solucion: `type Objeto = { nombre: string; tipo: 'dynamic' | 'fixed' | 'kinematicPosition' }

const objetos: Objeto[] = [
  { nombre: 'suelo', tipo: 'fixed' },
  { nombre: 'caja', tipo: 'dynamic' },
  { nombre: 'puerta', tipo: 'kinematicPosition' },
  { nombre: 'pelota', tipo: 'dynamic' },
]

export function contar(lista: Objeto[]) {
  const total = { dynamic: 0, fixed: 0, kinematicPosition: 0 }
  for (const objeto of lista) total[objeto.tipo] += 1
  return total
}

console.log(contar(objetos))`,
        pistas: [
          'El tipo es una unión de literales: sirve como clave del objeto de totales.',
          'Recorre la lista y suma uno en la clave correspondiente.',
          'TypeScript acepta `total[objeto.tipo]` porque el tipo es exactamente una de las claves.',
        ],
      },
    },
    {
      id: '10.3',
      modulo: 10,
      titulo: 'Colliders',
      objetivo:
        'Elegir la forma de colisión adecuada y entender por qué no tiene que coincidir con la malla.',
      nivel: 'medio',
      minutos: 60,
      bloques: [
        {
          tipo: 'parrafo',
          texto:
            'La malla se dibuja; el collider se simula. Son dos representaciones distintas del mismo objeto y casi nunca deben ser iguales. Un rover con cuarenta mil triángulos colisiona mejor con cinco cajas y dos cápsulas: cuesta menos, es más estable y se ajusta en segundos. El collider manda en el contacto, así que si la malla y él no coinciden, el objeto se comporta como el collider y se ve como la malla.',
        },
        { tipo: 'demo', id: 'm10-colliders', titulo: 'Cinco formas, la misma caja visible' },
        {
          tipo: 'codigo',
          lenguaje: 'tsx',
          titulo: 'Collider explícito',
          codigo: `import { CuboidCollider, RigidBody } from '@react-three/rapier'

{/* colliders={false} desactiva la generación automática. */}
<RigidBody
  position={[0, 4, 0]}
  colliders={false}
  friction={0.5}
  restitution={0.1}
>
  <CuboidCollider args={[0.4, 0.4, 0.4]} />
  <mesh castShadow>
    <boxGeometry args={[0.8, 0.8, 0.8]} />
    <meshStandardMaterial color="#4d8df6" />
  </mesh>
</RigidBody>`,
        },
        {
          tipo: 'tabla',
          cabecera: ['Collider', 'Args', 'Coste', 'Cuándo'],
          filas: [
            ['`BallCollider`', '`[radio]`', 'Muy bajo', 'Pelotas, cabezas, proyectiles'],
            ['`CuboidCollider`', '`[mx, my, mz]` (medias)', 'Bajo', 'Cajas, paredes, muebles'],
            ['`RoundCuboidCollider`', '`[mx, my, mz, radio]`', 'Bajo', 'Cajas que no deben engancharse'],
            ['`CapsuleCollider`', '`[mediaAltura, radio]`', 'Medio', 'Personajes, brazos'],
            ['`ConeCollider`', '`[mediaAltura, radio]`', 'Medio', 'Conos, embudos'],
            ['`ConvexHullCollider`', '`[vértices]`', 'Medio-alto', 'Piezas irregulares'],
            ['`TrimeshCollider`', '`[vértices, índices]`', 'Alto', 'Suelo con relieve, último recurso'],
          ],
        },
        {
          tipo: 'destacado',
          tono: 'porque',
          titulo: 'Por qué el cuboid recibe medias medidas',
          texto:
            '`args={[0.4, 0.4, 0.4]}` describe un cubo de 0,8 de lado, no de 0,4. El collider se define por semiejes porque así se calculan los contactos y porque el origen está en el centro. Es la causa número uno de «mi collider es la mitad de grande que la malla»: se pasa el tamaño completo donde van las mitades.',
        },
        {
          tipo: 'lista',
          items: [
            'Con `colliders={false}` ningún collider se genera solo: hay que declararlo.',
            'Cada collider hijo se posiciona respecto al cuerpo con `position` y `rotation`.',
            'Un cuerpo puede tener varios colliders: la composición es lo normal en un personaje.',
            '`friction` y `restitution` van por collider, no por cuerpo.',
            'El trimesh es exacto y caro: úsalo para el escenario, rara vez para objetos en movimiento.',
          ],
        },
      ],
      errores: [
        {
          sintoma: 'El objeto se hunde hasta la mitad en el suelo.',
          causa: 'Se pasó el tamaño completo en vez de las medias medidas.',
          arreglo: 'Divide entre dos los tres argumentos del cuboid.',
        },
        {
          sintoma: 'El personaje se queda enganchado en las esquinas del suelo.',
          causa: 'Cuboids con esquinas vivas contra cuboids.',
          arreglo: 'Usa `RoundCuboidCollider` o un trimesh sin escalones.',
        },
        {
          sintoma: 'Al girar el modelo, colisiona como si estuviera recto.',
          causa: 'La rotación está en la malla pero no en el collider.',
          arreglo: 'Pásale `rotation` al collider o rota el `RigidBody` entero.',
        },
      ],
      quiz: [
        {
          tipo: 'unica',
          enunciado: '¿Qué representa `args={[0.5, 0.5, 0.5]}` en un cuboid?',
          opciones: ['Un cubo de 1 de lado', 'Un cubo de 0,5 de lado', 'Un radio', 'El centro de masas'],
          correcta: 0,
          explicacion: 'Son semiejes: cada valor se duplica para obtener el tamaño.',
        },
        {
          tipo: 'verdadero-falso',
          enunciado: 'El collider debe tener la misma forma que la malla.',
          correcta: false,
          explicacion: 'Se aproxima con primitivas para ganar estabilidad y rendimiento.',
        },
        {
          tipo: 'multiple',
          enunciado: '¿Por qué usar varias primitivas en un mismo cuerpo?',
          opciones: [
            'Aproximar una forma compleja con poco coste',
            'Evitar esquinas que se enganchan',
            'Ajustar mejor el contacto',
            'Aumentar los triángulos dibujados',
          ],
          correctas: [0, 1, 2],
          explicacion: 'El collider no se dibuja: no añade triángulos visibles.',
        },
        {
          tipo: 'unica',
          enunciado: '¿Cuándo se justifica un trimesh?',
          opciones: [
            'En un escenario estático con relieve',
            'En todos los objetos móviles',
            'Para una pelota',
            'Para un cubo',
          ],
          correcta: 0,
          explicacion: 'Su coste solo compensa cuando la forma exacta importa y no se mueve.',
        },
      ],
      recursos: [
        {
          titulo: 'Rapier: colliders',
          url: 'https://rapier.rs/docs/user_guides/javascript/colliders',
          nota: 'Todas las formas, su coste y sus parámetros.',
        },
        {
          titulo: 'react-three-rapier: colliders',
          url: 'https://github.com/pmndrs/react-three-rapier#colliders',
          nota: 'Cómo se declaran y cómo se combinan con la generación automática.',
        },
        {
          titulo: 'Rapier: debug render',
          url: 'https://rapier.rs/docs/user_guides/javascript/debugging',
          nota: 'Existe `<Physics debug>`: úsalo para ver el collider real.',
        },
      ],
      ejercicio: {
        reto: 'Convierte un tamaño completo de caja en los argumentos del cuboid y decide si un objeto redondeado necesita `RoundCuboidCollider`.',
        inicial: `// TODO: devuelve los semiejes a partir del tamaño completo.
export function semiejes(tamano: [number, number, number]): [number, number, number] {
  return [0, 0, 0]
}

// TODO: true si el radio es mayor que 0.
export function esRedondeado(radio: number): boolean {
  return false
}

console.log(semiejes([2, 1, 0.5]), esRedondeado(0.1))`,
        solucion: `export function semiejes(tamano: [number, number, number]): [number, number, number] {
  return [tamano[0] / 2, tamano[1] / 2, tamano[2] / 2]
}

export function esRedondeado(radio: number): boolean {
  return radio > 0
}

console.log(semiejes([2, 1, 0.5]), esRedondeado(0.1))`,
        pistas: [
          'Los args del cuboid son la mitad de cada dimensión.',
          'Devuelve una tupla de tres números, no un objeto.',
          'Un radio de 0 es un cuboid normal, no redondeado.',
        ],
      },
    },
    {
      id: '10.4',
      modulo: 10,
      titulo: 'Fuerzas e impulsos',
      objetivo:
        'Mover cuerpos con `applyImpulse`, `addForce` y velocidad inicial, y saber qué cambia la masa.',
      nivel: 'medio',
      minutos: 55,
      bloques: [
        {
          tipo: 'parrafo',
          texto:
            'Un impulso es un empujón instantáneo: cambia la velocidad de golpe. Una fuerza es un empuje continuo: se aplica en cada frame y depende del tiempo. Un salto, un disparo o un rebote son impulsos; un viento, un motor o una atracción son fuerzas. La masa no cambia la fuerza, cambia la aceleración: el mismo impulso mueve menos un cuerpo pesado.',
        },
        { tipo: 'demo', id: 'm10-lanzador', titulo: 'Impulso, masa y gravedad en la misma escena' },
        {
          tipo: 'codigo',
          lenguaje: 'tsx',
          titulo: 'Impulso puntual y fuerza continua',
          codigo: `import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import type { RapierRigidBody } from '@react-three/rapier'

const cuerpo = useRef<RapierRigidBody>(null)

// Una vez: salto o disparo. Se mide en kg·m/s.
function lanzar() {
  cuerpo.current?.applyImpulse({ x: 0, y: 4, z: -8 }, true)
}

// Cada frame: viento o motor. Se mide en newtons.
useFrame(() => {
  cuerpo.current?.addForce({ x: 0.6, y: 0, z: 0 }, true)
})`,
        },
        {
          tipo: 'tabla',
          cabecera: ['Llamada', 'Cuándo', 'Unidad', 'Efecto'],
          filas: [
            ['`applyImpulse`', 'Una vez', 'kg·m/s', 'Cambio instantáneo de velocidad'],
            ['`applyImpulseAtPoint`', 'Una vez', 'kg·m/s', 'Además provoca rotación'],
            ['`addForce`', 'Cada frame', 'N', 'Aceleración continua'],
            ['`setLinvel`', 'Una vez', 'm/s', 'Fija la velocidad, sin masa'],
            ['`setTranslation`', 'Una vez', 'm', 'Teletransporte, sin física'],
          ],
        },
        {
          tipo: 'destacado',
          tono: 'truco',
          titulo: 'La masa se configura en el collider',
          texto:
            'En `@react-three/rapier`, `mass` es una propiedad del collider, no del cuerpo: `args` define la forma y `mass` cuánto pesa. Y no se puede cambiar en caliente sin recrearlo, porque el motor calcula inercia y centro de masas al crearlo. Para un configurador con masa variable, remonta el cuerpo con una `key` o llama a `collider.setMass()`.',
        },
        {
          tipo: 'lista',
          items: [
            'Los impulsos se acumulan si los aplicas en cada frame: multiplica por el delta.',
            '`addForce` con un valor grande y sin delta acelera distinto según los FPS.',
            '`applyImpulseAtPoint` aplica par: sirve para empujar una caja por una esquina.',
            '`setLinvel` ignora la masa: es útil para un salto con altura garantizada.',
            '`gravityScale` permite que un cuerpo flote o pese el doble sin cambiar el mundo.',
          ],
        },
      ],
      errores: [
        {
          sintoma: 'El salto es distinto en cada ordenador.',
          causa: 'Se aplica `applyImpulse` repetidamente dentro de un `useFrame`.',
          arreglo: 'Aplica el impulso una sola vez, en un evento o en un `useEffect`.',
        },
        {
          sintoma: 'Cambiar la masa no tiene efecto.',
          causa: 'La masa está en el cuerpo y no en el collider, o el collider no se recreó.',
          arreglo: 'Pon `mass` en el collider y remonta con `key` al cambiarla.',
        },
        {
          sintoma: 'El cuerpo recibe el impulso pero no se mueve.',
          causa: 'Es `fixed` o está dormido y `wakeUp` está en `false`.',
          arreglo: 'Pasa `true` como segundo argumento para despertarlo.',
        },
      ],
      quiz: [
        {
          tipo: 'unica',
          enunciado: '¿Qué diferencia un impulso de una fuerza?',
          opciones: [
            'El impulso es instantáneo; la fuerza se aplica en el tiempo',
            'La fuerza no afecta a la masa',
            'El impulso solo funciona en Y',
            'No hay diferencia',
          ],
          correcta: 0,
          explicacion: 'Impulso = cambio de momento; fuerza = cambio por unidad de tiempo.',
        },
        {
          tipo: 'verdadero-falso',
          enunciado: 'El mismo impulso produce la misma velocidad en un cuerpo con el doble de masa.',
          correcta: false,
          explicacion: '`J = m · Δv`: a más masa, menos velocidad para el mismo impulso.',
        },
        {
          tipo: 'multiple',
          enunciado: '¿Qué llamadas pueden mover un cuerpo dinámico?',
          opciones: ['`applyImpulse`', '`addForce`', '`setLinvel`', '`setNextKinematicTranslation`'],
          correctas: [0, 1, 2],
          explicacion: 'La última es solo para cuerpos cinemáticos.',
        },
        {
          tipo: 'unica',
          enunciado: '¿Dónde se declara la masa en react-three-rapier?',
          opciones: ['En el collider', 'En `<Physics>`', 'En la malla', 'En el material'],
          correcta: 0,
          explicacion: 'El collider calcula inercia y centro de masas al crearse.',
        },
      ],
      recursos: [
        {
          titulo: 'Rapier: forces and impulses',
          url: 'https://rapier.rs/docs/user_guides/javascript/rigid_bodies#forces-and-impulses',
          nota: 'La diferencia formal y las variantes de aplicación.',
        },
        {
          titulo: 'Rapier: mass properties',
          url: 'https://rapier.rs/docs/user_guides/javascript/colliders#mass-properties',
          nota: 'Masa, densidad e inercia; por qué no se cambian en caliente.',
        },
        {
          titulo: 'MDN: delta time',
          url: 'https://developer.mozilla.org/en-US/docs/Games/Techniques/Control_mechanisms',
          nota: 'Por qué una fuerza sin delta depende de los FPS.',
        },
      ],
      ejercicio: {
        reto: 'Calcula la velocidad resultante de un impulso y la altura de un salto con `v² / (2g)`. Devuelve ambos redondeados a dos decimales.',
        inicial: `// TODO: v = impulso / masa; altura = v² / (2 · gravedad)
export function salto(impulso: number, masa: number, gravedad: number) {
  return { velocidad: 0, altura: 0 }
}

console.log(salto(12, 2, 9.81))`,
        solucion: `export function salto(impulso: number, masa: number, gravedad: number) {
  const velocidad = impulso / masa
  const altura = (velocidad * velocidad) / (2 * gravedad)
  return {
    velocidad: Number(velocidad.toFixed(2)),
    altura: Number(altura.toFixed(2)),
  }
}

console.log(salto(12, 2, 9.81))`,
        pistas: [
          'La velocidad sale de dividir el impulso entre la masa.',
          'La altura máxima se alcanza cuando la velocidad llega a cero.',
          '`toFixed` devuelve texto: envuélvelo en `Number` para seguir operando.',
        ],
      },
    },
    {
      id: '10.5',
      modulo: 10,
      titulo: 'Eventos y sensores',
      objetivo:
        'Detectar colisiones e intersecciones sin contar de más ni gastar eventos que no hacen falta.',
      nivel: 'medio',
      minutos: 55,
      bloques: [
        {
          tipo: 'parrafo',
          texto:
            'Hay dos tipos de aviso. Los contactos (`onCollisionEnter`) ocurren cuando dos colliders sólidos chocan y el motor resuelve el empuje. Las intersecciones (`onIntersectionEnter`) ocurren cuando al menos uno es un sensor: no hay empuje, solo un aviso. Un sensor es la forma correcta de hacer una meta, una zona de daño o un detonante. Un contacto es la forma correcta de romper una caja al golpearla.',
        },
        { tipo: 'demo', id: 'm10-sensor', titulo: 'Zona de meta que cuenta esferas' },
        {
          tipo: 'codigo',
          lenguaje: 'tsx',
          titulo: 'Sensor con deduplicación',
          codigo: `import { useRef } from 'react'
import { CuboidCollider, RigidBody } from '@react-three/rapier'

const vistas = useRef(new Set<number>())

<RigidBody type="fixed" colliders={false}>
  <CuboidCollider
    args={[2.5, 0.05, 1]}
    position={[0, 0.9, 0]}
    sensor
    onIntersectionEnter={({ other }) => {
      const cuerpo = other.rigidBody
      if (!cuerpo) return
      if (vistas.current.has(cuerpo.handle)) return
      vistas.current.add(cuerpo.handle)
      // Aquí: sumar punto, abrir puerta, reproducir sonido…
    }}
  />
</RigidBody>`,
        },
        {
          tipo: 'tabla',
          cabecera: ['Evento', 'Se dispara cuando', 'Requiere', 'Uso'],
          filas: [
            ['`onCollisionEnter`', 'Dos sólidos empiezan a tocarse', 'Ninguno sensor', 'Impacto, rotura'],
            ['`onCollisionExit`', 'Dejan de tocarse', 'Ninguno sensor', 'Fin de contacto'],
            ['`onIntersectionEnter`', 'Algo entra en un sensor', 'Un sensor', 'Meta, zona, detonante'],
            ['`onIntersectionExit`', 'Algo sale del sensor', 'Un sensor', 'Salir de zona'],
            ['`onContactForce`', 'La fuerza de contacto supera un umbral', '`ActiveEvents`', 'Daño por impacto'],
          ],
        },
        {
          tipo: 'destacado',
          tono: 'ojo',
          titulo: 'Los eventos no son gratis',
          texto:
            'Cada collider con eventos activa trabajo extra en el motor y en JavaScript: se crea un objeto por aviso. Un `onIntersectionEnter` en doscientos proyectiles es una fuente de basura constante. Para un juego de partículas, mide posiciones a mano o usa un solo sensor grande. Y recuerda: los eventos se disparan dentro del paso de física, así que no cambies el mundo ahí de forma agresiva.',
        },
        {
          tipo: 'lista',
          items: [
            'Un sensor no frena ni empuja: si el objeto lo atraviesa, es lo esperado.',
            'Deduplica siempre con el `handle` del cuerpo o del collider.',
            'Un cuerpo con varios colliders puede disparar varios eventos del mismo cuerpo.',
            '`onCollisionEnter` se dispara al empezar el contacto, no en cada frame.',
            'Para no actualizar React por frame, guarda el resultado en un `ref` y publica por segundo.',
          ],
        },
      ],
      errores: [
        {
          sintoma: 'El contador sube de tres en tres.',
          causa: 'Un cuerpo con tres colliders dispara tres intersecciones.',
          arreglo: 'Deduplica por `rigidBody.handle`, no por collider.',
        },
        {
          sintoma: 'El sensor bloquea el paso.',
          causa: 'Falta `sensor` en el collider.',
          arreglo: 'Añade `sensor` al `CuboidCollider` correspondiente.',
        },
        {
          sintoma: 'El evento no llega nunca.',
          causa: 'El sensor está en un cuerpo `dynamic` que cae, o la escena no lo incluye.',
          arreglo: 'El sensor suele ir en un `fixed`; comprueba también que el otro cuerpo se mueve.',
        },
      ],
      quiz: [
        {
          tipo: 'unica',
          enunciado: '¿Qué hace un collider con `sensor`?',
          opciones: [
            'Emite avisos sin resolver el contacto',
            'Empuja más fuerte',
            'Se dibuja en wireframe',
            'Desactiva la gravedad',
          ],
          correcta: 0,
          explicacion: 'Detecta pero no colisiona.',
        },
        {
          tipo: 'verdadero-falso',
          enunciado: '`onCollisionEnter` se llama en cada frame mientras dura el contacto.',
          correcta: false,
          explicacion: 'Solo al empezar (y `onCollisionExit` al terminar).',
        },
        {
          tipo: 'multiple',
          enunciado: '¿Por qué puede contar de más un sensor?',
          opciones: [
            'Varios colliders del mismo cuerpo',
            'El evento se repite por pares',
            'No se deduplica por handle',
            'Porque el sensor es fixed',
          ],
          correctas: [0, 1, 2],
          explicacion: 'Ser `fixed` es lo normal en un sensor y no causa el problema.',
        },
        {
          tipo: 'unica',
          enunciado: '¿Qué evento usarías para una zona de meta?',
          opciones: ['`onIntersectionEnter`', '`onCollisionEnter`', '`onContactForce`', '`onSleep`'],
          correcta: 0,
          explicacion: 'Un sensor permite atravesarla y avisar.',
        },
      ],
      recursos: [
        {
          titulo: 'Rapier: sensors',
          url: 'https://rapier.rs/docs/user_guides/javascript/colliders#sensors',
          nota: 'Qué es un sensor y cómo se comporta.',
        },
        {
          titulo: 'react-three-rapier: events',
          url: 'https://github.com/pmndrs/react-three-rapier#events',
          nota: 'Firma exacta de cada handler y ejemplos.',
        },
        {
          titulo: 'Rapier: active events',
          url: 'https://rapier.rs/docs/user_guides/javascript/colliders#active-events',
          nota: 'Cómo se activan y por qué se pueden desactivar por collider.',
        },
      ],
      ejercicio: {
        reto: 'Simula el contador de un sensor: recibe una lista de identificadores de evento y devuelve cuántos cuerpos únicos han pasado.',
        inicial: `// TODO: usa un Set para no contar repetidos.
export function contarUnicos(eventos: number[]): number {
  return 0
}

console.log(contarUnicos([1, 2, 1, 3, 2, 4]))`,
        solucion: `export function contarUnicos(eventos: number[]): number {
  return new Set(eventos).size
}

console.log(contarUnicos([1, 2, 1, 3, 2, 4]))`,
        pistas: [
          '`new Set(lista)` descarta duplicados al construirse.',
          '`.size` da el número de elementos únicos.',
          'El handle de Rapier es un número: encaja como clave del Set.',
        ],
      },
    },
    {
      id: '10.6',
      modulo: 10,
      titulo: 'Estabilidad y rendimiento',
      objetivo:
        'Elegir el paso de simulación y las iteraciones, y reconocer tunneling, jitter y coste excesivo.',
      nivel: 'alto',
      minutos: 60,
      bloques: [
        {
          tipo: 'parrafo',
          texto:
            'La física tiene su propio reloj. Por defecto da pasos de 1/60 de segundo, aunque la pantalla vaya a 144 Hz o a 30. Ese paso fijo hace que la simulación sea reproducible: el mismo impulso produce siempre el mismo salto. Con `timeStep="vary"` la física usa el delta real del frame, se adapta a cualquier pantalla y pierde reproducibilidad: un tirón puede hacer que un objeto atraviese una pared.',
        },
        { tipo: 'demo', id: 'm10-estabilidad', titulo: '200 cuerpos y el coste real por paso' },
        {
          tipo: 'codigo',
          lenguaje: 'tsx',
          titulo: 'Ajustar el mundo',
          codigo: `<Physics
  gravity={[0, -9.81, 0]}
  timeStep={1 / 60}          // fijo: reproducible
  numSolverIterations={6}    // pilas más rígidas
  maxCcdSubsteps={2}         // contra el tunneling
  lengthUnit={1}             // 1 unidad = 1 metro
>
  …
</Physics>`,
        },
        {
          tipo: 'tabla',
          cabecera: ['Síntoma', 'Causa probable', 'Ajuste'],
          filas: [
            ['Un objeto rápido atraviesa una pared', 'Tunneling', '`ccd` en el cuerpo o `maxCcdSubsteps`'],
            ['La pila tiembla y se hunde', 'Pocas iteraciones o masas dispares', '`numSolverIterations`, masas parecidas'],
            ['El objeto se hunde en el suelo', 'Collider mal dimensionado o escala', 'Revisa semiejes y `lengthUnit`'],
            ['La escena va a 20 fps con 300 cuerpos', 'Coste del paso de física', 'Menos cuerpos, dormir objetos, instancing'],
            ['Un cuerpo vibra sin tocar nada', 'Se mueve a mano y con física', 'Una sola fuente de verdad'],
          ],
        },
        {
          tipo: 'destacado',
          tono: 'porque',
          titulo: 'Mide milisegundos por paso, no FPS',
          texto:
            'Los FPS dependen del render, del tamaño del canvas y de la GPU. Para saber si el problema es la física, mide el tiempo entre `useBeforePhysicsStep` y `useAfterPhysicsStep`. Si ese número sube por encima de ~4 ms en un móvil, la física es el cuello de botella, y subir iteraciones lo empeora.',
        },
        {
          tipo: 'lista',
          items: [
            'Paso fijo por defecto: no lo cambies sin motivo medido.',
            '`ccd` solo en objetos rápidos y pequeños, no en todos.',
            'Cada cuerpo dormido es un cuerpo que no cuesta: deja `canSleep` activo.',
            '200 cuerpos en un móvil es el límite práctico de una escena jugable.',
            'Para escombros sin interacción, anima a mano o usa instancing, no física.',
          ],
        },
      ],
      errores: [
        {
          sintoma: 'La simulación va a cámara lenta en un portátil.',
          causa: '`timeStep` bajo combinado con `updateLoop` propio que no acumula tiempo.',
          arreglo: 'Deja `timeStep` en 1/60 y no toques `updateLoop` salvo que sepas por qué.',
        },
        {
          sintoma: 'Un proyectil atraviesa la pared solo a veces.',
          causa: 'Tunneling por velocidad alta y paso grande.',
          arreglo: 'Activa `ccd` en el proyectil y sube `maxCcdSubsteps` a 2.',
        },
        {
          sintoma: 'La pila explota al cargar.',
          causa: 'Objetos creados solapados dentro de otro collider.',
          arreglo: 'Sepáralos al crearlos y deja caer; un solape inicial genera impulsos enormes.',
        },
      ],
      quiz: [
        {
          tipo: 'unica',
          enunciado: '¿Qué hace `timeStep="vary"`?',
          opciones: [
            'Usa el delta real de cada frame',
            'Duplica la gravedad',
            'Desactiva la física',
            'Fija 30 pasos por segundo',
          ],
          correcta: 0,
          explicacion: 'Se adapta al frame a costa de reproducibilidad.',
        },
        {
          tipo: 'verdadero-falso',
          enunciado: 'Activar `ccd` en todos los cuerpos siempre mejora el rendimiento.',
          correcta: false,
          explicacion: 'Añade trabajo: solo compensa en objetos rápidos.',
        },
        {
          tipo: 'multiple',
          enunciado: '¿Qué ayuda a estabilizar una pila?',
          opciones: [
            'Más iteraciones del solver',
            'Masas parecidas entre objetos',
            'Crear los cuerpos sin solaparse',
            'Subir los FPS del render',
          ],
          correctas: [0, 1, 2],
          explicacion: 'El render no cambia la simulación si el paso es fijo.',
        },
        {
          tipo: 'unica',
          enunciado: '¿Qué mide el coste real de la física?',
          opciones: [
            'El tiempo entre antes y después del paso',
            'Los FPS del navegador',
            'El número de triángulos',
            'El tamaño del canvas',
          ],
          correcta: 0,
          explicacion: 'Aísla la simulación del render.',
        },
      ],
      recursos: [
        {
          titulo: 'react-three-rapier: hooks del paso',
          url: 'https://github.com/pmndrs/react-three-rapier#useBeforePhysicsStep',
          nota: '`useBeforePhysicsStep` y `useAfterPhysicsStep` para medir.',
        },
        {
          titulo: 'Rapier: CCD',
          url: 'https://rapier.rs/docs/user_guides/javascript/rigid_bodies#continuous-collision-detection',
          nota: 'Qué es el tunneling y cuándo activarlo.',
        },
        {
          titulo: 'Rapier: simulation parameters',
          url: 'https://rapier.rs/docs/user_guides/javascript/integration_parameters',
          nota: 'Iteraciones, predicción y tolerancias.',
        },
      ],
      ejercicio: {
        reto: 'Convierte un delta de frame en pasos fijos de 1/60 acumulando el sobrante: recibe un array de deltas y devuelve cuántos pasos se ejecutan.',
        inicial: `// TODO: acumula el delta y descuenta 1/60 por paso.
export function pasos(deltas: number[]): number {
  return 0
}

console.log(pasos([0.016, 0.016, 0.033, 0.016]))`,
        solucion: `export function pasos(deltas: number[]): number {
  const fijo = 1 / 60
  let acumulado = 0
  let total = 0
  for (const delta of deltas) {
    acumulado += delta
    while (acumulado >= fijo) {
      acumulado -= fijo
      total += 1
    }
  }
  return total
}

console.log(pasos([0.016, 0.016, 0.033, 0.016]))`,
        pistas: [
          'No redondees: acumula el sobrante para el siguiente frame.',
          '`while` y no `if`: un frame largo puede necesitar varios pasos.',
          'Este es el patrón del acumulador de tiempo fijo que usa cualquier motor.',
        ],
      },
    },
  ],
}

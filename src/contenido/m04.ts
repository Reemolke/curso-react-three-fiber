import type { Modulo } from './tipos'

export const modulo4: Modulo = {
  numero: 4,
  titulo: 'Luz, sombra y entorno',
  descripcion:
    'La luz no decora la escena: la explica. Cinco tipos de emisor, unidades que no se parecen entre sí, sombras que hay que domar y mapas de entorno que resuelven en una línea lo que cinco luces no consiguen.',
  lecciones: [
    {
      id: '4.1',
      modulo: 4,
      titulo: 'Tipos de luz',
      objetivo:
        'Elegir el tipo de luz según el resultado que se busca, no según el que suena más profesional.',
      nivel: 'intro',
      minutos: 55,
      bloques: [
        {
          tipo: 'parrafo',
          texto:
            'Iluminar es decidir de dónde viene la luz y qué quieres que el ojo deduzca. Una luz ambiental dice «aquí no hay dirección»; una direccional dice «hay un sol»; una puntual dice «hay una bombilla cerca». La demo usa exactamente los mismos objetos y cambia solo el emisor: fíjate en las sombras propias y en cómo se separan las piezas del fondo.',
        },
        { tipo: 'demo', id: 'm4-luces', titulo: 'Cinco emisores, cuatro objetos' },
        {
          tipo: 'tabla',
          cabecera: ['Luz', 'Cómo se comporta', 'Qué sugiere', 'Coste'],
          filas: [
            ['`ambientLight`', 'Igual en todas las direcciones', 'Relleno, nada de volumen', 'Mínimo'],
            ['`directionalLight`', 'Rayos paralelos, sin posición real', 'Sol, luz de estudio lejana', 'Bajo'],
            ['`pointLight`', 'Desde un punto, decae con la distancia', 'Bombilla, vela, farola', 'Medio'],
            ['`spotLight`', 'Cono con ángulo y penumbra', 'Foco, linterna, escenario', 'Medio-alto'],
            ['`hemisphereLight`', 'Cielo arriba, suelo abajo', 'Exterior con rebote', 'Mínimo'],
          ],
        },
        {
          tipo: 'codigo',
          lenguaje: 'tsx',
          titulo: 'Las cinco, con sus props importantes',
          codigo: `<ambientLight intensity={0.4} />

<directionalLight position={[4, 6, 3]} intensity={3} />

<pointLight position={[0, 2.4, 0]} intensity={30} distance={0} decay={2} />

<spotLight
  position={[0, 4.2, 1.4]}
  angle={0.55}      // medio ángulo del cono, en radianes
  penumbra={0.45}   // 0 = borde duro, 1 = degradado total
  intensity={80}
  decay={2}
/>

<hemisphereLight args={['#9fc2ff', '#241c14', 1.4]} />`,
        },
        {
          tipo: 'destacado',
          tono: 'porque',
          titulo: 'Por qué «intensidad 2» significa cosas distintas',
          texto:
            'Porque desde three r155 la iluminación es físicamente correcta: una direccional se mide en lux y una puntual en candelas. Una bombilla de 30 candelas es normal; un sol de 30 lux es una habitación a oscuras. Al cambiar de tipo de luz hay que cambiar el número, no solo la etiqueta.',
        },
        {
          tipo: 'lista',
          items: [
            '`decay={2}` es la caída física con el cuadrado de la distancia; bajarlo ilumina más lejos y parece irreal.',
            '`distance={0}` significa alcance infinito; un valor finito apaga la luz de golpe al llegar.',
            'Las luces con posición se pueden ver con un `<mesh>` pequeño en su sitio: es el mejor depurador.',
            '`spotLight` admite `target`; por defecto apunta al origen.',
            'Más luces no es mejor: tres bien colocadas superan a diez mal puestas.',
          ],
        },
      ],
      errores: [
        {
          sintoma: 'La escena es plana aunque hay tres luces.',
          causa: 'Todas están en el mismo lado o son ambientales.',
          arreglo: 'Una principal fuerte, una de relleno al lado contrario y, si acaso, una de contra.',
        },
        {
          sintoma: 'La luz puntual ilumina toda la escena sin importar la distancia.',
          causa: '`decay={0}` o `distance={0}` con intensidad muy alta.',
          arreglo: 'Deja `decay={2}` y ajusta la intensidad en candelas.',
        },
        {
          sintoma: 'El foco ilumina en círculo pero el borde es duro y feo.',
          causa: '`penumbra` a 0.',
          arreglo: 'Sube `penumbra` entre 0,3 y 0,6 para un borde creíble.',
        },
      ],
      quiz: [
        {
          tipo: 'unica',
          enunciado: '¿Qué luz no tiene posición porque sus rayos son paralelos?',
          opciones: ['`directionalLight`', '`pointLight`', '`spotLight`', '`ambientLight`'],
          correcta: 0,
          explicacion:
            'La direccional solo tiene dirección. Su `position` define la dirección respecto al origen, no un punto de emisión.',
        },
        {
          tipo: 'verdadero-falso',
          enunciado: '`ambientLight` produce sombras propias.',
          correcta: false,
          explicacion: 'Ilumina por igual en todas las direcciones: no hay dirección, no hay sombra.',
        },
        {
          tipo: 'multiple',
          enunciado: '¿Qué props controlan la forma de un `spotLight`?',
          opciones: ['`angle`', '`penumbra`', '`intensity`', '`segments`'],
          correctas: [0, 1, 2],
          explicacion: '`segments` es de geometría. La forma del cono la dan `angle` y `penumbra`.',
        },
        {
          tipo: 'unica',
          enunciado: '¿Qué hace `decay={2}`?',
          opciones: [
            'Que la intensidad caiga con el cuadrado de la distancia',
            'Que la luz dure dos segundos',
            'Que la luz tenga dos colores',
            'Que la sombra sea más suave',
          ],
          correcta: 0,
          explicacion: 'Es la atenuación física; `decay={0}` desactiva la caída.',
        },
      ],
      recursos: [
        {
          titulo: 'three.js: Lights',
          url: 'https://threejs.org/docs/#api/en/lights/Light',
          nota: 'La clase base y la lista de tipos disponibles.',
        },
        {
          titulo: 'three.js: physically correct lights',
          url: 'https://threejs.org/docs/#manual/en/introduction/Color-management',
          nota: 'Contexto de por qué las intensidades cambiaron de escala en r155.',
        },
        {
          titulo: 'R3F: lighting',
          url: 'https://r3f.docs.pmnd.rs/api/objects',
          nota: 'Cómo se declaran las luces como etiquetas y qué props aceptan.',
        },
      ],
      ejercicio: {
        reto: 'Cambia la luz de la escena a un `spotLight` con `angle` 0,4 y `penumbra` 0,8, y comprueba que el cono se ve en el suelo.',
        inicial: `import { Canvas } from '@react-three/fiber'

export default function App() {
  return (
    <div style={{ height: 320 }}>
      <Canvas camera={{ position: [3, 2.5, 4] }} frameloop="always">
        {/* TODO: cambia esta luz por un spotLight con angle y penumbra */}
        <ambientLight intensity={1.2} />

        <mesh position={[0, 0.5, 0]}>
          <sphereGeometry args={[0.5, 32, 24]} />
          <meshStandardMaterial color="#e8e2d4" roughness={0.5} />
        </mesh>

        <mesh rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[12, 12]} />
          <meshStandardMaterial color="#252b3d" roughness={0.95} />
        </mesh>
      </Canvas>
    </div>
  )
}`,
        solucion: `import { Canvas } from '@react-three/fiber'

export default function App() {
  return (
    <div style={{ height: 320 }}>
      <Canvas camera={{ position: [3, 2.5, 4] }} frameloop="always">
        <ambientLight intensity={0.15} />
        <spotLight
          position={[0, 4.4, 1.2]}
          angle={0.4}
          penumbra={0.8}
          intensity={120}
          distance={0}
          decay={2}
        />

        <mesh position={[0, 0.5, 0]}>
          <sphereGeometry args={[0.5, 32, 24]} />
          <meshStandardMaterial color="#e8e2d4" roughness={0.5} />
        </mesh>

        <mesh rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[12, 12]} />
          <meshStandardMaterial color="#252b3d" roughness={0.95} />
        </mesh>
      </Canvas>
    </div>
  )
}`,
        pistas: [
          'La luz ambiental debe bajar mucho: si no, no se ve el cono.',
          '`angle` es el medio ángulo en radianes; 0,4 son unos 23 grados.',
          'Sube la intensidad: una luz de foco a cuatro metros necesita muchas candelas.',
        ],
      },
    },
    {
      id: '4.2',
      modulo: 4,
      titulo: 'Intensidad, color y unidades',
      objetivo:
        'Ajustar intensidad y temperatura de color sin quemar la escena, distinguiendo lo que hace la luz de lo que hace la exposición del renderer.',
      nivel: 'medio',
      minutos: 45,
      bloques: [
        {
          tipo: 'parrafo',
          texto:
            'Hay dos perillas que se confunden todo el tiempo. La intensidad es de la luz: cuánta energía emite. La exposición es del renderer: cuánto se multiplica esa energía antes de convertirla a píxeles. Subir la primera ilumina más la escena; subir la segunda blanquea también las zonas que ya estaban bien. Saber cuál tocar ahorra medias horas.',
        },
        { tipo: 'demo', id: 'm4-exposicion', titulo: 'Exposición y temperatura, por separado' },
        {
          tipo: 'codigo',
          lenguaje: 'tsx',
          titulo: 'Una luz con temperatura y un renderer con exposición',
          codigo: `// 2700 K: bombilla cálida. 6500 K: luz de día.
const color = kelvinARgb(3200)

<directionalLight position={[4, 5, 3]} intensity={3.2} color={color} />

// La exposición vive en el renderer, no en la escena.
gl.toneMapping = THREE.ACESFilmicToneMapping
gl.toneMappingExposure = 1

// El entorno también tiene su propia intensidad.
<Environment files={HDRIS.estudio} environmentIntensity={1} />`,
        },
        {
          tipo: 'tabla',
          cabecera: ['Concepto', 'Dónde vive', 'Qué controla', 'Rango típico'],
          filas: [
            ['Intensidad direccional', 'La luz', 'Luz recibida', '1–5'],
            ['Intensidad puntual', 'La luz', 'Candelas', '10–120'],
            ['Color', 'La luz', 'Temperatura percibida', '2200–9000 K'],
            ['`toneMappingExposure`', 'El renderer', 'Multiplicador global', '0,5–2'],
            ['`environmentIntensity`', 'Entorno / escena', 'Peso del HDRI', '0–2'],
          ],
        },
        {
          tipo: 'destacado',
          tono: 'ojo',
          titulo: 'Blanco puro no existe',
          texto:
            'Una luz con color `#ffffff` e intensidad alta hace que todo lo blanco se recorte en el mismo píxel: se pierde el detalle. Con un mapeo tonal ACES y una exposición moderada, los altos se comprimen y siguen teniendo información. Es la diferencia entre «brillante» y «quemado».',
        },
        {
          tipo: 'lista',
          items: [
            'Cambiar el color de una luz no cambia su brillo, solo el tono.',
            'Una escena nocturna necesita poca ambiental y luces de color frío.',
            'El mapeo tonal se aplica al final; no arregla una escena mal iluminada, solo la presenta mejor.',
            'En móviles conviene fijar la exposición: el brillo automático de pantalla ya cambia la percepción.',
            'Si comparas capturas, fija cámara y exposición; si no, estás comparando otra cosa.',
          ],
        },
      ],
      errores: [
        {
          sintoma: 'Todo sale blanco y sin detalle en las zonas claras.',
          causa: 'Exposición demasiado alta o intensidades muy por encima de lo físico.',
          arreglo: 'Baja `toneMappingExposure` a 1 y reduce las intensidades; luego ajusta.',
        },
        {
          sintoma: 'La escena parece de día aunque las luces son de noche.',
          causa: 'La luz ambiental tiene la misma intensidad que en la versión diurna.',
          arreglo: 'Baja la ambiental a 0,05–0,15 y deja que las luces puntuales hagan el trabajo.',
        },
        {
          sintoma: 'Cambiar la temperatura apenas se nota.',
          causa: 'Hay una ambiental blanca muy fuerte que domina el color.',
          arreglo: 'Baja la ambiental y aplica el color en la luz principal.',
        },
      ],
      quiz: [
        {
          tipo: 'unica',
          enunciado: '¿Dónde se ajusta la exposición tonal?',
          opciones: ['En el `WebGLRenderer`', 'En cada luz', 'En el material', 'En la cámara'],
          correcta: 0,
          explicacion: 'Es una propiedad del renderer: `gl.toneMappingExposure`.',
        },
        {
          tipo: 'verdadero-falso',
          enunciado: 'Subir la exposición es equivalente a subir la intensidad de todas las luces.',
          correcta: false,
          explicacion:
            'Se parece, pero no es igual: la exposición actúa después del sombreado y comprime los altos según el mapeo tonal.',
        },
        {
          tipo: 'multiple',
          enunciado: '¿Qué hace que una escena parezca nocturna?',
          opciones: [
            'Ambiental baja',
            'Luces de color frío',
            'Poca luz directa',
            'Exposición al máximo',
          ],
          correctas: [0, 1, 2],
          explicacion: 'Subir la exposición la devuelve al día: borra el efecto.',
        },
        {
          tipo: 'unica',
          enunciado: '¿Qué unidad usan las luces puntuales en three.js moderno?',
          opciones: ['Candelas', 'Lux', 'Vatios', 'Porcentaje'],
          correcta: 0,
          explicacion: 'Las direccionales usan lux; las puntuales y focos, candelas.',
        },
      ],
      recursos: [
        {
          titulo: 'three.js: Color management',
          url: 'https://threejs.org/docs/#manual/en/introduction/Color-management',
          nota: 'Espacios de color, mapeo tonal y por qué un valor 0.5 no se ve como 0.5.',
        },
        {
          titulo: 'three.js: WebGLRenderer.toneMapping',
          url: 'https://threejs.org/docs/#api/en/renderers/WebGLRenderer',
          nota: 'Los tipos de mapeo tonal disponibles y `toneMappingExposure`.',
        },
        {
          titulo: 'Wikipedia: color temperature',
          url: 'https://en.wikipedia.org/wiki/Color_temperature',
          nota: 'La referencia de los kelvin y su uso en iluminación.',
        },
      ],
      ejercicio: {
        reto: 'Añade un control de exposición entre 0,4 y 2 a una escena ya iluminada y comprueba en qué punto se pierden las zonas claras.',
        inicial: `import { useState } from 'react'
import { Canvas } from '@react-three/fiber'

export default function App() {
  const [exposicion, setExposicion] = useState(1)

  return (
    <div style={{ height: 320 }}>
      <input
        type="range"
        min={0.4}
        max={2}
        step={0.05}
        value={exposicion}
        onChange={(e) => setExposicion(Number(e.target.value))}
      />
      <Canvas camera={{ position: [2.6, 2, 3.6] }} frameloop="always">
        <ambientLight intensity={0.4} />
        <directionalLight position={[3, 4, 2]} intensity={3} />
        <mesh>
          <sphereGeometry args={[0.8, 32, 24]} />
          <meshStandardMaterial color="#e8e2d4" roughness={0.4} />
        </mesh>
      </Canvas>
    </div>
  )
}`,
        solucion: `import { useEffect, useState } from 'react'
import { Canvas, useThree } from '@react-three/fiber'
import * as THREE from 'three'

function Exposicion({ valor }: { valor: number }) {
  const gl = useThree((estado) => estado.gl)

  useEffect(() => {
    gl.toneMapping = THREE.ACESFilmicToneMapping
    gl.toneMappingExposure = valor
  }, [gl, valor])

  return null
}

export default function App() {
  const [exposicion, setExposicion] = useState(1)

  return (
    <div style={{ height: 320 }}>
      <input
        type="range"
        min={0.4}
        max={2}
        step={0.05}
        value={exposicion}
        onChange={(e) => setExposicion(Number(e.target.value))}
      />
      <Canvas camera={{ position: [2.6, 2, 3.6] }} frameloop="always">
        <Exposicion valor={exposicion} />
        <ambientLight intensity={0.4} />
        <directionalLight position={[3, 4, 2]} intensity={3} />
        <mesh>
          <sphereGeometry args={[0.8, 32, 24]} />
          <meshStandardMaterial color="#e8e2d4" roughness={0.4} />
        </mesh>
      </Canvas>
    </div>
  )
}`,
        pistas: [
          'La exposición se aplica con un `useEffect` sobre `gl`.',
          'Sin `toneMapping` asignado, el cambio de exposición no se nota igual.',
          'Prueba 0,5 / 1 / 1,8 y compara el detalle en la zona iluminada.',
        ],
      },
    },
    {
      id: '4.3',
      modulo: 4,
      titulo: 'Sombras',
      objetivo:
        'Configurar sombras sin artefactos: entender `castShadow`, `receiveShadow`, `mapSize`, `bias` y el frustum de la luz.',
      nivel: 'medio',
      minutos: 60,
      bloques: [
        {
          tipo: 'parrafo',
          texto:
            'Una sombra en tiempo real no es física: es un truco. El renderer dibuja la escena desde el punto de vista de la luz y guarda la profundidad de cada píxel en un mapa. Luego, al dibujar la escena desde la cámara, compara esa profundidad. Si el fragmento está más lejos que lo guardado, está en sombra. Todos los artefactos vienen de esa comparación.',
        },
        { tipo: 'demo', id: 'm4-sombras', titulo: 'Las cuatro perillas, en vivo' },
        {
          tipo: 'codigo',
          lenguaje: 'tsx',
          titulo: 'Lo mínimo para que haya sombras de verdad',
          codigo: `// 1. El canvas tiene que activarlas.
<Canvas shadows>

// 2. La luz proyecta.
<directionalLight
  castShadow
  position={[4.5, 7, 3.5]}
  intensity={3}
  shadow-mapSize-width={512}
  shadow-mapSize-height={512}
  shadow-bias={-0.0005}
  shadow-normalBias={0.03}
  shadow-camera-left={-6}
  shadow-camera-right={6}
  shadow-camera-top={6}
  shadow-camera-bottom={-6}
/>

// 3. Quien tapa, proyecta. Quien recibe, recibe.
<mesh castShadow />
<mesh receiveShadow />`,
        },
        {
          tipo: 'tabla',
          cabecera: ['Perilla', 'Qué hace', 'Síntoma si está mal'],
          filas: [
            ['`mapSize`', 'Resolución del mapa', 'Baja: borde dentado y bloques'],
            ['`bias`', 'Desplaza la comparación de profundidad', 'Negativo de más: sombra despegada'],
            ['`normalBias`', 'Desplaza en la dirección de la normal', 'Alto: la sombra se separa del objeto'],
            ['`radius`', 'Suaviza el borde (PCF)', 'Bajo: borde de sierra'],
            ['`shadow.camera`', 'Volumen que cubre la luz', 'Pequeño: sombras cortadas; grande: borrosas'],
          ],
        },
        {
          tipo: 'destacado',
          tono: 'porque',
          titulo: 'Shadow acne y peter-panning son el mismo problema',
          texto:
            'La superficie se compara consigo misma y a veces pierde por un margen ínfimo: aparecen rayas (acne). Si empujas demasiado el sesgo para quitarlas, la sombra deja de tocar el objeto y parece flotar (peter-panning). No hay valor mágico: se busca el mínimo que elimine las rayas. `normalBias` suele ser más seguro que `bias` porque empuja en la dirección de la superficie.',
        },
        {
          tipo: 'lista',
          items: [
            'Sin `shadows` en el `<Canvas>` no se genera ningún mapa: los `castShadow` no hacen nada.',
            'Una luz puntual necesita un mapa cúbico (seis caras): es la sombra más cara.',
            'Las sombras no atraviesan objetos: si algo no proyecta, revisa `castShadow` en ese objeto.',
            'El frustum de la direccional es una caja ortográfica; ajústalo al tamaño de la escena.',
            'Las sombras de contacto (`ContactShadows`) son otra técnica: no necesitan luces.',
          ],
        },
      ],
      errores: [
        {
          sintoma: 'Rayas horizontales dentro de la sombra.',
          causa: 'Shadow acne: el sesgo es 0 o el mapa tiene poca resolución.',
          arreglo: 'Sube `normalBias` a 0,02–0,04 y `mapSize` a 1024 antes de tocar `bias`.',
        },
        {
          sintoma: 'La sombra flota y no toca el objeto.',
          causa: '`bias` o `normalBias` demasiado altos.',
          arreglo: 'Bájalos hasta que la sombra vuelva a tocar, justo antes de que aparezca el acne.',
        },
        {
          sintoma: 'La sombra se corta en los bordes de la escena.',
          causa: 'El frustum de la luz es más pequeño que la zona iluminada.',
          arreglo: 'Amplía `shadow-camera-left/right/top/bottom` o reduce la escena.',
        },
      ],
      quiz: [
        {
          tipo: 'unica',
          enunciado: '¿Qué hay que activar en el `<Canvas>` para que existan sombras?',
          opciones: ['`shadows`', '`shadowMap`', '`castShadow`', '`renderer.shadows`'],
          correcta: 0,
          explicacion: 'Es la prop de R3F que activa el mapa de sombras del renderer.',
        },
        {
          tipo: 'verdadero-falso',
          enunciado: 'Un objeto con `receiveShadow` proyecta sombra sobre otros.',
          correcta: false,
          explicacion:
            '`receiveShadow` solo permite recibirla; para proyectar hace falta `castShadow`.',
        },
        {
          tipo: 'multiple',
          enunciado: '¿Qué reduce el shadow acne?',
          opciones: [
            'Subir `mapSize`',
            'Ajustar `normalBias`',
            'Un `bias` ligeramente negativo',
            'Apagar las sombras',
          ],
          correctas: [0, 1, 2],
          explicacion: 'Apagarlas lo elimina, pero también elimina la sombra: no es una solución.',
        },
        {
          tipo: 'unica',
          enunciado: '¿Qué luz tiene la sombra más cara?',
          opciones: ['`pointLight`', '`directionalLight`', '`spotLight`', '`ambientLight`'],
          correcta: 0,
          explicacion: 'Necesita seis renders de profundidad, uno por cara del cubo.',
        },
      ],
      recursos: [
        {
          titulo: 'three.js: LightShadow',
          url: 'https://threejs.org/docs/#api/en/lights/shadows/LightShadow',
          nota: '`mapSize`, `bias`, `normalBias`, `radius` y la cámara de la sombra.',
        },
        {
          titulo: 'three.js: DirectionalLightShadow',
          url: 'https://threejs.org/docs/#api/en/lights/shadows/DirectionalLightShadow',
          nota: 'La cámara ortográfica que hay que ajustar al tamaño de la escena.',
        },
        {
          titulo: 'R3F: shadows',
          url: 'https://r3f.docs.pmnd.rs/api/canvas',
          nota: 'Los tipos de mapa de sombras que acepta la prop `shadows`.',
        },
      ],
      ejercicio: {
        reto: 'Activa sombras en la escena, deja el sesgo a 0 para provocar acne y corrígelo solo con `normalBias`.',
        inicial: `import { Canvas } from '@react-three/fiber'

export default function App() {
  return (
    <div style={{ height: 320 }}>
      {/* TODO: activa shadows en el canvas */}
      <Canvas camera={{ position: [3, 2.4, 4] }} frameloop="always">
        <ambientLight intensity={0.4} />
        <directionalLight position={[3, 5, 2]} intensity={3} />

        <mesh position={[0, 0.5, 0]}>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial color="#e8e2d4" />
        </mesh>

        <mesh rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[10, 10]} />
          <meshStandardMaterial color="#252b3d" />
        </mesh>
      </Canvas>
    </div>
  )
}`,
        solucion: `import { Canvas } from '@react-three/fiber'

export default function App() {
  return (
    <div style={{ height: 320 }}>
      <Canvas shadows camera={{ position: [3, 2.4, 4] }} frameloop="always">
        <ambientLight intensity={0.4} />
        <directionalLight
          position={[3, 5, 2]}
          intensity={3}
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
          shadow-normalBias={0.03}
          shadow-camera-left={-5}
          shadow-camera-right={5}
          shadow-camera-top={5}
          shadow-camera-bottom={-5}
        />

        <mesh position={[0, 0.5, 0]} castShadow receiveShadow>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial color="#e8e2d4" />
        </mesh>

        <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
          <planeGeometry args={[10, 10]} />
          <meshStandardMaterial color="#252b3d" />
        </mesh>
      </Canvas>
    </div>
  )
}`,
        pistas: [
          'Sin `castShadow` en la luz no se genera el mapa.',
          'El suelo solo necesita `receiveShadow`; la caja, los dos.',
          'Prueba primero con `normalBias={0}` para ver el acne y luego súbelo.',
        ],
      },
    },
    {
      id: '4.4',
      modulo: 4,
      titulo: 'HDRI e iluminación basada en imagen',
      objetivo:
        'Iluminar con un mapa de entorno local y separar lo que es el fondo de lo que es la iluminación.',
      nivel: 'medio',
      minutos: 50,
      bloques: [
        {
          tipo: 'parrafo',
          texto:
            'Una foto panorámica de un lugar real contiene toda su iluminación: el sol, el cielo, los rebotes de las paredes. Un HDRI guarda esa información con valores por encima de 1, que es justo lo que un PNG no puede. Al usarlo como entorno, three.js lo procesa en un mapa prefiltrdo y lo aplica como luz ambiental y como reflejo: es la iluminación basada en imagen.',
        },
        { tipo: 'demo', id: 'm4-hdri', titulo: 'Tres entornos del curso: estudio, exterior, luna' },
        {
          tipo: 'codigo',
          lenguaje: 'tsx',
          titulo: 'Cargar un `.hdr` local con drei',
          codigo: `import { Environment } from '@react-three/drei'
import { HDRIS } from '../tres/rutas'

// Ilumina y refleja, sin pintar el fondo.
<Environment files={HDRIS.estudio} environmentIntensity={1} />

// Ilumina y además pinta el fondo.
<Environment files={HDRIS.exterior} environmentIntensity={1} background />

// Solo fondo, sin aportar luz.
<Environment files={HDRIS.luna} background="only" />`,
        },
        {
          tipo: 'tabla',
          cabecera: ['HDRI del curso', 'Tamaño', 'Qué aporta'],
          filas: [
            ['`estudio`', '512×256 · 59,2 KB', 'Tres softboxes: el mejor para ver reflejos y materiales'],
            ['`exterior`', '1024×512 · 172,8 KB', 'Cielo con sol: luz direccional y ambiente de día'],
            ['`luna`', '1024×512 · 168,8 KB', 'Casi sin ambiente: obliga a iluminar a mano'],
          ],
        },
        {
          tipo: 'destacado',
          tono: 'ojo',
          titulo: 'Fondo e iluminación son dos usos del mismo archivo',
          texto:
            '`background` pinta el mapa detrás; `environment` lo usa para iluminar y reflejar. Puedes tener un estudio iluminando la escena y el fondo en negro, o al contrario. Confundirlos es la razón por la que mucha gente cree que el HDRI «no hace nada» cuando en realidad está iluminando sin que se vea.',
        },
        {
          tipo: 'lista',
          items: [
            'Los `.hdr` de este curso son Radiance RGBE y se generan con `npm run assets:hdri`: no hay descargas.',
            'En three r180+ `RGBELoader` está obsoleto; el cargador actual es `HDRLoader`.',
            'El mapa se prefiltrа una vez; cambiarlo en caliente cuesta un frame largo.',
            'Un HDRI no sustituye a una luz direccional si necesitas sombras nítidas.',
            'Si la escena se ve lavada, baja `environmentIntensity` antes de tocar los materiales.',
          ],
        },
      ],
      errores: [
        {
          sintoma: 'La escena no cambia al añadir el entorno.',
          causa: 'Se cargó como `background` sin entorno, o la intensidad está a 0.',
          arreglo: 'Usa `files` con `environmentIntensity` mayor que 0 y comprueba un material metálico.',
        },
        {
          sintoma: 'Todo se ve gris y sin contraste.',
          causa: 'El HDRI es muy luminoso y actúa como una ambiental gigante.',
          arreglo: 'Baja `environmentIntensity` a 0,3–0,6 y añade una direccional para el volumen.',
        },
        {
          sintoma: 'El fondo aparece pixelado o estirado.',
          causa: 'HDRI de poca resolución o proyección incorrecta (no equirectangular).',
          arreglo: 'Usa una panorámica equirectangular y sube la resolución si el fondo se ve grande.',
        },
      ],
      quiz: [
        {
          tipo: 'unica',
          enunciado: '¿Qué diferencia a un HDRI de un PNG?',
          opciones: [
            'Guarda valores de luminancia por encima de 1',
            'Tiene más píxeles',
            'Se carga más rápido',
            'Solo admite blanco y negro',
          ],
          correcta: 0,
          explicacion: 'El rango dinámico alto es lo que permite representar el sol sin recortarlo.',
        },
        {
          tipo: 'verdadero-falso',
          enunciado: '`background` y `environment` son sinónimos en `<Environment>`.',
          correcta: false,
          explicacion: 'Uno pinta el fondo; el otro ilumina y refleja. Se pueden usar por separado.',
        },
        {
          tipo: 'multiple',
          enunciado: '¿Qué aporta un HDRI a una escena?',
          opciones: [
            'Luz ambiental con dirección',
            'Reflejos coherentes en metales',
            'Sombras nítidas',
            'Cambios de color según la zona del mapa',
          ],
          correctas: [0, 1, 3],
          explicacion: 'Las sombras nítidas necesitan luces con `castShadow`.',
        },
        {
          tipo: 'unica',
          enunciado: '¿Qué cargador usa three.js actualmente para `.hdr`?',
          opciones: ['`HDRLoader`', '`RGBELoader`', '`TextureLoader`', '`EXRLoader`'],
          correcta: 0,
          explicacion: 'Desde r180 `RGBELoader` es un alias obsoleto de `HDRLoader`.',
        },
      ],
      recursos: [
        {
          titulo: 'three.js: HDRLoader',
          url: 'https://threejs.org/docs/#api/en/loaders/HDRLoader',
          nota: 'El cargador de Radiance `.hdr` que sustituye a `RGBELoader`.',
        },
        {
          titulo: 'drei: Environment',
          url: 'https://drei.docs.pmnd.rs/staging/environment',
          nota: '`files`, `background`, `environmentIntensity` y el resto de props.',
        },
        {
          titulo: 'three.js: PMREMGenerator',
          url: 'https://threejs.org/docs/#api/en/extras/PMREMGenerator',
          nota: 'El prefiltrаdo que convierte un equirectangular en un mapa usable para reflejos rugosos.',
        },
      ],
      ejercicio: {
        reto: 'El sandbox no puede cargar el `.hdr`, así que monta a mano el equivalente: tres luces direccionales que simulen los softboxes de un estudio (principal, relleno y contra) y una ambiental muy baja.',
        inicial: `import { Canvas } from '@react-three/fiber'

export default function App() {
  return (
    <div style={{ height: 320 }}>
      <Canvas camera={{ position: [0, 0.4, 4] }} frameloop="always">
        {/* TODO: tres direccionales y una ambiental mínima */}
        <mesh>
          <sphereGeometry args={[1, 64, 40]} />
          <meshStandardMaterial color="#dfe4ee" roughness={0.12} metalness={1} />
        </mesh>
      </Canvas>
    </div>
  )
}`,
        solucion: `import { Canvas } from '@react-three/fiber'

export default function App() {
  return (
    <div style={{ height: 320 }}>
      <Canvas camera={{ position: [0, 0.4, 4] }} frameloop="always">
        {/* Principal, arriba y a la derecha */}
        <directionalLight position={[3, 4, 2]} intensity={2.6} />
        {/* Relleno, frío, al lado contrario */}
        <directionalLight position={[-3, 1, 1]} intensity={0.9} color="#9fc2ff" />
        {/* Contra, detrás, para separar del fondo */}
        <directionalLight position={[0, 2, -4]} intensity={1.4} color="#ffd9a8" />
        {/* Un mínimo de ambiente para que las zonas en sombra no sean negras */}
        <ambientLight intensity={0.08} />

        <mesh>
          <sphereGeometry args={[1, 64, 40]} />
          <meshStandardMaterial color="#dfe4ee" roughness={0.12} metalness={1} />
        </mesh>
      </Canvas>
    </div>
  )
}`,
        pistas: [
          'La principal va arriba y a un lado; el relleno, al contrario y más débil.',
          'La contra se coloca detrás del objeto y sirve para perfilar el borde.',
          'Con metalness 1 y sin entorno, las luces directas solo producen puntos brillantes: es lo esperable.',
        ],
      },
    },
    {
      id: '4.5',
      modulo: 4,
      titulo: 'Estudio: Stage, ContactShadows, AccumulativeShadows',
      objetivo:
        'Elegir la técnica de presentación adecuada y saber qué hace cada una por dentro.',
      nivel: 'medio',
      minutos: 50,
      bloques: [
        {
          tipo: 'parrafo',
          texto:
            'drei trae tres formas de resolver la presentación de un producto. `ContactShadows` proyecta una silueta difusa sobre un plano usando un mapa de profundidad: es barata, no depende de luces y da un resultado excelente en un suelo plano. `AccumulativeShadows` acumula muchos frames con luces aleatorias hasta converger en una sombra suave de aspecto global. `Stage` empaqueta cámara, luces y sombras en un solo componente listo para usar.',
        },
        { tipo: 'demo', id: 'm4-estudio', titulo: 'Las tres técnicas, la misma pieza' },
        {
          tipo: 'tabla',
          cabecera: ['Técnica', 'Qué hace', 'Coste', 'Cuándo usarla'],
          filas: [
            ['`ContactShadows`', 'Silueta difusa sobre un plano', 'Bajo', 'Producto sobre mesa, configuradores'],
            ['`AccumulativeShadows`', 'Acumula frames hasta converger', 'Alto al principio, gratis después', 'Render de presentación estático'],
            ['`Stage`', 'Luces + sombras + cámara', 'Medio', 'Prototipos rápidos y escaparates'],
          ],
        },
        {
          tipo: 'codigo',
          lenguaje: 'tsx',
          titulo: 'Los tres, en su forma mínima',
          codigo: `// 1. Sombra de contacto: no necesita luces.
<ContactShadows position={[0, 0, 0]} opacity={0.6} scale={9} blur={2.4} far={4} />

// 2. Sombras acumulativas: convergen con luces aleatorias.
<AccumulativeShadows temporal frames={90} alphaTest={0.85} scale={9}>
  <RandomizedLight amount={6} radius={5} intensity={2.2} position={[4, 6, 4]} />
</AccumulativeShadows>

// 3. Stage: todo el estudio en un componente.
<Stage environment={null} intensity={0.75} shadows={{ type: 'contact' }}>
  <Pieza />
</Stage>`,
        },
        {
          tipo: 'destacado',
          tono: 'ojo',
          titulo: 'Ojo con los presets de `Stage`',
          texto:
            'El prop `environment` de `Stage` acepta presets como `"city"` o `"sunset"`, pero esos presets descargan HDRIs de un CDN de terceros. En este curso se pasa `environment={null}` a propósito: la web funciona sin red y sin licencias ajenas. Si usas presets, asumes esa dependencia.',
        },
        {
          tipo: 'lista',
          items: [
            '`ContactShadows` no genera sombra de objetos que no estén sobre el plano.',
            '`AccumulativeShadows` necesita que la escena esté quieta mientras acumula.',
            '`Stage` recoloca la cámara si `adjustCamera` está activo; desactívalo si controlas tú la vista.',
            'En configuradores interactivos, la sombra de contacto es casi siempre la respuesta correcta.',
            'Ninguna de las tres técnicas sustituye a una buena iluminación: la sombra no ilumina.',
          ],
        },
      ],
      errores: [
        {
          sintoma: '`AccumulativeShadows` deja la escena con manchas que cambian solas.',
          causa: 'La escena se mueve mientras acumula, o tiene `temporal` con objetos animados.',
          arreglo: 'Deja la escena quieta, o usa `ContactShadows` si hay animación.',
        },
        {
          sintoma: '`ContactShadows` tapa el suelo o aparece como un cuadrado negro.',
          causa: 'El plano de la sombra está por encima del suelo o `far` es demasiado pequeño.',
          arreglo: 'Súbelo un milímetro sobre el suelo y ajusta `far` a la altura de la escena.',
        },
        {
          sintoma: '`Stage` ilumina toda la escena aunque no quiero.',
          causa: '`Stage` añade sus propias luces alrededor de los hijos.',
          arreglo: 'No anides la escena entera dentro de `Stage`; úsalo solo alrededor del objeto a presentar.',
        },
      ],
      quiz: [
        {
          tipo: 'unica',
          enunciado: '¿Qué técnica no necesita luces?',
          opciones: ['`ContactShadows`', '`AccumulativeShadows`', '`Stage`', 'Ninguna'],
          correcta: 0,
          explicacion: 'Trabaja con un mapa de profundidad, no con el mapa de sombras de una luz.',
        },
        {
          tipo: 'verdadero-falso',
          enunciado: '`AccumulativeShadows` es más caro al principio y luego deja de costar.',
          correcta: true,
          explicacion: 'Acumula durante `frames` y después reutiliza el resultado mientras nada cambie.',
        },
        {
          tipo: 'multiple',
          enunciado: '¿Qué hace `Stage` por ti?',
          opciones: [
            'Coloca luces',
            'Añade sombras',
            'Puede recolocar la cámara',
            'Optimiza la geometría',
          ],
          correctas: [0, 1, 2],
          explicacion: 'No toca la geometría: para eso está gltf-transform (módulo 8).',
        },
        {
          tipo: 'unica',
          enunciado: '¿Qué significa pasar `environment={null}` a `Stage`?',
          opciones: [
            'No descargar ningún HDRI de preset',
            'Desactivar las sombras',
            'Quitar la cámara',
            'Apagar las luces',
          ],
          correcta: 0,
          explicacion: 'Evita la dependencia de un CDN externo y de sus licencias.',
        },
      ],
      recursos: [
        {
          titulo: 'drei: ContactShadows',
          url: 'https://drei.docs.pmnd.rs/shadows/contact-shadows',
          nota: 'Todas las props, incluidos `blur`, `far` y `resolution`.',
        },
        {
          titulo: 'drei: AccumulativeShadows',
          url: 'https://drei.docs.pmnd.rs/shadows/accumulative-shadows',
          nota: 'Cómo funciona la acumulación y qué hace `RandomizedLight`.',
        },
        {
          titulo: 'drei: Stage',
          url: 'https://drei.docs.pmnd.rs/staging/stage',
          nota: 'Presets de luz y la advertencia sobre el entorno por defecto.',
        },
      ],
      ejercicio: {
        reto: 'Monta una presentación de producto con `ContactShadows`: una pieza, un suelo y una sombra difusa. Ajusta `blur` y `opacity` hasta que parezca que apoya.',
        inicial: `import { Canvas } from '@react-three/fiber'

export default function App() {
  return (
    <div style={{ height: 320 }}>
      <Canvas camera={{ position: [2.6, 2, 3.6] }} frameloop="always">
        <ambientLight intensity={0.5} />
        <directionalLight position={[3, 5, 2]} intensity={2.4} />

        <mesh position={[0, 0.6, 0]} rotation={[0.3, 0.6, 0]}>
          <torusKnotGeometry args={[0.4, 0.14, 128, 24]} />
          <meshStandardMaterial color="#c99a54" roughness={0.3} metalness={0.5} />
        </mesh>

        {/* TODO: añade ContactShadows de drei sobre el suelo */}
      </Canvas>
    </div>
  )
}`,
        solucion: `import { Canvas } from '@react-three/fiber'
import { ContactShadows } from '@react-three/drei'

export default function App() {
  return (
    <div style={{ height: 320 }}>
      <Canvas camera={{ position: [2.6, 2, 3.6] }} frameloop="always">
        <ambientLight intensity={0.5} />
        <directionalLight position={[3, 5, 2]} intensity={2.4} />

        <mesh position={[0, 0.6, 0]} rotation={[0.3, 0.6, 0]}>
          <torusKnotGeometry args={[0.4, 0.14, 128, 24]} />
          <meshStandardMaterial color="#c99a54" roughness={0.3} metalness={0.5} />
        </mesh>

        <ContactShadows
          position={[0, 0, 0]}
          opacity={0.55}
          scale={6}
          blur={2.6}
          far={3}
          resolution={512}
        />
      </Canvas>
    </div>
  )
}`,
        pistas: [
          '`ContactShadows` se coloca en el suelo, no en el objeto.',
          '`far` debe cubrir la altura del objeto; si no, la sombra desaparece.',
          '`blur` alto suaviza mucho; por encima de 4 el objeto parece flotar.',
        ],
      },
    },
    {
      id: '4.6',
      modulo: 4,
      titulo: 'Checkpoint: depurar una escena mal iluminada',
      objetivo:
        'Diagnosticar una escena oscura, quemada o plana con un método de cinco pasos, sin tocar valores al azar.',
      nivel: 'medio',
      minutos: 50,
      bloques: [
        {
          tipo: 'parrafo',
          texto:
            'Casi todas las escenas mal iluminadas fallan por una de cinco causas. El método consiste en descartarlas en orden, de la más barata a la más cara, comprobando algo visible después de cada cambio. La demo trae los cinco fallos sembrados y un interruptor por fallo: reproduce el síntoma, arregla uno y mira qué cambia.',
        },
        { tipo: 'demo', id: 'm4-depurar', titulo: 'Cinco fallos, cinco interruptores' },
        {
          tipo: 'pasos',
          items: [
            {
              titulo: '1. ¿Hay alguna luz?',
              texto:
                'Con `meshBasicMaterial` todo se ve; con `standard`, no. Si la escena está negra, empieza aquí: cero luces o todas con intensidad 0.',
            },
            {
              titulo: '2. ¿Está quemada la exposición?',
              texto:
                'Si todo es blanco sin detalle, baja `toneMappingExposure` a 1 antes de tocar las intensidades. Así separas causa de amplificador.',
            },
            {
              titulo: '3. ¿El material espera un entorno?',
              texto:
                'Un metal con `metalness={1}` sin HDRI se ve negro. Baja la metalicidad o añade `<Environment>`.',
            },
            {
              titulo: '4. ¿Hay artefactos de sombra?',
              texto:
                'Rayas dentro de la sombra: acne. Sombra separada: sesgo excesivo. Ajusta `normalBias` y luego `bias`.',
            },
            {
              titulo: '5. ¿Hay volumen?',
              texto:
                'Si se ve correctamente pero plano, faltan direcciones distintas: una principal, un relleno débil del lado contrario, quizá una contra.',
            },
          ],
        },
        {
          tipo: 'checkpoint',
          titulo: 'Antes de cerrar el módulo',
          items: [
            'Sé nombrar los cinco tipos de luz y cuándo usar cada uno.',
            'Distingo exposición de intensidad y sé cuál tocar primero.',
            'Sé activar sombras y corregir acne con `normalBias`.',
            'He usado un HDRI local con `environmentIntensity` y sé qué hace `background`.',
            'Sé explicar la diferencia entre `ContactShadows` y una sombra de luz.',
            'Puedo diagnosticar una escena negra en menos de cinco comprobaciones.',
          ],
        },
        {
          tipo: 'destacado',
          tono: 'truco',
          titulo: 'El depurador de una línea',
          texto:
            'Sustituye temporalmente todos los materiales por `meshNormalMaterial`. Si la geometría aparece bien, el problema es de luz o de material, no de la escena. Si no aparece, el problema es de cámara, escala o posición. Es el atajo más rentable de todo el módulo.',
        },
      ],
      errores: [
        {
          sintoma: 'La escena está negra y cambiar las luces no hace nada.',
          causa: 'Los materiales son `basic` sobre objetos negros, o la cámara está dentro de un objeto.',
          arreglo: 'Cambia a `meshNormalMaterial` y comprueba si hay geometría visible.',
        },
        {
          sintoma: 'Se arregla la oscuridad y aparece todo quemado.',
          causa: 'Se subieron las intensidades con la exposición también alta.',
          arreglo: 'Fija la exposición a 1 y reparte la luz entre principal y relleno.',
        },
        {
          sintoma: 'La escena se ve bien pero «de plástico».',
          causa: 'Materiales con `roughness` uniforme y una sola luz frontal.',
          arreglo: 'Varía rugosidad y metalicidad, y añade una luz lateral tenue.',
        },
      ],
      quiz: [
        {
          tipo: 'unica',
          enunciado: '¿Cuál es la primera comprobación ante una escena negra?',
          opciones: [
            'Si hay luces y si los materiales las necesitan',
            'Si el canvas tiene el tamaño correcto',
            'Si el HTML tiene un error',
            'Si el navegador soporta WebGL',
          ],
          correcta: 0,
          explicacion: 'Es la causa más frecuente y la más rápida de descartar.',
        },
        {
          tipo: 'verdadero-falso',
          enunciado: 'Subir la exposición es la forma correcta de arreglar una escena sin luces.',
          correcta: false,
          explicacion: 'Sin luz no hay nada que multiplicar: la exposición no crea iluminación.',
        },
        {
          tipo: 'multiple',
          enunciado: '¿Qué causas producen una escena «plana»?',
          opciones: [
            'Una sola luz frontal',
            'Ambiental demasiado alta',
            'Materiales todos con el mismo roughness',
            'Tener sombras activadas',
          ],
          correctas: [0, 1, 2],
          explicacion: 'Las sombras, bien configuradas, añaden volumen en lugar de quitarlo.',
        },
        {
          tipo: 'unica',
          enunciado: '¿Para qué sirve cambiar todo a `meshNormalMaterial` al depurar?',
          opciones: [
            'Para ver la geometría sin depender de luces ni materiales',
            'Para mejorar el rendimiento',
            'Para exportar el modelo',
            'Para activar las sombras',
          ],
          correcta: 0,
          explicacion: 'Aísla el problema: si se ve, la escena existe; el fallo está en luz o material.',
        },
      ],
      recursos: [
        {
          titulo: 'three.js: MeshNormalMaterial',
          url: 'https://threejs.org/docs/#api/en/materials/MeshNormalMaterial',
          nota: 'El material de depuración que no depende de la iluminación.',
        },
        {
          titulo: 'three.js: Color management',
          url: 'https://threejs.org/docs/#manual/en/introduction/Color-management',
          nota: 'La explicación de fondo de por qué una escena se quema o se ve lavada.',
        },
        {
          titulo: 'drei: Environment',
          url: 'https://drei.docs.pmnd.rs/staging/environment',
          nota: 'Repaso de `environmentIntensity` para el paso 3 del método.',
        },
      ],
      ejercicio: {
        reto: 'La escena de partida tiene tres fallos: no hay luz direccional, la exposición está a 2,4 y el material es básico. Arréglalos en el orden del método y comprueba el resultado tras cada cambio.',
        inicial: `import { Canvas } from '@react-three/fiber'

export default function App() {
  return (
    <div style={{ height: 320 }}>
      <Canvas camera={{ position: [2.6, 2, 3.6] }} frameloop="always">
        {/* TODO: falta una luz direccional con castShadow */}
        <ambientLight intensity={0.2} />

        <mesh position={[0, 0.5, 0]}>
          <sphereGeometry args={[0.7, 32, 24]} />
          {/* TODO: este material no responde a la luz */}
          <meshBasicMaterial color="#e8e2d4" />
        </mesh>

        <mesh rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[10, 10]} />
          <meshStandardMaterial color="#252b3d" />
        </mesh>
      </Canvas>
    </div>
  )
}`,
        solucion: `import { Canvas } from '@react-three/fiber'

export default function App() {
  return (
    <div style={{ height: 320 }}>
      <Canvas shadows camera={{ position: [2.6, 2, 3.6] }} frameloop="always">
        <ambientLight intensity={0.25} />
        <directionalLight
          position={[3, 5, 2]}
          intensity={3}
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
          shadow-normalBias={0.03}
        />

        <mesh position={[0, 0.5, 0]} castShadow receiveShadow>
          <sphereGeometry args={[0.7, 32, 24]} />
          <meshStandardMaterial color="#e8e2d4" roughness={0.45} metalness={0.1} />
        </mesh>

        <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
          <planeGeometry args={[10, 10]} />
          <meshStandardMaterial color="#252b3d" />
        </mesh>
      </Canvas>
    </div>
  )
}`,
        pistas: [
          'Primero la luz, después el material, al final la sombra.',
          '`meshStandardMaterial` sin luces se ve negro: es el síntoma esperado, no un fallo nuevo.',
          'La exposición no se toca en este ejercicio: se deja la del renderer por defecto.',
        ],
      },
    },
  ],
}

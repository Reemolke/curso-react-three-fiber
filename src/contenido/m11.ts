import type { Modulo } from './tipos'

export const modulo11: Modulo = {
  numero: 11,
  titulo: 'Postprocesado y shaders',
  descripcion:
    'Efectos de pantalla completa con postprocessing y shaders propios en GLSL: qué cuesta cada pase, cómo se escribe un material y cuándo conviene parchear uno estándar.',
  lecciones: [
    {
      id: '11.1',
      modulo: 11,
      titulo: '`EffectComposer`',
      objetivo:
        'Entender qué cambia cuando la escena se dibuja a una textura y montar una cadena de efectos con su coste a la vista.',
      nivel: 'medio',
      minutos: 55,
      bloques: [
        {
          tipo: 'parrafo',
          texto:
            'Sin `EffectComposer`, R3F dibuja la escena directamente al lienzo: un solo pase, cada píxel se calcula una vez. Con `EffectComposer`, el resultado va primero a una textura en memoria, y sobre esa textura se aplican pases de pantalla completa: brillos, desenfoques, viñeta. Al final, la textura se pinta al lienzo. Ese viaje extra es todo el coste del postprocesado: no depende de cuántos objetos haya, sino de cuántos píxeles y de cuántos pases.',
        },
        {
          tipo: 'demo',
          id: 'm11-composer',
          titulo: 'Encender y apagar el postprocesado con el coste medido',
        },
        {
          tipo: 'codigo',
          lenguaje: 'tsx',
          titulo: 'La cadena mínima',
          codigo: `import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing'

<Canvas>
  <Escena />

  <EffectComposer multisampling={0}>
    <Bloom intensity={1.1} luminanceThreshold={0.6} mipmapBlur />
    <Vignette offset={0.28} darkness={0.72} />
  </EffectComposer>
</Canvas>`,
        },
        {
          tipo: 'tabla',
          cabecera: ['Pase', 'Qué hace', 'Coste', 'Depende de'],
          filas: [
            ['Escena → textura', 'Dibuja la escena una vez', 'Igual que sin composer', 'Geometría'],
            ['Bloom', 'Difumina lo que supera un umbral', 'Medio', 'Niveles del mipmap'],
            ['SSAO', 'Oscurece las esquinas de contacto', 'Alto', 'Resolución y muestras'],
            ['Viñeta', 'Oscurece los bordes', 'Bajo', 'Resolución'],
            ['Copia final', 'Pinta la textura al lienzo', 'Bajo', 'Resolución'],
          ],
        },
        {
          tipo: 'destacado',
          tono: 'porque',
          titulo: 'Por qué se apaga con un interruptor y no con un condicional dentro del efecto',
          texto:
            'Un efecto desactivado no se ejecuta, pero el `EffectComposer` sigue existiendo: la escena continúa yendo a una textura. Quitarlo entero devuelve el render directo. La diferencia entre las dos medidas de la demo es, precisamente, el precio del viaje a la textura. En un móvil con pantalla de 400 píxeles por pulgada, ese viaje solo ya cuesta varios milisegundos.',
        },
        {
          tipo: 'lista',
          items: [
            '`multisampling={0}` desactiva el antialias del render target: el antialias del lienzo no se hereda.',
            'Los efectos se aplican en el orden en que se declaran, de arriba abajo.',
            '`EffectComposer` necesita un solo hijo por pase; los condicionales se resuelven con `null`.',
            'Si cambias la lista de efectos, remonta con `key`: el composer construye sus pases al montar.',
            'Mide siempre con el postprocesado encendido y apagado en el mismo equipo.',
          ],
        },
      ],
      errores: [
        {
          sintoma: 'La escena se ve, pero ningún efecto hace nada.',
          causa: 'Los efectos están declarados fuera de `<EffectComposer>`.',
          arreglo: 'Anida cada efecto dentro del composer.',
        },
        {
          sintoma: 'Todo se ve lavado o demasiado claro.',
          causa: 'El tone mapping se aplica dos veces: en la escena y en la copia final.',
          arreglo: 'Deja el tone mapping en el composer (`ToneMapping`) o desactívalo en uno de los dos.',
        },
        {
          sintoma: 'Al activar el bloom no brilla nada.',
          causa: 'El umbral es mayor que el brillo máximo de los materiales.',
          arreglo: 'Baja `luminanceThreshold` o sube `emissiveIntensity` en lo que debe brillar.',
        },
        {
          sintoma: 'La pantalla queda negra al cambiar de efectos.',
          causa: 'El composer reutiliza pases con distinto número de salidas.',
          arreglo: 'Cambia la `key` del `<EffectComposer>` cuando cambie la estructura de la cadena.',
        },
      ],
      quiz: [
        {
          tipo: 'unica',
          enunciado: '¿Qué añade `EffectComposer` respecto a dibujar la escena directamente?',
          opciones: [
            'Un destino intermedio en una textura',
            'Más triángulos',
            'Iluminación global',
            'Un segundo canvas',
          ],
          correcta: 0,
          explicacion: 'El composer renderiza a una textura y luego la procesa.',
        },
        {
          tipo: 'verdadero-falso',
          enunciado: 'El coste del postprocesado depende del número de objetos de la escena.',
          correcta: false,
          explicacion: 'Los pases son de pantalla completa: dependen de la resolución.',
        },
        {
          tipo: 'multiple',
          enunciado: '¿Qué hay que tener en cuenta al montar un composer?',
          opciones: [
            'El orden de los efectos',
            'El antialias del render target',
            'El tone mapping duplicado',
            'El número de luces de la escena',
          ],
          correctas: [0, 1, 2],
          explicacion: 'Las luces afectan a la escena, no a los pases de pantalla.',
        },
        {
          tipo: 'unica',
          enunciado: '¿Qué hace `multisampling={0}`?',
          opciones: [
            'Desactiva el MSAA del render target',
            'Apaga todos los efectos',
            'Reduce la resolución a la mitad',
            'Desactiva las sombras',
          ],
          correcta: 0,
          explicacion: 'El MSAA del lienzo no se hereda; hay que pedirlo o dejarlo en 0.',
        },
      ],
      recursos: [
        {
          titulo: 'postprocessing (pmndrs)',
          url: 'https://github.com/pmndrs/postprocessing',
          nota: 'La librería que envuelve @react-three/postprocessing.',
        },
        {
          titulo: '@react-three/postprocessing',
          url: 'https://github.com/pmndrs/react-postprocessing',
          nota: 'API de `EffectComposer` y lista de efectos con sus props.',
        },
        {
          titulo: 'three: WebGLRenderTarget',
          url: 'https://threejs.org/docs/#api/en/renderers/WebGLRenderTarget',
          nota: 'Qué es exactamente la textura intermedia.',
        },
      ],
      ejercicio: {
        reto: 'Calcula los milisegundos que cuesta el postprocesado: recibe ancho, alto, número de pases y coste por megapíxel, y devuelve el total redondeado a dos decimales.',
        inicial: `// TODO: 1 Mpx = 1 000 000 de píxeles.
export function coste(ancho: number, alto: number, pases: number, msPorMpx: number): number {
  return 0
}

console.log(coste(1920, 1080, 3, 0.9))`,
        solucion: `export function coste(ancho: number, alto: number, pases: number, msPorMpx: number): number {
  const megapixeles = (ancho * alto) / 1_000_000
  const total = megapixeles * pases * msPorMpx
  return Number(total.toFixed(2))
}

console.log(coste(1920, 1080, 3, 0.9))`,
        pistas: [
          'Multiplica ancho por alto para obtener píxeles.',
          'Divide entre un millón para pasar a megapíxeles.',
          'El coste crece linealmente con los pases y con el área.',
        ],
      },
    },
    {
      id: '11.2',
      modulo: 11,
      titulo: 'Efectos: bloom, SSAO, DoF y viñeta',
      objetivo:
        'Elegir efectos por intención, ordenarlos correctamente y saber cuáles son caros antes de activarlos.',
      nivel: 'medio',
      minutos: 60,
      bloques: [
        {
          tipo: 'parrafo',
          texto:
            'Un efecto no es una decoración: es una decisión sobre qué debe mirar el ojo. El bloom dice «esto emite luz». El SSAO dice «estas piezas se tocan». La profundidad de campo dice «mira aquí y olvida el fondo». La viñeta dice «el borde no importa». Si activas los cuatro a la vez sin una razón, la imagen pierde lectura y el portátil pierde frames. La pregunta correcta no es qué efectos existen, sino qué tiene que entender quien mira.',
        },
        {
          tipo: 'demo',
          id: 'm11-efectos',
          titulo: 'Seis efectos activables con su coste en ms por frame',
        },
        {
          tipo: 'codigo',
          lenguaje: 'tsx',
          titulo: 'Orden recomendado',
          codigo: `const [ssao, setSsao] = useState(true)

<EffectComposer
  multisampling={0}
  enableNormalPass={ssao}   // SSAO necesita la normal pass
>
  {/* 1. Oclusión: trabaja sobre profundidad y normales */}
  {ssao ? <SSAO intensity={22} radius={0.06} luminanceInfluence={0.4} /> : null}

  {/* 2. Desenfoque: antes del bloom para que el brillo no se emborrone */}
  <DepthOfField focusDistance={0.03} focalLength={0.06} bokehScale={3.2} />

  {/* 3. Brillo: sobre lo ya compuesto */}
  <Bloom intensity={1.1} luminanceThreshold={0.55} mipmapBlur />

  {/* 4. Color y borde: al final, sobre el resultado */}
  <Vignette offset={0.3} darkness={0.7} />
</EffectComposer>`,
        },
        {
          tipo: 'tabla',
          cabecera: ['Efecto', 'Intención', 'Coste', 'Aviso'],
          filas: [
            ['Bloom', 'Marcar lo emisivo', 'Medio', 'Umbral alto = no pasa nada'],
            ['SSAO', 'Contacto y volumen', 'Alto', 'Exige `enableNormalPass`'],
            ['DoF', 'Dirigir la mirada', 'Alto', 'En móvil suele sobrar'],
            ['Viñeta', 'Cerrar el encuadre', 'Bajo', 'Con abuso, parece un túnel'],
            ['Ruido / grano', 'Textura de cámara', 'Bajo', 'A 0,3 ya es suciedad'],
            ['Aberración', 'Lente barata', 'Bajo', 'Muy sutil o marea'],
          ],
        },
        {
          tipo: 'destacado',
          tono: 'ojo',
          titulo: 'SSAO no es gratis en ninguna parte',
          texto:
            'Necesita una pasada extra para guardar normales y profundidad, y luego muestrea alrededor de cada píxel. En un portátil integrado, SSAO a pantalla completa puede costar más que toda la geometría de la escena. Si lo necesitas en móvil, mide, baja el radio y considera desactivarlo por debajo de cierto ancho de ventana.',
        },
        {
          tipo: 'lista',
          items: [
            'Un efecto que no se nota no está aportando: quítalo.',
            'La viñeta y el grano van al final; el SSAO, al principio.',
            'No se combinan dos efectos que hagan lo mismo (bloom + brillo + tonemapping agresivo).',
            'Un `EffectComposer` con seis efectos en un móvil es una decisión de producto, no técnica.',
            'Activa y desactiva cada efecto con un clic: así se ve cuál sobra.',
          ],
        },
      ],
      errores: [
        {
          sintoma: 'SSAO no hace nada o la escena se pone negra.',
          causa: 'Falta `enableNormalPass` o el composer no se remontó al activarlo.',
          arreglo: 'Pasa `enableNormalPass={activo}` y cambia la `key` del composer.',
        },
        {
          sintoma: 'El bloom brilla en toda la imagen.',
          causa: 'El umbral está por debajo del brillo del fondo.',
          arreglo: 'Sube `luminanceThreshold` por encima del color de fondo.',
        },
        {
          sintoma: 'El texto o la interfaz se ve borrosa.',
          causa: 'Los efectos se aplican a todo el lienzo, incluidos overlays 3D.',
          arreglo: 'Mueve la interfaz fuera del canvas o renderiza el HUD aparte.',
        },
      ],
      quiz: [
        {
          tipo: 'unica',
          enunciado: '¿Qué efecto necesita la normal pass?',
          opciones: ['SSAO', 'Bloom', 'Viñeta', 'Ruido'],
          correcta: 0,
          explicacion: 'La oclusión se calcula con normales y profundidad.',
        },
        {
          tipo: 'verdadero-falso',
          enunciado: 'La profundidad de campo se debe aplicar después del bloom.',
          correcta: false,
          explicacion: 'Si desenfocas después, emborronas el brillo que acabas de crear.',
        },
        {
          tipo: 'multiple',
          enunciado: '¿Qué efectos son baratos?',
          opciones: ['Viñeta', 'Ruido', 'SSAO', 'Aberración cromática'],
          correctas: [0, 1, 3],
          explicacion: 'SSAO es el caro de la lista.',
        },
        {
          tipo: 'unica',
          enunciado: '¿Cuál es el criterio para activar un efecto?',
          opciones: [
            'Que comunique algo que la escena necesita',
            'Que esté de moda',
            'Que exista en la librería',
            'Que lo use otro proyecto',
          ],
          correcta: 0,
          explicacion: 'Si no aporta lectura, cuesta sin devolver nada.',
        },
      ],
      recursos: [
        {
          titulo: '@react-three/postprocessing: efectos',
          url: 'https://github.com/pmndrs/react-postprocessing#effects',
          nota: 'Props exactas de cada efecto, incluidos los que no están en la demo.',
        },
        {
          titulo: 'postprocessing: SSAOEffect',
          url: 'https://pmndrs.github.io/postprocessing/public/docs/class/src/effects/SSAOEffect.js~SSAOEffect.html',
          nota: 'Qué significa cada parámetro de la oclusión.',
        },
        {
          titulo: 'Bloom en three.js',
          url: 'https://threejs.org/examples/?q=bloom',
          nota: 'Ejemplos oficiales para comparar umbrales.',
        },
      ],
      ejercicio: {
        reto: 'Filtra una lista de efectos por presupuesto: devuelve los que quepan en los milisegundos disponibles, en orden.',
        inicial: `type Efecto = { nombre: string; ms: number }

const cadena: Efecto[] = [
  { nombre: 'ssao', ms: 3.1 },
  { nombre: 'bloom', ms: 1.4 },
  { nombre: 'vineta', ms: 0.3 },
  { nombre: 'dof', ms: 4.2 },
]

// TODO: añade mientras quepa; no lo superes.
export function caben(efectos: Efecto[], presupuesto: number): string[] {
  return []
}

console.log(caben(cadena, 2))`,
        solucion: `type Efecto = { nombre: string; ms: number }

const cadena: Efecto[] = [
  { nombre: 'ssao', ms: 3.1 },
  { nombre: 'bloom', ms: 1.4 },
  { nombre: 'vineta', ms: 0.3 },
  { nombre: 'dof', ms: 4.2 },
]

export function caben(efectos: Efecto[], presupuesto: number): string[] {
  const elegidos: string[] = []
  let usado = 0
  for (const efecto of efectos) {
    if (usado + efecto.ms > presupuesto) continue
    usado += efecto.ms
    elegidos.push(efecto.nombre)
  }
  return elegidos
}

console.log(caben(cadena, 2))`,
        pistas: [
          'Lleva un acumulado y compáralo con el presupuesto antes de añadir.',
          'Con `continue` saltas el que no cabe y sigues con los siguientes.',
          'Devuelve los nombres, no los objetos.',
        ],
      },
    },
    {
      id: '11.3',
      modulo: 11,
      titulo: 'GLSL: el pipeline',
      objetivo:
        'Entender qué hace el vertex shader, qué hace el fragment shader y cómo viajan los datos entre ambos.',
      nivel: 'alto',
      minutos: 70,
      bloques: [
        {
          tipo: 'parrafo',
          texto:
            'Un shader es un programa que se ejecuta en la GPU. Hay dos etapas obligatorias. El vertex shader corre una vez por vértice y decide dónde cae ese vértice en la pantalla; el fragment shader corre una vez por píxel (técnicamente, por fragmento) y decide su color. Entre ambos hay un canal: el vertex escribe en una `varying`, la GPU la interpola por el triángulo y el fragment la lee. Esa interpolación es la razón de que un color por vértice se convierta en un degradado por píxel.',
        },
        {
          tipo: 'demo',
          id: 'm11-pipeline',
          titulo: 'UV como color, patrón animado y tres geometrías',
        },
        {
          tipo: 'codigo',
          lenguaje: 'glsl',
          titulo: 'Un shader completo en veinte líneas',
          codigo: `// Vertex: una vez por vértice
varying vec2 vUv;

void main() {
  vUv = uv;                                  // se interpola en el triángulo
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}

// Fragment: una vez por píxel
precision highp float;
uniform float uTiempo;
varying vec2 vUv;

void main() {
  vec3 color = 0.5 + 0.5 * cos(uTiempo + vUv.xyx * 6.0);
  gl_FragColor = vec4(color, 1.0);
}`,
        },
        {
          tipo: 'tabla',
          cabecera: ['Concepto', 'Dónde', 'Se ejecuta', 'Cambia'],
          filas: [
            ['`position`, `normal`, `uv`', 'Vertex', 'Por vértice', 'Solo lectura (atributos)'],
            ['`gl_Position`', 'Vertex', 'Por vértice', 'Obligatorio escribirlo'],
            ['`uniform`', 'Ambos', 'Por draw call', 'Igual para todos los vértices'],
            ['`varying`', 'Vertex → Fragment', 'Interpolada', 'La escribe el vertex, la lee el fragment'],
            ['`gl_FragColor`', 'Fragment', 'Por píxel', 'El color final'],
          ],
        },
        {
          tipo: 'destacado',
          tono: 'porque',
          titulo: 'Por qué la misma textura se estira en la esfera',
          texto:
            'La UV de un plano es una cuadrícula limpia; la de una esfera se comprime en los polos porque todos los triángulos de arriba comparten casi la misma `v`. No es un error del shader: es cómo está construida la geometría. Por eso conviene probar cualquier material sobre varias formas antes de dar por bueno que «funciona».',
        },
        {
          tipo: 'lista',
          items: [
            'El vertex shader debe escribir `gl_Position` o no se dibuja nada.',
            '`precision highp float` evita bandas y artefactos en el fragment.',
            'Los uniforms son la vía para animar sin recrear el material.',
            'No uses `if` dentro de bucles por píxel si puedes evitarlo: la GPU ejecuta ambos lados.',
            'Prueba el shader en un plano antes de aplicarlo a un modelo complejo.',
          ],
        },
      ],
      errores: [
        {
          sintoma: 'El objeto desaparece sin errores en consola.',
          causa: 'El vertex shader no escribe `gl_Position`.',
          arreglo: 'Calcula `projectionMatrix * modelViewMatrix * vec4(position, 1.0)`.',
        },
        {
          sintoma: 'El shader compila pero el color es negro.',
          causa: 'Un uniform no está declarado o no se le asigna valor.',
          arreglo: 'Declara el uniform y asígnalo en `uniforms`.',
        },
        {
          sintoma: 'El material se ve pero no se mueve con el objeto.',
          causa: 'Se usó `position` sin multiplicar por la matriz del modelo.',
          arreglo: 'Usa `modelViewMatrix` o `modelMatrix` según el espacio que necesites.',
        },
      ],
      quiz: [
        {
          tipo: 'unica',
          enunciado: '¿Cuántas veces se ejecuta el fragment shader?',
          opciones: ['Una por píxel cubierto', 'Una por vértice', 'Una por objeto', 'Una por frame'],
          correcta: 0,
          explicacion: 'Por eso el coste depende de la resolución.',
        },
        {
          tipo: 'verdadero-falso',
          enunciado: 'Una `varying` se interpola entre los vértices del triángulo.',
          correcta: true,
          explicacion: 'El vertex la escribe y la GPU la mezcla por píxel.',
        },
        {
          tipo: 'multiple',
          enunciado: '¿Qué es un `uniform`?',
          opciones: [
            'Un valor igual para todos los vértices de un draw call',
            'Un atributo por vértice',
            'Una variable que se cambia desde JavaScript',
            'Algo que solo existe en el fragment',
          ],
          correctas: [0, 2],
          explicacion: 'Se declara en el shader y se actualiza desde el material.',
        },
        {
          tipo: 'unica',
          enunciado: '¿Qué hay que escribir obligatoriamente en el vertex shader?',
          opciones: ['`gl_Position`', '`gl_FragColor`', '`uv`', '`normal`'],
          correcta: 0,
          explicacion: 'Sin posición proyectada no hay triángulo que dibujar.',
        },
      ],
      recursos: [
        {
          titulo: 'The Book of Shaders',
          url: 'https://thebookofshaders.com/',
          nota: 'El mejor curso libre de GLSL, de cero a ruido.',
        },
        {
          titulo: 'three: ShaderMaterial',
          url: 'https://threejs.org/docs/#api/en/materials/ShaderMaterial',
          nota: 'Qué uniforms y atributos inyecta three automáticamente.',
        },
        {
          titulo: 'Shadertoy',
          url: 'https://www.shadertoy.com/',
          nota: 'Para experimentar con fragment shaders sueltos.',
        },
      ],
      ejercicio: {
        reto: 'Replica en JavaScript el patrón de rejilla del shader: recibe u y v entre 0 y 1 y una frecuencia, y devuelve 1 si el punto cae en una línea, 0 si no.',
        inicial: `// TODO: usa fract(u * frecuencia) < 0.06 para detectar la línea.
export function rejilla(u: number, v: number, frecuencia: number): number {
  return 0
}

console.log(rejilla(0.5, 0.25, 4))`,
        solucion: `export function rejilla(u: number, v: number, frecuencia: number): number {
  const lineaU = u * frecuencia - Math.floor(u * frecuencia) < 0.06 ? 1 : 0
  const lineaV = v * frecuencia - Math.floor(v * frecuencia) < 0.06 ? 1 : 0
  return lineaU || lineaV ? 1 : 0
}

console.log(rejilla(0.5, 0.25, 4))`,
        pistas: [
          '`fract(x)` en GLSL es `x - Math.floor(x)`.',
          'Una línea es una banda estrecha: el umbral 0,06 es arbitrario y se puede cambiar.',
          'Devuelve 1 en cuanto una de las dos coordenadas esté en línea.',
        ],
      },
    },
    {
      id: '11.4',
      modulo: 11,
      titulo: '`shaderMaterial` en R3F',
      objetivo:
        'Crear un material propio con uniforms animados, registrarlo con `extend` y usarlo como una etiqueta más.',
      nivel: 'alto',
      minutos: 65,
      bloques: [
        {
          tipo: 'parrafo',
          texto:
            'Escribir `<shaderMaterial uniforms={...} vertexShader={...} fragmentShader={...} />` funciona, pero es incómodo: los uniforms hay que memorizarlos y el shader no tiene nombre. `shaderMaterial` de drei resuelve las dos cosas: crea una clase de material con sus uniforms ya declarados y permite registrarla con `extend`. A partir de ahí se usa como `<materialOnda />`, con la primera letra en minúscula, y se le pasan props como a cualquier material de three.',
        },
        {
          tipo: 'demo',
          id: 'm11-material-propio',
          titulo: 'Esfera deformada con uniforms controlados por deslizadores',
        },
        {
          tipo: 'codigo',
          lenguaje: 'tsx',
          titulo: 'Material propio, de la clase al JSX',
          codigo: `import { extend, useFrame } from '@react-three/fiber'
import { shaderMaterial } from '@react-three/drei'
import { Color, DoubleSide, type ShaderMaterial } from 'three'

const MaterialOnda = shaderMaterial(
  { uTiempo: 0, uAmplitud: 0.22, uColor: new Color('#123a7a') },
  vertexShader,
  fragmentShader,
)

extend({ MaterialOnda })

declare module '@react-three/fiber' {
  interface ThreeElements {
    materialOnda: ThreeElements['shaderMaterial']
  }
}

// Uso: minúscula, como cualquier material de three
<mesh>
  <sphereGeometry args={[1.2, 96, 64]} />
  <materialOnda ref={material} side={DoubleSide} />
</mesh>

// Los uniforms se mutan en el frame, no por props
useFrame((_, delta) => {
  material.current.uniforms.uTiempo.value += delta
})`,
        },
        {
          tipo: 'tabla',
          cabecera: ['Pieza', 'Para qué', 'Nota'],
          filas: [
            ['`shaderMaterial(...)`', 'Declara uniforms y shaders', 'Devuelve una clase'],
            ['`extend({ MaterialOnda })`', 'La registra en el catálogo JSX', 'Una vez por módulo'],
            ['`<materialOnda />`', 'La instancia en la escena', 'Minúscula obligatoria'],
            ['`useFrame` + `uniforms.x.value`', 'Anima sin re-render', 'Nunca por props en cada frame'],
            ['`declare module`', 'Tipa la etiqueta nueva', 'Sin esto, TS se queja'],
          ],
        },
        {
          tipo: 'destacado',
          tono: 'truco',
          titulo: 'Un uniform es una caja, no un número',
          texto:
            '`uniforms.uTiempo` es un objeto `{ value: number }`. Se cambia `uniforms.uTiempo.value`, no `uniforms.uTiempo`. Pasar el número por prop en cada frame provoca un render de React para nada; mutar `.value` dentro de `useFrame` es una escritura que la GPU verá en el siguiente draw, sin tocar el árbol de React.',
        },
        {
          tipo: 'lista',
          items: [
            'Un material propio no recibe luces salvo que escribas la iluminación.',
            '`extend` va en el módulo del material, no dentro del componente.',
            'El nombre en JSX es la clave de `extend` con la primera letra en minúscula.',
            'Los uniforms con color se declaran como `new Color(...)` y se mutan con `.set()`.',
            'Si el material no se actualiza, comprueba que el `ref` apunta al material real.',
          ],
        },
      ],
      errores: [
        {
          sintoma: '«MaterialOnda is not part of the THREE namespace».',
          causa: 'Se usó en mayúscula o falta `extend`.',
          arreglo: 'Registra con `extend` y escribe `<materialOnda />`.',
        },
        {
          sintoma: 'Cambiar el color no hace nada.',
          causa: 'Se asigna un `Color` nuevo en vez de mutar el existente.',
          arreglo: '`uniforms.uColor.value.set(nuevoColor)`.',
        },
        {
          sintoma: 'La esfera se ve completamente negra.',
          causa: 'El shader no calcula iluminación y el color base es oscuro.',
          arreglo: 'Sube el color o usa un material estándar parcheado (lección 11.6).',
        },
        {
          sintoma: 'TypeScript no reconoce `<materialOnda />`.',
          causa: 'Falta la augmentación de `ThreeElements`.',
          arreglo: 'Añade el `declare module` de @react-three/fiber del ejemplo.',
        },
      ],
      quiz: [
        {
          tipo: 'unica',
          enunciado: '¿Cómo se usa un material registrado con `extend({ MaterialOnda })`?',
          opciones: ['`<materialOnda />`', '`<MaterialOnda />`', '`<shaderMaterial />`', '`<material-onda />`'],
          correcta: 0,
          explicacion: 'R3F pasa la clave a minúscula para el catálogo JSX.',
        },
        {
          tipo: 'verdadero-falso',
          enunciado: 'Un material propio recibe luces automáticamente.',
          correcta: false,
          explicacion: 'Hay que implementar la iluminación o parchear un material estándar.',
        },
        {
          tipo: 'multiple',
          enunciado: '¿Qué hace falta para tener un material propio tipado?',
          opciones: [
            '`shaderMaterial` con los uniforms',
            '`extend`',
            'La augmentación de `ThreeElements`',
            'Un `<Canvas>` nuevo',
          ],
          correctas: [0, 1, 2],
          explicacion: 'El canvas es el mismo de siempre.',
        },
        {
          tipo: 'unica',
          enunciado: '¿Cómo se actualiza un uniform por frame?',
          opciones: [
            'Mutar `uniforms.x.value` en `useFrame`',
            'Pasarlo como prop en cada render',
            'Llama a `setState` cada frame',
            'Recreando el material',
          ],
          correcta: 0,
          explicacion: 'Es una escritura directa, sin re-render de React.',
        },
      ],
      recursos: [
        {
          titulo: 'drei: shaderMaterial',
          url: 'https://drei.pmnd.rs/?path=/docs/shaders-shadermaterial--docs',
          nota: 'Documentación y ejemplos del helper.',
        },
        {
          titulo: 'R3F: extend',
          url: 'https://r3f.docs.pmnd.rs/api/objects',
          nota: 'Cómo funciona el catálogo de elementos y por qué la minúscula.',
        },
        {
          titulo: 'three: Uniform',
          url: 'https://threejs.org/docs/#api/en/core/Uniform',
          nota: 'La forma `{ value }` que envuelve cada uniform.',
        },
      ],
      ejercicio: {
        reto: 'Escribe la actualización de un uniform de tiempo: recibe el objeto `{ value }` y un delta, suma el delta y devuelve el valor nuevo con tres decimales.',
        inicial: `type Uniforme = { value: number }

export function avanzar(reloj: Uniforme, delta: number): number {
  // TODO: muta uniforme.value y devuélvelo redondeado.
  return 0
}

const reloj = { value: 0 }
console.log(avanzar(reloj, 0.016), reloj.value)`,
        solucion: `type Uniforme = { value: number }

export function avanzar(reloj: Uniforme, delta: number): number {
  reloj.value += delta
  return Number(reloj.value.toFixed(3))
}

const reloj = { value: 0 }
console.log(avanzar(reloj, 0.016), reloj.value)`,
        pistas: [
          'El uniform es un objeto: mutarlo no requiere devolverlo.',
          'Suma el delta, no lo asignes.',
          'Redondea solo el valor devuelto; el acumulado debe quedar exacto.',
        ],
      },
    },
    {
      id: '11.5',
      modulo: 11,
      titulo: 'Efectos prácticos',
      objetivo:
        'Implementar fresnel, dissolve, holograma y desplazamiento en un mismo fragment shader y saber qué cuesta cada uno.',
      nivel: 'alto',
      minutos: 75,
      bloques: [
        {
          tipo: 'parrafo',
          texto:
            'Cuatro efectos que se ven en cualquier juego salen de cuatro líneas de matemáticas. Fresnel compara la normal con la dirección de la vista: cuanto más de canto, más brilla. Dissolve descarta píxeles por debajo de un umbral de ruido y colorea el filo. Holograma multiplica el color por franjas que suben. Desplazamiento mueve los vértices en el vertex shader. Los tres primeros trabajan por píxel; el último, por vértice, y es el único que cambia la silueta.',
        },
        {
          tipo: 'demo',
          id: 'm11-efectos-practicos',
          titulo: 'Cuatro efectos conmutables sobre el rover lunar',
        },
        {
          tipo: 'codigo',
          lenguaje: 'glsl',
          titulo: 'Las cuatro fórmulas',
          codigo: `// 1. Fresnel: borde encendido
vec3 vista = normalize(cameraPosition - vPosMundo);
float fresnel = pow(1.0 - clamp(dot(normalize(vNormalMundo), vista), 0.0, 1.0), 2.4);
color += uBorde * fresnel * 1.8;

// 2. Dissolve: celdas que desaparecen
float n = ruido(floor(vPosLocal * 26.0));
if (n < uUmbral) discard;
color = mix(uBorde, uColor, smoothstep(uUmbral, uUmbral + 0.06, n));

// 3. Holograma: franjas que suben
float franja = step(0.45, fract(vPosLocal.y * 38.0 - uTiempo * 2.4));
color = uColor * (0.3 + 0.7 * franja) + uBorde * fresnel * 1.5;

// 4. Desplazamiento (en el vertex shader)
float onda = sin(pos.x * 7.0 + uTiempo * 2.2)
           * cos(pos.y * 5.0 - uTiempo * 1.3)
           * sin(pos.z * 4.0 + uTiempo * 0.9);
pos += normal * onda * uDesplazamiento;`,
        },
        {
          tipo: 'tabla',
          cabecera: ['Efecto', 'Coste', 'Cambia la silueta', 'Se nota en'],
          filas: [
            ['Fresnel', 'Bajo', 'No', 'Bordes, cristales, escudos'],
            ['Dissolve', 'Bajo', 'No (descarta píxeles)', 'Muertes, teletransportes'],
            ['Holograma', 'Bajo', 'No', 'Interfaces, fantasmas, escaneos'],
            ['Desplazamiento', 'Medio', 'Sí', 'Agua, tela, energía'],
          ],
        },
        {
          tipo: 'destacado',
          tono: 'ojo',
          titulo: '`discard` rompe el early-z',
          texto:
            'Descartar píxeles en el fragment shader impide que la GPU descarte antes los que están detrás: tiene que ejecutar el shader para saber si el píxel existe. Un dissolve en un objeto que ocupa media pantalla cuesta más de lo que parece. Si el efecto es solo visual y no necesita agujeros reales, considera una transparencia con `alphaTest` a nivel de material.',
        },
        {
          tipo: 'lista',
          items: [
            'Comparte un solo material y cambia una rama con un uniform entero.',
            'Clona el modelo antes de cambiarle el material: los glTF comparten materiales entre demos.',
            'El desplazamiento necesita geometría densa; con cuatro vértices no se ve nada.',
            'Para fresnel, usa `power` alto si quieres un borde fino.',
            'Un dissolve sin borde coloreado parece un objeto roto, no un efecto.',
          ],
        },
      ],
      errores: [
        {
          sintoma: 'El dissolve deja el objeto con el mismo contorno.',
          causa: 'El ruido se calcula en coordenadas de pantalla o con muy poca frecuencia.',
          arreglo: 'Usa la posición local y multiplica por 20 o más antes de `floor`.',
        },
        {
          sintoma: 'El desplazamiento no se ve.',
          causa: 'La geometría tiene muy pocos vértices.',
          arreglo: 'Sube la subdivisión del modelo o aplica el efecto a una malla densa.',
        },
        {
          sintoma: 'Al cambiar de efecto, otras demos cambian de color.',
          causa: 'Se modificó el material original del glTF en caché.',
          arreglo: 'Clona la escena y asigna el material solo a las mallas del clon.',
        },
        {
          sintoma: 'El borde fresnel parpadea en móvil.',
          causa: 'Precisión `mediump` en el fragment.',
          arreglo: 'Declara `precision highp float;` al principio.',
        },
      ],
      quiz: [
        {
          tipo: 'unica',
          enunciado: '¿Qué mide el fresnel?',
          opciones: [
            'El ángulo entre la normal y la vista',
            'La distancia a la cámara',
            'El número de luces',
            'La rugosidad',
          ],
          correcta: 0,
          explicacion: 'Cuanto más de canto se ve la superficie, más brilla el borde.',
        },
        {
          tipo: 'verdadero-falso',
          enunciado: 'El desplazamiento se puede hacer en el fragment shader.',
          correcta: false,
          explicacion: 'Mover la silueta exige mover vértices en el vertex shader.',
        },
        {
          tipo: 'multiple',
          enunciado: '¿Qué efectos cambian la forma visible del objeto?',
          opciones: [
            'Desplazamiento',
            'Dissolve (descarta píxeles)',
            'Fresnel',
            'Holograma',
          ],
          correctas: [0, 1],
          explicacion: 'Fresnel y holograma solo cambian el color.',
        },
        {
          tipo: 'unica',
          enunciado: '¿Por qué hay que clonar el modelo del glTF?',
          opciones: [
            'Porque los materiales se comparten entre instancias',
            'Porque three no permite reutilizar geometría',
            'Porque el clon ocupa menos memoria',
            'Porque el original está comprimido',
          ],
          correcta: 0,
          explicacion: 'Cambiar el material del original afecta a cualquier demo que lo use.',
        },
      ],
      recursos: [
        {
          titulo: 'Fresnel en LearnOpenGL',
          url: 'https://learnopengl.com/PBR/Lighting',
          nota: 'La fórmula y su papel en los materiales PBR.',
        },
        {
          titulo: 'The Book of Shaders: noise',
          url: 'https://thebookofshaders.com/11/',
          nota: 'Ruido para dissolve y desplazamiento.',
        },
        {
          titulo: 'three: ShaderMaterial y `discard`',
          url: 'https://threejs.org/docs/#api/en/materials/ShaderMaterial',
          nota: 'Cómo se comporta el material con descartes.',
        },
      ],
      ejercicio: {
        reto: 'Calcula el factor fresnel a partir del producto escalar entre normal y vista, con una potencia configurable. Devuelve un número entre 0 y 1 redondeado a tres decimales.',
        inicial: `// TODO: fresnel = (1 - dot)^potencia, con dot recortado a [0, 1].
export function fresnel(dot: number, potencia: number): number {
  return 0
}

console.log(fresnel(0.15, 2.4))`,
        solucion: `export function fresnel(dot: number, potencia: number): number {
  const recortado = Math.min(1, Math.max(0, dot))
  return Number(Math.pow(1 - recortado, potencia).toFixed(3))
}

console.log(fresnel(0.15, 2.4))`,
        pistas: [
          'Recorta el producto escalar antes de operar: puede salir negativo.',
          '`Math.pow(base, exponente)` es la potencia.',
          'Un `dot` bajo significa que la superficie se ve de canto: el fresnel sube.',
        ],
      },
    },
    {
      id: '11.6',
      modulo: 11,
      titulo: '`onBeforeCompile`',
      objetivo:
        'Modificar un material estándar sin perder luces ni sombras, y saber cuándo conviene frente a un material propio.',
      nivel: 'alto',
      minutos: 65,
      bloques: [
        {
          tipo: 'parrafo',
          texto:
            'Si escribes un `shaderMaterial` desde cero, el objeto deja de recibir luces, sombras, niebla y tone mapping: todo eso estaba en el shader que acabas de reemplazar. `onBeforeCompile` hace lo contrario: espera a que three monte el shader del material estándar y te lo entrega para que sustituyas un trozo. Conservas la iluminación PBR y añades solo lo tuyo. El precio es la fragilidad: dependes de los nombres de los `#include` internos.',
        },
        {
          tipo: 'demo',
          id: 'm11-parchear',
          titulo: 'Estándar parcheado frente a shader propio, con la misma onda',
        },
        {
          tipo: 'codigo',
          lenguaje: 'ts',
          titulo: 'Inyectar código en un material estándar',
          codigo: `const material = new MeshStandardMaterial({ metalness: 0.6, roughness: 0.3 })

material.onBeforeCompile = (shader) => {
  shader.uniforms.uTiempo = { value: 0 }
  shader.uniforms.uAmplitud = { value: 0.12 }

  shader.vertexShader = 'uniform float uTiempo;\\nuniform float uAmplitud;\\n' + shader.vertexShader
  shader.vertexShader = shader.vertexShader.replace(
    '#include <begin_vertex>',
    \`#include <begin_vertex>
     float onda = sin(position.x * 5.0 + uTiempo);
     transformed += objectNormal * onda * uAmplitud;\`,
  )

  shader.fragmentShader = 'uniform float uTiempo;\\n' + shader.fragmentShader
  shader.fragmentShader = shader.fragmentShader.replace(
    '#include <dithering_fragment>',
    \`#include <dithering_fragment>
     gl_FragColor.rgb += vec3(0.1, 0.3, 0.75) * step(0.6, fract(vPosOnda.y * 7.0 - uTiempo));\`,
  )

  programa = shader
}

// Sin esto, three puede reutilizar un programa compilado de otro material igual
material.customProgramCacheKey = () => 'onda-parcheada-v1'
material.needsUpdate = true`,
        },
        {
          tipo: 'tabla',
          cabecera: ['Enfoque', 'Luces y sombras', 'Control total', 'Fragilidad'],
          filas: [
            ['`shaderMaterial` propio', 'No (hay que escribirlas)', 'Total', 'Baja'],
            ['`onBeforeCompile`', 'Sí, se conservan', 'Parcial', 'Alta'],
            ['Material estándar normal', 'Sí', 'Ninguno', 'Ninguna'],
          ],
        },
        {
          tipo: 'destacado',
          tono: 'porque',
          titulo: 'Por qué `customProgramCacheKey` importa',
          texto:
            'three cachea programas por material y por combinaciones de defines. Si dos materiales con el mismo tipo parchean el shader de forma distinta, sin una clave propia pueden acabar compartiendo el programa del primero. El síntoma es desconcertante: uno de los dos objetos usa el efecto del otro, o ninguno. Devolver una clave única por variante lo resuelve.',
        },
        {
          tipo: 'lista',
          items: [
            'Inyecta al principio del shader las declaraciones y los uniforms nuevos.',
            'Sustituye `#include` completos, no líneas sueltas.',
            'Guarda la referencia al `shader` para actualizar sus uniforms en `useFrame`.',
            'Fija `customProgramCacheKey` si hay más de una variante del parche.',
            'Comprueba el parche al subir de versión de three: los includes pueden cambiar.',
          ],
        },
      ],
      errores: [
        {
          sintoma: 'El parche no se aplica.',
          causa: 'El material ya estaba compilado o falta `needsUpdate`.',
          arreglo: 'Asigna `onBeforeCompile` antes del primer render y marca `needsUpdate = true`.',
        },
        {
          sintoma: 'El shader falla con «undeclared identifier vPosOnda».',
          causa: 'La varying se declaró en un shader y no en el otro.',
          arreglo: 'Declara la misma `varying` en vertex y fragment.',
        },
        {
          sintoma: 'Dos objetos comparten el efecto equivocado.',
          causa: 'Falta una `customProgramCacheKey` distinta por variante.',
          arreglo: 'Devuelve una clave que incluya la variante.',
        },
        {
          sintoma: 'El objeto se ve negro tras el parche.',
          causa: 'Se sustituyó un `#include` que asignaba una variable usada después.',
          arreglo: 'Añade código alrededor del include, no en su lugar.',
        },
      ],
      quiz: [
        {
          tipo: 'unica',
          enunciado: '¿Qué ventaja tiene `onBeforeCompile` frente a un shader propio?',
          opciones: [
            'Conserva luces, sombras y PBR',
            'Es más rápido siempre',
            'No necesita uniforms',
            'Funciona sin WebGL',
          ],
          correcta: 0,
          explicacion: 'Se parte del material estándar y solo se añade.',
        },
        {
          tipo: 'verdadero-falso',
          enunciado: '`onBeforeCompile` recibe el shader ya montado por three.',
          correcta: true,
          explicacion: 'Por eso se pueden sustituir sus `#include`.',
        },
        {
          tipo: 'multiple',
          enunciado: '¿Qué hace falta para inyectar código con garantías?',
          opciones: [
            'Declarar uniforms y varyings en ambos shaders',
            'Una `customProgramCacheKey` por variante',
            'Guardar el shader para animar sus uniforms',
            'Recompilar el material cada frame',
          ],
          correctas: [0, 1, 2],
          explicacion: 'Recompilar cada frame sería carísimo y no hace falta.',
        },
        {
          tipo: 'unica',
          enunciado: '¿Qué riesgo tiene depender de un `#include`?',
          opciones: [
            'Que three lo renombre o lo elimine al actualizar',
            'Que ocupe más memoria',
            'Que no funcione en móvil',
            'Que no admita uniforms',
          ],
          correcta: 0,
          explicacion: 'Es API interna, no contrato público.',
        },
      ],
      recursos: [
        {
          titulo: 'three: Material.onBeforeCompile',
          url: 'https://threejs.org/docs/#api/en/materials/Material.onBeforeCompile',
          nota: 'Firma y advertencia sobre WebGPU.',
        },
        {
          titulo: 'three: lista de `#include`',
          url: 'https://github.com/mrdoob/three.js/tree/dev/src/renderers/shaders/ShaderChunk',
          nota: 'El catálogo real de trozos que se pueden sustituir.',
        },
        {
          titulo: 'Custom materials en three.js',
          url: 'https://threejs.org/examples/?q=materials',
          nota: 'Ejemplos de materiales modificados.',
        },
      ],
      ejercicio: {
        reto: 'Implementa la inyección de código: recibe la fuente del shader, un marcador y un fragmento, y devuelve la fuente con el fragmento justo después del marcador.',
        inicial: `export function inyectar(fuente: string, marcador: string, codigo: string): string {
  // TODO: si el marcador no existe, devuelve la fuente sin tocar.
  return fuente
}

const shader = 'void main() {\\n  gl_Position = vec4(0.0);\\n}'
console.log(inyectar(shader, 'void main() {', '  // parche'))`,
        solucion: `export function inyectar(fuente: string, marcador: string, codigo: string): string {
  const indice = fuente.indexOf(marcador)
  if (indice === -1) return fuente
  const corte = indice + marcador.length
  return fuente.slice(0, corte) + '\\n' + codigo + fuente.slice(corte)
}

const shader = 'void main() {\\n  gl_Position = vec4(0.0);\\n}'
console.log(inyectar(shader, 'void main() {', '  // parche'))`,
        pistas: [
          '`indexOf` devuelve -1 cuando no encuentra el marcador.',
          'El corte va después del marcador: `indice + marcador.length`.',
          'No uses `replace` con el código como reemplazo: interpreta `$`.',
        ],
      },
    },
    {
      id: '11.7',
      modulo: 11,
      titulo: 'Render targets y `useFBO`',
      objetivo:
        'Renderizar una escena a una textura y usarla como fuente para minimapas, portales o espejos.',
      nivel: 'alto',
      minutos: 55,
      bloques: [
        {
          tipo: 'parrafo',
          texto:
            'Un render target es una textura donde la GPU puede dibujar. `useFBO` de drei crea uno y te devuelve la textura para que la uses como `map` de un material. Con eso se hacen minimapas (una cámara cenital que se ve en una pantalla), espejos (una cámara reflejada) y portales (una segunda escena). El patrón siempre es el mismo: cambiar el destino, dibujar, restaurar el destino, y pintar la textura en algún sitio.',
        },
        {
          tipo: 'demo',
          id: 'm11-fbo',
          titulo: 'Minimapa en vivo, congelable y con resolución ajustable',
        },
        {
          tipo: 'codigo',
          lenguaje: 'tsx',
          titulo: 'Renderizar a una textura',
          codigo: `import { useFBO } from '@react-three/drei'
import { useFrame, useThree } from '@react-three/fiber'

const { gl, scene } = useThree()
const destino = useFBO(256, 256)
const camaraSuperior = useRef<PerspectiveCamera>(null)
const panel = useRef<Mesh>(null)

useFrame(() => {
  const camara = camaraSuperior.current
  if (!camara) return

  // 1. El panel no debe salir en su propia textura
  if (panel.current) panel.current.visible = false

  // 2. Cambiar destino, limpiar y dibujar
  const anterior = gl.getRenderTarget()
  gl.setRenderTarget(destino)
  gl.clear()
  gl.render(scene, camara)
  gl.setRenderTarget(anterior)

  if (panel.current) panel.current.visible = true
})

// 3. La textura se usa como cualquier otra
<mesh ref={panel}>
  <planeGeometry args={[0.72, 0.72]} />
  <meshBasicMaterial map={destino.texture} toneMapped={false} />
</mesh>`,
        },
        {
          tipo: 'parrafo',
          texto:
            'Un espejo usa el mismo mecanismo con tres piezas añadidas: la cámara se refleja respecto al plano del suelo, se recorta con un plano oblicuo para que no se cuele lo que queda debajo, y la textura se proyecta con la matriz de la cámara. Si falta el recorte, el reflejo enseña el interior del mundo; si falta la proyección, el reflejo se queda pegado al plano y no sigue la perspectiva. Es fácil fallar en cualquiera de las tres, así que drei lo empaqueta en `MeshReflectorMaterial`.',
        },
        {
          tipo: 'demo',
          id: 'm11-espejo',
          titulo: 'Un espejo real, con resolución y desenfoque',
        },
        {
          tipo: 'codigo',
          lenguaje: 'tsx',
          titulo: 'El espejo, en un material',
          codigo: `<mesh rotation={[-Math.PI / 2, 0, 0]}>
  <planeGeometry args={[14, 14]} />
  <MeshReflectorMaterial
    resolution={512}   // tamaño del render target del reflejo
    blur={[220, 70]}   // desenfoque por profundidad
    mixStrength={3.2}  // cuánto pesa el reflejo sobre el color base
    mirror={0.85}
    roughness={0.92}
  />
</mesh>`,
        },
        {
          tipo: 'tabla',
          cabecera: ['Uso', 'Cámara', 'Qué se dibuja', 'Coste'],
          filas: [
            ['Minimapa', 'Cenital ortográfica o perspectiva', 'La misma escena', 'Resolución del target'],
            ['Espejo', 'Reflejada respecto al plano', 'La escena menos el espejo', 'Resolución + plano extra'],
            ['Portal', 'La de la segunda escena', 'Otra escena', 'Dos escenas completas'],
            ['Ping-pong', 'La principal', 'El frame anterior', 'Dos targets alternos'],
          ],
        },
        {
          tipo: 'destacado',
          tono: 'porque',
          titulo: 'El coste es el área, no la escena',
          texto:
            'Pasar de 128 a 512 px multiplica por 16 los píxeles que se dibujan en el target. En una demo con ocho cajas no se nota; en una escena de 300 000 triángulos, el minimapa puede costar tanto como la vista principal. Si el minimapa solo se mira de reojo, 128 px sobra. Un espejo paga lo mismo y añade un render completo de la escena por frame: se reserva para el suelo protagonista, no para cada superficie.',
        },
        {
          tipo: 'lista',
          items: [
            'Restaura siempre el render target anterior, no `null` a ciegas.',
            'Oculta lo que no debe aparecer en la textura (el propio panel, la interfaz).',
            'Llama a `gl.clear()` tras cambiar de destino o arrastrarás el frame anterior.',
            'Un target nuevo por resolución: `useFBO` ya lo memoiza con sus argumentos.',
            'Libera los targets al desmontar si los creas a mano.',
          ],
        },
      ],
      errores: [
        {
          sintoma: 'El panel muestra el frame anterior con estelas.',
          causa: 'Falta `gl.clear()` en el render target.',
          arreglo: 'Limpia justo después de `setRenderTarget`.',
        },
        {
          sintoma: 'El panel se ve dentro de sí mismo, en bucle.',
          causa: 'No se ocultó antes de renderizar la textura.',
          arreglo: 'Pon `visible = false` mientras se dibuja el target.',
        },
        {
          sintoma: 'La textura sale negra.',
          causa: 'La cámara del target no actualizó su matriz o mira al vacío.',
          arreglo: 'Colócala, llama a `lookAt` y a `updateMatrixWorld()`.',
        },
        {
          sintoma: 'Los colores del panel no coinciden con la escena.',
          causa: 'Doble tone mapping por `toneMapped` activo en el material del panel.',
          arreglo: 'Pon `toneMapped={false}` en el material que muestra la textura.',
        },
        {
          sintoma: 'En el espejo se ve el interior de los objetos, como si estuvieran huecos.',
          causa: 'Falta el plano de recorte oblicuo: la cámara reflejada dibuja también lo que queda por debajo del espejo.',
          arreglo:
            'Recorta con `clippingPlanes` a la altura del plano, o usa `MeshReflectorMaterial`, que ya lo hace.',
        },
      ],
      quiz: [
        {
          tipo: 'unica',
          enunciado: '¿Qué es un render target?',
          opciones: [
            'Una textura donde la GPU dibuja',
            'Un segundo canvas en el DOM',
            'Una cámara extra',
            'Un tipo de luz',
          ],
          correcta: 0,
          explicacion: 'Se usa después como `map` de un material.',
        },
        {
          tipo: 'verdadero-falso',
          enunciado: 'Duplicar la resolución de un minimapa duplica su coste.',
          correcta: false,
          explicacion: 'Lo multiplica por cuatro (área), no por dos.',
        },
        {
          tipo: 'multiple',
          enunciado: '¿Qué hay que hacer al renderizar a una textura?',
          opciones: [
            'Guardar y restaurar el render target',
            'Limpiar el target',
            'Ocultar lo que no debe salir',
            'Recrear la escena',
          ],
          correctas: [0, 1, 2],
          explicacion: 'La escena es la misma; solo cambia el destino.',
        },
        {
          tipo: 'unica',
          enunciado: '¿Para qué sirve `gl.setRenderTarget(anterior)` al terminar?',
          opciones: [
            'Para devolver el dibujado al lienzo',
            'Para borrar la textura',
            'Para comprimir el target',
            'Para cambiar de cámara',
          ],
          correcta: 0,
          explicacion: 'Si no se restaura, el siguiente pase se dibuja en la textura.',
        },
        {
          tipo: 'unica',
          enunciado: '¿Qué añade un espejo respecto a un minimapa?',
          opciones: [
            'Cámara reflejada, plano de recorte y proyección de la textura',
            'Una segunda escena completa',
            'Un canvas aparte en el DOM',
            'Nada: es exactamente igual',
          ],
          correcta: 0,
          explicacion:
            'El render target es el mismo; cambia cómo se coloca la cámara y cómo se recorta y proyecta la textura.',
        },
      ],
      recursos: [
        {
          titulo: 'drei: useFBO',
          url: 'https://drei.pmnd.rs/?path=/docs/misc-usefbo--docs',
          nota: 'Firma del hook y ejemplo de minimapa.',
        },
        {
          titulo: 'three: WebGLRenderTarget',
          url: 'https://threejs.org/docs/#api/en/renderers/WebGLRenderTarget',
          nota: 'Parámetros de filtrado, profundidad y formato.',
        },
        {
          titulo: 'drei: MeshReflectorMaterial',
          url: 'https://drei.pmnd.rs/?path=/docs/shaders-meshreflectormaterial--docs',
          nota: 'El material de la segunda demo: props y ejemplo de suelo reflectante.',
        },
        {
          titulo: 'three: Reflector',
          url: 'https://threejs.org/examples/?q=reflector',
          nota: 'Cómo se implementa un espejo real desde cero, para comparar.',
        },
      ],
      ejercicio: {
        reto: 'Calcula la memoria de un render target RGBA de 8 bits: recibe ancho y alto y devuelve los megabytes redondeados a dos decimales.',
        inicial: `// TODO: ancho × alto × 4 bytes.
export function memoriaMB(ancho: number, alto: number): number {
  return 0
}

console.log(memoriaMB(512, 512), memoriaMB(1920, 1080))`,
        solucion: `export function memoriaMB(ancho: number, alto: number): number {
  const bytes = ancho * alto * 4
  return Number((bytes / (1024 * 1024)).toFixed(2))
}

console.log(memoriaMB(512, 512), memoriaMB(1920, 1080))`,
        pistas: [
          'Cuatro canales de 8 bits son 4 bytes por píxel.',
          'Un megabyte aquí es 1024 × 1024 bytes.',
          'Con profundidad (`depth`) hay que sumar el búfer de profundidad.',
        ],
      },
    },
    {
      id: '11.8',
      modulo: 11,
      titulo: 'WebGPU y TSL: el mapa del futuro',
      objetivo:
        'Situar WebGPU y Three Shading Language sin prometer lo que todavía no está en todas partes.',
      nivel: 'alto',
      minutos: 45,
      bloques: [
        {
          tipo: 'parrafo',
          texto:
            'WebGPU es la API gráfica que sustituye a WebGL: habla con la GPU de forma más directa, permite compute shaders y reparte mejor el trabajo entre hilos. TSL (Three Shading Language) es la forma de escribir materiales para ella en JavaScript, sin cadenas de GLSL. three la soporta desde el módulo `three/webgpu`, con `WebGPURenderer`. Todo eso es real y funciona hoy, pero no en todos los navegadores ni en todas las GPU: WebGL sigue siendo la apuesta segura para una web que debe abrirse en cualquier sitio.',
        },
        { tipo: 'widget', id: 'm11-webgpu', titulo: 'Detección de WebGPU en tu navegador' },
        {
          tipo: 'codigo',
          lenguaje: 'tsx',
          titulo: 'El cambio mínimo en R3F',
          codigo: `import { Canvas } from '@react-three/fiber'
import { WebGPURenderer } from 'three/webgpu'

<Canvas
  gl={async (props) => {
    const renderer = new WebGPURenderer({ ...props, antialias: true })
    await renderer.init()
    return renderer
  }}
>
  <Escena />
</Canvas>`,
        },
        {
          tipo: 'tabla',
          cabecera: ['', 'WebGL 2', 'WebGPU'],
          filas: [
            ['Soporte', 'Universal en navegadores modernos', 'Chrome/Edge completos, Safari y Firefox recientes'],
            ['Shader', 'GLSL', 'WGSL + TSL'],
            ['Compute', 'No', 'Sí'],
            ['Materiales', '`ShaderMaterial`', 'Node Material'],
            ['Madurez en R3F', 'Total', 'Experimental'],
            ['Este curso', 'Sí', 'Solo teoría y detección'],
          ],
        },
        {
          tipo: 'destacado',
          tono: 'info',
          titulo: 'Una nota honesta',
          texto:
            'Esta web se renderiza con WebGL en todas sus lecciones, incluidas las de shaders. No hay una escena en WebGPU porque el curso tiene que funcionar en el navegador de cualquiera que lo abra. El widget de arriba solo comprueba si tu equipo tiene adaptador; no ejecuta un renderer distinto. Aprender GLSL y `ShaderMaterial` no es tiempo perdido: TSL se entiende mucho mejor después.',
        },
        {
          tipo: 'lista',
          items: [
            'Si vas a publicar un producto hoy, WebGL es la opción por defecto.',
            'WebGPU brilla con compute, muchos objetos o postprocesado complejo.',
            'El renderer se cambia; la escena, los hooks y la cámara no.',
            'TSL se escribe en JavaScript y se compone con nodos, no con cadenas.',
            'Comprueba `navigator.gpu` y ofrece WebGL como respaldo.',
          ],
        },
      ],
      errores: [
        {
          sintoma: '`three/webgpu` no existe al importar.',
          causa: 'Se instaló una versión de three anterior a la separación del build.',
          arreglo: 'Actualiza three y comprueba la ruta `three/webgpu` en el paquete.',
        },
        {
          sintoma: 'El canvas queda en blanco en Firefox o Safari antiguos.',
          causa: 'El navegador no expone `navigator.gpu`.',
          arreglo: 'Detecta y cae a WebGL.',
        },
        {
          sintoma: 'Los materiales dejan de verse al cambiar de renderer.',
          causa: 'Shaders GLSL con `onBeforeCompile` no existen en el pipeline de nodos.',
          arreglo: 'Migra esos materiales a TSL o mantén WebGL.',
        },
      ],
      quiz: [
        {
          tipo: 'unica',
          enunciado: '¿Qué API usa este curso para renderizar?',
          opciones: ['WebGL', 'WebGPU', 'Canvas 2D', 'SVG'],
          correcta: 0,
          explicacion: 'Por compatibilidad, todas las demos son WebGL.',
        },
        {
          tipo: 'verdadero-falso',
          enunciado: 'Cambiar a WebGPU obliga a reescribir la escena entera.',
          correcta: false,
          explicacion: 'Cambian el renderer y los materiales; la escena no.',
        },
        {
          tipo: 'multiple',
          enunciado: '¿Qué aporta WebGPU frente a WebGL?',
          opciones: ['Compute shaders', 'Shaders en WGSL', 'Mejor reparto entre hilos', 'Soporte universal'],
          correctas: [0, 1, 2],
          explicacion: 'El soporte universal es justo lo que todavía no tiene.',
        },
        {
          tipo: 'unica',
          enunciado: '¿Cómo se comprueba si hay WebGPU?',
          opciones: [
            'Mirando si existe `navigator.gpu`',
            'Preguntando a `window.WebGLRenderingContext`',
            'Con `document.createElement("gpu")`',
            'Con `performance.now()`',
          ],
          correcta: 0,
          explicacion: 'Y después se pide un adaptador, que puede fallar igualmente.',
        },
      ],
      recursos: [
        {
          titulo: 'MDN: WebGPU API',
          url: 'https://developer.mozilla.org/en-US/docs/Web/API/WebGPU_API',
          nota: 'Estado del soporte y guía de inicio.',
        },
        {
          titulo: 'three: WebGPURenderer',
          url: 'https://github.com/mrdoob/three.js/wiki/WebGPU',
          nota: 'Qué cambia en el renderer y en los materiales.',
        },
        {
          titulo: 'Three.js Shading Language (TSL)',
          url: 'https://github.com/mrdoob/three.js/wiki/Three.js-Shading-Language',
          nota: 'La sintaxis de nodos que sustituye a GLSL.',
        },
      ],
      ejercicio: {
        reto: 'Decide qué renderer usar: recibe si hay `navigator.gpu`, si se obtuvo adaptador y si el proyecto necesita compute, y devuelve la elección.',
        inicial: `type Capacidades = { gpu: boolean; adaptador: boolean; compute: boolean }

// TODO: WebGPU solo si hay gpu + adaptador. Sin compute, WebGL sigue valiendo.
export function elegir(c: Capacidades): 'webgpu' | 'webgl2' {
  return 'webgl2'
}

console.log(elegir({ gpu: true, adaptador: true, compute: true }))`,
        solucion: `type Capacidades = { gpu: boolean; adaptador: boolean; compute: boolean }

export function elegir(c: Capacidades): 'webgpu' | 'webgl2' {
  if (c.gpu && c.adaptador) return 'webgpu'
  return 'webgl2'
}

console.log(elegir({ gpu: true, adaptador: true, compute: true }))`,
        pistas: [
          'Con `gpu` expuesto pero sin adaptador no se puede usar WebGPU.',
          '`compute` es una razón para querer WebGPU, no un requisito para que funcione.',
          'La respuesta por defecto debe ser la compatible.',
        ],
      },
    },
  ],
}

import type { Modulo } from './tipos'

export const modulo7: Modulo = {
  numero: 7,
  titulo: 'Texturas y materiales PBR',
  descripcion:
    'Una geometría describe la forma; una textura describe la superficie. Aquí se aprende a colocar los mapas, a no romper el color al cargarlos y a componer un material PBR que se vea como el original.',
  lecciones: [
    {
      id: '7.1',
      modulo: 7,
      titulo: 'UVs',
      objetivo:
        'Entender el mapeo 2D→3D y usar `repeat`, `offset` y `wrap` sin perder de vista qué parte de la textura se está viendo.',
      nivel: 'medio',
      minutos: 55,
      bloques: [
        {
          tipo: 'parrafo',
          texto:
            'Cada vértice de una geometría puede llevar un par de números, `u` y `v`, entre 0 y 1. Eso es su coordenada de textura: dice qué punto de la imagen le corresponde. El mapeo 2D→3D no es magia; es una tabla escrita a mano por quien modeló la pieza. Los UVs de una caja, por ejemplo, están desplegados como una cruz: seis caras, seis regiones del mismo cuadrado.',
        },
        { tipo: 'demo', id: 'm7-uvs', titulo: 'Repite, desplaza y mira qué ventana se usa' },
        {
          tipo: 'parrafo',
          texto:
            'La fórmula es corta: el shader calcula `uv * repeat + offset`. Con `repeat` a 2, la textura se muestrea dos veces por cada unidad de superficie; con `offset` a 0,5, el origen se desplaza media textura. Por eso `offset` no «mueve la textura»: mueve la ventana con la que se consulta. Y por eso hace falta `wrapS`/`wrapT` en `RepeatWrapping`: sin él, fuera de 0..1 se corta.',
        },
        {
          tipo: 'codigo',
          lenguaje: 'tsx',
          titulo: 'Configurar una textura repetida',
          codigo: `import * as THREE from 'three'
import { useTexture } from '@react-three/drei'

function Suelo() {
  const textura = useTexture('/texturas/rejilla-color.png')

  textura.wrapS = THREE.RepeatWrapping
  textura.wrapT = THREE.RepeatWrapping
  textura.repeat.set(8, 8)
  textura.offset.set(0.5, 0)
  // Cambiar estos valores después de subir la textura a la GPU
  // requiere avisar: si no, no se ve el cambio.
  textura.needsUpdate = true

  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry args={[20, 20]} />
      <meshStandardMaterial map={textura} />
    </mesh>
  )
}`,
        },
        {
          tipo: 'destacado',
          tono: 'ojo',
          titulo: 'Una textura, un juego de parámetros',
          texto:
            'Si dos mallas comparten el mismo objeto `Texture` y una necesita otro `repeat`, no hay forma: el último que escribe gana y las dos se ven igual. Hay que clonar (`texture.clone()`), que comparte la imagen y el búfer pero tiene sus propios parámetros. La demo lo hace para poder mostrar el atlas completo al lado del cubo.',
        },
        {
          tipo: 'tabla',
          cabecera: ['Propiedad', 'Qué controla', 'Valor típico'],
          filas: [
            ['`repeat`', 'Cuántas veces se repite en U y V', '`[1, 1]` o el número de baldosas'],
            ['`offset`', 'Desplazamiento del origen', '`[0, 0]`, `[0.5, 0]`'],
            ['`wrapS` / `wrapT`', 'Qué pasa fuera de 0..1', '`RepeatWrapping`'],
            ['`rotation`', 'Giro de la textura en radianes', '`0`'],
            ['`center`', 'Punto de pivote del giro', '`[0.5, 0.5]`'],
          ],
        },
        {
          tipo: 'lista',
          items: [
            'Los UVs son datos de la geometría, no del material.',
            '`RepeatWrapping` es imprescindible en suelos y paredes.',
            'La escala de la textura va en `repeat`, no en la escala del objeto.',
            'Cambiar `repeat` en tiempo de ejecución exige `needsUpdate`.',
            'Un UV estirado se arregla en el modelo o con `repeat`, no con luces.',
          ],
        },
      ],
      errores: [
        {
          sintoma: 'La textura se repite pero la costura es visible en cada borde.',
          causa: 'La imagen no es tileable o `wrap` está en `ClampToEdgeWrapping`.',
          arreglo: 'Usa una textura sin costuras y `RepeatWrapping` en ambos ejes.',
        },
        {
          sintoma: 'Cambiar `repeat` desde un control no hace nada.',
          causa: 'La textura ya se subió a la GPU y no se marcó `needsUpdate`.',
          arreglo: 'Asigna `texture.needsUpdate = true` después de cambiar los parámetros.',
        },
        {
          sintoma: 'Dos objetos con la misma textura cambian a la vez.',
          causa: 'Comparten el objeto `Texture`.',
          arreglo: 'Clona la textura para el que necesite otros parámetros.',
        },
      ],
      quiz: [
        {
          tipo: 'unica',
          enunciado: '¿Qué es un UV?',
          opciones: [
            'Una coordenada 2D por vértice que indica qué punto de la textura le toca',
            'Un tipo de luz ultravioleta',
            'Un eje del espacio 3D',
            'Un material transparente',
          ],
          correcta: 0,
          explicacion: 'U y V son los ejes de la imagen; el par se guarda por vértice.',
        },
        {
          tipo: 'verdadero-falso',
          enunciado: '`offset` mueve el objeto en el espacio.',
          correcta: false,
          explicacion: 'Mueve la ventana de muestreo de la textura, no la geometría.',
        },
        {
          tipo: 'multiple',
          enunciado: '¿Qué hace falta para repetir una textura por un plano?',
          opciones: [
            '`wrapS = RepeatWrapping`',
            '`wrapT = RepeatWrapping`',
            '`repeat` mayor que 1',
            '`metalness = 1`',
          ],
          correctas: [0, 1, 2],
          explicacion: 'La metalicidad no tiene nada que ver con el mapeo.',
        },
        {
          tipo: 'unica',
          enunciado: '¿Cómo se evita que dos mallas compartan `repeat`?',
          opciones: [
            'Clonando la textura',
            'Duplicando la geometría',
            'Cambiando el material a `basic`',
            'No se puede evitar',
          ],
          correcta: 0,
          explicacion: '`texture.clone()` comparte la imagen y separa los parámetros.',
        },
      ],
      recursos: [
        {
          titulo: 'three.js: Texture',
          url: 'https://threejs.org/docs/#api/en/textures/Texture',
          nota: '`repeat`, `offset`, `wrapS`, `wrapT`, `needsUpdate`.',
        },
        {
          titulo: 'three.js: BufferGeometry.attributes.uv',
          url: 'https://threejs.org/docs/#api/en/core/BufferGeometry',
          nota: 'Dónde viven los UVs y cómo se leen para depurar.',
        },
        {
          titulo: 'Polycount: UV mapping basics',
          url: 'https://polycount.com/discussion/43018/uv-mapping-basics',
          nota: 'Referencia clásica de desplegado, aunque sea de otro software.',
        },
      ],
      ejercicio: {
        reto: 'Genera una textura con `CanvasTexture` en el navegador y applícale `repeat` y `offset` con dos deslizadores.',
        inicial: `import { useMemo } from 'react'
import { Canvas } from '@react-three/fiber'
import * as THREE from 'three'

export default function App() {
  const textura = useMemo(() => {
    const canvas = document.createElement('canvas')
    canvas.width = 128
    canvas.height = 128
    const ctx = canvas.getContext('2d')!
    ctx.fillStyle = '#20304f'
    ctx.fillRect(0, 0, 128, 128)
    ctx.strokeStyle = '#f5a524'
    ctx.lineWidth = 6
    ctx.strokeRect(8, 8, 112, 112)
    return new THREE.CanvasTexture(canvas)
  }, [])

  // TODO: activa RepeatWrapping y un repeat de 4×4

  return (
    <div style={{ height: 320 }}>
      <Canvas camera={{ position: [2, 2, 3] }} frameloop="always">
        <ambientLight intensity={0.6} />
        <directionalLight position={[3, 4, 2]} intensity={2} />
        <mesh>
          <boxGeometry args={[1.4, 1.4, 1.4]} />
          <meshStandardMaterial map={textura} />
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
    const canvas = document.createElement('canvas')
    canvas.width = 128
    canvas.height = 128
    const ctx = canvas.getContext('2d')!
    ctx.fillStyle = '#20304f'
    ctx.fillRect(0, 0, 128, 128)
    ctx.strokeStyle = '#f5a524'
    ctx.lineWidth = 6
    ctx.strokeRect(8, 8, 112, 112)

    const t = new THREE.CanvasTexture(canvas)
    t.wrapS = THREE.RepeatWrapping
    t.wrapT = THREE.RepeatWrapping
    t.repeat.set(4, 4)
    t.colorSpace = THREE.SRGBColorSpace
    t.needsUpdate = true
    return t
  }, [])

  return (
    <div style={{ height: 320 }}>
      <Canvas camera={{ position: [2, 2, 3] }} frameloop="always">
        <ambientLight intensity={0.6} />
        <directionalLight position={[3, 4, 2]} intensity={2} />
        <mesh>
          <boxGeometry args={[1.4, 1.4, 1.4]} />
          <meshStandardMaterial map={textura} />
        </mesh>
      </Canvas>
    </div>
  )
}`,
        pistas: [
          'El `wrap` se pone en la textura, no en el material.',
          'Sin `wrapS`/`wrapT` en `RepeatWrapping`, `repeat` no hace mosaico.',
          'Marca `needsUpdate` después de tocar los parámetros.',
        ],
      },
    },
    {
      id: '7.2',
      modulo: 7,
      titulo: 'Cargar texturas',
      objetivo:
        'Cargar imágenes con `useTexture`, entender el suspendido de la carga y configurar filtros y anisotropía con criterio.',
      nivel: 'intro',
      minutos: 45,
      bloques: [
        {
          tipo: 'parrafo',
          texto:
            'Cargar una imagen es asíncrono, y una escena no puede dibujar una textura que todavía no llegó. R3F resuelve esto con `Suspense`: el componente que llama a `useTexture` se suspende hasta que el archivo está listo. Por eso todas las demos del curso ya están envueltas en `<Suspense>`; si escribes fuera de ese límite, verás el aviso de «suspended while rendering».',
        },
        { tipo: 'demo', id: 'm7-cargar', titulo: 'Filtro y anisotropía sobre una superficie en rasante' },
        {
          tipo: 'codigo',
          lenguaje: 'tsx',
          titulo: 'Cargar, configurar y no duplicar descargas',
          codigo: `import { useTexture } from '@react-three/drei'
import * as THREE from 'three'

function Suelo() {
  const [color, rugosidad] = useTexture([
    TEXTURAS.rejillaColor,
    TEXTURAS.metalRugosidad,
  ])

  color.colorSpace = THREE.SRGBColorSpace   // mapa de color
  rugosidad.colorSpace = THREE.NoColorSpace // mapa de datos

  color.wrapS = color.wrapT = THREE.RepeatWrapping
  color.repeat.set(6, 6)
  color.anisotropy = 8

  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry args={[20, 20]} />
      <meshStandardMaterial map={color} roughnessMap={rugosidad} />
    </mesh>
  )
}

// Precarga fuera del componente: evita el salto al entrar en la lección.
useTexture.preload(TEXTURAS.rejillaColor)`,
        },
        {
          tipo: 'tabla',
          cabecera: ['Ajuste', 'Qué hace', 'Cuándo tocarlo'],
          filas: [
            ['`minFilter`', 'Filtro al reducir', 'Texturas repetidas que se ven pequeñas'],
            ['`magFilter`', 'Filtro al ampliar', 'Poco habitual; `Nearest` da aspecto pixelado'],
            ['`generateMipmaps`', 'Genera versiones reducidas', 'Dejar activo salvo en `DataTexture`'],
            ['`anisotropy`', 'Muestras extra en ejes comprimidos', 'Suelos y planos en rasante'],
            ['`flipY`', 'Invierte la V al cargar', 'Casi nunca; solo con imágenes invertidas'],
          ],
        },
        {
          tipo: 'destacado',
          tono: 'porque',
          titulo: 'Por qué el suelo lejano brilla y parpadea',
          texto:
            'Porque una textura repetida termina ocupando menos de un píxel por texel. Sin mipmaps, el muestreo coge un texel al azar por píxel y el resultado vibra al mover la cámara. Con mipmaps se elige una versión reducida y el ruido desaparece; la anisotropía añade muestras en la dirección comprimida para que no se vea todo borroso.',
        },
        {
          tipo: 'lista',
          items: [
            '`useTexture` cachea por URL: dos componentes que piden lo mismo descargan una vez.',
            'La anisotropía máxima la impone la GPU: `gl.capabilities.getMaxAnisotropy()`.',
            '`useTexture.preload` lanza la descarga antes de montar el componente.',
            'Los mapas de datos no llevan sRGB, y los de color sí: eso es la lección 7.3.',
            'Una textura de 4096 px en un móvil puede costar 64 MB de VRAM. No hace falta para una taza.',
          ],
        },
      ],
      errores: [
        {
          sintoma: '«A component suspended while responding to synchronous input».',
          causa: 'Se llamó a `useTexture` fuera de un `<Suspense>`.',
          arreglo: 'Envuelve el subárbol en `<Suspense fallback={null}>`.',
        },
        {
          sintoma: 'La textura sale al revés en vertical.',
          causa: 'La imagen se guardó con el origen invertido o `flipY` está mal.',
          arreglo: 'Corrige el archivo o ajusta `texture.flipY` antes de subirla.',
        },
        {
          sintoma: 'El suelo se ve borroso en cuanto se aleja.',
          causa: '`anisotropy` a 1 y mipmaps por defecto.',
          arreglo: 'Sube `anisotropy` al máximo razonable (8–16) y mantén los mipmaps.',
        },
      ],
      quiz: [
        {
          tipo: 'unica',
          enunciado: '¿Por qué hace falta `Suspense` al cargar texturas?',
          opciones: [
            'Porque la carga es asíncrona y el componente espera al archivo',
            'Porque WebGL no soporta imágenes',
            'Porque React no puede renderizar en 3D',
            'Porque las texturas son opcionales',
          ],
          correcta: 0,
          explicacion: '`useTexture` lanza una promesa; `Suspense` muestra el fallback mientras se resuelve.',
        },
        {
          tipo: 'verdadero-falso',
          enunciado: '`useTexture` descarga el archivo una vez por componente que lo usa.',
          correcta: false,
          explicacion: 'Cachea por URL: la misma ruta se descarga una sola vez.',
        },
        {
          tipo: 'multiple',
          enunciado: '¿Qué mejora la calidad de una textura repetida vista en rasante?',
          opciones: ['`anisotropy` alto', 'Mipmaps activos', '`minFilter` adecuado', '`metalness` alto'],
          correctas: [0, 1, 2],
          explicacion: 'La metalicidad no afecta al muestreo de la textura.',
        },
        {
          tipo: 'unica',
          enunciado: '¿De dónde sale el máximo de anisotropía?',
          opciones: [
            'De `gl.capabilities.getMaxAnisotropy()`',
            'De `THREE.REVISION`',
            'Del tamaño de la textura',
            'De la cámara',
          ],
          correcta: 0,
          explicacion: 'Lo impone la extensión de la GPU, no la librería.',
        },
      ],
      recursos: [
        {
          titulo: 'drei: useTexture',
          url: 'https://drei.docs.pmnd.rs/loaders/use-texture',
          nota: 'Firma, precarga y relación con `Suspense`.',
        },
        {
          titulo: 'three.js: TextureLoader',
          url: 'https://threejs.org/docs/#api/en/loaders/TextureLoader',
          nota: 'El cargador que hay debajo.',
        },
        {
          titulo: 'three.js: Texture.minFilter',
          url: 'https://threejs.org/docs/#api/en/textures/Texture',
          nota: 'La lista de filtros y cuándo usar cada uno.',
        },
      ],
      ejercicio: {
        reto: 'Genera una textura de cuadrícula en canvas, aplícale `anisotropy = 8` y compárala con `anisotropy = 1` en un plano inclinado.',
        inicial: `import { useMemo, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import * as THREE from 'three'

export default function App() {
  const [anisotropia, setAnisotropia] = useState(1)

  const textura = useMemo(() => {
    const canvas = document.createElement('canvas')
    canvas.width = 256
    canvas.height = 256
    const ctx = canvas.getContext('2d')!
    ctx.fillStyle = '#1b2437'
    ctx.fillRect(0, 0, 256, 256)
    ctx.strokeStyle = '#5b7dbf'
    ctx.lineWidth = 4
    for (let i = 0; i <= 256; i += 32) {
      ctx.beginPath()
      ctx.moveTo(i, 0)
      ctx.lineTo(i, 256)
      ctx.moveTo(0, i)
      ctx.lineTo(256, i)
      ctx.stroke()
    }

    const t = new THREE.CanvasTexture(canvas)
    t.wrapS = t.wrapT = THREE.RepeatWrapping
    t.repeat.set(12, 12)
    t.colorSpace = THREE.SRGBColorSpace
    return t
  }, [])

  // TODO: asigna textura.anisotropy = anisotropia y marca needsUpdate

  return (
    <div style={{ height: 320 }}>
      <input type="range" min={1} max={16} value={anisotropia} onChange={(e) => setAnisotropia(Number(e.target.value))} />
      <Canvas camera={{ position: [0, 2.4, 4] }} frameloop="always">
        <ambientLight intensity={0.6} />
        <directionalLight position={[3, 4, 2]} intensity={2} />
        <mesh rotation={[-Math.PI / 2 + 0.25, 0, 0]} position={[0, 0.6, 0]}>
          <planeGeometry args={[8, 6]} />
          <meshStandardMaterial map={textura} />
        </mesh>
      </Canvas>
    </div>
  )
}`,
        solucion: `import { useMemo, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import * as THREE from 'three'

export default function App() {
  const [anisotropia, setAnisotropia] = useState(1)

  const textura = useMemo(() => {
    const canvas = document.createElement('canvas')
    canvas.width = 256
    canvas.height = 256
    const ctx = canvas.getContext('2d')!
    ctx.fillStyle = '#1b2437'
    ctx.fillRect(0, 0, 256, 256)
    ctx.strokeStyle = '#5b7dbf'
    ctx.lineWidth = 4
    for (let i = 0; i <= 256; i += 32) {
      ctx.beginPath()
      ctx.moveTo(i, 0)
      ctx.lineTo(i, 256)
      ctx.moveTo(0, i)
      ctx.lineTo(256, i)
      ctx.stroke()
    }

    const t = new THREE.CanvasTexture(canvas)
    t.wrapS = t.wrapT = THREE.RepeatWrapping
    t.repeat.set(12, 12)
    t.colorSpace = THREE.SRGBColorSpace
    return t
  }, [])

  textura.anisotropy = anisotropia
  textura.needsUpdate = true

  return (
    <div style={{ height: 320 }}>
      <input type="range" min={1} max={16} value={anisotropia} onChange={(e) => setAnisotropia(Number(e.target.value))} />
      <Canvas camera={{ position: [0, 2.4, 4] }} frameloop="always">
        <ambientLight intensity={0.6} />
        <directionalLight position={[3, 4, 2]} intensity={2} />
        <mesh rotation={[-Math.PI / 2 + 0.25, 0, 0]} position={[0, 0.6, 0]}>
          <planeGeometry args={[8, 6]} />
          <meshStandardMaterial map={textura} />
        </mesh>
      </Canvas>
    </div>
  )
}`,
        pistas: [
          'La anisotropía se asigna en la textura, no en el material.',
          'Cada cambio necesita `needsUpdate = true` para re-subir la configuración.',
          'A 1 se ve una mancha; a 8, las líneas aguantan más lejos.',
        ],
      },
    },
    {
      id: '7.3',
      modulo: 7,
      titulo: '`colorSpace`',
      objetivo:
        'Distinguir mapas de color de mapas de datos y corregir el aspecto lavado con la declaración correcta.',
      nivel: 'medio',
      minutos: 50,
      bloques: [
        {
          tipo: 'parrafo',
          texto:
            'Un PNG no dice qué contienen sus píxeles. Si es una foto o un color, está guardado en sRGB: un espacio no lineal pensado para pantallas. Si es un mapa de normales o de rugosidad, sus valores son datos lineales y no deben convertirse. three.js no puede adivinarlo, así que lo eliges tú con `colorSpace`, y equivocarse tiene un síntoma muy concreto: la textura se ve lavada y sin contraste.',
        },
        { tipo: 'demo', id: 'm7-colorspace', titulo: 'Mismo archivo, dos declaraciones' },
        {
          tipo: 'codigo',
          lenguaje: 'tsx',
          titulo: 'Qué va en sRGB y qué no',
          codigo: `// Mapa de color: se guardó en sRGB.
color.colorSpace = THREE.SRGBColorSpace

// Mapas de datos: sus valores son lineales.
normal.colorSpace = THREE.NoColorSpace
rugosidad.colorSpace = THREE.NoColorSpace
metalicidad.colorSpace = THREE.NoColorSpace
ao.colorSpace = THREE.NoColorSpace

// Emisivo es color, aunque no reciba luz.
emisivo.colorSpace = THREE.SRGBColorSpace`,
        },
        {
          tipo: 'tabla',
          cabecera: ['Mapa', 'Contenido', '`colorSpace`'],
          filas: [
            ['`map`', 'Color albedo', '`SRGBColorSpace`'],
            ['`emissiveMap`', 'Color emitido', '`SRGBColorSpace`'],
            ['`normalMap`', 'Vector codificado', '`NoColorSpace`'],
            ['`roughnessMap`', 'Escala de grises', '`NoColorSpace`'],
            ['`aoMap`', 'Oclusión', '`NoColorSpace`'],
          ],
        },
        {
          tipo: 'destacado',
          tono: 'porque',
          titulo: 'Por qué se ve «lavado» y no simplemente oscuro',
          texto:
            'Porque el renderer convierte los valores lineales a sRGB al escribir el píxel. Si tratas un valor sRGB como lineal, lo elevas dos veces (aproximadamente) y el resultado es más claro y desaturado de lo que debería. No es un fallo de iluminación: es una conversión hecha dos veces o ninguna.',
        },
        {
          tipo: 'lista',
          items: [
            '`SRGBColorSpace` para todo lo que sea color visible.',
            '`NoColorSpace` para todo lo que sea un número: normales, rugosidad, metalicidad, AO.',
            'Una textura mal declarada envejece mal: cambia si tocas el mapeo tonal.',
            'En glTF el color ya viene marcado; el problema aparece con archivos cargados a mano.',
            'Si dudas, cambia solo `colorSpace` y compara: es la prueba más rápida.',
          ],
        },
      ],
      errores: [
        {
          sintoma: 'La madera se ve gris y sin contraste.',
          causa: 'El mapa de color está en `NoColorSpace`.',
          arreglo: 'Declara `SRGBColorSpace` en el mapa de color.',
        },
        {
          sintoma: 'El relieve del mapa de normales se ve exagerado y sucio.',
          causa: 'El mapa de normales está declarado como sRGB.',
          arreglo: 'Ponlo en `NoColorSpace`; los vectores no se convierten.',
        },
        {
          sintoma: 'El color cambia al activar el mapeo tonal ACES.',
          causa: 'Una o más texturas estaban mal declaradas y el mapeo lo hace evidente.',
          arreglo: 'Revisa el `colorSpace` de todos los mapas antes de culpar al mapeo.',
        },
      ],
      quiz: [
        {
          tipo: 'unica',
          enunciado: '¿Qué espacio corresponde a un mapa de color?',
          opciones: ['`SRGBColorSpace`', '`NoColorSpace`', '`LinearSRGBColorSpace`', '`DisplayP3ColorSpace`'],
          correcta: 0,
          explicacion: 'Los colores visibles se guardan en sRGB por convención.',
        },
        {
          tipo: 'verdadero-falso',
          enunciado: 'El mapa de normales debe declararse en sRGB.',
          correcta: false,
          explicacion: 'Contiene vectores, no color: va en `NoColorSpace`.',
        },
        {
          tipo: 'multiple',
          enunciado: '¿Qué mapas son datos y no color?',
          opciones: ['`normalMap`', '`roughnessMap`', '`aoMap`', '`emissiveMap`'],
          correctas: [0, 1, 2],
          explicacion: '`emissiveMap` es color emitido: sRGB.',
        },
        {
          tipo: 'unica',
          enunciado: '¿Qué síntoma produce declarar un color como lineal?',
          opciones: [
            'Se ve más claro y desaturado',
            'Se ve más oscuro y saturado',
            'No se ve',
            'Se ve en blanco y negro',
          ],
          correcta: 0,
          explicacion: 'Se aplica una conversión de más y los valores suben.',
        },
      ],
      recursos: [
        {
          titulo: 'three.js: Color management',
          url: 'https://threejs.org/docs/#manual/en/introduction/Color-management',
          nota: 'La explicación completa de espacios de color y conversiones.',
        },
        {
          titulo: 'three.js: Texture.colorSpace',
          url: 'https://threejs.org/docs/#api/en/textures/Texture',
          nota: 'Los valores admitidos y su efecto.',
        },
        {
          titulo: 'glTF 2.0: material specification',
          url: 'https://registry.khronos.org/glTF/specs/2.0/glTF-2.0.html#materials',
          nota: 'Qué mapas son sRGB y cuáles lineales según el estándar.',
        },
      ],
      ejercicio: {
        reto: 'Crea dos planos con la misma textura generada en canvas: uno declarado como sRGB y otro como lineal. Comprueba cuál se ve correcto.',
        inicial: `import { useMemo } from 'react'
import { Canvas } from '@react-three/fiber'
import * as THREE from 'three'

function crearTextura(colorSpace: THREE.ColorSpace) {
  const canvas = document.createElement('canvas')
  canvas.width = 128
  canvas.height = 128
  const ctx = canvas.getContext('2d')!
  ctx.fillStyle = '#b06a3a'
  ctx.fillRect(0, 0, 128, 128)
  ctx.fillStyle = '#7a4422'
  for (let i = 0; i < 128; i += 16) ctx.fillRect(0, i, 128, 8)

  const t = new THREE.CanvasTexture(canvas)
  t.colorSpace = colorSpace
  return t
}

export default function App() {
  const correcta = useMemo(() => crearTextura(THREE.SRGBColorSpace), [])
  const lineal = useMemo(() => crearTextura(THREE.NoColorSpace), [])

  return (
    <div style={{ height: 320 }}>
      <Canvas camera={{ position: [0, 0, 4] }} frameloop="always">
        <ambientLight intensity={1} />
        {/* TODO: añade dos planos, uno con cada textura */}
      </Canvas>
    </div>
  )
}`,
        solucion: `import { useMemo } from 'react'
import { Canvas } from '@react-three/fiber'
import * as THREE from 'three'

function crearTextura(colorSpace: THREE.ColorSpace) {
  const canvas = document.createElement('canvas')
  canvas.width = 128
  canvas.height = 128
  const ctx = canvas.getContext('2d')!
  ctx.fillStyle = '#b06a3a'
  ctx.fillRect(0, 0, 128, 128)
  ctx.fillStyle = '#7a4422'
  for (let i = 0; i < 128; i += 16) ctx.fillRect(0, i, 128, 8)

  const t = new THREE.CanvasTexture(canvas)
  t.colorSpace = colorSpace
  return t
}

export default function App() {
  const correcta = useMemo(() => crearTextura(THREE.SRGBColorSpace), [])
  const lineal = useMemo(() => crearTextura(THREE.NoColorSpace), [])

  return (
    <div style={{ height: 320 }}>
      <Canvas camera={{ position: [0, 0, 4] }} frameloop="always">
        <ambientLight intensity={1} />
        <mesh position={[-0.75, 0, 0]}>
          <planeGeometry args={[1.3, 1.3]} />
          <meshBasicMaterial map={lineal} />
        </mesh>
        <mesh position={[0.75, 0, 0]}>
          <planeGeometry args={[1.3, 1.3]} />
          <meshBasicMaterial map={correcta} />
        </mesh>
      </Canvas>
    </div>
  )
}`,
        pistas: [
          'Con `meshBasicMaterial` la luz no interviene y la diferencia se ve limpia.',
          'Dos planos separados 1,5 unidades, ambos mirando a cámara.',
          'El de la izquierda será el lavado: compruébalo cambiando el orden.',
        ],
      },
    },
    {
      id: '7.4',
      modulo: 7,
      titulo: 'Mapas PBR',
      objetivo:
        'Componer un material PBR completo y explicar qué aporta cada mapa sin confundir canales.',
      nivel: 'medio',
      minutos: 60,
      bloques: [
        {
          tipo: 'parrafo',
          texto:
            'Un material PBR no es «un material con textura»: es un conjunto de mapas que describen propiedades físicas distintas. El color dice qué luz refleja; la normal, hacia dónde apunta cada microsuperficie; la rugosidad, cuánto dispersa; el AO, cuánta luz llega a las grietas; el emisivo, qué emite sin iluminación. Cada uno tiene su propio formato y su propio espacio de color.',
        },
        { tipo: 'demo', id: 'm7-mapas', titulo: 'Activa y desactiva cada mapa' },
        {
          tipo: 'codigo',
          lenguaje: 'tsx',
          titulo: 'Un material completo',
          codigo: `<meshStandardMaterial
  map={color}                    // sRGB
  normalMap={normal}             // lineal
  normalScale={new THREE.Vector2(0.8, 0.8)}
  roughnessMap={rugosidad}       // lineal
  roughness={1}                  // se multiplica por el mapa
  metalnessMap={metalicidad}     // lineal (suele venir en el canal azul)
  aoMap={ao}                     // lineal, necesita el segundo juego de UV
  emissiveMap={emisivo}          // sRGB
  emissive="#ffffff"
  emissiveIntensity={1.2}
/>`,
        },
        {
          tipo: 'tabla',
          cabecera: ['Mapa', 'Qué modula', 'Canal / espacio'],
          filas: [
            ['`map`', 'Color base', 'RGB · sRGB'],
            ['`normalMap`', 'Orientación de la superficie', 'RGB codificado · lineal'],
            ['`roughnessMap`', 'Brillo', 'Canal verde · lineal'],
            ['`metalnessMap`', 'Reflectividad', 'Canal azul · lineal'],
            ['`aoMap`', 'Oclusión en huecos', 'Canal rojo · lineal, requiere `uv1`'],
            ['`emissiveMap`', 'Luz emitida', 'RGB · sRGB'],
          ],
        },
        {
          tipo: 'destacado',
          tono: 'ojo',
          titulo: 'glTF empaqueta la rugosidad, la metalicidad y el AO',
          texto:
            'En el estándar glTF, esos tres mapas van en una sola imagen ORM: rojo para la oclusión, verde para la rugosidad, azul para la metalicidad. Por eso many veces no hay tres archivos sino uno. En este curso solo se ha generado el de rugosidad en escala de grises, y el AO no se puede aplicar porque necesita un segundo juego de UV que estos modelos no tienen.',
        },
        {
          tipo: 'lista',
          items: [
            'La normal se nota sobre todo en el borde iluminado, no en el centro.',
            'Si `roughness` es 1 y hay `roughnessMap`, el valor final es el del mapa.',
            'El AO no sustituye a las sombras: oscurece solo donde el modelo lo indica.',
            '`emissiveMap` sin `emissive` de color blanco no emite nada perceptible.',
            'Más mapas no es mejor: un modelo con cinco mapas mal alineados se ve peor que uno con dos.',
          ],
        },
      ],
      errores: [
        {
          sintoma: 'El detalle de la normal desaparece al alejar la cámara.',
          causa: 'Mipmaps del mapa de normal demasiado agresivos o textura de baja resolución.',
          arreglo: 'Usa una normal de más resolución y revisa su `anisotropy`.',
        },
        {
          sintoma: 'La superficie brilla igual en todas partes.',
          causa: 'No hay `roughnessMap`, o `roughness` está forzado a un valor bajo.',
          arreglo: 'Conecta el mapa y deja `roughness={1}` para que lo module.',
        },
        {
          sintoma: 'El AO no hace nada.',
          causa: '`aoMap` necesita un segundo juego de UV (`uv1`) que la geometría no tiene.',
          arreglo: 'Modela con `uv1` o usa el AO pintado en el color; no hay atajo.',
        },
      ],
      quiz: [
        {
          tipo: 'unica',
          enunciado: '¿Qué describe el mapa de normales?',
          opciones: [
            'La orientación de la microsuperficie',
            'El color base',
            'La cantidad de luz emitida',
            'La oclusión',
          ],
          correcta: 0,
          explicacion: 'Codifica una dirección por texel, no un color visible.',
        },
        {
          tipo: 'verdadero-falso',
          enunciado: 'En glTF, rugosidad y metalicidad suelen ir en la misma imagen.',
          correcta: true,
          explicacion: 'Van empaquetadas con el AO en el mapa ORM.',
        },
        {
          tipo: 'multiple',
          enunciado: '¿Qué mapas deben ir en `NoColorSpace`?',
          opciones: ['`normalMap`', '`roughnessMap`', '`aoMap`', '`emissiveMap`'],
          correctas: [0, 1, 2],
          explicacion: 'El emisivo es color: sRGB.',
        },
        {
          tipo: 'unica',
          enunciado: '¿Qué hace falta para usar `aoMap`?',
          opciones: [
            'Un segundo juego de UV (`uv1`)',
            'Un HDRI',
            'Activar sombras',
            'Un material físico',
          ],
          correcta: 0,
          explicacion: 'El AO se muestrea con el segundo juego, no con el primero.',
        },
      ],
      recursos: [
        {
          titulo: 'three.js: MeshStandardMaterial',
          url: 'https://threejs.org/docs/#api/en/materials/MeshStandardMaterial',
          nota: 'La lista completa de mapas y qué modula cada uno.',
        },
        {
          titulo: 'glTF 2.0: materials',
          url: 'https://registry.khronos.org/glTF/specs/2.0/glTF-2.0.html#materials',
          nota: 'El empaquetado ORM y los espacios de color por mapa.',
        },
        {
          titulo: 'Physically Based Rendering: theory',
          url: 'https://learnopengl.com/PBR/Theory',
          nota: 'El modelo metal-roughness explicado desde cero.',
        },
      ],
      ejercicio: {
        reto: 'Genera en canvas dos texturas (color y normal aproximada) y úsalas juntas en un material estándar. Comprueba que la normal cambia el reflejo de la luz.',
        inicial: `import { useMemo } from 'react'
import { Canvas } from '@react-three/fiber'
import * as THREE from 'three'

function colorCanvases() {
  const c = document.createElement('canvas')
  c.width = 128
  c.height = 128
  const ctx = c.getContext('2d')!
  ctx.fillStyle = '#8892a6'
  ctx.fillRect(0, 0, 128, 128)
  ctx.fillStyle = '#5d6779'
  for (let i = 0; i < 128; i += 16) ctx.fillRect(0, i, 128, 6)
  return c
}

function normalCanvas() {
  const c = document.createElement('canvas')
  c.width = 128
  c.height = 128
  const ctx = c.getContext('2d')!
  ctx.fillStyle = '#8080ff'
  ctx.fillRect(0, 0, 128, 128)
  // rayas que simulan una superficie ondulada
  for (let i = 0; i < 128; i += 16) {
    ctx.fillStyle = '#a0a0ff'
    ctx.fillRect(0, i, 128, 4)
    ctx.fillStyle = '#6060ff'
    ctx.fillRect(0, i + 8, 128, 4)
  }
  return c
}

export default function App() {
  const color = useMemo(() => new THREE.CanvasTexture(colorCanvases()), [])
  const normal = useMemo(() => new THREE.CanvasTexture(normalCanvas()), [])

  color.colorSpace = THREE.SRGBColorSpace
  normal.colorSpace = THREE.NoColorSpace

  return (
    <div style={{ height: 320 }}>
      <Canvas camera={{ position: [0, 0, 3.4] }} frameloop="always">
        <ambientLight intensity={0.2} />
        <directionalLight position={[2, 3, 2]} intensity={3} />
        <mesh>
          <sphereGeometry args={[1, 64, 40]} />
          {/* TODO: añade normalMap al material */}
          <meshStandardMaterial map={color} roughness={0.35} metalness={0.4} />
        </mesh>
      </Canvas>
    </div>
  )
}`,
        solucion: `import { useMemo } from 'react'
import { Canvas } from '@react-three/fiber'
import * as THREE from 'three'

function colorCanvases() {
  const c = document.createElement('canvas')
  c.width = 128
  c.height = 128
  const ctx = c.getContext('2d')!
  ctx.fillStyle = '#8892a6'
  ctx.fillRect(0, 0, 128, 128)
  ctx.fillStyle = '#5d6779'
  for (let i = 0; i < 128; i += 16) ctx.fillRect(0, i, 128, 6)
  return c
}

function normalCanvas() {
  const c = document.createElement('canvas')
  c.width = 128
  c.height = 128
  const ctx = c.getContext('2d')!
  ctx.fillStyle = '#8080ff'
  ctx.fillRect(0, 0, 128, 128)
  for (let i = 0; i < 128; i += 16) {
    ctx.fillStyle = '#a0a0ff'
    ctx.fillRect(0, i, 128, 4)
    ctx.fillStyle = '#6060ff'
    ctx.fillRect(0, i + 8, 128, 4)
  }
  return c
}

export default function App() {
  const color = useMemo(() => new THREE.CanvasTexture(colorCanvases()), [])
  const normal = useMemo(() => new THREE.CanvasTexture(normalCanvas()), [])

  color.colorSpace = THREE.SRGBColorSpace
  normal.colorSpace = THREE.NoColorSpace

  return (
    <div style={{ height: 320 }}>
      <Canvas camera={{ position: [0, 0, 3.4] }} frameloop="always">
        <ambientLight intensity={0.2} />
        <directionalLight position={[2, 3, 2]} intensity={3} />
        <mesh>
          <sphereGeometry args={[1, 64, 40]} />
          <meshStandardMaterial
            map={color}
            normalMap={normal}
            roughness={0.35}
            metalness={0.4}
          />
        </mesh>
      </Canvas>
    </div>
  )
}`,
        pistas: [
          'La normal es una textura más: `normalMap={normal}`.',
          'El azul dominante indica que la normal apunta hacia fuera.',
          'Para ver el efecto, mueve la luz: el relieve aparece en el borde iluminado.',
        ],
      },
    },
    {
      id: '7.5',
      modulo: 7,
      titulo: 'Materiales físicos avanzados',
      objetivo:
        'Usar `clearcoat`, `transmission`, `sheen` e `iridescence` con criterio y reconocer su coste.',
      nivel: 'alto',
      minutos: 60,
      bloques: [
        {
          tipo: 'parrafo',
          texto:
            '`MeshPhysicalMaterial` es `MeshStandardMaterial` con capas encima. Cada capa modela un fenómeno que el modelo básico no puede: una película de barniz sobre el color, un vidrio que deja pasar la luz, una tela que dispersa en el borde, una película fina que cambia de color con el ángulo. Son cuatro herramientas distintas y ninguna sustituye a las otras.',
        },
        { tipo: 'demo', id: 'm7-fisicos', titulo: 'Cuatro capas, cuatro esferas, un contador de FPS' },
        {
          tipo: 'codigo',
          lenguaje: 'tsx',
          titulo: 'Las cuatro capas, con sus props mínimas',
          codigo: `// Barniz: una segunda capa especular sobre el color.
<meshPhysicalMaterial color="#d94f4f" roughness={0.35} clearcoat={1} clearcoatRoughness={0.06} />

// Vidrio: la luz atraviesa y se refracta.
<meshPhysicalMaterial
  color="#dfe9f5"
  roughness={0.05}
  transmission={1}
  thickness={0.9}
  ior={1.5}
/>

// Tela: dispersión en el borde.
<meshPhysicalMaterial color="#4a5a78" sheen={1} sheenColor="#ffc9a3" sheenRoughness={0.4} />

// Película fina: el color cambia con el ángulo.
<meshPhysicalMaterial iridescence={1} iridescenceIOR={1.3} iridescenceThicknessRange={[120, 460]} />`,
        },
        {
          tipo: 'tabla',
          cabecera: ['Capa', 'Modela', 'Coste', 'Necesita entorno'],
          filas: [
            ['`clearcoat`', 'Barniz, laca, pintura de coche', 'Medio', 'Sí, para notarse'],
            ['`transmission`', 'Vidrio, agua, ámbar', 'Alto: pasada extra', 'Sí, imprescindible'],
            ['`sheen`', 'Tela, terciopelo, polvo', 'Bajo', 'Recomendable'],
            ['`iridescence`', 'Burbujas, aceite, escarabajo', 'Medio', 'Sí'],
          ],
        },
        {
          tipo: 'destacado',
          tono: 'porque',
          titulo: 'Por qué `transmission` es la capa cara',
          texto:
            'Porque el renderer no puede refractar algo que todavía no ha dibujado. Necesita renderizar la escena sin el objeto transparente en un render target aparte, y luego muestrearlo desde dentro del material. Ese render extra se controla con `gl.transmissionResolutionScale`: a 0,5 cuesta la cuarta parte de píxeles y el fondo se ve algo borroso.',
        },
        {
          tipo: 'lista',
          items: [
            'Sin entorno, `transmission` y `clearcoat` se ven casi negros: no hay nada que reflejar.',
            '`thickness` exagera la refracción; 0,5–1 funciona en objetos pequeños.',
            '`ior` 1,5 es vidrio; 1,33 es agua; 2,4 es diamante.',
            '`sheen` solo se nota en el borde del objeto, no en el centro.',
            'Nunca uses `MeshPhysicalMaterial` para todo: el 90 % de la escena va con `standard`.',
          ],
        },
      ],
      errores: [
        {
          sintoma: 'El cristal se ve gris opaco.',
          causa: 'No hay entorno ni nada detrás que refractar.',
          arreglo: 'Añade `<Environment>` y algo de geometría detrás del objeto.',
        },
        {
          sintoma: 'Con `transmission` los FPS caen a la mitad.',
          causa: 'La pasada extra de transmisión se renderiza a resolución completa.',
          arreglo: 'Baja `gl.transmissionResolutionScale` a 0,5 y comprueba si se nota.',
        },
        {
          sintoma: '`iridescence` no cambia de color al girar.',
          causa: 'La superficie es mate o el rango de espesor es demasiado estrecho.',
          arreglo: 'Baja `roughness` y amplía `iridescenceThicknessRange`.',
        },
      ],
      quiz: [
        {
          tipo: 'unica',
          enunciado: '¿Qué capa modela una tela?',
          opciones: ['`sheen`', '`clearcoat`', '`transmission`', '`iridescence`'],
          correcta: 0,
          explicacion: '`sheen` añade dispersión en el borde, típica de fibras.',
        },
        {
          tipo: 'verdadero-falso',
          enunciado: '`transmission` requiere una pasada de render adicional.',
          correcta: true,
          explicacion: 'La escena se dibuja en un render target aparte para poder refractarla.',
        },
        {
          tipo: 'multiple',
          enunciado: '¿Qué capas necesitan un mapa de entorno para lucir?',
          opciones: ['`clearcoat`', '`transmission`', '`iridescence`', '`sheen`'],
          correctas: [0, 1, 2],
          explicacion: '`sheen` es difuso y se nota también con luces directas.',
        },
        {
          tipo: 'unica',
          enunciado: '¿Qué controla `transmissionResolutionScale`?',
          opciones: [
            'La resolución del render de transmisión',
            'La cantidad de luz transmitida',
            'El índice de refracción',
            'El grosor del cristal',
          ],
          correcta: 0,
          explicacion: 'Es una propiedad del renderer: menos resolución, menos coste.',
        },
      ],
      recursos: [
        {
          titulo: 'three.js: MeshPhysicalMaterial',
          url: 'https://threejs.org/docs/#api/en/materials/MeshPhysicalMaterial',
          nota: 'Todas las capas y sus props.',
        },
        {
          titulo: 'three.js: transmission example',
          url: 'https://threejs.org/examples/#webgl_materials_physical_transmission',
          nota: 'Ejemplo oficial de transmisión con su configuración.',
        },
        {
          titulo: 'drei: Environment',
          url: 'https://drei.docs.pmnd.rs/staging/environment',
          nota: 'Cómo aportar el entorno que estas capas necesitan.',
        },
      ],
      ejercicio: {
        reto: 'Crea dos esferas: una con `clearcoat` y otra con `sheen`. Cambia la rugosidad de la base y observa qué capa cambia antes.',
        inicial: `import { Canvas } from '@react-three/fiber'

export default function App() {
  return (
    <div style={{ height: 320 }}>
      <Canvas camera={{ position: [0, 0, 4] }} frameloop="always">
        <ambientLight intensity={0.3} />
        <directionalLight position={[3, 4, 2]} intensity={3} />

        <mesh position={[-0.85, 0, 0]}>
          <sphereGeometry args={[0.7, 64, 40]} />
          {/* TODO: material físico con clearcoat */}
          <meshStandardMaterial color="#d94f4f" roughness={0.4} />
        </mesh>

        <mesh position={[0.85, 0, 0]}>
          <sphereGeometry args={[0.7, 64, 40]} />
          {/* TODO: material físico con sheen */}
          <meshStandardMaterial color="#4a5a78" roughness={0.6} />
        </mesh>
      </Canvas>
    </div>
  )
}`,
        solucion: `import { Canvas } from '@react-three/fiber'

export default function App() {
  return (
    <div style={{ height: 320 }}>
      <Canvas camera={{ position: [0, 0, 4] }} frameloop="always">
        <ambientLight intensity={0.3} />
        <directionalLight position={[3, 4, 2]} intensity={3} />

        <mesh position={[-0.85, 0, 0]}>
          <sphereGeometry args={[0.7, 64, 40]} />
          <meshPhysicalMaterial
            color="#d94f4f"
            roughness={0.4}
            clearcoat={1}
            clearcoatRoughness={0.05}
          />
        </mesh>

        <mesh position={[0.85, 0, 0]}>
          <sphereGeometry args={[0.7, 64, 40]} />
          <meshPhysicalMaterial
            color="#4a5a78"
            roughness={0.6}
            sheen={1}
            sheenColor="#ffc9a3"
            sheenRoughness={0.4}
          />
        </mesh>
      </Canvas>
    </div>
  )
}`,
        pistas: [
          'Cambia solo la etiqueta del material: `meshStandardMaterial` → `meshPhysicalMaterial`.',
          '`clearcoat` a 1 y `clearcoatRoughness` bajo dan un brillo de laca.',
          '`sheen` necesita `sheenColor`; con negro no se ve.',
        ],
      },
    },
    {
      id: '7.6',
      modulo: 7,
      titulo: 'Checkpoint: objeto con cinco mapas',
      objetivo:
        'Montar un material completo y verificado, comparándolo con el error típico de principiante.',
      nivel: 'medio',
      minutos: 60,
      bloques: [
        {
          tipo: 'parrafo',
          texto:
            'El checkpoint consiste en coger un objeto, aplicarle los mapas disponibles y dejar por escrito por qué cada uno está donde está. La demo compara dos versiones del mismo objeto con los mismos archivos: la de principiante acumula cuatro errores típicos; la correcta los corrige sin cambiar de texturas.',
        },
        { tipo: 'demo', id: 'm7-comparador', titulo: 'Los mismos archivos, dos resultados' },
        {
          tipo: 'pasos',
          items: [
            {
              titulo: '1. Empieza por el color',
              texto:
                'Carga el mapa de color, declara `SRGBColorSpace` y ajusta `repeat`. Si el color no es correcto, nada de lo demás importa.',
            },
            {
              titulo: '2. Añade la normal',
              texto:
                'Sin normal, la superficie es lisa. Declara `NoColorSpace` y ajusta `normalScale` entre 0,5 y 1,2.',
            },
            {
              titulo: '3. Añade la rugosidad',
              texto:
                'Conecta `roughnessMap` y deja `roughness={1}` para que el mapa module en todo su rango.',
            },
            {
              titulo: '4. Añade el emisivo si tiene sentido',
              texto:
                'Solo si el objeto emite luz de verdad. `emissive` blanco y `emissiveMap` en sRGB.',
            },
            {
              titulo: '5. Ilumina y compara',
              texto:
                'Con un HDRI o tres luces, compara con una versión «plana» para comprobar que cada mapa aporta algo visible.',
            },
          ],
        },
        {
          tipo: 'checkpoint',
          titulo: 'Antes de cerrar el módulo',
          items: [
            'El mapa de color está en `SRGBColorSpace`.',
            'Los mapas de datos están en `NoColorSpace`.',
            '`repeat` está ajustado a la escala real del objeto y usa `RepeatWrapping`.',
            'Hay `normalMap` y se nota en el borde iluminado.',
            '`roughnessMap` modula el brillo y no está anulado por un `roughness` bajo.',
            'Sé explicar por qué el AO no se puede usar en estos modelos.',
          ],
        },
        {
          tipo: 'destacado',
          tono: 'truco',
          titulo: 'La prueba de los cuatro interruptores',
          texto:
            'Desactiva los mapas uno a uno. Si al quitar uno no cambia nada, ese mapa no está aportando: o está mal declarado, o no hacía falta. Un material correcto pierde algo visible con cada interruptor, y ese algo es lo que justifica el archivo.',
        },
      ],
      errores: [
        {
          sintoma: 'El material se ve bien de cerca y plano de lejos.',
          causa: 'El `normalMap` pierde efecto por mipmaps o por resolución baja.',
          arreglo: 'Sube la resolución del mapa de normal y revisa la anisotropía.',
        },
        {
          sintoma: 'Todo el objeto brilla igual.',
          causa: 'El `roughnessMap` no está conectado o `roughness` está a 0,2.',
          arreglo: 'Conecta el mapa y pon `roughness={1}`.',
        },
        {
          sintoma: 'La textura se estira en una cara del objeto.',
          causa: 'Los UVs de esa cara no están bien desplegados.',
          arreglo: 'Corrige el desplegado en el modelo; `repeat` no arregla un UV estirado.',
        },
      ],
      quiz: [
        {
          tipo: 'unica',
          enunciado: '¿Cuál es el primer mapa que hay que dejar bien?',
          opciones: ['El de color', 'El de normales', 'El de rugosidad', 'El emisivo'],
          correcta: 0,
          explicacion: 'Si el color está mal declarado, todo lo demás se evalúa sobre una base falsa.',
        },
        {
          tipo: 'verdadero-falso',
          enunciado: 'Si al desactivar un mapa no cambia nada, probablemente sobra.',
          correcta: true,
          explicacion: 'Es la prueba más rápida de que un mapa aporta o no.',
        },
        {
          tipo: 'multiple',
          enunciado: '¿Qué hace falta revisar en un material completo?',
          opciones: [
            'El `colorSpace` de cada mapa',
            'El `repeat` y el `wrap`',
            'Que la normal se note',
            'Que todos los mapas pesen lo mismo',
          ],
          correctas: [0, 1, 2],
          explicacion: 'El peso de los archivos no es un criterio visual.',
        },
        {
          tipo: 'unica',
          enunciado: '¿Qué significa que un mapa «no aporta»?',
          opciones: [
            'Que no cambia el resultado al activarlo o desactivarlo',
            'Que pesa poco',
            'Que es de baja resolución',
            'Que está en blanco y negro',
          ],
          correcta: 0,
          explicacion: 'La prueba es visual: si no hay diferencia, no está haciendo trabajo.',
        },
      ],
      recursos: [
        {
          titulo: 'three.js: MeshStandardMaterial',
          url: 'https://threejs.org/docs/#api/en/materials/MeshStandardMaterial',
          nota: 'Repaso de todos los mapas y sus valores por defecto.',
        },
        {
          titulo: 'glTF 2.0: materials',
          url: 'https://registry.khronos.org/glTF/specs/2.0/glTF-2.0.html#materials',
          nota: 'La referencia de qué es cada mapa en el estándar.',
        },
        {
          titulo: 'three.js: Color management',
          url: 'https://threejs.org/docs/#manual/en/introduction/Color-management',
          nota: 'El repaso del espacio de color, que es el error más frecuente.',
        },
      ],
      ejercicio: {
        reto: 'Genera en canvas las cinco texturas equivalentes (color, normal, rugosidad, emisivo y una máscara de AO) y monta un material con todas. Comprueba con interruptores si cada una aporta algo.',
        inicial: `import { useMemo } from 'react'
import { Canvas } from '@react-three/fiber'
import * as THREE from 'three'

function lienzo(pintar: (ctx: CanvasRenderingContext2D) => void) {
  const c = document.createElement('canvas')
  c.width = 128
  c.height = 128
  pintar(c.getContext('2d')!)
  return c
}

export default function App() {
  const color = useMemo(
    () =>
      new THREE.CanvasTexture(
        lienzo((ctx) => {
          ctx.fillStyle = '#8a94a8'
          ctx.fillRect(0, 0, 128, 128)
          ctx.fillStyle = '#6a7488'
          for (let i = 0; i < 128; i += 16) ctx.fillRect(0, i, 128, 6)
        }),
      ),
    [],
  )

  color.colorSpace = THREE.SRGBColorSpace

  return (
    <div style={{ height: 320 }}>
      <Canvas camera={{ position: [0, 0, 3.4] }} frameloop="always">
        <ambientLight intensity={0.25} />
        <directionalLight position={[2, 3, 2]} intensity={3} />
        <mesh>
          <sphereGeometry args={[1, 64, 40]} />
          {/* TODO: añade normal, rugosidad y emisivo */}
          <meshStandardMaterial map={color} roughness={0.4} metalness={0.3} />
        </mesh>
      </Canvas>
    </div>
  )
}`,
        solucion: `import { useMemo } from 'react'
import { Canvas } from '@react-three/fiber'
import * as THREE from 'three'

function lienzo(pintar: (ctx: CanvasRenderingContext2D) => void) {
  const c = document.createElement('canvas')
  c.width = 128
  c.height = 128
  pintar(c.getContext('2d')!)
  return c
}

export default function App() {
  const texturas = useMemo(() => {
    const color = new THREE.CanvasTexture(
      lienzo((ctx) => {
        ctx.fillStyle = '#8a94a8'
        ctx.fillRect(0, 0, 128, 128)
        ctx.fillStyle = '#6a7488'
        for (let i = 0; i < 128; i += 16) ctx.fillRect(0, i, 128, 6)
      }),
    )
    color.colorSpace = THREE.SRGBColorSpace

    const normal = new THREE.CanvasTexture(
      lienzo((ctx) => {
        ctx.fillStyle = '#8080ff'
        ctx.fillRect(0, 0, 128, 128)
        for (let i = 0; i < 128; i += 16) {
          ctx.fillStyle = '#a0a0ff'
          ctx.fillRect(0, i, 128, 4)
          ctx.fillStyle = '#6060ff'
          ctx.fillRect(0, i + 8, 128, 4)
        }
      }),
    )
    normal.colorSpace = THREE.NoColorSpace

    const rugosidad = new THREE.CanvasTexture(
      lienzo((ctx) => {
        ctx.fillStyle = '#999999'
        ctx.fillRect(0, 0, 128, 128)
        ctx.fillStyle = '#333333'
        for (let i = 0; i < 128; i += 32) ctx.fillRect(0, i, 128, 12)
      }),
    )
    rugosidad.colorSpace = THREE.NoColorSpace

    const emisivo = new THREE.CanvasTexture(
      lienzo((ctx) => {
        ctx.fillStyle = '#000000'
        ctx.fillRect(0, 0, 128, 128)
        ctx.fillStyle = '#ff9a3c'
        ctx.beginPath()
        ctx.arc(64, 64, 22, 0, Math.PI * 2)
        ctx.fill()
      }),
    )
    emisivo.colorSpace = THREE.SRGBColorSpace

    return { color, normal, rugosidad, emisivo }
  }, [])

  return (
    <div style={{ height: 320 }}>
      <Canvas camera={{ position: [0, 0, 3.4] }} frameloop="always">
        <ambientLight intensity={0.25} />
        <directionalLight position={[2, 3, 2]} intensity={3} />
        <mesh>
          <sphereGeometry args={[1, 64, 40]} />
          <meshStandardMaterial
            map={texturas.color}
            normalMap={texturas.normal}
            roughnessMap={texturas.rugosidad}
            roughness={1}
            metalness={0.3}
            emissive="#ffffff"
            emissiveMap={texturas.emisivo}
            emissiveIntensity={1.2}
          />
        </mesh>
      </Canvas>
    </div>
  )
}`,
        pistas: [
          'Cada textura necesita su `colorSpace`: color y emisivo en sRGB, el resto lineal.',
          'La normal se ve mejor con `metalness` alto y `roughness` bajo.',
          'El emisivo necesita `emissive` blanco para que el mapa mande el color.',
        ],
      },
    },
  ],
}

import type { Modulo } from './tipos'

export const modulo12: Modulo = {
  numero: 12,
  titulo: 'Rendimiento',
  descripcion:
    'Medir antes de tocar, entender qué cuesta un frame y aplicar las cuatro palancas que de verdad mueven la aguja: menos draw calls, menos re-renders, menos píxeles y memoria liberada a tiempo.',
  lecciones: [
    {
      id: '12.1',
      modulo: 12,
      titulo: 'Anatomía de un frame',
      objetivo:
        'Saber qué se puede medir en una escena R3F, con qué cifras, y por qué el tiempo de GPU no está entre ellas.',
      nivel: 'alto',
      minutos: 55,
      bloques: [
        {
          tipo: 'parrafo',
          texto:
            'Un frame son 16,7 ms si quieres 60 por segundo. Ese presupuesto se reparte en cuatro tramos: el JavaScript que corre React y tus `useFrame`, la CPU que prepara cada objeto y envía llamadas de dibujado, la GPU que transforma vértices y, por último, la GPU que rellena píxeles. Optimizar sin saber en qué tramo se va el tiempo es adivinar. Y adivinar suele acabar en cambiar cosas que no importaban mientras la causa real sigue ahí.',
        },
        { tipo: 'demo', id: 'm12-metricas', titulo: 'La misma escena con tres costes separados' },
        {
          tipo: 'codigo',
          lenguaje: 'tsx',
          titulo: 'Medir sin provocar renders de React',
          codigo: `import { useFrame, useThree } from '@react-three/fiber'

function Medidor() {
  const gl = useThree((estado) => estado.gl)

  useFrame(() => {
    // gl.info se reinicia en cada render: esto es el frame anterior.
    const { calls, triangles } = gl.info.render
    const { geometries, textures } = gl.info.memory

    // Escritura directa en el DOM: cero renders de React.
    salida.current.textContent =
      calls + ' llamadas · ' + triangles + ' tri · ' + geometries + '/' + textures
  })

  return null
}`,
        },
        {
          tipo: 'tabla',
          cabecera: ['Dato', 'De dónde sale', 'Qué te dice', 'Cuidado'],
          filas: [
            ['fps', 'delta de `useFrame`', 'Si el frame cabe o no', 'Depende del monitor y de la pestaña'],
            ['draw calls', '`gl.info.render.calls`', 'Trabajo de CPU por objeto', 'No cuenta los pases de sombra como objetos'],
            ['triángulos', '`gl.info.render.triangles`', 'Trabajo de vértices', 'No mide lo caro que es el fragment'],
            ['geo/tex', '`gl.info.memory`', 'Recursos vivos en GPU', 'Solo sube al primer render de cada recurso'],
            ['tiempo de GPU', 'no disponible', 'El tramo que más duele', 'WebGL no lo expone sin extensiones'],
          ],
        },
        {
          tipo: 'destacado',
          tono: 'ojo',
          titulo: 'Lo que no se mide, se estima mal',
          texto:
            'El overdraw no aparece en ninguna de estas cifras: si apilas ocho capas transparentes del tamaño de la pantalla, el renderer sigue reportando los mismos objetos y los mismos triángulos mientras el fps se hunde. Cuando los números no explican lo que ves, la causa suele estar en píxeles sombreados o en trabajo de GPU, no en la geometría.',
        },
        {
          tipo: 'lista',
          items: [
            'Mide siempre en el mismo equipo y en la misma pestaña: compara dentro de la demo, no entre dispositivos.',
            'Un solo cambio por medición: si mueves tres cosas a la vez, no sabrás cuál movió la aguja.',
            'Empieza por los draw calls y por la resolución; el detalle de la geometría casi nunca es el problema.',
            'El panel de las DevTools que tengas abierto también cuesta frames: cierra lo que no uses.',
            'Publica los números con `textContent`, no con `setState`.',
          ],
        },
      ],
      errores: [
        {
          sintoma: 'El contador de fps marca 30 y el de draw calls es ridículo.',
          causa: 'La pestaña está en segundo plano o el monitor va a 30 Hz.',
          arreglo: 'Comprueba el refresco de la pantalla y mide con la ventana activa.',
        },
        {
          sintoma: 'Los triángulos bajan al girar la cámara pero los objetos no han cambiado.',
          causa: 'El frustum culling está descartando lo que queda fuera de plano.',
          arreglo: 'Es lo esperado: el culling es automático. Compruébalo apagando `frustumCulled`.',
        },
        {
          sintoma: 'Publicar las métricas con `setState` hunde el fps de la propia demo.',
          causa: 'Cada actualización re-renderiza el árbol de React entero.',
          arreglo: 'Escribe en el DOM desde `useFrame` y deja el estado para lo que cambia poco.',
        },
      ],
      quiz: [
        {
          tipo: 'unica',
          enunciado: '¿Cuánto dura un frame a 60 fps?',
          opciones: ['16,7 ms', '60 ms', '1 ms', '33,3 ms'],
          correcta: 0,
          explicacion: '1000 ms dividido entre 60 frames.',
        },
        {
          tipo: 'verdadero-falso',
          enunciado: '`gl.info.render.triangles` mide el coste del fragment shader.',
          correcta: false,
          explicacion: 'Mide vértices procesados; el relleno de píxeles es otra etapa.',
        },
        {
          tipo: 'multiple',
          enunciado: '¿Qué se puede leer de `gl.info`?',
          opciones: [
            'Draw calls',
            'Triángulos',
            'Geometrías y texturas en memoria',
            'El tiempo exacto de GPU',
          ],
          correctas: [0, 1, 2],
          explicacion: 'El tiempo de GPU no está expuesto en WebGL estándar.',
        },
        {
          tipo: 'unica',
          enunciado: '¿Por qué el overdraw no aparece en las métricas?',
          opciones: [
            'Porque es trabajo de píxeles, no de objetos',
            'Porque three lo oculta',
            'Porque solo pasa en móvil',
            'Porque no existe',
          ],
          correcta: 0,
          explicacion: 'Los contadores cuentan objetos y vértices, no píxeles sombreados.',
        },
      ],
      recursos: [
        {
          titulo: 'three: WebGLRenderer.info',
          url: 'https://threejs.org/docs/#api/en/renderers/WebGLRenderer.info',
          nota: 'Qué contiene exactamente el objeto con las cifras.',
        },
        {
          titulo: 'R3F: useFrame',
          url: 'https://r3f.docs.pmnd.rs/api/hooks#useframe',
          nota: 'El bucle donde se mide y donde se anima.',
        },
        {
          titulo: 'Chrome DevTools: rendering',
          url: 'https://developer.chrome.com/docs/devtools/rendering/',
          nota: 'Paint flashing y FPS meter: las dos herramientas que el panel no sustituye.',
        },
      ],
      ejercicio: {
        reto: 'Calcula la holgura de un frame: recibe los milisegundos que ha costado y devuelve cuántos sobran (o faltan, en negativo) respecto a 16,67 ms, redondeado a dos decimales.',
        inicial: `export function holgura(ms: number): number {
  // TODO: 16,67 menos lo medido.
  return 0
}

console.log(holgura(12.4), holgura(21))`,
        solucion: `export function holgura(ms: number): number {
  return Number((16.67 - ms).toFixed(2))
}

console.log(holgura(12.4), holgura(21))`,
        pistas: [
          'La resta es 16,67 − ms: positiva significa que sobra tiempo.',
          'Redondea solo el resultado.',
          'Si sale negativa, el frame no cabe a 60 fps.',
        ],
      },
    },
    {
      id: '12.2',
      modulo: 12,
      titulo: 'Re-renders',
      objetivo:
        'Distinguir el render de React del dibujado de la escena, y eliminar los renders que no cambian nada.',
      nivel: 'alto',
      minutos: 60,
      bloques: [
        {
          tipo: 'parrafo',
          texto:
            'React y la escena corren a relojes distintos. React renderiza cuando cambia el estado: reconcilia el árbol, compara props y, si algo difiere, escribe en los objetos de three. La escena se dibuja 60 veces por segundo pase lo que pase. Un `setState` no dibuja nada; lo que hace es reconstruir el árbol de componentes, y eso cuesta. La pregunta útil no es «cuántos frames voy», sino «cuántas veces se ha ejecutado este componente sin que nada de lo que pinta haya cambiado».',
        },
        { tipo: 'demo', id: 'm12-renders', titulo: 'Dos cajas que giran igual, con cuentas distintas' },
        {
          tipo: 'codigo',
          lenguaje: 'tsx',
          titulo: 'Animar sin re-renderizar',
          codigo: `// Mal: un render de React por frame.
useEffect(() => {
  const id = setInterval(() => setGiro((g) => g + 0.02), 16)
  return () => clearInterval(id)
}, [])

// Bien: la rotación se escribe en el objeto, no en el estado.
const malla = useRef<Mesh>(null)

useFrame((_, delta) => {
  if (malla.current) malla.current.rotation.y += delta
})

// Y para lo que sí es estado, aísla el consumidor:
const Panel = memo(function Panel({ valor }: { valor: number }) {
  return <p>{valor}</p>
})`,
        },
        {
          tipo: 'destacado',
          tono: 'porque',
          titulo: 'Por qué `useFrame` es más barato que un estado',
          texto:
            'Cambiar estado dispara reconciliación: React vuelve a ejecutar el componente, compara el árbol y decide qué propiedades de three actualizar. Escribir `ref.current.rotation.y` es una asignación a un número. En un frame a 60 Hz, la diferencia entre las dos es la diferencia entre 60 renders por segundo y cero.',
        },
        {
          tipo: 'lista',
          items: [
            'Estado para lo que el usuario ve y cambia: selección, modo, valores de un formulario.',
            '`ref` y `useFrame` para lo que se anima cada frame.',
            '`memo` en componentes hijos con props estables; sin props cambiantes no se re-renderizan.',
            '`useMemo` para geometrías, materiales y arrays que se recrearían en cada render.',
            'Coloca el estado lo más cerca posible de quien lo consume: arriba del todo, todo se re-renderiza.',
          ],
        },
      ],
      errores: [
        {
          sintoma: 'La escena va a tirones cuando se mueve un deslizador.',
          causa: 'El valor del deslizador vive en el padre y re-renderiza medio árbol por cada píxel.',
          arreglo: 'Aísla el control en un componente propio o pasa el valor por `ref` al `useFrame`.',
        },
        {
          sintoma: '`memo` no evita los renders.',
          causa: 'Se le pasa una prop nueva en cada render (un objeto, un array o una función inline).',
          arreglo: 'Memoriza esa prop o sácala fuera del componente.',
        },
        {
          sintoma: 'La geometría se recrea cada vez que cambia cualquier cosa.',
          causa: 'Se instancia con `new` en el cuerpo del componente.',
          arreglo: 'Envuélvela en `useMemo` con sus dependencias reales.',
        },
      ],
      quiz: [
        {
          tipo: 'unica',
          enunciado: '¿Cuántas veces se dibuja la escena por segundo si React no re-renderiza nunca?',
          opciones: ['Sesenta, el bucle sigue', 'Cero', 'Una', 'Depende del estado'],
          correcta: 0,
          explicacion: 'El dibujado lo dispara R3F en cada frame, no React.',
        },
        {
          tipo: 'verdadero-falso',
          enunciado: 'Cambiar un `ref` provoca un render de React.',
          correcta: false,
          explicacion: 'Un ref es una caja mutable: escribir dentro no avisa a React.',
        },
        {
          tipo: 'multiple',
          enunciado: '¿Qué evita renders innecesarios?',
          opciones: [
            '`memo` con props estables',
            'Animar con `useFrame`',
            '`useMemo` para objetos creados en el render',
            'Llamar a `setState` en cada frame',
          ],
          correctas: [0, 1, 2],
          explicacion: '`setState` por frame es justo lo que hay que evitar.',
        },
        {
          tipo: 'unica',
          enunciado: '¿Cuándo un `memo` deja de servir?',
          opciones: [
            'Cuando recibe props nuevas en cada render',
            'Cuando el componente no tiene props',
            'Cuando usa `useFrame`',
            'Cuando devuelve `null`',
          ],
          correcta: 0,
          explicacion: 'La comparación superficial falla si la prop cambia de identidad.',
        },
      ],
      recursos: [
        {
          titulo: 'React: memo',
          url: 'https://react.dev/reference/react/memo',
          nota: 'Cuándo ayuda de verdad y cuándo es ruido.',
        },
        {
          titulo: 'R3F: scaling performance',
          url: 'https://r3f.docs.pmnd.rs/advanced/scaling-performance',
          nota: 'La guía oficial de rendimiento de React Three Fiber.',
        },
        {
          titulo: 'React: useMemo',
          url: 'https://react.dev/reference/react/useMemo',
          nota: 'Para objetos caros que no deben recrearse.',
        },
      ],
      ejercicio: {
        reto: 'Cuenta los renders de un árbol: recibe cuántas veces cambia el padre, cuántos hijos tiene y si están memorizados, y devuelve el total de ejecuciones de componentes.',
        inicial: `export function renders(cambios: number, hijos: number, memo: boolean): number {
  // TODO: el padre siempre; los hijos solo si no hay memo.
  return 0
}

console.log(renders(10, 3, false), renders(10, 3, true))`,
        solucion: `export function renders(cambios: number, hijos: number, memo: boolean): number {
  const porCambio = memo ? 1 : 1 + hijos
  return cambios * porCambio
}

console.log(renders(10, 3, false), renders(10, 3, true))`,
        pistas: [
          'Cada cambio ejecuta el padre una vez.',
          'Sin `memo`, cada hijo se ejecuta también una vez por cambio.',
          'Multiplica el coste de un cambio por el número de cambios.',
        ],
      },
    },
    {
      id: '12.3',
      modulo: 12,
      titulo: 'Instancing',
      objetivo:
        'Reducir miles de objetos a un puñado de llamadas de dibujado con `InstancedMesh` y `BatchedMesh`.',
      nivel: 'alto',
      minutos: 60,
      bloques: [
        {
          tipo: 'parrafo',
          texto:
            'Cada malla de la escena es una llamada de dibujado: la CPU prepara el estado, enlaza buffers y le dice a la GPU «dibuja esto». Con cien objetos no se nota; con diez mil, la CPU se pasa el frame entero preparando llamadas y no le queda tiempo para nada más. `InstancedMesh` guarda todas las copias de una geometría en un solo búfer y las dibuja de golpe. `BatchedMesh` hace lo mismo pero admite varias geometrías distintas en la misma llamada.',
        },
        { tipo: 'demo', id: 'm12-instancing', titulo: '250, 1 000, 4 000 y 10 000 objetos, tres estrategias' },
        {
          tipo: 'codigo',
          lenguaje: 'ts',
          titulo: 'Las dos APIs, sin misterio',
          codigo: `// 1. Una geometría, muchas copias.
const malla = new InstancedMesh(geometria, material, cantidad)
const matriz = new Matrix4()

for (let i = 0; i < cantidad; i += 1) {
  matriz.compose(posicion, quaternion, escala)
  malla.setMatrixAt(i, matriz)
}

malla.instanceMatrix.needsUpdate = true
escena.add(malla)

// 2. Varias geometrías, una sola llamada.
const lote = new BatchedMesh(cantidad, maxVertices, maxIndices, material)
const ids = geometrias.map((geometria) => lote.addGeometry(geometria))

for (let i = 0; i < cantidad; i += 1) {
  const instancia = lote.addInstance(ids[i % ids.length])
  lote.setMatrixAt(instancia, matriz)
}

escena.add(lote)`,
        },
        {
          tipo: 'tabla',
          cabecera: ['Estrategia', 'Draw calls', 'Geometrías distintas', 'Cuándo'],
          filas: [
            ['Mallas sueltas', 'Una por objeto', 'Todas', 'Pocos objetos o cada uno único'],
            ['`InstancedMesh`', 'Una por geometría', 'No (una sola)', 'Multitudes iguales: árboles, balas, partículas'],
            ['`BatchedMesh`', 'Una en total', 'Sí', 'Multitudes variadas: rocas, muebles, escombros'],
          ],
        },
        {
          tipo: 'destacado',
          tono: 'ojo',
          titulo: 'Instanciar no ahorra memoria',
          texto:
            'Los vértices siguen en la GPU y las matrices de cada instancia ocupan su sitio. Lo que se ahorra es trabajo de CPU: preparar el estado y enviar la llamada. Si el cuello de botella es el relleno de píxeles o la resolución, instanciar no arregla nada. Es una optimización de CPU, y conviene saber qué está sufriendo antes de aplicarla.',
        },
        {
          tipo: 'lista',
          items: [
            'Usa instancing cuando el mismo objeto se repite decenas o cientos de veces.',
            'Cada instancia necesita su matriz: `setMatrixAt` y `needsUpdate = true`.',
            'Cambiar el color por instancia se hace con `setColorAt`, no con un material por objeto.',
            'Las instancias no se pueden animar con `useFrame` por objeto: se mueve la matriz.',
            'En R3F, `<instancedMesh args={[geometria, material, cantidad]} />` es la vía corta.',
          ],
        },
      ],
      errores: [
        {
          sintoma: 'Las instancias aparecen todas en el mismo sitio.',
          causa: 'No se escribió ninguna matriz o falta `instanceMatrix.needsUpdate`.',
          arreglo: 'Recorre las instancias con `setMatrixAt` y marca el búfer como sucio.',
        },
        {
          sintoma: '`BatchedMesh` lanza «Reserved space request exceeds the maximum buffer size».',
          causa: 'El presupuesto de vértices o de índices es menor que la suma de las geometrías.',
          arreglo: 'Suma los vértices e índices de todas las geometrías antes de construir el lote.',
        },
        {
          sintoma: 'Al cambiar la cantidad de objetos, la escena parpadea o se queda a medias.',
          causa: 'El búfer de instancias se dimensiona al construirse y no crece.',
          arreglo: 'Reconstruye el `InstancedMesh` cuando cambie el número máximo.',
        },
      ],
      quiz: [
        {
          tipo: 'unica',
          enunciado: '¿Qué ahorra `InstancedMesh`?',
          opciones: [
            'Llamadas de dibujado',
            'Vértices en GPU',
            'Texturas',
            'Píxeles sombreados',
          ],
          correcta: 0,
          explicacion: 'Los vértices siguen ahí; se reduce el trabajo de CPU.',
        },
        {
          tipo: 'verdadero-falso',
          enunciado: '`BatchedMesh` admite varias geometrías distintas en una sola llamada.',
          correcta: true,
          explicacion: 'Es su diferencia principal frente a `InstancedMesh`.',
        },
        {
          tipo: 'multiple',
          enunciado: '¿Qué hay que hacer al usar instancing?',
          opciones: [
            'Escribir una matriz por instancia',
            'Marcar `instanceMatrix.needsUpdate`',
            'Dimensionar el búfer al máximo previsto',
            'Crear un material por instancia',
          ],
          correctas: [0, 1, 2],
          explicacion: 'El material es único y compartido.',
        },
        {
          tipo: 'unica',
          enunciado: '¿Cuándo NO conviene instanciar?',
          opciones: [
            'Cuando el límite es el relleno de píxeles',
            'Cuando hay miles de objetos iguales',
            'Cuando hay pocas geometrías',
            'Cuando los objetos comparten material',
          ],
          correcta: 0,
          explicacion: 'Ese coste no depende del número de llamadas.',
        },
      ],
      recursos: [
        {
          titulo: 'three: InstancedMesh',
          url: 'https://threejs.org/docs/#api/en/objects/InstancedMesh',
          nota: 'Matrices, colores por instancia y límites.',
        },
        {
          titulo: 'three: BatchedMesh',
          url: 'https://threejs.org/docs/#api/en/objects/BatchedMesh',
          nota: 'Presupuesto de vértices e índices, y cuándo usarlo.',
        },
        {
          titulo: 'Ejemplo oficial de instancing',
          url: 'https://threejs.org/examples/?q=instancing',
          nota: 'Comparación directa con mallas sueltas.',
        },
      ],
      ejercicio: {
        reto: 'Calcula cuántas llamadas de dibujado hace una escena: recibe el total de objetos, el número de geometrías distintas y la estrategia, y devuelve el número de draw calls.',
        inicial: `type Estrategia = 'mallas' | 'instanciado' | 'batched'

export function llamadas(total: number, geometrias: number, estrategia: Estrategia): number {
  // TODO: mallas = una por objeto; instanciado = una por geometría; batched = 1.
  return 0
}

console.log(llamadas(10000, 4, 'mallas'), llamadas(10000, 4, 'instanciado'))`,
        solucion: `type Estrategia = 'mallas' | 'instanciado' | 'batched'

export function llamadas(total: number, geometrias: number, estrategia: Estrategia): number {
  if (total === 0) return 0
  if (estrategia === 'mallas') return total
  if (estrategia === 'instanciado') return geometrias
  return 1
}

console.log(llamadas(10000, 4, 'mallas'), llamadas(10000, 4, 'instanciado'))`,
        pistas: [
          'Con cero objetos no se dibuja nada.',
          'En modo instanciado hay una llamada por geometría distinta.',
          'El lote agrupado siempre es una sola llamada.',
        ],
      },
    },
    {
      id: '12.4',
      modulo: 12,
      titulo: 'LOD y culling',
      objetivo:
        'Elegir qué se dibuja según la distancia y la posición, y distinguir el culling automático del que hay que programar.',
      nivel: 'alto',
      minutos: 50,
      bloques: [
        {
          tipo: 'parrafo',
          texto:
            'El frustum culling ya viene puesto: three descarta lo que queda fuera de la cámara comparando la esfera envolvente de cada objeto con el volumen de visión. No hay que programarlo, solo no estorbarlo. El nivel de detalle es otra cosa: el objeto está en pantalla, pero a treinta metros ocupa diez píxeles, así que no necesita la misma geometría que a dos metros. `LOD` de three y `Detailed` de drei hacen ese cambio por distancia.',
        },
        { tipo: 'demo', id: 'm12-lod', titulo: 'Bosque con LOD y culling conmutables' },
        {
          tipo: 'codigo',
          lenguaje: 'tsx',
          titulo: 'Tres niveles y un descarte',
          codigo: `import { Detailed } from '@react-three/drei'

<Detailed distances={[0, 15, 30]} position={[x, 1, z]}>
  <mesh material={material}>
    <coneGeometry args={[0.66, 2, 12]} />
  </mesh>
  <mesh material={material}>
    <coneGeometry args={[0.66, 2, 6]} />
  </mesh>
  <mesh material={material}>
    <coneGeometry args={[0.66, 2, 3]} />
  </mesh>
</Detailed>

// El culling por frustum es una propiedad, no un componente:
<mesh frustumCulled={false}>…</mesh>   // solo para depurar`,
        },
        {
          tipo: 'tabla',
          cabecera: ['Técnica', 'Decide', 'Coste', 'Cuándo usarla'],
          filas: [
            ['Frustum culling', 'Si está en pantalla', 'Automático', 'Siempre'],
            ['LOD', 'Cuánta geometría', 'Comparación por distancia', 'Objetos repetidos a varias distancias'],
            ['Culling por distancia', 'Si se dibuja', 'Una comprobación tuya', 'Multitudes enormes'],
            ['Oclusión', 'Si algo tapa al objeto', 'Consulta a la GPU', 'Escenas urbanas densas'],
          ],
        },
        {
          tipo: 'destacado',
          tono: 'truco',
          titulo: 'El LOD se mide en píxeles, no en metros',
          texto:
            'Las distancias de `Detailed` son metros del mundo, pero lo que importa es el tamaño en pantalla. Un árbol a treinta metros en un móvil ocupa menos píxeles que el mismo árbol a treinta metros en un monitor 4K. Si tu proyecto se va a ver en pantallas muy distintas, ajusta los umbrales por `camera.aspect` o por tamaño de la ventana, o acepta que el LOD es una aproximación.',
        },
        {
          tipo: 'lista',
          items: [
            'No desactives el culling sin motivo: es gratis y funciona.',
            'El LOD cambia triángulos, no draw calls: son dos presupuestos distintos.',
            'Cada nivel extra es un objeto más en el árbol, aunque no se dibuje.',
            'Un LOD mal calibrado se nota como un salto visible al acercarse.',
            'Los objetos transparentes y los que proyectan sombras merecen más cuidado.',
          ],
        },
      ],
      errores: [
        {
          sintoma: 'El bosque entero se dibuja siempre, gires como gires.',
          causa: 'Alguna malla tiene `frustumCulled={false}`.',
          arreglo: 'Quita esa propiedad de las mallas que no estés depurando.',
        },
        {
          sintoma: '`Detailed` no cambia de nivel nunca.',
          causa: 'Las distancias están en el orden equivocado o la cámara no se mueve.',
          arreglo: 'El primer hijo es el nivel cercano; las distancias van de menor a mayor.',
        },
        {
          sintoma: 'Los árboles lejanos aparecen y desaparecen de golpe.',
          causa: 'Histéresis desactivada o umbrales demasiado juntos.',
          arreglo: 'Usa `hysteresis` o separa más las distancias.',
        },
      ],
      quiz: [
        {
          tipo: 'unica',
          enunciado: '¿Qué hace el frustum culling?',
          opciones: [
            'Descartar lo que queda fuera de la cámara',
            'Reducir los segmentos de la geometría',
            'Comprimir texturas',
            'Unir draw calls',
          ],
          correcta: 0,
          explicacion: 'Compara la esfera envolvente con el volumen de visión.',
        },
        {
          tipo: 'verdadero-falso',
          enunciado: 'El LOD reduce el número de draw calls.',
          correcta: false,
          explicacion: 'Cambia la geometría que se dibuja, no cuántas llamadas hay.',
        },
        {
          tipo: 'multiple',
          enunciado: '¿Qué técnicas deciden no dibujar algo?',
          opciones: ['Frustum culling', 'Culling por distancia', 'Oclusión', 'LOD'],
          correctas: [0, 1, 2],
          explicacion: 'El LOD sigue dibujando el objeto, con menos detalle.',
        },
        {
          tipo: 'unica',
          enunciado: '¿Cuál es el primer hijo de un `LOD`?',
          opciones: [
            'El nivel de más detalle, el más cercano',
            'El más lejano',
            'El que menos pesa',
            'Da igual el orden',
          ],
          correcta: 0,
          explicacion: 'Las distancias se evalúan de menor a mayor.',
        },
      ],
      recursos: [
        {
          titulo: 'three: LOD',
          url: 'https://threejs.org/docs/#api/en/objects/LOD',
          nota: 'La implementación que envuelve `Detailed`.',
        },
        {
          titulo: 'drei: Detailed',
          url: 'https://drei.pmnd.rs/?path=/docs/abstractions-detailed--docs',
          nota: 'Props y ejemplo de uso con JSX.',
        },
        {
          titulo: 'three: frustum culling',
          url: 'https://threejs.org/docs/#api/en/core/Object3D.frustumCulled',
          nota: 'Qué significa exactamente la propiedad y cuándo desactivarla.',
        },
      ],
      ejercicio: {
        reto: 'Elige el nivel de detalle: recibe un array de distancias ordenado y la distancia actual, y devuelve el índice del nivel que toca.',
        inicial: `export function nivel(distancias: number[], distancia: number): number {
  // TODO: el último umbral que no supere la distancia.
  return 0
}

console.log(nivel([0, 15, 30], 22), nivel([0, 15, 30], 4))`,
        solucion: `export function nivel(distancias: number[], distancia: number): number {
  let elegido = 0
  for (let i = 0; i < distancias.length; i += 1) {
    if (distancia >= distancias[i]) elegido = i
  }
  return elegido
}

console.log(nivel([0, 15, 30], 22), nivel([0, 15, 30], 4))`,
        pistas: [
          'Recorre los umbrales y quédate con el último que se cumpla.',
          'Con distancia 22 y umbrales 0, 15 y 30, toca el índice 1.',
          'No hace falta ordenar: el array ya viene ordenado.',
        ],
      },
    },
    {
      id: '12.5',
      modulo: 12,
      titulo: 'Presupuesto móvil',
      objetivo:
        'Fijar un presupuesto por dispositivo y degradar en el orden correcto hasta cumplirlo.',
      nivel: 'alto',
      minutos: 55,
      bloques: [
        {
          tipo: 'parrafo',
          texto:
            'El mismo proyecto que va sobrado en un portátil puede ir a 22 fps en un móvil de gama media, y no por la escena: por los píxeles. Una pantalla de móvil tiene más densidad que la mayoría de los monitores, y el `dpr` por defecto de R3F llega a 2. Eso son cuatro veces los píxeles de un `dpr` de 1. Antes de tocar la escena, toca la resolución, luego las sombras y, al final, el postprocesado. En ese orden, porque es el orden en que cada palanca devuelve más fps por unidad de esfuerzo.',
        },
        { tipo: 'demo', id: 'm12-movil', titulo: 'Degradar dpr, sombras y postprocesado en vivo' },
        {
          tipo: 'codigo',
          lenguaje: 'tsx',
          titulo: 'Degradar desde React',
          codigo: `function Resolucion({ dpr }: { dpr: number }) {
  const setDpr = useThree((estado) => estado.setDpr)

  useEffect(() => {
    setDpr(dpr)
  }, [dpr, setDpr])

  return null
}

// El postprocesado se enciende o se apaga, no se deja a medias.
{post ? (
  <EffectComposer key="con-post" multisampling={0}>
    <Bloom intensity={0.9} luminanceThreshold={0.4} mipmapBlur />
  </EffectComposer>
) : null}

// El renderer también sirve como fuente de verdad:
const dpr = Math.min(window.devicePixelRatio, 2)`,
        },
        {
          tipo: 'tabla',
          cabecera: ['Palanca', 'Qué quita', 'Fps que devuelve', 'Coste visual'],
          filas: [
            ['`dpr` a 1 o 0,75', 'Píxeles', 'El mayor', 'Bordes menos finos'],
            ['Sombras', 'Una pasada por luz', 'Alto', 'Pérdida de profundidad'],
            ['Postprocesado', 'Pases de pantalla completa', 'Medio-alto', 'Menos brillo y ambiente'],
            ['Menos objetos', 'Draw calls', 'Depende', 'Menos mundo'],
            ['Texturas más pequeñas', 'Memoria y ancho de banda', 'Bajo en escritorio', 'Detalle de cerca'],
          ],
        },
        {
          tipo: 'destacado',
          tono: 'ojo',
          titulo: 'El emulador de móvil miente',
          texto:
            'Redimensionar la ventana cambia el tamaño del lienzo, pero no la GPU. Un iPhone de verdad tiene menos memoria, menos ancho de banda y un límite térmico que aparece a los dos minutos. La única medición que vale es en el dispositivo, con la escena real y durante varios minutos seguidos. Si solo puedes probar en escritorio, mide con `dpr` alto y resolución alta: al menos verás la tendencia.',
        },
        {
          tipo: 'lista',
          items: [
            'Fija el presupuesto antes de modelar: 60 fps en escritorio, 30 estables en móvil.',
            'Degrada por pasos y comprueba el resultado de cada uno.',
            'Guarda el modo elegido: repetir la detección en cada visita gasta batería.',
            'Un móvil caliente baja de vueltas: deja margen sobre el objetivo.',
            'Si el usuario pidió movimiento reducido, casi siempre quiere menos efectos, no más.',
          ],
        },
      ],
      errores: [
        {
          sintoma: 'El lienzo se ve borroso en un monitor de alta densidad.',
          causa: 'El `dpr` se ha limitado a 1 para todos.',
          arreglo: 'Limita por dispositivo: `Math.min(devicePixelRatio, 2)` y baja solo en móvil.',
        },
        {
          sintoma: 'Al desactivar el postprocesado la pantalla se queda en negro un instante.',
          causa: 'El composer se reconstruye sin `key` y reutiliza pases con otra estructura.',
          arreglo: 'Cambia la `key` al alternar entre encendido y apagado.',
        },
        {
          sintoma: 'Las sombras desaparecen y no vuelven.',
          causa: 'Se desactivó `shadowMap` del renderer en lugar de la luz.',
          arreglo: 'Alterna `castShadow` en la luz; el renderer se configura al crear el canvas.',
        },
      ],
      quiz: [
        {
          tipo: 'unica',
          enunciado: '¿Qué palanca devuelve más fps en móvil?',
          opciones: ['Bajar el `dpr`', 'Quitar una luz', 'Reducir texturas', 'Unir materiales'],
          correcta: 0,
          explicacion: 'Los píxeles son el coste dominante en pantallas pequeñas y densas.',
        },
        {
          tipo: 'verdadero-falso',
          enunciado: 'El emulador de móvil del navegador mide el rendimiento real del dispositivo.',
          correcta: false,
          explicacion: 'Cambia el tamaño, no la GPU ni el límite térmico.',
        },
        {
          tipo: 'multiple',
          enunciado: '¿En qué orden conviene degradar?',
          opciones: [
            'Resolución',
            'Sombras',
            'Postprocesado',
            'Número de objetos de la escena',
          ],
          correctas: [0, 1, 2],
          explicacion: 'El contenido es lo último que se toca: es lo que da sentido a la escena.',
        },
        {
          tipo: 'unica',
          enunciado: '¿Qué hace `setDpr`?',
          opciones: [
            'Cambia la densidad de píxeles del renderer',
            'Cambia el tamaño del canvas en CSS',
            'Recarga la escena',
            'Reinicia el bucle de render',
          ],
          correcta: 0,
          explicacion: 'El tamaño del lienzo en CSS es otra cosa.',
        },
      ],
      recursos: [
        {
          titulo: 'R3F: Canvas y `dpr`',
          url: 'https://r3f.docs.pmnd.rs/api/canvas',
          nota: 'Cómo se elige la densidad de píxeles y cómo cambiarla en caliente.',
        },
        {
          titulo: 'web.dev: rendimiento en móvil',
          url: 'https://web.dev/articles/optimizing-content-efficiency',
          nota: 'Contexto general del presupuesto en dispositivos móviles.',
        },
        {
          titulo: 'three: WebGLRenderer.setPixelRatio',
          url: 'https://threejs.org/docs/#api/en/renderers/WebGLRenderer.setPixelRatio',
          nota: 'La llamada que hay detrás de `setDpr`.',
        },
      ],
      ejercicio: {
        reto: 'Calcula los píxeles que dibuja el renderer: recibe ancho y alto en CSS y el `dpr`, y devuelve el total redondeado a miles.',
        inicial: `export function pixeles(ancho: number, alto: number, dpr: number): number {
  // TODO: el área crece con el cuadrado del dpr.
  return 0
}

console.log(pixeles(390, 844, 1), pixeles(390, 844, 3))`,
        solucion: `export function pixeles(ancho: number, alto: number, dpr: number): number {
  const total = ancho * dpr * alto * dpr
  return Math.round(total / 1000) * 1000
}

console.log(pixeles(390, 844, 1), pixeles(390, 844, 3))`,
        pistas: [
          'Multiplica ancho y alto por el dpr cada uno.',
          'Pasar de dpr 1 a 3 multiplica los píxeles por nueve.',
          'Redondea a miles para que la cifra se lea.',
        ],
      },
    },
    {
      id: '12.6',
      modulo: 12,
      titulo: 'Memoria y `dispose`',
      objetivo:
        'Liberar geometrías, materiales y texturas propias, y leer en `gl.info.memory` si de verdad se han liberado.',
      nivel: 'alto',
      minutos: 55,
      bloques: [
        {
          tipo: 'parrafo',
          texto:
            'La memoria de la GPU no la recoge el recolector de basura. Cuando una malla desaparece de la escena, JavaScript puede olvidarse de ella, pero el búfer de vértices y la textura siguen ocupando sitio hasta que alguien llama a `dispose()`. R3F libera lo que ha creado él a partir del JSX: si escribes `<boxGeometry />`, se limpia al desmontar. Si escribes `new BoxGeometry()` dentro de un `useMemo`, esa geometría es tuya y también es tu responsabilidad.',
        },
        { tipo: 'demo', id: 'm12-memoria', titulo: 'Crear y destruir con y sin liberación' },
        {
          tipo: 'codigo',
          lenguaje: 'tsx',
          titulo: 'Crear a mano, liberar a mano',
          codigo: `const recursos = useMemo(() => {
  const geometria = new BoxGeometry(0.5, 0.5, 0.5)
  const textura = new DataTexture(datos, 1, 1)
  const material = new MeshStandardMaterial({ map: textura })
  return { geometria, textura, material }
}, [])

useEffect(() => {
  return () => {
    recursos.geometria.dispose()
    recursos.material.dispose()
    recursos.textura.dispose()
  }
}, [recursos])

// El contador que importa:
gl.info.memory.geometries
gl.info.memory.textures`,
        },
        {
          tipo: 'tabla',
          cabecera: ['Recurso', 'Tiene `dispose`', 'Lo libera R3F', 'Nota'],
          filas: [
            ['Geometría', 'Sí', 'Solo si la creó él', 'Cada `new` es tuya'],
            ['Material', 'Sí', 'Solo si lo creó él', 'No libera sus texturas'],
            ['Textura', 'Sí', 'Solo si la creó él', 'Compartida entre materiales'],
            ['Render target', 'Sí', 'No', '`useFBO` lo gestiona; a mano, tú'],
            ['Escena clonada', 'No', 'No', 'Comparte geometrías y materiales con el original'],
          ],
        },
        {
          tipo: 'destacado',
          tono: 'porque',
          titulo: 'Una fuga no se nota hasta que se nota',
          texto:
            'Cuarenta recursos huidos son irrelevantes. El problema aparece cuando una vista se abre y se cierra cien veces en una sesión larga: cada visita deja su rastro y llega un momento en que el contexto WebGL se queda sin memoria y el navegador mata el lienzo. La comprobación es barata: abre y cierra la vista veinte veces y mira `gl.info.memory`. Si sube y no baja, hay una fuga.',
        },
        {
          tipo: 'lista',
          items: [
            'Todo lo que creas con `new` lo liberas tú, en el `return` de un `useEffect`.',
            'Libera también las texturas: `material.dispose()` no las toca.',
            'No liberes recursos compartidos: si dos mallas usan la misma geometría, se libera una vez.',
            '`gl.info.memory` cuenta lo subido a GPU; es la cifra que se acerca a la realidad.',
            'Antes de añadir cachés, comprueba que no estás guardando copias que nadie libera.',
          ],
        },
      ],
      errores: [
        {
          sintoma: 'El contador de geometrías sube y no baja nunca.',
          causa: 'Se crean recursos con `new` y no se llama a `dispose`.',
          arreglo: 'Devuelve una función de limpieza que libere geometría, material y textura.',
        },
        {
          sintoma: 'Al cambiar de vista, la GPU se queda sin memoria y el lienzo se pierde.',
          causa: 'Fuga acumulada de texturas o render targets.',
          arreglo: 'Libera en el desmontaje y comprueba con el contador tras abrir y cerrar varias veces.',
        },
        {
          sintoma: 'Al liberar, otra parte de la escena se queda en negro.',
          causa: 'Se liberó un recurso compartido que otra malla seguía usando.',
          arreglo: 'Libera solo recursos propios o usa un contador de referencias.',
        },
      ],
      quiz: [
        {
          tipo: 'unica',
          enunciado: '¿Quién libera una geometría creada con `new` dentro de un componente?',
          opciones: ['Tú, con `dispose`', 'El recolector de basura', 'R3F automáticamente', 'El navegador'],
          correcta: 0,
          explicacion: 'La memoria de GPU no la gestiona el GC.',
        },
        {
          tipo: 'verdadero-falso',
          enunciado: '`material.dispose()` libera también sus texturas.',
          correcta: false,
          explicacion: 'Las texturas pueden compartirse; hay que liberarlas aparte.',
        },
        {
          tipo: 'multiple',
          enunciado: '¿Qué recursos hay que liberar a mano?',
          opciones: [
            'Geometrías creadas con `new`',
            'Materiales creados con `new`',
            'Texturas creadas con `new`',
            'Los que crea R3F desde JSX',
          ],
          correctas: [0, 1, 2],
          explicacion: 'R3F ya se encarga de los que ha creado él.',
        },
        {
          tipo: 'unica',
          enunciado: '¿Qué mide `gl.info.memory.geometries`?',
          opciones: [
            'Geometrías subidas a la GPU',
            'Geometrías en el estado de React',
            'Triángulos dibujados',
            'Materiales compilados',
          ],
          correcta: 0,
          explicacion: 'Es memoria del renderer, no del árbol de React.',
        },
      ],
      recursos: [
        {
          titulo: 'three: BufferGeometry.dispose',
          url: 'https://threejs.org/docs/#api/en/core/BufferGeometry.dispose',
          nota: 'Qué libera exactamente y cuándo llamarlo.',
        },
        {
          titulo: 'three: Material.dispose',
          url: 'https://threejs.org/docs/#api/en/materials/Material.dispose',
          nota: 'Advertencia sobre texturas compartidas.',
        },
        {
          titulo: 'R3F: dispose',
          url: 'https://r3f.docs.pmnd.rs/api/objects#dispose',
          nota: 'La prop `dispose` y el comportamiento por defecto de R3F.',
        },
      ],
      ejercicio: {
        reto: 'Calcula cuántos recursos sobreviven: recibe cuántas vistas se abren, cuántos recursos crea cada una y cuántos se liberan al cerrarse, y devuelve los que quedan vivos.',
        inicial: `export function vivos(vistas: number, porVista: number, liberados: number): number {
  // TODO: cada vista deja los que no se liberan.
  return 0
}

console.log(vivos(20, 40, 40), vivos(20, 40, 0))`,
        solucion: `export function vivos(vistas: number, porVista: number, liberados: number): number {
  const fuga = Math.max(0, porVista - liberados)
  return vistas * fuga
}

console.log(vivos(20, 40, 40), vivos(20, 40, 0))`,
        pistas: [
          'Lo que queda por vista es la diferencia entre creados y liberados.',
          'No puede ser negativo: `Math.max(0, …)`.',
          'Multiplica por el número de visitas.',
        ],
      },
    },
  ],
}

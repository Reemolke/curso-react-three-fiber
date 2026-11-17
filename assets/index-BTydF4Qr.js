const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./PaginaLeccion-D4qNbRRA.js","./rolldown-runtime-BWaJ3C7D.js","./react-C2KsiCsq.js","./Bloques-BOcCInHu.js","./arranque-DIbePYYx.js","./Codigo-DP1vgNeK.js","./PaginaPlayground-Dl5p6qxH.js","./three-BVG2VSL3.js","./marco-BJJtGvB-.js","./PaginaProyecto-DUX_KibE.js","./Visor-DQdpxXPm.js"])))=>i.map(i=>d[i]);
import{a as e}from"./rolldown-runtime-BWaJ3C7D.js";import{t}from"./arranque-DIbePYYx.js";import{_ as n,f as r,h as i,p as a}from"./react-C2KsiCsq.js";var o=e(n(),1),s=e(i(),1);function c(e,t){let n;try{n=e()}catch{return}return{getItem:e=>{let r=e=>e===null?null:JSON.parse(e,t?.reviver),i=n.getItem(e)??null;return l(i)?i.then(r):r(i)},setItem:(e,r)=>n.setItem(e,JSON.stringify(r,t?.replacer)),removeItem:e=>n.removeItem(e)}}var l=e=>typeof e?.then==`function`,u=e=>({then(t){return t?d(t)(e):this}}),d=e=>t=>{try{let n=e(t);return l(n)?n:u(n)}catch(e){return{then(t,n){return n?d(n)(e):this}}}},f=a()(((e,t)=>(n,r,i)=>{let a={storage:c(()=>window.localStorage),partialize:e=>e,version:0,merge:(e,t)=>({...t,...e}),...t},o=!1,s=0,u=new Set,f=new Set,p=a.storage;if(!p)return e((...e)=>{console.warn(`[zustand persist middleware] Unable to update item '${a.name}', the given storage is currently unavailable.`),n(...e)},r,i);let m=()=>{let e=a.partialize({...r()});return p.setItem(a.name,{state:e,version:a.version})},h=i.setState;i.setState=(...e)=>(h(...e),m());let g=e((...e)=>(n(...e),m()),r,i);i.getInitialState=()=>g;let _,v=()=>{if(!p)return;let e=++s;o=!1,u.forEach(e=>e(r()??g));let t=a.onRehydrateStorage?.call(a,r()??g)||void 0;return d(p.getItem.bind(p))(a.name).then(e=>{if(e){if(typeof e.version==`number`&&e.version!==a.version){if(a.migrate){let t=a.migrate(e.state,e.version);return l(t)?t.then(e=>[!0,e]):[!0,t]}console.error(`State loaded from storage couldn't be migrated since no migrate function was provided`)}else return[!1,e.state]}return[!1,void 0]}).then(t=>{if(e!==s)return;let[i,o]=t;if(_=a.merge(o,r()??g),n(_,!0),i)return m()}).then(()=>{e===s&&(t?.(r(),void 0),_=r(),o=!0,f.forEach(e=>e(_)))}).then(()=>void 0,n=>{e===s&&t?.(void 0,n)})};return i.persist={setOptions:e=>{a={...a,...e},e.storage&&(p=e.storage)},clearStorage:()=>{++s,p?.removeItem(a.name)},getOptions:()=>a,rehydrate:()=>{try{return Promise.resolve(v())}catch(e){return Promise.reject(e)}},hasHydrated:()=>o,onHydrate:e=>(u.add(e),()=>{u.delete(e)}),onFinishHydration:e=>(f.add(e),()=>{f.delete(e)})},a.skipHydration||v(),_||g})(e=>({completadas:{},quizzes:{},fases:{},tema:`oscuro`,marcarCompletada:(t,n=!0)=>e(e=>{let r={...e.completadas};return n?r[t]=new Date().toISOString():delete r[t],{completadas:r}}),guardarQuiz:(t,n,r)=>e(e=>{let i=e.quizzes[t],a=i&&i.aciertos/i.total>n/r?i.aciertos:n;return{quizzes:{...e.quizzes,[t]:{aciertos:a,total:r,fecha:new Date().toISOString()}}}}),marcarFase:(t,n)=>e(e=>({fases:{...e.fases,[t]:n}})),alternarTema:()=>e(e=>({tema:e.tema===`oscuro`?`claro`:`oscuro`})),reiniciar:()=>e({completadas:{},quizzes:{},fases:{}})}),{name:`curso-r3f-progreso`,version:1,partialize:e=>({completadas:e.completadas,quizzes:e.quizzes,fases:e.fases,tema:e.tema})}));function p(e){let t=document.documentElement;t.classList.toggle(`dark`,e===`oscuro`),t.style.colorScheme=e===`oscuro`?`dark`:`light`}function m(e){let t=decodeURIComponent(e.replace(/^#/,``).split(`?`)[0]??``),n=t.split(`/`).filter(Boolean);if(n.length===0)return{nombre:`inicio`};let[r,i]=n;switch(r){case`leccion`:return i?{nombre:`leccion`,id:i}:{nombre:`inicio`};case`modulo`:{let e=Number(i);return Number.isFinite(e)?{nombre:`modulo`,numero:e}:{nombre:`inicio`}}case`playground`:return{nombre:`playground`};case`visor`:return{nombre:`visor`};case`proyecto`:case`proyecto-final`:return{nombre:`proyecto`};case`progreso`:return{nombre:`progreso`};case`creditos`:return{nombre:`creditos`};default:return{nombre:`no-encontrada`,ruta:t}}}function h(e){return`#/leccion/${e}`}function g(e){return`#/modulo/${e}`}function _(){let[e,t]=(0,o.useState)(()=>m(window.location.hash));return(0,o.useEffect)(()=>{let e=()=>t(m(window.location.hash));return window.addEventListener(`hashchange`,e),()=>window.removeEventListener(`hashchange`,e)},[]),{ruta:e,navegar:(0,o.useCallback)(e=>{window.location.hash!==e&&(window.location.hash=e)},[])}}var v=[{numero:0,titulo:`Prerrequisitos rápidos`,descripcion:`Qué capa hace qué, el React mínimo que necesitas y cómo se dibuja un canvas 60 veces por segundo. Sin esto, el resto del curso se aprende de memoria.`,lecciones:[{id:`0.1`,modulo:0,titulo:`El mapa: WebGL → three.js → R3F`,objetivo:`Situar las tres capas del stack y saber qué problema resuelve cada una antes de escribir la primera línea de 3D.`,nivel:`intro`,minutos:15,bloques:[{tipo:`parrafo`,texto:`Cuando alguien dice «hago 3D en la web» suele haber cuatro capas trabajando a la vez, y casi todos los tutoriales las mezclan. Si no sabes cuál hace qué, cada error parece magia negra. Este es el mapa completo, de arriba abajo.`},{tipo:`widget`,id:`capas`,titulo:`Pulsa cada capa para ver su trabajo`},{tipo:`parrafo`,texto:`Piensa en un rodaje: React es el guion (dice qué hay en escena y cuándo cambia), React Three Fiber es el director de fotografía (traduce el guion a órdenes concretas), three.js es el equipo de cámara y luces, y WebGL es el objetivo que impresiona el fotograma. Cada uno hace su trabajo y ninguno hace el del otro.`},{tipo:`destacado`,tono:`ojo`,titulo:`El error de modelo mental más común`,texto:`React Three Fiber NO renderiza React dentro de un canvas. En el DOM solo hay un <canvas>. React se usa como descriptor de una escena de three.js: no hay divs, ni CSS, ni nodos del DOM dentro de la escena.`},{tipo:`codigo`,lenguaje:`tsx`,titulo:`El mismo cubo, dos paradigmas`,codigo:`// three.js puro: describes los pasos
const escena = new THREE.Scene()
const cubo = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshStandardMaterial({ color: '#f5a524' }),
)
cubo.position.x = 1
escena.add(cubo)

// React Three Fiber: describes el resultado
<Canvas>
  <mesh position={[1, 0, 0]}>
    <boxGeometry args={[1, 1, 1]} />
    <meshStandardMaterial color="#f5a524" />
  </mesh>
</Canvas>`},{tipo:`tabla`,cabecera:[`Capa`,`La pregunta que responde`,`Lo que NO hace`],filas:[[`React`,`¿Qué debe existir y qué cambió?`,`No habla con la GPU`],[`React Three Fiber`,`¿Cómo traduzco JSX a objetos 3D?`,`No dibuja píxeles`],[`three.js`,`¿Cómo se ve la escena y cómo se dibuja?`,`No conoce tu estado`],[`WebGL / GPU`,`¿Qué píxeles resultan?`,`No toma decisiones`]]},{tipo:`destacado`,tono:`porque`,texto:`¿Por qué aprender R3F en vez de three.js puro? Porque el 80 % del trabajo real de una escena web no es dibujar: es manejar estado, cargar assets, reaccionar a eventos y mantener la interfaz sincronizada. Eso es exactamente lo que React ya resuelve bien. En el módulo 2 verás el mismo cubo en ambos mundos y decidirás tú cuándo bajar al three.js puro.`},{tipo:`lista`,items:[`React describe, no ordena pasos: cambias el estado y React decide qué actualizar.`,`three.js ordena pasos: creas objetos, los añades a la escena y llamas a render.`,`R3F es el puente: te deja describir three.js con la sintaxis de React.`,`WebGL es la capa final, y casi nunca la tocarás a mano.`]}],errores:[{sintoma:`Metes un <div> dentro de <Canvas> y no aparece nada, o ves un error de tipo.`,causa:`Dentro del canvas no hay DOM: el árbol de hijos se interpreta como objetos 3D.`,arreglo:`Para interfaz HTML usa el componente <Html> de drei (módulo 9.4) o saca el HTML fuera del canvas y comunícalo por estado.`},{sintoma:`«Mi componente React no se actualiza» al cambiar una variable 3D.`,causa:`Has mutado un objeto de three.js dentro de un render; React no se entera de las mutaciones.`,arreglo:`Para datos que cambian y deben verse en la UI usa estado de React; para animación por frame, muta en useFrame (módulo 5).`},{sintoma:`Crees que un fallo de CSS está rompiendo la escena.`,causa:`El canvas no hereda estilos de los componentes internos: no existen.`,arreglo:`El tamaño del canvas lo controla su contenedor. Si la escena se ve estirada, revisa el alto del div padre.`}],quiz:[{tipo:`unica`,enunciado:`¿Qué hay realmente en el DOM cuando renderizas un <Canvas> de R3F?`,opciones:[`Un div por cada malla de la escena`,`Un único elemento <canvas>`,`Un iframe con un documento 3D`,`Nada: R3F dibuja directamente en el body`],correcta:1,explicacion:`R3F crea un contexto WebGL sobre un único canvas. Los <mesh>, <boxGeometry> y demás no generan nodos del DOM: generan objetos de three.js.`},{tipo:`unica`,enunciado:`¿Qué capa decide cuándo hay que volver a renderizar por un cambio de estado?`,opciones:[`WebGL`,`three.js`,`React`,`El navegador`],correcta:2,explicacion:`React gestiona el estado y la reconciliación. R3F reacciona a esa reconciliación creando o actualizando objetos de three.js.`},{tipo:`verdadero-falso`,enunciado:`React Three Fiber sustituye a three.js.`,correcta:!1,explicacion:`No lo sustituye: lo usa. R3F es un renderer de React cuyo trabajo es mantener un grafo de objetos three.js sincronizado con tu JSX.`},{tipo:`multiple`,enunciado:`¿Qué tareas hace three.js por ti?`,opciones:[`Calcular matrices de transformación`,`Compilar materiales a shaders`,`Decidir qué componente de React debe re-renderizar`,`Emitir las draw calls a WebGL`],correctas:[0,1,3],explicacion:`La reconciliación de componentes es de React. Todo lo demás es trabajo del motor: transformaciones, materiales y dibujo.`}],recursos:[{titulo:`React Three Fiber — Introduction`,url:`https://r3f.docs.pmnd.rs/getting-started/introduction`,nota:`La explicación oficial de qué es un renderer de React.`},{titulo:`three.js Manual — Fundamentals`,url:`https://threejs.org/manual/#en/fundamentals`,nota:`El modelo mental de escena, cámara y renderer, sin React de por medio.`},{titulo:`MDN — WebGL API`,url:`https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API`,nota:`Para cuando quieras saber qué hay debajo de la capa 1.`}],ejercicio:{reto:`Completa el panel de capas: al pulsar un botón debe resaltarse y mostrar la función de esa capa.`,inicial:`import { useState } from 'react'

const CAPAS = [
  { id: 'react', nombre: 'React', funcion: 'Describe la interfaz y guarda el estado' },
  { id: 'r3f', nombre: 'R3F', funcion: 'Traduce JSX a objetos de three.js' },
  { id: 'three', nombre: 'three.js', funcion: 'Construye y dibuja la escena' },
  { id: 'webgl', nombre: 'WebGL', funcion: 'Pinta píxeles en la GPU' },
]

export default function App() {
  const [activa, setActiva] = useState('react')

  return (
    <div style={{ padding: 16, fontFamily: 'system-ui', color: '#eee', background: '#111', minHeight: '100vh' }}>
      <h2>Capas del stack 3D</h2>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        {CAPAS.map((capa) => (
          <button key={capa.id} onClick={() => setActiva(capa.id)}>
            {capa.nombre}
          </button>
        ))}
      </div>

      {/* TODO: muestra el nombre y la función de la capa activa */}
      <p>Activa: {activa}</p>
    </div>
  )
}`,solucion:`import { useState } from 'react'

const CAPAS = [
  { id: 'react', nombre: 'React', funcion: 'Describe la interfaz y guarda el estado' },
  { id: 'r3f', nombre: 'R3F', funcion: 'Traduce JSX a objetos de three.js' },
  { id: 'three', nombre: 'three.js', funcion: 'Construye y dibuja la escena' },
  { id: 'webgl', nombre: 'WebGL', funcion: 'Pinta píxeles en la GPU' },
]

export default function App() {
  const [activa, setActiva] = useState('react')
  const capa = CAPAS.find((c) => c.id === activa)!

  return (
    <div style={{ padding: 16, fontFamily: 'system-ui', color: '#eee', background: '#111', minHeight: '100vh' }}>
      <h2>Capas del stack 3D</h2>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        {CAPAS.map((c) => (
          <button
            key={c.id}
            onClick={() => setActiva(c.id)}
            style={{
              background: c.id === activa ? '#f5a524' : '#222',
              color: c.id === activa ? '#111' : '#eee',
              border: '1px solid #444',
              borderRadius: 8,
              padding: '6px 12px',
              fontWeight: 600,
            }}
          >
            {c.nombre}
          </button>
        ))}
      </div>

      <div style={{ marginTop: 16, border: '1px solid #333', borderRadius: 12, padding: 12 }}>
        <strong>{capa.nombre}</strong>
        <p style={{ margin: '6px 0 0' }}>{capa.funcion}</p>
      </div>
    </div>
  )
}`,pistas:[`Busca la capa activa dentro del array con find().`,"El estilo del botón puede depender de si su id coincide con `activa`.","No necesitas estado nuevo: todo lo que necesitas ya está en `activa`."]}},{id:`0.2`,modulo:0,titulo:`React que necesitas (y solo ese)`,objetivo:`Usar componentes, props, useState y el paso de datos al canvas sin repasar React entero.`,nivel:`intro`,minutos:30,bloques:[{tipo:`parrafo`,texto:`No hace falta dominar React para empezar. Hacen falta cuatro cosas: un componente que devuelve JSX, props para pasar datos hacia abajo, useState para recordar algo y una Idea muy simple de cuándo se vuelve a pintar. Todo lo demás lo irás aprendiendo sobre la marcha.`},{tipo:`destacado`,tono:`porque`,texto:`La regla que gobierna todo el curso: React pinta cuando cambia el estado o las props. Si quieres que algo cambie 60 veces por segundo, no uses estado (módulo 5); si quieres que cambie cuando el alumno pulsa un botón, el estado es exactamente lo correcto.`},{tipo:`demo`,id:`contador-cubo`,titulo:`Un useState dentro de un canvas`,alto:320,nota:`Esto es un adelanto del módulo 3: el cubo y el material se explican allí. Hoy solo mira el flujo del dato.`},{tipo:`parrafo`,texto:`Fíjate en el camino del dato: el botón llama a setColor → React vuelve a ejecutar el componente → el nuevo valor entra en <Canvas> como prop → R3F actualiza el color del material. Ningún objeto de three.js se toca a mano. Ese es el pacto: tú describes, R3F sincroniza.`},{tipo:`codigo`,lenguaje:`tsx`,titulo:`Los cuatro conceptos, en un solo bloque`,codigo:`// 1. Componente: una función que devuelve JSX
function Ficha({ nombre }: { nombre: string }) {   // 2. Props: datos de fuera
  return <p>{nombre}</p>
}

function App() {
  // 3. Estado: un valor que, al cambiar, repinta
  const [veces, setVeces] = useState(0)

  return (
    <button onClick={() => setVeces(veces + 1)}>
      Pulsado {veces} veces {/* 4. Render: se recalcula al cambiar el estado */}
    </button>
  )
}`},{tipo:`lista`,items:[`Un componente es una función que devuelve JSX. Nada más.`,`Las props son de solo lectura: si el hijo necesita cambiarlas, recibe también una función.`,`useState devuelve el valor y una función para cambiarlo; nunca lo asignes directamente.`,"Las claves (`key`) son obligatorias al pintar listas, y en 3D también: identifican qué objeto es cuál."]},{tipo:`destacado`,tono:`truco`,texto:"Truco de lectura de código R3F: cualquier prop que empiece por `on` es un evento (onClick, onPointerOver), cualquier prop con nombre de propiedad de three.js es un setter (position, rotation, visible) y `args` son los argumentos del constructor. Con esas tres reglas entiendes el 80 % del código que verás."}],errores:[{sintoma:`El contador se queda en 0 por muchos clics.`,causa:`Estás mutando el valor en vez de llamar al setter, o usando el valor antiguo en una función asíncrona.`,arreglo:`Usa la forma funcional: setVeces((v) => v + 1). React agrupa actualizaciones y la forma funcional siempre parte del último valor.`},{sintoma:`La escena no refleja el estado que acabas de cambiar.`,causa:"El estado vive en un componente que no envuelve al `<Canvas>`, o el valor se capturó en un cierre antiguo.",arreglo:`Comprueba que el estado está por encima del canvas en el árbol y que lo pasas por props al hijo que lo usa.`},{sintoma:"Poner un objeto nuevo en `useState` provoca renders infinitos.",causa:`Un objeto o array literal cambia de identidad en cada render; si se usa como dependencia de un efecto, el efecto se repite.`,arreglo:`Memoriza con useMemo o guarda valores primitivos (números, cadenas) en el estado.`}],quiz:[{tipo:`unica`,enunciado:`¿Cuándo vuelve a ejecutarse un componente de React?`,opciones:[`Solo la primera vez que se monta`,`Cuando cambian sus props o su estado`,`En cada frame del navegador`,`Cuando three.js lo pide`],correcta:1,explicacion:`React vuelve a ejecutar el componente cuando cambian sus props o su estado (o cuando su padre se re-renderiza). Si quieres algo por frame, eso es useFrame, no estado.`},{tipo:`verdadero-falso`,enunciado:`Puedes modificar directamente una prop dentro del componente que la recibe.`,correcta:!1,explicacion:`Las props son de solo lectura. Si necesitas cambiarlas, el padre debe pasar también una función que actualice su estado.`},{tipo:`unica`,enunciado:`¿Cuál es la forma correcta de incrementar un contador que puede actualizarse varias veces seguidas?`,opciones:[`setCuenta(cuenta + 1)`,`cuenta = cuenta + 1`,`setCuenta((actual) => actual + 1)`,`setCuenta(cuenta++)`],correcta:2,explicacion:`La forma funcional recibe el último valor confirmado por React y evita perder actualizaciones cuando se agrupan.`},{tipo:`multiple`,enunciado:"En R3F, ¿qué significan `args`, `position` y `onClick` en un `<mesh>`?",opciones:["`args` son los argumentos del constructor","`position` es un setter de la propiedad position","`onClick` es un evento de puntero","`args` son los estilos CSS del canvas"],correctas:[0,1,2],explicacion:"Esa es la gramática de R3F: `args` construye, el resto de props asignan propiedades, y las que empiezan por `on` son eventos."}],recursos:[{titulo:`React — Learn (guía oficial)`,url:`https://react.dev/learn`,nota:`Describe UI, estado y renderizado. Con leer «State: A Component’s Memory» tienes suficiente.`},{titulo:`React — useRef`,url:`https://react.dev/reference/react/useRef`,nota:`Lo usarás en cada demo para hablar con objetos de three.js sin re-renderizar.`},{titulo:`React Three Fiber — Canvas`,url:`https://r3f.docs.pmnd.rs/api/canvas`,nota:`Las props del canvas que iremos viendo: camera, shadows, dpr, frameloop.`}],ejercicio:{reto:`Añade un botón azul y otro que doble el tamaño del cubo, usando el estado que ya existe.`,inicial:`import { useState } from 'react'
import { Canvas } from '@react-three/fiber'

export default function App() {
  const [color, setColor] = useState('#f5a524')

  return (
    <div style={{ height: 320, background: '#111' }}>
      <div style={{ display: 'flex', gap: 8, padding: 8 }}>
        <button onClick={() => setColor('#f5a524')}>Ámbar</button>
        {/* TODO: botón azul (#4d8df6) */}
      </div>

      <Canvas camera={{ position: [0, 0, 4] }}>
        <mesh>
          <boxGeometry args={[1.4, 1.4, 1.4]} />
          <meshBasicMaterial color={color} />
        </mesh>
      </Canvas>
    </div>
  )
}`,solucion:`import { useState } from 'react'
import { Canvas } from '@react-three/fiber'

export default function App() {
  const [color, setColor] = useState('#f5a524')
  const [escala, setEscala] = useState(1)

  return (
    <div style={{ height: 320, background: '#111' }}>
      <div style={{ display: 'flex', gap: 8, padding: 8 }}>
        <button onClick={() => setColor('#f5a524')}>Ámbar</button>
        <button onClick={() => setColor('#4d8df6')}>Azul</button>
        <button onClick={() => setEscala((e) => e * 2)}>Doblar tamaño</button>
      </div>

      <Canvas camera={{ position: [0, 0, 4] }}>
        <mesh scale={escala}>
          <boxGeometry args={[1.4, 1.4, 1.4]} />
          <meshBasicMaterial color={color} />
        </mesh>
      </Canvas>
    </div>
  )
}`,pistas:[`Para el tamaño necesitas un segundo useState; no reutilices el del color.`,"La prop `scale` acepta un número: escala uniforme en los tres ejes.",`Doblar el tamaño es una actualización funcional: setEscala((e) => e * 2).`]}},{id:`0.3`,modulo:0,titulo:`Qué es un canvas y cómo se dibuja 60 veces por segundo`,objetivo:`Explicar el bucle de requestAnimationFrame, qué es el delta y por qué animar sumando una constante por frame rompe a otras tasas de refresco.`,nivel:`intro`,minutos:35,bloques:[{tipo:`parrafo`,texto:`Un canvas es una superficie opaca donde alguien dibuja píxeles. No guarda objetos: no hay un cubo dentro del canvas, hay píxeles que se parecen a un cubo. Por eso, para animar, hay que volver a dibujar la escena entera muchas veces por segundo.`},{tipo:`parrafo`,texto:`El navegador expone requestAnimationFrame: le pides que te llame justo antes del siguiente pintado de pantalla, y te pasa un tiempo en milisegundos. Si tu función vuelve a pedir otro frame, tienes un bucle. Ese bucle es el corazón de cualquier escena 3D y de ahí sale el famoso «60 fps» (o 120, o 144, según la pantalla).`},{tipo:`widget`,id:`rebote-canvas`,titulo:`El bucle en directo: delta y frames`},{tipo:`destacado`,tono:`porque`,titulo:`Qué es el delta y por qué te salva`,texto:`Delta es el tiempo que ha pasado desde el frame anterior. Si multiplicas la velocidad por delta, el objeto avanza «tantos píxeles por segundo» sea cual sea la tasa de refresco. Si sumas una constante por frame, avanza «tantos píxeles por frame»: en una pantalla de 144 Hz irá más del doble de rápido que en una de 60.`},{tipo:`codigo`,lenguaje:`ts`,titulo:`El bucle, escrito a mano`,codigo:`let anterior = performance.now()

function frame(ahora: number) {
  const delta = (ahora - anterior) / 1000   // segundos, no milisegundos
  anterior = ahora

  posicion += velocidad * delta             // independiente de los fps
  dibujar()

  requestAnimationFrame(frame)              // pide el siguiente
}

requestAnimationFrame(frame)`},{tipo:`lista`,items:[`rAF se pausa solo cuando la pestaña no es visible: no hace falta gestionarlo.`,`delta se mide en segundos si divides entre 1000; es la unidad que usan las APIs de three.js.`,"En R3F el bucle ya existe: `useFrame((estado, delta) => …)` te lo da hecho (módulo 5).",`Si un frame tarda muchísimo (cambio de pestaña), acota el delta para que nada se teletransporte.`]},{tipo:`destacado`,tono:`truco`,texto:`Cuando una animación «se acelera en mi portátil nuevo», casi siempre es esto: la lógica avanzaba por frame y el portátil va a 120 Hz. Antes de tocar la velocidad, comprueba si estás multiplicando por delta.`}],errores:[{sintoma:`La animación va al doble de velocidad en un monitor de 120 Hz.`,causa:`Se suma una constante por frame en vez de multiplicar por delta.`,arreglo:`Multiplica siempre por delta (en segundos) y define la velocidad en unidades por segundo.`},{sintoma:`Los objetos «saltan» al volver a la pestaña después de un rato.`,causa:`El delta acumulado es enorme porque rAF estuvo pausado.`,arreglo:"Acota el delta: `const dt = Math.min(delta, 0.05)`."},{sintoma:`El canvas se ve borroso o estirado.`,causa:`El tamaño en píxeles del canvas no coincide con su tamaño en CSS, o falta el devicePixelRatio.`,arreglo:"Fija `canvas.width = anchoCss * dpr` y `canvas.height = altoCss * dpr`, y ajusta el contexto con `ctx.setTransform(dpr, 0, 0, dpr, 0, 0)`."}],quiz:[{tipo:`unica`,enunciado:`¿Qué unidad usa el delta que entrega requestAnimationFrame si divides entre 1000?`,opciones:[`Milisegundos`,`Segundos`,`Frames`,`Píxeles`],correcta:1,explicacion:"rAF entrega milisegundos. Dividiendo entre 1000 obtienes segundos, que es la unidad que espera `useFrame` en R3F."},{tipo:`verdadero-falso`,enunciado:`Si multiplicas la velocidad por delta, la animación se mueve igual a 30, 60 o 144 fps.`,correcta:!0,explicacion:`Ese es justo el motivo de existir del delta: convertir «por frame» en «por segundo».`},{tipo:`unica`,enunciado:`Un objeto debe recorrer 200 unidades por segundo. ¿Qué escribes dentro del frame?`,opciones:[`posicion += 200`,`posicion += 200 * delta`,`posicion += 200 / delta`,`posicion = 200`],correcta:1,explicacion:`Velocidad (unidades por segundo) por tiempo transcurrido (segundos) da unidades recorridas en ese frame.`},{tipo:`multiple`,enunciado:`¿Qué hace exactamente requestAnimationFrame?`,opciones:[`Llama a tu función antes del siguiente pintado`,`Te entrega un timestamp en milisegundos`,`Limita la animación a 60 fps siempre`,`Se pausa cuando la pestaña no es visible`],correctas:[0,1,3],explicacion:`rAF no impone 60 fps: se sincroniza con la pantalla, sea de 60, 120 o 144 Hz.`}],recursos:[{titulo:`MDN — window.requestAnimationFrame`,url:`https://developer.mozilla.org/en-US/docs/Web/API/Window/requestAnimationFrame`,nota:`La referencia exacta, incluido el timestamp y el comportamiento en pestañas ocultas.`},{titulo:`MDN — Canvas API`,url:`https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API`,nota:`El canvas 2D que usamos en la demo; la misma idea de superficie que en WebGL.`},{titulo:`Discover three.js`,url:`https://www.discoverthreejs.com/`,nota:`Explica el render loop desde cero, sin dar por hecho que sabes WebGL.`}],ejercicio:{reto:`Cambia el bucle para que el cuadrado se mueva a 120 píxeles por segundo, independientemente de los fps.`,inicial:`import { useEffect, useRef } from 'react'

export default function App() {
  const lienzo = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = lienzo.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let x = 20
    let raf = 0

    const dibujar = () => {
      x = x + 2            // ← esto va por frame, no por segundo
      if (x > 260) x = 20

      ctx.clearRect(0, 0, 300, 120)
      ctx.fillStyle = '#f5a524'
      ctx.fillRect(x, 40, 32, 32)

      raf = requestAnimationFrame(dibujar)
    }

    raf = requestAnimationFrame(dibujar)
    return () => cancelAnimationFrame(raf)
  }, [])

  return <canvas ref={lienzo} width={300} height={120} style={{ background: '#111' }} />
}`,solucion:`import { useEffect, useRef } from 'react'

export default function App() {
  const lienzo = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = lienzo.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let x = 20
    let anterior = performance.now()
    let raf = 0
    const VELOCIDAD = 120 // píxeles por segundo

    const dibujar = (ahora: number) => {
      const delta = Math.min((ahora - anterior) / 1000, 0.05)
      anterior = ahora

      x = x + VELOCIDAD * delta
      if (x > 260) x = 20

      ctx.clearRect(0, 0, 300, 120)
      ctx.fillStyle = '#f5a524'
      ctx.fillRect(x, 40, 32, 32)

      raf = requestAnimationFrame(dibujar)
    }

    raf = requestAnimationFrame(dibujar)
    return () => cancelAnimationFrame(raf)
  }, [])

  return <canvas ref={lienzo} width={300} height={120} style={{ background: '#111' }} />
}`,pistas:[`requestAnimationFrame pasa un timestamp a la función; úsalo para calcular el delta.`,`Convierte a segundos antes de multiplicar.`,`Acota el delta con Math.min para evitar saltos tras cambiar de pestaña.`]}}]},{numero:1,titulo:`El espacio 3D: coordenadas, vectores y rotaciones`,descripcion:`El modelo mental que hay debajo de cualquier escena: tres objetos en el trípode, un sistema de coordenadas en metros, vectores que se normalizan y rotaciones que a veces pierden un eje.`,lecciones:[{id:`1.1`,modulo:1,titulo:`El trípode: escena, cámara, renderer`,objetivo:`Montar una escena mínima con three.js y explicar qué papel cumple cada uno de sus tres objetos antes de tocar React.`,nivel:`intro`,minutos:40,bloques:[{tipo:`parrafo`,texto:`Una escena 3D no es una foto: es una receta que alguien ejecuta en tu nombre. Para que aparezca algo en pantalla hacen falta tres piezas distintas. La escena guarda los objetos, la cámara decide desde dónde se miran y el renderer convierte esa información en píxeles. Si una falla, la pantalla se queda vacía aunque las otras dos estén perfectas.`},{tipo:`demo`,id:`m1-tripode`,titulo:`Quita la cámara, la luz o el cubo`},{tipo:`parrafo`,texto:`Piensa en un plató de cine. La escena es el decorado con sus muebles y actores; la cámara es el objetivo que encuadra; el renderer es el equipo que impresiona el fotograma. El decorado no sabe si le están grabando, y la cámara no sabe qué hay fuera de su encuadre. Cada pieza tiene una responsabilidad y ninguna sustituye a las demás.`},{tipo:`destacado`,tono:`porque`,titulo:`Por qué el renderer no vive dentro de la escena`,texto:`Porque el renderer no es un objeto que se coloca en el mundo: es el motor que lee la escena y la cámara para dibujar. No tiene posición ni rotación. Por eso en three.js se llama a renderer.render(escena, camara) en lugar de añadirlo a la escena.`},{tipo:`codigo`,lenguaje:`ts`,titulo:`La escena mínima, sin React de por medio`,codigo:`import * as THREE from 'three'

const canvas = document.querySelector('canvas')!
const ancho = canvas.clientWidth
const alto = canvas.clientHeight

const escena = new THREE.Scene()

const camara = new THREE.PerspectiveCamera(45, ancho / alto, 0.1, 100)
camara.position.set(3, 2.4, 4.4)
camara.lookAt(0, 0, 0)

const renderer = new THREE.WebGLRenderer({ canvas, antialias: true })
renderer.setSize(ancho, alto, false)

const cubo = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial({ color: '#f5a524' }),
)
escena.add(cubo)

renderer.render(escena, camara)`},{tipo:`parrafo`,texto:`Fíjate en dos detalles que se olvidan siempre. Primero, la cámara no está añadida a la escena: three.js no la necesita dentro porque el renderer la recibe como argumento. Segundo, renderer.render dibuja un fotograma y termina; si no lo vuelves a llamar, la imagen se queda congelada aunque muevas el cubo.`},{tipo:`lista`,items:[`La escena es un contenedor: no dibuja, solo organiza objetos.`,`La cámara define el punto de vista y el tipo de proyección (perspectiva u ortográfica).`,`El renderer posee el contexto WebGL y emite las draw calls.`,`El canvas es la superficie del DOM donde aparece el resultado.`,`Cambiar la posición de un objeto no actualiza la pantalla por sí solo: hay que volver a renderizar.`]},{tipo:`tabla`,cabecera:[`Pieza`,`Qué guarda`,`Qué pasa si la quitas`],filas:[[`Escena`,`Objetos y sus transformaciones`,`No hay nada que dibujar`],[`Cámara`,`Posición, orientación y proyección`,`El renderer no tiene punto de vista`],[`Renderer`,`Contexto WebGL y estado de dibujo`,`No se emite ni un píxel`]]},{tipo:`destacado`,tono:`ojo`,texto:`En la demo, «sin cámara» se simula tapando el objetivo con una esfera negra: no se puede eliminar la cámara sin romper el renderer. El concepto es el mismo: sin un punto de vista válido, no hay imagen. La luz tampoco es un objeto obligatorio del trípode, pero sí lo es para los materiales que reaccionan a ella; eso llega en el módulo 4.`}],errores:[{sintoma:`La escena se ve completamente negra o vacía.`,causa:`La cámara no apunta al objeto, está dentro de él, o su near/far deja fuera la geometría.`,arreglo:`Coloca la cámara a una distancia razonable, llama a camara.lookAt(0, 0, 0) y comprueba que near sea menor y far mayor que las distancias de la escena.`},{sintoma:`El canvas aparece con altura cero o estirado.`,causa:`Se llamó a setSize con un tamaño que no coincide con el del contenedor CSS.`,arreglo:`Mide el contenedor con clientWidth y clientHeight, pasa esos valores a setSize y actualiza camera.aspect cuando cambie el tamaño.`},{sintoma:`Mueves un cubo y la imagen no cambia.`,causa:`Has mutado la posición después del último render y nadie ha vuelto a dibujar.`,arreglo:`Llama a renderer.render(escena, camara) después de cada cambio o dentro de un bucle de requestAnimationFrame.`}],quiz:[{tipo:`unica`,enunciado:`¿Qué objeto guarda las mallas y sus transformaciones?`,opciones:[`El renderer`,`La escena`,`La cámara`,`El canvas`],correcta:1,explicacion:`La escena es el contenedor del grafo de objetos. La cámara solo define el punto de vista y el renderer dibuja.`},{tipo:`unica`,enunciado:`¿Qué necesita renderer.render para dibujar un fotograma?`,opciones:[`Solo la escena`,`Solo la cámara`,`La escena y la cámara`,`El canvas y una textura`],correcta:2,explicacion:`La firma es render(scene, camera): necesita el grafo que dibujar y el punto de vista desde el que mirarlo.`},{tipo:`verdadero-falso`,enunciado:`La cámara tiene que ser hija de la escena para que three.js la use.`,correcta:!1,explicacion:`No es obligatorio: se pasa directamente a render. Añadirla a la escena solo sirve si quieres que otros objetos la traten como parte del grafo.`},{tipo:`multiple`,enunciado:`¿Qué hace falta para que un cubo se vea en pantalla?`,opciones:[`Una geometría y un material`,`Que la cámara lo encuadre`,`Una llamada a render`,`Que el cubo esté añadido al DOM`],correctas:[0,1,2],explicacion:`El cubo es un objeto de three.js, no un nodo del DOM. Necesita geometría, material, cámara que lo vea y una llamada de dibujo.`}],recursos:[{titulo:`three.js Manual — Fundamentals`,url:`https://threejs.org/manual/#en/fundamentals`,nota:`Escena, cámara, renderer y el primer bucle, explicados desde cero.`},{titulo:`three.js Docs — PerspectiveCamera`,url:`https://threejs.org/docs/#api/en/cameras/PerspectiveCamera`,nota:`Qué significan fov, aspect, near y far, y cómo se actualiza la proyección.`},{titulo:`three.js Docs — WebGLRenderer`,url:`https://threejs.org/docs/#api/en/renderers/WebGLRenderer`,nota:`La referencia de setSize, setPixelRatio y render.`}],ejercicio:{reto:`Añade un segundo cubo a la escena, colócalo a la derecha del primero y comprueba que ambos se ven con la misma cámara.`,inicial:`import { useEffect, useRef } from 'react'
import * as THREE from 'three'

export default function App() {
  const lienzo = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = lienzo.current
    if (!canvas) return

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true })
    renderer.setSize(420, 280, false)

    const escena = new THREE.Scene()
    const camara = new THREE.PerspectiveCamera(45, 420 / 280, 0.1, 100)
    camara.position.set(3, 2.4, 4.4)
    camara.lookAt(0, 0, 0)

    const cubo = new THREE.Mesh(
      new THREE.BoxGeometry(1, 1, 1),
      new THREE.MeshBasicMaterial({ color: '#f5a524' }),
    )
    cubo.position.set(-0.8, 0, 0)
    escena.add(cubo)

    // TODO: crea un segundo cubo azul en x = 0.8 y añádelo a la escena
    renderer.render(escena, camara)

    return () => {
      renderer.dispose()
    }
  }, [])

  return <canvas ref={lienzo} width={420} height={280} style={{ background: '#111' }} />
}`,solucion:`import { useEffect, useRef } from 'react'
import * as THREE from 'three'

export default function App() {
  const lienzo = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = lienzo.current
    if (!canvas) return

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true })
    renderer.setSize(420, 280, false)

    const escena = new THREE.Scene()
    const camara = new THREE.PerspectiveCamera(45, 420 / 280, 0.1, 100)
    camara.position.set(3, 2.4, 4.4)
    camara.lookAt(0, 0, 0)

    const cubo = new THREE.Mesh(
      new THREE.BoxGeometry(1, 1, 1),
      new THREE.MeshBasicMaterial({ color: '#f5a524' }),
    )
    cubo.position.set(-0.8, 0, 0)
    escena.add(cubo)

    const segundo = new THREE.Mesh(
      new THREE.BoxGeometry(1, 1, 1),
      new THREE.MeshBasicMaterial({ color: '#4d8df6' }),
    )
    segundo.position.set(0.8, 0, 0)
    escena.add(segundo)

    renderer.render(escena, camara)

    return () => {
      renderer.dispose()
    }
  }, [])

  return <canvas ref={lienzo} width={420} height={280} style={{ background: '#111' }} />
}`,pistas:[`Un segundo cubo es otra llamada a new THREE.Mesh con su propia geometría y su propio material.`,`La posición se cambia con position.set(x, y, z), no con style.`,`No olvides escena.add(segundo) antes de renderizar.`]}},{id:`1.2`,modulo:1,titulo:`Coordenadas, unidades y el eje Y`,objetivo:`Leer una posición [x, y, z] y predecir dónde aparece un objeto, usando una escala de metros y el eje Y como altura.`,nivel:`intro`,minutos:45,bloques:[{tipo:`parrafo`,texto:`Una posición en three.js es una terna [x, y, z]. No hay más misterio, pero casi todos los errores de «mi objeto aparece donde no toca» vienen de confundir el orden o de no saber qué eje apunta hacia arriba. En este curso, un metro es una unidad y el eje Y es la altura. Siempre.`},{tipo:`demo`,id:`m1-coordenadas`,titulo:`Mueve el cubo y lee su posición en metros`},{tipo:`parrafo`,texto:`Imagina que estás de pie en el origen. El eje X va hacia tu derecha, el eje Y sube hacia el techo y el eje Z viene hacia ti, fuera de la pantalla. Es un sistema dextrógiro: si pones el pulgar en X y el índice en Y, el corazón te apunta en la dirección de Z. Ese detalle importa cuando importas modelos o mezclas librerías con convenciones distintas.`},{tipo:`destacado`,tono:`porque`,titulo:`Por qué conviene medir en metros`,texto:`Porque las cámaras, las luces y las físicas usan las mismas unidades que tus objetos. Si modelas una taza de 1 unidad y un edificio de 1000, cualquier ajuste de cámara o de sombra se vuelve imposible de afinar. Elige una escala desde el primer día y respétala.`},{tipo:`codigo`,lenguaje:`ts`,titulo:`Posición, rejilla y ejes de referencia`,codigo:`const cubo = new THREE.Mesh(
  new THREE.BoxGeometry(0.6, 0.6, 0.6),
  new THREE.MeshBasicMaterial({ color: '#f5a524' }),
)

// [x, y, z]: 1,5 m a la derecha, 2 m de altura, 0,5 m hacia la cámara
cubo.position.set(1.5, 2, -0.5)

// Una rejilla de 10 × 10 celdas: cada celda mide 1 m
const rejilla = new THREE.GridHelper(10, 10)

// Tres ejes de 3 m: X rojo, Y verde, Z azul
const ejes = new THREE.AxesHelper(3)

escena.add(cubo, rejilla, ejes)`},{tipo:`lista`,items:[`x: izquierda y derecha. Valores negativos a la izquierda del origen.`,`y: abajo y arriba. El suelo suele ser y = 0; los objetos «flotan» si y > 0.`,`z: profundidad. En la cámara por defecto, valores positivos se acercan a ti.`,`La posición es local al padre: si el objeto está dentro de un grupo, se suma a la transformación del grupo.`,`La rotación también se mide en radianes, no en grados: 180° son Math.PI.`]},{tipo:`tabla`,cabecera:[`Eje`,`Dirección`,`Color del AxesHelper`],filas:[[`X`,`Derecha`,`Rojo`],[`Y`,`Arriba`,`Verde`],[`Z`,`Hacia la cámara`,`Azul`]]},{tipo:`destacado`,tono:`truco`,texto:`Para calibrar el ojo, pon una rejilla de 1 m y un cubo de 1 m. Si el cubo ocupa exactamente una celda, ya sabes leer la escala. Si ocupa diez, tu modelo está en centímetros y vas a tener que escalarlo.`}],errores:[{sintoma:`El objeto aparece a la altura del suelo cuando querías ponerlo arriba.`,causa:`Has escrito [x, y, z] pero has puesto la altura en la tercera posición.`,arreglo:`Recuerda el orden: primero X (derecha), después Y (arriba) y por último Z (profundidad).`},{sintoma:`Un modelo importado se ve gigante o diminuto.`,causa:`El modelo está en centímetros o en pulgadas y la escena está en metros.`,arreglo:`Decide una escala antes de importar. Si el modelo viene en centímetros, aplícale scale 0.01 una sola vez en el contenedor, no a cada malla.`},{sintoma:`Mueves el objeto en X y se mueve en diagonal.`,causa:`El objeto está dentro de un grupo rotado: su posición es local, no mundial.`,arreglo:`Comprueba la rotación de los padres o usa getWorldPosition si necesitas la posición absoluta para una comparación.`}],quiz:[{tipo:`unica`,enunciado:`¿Qué eje apunta hacia arriba en la convención de three.js?`,opciones:[`X`,`Y`,`Z`,`Depende de la cámara`],correcta:1,explicacion:`En three.js el eje Y es la altura. La cámara puede mirar desde cualquier sitio, pero el sistema de coordenadas no cambia.`},{tipo:`unica`,enunciado:`¿Qué posición coloca un cubo 2 m a la derecha, 1 m sobre el suelo y 3 m hacia la cámara?`,opciones:[`[1, 2, 3]`,`[2, 1, 3]`,`[2, 3, 1]`,`[3, 1, 2]`],correcta:1,explicacion:`El orden es [x, y, z]: 2 de derecha, 1 de altura y 3 de profundidad.`},{tipo:`verdadero-falso`,enunciado:`Cambiar solo position.x de un objeto garantiza que se vea en otra posición en el siguiente fotograma.`,correcta:!1,explicacion:`La matriz se actualiza, pero la pantalla solo cambia cuando se vuelve a renderizar. En una escena estática hay que llamar a render después del cambio.`},{tipo:`multiple`,enunciado:`¿Qué afirmaciones son ciertas sobre la rejilla de la demo?`,opciones:[`Cada celda mide 1 m`,`La rejilla está en el plano XZ`,`El eje Y sale perpendicular a la rejilla`,`La rejilla dibuja los objetos por ti`],correctas:[0,1,2],explicacion:`La rejilla es una ayuda visual en el plano del suelo. No participa en el render de las mallas ni en la lógica de la escena.`}],recursos:[{titulo:`three.js Docs — Object3D`,url:`https://threejs.org/docs/#api/en/core/Object3D`,nota:`La base de todo objeto: position, rotation, scale, matriz local y mundial.`},{titulo:`three.js Docs — GridHelper`,url:`https://threejs.org/docs/#api/en/helpers/GridHelper`,nota:`El helper que usamos como regla de 1 m en las demos.`},{titulo:`three.js Docs — AxesHelper`,url:`https://threejs.org/docs/#api/en/helpers/AxesHelper`,nota:`Los tres ejes de colores y su escala.`}],ejercicio:{reto:`Conecta el deslizador de Y para que el cubo suba y baje, y comprueba que la marca del suelo se queda quieta.`,inicial:`import { useState } from 'react'
import { Canvas } from '@react-three/fiber'

export default function App() {
  const [x, setX] = useState(0)
  const [y, setY] = useState(1)
  const [z, setZ] = useState(0)

  return (
    <div style={{ height: 340, background: '#111', color: '#ddd', fontFamily: 'system-ui' }}>
      <div style={{ display: 'flex', gap: 12, padding: 8, fontSize: 12 }}>
        <label>X <input type="range" min={-3} max={3} step={0.1} value={x} onChange={(e) => setX(Number(e.target.value))} /></label>
        <label>Y <input type="range" min={0} max={3} step={0.1} value={y} onChange={(e) => setY(Number(e.target.value))} /></label>
        <label>Z <input type="range" min={-3} max={3} step={0.1} value={z} onChange={(e) => setZ(Number(e.target.value))} /></label>
        <span>posición = [{x.toFixed(1)}, {y.toFixed(1)}, {z.toFixed(1)}]</span>
      </div>

      <div style={{ height: 280 }}>
        <Canvas camera={{ position: [4, 3, 5], fov: 45 }}>
          <gridHelper args={[10, 10, '#3b4c6b', '#222a39']} />
          <axesHelper args={[3]} />

          {/* TODO: aplica la posición [x, y, z] al cubo */}
          <mesh>
            <boxGeometry args={[0.6, 0.6, 0.6]} />
            <meshBasicMaterial color="#f5a524" />
          </mesh>

          <mesh position={[x, 0.01, z]} rotation={[-Math.PI / 2, 0, 0]}>
            <ringGeometry args={[0.2, 0.26, 32]} />
            <meshBasicMaterial color="#f5a524" transparent opacity={0.7} />
          </mesh>
        </Canvas>
      </div>
    </div>
  )
}`,solucion:`import { useState } from 'react'
import { Canvas } from '@react-three/fiber'

export default function App() {
  const [x, setX] = useState(0)
  const [y, setY] = useState(1)
  const [z, setZ] = useState(0)

  return (
    <div style={{ height: 340, background: '#111', color: '#ddd', fontFamily: 'system-ui' }}>
      <div style={{ display: 'flex', gap: 12, padding: 8, fontSize: 12 }}>
        <label>X <input type="range" min={-3} max={3} step={0.1} value={x} onChange={(e) => setX(Number(e.target.value))} /></label>
        <label>Y <input type="range" min={0} max={3} step={0.1} value={y} onChange={(e) => setY(Number(e.target.value))} /></label>
        <label>Z <input type="range" min={-3} max={3} step={0.1} value={z} onChange={(e) => setZ(Number(e.target.value))} /></label>
        <span>posición = [{x.toFixed(1)}, {y.toFixed(1)}, {z.toFixed(1)}]</span>
      </div>

      <div style={{ height: 280 }}>
        <Canvas camera={{ position: [4, 3, 5], fov: 45 }}>
          <gridHelper args={[10, 10, '#3b4c6b', '#222a39']} />
          <axesHelper args={[3]} />

          <mesh position={[x, y, z]}>
            <boxGeometry args={[0.6, 0.6, 0.6]} />
            <meshBasicMaterial color="#f5a524" />
          </mesh>

          <mesh position={[x, 0.01, z]} rotation={[-Math.PI / 2, 0, 0]}>
            <ringGeometry args={[0.2, 0.26, 32]} />
            <meshBasicMaterial color="#f5a524" transparent opacity={0.7} />
          </mesh>
        </Canvas>
      </div>
    </div>
  )
}`,pistas:[`La prop position de una malla acepta un array [x, y, z].`,`La marca del suelo ya usa x y z: cópiale esa parte y añade y en el medio.`,`Si cambias y, la marca debe seguir en y = 0,01 para no desaparecer dentro de la rejilla.`]}},{id:`1.3`,modulo:1,titulo:`Vectores: posición, dirección y distancia`,objetivo:`Restar dos posiciones, normalizar el resultado y usarlo para mover un objeto hacia otro a velocidad constante.`,nivel:`intro`,minutos:45,bloques:[{tipo:`parrafo`,texto:`Un vector no es una flecha decorativa: es la forma de decir «desde aquí hasta allí». Si restas la posición del dron a la del objetivo, obtienes un vector que apunta al objetivo. Su longitud es la distancia. Si lo divides por esa longitud, obtienes una dirección de longitud 1, perfecta para multiplicar por una velocidad.`},{tipo:`demo`,id:`m1-vectores`,titulo:`Un dron, un objetivo y la flecha que los une`},{tipo:`parrafo`,texto:`La analogía útil es la de caminar: la distancia es lo que mide el camino en línea recta; la dirección es hacia dónde tienes que apuntar los pies. No necesitas saber cuánto mide el camino para saber hacia dónde ir, pero sí para saber cuándo has llegado. Por eso se calculan las dos cosas: dirección para avanzar, distancia para parar.`},{tipo:`destacado`,tono:`porque`,titulo:`Por qué normalizar antes de multiplicar`,texto:`Si multiplicas un vector de 10 m por 2 m/s, avanzas 20 m en un segundo: la velocidad dependería de lo lejos que esté el objetivo. Al normalizarlo primero, siempre avanzas 2 m por segundo. El vector larguirucho sigue diciendo la dirección; solo deja de contaminar la velocidad.`},{tipo:`codigo`,lenguaje:`ts`,titulo:`El cálculo completo del perseguidor`,codigo:`const dron = new THREE.Vector3(-2, 0.9, 1.4)
const objetivo = new THREE.Vector3(2, 1.1, -1.5)

// 1. Vector que va del dron al objetivo
const haciaObjetivo = objetivo.clone().sub(dron)

// 2. Distancia = longitud del vector
const distancia = haciaObjetivo.length()

// 3. Dirección de longitud 1
const direccion = haciaObjetivo.clone().normalize()

// 4. Avanzar a 1,4 m/s durante el delta del frame
const delta = 0.016
dron.addScaledVector(direccion, 1.4 * delta)

// 5. No pasarse del objetivo
if (dron.distanceTo(objetivo) < 0.04) {
  dron.copy(objetivo)
}`},{tipo:`lista`,items:[`Restar posiciones da un vector de desplazamiento: objetivo - posición.`,`length() devuelve la distancia euclídea, en las mismas unidades que la escena.`,`normalize() conserva la dirección y deja la longitud en 1.`,`distanceTo() es el atajo de restar y medir la longitud.`,`clone() evita mutar el vector original cuando encadenas operaciones.`]},{tipo:`destacado`,tono:`ojo`,texto:`No normalices un vector cero. Si el dron ya está en el objetivo, la dirección no existe y la división por cero te devuelve NaN. Comprueba siempre si la distancia es menor que un umbral antes de normalizar.`},{tipo:`destacado`,tono:`truco`,texto:`Para depurar un vector, dibuja sus tres componentes como líneas desde el origen. Si la flecha apunta al objetivo pero la longitud no coincide con la distancia, tienes un problema de escala; si apunta mal, tienes un problema de orden de coordenadas.`}],errores:[{sintoma:`El dron se mueve más rápido cuando el objetivo está lejos.`,causa:`Estás multiplicando el vector sin normalizar y la velocidad hereda la distancia.`,arreglo:`Normaliza el vector antes de multiplicarlo por la velocidad y por el delta.`},{sintoma:`El dron vibra alrededor del objetivo sin llegar a pararse.`,causa:`Avanza una cantidad fija por frame y se pasa del punto, luego vuelve y se vuelve a pasar.`,arreglo:`Acota el avance a la distancia restante con Math.min(velocidad * delta, distancia).`},{sintoma:`La dirección vale NaN y el objeto desaparece.`,causa:`Has normalizado un vector de longitud cero cuando el dron y el objetivo coinciden.`,arreglo:`Comprueba la distancia antes de normalizar y trata el caso de distancia casi cero como «ya he llegado».`}],quiz:[{tipo:`unica`,enunciado:`Tienes las posiciones A y B. ¿Qué vector apunta de A a B?`,opciones:[`A + B`,`B - A`,`A - B`,`B × A`],correcta:1,explicacion:`El vector de A a B es la posición final menos la inicial. Restar al revés te da la dirección contraria.`},{tipo:`unica`,enunciado:`¿Qué longitud tiene un vector normalizado?`,opciones:[`0`,`1`,`Depende de la escena`,`La distancia original`],correcta:1,explicacion:`Normalizar consiste precisamente en dividir por la longitud para quedarse con una dirección de longitud 1.`},{tipo:`verdadero-falso`,enunciado:`La distancia entre dos objetos se puede obtener con distanceTo.`,correcta:!0,explicacion:`distanceTo resta las posiciones y devuelve la longitud del vector resultante, sin que tengas que hacerlo a mano.`},{tipo:`multiple`,enunciado:`¿Qué necesitas para mover un objeto hacia otro a velocidad constante?`,opciones:[`La dirección normalizada`,`La distancia restante`,`El delta del frame`,`El ángulo de Euler del objetivo`],correctas:[0,1,2],explicacion:`Dirección, distancia y tiempo son suficientes. La orientación del objetivo no interviene en el desplazamiento.`}],recursos:[{titulo:`three.js Docs — Vector3`,url:`https://threejs.org/docs/#api/en/math/Vector3`,nota:`La clase que usarás para posiciones, direcciones y distancias.`},{titulo:`three.js Docs — Vector3.normalize`,url:`https://threejs.org/docs/#api/en/math/Vector3#normalize`,nota:`Qué hace exactamente y qué devuelve cuando el vector es cero.`},{titulo:`three.js Docs — Vector3.distanceTo`,url:`https://threejs.org/docs/#api/en/math/Vector3#distanceTo`,nota:`El atajo para medir sin construir un vector intermedio a mano.`}],ejercicio:{reto:`Acerca el dron al objetivo un 20 % de la distancia restante usando la dirección normalizada.`,inicial:`import { useState } from 'react'
import { Canvas } from '@react-three/fiber'
import * as THREE from 'three'

const OBJETIVO = new THREE.Vector3(2, 1, -1)

export default function App() {
  const [dron, setDron] = useState(() => new THREE.Vector3(-2, 0.5, 1))

  const acercar = () => {
    // TODO: dirección = (OBJETIVO - dron).normalize()
    // TODO: avanza 0.2 * distancia en esa dirección
    setDron(dron.clone())
  }

  const distancia = dron.distanceTo(OBJETIVO)

  return (
    <div style={{ height: 340, background: '#111', color: '#ddd', fontFamily: 'system-ui' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: 8, fontSize: 13 }}>
        <button onClick={acercar}>Acercar un 20 %</button>
        <button onClick={() => setDron(new THREE.Vector3(-2, 0.5, 1))}>Reiniciar</button>
        <span>distancia = {distancia.toFixed(2)} m</span>
      </div>

      <div style={{ height: 280 }}>
        <Canvas camera={{ position: [4, 3, 5], fov: 45 }}>
          <gridHelper args={[10, 10, '#3b4c6b', '#222a39']} />
          <mesh position={[dron.x, dron.y, dron.z]}>
            <octahedronGeometry args={[0.25, 0]} />
            <meshBasicMaterial color="#4d8df6" />
          </mesh>
          <mesh position={[OBJETIVO.x, OBJETIVO.y, OBJETIVO.z]}>
            <sphereGeometry args={[0.15, 16, 16]} />
            <meshBasicMaterial color="#ff5a5a" />
          </mesh>
        </Canvas>
      </div>
    </div>
  )
}`,solucion:`import { useState } from 'react'
import { Canvas } from '@react-three/fiber'
import * as THREE from 'three'

const OBJETIVO = new THREE.Vector3(2, 1, -1)

export default function App() {
  const [dron, setDron] = useState(() => new THREE.Vector3(-2, 0.5, 1))

  const acercar = () => {
    const distancia = dron.distanceTo(OBJETIVO)
    if (distancia < 0.001) return

    const direccion = OBJETIVO.clone().sub(dron).normalize()
    const siguiente = dron.clone().addScaledVector(direccion, distancia * 0.2)
    setDron(siguiente)
  }

  const distancia = dron.distanceTo(OBJETIVO)

  return (
    <div style={{ height: 340, background: '#111', color: '#ddd', fontFamily: 'system-ui' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: 8, fontSize: 13 }}>
        <button onClick={acercar}>Acercar un 20 %</button>
        <button onClick={() => setDron(new THREE.Vector3(-2, 0.5, 1))}>Reiniciar</button>
        <span>distancia = {distancia.toFixed(2)} m</span>
      </div>

      <div style={{ height: 280 }}>
        <Canvas camera={{ position: [4, 3, 5], fov: 45 }}>
          <gridHelper args={[10, 10, '#3b4c6b', '#222a39']} />
          <mesh position={[dron.x, dron.y, dron.z]}>
            <octahedronGeometry args={[0.25, 0]} />
            <meshBasicMaterial color="#4d8df6" />
          </mesh>
          <mesh position={[OBJETIVO.x, OBJETIVO.y, OBJETIVO.z]}>
            <sphereGeometry args={[0.15, 16, 16]} />
            <meshBasicMaterial color="#ff5a5a" />
          </mesh>
        </Canvas>
      </div>
    </div>
  )
}`,pistas:[`Restar dos Vector3 devuelve un Vector3 nuevo: OBJETIVO.clone().sub(dron).`,`normalize() deja la dirección en longitud 1; después multiplica por la distancia que quieras recorrer.`,`addScaledVector(direccion, cantidad) es la forma corta de sumar dirección × cantidad sin mutar la dirección.`]}}]},{numero:2,titulo:`Qué hace React Three Fiber (y qué no)`,descripcion:`R3F no es three.js con otro nombre: es un reconciliador que traduce JSX a objetos three.js. Entender esa traducción es lo que separa «copiar ejemplos» de saber qué está pasando cuando algo no aparece.`,lecciones:[{id:`2.1`,modulo:2,titulo:`El mismo cubo, dos veces`,objetivo:`Escribir la misma escena en three.js puro y en R3F, y señalar exactamente qué líneas desaparecen al usar React.`,nivel:`intro`,minutos:45,bloques:[{tipo:`parrafo`,texto:`Antes de aprender la API de React Three Fiber conviene ver el problema que resuelve. La demo de abajo dibuja el mismo cubo ámbar girando dos veces: a la izquierda con three.js a pelo, a la derecha con JSX. Mismo resultado en pantalla, dos formas de pensar distintas. Lee los dos bloques de código antes de tocar nada.`},{tipo:`demo`,id:`m2-mismo-cubo`,titulo:`Izquierda: pasos. Derecha: resultado`},{tipo:`parrafo`,texto:`En la versión de three.js tú escribes los pasos: creas el renderer, creas la cámara, añades el cubo a la escena, pides un frame, cambias la rotación, vuelves a dibujar. En la versión de R3F declaras el resultado: «quiero un cubo con esta rotación». R3F se encarga de que la escena de three.js coincida con lo que has declarado, frame a frame, sin que tú escribas el bucle.`},{tipo:`destacado`,tono:`porque`,titulo:`Por qué esto no es azúcar sintáctico`,texto:`Porque no hay una traducción de una vez: cada render de React se compara con el anterior y solo se aplican las diferencias. Si la rotación no cambia, el objeto three.js no se toca. Si añades un cubo, se crea; si lo quitas, se destruye. Eso es un reconciliador, no una plantilla de código.`},{tipo:`codigo`,lenguaje:`tsx`,titulo:`La escena mínima en R3F`,codigo:`import { Canvas } from '@react-three/fiber'

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
}`},{tipo:`lista`,items:["No hay `new THREE.Scene()`, ni `new THREE.WebGLRenderer()`, ni `requestAnimationFrame`.","Cada etiqueta (`mesh`, `boxGeometry`, `meshBasicMaterial`) corresponde a una clase de three.js.","Los argumentos del constructor van en `args`; el resto son propiedades del objeto.","El `<Canvas>` crea el renderer, la cámara por defecto y el bucle de render.",`Al desmontar el componente, R3F destruye los objetos y libera la geometría y los materiales que creó.`]},{tipo:`parrafo`,texto:"Esa última línea es la que más se agradece con el tiempo. En three.js puro, olvidar `renderer.dispose()` o `geometry.dispose()` deja memoria retenida en la GPU. En R3F ocurre solo mientras no salgas del sistema: si creas objetos a mano y los inyectas, la limpieza vuelve a ser tuya. Lo verás en la lección 2.3."},{tipo:`destacado`,tono:`ojo`,titulo:`Lo que R3F no hace`,texto:`No sabe de física, ni de cargar modelos, ni de controles de cámara, ni de animaciones complejas. No adivina tu intención: si escribes un material imposible, te dejará con la pantalla en negro. Y no sustituye a three.js; lo manipula. Cuando algo se rompe, la respuesta casi siempre está en la API de three.js, no en la de React.`}],errores:[{sintoma:`La pantalla se queda negra y no hay ningún error en consola.`,causa:"Hay un `<Canvas>` pero dentro no hay cámara válida o la escena está vacía.",arreglo:"Empieza con un `<mesh>` y un `meshBasicMaterial` de color vivo. El material básico no necesita luces: descarta dos causas de golpe."},{sintoma:'`Cannot read properties of undefined (reading "position")`.',causa:"Un componente devuelve `undefined` porque el `return` está dentro de un `if` sin `else`.",arreglo:"Devuelve siempre algo, aunque sea `null`. R3F acepta `null` como «nada»; `undefined` no."},{sintoma:`El cubo se ve, pero no gira aunque cambies el estado.`,causa:"Se está mutando un `ref` o una variable en vez de pasar la rotación como prop.",arreglo:"Si el valor cambia al pulsar, pásalo como prop (`rotation={[0, giro, 0]}`). Si cambia 60 veces por segundo, eso es el módulo 5."}],quiz:[{tipo:`unica`,enunciado:`¿Qué pieza crea R3F por ti y en three.js puro tendrías que crear a mano?`,opciones:[`La cámara, el renderer y el bucle de render`,`El DOM de la página`,`El sistema de módulos de JavaScript`,`El canvas HTML`],correcta:0,explicacion:"El `<Canvas>` monta el renderer, crea una cámara por defecto y arranca el bucle. El canvas HTML existe, pero lo crea el componente, no tú."},{tipo:`verdadero-falso`,enunciado:`En R3F cada render de React vuelve a crear todos los objetos de la escena.`,correcta:!1,explicacion:`Al contrario: el reconciliador compara con el render anterior y solo aplica diferencias. Por eso es viable tener cientos de objetos.`},{tipo:`multiple`,enunciado:`¿Qué desaparece de tu código al pasar de three.js puro a R3F?`,opciones:["La llamada a `renderer.render` en un bucle","La creación del `WebGLRenderer`",`La necesidad de pensar en coordenadas 3D`,"El `new THREE.Scene()`"],correctas:[0,1,3],explicacion:`Las coordenadas siguen siendo tuyas: R3F no adivina dónde va nada. Lo que se va es la fontanería: escena, renderer y bucle.`},{tipo:`unica`,enunciado:"¿Dónde se escribe `boxGeometry(1, 1, 1)` en JSX?",opciones:[`<boxGeometry args={[1, 1, 1]} />`,`<boxGeometry width={1} height={1} depth={1} />`,`<boxGeometry size={1} />`,`<boxGeometry geometry={[1,1,1]} />`],correcta:0,explicacion:"Los argumentos posicionales del constructor van en `args`. Las propiedades con nombre (`width`, `height`…) también existen, pero `args` es la forma general."}],recursos:[{titulo:`React Three Fiber: introducción`,url:`https://r3f.docs.pmnd.rs/getting-started/introduction`,nota:`La primera página que hay que leer, y la que explica el modelo mental en dos minutos.`},{titulo:`three.js: Creating a scene`,url:`https://threejs.org/docs/#manual/en/introduction/Creating-a-scene`,nota:`La versión imperativa de lo mismo. Comparar ambas es el objetivo de esta lección.`},{titulo:`React: render and commit`,url:`https://react.dev/learn/render-and-commit`,nota:`Qué significa «renderizar» en React, que es distinto de «dibujar» en WebGL.`}],ejercicio:{reto:`Haz que el cubo cambie de color entre dos tonos cada vez que pulses un botón, sin tocar su rotación.`,inicial:`import { useState } from 'react'
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
}`,solucion:`import { useState } from 'react'
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
}`,pistas:["El color ya está en una variable: solo hay que calcularla a partir de `n`.","`n % 2 === 0` distingue pares de impares.",`No toques la rotación: si no la cambias, R3F no la reaplica y eso es exactamente lo que quieres.`]}},{id:`2.2`,modulo:2,titulo:`Qué hace R3F por ti`,objetivo:`Leer un árbol de JSX y predecir el grafo de objetos three.js que va a generar, incluyendo qué se convierte en hijo y qué se «attacha».`,nivel:`medio`,minutos:45,bloques:[{tipo:`parrafo`,texto:"Aquí está el detalle que más confunde al principio: en JSX, `<boxGeometry>` y `<meshBasicMaterial>` parecen hijos del `<mesh>`, pero no lo son. R3F los detecta, los crea y los «attacha» como propiedades del objeto padre. La demo escribe JSX de verdad y lee la escena resultante con `useThree`, así que lo que ves abajo es el árbol real, no una ilustración."},{tipo:`demo`,id:`m2-inspector`,titulo:`Del JSX al árbol de three.js`},{tipo:`parrafo`,texto:"Prueba las tres opciones del selector. Con un solo cubo el árbol es mínimo. Con un grupo aparece la jerarquía real: un `Group` con dos `Mesh` dentro. Con nombres verás que `name` pasa tal cual al objeto, que es lo que después te permite buscar una pieza con `getObjectByName`."},{tipo:`tabla`,cabecera:[`En JSX`,`Se convierte en`,`Relación con el padre`],filas:[[`<mesh>`,`THREE.Mesh`,"Hijo verdadero (va a `children`)"],[`<boxGeometry>`,`THREE.BoxGeometry`,"Attach: se asigna a `mesh.geometry`"],[`<meshBasicMaterial>`,`THREE.MeshBasicMaterial`,"Attach: se asigna a `mesh.material`"],[`<group>`,`THREE.Group`,`Hijo verdadero`],[`<primitive object={x}>`,"El objeto `x` tal cual",`Hijo verdadero, sin crearse`]]},{tipo:`destacado`,tono:`porque`,titulo:"Por qué `attach` y no `children`",texto:`Porque en three.js la geometría y el material no son parte del grafo de escena: son propiedades de la malla. Si fueran hijos, el renderer intentaría dibujarlas y habría que recorrer el árbol para encontrar la geometría de cada objeto. R3F respeta esa estructura en lugar de inventarse otra.`},{tipo:`codigo`,lenguaje:`tsx`,titulo:`Un grupo con dos mallas y nombres`,codigo:`<group name="constelacion" rotation={[0, 0.6, 0]}>
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
//     Mesh «satelite»`},{tipo:`destacado`,tono:`truco`,titulo:"`args` frente a propiedades",texto:"`args` es la lista de argumentos del constructor y solo se aplica al crear el objeto. Cambiar `args` reconstruye la geometría entera. Cualquier otra prop (`position`, `color`, `intensity`) se asigna a la propiedad. Por eso `args={[1, 1, 1]}` se escribe con corchetes: es un array, no tres props."},{tipo:`lista`,items:["`className` y `style` no existen dentro del `<Canvas>`: no hay DOM que estilizar.","Las props con guion (`rotation-y={0.4}`) son atajo de una componente del array (`rotation={[0, 0.4, 0]}`).","Una prop que no existe en la clase se asigna igual: three.js no valida. Si escribes `colour`, no pasa nada y no se ve nada.","Puedes usar cualquier objeto de three.js, incluidos los de `three/examples/jsm`, con `<primitive>`.","Los objetos con `dispose()` reciben una limpieza automática solo si los creó R3F."]}],errores:[{sintoma:'`<mesh color="red">` no colorea nada.',causa:"`color` no es una propiedad de `Mesh`: pertenece al material.",arreglo:'Ponlo en el material: `<meshBasicMaterial color="red" />`.'},{sintoma:"`rotation={90}` deja el objeto en una orientación rara.",causa:`En R3F una rotación es un array de radianes, no un número de grados.`,arreglo:"`rotation={[0, Math.PI / 2, 0]}`. Si trabajas en grados, `THREE.MathUtils.degToRad(90)`."},{sintoma:`La geometría se reconstruye en cada render y bajan los FPS.`,causa:"Estás pasando un array nuevo a `args` en cada render, o creando geometría en el cuerpo del componente.",arreglo:"`args` con valores literales es estable. Si el array viene de estado, memorízalo con `useMemo`."}],quiz:[{tipo:`unica`,enunciado:"¿Qué hace R3F con `<boxGeometry args={[1, 2, 3]} />` dentro de un `<mesh>`?",opciones:["Crea la geometría y la asigna a `mesh.geometry`","La añade como hija del mesh en `children`",`La guarda en un array global de geometrías`,`La dibuja aparte, como una segunda malla`],correcta:0,explicacion:`Es un attach: la geometría es una propiedad de la malla, no un nodo del grafo de escena.`},{tipo:`verdadero-falso`,enunciado:"Se puede usar `className` en un `<mesh>` para darle estilos.",correcta:!1,explicacion:`Dentro del canvas no hay DOM. El aspecto se controla con materiales y propiedades de three.js.`},{tipo:`multiple`,enunciado:"¿Qué props de estas son equivalentes a `rotation={[0, 0.5, 0]}`?",opciones:[`rotation-y={0.5}`,`rotateY={0.5}`,`rotation={[0, 0.5]}`,`rotationY={0.5}`],correctas:[0],explicacion:"Solo la forma con guion (`rotation-y`) es un atajo válido de R3F. Las demás son props inventadas que three.js aceptará en silencio sin hacer nada."},{tipo:`unica`,enunciado:"¿Cuándo se aplica `args`?",opciones:[`Al crear el objeto; cambiarlo lo reconstruye`,`En cada frame`,`Solo al desmontar`,`Solo la primera vez, nunca más`],correcta:0,explicacion:"`args` alimenta el constructor. Si cambia, R3F crea un objeto nuevo y destruye el anterior."}],recursos:[{titulo:`R3F: objects, properties and args`,url:`https://r3f.docs.pmnd.rs/api/objects`,nota:"La referencia de `args`, `attach` y las props con guion."},{titulo:`three.js: Object3D`,url:`https://threejs.org/docs/#api/en/core/Object3D`,nota:"`children`, `name`, `position`: lo que R3F está rellenando por ti."},{titulo:`three.js: Mesh`,url:`https://threejs.org/docs/#api/en/objects/Mesh`,nota:"Comprueba que `geometry` y `material` son propiedades, no hijos."}],ejercicio:{reto:"Construye un grupo llamado «estacion» con un núcleo y tres satélites, y comprueba con `getObjectByName` que los nombres existen.",inicial:`import { Canvas } from '@react-three/fiber'

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
}`,solucion:`import { Canvas, useThree } from '@react-three/fiber'
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
}`,pistas:["Dentro de JSX puedes usar `map` como en cualquier lista de React; la `key` es obligatoria.","Los nombres se construyen con plantilla: `satelite-${i + 1}`.","Para comprobar el árbol, `useThree((estado) => estado.scene)` y `getObjectByName`."]}},{id:`2.3`,modulo:2,titulo:`Cuándo bajar a three.js puro`,objetivo:"Inyectar objetos three.js creados a mano con `<primitive>` y asumir su ciclo de vida, incluida la liberación de memoria.",nivel:`medio`,minutos:30,bloques:[{tipo:`parrafo`,texto:"R3F cubre el 95 % de los casos. El 5 % restante es real: una librería que solo devuelve objetos three.js, un algoritmo que crea miles de vértices, un objeto compuesto que ya existe y no quieres reescribir. Para eso está `<primitive>`."},{tipo:`demo`,id:`m2-primitive`,titulo:`Un grupo creado a mano, inyectado en la escena`},{tipo:`parrafo`,texto:"La demo construye una hélice de 36 esferas y una línea con `new THREE.Mesh(...)`, `new THREE.SphereGeometry(...)` y `new THREE.Line(...)`. Nada de JSX en esa función: es three.js puro, como el que encontrarías en un ejemplo de 2017. Después la inyecta con `<primitive object={grupo} />` y R3F la coloca en el grafo sin recrearla."},{tipo:`codigo`,lenguaje:`tsx`,titulo:`El patrón completo, con su limpieza`,codigo:`function crearHelice() {
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
}`},{tipo:`destacado`,tono:`ojo`,titulo:`La regla de propiedad`,texto:"Quien crea, libera. Lo que monta R3F con JSX lo limpia R3F. Lo que creas tú y pasas por `primitive` lo limpias tú, y a mano. Si no, cada montaje deja geometrías colgadas en la GPU hasta que se cierra la pestaña. En una demo no se nota; en una aplicación con navegación sí."},{tipo:`tabla`,cabecera:[`Situación`,`¿Merece la pena bajar a three.js?`,`Por qué`],filas:[[`Una malla con geometría y material`,`No`,`JSX lo describe en tres líneas`],["Una librería que devuelve un `Object3D`",`Sí`,`No hay versión JSX que reescribir`],["Un `InstancedMesh` con 10 000 elementos",`Sí`,`Se configura mejor de forma imperativa`],["Un objeto de `three/examples/jsm`","Sí, con `primitive`",`No existe como etiqueta JSX`],[`Un shader propio`,`No`,"`shaderMaterial` es JSX normal (módulo 11)"]]},{tipo:`lista`,items:["`<primitive>` acepta un `object`, no un componente.","Cambiar de `object` desmonta el anterior y monta el nuevo: no se fusionan.","Puedes seguir añadiendo hijos JSX dentro de `<primitive>`; se cuelgan del objeto inyectado.",`Si el objeto viene de fuera y se comparte, no lo liberes: lo hará su dueño.`,"El estado que cambia a 60 fps conviene mutarlo en `useFrame` (módulo 5), no con `setState`."]}],errores:[{sintoma:`El objeto cambia de identidad en cada render y la escena parpadea.`,causa:`La función que crea el objeto se llama en el cuerpo del componente.`,arreglo:"Envuélvela en `useMemo` con un array de dependencias vacío, o crea el objeto fuera del componente si es estático."},{sintoma:`Tras navegar varias veces, el contexto WebGL se pierde.`,causa:`Las geometrías y materiales creados a mano nunca se liberan.`,arreglo:"Recorre el grupo en el `return` del `useEffect` y llama a `dispose()` en cada geometría y material, sin duplicarlos (usa un `Set`)."},{sintoma:"`primitive` con un array de objetos lanza un error.",causa:"`object` espera un solo `Object3D`.",arreglo:"Inyecta un `<group>` que los contenga, o mapea y crea un `<primitive>` por elemento con su `key`."}],quiz:[{tipo:`unica`,enunciado:"¿Quién libera la memoria de un objeto creado con `new THREE.Mesh(...)` e inyectado con `<primitive>`?",opciones:["Tú, en un `useEffect` de limpieza",`R3F automáticamente`,`El recolector de basura de JavaScript`,`El renderer, al cerrar la pestaña`],correcta:0,explicacion:"R3F solo libera lo que ha creado él. Los recursos de GPU no los recoge el recolector de basura: hay que llamar a `dispose()`."},{tipo:`verdadero-falso`,enunciado:"Dentro de `<primitive>` se pueden seguir escribiendo hijos en JSX.",correcta:!0,explicacion:`Sí: se cuelgan del objeto inyectado. Es útil para añadir luces o ayudantes a un grupo que ya existía.`},{tipo:`multiple`,enunciado:`¿Qué casos justifican bajar a three.js puro?`,opciones:["Una librería de terceros que devuelve un `Object3D`","Un `InstancedMesh` con miles de instancias",`Un cubo con un color`,"Un objeto de `three/examples/jsm` sin equivalente JSX"],correctas:[0,1,3],explicacion:`Un cubo con color es exactamente el caso en el que JSX gana: una línea frente a cinco.`},{tipo:`unica`,enunciado:"¿Qué pasa si `object` cambia por un objeto distinto en un render?",opciones:[`Se desmonta el anterior y se monta el nuevo`,`Se fusionan ambos en un grupo`,`R3F lanza un error`,`Se reutiliza el anterior ignorando el nuevo`],correcta:0,explicacion:"`primitive` no reconcilia el interior del objeto: cambia la referencia completa. Por eso el objeto debe ser estable."}],recursos:[{titulo:`R3F: primitive`,url:`https://r3f.docs.pmnd.rs/api/objects#putting-already-existing-objects-into-the-scene-graph`,nota:`La documentación oficial del caso y sus advertencias.`},{titulo:`three.js: How to dispose of objects`,url:`https://threejs.org/docs/#manual/en/introduction/How-to-dispose-of-objects`,nota:`Qué hay que liberar exactamente y por qué el recolector de basura no basta.`},{titulo:`React: useMemo`,url:`https://react.dev/reference/react/useMemo`,nota:`Cuándo memorizar de verdad y cuándo es ruido.`}],ejercicio:{reto:"Crea un anillo de 24 cajas con three.js puro, inyéctalo con `<primitive>` y libera sus recursos al desmontar.",inicial:`import { useEffect, useMemo } from 'react'
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
}`,solucion:`import { useEffect, useMemo } from 'react'
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
}`,pistas:["Un bucle de 24 con ángulo `(i / 24) * Math.PI * 2`.",`Comparte la misma geometría y el mismo material: 24 mallas, dos recursos.`,"Al liberar, usa un `Set` para no llamar 24 veces a `dispose()` sobre el mismo objeto."]}}]},{numero:3,titulo:`El lienzo, las mallas y los materiales`,descripcion:`Las tres piezas con las que se construye cualquier escena: un canvas que sabe adaptarse, mallas que unen forma y superficie, y materiales que deciden cómo responde esa superficie a la luz.`,lecciones:[{id:`3.1`,modulo:3,titulo:"`<Canvas>`: el componente que lo cambia todo",objetivo:"Configurar un `<Canvas>` con `dpr`, `camera`, `shadows` y `gl`, y explicar qué cuesta cada una de esas decisiones.",nivel:`intro`,minutos:45,bloques:[{tipo:`parrafo`,texto:"El `<Canvas>` parece una etiqueta más, pero es el componente que hace posible todo lo demás. Cuando se monta, crea un `WebGLRenderer`, un canvas HTML, una cámara por defecto, un `ResizeObserver` y el bucle de render. Tú no ves nada de eso: solo escribes hijos. Entender qué configura cada prop es la diferencia entre una demo que va fina y una que calienta el portátil."},{tipo:`demo`,id:`m3-canvas-dpr`,titulo:"Cambia `dpr` y `frameloop` y mira el contador"},{tipo:`parrafo`,texto:"`dpr` es la densidad de píxeles: cuántos píxeles reales se dibujan por cada píxel CSS. Con `dpr={1}` un lienzo de 800×400 usa 320 000 píxeles; con `dpr={2}` usa 1 280 000. El cuádruple de fragmentos para exactamente la misma imagen, solo más nítida. En pantallas retina se nota; en una tele a dos metros, no."},{tipo:`codigo`,lenguaje:`tsx`,titulo:`Las props que de verdad se usan`,codigo:`<Canvas
  dpr={[1, 2]}                       // mínimo 1, máximo 2 (acotado por el dispositivo)
  camera={{ position: [3, 2.4, 4], fov: 45, near: 0.1, far: 100 }}
  shadows                            // activa el shadow map del renderer
  gl={{ antialias: true, alpha: true }}
  frameloop="always"                 // 'always' | 'demand' | 'never'
  onCreated={({ camera }) => camera.lookAt(0, 0, 0)}
>
  <Escena />
</Canvas>`},{tipo:`tabla`,cabecera:[`Prop`,`Qué configura`,`Coste o efecto`],filas:[["`dpr`",`Píxeles reales por píxel CSS`,`Cuadrático: 2 duplica la nitidez y cuadruplica los fragmentos`],["`camera`",`Cámara por defecto`,"Ninguno; pero `fov` cambia toda la composición"],["`shadows`",`Shadow map del renderer`,`Cada luz con sombra añade una pasada de render`],["`gl`","Opciones del `WebGLRenderer`","`antialias` mejora bordes y cuesta memoria"],["`frameloop`",`Cuándo se dibuja`,"`demand` ahorra batería; `always` anima sin pensar"]]},{tipo:`destacado`,tono:`porque`,titulo:"Por qué `dpr={[1, 2]}` y no `dpr={2}`",texto:"Porque un móvil de gama media con `dpr` 3 no puede con 9 veces los píxeles. El array fija un rango: R3F toma el `devicePixelRatio` real y lo recorta. Así la escena se ve nítida donde hay margen y no se hunde donde no lo hay."},{tipo:`destacado`,tono:`ojo`,titulo:`Una cosa que aún no toca`,texto:"En la demo y en el contador aparece `useFrame`, que es el hook del módulo 5. Aquí solo hace dos cosas: girar el cubo un paso y contar frames dibujados cada medio segundo. No hace falta entenderlo todavía; basta con saber que ejecuta código una vez por frame."},{tipo:`lista`,items:[`El canvas necesita altura: si el contenedor mide 0 px, no se ve nada y no hay error.`,"`camera.fov` es el ángulo vertical en grados. Menos fov, más teleobjetivo.",'Con `frameloop="demand"` hay que pedir los frames; el módulo 5 lo explica a fondo.','`gl={{ powerPreference: "high-performance" }}` ayuda en portátiles con dos GPUs.',"No cambies `dpr` en cada frame: cada cambio reasigna el búfer de dibujo."]}],errores:[{sintoma:`La demo se ve pero ocupa una franja de 150 px o nada en absoluto.`,causa:`El canvas hereda la altura de su contenedor, y el contenedor no tiene altura definida.`,arreglo:"Da altura explícita al contenedor (por ejemplo `height: 340`) o usa una clase con altura."},{sintoma:`En un móvil el canvas va a tirones y el ventilador del portátil se dispara.`,causa:"`dpr` sin acotar: un dispositivo con densidad 3 dibuja nueve veces más píxeles.",arreglo:"`dpr={[1, 2]}`, o incluso `[1, 1.5]` en escenas con postprocesado."},{sintoma:`La escena aparece en negro hasta que redimensionas la ventana.`,causa:"El canvas se montó con tamaño 0 (por ejemplo, dentro de un contenedor oculto con `display: none`).",arreglo:"Móntalo cuando el contenedor tenga tamaño, o fuerza un `resize` después de mostrarlo."}],quiz:[{tipo:`unica`,enunciado:"¿Qué crea `<Canvas>` además del contexto WebGL?",opciones:[`El canvas HTML, una cámara por defecto, un observador de tamaño y el bucle de render`,`Solo el canvas HTML`,`Una escena con una luz y un cubo de ejemplo`,`Un servidor de desarrollo`],correcta:0,explicacion:`Es un componente de fontanería: renderer, cámara, resize y bucle. La escena la pones tú.`},{tipo:`verdadero-falso`,enunciado:"Pasar de `dpr={1}` a `dpr={2}` duplica el número de píxeles que se sombrean.",correcta:!1,explicacion:`Lo cuadruplica: el ancho y el alto se multiplican por dos, y el área por cuatro.`},{tipo:`multiple`,enunciado:"¿Qué props de estas pertenecen a `<Canvas>`?",opciones:["`dpr`","`camera`","`geometry`","`frameloop`"],correctas:[0,1,3],explicacion:"`geometry` es de `<mesh>`; no tiene sentido en el lienzo."},{tipo:`unica`,enunciado:'¿Cuándo conviene `frameloop="demand"`?',opciones:[`En un visor quieto que solo cambia al interactuar`,`En un juego con animación continua`,`Cuando no hay luces`,`Cuando el canvas es pequeño`],correcta:0,explicacion:`Si no hay movimiento continuo, dibujar sesenta veces por segundo la misma imagen es gasto puro.`}],recursos:[{titulo:`R3F: Canvas`,url:`https://r3f.docs.pmnd.rs/api/canvas`,nota:"Todas las props, incluidos `dpr`, `gl` y `frameloop`."},{titulo:`R3F: scaling performance`,url:`https://r3f.docs.pmnd.rs/advanced/scaling-performance`,nota:"Qué hacer cuando la escena empieza a ir lenta. `dpr` es el primer botón."},{titulo:`three.js: WebGLRenderer`,url:`https://threejs.org/docs/#api/en/renderers/WebGLRenderer`,nota:"El objeto que hay debajo; `setPixelRatio` y `setSize` son sus métodos."}],ejercicio:{reto:"Añade un selector de densidad al canvas: un botón que alterne entre `dpr={1}` y `dpr={2}`, y una cámara con `fov` 35.",inicial:`import { useState } from 'react'
import { Canvas } from '@react-three/fiber'

export default function App() {
  const [nitido, setNitido] = useState(false)

  return (
    <div style={{ height: 320 }}>
      <button onClick={() => setNitido(!nitido)}>Alternar densidad</button>
      <Canvas camera={{ position: [2.6, 2, 3.6] }} frameloop="always">
        <ambientLight intensity={0.5} />
        <directionalLight position={[3, 4, 2]} intensity={2} />
        <mesh rotation={[0.4, 0.7, 0]}>
          <boxGeometry args={[1.2, 1.2, 1.2]} />
          <meshStandardMaterial color="#f5a524" />
        </mesh>
      </Canvas>
    </div>
  )
}`,solucion:`import { useState } from 'react'
import { Canvas } from '@react-three/fiber'

export default function App() {
  const [nitido, setNitido] = useState(false)

  return (
    <div style={{ height: 320 }}>
      <button onClick={() => setNitido(!nitido)}>Alternar densidad</button>
      <Canvas
        dpr={nitido ? 2 : 1}
        camera={{ position: [2.6, 2, 3.6], fov: 35 }}
        frameloop="always"
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[3, 4, 2]} intensity={2} />
        <mesh rotation={[0.4, 0.7, 0]}>
          <boxGeometry args={[1.2, 1.2, 1.2]} />
          <meshStandardMaterial color="#f5a524" />
        </mesh>
      </Canvas>
    </div>
  )
}`,pistas:["`dpr` puede ser un número o un rango `[min, max]`.","`camera` acepta `position`, `fov`, `near` y `far`.",`Si el cubo se ve muy grande con fov 35, es normal: el teleobjetivo comprime la perspectiva.`]}},{id:`3.2`,modulo:3,titulo:`Mallas: geometría + material`,objetivo:`Explicar qué es una malla, qué aporta cada uno de sus dos objetos y cuándo conviene compartirlos entre varias mallas.`,nivel:`intro`,minutos:50,bloques:[{tipo:`parrafo`,texto:"Una malla es la unión de dos objetos que no se conocen entre sí: una geometría, que solo describe puntos y caras en el espacio local, y un material, que solo describe cómo responde una superficie a la luz. El `<mesh>` los junta y añade la transformación (posición, rotación, escala). Si te falta uno de los dos, no se dibuja nada."},{tipo:`demo`,id:`m3-geo-material`,titulo:`Dos selectores, una sola malla`},{tipo:`parrafo`,texto:"Prueba todas las combinaciones. La geometría decide la silueta y el número de triángulos; el material decide el color, el brillo y si la luz le afecta. Con el mismo material, el toro y la caja se ven radicalmente distintos; con la misma geometría, `basic` y `standard` también. Son dos ejes independientes, y por eso se eligen por separado."},{tipo:`codigo`,lenguaje:`tsx`,titulo:`Anatomía de una malla`,codigo:`<mesh
  position={[0, 1, 0]}          // dónde está
  rotation={[0, Math.PI / 4, 0]} // cómo está girada (radianes)
  scale={[1, 1.4, 1]}            // cuánto mide
  castShadow
>
  <boxGeometry args={[1, 1, 1]} />              {/* la forma */}
  <meshStandardMaterial                         {/* la superficie */}
    color="#f5a524"
    roughness={0.35}
    metalness={0.2}
  />
</mesh>`},{tipo:`tabla`,cabecera:[`Pregunta`,`La responde la geometría`,`La responde el material`],filas:[[`¿Qué forma tiene?`,`Sí`,`No`],[`¿De qué color es?`,`No`,`Sí`],[`¿Cuántos triángulos cuesta?`,`Sí`,`No`],[`¿Brilla o es mate?`,`No`,`Sí`],[`¿Se puede reutilizar en otra malla?`,`Sí`,`Sí`]]},{tipo:`destacado`,tono:`truco`,titulo:`Compartir no es copiar`,texto:"Si creas veinte cajas con la misma geometría y el mismo material, en la GPU hay un solo búfer y un solo programa de shader: veinte transformaciones distintas. En R3F basta con guardar la geometría en una constante fuera del componente. Lo que no puedes compartir es la textura con distinto `repeat`; eso se clona."},{tipo:`lista`,items:["Sin `<mesh>` no hay nada que dibujar, aunque tengas geometría y material.","`args` de la geometría alimenta el constructor y solo se lee al crearla.",`Un material puede ir en varias mallas; un color cambiado en uno se ve en todas.`,'Los nombres (`name="pieza"`) no cambian el dibujo, pero permiten encontrarlas después.']}],errores:[{sintoma:`Aparece un aviso de que el objeto no tiene geometría o material y no se ve nada.`,causa:"Se olvidó uno de los dos hijos del `<mesh>`.",arreglo:"Todo `<mesh>` necesita `<…Geometry />` y `<…Material />`."},{sintoma:`Cambiar el color de una malla cambia también el de otras cinco.`,causa:`El material es el mismo objeto compartido.`,arreglo:"Crea un material por malla, o clónalo (`material.clone()`) antes de modificarlo."},{sintoma:`El objeto se ve, pero siempre del mismo color aunque muevas las luces.`,causa:"El material es `meshBasicMaterial`, que no calcula iluminación.",arreglo:"Cambia a `meshStandardMaterial`; si no hay luces, añade al menos una ambiental."}],quiz:[{tipo:`unica`,enunciado:`¿Qué dos objetos forman una malla?`,opciones:[`Geometría y material`,`Cámara y luz`,`Escena y renderer`,`Textura y shader`],correcta:0,explicacion:`La geometría aporta la forma; el material, la superficie.`},{tipo:`verdadero-falso`,enunciado:`Dos mallas pueden compartir la misma geometría y el mismo material.`,correcta:!0,explicacion:`Es lo habitual: se reutilizan los búferes y cambia solo la transformación de cada malla.`},{tipo:`multiple`,enunciado:`¿Qué decide el material?`,opciones:[`El color`,`El brillo`,`El número de triángulos`,`Si la luz le afecta`],correctas:[0,1,3],explicacion:`El número de triángulos es cosa de la geometría.`},{tipo:`unica`,enunciado:`¿Dónde va la rotación de una malla?`,opciones:["En el propio `<mesh>`, en radianes",`En la geometría`,`En el material`,"En el `<Canvas>`"],correcta:0,explicacion:"La transformación vive en el `Object3D`. La geometría no sabe dónde está colocada."}],recursos:[{titulo:`three.js: Mesh`,url:`https://threejs.org/docs/#api/en/objects/Mesh`,nota:`La clase que une geometría y material.`},{titulo:`three.js: BufferGeometry`,url:`https://threejs.org/docs/#api/en/core/BufferGeometry`,nota:`Cómo se guardan vértices e índices, y por qué se comparten tan bien.`},{titulo:`R3F: objects and properties`,url:`https://r3f.docs.pmnd.rs/api/objects`,nota:"Recordatorio de `args`, `attach` y las props de transformación."}],ejercicio:{reto:`Crea tres mallas que compartan la misma geometría y el mismo material, en tres posiciones distintas, y una cuarta que reutilice la geometría con otro material.`,inicial:`import { Canvas } from '@react-three/fiber'

export default function App() {
  return (
    <div style={{ height: 320 }}>
      <Canvas camera={{ position: [3, 2.4, 4] }} frameloop="always">
        <ambientLight intensity={0.5} />
        <directionalLight position={[3, 4, 2]} intensity={2} />
        {/* TODO: tres mallas con la misma geometría y material, y una cuarta con otro material */}
        <mesh>
          <boxGeometry args={[0.6, 0.6, 0.6]} />
          <meshStandardMaterial color="#4d8df6" />
        </mesh>
      </Canvas>
    </div>
  )
}`,solucion:`import { Canvas } from '@react-three/fiber'

export default function App() {
  return (
    <div style={{ height: 320 }}>
      <Canvas camera={{ position: [3, 2.4, 4] }} frameloop="always">
        <ambientLight intensity={0.5} />
        <directionalLight position={[3, 4, 2]} intensity={2} />

        {/* Mismo aspecto: misma geometría y mismo material. */}
        <mesh position={[-0.9, 0, 0]}>
          <boxGeometry args={[0.6, 0.6, 0.6]} />
          <meshStandardMaterial color="#4d8df6" />
        </mesh>
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[0.6, 0.6, 0.6]} />
          <meshStandardMaterial color="#4d8df6" />
        </mesh>
        <mesh position={[0.9, 0, 0]}>
          <boxGeometry args={[0.6, 0.6, 0.6]} />
          <meshStandardMaterial color="#4d8df6" />
        </mesh>

        {/* Misma forma, otra superficie. */}
        <mesh position={[0, 0, -1.1]}>
          <boxGeometry args={[0.6, 0.6, 0.6]} />
          <meshStandardMaterial color="#f5a524" roughness={0.15} metalness={0.7} />
        </mesh>
      </Canvas>
    </div>
  )
}`,pistas:["Repite el bloque `<mesh>` cambiando solo `position`.",`En JSX no hay forma de «reutilizar» un bloque sin crear un componente: extrae uno si te molesta repetir.`,`La cuarta malla cambia el color y el metalness, no la geometría.`]}},{id:`3.3`,modulo:3,titulo:`Geometrías y su coste`,objetivo:`Elegir el número de segmentos de una geometría en función de lo que se va a ver, midiendo triángulos en lugar de adivinando.`,nivel:`intro`,minutos:45,bloques:[{tipo:`parrafo`,texto:`Una esfera no existe: es una aproximación hecha de trozos planos. Cuantos más segmentos, más redonda se ve y más triángulos hay que transformar y sombrear. El presupuesto es finito y se reparte: 3 000 triángulos para un objeto que ocupa media pantalla es razonable; para una taza en una estantería del fondo, es tirar recursos.`},{tipo:`demo`,id:`m3-triangulos`,titulo:`Sube los segmentos y lee la cuenta exacta`},{tipo:`parrafo`,texto:"El contador no es una estimación: sale de `geometry.index.count / 3`, el número de índices de la geometría dividido entre tres. Activa el modo alambre para ver de dónde salen: cada cuadrilátero son dos triángulos y los polos cierran en abanico. Con 48 segmentos y 24 anillos, la esfera ronda los 3 000 triángulos."},{tipo:`codigo`,lenguaje:`tsx`,titulo:`Contar triángulos de verdad`,codigo:`function Contador({ malla }: { malla: THREE.Mesh }) {
  const indice = malla.geometry.index
  // Cada triángulo gasta tres índices.
  const triangulos = indice ? indice.count / 3 : 0
  console.log(triangulos)
}

// Lo mismo para cualquiera de estas geometrías:
<sphereGeometry args={[1, 32, 16]} />
<torusGeometry args={[0.7, 0.3, 16, 64]} />
<cylinderGeometry args={[0.5, 0.5, 1, 24]} />
<icosahedronGeometry args={[1, 2]} />   // el 2 son subdivisiones, no segmentos`},{tipo:`tabla`,cabecera:[`Geometría`,`Triángulos con los valores de la demo`,`Para qué sirve`],filas:[["`planeGeometry`",`2`,`Suelos, paredes, carteles`],["`boxGeometry`",`12`,`Casi todo lo que parece una caja`],["`cylinderGeometry` (24 lados)",`≈ 96`,`Postes, latas, columnas`],["`torusGeometry` (16×64)",`≈ 1 024`,`Anillos y ruedas`],["`sphereGeometry` (48×24)",`≈ 3 000`,`Esferas cercanas y bolas de cristal`]]},{tipo:`destacado`,tono:`porque`,titulo:`Por qué el giro no cuesta pero el detalle sí`,texto:`Los vértices se transforman una vez por frame, los triángulos se rasterizan y cada fragmento cubierto ejecuta el shader del material. Por eso el coste depende de la superficie que ocupa en pantalla y de la complejidad del material, no solo del número de caras. Una esfera de 3 000 triángulos que ocupa 600 píxeles es mucho más barata que diez de esas esferas en pantalla completa.`},{tipo:`lista`,items:[`Elige el mínimo de segmentos que no se note a la distancia real de la cámara.`,"`boxGeometry` siempre cuesta 12 triángulos: no hay razón para sustituirla por otra cosa.","`icosahedronGeometry` acepta subdivisiones (`detail`) y da esferas de triángulos más regulares.",`Los objetos que no se ven no se dibujan si están fuera del frustum, pero siguen ocupando memoria.`,`Mide con el contador, no por intuición: la diferencia entre 24 y 32 segmentos a veces es invisible.`]}],errores:[{sintoma:`La escena va lenta y hay una esfera que parece perfecta de cerca.`,causa:`Segmentos muy altos (128×128) sin necesidad; son decenas de miles de triángulos.`,arreglo:`Baja a 32×16 y comprueba si se nota a la distancia de uso.`},{sintoma:`La esfera tiene una costura visible y los polos se ven raros.`,causa:`Pocos segmentos, no un error de sombreado.`,arreglo:"Sube segmentos o cambia a `icosahedronGeometry` con `detail`, que reparte mejor."},{sintoma:"`icosahedronGeometry args={[1, 20]}` congela el navegador.",causa:`El segundo argumento son subdivisiones exponenciales, no segmentos.`,arreglo:`Usa valores entre 0 y 3; a partir de ahí el crecimiento es brutal.`}],quiz:[{tipo:`unica`,enunciado:"¿Cuántos triángulos tiene una `boxGeometry` sin subdividir?",opciones:[`12`,`6`,`24`,"Depende de `args`"],correcta:0,explicacion:`Seis caras, dos triángulos por cara: doce.`},{tipo:`verdadero-falso`,enunciado:"En `icosahedronGeometry`, el segundo argumento indica el número de segmentos.",correcta:!1,explicacion:`Indica subdivisiones: cada nivel multiplica por cuatro el número de caras.`},{tipo:`multiple`,enunciado:`¿De qué depende el coste real de una geometría?`,opciones:[`Del número de triángulos`,`De la superficie que ocupa en pantalla`,`De la complejidad del material`,`Del nombre del objeto`],correctas:[0,1,2],explicacion:`El nombre no afecta al rendimiento; es solo una etiqueta.`},{tipo:`unica`,enunciado:`¿De dónde sale el número exacto de triángulos que muestra la demo?`,opciones:["De `geometry.index.count / 3`","De `geometry.attributes.position.count`","De `renderer.info.render.calls`","De la propiedad `geometry.triangles`"],correcta:0,explicacion:`El atributo de posición da vértices, no triángulos; muchos vértices se comparten por índice.`}],recursos:[{titulo:`three.js: SphereGeometry`,url:`https://threejs.org/docs/#api/en/geometries/SphereGeometry`,nota:"Qué significan `widthSegments` y `heightSegments` exactamente."},{titulo:`three.js: BufferGeometry`,url:`https://threejs.org/docs/#api/en/core/BufferGeometry`,nota:"`index`, `attributes` y cómo se cuenta lo que hay dentro."},{titulo:`R3F: scaling performance`,url:`https://r3f.docs.pmnd.rs/advanced/scaling-performance`,nota:`Dónde mirar cuando el problema no es la geometría sino el número de objetos.`}],ejercicio:{reto:"Muestra una esfera cuyo número de segmentos cambie con un botón (8 → 16 → 32 → 64) y calcula sus triángulos sin usar `geometry.index` a mano: recórrela con una `ref`.",inicial:`import { useRef, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import type { Mesh } from 'three'

const NIVELES = [8, 16, 32, 64]

export default function App() {
  const [nivel, setNivel] = useState(0)
  const malla = useRef<Mesh>(null)
  const segmentos = NIVELES[nivel]

  return (
    <div style={{ height: 320 }}>
      <button onClick={() => setNivel((nivel + 1) % NIVELES.length)}>
        {segmentos} segmentos
      </button>
      <Canvas camera={{ position: [0, 0, 4] }} frameloop="always">
        <ambientLight intensity={0.6} />
        <directionalLight position={[3, 4, 2]} intensity={2} />
        <mesh ref={malla}>
          <sphereGeometry args={[1.1, segmentos, segmentos / 2]} />
          <meshStandardMaterial color="#4d8df6" />
        </mesh>
      </Canvas>
    </div>
  )
}`,solucion:`import { useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import type { Mesh } from 'three'

const NIVELES = [8, 16, 32, 64]

export default function App() {
  const [nivel, setNivel] = useState(0)
  const malla = useRef<Mesh>(null)
  const [triangulos, setTriangulos] = useState(0)
  const segmentos = NIVELES[nivel]

  useFrame(() => {
    const indice = malla.current?.geometry.index
    if (indice) setTriangulos(indice.count / 3)
  })

  return (
    <div style={{ height: 320 }}>
      <button onClick={() => setNivel((nivel + 1) % NIVELES.length)}>
        {segmentos} segmentos · {triangulos} triángulos
      </button>
      <Canvas camera={{ position: [0, 0, 4] }} frameloop="always">
        <ambientLight intensity={0.6} />
        <directionalLight position={[3, 4, 2]} intensity={2} />
        <mesh ref={malla}>
          <sphereGeometry args={[1.1, segmentos, segmentos / 2]} />
          <meshStandardMaterial color="#4d8df6" />
        </mesh>
      </Canvas>
    </div>
  )
}`,pistas:["El número de segmentos tiene que ser entero: `sphereGeometry` redondea por dentro, pero mejor pasa enteros.","Con `useFrame` puedes leer la geometría ya montada; aquí solo se usa como termómetro.","Si prefieres no llamar a `setState` en cada frame, guarda el valor en un `ref` y muéstralo al cambiar de nivel."]}},{id:`3.4`,modulo:3,titulo:`Materiales: basic, standard, physical`,objetivo:`Elegir la clase de material adecuada y predecir si necesitará luces para verse.`,nivel:`intro`,minutos:50,bloques:[{tipo:`parrafo`,texto:"Un material no es un color: es un pequeño programa que decide cómo se calcula cada píxel de la superficie. `meshBasicMaterial` devuelve el color tal cual, sin preguntar por las luces. `meshStandardMaterial` aplica un modelo físicamente plausible (metal-roughness) y necesita luz. `meshPhysicalMaterial` añade capas encima de ese modelo: barniz, transmisión, iridiscencia."},{tipo:`demo`,id:`m3-materiales`,titulo:`Apaga las luces y mira quién sobrevive`},{tipo:`parrafo`,texto:"Las tres esferas comparten geometría, color y luces. La de la izquierda no cambia al apagar: `basic` no consulta la iluminación. Las otras dos se quedan negras porque su color es una reflectancia, no un color de pantalla. Ese es el motivo por el que una escena «desaparece» cuando alguien cambia el material y olvida añadir luces."},{tipo:`codigo`,lenguaje:`tsx`,titulo:`El mismo color, tres comportamientos`,codigo:`// Se ve siempre igual: no necesita luces. Útil para interfaces y depuración.
<meshBasicMaterial color="#f5a524" />

// El caballo de batalla: color + rugosidad + metalicidad.
<meshStandardMaterial color="#f5a524" roughness={0.35} metalness={0.2} />

// Para cristal, barniz, tela: añade capas al modelo estándar.
<meshPhysicalMaterial
  color="#f5a524"
  roughness={0.06}
  metalness={0.3}
  clearcoat={1}
  clearcoatRoughness={0.05}
/>

// No es un color: pinta la normal como si fuera RGB. Para depurar formas.
<meshNormalMaterial />`},{tipo:`tabla`,cabecera:[`Material`,`¿Usa luces?`,`Coste`,`Cuándo usarlo`],filas:[["`meshBasicMaterial`",`No`,`Muy bajo`,`Interfaces, ayudantes, depuración`],["`meshStandardMaterial`",`Sí`,`Medio`,`Casi todo lo opaco de una escena`],["`meshPhysicalMaterial`",`Sí`,`Alto`,`Cristal, barniz, tela, burbujas`],["`meshNormalMaterial`",`No`,`Bajo`,`Comprobar geometría sin luces`],["`meshLambertMaterial`",`Sí`,`Bajo`,`Estilo plano, móviles modestos`]]},{tipo:`destacado`,tono:`porque`,titulo:"Por qué `metalness` a 1 sin entorno se ve negro",texto:`Porque un metal no tiene color difuso: refleja el entorno. Si no hay mapa de entorno ni luces que reflejar, no hay nada que devolver y la superficie queda oscura. En el módulo 4 se resuelve con un HDRI; hasta entonces, usa metalness bajo o añade luces directas.`},{tipo:`lista`,items:["`roughness` alto dispersa la luz (mate); bajo la concentra (brillante).","`metalness` a 1 desactiva el color difuso: solo refleja.","`flatShading` muestra las caras planas; es una prop del material, no de la geometría.","`transparent` y `opacity` activan mezcla y desordenan el dibujado: cuestan más de lo que parece.",`Cambiar una prop de material no reconstruye la geometría, solo actualiza un uniforme.`]}],errores:[{sintoma:"Todo negro al cambiar de `basic` a `standard`.",causa:`No hay luces en la escena.`,arreglo:"Añade `ambientLight` para lo mínimo y una `directionalLight` para el volumen."},{sintoma:`Una esfera metálica se ve gris oscura y sucia.`,causa:"`metalness={1}` sin entorno que reflejar.",arreglo:"Baja `metalness` o añade un HDRI (`<Environment>`, módulo 4)."},{sintoma:`Los objetos transparentes se ven unos a través de otros en orden raro.`,causa:`El renderer ordena los transparentes por distancia al centro, no por píxel.`,arreglo:"Reduce la transparencia, usa `alphaTest` para recortes o separa capas."}],quiz:[{tipo:`unica`,enunciado:`¿Qué material se ve igual con luces que sin ellas?`,opciones:["`meshBasicMaterial`","`meshStandardMaterial`","`meshPhysicalMaterial`","`meshLambertMaterial`"],correcta:0,explicacion:`No calcula iluminación: devuelve el color directamente.`},{tipo:`verdadero-falso`,enunciado:"`meshPhysicalMaterial` cuesta más que `meshStandardMaterial`.",correcta:!0,explicacion:`Añade capas y cálculos por fragmento: clearcoat, transmisión, sheen…`},{tipo:`multiple`,enunciado:"¿Qué props controlan el aspecto de `meshStandardMaterial`?",opciones:["`roughness`","`metalness`","`color`","`segments`"],correctas:[0,1,2],explicacion:"`segments` no existe: la forma la decide la geometría."},{tipo:`unica`,enunciado:"¿Qué pasa si pones `metalness={1}` sin entorno ni luces?",opciones:[`Se ve casi negro`,`Se ve blanco`,`Se ve el color difuso`,`three.js lanza un error`],correcta:0,explicacion:`Un metal sin nada que reflejar no devuelve luz.`}],recursos:[{titulo:`three.js: MeshStandardMaterial`,url:`https://threejs.org/docs/#api/en/materials/MeshStandardMaterial`,nota:`La lista completa de props y qué significa cada una.`},{titulo:`three.js: MeshPhysicalMaterial`,url:`https://threejs.org/docs/#api/en/materials/MeshPhysicalMaterial`,nota:`Clearcoat, transmission, sheen, iridescence: qué añade y a qué precio.`},{titulo:`three.js: material gallery`,url:`https://threejs.org/examples/?q=material`,nota:`Ejemplos oficiales para comparar materiales en vivo.`}],ejercicio:{reto:"Ten dos esferas con el mismo color: una `basic` y otra `standard`. Añade un botón que apague y encienda todas las luces, y explica en un comentario qué esperabas ver.",inicial:`import { useState } from 'react'
import { Canvas } from '@react-three/fiber'

export default function App() {
  const [luces, setLuces] = useState(true)

  return (
    <div style={{ height: 320 }}>
      <button onClick={() => setLuces(!luces)}>Luces: {luces ? 'on' : 'off'}</button>
      <Canvas camera={{ position: [0, 0, 4.5] }} frameloop="always">
        {luces && <ambientLight intensity={0.4} />}
        {luces && <directionalLight position={[3, 4, 2]} intensity={2} />}

        <mesh position={[-0.9, 0, 0]}>
          <sphereGeometry args={[0.75, 32, 24]} />
          <meshBasicMaterial color="#f5a524" />
        </mesh>

        <mesh position={[0.9, 0, 0]}>
          <sphereGeometry args={[0.75, 32, 24]} />
          {/* TODO: cambia a un material que sí use la luz */}
          <meshBasicMaterial color="#f5a524" />
        </mesh>
      </Canvas>
    </div>
  )
}`,solucion:`import { useState } from 'react'
import { Canvas } from '@react-three/fiber'

export default function App() {
  const [luces, setLuces] = useState(true)

  return (
    <div style={{ height: 320 }}>
      <button onClick={() => setLuces(!luces)}>Luces: {luces ? 'on' : 'off'}</button>
      <Canvas camera={{ position: [0, 0, 4.5] }} frameloop="always">
        {luces && <ambientLight intensity={0.4} />}
        {luces && <directionalLight position={[3, 4, 2]} intensity={2} />}

        {/* basic: se ve siempre igual */}
        <mesh position={[-0.9, 0, 0]}>
          <sphereGeometry args={[0.75, 32, 24]} />
          <meshBasicMaterial color="#f5a524" />
        </mesh>

        {/* standard: sin luces se queda negra */}
        <mesh position={[0.9, 0, 0]}>
          <sphereGeometry args={[0.75, 32, 24]} />
          <meshStandardMaterial color="#f5a524" roughness={0.4} metalness={0.1} />
        </mesh>
      </Canvas>
    </div>
  )
}`,pistas:[`Sustituye solo el material de la segunda esfera.`,"Las luces condicionales con `{luces && …}` se desmontan de verdad: no basta con intensidad 0.",`La ambiental evita que la escena quede completamente negra antes de añadir la direccional.`]}},{id:`3.5`,modulo:3,titulo:`Checkpoint: tu primera escena`,objetivo:`Componer una escena propia con cinco objetos, jerarquía y tres clases de material, y verificarla contra una referencia.`,nivel:`intro`,minutos:50,bloques:[{tipo:`parrafo`,texto:`Ya tienes las tres piezas: lienzo, mallas y materiales. El checkpoint no añade conceptos nuevos; pide montarlos juntos sin copiar. La escena de referencia tiene cinco objetos, todos colgando de un mismo grupo, con tres materiales distintos y dos luces. Tu versión no tiene que parecerse: tiene que cumplir los mismos requisitos.`},{tipo:`demo`,id:`m3-escena`,titulo:`Referencia: cinco objetos, un grupo, tres materiales`},{tipo:`pasos`,items:[{titulo:`1. Elige una pieza central`,texto:`Un objeto que se vea bien y que puedas describir: un icosaedro, un toro, una caja inclinada. Es el ancla de la composición.`},{titulo:`2. Añade cuatro objetos de apoyo`,texto:`Un suelo o base, dos repetidos (satélites, postes, baldosas) y un detalle. Que ninguno esté en el mismo plano que el centro.`},{titulo:`3. Agrupa y coloca`,texto:"Todo dentro de un `<group>` con una rotación: así compruebas que la jerarquía funciona de verdad."},{titulo:`4. Usa tres materiales distintos`,texto:"Uno debe ser `basic` o `normal` para que no dependa de la luz; los otros dos, `standard` y `physical` con ajustes diferentes."},{titulo:`5. Ilumina con intención`,texto:`Una luz principal desde arriba y un relleno tenue del lado contrario. Si todo está igual de iluminado, no hay volumen.`}]},{tipo:`codigo`,lenguaje:`tsx`,titulo:`Esqueleto mínimo para empezar`,codigo:`export default function App() {
  return (
    <Canvas camera={{ position: [3.4, 3, 4.4], fov: 45 }}>
      <ambientLight intensity={0.3} />
      <directionalLight position={[4, 6, 3]} intensity={2.4} />
      <directionalLight position={[-4, 2, -3]} intensity={0.6} color="#9fbcff" />

      <group rotation={[0, 0.6, 0]}>
        {/* 1: base */}
        {/* 2: pieza central con material normal */}
        {/* 3 y 4: dos apoyos con material estándar */}
        {/* 5: detalle con material físico */}
      </group>
    </Canvas>
  )
}`},{tipo:`checkpoint`,titulo:`Antes de dar el módulo por cerrado`,items:[`La escena tiene al menos cinco objetos visibles y distinguibles.`,"Todos cuelgan de un único `<group>` con rotación aplicada.",`Hay tres clases de material diferentes, y se nota cuál es cuál.`,`Al menos una luz direccional y una ambiental; nada queda negro sin motivo.`,`No hay avisos en la consola del navegador.`,`Sabes señalar qué objeto cuesta más triángulos y por qué.`]},{tipo:`destacado`,tono:`truco`,titulo:`Cómo saber si tu escena está bien`,texto:`Gírala mentalmente: si no sabrías decir dónde está la luz principal, la escena no tiene dirección. Si dos objetos comparten el mismo color y el mismo material, probablemente uno sobra. Y si al desmontar el grupo desaparece todo, la jerarquía estaba bien hecha.`}],errores:[{sintoma:`Solo se ve un objeto aunque hay cinco en el JSX.`,causa:`Todos están en la misma posición o dentro de otro objeto a escala 0.`,arreglo:"Comprueba las `position` y separa al menos 0,8 unidades entre piezas."},{sintoma:`La escena se ve plana, sin volumen.`,causa:`Una sola luz frontal con intensidad alta y sin relleno.`,arreglo:`Añade una segunda luz lateral más tenue y baja la principal.`},{sintoma:`Al girar el grupo, las piezas se separan.`,causa:"Algunas mallas están fuera del `<group>` y giran con la escena, no con el grupo.",arreglo:`Mete todas las piezas dentro del mismo grupo.`}],quiz:[{tipo:`unica`,enunciado:`¿Qué comprueba realmente el checkpoint?`,opciones:[`Que sabes componer con lo aprendido, sin conceptos nuevos`,`Que memorizas la API de three.js`,`Que tu escena se parece a la de referencia`,`Que usas todos los materiales que existen`],correcta:0,explicacion:`Es una composición libre con requisitos verificables, no una copia.`},{tipo:`verdadero-falso`,enunciado:"Un `<group>` con rotación hace girar a todos sus hijos a la vez.",correcta:!0,explicacion:`La transformación del padre se compone con la de cada hijo.`},{tipo:`multiple`,enunciado:`¿Qué señales indican que la iluminación está mal?`,opciones:[`No sabrías decir de dónde viene la luz`,`Todo está igual de brillante`,`Hay zonas completamente negras sin intención`,`La escena tiene cinco objetos`],correctas:[0,1,2],explicacion:`El número de objetos no dice nada sobre la luz.`},{tipo:`unica`,enunciado:`Si dos objetos deben compartir geometría pero no color, ¿qué haces?`,opciones:[`Reutilizar la geometría y crear dos materiales`,`Duplicar la geometría y compartir el material`,`Cambiar el color del material compartido`,`No se puede`],correcta:0,explicacion:`La geometría es inmutable en la práctica; el material es lo que varía por objeto.`}],recursos:[{titulo:`three.js: Object3D`,url:`https://threejs.org/docs/#api/en/core/Object3D`,nota:`La clase de la que hereda todo lo que se puede añadir a una escena.`},{titulo:`R3F: examples`,url:`https://r3f.docs.pmnd.rs/getting-started/examples`,nota:`Galería oficial: útil para ver composiciones hechas por otros.`},{titulo:`three.js: WebGLRenderer.info`,url:`https://threejs.org/docs/#api/en/renderers/WebGLRenderer`,nota:"`info.render.triangles` da el total dibujado por frame: la siguiente medida que harás."}],ejercicio:{reto:"Monta tu escena del checkpoint: cinco objetos en un grupo, tres materiales distintos y dos luces. Cuando la tengas, mide cuántos triángulos dibuja con `gl.info.render.triangles`.",inicial:`import { Canvas } from '@react-three/fiber'

export default function App() {
  return (
    <div style={{ height: 360 }}>
      <Canvas camera={{ position: [3.4, 3, 4.4] }} frameloop="always">
        <ambientLight intensity={0.3} />
        <directionalLight position={[4, 6, 3]} intensity={2.4} />
        <directionalLight position={[-4, 2, -3]} intensity={0.6} color="#9fbcff" />

        <group rotation={[0, 0.6, 0]}>
          {/* TODO: cinco objetos, tres materiales distintos */}
          <mesh position={[0, 0.6, 0]}>
            <icosahedronGeometry args={[0.6, 0]} />
            <meshNormalMaterial flatShading />
          </mesh>
        </group>
      </Canvas>
    </div>
  )
}`,solucion:`import { Canvas } from '@react-three/fiber'

export default function App() {
  return (
    <div style={{ height: 360 }}>
      <Canvas camera={{ position: [3.4, 3, 4.4] }} frameloop="always">
        <ambientLight intensity={0.3} />
        <directionalLight position={[4, 6, 3]} intensity={2.4} />
        <directionalLight position={[-4, 2, -3]} intensity={0.6} color="#9fbcff" />

        <group rotation={[0, 0.6, 0]}>
          {/* 1. Base */}
          <mesh position={[0, 0.12, 0]}>
            <cylinderGeometry args={[1.4, 1.5, 0.24, 48]} />
            <meshStandardMaterial color="#2a3354" roughness={0.85} />
          </mesh>

          {/* 2. Pieza central */}
          <mesh position={[0, 1, 0]}>
            <icosahedronGeometry args={[0.52, 0]} />
            <meshNormalMaterial flatShading />
          </mesh>

          {/* 3 y 4. Dos satélites */}
          <mesh position={[-1, 0.8, 0]} rotation={[0.4, 0.2, 0.2]}>
            <boxGeometry args={[0.32, 0.32, 0.32]} />
            <meshStandardMaterial color="#f5a524" roughness={0.3} metalness={0.7} />
          </mesh>
          <mesh position={[1, 0.8, 0]} rotation={[0.4, 0.2, 0.2]}>
            <boxGeometry args={[0.32, 0.32, 0.32]} />
            <meshStandardMaterial color="#3fbf87" roughness={0.5} metalness={0.05} />
          </mesh>

          {/* 5. Anillo */}
          <mesh position={[0, 0.24, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <torusGeometry args={[1.1, 0.045, 12, 96]} />
            <meshPhysicalMaterial color="#cfd8ff" roughness={0.15} metalness={0.6} clearcoat={1} />
          </mesh>
        </group>
      </Canvas>
    </div>
  )
}`,pistas:[`Empieza por la base y la pieza central; luego añade los apoyos a izquierda y derecha.`,"El anillo del final es un toro tumbado: `rotation={[-Math.PI / 2, 0, 0]}`.","Para medir triángulos, `useThree((estado) => estado.gl).info.render.triangles` dentro de un `useFrame`, como en 3.3."]}}]},{numero:4,titulo:`Luz, sombra y entorno`,descripcion:`La luz no decora la escena: la explica. Cinco tipos de emisor, unidades que no se parecen entre sí, sombras que hay que domar y mapas de entorno que resuelven en una línea lo que cinco luces no consiguen.`,lecciones:[{id:`4.1`,modulo:4,titulo:`Tipos de luz`,objetivo:`Elegir el tipo de luz según el resultado que se busca, no según el que suena más profesional.`,nivel:`intro`,minutos:55,bloques:[{tipo:`parrafo`,texto:`Iluminar es decidir de dónde viene la luz y qué quieres que el ojo deduzca. Una luz ambiental dice «aquí no hay dirección»; una direccional dice «hay un sol»; una puntual dice «hay una bombilla cerca». La demo usa exactamente los mismos objetos y cambia solo el emisor: fíjate en las sombras propias y en cómo se separan las piezas del fondo.`},{tipo:`demo`,id:`m4-luces`,titulo:`Cinco emisores, cuatro objetos`},{tipo:`tabla`,cabecera:[`Luz`,`Cómo se comporta`,`Qué sugiere`,`Coste`],filas:[["`ambientLight`",`Igual en todas las direcciones`,`Relleno, nada de volumen`,`Mínimo`],["`directionalLight`",`Rayos paralelos, sin posición real`,`Sol, luz de estudio lejana`,`Bajo`],["`pointLight`",`Desde un punto, decae con la distancia`,`Bombilla, vela, farola`,`Medio`],["`spotLight`",`Cono con ángulo y penumbra`,`Foco, linterna, escenario`,`Medio-alto`],["`hemisphereLight`",`Cielo arriba, suelo abajo`,`Exterior con rebote`,`Mínimo`]]},{tipo:`codigo`,lenguaje:`tsx`,titulo:`Las cinco, con sus props importantes`,codigo:`<ambientLight intensity={0.4} />

<directionalLight position={[4, 6, 3]} intensity={3} />

<pointLight position={[0, 2.4, 0]} intensity={30} distance={0} decay={2} />

<spotLight
  position={[0, 4.2, 1.4]}
  angle={0.55}      // medio ángulo del cono, en radianes
  penumbra={0.45}   // 0 = borde duro, 1 = degradado total
  intensity={80}
  decay={2}
/>

<hemisphereLight args={['#9fc2ff', '#241c14', 1.4]} />`},{tipo:`destacado`,tono:`porque`,titulo:`Por qué «intensidad 2» significa cosas distintas`,texto:`Porque desde three r155 la iluminación es físicamente correcta: una direccional se mide en lux y una puntual en candelas. Una bombilla de 30 candelas es normal; un sol de 30 lux es una habitación a oscuras. Al cambiar de tipo de luz hay que cambiar el número, no solo la etiqueta.`},{tipo:`lista`,items:["`decay={2}` es la caída física con el cuadrado de la distancia; bajarlo ilumina más lejos y parece irreal.","`distance={0}` significa alcance infinito; un valor finito apaga la luz de golpe al llegar.","Las luces con posición se pueden ver con un `<mesh>` pequeño en su sitio: es el mejor depurador.","`spotLight` admite `target`; por defecto apunta al origen.",`Más luces no es mejor: tres bien colocadas superan a diez mal puestas.`]}],errores:[{sintoma:`La escena es plana aunque hay tres luces.`,causa:`Todas están en el mismo lado o son ambientales.`,arreglo:`Una principal fuerte, una de relleno al lado contrario y, si acaso, una de contra.`},{sintoma:`La luz puntual ilumina toda la escena sin importar la distancia.`,causa:"`decay={0}` o `distance={0}` con intensidad muy alta.",arreglo:"Deja `decay={2}` y ajusta la intensidad en candelas."},{sintoma:`El foco ilumina en círculo pero el borde es duro y feo.`,causa:"`penumbra` a 0.",arreglo:"Sube `penumbra` entre 0,3 y 0,6 para un borde creíble."}],quiz:[{tipo:`unica`,enunciado:`¿Qué luz no tiene posición porque sus rayos son paralelos?`,opciones:["`directionalLight`","`pointLight`","`spotLight`","`ambientLight`"],correcta:0,explicacion:"La direccional solo tiene dirección. Su `position` define la dirección respecto al origen, no un punto de emisión."},{tipo:`verdadero-falso`,enunciado:"`ambientLight` produce sombras propias.",correcta:!1,explicacion:`Ilumina por igual en todas las direcciones: no hay dirección, no hay sombra.`},{tipo:`multiple`,enunciado:"¿Qué props controlan la forma de un `spotLight`?",opciones:["`angle`","`penumbra`","`intensity`","`segments`"],correctas:[0,1,2],explicacion:"`segments` es de geometría. La forma del cono la dan `angle` y `penumbra`."},{tipo:`unica`,enunciado:"¿Qué hace `decay={2}`?",opciones:[`Que la intensidad caiga con el cuadrado de la distancia`,`Que la luz dure dos segundos`,`Que la luz tenga dos colores`,`Que la sombra sea más suave`],correcta:0,explicacion:"Es la atenuación física; `decay={0}` desactiva la caída."}],recursos:[{titulo:`three.js: Lights`,url:`https://threejs.org/docs/#api/en/lights/Light`,nota:`La clase base y la lista de tipos disponibles.`},{titulo:`three.js: physically correct lights`,url:`https://threejs.org/docs/#manual/en/introduction/Color-management`,nota:`Contexto de por qué las intensidades cambiaron de escala en r155.`},{titulo:`R3F: lighting`,url:`https://r3f.docs.pmnd.rs/api/objects`,nota:`Cómo se declaran las luces como etiquetas y qué props aceptan.`}],ejercicio:{reto:"Cambia la luz de la escena a un `spotLight` con `angle` 0,4 y `penumbra` 0,8, y comprueba que el cono se ve en el suelo.",inicial:`import { Canvas } from '@react-three/fiber'

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
}`,solucion:`import { Canvas } from '@react-three/fiber'

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
}`,pistas:[`La luz ambiental debe bajar mucho: si no, no se ve el cono.`,"`angle` es el medio ángulo en radianes; 0,4 son unos 23 grados.",`Sube la intensidad: una luz de foco a cuatro metros necesita muchas candelas.`]}},{id:`4.2`,modulo:4,titulo:`Intensidad, color y unidades`,objetivo:`Ajustar intensidad y temperatura de color sin quemar la escena, distinguiendo lo que hace la luz de lo que hace la exposición del renderer.`,nivel:`medio`,minutos:45,bloques:[{tipo:`parrafo`,texto:`Hay dos perillas que se confunden todo el tiempo. La intensidad es de la luz: cuánta energía emite. La exposición es del renderer: cuánto se multiplica esa energía antes de convertirla a píxeles. Subir la primera ilumina más la escena; subir la segunda blanquea también las zonas que ya estaban bien. Saber cuál tocar ahorra medias horas.`},{tipo:`demo`,id:`m4-exposicion`,titulo:`Exposición y temperatura, por separado`},{tipo:`codigo`,lenguaje:`tsx`,titulo:`Una luz con temperatura y un renderer con exposición`,codigo:`// 2700 K: bombilla cálida. 6500 K: luz de día.
const color = kelvinARgb(3200)

<directionalLight position={[4, 5, 3]} intensity={3.2} color={color} />

// La exposición vive en el renderer, no en la escena.
gl.toneMapping = THREE.ACESFilmicToneMapping
gl.toneMappingExposure = 1

// El entorno también tiene su propia intensidad.
<Environment files={HDRIS.estudio} environmentIntensity={1} />`},{tipo:`tabla`,cabecera:[`Concepto`,`Dónde vive`,`Qué controla`,`Rango típico`],filas:[[`Intensidad direccional`,`La luz`,`Luz recibida`,`1–5`],[`Intensidad puntual`,`La luz`,`Candelas`,`10–120`],[`Color`,`La luz`,`Temperatura percibida`,`2200–9000 K`],["`toneMappingExposure`",`El renderer`,`Multiplicador global`,`0,5–2`],["`environmentIntensity`",`Entorno / escena`,`Peso del HDRI`,`0–2`]]},{tipo:`destacado`,tono:`ojo`,titulo:`Blanco puro no existe`,texto:"Una luz con color `#ffffff` e intensidad alta hace que todo lo blanco se recorte en el mismo píxel: se pierde el detalle. Con un mapeo tonal ACES y una exposición moderada, los altos se comprimen y siguen teniendo información. Es la diferencia entre «brillante» y «quemado»."},{tipo:`lista`,items:[`Cambiar el color de una luz no cambia su brillo, solo el tono.`,`Una escena nocturna necesita poca ambiental y luces de color frío.`,`El mapeo tonal se aplica al final; no arregla una escena mal iluminada, solo la presenta mejor.`,`En móviles conviene fijar la exposición: el brillo automático de pantalla ya cambia la percepción.`,`Si comparas capturas, fija cámara y exposición; si no, estás comparando otra cosa.`]}],errores:[{sintoma:`Todo sale blanco y sin detalle en las zonas claras.`,causa:`Exposición demasiado alta o intensidades muy por encima de lo físico.`,arreglo:"Baja `toneMappingExposure` a 1 y reduce las intensidades; luego ajusta."},{sintoma:`La escena parece de día aunque las luces son de noche.`,causa:`La luz ambiental tiene la misma intensidad que en la versión diurna.`,arreglo:`Baja la ambiental a 0,05–0,15 y deja que las luces puntuales hagan el trabajo.`},{sintoma:`Cambiar la temperatura apenas se nota.`,causa:`Hay una ambiental blanca muy fuerte que domina el color.`,arreglo:`Baja la ambiental y aplica el color en la luz principal.`}],quiz:[{tipo:`unica`,enunciado:`¿Dónde se ajusta la exposición tonal?`,opciones:["En el `WebGLRenderer`",`En cada luz`,`En el material`,`En la cámara`],correcta:0,explicacion:"Es una propiedad del renderer: `gl.toneMappingExposure`."},{tipo:`verdadero-falso`,enunciado:`Subir la exposición es equivalente a subir la intensidad de todas las luces.`,correcta:!1,explicacion:`Se parece, pero no es igual: la exposición actúa después del sombreado y comprime los altos según el mapeo tonal.`},{tipo:`multiple`,enunciado:`¿Qué hace que una escena parezca nocturna?`,opciones:[`Ambiental baja`,`Luces de color frío`,`Poca luz directa`,`Exposición al máximo`],correctas:[0,1,2],explicacion:`Subir la exposición la devuelve al día: borra el efecto.`},{tipo:`unica`,enunciado:`¿Qué unidad usan las luces puntuales en three.js moderno?`,opciones:[`Candelas`,`Lux`,`Vatios`,`Porcentaje`],correcta:0,explicacion:`Las direccionales usan lux; las puntuales y focos, candelas.`}],recursos:[{titulo:`three.js: Color management`,url:`https://threejs.org/docs/#manual/en/introduction/Color-management`,nota:`Espacios de color, mapeo tonal y por qué un valor 0.5 no se ve como 0.5.`},{titulo:`three.js: WebGLRenderer.toneMapping`,url:`https://threejs.org/docs/#api/en/renderers/WebGLRenderer`,nota:"Los tipos de mapeo tonal disponibles y `toneMappingExposure`."},{titulo:`Wikipedia: color temperature`,url:`https://en.wikipedia.org/wiki/Color_temperature`,nota:`La referencia de los kelvin y su uso en iluminación.`}],ejercicio:{reto:`Añade un control de exposición entre 0,4 y 2 a una escena ya iluminada y comprueba en qué punto se pierden las zonas claras.`,inicial:`import { useState } from 'react'
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
}`,solucion:`import { useEffect, useState } from 'react'
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
}`,pistas:["La exposición se aplica con un `useEffect` sobre `gl`.","Sin `toneMapping` asignado, el cambio de exposición no se nota igual.",`Prueba 0,5 / 1 / 1,8 y compara el detalle en la zona iluminada.`]}},{id:`4.3`,modulo:4,titulo:`Sombras`,objetivo:"Configurar sombras sin artefactos: entender `castShadow`, `receiveShadow`, `mapSize`, `bias` y el frustum de la luz.",nivel:`medio`,minutos:60,bloques:[{tipo:`parrafo`,texto:`Una sombra en tiempo real no es física: es un truco. El renderer dibuja la escena desde el punto de vista de la luz y guarda la profundidad de cada píxel en un mapa. Luego, al dibujar la escena desde la cámara, compara esa profundidad. Si el fragmento está más lejos que lo guardado, está en sombra. Todos los artefactos vienen de esa comparación.`},{tipo:`demo`,id:`m4-sombras`,titulo:`Las cuatro perillas, en vivo`},{tipo:`codigo`,lenguaje:`tsx`,titulo:`Lo mínimo para que haya sombras de verdad`,codigo:`// 1. El canvas tiene que activarlas.
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
<mesh receiveShadow />`},{tipo:`tabla`,cabecera:[`Perilla`,`Qué hace`,`Síntoma si está mal`],filas:[["`mapSize`",`Resolución del mapa`,`Baja: borde dentado y bloques`],["`bias`",`Desplaza la comparación de profundidad`,`Negativo de más: sombra despegada`],["`normalBias`",`Desplaza en la dirección de la normal`,`Alto: la sombra se separa del objeto`],["`radius`",`Suaviza el borde (PCF)`,`Bajo: borde de sierra`],["`shadow.camera`",`Volumen que cubre la luz`,`Pequeño: sombras cortadas; grande: borrosas`]]},{tipo:`destacado`,tono:`porque`,titulo:`Shadow acne y peter-panning son el mismo problema`,texto:"La superficie se compara consigo misma y a veces pierde por un margen ínfimo: aparecen rayas (acne). Si empujas demasiado el sesgo para quitarlas, la sombra deja de tocar el objeto y parece flotar (peter-panning). No hay valor mágico: se busca el mínimo que elimine las rayas. `normalBias` suele ser más seguro que `bias` porque empuja en la dirección de la superficie."},{tipo:`lista`,items:["Sin `shadows` en el `<Canvas>` no se genera ningún mapa: los `castShadow` no hacen nada.",`Una luz puntual necesita un mapa cúbico (seis caras): es la sombra más cara.`,"Las sombras no atraviesan objetos: si algo no proyecta, revisa `castShadow` en ese objeto.",`El frustum de la direccional es una caja ortográfica; ajústalo al tamaño de la escena.`,"Las sombras de contacto (`ContactShadows`) son otra técnica: no necesitan luces."]}],errores:[{sintoma:`Rayas horizontales dentro de la sombra.`,causa:`Shadow acne: el sesgo es 0 o el mapa tiene poca resolución.`,arreglo:"Sube `normalBias` a 0,02–0,04 y `mapSize` a 1024 antes de tocar `bias`."},{sintoma:`La sombra flota y no toca el objeto.`,causa:"`bias` o `normalBias` demasiado altos.",arreglo:`Bájalos hasta que la sombra vuelva a tocar, justo antes de que aparezca el acne.`},{sintoma:`La sombra se corta en los bordes de la escena.`,causa:`El frustum de la luz es más pequeño que la zona iluminada.`,arreglo:"Amplía `shadow-camera-left/right/top/bottom` o reduce la escena."}],quiz:[{tipo:`unica`,enunciado:"¿Qué hay que activar en el `<Canvas>` para que existan sombras?",opciones:["`shadows`","`shadowMap`","`castShadow`","`renderer.shadows`"],correcta:0,explicacion:`Es la prop de R3F que activa el mapa de sombras del renderer.`},{tipo:`verdadero-falso`,enunciado:"Un objeto con `receiveShadow` proyecta sombra sobre otros.",correcta:!1,explicacion:"`receiveShadow` solo permite recibirla; para proyectar hace falta `castShadow`."},{tipo:`multiple`,enunciado:`¿Qué reduce el shadow acne?`,opciones:["Subir `mapSize`","Ajustar `normalBias`","Un `bias` ligeramente negativo",`Apagar las sombras`],correctas:[0,1,2],explicacion:`Apagarlas lo elimina, pero también elimina la sombra: no es una solución.`},{tipo:`unica`,enunciado:`¿Qué luz tiene la sombra más cara?`,opciones:["`pointLight`","`directionalLight`","`spotLight`","`ambientLight`"],correcta:0,explicacion:`Necesita seis renders de profundidad, uno por cara del cubo.`}],recursos:[{titulo:`three.js: LightShadow`,url:`https://threejs.org/docs/#api/en/lights/shadows/LightShadow`,nota:"`mapSize`, `bias`, `normalBias`, `radius` y la cámara de la sombra."},{titulo:`three.js: DirectionalLightShadow`,url:`https://threejs.org/docs/#api/en/lights/shadows/DirectionalLightShadow`,nota:`La cámara ortográfica que hay que ajustar al tamaño de la escena.`},{titulo:`R3F: shadows`,url:`https://r3f.docs.pmnd.rs/api/canvas`,nota:"Los tipos de mapa de sombras que acepta la prop `shadows`."}],ejercicio:{reto:"Activa sombras en la escena, deja el sesgo a 0 para provocar acne y corrígelo solo con `normalBias`.",inicial:`import { Canvas } from '@react-three/fiber'

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
}`,solucion:`import { Canvas } from '@react-three/fiber'

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
}`,pistas:["Sin `castShadow` en la luz no se genera el mapa.","El suelo solo necesita `receiveShadow`; la caja, los dos.","Prueba primero con `normalBias={0}` para ver el acne y luego súbelo."]}},{id:`4.4`,modulo:4,titulo:`HDRI e iluminación basada en imagen`,objetivo:`Iluminar con un mapa de entorno local y separar lo que es el fondo de lo que es la iluminación.`,nivel:`medio`,minutos:50,bloques:[{tipo:`parrafo`,texto:`Una foto panorámica de un lugar real contiene toda su iluminación: el sol, el cielo, los rebotes de las paredes. Un HDRI guarda esa información con valores por encima de 1, que es justo lo que un PNG no puede. Al usarlo como entorno, three.js lo procesa en un mapa prefiltrdo y lo aplica como luz ambiental y como reflejo: es la iluminación basada en imagen.`},{tipo:`demo`,id:`m4-hdri`,titulo:`Tres entornos del curso: estudio, exterior, luna`},{tipo:`codigo`,lenguaje:`tsx`,titulo:"Cargar un `.hdr` local con drei",codigo:`import { Environment } from '@react-three/drei'
import { HDRIS } from '../tres/rutas'

// Ilumina y refleja, sin pintar el fondo.
<Environment files={HDRIS.estudio} environmentIntensity={1} />

// Ilumina y además pinta el fondo.
<Environment files={HDRIS.exterior} environmentIntensity={1} background />

// Solo fondo, sin aportar luz.
<Environment files={HDRIS.luna} background="only" />`},{tipo:`tabla`,cabecera:[`HDRI del curso`,`Tamaño`,`Qué aporta`],filas:[["`estudio`",`512×256 · 59,2 KB`,`Tres softboxes: el mejor para ver reflejos y materiales`],["`exterior`",`1024×512 · 172,8 KB`,`Cielo con sol: luz direccional y ambiente de día`],["`luna`",`1024×512 · 168,8 KB`,`Casi sin ambiente: obliga a iluminar a mano`]]},{tipo:`destacado`,tono:`ojo`,titulo:`Fondo e iluminación son dos usos del mismo archivo`,texto:"`background` pinta el mapa detrás; `environment` lo usa para iluminar y reflejar. Puedes tener un estudio iluminando la escena y el fondo en negro, o al contrario. Confundirlos es la razón por la que mucha gente cree que el HDRI «no hace nada» cuando en realidad está iluminando sin que se vea."},{tipo:`lista`,items:["Los `.hdr` de este curso son Radiance RGBE y se generan con `npm run assets:hdri`: no hay descargas.","En three r180+ `RGBELoader` está obsoleto; el cargador actual es `HDRLoader`.",`El mapa se prefiltrа una vez; cambiarlo en caliente cuesta un frame largo.`,`Un HDRI no sustituye a una luz direccional si necesitas sombras nítidas.`,"Si la escena se ve lavada, baja `environmentIntensity` antes de tocar los materiales."]}],errores:[{sintoma:`La escena no cambia al añadir el entorno.`,causa:"Se cargó como `background` sin entorno, o la intensidad está a 0.",arreglo:"Usa `files` con `environmentIntensity` mayor que 0 y comprueba un material metálico."},{sintoma:`Todo se ve gris y sin contraste.`,causa:`El HDRI es muy luminoso y actúa como una ambiental gigante.`,arreglo:"Baja `environmentIntensity` a 0,3–0,6 y añade una direccional para el volumen."},{sintoma:`El fondo aparece pixelado o estirado.`,causa:`HDRI de poca resolución o proyección incorrecta (no equirectangular).`,arreglo:`Usa una panorámica equirectangular y sube la resolución si el fondo se ve grande.`}],quiz:[{tipo:`unica`,enunciado:`¿Qué diferencia a un HDRI de un PNG?`,opciones:[`Guarda valores de luminancia por encima de 1`,`Tiene más píxeles`,`Se carga más rápido`,`Solo admite blanco y negro`],correcta:0,explicacion:`El rango dinámico alto es lo que permite representar el sol sin recortarlo.`},{tipo:`verdadero-falso`,enunciado:"`background` y `environment` son sinónimos en `<Environment>`.",correcta:!1,explicacion:`Uno pinta el fondo; el otro ilumina y refleja. Se pueden usar por separado.`},{tipo:`multiple`,enunciado:`¿Qué aporta un HDRI a una escena?`,opciones:[`Luz ambiental con dirección`,`Reflejos coherentes en metales`,`Sombras nítidas`,`Cambios de color según la zona del mapa`],correctas:[0,1,3],explicacion:"Las sombras nítidas necesitan luces con `castShadow`."},{tipo:`unica`,enunciado:"¿Qué cargador usa three.js actualmente para `.hdr`?",opciones:["`HDRLoader`","`RGBELoader`","`TextureLoader`","`EXRLoader`"],correcta:0,explicacion:"Desde r180 `RGBELoader` es un alias obsoleto de `HDRLoader`."}],recursos:[{titulo:`three.js: HDRLoader`,url:`https://threejs.org/docs/#api/en/loaders/HDRLoader`,nota:"El cargador de Radiance `.hdr` que sustituye a `RGBELoader`."},{titulo:`drei: Environment`,url:`https://drei.docs.pmnd.rs/staging/environment`,nota:"`files`, `background`, `environmentIntensity` y el resto de props."},{titulo:`three.js: PMREMGenerator`,url:`https://threejs.org/docs/#api/en/extras/PMREMGenerator`,nota:`El prefiltrаdo que convierte un equirectangular en un mapa usable para reflejos rugosos.`}],ejercicio:{reto:"El sandbox no puede cargar el `.hdr`, así que monta a mano el equivalente: tres luces direccionales que simulen los softboxes de un estudio (principal, relleno y contra) y una ambiental muy baja.",inicial:`import { Canvas } from '@react-three/fiber'

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
}`,solucion:`import { Canvas } from '@react-three/fiber'

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
}`,pistas:[`La principal va arriba y a un lado; el relleno, al contrario y más débil.`,`La contra se coloca detrás del objeto y sirve para perfilar el borde.`,`Con metalness 1 y sin entorno, las luces directas solo producen puntos brillantes: es lo esperable.`]}},{id:`4.5`,modulo:4,titulo:`Estudio: Stage, ContactShadows, AccumulativeShadows`,objetivo:`Elegir la técnica de presentación adecuada y saber qué hace cada una por dentro.`,nivel:`medio`,minutos:50,bloques:[{tipo:`parrafo`,texto:"drei trae tres formas de resolver la presentación de un producto. `ContactShadows` proyecta una silueta difusa sobre un plano usando un mapa de profundidad: es barata, no depende de luces y da un resultado excelente en un suelo plano. `AccumulativeShadows` acumula muchos frames con luces aleatorias hasta converger en una sombra suave de aspecto global. `Stage` empaqueta cámara, luces y sombras en un solo componente listo para usar."},{tipo:`demo`,id:`m4-estudio`,titulo:`Las tres técnicas, la misma pieza`},{tipo:`tabla`,cabecera:[`Técnica`,`Qué hace`,`Coste`,`Cuándo usarla`],filas:[["`ContactShadows`",`Silueta difusa sobre un plano`,`Bajo`,`Producto sobre mesa, configuradores`],["`AccumulativeShadows`",`Acumula frames hasta converger`,`Alto al principio, gratis después`,`Render de presentación estático`],["`Stage`",`Luces + sombras + cámara`,`Medio`,`Prototipos rápidos y escaparates`]]},{tipo:`codigo`,lenguaje:`tsx`,titulo:`Los tres, en su forma mínima`,codigo:`// 1. Sombra de contacto: no necesita luces.
<ContactShadows position={[0, 0, 0]} opacity={0.6} scale={9} blur={2.4} far={4} />

// 2. Sombras acumulativas: convergen con luces aleatorias.
<AccumulativeShadows temporal frames={90} alphaTest={0.85} scale={9}>
  <RandomizedLight amount={6} radius={5} intensity={2.2} position={[4, 6, 4]} />
</AccumulativeShadows>

// 3. Stage: todo el estudio en un componente.
<Stage environment={null} intensity={0.75} shadows={{ type: 'contact' }}>
  <Pieza />
</Stage>`},{tipo:`destacado`,tono:`ojo`,titulo:"Ojo con los presets de `Stage`",texto:'El prop `environment` de `Stage` acepta presets como `"city"` o `"sunset"`, pero esos presets descargan HDRIs de un CDN de terceros. En este curso se pasa `environment={null}` a propósito: la web funciona sin red y sin licencias ajenas. Si usas presets, asumes esa dependencia.'},{tipo:`lista`,items:["`ContactShadows` no genera sombra de objetos que no estén sobre el plano.","`AccumulativeShadows` necesita que la escena esté quieta mientras acumula.","`Stage` recoloca la cámara si `adjustCamera` está activo; desactívalo si controlas tú la vista.",`En configuradores interactivos, la sombra de contacto es casi siempre la respuesta correcta.`,`Ninguna de las tres técnicas sustituye a una buena iluminación: la sombra no ilumina.`]}],errores:[{sintoma:"`AccumulativeShadows` deja la escena con manchas que cambian solas.",causa:"La escena se mueve mientras acumula, o tiene `temporal` con objetos animados.",arreglo:"Deja la escena quieta, o usa `ContactShadows` si hay animación."},{sintoma:"`ContactShadows` tapa el suelo o aparece como un cuadrado negro.",causa:"El plano de la sombra está por encima del suelo o `far` es demasiado pequeño.",arreglo:"Súbelo un milímetro sobre el suelo y ajusta `far` a la altura de la escena."},{sintoma:"`Stage` ilumina toda la escena aunque no quiero.",causa:"`Stage` añade sus propias luces alrededor de los hijos.",arreglo:"No anides la escena entera dentro de `Stage`; úsalo solo alrededor del objeto a presentar."}],quiz:[{tipo:`unica`,enunciado:`¿Qué técnica no necesita luces?`,opciones:["`ContactShadows`","`AccumulativeShadows`","`Stage`",`Ninguna`],correcta:0,explicacion:`Trabaja con un mapa de profundidad, no con el mapa de sombras de una luz.`},{tipo:`verdadero-falso`,enunciado:"`AccumulativeShadows` es más caro al principio y luego deja de costar.",correcta:!0,explicacion:"Acumula durante `frames` y después reutiliza el resultado mientras nada cambie."},{tipo:`multiple`,enunciado:"¿Qué hace `Stage` por ti?",opciones:[`Coloca luces`,`Añade sombras`,`Puede recolocar la cámara`,`Optimiza la geometría`],correctas:[0,1,2],explicacion:`No toca la geometría: para eso está gltf-transform (módulo 8).`},{tipo:`unica`,enunciado:"¿Qué significa pasar `environment={null}` a `Stage`?",opciones:[`No descargar ningún HDRI de preset`,`Desactivar las sombras`,`Quitar la cámara`,`Apagar las luces`],correcta:0,explicacion:`Evita la dependencia de un CDN externo y de sus licencias.`}],recursos:[{titulo:`drei: ContactShadows`,url:`https://drei.docs.pmnd.rs/shadows/contact-shadows`,nota:"Todas las props, incluidos `blur`, `far` y `resolution`."},{titulo:`drei: AccumulativeShadows`,url:`https://drei.docs.pmnd.rs/shadows/accumulative-shadows`,nota:"Cómo funciona la acumulación y qué hace `RandomizedLight`."},{titulo:`drei: Stage`,url:`https://drei.docs.pmnd.rs/staging/stage`,nota:`Presets de luz y la advertencia sobre el entorno por defecto.`}],ejercicio:{reto:"Monta una presentación de producto con `ContactShadows`: una pieza, un suelo y una sombra difusa. Ajusta `blur` y `opacity` hasta que parezca que apoya.",inicial:`import { Canvas } from '@react-three/fiber'

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
}`,solucion:`import { Canvas } from '@react-three/fiber'
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
}`,pistas:["`ContactShadows` se coloca en el suelo, no en el objeto.","`far` debe cubrir la altura del objeto; si no, la sombra desaparece.","`blur` alto suaviza mucho; por encima de 4 el objeto parece flotar."]}},{id:`4.6`,modulo:4,titulo:`Checkpoint: depurar una escena mal iluminada`,objetivo:`Diagnosticar una escena oscura, quemada o plana con un método de cinco pasos, sin tocar valores al azar.`,nivel:`medio`,minutos:50,bloques:[{tipo:`parrafo`,texto:`Casi todas las escenas mal iluminadas fallan por una de cinco causas. El método consiste en descartarlas en orden, de la más barata a la más cara, comprobando algo visible después de cada cambio. La demo trae los cinco fallos sembrados y un interruptor por fallo: reproduce el síntoma, arregla uno y mira qué cambia.`},{tipo:`demo`,id:`m4-depurar`,titulo:`Cinco fallos, cinco interruptores`},{tipo:`pasos`,items:[{titulo:`1. ¿Hay alguna luz?`,texto:"Con `meshBasicMaterial` todo se ve; con `standard`, no. Si la escena está negra, empieza aquí: cero luces o todas con intensidad 0."},{titulo:`2. ¿Está quemada la exposición?`,texto:"Si todo es blanco sin detalle, baja `toneMappingExposure` a 1 antes de tocar las intensidades. Así separas causa de amplificador."},{titulo:`3. ¿El material espera un entorno?`,texto:"Un metal con `metalness={1}` sin HDRI se ve negro. Baja la metalicidad o añade `<Environment>`."},{titulo:`4. ¿Hay artefactos de sombra?`,texto:"Rayas dentro de la sombra: acne. Sombra separada: sesgo excesivo. Ajusta `normalBias` y luego `bias`."},{titulo:`5. ¿Hay volumen?`,texto:`Si se ve correctamente pero plano, faltan direcciones distintas: una principal, un relleno débil del lado contrario, quizá una contra.`}]},{tipo:`checkpoint`,titulo:`Antes de cerrar el módulo`,items:[`Sé nombrar los cinco tipos de luz y cuándo usar cada uno.`,`Distingo exposición de intensidad y sé cuál tocar primero.`,"Sé activar sombras y corregir acne con `normalBias`.","He usado un HDRI local con `environmentIntensity` y sé qué hace `background`.","Sé explicar la diferencia entre `ContactShadows` y una sombra de luz.",`Puedo diagnosticar una escena negra en menos de cinco comprobaciones.`]},{tipo:`destacado`,tono:`truco`,titulo:`El depurador de una línea`,texto:"Sustituye temporalmente todos los materiales por `meshNormalMaterial`. Si la geometría aparece bien, el problema es de luz o de material, no de la escena. Si no aparece, el problema es de cámara, escala o posición. Es el atajo más rentable de todo el módulo."}],errores:[{sintoma:`La escena está negra y cambiar las luces no hace nada.`,causa:"Los materiales son `basic` sobre objetos negros, o la cámara está dentro de un objeto.",arreglo:"Cambia a `meshNormalMaterial` y comprueba si hay geometría visible."},{sintoma:`Se arregla la oscuridad y aparece todo quemado.`,causa:`Se subieron las intensidades con la exposición también alta.`,arreglo:`Fija la exposición a 1 y reparte la luz entre principal y relleno.`},{sintoma:`La escena se ve bien pero «de plástico».`,causa:"Materiales con `roughness` uniforme y una sola luz frontal.",arreglo:`Varía rugosidad y metalicidad, y añade una luz lateral tenue.`}],quiz:[{tipo:`unica`,enunciado:`¿Cuál es la primera comprobación ante una escena negra?`,opciones:[`Si hay luces y si los materiales las necesitan`,`Si el canvas tiene el tamaño correcto`,`Si el HTML tiene un error`,`Si el navegador soporta WebGL`],correcta:0,explicacion:`Es la causa más frecuente y la más rápida de descartar.`},{tipo:`verdadero-falso`,enunciado:`Subir la exposición es la forma correcta de arreglar una escena sin luces.`,correcta:!1,explicacion:`Sin luz no hay nada que multiplicar: la exposición no crea iluminación.`},{tipo:`multiple`,enunciado:`¿Qué causas producen una escena «plana»?`,opciones:[`Una sola luz frontal`,`Ambiental demasiado alta`,`Materiales todos con el mismo roughness`,`Tener sombras activadas`],correctas:[0,1,2],explicacion:`Las sombras, bien configuradas, añaden volumen en lugar de quitarlo.`},{tipo:`unica`,enunciado:"¿Para qué sirve cambiar todo a `meshNormalMaterial` al depurar?",opciones:[`Para ver la geometría sin depender de luces ni materiales`,`Para mejorar el rendimiento`,`Para exportar el modelo`,`Para activar las sombras`],correcta:0,explicacion:`Aísla el problema: si se ve, la escena existe; el fallo está en luz o material.`}],recursos:[{titulo:`three.js: MeshNormalMaterial`,url:`https://threejs.org/docs/#api/en/materials/MeshNormalMaterial`,nota:`El material de depuración que no depende de la iluminación.`},{titulo:`three.js: Color management`,url:`https://threejs.org/docs/#manual/en/introduction/Color-management`,nota:`La explicación de fondo de por qué una escena se quema o se ve lavada.`},{titulo:`drei: Environment`,url:`https://drei.docs.pmnd.rs/staging/environment`,nota:"Repaso de `environmentIntensity` para el paso 3 del método."}],ejercicio:{reto:`La escena de partida tiene tres fallos: no hay luz direccional, la exposición está a 2,4 y el material es básico. Arréglalos en el orden del método y comprueba el resultado tras cada cambio.`,inicial:`import { Canvas } from '@react-three/fiber'

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
}`,solucion:`import { Canvas } from '@react-three/fiber'

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
}`,pistas:[`Primero la luz, después el material, al final la sombra.`,"`meshStandardMaterial` sin luces se ve negro: es el síntoma esperado, no un fallo nuevo.",`La exposición no se toca en este ejercicio: se deja la del renderer por defecto.`]}}]},{numero:5,titulo:`Movimiento: useFrame, delta y animación`,descripcion:`Todo lo que se mueve en una escena pasa por el bucle de render. Aprender dónde escribir ese movimiento —y dónde no— es la diferencia entre 60 fps estables y una escena que se arrastra.`,lecciones:[{id:`5.1`,modulo:5,titulo:"`useFrame` y el render loop",objetivo:"Mover un objeto desde `useFrame` mutando su `ref`, y explicar por qué hacerlo con `setState` también funciona pero cuesta caro.",nivel:`intro`,minutos:50,bloques:[{tipo:`parrafo`,texto:"R3F ejecuta un bucle de render mientras el canvas está visible. `useFrame` te suscribe a ese bucle: la función que le pasas se llama una vez por frame, antes de dibujar, y recibe el estado y el `delta` en segundos. Es el equivalente al `requestAnimationFrame` de three.js puro, pero con el registro y la limpieza hechos."},{tipo:`demo`,id:`m5-useframe-setstate`,titulo:`Dos cubos, dos formas de girar`},{tipo:`parrafo`,texto:"Los dos cubos giran igual. La diferencia está en el contador de renders. El azul muta `malla.current.rotation` dentro de `useFrame`: React no se entera y no vuelve a renderizar nada. El naranja llama a `setGiro` en cada frame: React reconcilia el componente 60 veces por segundo para producir exactamente el mismo árbol de JSX con un número distinto."},{tipo:`codigo`,lenguaje:`tsx`,titulo:`El patrón correcto`,codigo:`import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import type { Mesh } from 'three'

function Cubo() {
  const malla = useRef<Mesh>(null)

  useFrame((_, delta) => {
    if (!malla.current) return
    malla.current.rotation.y += delta * 1.35
    malla.current.rotation.x += delta * 0.42
  })

  return (
    <mesh ref={malla}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="#4d8df6" />
    </mesh>
  )
}`},{tipo:`destacado`,tono:`porque`,titulo:`Por qué mutar un ref no es «hacer trampas»`,texto:`Porque el objeto three.js no forma parte del árbol de React: es un objeto imperativo que vive fuera. React decide qué objetos existen; el bucle decide cómo se mueven. Mezclar ambas responsabilidades es lo que produce los tirones. El estado de React es para lo que cambia al pulsar; el frame es para lo que cambia 60 veces por segundo.`},{tipo:`lista`,items:["`delta` es el tiempo transcurrido desde el frame anterior, en segundos. A 60 fps vale ≈0,0167.","El orden de ejecución entre varios `useFrame` es el de montaje, salvo que uses el segundo argumento (`renderPriority`).",'`useFrame` no se ejecuta si el canvas está pausado (`frameloop="never"`).',"El primer frame puede traer un `delta` grande: conviene acotarlo (`Math.min(delta, 0.1)`).","Puedes leer `state.clock.elapsedTime` para animaciones basadas en tiempo absoluto."]},{tipo:`destacado`,tono:`ojo`,titulo:"No todo va en `useFrame`",texto:"Un cambio de color al pulsar un botón no necesita el bucle: es `setState` normal y React lo aplica una vez. Usar `useFrame` para eso te obliga a gestionar tú mismo cuándo parar y a leer estado mutable que React no ve. Regla práctica: si el valor cambia con un evento, estado; si cambia con el tiempo, `useFrame`."}],errores:[{sintoma:"`malla.current` es `null` dentro de `useFrame`.",causa:"El `ref` no está asignado al objeto, o el objeto está dentro de un componente que aún no ha montado.",arreglo:"Comprueba el `ref={malla}` y añade la guarda `if (!malla.current) return`."},{sintoma:`La animación va a trompicones y el perfil muestra renders constantes.`,causa:"Se llama a `setState` dentro de `useFrame`.",arreglo:"Muta el objeto por `ref`. Si necesitas mostrar el valor en HTML, actualízalo como mucho 4-5 veces por segundo."},{sintoma:`Al volver a la pestaña, los objetos dan un salto enorme.`,causa:"El `delta` acumulado mientras la pestaña estaba en segundo plano se aplica de golpe.",arreglo:"Acota: `const dt = Math.min(delta, 0.1)`."}],quiz:[{tipo:`unica`,enunciado:"¿Cuántas veces se ejecuta la función de `useFrame`?",opciones:[`Una por frame dibujado`,`Una por render de React`,`Una por segundo`,`Solo cuando cambia el estado`],correcta:0,explicacion:`Está atada al bucle de render, no al ciclo de React. Si el canvas está pausado, no se ejecuta.`},{tipo:`verdadero-falso`,enunciado:"Mutar `ref.current.rotation` dentro de `useFrame` provoca un render de React.",correcta:!1,explicacion:`React no observa objetos three.js. Solo el bucle de render ve el cambio, que es justo lo que quieres.`},{tipo:`multiple`,enunciado:"¿Qué cosas sí deberían ir por `setState` y no por `useFrame`?",opciones:[`El color que cambia al pulsar un botón`,`La rotación continua de un molino`,`El elemento seleccionado en una lista`,`La posición de un objeto que sigue al ratón`],correctas:[0,2],explicacion:"Los eventos puntuales van por estado. Lo que depende del tiempo o del puntero en cada frame va por `useFrame`."},{tipo:`unica`,enunciado:"¿En qué unidades llega `delta`?",opciones:[`Segundos`,`Milisegundos`,`Frames`,`Radianes`],correcta:0,explicacion:`Segundos, con coma flotante. De ahí que se multiplique por una velocidad en unidades por segundo.`}],recursos:[{titulo:`R3F: useFrame`,url:`https://r3f.docs.pmnd.rs/api/hooks#useframe`,nota:`Incluye el parámetro de prioridad y el orden de ejecución.`},{titulo:`three.js: Clock`,url:`https://threejs.org/docs/#api/en/core/Clock`,nota:"De dónde sale `delta` y qué es `elapsedTime`."},{titulo:`React: state as a snapshot`,url:`https://react.dev/learn/state-as-a-snapshot`,nota:`Por qué actualizar estado 60 veces por segundo es caro por diseño.`}],ejercicio:{reto:`Haz que un cubo se mueva en círculo a 0,6 vueltas por segundo sin provocar ni un render de React.`,inicial:`import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import type { Mesh } from 'three'

function Cubo() {
  const malla = useRef<Mesh>(null)

  useFrame((_, delta) => {
    if (!malla.current) return
    // TODO: avanza el ángulo y coloca el cubo en un círculo de radio 1.3
  })

  return (
    <mesh ref={malla}>
      <boxGeometry args={[0.5, 0.5, 0.5]} />
      <meshNormalMaterial />
    </mesh>
  )
}

export default function App() {
  return (
    <div style={{ height: 320 }}>
      <Canvas camera={{ position: [0, 2.5, 4] }}>
        <Cubo />
      </Canvas>
    </div>
  )
}`,solucion:`import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import type { Mesh } from 'three'

const RADIO = 1.3
const VUELTAS_POR_SEGUNDO = 0.6

function Cubo() {
  const malla = useRef<Mesh>(null)
  const angulo = useRef(0)

  useFrame((_, delta) => {
    if (!malla.current) return
    const dt = Math.min(delta, 0.1)
    angulo.current += dt * VUELTAS_POR_SEGUNDO * Math.PI * 2

    malla.current.position.x = Math.cos(angulo.current) * RADIO
    malla.current.position.z = Math.sin(angulo.current) * RADIO
    malla.current.rotation.y = angulo.current
  })

  return (
    <mesh ref={malla}>
      <boxGeometry args={[0.5, 0.5, 0.5]} />
      <meshNormalMaterial />
    </mesh>
  )
}

export default function App() {
  return (
    <div style={{ height: 320 }}>
      <Canvas camera={{ position: [0, 2.5, 4] }}>
        <Cubo />
      </Canvas>
    </div>
  )
}`,pistas:["Guarda el ángulo en un `useRef`, no en estado.","Una vuelta completa son `Math.PI * 2` radianes.","Con `Math.cos` y `Math.sin` del mismo ángulo obtienes el círculo en XZ."]}},{id:`5.2`,modulo:5,titulo:`Delta y velocidad independiente`,objetivo:`Escribir movimiento que se vea igual a 30, 60 o 144 fps, y detectar el error de sumar una constante por frame.`,nivel:`intro`,minutos:45,bloques:[{tipo:`parrafo`,texto:"Un monitor de 144 Hz dibuja 144 frames por segundo; uno de 60, sesenta. Si tu código suma `0.01` a la posición en cada frame, el objeto irá 2,4 veces más rápido en la pantalla buena. El `delta` existe para que el movimiento dependa del tiempo y no del número de frames."},{tipo:`demo`,id:`m5-delta-fps`,titulo:`Baja los FPS y mira quién cambia de velocidad`},{tipo:`parrafo`,texto:"El cubo naranja suma `0.02` unidades por frame. El azul suma `velocidad × delta`, donde `velocidad` está en unidades por segundo. A 60 fps coinciden porque `0.02 × 60 = 1.2` unidades por segundo. A 20 fps el naranja se arrastra y el azul mantiene el ritmo: misma fórmula, distinto número de frames."},{tipo:`codigo`,lenguaje:`tsx`,titulo:`Mal y bien, lado a lado`,codigo:`// Mal: la velocidad depende del hardware
useFrame(() => {
  malla.current.position.x += 0.02
})

// Bien: la velocidad está en unidades por segundo
const VELOCIDAD = 1.2 // unidades/s

useFrame((_, delta) => {
  malla.current.position.x += VELOCIDAD * Math.min(delta, 0.1)
})`},{tipo:`destacado`,tono:`porque`,titulo:"Por qué el límite de `delta` no es opcional",texto:"Si el navegador se congela medio segundo (una pestaña en segundo plano, un `console.log` gigante, un breakpoint), el siguiente `delta` vale 0,5 y tu objeto puede teletransportarse fuera de la pantalla. Acotarlo a 0,1 s convierte un salto en un tirón pequeño y evita que la física o la cámara se desestabilicen."},{tipo:`tabla`,cabecera:[`Frecuencia`,"`delta` medio",`Frames en un segundo de animación`],filas:[[`30 fps`,`0,0333 s`,`30`],[`60 fps`,`0,0167 s`,`60`],[`120 fps`,`0,0083 s`,`120`],[`144 fps`,`0,0069 s`,`144`]]},{tipo:`lista`,items:[`Velocidad en unidades por segundo, siempre.`,`Rotación en radianes por segundo.`,"Un temporizador de «2 segundos» se hace acumulando `delta`, no contando frames.","Para animaciones de duración fija es más simple usar una curva por tiempo absoluto (`clock.elapsedTime`).","En tests, `delta` se puede forzar: el bucle de R3F acepta que se controle el reloj, lo que permite resultados deterministas."]}],errores:[{sintoma:`La animación va el doble de rápida en un portátil gaming que en el monitor de la oficina.`,causa:"Se suma una constante por frame en vez de multiplicar por `delta`.",arreglo:"Multiplica: `velocidad * delta`, con la velocidad expresada por segundo."},{sintoma:`Al volver de otra pestaña el objeto aparece al otro lado de la escena.`,causa:"El `delta` acumulado se aplicó entero.",arreglo:"`Math.min(delta, 0.1)` antes de usarlo."},{sintoma:`La animación se acelera justo después de un tirón.`,causa:"Un `delta` grande hace que varias actualizaciones se apliquen en un solo frame grande.",arreglo:`Para movimiento simple basta el límite. Para simulación, acumula tiempo y ejecuta pasos fijos (lo verás con física en el módulo 10).`}],quiz:[{tipo:`unica`,enunciado:`Un objeto debe avanzar 2 unidades por segundo. ¿Qué escribes?`,opciones:["`position.x += 2 * delta`","`position.x += 2`","`position.x += 2 / 60`","`position.x += delta / 2`"],correcta:0,explicacion:`Velocidad por segundo multiplicada por el tiempo transcurrido.`},{tipo:`verdadero-falso`,enunciado:"Usar `delta` hace que la animación sea independiente de los FPS.",correcta:!0,explicacion:`Es exactamente su propósito: el resultado depende del tiempo, no del número de frames.`},{tipo:`multiple`,enunciado:"¿Qué consecuencias tiene no acotar `delta`?",opciones:[`Saltos tras volver de segundo plano`,`Objetos que atraviesan paredes`,"Que `delta` sea negativo",`Inestabilidad en simulaciones`],correctas:[0,1,3],explicacion:"`delta` no puede ser negativo, pero sí enorme. Un paso grande atraviesa colisiones y desestabiliza."},{tipo:`unica`,enunciado:"A 144 fps, ¿cómo es el `delta` respecto a 60 fps?",opciones:[`Unas 2,4 veces menor`,`Igual`,`2,4 veces mayor`,`No existe`],correcta:0,explicacion:`144/60 = 2,4, y el tiempo por frame es inversamente proporcional a la frecuencia.`}],recursos:[{titulo:`three.js: Clock`,url:`https://threejs.org/docs/#api/en/core/Clock`,nota:"`getDelta()` es la fuente del valor que recibe `useFrame`."},{titulo:`R3F: useFrame`,url:`https://r3f.docs.pmnd.rs/api/hooks#useframe`,nota:"La firma `(state, delta)` y el orden de llamada."},{titulo:`Glenn Fiedler: Fix Your Timestep!`,url:`https://gafferongames.com/post/fix_your_timestep/`,nota:`El artículo clásico sobre pasos fijos frente a variables. Denso, pero es la referencia.`}],ejercicio:{reto:`Haz que dos cubos recorran la misma distancia en el mismo tiempo: uno con delta y otro con un temporizador basado en tiempo absoluto.`,inicial:`import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import type { Mesh } from 'three'

function Cubos() {
  const a = useRef<Mesh>(null)
  const b = useRef<Mesh>(null)
  const t = useRef(0)

  useFrame((state, delta) => {
    // TODO: ambos deben ir de x=-2 a x=2 en 3 segundos, con la misma fórmula de tiempo
    if (a.current) a.current.position.x = -2
    if (b.current) b.current.position.x = -2
  })

  return (
    <>
      <mesh ref={a} position={[0, 0.4, 0]}>
        <boxGeometry args={[0.4, 0.4, 0.4]} />
        <meshBasicMaterial color="#4d8df6" />
      </mesh>
      <mesh ref={b} position={[0, -0.4, 0]}>
        <boxGeometry args={[0.4, 0.4, 0.4]} />
        <meshBasicMaterial color="#f5a524" />
      </mesh>
    </>
  )
}

export default function App() {
  return (
    <div style={{ height: 300 }}>
      <Canvas camera={{ position: [0, 1.5, 5] }}>
        <Cubos />
      </Canvas>
    </div>
  )
}`,solucion:`import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import type { Mesh } from 'three'

const DURACION = 3
const DESDE = -2
const HASTA = 2

function Cubos() {
  const a = useRef<Mesh>(null)
  const b = useRef<Mesh>(null)
  const t = useRef(0)

  useFrame((state, delta) => {
    // Opción A: acumular delta, reiniciando al llegar al final.
    t.current = (t.current + Math.min(delta, 0.1)) % DURACION
    const avance = t.current / DURACION

    if (a.current) a.current.position.x = DESDE + (HASTA - DESDE) * avance

    // Opción B: reloj absoluto del renderer.
    const absoluto = state.clock.elapsedTime % DURACION
    if (b.current) b.current.position.x = DESDE + (HASTA - DESDE) * (absoluto / DURACION)
  })

  return (
    <>
      <mesh ref={a} position={[0, 0.4, 0]}>
        <boxGeometry args={[0.4, 0.4, 0.4]} />
        <meshBasicMaterial color="#4d8df6" />
      </mesh>
      <mesh ref={b} position={[0, -0.4, 0]}>
        <boxGeometry args={[0.4, 0.4, 0.4]} />
        <meshBasicMaterial color="#f5a524" />
      </mesh>
    </>
  )
}

export default function App() {
  return (
    <div style={{ height: 300 }}>
      <Canvas camera={{ position: [0, 1.5, 5] }}>
        <Cubos />
      </Canvas>
    </div>
  )
}`,pistas:["Guarda el tiempo transcurrido en un `useRef` y reinícialo con `% DURACION`.","La posición es `DESDE + (HASTA - DESDE) * (t / DURACION)`.","El reloj absoluto está en `state.clock.elapsedTime`."]}},{id:`5.3`,modulo:5,titulo:`Interpolación y damping`,objetivo:"Suavizar el movimiento con `lerp`, `damp` y curvas de easing, y elegir la técnica según si el objetivo es fijo o se mueve.",nivel:`medio`,minutos:55,bloques:[{tipo:`parrafo`,texto:`Mover algo de A a B en línea recta a velocidad constante se ve robótico. Casi todo lo que quieres en una escena es una aproximación suave: el objeto no salta al objetivo, se acerca. La demo enfrenta cuatro técnicas sobre el mismo blanco. Cambia el objetivo y observa quién se pasa, quién se queda corto y quién nunca llega del todo.`},{tipo:`demo`,id:`m5-curvas`,titulo:`Cuatro formas de llegar al mismo punto`},{tipo:`codigo`,lenguaje:`tsx`,titulo:`Las tres fórmulas que vas a usar`,codigo:`// 1. Interpolación simple: depende del frame, NO uses esto para animar.
posicion.lerp(objetivo, 0.1)

// 2. Interpolación independiente del frame.
const t = 1 - Math.exp(-8 * delta) // 8 = rapidez
posicion.lerp(objetivo, t)

// 3. Damping de three.js: hace lo anterior y admite objetivo móvil.
posicion.x = THREE.MathUtils.damp(posicion.x, objetivo.x, 8, delta)

// 4. Muelle (react-spring o cálculo propio): se pasa de largo y vuelve.`},{tipo:`destacado`,tono:`porque`,titulo:"Por qué `lerp` con un factor fijo está mal",texto:"Porque `lerp(a, b, 0.1)` avanza el 10 % de la distancia restante en cada frame. A 144 fps ese 10 % se aplica 144 veces por segundo y el objeto llega 2,4 veces antes. `damp` y el exponencial corrigen eso: el factor se calcula a partir de `delta`, así que el resultado es el mismo a cualquier frecuencia."},{tipo:`tabla`,cabecera:[`Técnica`,`Se pasa de largo`,`Objetivo móvil`,`Cuándo usarla`],filas:[["`lerp` fijo",`No`,`Sí, pero a destiempo`,`Nunca para animar`],["`lerp` con exponencial",`No`,`Sí`,`Seguimiento suave de cámara o cursor`],["`MathUtils.damp`",`No`,`Sí`,"La opción por defecto en `useFrame`"],[`Muelle`,`Sí`,`Sí`,`Cuando quieres rebote, no solo suavidad`],["Easing con `t` normalizado",`No`,`No`,`Animaciones con duración conocida`]]},{tipo:`lista`,items:["Un `lambda` mayor en `damp` acerca más rápido: es una frecuencia, no un porcentaje.",`El damping nunca alcanza el objetivo exacto; se queda asintóticamente cerca. Umbraliza si necesitas precisión.`,"Para una animación con principio y fin, normaliza el tiempo (`0..1`) y aplica una curva de easing.","`THREE.MathUtils.smoothstep(x, min, max)` devuelve una transición suave entre dos umbrales.",`Las curvas de easing se pueden compartir entre objetos: escribe la función una vez.`]}],errores:[{sintoma:`El objeto se acerca pero nunca se detiene del todo.`,causa:"Estás usando `damp` o un `lerp` exponencial, que son asintóticos.",arreglo:`Si la distancia es menor que una épsilon (por ejemplo 0,001), asigna el objetivo exacto y deja de actualizar.`},{sintoma:`El movimiento vibra alrededor del objetivo a FPS altos.`,causa:"Un `lerp` con factor cercano a 1 aplicado muchas veces por segundo.",arreglo:"Cambia a `damp` con el `delta`, o reduce el factor."},{sintoma:`La cámara sigue al jugador con retraso perceptible.`,causa:"El `lambda` del damping es demasiado bajo para la velocidad del objetivo.",arreglo:`Súbelo (de 4 a 10) y comprueba con el objetivo moviéndose rápido, no quieto.`}],quiz:[{tipo:`unica`,enunciado:"¿Qué hace `THREE.MathUtils.damp(actual, objetivo, lambda, delta)`?",opciones:["Acerca `actual` a `objetivo` de forma independiente de los FPS",`Devuelve un número aleatorio alrededor del objetivo`,`Interpola linealmente con un factor fijo`,`Reinicia la animación`],correcta:0,explicacion:"Es la versión correcta de un `lerp` continuo: el factor se deriva de `lambda` y `delta`."},{tipo:`verdadero-falso`,enunciado:`Un muelle y un damping producen el mismo resultado visual.`,correcta:!1,explicacion:`El muelle puede pasarse de largo y volver; el damping se acerca sin sobrepasar.`},{tipo:`multiple`,enunciado:`¿Qué técnicas sirven para un objetivo que se mueve?`,opciones:["`MathUtils.damp`",`Muelle`,"Easing con `t` normalizado","`lerp` con factor exponencial"],correctas:[0,1,3],explicacion:"El easing con `t` normalizado supone un destino fijo: si el objetivo se mueve, la animación apunta a un sitio al que ya no va."},{tipo:`unica`,enunciado:"¿Qué valor de `lambda` acerca más rápido?",opciones:[`12`,`4`,`0.1`,"Depende solo de `delta`"],correcta:0,explicacion:"`lambda` es una frecuencia: cuanto mayor, menos tiempo tarda en recorrer la distancia."}],recursos:[{titulo:`three.js: MathUtils`,url:`https://threejs.org/docs/#api/en/math/MathUtils`,nota:"`damp`, `lerp`, `smoothstep` y compañía, con la firma exacta."},{titulo:`easings.net`,url:`https://easings.net/`,nota:`Catálogo visual de curvas con sus fórmulas. Elige mirando, no adivinando.`},{titulo:`The book of shaders: shaping functions`,url:`https://thebookofshaders.com/05/`,nota:"Aunque sea de shaders, es la mejor explicación gráfica de `smoothstep` y las curvas."}],ejercicio:{reto:`Haz que un cubo siga al puntero sobre un plano y se detenga con suavidad, sin pasarse del objetivo.`,inicial:`import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import type { Mesh } from 'three'
import * as THREE from 'three'

function Perseguidor() {
  const malla = useRef<Mesh>(null)
  const objetivo = useRef(new THREE.Vector3())

  useFrame((state, delta) => {
    if (!malla.current) return
    // TODO: mueve el objetivo con el puntero y acerca la malla con damping
    objetivo.current.set(0, 0, 0)
    malla.current.position.lerp(objetivo.current, 0.05)
  })

  return (
    <mesh ref={malla}>
      <boxGeometry args={[0.5, 0.5, 0.5]} />
      <meshNormalMaterial />
    </mesh>
  )
}

export default function App() {
  return (
    <div style={{ height: 320 }}>
      <Canvas camera={{ position: [0, 0, 5] }}>
        <Perseguidor />
      </Canvas>
    </div>
  )
}`,solucion:`import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import type { Mesh } from 'three'
import * as THREE from 'three'

function Perseguidor() {
  const malla = useRef<Mesh>(null)
  const objetivo = useRef(new THREE.Vector3())

  useFrame((state, delta) => {
    if (!malla.current) return
    const dt = Math.min(delta, 0.1)

    // El puntero de R3F está normalizado: -1..1 en ambos ejes.
    objetivo.current.set(state.pointer.x * 1.6, state.pointer.y * 1.6, 0)

    malla.current.position.x = THREE.MathUtils.damp(malla.current.position.x, objetivo.current.x, 8, dt)
    malla.current.position.y = THREE.MathUtils.damp(malla.current.position.y, objetivo.current.y, 8, dt)
  })

  return (
    <mesh ref={malla}>
      <boxGeometry args={[0.5, 0.5, 0.5]} />
      <meshNormalMaterial />
    </mesh>
  )
}

export default function App() {
  return (
    <div style={{ height: 320 }}>
      <Canvas camera={{ position: [0, 0, 5] }}>
        <Perseguidor />
      </Canvas>
    </div>
  )
}`,pistas:["El puntero está en `state.pointer`, con valores entre -1 y 1.",`Multiplica por un radio para no salirte de la pantalla.`,"`MathUtils.damp(actual, objetivo, lambda, delta)` es la pieza que falta."]}},{id:`5.4`,modulo:5,titulo:`react-spring: animación declarativa`,objetivo:"Animar propiedades de three.js con `useSpring` y `animated`, y ajustar rigidez y amortiguación con criterio.",nivel:`medio`,minutos:55,bloques:[{tipo:`parrafo`,texto:`Hasta ahora animas tú: calculas el factor, aplicas el damping, decides cuándo parar. react-spring invierte la responsabilidad. Declaras el estado final y la librería calcula los frames intermedios con un modelo de muelle físico. Tú eliges cómo se siente (rigidez, amortiguación, masa) y ella se encarga del resto, incluidas las interrupciones.`},{tipo:`demo`,id:`m5-react-spring`,titulo:`Pulsa la caja y cambia el muelle a mitad de vuelo`},{tipo:`codigo`,lenguaje:`tsx`,titulo:`Un muelle sobre la escala`,codigo:`import { a, useSpring } from '@react-spring/three'

function Caja({ activo }: { activo: boolean }) {
  const { escala } = useSpring({
    escala: activo ? 1.4 : 1,
    config: { tension: 220, friction: 18 },
  })

  return (
    <a.mesh scale={escala}>
      <boxGeometry args={[1, 1, 1]} />
      <meshNormalMaterial />
    </a.mesh>
  )
}`},{tipo:`destacado`,tono:`porque`,titulo:"Por qué `a.mesh` y no `mesh`",texto:"Porque un `<mesh>` normal espera números, y `escala` aquí es un valor animado que cambia cada frame. `a.mesh` es la misma clase envuelta para aceptar valores de spring: los aplica por el mecanismo de R3F (mutando la propiedad) sin provocar renders de React."},{tipo:`tabla`,cabecera:[`Parámetro`,`Qué controla`,`Subirlo produce`],filas:[["`tension`",`Fuerza del muelle`,`Más velocidad, más rebote`],["`friction`",`Amortiguación`,`Menos rebote, llegada más seca`],["`mass`",`Inercia`,`Movimiento más pesado y lento`],["`precision`",`Umbral de parada`,`Cortar antes el cálculo cuando está cerca`]]},{tipo:`lista`,items:["`useSprings` para muchas animaciones independientes; `useTrail` para que vayan en cadena.",'`config` puede ser un preset (`"wobbly"`, `"gentle"`, `"stiff"`) o números.',`Cambiar el valor destino a mitad de animación no la reinicia: el muelle reacciona desde donde está.`,"`immediate: true` salta sin animar, útil para teletransportes.","El paquete es `@react-spring/three`; importar `react-spring` a secas no sirve para `a.mesh`."]}],errores:[{sintoma:"`a.mesh` lanza un error de tipos con `scale`.",causa:"El valor del spring es un `SpringValue<number>` y la prop espera tres números.",arreglo:"Usa `scale={escala}` con `escala` animando un solo número, o anima un array `[x, y, z]` completo."},{sintoma:`La animación no arranca.`,causa:"Se importó `useSpring` de `react-spring` en lugar de `@react-spring/three`.",arreglo:"Cambia el import: la versión de three trae `a.*` y el puente con R3F."},{sintoma:`Cada cambio de estado reinicia el muelle desde cero.`,causa:"Se está remontando el componente (una `key` que cambia, o una condición que lo desmonta).",arreglo:`Mantén el componente montado y cambia solo el valor destino.`}],quiz:[{tipo:`unica`,enunciado:"¿Qué hace `a.mesh` de `@react-spring/three`?",opciones:["Un `mesh` que acepta valores animados como props",`Una malla de un solo triángulo`,"Un atajo para un `<mesh>`",`Un componente de física`],correcta:0,explicacion:`Envuelve las props para que puedan venir de un spring y se apliquen sin re-render.`},{tipo:`verdadero-falso`,enunciado:`Cambiar el destino a mitad de animación reinicia el muelle desde la posición inicial.`,correcta:!1,explicacion:`Continúa desde el estado actual. Es una de sus ventajas frente a una animación por keyframes.`},{tipo:`multiple`,enunciado:`¿Qué parámetros cambian el tacto de un muelle?`,opciones:["`tension`","`friction`","`mass`","`colorSpace`"],correctas:[0,1,2],explicacion:"`colorSpace` no tiene nada que ver: es de texturas."},{tipo:`unica`,enunciado:`Para que diez objetos entren en cascada, ¿qué hook conviene?`,opciones:["`useTrail`","`useSpring`","`useTransition`","`useFrame`"],correcta:0,explicacion:"`useTrail` encadena animaciones idénticas con un retardo entre ellas."}],recursos:[{titulo:`react-spring: three.js`,url:`https://react-spring.dev/docs/guides/three-js`,nota:`La guía oficial de la integración con R3F.`},{titulo:`react-spring: config`,url:`https://react-spring.dev/docs/advanced/config`,nota:`Qué significan tensión, fricción y masa, con presets.`},{titulo:`R3F: animation`,url:`https://r3f.docs.pmnd.rs/getting-started/installation`,nota:`Contexto de por qué la animación va fuera del ciclo de React.`}],ejercicio:{reto:`Haz que un cubo cambie de escala y de color al pulsar, con un muelle que se pueda interrumpir sin reiniciarse.`,inicial:`import { useState } from 'react'
import { Canvas } from '@react-three/fiber'

function Caja({ activo }: { activo: boolean }) {
  // TODO: anima la escala entre 1 y 1.5 con useSpring
  return (
    <mesh scale={1}>
      <boxGeometry args={[1, 1, 1]} />
      <meshNormalMaterial />
    </mesh>
  )
}

export default function App() {
  const [activo, setActivo] = useState(false)
  return (
    <div style={{ height: 320 }}>
      <button onClick={() => setActivo(!activo)}>Alternar</button>
      <Canvas camera={{ position: [0, 0, 4] }}>
        <Caja activo={activo} />
      </Canvas>
    </div>
  )
}`,solucion:`import { useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { THREE } from 'three'
import { a, useSpring } from '@react-spring/three'

function Caja({ activo }: { activo: boolean }) {
  const { escala } = useSpring({
    escala: activo ? 1.5 : 1,
    config: { tension: 240, friction: 16 },
  })

  return (
    <a.mesh scale={escala}>
      <boxGeometry args={[1, 1, 1]} />
      <meshNormalMaterial />
    </a.mesh>
  )
}

export default function App() {
  const [activo, setActivo] = useState(false)
  return (
    <div style={{ height: 320 }}>
      <button onClick={() => setActivo(!activo)}>Alternar</button>
      <Canvas camera={{ position: [0, 0, 4] }}>
        <Caja activo={activo} />
      </Canvas>
    </div>
  )
}`,pistas:["Necesitas `useSpring` de `@react-spring/three` y `a.mesh`.","El valor destino es `activo ? 1.5 : 1`.","Importa `a` y `useSpring` del paquete `@react-spring/three`, no de `react-spring`."]}},{id:`5.5`,modulo:5,titulo:`Coreografía y secuencias`,objetivo:"Encadenar varios pasos con duraciones, retardos y curvas distintas dentro de un único `useFrame`, sin temporizadores sueltos.",nivel:`alto`,minutos:55,bloques:[{tipo:`parrafo`,texto:"Una animación interesante casi nunca es una sola interpolación: son cuatro o cinco cosas que ocurren en un orden, con solapes. Un cofre se abre, la tapa gira, la cerradura salta y las monedas salen despedidas. Si cada paso lleva su propio `setTimeout`, tendrás una carrera de temporizadores que no puedes pausar, reiniciar ni sincronizar con el frame."},{tipo:`demo`,id:`m5-cofre`,titulo:`Cuatro pasos, cuatro curvas, un solo reloj`},{tipo:`codigo`,lenguaje:`tsx`,titulo:`Una línea de tiempo explícita`,codigo:`const PASOS = [
  { inicio: 0.0, fin: 0.35, curva: 'back' },   // cerradura
  { inicio: 0.3, fin: 1.1, curva: 'inOut' },   // tapa
  { inicio: 1.0, fin: 1.4, curva: 'out' },     // brillo
  { inicio: 1.15, fin: 2.0, curva: 'out' },    // monedas
]

function avance(t, inicio, fin) {
  return Math.min(1, Math.max(0, (t - inicio) / (fin - inicio)))
}

useFrame((state) => {
  const t = state.clock.elapsedTime % CICLO
  tapa.current.rotation.x = -1.9 * easeInOut(avance(t, 0.3, 1.1))
})`},{tipo:`destacado`,tono:`porque`,titulo:`Por qué un reloj único y no temporizadores`,texto:"Porque un reloj es determinista: en cualquier frame puedes calcular el estado completo a partir del tiempo. Eso te da pausa, reinicio, cámara lenta y repetición gratis. Cinco `setTimeout` no se pueden rebobinar, y si el usuario cambia de pestaña se desincronizan entre sí."},{tipo:`pasos`,items:[{titulo:`1. Define la línea de tiempo`,texto:`Escribe los pasos con su inicio y su fin en segundos. Es una tabla, no código disperso por el componente.`},{titulo:`2. Normaliza cada tramo`,texto:`Convierte el tiempo absoluto en un 0..1 por paso. A partir de ahí todo es una función pura de ese número.`},{titulo:`3. Aplica la curva a cada paso`,texto:"`back` para lo que debe anticipar, `inOut` para lo grande, `out` para lo que aparece y se queda."},{titulo:`4. Compón el estado final`,texto:`Cada propiedad se calcula desde su curva. Nada de acumular incrementos: siempre desde el tiempo.`}]},{tipo:`lista`,items:[`Solapa los pasos un poco: el movimiento se ve más vivo que si van en bloque.`,"Usa un solo `useFrame` para toda la secuencia; varios compiten por el orden.","Si la secuencia debe poder pausarse, guarda el tiempo acumulado en un `ref` y no uses `elapsedTime` directamente.","Para secuencias disparadas por eventos, react-spring con `useChain` es una alternativa válida.",`Un ciclo completo debe cerrar: si empieza y acaba en el mismo estado, se puede repetir sin salto.`]}],errores:[{sintoma:`Los pasos van a destiempo después de un rato.`,causa:"Cada paso lleva su propio `setInterval`, y los intervalos derivan entre sí.",arreglo:`Un único reloj y funciones puras del tiempo: todos los pasos leen la misma fuente.`},{sintoma:`Al cambiar de pestaña la secuencia se queda a medias.`,causa:`Se usan temporizadores que no se pausan con el frame.`,arreglo:"Acumula `delta` acotado; si el canvas se pausa, el tiempo deja de avanzar."},{sintoma:`La secuencia se reinicia al mover el ratón.`,causa:`Se recalcula el tiempo en función de un estado que cambia con el puntero.`,arreglo:`El tiempo debe venir del reloj, no del estado de la interfaz.`}],quiz:[{tipo:`unica`,enunciado:`¿Qué ventaja tiene calcular la secuencia como función del tiempo?`,opciones:[`Se puede pausar, rebobinar y repetir`,`Ocupa menos memoria`,"Evita tener que usar `useFrame`",`Mejora la resolución del canvas`],correcta:0,explicacion:`Con una función pura del tiempo, cualquier fotograma se puede reconstruir. Con incrementos acumulados, no.`},{tipo:`verdadero-falso`,enunciado:"Es mejor un `setTimeout` por paso para que no interfieran.",correcta:!1,explicacion:`Justo lo contrario: los temporizadores derivan, no se pausan con el render y no se pueden sincronizar.`},{tipo:`multiple`,enunciado:`¿Qué hace que una secuencia se vea «de dibujos animados»?`,opciones:[`Solapar los pasos`,`Usar curvas distintas por paso`,`Que todos los pasos empiecen y acaben a la vez`,`Que la anticipación sea visible`],correctas:[0,1,3],explicacion:`Empezar y acabar todo a la vez es la receta del movimiento robótico.`},{tipo:`unica`,enunciado:`Para una pausa fiable, ¿qué guardas?`,opciones:["Tiempo acumulado en un `ref`","`performance.now()` de cada frame",`El número de frames dibujados`,"El estado en `localStorage`"],correcta:0,explicacion:"Acumular `delta` (acotado) te da un reloj que solo avanza cuando la escena avanza."}],recursos:[{titulo:`react-spring: useChain`,url:`https://react-spring.dev/docs/components/use-chain`,nota:`Alternativa declarativa para encadenar animaciones disparadas por eventos.`},{titulo:`R3F: useFrame`,url:`https://r3f.docs.pmnd.rs/api/hooks#useframe`,nota:`Recordatorio de que la prioridad importa cuando hay varias animaciones.`},{titulo:`easings.net`,url:`https://easings.net/`,nota:`Para elegir la curva de cada paso con criterio visual.`}],ejercicio:{reto:`Encadena tres pasos sobre un mismo cubo: crece, gira y cambia de color, con la mitad de duración cada uno y solapando un 20 %.`,inicial:`import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import type { Mesh } from 'three'

const CICLO = 3

function avance(t: number, inicio: number, fin: number) {
  return Math.min(1, Math.max(0, (t - inicio) / (fin - inicio)))
}

function Cubo() {
  const malla = useRef<Mesh>(null)

  useFrame((state) => {
    const t = state.clock.elapsedTime % CICLO
    if (!malla.current) return

    // TODO: paso 1 (0 → 1s) escala; paso 2 (0.8 → 1.8) rotación; paso 3 (1.6 → 2.6) color
    malla.current.scale.setScalar(1)
    malla.current.rotation.y = 0
  })

  return (
    <mesh ref={malla}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="#4d8df6" />
    </mesh>
  )
}

export default function App() {
  return (
    <div style={{ height: 320 }}>
      <Canvas camera={{ position: [0, 1.5, 4] }}>
        <ambientLight intensity={0.8} />
        <directionalLight position={[3, 4, 2]} intensity={2} />
        <Cubo />
      </Canvas>
    </div>
  )
}`,solucion:`import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import type { Mesh, MeshStandardMaterial } from 'three'

const CICLO = 3

function avance(t: number, inicio: number, fin: number) {
  return Math.min(1, Math.max(0, (t - inicio) / (fin - inicio)))
}

function Cubo() {
  const malla = useRef<Mesh>(null)
  const material = useRef<MeshStandardMaterial>(null)

  useFrame((state) => {
    const t = state.clock.elapsedTime % CICLO
    if (!malla.current || !material.current) return

    const escala = avance(t, 0, 1)
    const giro = avance(t, 0.8, 1.8)
    const mezcla = avance(t, 1.6, 2.6)

    malla.current.scale.setScalar(1 + escala * 0.6)
    malla.current.rotation.y = giro * Math.PI * 2

    material.current.color.setRGB(0.3 + mezcla * 0.65, 0.55 - mezcla * 0.3, 0.96 - mezcla * 0.6)
  })

  return (
    <mesh ref={malla}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial ref={material} color="#4d8df6" />
    </mesh>
  )
}

export default function App() {
  return (
    <div style={{ height: 320 }}>
      <Canvas camera={{ position: [0, 1.5, 4] }}>
        <ambientLight intensity={0.8} />
        <directionalLight position={[3, 4, 2]} intensity={2} />
        <Cubo />
      </Canvas>
    </div>
  )
}`,pistas:["Cada paso se calcula con `avance(t, inicio, fin)`, que devuelve 0..1.","Para el color puedes usar `material.current.color.setRGB(r, g, b)`.","Necesitas un `ref` al material además del de la malla."]}},{id:`5.6`,modulo:5,titulo:'`frameloop="demand"` e `invalidate`',objetivo:`Pintar solo cuando hay algo que pintar, y decidir con criterio cuándo un canvas debe estar siempre activo y cuándo no.`,nivel:`alto`,minutos:40,bloques:[{tipo:`parrafo`,texto:'Un canvas en `frameloop="always"` dibuja 60 veces por segundo aunque no cambie nada. En una escena con tres demos, eso son tres contextos WebGL trabajando para producir imágenes idénticas. `demand` cambia el contrato: dibuja un frame cuando se lo pides, y tú eres responsable de pedirlo cuando algo cambia.'},{tipo:`demo`,id:`m5-demand`,titulo:`El contador deja de subir`},{tipo:`codigo`,lenguaje:`tsx`,titulo:`Pedir un frame a mano`,codigo:`<Canvas frameloop="demand">
  <Escena />
</Canvas>

function Escena() {
  const invalidate = useThree((estado) => estado.invalidate)
  const [girado, setGirado] = useState(false)

  // Al cambiar el estado, R3F ya invalida solo.
  return (
    <mesh
      rotation={[0, girado ? Math.PI / 4 : 0, 0]}
      onClick={() => setGirado((v) => !v)}
    >
      <boxGeometry />
      <meshNormalMaterial />
    </mesh>
  )
}

// Si mutas algo fuera de React, pide el frame tú:
// malla.current.rotation.y += 0.1
// invalidate()`},{tipo:`destacado`,tono:`porque`,titulo:"Por qué `demand` no rompe `useFrame`",texto:"Porque `useFrame` se ejecuta durante el frame que se dibuja, no en un bucle propio. En `demand`, se ejecuta una vez por cada frame pedido. Si esperabas que animara sola, el objeto se queda quieto: es el síntoma clásico de activar `demand` y olvidar quién invalidaba."},{tipo:`tabla`,cabecera:[`Modo`,`Cuándo dibuja`,`Coste`,`Cuándo usarlo`],filas:[["`always`",`Continuamente`,`Constante`,`Animación continua, juegos, demos`],["`demand`",`Al invalidar`,`Solo cuando hace falta`,`Visores, configuradores, gráficos estáticos`],["`never`",`Nunca (manual)`,`Control total`,`Cuándo tú llevas el bucle, casos raros`]]},{tipo:`lista`,items:["`invalidate()` pide un frame; varias llamadas en el mismo tick se agrupan.",`Los cambios de estado y de props de R3F invalidan automáticamente.`,"`OrbitControls` invalida al moverse, así que `demand` funciona con él.",`Un cambio en la resolución del canvas o en el tamaño del contenedor también invalida.`,"En el visor de este curso se usa `demand` porque el modelo está quieto hasta que lo arrastras."]}],errores:[{sintoma:"Con `demand`, la escena no se mueve.",causa:"Hay animación en `useFrame` pero nadie llama a `invalidate()`.",arreglo:"Llama a `invalidate()` cuando cambie algo, o vuelve a `always` si la animación es continua."},{sintoma:`La escena parpadea o se ve a medias al redimensionar.`,causa:`Se pintó mientras el canvas estaba a tamaño 0.`,arreglo:"No pidas frames durante el montaje; deja que el primer `ResizeObserver` lo haga."},{sintoma:"Con `demand` la primera imagen no aparece.",causa:"Nadie ha invalidado tras el montaje en un caso raro (contenido inyectado por `primitive`).",arreglo:"Un `invalidate()` en el primer `useEffect` lo resuelve."}],quiz:[{tipo:`unica`,enunciado:'En `frameloop="demand"`, ¿cuándo se ejecuta `useFrame`?',opciones:[`Una vez por frame pedido`,`Nunca`,`Sesenta veces por segundo igualmente`,`Solo al desmontar`],correcta:0,explicacion:"El bucle no existe: cada `invalidate()` produce un frame y ahí corre `useFrame`."},{tipo:`verdadero-falso`,enunciado:`Cambiar el estado de React invalida el frame automáticamente.`,correcta:!0,explicacion:"R3F pide un frame cuando cambia el árbol o las props. Solo las mutaciones manuales necesitan `invalidate()`."},{tipo:`multiple`,enunciado:"¿Qué escenas se benefician de `demand`?",opciones:[`Un configurador de producto que gira solo al arrastrar`,`Un juego con animación continua`,`Un visor de modelos quieto`,`Un gráfico 3D que solo cambia al elegir una opción`],correctas:[0,2,3],explicacion:"Si hay movimiento constante, `always` es lo correcto: en `demand` tendrías que invalidar en cada frame."},{tipo:`unica`,enunciado:"¿Qué hace falta para mover un objeto mutando su `ref` en modo `demand`?",opciones:["Llamar a `invalidate()`",`Nada, se dibuja solo`,`Volver a montar el canvas`,"Usar `setState`"],correcta:0,explicacion:`La mutación no la ve nadie: hay que pedir explícitamente el frame.`}],recursos:[{titulo:`R3F: canvas`,url:`https://r3f.docs.pmnd.rs/api/canvas`,nota:"La prop `frameloop` y sus tres valores."},{titulo:`R3F: useThree`,url:`https://r3f.docs.pmnd.rs/api/hooks#usethree`,nota:"De dónde sale `invalidate` y qué más hay en el estado."},{titulo:`three.js: WebGLRenderer`,url:`https://threejs.org/docs/#api/en/renderers/WebGLRenderer`,nota:"`setAnimationLoop` es lo que R3F usa por debajo."}],ejercicio:{reto:`Convierte una escena animada en una que solo dibuja al pulsar, con un contador visible de frames.`,inicial:`import { useRef, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import type { Mesh } from 'three'

function Cubo({ pasos }: { pasos: number }) {
  const malla = useRef<Mesh>(null)
  useFrame(() => {
    if (malla.current) malla.current.rotation.y = pasos * 0.2
  })
  return (
    <mesh ref={malla}>
      <boxGeometry />
      <meshNormalMaterial />
    </mesh>
  )
}

export default function App() {
  const [pasos, setPasos] = useState(0)
  return (
    <div style={{ height: 300 }}>
      <button onClick={() => setPasos(pasos + 1)}>Girar</button>
      <Canvas frameloop="demand" camera={{ position: [2, 2, 3] }}>
        <Cubo pasos={pasos} />
      </Canvas>
    </div>
  )
}`,solucion:`import { useEffect, useRef, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import type { Mesh } from 'three'

function Cubo({ pasos }: { pasos: number }) {
  const malla = useRef<Mesh>(null)
  useFrame(() => {
    if (malla.current) malla.current.rotation.y = pasos * 0.2
  })
  return (
    <mesh ref={malla}>
      <boxGeometry />
      <meshNormalMaterial />
    </mesh>
  )
}

/** Cuenta los frames realmente dibujados, sin provocar renders. */
function ContadorFrames({ alCambiar }: { alCambiar: (n: number) => void }) {
  const invalidate = useThree((estado) => estado.invalidate)
  const frames = useRef(0)

  useEffect(() => {
    // El contenido inicial no invalida por sí solo en algunos casos.
    invalidate()
  }, [invalidate])

  useFrame(() => {
    frames.current += 1
    if (frames.current % 5 === 0) alCambiar(frames.current)
  })

  return null
}

export default function App() {
  const [pasos, setPasos] = useState(0)
  const [dibujados, setDibujados] = useState(0)

  return (
    <div style={{ height: 300 }}>
      <button onClick={() => setPasos(pasos + 1)}>Girar</button>
      <p>frames dibujados: {dibujados}</p>
      <Canvas frameloop="demand" camera={{ position: [2, 2, 3] }}>
        <Cubo pasos={pasos} />
        <ContadorFrames alCambiar={setDibujados} />
      </Canvas>
    </div>
  )
}`,pistas:[`Cada clic cambia una prop, y eso ya invalida el frame.`,"Para contar frames, un `useFrame` con un `ref` y actualizar el HTML de vez en cuando.",`No pongas el contador en estado en cada frame: eso anula el ahorro que buscas.`]}}]},{numero:6,titulo:`Interacción: eventos, cámara y controles`,descripcion:`Una escena que no reacciona es una fotografía. Aquí aprendes a escuchar el puntero, mover la cámara con límites, leer el teclado sin re-renderizar y convertir el scroll en parte de la puesta en escena.`,lecciones:[{id:`6.1`,modulo:6,titulo:`Eventos de puntero`,objetivo:`Manejar onClick, onPointerOver y onPointerOut sobre objetos 3D, leer el punto de impacto y cortar la propagación cuando haga falta.`,nivel:`intro`,minutos:50,bloques:[{tipo:`parrafo`,texto:`En una página normal, un botón recibe clics porque el navegador sabe dónde está y qué tamaño tiene. Un cubo en WebGL no es un elemento del DOM: es geometría dibujada dentro de un canvas. Para que reaccione al puntero, alguien tiene que calcular qué objeto hay debajo y a qué distancia. Ese cálculo es un raycast, y React Three Fiber lo hace por ti en cada evento de puntero.`},{tipo:`demo`,id:`m6-galeria-eventos`,titulo:`Cinco piezas, cinco formas de reaccionar`,alto:380,nota:`El rótulo de debajo del lienzo muestra el último evento y sus coordenadas. El suelo también escucha: las piezas llaman a stopPropagation para que el clic no llegue hasta él.`},{tipo:`parrafo`,texto:`Pasa el puntero por las piezas y pulsa. El cubo cambia de color al entrar y alterna su tono al hacer clic; la esfera crece y gira; el cono se eleva; el toro gira en dos pasos; el icosaedro pasa a modo alambre. Ninguno de esos efectos está programado en el objeto: todos son estado de React que cambia porque un handler se ha ejecutado. Fíjate también en el suelo del fondo: si pulsas fuera de las piezas, recibes el clic con sus coordenadas de mundo.`},{tipo:`destacado`,tono:`porque`,titulo:`Por qué el orden importa`,texto:`R3F no añade un listener a cada objeto. Escucha en el canvas, lanza un rayo desde la cámara por el puntero y recorre los objetos atravesados del más cercano al más lejano. A cada uno le llama su handler. Por eso una pieza que está delante puede impedir que el suelo de detrás reciba el mismo evento: basta con llamar a stopPropagation.`},{tipo:`codigo`,lenguaje:`tsx`,titulo:`Los tres handlers que usarás el 90 % del tiempo`,codigo:`function Cubo() {
  const [hover, setHover] = useState(false)

  return (
    <mesh
      onPointerOver={(e) => {
        e.stopPropagation()            // el suelo de detrás no recibe el evento
        setHover(true)
        document.body.style.cursor = 'pointer'
      }}
      onPointerOut={(e) => {
        e.stopPropagation()
        setHover(false)
        document.body.style.cursor = 'auto'
      }}
      onClick={(e) => {
        e.stopPropagation()
        // e.point está en coordenadas de mundo, no en píxeles
        console.log(e.point.x, e.point.y, e.point.z)
      }}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={hover ? '#f5a524' : '#4d8df6'} />
    </mesh>
  )
}`},{tipo:`tabla`,cabecera:[`Evento`,`Cuándo llega`,`Para qué sirve`],filas:[[`onPointerOver`,`El puntero entra en el objeto`,`Resaltar, cambiar el cursor`],[`onPointerOut`,`El puntero sale del objeto`,`Deshacer el resaltado`],[`onClick`,`Baja y sube el botón sobre el mismo objeto`,`Seleccionar, alternar un valor`],[`onPointerMove`,`El puntero se mueve sobre el objeto`,`Arrastrar; nunca para setState`]]},{tipo:`lista`,items:["`event.object` es la malla intersectada; `event.eventObject` es la que registró el handler, que puede ser un grupo padre.","`event.point` es el punto de impacto en coordenadas de mundo. Es el dato que usarás para colocar cosas sobre una superficie.","`event.distance` mide desde la cámara hasta el impacto. Sirve para ordenar o para descartar lo que está demasiado lejos.","`event.intersections` contiene todas las intersecciones ordenadas; `event.stopPropagation()` corta las que vienen después.","`onPointerMissed` no va en un objeto: si lo necesitas, se declara en el `<Canvas>`."]},{tipo:`destacado`,tono:`ojo`,titulo:`El cursor y el estado son globales`,texto:`Si cambias document.body.style.cursor al entrar, tienes que restaurarlo al salir y también al desmontar la demo. Y no metas setState dentro de onPointerMove: ese evento se dispara decenas de veces por segundo. Para lo que cambia en cada frame, guarda el dato en un ref y muévelo en useFrame.`}],errores:[{sintoma:`El cursor se queda como una mano por toda la página después de salir del lienzo.`,causa:`Solo restauras el cursor en onPointerOut, pero ese evento no siempre llega si el objeto desaparece o el puntero abandona el canvas de golpe.`,arreglo:`Restaura el cursor en onPointerOut y añade un useEffect con limpieza que lo devuelva a auto al desmontar la demo.`},{sintoma:`Al pulsar una pieza también se ejecuta el handler del suelo que hay detrás.`,causa:`El evento recorre todas las intersecciones del rayo, de la más cercana a la más lejana, y el suelo está detrás.`,arreglo:`Llama a event.stopPropagation() en el handler de la pieza. Si quieres que el suelo reciba el evento cuando la pieza no lo maneja, no lo llames.`},{sintoma:`La escena se entrecorta al mover el puntero por encima de un objeto.`,causa:`Estás guardando la posición del puntero en useState dentro de onPointerMove, lo que provoca un render de React por cada movimiento.`,arreglo:`Guarda el valor en un ref y úsalo desde useFrame, o limita las actualizaciones de UI a eventos puntuales como over, out o clic.`}],quiz:[{tipo:`unica`,enunciado:`¿Qué contiene event.point en un handler de R3F?`,opciones:[`La posición del puntero en píxeles de pantalla`,`El punto de impacto del rayo en coordenadas de mundo`,`La normal de la cara intersectada`,`La posición actual de la cámara`],correcta:1,explicacion:`El punto de impacto se calcula en el espacio de la escena. Para píxeles está event.nativeEvent.clientX, y para la normal, event.face.normal.`},{tipo:`multiple`,enunciado:`¿Qué eventos pertenecen al sistema de punteros de R3F?`,opciones:[`onClick`,`onPointerOver`,`onPointerOut`,`onMouseEnter`],correctas:[0,1,2],explicacion:`R3F trabaja con eventos de puntero. onMouseEnter es un evento del DOM que R3F no replica; el equivalente es onPointerEnter.`},{tipo:`verdadero-falso`,enunciado:`Un objeto sin ningún handler de evento sigue participando en el raycast de los eventos de puntero.`,correcta:!1,explicacion:`R3F solo prueba los objetos que tienen handlers registrados. Si no hay handler, el objeto no entra en la lista de intersecciones de los eventos.`},{tipo:`unica`,enunciado:`¿Qué hace event.stopPropagation() dentro de un handler de R3F?`,opciones:[`Cancela el evento nativo del navegador`,`Impide que las intersecciones más lejanas reciban el mismo evento`,`Elimina el handler del objeto`,`Detiene el bucle de render`],correcta:1,explicacion:`El evento se reparte por las intersecciones ordenadas por distancia. stopPropagation corta ese reparto; no tiene nada que ver con el bucle de render.`}],recursos:[{titulo:`React Three Fiber — Events`,url:`https://r3f.docs.pmnd.rs/api/events`,nota:`La referencia de los eventos, la propagación y onPointerMissed.`},{titulo:`three.js — Raycaster`,url:`https://threejs.org/docs/#api/en/core/Raycaster`,nota:`El cálculo que hay debajo de cada hover. Útil para entender el coste.`},{titulo:`MDN — Pointer events`,url:`https://developer.mozilla.org/en-US/docs/Web/API/Pointer_events`,nota:`El modelo de eventos del navegador: pointerdown, pointermove, pointerup y captura.`}],ejercicio:{reto:`Convierte una rejilla de 3×3 cubos en una galería: cada cubo se ilumina al pasar el puntero y cambia de color al hacer clic, sin que el clic se propague a los demás.`,inicial:`import { useState } from 'react'
import { Canvas } from '@react-three/fiber'

function Cubo({ x, z }: { x: number; z: number }) {
  const [hover, setHover] = useState(false)
  const [color, setColor] = useState('#4d8df6')

  return (
    <mesh
      position={[x, 0, z]}
      // TODO: añade onPointerOver, onPointerOut y onClick
    >
      <boxGeometry args={[0.7, 0.7, 0.7]} />
      <meshStandardMaterial color={hover ? '#3fbf87' : color} />
    </mesh>
  )
}

export default function App() {
  const posiciones = [-1.1, 0, 1.1]

  return (
    <div style={{ height: 340, background: '#111' }}>
      <Canvas camera={{ position: [0, 4, 5] }}>
        <ambientLight intensity={0.7} />
        <directionalLight position={[3, 6, 4]} intensity={2} />
        {posiciones.map((x) =>
          posiciones.map((z) => <Cubo key={x + '-' + z} x={x} z={z} />),
        )}
      </Canvas>
    </div>
  )
}`,solucion:`import { useState } from 'react'
import { Canvas } from '@react-three/fiber'

function Cubo({ x, z }: { x: number; z: number }) {
  const [hover, setHover] = useState(false)
  const [color, setColor] = useState('#4d8df6')

  return (
    <mesh
      position={[x, 0, z]}
      onPointerOver={(e) => {
        e.stopPropagation()
        setHover(true)
      }}
      onPointerOut={() => setHover(false)}
      onClick={(e) => {
        e.stopPropagation()
        setColor((actual) => (actual === '#4d8df6' ? '#f5a524' : '#4d8df6'))
      }}
    >
      <boxGeometry args={[0.7, 0.7, 0.7]} />
      <meshStandardMaterial color={hover ? '#3fbf87' : color} />
    </mesh>
  )
}

export default function App() {
  const posiciones = [-1.1, 0, 1.1]

  return (
    <div style={{ height: 340, background: '#111' }}>
      <Canvas camera={{ position: [0, 4, 5] }}>
        <ambientLight intensity={0.7} />
        <directionalLight position={[3, 6, 4]} intensity={2} />
        {posiciones.map((x) =>
          posiciones.map((z) => <Cubo key={x + '-' + z} x={x} z={z} />),
        )}
      </Canvas>
    </div>
  )
}`,pistas:[`Los tres handlers se colocan en el <mesh>, como si fueran props de React normales.`,`El hover puede ser un booleano; el clic, un contador o un color que alterna.`,`No olvides event.stopPropagation() en el clic y en el hover para que el cubo de detrás no responda.`]}},{id:`6.2`,modulo:6,titulo:`Raycasting`,objetivo:`Explicar qué hace un raycast, dibujar el rayo del puntero y medir cuántos objetos atraviesa sin disparar renders de React.`,nivel:`medio`,minutos:55,bloques:[{tipo:`parrafo`,texto:`R3F ya lanza un rayo cada vez que mueves o pulsas el puntero: eso es lo que hace posible la lección anterior. En esta vas a lanzar otro rayo a mano, uno por frame, para verlo y medirlo. Es el mismo cálculo, pero explícito. Y como es explícito, también es tuyo su coste: cada frame recorres los objetos que le pidas y pruebas sus triángulos. Verlo dibujado ayuda a entender por qué conviene limitarlo.`},{tipo:`widget`,id:`m6-puntero-ndc`,titulo:`El puntero no llega en píxeles: llega en NDC`},{tipo:`parrafo`,texto:`El widget muestra el mapeo: el centro del lienzo es (0, 0), el borde derecho es x = 1, el superior es y = 1 y el eje vertical va al revés que en CSS. Ese par de valores es state.pointer, y es exactamente lo que espera raycaster.setFromCamera. Si conviertes otra vez a píxeles antes de llamarlo, el rayo apuntará a cualquier sitio menos a donde está el puntero.`},{tipo:`demo`,id:`m6-raycast`,titulo:`El rayo, la intersección y el recuento`,alto:400,nota:`El rayo nace en la cámara y pasa por el puntero. Se pinta en ámbar cuando encuentra algo y en azul cuando no. El contador es el número de impactos, no el número de objetos: una misma malla puede aportar más de una intersección.`},{tipo:`parrafo`,texto:`Mueve el puntero por los huecos entre las piezas y luego por encima de ellas. El rayo no cambia de origen: siempre sale de la cámara. Lo único que cambia es su dirección. Cuando atraviesa el toro, el cubo y la esfera, el recuento sube; cuando pasa entre ellos, cae a cero y la línea se vuelve azul. Esa línea no es un objeto especial de three.js: es una Line normal cuya geometría tiene dos vértices que se reescriben en cada frame.`},{tipo:`destacado`,tono:`porque`,titulo:`R3F ya raycasta. ¿Por qué otro rayo?`,texto:`Porque el de R3F solo existe mientras se está despachando un evento: sirve para decidir qué handler llamar. El de la demo mide de forma continua, aunque no pulses nada. Son dos necesidades distintas y dos costes distintos. El de la demo corre 60 veces por segundo; por eso se limita a una escena pequeña y se reutilizan el raycaster y los vectores en lugar de crear objetos dentro del frame.`},{tipo:`codigo`,lenguaje:`tsx`,titulo:`El rayo completo, frame a frame`,codigo:`const raycaster = useRef(new THREE.Raycaster())
const fin = useRef(new THREE.Vector3())

useFrame((state) => {
  // La cámara pudo moverse en este frame: las matrices deben estar al día.
  state.camera.updateMatrixWorld()
  raycaster.current.setFromCamera(state.pointer, state.camera)

  const impactos = raycaster.current
    .intersectObjects(state.scene.children, true)   // true = recursivo

  const primero = impactos[0]
  if (primero) {
    fin.current.copy(primero.point)
  } else {
    // Sin impacto, el rayo se dibuja hasta 20 unidades.
    fin.current
      .copy(raycaster.current.ray.origin)
      .addScaledVector(raycaster.current.ray.direction, 20)
  }

  // Actualiza los dos vértices de la línea sin crear una geometría nueva.
  const posiciones = linea.current.geometry.getAttribute('position')
  posiciones.setXYZ(0, raycaster.current.ray.origin.x, raycaster.current.ray.origin.y, raycaster.current.ray.origin.z)
  posiciones.setXYZ(1, fin.current.x, fin.current.y, fin.current.z)
  posiciones.needsUpdate = true
})`},{tipo:`lista`,items:[`state.pointer ya está en NDC. No lo normalices dos veces.`,`Reutiliza el raycaster y los vectores: crear un Vector3 por frame es basura para el recolector.`,`intersectObjects(..., true) recorre los hijos; con false solo prueba el primer nivel.`,`raycaster.layers permite decidir qué objetos son candidatos, sin tocar la escena.`,`raycaster.far acota la distancia: lo que esté más lejos ni se prueba.`,`Para actualizar la UI usa refs o mutaciones del DOM; un setState por frame es una reconciliación de React por frame.`]},{tipo:`destacado`,tono:`ojo`,titulo:`El coste no es fijo`,texto:`Un raycast cuesta más cuantos más objetos candidatos haya y cuanta más geometría tenga cada uno. three.js descarta antes por esfera envolvente, pero no es gratis. Si la escena crece, no lances el rayo contra todo cada frame: limita por capas, por grupo o hazlo cada dos o tres frames. Y mide antes de optimizar; no hay una cifra universal de milisegundos.`}],errores:[{sintoma:`La línea no aparece o se queda clavada en el centro de la escena.`,causa:`La geometría tiene dos vértices, pero nunca actualizas sus posiciones o te olvidas de needsUpdate.`,arreglo:`Escribe los dos vértices con setXYZ y marca el atributo con needsUpdate = true en cada frame.`},{sintoma:`El recuento se queda a cero aunque el puntero esté encima de una malla.`,causa:`Estás lanzando el rayo contra un array que no contiene los objetos, o la cámara se ha movido sin actualizar su matriz de mundo.`,arreglo:`Comprueba qué le pasas a intersectObjects y llama a camera.updateMatrixWorld() antes de setFromCamera si mueves la cámara por código.`},{sintoma:`Al añadir objetos, la demo empieza a ir a tirones.`,causa:`Lanzas el rayo contra la escena entera en cada frame, con recursión.`,arreglo:`Limita el raycast a un grupo reducido, usa raycaster.layers o lánzalo cada pocos frames. El rayo de la demo nunca necesita probar la escena completa.`}],quiz:[{tipo:`unica`,enunciado:`¿Qué coordenadas espera raycaster.setFromCamera como primer argumento?`,opciones:[`Píxeles desde la esquina superior izquierda`,`Coordenadas normalizadas entre -1 y 1`,`Coordenadas de mundo`,`Grados de rotación de la cámara`],correcta:1,explicacion:`setFromCamera trabaja con NDC, el mismo espacio que state.pointer. El centro es (0, 0) y los bordes llegan a ±1.`},{tipo:`verdadero-falso`,enunciado:`El raycast que hace R3F para despachar un evento y el que hace esta demo en useFrame son el mismo cálculo reutilizado.`,correcta:!1,explicacion:`Son dos raycasts independientes. El de R3F solo vive durante el evento; el de la demo se ejecuta en cada frame aunque no pase nada.`},{tipo:`multiple`,enunciado:`¿Qué decisiones reducen el coste de un raycast continuo?`,opciones:[`Lanzarlo contra un grupo reducido en vez de contra toda la escena`,`Limitar los candidatos con raycaster.layers`,`Lanzarlo contra la escena completa en cada frame`,`Reutilizar el raycaster y los vectores auxiliares`],correctas:[0,1,3],explicacion:`Cuantos menos candidatos y menos asignaciones por frame, mejor. Lanzarlo contra todo cada frame es justo lo que hay que evitar.`},{tipo:`unica`,enunciado:`¿Qué devuelve intersectObjects cuando el rayo no toca nada?`,opciones:[`null`,`Un array vacío`,`Una intersección con distancia infinita`,`Lanza un error`],correcta:1,explicacion:`Siempre devuelve un array. Si está vacío, no hay impacto; puedes comprobar length o leer el primer elemento con cuidado.`}],recursos:[{titulo:`three.js — Raycaster`,url:`https://threejs.org/docs/#api/en/core/Raycaster`,nota:`setFromCamera, intersectObjects, layers y far: todo lo que usa la demo.`},{titulo:`three.js — Vector2`,url:`https://threejs.org/docs/#api/en/math/Vector2`,nota:`El tipo de state.pointer y de las coordenadas NDC.`},{titulo:`React Three Fiber — Events`,url:`https://r3f.docs.pmnd.rs/api/events`,nota:`Para comparar el raycast de los eventos con el que haces tú a mano.`}],ejercicio:{reto:`Completa la línea del rayo: debe ir desde la cámara hasta el primer impacto, o hasta 20 unidades si no toca nada. El contador de impactos ya funciona.`,inicial:`import { useMemo, useRef } from 'react'
import type { RefObject } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

function Escena({ cuenta }: { cuenta: RefObject<HTMLSpanElement | null> }) {
  const escena = useThree((estado) => estado.scene)
  const raycaster = useRef(new THREE.Raycaster())
  const fin = useRef(new THREE.Vector3())

  const rayo = useMemo(() => {
    const geometria = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(),
      new THREE.Vector3(),
    ])
    const linea = new THREE.Line(
      geometria,
      new THREE.LineBasicMaterial({ color: '#f5a524' }),
    )
    linea.raycast = () => {}
    return linea
  }, [])

  useFrame((estado) => {
    estado.camera.updateMatrixWorld()
    raycaster.current.setFromCamera(estado.pointer, estado.camera)

    const impactos = raycaster.current.intersectObjects(escena.children, true)
    const primero = impactos[0]

    if (primero) fin.current.copy(primero.point)
    else {
      fin.current
        .copy(raycaster.current.ray.origin)
        .addScaledVector(raycaster.current.ray.direction, 20)
    }

    if (cuenta.current) cuenta.current.textContent = String(impactos.length)

    // TODO: escribe el origen y el final en los dos vértices de la línea.
  })

  return (
    <>
      <primitive object={rayo} />
      <ambientLight intensity={0.8} />
      <directionalLight position={[4, 6, 4]} intensity={2} />
      <mesh position={[-1.2, 0.5, 0]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="#4d8df6" />
      </mesh>
      <mesh position={[1.2, 0.5, 0]}>
        <sphereGeometry args={[0.6, 24, 24]} />
        <meshStandardMaterial color="#3fbf87" />
      </mesh>
    </>
  )
}

export default function App() {
  const cuenta = useRef<HTMLSpanElement>(null)

  return (
    <div style={{ height: 340, background: '#111' }}>
      <p style={{ color: '#eee', fontFamily: 'system-ui', padding: 8, margin: 0 }}>
        Impactos: <span ref={cuenta}>0</span>
      </p>
      <Canvas style={{ height: 290 }} camera={{ position: [0, 1.5, 5] }}>
        <Escena cuenta={cuenta} />
      </Canvas>
    </div>
  )
}`,solucion:`import { useMemo, useRef } from 'react'
import type { RefObject } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

function Escena({ cuenta }: { cuenta: RefObject<HTMLSpanElement | null> }) {
  const escena = useThree((estado) => estado.scene)
  const raycaster = useRef(new THREE.Raycaster())
  const fin = useRef(new THREE.Vector3())

  const rayo = useMemo(() => {
    const geometria = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(),
      new THREE.Vector3(),
    ])
    const linea = new THREE.Line(
      geometria,
      new THREE.LineBasicMaterial({ color: '#f5a524' }),
    )
    linea.raycast = () => {}
    return linea
  }, [])

  useFrame((estado) => {
    estado.camera.updateMatrixWorld()
    raycaster.current.setFromCamera(estado.pointer, estado.camera)

    const impactos = raycaster.current.intersectObjects(escena.children, true)
    const primero = impactos[0]

    if (primero) fin.current.copy(primero.point)
    else {
      fin.current
        .copy(raycaster.current.ray.origin)
        .addScaledVector(raycaster.current.ray.direction, 20)
    }

    if (cuenta.current) cuenta.current.textContent = String(impactos.length)

    const geometria = rayo.geometry
    const posiciones = geometria.getAttribute('position') as THREE.BufferAttribute
    const origen = raycaster.current.ray.origin
    posiciones.setXYZ(0, origen.x, origen.y, origen.z)
    posiciones.setXYZ(1, fin.current.x, fin.current.y, fin.current.z)
    posiciones.needsUpdate = true
  })

  return (
    <>
      <primitive object={rayo} />
      <ambientLight intensity={0.8} />
      <directionalLight position={[4, 6, 4]} intensity={2} />
      <mesh position={[-1.2, 0.5, 0]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="#4d8df6" />
      </mesh>
      <mesh position={[1.2, 0.5, 0]}>
        <sphereGeometry args={[0.6, 24, 24]} />
        <meshStandardMaterial color="#3fbf87" />
      </mesh>
    </>
  )
}

export default function App() {
  const cuenta = useRef<HTMLSpanElement>(null)

  return (
    <div style={{ height: 340, background: '#111' }}>
      <p style={{ color: '#eee', fontFamily: 'system-ui', padding: 8, margin: 0 }}>
        Impactos: <span ref={cuenta}>0</span>
      </p>
      <Canvas style={{ height: 290 }} camera={{ position: [0, 1.5, 5] }}>
        <Escena cuenta={cuenta} />
      </Canvas>
    </div>
  )
}`,pistas:[`La geometría ya tiene un atributo position con dos vértices: no la recrees.`,`getAttribute("position") devuelve un BufferAttribute; usa setXYZ con el índice 0 y el 1.`,`Después de escribir, asigna needsUpdate = true para que la GPU reciba los cambios.`]}},{id:`6.3`,modulo:6,titulo:`Controles de cámara`,objetivo:`Configurar OrbitControls y CameraControls con límites de distancia, ángulo polar y azimut, y leer esos límites en la escena.`,nivel:`intro`,minutos:50,bloques:[{tipo:`parrafo`,texto:`Una cámara libre es estupenda hasta que el usuario la mete debajo del suelo o la atraviesa. Los controles de cámara no solo mueven la cámara: también la frenan. OrbitControls orbita alrededor de un objetivo y es el estándar para inspeccionar un objeto. CameraControls añade desplazamientos, transiciones y un suavizado más fino. En esta lección vas a montar los dos y a dibujar sus límites para que dejen de ser números invisibles.`},{tipo:`demo`,id:`m6-controles`,titulo:`Dos controles, dos conjuntos de límites`,alto:420,nota:`El anillo azul es minDistance, el ámbar es maxDistance y el verde marca la altura máxima de la cámara. Las dos líneas verdes limitan el giro horizontal. Cambia de control y verás que los límites también cambian.`},{tipo:`parrafo`,texto:`Con OrbitControls, arrastra para orbitar y usa la rueda para acercarte. Verás que la cámara se detiene en el anillo azul y en el ámbar. Si intentas subir por encima del límite polar, se queda en el borde; si giras más allá del azimut permitido, también. Con CameraControls el gesto es más suave y los límites son otros. No son límites decorativos: son los mismos valores que recibe la cámara, así que lo que ves dibujado es lo que se aplica.`},{tipo:`destacado`,tono:`porque`,titulo:`Medidos desde el objetivo, no desde el origen`,texto:`minDistance y maxDistance no son distancias al origen del mundo: son distancias al target de los controles. Si mueves el target, los anillos deberían moverse con él. Lo mismo pasa con el ángulo polar, que se mide desde el eje +Y, y con el azimut, que gira alrededor de ese eje. Por eso la demo centra el objetivo en el origen: así los límites dibujados y los aplicados coinciden.`},{tipo:`codigo`,lenguaje:`tsx`,titulo:`OrbitControls con los cuatro límites`,codigo:`<OrbitControls
  makeDefault
  enableDamping
  dampingFactor={0.08}
  target={[0, 0, 0]}
  minDistance={2.6}
  maxDistance={6}
  maxPolarAngle={MathUtils.degToRad(65)}
  minAzimuthAngle={MathUtils.degToRad(-55)}
  maxAzimuthAngle={MathUtils.degToRad(55)}
/>`},{tipo:`codigo`,lenguaje:`tsx`,titulo:`El mismo encargo con CameraControls`,codigo:`<CameraControls
  makeDefault
  minDistance={1.8}
  maxDistance={8}
  maxPolarAngle={MathUtils.degToRad(85)}
  minAzimuthAngle={MathUtils.degToRad(-115)}
  maxAzimuthAngle={MathUtils.degToRad(115)}
  smoothTime={0.35}
/>`},{tipo:`tabla`,cabecera:[`Propiedad`,`Qué limita`,`Unidad`],filas:[[`minDistance / maxDistance`,`Acercarse y alejarse del target`,`Unidades de mundo`],[`minPolarAngle / maxPolarAngle`,`Subir o bajar respecto al eje +Y`,`Radianes`],[`minAzimuthAngle / maxAzimuthAngle`,`Girar alrededor del eje +Y`,`Radianes`]]},{tipo:`lista`,items:["`makeDefault` registra el control como el activo para el resto de componentes de drei.","`enableDamping` suaviza el movimiento, pero necesita que alguien llame a update en cada frame; drei ya lo hace.",`Si montas dos controles a la vez, los dos escuchan los mismos gestos y la cámara se pelea consigo misma.`,`Los límites se recortan antes de aplicar el movimiento: la cámara no salta, se queda en el borde.`,`Para que la cámara no baje del suelo, maxPolarAngle debe ser menor o igual que PI/2 si el target está a la altura del suelo.`]},{tipo:`destacado`,tono:`truco`,titulo:`Dibuja los límites mientras los diseñas`,texto:`Un anillo con RingGeometry a la distancia mínima y otro a la máxima te dicen en un vistazo si los números tienen sentido. Para el ángulo polar, un anillo a la altura maxDistance · cos(polar) y radio maxDistance · sin(polar) marca el techo de la cámara. No es magia: es la intersección de la esfera de distancia máxima con el cono de ángulo máximo.`}],errores:[{sintoma:`La cámara atraviesa el suelo o mira la escena desde abajo.`,causa:`No hay límite polar o maxPolarAngle es mayor que PI/2 con el target a nivel del suelo.`,arreglo:`Ajusta maxPolarAngle a MathUtils.degToRad(85) o menos y comprueba que el target está donde crees.`},{sintoma:`Al cambiar de OrbitControls a CameraControls la cámara salta o se mueve sola.`,causa:`Los dos controles están montados a la vez, o el nuevo arranca con un target distinto al que tenía la cámara.`,arreglo:`Monta uno u otro con una condición, usa makeDefault en el activo y mantén el mismo target en ambos.`},{sintoma:`Los anillos de límite no coinciden con el sitio donde se detiene la cámara.`,causa:`Estás dibujando los anillos centrados en el origen, pero el target de los controles está en otro punto.`,arreglo:`Dibuja los anillos en la posición del target, o mueve el target al origen mientras diseñas los límites.`}],quiz:[{tipo:`unica`,enunciado:`¿Respecto a qué se miden minDistance y maxDistance en OrbitControls?`,opciones:[`Respecto al origen del mundo`,`Respecto al target de los controles`,`Respecto al centro del canvas`,`Respecto a la posición inicial de la cámara`],correcta:1,explicacion:`La distancia se mide entre la cámara y el target. Si mueves el target, los límites se desplazan con él.`},{tipo:`multiple`,enunciado:`¿Qué límites acepta OrbitControls de drei?`,opciones:[`minDistance y maxDistance`,`maxPolarAngle`,`minAzimuthAngle y maxAzimuthAngle`,`maxFramerate`],correctas:[0,1,2],explicacion:`Los tres primeros son propiedades de los controles. maxFramerate no existe: el límite de frames se gestiona en el canvas.`},{tipo:`verdadero-falso`,enunciado:`makeDefault permite que otros componentes de drei encuentren el control activo.`,correcta:!0,explicacion:`Registra el control en el estado de R3F. Es lo que usan, por ejemplo, los componentes que necesitan saber qué controles mandan en la escena.`},{tipo:`unica`,enunciado:`Con el target a la altura del suelo, ¿qué valor de maxPolarAngle impide que la cámara baje de ese plano?`,opciones:[`0`,`Math.PI / 4`,`Math.PI / 2`,`Math.PI`],correcta:2,explicacion:`PI/2 es el plano horizontal que pasa por el target. Por encima de ese valor la cámara queda por debajo del suelo.`}],recursos:[{titulo:`drei — OrbitControls`,url:`https://drei.docs.pmnd.rs/controls/orbit-controls`,nota:`Las props que envuelven el OrbitControls de three.js, incluida makeDefault.`},{titulo:`three.js — OrbitControls`,url:`https://threejs.org/docs/#examples/en/controls/OrbitControls`,nota:`La implementación original y el significado exacto de cada límite.`},{titulo:`drei — CameraControls`,url:`https://drei.docs.pmnd.rs/controls/camera-controls`,nota:`La alternativa con transiciones y desplazamiento de cámara.`}],ejercicio:{reto:`Limita la órbita de la torre: la cámara no debe acercarse a menos de 3 unidades, alejarse a más de 7 ni bajar del plano del suelo.`,inicial:`import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'

function Torre() {
  return (
    <group>
      <mesh position={[0, 1.1, 0]}>
        <cylinderGeometry args={[0.45, 0.6, 2.2, 8]} />
        <meshStandardMaterial color="#4d8df6" />
      </mesh>
      <mesh position={[0, 2.5, 0]}>
        <coneGeometry args={[0.7, 1, 8]} />
        <meshStandardMaterial color="#f5a524" />
      </mesh>
    </group>
  )
}

export default function App() {
  return (
    <div style={{ height: 340, background: '#111' }}>
      <Canvas camera={{ position: [0, 1.5, 6] }}>
        <ambientLight intensity={0.7} />
        <directionalLight position={[4, 8, 4]} intensity={2} />
        <Torre />
        <mesh rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[20, 20]} />
          <meshStandardMaterial color="#222" />
        </mesh>
        <OrbitControls target={[0, 1.2, 0]} />
      </Canvas>
    </div>
  )
}`,solucion:`import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { MathUtils } from 'three'

function Torre() {
  return (
    <group>
      <mesh position={[0, 1.1, 0]}>
        <cylinderGeometry args={[0.45, 0.6, 2.2, 8]} />
        <meshStandardMaterial color="#4d8df6" />
      </mesh>
      <mesh position={[0, 2.5, 0]}>
        <coneGeometry args={[0.7, 1, 8]} />
        <meshStandardMaterial color="#f5a524" />
      </mesh>
    </group>
  )
}

export default function App() {
  return (
    <div style={{ height: 340, background: '#111' }}>
      <Canvas camera={{ position: [0, 1.5, 6] }}>
        <ambientLight intensity={0.7} />
        <directionalLight position={[4, 8, 4]} intensity={2} />
        <Torre />
        <mesh rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[20, 20]} />
          <meshStandardMaterial color="#222" />
        </mesh>
        <OrbitControls
          target={[0, 1.2, 0]}
          enableDamping
          minDistance={3}
          maxDistance={7}
          maxPolarAngle={MathUtils.degToRad(88)}
        />
      </Canvas>
    </div>
  )
}`,pistas:[`Las tres restricciones son props de OrbitControls: minDistance, maxDistance y maxPolarAngle.`,`El ángulo se escribe en radianes; MathUtils.degToRad convierte desde grados.`,`PI/2 es el plano horizontal del target. Un poco menos (88°) evita que la cámara roce el suelo.`]}},{id:`6.4`,modulo:6,titulo:`Transiciones de cámara`,objetivo:`Mover la cámara a un objetivo con tres métodos de suavizado distintos, interpolando también el punto al que mira.`,nivel:`medio`,minutos:55,bloques:[{tipo:`parrafo`,texto:`Cambiar camera.position de golpe es un corte: el usuario pierde la referencia de dónde estaba. Una transición bien hecha mantiene la orientación, evita atravesar la geometría y termina con una frenada perceptible. No hay un único método correcto: hay métodos con características distintas. En esta lección vas a comparar tres, todos escritos a mano en useFrame.`},{tipo:`demo`,id:`m6-transiciones`,titulo:`Frontal, lateral y cenital: tres formas de llegar`,alto:420,nota:`Cada vista usa un método distinto. Pulsa una y luego otra a mitad de vuelo: la transición arranca desde donde esté la cámara, nunca da un salto.`},{tipo:`parrafo`,texto:`La vista frontal usa MathUtils.damp: avanza mucho al principio y se frena al acercarse. La lateral usa una interpolación exponencial con 1 - exp(-k · delta), que es la misma idea pero con la constante de tiempo explícita. La cenital usa smoothstep con una duración fija de 1,3 segundos: empieza despacio, acelera y vuelve a frenar, y termina exactamente en el destino. Fíjate en que no solo cambia la posición: el punto al que mira la cámara también se interpola. Si no lo hicieras, la cámara viajaría mirando al sitio anterior y la escena se torcería.`},{tipo:`destacado`,tono:`porque`,titulo:`Suavizar no es lo mismo que durar`,texto:`damp y la exponencial son asintóticas: se acercan al destino sin llegar nunca de forma matemática. Eso está bien para seguir un objetivo que se mueve, porque siempre hay una pequeña corrección pendiente. Para un corte de cámara con principio y final claros, quieres una duración y una curva que llegue al 100 %. Ahí entra smoothstep: t normalizado de 0 a 1, y una función que empieza y acaba con pendiente cero.`},{tipo:`codigo`,lenguaje:`tsx`,titulo:`Los tres métodos en el mismo useFrame`,codigo:`useFrame((_, delta) => {
  const dt = Math.min(delta, 0.05)
  const e = estado.current

  if (e.tipo === 'damp') {
    camara.position.x = MathUtils.damp(camara.position.x, e.destino.x, 4, dt)
    camara.position.y = MathUtils.damp(camara.position.y, e.destino.y, 4, dt)
    camara.position.z = MathUtils.damp(camara.position.z, e.destino.z, 4, dt)
  } else if (e.tipo === 'exponencial') {
    const alfa = 1 - Math.exp(-3.2 * dt)   // el factor depende de delta
    camara.position.lerp(e.destino, alfa)
  } else {
    e.t = Math.min(1, e.t + dt / e.duracion)
    const x = e.t
    const suave = x * x * (3 - 2 * x)      // smoothstep
    camara.position.lerpVectors(e.origen, e.destino, suave)
  }

  camara.lookAt(e.objetivoActual)
})`},{tipo:`tabla`,cabecera:[`Método`,`Cómo se comporta`,`¿Llega exactamente?`,`Cuándo usarlo`],filas:[[`MathUtils.damp`,`Rápido al principio, se frena`,`No, es asintótico`,`Seguir un objetivo vivo`],[`1 - exp(-k · delta)`,`Igual, con k explícito`,`No, es asintótico`,`Ajustar la constante con precisión`],[`smoothstep con duración`,`Empieza y acaba despacio`,`Sí, en t = 1`,`Cortes y cinemáticas`]]},{tipo:`lista`,items:[`Interpola siempre dos cosas: la posición y el punto al que mira la cámara.`,`Guarda el origen al empezar la transición; si lo recalculas cada frame, la curva se aplana.`,`Acota delta con Math.min(delta, 0.05) para que un cambio de pestaña no teletransporte la cámara.`,`Si usas OrbitControls, desactívalos durante el vuelo o la cámara tendrá dos dueños.`,`Un cambio de FOV también se puede interpolar, pero hazlo con el mismo método y el mismo reloj.`]},{tipo:`destacado`,tono:`ojo`,titulo:`No compares con igualdad`,texto:`Con damp o con la exponencial, la cámara nunca es igual al destino: solo se acerca. Si escribes if (camara.position.x === destino.x) para terminar, no terminarás nunca. Usa una distancia mínima o cambia a un método con duración fija cuando necesites un final exacto.`}],errores:[{sintoma:`La cámara llega a tirones y se nota más en un monitor de 60 Hz que en uno de 144.`,causa:`Usas un factor de interpolación constante por frame en lugar de uno que dependa de delta.`,arreglo:`Cambia alpha por 1 - Math.exp(-k * delta) o usa MathUtils.damp con delta en segundos.`},{sintoma:`Durante el vuelo, la cámara mira al sitio anterior y la escena se ve torcida.`,causa:`Solo interpolas la posición y dejas el lookAt fijo hasta el final.`,arreglo:`Interpola también el punto objetivo y llama a camera.lookAt con ese valor en cada frame.`},{sintoma:`La transición se queda a medio camino y no hay forma de que termine.`,causa:`Estás usando un método asintótico y comprobando la llegada con una igualdad exacta, o reinicias el origen en cada frame.`,arreglo:`Guarda el origen una sola vez al empezar y comprueba la distancia con un umbral, o usa smoothstep con duración fija.`}],quiz:[{tipo:`unica`,enunciado:`¿Cuál de estas expresiones produce un suavizado independiente de los fps?`,opciones:[`posicion += (destino - posicion) * 0.1`,`posicion += (destino - posicion) * (1 - Math.exp(-3 * delta))`,`posicion += (destino - posicion) / 60`,`posicion = destino * 0.1`],correcta:1,explicacion:`La exponencial usa delta para que el avance por segundo sea el mismo a cualquier tasa de refresco.`},{tipo:`verdadero-falso`,enunciado:`MathUtils.damp espera el delta en segundos.`,correcta:!0,explicacion:`Como useFrame entrega delta en segundos, se pasa tal cual (acotado). Si lo pasas en milisegundos, el movimiento será casi instantáneo.`},{tipo:`multiple`,enunciado:`¿Qué conviene interpolar en una transición de cámara?`,opciones:[`La posición de la cámara`,`El punto al que mira`,`El campo de visión, si quieres un efecto de zoom`,`El tamaño del canvas`],correctas:[0,1,2],explicacion:`El tamaño del canvas lo gestiona el layout, no la cámara. Los otros tres son parámetros visuales de la transición.`},{tipo:`unica`,enunciado:`¿Qué ventaja tiene smoothstep con duración fija frente a damp?`,opciones:[`Es más barato de calcular`,`Llega exactamente al destino en un tiempo conocido`,`No necesita delta`,`No necesita interpolar el objetivo`],correcta:1,explicacion:`La duración y el final exacto son su razón de ser. Sigue necesitando delta y sigue necesitando interpolar el objetivo.`}],recursos:[{titulo:`three.js — MathUtils`,url:`https://threejs.org/docs/#api/en/math/MathUtils`,nota:`damp, lerp, smoothstep y clamp, con la firma exacta de cada uno.`},{titulo:`React Three Fiber — useFrame`,url:`https://r3f.docs.pmnd.rs/api/hooks#useframe`,nota:`El delta, el orden de ejecución y por qué aquí no se usa setState.`},{titulo:`The Book of Shaders — Smoothstep`,url:`https://thebookofshaders.com/glossary/?term=smoothstep`,nota:`La curva 3t² - 2t³ explicada visualmente, aunque el artículo sea de shaders.`}],ejercicio:{reto:`Haz que la cámara vuele hasta la vista B en 1,2 segundos con smoothstep, en lugar de saltar de golpe.`,inicial:`import { useEffect, useRef, useState } from 'react'
import { Canvas, useThree } from '@react-three/fiber'
import * as THREE from 'three'

const DESTINO = new THREE.Vector3(3.5, 2.2, 1.5)
const OBJETIVO = new THREE.Vector3(0, 0.8, 0)

function Vuelo({ viaje }: { viaje: number }) {
  const camara = useThree((estado) => estado.camera)

  useEffect(() => {
    // TODO: en vez de saltar, arranca una transición de 1,2 s.
    camara.position.copy(DESTINO)
    camara.lookAt(OBJETIVO)
  }, [viaje, camara])

  return null
}

export default function App() {
  const [viaje, setViaje] = useState(0)

  return (
    <div style={{ height: 320, background: '#111' }}>
      <button onClick={() => setViaje((v) => v + 1)}>Volar a B</button>
      <Canvas style={{ height: 280 }} camera={{ position: [0, 1.8, 5] }}>
        <ambientLight intensity={0.7} />
        <directionalLight position={[4, 6, 4]} intensity={2} />
        <mesh position={[0, 0.4, 0]}>
          <boxGeometry args={[1.2, 0.8, 1.2]} />
          <meshStandardMaterial color="#f5a524" />
        </mesh>
        <Vuelo viaje={viaje} />
      </Canvas>
    </div>
  )
}`,solucion:`import { useEffect, useRef, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

const DESTINO = new THREE.Vector3(3.5, 2.2, 1.5)
const OBJETIVO = new THREE.Vector3(0, 0.8, 0)

function Vuelo({ viaje }: { viaje: number }) {
  const camara = useThree((estado) => estado.camera)
  const estado = useRef({ t: 1, origen: new THREE.Vector3() })

  useEffect(() => {
    estado.current.origen.copy(camara.position)
    estado.current.t = 0
  }, [viaje, camara])

  useFrame((_, delta) => {
    const e = estado.current
    if (e.t >= 1) return

    const dt = Math.min(delta, 0.05)
    e.t = Math.min(1, e.t + dt / 1.2)
    const x = e.t
    const suave = x * x * (3 - 2 * x)

    camara.position.lerpVectors(e.origen, DESTINO, suave)
    camara.lookAt(OBJETIVO)
  })

  return null
}

export default function App() {
  const [viaje, setViaje] = useState(0)

  return (
    <div style={{ height: 320, background: '#111' }}>
      <button onClick={() => setViaje((v) => v + 1)}>Volar a B</button>
      <Canvas style={{ height: 280 }} camera={{ position: [0, 1.8, 5] }}>
        <ambientLight intensity={0.7} />
        <directionalLight position={[4, 6, 4]} intensity={2} />
        <mesh position={[0, 0.4, 0]}>
          <boxGeometry args={[1.2, 0.8, 1.2]} />
          <meshStandardMaterial color="#f5a524" />
        </mesh>
        <Vuelo viaje={viaje} />
      </Canvas>
    </div>
  )
}`,pistas:[`El efecto de arranque debe guardar la posición actual y poner t a 0.`,`En useFrame, incrementa t con delta / 1.2 y acótalo a 1.`,`Aplica smoothstep con x * x * (3 - 2 * x) y usa lerpVectors entre el origen y el destino.`]}},{id:`6.5`,modulo:6,titulo:`Teclado y estado sin re-render`,objetivo:`Leer el teclado con listeners nativos, guardar las teclas en un Set dentro de un ref y mover la nave en useFrame sin provocar renders.`,nivel:`medio`,minutos:55,bloques:[{tipo:`parrafo`,texto:`Mover algo con el teclado parece el caso más simple del mundo: escuchas keydown y cambias una posición. El problema es dónde guardas esa posición. Si la guardas en useState, cada tecla pulsada es un render de React, y mantener la tecla produce repeticiones del sistema operativo. Si además actualizas por frame, tienes sesenta renders por segundo. La solución es la misma que en el módulo 5: el teclado se lee en un ref y el movimiento se aplica en useFrame.`},{tipo:`demo`,id:`m6-teclado`,titulo:`La nave y el contador de renders`,alto:420,nota:`Pulsa W, A, S y D. El contador de teclas sube; el de renders no. Si haces clic fuera del lienzo, el listener sigue activo porque está en window, no en el canvas.`},{tipo:`parrafo`,texto:`La nave tiene un rumbo y una posición que solo viven en el mundo de three.js. Cada keydown añade un código al Set; cada keyup lo quita. En cada frame, useFrame mira qué códigos hay, normaliza la dirección, multiplica por delta y aplica el resultado. El estado de React no interviene. El contador de renders que ves abajo se incrementa en el cuerpo del componente, así que si todo va bien se queda casi quieto mientras conduces. La interfaz que lo muestra está fuera del canvas y se actualiza cada 300 ms con un intervalo, no por frame.`},{tipo:`destacado`,tono:`porque`,titulo:`event.code frente a event.key`,texto:`event.key depende de la distribución del teclado: en un teclado AZERTY, la tecla física que está donde tú tienes la W produce otra letra. event.code identifica la tecla física (KeyW, KeyA, KeyS, KeyD), que es lo que quieres para un control de movimiento. Para atajos que dependen de la letra escrita, usa key.`},{tipo:`codigo`,lenguaje:`tsx`,titulo:`El patrón completo: Set, listeners y useFrame`,codigo:`const teclas = useRef(new Set<string>())

useEffect(() => {
  const abajo = (e: KeyboardEvent) => {
    if (e.target instanceof HTMLInputElement) return   // no secuestres un formulario
    teclas.current.add(e.code)
  }
  const arriba = (e: KeyboardEvent) => teclas.current.delete(e.code)
  const perderFoco = () => teclas.current.clear()      // sin keyup, las teclas se quedan pegadas

  window.addEventListener('keydown', abajo)
  window.addEventListener('keyup', arriba)
  window.addEventListener('blur', perderFoco)

  return () => {
    window.removeEventListener('keydown', abajo)
    window.removeEventListener('keyup', arriba)
    window.removeEventListener('blur', perderFoco)
    teclas.current.clear()
  }
}, [])

useFrame((_, delta) => {
  const dt = Math.min(delta, 0.05)
  let x = 0
  let z = 0
  if (teclas.current.has('KeyW')) z -= 1
  if (teclas.current.has('KeyS')) z += 1
  if (teclas.current.has('KeyA')) x -= 1
  if (teclas.current.has('KeyD')) x += 1

  if (x !== 0 || z !== 0) {
    const longitud = Math.hypot(x, z)
    nave.current.position.x += (x / longitud) * VELOCIDAD * dt
    nave.current.position.z += (z / longitud) * VELOCIDAD * dt
  }
})`},{tipo:`lista`,items:[`Un Set elimina duplicados: las repeticiones de keydown mientras mantienes la tecla no acumulan nada.`,`El listener va en window, no en el canvas: el teclado no necesita que el lienzo tenga el foco.`,`Limpia siempre en el return del useEffect; si no, cada montaje deja un listener vivo.`,`El evento blur de window es tu red de seguridad: al cambiar de pestaña se pierde el keyup.`,`Mueve en useFrame con delta; el teclado solo dice qué teclas están pulsadas, no cuánto mover.`]},{tipo:`destacado`,tono:`ojo`,titulo:`Los listeners globales tienen consecuencias`,texto:`Mientras la demo está montada, cualquier W que pulses en la página mueve la nave, aunque estés escribiendo en un buscador. En una aplicación real, o compruebas el elemento activo, o solo activas el control cuando el lienzo tiene el foco. Aquí se usa window a propósito para que el teclado funcione sin hacer clic primero, pero es una decisión que hay que tomar, no un detalle.`}],errores:[{sintoma:`La nave sigue moviéndose después de soltar las teclas o al volver de otra pestaña.`,causa:`El keyup se pierde cuando la ventana pierde el foco, o los listeners no se limpian al desmontar.`,arreglo:`Añade un listener de blur que vacíe el Set y limpia todos los listeners en el return del useEffect.`},{sintoma:`En un monitor de 144 Hz la nave va mucho más rápido que en uno de 60.`,causa:`El movimiento se aplica por frame sin multiplicar por delta.`,arreglo:`Multiplica la velocidad por delta en segundos y acota delta con Math.min(delta, 0.05).`},{sintoma:`Cada pulsación de tecla repinta toda la escena y el contador de renders sube sin parar.`,causa:`Las teclas pulsadas están en useState en lugar de en un ref.`,arreglo:`Guarda el Set en useRef. Un ref no dispara renders; el cambio se aplica en useFrame, donde ya toca dibujar.`}],quiz:[{tipo:`unica`,enunciado:`¿Por qué las teclas se guardan en un Set dentro de useRef?`,opciones:[`Porque un Set es más rápido que un array al buscar`,`Porque mutar el ref no provoca renders y el valor sobrevive entre frames`,`Porque useState no acepta teclas`,`Porque el Set se borra solo al soltar la tecla`],correcta:1,explicacion:`Las dos razones se complementan: el ref persiste entre renders y no dispara la reconciliación cuando cambia.`},{tipo:`verdadero-falso`,enunciado:`Mientras mantienes una tecla pulsada, el navegador repite keydown varias veces.`,correcta:!0,explicacion:`Es la repetición automática del sistema operativo. Un Set evita que esas repeticiones dupliquen el estado.`},{tipo:`multiple`,enunciado:`¿Qué debe hacer la limpieza del efecto del teclado?`,opciones:[`Quitar los listeners de keydown y keyup`,`Quitar el listener de blur`,`Vaciar el Set de teclas`,`Destruir el canvas`],correctas:[0,1,2],explicacion:`El canvas lo gestiona R3F. La limpieza es de los listeners y del estado que has creado tú.`},{tipo:`unica`,enunciado:`¿Dónde se aplica el movimiento de la nave?`,opciones:[`En el handler de keydown`,`En un useEffect que observa las teclas`,`En useFrame, multiplicando por delta`,`En el render del componente`],correcta:2,explicacion:`El teclado solo marca intención. La posición se actualiza por frame con delta, que es la unidad de tiempo del bucle.`}],recursos:[{titulo:`MDN — KeyboardEvent`,url:`https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent`,nota:`La diferencia entre key y code, y el comportamiento de repeat.`},{titulo:`React — useRef`,url:`https://react.dev/reference/react/useRef`,nota:`Por qué un ref no provoca renders y cuándo es la herramienta correcta.`},{titulo:`React Three Fiber — useFrame`,url:`https://r3f.docs.pmnd.rs/api/hooks#useframe`,nota:`El delta y el orden de ejecución de los callbacks por frame.`}],ejercicio:{reto:`Mueve el cubo con W, A, S y D usando un Set en un ref y useFrame, sin un render por tecla.`,inicial:`import { useEffect, useState } from 'react'
import { Canvas } from '@react-three/fiber'

export default function App() {
  const [x, setX] = useState(0)

  useEffect(() => {
    const abajo = (e: KeyboardEvent) => {
      // Esto funciona, pero re-renderiza en cada pulsación.
      if (e.code === 'KeyA') setX((v) => Math.max(-2, v - 0.2))
      if (e.code === 'KeyD') setX((v) => Math.min(2, v + 0.2))
    }
    window.addEventListener('keydown', abajo)
    return () => window.removeEventListener('keydown', abajo)
  }, [])

  return (
    <div style={{ height: 320, background: '#111' }}>
      <Canvas camera={{ position: [0, 2.5, 5] }}>
        <ambientLight intensity={0.7} />
        <directionalLight position={[3, 6, 4]} intensity={2} />
        <mesh position={[x, 0, 0]}>
          <boxGeometry args={[0.8, 0.8, 0.8]} />
          <meshStandardMaterial color="#f5a524" />
        </mesh>
      </Canvas>
    </div>
  )
}`,solucion:`import { useEffect, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import type { Group } from 'three'

function Cubo({ teclas }: { teclas: React.RefObject<Set<string>> }) {
  const grupo = useRef<Group>(null)

  useFrame((_, delta) => {
    const dt = Math.min(delta, 0.05)
    let x = 0
    let z = 0
    if (teclas.current.has('KeyA')) x -= 1
    if (teclas.current.has('KeyD')) x += 1
    if (teclas.current.has('KeyW')) z -= 1
    if (teclas.current.has('KeyS')) z += 1

    if ((x !== 0 || z !== 0) && grupo.current) {
      const longitud = Math.hypot(x, z)
      grupo.current.position.x = Math.max(
        -2,
        Math.min(2, grupo.current.position.x + (x / longitud) * 2.5 * dt),
      )
      grupo.current.position.z = Math.max(
        -2,
        Math.min(2, grupo.current.position.z + (z / longitud) * 2.5 * dt),
      )
    }
  })

  return (
    <group ref={grupo}>
      <mesh>
        <boxGeometry args={[0.8, 0.8, 0.8]} />
        <meshStandardMaterial color="#f5a524" />
      </mesh>
    </group>
  )
}

export default function App() {
  const teclas = useRef(new Set<string>())

  useEffect(() => {
    const abajo = (e: KeyboardEvent) => teclas.current.add(e.code)
    const arriba = (e: KeyboardEvent) => teclas.current.delete(e.code)
    const perderFoco = () => teclas.current.clear()

    window.addEventListener('keydown', abajo)
    window.addEventListener('keyup', arriba)
    window.addEventListener('blur', perderFoco)
    return () => {
      window.removeEventListener('keydown', abajo)
      window.removeEventListener('keyup', arriba)
      window.removeEventListener('blur', perderFoco)
      teclas.current.clear()
    }
  }, [])

  return (
    <div style={{ height: 320, background: '#111' }}>
      <Canvas camera={{ position: [0, 2.5, 5] }}>
        <ambientLight intensity={0.7} />
        <directionalLight position={[3, 6, 4]} intensity={2} />
        <Cubo teclas={teclas} />
      </Canvas>
    </div>
  )
}`,pistas:[`Sustituye el useState por un useRef con un Set: el cubo ya no necesita estado de React.`,`El listener solo añade y quita códigos; no mueve nada.`,`La posición se actualiza en useFrame, multiplicando por delta y limitando el resultado.`]}},{id:`6.6`,modulo:6,titulo:`ScrollControls`,objetivo:`Sincronizar cámara y objetos con el scroll de drei usando ScrollControls y useScroll, sin re-renderizar por cada píxel.`,nivel:`medio`,minutos:60,bloques:[{tipo:`parrafo`,texto:`Hasta ahora la interacción venía del puntero o del teclado. El scroll es otra entrada, más lenta y más narrativa: sirve para recorrer una historia, no para controlar un personaje. ScrollControls de drei crea un contenedor desplazable dentro del canvas y te expone un offset normalizado entre 0 y 1. Tú decides qué significa ese offset: mover la cámara, cambiar luces, escalar objetos o todo a la vez.`},{tipo:`demo`,id:`m6-scroll`,titulo:`Tres estaciones, una sola página`,alto:440,nota:`La demo tiene una altura fija de 430 px a propósito: ScrollControls necesita un contenedor con altura para tener algo que desplazar. La rueda sobre el lienzo mueve la escena; fuera del lienzo, mueve la lección.`},{tipo:`parrafo`,texto:`Desplaza la rueda sobre el lienzo. La cámara viaja de la primera estación a la segunda y a la tercera, y el objeto más cercano crece y gira. El indicador de sección se actualiza sin que React vuelva a renderizar la escena: useFrame lee scroll.offset, calcula la página y escribe en el span del DOM. Es la misma idea que el contador de la lección anterior: los datos que cambian muchas veces por segundo no pasan por useState.`},{tipo:`destacado`,tono:`porque`,titulo:`Por qué pages no es el número de objetos`,texto:`pages define cuántas alturas de viewport mide el recorrido del scroll. Con pages={3} tienes el equivalente a tres pantallas de desplazamiento virtual, pero el offset sigue yendo de 0 a 1: las tres se reparten ese intervalo. Tú decides si cada tercio es una sección, una parada de cámara o simplemente más recorrido para el mismo movimiento.`},{tipo:`codigo`,lenguaje:`tsx`,titulo:`La estructura mínima`,codigo:`<Canvas>
  <ScrollControls pages={3} damping={0.28}>
    <Camara />
  </ScrollControls>
</Canvas>

function Camara() {
  const scroll = useScroll()
  const camara = useThree((estado) => estado.camera)

  useFrame(() => {
    const t = scroll.offset * 2           // de 0..1 a 0..2
    const tramo = Math.min(Math.floor(t), 1)
    const fraccion = t - tramo
    const suave = fraccion * fraccion * (3 - 2 * fraccion)

    camara.position.lerpVectors(
      POSICIONES[tramo],
      POSICIONES[tramo + 1],
      suave,
    )
    camara.lookAt(OBJETIVOS[tramo])
  })

  return null
}`},{tipo:`tabla`,cabecera:[`Prop de ScrollControls`,`Qué hace`,`Valor típico`],filas:[[`pages`,`Longitud del recorrido en pantallas virtuales`,`1–5`],[`damping`,`Suavizado del offset; 0 es respuesta inmediata`,`0,1–0,4`],[`distance`,`Factor de escala de la distancia de scroll`,`0,8–1,2`],[`enabled`,`Permite desactivar el scroll sin desmontarlo`,`true / false`]]},{tipo:`lista`,items:["`useScroll()` solo funciona dentro de `ScrollControls`; fuera lanza un error.","`scroll.offset` es el progreso global de 0 a 1; `scroll.range(0, 1/3)` devuelve un tramo normalizado.","`scroll.curve()` aplica una curva de suavizado al tramo; útil para que las secciones no empiecen de golpe.","`scroll.visible(from, distance)` te dice si un tramo está en pantalla.","Lee el offset en `useFrame`, no en el cuerpo del componente: cambia fuera del ciclo de React."]},{tipo:`destacado`,tono:`ojo`,titulo:`El scroll secuestra la rueda sobre el lienzo`,texto:`Mientras el puntero está sobre el canvas, la rueda mueve ScrollControls y no la página. En una demo es aceptable y se explica; en una página real puede ser frustrante. Decide si el lienzo ocupa toda la pantalla, si el scroll empieza solo al entrar en la sección o si ofreces una alternativa con botones. No es un detalle de implementación: es parte de la experiencia.`}],errores:[{sintoma:`Al hacer scroll no ocurre nada.`,causa:`El canvas o su contenedor no tienen altura, así que ScrollControls no tiene recorrido que medir.`,arreglo:`Dale una altura explícita al contenedor del canvas (por ejemplo, 100vh o 430px) y comprueba que ningún padre la colapsa.`},{sintoma:`La cámara tiembla o va a saltos mientras se hace scroll.`,causa:`Estás leyendo scroll.offset en el render o lo copias a useState, y el valor cambia muchas veces por segundo.`,arreglo:`Lee el offset dentro de useFrame y aplica el resultado directamente a la cámara o a los objetos.`},{sintoma:`La página deja de desplazarse cuando el puntero pasa por encima de la escena.`,causa:`ScrollControls captura la rueda en su contenedor para poder mover la escena.`,arreglo:`Asume el comportamiento y diseña la sección para que el lienzo sea el protagonista, o desactiva el scroll con enabled cuando no interese.`}],quiz:[{tipo:`unica`,enunciado:`¿Qué devuelve scroll.offset?`,opciones:[`El número de píxeles desplazados`,`Un valor normalizado entre 0 y 1 a lo largo de pages`,`El índice de la página actual`,`La velocidad del scroll en píxeles por segundo`],correcta:1,explicacion:`Es un progreso normalizado. Multiplícalo por el número de tramos que quieras definir.`},{tipo:`verdadero-falso`,enunciado:`pages={3} crea tres copias de la escena.`,correcta:!1,explicacion:`No duplica nada: define la longitud del recorrido. La escena es una y tú decides cómo reacciona al offset.`},{tipo:`multiple`,enunciado:`¿Qué ofrece el estado que devuelve useScroll?`,opciones:[`offset`,`range()`,`curve()`,`un renderer propio`],correctas:[0,1,2],explicacion:`El renderer sigue siendo el del Canvas. useScroll te da medidas y utilidades para interpretar el recorrido.`},{tipo:`unica`,enunciado:`¿Dónde conviene leer scroll.offset para mover la cámara?`,opciones:[`En el cuerpo del componente`,`En un useState con un useEffect`,`Dentro de useFrame`,`En el handler de onPointerMove`],correcta:2,explicacion:`El offset cambia en el bucle de scroll, no en el de React. useFrame te da el momento y evita renders.`}],recursos:[{titulo:`drei — ScrollControls`,url:`https://drei.docs.pmnd.rs/controls/scroll-controls`,nota:`pages, damping, distance y el componente Scroll para HTML.`},{titulo:`React Three Fiber — useFrame`,url:`https://r3f.docs.pmnd.rs/api/hooks#useframe`,nota:`El lugar donde leer el offset y aplicar la transformación.`},{titulo:`MDN — Scroll-driven animations`,url:`https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_scroll-driven_animations`,nota:`La versión CSS de la misma idea, útil para comparar enfoques.`}],ejercicio:{reto:`Sincroniza la cámara con el scroll: en la primera página debe mirar al cubo y en la tercera, al cono. Usa el offset y una interpolación suave.`,inicial:`import { Canvas, useThree } from '@react-three/fiber'
import { ScrollControls } from '@react-three/drei'
import * as THREE from 'three'

const POSICIONES = [
  new THREE.Vector3(0, 1.6, 4.5),
  new THREE.Vector3(2.6, 2.2, 2.2),
  new THREE.Vector3(0, 1.6, 4.5),
]
const OBJETIVOS = [
  new THREE.Vector3(-1.4, 0.6, 0),
  new THREE.Vector3(0, 0.6, 0),
  new THREE.Vector3(1.4, 0.6, 0),
]

function Camara() {
  const camara = useThree((estado) => estado.camera)

  // TODO: usa useScroll y useFrame para interpolar entre las tres posiciones.

  return null
}

export default function App() {
  return (
    <div style={{ height: 400, background: '#111' }}>
      <Canvas camera={{ position: [0, 1.6, 4.5] }}>
        <ScrollControls pages={3} damping={0.25}>
          <ambientLight intensity={0.7} />
          <directionalLight position={[4, 6, 4]} intensity={2} />
          <mesh position={[-1.4, 0.6, 0]}>
            <boxGeometry args={[0.8, 0.8, 0.8]} />
            <meshStandardMaterial color="#f5a524" />
          </mesh>
          <mesh position={[0, 0.6, 0]}>
            <torusGeometry args={[0.4, 0.15, 16, 32]} />
            <meshStandardMaterial color="#4d8df6" />
          </mesh>
          <mesh position={[1.4, 0.6, 0]}>
            <coneGeometry args={[0.45, 0.9, 16]} />
            <meshStandardMaterial color="#3fbf87" />
          </mesh>
          <Camara />
        </ScrollControls>
      </Canvas>
    </div>
  )
}`,solucion:`import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { ScrollControls, useScroll } from '@react-three/drei'
import * as THREE from 'three'

const POSICIONES = [
  new THREE.Vector3(0, 1.6, 4.5),
  new THREE.Vector3(2.6, 2.2, 2.2),
  new THREE.Vector3(0, 1.6, 4.5),
]
const OBJETIVOS = [
  new THREE.Vector3(-1.4, 0.6, 0),
  new THREE.Vector3(0, 0.6, 0),
  new THREE.Vector3(1.4, 0.6, 0),
]

function Camara() {
  const camara = useThree((estado) => estado.camera)
  const scroll = useScroll()
  const objetivo = new THREE.Vector3()

  useFrame(() => {
    const t = scroll.offset * 2
    const tramo = Math.min(Math.floor(t), 1)
    const fraccion = t - tramo
    const suave = fraccion * fraccion * (3 - 2 * fraccion)

    camara.position.lerpVectors(POSICIONES[tramo], POSICIONES[tramo + 1], suave)
    objetivo.lerpVectors(OBJETIVOS[tramo], OBJETIVOS[tramo + 1], suave)
    camara.lookAt(objetivo)
  })

  return null
}

export default function App() {
  return (
    <div style={{ height: 400, background: '#111' }}>
      <Canvas camera={{ position: [0, 1.6, 4.5] }}>
        <ScrollControls pages={3} damping={0.25}>
          <ambientLight intensity={0.7} />
          <directionalLight position={[4, 6, 4]} intensity={2} />
          <mesh position={[-1.4, 0.6, 0]}>
            <boxGeometry args={[0.8, 0.8, 0.8]} />
            <meshStandardMaterial color="#f5a524" />
          </mesh>
          <mesh position={[0, 0.6, 0]}>
            <torusGeometry args={[0.4, 0.15, 16, 32]} />
            <meshStandardMaterial color="#4d8df6" />
          </mesh>
          <mesh position={[1.4, 0.6, 0]}>
            <coneGeometry args={[0.45, 0.9, 16]} />
            <meshStandardMaterial color="#3fbf87" />
          </mesh>
          <Camara />
        </ScrollControls>
      </Canvas>
    </div>
  )
}`,pistas:[`Camara debe llamar a useScroll; por eso va dentro de ScrollControls.`,`Multiplica offset por 2 para obtener un valor de 0 a 2 entre las tres paradas.`,`En useFrame, interpola posición y objetivo con el mismo factor suave.`]}},{id:`6.7`,modulo:6,titulo:`Arrastrar objetos en el plano`,objetivo:`Arrastrar una pieza sobre una mesa convirtiendo el puntero en una posición 3D, con captura de puntero y límites.`,nivel:`alto`,minutos:60,bloques:[{tipo:`parrafo`,texto:`Arrastrar en 3D no es arrastrar en 2D. En una página normal mueves un div con clientX y clientY; en una escena, el puntero es una dirección desde la cámara y necesitas decidir sobre qué superficie del mundo cae. La receta tiene tres piezas: capturar el puntero al agarrar, proyectar cada movimiento sobre el plano de la mesa y limitar el resultado a los bordes. Si falta una, la pieza salta, se escapa o se queda pegada al soltar.`},{tipo:`demo`,id:`m6-arrastrar`,titulo:`Cuatro piezas sobre una mesa con límites`,alto:440,nota:`Agarra una pieza y llévala hasta el borde: se detiene en el rectángulo ámbar. Suéltala fuera del lienzo y comprobarás que la captura de puntero sigue funcionando.`},{tipo:`parrafo`,texto:`La mesa es la superficie de referencia. Su handler onPointerMove recibe un event.point que se recalcula en cada movimiento; ese punto está en coordenadas de mundo y cae sobre la cara superior de la mesa. Con él, la pieza sigue al puntero. Para que no salte al centro, al agarrar se guarda la diferencia entre el centro de la pieza y el punto de la mesa bajo el cursor. Y para que el gesto no se pierda cuando el puntero sale del canvas, se llama a setPointerCapture en el pointerdown y a releasePointerCapture al soltar.`},{tipo:`destacado`,tono:`porque`,titulo:`El event.point de la pieza capturada está congelado`,texto:`Cuando R3F captura un puntero, sigue enviando eventos a la pieza, pero la intersección que adjunta es la del pointerdown, no una nueva. Si mueves la pieza usando el event.point de la pieza capturada, se queda clavada en el punto donde la agarraste. Usa el event.point de la mesa (que no está capturada) o calcula tú la intersección con event.ray.intersectPlane.`},{tipo:`codigo`,lenguaje:`tsx`,titulo:`Agarre, movimiento y suelta`,codigo:`const plano = new THREE.Plane(new THREE.Vector3(0, 1, 0), -ALTURA)

const bajar = (e) => {
  e.stopPropagation()
  arrastrando.current = id
  if (e.ray.intersectPlane(plano, punto)) {
    // compensa el punto de agarre para que no salte al centro
    desplazamiento.current.set(pieza.position.x - punto.x, 0, pieza.position.z - punto.z)
  }
  e.target.setPointerCapture(e.pointerId)
}

const moverSobreMesa = (e) => {
  if (!arrastrando.current) return
  pieza.position.x = MathUtils.clamp(
    e.point.x + desplazamiento.current.x,
    -LIMITE_X,
    LIMITE_X,
  )
  pieza.position.z = MathUtils.clamp(
    e.point.z + desplazamiento.current.z,
    -LIMITE_Z,
    LIMITE_Z,
  )
}

const soltar = (e) => {
  arrastrando.current = null
  e.target.releasePointerCapture(e.pointerId)
}`},{tipo:`lista`,items:["Captura en `onPointerDown` y libera en `onPointerUp` y en `onPointerCancel`.",`El plano de la mesa se define una vez: normal (0, 1, 0) y constante -altura.`,"`event.ray.intersectPlane(plano, salida)` devuelve null si el rayo es paralelo al plano.",`Limita siempre la posición final: sin clamp, la pieza puede acabar debajo del suelo.`,`Muta la posición del mesh en el handler; no uses setState por cada pointermove.`,`Si el objeto está rotado o escalado, la posición que lees es la del padre, no la del punto de impacto.`]},{tipo:`destacado`,tono:`truco`,titulo:`Arrastrar fuera de la mesa`,texto:`Si quieres que el gesto siga funcionando cuando el puntero sale de la superficie, no dependas del event.point de la mesa: usa event.ray.intersectPlane contra un plano matemático grande. El rayo siempre existe, aunque el puntero esté fuera de cualquier malla. La mesa solo aporta la referencia visual; el plano es lo que hace el cálculo.`}],errores:[{sintoma:`Al agarrar una pieza, salta para quedar centrada bajo el puntero.`,causa:`Colocas la pieza en el punto de impacto sin compensar el desfase del agarre.`,arreglo:`Al empezar, guarda pieza.position menos el punto del plano y suma ese desplazamiento en cada movimiento.`},{sintoma:`Si sueltas el botón fuera del lienzo, la pieza se queda pegada al puntero.`,causa:`No hay captura de puntero o no se libera el estado de arrastre al salir.`,arreglo:`Llama a setPointerCapture en pointerdown, libera en pointerup y pointercancel, y escucha onLostPointerCapture para limpiar el estado.`},{sintoma:`La pieza se sale de la mesa y ya no hay forma de recuperarla.`,causa:`No limitas la posición a los bordes de la superficie.`,arreglo:`Aplica MathUtils.clamp a x y z con los límites de la mesa, dejando un margen para el tamaño de la pieza.`}],quiz:[{tipo:`unica`,enunciado:`¿Qué devuelve ray.intersectPlane(plano, salida) si el rayo es paralelo al plano?`,opciones:[`Un vector en el infinito`,`null`,`El origen del rayo`,`Lanza un error`],correcta:1,explicacion:`Sin intersección devuelve null. Comprueba el resultado antes de usar el vector de salida.`},{tipo:`verdadero-falso`,enunciado:`Con setPointerCapture, el canvas sigue recibiendo pointerup aunque el puntero salga del lienzo.`,correcta:!0,explicacion:`Esa es precisamente su función. Sin captura, el pointerup puede ocurrir fuera y el estado de arrastre se queda abierto.`},{tipo:`multiple`,enunciado:`¿Qué formas válidas hay de obtener la posición del puntero sobre la mesa?`,opciones:[`El event.point del onPointerMove de la mesa`,`La posición de la cámara`,`event.ray.intersectPlane contra el plano de la mesa`,`El event.point de la malla capturada, sin más`],correctas:[0,2],explicacion:`La mesa no está capturada, así que su point es fresco. El rayo y un plano matemático también sirven. La cámara no es el puntero, y el point de la malla capturada es el del agarre.`},{tipo:`unica`,enunciado:`¿Por qué no conviene guardar la posición de la pieza en useState durante el arrastre?`,opciones:[`Porque useState no acepta números negativos`,`Porque cada pointermove provoca un render y la escena se resiente`,`Porque la posición se pierde al soltar`,`Porque three.js no lee el estado de React`],correcta:1,explicacion:`Un arrastre puede generar decenas de eventos por segundo. La posición es estado de animación: vive en el mesh y se actualiza en el handler o en useFrame.`}],recursos:[{titulo:`React Three Fiber — Events`,url:`https://r3f.docs.pmnd.rs/api/events`,nota:`La captura de puntero y el orden de propagación en los eventos de R3F.`},{titulo:`MDN — Element.setPointerCapture`,url:`https://developer.mozilla.org/en-US/docs/Web/API/Element/setPointerCapture`,nota:`Cómo funciona la captura a nivel del navegador y cuándo se libera.`},{titulo:`three.js — Plane`,url:`https://threejs.org/docs/#api/en/math/Plane`,nota:`La ecuación del plano y la intersección con un rayo.`}],ejercicio:{reto:`Arrastra la caja sobre la mesa con captura de puntero y límites, sin actualizar el estado en cada movimiento.`,inicial:`import { useState } from 'react'
import { Canvas } from '@react-three/fiber'

export default function App() {
  const [posicion, setPosicion] = useState<[number, number]>([0, 0])
  const [arrastrando, setArrastrando] = useState(false)

  return (
    <div style={{ height: 340, background: '#111' }}>
      <Canvas camera={{ position: [0, 4, 5] }}>
        <ambientLight intensity={0.7} />
        <directionalLight position={[3, 6, 4]} intensity={2} />

        <mesh
          position={[0, 0.25, 0]}
          onPointerMove={(e) => {
            if (!arrastrando) return
            setPosicion([e.point.x, e.point.z])
          }}
        >
          <boxGeometry args={[6, 0.5, 4]} />
          <meshStandardMaterial color="#333" />
        </mesh>

        <mesh
          position={[posicion[0], 0.75, posicion[1]]}
          onPointerDown={(e) => {
            e.stopPropagation()
            setArrastrando(true)
          }}
          onPointerUp={() => setArrastrando(false)}
        >
          <boxGeometry args={[0.6, 0.6, 0.6]} />
          <meshStandardMaterial color="#f5a524" />
        </mesh>
      </Canvas>
    </div>
  )
}`,solucion:`import { useRef } from 'react'
import { Canvas } from '@react-three/fiber'
import type { Mesh } from 'three'

export default function App() {
  const caja = useRef<Mesh>(null)
  const arrastrando = useRef(false)

  return (
    <div style={{ height: 340, background: '#111' }}>
      <Canvas camera={{ position: [0, 4, 5] }}>
        <ambientLight intensity={0.7} />
        <directionalLight position={[3, 6, 4]} intensity={2} />

        <mesh
          position={[0, 0.25, 0]}
          onPointerMove={(e) => {
            if (!arrastrando.current || !caja.current) return
            caja.current.position.x = Math.max(-2.7, Math.min(2.7, e.point.x))
            caja.current.position.z = Math.max(-1.7, Math.min(1.7, e.point.z))
          }}
        >
          <boxGeometry args={[6, 0.5, 4]} />
          <meshStandardMaterial color="#333" />
        </mesh>

        <mesh
          ref={caja}
          position={[0, 0.75, 0]}
          onPointerDown={(e) => {
            e.stopPropagation()
            arrastrando.current = true
            e.target.setPointerCapture(e.pointerId)
          }}
          onPointerUp={(e) => {
            arrastrando.current = false
            e.target.releasePointerCapture(e.pointerId)
          }}
          onPointerCancel={() => {
            arrastrando.current = false
          }}
        >
          <boxGeometry args={[0.6, 0.6, 0.6]} />
          <meshStandardMaterial color="#f5a524" />
        </mesh>
      </Canvas>
    </div>
  )
}`,pistas:[`La mesa ya te da event.point en coordenadas de mundo; no necesitas raycast manual.`,`Cambia el estado de arrastre por un ref y actualiza la posición del mesh directamente.`,`Limita x y z con Math.max/Math.min para que la caja no salga de la mesa.`]}}]},{numero:7,titulo:`Texturas y materiales PBR`,descripcion:`Una geometría describe la forma; una textura describe la superficie. Aquí se aprende a colocar los mapas, a no romper el color al cargarlos y a componer un material PBR que se vea como el original.`,lecciones:[{id:`7.1`,modulo:7,titulo:`UVs`,objetivo:"Entender el mapeo 2D→3D y usar `repeat`, `offset` y `wrap` sin perder de vista qué parte de la textura se está viendo.",nivel:`medio`,minutos:55,bloques:[{tipo:`parrafo`,texto:"Cada vértice de una geometría puede llevar un par de números, `u` y `v`, entre 0 y 1. Eso es su coordenada de textura: dice qué punto de la imagen le corresponde. El mapeo 2D→3D no es magia; es una tabla escrita a mano por quien modeló la pieza. Los UVs de una caja, por ejemplo, están desplegados como una cruz: seis caras, seis regiones del mismo cuadrado."},{tipo:`demo`,id:`m7-uvs`,titulo:`Repite, desplaza y mira qué ventana se usa`},{tipo:`parrafo`,texto:"La fórmula es corta: el shader calcula `uv * repeat + offset`. Con `repeat` a 2, la textura se muestrea dos veces por cada unidad de superficie; con `offset` a 0,5, el origen se desplaza media textura. Por eso `offset` no «mueve la textura»: mueve la ventana con la que se consulta. Y por eso hace falta `wrapS`/`wrapT` en `RepeatWrapping`: sin él, fuera de 0..1 se corta."},{tipo:`codigo`,lenguaje:`tsx`,titulo:`Configurar una textura repetida`,codigo:`import * as THREE from 'three'
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
}`},{tipo:`destacado`,tono:`ojo`,titulo:`Una textura, un juego de parámetros`,texto:"Si dos mallas comparten el mismo objeto `Texture` y una necesita otro `repeat`, no hay forma: el último que escribe gana y las dos se ven igual. Hay que clonar (`texture.clone()`), que comparte la imagen y el búfer pero tiene sus propios parámetros. La demo lo hace para poder mostrar el atlas completo al lado del cubo."},{tipo:`tabla`,cabecera:[`Propiedad`,`Qué controla`,`Valor típico`],filas:[["`repeat`",`Cuántas veces se repite en U y V`,"`[1, 1]` o el número de baldosas"],["`offset`",`Desplazamiento del origen`,"`[0, 0]`, `[0.5, 0]`"],["`wrapS` / `wrapT`",`Qué pasa fuera de 0..1`,"`RepeatWrapping`"],["`rotation`",`Giro de la textura en radianes`,"`0`"],["`center`",`Punto de pivote del giro`,"`[0.5, 0.5]`"]]},{tipo:`lista`,items:[`Los UVs son datos de la geometría, no del material.`,"`RepeatWrapping` es imprescindible en suelos y paredes.","La escala de la textura va en `repeat`, no en la escala del objeto.","Cambiar `repeat` en tiempo de ejecución exige `needsUpdate`.","Un UV estirado se arregla en el modelo o con `repeat`, no con luces."]}],errores:[{sintoma:`La textura se repite pero la costura es visible en cada borde.`,causa:"La imagen no es tileable o `wrap` está en `ClampToEdgeWrapping`.",arreglo:"Usa una textura sin costuras y `RepeatWrapping` en ambos ejes."},{sintoma:"Cambiar `repeat` desde un control no hace nada.",causa:"La textura ya se subió a la GPU y no se marcó `needsUpdate`.",arreglo:"Asigna `texture.needsUpdate = true` después de cambiar los parámetros."},{sintoma:`Dos objetos con la misma textura cambian a la vez.`,causa:"Comparten el objeto `Texture`.",arreglo:`Clona la textura para el que necesite otros parámetros.`}],quiz:[{tipo:`unica`,enunciado:`¿Qué es un UV?`,opciones:[`Una coordenada 2D por vértice que indica qué punto de la textura le toca`,`Un tipo de luz ultravioleta`,`Un eje del espacio 3D`,`Un material transparente`],correcta:0,explicacion:`U y V son los ejes de la imagen; el par se guarda por vértice.`},{tipo:`verdadero-falso`,enunciado:"`offset` mueve el objeto en el espacio.",correcta:!1,explicacion:`Mueve la ventana de muestreo de la textura, no la geometría.`},{tipo:`multiple`,enunciado:`¿Qué hace falta para repetir una textura por un plano?`,opciones:["`wrapS = RepeatWrapping`","`wrapT = RepeatWrapping`","`repeat` mayor que 1","`metalness = 1`"],correctas:[0,1,2],explicacion:`La metalicidad no tiene nada que ver con el mapeo.`},{tipo:`unica`,enunciado:"¿Cómo se evita que dos mallas compartan `repeat`?",opciones:[`Clonando la textura`,`Duplicando la geometría`,"Cambiando el material a `basic`",`No se puede evitar`],correcta:0,explicacion:"`texture.clone()` comparte la imagen y separa los parámetros."}],recursos:[{titulo:`three.js: Texture`,url:`https://threejs.org/docs/#api/en/textures/Texture`,nota:"`repeat`, `offset`, `wrapS`, `wrapT`, `needsUpdate`."},{titulo:`three.js: BufferGeometry.attributes.uv`,url:`https://threejs.org/docs/#api/en/core/BufferGeometry`,nota:`Dónde viven los UVs y cómo se leen para depurar.`},{titulo:`Polycount: UV mapping basics`,url:`https://polycount.com/discussion/43018/uv-mapping-basics`,nota:`Referencia clásica de desplegado, aunque sea de otro software.`}],ejercicio:{reto:"Genera una textura con `CanvasTexture` en el navegador y applícale `repeat` y `offset` con dos deslizadores.",inicial:`import { useMemo } from 'react'
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
}`,solucion:`import { useMemo } from 'react'
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
}`,pistas:["El `wrap` se pone en la textura, no en el material.","Sin `wrapS`/`wrapT` en `RepeatWrapping`, `repeat` no hace mosaico.","Marca `needsUpdate` después de tocar los parámetros."]}},{id:`7.2`,modulo:7,titulo:`Cargar texturas`,objetivo:"Cargar imágenes con `useTexture`, entender el suspendido de la carga y configurar filtros y anisotropía con criterio.",nivel:`intro`,minutos:45,bloques:[{tipo:`parrafo`,texto:"Cargar una imagen es asíncrono, y una escena no puede dibujar una textura que todavía no llegó. R3F resuelve esto con `Suspense`: el componente que llama a `useTexture` se suspende hasta que el archivo está listo. Por eso todas las demos del curso ya están envueltas en `<Suspense>`; si escribes fuera de ese límite, verás el aviso de «suspended while rendering»."},{tipo:`demo`,id:`m7-cargar`,titulo:`Filtro y anisotropía sobre una superficie en rasante`},{tipo:`codigo`,lenguaje:`tsx`,titulo:`Cargar, configurar y no duplicar descargas`,codigo:`import { useTexture } from '@react-three/drei'
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
useTexture.preload(TEXTURAS.rejillaColor)`},{tipo:`tabla`,cabecera:[`Ajuste`,`Qué hace`,`Cuándo tocarlo`],filas:[["`minFilter`",`Filtro al reducir`,`Texturas repetidas que se ven pequeñas`],["`magFilter`",`Filtro al ampliar`,"Poco habitual; `Nearest` da aspecto pixelado"],["`generateMipmaps`",`Genera versiones reducidas`,"Dejar activo salvo en `DataTexture`"],["`anisotropy`",`Muestras extra en ejes comprimidos`,`Suelos y planos en rasante`],["`flipY`",`Invierte la V al cargar`,`Casi nunca; solo con imágenes invertidas`]]},{tipo:`destacado`,tono:`porque`,titulo:`Por qué el suelo lejano brilla y parpadea`,texto:`Porque una textura repetida termina ocupando menos de un píxel por texel. Sin mipmaps, el muestreo coge un texel al azar por píxel y el resultado vibra al mover la cámara. Con mipmaps se elige una versión reducida y el ruido desaparece; la anisotropía añade muestras en la dirección comprimida para que no se vea todo borroso.`},{tipo:`lista`,items:["`useTexture` cachea por URL: dos componentes que piden lo mismo descargan una vez.","La anisotropía máxima la impone la GPU: `gl.capabilities.getMaxAnisotropy()`.","`useTexture.preload` lanza la descarga antes de montar el componente.",`Los mapas de datos no llevan sRGB, y los de color sí: eso es la lección 7.3.`,`Una textura de 4096 px en un móvil puede costar 64 MB de VRAM. No hace falta para una taza.`]}],errores:[{sintoma:`«A component suspended while responding to synchronous input».`,causa:"Se llamó a `useTexture` fuera de un `<Suspense>`.",arreglo:"Envuelve el subárbol en `<Suspense fallback={null}>`."},{sintoma:`La textura sale al revés en vertical.`,causa:"La imagen se guardó con el origen invertido o `flipY` está mal.",arreglo:"Corrige el archivo o ajusta `texture.flipY` antes de subirla."},{sintoma:`El suelo se ve borroso en cuanto se aleja.`,causa:"`anisotropy` a 1 y mipmaps por defecto.",arreglo:"Sube `anisotropy` al máximo razonable (8–16) y mantén los mipmaps."}],quiz:[{tipo:`unica`,enunciado:"¿Por qué hace falta `Suspense` al cargar texturas?",opciones:[`Porque la carga es asíncrona y el componente espera al archivo`,`Porque WebGL no soporta imágenes`,`Porque React no puede renderizar en 3D`,`Porque las texturas son opcionales`],correcta:0,explicacion:"`useTexture` lanza una promesa; `Suspense` muestra el fallback mientras se resuelve."},{tipo:`verdadero-falso`,enunciado:"`useTexture` descarga el archivo una vez por componente que lo usa.",correcta:!1,explicacion:`Cachea por URL: la misma ruta se descarga una sola vez.`},{tipo:`multiple`,enunciado:`¿Qué mejora la calidad de una textura repetida vista en rasante?`,opciones:["`anisotropy` alto",`Mipmaps activos`,"`minFilter` adecuado","`metalness` alto"],correctas:[0,1,2],explicacion:`La metalicidad no afecta al muestreo de la textura.`},{tipo:`unica`,enunciado:`¿De dónde sale el máximo de anisotropía?`,opciones:["De `gl.capabilities.getMaxAnisotropy()`","De `THREE.REVISION`",`Del tamaño de la textura`,`De la cámara`],correcta:0,explicacion:`Lo impone la extensión de la GPU, no la librería.`}],recursos:[{titulo:`drei: useTexture`,url:`https://drei.docs.pmnd.rs/loaders/use-texture`,nota:"Firma, precarga y relación con `Suspense`."},{titulo:`three.js: TextureLoader`,url:`https://threejs.org/docs/#api/en/loaders/TextureLoader`,nota:`El cargador que hay debajo.`},{titulo:`three.js: Texture.minFilter`,url:`https://threejs.org/docs/#api/en/textures/Texture`,nota:`La lista de filtros y cuándo usar cada uno.`}],ejercicio:{reto:"Genera una textura de cuadrícula en canvas, aplícale `anisotropy = 8` y compárala con `anisotropy = 1` en un plano inclinado.",inicial:`import { useMemo, useState } from 'react'
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
}`,solucion:`import { useMemo, useState } from 'react'
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
}`,pistas:[`La anisotropía se asigna en la textura, no en el material.`,"Cada cambio necesita `needsUpdate = true` para re-subir la configuración.",`A 1 se ve una mancha; a 8, las líneas aguantan más lejos.`]}},{id:`7.3`,modulo:7,titulo:"`colorSpace`",objetivo:`Distinguir mapas de color de mapas de datos y corregir el aspecto lavado con la declaración correcta.`,nivel:`medio`,minutos:50,bloques:[{tipo:`parrafo`,texto:"Un PNG no dice qué contienen sus píxeles. Si es una foto o un color, está guardado en sRGB: un espacio no lineal pensado para pantallas. Si es un mapa de normales o de rugosidad, sus valores son datos lineales y no deben convertirse. three.js no puede adivinarlo, así que lo eliges tú con `colorSpace`, y equivocarse tiene un síntoma muy concreto: la textura se ve lavada y sin contraste."},{tipo:`demo`,id:`m7-colorspace`,titulo:`Mismo archivo, dos declaraciones`},{tipo:`codigo`,lenguaje:`tsx`,titulo:`Qué va en sRGB y qué no`,codigo:`// Mapa de color: se guardó en sRGB.
color.colorSpace = THREE.SRGBColorSpace

// Mapas de datos: sus valores son lineales.
normal.colorSpace = THREE.NoColorSpace
rugosidad.colorSpace = THREE.NoColorSpace
metalicidad.colorSpace = THREE.NoColorSpace
ao.colorSpace = THREE.NoColorSpace

// Emisivo es color, aunque no reciba luz.
emisivo.colorSpace = THREE.SRGBColorSpace`},{tipo:`tabla`,cabecera:[`Mapa`,`Contenido`,"`colorSpace`"],filas:[["`map`",`Color albedo`,"`SRGBColorSpace`"],["`emissiveMap`",`Color emitido`,"`SRGBColorSpace`"],["`normalMap`",`Vector codificado`,"`NoColorSpace`"],["`roughnessMap`",`Escala de grises`,"`NoColorSpace`"],["`aoMap`",`Oclusión`,"`NoColorSpace`"]]},{tipo:`destacado`,tono:`porque`,titulo:`Por qué se ve «lavado» y no simplemente oscuro`,texto:`Porque el renderer convierte los valores lineales a sRGB al escribir el píxel. Si tratas un valor sRGB como lineal, lo elevas dos veces (aproximadamente) y el resultado es más claro y desaturado de lo que debería. No es un fallo de iluminación: es una conversión hecha dos veces o ninguna.`},{tipo:`lista`,items:["`SRGBColorSpace` para todo lo que sea color visible.","`NoColorSpace` para todo lo que sea un número: normales, rugosidad, metalicidad, AO.",`Una textura mal declarada envejece mal: cambia si tocas el mapeo tonal.`,`En glTF el color ya viene marcado; el problema aparece con archivos cargados a mano.`,"Si dudas, cambia solo `colorSpace` y compara: es la prueba más rápida."]}],errores:[{sintoma:`La madera se ve gris y sin contraste.`,causa:"El mapa de color está en `NoColorSpace`.",arreglo:"Declara `SRGBColorSpace` en el mapa de color."},{sintoma:`El relieve del mapa de normales se ve exagerado y sucio.`,causa:`El mapa de normales está declarado como sRGB.`,arreglo:"Ponlo en `NoColorSpace`; los vectores no se convierten."},{sintoma:`El color cambia al activar el mapeo tonal ACES.`,causa:`Una o más texturas estaban mal declaradas y el mapeo lo hace evidente.`,arreglo:"Revisa el `colorSpace` de todos los mapas antes de culpar al mapeo."}],quiz:[{tipo:`unica`,enunciado:`¿Qué espacio corresponde a un mapa de color?`,opciones:["`SRGBColorSpace`","`NoColorSpace`","`LinearSRGBColorSpace`","`DisplayP3ColorSpace`"],correcta:0,explicacion:`Los colores visibles se guardan en sRGB por convención.`},{tipo:`verdadero-falso`,enunciado:`El mapa de normales debe declararse en sRGB.`,correcta:!1,explicacion:"Contiene vectores, no color: va en `NoColorSpace`."},{tipo:`multiple`,enunciado:`¿Qué mapas son datos y no color?`,opciones:["`normalMap`","`roughnessMap`","`aoMap`","`emissiveMap`"],correctas:[0,1,2],explicacion:"`emissiveMap` es color emitido: sRGB."},{tipo:`unica`,enunciado:`¿Qué síntoma produce declarar un color como lineal?`,opciones:[`Se ve más claro y desaturado`,`Se ve más oscuro y saturado`,`No se ve`,`Se ve en blanco y negro`],correcta:0,explicacion:`Se aplica una conversión de más y los valores suben.`}],recursos:[{titulo:`three.js: Color management`,url:`https://threejs.org/docs/#manual/en/introduction/Color-management`,nota:`La explicación completa de espacios de color y conversiones.`},{titulo:`three.js: Texture.colorSpace`,url:`https://threejs.org/docs/#api/en/textures/Texture`,nota:`Los valores admitidos y su efecto.`},{titulo:`glTF 2.0: material specification`,url:`https://registry.khronos.org/glTF/specs/2.0/glTF-2.0.html#materials`,nota:`Qué mapas son sRGB y cuáles lineales según el estándar.`}],ejercicio:{reto:`Crea dos planos con la misma textura generada en canvas: uno declarado como sRGB y otro como lineal. Comprueba cuál se ve correcto.`,inicial:`import { useMemo } from 'react'
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
}`,solucion:`import { useMemo } from 'react'
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
}`,pistas:["Con `meshBasicMaterial` la luz no interviene y la diferencia se ve limpia.",`Dos planos separados 1,5 unidades, ambos mirando a cámara.`,`El de la izquierda será el lavado: compruébalo cambiando el orden.`]}},{id:`7.4`,modulo:7,titulo:`Mapas PBR`,objetivo:`Componer un material PBR completo y explicar qué aporta cada mapa sin confundir canales.`,nivel:`medio`,minutos:60,bloques:[{tipo:`parrafo`,texto:`Un material PBR no es «un material con textura»: es un conjunto de mapas que describen propiedades físicas distintas. El color dice qué luz refleja; la normal, hacia dónde apunta cada microsuperficie; la rugosidad, cuánto dispersa; el AO, cuánta luz llega a las grietas; el emisivo, qué emite sin iluminación. Cada uno tiene su propio formato y su propio espacio de color.`},{tipo:`demo`,id:`m7-mapas`,titulo:`Activa y desactiva cada mapa`},{tipo:`codigo`,lenguaje:`tsx`,titulo:`Un material completo`,codigo:`<meshStandardMaterial
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
/>`},{tipo:`tabla`,cabecera:[`Mapa`,`Qué modula`,`Canal / espacio`],filas:[["`map`",`Color base`,`RGB · sRGB`],["`normalMap`",`Orientación de la superficie`,`RGB codificado · lineal`],["`roughnessMap`",`Brillo`,`Canal verde · lineal`],["`metalnessMap`",`Reflectividad`,`Canal azul · lineal`],["`aoMap`",`Oclusión en huecos`,"Canal rojo · lineal, requiere `uv1`"],["`emissiveMap`",`Luz emitida`,`RGB · sRGB`]]},{tipo:`destacado`,tono:`ojo`,titulo:`glTF empaqueta la rugosidad, la metalicidad y el AO`,texto:`En el estándar glTF, esos tres mapas van en una sola imagen ORM: rojo para la oclusión, verde para la rugosidad, azul para la metalicidad. Por eso many veces no hay tres archivos sino uno. En este curso solo se ha generado el de rugosidad en escala de grises, y el AO no se puede aplicar porque necesita un segundo juego de UV que estos modelos no tienen.`},{tipo:`lista`,items:[`La normal se nota sobre todo en el borde iluminado, no en el centro.`,"Si `roughness` es 1 y hay `roughnessMap`, el valor final es el del mapa.",`El AO no sustituye a las sombras: oscurece solo donde el modelo lo indica.`,"`emissiveMap` sin `emissive` de color blanco no emite nada perceptible.",`Más mapas no es mejor: un modelo con cinco mapas mal alineados se ve peor que uno con dos.`]}],errores:[{sintoma:`El detalle de la normal desaparece al alejar la cámara.`,causa:`Mipmaps del mapa de normal demasiado agresivos o textura de baja resolución.`,arreglo:"Usa una normal de más resolución y revisa su `anisotropy`."},{sintoma:`La superficie brilla igual en todas partes.`,causa:"No hay `roughnessMap`, o `roughness` está forzado a un valor bajo.",arreglo:"Conecta el mapa y deja `roughness={1}` para que lo module."},{sintoma:`El AO no hace nada.`,causa:"`aoMap` necesita un segundo juego de UV (`uv1`) que la geometría no tiene.",arreglo:"Modela con `uv1` o usa el AO pintado en el color; no hay atajo."}],quiz:[{tipo:`unica`,enunciado:`¿Qué describe el mapa de normales?`,opciones:[`La orientación de la microsuperficie`,`El color base`,`La cantidad de luz emitida`,`La oclusión`],correcta:0,explicacion:`Codifica una dirección por texel, no un color visible.`},{tipo:`verdadero-falso`,enunciado:`En glTF, rugosidad y metalicidad suelen ir en la misma imagen.`,correcta:!0,explicacion:`Van empaquetadas con el AO en el mapa ORM.`},{tipo:`multiple`,enunciado:"¿Qué mapas deben ir en `NoColorSpace`?",opciones:["`normalMap`","`roughnessMap`","`aoMap`","`emissiveMap`"],correctas:[0,1,2],explicacion:`El emisivo es color: sRGB.`},{tipo:`unica`,enunciado:"¿Qué hace falta para usar `aoMap`?",opciones:["Un segundo juego de UV (`uv1`)",`Un HDRI`,`Activar sombras`,`Un material físico`],correcta:0,explicacion:`El AO se muestrea con el segundo juego, no con el primero.`}],recursos:[{titulo:`three.js: MeshStandardMaterial`,url:`https://threejs.org/docs/#api/en/materials/MeshStandardMaterial`,nota:`La lista completa de mapas y qué modula cada uno.`},{titulo:`glTF 2.0: materials`,url:`https://registry.khronos.org/glTF/specs/2.0/glTF-2.0.html#materials`,nota:`El empaquetado ORM y los espacios de color por mapa.`},{titulo:`Physically Based Rendering: theory`,url:`https://learnopengl.com/PBR/Theory`,nota:`El modelo metal-roughness explicado desde cero.`}],ejercicio:{reto:`Genera en canvas dos texturas (color y normal aproximada) y úsalas juntas en un material estándar. Comprueba que la normal cambia el reflejo de la luz.`,inicial:`import { useMemo } from 'react'
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
}`,solucion:`import { useMemo } from 'react'
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
}`,pistas:["La normal es una textura más: `normalMap={normal}`.",`El azul dominante indica que la normal apunta hacia fuera.`,`Para ver el efecto, mueve la luz: el relieve aparece en el borde iluminado.`]}},{id:`7.5`,modulo:7,titulo:`Materiales físicos avanzados`,objetivo:"Usar `clearcoat`, `transmission`, `sheen` e `iridescence` con criterio y reconocer su coste.",nivel:`alto`,minutos:60,bloques:[{tipo:`parrafo`,texto:"`MeshPhysicalMaterial` es `MeshStandardMaterial` con capas encima. Cada capa modela un fenómeno que el modelo básico no puede: una película de barniz sobre el color, un vidrio que deja pasar la luz, una tela que dispersa en el borde, una película fina que cambia de color con el ángulo. Son cuatro herramientas distintas y ninguna sustituye a las otras."},{tipo:`demo`,id:`m7-fisicos`,titulo:`Cuatro capas, cuatro esferas, un contador de FPS`},{tipo:`codigo`,lenguaje:`tsx`,titulo:`Las cuatro capas, con sus props mínimas`,codigo:`// Barniz: una segunda capa especular sobre el color.
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
<meshPhysicalMaterial iridescence={1} iridescenceIOR={1.3} iridescenceThicknessRange={[120, 460]} />`},{tipo:`tabla`,cabecera:[`Capa`,`Modela`,`Coste`,`Necesita entorno`],filas:[["`clearcoat`",`Barniz, laca, pintura de coche`,`Medio`,`Sí, para notarse`],["`transmission`",`Vidrio, agua, ámbar`,`Alto: pasada extra`,`Sí, imprescindible`],["`sheen`",`Tela, terciopelo, polvo`,`Bajo`,`Recomendable`],["`iridescence`",`Burbujas, aceite, escarabajo`,`Medio`,`Sí`]]},{tipo:`destacado`,tono:`porque`,titulo:"Por qué `transmission` es la capa cara",texto:"Porque el renderer no puede refractar algo que todavía no ha dibujado. Necesita renderizar la escena sin el objeto transparente en un render target aparte, y luego muestrearlo desde dentro del material. Ese render extra se controla con `gl.transmissionResolutionScale`: a 0,5 cuesta la cuarta parte de píxeles y el fondo se ve algo borroso."},{tipo:`lista`,items:["Sin entorno, `transmission` y `clearcoat` se ven casi negros: no hay nada que reflejar.","`thickness` exagera la refracción; 0,5–1 funciona en objetos pequeños.","`ior` 1,5 es vidrio; 1,33 es agua; 2,4 es diamante.","`sheen` solo se nota en el borde del objeto, no en el centro.","Nunca uses `MeshPhysicalMaterial` para todo: el 90 % de la escena va con `standard`."]}],errores:[{sintoma:`El cristal se ve gris opaco.`,causa:`No hay entorno ni nada detrás que refractar.`,arreglo:"Añade `<Environment>` y algo de geometría detrás del objeto."},{sintoma:"Con `transmission` los FPS caen a la mitad.",causa:`La pasada extra de transmisión se renderiza a resolución completa.`,arreglo:"Baja `gl.transmissionResolutionScale` a 0,5 y comprueba si se nota."},{sintoma:"`iridescence` no cambia de color al girar.",causa:`La superficie es mate o el rango de espesor es demasiado estrecho.`,arreglo:"Baja `roughness` y amplía `iridescenceThicknessRange`."}],quiz:[{tipo:`unica`,enunciado:`¿Qué capa modela una tela?`,opciones:["`sheen`","`clearcoat`","`transmission`","`iridescence`"],correcta:0,explicacion:"`sheen` añade dispersión en el borde, típica de fibras."},{tipo:`verdadero-falso`,enunciado:"`transmission` requiere una pasada de render adicional.",correcta:!0,explicacion:`La escena se dibuja en un render target aparte para poder refractarla.`},{tipo:`multiple`,enunciado:`¿Qué capas necesitan un mapa de entorno para lucir?`,opciones:["`clearcoat`","`transmission`","`iridescence`","`sheen`"],correctas:[0,1,2],explicacion:"`sheen` es difuso y se nota también con luces directas."},{tipo:`unica`,enunciado:"¿Qué controla `transmissionResolutionScale`?",opciones:[`La resolución del render de transmisión`,`La cantidad de luz transmitida`,`El índice de refracción`,`El grosor del cristal`],correcta:0,explicacion:`Es una propiedad del renderer: menos resolución, menos coste.`}],recursos:[{titulo:`three.js: MeshPhysicalMaterial`,url:`https://threejs.org/docs/#api/en/materials/MeshPhysicalMaterial`,nota:`Todas las capas y sus props.`},{titulo:`three.js: transmission example`,url:`https://threejs.org/examples/#webgl_materials_physical_transmission`,nota:`Ejemplo oficial de transmisión con su configuración.`},{titulo:`drei: Environment`,url:`https://drei.docs.pmnd.rs/staging/environment`,nota:`Cómo aportar el entorno que estas capas necesitan.`}],ejercicio:{reto:"Crea dos esferas: una con `clearcoat` y otra con `sheen`. Cambia la rugosidad de la base y observa qué capa cambia antes.",inicial:`import { Canvas } from '@react-three/fiber'

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
}`,solucion:`import { Canvas } from '@react-three/fiber'

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
}`,pistas:["Cambia solo la etiqueta del material: `meshStandardMaterial` → `meshPhysicalMaterial`.","`clearcoat` a 1 y `clearcoatRoughness` bajo dan un brillo de laca.","`sheen` necesita `sheenColor`; con negro no se ve."]}},{id:`7.6`,modulo:7,titulo:`Checkpoint: objeto con cinco mapas`,objetivo:`Montar un material completo y verificado, comparándolo con el error típico de principiante.`,nivel:`medio`,minutos:60,bloques:[{tipo:`parrafo`,texto:`El checkpoint consiste en coger un objeto, aplicarle los mapas disponibles y dejar por escrito por qué cada uno está donde está. La demo compara dos versiones del mismo objeto con los mismos archivos: la de principiante acumula cuatro errores típicos; la correcta los corrige sin cambiar de texturas.`},{tipo:`demo`,id:`m7-comparador`,titulo:`Los mismos archivos, dos resultados`},{tipo:`pasos`,items:[{titulo:`1. Empieza por el color`,texto:"Carga el mapa de color, declara `SRGBColorSpace` y ajusta `repeat`. Si el color no es correcto, nada de lo demás importa."},{titulo:`2. Añade la normal`,texto:"Sin normal, la superficie es lisa. Declara `NoColorSpace` y ajusta `normalScale` entre 0,5 y 1,2."},{titulo:`3. Añade la rugosidad`,texto:"Conecta `roughnessMap` y deja `roughness={1}` para que el mapa module en todo su rango."},{titulo:`4. Añade el emisivo si tiene sentido`,texto:"Solo si el objeto emite luz de verdad. `emissive` blanco y `emissiveMap` en sRGB."},{titulo:`5. Ilumina y compara`,texto:`Con un HDRI o tres luces, compara con una versión «plana» para comprobar que cada mapa aporta algo visible.`}]},{tipo:`checkpoint`,titulo:`Antes de cerrar el módulo`,items:["El mapa de color está en `SRGBColorSpace`.","Los mapas de datos están en `NoColorSpace`.","`repeat` está ajustado a la escala real del objeto y usa `RepeatWrapping`.","Hay `normalMap` y se nota en el borde iluminado.","`roughnessMap` modula el brillo y no está anulado por un `roughness` bajo.",`Sé explicar por qué el AO no se puede usar en estos modelos.`]},{tipo:`destacado`,tono:`truco`,titulo:`La prueba de los cuatro interruptores`,texto:`Desactiva los mapas uno a uno. Si al quitar uno no cambia nada, ese mapa no está aportando: o está mal declarado, o no hacía falta. Un material correcto pierde algo visible con cada interruptor, y ese algo es lo que justifica el archivo.`}],errores:[{sintoma:`El material se ve bien de cerca y plano de lejos.`,causa:"El `normalMap` pierde efecto por mipmaps o por resolución baja.",arreglo:`Sube la resolución del mapa de normal y revisa la anisotropía.`},{sintoma:`Todo el objeto brilla igual.`,causa:"El `roughnessMap` no está conectado o `roughness` está a 0,2.",arreglo:"Conecta el mapa y pon `roughness={1}`."},{sintoma:`La textura se estira en una cara del objeto.`,causa:`Los UVs de esa cara no están bien desplegados.`,arreglo:"Corrige el desplegado en el modelo; `repeat` no arregla un UV estirado."}],quiz:[{tipo:`unica`,enunciado:`¿Cuál es el primer mapa que hay que dejar bien?`,opciones:[`El de color`,`El de normales`,`El de rugosidad`,`El emisivo`],correcta:0,explicacion:`Si el color está mal declarado, todo lo demás se evalúa sobre una base falsa.`},{tipo:`verdadero-falso`,enunciado:`Si al desactivar un mapa no cambia nada, probablemente sobra.`,correcta:!0,explicacion:`Es la prueba más rápida de que un mapa aporta o no.`},{tipo:`multiple`,enunciado:`¿Qué hace falta revisar en un material completo?`,opciones:["El `colorSpace` de cada mapa","El `repeat` y el `wrap`",`Que la normal se note`,`Que todos los mapas pesen lo mismo`],correctas:[0,1,2],explicacion:`El peso de los archivos no es un criterio visual.`},{tipo:`unica`,enunciado:`¿Qué significa que un mapa «no aporta»?`,opciones:[`Que no cambia el resultado al activarlo o desactivarlo`,`Que pesa poco`,`Que es de baja resolución`,`Que está en blanco y negro`],correcta:0,explicacion:`La prueba es visual: si no hay diferencia, no está haciendo trabajo.`}],recursos:[{titulo:`three.js: MeshStandardMaterial`,url:`https://threejs.org/docs/#api/en/materials/MeshStandardMaterial`,nota:`Repaso de todos los mapas y sus valores por defecto.`},{titulo:`glTF 2.0: materials`,url:`https://registry.khronos.org/glTF/specs/2.0/glTF-2.0.html#materials`,nota:`La referencia de qué es cada mapa en el estándar.`},{titulo:`three.js: Color management`,url:`https://threejs.org/docs/#manual/en/introduction/Color-management`,nota:`El repaso del espacio de color, que es el error más frecuente.`}],ejercicio:{reto:`Genera en canvas las cinco texturas equivalentes (color, normal, rugosidad, emisivo y una máscara de AO) y monta un material con todas. Comprueba con interruptores si cada una aporta algo.`,inicial:`import { useMemo } from 'react'
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
}`,solucion:`import { useMemo } from 'react'
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
}`,pistas:["Cada textura necesita su `colorSpace`: color y emisivo en sRGB, el resto lineal.","La normal se ve mejor con `metalness` alto y `roughness` bajo.","El emisivo necesita `emissive` blanco para que el mapa mande el color."]}}]},{numero:8,titulo:`Modelos: del archivo a la escena`,descripcion:"Todo lo que hay entre un `.glb` y un objeto que puedes tocar: qué contiene el archivo, cómo se carga, cómo se recorre, cómo se anima, cómo se modela y cómo se adelgaza sin romperlo.",lecciones:[{id:`8.1`,modulo:8,titulo:`Anatomía de un modelo y formatos`,objetivo:"Describir qué hay dentro de un `.glb` y por qué glTF es el formato natural de la web.",nivel:`intro`,minutos:60,bloques:[{tipo:`parrafo`,texto:"Un `.glb` es un contenedor, no una imagen del objeto. Dentro hay dos bloques: un JSON con el grafo completo (nodos, mallas, materiales, animaciones) y un búfer binario con los vértices, los índices y las claves de animación. El JSON no describe la forma: la referencia. Cada malla apunta a unos `accessors` que dicen «en tal búfer, desde tal byte, hay 606 vectores de tres floats»."},{tipo:`widget`,id:`m8-estructura`,titulo:"Abre un `.glb` del curso y cuenta lo que hay dentro"},{tipo:`parrafo`,texto:"La demo lee el archivo con `fetch` y `DataView`, sin WebGL y sin decodificadores. Cambia de modelo y compara: la tuerca son 2 nodos y 96 triángulos; el taller son 30 nodos y 1 108 triángulos. El peso no crece con los nodos, crece con la geometría, las texturas y las claves de animación. Y el rover pesa 16,8 KB con 444 triángulos porque está comprimido con Draco."},{tipo:`codigo`,lenguaje:`json`,titulo:`Lo mínimo que hay en el JSON de un glTF`,codigo:`{
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
}`},{tipo:`tabla`,cabecera:[`Formato`,`Qué guarda`,`Peso`,`Para qué`],filas:[["`.glb`",`Todo en un binario`,`Compacto`,`Web, tiempo real`],["`.gltf` + binarios",`JSON separado`,`Más archivos`,`Depurar a mano`],["`.obj`",`Solo geometría`,`Ligero`,`Intercambio antiguo, sin animación`],["`.fbx`",`Geometría, rig, animación`,`Pesado`,`Pipeline de DCC`],["`.usdz`",`Escena de Apple`,`Medio`,`AR en iOS`]]},{tipo:`destacado`,tono:`ojo`,titulo:`Draco cambia el interior, no el formato`,texto:"Un GLB con Draco sigue siendo glTF: el JSON es normal y añade `KHR_draco_mesh_compression` a `extensionsRequired`. Lo que cambia es que los accessors de geometría ya no están en claro; hay que decodificarlos. Por eso `useGLTF` necesita el decodificador en `public/draco/` y no basta con descargar el archivo."},{tipo:`lista`,items:[`Un nodo puede no tener malla: sirve de pivote o de grupo.`,`Una malla puede tener varias primitivas: una por material.`,`Una escena puede tener varias raíces; el visor elige una.`,"Las texturas viajan aparte (`images`), aunque el GLB las empaqueta.","Un `.glb` no guarda luces ni cámara del curso salvo que las incluyas."]}],errores:[{sintoma:`El archivo pesa 40 MB y la escena tarda diez segundos en aparecer.`,causa:`Texturas a 4096 px y geometría sin comprimir metidas en el mismo GLB.`,arreglo:`Reduce texturas, aplica Draco y separa lo que no se ve al principio.`},{sintoma:`El modelo se carga pero no tiene animaciones.`,causa:"Se exportó solo la malla, sin el `armature` ni las acciones.",arreglo:"Vuelve a exportar con las animaciones marcadas y comprueba `animations` en el JSON."},{sintoma:`Al abrir el GLB en otro programa aparecen objetos en posiciones raras.`,causa:`Transformaciones negativas o jerarquías con escala no uniforme.`,arreglo:`Aplica escala y rotación en el DCC antes de exportar; no las dejes en el nodo raíz.`}],quiz:[{tipo:`unica`,enunciado:`¿Qué dos partes tiene un GLB?`,opciones:[`Un chunk JSON y un chunk binario`,`Un HTML y un JS`,`Una textura y una malla`,`Un ZIP y un manifiesto`],correcta:0,explicacion:`El JSON describe el grafo; el binario guarda los datos de los accessors.`},{tipo:`verdadero-falso`,enunciado:`Un nodo de un glTF siempre tiene una malla.`,correcta:!1,explicacion:`Puede ser un grupo o un pivote sin geometría propia.`},{tipo:`multiple`,enunciado:`¿Qué puede contener un GLB?`,opciones:[`Nodos y mallas`,`Materiales`,`Animaciones`,`El servidor que lo sirve`],correctas:[0,1,2],explicacion:`El archivo no incluye infraestructura: solo datos de escena.`},{tipo:`unica`,enunciado:"¿Qué indica `KHR_draco_mesh_compression`?",opciones:[`Que la geometría está comprimida y hay que decodificarla`,`Que el archivo está dañado`,`Que usa texturas KTX2`,`Que no tiene animaciones`],correcta:0,explicacion:`Es una extensión requerida: sin decodificador, el modelo no se puede leer.`}],recursos:[{titulo:`glTF 2.0: especificación`,url:`https://registry.khronos.org/glTF/specs/2.0/glTF-2.0.html`,nota:`La referencia de nodos, mallas, accessors y extensiones.`},{titulo:`Khronos: glTF-Validator`,url:`https://github.com/KhronosGroup/glTF-Validator`,nota:`Comprueba si un archivo cumple el estándar antes de publicarlo.`},{titulo:`three.js: GLTFLoader`,url:`https://threejs.org/docs/#examples/en/loaders/GLTFLoader`,nota:`Qué lee de cada parte del archivo y qué extensiones soporta.`}],ejercicio:{reto:`Cuenta los triángulos de este glTF mínimo a partir de sus accessors, sin usar three.js.`,inicial:`const gltf = {
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
console.log(0)`,solucion:`const gltf = {
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

console.log(triangulos) // 12 + 4 = 16`,pistas:[`Cada triángulo indexado gasta tres índices.`,`Sin índice, cada tres vértices forman un triángulo.`,`La primera malla son 12 triángulos y la segunda 4.`]}},{id:`8.2`,modulo:8,titulo:"Cargar con `useGLTF`",objetivo:"Cargar un modelo con `Suspense`, precargarlo, cachearlo y resolver sus rutas en Vite.",nivel:`intro`,minutos:55,bloques:[{tipo:`parrafo`,texto:"`useGLTF` es un `useLoader` especializado: lanza la descarga, suspende el componente hasta que el archivo está listo y devuelve `{ scene, nodes, materials, animations }`. El `scene` es un `Group` de three.js normal; `nodes` y `materials` son diccionarios por nombre para poder tocar piezas concretas sin recorrer nada a mano."},{tipo:`demo`,id:`m8-cargar`,titulo:`Carga, falla a propósito y reintenta`},{tipo:`codigo`,lenguaje:`tsx`,titulo:`La forma mínima, con decodificador local`,codigo:`// src/tres/gltf.ts: una sola vez, antes de cualquier carga.
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
useGLTF.preload(MODELOS.rover, true)`},{tipo:`tabla`,cabecera:[`Propiedad`,`Qué es`,`Uso típico`],filas:[["`scene`","El `Group` raíz","Montarlo con `<primitive>`"],["`nodes`",`Diccionario nombre → objeto`,"`nodes.chasis`, `nodes.rueda_del_izq`"],["`materials`",`Diccionario nombre → material`,`Recolorear una pieza`],["`animations`","Array de `AnimationClip`","Pasarlo a `useAnimations`"]]},{tipo:`destacado`,tono:`porque`,titulo:"Por qué la ruta no puede ser `/modelos/rover.glb`",texto:"Porque `vite.config.ts` usa `base: './'` para que la web funcione en un subdirectorio de GitHub Pages. Una ruta absoluta se resuelve contra la raíz del dominio y da 404 en producción aunque funcione en local. Por eso todas las rutas pasan por `rutaAsset`, que compone con `import.meta.env.BASE_URL`."},{tipo:`lista`,items:["`useGLTF` cachea por URL: dos componentes que piden el mismo archivo lo descargan una vez.","`useGLTF.clear(url)` borra esa entrada; la siguiente petición vuelve a leer el archivo.","`useGLTF.preload` acelera la primera lección que usa el modelo.","El `scene` cacheado se comparte: si lo modificas, la modificación persiste en la siguiente demo.",`El decodificador de Draco debe ser local si la web tiene que funcionar sin red.`]}],errores:[{sintoma:`«A component suspended while responding to synchronous input».`,causa:"Se llamó a `useGLTF` sin un `<Suspense>` por encima.",arreglo:"Envuelve el subárbol en `<Suspense fallback={…}>`."},{sintoma:"El modelo no carga y la consola habla de `DRACOLoader` o de un `.wasm` perdido.",causa:`La ruta del decodificador apunta al CDN o no existe.`,arreglo:"Copia los decodificadores a `public/draco/` y llama a `useGLTF.setDecoderPath(DRACO)`."},{sintoma:`En local carga y en GitHub Pages da 404.`,causa:"Ruta absoluta en lugar de relativa al `base`.",arreglo:"Usa `rutaAsset('modelos/rover.glb')`, nunca una cadena con `/` inicial."}],quiz:[{tipo:`unica`,enunciado:"¿Qué devuelve `useGLTF`?",opciones:["Un objeto con `scene`, `nodes`, `materials` y `animations`","Un `Mesh` ya montado",`Una promesa`,`Un array de geometrías`],correcta:0,explicacion:"Es un `useLoader` con el resultado del `GLTFLoader` y mapas por nombre."},{tipo:`verdadero-falso`,enunciado:"Dos componentes que cargan el mismo `.glb` lo descargan dos veces.",correcta:!1,explicacion:"La caché de `useLoader` es por URL."},{tipo:`multiple`,enunciado:`¿Qué hace falta para un GLB comprimido con Draco?`,opciones:[`Los archivos del decodificador accesibles`,"Llamar a `setDecoderPath`",`Activar sombras`,`Un HDRI`],correctas:[0,1],explicacion:`Sombras y entorno no tienen relación con la decodificación.`},{tipo:`unica`,enunciado:"¿Para qué sirve `useGLTF.preload`?",opciones:[`Para empezar la descarga antes de montar el componente`,`Para comprimir el modelo`,`Para cambiar la cámara`,`Para liberar memoria`],correcta:0,explicacion:`Adelanta la petición y evita el salto al entrar en la lección.`}],recursos:[{titulo:`drei: useGLTF`,url:`https://drei.docs.pmnd.rs/loaders/use-gltf`,nota:`Firma, precarga, caché y decodificador.`},{titulo:`three.js: GLTFLoader`,url:`https://threejs.org/docs/#examples/en/loaders/GLTFLoader`,nota:`Qué hace el cargador que envuelve el hook.`},{titulo:`R3F: loading assets`,url:`https://r3f.docs.pmnd.rs/tutorials/loading-assets`,nota:"El patrón de `Suspense` y `useLoader` explicado desde cero."}],ejercicio:{reto:"Reproduce el patrón de carga con un cargador falso: una promesa que tarda 800 ms y un `Suspense` con fallback. Sin archivos, para que funcione en el sandbox.",inicial:`import { Suspense, use } from 'react'

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
}`,solucion:`import { Suspense, use } from 'react'

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
}`,pistas:["`use` de React 19 lee una promesa y suspende el componente.",`La promesa debe crearse fuera del componente: si se crea en cada render, nunca termina.`,"`Suspense` necesita un `fallback` visible para que se note la espera."]}},{id:`8.3`,modulo:8,titulo:"`gltfjsx`",objetivo:"Entender qué genera `gltfjsx` y decidir cuándo conviene un componente frente a `<primitive>`.",nivel:`medio`,minutos:55,bloques:[{tipo:`parrafo`,texto:"`<primitive object={scene} />` monta el grafo entero en una línea: perfecto para un visor, inútil para tocar una pieza. `gltfjsx` lee el GLB y escribe un componente con una etiqueta por nodo, usando `nodes` y `materials` por nombre. El resultado ocupa más y se lee peor, pero cada malla pasa a ser un elemento de React con props."},{tipo:`demo`,id:`m8-gltfjsx`,titulo:`La misma caja, dos montajes`},{tipo:`codigo`,lenguaje:`tsx`,titulo:`El patrón que genera, sin herramienta`,codigo:`import { useGLTF } from '@react-three/drei'
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
}`},{tipo:`tabla`,cabecera:[`Enfoque`,`Ventaja`,`Coste`,`Cuándo`],filas:[["`<primitive>`",`Una línea, monta todo`,`Sin acceso por pieza`,`Visores, modelos de una pieza`],[`Componente generado`,`Cada nodo es JSX`,`Archivo grande y verboso`,`Cuando hay que animar o configurar piezas`],[`Recorrido manual`,`Sin código generado`,`Nombres en cadenas`,`Pocas piezas y cambios concretos`]]},{tipo:`destacado`,tono:`truco`,titulo:"Ejecútalo con `--transform`",texto:"`npx gltfjsx modelo.glb --transform` no solo genera el componente: optimiza el GLB (dedup, prune, Draco) y deja el archivo listo para producción. Sin `--transform` genera el componente pero el modelo sigue pesando lo mismo. Son dos problemas distintos: el código y el peso."},{tipo:`lista`,items:["El componente generado usa `nodes.X.geometry` y `materials.Y`, no valores copiados.",`Si renombras un nodo en el DCC, el componente deja de encontrarlo.`,"`dispose={null}` en el grupo evita que React libere geometrías compartidas al desmontar.",`No edites a mano el archivo generado si vas a regenerarlo: se pierde.`,`Para un modelo de 30 nodos, el componente puede ocupar más que el propio GLB.`]}],errores:[{sintoma:`El componente generado lanza «Cannot read properties of undefined (reading geometry)».`,causa:`Un nombre de nodo no coincide: el GLB cambió o el nombre lleva sufijo.`,arreglo:"Imprime `Object.keys(nodes)` y corrige el nombre; no inventes el identificador."},{sintoma:`Al desmontar la escena, otra demo pierde las texturas.`,causa:`React liberó materiales compartidos que seguían en uso.`,arreglo:"Añade `dispose={null}` en el grupo raíz del componente generado."},{sintoma:`El modelo se ve entero pero no puedes ocultar una pieza.`,causa:"Se montó con `<primitive>` y no hay referencias por nodo.",arreglo:"Usa el componente generado o busca la pieza con `scene.getObjectByName`."}],quiz:[{tipo:`unica`,enunciado:"¿Qué hace `gltfjsx`?",opciones:[`Genera un componente React a partir de un GLB`,`Comprime el GLB siempre`,`Convierte GLB a OBJ`,`Sube el modelo a un CDN`],correcta:0,explicacion:`Escribe JSX con una etiqueta por nodo; la optimización es opcional.`},{tipo:`verdadero-falso`,enunciado:"El componente generado copia la geometría dentro del archivo `.tsx`.",correcta:!1,explicacion:"Referencia `nodes.X.geometry`; la geometría sigue en el GLB."},{tipo:`multiple`,enunciado:`¿Qué ganas con el componente generado?`,opciones:[`Acceso por pieza`,`Poder aplicar props de React a cada malla`,`Poder ocultar o recolorear un nodo`,`Un archivo más pequeño`],correctas:[0,1,2],explicacion:`El archivo de código crece; el GLB es el mismo.`},{tipo:`unica`,enunciado:"¿Qué añade `--transform`?",opciones:[`Optimización del GLB además del componente`,`Un servidor de desarrollo`,`Animaciones nuevas`,`Un HDRI`],correcta:0,explicacion:`Aplica dedup, prune y Draco al archivo de salida.`}],recursos:[{titulo:`gltfjsx`,url:`https://github.com/pmndrs/gltfjsx`,nota:"Opciones, `--transform` y ejemplos de salida."},{titulo:`drei: useGLTF`,url:`https://drei.docs.pmnd.rs/loaders/use-gltf`,nota:"De dónde salen `nodes` y `materials`."},{titulo:`gltf-transform: CLI`,url:`https://gltf-transform.dev/cli`,nota:"Lo que hace `--transform` por dentro."}],ejercicio:{reto:"Escribe un componente que reciba un mapa de nodos y pinte cada malla con su geometría y su material, en lugar de usar `<primitive>`.",inicial:`import { Canvas } from '@react-three/fiber'
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
}`,solucion:`import { Canvas } from '@react-three/fiber'
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
}`,pistas:["`Object.entries(nodes)` te da el nombre y la pieza.","Pasa `geometry` y `material` como props del `<mesh>`.","La `key` evita que React reutilice la malla equivocada."]}},{id:`8.4`,modulo:8,titulo:`Inspeccionar y manipular el grafo`,objetivo:`Recorrer los nodos de un modelo real, encontrar piezas por nombre y modificarlas sin contaminar la caché.`,nivel:`medio`,minutos:65,bloques:[{tipo:`parrafo`,texto:"Un modelo cargado es un árbol de `Object3D`. `traverse` lo recorre en profundidad y te da cada nodo; `getObjectByName` busca uno concreto. Con esas dos funciones y `instanceof Mesh` ya puedes hacer casi todo lo que se hace en un configurador: resaltar, ocultar, recolorear, clonar y mover piezas."},{tipo:`demo`,id:`m8-inspeccionar`,titulo:`Pulsa una pieza, resáltala, escóndela, clónala`},{tipo:`codigo`,lenguaje:`tsx`,titulo:`Las cuatro operaciones, sobre un clon`,codigo:`const { scene } = useGLTF(MODELOS.rover)

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
}`},{tipo:`tabla`,cabecera:[`Operación`,`API`,`Coste`],filas:[[`Recorrer`,"`traverse`",`Lineal en nodos`],[`Buscar`,"`getObjectByName`",`Lineal, pero barato`],[`Clonar`,"`clone(true)`",`Copia objetos; comparte geometría`],[`Material propio`,"`material.clone()`",`Duplica uniforms, no texturas`],[`Ocultar`,"`visible = false`",`Gratis: no se dibuja`]]},{tipo:`destacado`,tono:`ojo`,titulo:"El `scene` de `useGLTF` está compartido",texto:"La caché devuelve el mismo objeto a todas las demos. Si haces `scene.traverse` y cambias un material sin clonar, la siguiente lección abre el modelo ya pintado. La regla es simple: para leer, usa el original; para modificar, clona primero, aunque el clon comparta geometría."},{tipo:`lista`,items:["Los nombres duplicados existen: `getObjectByName` devuelve el primero.","`clone()` copia la jerarquía y las transformaciones, no los materiales.","Un `Group` no tiene geometría: comprueba con `instanceof Mesh`.","Ocultar con `visible` es más barato que desmontar y volver a montar.",`Para muchos cambios por frame, guarda la referencia y no busques por nombre cada vez.`]}],errores:[{sintoma:`Tras visitar la demo, otra lección muestra el modelo recoloreado.`,causa:"Se modificó el `scene` cacheado en lugar de un clon.",arreglo:"Clona el `scene` antes de tocar materiales o transformaciones."},{sintoma:`Al recolorear una pieza se pintan tres.`,causa:`Las tres mallas comparten el mismo material.`,arreglo:"Clona el material por malla antes de asignar `color` o `emissive`."},{sintoma:"`getObjectByName` devuelve `undefined`.",causa:`El nombre real no coincide: sufijos, mayúsculas o nodos renombrados.`,arreglo:"Lista los nombres con `traverse` y compáralos con los del GLB."}],quiz:[{tipo:`unica`,enunciado:"¿Qué hace `clone(true)` en un `Object3D`?",opciones:[`Copia el objeto y toda su jerarquía`,`Copia solo la geometría`,`Duplica el archivo GLB`,`Reinicia la escena`],correcta:0,explicacion:"El argumento `true` incluye los hijos."},{tipo:`verdadero-falso`,enunciado:"`clone()` duplica también los materiales.",correcta:!1,explicacion:`Los materiales se comparten; hay que clonarlos aparte.`},{tipo:`multiple`,enunciado:`¿Qué necesitas para resaltar una pieza sin afectar a las demás?`,opciones:[`Encontrarla por nombre`,`Un material propio para esa malla`,`Modificar el original cacheado`,`Volver a montar la escena`],correctas:[0,1],explicacion:`Modificar el original contamina la caché; remontar no es necesario.`},{tipo:`unica`,enunciado:`¿Qué operación es gratis en render?`,opciones:["`visible = false`",`Clonar el modelo`,`Buscar por nombre`,`Clonar un material`],correcta:0,explicacion:`Un objeto invisible no entra en la lista de dibujado.`}],recursos:[{titulo:`three.js: Object3D`,url:`https://threejs.org/docs/#api/en/core/Object3D`,nota:"`traverse`, `getObjectByName`, `clone` y `visible`."},{titulo:`three.js: Mesh`,url:`https://threejs.org/docs/#api/en/objects/Mesh`,nota:"La clase que tiene `geometry` y `material`."},{titulo:`drei: useGLTF`,url:`https://drei.docs.pmnd.rs/loaders/use-gltf`,nota:`Qué se cachea y cómo se limpia.`}],ejercicio:{reto:`Dado un grupo con tres mallas, oculta la del centro y resalta la de la derecha cambiando su emisivo. Sin cargar archivos.`,inicial:`import { Canvas } from '@react-three/fiber'
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
}`,solucion:`import { Canvas } from '@react-three/fiber'
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
}`,pistas:["Ocultar en JSX es `visible={false}`.","El emisivo se ve aunque la luz no llegue: prueba `emissive` y `emissiveIntensity`.",`Si cada caja tiene su propio material, cambiar una no toca las otras.`]}},{id:`8.5`,modulo:8,titulo:"Animaciones con `useAnimations`",objetivo:`Reproducir clips, encadenarlos con fundido y decidir qué clip manda en cada estado.`,nivel:`alto`,minutos:70,bloques:[{tipo:`parrafo`,texto:"Un clip de glTF es una lista de pistas: cada pista dice «en tal nodo, la rotación (o la posición, o la escala) vale esto en este instante». `AnimationMixer` evalúa todas las pistas y escribe el resultado en los nodos. `useAnimations` crea el mixer, lo actualiza en cada frame y te devuelve un diccionario de acciones por nombre de clip."},{tipo:`demo`,id:`m8-animaciones`,titulo:`Saludar y asentir, con fundido ajustable`},{tipo:`codigo`,lenguaje:`tsx`,titulo:`Un clip, una acción`,codigo:`const grupo = useRef<Group>(null)
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
)`},{tipo:`tabla`,cabecera:[`Método`,`Qué hace`,`Cuándo`],filas:[["`reset()`",`Vuelve al inicio y activa`,`Antes de relanzar`],["`play()` / `stop()`",`Activa o detiene`,`Control manual`],["`fadeIn(t)` / `fadeOut(t)`",`Entra o sale con fundido`,`Cambios de estado`],["`crossFadeTo(otra, t)`",`Mezcla dos acciones`,`Encadenar sin salto`],["`setLoop(LoopOnce)`",`Una sola vez`,`Gestos y acciones`]]},{tipo:`destacado`,tono:`porque`,titulo:"Por qué `clampWhenFinished` importa",texto:`Sin él, al terminar un clip de una sola pasada el nodo vuelve a la pose de reposo de golpe. Con él, la acción se queda en el último frame. En un saludo eso es la diferencia entre «termina el gesto y baja la mano» y «termina el gesto y la mano se teletransporta».`},{tipo:`lista`,items:[`Los nombres de los clips son los que exportó el DCC: respétalos o renómbralos al exportar.`,`Dos acciones sobre el mismo nodo se suman si las dos están activas: hay que mezclar con intención.`,"`useAnimations` acepta un segundo argumento que actúa de raíz para resolver los nombres.","Los clips se pueden reproducir a distinta velocidad con `timeScale`.","El mixer se actualiza solo; no hace falta llamar a `update` a mano."]}],errores:[{sintoma:`La acción termina y el modelo vuelve de golpe a la pose inicial.`,causa:"Clip de una pasada sin `clampWhenFinished`.",arreglo:"Asigna `accion.clampWhenFinished = true`."},{sintoma:`El modelo se mueve solo o se queda a medias entre dos poses.`,causa:`Hay dos acciones activas sobre los mismos nodos.`,arreglo:"Detén la anterior (`fadeOut` o `stop`) antes de lanzar la siguiente."},{sintoma:"`actions.saludar` es `undefined`.",causa:`El nombre no coincide o el clip no se exportó.`,arreglo:"Imprime `animations.map(a => a.name)` y usa el nombre exacto."}],quiz:[{tipo:`unica`,enunciado:"¿Qué evalúa un `AnimationMixer`?",opciones:[`Las pistas de un clip y escribe el resultado en los nodos`,`La física de los objetos`,`El color de los materiales`,`La cámara`],correcta:0,explicacion:`Es el reproductor de animaciones de three.js.`},{tipo:`verdadero-falso`,enunciado:"Hay que llamar a `mixer.update` a mano en cada frame.",correcta:!1,explicacion:"`useAnimations` ya lo hace dentro del bucle de R3F."},{tipo:`multiple`,enunciado:`¿Qué hace falta para encadenar dos clips sin salto?`,opciones:[`Detener o desvanecer el anterior`,`Un tiempo de fundido`,`El mismo número de pistas en los dos`,`Activar sombras`],correctas:[0,1],explicacion:`Los clips pueden tener pistas distintas; el mixer interpola lo que exista.`},{tipo:`unica`,enunciado:"¿Qué hace `clampWhenFinished`?",opciones:[`Dejar la última pose al terminar`,`Repetir el clip`,`Acelerar el clip`,`Silenciar el clip`],correcta:0,explicacion:`Evita el salto a la pose de reposo.`}],recursos:[{titulo:`three.js: AnimationMixer`,url:`https://threejs.org/docs/#api/en/animation/AnimationMixer`,nota:`El objeto que evalúa las pistas.`},{titulo:`drei: useAnimations`,url:`https://drei.docs.pmnd.rs/animations/use-animations`,nota:`Firma, raíz y actualización automática.`},{titulo:`three.js: AnimationAction`,url:`https://threejs.org/docs/#api/en/animation/AnimationAction`,nota:"`fadeIn`, `crossFadeTo`, `setLoop`, `timeScale`."}],ejercicio:{reto:"Crea un clip a mano con `KeyframeTrack` que haga girar una caja una vuelta en dos segundos, y reprodúcelo en bucle con un mixer.",inicial:`import { useEffect, useRef } from 'react'
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
}`,solucion:`import { useEffect, useRef } from 'react'
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
}`,pistas:[`Una pista de rotación se expresa con cuaterniones, no con ángulos de Euler.`,"Un cuarto de vuelta en Y es `(0, sin(π/4), 0, cos(π/4))`; media vuelta, `(0, 1, 0, 0)`.","Con `useFrame` de R3F puedes actualizar el mixer sin montar tu propio bucle."]}},{id:`8.6`,modulo:8,titulo:`Blender I: modelado básico`,objetivo:`Modelar una pieza sencilla con extrusión, cortes de bucle, bisel y modificador espejo, y exportarla sin sorpresas.`,nivel:`medio`,minutos:90,bloques:[{tipo:`parrafo`,texto:"Esta lección no reparte un `.blend`: Blender no forma parte del repositorio y un archivo de 300 MB no cabe en un curso que se instala con `npm install`. Lo que sí hay es el resultado —la tuerca del curso— y una guía de los cuatro gestos que resuelven casi cualquier pieza mecánica. Si sigues los pasos en tu copia de Blender, obtendrás algo equivalente, no idéntico. Descarga la tuerca y una caja con UVs para importarlas en Blender (`File → Import → glTF 2.0`) y comparar la topología que buscas con la que hay:"},{tipo:`descarga`,archivos:[{nombre:`tuerca.glb`,href:`modelos/tuerca.glb`,descripcion:`La pieza de la lección: 6 lados, bisel y agujero, 1,6 KB.`},{nombre:`caja.glb`,href:`modelos/caja.glb`,descripcion:`Un cubo con UVs desplegadas, para practicar extrusión sin partir de cero.`}]},{tipo:`pasos`,items:[{titulo:`1. Unidades y escala`,texto:`Empieza con la escena vacía y fija la unidad en metros. Un objeto de 1 unidad debe medir 1 metro en la escena de three.js; si modelas en centímetros, el modelo aparecerá 100 veces más grande.`},{titulo:`2. La forma base`,texto:`Añade un cilindro de 6 u 8 lados para una tuerca. En el panel de operación baja el número de vértices antes de tocar nada más: la topología se decide al principio.`},{titulo:`3. Extrusión y cortes de bucle`,texto:"Selecciona la cara superior, `E` para extruir y `Ctrl+R` para insertar un corte de bucle. Los cortes mantienen la densidad donde hace falta el bisel, no en toda la pieza."},{titulo:`4. Bisel`,texto:"Con `Ctrl+B` redondea las aristas que recibirían luz. Un bisel de 0,01–0,03 m es suficiente en una pieza pequeña; más grande y la pieza parece de juguete."},{titulo:`5. Espejo si es simétrica`,texto:"Modela media pieza y añade un modificador `Mirror` con `Clipping`. Aplicarlo antes de exportar evita que el GLB incluya el modificador sin evaluar."},{titulo:`6. Exportar`,texto:"`File → Export → glTF 2.0`, formato `glTF Binary (.glb)`, con `Apply Modifiers` activado. Comprueba el peso y ábrelo en el visor de esta web antes de darlo por bueno."}]},{tipo:`codigo`,lenguaje:`texto`,titulo:`Los atajos que se usan de verdad`,codigo:`E        extruir la selección
Ctrl+R   corte de bucle
Ctrl+B   bisel
Alt+clic seleccionar un bucle de aristas
Shift+D  duplicar
Ctrl+A   aplicar escala/rotación
Tab      modo edición / objeto
Numpad 1 vista frontal
Numpad 7 vista superior`},{tipo:`destacado`,tono:`ojo`,titulo:`Aplica la escala antes de exportar`,texto:"Si el objeto tiene escala 0,01 en el nodo raíz, three.js la arrastra y luego cuesta compensarla. `Ctrl+A → Scale` deja la escala en 1 y mete el tamaño en los vértices. Es el primer sitio donde mirar cuando un modelo «sale enorme» o «no se ve»."},{tipo:`demo`,id:`m8-pieza`,titulo:`El resultado: tuerca de 96 triángulos`},{tipo:`lista`,items:[`Empieza con la topología mínima y añade detalle solo donde se ve.`,`Los cortes de bucle van donde luego va el bisel, no en todas partes.`,`Aplica modificadores antes de exportar; el GLB no los entiende.`,"Nombra los objetos mientras modelas: esos nombres llegan a `nodes`.",`Exporta pronto y prueba en el visor: los errores de escala se ven antes así.`]}],errores:[{sintoma:`El modelo aparece gigante o diminuto en la escena.`,causa:`La escena de Blender estaba en centímetros o la escala no se aplicó.`,arreglo:`Trabaja en metros, aplica escala y comprueba el tamaño en el visor.`},{sintoma:`Las caras interiores se ven negras o invisibles.`,causa:`Normales invertidas por una extrusión negativa.`,arreglo:"Selecciona todo y recalcula normales hacia fuera (`Shift+N`)."},{sintoma:`El GLB pesa el triple de lo esperado.`,causa:`Se exportaron modificadores sin aplicar y objetos ocultos.`,arreglo:`Aplica modificadores, borra lo que no se ve y exporta solo la selección.`}],quiz:[{tipo:`unica`,enunciado:"¿Qué hace `Ctrl+R` en el modo edición?",opciones:[`Inserta un corte de bucle`,`Rota la vista`,`Renderiza`,`Añade un material`],correcta:0,explicacion:`Añade una arista que recorre el bucle de la malla.`},{tipo:`verdadero-falso`,enunciado:`Un GLB guarda los modificadores de Blender sin aplicar.`,correcta:!1,explicacion:`glTF no conoce modificadores: hay que aplicarlos al exportar.`},{tipo:`multiple`,enunciado:`¿Qué conviene comprobar antes de exportar?`,opciones:[`Escala aplicada`,`Normales hacia fuera`,`Nombres de los objetos`,`Que la cámara esté en la escena`],correctas:[0,1,2],explicacion:`La cámara y las luces no hacen falta en un modelo de producto.`},{tipo:`unica`,enunciado:`¿Por qué modelar en metros?`,opciones:[`Porque three.js trabaja en unidades de escena y el tamaño importa`,`Porque Blender no admite otra unidad`,`Porque el GLB lo exige`,`Porque reduce el peso`],correcta:0,explicacion:`Un modelo de 1 unidad debe medir 1 metro para no escalarlo luego.`}],recursos:[{titulo:`Blender Manual: modeling`,url:`https://docs.blender.org/manual/en/latest/modeling/index.html`,nota:`La referencia de extrusión, bucles y bisel.`},{titulo:`Blender: glTF 2.0 exporter`,url:`https://docs.blender.org/manual/en/latest/addons/import_export/scene_gltf2.html`,nota:`Qué opciones del exportador afectan a three.js.`},{titulo:`Blender Studio: fundamentals`,url:`https://studio.blender.org/training/blender-fundamentals/`,nota:`Curso gratuito oficial para los primeros pasos.`}],ejercicio:{reto:`Sin Blender en el sandbox, reproduce la pieza con geometría procedural: un cilindro de 6 lados con un bisel simulado y compara el número de triángulos al subir los lados.`,inicial:`import { useState } from 'react'
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
}`,solucion:`import { useState } from 'react'
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
}`,pistas:["`cylinderGeometry` acepta `radialSegments` como cuarto argumento.","Un toro tumbado (`rotation={[Math.PI / 2, 0, 0]}`) rodea el borde.",`Con 6 lados parece una tuerca; con 32, un disco.`]}},{id:`8.7`,modulo:8,titulo:`Blender II: UVs y materiales PBR`,objetivo:`Desplegar UVs sin estiramientos, montar un material metallic-roughness y exportarlo con los mapas en el espacio correcto.`,nivel:`medio`,minutos:90,bloques:[{tipo:`parrafo`,texto:`Un desplegado es un plano de la superficie. Se hace cortando la malla por costuras y estirándola hasta que quepa en el cuadrado 0..1 sin solaparse. Si una isla ocupa el doble de espacio, recibe el doble de texels y el patrón se ve más fino ahí. Si dos islas se pisan, se pintan a la vez y el error no aparece hasta mirar la pieza desde el otro lado.`},{tipo:`descarga`,archivos:[{nombre:`taller.glb`,href:`modelos/taller.glb`,descripcion:`El diorama del curso con sus materiales, para abrirlo en Blender y ver cómo se agrupan.`},{nombre:`madera-color.png`,href:`texturas/madera-color.png`,descripcion:`Mapa de color de la madera, para practicar el desplegado encima.`},{nombre:`madera-normal.png`,href:`texturas/madera-normal.png`,descripcion:`Su normal en espacio tangente (sin flip de Y).`}]},{tipo:`widget`,id:`m8-uv`,titulo:`Tres desplegados: correcto, estirado y solapado`},{tipo:`pasos`,items:[{titulo:`1. Marca costuras`,texto:"En modo edición, selecciona aristas y `Ctrl+E → Mark Seam`. Las costuras son donde se va a abrir la malla; conviene esconderlas en zonas que no se miren."},{titulo:`2. Desplegar`,texto:"Selecciona todo y `U → Unwrap`. Si el resultado tiene islas deformadas, revisa las costuras antes de tocar la escala."},{titulo:`3. Igualar densidad`,texto:"`U → Average Island Scale` reparte el espacio según el área real. Después, `Pack Islands` coloca las islas sin solaparse y con margen."},{titulo:`4. Comprobar`,texto:`Activa el mapa de tablero de ajedrez. Si los cuadrados se ven rectángulos en alguna cara, esa isla está estirada.`},{titulo:`5. Material metallic-roughness`,texto:"Conecta la textura de color a `Base Color`, la de normales a `Normal Map` y la de rugosidad a `Roughness`. En Blender no existe «mapa de metalicidad» separado del estándar: va en el canal azul del ORM."},{titulo:`6. Exportar los mapas`,texto:`Guarda el color en sRGB y los mapas de datos en lineal. En el exportador de glTF, revisa que las imágenes se empaqueten y que el material no lleve nodos que glTF no entiende.`}]},{tipo:`tabla`,cabecera:[`Mapa`,`Se guarda en`,`Blender lo conecta a`,`Espacio`],filas:[[`Color`,`PNG/JPG`,`Base Color`,`sRGB`],[`Normal`,`PNG`,`Normal Map`,`Lineal`],[`Rugosidad`,`PNG en gris`,`Roughness`,`Lineal`],[`Metalicidad`,`Canal azul del ORM`,`Metallic`,`Lineal`],[`Oclusión`,`Canal rojo del ORM`,`AO (segundo UV)`,`Lineal`]]},{tipo:`destacado`,tono:`porque`,titulo:`El error de color no se ve en Blender`,texto:"Blender etiqueta internamente las texturas y aplica la conversión al renderizar. Exportas, cargas en la web y la madera se ve lavada: el GLB lleva la imagen, pero tu código la declara como lineal. El modelo estaba bien; el fallo era de `colorSpace` en three.js (lección 7.3)."},{tipo:`lista`,items:[`Las costuras se esconden; no se evitan.`,`Un desplegado con islas grandes y pocas suele ser mejor que muchas islas pequeñas.`,`El margen entre islas evita que el filtrado tome píxeles de la vecina.`,`Los mapas de datos no llevan sRGB, ni en Blender ni en three.js.`,`Si el material usa nodos que glTF no entiende, el exportador avisa o lo simplifica.`]}],errores:[{sintoma:`La textura se ve borrosa en una cara y nítida en otra.`,causa:`Densidad de texels desigual entre islas.`,arreglo:"`Average Island Scale` y vuelve a empaquetar."},{sintoma:`Aparecen manchas que no están pintadas.`,causa:`Dos islas solapadas comparten píxeles.`,arreglo:`Revisa el desplegado con el tablero de ajedrez y separa las islas.`},{sintoma:`El material se ve distinto en Blender y en la web.`,causa:`Nodos no compatibles con glTF o espacios de color mal declarados al cargar.`,arreglo:"Usa el material principled y declara `colorSpace` al cargar en three.js."}],quiz:[{tipo:`unica`,enunciado:`¿Qué es una costura en un desplegado?`,opciones:[`Una arista por la que se abre la malla`,`Un tipo de material`,`Un hueso del rig`,`Una luz`],correcta:0,explicacion:`Define dónde se corta la superficie para poder extenderla.`},{tipo:`verdadero-falso`,enunciado:`Un desplegado puede tener islas solapadas si no se nota.`,correcta:!1,explicacion:`Se notará: dos caras comparten los mismos píxeles.`},{tipo:`multiple`,enunciado:`¿Qué compruebas con el tablero de ajedrez?`,opciones:[`Estiramientos`,`Densidad desigual`,`Solapes`,`El número de triángulos`],correctas:[0,1,2],explicacion:`La topología se mide en otra vista.`},{tipo:`unica`,enunciado:`¿En qué canal del ORM va la metalicidad en glTF?`,opciones:[`Azul`,`Rojo`,`Verde`,`Alfa`],correcta:0,explicacion:`Rojo: oclusión; verde: rugosidad; azul: metalicidad.`}],recursos:[{titulo:`Blender Manual: UV unwrapping`,url:`https://docs.blender.org/manual/en/latest/modeling/meshes/uv/unwrapping/index.html`,nota:`Costuras, desplegado y empaquetado.`},{titulo:`glTF 2.0: materials`,url:`https://registry.khronos.org/glTF/specs/2.0/glTF-2.0.html#materials`,nota:`El material metallic-roughness y el empaquetado ORM.`},{titulo:`Poly Haven: textures`,url:`https://polyhaven.com/textures`,nota:`Texturas CC0 para practicar el desplegado con material real.`}],ejercicio:{reto:`Genera en canvas una textura de tablero de ajedrez y proyéctala en una esfera. Decide si el patrón se estira en los polos y por qué.`,inicial:`import { useMemo } from 'react'
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
}`,solucion:`import { useMemo } from 'react'
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
}`,pistas:[`La esfera tiene UVs propios: cada triángulo del ecuador ocupa más ancho que uno del polo.`,`El estiramiento en los polos es del desplegado, no de la textura.`,"Prueba `sphereGeometry` con menos segmentos para verlo más exagerado."]}},{id:`8.8`,modulo:8,titulo:`Blender III: rigging y animación`,objetivo:`Distinguir animación de nodos de animación esqueletal, y exportar clips con nombre y duración correctas.`,nivel:`alto`,minutos:100,bloques:[{tipo:`parrafo`,texto:"Hay dos formas de animar un modelo. La primera mueve nodos enteros: `saludar` rota el nodo del hombro y toda la geometría hija le sigue. La segunda deforma vértices con un `Armature`: los huesos mueven la malla según pesos por vértice. La primera es barata y suficiente para máquinas; la segunda hace falta para personas y telas."},{tipo:`descarga`,archivos:[{nombre:`robot.glb`,href:`modelos/robot.glb`,descripcion:`La malla del robot sin esqueleto: el punto de partida para practicar pesos.`},{nombre:`rover.glb`,href:`modelos/rover.glb`,descripcion:"Con dos clips de nodo (`desplegar_panel`, `girar_antena`) para comparar ambas técnicas."}]},{tipo:`demo`,id:`m8-rig`,titulo:`Los pivotes que se mueven en el robot del curso`},{tipo:`parrafo`,texto:"El robot de esta web no tiene huesos: sus dos clips rotan `hombro_der` y `cabeza`. Por eso los ejes que se dibujan viajan con el nodo y la pieza se mueve rígida. Un modelo riggeado tendría un `SkinnedMesh`, una lista de huesos y un atributo de pesos; el resultado en pantalla puede ser idéntico, pero el archivo pesa más y la GPU calcula más por vértice."},{tipo:`pasos`,items:[{titulo:`1. Prepara la malla`,texto:`La malla debe estar limpia: sin caras interiores, con la topología suficiente en las articulaciones. Un codo con dos aristas no se dobla, se parte.`},{titulo:`2. Crea el armature`,texto:"Añade un `Armature` y extruye huesos desde la raíz. Cada hueso tiene un nombre; esos nombres viajan al glTF y son los que buscarás en `nodes`."},{titulo:`3. Pesa los vértices`,texto:"Padre la malla con `Armature Deform → With Automatic Weights` y corrige a mano los pesos donde la deformación se rompa. Un peso mal puesto se ve como un pellizco."},{titulo:`4. Anima en pose mode`,texto:"Un clip es una acción. Nombra cada acción (`saludar`, `asentir`) y ajusta su duración; el nombre es lo que `useAnimations` recibe."},{titulo:`5. Exporta los clips`,texto:"En el exportador de glTF, activa `Animation` y elige `Actions`. Comprueba en el visor que aparecen los clips con su nombre y que la duración no se ha multiplicado por la tasa de frames."}]},{tipo:`tabla`,cabecera:[`Tipo`,`Qué mueve`,`Peso`,`Cuándo`],filas:[[`Nodo (TRS)`,`Objetos enteros`,`Muy bajo`,`Máquinas, puertas, cámaras`],[`Esqueletal`,`Vértices por pesos`,`Medio-alto`,`Personajes, animales, telas`],[`Morph targets`,`Formas alternativas`,`Alto`,`Caras, expresiones`]]},{tipo:`destacado`,tono:`ojo`,titulo:`Los nombres de clip son API`,texto:"`actions.saludar` solo existe si el clip se llama exactamente `saludar`. Renombrar en Blender y olvidar el cambio en React produce un `undefined` silencioso: el modelo se queda quieto y no hay error. Fija los nombres al exportar y trátalos como parte del contrato."},{tipo:`lista`,items:[`Un armature sin pesos deforma nada: la malla se queda rígida.`,`Los pesos se normalizan: la suma por vértice debe ser 1.`,"Los clips de una sola pasada necesitan `LoopOnce` y `clampWhenFinished`.",`Puedes tener varios clips en un GLB y reproducirlos con el mismo mixer.`,"Exporta con `Apply Modifiers` y sin animaciones de cámara o luz si no las usas."]}],errores:[{sintoma:`El personaje se deforma como chicle al doblar un codo.`,causa:`Pesos automáticos mal repartidos o topología insuficiente.`,arreglo:`Corrige pesos a mano y añade aristas de soporte en la articulación.`},{sintoma:`El clip se reproduce al doble de velocidad.`,causa:"Duración exportada en frames en lugar de segundos, o `timeScale` alterado.",arreglo:"Revisa la duración del clip y no toques `timeScale` sin motivo."},{sintoma:`En la web no aparece ninguna animación.`,causa:`Se exportó la malla sin el armature o sin las acciones.`,arreglo:"Exporta con `Animation` activo y comprueba `animations` en el GLB."}],quiz:[{tipo:`unica`,enunciado:`¿Qué diferencia la animación de nodos de la esqueletal?`,opciones:[`La primera mueve objetos; la segunda deforma vértices con pesos`,`La primera es más cara`,`La segunda no se puede exportar`,`Son lo mismo`],correcta:0,explicacion:`Un nodo se transforma entero; un hueso deforma la malla.`},{tipo:`verdadero-falso`,enunciado:"Un `SkinnedMesh` siempre pesa menos que una animación de nodos.",correcta:!1,explicacion:`Añade huesos, pesos y cálculo por vértice.`},{tipo:`multiple`,enunciado:`¿Qué hay que revisar al exportar un rig?`,opciones:[`Nombres de los clips`,`Que el armature esté incluido`,`La duración de cada acción`,`Que la cámara esté animada`],correctas:[0,1,2],explicacion:`La cámara no forma parte del modelo.`},{tipo:`unica`,enunciado:`¿Qué pasa si el nombre del clip no coincide?`,opciones:["`actions.nombre` es `undefined` y no se reproduce nada",`Se reproduce el primer clip`,`three.js lanza un error de compilación`,`Se duplica el modelo`],correcta:0,explicacion:`El diccionario de acciones se indexa por el nombre exacto.`}],recursos:[{titulo:`Blender Manual: armatures`,url:`https://docs.blender.org/manual/en/latest/animation/armatures/index.html`,nota:`Huesos, pose mode y pesos.`},{titulo:`Blender: glTF animations`,url:`https://docs.blender.org/manual/en/latest/addons/import_export/scene_gltf2.html#animations`,nota:`Cómo se exportan las acciones y los nombres.`},{titulo:`three.js: SkinnedMesh`,url:`https://threejs.org/docs/#api/en/objects/SkinnedMesh`,nota:`Lo que hay al otro lado cuando el modelo sí tiene huesos.`}],ejercicio:{reto:`Anima dos nodos de un grupo: uno que gire y otro que suba y baje, con dos acciones separadas y un botón para alternar.`,inicial:`import { useRef } from 'react'
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
}`,solucion:`import { useRef } from 'react'
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
}`,pistas:["Un nodo animado equivale a un `Object3D` con TRS cambiante.",`El reloj de R3F da el tiempo en segundos: úsalo para que la velocidad no dependa de los FPS.`,`Aquí no hay mixer: es animación procedural, la misma que harías con clips.`]}},{id:`8.9`,modulo:8,titulo:`Optimizar: gltf-transform, Draco y KTX2`,objetivo:`Reducir el peso de un modelo sin destruir la calidad y medir cada paso en lugar de confiar en la intuición.`,nivel:`alto`,minutos:80,bloques:[{tipo:`parrafo`,texto:"Optimizar un GLB es una cadena de tres pasos que se pueden medir por separado: quitar lo que sobra (`prune`), unir lo idéntico (`dedup`) y comprimir la geometría (`draco`). El orden importa: comprimir antes de deduplicar deja duplicados comprimidos. Y ninguna de las tres cosas toca las texturas, que suelen ser el verdadero peso."},{tipo:`widget`,id:`m8-optimizar`,titulo:`Los seis modelos del curso, antes y después`},{tipo:`codigo`,lenguaje:`bash`,titulo:`La cadena, con números de este curso`,codigo:`# 1. dedup: fusiona mallas idénticas
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
npx gltf-transform etc1s entrada.glb salida.glb`},{tipo:`tabla`,cabecera:[`Modelo`,`Original`,`Con Draco`,`Ahorro`],filas:[[`rover`,`83,4 KB`,`16,8 KB`,`−80 %`],[`taller`,`123,8 KB`,`19,9 KB`,`−84 %`],[`lampara`,`52,6 KB`,`10,5 KB`,`−80 %`],[`caja`,`21,1 KB`,`5,3 KB`,`−75 %`],[`tuerca`,`7,8 KB`,`1,6 KB`,`−80 %`],[`robot`,`37,7 KB`,`11,9 KB`,`−68 %`]]},{tipo:`tabla`,cabecera:[`Textura`,`PNG`,`KTX2`,`Ahorro`],filas:[[`hormigon-color 512² (ETC1S, sin mips)`,`70,3 KB`,`13,7 KB`,`−80 %`],[`hormigon-color 512² (ETC1S, con mips)`,`70,3 KB`,`23,0 KB`,`−67 %`],["hormigon-normal 256² (ETC1S, `--normal_mode`)",`90,9 KB`,`18,8 KB`,`−79 %`],[`madera-color 512² (UASTC + zstd)`,`134,0 KB`,`148,5 KB`,`+11 %`]]},{tipo:`demo`,id:`m8-ktx2`,titulo:`La misma textura, en PNG y en KTX2`},{tipo:`destacado`,tono:`porque`,titulo:`KTX2 no es «PNG pero más pequeño»`,texto:"El PNG se descomprime en memoria y se sube a la GPU como RGBA de 8 bits: una textura de 512 × 512 ocupa 1 MB de VRAM, pese a los 70 KB del archivo. El `.ktx2` se queda comprimido en un formato que la GPU lee directamente (ETC1S o UASTC, transcodificados a BC7, ASTC o ETC2), así que también ahorra memoria de vídeo. Y **no siempre ahorra peso**: UASTC conserva mucho más detalle y, en una textura sintética como la madera de este curso, sale un 11 % más grande que el PNG. Está medido con `toktx` 4.4.2, no estimado."},{tipo:`codigo`,lenguaje:`tsx`,titulo:`Cargarla en R3F`,codigo:`import { useKTX2 } from '@react-three/drei'

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
}`},{tipo:`lista`,items:[`Mide siempre el mismo archivo y con la misma herramienta antes y después.`,`Draco reduce peso de descarga y añade tiempo de decodificación en el cliente.`,`La decodificación de Draco cuesta CPU al cargar, no en cada frame.`,`Si el modelo se ve mal tras Draco, sube la precisión (16/12/12) antes de culpar al material.`,`Las texturas no las toca Draco: para eso está KTX2 o bajar la resolución.`,`ETC1S para color y rugosidad; UASTC para normales o detalle fino. ETC1S en una normal se nota.`,"Genera mipmaps con `--genmipmap` o la textura parpadeará al alejar la cámara."]}],errores:[{sintoma:`El modelo pesa menos pero tarda más en aparecer.`,causa:`El tiempo de decodificación de Draco supera lo que ahorra la descarga.`,arreglo:`Comprueba el perfil de red; en 3G compensa, en local puede no compensar.`},{sintoma:`Tras Draco, las normales se ven facetadas.`,causa:`Cuantización demasiado agresiva en las normales.`,arreglo:`Sube los bits de normales (por ejemplo 10 → 12) y vuelve a medir.`},{sintoma:`El GLB optimizado no carga en la web.`,causa:"Falta el decodificador de Draco en `public/draco/`.",arreglo:"Copia los decodificadores y configura `useGLTF.setDecoderPath`."},{sintoma:"La textura `.ktx2` da 404 con `basis_transcoder.wasm` o se queda en negro.",causa:"`KTX2Loader` busca el transcoder de Basis en otra carpeta o en un CDN que no existe.",arreglo:'Pasa la carpeta como segundo argumento: `useKTX2(url, rutaAsset("basis/"))`, y comprueba que `basis_transcoder.js` y `.wasm` están en `public/basis/`.'}],quiz:[{tipo:`unica`,enunciado:"¿Qué hace `prune`?",opciones:[`Elimina datos no usados`,`Comprime la geometría`,`Reduce las texturas`,`Añade animaciones`],correcta:0,explicacion:`Borra accessors, materiales y nodos que nadie referencia.`},{tipo:`verdadero-falso`,enunciado:`Draco también comprime las texturas.`,correcta:!1,explicacion:`Solo geometría; para texturas está KTX2.`},{tipo:`multiple`,enunciado:`¿Qué hay que medir después de optimizar?`,opciones:[`Peso del archivo`,`Calidad visual`,`Tiempo de decodificación`,`Número de luces`],correctas:[0,1,2],explicacion:`Las luces no forman parte del modelo.`},{tipo:`unica`,enunciado:`Además del peso del archivo, ¿qué ahorra KTX2 frente a un PNG?`,opciones:[`Memoria de GPU: la textura sigue comprimida en VRAM`,`Tiempo de modelado`,`Draw calls`,`Nada más, solo peso`],correcta:0,explicacion:`Un PNG de 512 × 512 ocupa 1 MB de VRAM como RGBA8; el .ktx2 se transcodifica a un formato comprimido de la GPU.`}],recursos:[{titulo:`gltf-transform: CLI`,url:`https://gltf-transform.dev/cli`,nota:"`dedup`, `prune`, `draco`, `etc1s`, `uastc`."},{titulo:`gltf-transform: Draco`,url:`https://gltf-transform.dev/modules/draco`,nota:`Qué significa cada nivel de compresión.`},{titulo:`Khronos: KTX2`,url:`https://github.com/KhronosGroup/KTX-Software`,nota:"`toktx` 4.4.2 es la versión con la que se midieron las cifras de la tabla."}],ejercicio:{reto:`Escribe una función que, dado un tamaño original y uno comprimido, devuelva el ahorro y el veredicto (útil si ahorra más del 60 %). Sin modelos reales.`,inicial:`type Medida = { nombre: string; original: number; comprimido: number }

const medidas: Medida[] = [
  { nombre: 'rover', original: 83.4, comprimido: 16.8 },
  { nombre: 'robot', original: 37.7, comprimido: 11.9 },
]

// TODO: devuelve nombre, ahorro en % y si merece la pena (> 60 %)
console.log(medidas)`,solucion:`type Medida = { nombre: string; original: number; comprimido: number }

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

console.log(informe)`,pistas:["El ahorro es `1 - comprimido / original`.",`Redondea solo al mostrar: no redondees antes de comparar.`,`El umbral del 60 % es una decisión de producto, no una ley física.`]}},{id:`8.10`,modulo:8,titulo:`Los 10 errores con modelos`,objetivo:`Diagnosticar los fallos clásicos de carga y montaje con un procedimiento, no por prueba y error.`,nivel:`medio`,minutos:70,bloques:[{tipo:`parrafo`,texto:`Casi todos los problemas con modelos se reducen a cinco preguntas: ¿llegó el archivo?, ¿se decodificó?, ¿está en cámara?, ¿tiene la escala correcta?, ¿el material espera algo que no hay? La demo reproduce cuatro de los diez errores porque los otros seis rompen la carga antes de dibujar y no se pueden enseñar en pantalla. La tabla los recoge todos con síntoma, causa y arreglo.`},{tipo:`demo`,id:`m8-errores`,titulo:`Cuatro fallos visibles, uno por interruptor`},{tipo:`tabla`,cabecera:[`Error`,`Síntoma`,`Causa`,`Arreglo`],filas:[[`1. Ruta rota`,`404 en consola, nada en escena`,"Ruta absoluta o `base` mal","`rutaAsset`"],[`2. Falta Draco`,`Error de decodificador`,"`public/draco/` ausente",`Copiar decodificadores`],["3. Sin `Suspense`",`Aviso de suspensión`,`Hook fuera de límite`,"Envolver en `Suspense`"],[`4. Escala`,`Modelo invisible o gigante`,`Unidades del DCC`,`Aplicar escala y ajustar`],[`5. Pivote`,`Flota o se hunde`,`Origen lejos del objeto`,`Recolocar origen en el DCC`],[`6. Fuera de cámara`,`Escena vacía`,`Cámara dentro o lejos`,"`Bounds` o encuadrar a mano"],["7. `scene` compartido",`Otra demo sale modificada`,`Mutar la caché`,`Clonar antes de tocar`],[`8. Metal negro`,`Superficie casi negra`,"`metalness` 1 sin entorno",`HDRI o bajar metalness`],[`9. Doble copia`,`Parpadeo en caras`,`Dos mallas en el mismo plano`,`Separar o quitar una`],[`10. Color lavado`,`Textura sin contraste`,"`colorSpace` incorrecto",`sRGB en color, lineal en datos`]]},{tipo:`pasos`,items:[{titulo:`1. ¿Está el archivo?`,texto:"Abre la URL del modelo en una pestaña. Si da 404, ningún código lo va a arreglar: revisa `rutaAsset` y el `base`."},{titulo:`2. ¿Se decodifica?`,texto:`Si la petición es 200 y falla igual, mira si el GLB usa Draco o Meshopt. Sin decodificador, el error aparece antes de dibujar.`},{titulo:`3. ¿Está en pantalla?`,texto:`Sustituye el modelo por una caja de 1 unidad en el origen. Si la caja se ve, el problema es de escala, pivote o cámara.`},{titulo:`4. ¿Se ve la geometría?`,texto:"Pon `meshNormalMaterial` en todo. Si aparece la forma, el fallo es de material o de luz. Si no aparece, es de transformación."},{titulo:`5. ¿Qué cambió desde la última vez que funcionó?`,texto:`Modelos, rutas y versiones de three.js son las tres fuentes habituales. Aísla una cada vez.`}]},{tipo:`destacado`,tono:`truco`,titulo:`La caja de calibración`,texto:`Ten siempre una escena de prueba con una caja de 1×1×1 en el origen, una luz y una cámara a 3 unidades. Cuando un modelo no aparece, móntalo junto a la caja: si la caja se ve y el modelo no, ya sabes que el archivo está mal colocado o escalado; si no se ve nada, el problema es del canvas o de la cámara.`},{tipo:`checkpoint`,titulo:`Antes de cerrar el módulo`,items:[`Sé abrir un GLB y decir cuántos nodos, mallas y clips tiene.`,"Cargo modelos con `useGLTF` dentro de `Suspense` y con decodificador local.",`Sé recorrer un modelo y modificar una pieza sin contaminar la caché.`,"Reproduzco clips con `useAnimations` y los encadeno con fundido.",`Sé modelar una pieza simple, desplegarla y exportarla.`,`He medido el peso de un GLB antes y después de Draco.`,`Puedo diagnosticar una escena vacía con las cinco preguntas del método.`]}],errores:[{sintoma:`El modelo se ve pero está enterrado en el suelo.`,causa:`El origen del modelo no está en la base.`,arreglo:"Recoloca el origen en el DCC o compensa la `position` en la escena."},{sintoma:`Al cambiar de lección, el modelo aparece con otro color.`,causa:"Una demo anterior mutó el `scene` cacheado.",arreglo:`Clonar antes de modificar y no tocar el original.`},{sintoma:`La carga funciona en local y falla en el despliegue.`,causa:"Rutas absolutas o decodificadores fuera del `base`.",arreglo:`Prueba el build servido desde un subdirectorio, como en GitHub Pages.`}],quiz:[{tipo:`unica`,enunciado:`¿Cuál es la primera comprobación si no aparece nada?`,opciones:[`Abrir la URL del modelo en una pestaña`,`Cambiar el material`,`Añadir más luces`,"Subir el `dpr`"],correcta:0,explicacion:`Un 404 no se arregla desde la escena.`},{tipo:`verdadero-falso`,enunciado:`Un modelo que carga en local puede fallar en GitHub Pages por la ruta.`,correcta:!0,explicacion:"El `base` cambia y las rutas absolutas se rompen."},{tipo:`multiple`,enunciado:`¿Qué causa una escena vacía con un modelo correcto?`,opciones:[`Escala equivocada`,`Cámara dentro del objeto`,`Pivote muy lejos`,"Un material con `roughness` alto"],correctas:[0,1,2],explicacion:`La rugosidad cambia el brillo, no la posición.`},{tipo:`unica`,enunciado:`¿Para qué sirve la caja de calibración?`,opciones:[`Para separar problemas de archivo de problemas de canvas o cámara`,`Para medir FPS`,`Para comprimir el modelo`,`Para activar sombras`],correcta:0,explicacion:`Es un testigo conocido en una escena desconocida.`}],recursos:[{titulo:`Khronos: glTF-Validator`,url:`https://github.com/KhronosGroup/glTF-Validator`,nota:`Detecta archivos mal formados antes de culpar al código.`},{titulo:`three.js: GLTFLoader troubleshooting`,url:`https://threejs.org/docs/#examples/en/loaders/GLTFLoader`,nota:`Extensiones soportadas y errores típicos.`},{titulo:`gltf-transform: inspect`,url:`https://gltf-transform.dev/cli#inspect`,nota:`Ver la estructura de un GLB desde la terminal.`}],ejercicio:{reto:`Escribe una función de diagnóstico que reciba un estado de carga y devuelva la siguiente comprobación a hacer, en orden.`,inicial:`type Estado = {
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

console.log(diagnosticar({ urlOk: true, decodificadorOk: false, suspensoOk: true, visible: false }))`,solucion:`type Estado = {
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

console.log(diagnosticar({ urlOk: true, decodificadorOk: false, suspensoOk: true, visible: false }))`,pistas:[`El orden importa: no tiene sentido comprobar la cámara si el archivo no llegó.`,`Devuelve una frase accionable, no un código numérico.`,`El último caso no es «todo bien»: es «queda el material».`]}}]},{numero:9,titulo:`Drei: el catálogo de atajos`,descripcion:`La librería que evita reescribir controles, textos, etiquetas y optimizaciones: qué hay, cuándo usarlo y cuánto cuesta cada atajo.`,lecciones:[{id:`9.1`,modulo:9,titulo:`Drei: el mapa de atajos`,objetivo:`Saber qué problema resuelve drei, cómo importar sin inflar el bundle y cuándo conviene no usarlo.`,nivel:`intro`,minutos:40,bloques:[{tipo:`parrafo`,texto:`drei es a three.js lo que una caja de herramientas a un taller: no añade capacidades nuevas, ahorra las mismas cien líneas que todo el mundo escribe. Está hecho de componentes y hooks que envuelven patrones comunes: controles de cámara, carga de assets, texto, instancias, sombras de contacto. Usar drei no es hacer trampa; es no reimplementar lo que ya está probado.`},{tipo:`widget`,id:`m9-catalogo`,titulo:`Busca el componente que resuelve tu problema`},{tipo:`parrafo`,texto:"La tentación es importar de todo. Cada componente arrastra dependencias: `Text` trae troika, `Environment` trae el cargador de HDR, `View` trae el sistema de túneles. Con imports con nombre y el troceado de Vite, solo entra en el bundle lo que se usa, pero un componente cargado en la portada sí pesa. La regla es la de siempre: importar donde se usa, no en un archivo de barril."},{tipo:`codigo`,lenguaje:`tsx`,titulo:`Importar bien`,codigo:`// Bien: el import con nombre permite el tree-shaking.
import { OrbitControls, Text, useTexture } from '@react-three/drei'

// Mal: un barril propio que reexporta drei entero impide descartar lo no usado.
// export * from '@react-three/drei'

// Lo que no es un componente también está:
import { useGLTF, useAnimations, useProgress } from '@react-three/drei'`},{tipo:`tabla`,cabecera:[`Categoría`,`Qué entra`,`Cuándo tirar de drei`],filas:[[`Cámara`,"`OrbitControls`, `FlyControls`, `CameraControls`",`Casi siempre`],[`Carga`,"`useGLTF`, `useTexture`, `useProgress`, `Preload`",`Siempre`],[`Escena`,"`Center`, `Bounds`, `Environment`, `Stage`, `Grid`",`Prototipos y producto`],[`Texto y UI`,"`Text`, `Text3D`, `Html`, `Billboard`",`Cuando hay etiquetas`],[`Rendimiento`,"`Instances`, `Clone`, `Detailed`, `Bvh`",`Con muchos objetos`]]},{tipo:`destacado`,tono:`ojo`,titulo:`Drei no sustituye a entender three.js`,texto:"Todos los componentes de drei devuelven objetos de three.js: `OrbitControls` monta un `OrbitControls`, `Text` monta una `Mesh` con una geometría generada. Si no sabes qué hay debajo, no vas a poder depurarlo cuando falle. Este curso enseña primero el objeto y después el atajo."},{tipo:`lista`,items:[`Un componente de drei es siempre un objeto de three.js con props de React.`,"Los hooks de carga (`useGLTF`, `useTexture`) cachean por URL.","Muchos componentes aceptan `ref` y exponen métodos imperativos (`fit`, `reset`).",`Si un componente de drei no encaja, casi siempre puedes montar el objeto de three.js a mano.`,`La documentación de drei está separada por categorías y suele incluir el código fuente.`]}],errores:[{sintoma:`El bundle crece cientos de kB después de «usar solo un componente».`,causa:`Se importó desde un barril propio o desde el paquete entero.`,arreglo:"Importa con nombre desde `@react-three/drei` en el archivo que lo usa."},{sintoma:`«R3F: X is not part of the THREE namespace».`,causa:"Se usó un componente de drei dentro del `<Canvas>` sin importarlo de drei (o se puso HTML dentro del canvas).",arreglo:`Comprueba el import y que el elemento sea de three o de drei, no HTML.`},{sintoma:`Los controles de cámara se comen el scroll de la página.`,causa:"`OrbitControls` captura la rueda dentro del canvas.",arreglo:"Desactiva `enableZoom` o monta el canvas a pantalla completa solo cuando toque."}],quiz:[{tipo:`unica`,enunciado:`¿Qué es drei?`,opciones:[`Un conjunto de componentes y hooks sobre three.js y R3F`,`Un motor 3D distinto`,`Un compilador de GLSL`,`Un formato de modelo`],correcta:0,explicacion:`No añade un motor: envuelve patrones de three.js en componentes.`},{tipo:`verdadero-falso`,enunciado:`Usar un componente de drei evita tener que entender three.js.`,correcta:!1,explicacion:`Por debajo sigue habiendo objetos de three.js que hay que saber depurar.`},{tipo:`multiple`,enunciado:`¿Qué componentes de drei se usan en este curso?`,opciones:["`OrbitControls`","`useGLTF`","`Instances`","`WebGPURenderer`"],correctas:[0,1,2],explicacion:`El renderer no es un componente de drei.`},{tipo:`unica`,enunciado:`¿Por qué importar con nombre y no desde un barril?`,opciones:[`Para que el bundler pueda descartar lo que no se usa`,`Porque el barril no compila en TypeScript`,`Para cargar más rápido en desarrollo`,`Porque drei lo prohíbe`],correcta:0,explicacion:`El tree-shaking necesita ver los imports reales.`}],recursos:[{titulo:`drei: documentación`,url:`https://drei.docs.pmnd.rs/`,nota:`Catálogo por categorías, con ejemplos por componente.`},{titulo:`drei: repositorio`,url:`https://github.com/pmndrs/drei`,nota:"Cada componente está en `src/core`; leerlo es la mejor documentación."},{titulo:`R3F: ecosistema`,url:`https://r3f.docs.pmnd.rs/getting-started/ecosystem`,nota:`Qué piezas forman el stack de pmndrs y cómo encajan.`}],ejercicio:{reto:"Escribe una función que, dado un nombre de componente, diga si es de three.js, de drei o HTML. Sirve para el error clásico de meter `<div>` dentro del canvas.",inicial:`const conocidos = {
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

console.log(clasificar('Text'), clasificar('mesh'), clasificar('div'))`,solucion:`const conocidos: Record<string, string> = {
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

console.log(clasificar('Text'), clasificar('mesh'), clasificar('div'))`,pistas:["Un objeto literal con `Record<string, string>` es suficiente.","El operador `??` devuelve el valor de la derecha solo si el de la izquierda es `undefined`.",`En R3F, un elemento desconocido lanza el error de «not part of the THREE namespace».`]}},{id:`9.2`,modulo:9,titulo:`Texto en 3D`,objetivo:"Escribir texto en la escena con una fuente local, ajustar anclaje y medidas, y saber cuándo usar `Text3D`.",nivel:`medio`,minutos:50,bloques:[{tipo:`parrafo`,texto:"Hay dos formas de poner texto en una escena. `Text` genera una malla a partir de la silueta de cada glifo: es rápida, se cambia en caliente y aguanta bien tamaños pequeños. `Text3D` extruye un typeface JSON y necesita geometría por letra: pesa más, se ve mejor de cerca y permite biseles. Para etiquetas y titulares, `Text`; para una pieza tipográfica que se mira de cerca, `Text3D`."},{tipo:`demo`,id:`m9-tipometro`,titulo:`Cambia tamaño, interletra y anclaje`},{tipo:`codigo`,lenguaje:`tsx`,titulo:`Texto con fuente local`,codigo:`import { Text } from '@react-three/drei'
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
}`},{tipo:`tabla`,cabecera:[`Propiedad`,`Unidad`,`Qué controla`],filas:[["`fontSize`",`unidades de escena`,`Altura de la letra, no píxeles`],["`anchorX` / `anchorY`",`—`,`Desde dónde crece el texto`],["`maxWidth`",`unidades de escena`,`Ancho máximo antes de partir línea`],["`lineHeight`",`múltiplo del tamaño`,`Distancia entre líneas`],["`letterSpacing`",`fracción del tamaño`,`Espacio entre glifos`]]},{tipo:`destacado`,tono:`porque`,titulo:`Por qué la fuente tiene que ser local`,texto:"Troika (el motor detrás de `Text`) carga por defecto una fuente desde un CDN. Si la web tiene que funcionar sin red o en un entorno con la red restringida, el texto simplemente no aparece, sin error visible. En este curso las fuentes se copian a `public/fuentes/` con `npm run assets:fuentes` y se pasan por `font`."},{tipo:`lista`,items:["El texto con `Text` es una malla: recibe luz, proyecta sombra y se puede animar.","Cada cambio de `children` regenera la malla: no lo uses para un contador a 60 fps.","`Text3D` necesita un typeface JSON; este curso no lo incluye y lo explica como alternativa.","El texto se mide en unidades de escena: si la cámara está lejos, hay que subir `fontSize`.","Para HTML real (enlaces, botones) usa `Html`, no `Text`."]}],errores:[{sintoma:`El texto no aparece y la consola no da error.`,causa:`La fuente no se pudo cargar (CDN bloqueado o ruta mal).`,arreglo:"Copia la fuente a `public/` y pásala en `font`."},{sintoma:`El texto se sale del encuadre al crecer.`,causa:"`anchorX` centrado: crece hacia los dos lados.",arreglo:'Usa `anchorX="left"` con una posición fija.'},{sintoma:`Las letras se ven borrosas o con dientes.`,causa:"Tamaño muy pequeño combinado con `dpr` bajo.",arreglo:"Sube `fontSize` o el `dpr` del canvas antes que la resolución de la fuente."}],quiz:[{tipo:`unica`,enunciado:"¿Qué genera `Text` de drei?",opciones:[`Una malla a partir de la silueta de los glifos`,`Una textura con el texto`,"Un `<div>` flotante",`Un archivo de fuente`],correcta:0,explicacion:`El texto pasa a formar parte de la escena como cualquier malla.`},{tipo:`verdadero-falso`,enunciado:"`fontSize` se mide en píxeles.",correcta:!1,explicacion:`Se mide en unidades de escena, como el resto de la geometría.`},{tipo:`multiple`,enunciado:"¿Qué controla `anchorX`?",opciones:[`Desde dónde crece el texto en horizontal`,`El color del texto`,`Cómo se parte en líneas`,`La fuente usada`],correctas:[0],explicacion:"Solo el punto de anclaje horizontal; el corte lo decide `maxWidth`."},{tipo:`unica`,enunciado:"¿Cuándo conviene `Text3D`?",opciones:[`Cuando el texto se mira de cerca y necesita volumen`,`Siempre que haya texto`,`Para etiquetas de interfaz`,`Para textos largos`],correcta:0,explicacion:`Extruir geometría por letra es caro y solo compensa de cerca.`}],recursos:[{titulo:`drei: Text`,url:`https://drei.docs.pmnd.rs/abstractions/text`,nota:`Props de troika: anclaje, ancho máximo, interletra.`},{titulo:`drei: Text3D`,url:`https://drei.docs.pmnd.rs/abstractions/text3d`,nota:`Typeface JSON, bisel y altura de extrusión.`},{titulo:`troika-three-text`,url:`https://github.com/protectwise/troika/tree/main/packages/troika-three-text`,nota:"Qué hay debajo de `Text` y cómo se procesa la fuente."}],ejercicio:{reto:`Calcula cuántas unidades de ancho ocupa un texto aproximado: cada carácter mide 0,55 veces el tamaño y hay interletra entre caracteres.`,inicial:`// TODO: devuelve el ancho estimado en unidades de escena.
export function anchoAproximado(texto: string, tamano: number, interletra: number): number {
  return 0
}

console.log(anchoAproximado('Taller K-7', 0.42, 0.02))`,solucion:`export function anchoAproximado(texto: string, tamano: number, interletra: number): number {
  const porGlifo = tamano * 0.55
  const separaciones = Math.max(0, texto.length - 1) * tamano * interletra
  return texto.length * porGlifo + separaciones
}

console.log(anchoAproximado('Taller K-7', 0.42, 0.02))`,pistas:[`El ancho por glifo se multiplica por el número de caracteres.`,`La interletra se aplica entre caracteres, no después del último.`,`Es una estimación: la fuente real cambia el ancho de cada letra.`]}},{id:`9.3`,modulo:9,titulo:`Helpers de escena`,objetivo:"Enderezar, encuadrar y animar un modelo con `Center`, `Bounds`, `Float`, `Environment` y `Stage` sin abusar de ellos.",nivel:`medio`,minutos:50,bloques:[{tipo:`parrafo`,texto:"Un modelo exportado casi nunca llega como uno quiere: el origen no está en el centro, la escala es la del DCC y la cámara no lo encuadra. `Center` recoloca el origen, `Bounds` mueve la cámara para encuadrar, `Float` añade una flotación suave y `Stage` monta un plató completo. Son atajos de composición, no correcciones del archivo: si el modelo está mal, sigue estando mal."},{tipo:`demo`,id:`m9-encuadrar`,titulo:`De descolocado a encuadrado`},{tipo:`codigo`,lenguaje:`tsx`,titulo:`Encuadrar sin tocar el modelo`,codigo:`import { Bounds, Center } from '@react-three/drei'

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
// bounds.current.fit()`},{tipo:`tabla`,cabecera:[`Helper`,`Qué hace`,`Coste`],filas:[["`Center`",`Mueve los hijos para que el origen caiga en el centro`,`Mide una vez al montar`],["`Bounds`",`Coloca la cámara para encuadrar el contenido`,`Mide y recoloca`],["`Float`",`Flotación con ruido suave`,"Un `useFrame`"],["`Environment`",`Ilumina con un HDRI o una escena propia`,`Una textura de entorno`],["`Stage`",`Luces, sombras, fondo y encuadre en un componente`,`Varios objetos y una sombra`]]},{tipo:`destacado`,tono:`ojo`,titulo:"`Environment preset` descarga de un CDN",texto:"Los presets de `Environment` (`city`, `sunset`, `warehouse`…) apuntan a archivos alojados fuera de tu web. Funciona, pero rompe el modo offline y añade una dependencia que no controlas. Aquí se usa `files={HDRIS.estudio}` con un HDRI local. Si necesitas un preset concreto, descarga el HDRI a `public/` y sírvelo tú."},{tipo:`lista`,items:["`Center` y `Bounds` miden al montar: si cambias los hijos, remonta con una `key`.","`Bounds` con `observe` vuelve a encuadrar cuando cambia el tamaño del contenedor.","`Float` se usa para un objecto decorativo; en un configurador distrae.","`Stage` está pensado para mostrar un producto, no para una escena de juego.","Todo lo que hacen estos helpers se puede escribir a mano con `Box3` y `camera.position`."]}],errores:[{sintoma:"`Center` no hace nada después de cambiar la escala.",causa:`Mide en el montaje y no vuelve a medir.`,arreglo:"Cambia la `key` del componente o llama a su método de refresco."},{sintoma:"`Bounds` encuadra pero la cámara acaba dentro del modelo.",causa:"Caja envolvente mal calculada (geometría con `frustumCulled` desactivado o vacía).",arreglo:"Añade `margin` y revisa que el modelo tenga geometría real."},{sintoma:`La escena se ve distinta según el orden de los componentes.`,causa:"`Bounds` y `OrbitControls` compiten por la cámara.",arreglo:`Monta los controles después de encuadrar, o sincroniza el target.`}],quiz:[{tipo:`unica`,enunciado:"¿Qué hace `Center`?",opciones:[`Desplaza los hijos para que el origen caiga en el centro`,`Centra la cámara`,`Escala el modelo a 1 unidad`,`Aplica sombras`],correcta:0,explicacion:`No toca la cámara: cambia la posición de los hijos.`},{tipo:`verdadero-falso`,enunciado:"`Bounds` corrige la escala del modelo.",correcta:!1,explicacion:`Solo mueve la cámara para encuadrar lo que ya hay.`},{tipo:`multiple`,enunciado:`¿Qué problemas resuelven estos helpers?`,opciones:[`Origen descentrado`,`Encuadre de cámara`,`Flotación decorativa`,`Geometría con normales invertidas`],correctas:[0,1,2],explicacion:`Las normales se arreglan en el modelo, no en la escena.`},{tipo:`unica`,enunciado:"¿Por qué evitar `Environment preset`?",opciones:[`Descarga el HDRI de un CDN externo`,`No funciona en WebGL2`,`Solo admite interiores`,`Consume mucha CPU`],correcta:0,explicacion:`Rompe el offline y añade una dependencia de red.`}],recursos:[{titulo:`drei: Bounds`,url:`https://drei.docs.pmnd.rs/abstractions/bounds`,nota:"`fit`, `clip`, `observe` y margen."},{titulo:`drei: Center`,url:`https://drei.docs.pmnd.rs/abstractions/center`,nota:`Qué ejes centra y cómo alinear a una cara.`},{titulo:`three.js: Box3`,url:`https://threejs.org/docs/#api/en/math/Box3`,nota:`La caja envolvente que usan por dentro.`}],ejercicio:{reto:`Calcula el centro y el tamaño de una caja envolvente a partir de sus mínimos y máximos, y decide si cabe en un encuadre de 4 unidades.`,inicial:`type Caja = { min: [number, number, number]; max: [number, number, number] }

// TODO: devuelve centro, tamaño y si el mayor lado cabe en 4 unidades.
export function analizar(caja: Caja) {
  return { centro: [0, 0, 0], tamano: [0, 0, 0], cabe: false }
}

console.log(analizar({ min: [-1, -0.5, -2], max: [3, 1.5, 2] }))`,solucion:`type Caja = { min: [number, number, number]; max: [number, number, number] }

export function analizar(caja: Caja) {
  const centro = caja.min.map((valor, i) => (valor + caja.max[i]) / 2)
  const tamano = caja.min.map((valor, i) => caja.max[i] - valor)
  const mayor = Math.max(...tamano)
  return { centro, tamano, cabe: mayor <= 4 }
}

console.log(analizar({ min: [-1, -0.5, -2], max: [3, 1.5, 2] }))`,pistas:[`El centro es la media entre mínimo y máximo, eje a eje.`,"El tamaño es `max - min`.","El lado mayor decide si cabe: `Math.max(...tamano)`."]}},{id:`9.4`,modulo:9,titulo:"`Html`: UI anclada a objetos",objetivo:`Anclar HTML a un punto 3D, controlar su oclusión y entender por qué no es gratis.`,nivel:`medio`,minutos:45,bloques:[{tipo:`parrafo`,texto:"`Html` de drei no dibuja en el canvas: crea un `<div>` real, lo posiciona con la cámara y lo mueve en cada frame. Eso permite usar CSS, enlaces y formularios dentro de una escena 3D. El precio es que cada etiqueta es un nodo del DOM que se reposiciona: diez van bien, doscientas no."},{tipo:`demo`,id:`m9-etiquetas`,titulo:`Cinco etiquetas sobre el rover`},{tipo:`codigo`,lenguaje:`tsx`,titulo:`Anclar a una pieza y ocultarla tras el modelo`,codigo:`import { Html } from '@react-three/drei'

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
</group>`},{tipo:`tabla`,cabecera:[`Prop`,`Efecto`,`Coste`],filas:[["`center`",`Centra el div en el punto`,`Ninguno`],["`occlude`",`Oculta tras geometría`,`Una consulta de raycast`],["`transform`",`Convierte el div en un plano 3D`,`Matriz + CSS 3D`],["`distanceFactor`",`Escala con la distancia`,`Recálculo por frame`],["`sprite`",`Siempre mira a la cámara`,`Recálculo por frame`]]},{tipo:`destacado`,tono:`truco`,titulo:`Etiquetas que no cuestan: proyectar una sola vez`,texto:`Si las etiquetas no necesitan seguir al objeto en tiempo real (por ejemplo, un plano con leyendas), calcula sus posiciones una vez, conviértelas a coordenadas del contenedor y pinta HTML normal fuera del canvas. Cero coste por frame y accesible de serie.`},{tipo:`lista`,items:["`position` está en el espacio del padre, no en píxeles.","`occlude` puede recibir un array de objetos concretos que deben ocultarla.","`pointerEvents: none` evita que la etiqueta robe clics a la escena.","El HTML se apila con `z-index`: úsalo para que no tape menús reales.","Para muchas etiquetas, usa `Billboard` con `Text` o proyecta posiciones a mano."]}],errores:[{sintoma:`La etiqueta se ve a través del modelo.`,causa:"`occlude` desactivado.",arreglo:`Actívalo o acepta el efecto si es lo que buscabas.`},{sintoma:`La etiqueta no se mueve con el objeto.`,causa:`Está fuera del grupo del objeto: se ancla en el espacio de la escena.`,arreglo:`Anídala dentro del mismo grupo que el modelo.`},{sintoma:`Al girar la cámara el texto se ve del revés.`,causa:"`transform` sin `sprite`.",arreglo:"Añade `sprite` o vuelve al modo plano."}],quiz:[{tipo:`unica`,enunciado:"¿Qué crea `Html`?",opciones:[`Un div real posicionado sobre el canvas`,`Una textura`,`Una malla`,`Un shader`],correcta:0,explicacion:`Es DOM, no WebGL.`},{tipo:`verdadero-falso`,enunciado:"Cien etiquetas `Html` cuestan lo mismo que cien mallas.",correcta:!1,explicacion:`Cada etiqueta es un nodo del DOM que se reposiciona por frame.`},{tipo:`multiple`,enunciado:"¿Qué hace `occlude`?",opciones:[`Oculta la etiqueta si hay geometría delante`,`Usa raycasting`,`Acepta una lista de objetos`,`Comprime el DOM`],correctas:[0,1,2],explicacion:`No comprime nada: consulta si el punto está tapado.`},{tipo:`unica`,enunciado:`¿Qué propiedad evita que la etiqueta robe clics?`,opciones:["`pointerEvents: none`","`opacity`","`zIndexRange`","`center`"],correcta:0,explicacion:`Es CSS normal aplicado al div.`}],recursos:[{titulo:`drei: Html`,url:`https://drei.docs.pmnd.rs/misc/html`,nota:`Todas las props, con ejemplos de oclusión.`},{titulo:`MDN: pointer-events`,url:`https://developer.mozilla.org/es/docs/Web/CSS/pointer-events`,nota:`Por qué el div se come los clics de la escena.`},{titulo:`R3F: events`,url:`https://r3f.docs.pmnd.rs/api/events`,nota:`Cómo interactúan el DOM y el raycasting.`}],ejercicio:{reto:`Dado un array de etiquetas con posición 3D, decide cuáles deben ocultarse al estar detrás de la cámara según su z.`,inicial:`type Etiqueta = { nombre: string; z: number }

const etiquetas: Etiqueta[] = [
  { nombre: 'panel_solar', z: 1.2 },
  { nombre: 'antena', z: -0.4 },
  { nombre: 'faro', z: 2.4 },
]

// TODO: devuelve solo las que tienen z mayor que 0.
export function visibles(lista: Etiqueta[]): Etiqueta[] {
  return []
}

console.log(visibles(etiquetas))`,solucion:`type Etiqueta = { nombre: string; z: number }

const etiquetas: Etiqueta[] = [
  { nombre: 'panel_solar', z: 1.2 },
  { nombre: 'antena', z: -0.4 },
  { nombre: 'faro', z: 2.4 },
]

export function visibles(lista: Etiqueta[]): Etiqueta[] {
  return lista.filter((etiqueta) => etiqueta.z > 0)
}

console.log(visibles(etiquetas))`,pistas:["`filter` devuelve un array nuevo con los que cumplen la condición.",`En coordenadas de cámara, z negativo está detrás.`,`La comprobación real usa el frustum, no solo z: esto es una simplificación.`]}},{id:`9.5`,modulo:9,titulo:"`Instances`, `Clone` y `Preload`",objetivo:`Repetir geometría con una sola llamada, clonar sin duplicar memoria y adelantar la carga de assets.`,nivel:`alto`,minutos:45,bloques:[{tipo:`parrafo`,texto:"Dibujar mil objetos iguales con mil mallas es enviar mil órdenes de dibujo por frame. `Instances` envía una y le dice a la GPU «pinta esta geometría mil veces, con estas matrices». `Clone` hace lo contrario: muchos objetos distintos que comparten geometría y materiales. `Preload` no dibuja nada: adelanta la descarga."},{tipo:`demo`,id:`m9-instancias`,titulo:`1 000 mallas frente a 1 000 instancias`},{tipo:`codigo`,lenguaje:`tsx`,titulo:`La misma cuadrícula, dos montajes`,codigo:`// 1 000 draw calls
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
</Instances>`},{tipo:`tabla`,cabecera:[`Técnica`,`Qué comparte`,`Cuándo`],filas:[["`Instances`",`Geometría y material`,`Muchas copias idénticas`],["`Clone`",`Geometría y material`,`Pocas copias con transformaciones distintas`],["`BatchedMesh`",`Un solo buffer`,`Objetos distintos, mismo material`],["`Preload`",`Nada: adelanta la descarga`,`Antes de una transición`]]},{tipo:`destacado`,tono:`porque`,titulo:`Por qué la GPU no es el cuello de botella`,texto:`Mil cubos son doce mil triángulos: nada para una GPU moderna. Lo caro es la CPU preparando mil objetos, mil matrices y mil órdenes de dibujo cada frame. Instancing mueve ese trabajo a la GPU, que ya sabe hacerlo en paralelo. Mide draw calls, no solo FPS: es el número que delata el problema.`},{tipo:`lista`,items:[`Una instancia no puede tener material propio: todas comparten el del grupo.`,`Puedes actualizar la matriz de una instancia concreta y animarla.`,"`<Clone>` clona materiales si se lo pides; por defecto comparte.","`Preload all` descarga todo lo que esté en la escena en ese momento.",`Instancing no reduce memoria de geometría: la comparte.`]}],errores:[{sintoma:"Con `Instances` todos los objetos son del mismo color.",causa:`El material es uno para todo el grupo.`,arreglo:"Usa `instanceColor` o separa en dos grupos."},{sintoma:`Las sombras de las instancias no aparecen.`,causa:"`castShadow` no está en el grupo de instancias.",arreglo:"Activa `castShadow` y `receiveShadow` en `<Instances>`."},{sintoma:"`Preload` no acelera nada.",causa:`Se llama después de montar la escena que necesita el asset.`,arreglo:`Llámalo al principio del módulo o antes de la transición.`}],quiz:[{tipo:`unica`,enunciado:"¿Qué reduce `Instances`?",opciones:[`Las draw calls`,`Los triángulos`,`La memoria de texturas`,`El tamaño del GLB`],correcta:0,explicacion:`Dibuja muchas copias con una sola llamada.`},{tipo:`verdadero-falso`,enunciado:`Cada instancia puede tener su propio material.`,correcta:!1,explicacion:`Comparten el material del grupo; el color por instancia es la excepción.`},{tipo:`multiple`,enunciado:"¿Qué comparte un clon de `Object3D`?",opciones:[`Geometría`,`Materiales`,`Texturas`,`La jerarquía`],correctas:[0,1,2],explicacion:`La jerarquía sí se duplica; la memoria pesada se comparte.`},{tipo:`unica`,enunciado:"¿Qué hace `Preload`?",opciones:[`Adelanta la descarga de assets`,`Precompila shaders`,`Congela la escena`,`Reduce el dpr`],correcta:0,explicacion:`Lanza la carga antes de que el componente la necesite.`}],recursos:[{titulo:`drei: Instances`,url:`https://drei.docs.pmnd.rs/performances/instances`,nota:`Límite, matrices y color por instancia.`},{titulo:`three.js: InstancedMesh`,url:`https://threejs.org/docs/#api/en/objects/InstancedMesh`,nota:`El objeto que monta drei por debajo.`},{titulo:`three.js: BatchedMesh`,url:`https://threejs.org/docs/#api/en/objects/BatchedMesh`,nota:`Alternativa para geometrías distintas con un material.`}],ejercicio:{reto:`Escribe una función que calcule cuántas draw calls ahorras al instanciar: recibe objetos y devuelve el total antes y después (1 si hay al menos uno).`,inicial:`// TODO: devuelve { antes, despues, ahorro }
export function calcular(objetos: number) {
  return { antes: 0, despues: 0, ahorro: 0 }
}

console.log(calcular(1000))`,solucion:`export function calcular(objetos: number) {
  const antes = objetos
  const despues = objetos > 0 ? 1 : 0
  return { antes, despues, ahorro: antes - despues }
}

console.log(calcular(1000))`,pistas:[`Sin instancing, cada objeto es una draw call.`,`Con instancing, todos los objetos del grupo son una.`,`El ahorro es la diferencia entre los dos números.`]}},{id:`9.6`,modulo:9,titulo:"`View`: varios viewports, un canvas",objetivo:`Renderizar varias cámaras en un solo contexto WebGL y decidir cuándo merece la pena.`,nivel:`alto`,minutos:45,bloques:[{tipo:`parrafo`,texto:"Un `<Canvas>` crea un contexto WebGL, una escena y un bucle. Dos `<Canvas>` en la misma página son dos de todo. Con `<View>` hay un solo contexto y varias cámaras que se dibujan en regiones distintas del lienzo con `setViewport` y `setScissor`. Para comparar dos versiones de un modelo, dos cámaras o una vista de detalle, es la diferencia entre pagar dos veces la GPU y pagarla una."},{tipo:`demo`,id:`m9-view`,titulo:`Cambia entre dos canvas y un canvas con dos View`},{tipo:`codigo`,lenguaje:`tsx`,titulo:"El patrón de `View`",codigo:`const raiz = useRef<HTMLDivElement>(null)

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
</div>`},{tipo:`tabla`,cabecera:[`Enfoque`,`Contextos`,`Escenas`,`Cuándo`],filas:[["Un `<Canvas>`",`1`,`1`,`Una vista`],["Dos `<Canvas>`",`2`,`2`,`Vistas independientes de verdad`],["`<View>`",`1`,`1 por viewport`,`Varias cámaras coordinadas`],["`CanvasTexture`",`1`,`1 más la fuente`,`Minimapa o espejo`]]},{tipo:`destacado`,tono:`ojo`,titulo:`Un navegador limita los contextos WebGL`,texto:"Chrome ronda los 16 contextos simultáneos por página y descarta los más antiguos al pasarse. Una galería con doce canvas puede funcionar en tu máquina y fallar en un móvil. Si la página va a tener muchas vistas, un solo canvas con `View` no es una optimización: es el requisito para que funcione."},{tipo:`lista`,items:["`View` necesita que el contenedor tenga tamaño: si mide 0, no dibuja nada.","Cada `View` tiene su propia escena: las luces van dentro.","El canvas debe ser `position: absolute` y el contenedor `relative`.","Los eventos se conectan con `eventSource` al contenedor.",`No compartas objetos entre dos escenas: usa clon o dos cargas cacheadas.`]}],errores:[{sintoma:`El viewport sale en blanco.`,causa:"El contenedor de `View` no tiene altura definida.",arreglo:"Dale una altura en píxeles o `aspect-ratio` al div."},{sintoma:`El segundo canvas de la página deja de dibujar.`,causa:`Se superó el límite de contextos WebGL del navegador.`,arreglo:"Unifica vistas en un solo canvas con `View`."},{sintoma:`Los objetos aparecen en el sitio equivocado.`,causa:"Se reutiliza el mismo `Object3D` en dos escenas.",arreglo:`Clona el objeto o carga dos instancias desde la caché.`}],quiz:[{tipo:`unica`,enunciado:"¿Cuántos contextos WebGL usa un canvas con tres `View`?",opciones:[`Uno`,`Tres`,`Dos`,`Depende de la GPU`],correcta:0,explicacion:`Los viewports comparten contexto; cada uno tiene su escena.`},{tipo:`verdadero-falso`,enunciado:"Las luces puestas en el canvas principal iluminan todos los `View`.",correcta:!1,explicacion:"Cada `View` renderiza su propia escena: las luces van dentro."},{tipo:`multiple`,enunciado:"¿Qué hay que preparar para usar `View`?",opciones:[`Un contenedor con tamaño`,`Un canvas absoluto dentro de un contenedor relativo`,"`eventSource` para los eventos",`Un segundo renderer`],correctas:[0,1,2],explicacion:`El renderer es uno solo.`},{tipo:`unica`,enunciado:`¿Cuál es el límite práctico de contextos por página?`,opciones:[`Un número bajo, distinto por navegador`,`Cien`,`Ilimitado`,`Dos exactos`],correcta:0,explicacion:`Chrome ronda los 16 y descarta los más antiguos.`}],recursos:[{titulo:`drei: View`,url:`https://drei.docs.pmnd.rs/misc/view`,nota:"El patrón con `View.Port` y `eventSource`."},{titulo:`three.js: WebGLRenderer.setViewport`,url:`https://threejs.org/docs/#api/en/renderers/WebGLRenderer.setViewport`,nota:"Lo que usa `View` por debajo."},{titulo:`MDN: WebGL context limits`,url:`https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API`,nota:`Contextos, pérdida de contexto y límites del navegador.`}],ejercicio:{reto:`Escribe una función que reparta un contenedor de ancho W en N viewports con separación fija, y devuelva el ancho de cada uno.`,inicial:`// TODO: devuelve el ancho de un viewport
export function anchoViewport(anchoTotal: number, columnas: number, separacion: number): number {
  return 0
}

console.log(anchoViewport(1200, 2, 16))`,solucion:`export function anchoViewport(anchoTotal: number, columnas: number, separacion: number): number {
  if (columnas <= 0) return 0
  const huecos = (columnas - 1) * separacion
  return (anchoTotal - huecos) / columnas
}

console.log(anchoViewport(1200, 2, 16))`,pistas:["Hay `columnas - 1` huecos, no `columnas`.",`Resta los huecos antes de dividir.`,`Protege el caso de cero columnas para no dividir por cero.`]}}]},{numero:10,titulo:`Física con Rapier`,descripcion:`Cuerpos, colliders, impulsos y sensores con @react-three/rapier: cuándo tiene sentido simular, cuánto cuesta y cómo evitar los tres fallos clásicos.`,lecciones:[{id:`10.1`,modulo:10,titulo:`Física en el navegador y Rapier`,objetivo:`Entender qué resuelve un motor de física y por qué Rapier se compila a WebAssembly en lugar de escribirse a mano.`,nivel:`intro`,minutos:45,bloques:[{tipo:`parrafo`,texto:"Hasta aquí, mover un objeto era cambiar su `position` en un `useFrame`. Eso funciona para una animación, pero no para doscientos objetos que se apilan: en cuanto hay contacto, cada objeto depende de los demás. Un motor de física resuelve esa red de dependencias cada frame: integra velocidades, detecta qué se toca, calcula cuánto penetra y aplica impulsos para separarlo. Es un problema que se puede escribir a mano para un caso simple y que se vuelve inmanejable al tercer caso raro."},{tipo:`demo`,id:`m10-caida`,titulo:`La misma esfera: integrada a mano y simulada`},{tipo:`parrafo`,texto:`Escribir la caída a mano ocupa veinte líneas y funciona: gravedad, velocidad, suelo, rebote. Lo que no tiene es rotación, contacto con otras formas, fricción, reposo ni estabilidad. Rapier entrega todo eso con una configuración. Esa es la razón de usarlo: no por la gravedad, que es una multiplicación, sino por los contactos.`},{tipo:`codigo`,lenguaje:`tsx`,titulo:`El mínimo absoluto`,codigo:`import { Physics, RigidBody } from '@react-three/rapier'

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
</Physics>`},{tipo:`tabla`,cabecera:[`Motor`,`Lenguaje`,`Encaje con R3F`,`Nota`],filas:[[`Rapier`,`Rust → WASM`,"`@react-three/rapier`",`El que usa este curso`],[`cannon-es`,`JavaScript`,"`@react-three/cannon`",`Ligero y depurable, menos preciso`],[`Ammo.js`,`C++ → WASM`,"`@react-three/ammo`",`Port de Bullet, pesado`]]},{tipo:`destacado`,tono:`porque`,titulo:`Por qué WebAssembly`,texto:"La detección de contactos es un bucle numérico que se ejecuta miles de veces por frame. En JavaScript puro, cada operación pasa por objetos y comprobaciones de tipo. Compilado a WebAssembly, Rapier ejecuta ese bucle con instrucciones nativas y memoria contigua. El paquete incluye el binario dentro del JS, así que no hay petición extra: cuando `<Physics>` aparece, se inicializa un módulo WASM de un par de megas."},{tipo:`lista`,items:[`Simula lo que necesita contacto: pilas, vehículos, escombros, lanzamientos.`,`No simules lo que ya está guionizado: una puerta que se abre, un ascensor.`,`No simules cientos de objetos a la vez en un móvil: 200 cuerpos ya se notan.`,`Un cuerpo físico sin collider no colisiona; un collider sin malla es invisible y válido.`,`La física corre a un paso fijo por defecto (1/60 s), independiente de los FPS.`]}],errores:[{sintoma:`«Cannot read properties of undefined (reading init)».`,causa:"Se importó `@dimforge/rapier3d-compat` directamente sin `await init()`.",arreglo:"Importa `Physics` de `@react-three/rapier` y deja que lo inicialice."},{sintoma:`El objeto cae pero atraviesa el suelo.`,causa:'El suelo es una malla sin cuerpo rígido o con `type="dynamic"`.',arreglo:'Pon el suelo como `type="fixed"` con su collider.'},{sintoma:`La escena arranca en blanco un instante y luego aparece.`,causa:`El módulo WASM se está inicializando (suspende).`,arreglo:"Envuelve en `Suspense` y usa el fallback como pantalla de carga."}],quiz:[{tipo:`unica`,enunciado:"¿Qué aporta un motor de física que no da animar `position` a mano?",opciones:[`Resolución de contactos entre muchos cuerpos`,`Mejores materiales`,`Más FPS`,`Texturas automáticas`],correcta:0,explicacion:`La gravedad es trivial; los contactos son el problema real.`},{tipo:`verdadero-falso`,enunciado:`Rapier descarga su binario de un CDN cada vez que se usa.`,correcta:!1,explicacion:`El WASM va empaquetado dentro del JS del paquete.`},{tipo:`multiple`,enunciado:`¿Qué NO conviene simular con física?`,opciones:[`Una puerta con animación fija`,`Un ascensor con recorrido definido`,`Una pila de cajas que se derrumba`,`Un menú que se abre`],correctas:[0,1,3],explicacion:`Si el movimiento está guionizado, la física solo añade imprevisibilidad y coste.`},{tipo:`unica`,enunciado:`¿A qué ritmo corre la simulación por defecto?`,opciones:[`1/60 s por paso`,`Los FPS de la pantalla`,`1 paso por segundo`,`Depende de la GPU`],correcta:0,explicacion:`El paso fijo desacopla la física del refresco.`}],recursos:[{titulo:`react-three-rapier: introducción`,url:`https://rapier.rs/docs/user_guides/javascript/getting_started_js`,nota:`Cómo se usa Rapier sin React, para ver qué envuelve el paquete.`},{titulo:`Rapier: rigid bodies`,url:`https://rapier.rs/docs/user_guides/javascript/rigid_bodies`,nota:`La teoría de cuerpos rígidos que aplica todo el módulo.`},{titulo:`@react-three/rapier`,url:`https://github.com/pmndrs/react-three-rapier`,nota:`API de los componentes y ejemplos ejecutables.`}],ejercicio:{reto:`Escribe la integración de una caída libre con rebote: recibe altura, gravedad y número de pasos, y devuelve la altura final. Sin física, solo un bucle.`,inicial:`// TODO: simula 'pasos' con paso de 1/60 s y rebote de 0,5.
export function caer(altura: number, gravedad: number, pasos: number): number {
  return altura
}

console.log(caer(3, 9.81, 120))`,solucion:`export function caer(altura: number, gravedad: number, pasos: number): number {
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

console.log(caer(3, 9.81, 120))`,pistas:[`La velocidad se actualiza antes que la posición, o cambia el resultado.`,"El paso es fijo: `1/60`, no el delta real.",`Al tocar el suelo, invierte la velocidad y multiplícala por la restitución.`]}},{id:`10.2`,modulo:10,titulo:"`Physics` y `RigidBody`",objetivo:`Configurar el mundo y elegir entre cuerpo dinámico, fijo y cinemático sin confundirlos.`,nivel:`intro`,minutos:55,bloques:[{tipo:`parrafo`,texto:"`<Physics>` crea el mundo: gravedad, paso de simulación, iteraciones. `<RigidBody>` crea un cuerpo dentro de ese mundo y, por defecto, genera un collider a partir de las mallas que contiene. Todo lo que esté fuera de `<Physics>` no existe para el motor."},{tipo:`demo`,id:`m10-cuerpos`,titulo:`El mismo impulso en tres tipos de cuerpo`},{tipo:`codigo`,lenguaje:`tsx`,titulo:`Los tres tipos`,codigo:`import { Physics, RigidBody } from '@react-three/rapier'

<Physics gravity={[0, -9.81, 0]} timeStep={1 / 60}>
  {/* Cae, choca, gira: lo normal. */}
  <RigidBody type="dynamic" position={[-1.5, 2, 0]}>…</RigidBody>

  {/* Suelo, pared, rampa: nunca se mueve. */}
  <RigidBody type="fixed" position={[0, 0, 0]}>…</RigidBody>

  {/* Se mueve por código y empuja a los demás. */}
  <RigidBody type="kinematicPosition" position={[1.5, 2, 0]}>…</RigidBody>
</Physics>

// Movimiento del cinemático:
cuerpo.current?.setNextKinematicTranslation({ x: 1.5, y: 2.4, z: 0 })`},{tipo:`tabla`,cabecera:[`Tipo`,`Gravedad`,`Impulsos`,`Se mueve por`,`Uso típico`],filas:[["`dynamic`",`Sí`,`Sí`,`Física`,`Cajas, pelotas, escombros`],["`fixed`",`No`,`No`,`Nada`,`Suelo, paredes, rampas`],["`kinematicPosition`",`No`,`No`,"`setNextKinematicTranslation`",`Plataformas, puertas, ascensores`],["`kinematicVelocity`",`No`,`No`,"`setLinvel`",`Cintas, vehículos guiados`]]},{tipo:`destacado`,tono:`ojo`,titulo:`Un cuerpo debe tener una sola fuente de verdad`,texto:"Si actualizas `position` a mano en un `useFrame` sobre un cuerpo dinámico, peleas contra el motor: la física escribe la posición después y el objeto tiembla o se teletransporta. Para mover un dinámico, usa impulsos, fuerzas o `setTranslation`. Para moverlo a voluntad, cambia el tipo a cinemático."},{tipo:`lista`,items:["`<Physics>` debe envolver todos los cuerpos; los de fuera no colisionan.",'`colliders="cuboid" | "ball" | "hull" | "trimesh" | false` decide el collider automático.',"`fixed` no es lo mismo que «sin collider»: un fixed sin collider no bloquea nada.","`linearDamping` y `angularDamping` frenan sin escribir código.","`canSleep` desactivado mantiene despiertos objetos que ya no se mueven: evítalo."]}],errores:[{sintoma:`«It is not possible to add a collider to a fixed body…» o el cuerpo no reacciona.`,causa:"Se esperaba movimiento de un `fixed` o de un cinemático.",arreglo:"Cambia `type` a `dynamic` si debe caer o recibir impulsos."},{sintoma:`El objeto vibra en el aire.`,causa:`Se actualiza su posición por frame además de la simulación.`,arreglo:"Deja que la física controle la transformación; usa `setTranslation` solo para teleportar."},{sintoma:`Los objetos se hunden lentamente en el suelo.`,causa:`Escalas no uniformes en la malla o collider mal ajustado.`,arreglo:"Aplica la escala en el collider, no en el `scale` del cuerpo."}],quiz:[{tipo:`unica`,enunciado:`¿Qué tipo de cuerpo es una rampa fija?`,opciones:["`fixed`","`dynamic`","`kinematicPosition`","`kinematicVelocity`"],correcta:0,explicacion:`No se mueve ni recibe impulsos.`},{tipo:`verdadero-falso`,enunciado:`Un cuerpo cinemático cae por la gravedad si no se mueve.`,correcta:!1,explicacion:`Solo obedece a la posición o velocidad que le marque el código.`},{tipo:`multiple`,enunciado:"¿Qué se puede configurar en `<Physics>`?",opciones:[`Gravedad`,`Paso de simulación`,`Iteraciones del solver`,`El color de fondo`],correctas:[0,1,2],explicacion:"El fondo es del `<Canvas>` o de la escena, no de la física."},{tipo:`unica`,enunciado:'¿Qué hace `colliders="hull"`?',opciones:[`Genera una envolvente convexa a partir de la malla`,`Usa la malla exacta`,`Desactiva los colliders`,`Crea una esfera`],correcta:0,explicacion:`Es una aproximación convexa: barata y suficiente para la mayoría de piezas.`}],recursos:[{titulo:`react-three-rapier: RigidBody`,url:`https://rapier.rs/docs/user_guides/javascript/rigid_bodies`,nota:`Tipos de cuerpo y qué los diferencia.`},{titulo:`Rapier: kinematic bodies`,url:`https://rapier.rs/docs/user_guides/javascript/rigid_bodies#kinematic-rigid-bodies`,nota:`Cómo se mueven las plataformas y los ascensores.`},{titulo:`react-three-rapier: Physics`,url:`https://github.com/pmndrs/react-three-rapier#physics`,nota:`Todos los props del mundo y su valor por defecto.`}],ejercicio:{reto:`Clasifica una lista de objetos por tipo de cuerpo y devuelve cuántos hay de cada tipo.`,inicial:`type Objeto = { nombre: string; tipo: 'dynamic' | 'fixed' | 'kinematicPosition' }

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

console.log(contar(objetos))`,solucion:`type Objeto = { nombre: string; tipo: 'dynamic' | 'fixed' | 'kinematicPosition' }

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

console.log(contar(objetos))`,pistas:[`El tipo es una unión de literales: sirve como clave del objeto de totales.`,`Recorre la lista y suma uno en la clave correspondiente.`,"TypeScript acepta `total[objeto.tipo]` porque el tipo es exactamente una de las claves."]}},{id:`10.3`,modulo:10,titulo:`Colliders`,objetivo:`Elegir la forma de colisión adecuada y entender por qué no tiene que coincidir con la malla.`,nivel:`medio`,minutos:60,bloques:[{tipo:`parrafo`,texto:`La malla se dibuja; el collider se simula. Son dos representaciones distintas del mismo objeto y casi nunca deben ser iguales. Un rover con cuarenta mil triángulos colisiona mejor con cinco cajas y dos cápsulas: cuesta menos, es más estable y se ajusta en segundos. El collider manda en el contacto, así que si la malla y él no coinciden, el objeto se comporta como el collider y se ve como la malla.`},{tipo:`demo`,id:`m10-colliders`,titulo:`Cinco formas, la misma caja visible`},{tipo:`codigo`,lenguaje:`tsx`,titulo:`Collider explícito`,codigo:`import { CuboidCollider, RigidBody } from '@react-three/rapier'

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
</RigidBody>`},{tipo:`tabla`,cabecera:[`Collider`,`Args`,`Coste`,`Cuándo`],filas:[["`BallCollider`","`[radio]`",`Muy bajo`,`Pelotas, cabezas, proyectiles`],["`CuboidCollider`","`[mx, my, mz]` (medias)",`Bajo`,`Cajas, paredes, muebles`],["`RoundCuboidCollider`","`[mx, my, mz, radio]`",`Bajo`,`Cajas que no deben engancharse`],["`CapsuleCollider`","`[mediaAltura, radio]`",`Medio`,`Personajes, brazos`],["`ConeCollider`","`[mediaAltura, radio]`",`Medio`,`Conos, embudos`],["`ConvexHullCollider`","`[vértices]`",`Medio-alto`,`Piezas irregulares`],["`TrimeshCollider`","`[vértices, índices]`",`Alto`,`Suelo con relieve, último recurso`]]},{tipo:`destacado`,tono:`porque`,titulo:`Por qué el cuboid recibe medias medidas`,texto:"`args={[0.4, 0.4, 0.4]}` describe un cubo de 0,8 de lado, no de 0,4. El collider se define por semiejes porque así se calculan los contactos y porque el origen está en el centro. Es la causa número uno de «mi collider es la mitad de grande que la malla»: se pasa el tamaño completo donde van las mitades."},{tipo:`lista`,items:["Con `colliders={false}` ningún collider se genera solo: hay que declararlo.","Cada collider hijo se posiciona respecto al cuerpo con `position` y `rotation`.",`Un cuerpo puede tener varios colliders: la composición es lo normal en un personaje.`,"`friction` y `restitution` van por collider, no por cuerpo.",`El trimesh es exacto y caro: úsalo para el escenario, rara vez para objetos en movimiento.`]}],errores:[{sintoma:`El objeto se hunde hasta la mitad en el suelo.`,causa:`Se pasó el tamaño completo en vez de las medias medidas.`,arreglo:`Divide entre dos los tres argumentos del cuboid.`},{sintoma:`El personaje se queda enganchado en las esquinas del suelo.`,causa:`Cuboids con esquinas vivas contra cuboids.`,arreglo:"Usa `RoundCuboidCollider` o un trimesh sin escalones."},{sintoma:`Al girar el modelo, colisiona como si estuviera recto.`,causa:`La rotación está en la malla pero no en el collider.`,arreglo:"Pásale `rotation` al collider o rota el `RigidBody` entero."}],quiz:[{tipo:`unica`,enunciado:"¿Qué representa `args={[0.5, 0.5, 0.5]}` en un cuboid?",opciones:[`Un cubo de 1 de lado`,`Un cubo de 0,5 de lado`,`Un radio`,`El centro de masas`],correcta:0,explicacion:`Son semiejes: cada valor se duplica para obtener el tamaño.`},{tipo:`verdadero-falso`,enunciado:`El collider debe tener la misma forma que la malla.`,correcta:!1,explicacion:`Se aproxima con primitivas para ganar estabilidad y rendimiento.`},{tipo:`multiple`,enunciado:`¿Por qué usar varias primitivas en un mismo cuerpo?`,opciones:[`Aproximar una forma compleja con poco coste`,`Evitar esquinas que se enganchan`,`Ajustar mejor el contacto`,`Aumentar los triángulos dibujados`],correctas:[0,1,2],explicacion:`El collider no se dibuja: no añade triángulos visibles.`},{tipo:`unica`,enunciado:`¿Cuándo se justifica un trimesh?`,opciones:[`En un escenario estático con relieve`,`En todos los objetos móviles`,`Para una pelota`,`Para un cubo`],correcta:0,explicacion:`Su coste solo compensa cuando la forma exacta importa y no se mueve.`}],recursos:[{titulo:`Rapier: colliders`,url:`https://rapier.rs/docs/user_guides/javascript/colliders`,nota:`Todas las formas, su coste y sus parámetros.`},{titulo:`react-three-rapier: colliders`,url:`https://github.com/pmndrs/react-three-rapier#colliders`,nota:`Cómo se declaran y cómo se combinan con la generación automática.`},{titulo:`Rapier: debug render`,url:`https://rapier.rs/docs/user_guides/javascript/debugging`,nota:"Existe `<Physics debug>`: úsalo para ver el collider real."}],ejercicio:{reto:"Convierte un tamaño completo de caja en los argumentos del cuboid y decide si un objeto redondeado necesita `RoundCuboidCollider`.",inicial:`// TODO: devuelve los semiejes a partir del tamaño completo.
export function semiejes(tamano: [number, number, number]): [number, number, number] {
  return [0, 0, 0]
}

// TODO: true si el radio es mayor que 0.
export function esRedondeado(radio: number): boolean {
  return false
}

console.log(semiejes([2, 1, 0.5]), esRedondeado(0.1))`,solucion:`export function semiejes(tamano: [number, number, number]): [number, number, number] {
  return [tamano[0] / 2, tamano[1] / 2, tamano[2] / 2]
}

export function esRedondeado(radio: number): boolean {
  return radio > 0
}

console.log(semiejes([2, 1, 0.5]), esRedondeado(0.1))`,pistas:[`Los args del cuboid son la mitad de cada dimensión.`,`Devuelve una tupla de tres números, no un objeto.`,`Un radio de 0 es un cuboid normal, no redondeado.`]}},{id:`10.4`,modulo:10,titulo:`Fuerzas e impulsos`,objetivo:"Mover cuerpos con `applyImpulse`, `addForce` y velocidad inicial, y saber qué cambia la masa.",nivel:`medio`,minutos:55,bloques:[{tipo:`parrafo`,texto:`Un impulso es un empujón instantáneo: cambia la velocidad de golpe. Una fuerza es un empuje continuo: se aplica en cada frame y depende del tiempo. Un salto, un disparo o un rebote son impulsos; un viento, un motor o una atracción son fuerzas. La masa no cambia la fuerza, cambia la aceleración: el mismo impulso mueve menos un cuerpo pesado.`},{tipo:`demo`,id:`m10-lanzador`,titulo:`Impulso, masa y gravedad en la misma escena`},{tipo:`codigo`,lenguaje:`tsx`,titulo:`Impulso puntual y fuerza continua`,codigo:`import { useRef } from 'react'
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
})`},{tipo:`tabla`,cabecera:[`Llamada`,`Cuándo`,`Unidad`,`Efecto`],filas:[["`applyImpulse`",`Una vez`,`kg·m/s`,`Cambio instantáneo de velocidad`],["`applyImpulseAtPoint`",`Una vez`,`kg·m/s`,`Además provoca rotación`],["`addForce`",`Cada frame`,`N`,`Aceleración continua`],["`setLinvel`",`Una vez`,`m/s`,`Fija la velocidad, sin masa`],["`setTranslation`",`Una vez`,`m`,`Teletransporte, sin física`]]},{tipo:`destacado`,tono:`truco`,titulo:`La masa se configura en el collider`,texto:"En `@react-three/rapier`, `mass` es una propiedad del collider, no del cuerpo: `args` define la forma y `mass` cuánto pesa. Y no se puede cambiar en caliente sin recrearlo, porque el motor calcula inercia y centro de masas al crearlo. Para un configurador con masa variable, remonta el cuerpo con una `key` o llama a `collider.setMass()`."},{tipo:`lista`,items:[`Los impulsos se acumulan si los aplicas en cada frame: multiplica por el delta.`,"`addForce` con un valor grande y sin delta acelera distinto según los FPS.","`applyImpulseAtPoint` aplica par: sirve para empujar una caja por una esquina.","`setLinvel` ignora la masa: es útil para un salto con altura garantizada.","`gravityScale` permite que un cuerpo flote o pese el doble sin cambiar el mundo."]}],errores:[{sintoma:`El salto es distinto en cada ordenador.`,causa:"Se aplica `applyImpulse` repetidamente dentro de un `useFrame`.",arreglo:"Aplica el impulso una sola vez, en un evento o en un `useEffect`."},{sintoma:`Cambiar la masa no tiene efecto.`,causa:`La masa está en el cuerpo y no en el collider, o el collider no se recreó.`,arreglo:"Pon `mass` en el collider y remonta con `key` al cambiarla."},{sintoma:`El cuerpo recibe el impulso pero no se mueve.`,causa:"Es `fixed` o está dormido y `wakeUp` está en `false`.",arreglo:"Pasa `true` como segundo argumento para despertarlo."}],quiz:[{tipo:`unica`,enunciado:`¿Qué diferencia un impulso de una fuerza?`,opciones:[`El impulso es instantáneo; la fuerza se aplica en el tiempo`,`La fuerza no afecta a la masa`,`El impulso solo funciona en Y`,`No hay diferencia`],correcta:0,explicacion:`Impulso = cambio de momento; fuerza = cambio por unidad de tiempo.`},{tipo:`verdadero-falso`,enunciado:`El mismo impulso produce la misma velocidad en un cuerpo con el doble de masa.`,correcta:!1,explicacion:"`J = m · Δv`: a más masa, menos velocidad para el mismo impulso."},{tipo:`multiple`,enunciado:`¿Qué llamadas pueden mover un cuerpo dinámico?`,opciones:["`applyImpulse`","`addForce`","`setLinvel`","`setNextKinematicTranslation`"],correctas:[0,1,2],explicacion:`La última es solo para cuerpos cinemáticos.`},{tipo:`unica`,enunciado:`¿Dónde se declara la masa en react-three-rapier?`,opciones:[`En el collider`,"En `<Physics>`",`En la malla`,`En el material`],correcta:0,explicacion:`El collider calcula inercia y centro de masas al crearse.`}],recursos:[{titulo:`Rapier: forces and impulses`,url:`https://rapier.rs/docs/user_guides/javascript/rigid_bodies#forces-and-impulses`,nota:`La diferencia formal y las variantes de aplicación.`},{titulo:`Rapier: mass properties`,url:`https://rapier.rs/docs/user_guides/javascript/colliders#mass-properties`,nota:`Masa, densidad e inercia; por qué no se cambian en caliente.`},{titulo:`MDN: delta time`,url:`https://developer.mozilla.org/en-US/docs/Games/Techniques/Control_mechanisms`,nota:`Por qué una fuerza sin delta depende de los FPS.`}],ejercicio:{reto:"Calcula la velocidad resultante de un impulso y la altura de un salto con `v² / (2g)`. Devuelve ambos redondeados a dos decimales.",inicial:`// TODO: v = impulso / masa; altura = v² / (2 · gravedad)
export function salto(impulso: number, masa: number, gravedad: number) {
  return { velocidad: 0, altura: 0 }
}

console.log(salto(12, 2, 9.81))`,solucion:`export function salto(impulso: number, masa: number, gravedad: number) {
  const velocidad = impulso / masa
  const altura = (velocidad * velocidad) / (2 * gravedad)
  return {
    velocidad: Number(velocidad.toFixed(2)),
    altura: Number(altura.toFixed(2)),
  }
}

console.log(salto(12, 2, 9.81))`,pistas:[`La velocidad sale de dividir el impulso entre la masa.`,`La altura máxima se alcanza cuando la velocidad llega a cero.`,"`toFixed` devuelve texto: envuélvelo en `Number` para seguir operando."]}},{id:`10.5`,modulo:10,titulo:`Eventos y sensores`,objetivo:`Detectar colisiones e intersecciones sin contar de más ni gastar eventos que no hacen falta.`,nivel:`medio`,minutos:55,bloques:[{tipo:`parrafo`,texto:"Hay dos tipos de aviso. Los contactos (`onCollisionEnter`) ocurren cuando dos colliders sólidos chocan y el motor resuelve el empuje. Las intersecciones (`onIntersectionEnter`) ocurren cuando al menos uno es un sensor: no hay empuje, solo un aviso. Un sensor es la forma correcta de hacer una meta, una zona de daño o un detonante. Un contacto es la forma correcta de romper una caja al golpearla."},{tipo:`demo`,id:`m10-sensor`,titulo:`Zona de meta que cuenta esferas`},{tipo:`codigo`,lenguaje:`tsx`,titulo:`Sensor con deduplicación`,codigo:`import { useRef } from 'react'
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
</RigidBody>`},{tipo:`tabla`,cabecera:[`Evento`,`Se dispara cuando`,`Requiere`,`Uso`],filas:[["`onCollisionEnter`",`Dos sólidos empiezan a tocarse`,`Ninguno sensor`,`Impacto, rotura`],["`onCollisionExit`",`Dejan de tocarse`,`Ninguno sensor`,`Fin de contacto`],["`onIntersectionEnter`",`Algo entra en un sensor`,`Un sensor`,`Meta, zona, detonante`],["`onIntersectionExit`",`Algo sale del sensor`,`Un sensor`,`Salir de zona`],["`onContactForce`",`La fuerza de contacto supera un umbral`,"`ActiveEvents`",`Daño por impacto`]]},{tipo:`destacado`,tono:`ojo`,titulo:`Los eventos no son gratis`,texto:"Cada collider con eventos activa trabajo extra en el motor y en JavaScript: se crea un objeto por aviso. Un `onIntersectionEnter` en doscientos proyectiles es una fuente de basura constante. Para un juego de partículas, mide posiciones a mano o usa un solo sensor grande. Y recuerda: los eventos se disparan dentro del paso de física, así que no cambies el mundo ahí de forma agresiva."},{tipo:`lista`,items:[`Un sensor no frena ni empuja: si el objeto lo atraviesa, es lo esperado.`,"Deduplica siempre con el `handle` del cuerpo o del collider.",`Un cuerpo con varios colliders puede disparar varios eventos del mismo cuerpo.`,"`onCollisionEnter` se dispara al empezar el contacto, no en cada frame.","Para no actualizar React por frame, guarda el resultado en un `ref` y publica por segundo."]}],errores:[{sintoma:`El contador sube de tres en tres.`,causa:`Un cuerpo con tres colliders dispara tres intersecciones.`,arreglo:"Deduplica por `rigidBody.handle`, no por collider."},{sintoma:`El sensor bloquea el paso.`,causa:"Falta `sensor` en el collider.",arreglo:"Añade `sensor` al `CuboidCollider` correspondiente."},{sintoma:`El evento no llega nunca.`,causa:"El sensor está en un cuerpo `dynamic` que cae, o la escena no lo incluye.",arreglo:"El sensor suele ir en un `fixed`; comprueba también que el otro cuerpo se mueve."}],quiz:[{tipo:`unica`,enunciado:"¿Qué hace un collider con `sensor`?",opciones:[`Emite avisos sin resolver el contacto`,`Empuja más fuerte`,`Se dibuja en wireframe`,`Desactiva la gravedad`],correcta:0,explicacion:`Detecta pero no colisiona.`},{tipo:`verdadero-falso`,enunciado:"`onCollisionEnter` se llama en cada frame mientras dura el contacto.",correcta:!1,explicacion:"Solo al empezar (y `onCollisionExit` al terminar)."},{tipo:`multiple`,enunciado:`¿Por qué puede contar de más un sensor?`,opciones:[`Varios colliders del mismo cuerpo`,`El evento se repite por pares`,`No se deduplica por handle`,`Porque el sensor es fixed`],correctas:[0,1,2],explicacion:"Ser `fixed` es lo normal en un sensor y no causa el problema."},{tipo:`unica`,enunciado:`¿Qué evento usarías para una zona de meta?`,opciones:["`onIntersectionEnter`","`onCollisionEnter`","`onContactForce`","`onSleep`"],correcta:0,explicacion:`Un sensor permite atravesarla y avisar.`}],recursos:[{titulo:`Rapier: sensors`,url:`https://rapier.rs/docs/user_guides/javascript/colliders#sensors`,nota:`Qué es un sensor y cómo se comporta.`},{titulo:`react-three-rapier: events`,url:`https://github.com/pmndrs/react-three-rapier#events`,nota:`Firma exacta de cada handler y ejemplos.`},{titulo:`Rapier: active events`,url:`https://rapier.rs/docs/user_guides/javascript/colliders#active-events`,nota:`Cómo se activan y por qué se pueden desactivar por collider.`}],ejercicio:{reto:`Simula el contador de un sensor: recibe una lista de identificadores de evento y devuelve cuántos cuerpos únicos han pasado.`,inicial:`// TODO: usa un Set para no contar repetidos.
export function contarUnicos(eventos: number[]): number {
  return 0
}

console.log(contarUnicos([1, 2, 1, 3, 2, 4]))`,solucion:`export function contarUnicos(eventos: number[]): number {
  return new Set(eventos).size
}

console.log(contarUnicos([1, 2, 1, 3, 2, 4]))`,pistas:["`new Set(lista)` descarta duplicados al construirse.","`.size` da el número de elementos únicos.",`El handle de Rapier es un número: encaja como clave del Set.`]}},{id:`10.6`,modulo:10,titulo:`Estabilidad y rendimiento`,objetivo:`Elegir el paso de simulación y las iteraciones, y reconocer tunneling, jitter y coste excesivo.`,nivel:`alto`,minutos:60,bloques:[{tipo:`parrafo`,texto:'La física tiene su propio reloj. Por defecto da pasos de 1/60 de segundo, aunque la pantalla vaya a 144 Hz o a 30. Ese paso fijo hace que la simulación sea reproducible: el mismo impulso produce siempre el mismo salto. Con `timeStep="vary"` la física usa el delta real del frame, se adapta a cualquier pantalla y pierde reproducibilidad: un tirón puede hacer que un objeto atraviese una pared.'},{tipo:`demo`,id:`m10-estabilidad`,titulo:`200 cuerpos y el coste real por paso`},{tipo:`codigo`,lenguaje:`tsx`,titulo:`Ajustar el mundo`,codigo:`<Physics
  gravity={[0, -9.81, 0]}
  timeStep={1 / 60}          // fijo: reproducible
  numSolverIterations={6}    // pilas más rígidas
  maxCcdSubsteps={2}         // contra el tunneling
  lengthUnit={1}             // 1 unidad = 1 metro
>
  …
</Physics>`},{tipo:`tabla`,cabecera:[`Síntoma`,`Causa probable`,`Ajuste`],filas:[[`Un objeto rápido atraviesa una pared`,`Tunneling`,"`ccd` en el cuerpo o `maxCcdSubsteps`"],[`La pila tiembla y se hunde`,`Pocas iteraciones o masas dispares`,"`numSolverIterations`, masas parecidas"],[`El objeto se hunde en el suelo`,`Collider mal dimensionado o escala`,"Revisa semiejes y `lengthUnit`"],[`La escena va a 20 fps con 300 cuerpos`,`Coste del paso de física`,`Menos cuerpos, dormir objetos, instancing`],[`Un cuerpo vibra sin tocar nada`,`Se mueve a mano y con física`,`Una sola fuente de verdad`]]},{tipo:`destacado`,tono:`porque`,titulo:`Mide milisegundos por paso, no FPS`,texto:"Los FPS dependen del render, del tamaño del canvas y de la GPU. Para saber si el problema es la física, mide el tiempo entre `useBeforePhysicsStep` y `useAfterPhysicsStep`. Si ese número sube por encima de ~4 ms en un móvil, la física es el cuello de botella, y subir iteraciones lo empeora."},{tipo:`lista`,items:[`Paso fijo por defecto: no lo cambies sin motivo medido.`,"`ccd` solo en objetos rápidos y pequeños, no en todos.","Cada cuerpo dormido es un cuerpo que no cuesta: deja `canSleep` activo.",`200 cuerpos en un móvil es el límite práctico de una escena jugable.`,`Para escombros sin interacción, anima a mano o usa instancing, no física.`]}],errores:[{sintoma:`La simulación va a cámara lenta en un portátil.`,causa:"`timeStep` bajo combinado con `updateLoop` propio que no acumula tiempo.",arreglo:"Deja `timeStep` en 1/60 y no toques `updateLoop` salvo que sepas por qué."},{sintoma:`Un proyectil atraviesa la pared solo a veces.`,causa:`Tunneling por velocidad alta y paso grande.`,arreglo:"Activa `ccd` en el proyectil y sube `maxCcdSubsteps` a 2."},{sintoma:`La pila explota al cargar.`,causa:`Objetos creados solapados dentro de otro collider.`,arreglo:`Sepáralos al crearlos y deja caer; un solape inicial genera impulsos enormes.`}],quiz:[{tipo:`unica`,enunciado:'¿Qué hace `timeStep="vary"`?',opciones:[`Usa el delta real de cada frame`,`Duplica la gravedad`,`Desactiva la física`,`Fija 30 pasos por segundo`],correcta:0,explicacion:`Se adapta al frame a costa de reproducibilidad.`},{tipo:`verdadero-falso`,enunciado:"Activar `ccd` en todos los cuerpos siempre mejora el rendimiento.",correcta:!1,explicacion:`Añade trabajo: solo compensa en objetos rápidos.`},{tipo:`multiple`,enunciado:`¿Qué ayuda a estabilizar una pila?`,opciones:[`Más iteraciones del solver`,`Masas parecidas entre objetos`,`Crear los cuerpos sin solaparse`,`Subir los FPS del render`],correctas:[0,1,2],explicacion:`El render no cambia la simulación si el paso es fijo.`},{tipo:`unica`,enunciado:`¿Qué mide el coste real de la física?`,opciones:[`El tiempo entre antes y después del paso`,`Los FPS del navegador`,`El número de triángulos`,`El tamaño del canvas`],correcta:0,explicacion:`Aísla la simulación del render.`}],recursos:[{titulo:`react-three-rapier: hooks del paso`,url:`https://github.com/pmndrs/react-three-rapier#useBeforePhysicsStep`,nota:"`useBeforePhysicsStep` y `useAfterPhysicsStep` para medir."},{titulo:`Rapier: CCD`,url:`https://rapier.rs/docs/user_guides/javascript/rigid_bodies#continuous-collision-detection`,nota:`Qué es el tunneling y cuándo activarlo.`},{titulo:`Rapier: simulation parameters`,url:`https://rapier.rs/docs/user_guides/javascript/integration_parameters`,nota:`Iteraciones, predicción y tolerancias.`}],ejercicio:{reto:`Convierte un delta de frame en pasos fijos de 1/60 acumulando el sobrante: recibe un array de deltas y devuelve cuántos pasos se ejecutan.`,inicial:`// TODO: acumula el delta y descuenta 1/60 por paso.
export function pasos(deltas: number[]): number {
  return 0
}

console.log(pasos([0.016, 0.016, 0.033, 0.016]))`,solucion:`export function pasos(deltas: number[]): number {
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

console.log(pasos([0.016, 0.016, 0.033, 0.016]))`,pistas:[`No redondees: acumula el sobrante para el siguiente frame.`,"`while` y no `if`: un frame largo puede necesitar varios pasos.",`Este es el patrón del acumulador de tiempo fijo que usa cualquier motor.`]}}]},{numero:11,titulo:`Postprocesado y shaders`,descripcion:`Efectos de pantalla completa con postprocessing y shaders propios en GLSL: qué cuesta cada pase, cómo se escribe un material y cuándo conviene parchear uno estándar.`,lecciones:[{id:`11.1`,modulo:11,titulo:"`EffectComposer`",objetivo:`Entender qué cambia cuando la escena se dibuja a una textura y montar una cadena de efectos con su coste a la vista.`,nivel:`medio`,minutos:55,bloques:[{tipo:`parrafo`,texto:"Sin `EffectComposer`, R3F dibuja la escena directamente al lienzo: un solo pase, cada píxel se calcula una vez. Con `EffectComposer`, el resultado va primero a una textura en memoria, y sobre esa textura se aplican pases de pantalla completa: brillos, desenfoques, viñeta. Al final, la textura se pinta al lienzo. Ese viaje extra es todo el coste del postprocesado: no depende de cuántos objetos haya, sino de cuántos píxeles y de cuántos pases."},{tipo:`demo`,id:`m11-composer`,titulo:`Encender y apagar el postprocesado con el coste medido`},{tipo:`codigo`,lenguaje:`tsx`,titulo:`La cadena mínima`,codigo:`import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing'

<Canvas>
  <Escena />

  <EffectComposer multisampling={0}>
    <Bloom intensity={1.1} luminanceThreshold={0.6} mipmapBlur />
    <Vignette offset={0.28} darkness={0.72} />
  </EffectComposer>
</Canvas>`},{tipo:`tabla`,cabecera:[`Pase`,`Qué hace`,`Coste`,`Depende de`],filas:[[`Escena → textura`,`Dibuja la escena una vez`,`Igual que sin composer`,`Geometría`],[`Bloom`,`Difumina lo que supera un umbral`,`Medio`,`Niveles del mipmap`],[`SSAO`,`Oscurece las esquinas de contacto`,`Alto`,`Resolución y muestras`],[`Viñeta`,`Oscurece los bordes`,`Bajo`,`Resolución`],[`Copia final`,`Pinta la textura al lienzo`,`Bajo`,`Resolución`]]},{tipo:`destacado`,tono:`porque`,titulo:`Por qué se apaga con un interruptor y no con un condicional dentro del efecto`,texto:"Un efecto desactivado no se ejecuta, pero el `EffectComposer` sigue existiendo: la escena continúa yendo a una textura. Quitarlo entero devuelve el render directo. La diferencia entre las dos medidas de la demo es, precisamente, el precio del viaje a la textura. En un móvil con pantalla de 400 píxeles por pulgada, ese viaje solo ya cuesta varios milisegundos."},{tipo:`lista`,items:["`multisampling={0}` desactiva el antialias del render target: el antialias del lienzo no se hereda.",`Los efectos se aplican en el orden en que se declaran, de arriba abajo.`,"`EffectComposer` necesita un solo hijo por pase; los condicionales se resuelven con `null`.","Si cambias la lista de efectos, remonta con `key`: el composer construye sus pases al montar.",`Mide siempre con el postprocesado encendido y apagado en el mismo equipo.`]}],errores:[{sintoma:`La escena se ve, pero ningún efecto hace nada.`,causa:"Los efectos están declarados fuera de `<EffectComposer>`.",arreglo:`Anida cada efecto dentro del composer.`},{sintoma:`Todo se ve lavado o demasiado claro.`,causa:`El tone mapping se aplica dos veces: en la escena y en la copia final.`,arreglo:"Deja el tone mapping en el composer (`ToneMapping`) o desactívalo en uno de los dos."},{sintoma:`Al activar el bloom no brilla nada.`,causa:`El umbral es mayor que el brillo máximo de los materiales.`,arreglo:"Baja `luminanceThreshold` o sube `emissiveIntensity` en lo que debe brillar."},{sintoma:`La pantalla queda negra al cambiar de efectos.`,causa:`El composer reutiliza pases con distinto número de salidas.`,arreglo:"Cambia la `key` del `<EffectComposer>` cuando cambie la estructura de la cadena."}],quiz:[{tipo:`unica`,enunciado:"¿Qué añade `EffectComposer` respecto a dibujar la escena directamente?",opciones:[`Un destino intermedio en una textura`,`Más triángulos`,`Iluminación global`,`Un segundo canvas`],correcta:0,explicacion:`El composer renderiza a una textura y luego la procesa.`},{tipo:`verdadero-falso`,enunciado:`El coste del postprocesado depende del número de objetos de la escena.`,correcta:!1,explicacion:`Los pases son de pantalla completa: dependen de la resolución.`},{tipo:`multiple`,enunciado:`¿Qué hay que tener en cuenta al montar un composer?`,opciones:[`El orden de los efectos`,`El antialias del render target`,`El tone mapping duplicado`,`El número de luces de la escena`],correctas:[0,1,2],explicacion:`Las luces afectan a la escena, no a los pases de pantalla.`},{tipo:`unica`,enunciado:"¿Qué hace `multisampling={0}`?",opciones:[`Desactiva el MSAA del render target`,`Apaga todos los efectos`,`Reduce la resolución a la mitad`,`Desactiva las sombras`],correcta:0,explicacion:`El MSAA del lienzo no se hereda; hay que pedirlo o dejarlo en 0.`}],recursos:[{titulo:`postprocessing (pmndrs)`,url:`https://github.com/pmndrs/postprocessing`,nota:`La librería que envuelve @react-three/postprocessing.`},{titulo:`@react-three/postprocessing`,url:`https://github.com/pmndrs/react-postprocessing`,nota:"API de `EffectComposer` y lista de efectos con sus props."},{titulo:`three: WebGLRenderTarget`,url:`https://threejs.org/docs/#api/en/renderers/WebGLRenderTarget`,nota:`Qué es exactamente la textura intermedia.`}],ejercicio:{reto:`Calcula los milisegundos que cuesta el postprocesado: recibe ancho, alto, número de pases y coste por megapíxel, y devuelve el total redondeado a dos decimales.`,inicial:`// TODO: 1 Mpx = 1 000 000 de píxeles.
export function coste(ancho: number, alto: number, pases: number, msPorMpx: number): number {
  return 0
}

console.log(coste(1920, 1080, 3, 0.9))`,solucion:`export function coste(ancho: number, alto: number, pases: number, msPorMpx: number): number {
  const megapixeles = (ancho * alto) / 1_000_000
  const total = megapixeles * pases * msPorMpx
  return Number(total.toFixed(2))
}

console.log(coste(1920, 1080, 3, 0.9))`,pistas:[`Multiplica ancho por alto para obtener píxeles.`,`Divide entre un millón para pasar a megapíxeles.`,`El coste crece linealmente con los pases y con el área.`]}},{id:`11.2`,modulo:11,titulo:`Efectos: bloom, SSAO, DoF y viñeta`,objetivo:`Elegir efectos por intención, ordenarlos correctamente y saber cuáles son caros antes de activarlos.`,nivel:`medio`,minutos:60,bloques:[{tipo:`parrafo`,texto:`Un efecto no es una decoración: es una decisión sobre qué debe mirar el ojo. El bloom dice «esto emite luz». El SSAO dice «estas piezas se tocan». La profundidad de campo dice «mira aquí y olvida el fondo». La viñeta dice «el borde no importa». Si activas los cuatro a la vez sin una razón, la imagen pierde lectura y el portátil pierde frames. La pregunta correcta no es qué efectos existen, sino qué tiene que entender quien mira.`},{tipo:`demo`,id:`m11-efectos`,titulo:`Seis efectos activables con su coste en ms por frame`},{tipo:`codigo`,lenguaje:`tsx`,titulo:`Orden recomendado`,codigo:`const [ssao, setSsao] = useState(true)

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
</EffectComposer>`},{tipo:`tabla`,cabecera:[`Efecto`,`Intención`,`Coste`,`Aviso`],filas:[[`Bloom`,`Marcar lo emisivo`,`Medio`,`Umbral alto = no pasa nada`],[`SSAO`,`Contacto y volumen`,`Alto`,"Exige `enableNormalPass`"],[`DoF`,`Dirigir la mirada`,`Alto`,`En móvil suele sobrar`],[`Viñeta`,`Cerrar el encuadre`,`Bajo`,`Con abuso, parece un túnel`],[`Ruido / grano`,`Textura de cámara`,`Bajo`,`A 0,3 ya es suciedad`],[`Aberración`,`Lente barata`,`Bajo`,`Muy sutil o marea`]]},{tipo:`destacado`,tono:`ojo`,titulo:`SSAO no es gratis en ninguna parte`,texto:`Necesita una pasada extra para guardar normales y profundidad, y luego muestrea alrededor de cada píxel. En un portátil integrado, SSAO a pantalla completa puede costar más que toda la geometría de la escena. Si lo necesitas en móvil, mide, baja el radio y considera desactivarlo por debajo de cierto ancho de ventana.`},{tipo:`lista`,items:[`Un efecto que no se nota no está aportando: quítalo.`,`La viñeta y el grano van al final; el SSAO, al principio.`,`No se combinan dos efectos que hagan lo mismo (bloom + brillo + tonemapping agresivo).`,"Un `EffectComposer` con seis efectos en un móvil es una decisión de producto, no técnica.",`Activa y desactiva cada efecto con un clic: así se ve cuál sobra.`]}],errores:[{sintoma:`SSAO no hace nada o la escena se pone negra.`,causa:"Falta `enableNormalPass` o el composer no se remontó al activarlo.",arreglo:"Pasa `enableNormalPass={activo}` y cambia la `key` del composer."},{sintoma:`El bloom brilla en toda la imagen.`,causa:`El umbral está por debajo del brillo del fondo.`,arreglo:"Sube `luminanceThreshold` por encima del color de fondo."},{sintoma:`El texto o la interfaz se ve borrosa.`,causa:`Los efectos se aplican a todo el lienzo, incluidos overlays 3D.`,arreglo:`Mueve la interfaz fuera del canvas o renderiza el HUD aparte.`}],quiz:[{tipo:`unica`,enunciado:`¿Qué efecto necesita la normal pass?`,opciones:[`SSAO`,`Bloom`,`Viñeta`,`Ruido`],correcta:0,explicacion:`La oclusión se calcula con normales y profundidad.`},{tipo:`verdadero-falso`,enunciado:`La profundidad de campo se debe aplicar después del bloom.`,correcta:!1,explicacion:`Si desenfocas después, emborronas el brillo que acabas de crear.`},{tipo:`multiple`,enunciado:`¿Qué efectos son baratos?`,opciones:[`Viñeta`,`Ruido`,`SSAO`,`Aberración cromática`],correctas:[0,1,3],explicacion:`SSAO es el caro de la lista.`},{tipo:`unica`,enunciado:`¿Cuál es el criterio para activar un efecto?`,opciones:[`Que comunique algo que la escena necesita`,`Que esté de moda`,`Que exista en la librería`,`Que lo use otro proyecto`],correcta:0,explicacion:`Si no aporta lectura, cuesta sin devolver nada.`}],recursos:[{titulo:`@react-three/postprocessing: efectos`,url:`https://github.com/pmndrs/react-postprocessing#effects`,nota:`Props exactas de cada efecto, incluidos los que no están en la demo.`},{titulo:`postprocessing: SSAOEffect`,url:`https://pmndrs.github.io/postprocessing/public/docs/class/src/effects/SSAOEffect.js~SSAOEffect.html`,nota:`Qué significa cada parámetro de la oclusión.`},{titulo:`Bloom en three.js`,url:`https://threejs.org/examples/?q=bloom`,nota:`Ejemplos oficiales para comparar umbrales.`}],ejercicio:{reto:`Filtra una lista de efectos por presupuesto: devuelve los que quepan en los milisegundos disponibles, en orden.`,inicial:`type Efecto = { nombre: string; ms: number }

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

console.log(caben(cadena, 2))`,solucion:`type Efecto = { nombre: string; ms: number }

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

console.log(caben(cadena, 2))`,pistas:[`Lleva un acumulado y compáralo con el presupuesto antes de añadir.`,"Con `continue` saltas el que no cabe y sigues con los siguientes.",`Devuelve los nombres, no los objetos.`]}},{id:`11.3`,modulo:11,titulo:`GLSL: el pipeline`,objetivo:`Entender qué hace el vertex shader, qué hace el fragment shader y cómo viajan los datos entre ambos.`,nivel:`alto`,minutos:70,bloques:[{tipo:`parrafo`,texto:"Un shader es un programa que se ejecuta en la GPU. Hay dos etapas obligatorias. El vertex shader corre una vez por vértice y decide dónde cae ese vértice en la pantalla; el fragment shader corre una vez por píxel (técnicamente, por fragmento) y decide su color. Entre ambos hay un canal: el vertex escribe en una `varying`, la GPU la interpola por el triángulo y el fragment la lee. Esa interpolación es la razón de que un color por vértice se convierta en un degradado por píxel."},{tipo:`demo`,id:`m11-pipeline`,titulo:`UV como color, patrón animado y tres geometrías`},{tipo:`codigo`,lenguaje:`glsl`,titulo:`Un shader completo en veinte líneas`,codigo:`// Vertex: una vez por vértice
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
}`},{tipo:`tabla`,cabecera:[`Concepto`,`Dónde`,`Se ejecuta`,`Cambia`],filas:[["`position`, `normal`, `uv`",`Vertex`,`Por vértice`,`Solo lectura (atributos)`],["`gl_Position`",`Vertex`,`Por vértice`,`Obligatorio escribirlo`],["`uniform`",`Ambos`,`Por draw call`,`Igual para todos los vértices`],["`varying`",`Vertex → Fragment`,`Interpolada`,`La escribe el vertex, la lee el fragment`],["`gl_FragColor`",`Fragment`,`Por píxel`,`El color final`]]},{tipo:`destacado`,tono:`porque`,titulo:`Por qué la misma textura se estira en la esfera`,texto:"La UV de un plano es una cuadrícula limpia; la de una esfera se comprime en los polos porque todos los triángulos de arriba comparten casi la misma `v`. No es un error del shader: es cómo está construida la geometría. Por eso conviene probar cualquier material sobre varias formas antes de dar por bueno que «funciona»."},{tipo:`lista`,items:["El vertex shader debe escribir `gl_Position` o no se dibuja nada.","`precision highp float` evita bandas y artefactos en el fragment.",`Los uniforms son la vía para animar sin recrear el material.`,"No uses `if` dentro de bucles por píxel si puedes evitarlo: la GPU ejecuta ambos lados.",`Prueba el shader en un plano antes de aplicarlo a un modelo complejo.`]}],errores:[{sintoma:`El objeto desaparece sin errores en consola.`,causa:"El vertex shader no escribe `gl_Position`.",arreglo:"Calcula `projectionMatrix * modelViewMatrix * vec4(position, 1.0)`."},{sintoma:`El shader compila pero el color es negro.`,causa:`Un uniform no está declarado o no se le asigna valor.`,arreglo:"Declara el uniform y asígnalo en `uniforms`."},{sintoma:`El material se ve pero no se mueve con el objeto.`,causa:"Se usó `position` sin multiplicar por la matriz del modelo.",arreglo:"Usa `modelViewMatrix` o `modelMatrix` según el espacio que necesites."}],quiz:[{tipo:`unica`,enunciado:`¿Cuántas veces se ejecuta el fragment shader?`,opciones:[`Una por píxel cubierto`,`Una por vértice`,`Una por objeto`,`Una por frame`],correcta:0,explicacion:`Por eso el coste depende de la resolución.`},{tipo:`verdadero-falso`,enunciado:"Una `varying` se interpola entre los vértices del triángulo.",correcta:!0,explicacion:`El vertex la escribe y la GPU la mezcla por píxel.`},{tipo:`multiple`,enunciado:"¿Qué es un `uniform`?",opciones:[`Un valor igual para todos los vértices de un draw call`,`Un atributo por vértice`,`Una variable que se cambia desde JavaScript`,`Algo que solo existe en el fragment`],correctas:[0,2],explicacion:`Se declara en el shader y se actualiza desde el material.`},{tipo:`unica`,enunciado:`¿Qué hay que escribir obligatoriamente en el vertex shader?`,opciones:["`gl_Position`","`gl_FragColor`","`uv`","`normal`"],correcta:0,explicacion:`Sin posición proyectada no hay triángulo que dibujar.`}],recursos:[{titulo:`The Book of Shaders`,url:`https://thebookofshaders.com/`,nota:`El mejor curso libre de GLSL, de cero a ruido.`},{titulo:`three: ShaderMaterial`,url:`https://threejs.org/docs/#api/en/materials/ShaderMaterial`,nota:`Qué uniforms y atributos inyecta three automáticamente.`},{titulo:`Shadertoy`,url:`https://www.shadertoy.com/`,nota:`Para experimentar con fragment shaders sueltos.`}],ejercicio:{reto:`Replica en JavaScript el patrón de rejilla del shader: recibe u y v entre 0 y 1 y una frecuencia, y devuelve 1 si el punto cae en una línea, 0 si no.`,inicial:`// TODO: usa fract(u * frecuencia) < 0.06 para detectar la línea.
export function rejilla(u: number, v: number, frecuencia: number): number {
  return 0
}

console.log(rejilla(0.5, 0.25, 4))`,solucion:`export function rejilla(u: number, v: number, frecuencia: number): number {
  const lineaU = u * frecuencia - Math.floor(u * frecuencia) < 0.06 ? 1 : 0
  const lineaV = v * frecuencia - Math.floor(v * frecuencia) < 0.06 ? 1 : 0
  return lineaU || lineaV ? 1 : 0
}

console.log(rejilla(0.5, 0.25, 4))`,pistas:["`fract(x)` en GLSL es `x - Math.floor(x)`.",`Una línea es una banda estrecha: el umbral 0,06 es arbitrario y se puede cambiar.`,`Devuelve 1 en cuanto una de las dos coordenadas esté en línea.`]}},{id:`11.4`,modulo:11,titulo:"`shaderMaterial` en R3F",objetivo:"Crear un material propio con uniforms animados, registrarlo con `extend` y usarlo como una etiqueta más.",nivel:`alto`,minutos:65,bloques:[{tipo:`parrafo`,texto:"Escribir `<shaderMaterial uniforms={...} vertexShader={...} fragmentShader={...} />` funciona, pero es incómodo: los uniforms hay que memorizarlos y el shader no tiene nombre. `shaderMaterial` de drei resuelve las dos cosas: crea una clase de material con sus uniforms ya declarados y permite registrarla con `extend`. A partir de ahí se usa como `<materialOnda />`, con la primera letra en minúscula, y se le pasan props como a cualquier material de three."},{tipo:`demo`,id:`m11-material-propio`,titulo:`Esfera deformada con uniforms controlados por deslizadores`},{tipo:`codigo`,lenguaje:`tsx`,titulo:`Material propio, de la clase al JSX`,codigo:`import { extend, useFrame } from '@react-three/fiber'
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
})`},{tipo:`tabla`,cabecera:[`Pieza`,`Para qué`,`Nota`],filas:[["`shaderMaterial(...)`",`Declara uniforms y shaders`,`Devuelve una clase`],["`extend({ MaterialOnda })`",`La registra en el catálogo JSX`,`Una vez por módulo`],["`<materialOnda />`",`La instancia en la escena`,`Minúscula obligatoria`],["`useFrame` + `uniforms.x.value`",`Anima sin re-render`,`Nunca por props en cada frame`],["`declare module`",`Tipa la etiqueta nueva`,`Sin esto, TS se queja`]]},{tipo:`destacado`,tono:`truco`,titulo:`Un uniform es una caja, no un número`,texto:"`uniforms.uTiempo` es un objeto `{ value: number }`. Se cambia `uniforms.uTiempo.value`, no `uniforms.uTiempo`. Pasar el número por prop en cada frame provoca un render de React para nada; mutar `.value` dentro de `useFrame` es una escritura que la GPU verá en el siguiente draw, sin tocar el árbol de React."},{tipo:`lista`,items:[`Un material propio no recibe luces salvo que escribas la iluminación.`,"`extend` va en el módulo del material, no dentro del componente.","El nombre en JSX es la clave de `extend` con la primera letra en minúscula.","Los uniforms con color se declaran como `new Color(...)` y se mutan con `.set()`.","Si el material no se actualiza, comprueba que el `ref` apunta al material real."]}],errores:[{sintoma:`«MaterialOnda is not part of the THREE namespace».`,causa:"Se usó en mayúscula o falta `extend`.",arreglo:"Registra con `extend` y escribe `<materialOnda />`."},{sintoma:`Cambiar el color no hace nada.`,causa:"Se asigna un `Color` nuevo en vez de mutar el existente.",arreglo:"`uniforms.uColor.value.set(nuevoColor)`."},{sintoma:`La esfera se ve completamente negra.`,causa:`El shader no calcula iluminación y el color base es oscuro.`,arreglo:`Sube el color o usa un material estándar parcheado (lección 11.6).`},{sintoma:"TypeScript no reconoce `<materialOnda />`.",causa:"Falta la augmentación de `ThreeElements`.",arreglo:"Añade el `declare module` de @react-three/fiber del ejemplo."}],quiz:[{tipo:`unica`,enunciado:"¿Cómo se usa un material registrado con `extend({ MaterialOnda })`?",opciones:["`<materialOnda />`","`<MaterialOnda />`","`<shaderMaterial />`","`<material-onda />`"],correcta:0,explicacion:`R3F pasa la clave a minúscula para el catálogo JSX.`},{tipo:`verdadero-falso`,enunciado:`Un material propio recibe luces automáticamente.`,correcta:!1,explicacion:`Hay que implementar la iluminación o parchear un material estándar.`},{tipo:`multiple`,enunciado:`¿Qué hace falta para tener un material propio tipado?`,opciones:["`shaderMaterial` con los uniforms","`extend`","La augmentación de `ThreeElements`","Un `<Canvas>` nuevo"],correctas:[0,1,2],explicacion:`El canvas es el mismo de siempre.`},{tipo:`unica`,enunciado:`¿Cómo se actualiza un uniform por frame?`,opciones:["Mutar `uniforms.x.value` en `useFrame`",`Pasarlo como prop en cada render`,"Llama a `setState` cada frame",`Recreando el material`],correcta:0,explicacion:`Es una escritura directa, sin re-render de React.`}],recursos:[{titulo:`drei: shaderMaterial`,url:`https://drei.pmnd.rs/?path=/docs/shaders-shadermaterial--docs`,nota:`Documentación y ejemplos del helper.`},{titulo:`R3F: extend`,url:`https://r3f.docs.pmnd.rs/api/objects`,nota:`Cómo funciona el catálogo de elementos y por qué la minúscula.`},{titulo:`three: Uniform`,url:`https://threejs.org/docs/#api/en/core/Uniform`,nota:"La forma `{ value }` que envuelve cada uniform."}],ejercicio:{reto:"Escribe la actualización de un uniform de tiempo: recibe el objeto `{ value }` y un delta, suma el delta y devuelve el valor nuevo con tres decimales.",inicial:`type Uniforme = { value: number }

export function avanzar(reloj: Uniforme, delta: number): number {
  // TODO: muta uniforme.value y devuélvelo redondeado.
  return 0
}

const reloj = { value: 0 }
console.log(avanzar(reloj, 0.016), reloj.value)`,solucion:`type Uniforme = { value: number }

export function avanzar(reloj: Uniforme, delta: number): number {
  reloj.value += delta
  return Number(reloj.value.toFixed(3))
}

const reloj = { value: 0 }
console.log(avanzar(reloj, 0.016), reloj.value)`,pistas:[`El uniform es un objeto: mutarlo no requiere devolverlo.`,`Suma el delta, no lo asignes.`,`Redondea solo el valor devuelto; el acumulado debe quedar exacto.`]}},{id:`11.5`,modulo:11,titulo:`Efectos prácticos`,objetivo:`Implementar fresnel, dissolve, holograma y desplazamiento en un mismo fragment shader y saber qué cuesta cada uno.`,nivel:`alto`,minutos:75,bloques:[{tipo:`parrafo`,texto:`Cuatro efectos que se ven en cualquier juego salen de cuatro líneas de matemáticas. Fresnel compara la normal con la dirección de la vista: cuanto más de canto, más brilla. Dissolve descarta píxeles por debajo de un umbral de ruido y colorea el filo. Holograma multiplica el color por franjas que suben. Desplazamiento mueve los vértices en el vertex shader. Los tres primeros trabajan por píxel; el último, por vértice, y es el único que cambia la silueta.`},{tipo:`demo`,id:`m11-efectos-practicos`,titulo:`Cuatro efectos conmutables sobre el rover lunar`},{tipo:`codigo`,lenguaje:`glsl`,titulo:`Las cuatro fórmulas`,codigo:`// 1. Fresnel: borde encendido
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
pos += normal * onda * uDesplazamiento;`},{tipo:`tabla`,cabecera:[`Efecto`,`Coste`,`Cambia la silueta`,`Se nota en`],filas:[[`Fresnel`,`Bajo`,`No`,`Bordes, cristales, escudos`],[`Dissolve`,`Bajo`,`No (descarta píxeles)`,`Muertes, teletransportes`],[`Holograma`,`Bajo`,`No`,`Interfaces, fantasmas, escaneos`],[`Desplazamiento`,`Medio`,`Sí`,`Agua, tela, energía`]]},{tipo:`destacado`,tono:`ojo`,titulo:"`discard` rompe el early-z",texto:"Descartar píxeles en el fragment shader impide que la GPU descarte antes los que están detrás: tiene que ejecutar el shader para saber si el píxel existe. Un dissolve en un objeto que ocupa media pantalla cuesta más de lo que parece. Si el efecto es solo visual y no necesita agujeros reales, considera una transparencia con `alphaTest` a nivel de material."},{tipo:`lista`,items:[`Comparte un solo material y cambia una rama con un uniform entero.`,`Clona el modelo antes de cambiarle el material: los glTF comparten materiales entre demos.`,`El desplazamiento necesita geometría densa; con cuatro vértices no se ve nada.`,"Para fresnel, usa `power` alto si quieres un borde fino.",`Un dissolve sin borde coloreado parece un objeto roto, no un efecto.`]}],errores:[{sintoma:`El dissolve deja el objeto con el mismo contorno.`,causa:`El ruido se calcula en coordenadas de pantalla o con muy poca frecuencia.`,arreglo:"Usa la posición local y multiplica por 20 o más antes de `floor`."},{sintoma:`El desplazamiento no se ve.`,causa:`La geometría tiene muy pocos vértices.`,arreglo:`Sube la subdivisión del modelo o aplica el efecto a una malla densa.`},{sintoma:`Al cambiar de efecto, otras demos cambian de color.`,causa:`Se modificó el material original del glTF en caché.`,arreglo:`Clona la escena y asigna el material solo a las mallas del clon.`},{sintoma:`El borde fresnel parpadea en móvil.`,causa:"Precisión `mediump` en el fragment.",arreglo:"Declara `precision highp float;` al principio."}],quiz:[{tipo:`unica`,enunciado:`¿Qué mide el fresnel?`,opciones:[`El ángulo entre la normal y la vista`,`La distancia a la cámara`,`El número de luces`,`La rugosidad`],correcta:0,explicacion:`Cuanto más de canto se ve la superficie, más brilla el borde.`},{tipo:`verdadero-falso`,enunciado:`El desplazamiento se puede hacer en el fragment shader.`,correcta:!1,explicacion:`Mover la silueta exige mover vértices en el vertex shader.`},{tipo:`multiple`,enunciado:`¿Qué efectos cambian la forma visible del objeto?`,opciones:[`Desplazamiento`,`Dissolve (descarta píxeles)`,`Fresnel`,`Holograma`],correctas:[0,1],explicacion:`Fresnel y holograma solo cambian el color.`},{tipo:`unica`,enunciado:`¿Por qué hay que clonar el modelo del glTF?`,opciones:[`Porque los materiales se comparten entre instancias`,`Porque three no permite reutilizar geometría`,`Porque el clon ocupa menos memoria`,`Porque el original está comprimido`],correcta:0,explicacion:`Cambiar el material del original afecta a cualquier demo que lo use.`}],recursos:[{titulo:`Fresnel en LearnOpenGL`,url:`https://learnopengl.com/PBR/Lighting`,nota:`La fórmula y su papel en los materiales PBR.`},{titulo:`The Book of Shaders: noise`,url:`https://thebookofshaders.com/11/`,nota:`Ruido para dissolve y desplazamiento.`},{titulo:"three: ShaderMaterial y `discard`",url:`https://threejs.org/docs/#api/en/materials/ShaderMaterial`,nota:`Cómo se comporta el material con descartes.`}],ejercicio:{reto:`Calcula el factor fresnel a partir del producto escalar entre normal y vista, con una potencia configurable. Devuelve un número entre 0 y 1 redondeado a tres decimales.`,inicial:`// TODO: fresnel = (1 - dot)^potencia, con dot recortado a [0, 1].
export function fresnel(dot: number, potencia: number): number {
  return 0
}

console.log(fresnel(0.15, 2.4))`,solucion:`export function fresnel(dot: number, potencia: number): number {
  const recortado = Math.min(1, Math.max(0, dot))
  return Number(Math.pow(1 - recortado, potencia).toFixed(3))
}

console.log(fresnel(0.15, 2.4))`,pistas:[`Recorta el producto escalar antes de operar: puede salir negativo.`,"`Math.pow(base, exponente)` es la potencia.","Un `dot` bajo significa que la superficie se ve de canto: el fresnel sube."]}},{id:`11.6`,modulo:11,titulo:"`onBeforeCompile`",objetivo:`Modificar un material estándar sin perder luces ni sombras, y saber cuándo conviene frente a un material propio.`,nivel:`alto`,minutos:65,bloques:[{tipo:`parrafo`,texto:"Si escribes un `shaderMaterial` desde cero, el objeto deja de recibir luces, sombras, niebla y tone mapping: todo eso estaba en el shader que acabas de reemplazar. `onBeforeCompile` hace lo contrario: espera a que three monte el shader del material estándar y te lo entrega para que sustituyas un trozo. Conservas la iluminación PBR y añades solo lo tuyo. El precio es la fragilidad: dependes de los nombres de los `#include` internos."},{tipo:`demo`,id:`m11-parchear`,titulo:`Estándar parcheado frente a shader propio, con la misma onda`},{tipo:`codigo`,lenguaje:`ts`,titulo:`Inyectar código en un material estándar`,codigo:`const material = new MeshStandardMaterial({ metalness: 0.6, roughness: 0.3 })

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
material.needsUpdate = true`},{tipo:`tabla`,cabecera:[`Enfoque`,`Luces y sombras`,`Control total`,`Fragilidad`],filas:[["`shaderMaterial` propio",`No (hay que escribirlas)`,`Total`,`Baja`],["`onBeforeCompile`",`Sí, se conservan`,`Parcial`,`Alta`],[`Material estándar normal`,`Sí`,`Ninguno`,`Ninguna`]]},{tipo:`destacado`,tono:`porque`,titulo:"Por qué `customProgramCacheKey` importa",texto:`three cachea programas por material y por combinaciones de defines. Si dos materiales con el mismo tipo parchean el shader de forma distinta, sin una clave propia pueden acabar compartiendo el programa del primero. El síntoma es desconcertante: uno de los dos objetos usa el efecto del otro, o ninguno. Devolver una clave única por variante lo resuelve.`},{tipo:`lista`,items:[`Inyecta al principio del shader las declaraciones y los uniforms nuevos.`,"Sustituye `#include` completos, no líneas sueltas.","Guarda la referencia al `shader` para actualizar sus uniforms en `useFrame`.","Fija `customProgramCacheKey` si hay más de una variante del parche.",`Comprueba el parche al subir de versión de three: los includes pueden cambiar.`]}],errores:[{sintoma:`El parche no se aplica.`,causa:"El material ya estaba compilado o falta `needsUpdate`.",arreglo:"Asigna `onBeforeCompile` antes del primer render y marca `needsUpdate = true`."},{sintoma:`El shader falla con «undeclared identifier vPosOnda».`,causa:`La varying se declaró en un shader y no en el otro.`,arreglo:"Declara la misma `varying` en vertex y fragment."},{sintoma:`Dos objetos comparten el efecto equivocado.`,causa:"Falta una `customProgramCacheKey` distinta por variante.",arreglo:`Devuelve una clave que incluya la variante.`},{sintoma:`El objeto se ve negro tras el parche.`,causa:"Se sustituyó un `#include` que asignaba una variable usada después.",arreglo:`Añade código alrededor del include, no en su lugar.`}],quiz:[{tipo:`unica`,enunciado:"¿Qué ventaja tiene `onBeforeCompile` frente a un shader propio?",opciones:[`Conserva luces, sombras y PBR`,`Es más rápido siempre`,`No necesita uniforms`,`Funciona sin WebGL`],correcta:0,explicacion:`Se parte del material estándar y solo se añade.`},{tipo:`verdadero-falso`,enunciado:"`onBeforeCompile` recibe el shader ya montado por three.",correcta:!0,explicacion:"Por eso se pueden sustituir sus `#include`."},{tipo:`multiple`,enunciado:`¿Qué hace falta para inyectar código con garantías?`,opciones:[`Declarar uniforms y varyings en ambos shaders`,"Una `customProgramCacheKey` por variante",`Guardar el shader para animar sus uniforms`,`Recompilar el material cada frame`],correctas:[0,1,2],explicacion:`Recompilar cada frame sería carísimo y no hace falta.`},{tipo:`unica`,enunciado:"¿Qué riesgo tiene depender de un `#include`?",opciones:[`Que three lo renombre o lo elimine al actualizar`,`Que ocupe más memoria`,`Que no funcione en móvil`,`Que no admita uniforms`],correcta:0,explicacion:`Es API interna, no contrato público.`}],recursos:[{titulo:`three: Material.onBeforeCompile`,url:`https://threejs.org/docs/#api/en/materials/Material.onBeforeCompile`,nota:`Firma y advertencia sobre WebGPU.`},{titulo:"three: lista de `#include`",url:`https://github.com/mrdoob/three.js/tree/dev/src/renderers/shaders/ShaderChunk`,nota:`El catálogo real de trozos que se pueden sustituir.`},{titulo:`Custom materials en three.js`,url:`https://threejs.org/examples/?q=materials`,nota:`Ejemplos de materiales modificados.`}],ejercicio:{reto:`Implementa la inyección de código: recibe la fuente del shader, un marcador y un fragmento, y devuelve la fuente con el fragmento justo después del marcador.`,inicial:`export function inyectar(fuente: string, marcador: string, codigo: string): string {
  // TODO: si el marcador no existe, devuelve la fuente sin tocar.
  return fuente
}

const shader = 'void main() {\\n  gl_Position = vec4(0.0);\\n}'
console.log(inyectar(shader, 'void main() {', '  // parche'))`,solucion:`export function inyectar(fuente: string, marcador: string, codigo: string): string {
  const indice = fuente.indexOf(marcador)
  if (indice === -1) return fuente
  const corte = indice + marcador.length
  return fuente.slice(0, corte) + '\\n' + codigo + fuente.slice(corte)
}

const shader = 'void main() {\\n  gl_Position = vec4(0.0);\\n}'
console.log(inyectar(shader, 'void main() {', '  // parche'))`,pistas:["`indexOf` devuelve -1 cuando no encuentra el marcador.","El corte va después del marcador: `indice + marcador.length`.","No uses `replace` con el código como reemplazo: interpreta `$`."]}},{id:`11.7`,modulo:11,titulo:"Render targets y `useFBO`",objetivo:`Renderizar una escena a una textura y usarla como fuente para minimapas, portales o espejos.`,nivel:`alto`,minutos:55,bloques:[{tipo:`parrafo`,texto:"Un render target es una textura donde la GPU puede dibujar. `useFBO` de drei crea uno y te devuelve la textura para que la uses como `map` de un material. Con eso se hacen minimapas (una cámara cenital que se ve en una pantalla), espejos (una cámara reflejada) y portales (una segunda escena). El patrón siempre es el mismo: cambiar el destino, dibujar, restaurar el destino, y pintar la textura en algún sitio."},{tipo:`demo`,id:`m11-fbo`,titulo:`Minimapa en vivo, congelable y con resolución ajustable`},{tipo:`codigo`,lenguaje:`tsx`,titulo:`Renderizar a una textura`,codigo:`import { useFBO } from '@react-three/drei'
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
</mesh>`},{tipo:`parrafo`,texto:"Un espejo usa el mismo mecanismo con tres piezas añadidas: la cámara se refleja respecto al plano del suelo, se recorta con un plano oblicuo para que no se cuele lo que queda debajo, y la textura se proyecta con la matriz de la cámara. Si falta el recorte, el reflejo enseña el interior del mundo; si falta la proyección, el reflejo se queda pegado al plano y no sigue la perspectiva. Es fácil fallar en cualquiera de las tres, así que drei lo empaqueta en `MeshReflectorMaterial`."},{tipo:`demo`,id:`m11-espejo`,titulo:`Un espejo real, con resolución y desenfoque`},{tipo:`codigo`,lenguaje:`tsx`,titulo:`El espejo, en un material`,codigo:`<mesh rotation={[-Math.PI / 2, 0, 0]}>
  <planeGeometry args={[14, 14]} />
  <MeshReflectorMaterial
    resolution={512}   // tamaño del render target del reflejo
    blur={[220, 70]}   // desenfoque por profundidad
    mixStrength={3.2}  // cuánto pesa el reflejo sobre el color base
    mirror={0.85}
    roughness={0.92}
  />
</mesh>`},{tipo:`tabla`,cabecera:[`Uso`,`Cámara`,`Qué se dibuja`,`Coste`],filas:[[`Minimapa`,`Cenital ortográfica o perspectiva`,`La misma escena`,`Resolución del target`],[`Espejo`,`Reflejada respecto al plano`,`La escena menos el espejo`,`Resolución + plano extra`],[`Portal`,`La de la segunda escena`,`Otra escena`,`Dos escenas completas`],[`Ping-pong`,`La principal`,`El frame anterior`,`Dos targets alternos`]]},{tipo:`destacado`,tono:`porque`,titulo:`El coste es el área, no la escena`,texto:`Pasar de 128 a 512 px multiplica por 16 los píxeles que se dibujan en el target. En una demo con ocho cajas no se nota; en una escena de 300 000 triángulos, el minimapa puede costar tanto como la vista principal. Si el minimapa solo se mira de reojo, 128 px sobra. Un espejo paga lo mismo y añade un render completo de la escena por frame: se reserva para el suelo protagonista, no para cada superficie.`},{tipo:`lista`,items:["Restaura siempre el render target anterior, no `null` a ciegas.",`Oculta lo que no debe aparecer en la textura (el propio panel, la interfaz).`,"Llama a `gl.clear()` tras cambiar de destino o arrastrarás el frame anterior.","Un target nuevo por resolución: `useFBO` ya lo memoiza con sus argumentos.",`Libera los targets al desmontar si los creas a mano.`]}],errores:[{sintoma:`El panel muestra el frame anterior con estelas.`,causa:"Falta `gl.clear()` en el render target.",arreglo:"Limpia justo después de `setRenderTarget`."},{sintoma:`El panel se ve dentro de sí mismo, en bucle.`,causa:`No se ocultó antes de renderizar la textura.`,arreglo:"Pon `visible = false` mientras se dibuja el target."},{sintoma:`La textura sale negra.`,causa:`La cámara del target no actualizó su matriz o mira al vacío.`,arreglo:"Colócala, llama a `lookAt` y a `updateMatrixWorld()`."},{sintoma:`Los colores del panel no coinciden con la escena.`,causa:"Doble tone mapping por `toneMapped` activo en el material del panel.",arreglo:"Pon `toneMapped={false}` en el material que muestra la textura."},{sintoma:`En el espejo se ve el interior de los objetos, como si estuvieran huecos.`,causa:`Falta el plano de recorte oblicuo: la cámara reflejada dibuja también lo que queda por debajo del espejo.`,arreglo:"Recorta con `clippingPlanes` a la altura del plano, o usa `MeshReflectorMaterial`, que ya lo hace."}],quiz:[{tipo:`unica`,enunciado:`¿Qué es un render target?`,opciones:[`Una textura donde la GPU dibuja`,`Un segundo canvas en el DOM`,`Una cámara extra`,`Un tipo de luz`],correcta:0,explicacion:"Se usa después como `map` de un material."},{tipo:`verdadero-falso`,enunciado:`Duplicar la resolución de un minimapa duplica su coste.`,correcta:!1,explicacion:`Lo multiplica por cuatro (área), no por dos.`},{tipo:`multiple`,enunciado:`¿Qué hay que hacer al renderizar a una textura?`,opciones:[`Guardar y restaurar el render target`,`Limpiar el target`,`Ocultar lo que no debe salir`,`Recrear la escena`],correctas:[0,1,2],explicacion:`La escena es la misma; solo cambia el destino.`},{tipo:`unica`,enunciado:"¿Para qué sirve `gl.setRenderTarget(anterior)` al terminar?",opciones:[`Para devolver el dibujado al lienzo`,`Para borrar la textura`,`Para comprimir el target`,`Para cambiar de cámara`],correcta:0,explicacion:`Si no se restaura, el siguiente pase se dibuja en la textura.`},{tipo:`unica`,enunciado:`¿Qué añade un espejo respecto a un minimapa?`,opciones:[`Cámara reflejada, plano de recorte y proyección de la textura`,`Una segunda escena completa`,`Un canvas aparte en el DOM`,`Nada: es exactamente igual`],correcta:0,explicacion:`El render target es el mismo; cambia cómo se coloca la cámara y cómo se recorta y proyecta la textura.`}],recursos:[{titulo:`drei: useFBO`,url:`https://drei.pmnd.rs/?path=/docs/misc-usefbo--docs`,nota:`Firma del hook y ejemplo de minimapa.`},{titulo:`three: WebGLRenderTarget`,url:`https://threejs.org/docs/#api/en/renderers/WebGLRenderTarget`,nota:`Parámetros de filtrado, profundidad y formato.`},{titulo:`drei: MeshReflectorMaterial`,url:`https://drei.pmnd.rs/?path=/docs/shaders-meshreflectormaterial--docs`,nota:`El material de la segunda demo: props y ejemplo de suelo reflectante.`},{titulo:`three: Reflector`,url:`https://threejs.org/examples/?q=reflector`,nota:`Cómo se implementa un espejo real desde cero, para comparar.`}],ejercicio:{reto:`Calcula la memoria de un render target RGBA de 8 bits: recibe ancho y alto y devuelve los megabytes redondeados a dos decimales.`,inicial:`// TODO: ancho × alto × 4 bytes.
export function memoriaMB(ancho: number, alto: number): number {
  return 0
}

console.log(memoriaMB(512, 512), memoriaMB(1920, 1080))`,solucion:`export function memoriaMB(ancho: number, alto: number): number {
  const bytes = ancho * alto * 4
  return Number((bytes / (1024 * 1024)).toFixed(2))
}

console.log(memoriaMB(512, 512), memoriaMB(1920, 1080))`,pistas:[`Cuatro canales de 8 bits son 4 bytes por píxel.`,`Un megabyte aquí es 1024 × 1024 bytes.`,"Con profundidad (`depth`) hay que sumar el búfer de profundidad."]}},{id:`11.8`,modulo:11,titulo:`WebGPU y TSL: el mapa del futuro`,objetivo:`Situar WebGPU y Three Shading Language sin prometer lo que todavía no está en todas partes.`,nivel:`alto`,minutos:45,bloques:[{tipo:`parrafo`,texto:"WebGPU es la API gráfica que sustituye a WebGL: habla con la GPU de forma más directa, permite compute shaders y reparte mejor el trabajo entre hilos. TSL (Three Shading Language) es la forma de escribir materiales para ella en JavaScript, sin cadenas de GLSL. three la soporta desde el módulo `three/webgpu`, con `WebGPURenderer`. Todo eso es real y funciona hoy, pero no en todos los navegadores ni en todas las GPU: WebGL sigue siendo la apuesta segura para una web que debe abrirse en cualquier sitio."},{tipo:`widget`,id:`m11-webgpu`,titulo:`Detección de WebGPU en tu navegador`},{tipo:`codigo`,lenguaje:`tsx`,titulo:`El cambio mínimo en R3F`,codigo:`import { Canvas } from '@react-three/fiber'
import { WebGPURenderer } from 'three/webgpu'

<Canvas
  gl={async (props) => {
    const renderer = new WebGPURenderer({ ...props, antialias: true })
    await renderer.init()
    return renderer
  }}
>
  <Escena />
</Canvas>`},{tipo:`tabla`,cabecera:[``,`WebGL 2`,`WebGPU`],filas:[[`Soporte`,`Universal en navegadores modernos`,`Chrome/Edge completos, Safari y Firefox recientes`],[`Shader`,`GLSL`,`WGSL + TSL`],[`Compute`,`No`,`Sí`],[`Materiales`,"`ShaderMaterial`",`Node Material`],[`Madurez en R3F`,`Total`,`Experimental`],[`Este curso`,`Sí`,`Solo teoría y detección`]]},{tipo:`destacado`,tono:`info`,titulo:`Una nota honesta`,texto:"Esta web se renderiza con WebGL en todas sus lecciones, incluidas las de shaders. No hay una escena en WebGPU porque el curso tiene que funcionar en el navegador de cualquiera que lo abra. El widget de arriba solo comprueba si tu equipo tiene adaptador; no ejecuta un renderer distinto. Aprender GLSL y `ShaderMaterial` no es tiempo perdido: TSL se entiende mucho mejor después."},{tipo:`lista`,items:[`Si vas a publicar un producto hoy, WebGL es la opción por defecto.`,`WebGPU brilla con compute, muchos objetos o postprocesado complejo.`,`El renderer se cambia; la escena, los hooks y la cámara no.`,`TSL se escribe en JavaScript y se compone con nodos, no con cadenas.`,"Comprueba `navigator.gpu` y ofrece WebGL como respaldo."]}],errores:[{sintoma:"`three/webgpu` no existe al importar.",causa:`Se instaló una versión de three anterior a la separación del build.`,arreglo:"Actualiza three y comprueba la ruta `three/webgpu` en el paquete."},{sintoma:`El canvas queda en blanco en Firefox o Safari antiguos.`,causa:"El navegador no expone `navigator.gpu`.",arreglo:`Detecta y cae a WebGL.`},{sintoma:`Los materiales dejan de verse al cambiar de renderer.`,causa:"Shaders GLSL con `onBeforeCompile` no existen en el pipeline de nodos.",arreglo:`Migra esos materiales a TSL o mantén WebGL.`}],quiz:[{tipo:`unica`,enunciado:`¿Qué API usa este curso para renderizar?`,opciones:[`WebGL`,`WebGPU`,`Canvas 2D`,`SVG`],correcta:0,explicacion:`Por compatibilidad, todas las demos son WebGL.`},{tipo:`verdadero-falso`,enunciado:`Cambiar a WebGPU obliga a reescribir la escena entera.`,correcta:!1,explicacion:`Cambian el renderer y los materiales; la escena no.`},{tipo:`multiple`,enunciado:`¿Qué aporta WebGPU frente a WebGL?`,opciones:[`Compute shaders`,`Shaders en WGSL`,`Mejor reparto entre hilos`,`Soporte universal`],correctas:[0,1,2],explicacion:`El soporte universal es justo lo que todavía no tiene.`},{tipo:`unica`,enunciado:`¿Cómo se comprueba si hay WebGPU?`,opciones:["Mirando si existe `navigator.gpu`","Preguntando a `window.WebGLRenderingContext`",'Con `document.createElement("gpu")`',"Con `performance.now()`"],correcta:0,explicacion:`Y después se pide un adaptador, que puede fallar igualmente.`}],recursos:[{titulo:`MDN: WebGPU API`,url:`https://developer.mozilla.org/en-US/docs/Web/API/WebGPU_API`,nota:`Estado del soporte y guía de inicio.`},{titulo:`three: WebGPURenderer`,url:`https://github.com/mrdoob/three.js/wiki/WebGPU`,nota:`Qué cambia en el renderer y en los materiales.`},{titulo:`Three.js Shading Language (TSL)`,url:`https://github.com/mrdoob/three.js/wiki/Three.js-Shading-Language`,nota:`La sintaxis de nodos que sustituye a GLSL.`}],ejercicio:{reto:"Decide qué renderer usar: recibe si hay `navigator.gpu`, si se obtuvo adaptador y si el proyecto necesita compute, y devuelve la elección.",inicial:`type Capacidades = { gpu: boolean; adaptador: boolean; compute: boolean }

// TODO: WebGPU solo si hay gpu + adaptador. Sin compute, WebGL sigue valiendo.
export function elegir(c: Capacidades): 'webgpu' | 'webgl2' {
  return 'webgl2'
}

console.log(elegir({ gpu: true, adaptador: true, compute: true }))`,solucion:`type Capacidades = { gpu: boolean; adaptador: boolean; compute: boolean }

export function elegir(c: Capacidades): 'webgpu' | 'webgl2' {
  if (c.gpu && c.adaptador) return 'webgpu'
  return 'webgl2'
}

console.log(elegir({ gpu: true, adaptador: true, compute: true }))`,pistas:["Con `gpu` expuesto pero sin adaptador no se puede usar WebGPU.","`compute` es una razón para querer WebGPU, no un requisito para que funcione.",`La respuesta por defecto debe ser la compatible.`]}}]},{numero:12,titulo:`Rendimiento`,descripcion:`Medir antes de tocar, entender qué cuesta un frame y aplicar las cuatro palancas que de verdad mueven la aguja: menos draw calls, menos re-renders, menos píxeles y memoria liberada a tiempo.`,lecciones:[{id:`12.1`,modulo:12,titulo:`Anatomía de un frame`,objetivo:`Saber qué se puede medir en una escena R3F, con qué cifras, y por qué el tiempo de GPU no está entre ellas.`,nivel:`alto`,minutos:55,bloques:[{tipo:`parrafo`,texto:"Un frame son 16,7 ms si quieres 60 por segundo. Ese presupuesto se reparte en cuatro tramos: el JavaScript que corre React y tus `useFrame`, la CPU que prepara cada objeto y envía llamadas de dibujado, la GPU que transforma vértices y, por último, la GPU que rellena píxeles. Optimizar sin saber en qué tramo se va el tiempo es adivinar. Y adivinar suele acabar en cambiar cosas que no importaban mientras la causa real sigue ahí."},{tipo:`demo`,id:`m12-metricas`,titulo:`La misma escena con tres costes separados`},{tipo:`codigo`,lenguaje:`tsx`,titulo:`Medir sin provocar renders de React`,codigo:`import { useFrame, useThree } from '@react-three/fiber'

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
}`},{tipo:`tabla`,cabecera:[`Dato`,`De dónde sale`,`Qué te dice`,`Cuidado`],filas:[[`fps`,"delta de `useFrame`",`Si el frame cabe o no`,`Depende del monitor y de la pestaña`],[`draw calls`,"`gl.info.render.calls`",`Trabajo de CPU por objeto`,`No cuenta los pases de sombra como objetos`],[`triángulos`,"`gl.info.render.triangles`",`Trabajo de vértices`,`No mide lo caro que es el fragment`],[`geo/tex`,"`gl.info.memory`",`Recursos vivos en GPU`,`Solo sube al primer render de cada recurso`],[`tiempo de GPU`,`no disponible`,`El tramo que más duele`,`WebGL no lo expone sin extensiones`]]},{tipo:`destacado`,tono:`ojo`,titulo:`Lo que no se mide, se estima mal`,texto:`El overdraw no aparece en ninguna de estas cifras: si apilas ocho capas transparentes del tamaño de la pantalla, el renderer sigue reportando los mismos objetos y los mismos triángulos mientras el fps se hunde. Cuando los números no explican lo que ves, la causa suele estar en píxeles sombreados o en trabajo de GPU, no en la geometría.`},{tipo:`lista`,items:[`Mide siempre en el mismo equipo y en la misma pestaña: compara dentro de la demo, no entre dispositivos.`,`Un solo cambio por medición: si mueves tres cosas a la vez, no sabrás cuál movió la aguja.`,`Empieza por los draw calls y por la resolución; el detalle de la geometría casi nunca es el problema.`,`El panel de las DevTools que tengas abierto también cuesta frames: cierra lo que no uses.`,"Publica los números con `textContent`, no con `setState`."]}],errores:[{sintoma:`El contador de fps marca 30 y el de draw calls es ridículo.`,causa:`La pestaña está en segundo plano o el monitor va a 30 Hz.`,arreglo:`Comprueba el refresco de la pantalla y mide con la ventana activa.`},{sintoma:`Los triángulos bajan al girar la cámara pero los objetos no han cambiado.`,causa:`El frustum culling está descartando lo que queda fuera de plano.`,arreglo:"Es lo esperado: el culling es automático. Compruébalo apagando `frustumCulled`."},{sintoma:"Publicar las métricas con `setState` hunde el fps de la propia demo.",causa:`Cada actualización re-renderiza el árbol de React entero.`,arreglo:"Escribe en el DOM desde `useFrame` y deja el estado para lo que cambia poco."}],quiz:[{tipo:`unica`,enunciado:`¿Cuánto dura un frame a 60 fps?`,opciones:[`16,7 ms`,`60 ms`,`1 ms`,`33,3 ms`],correcta:0,explicacion:`1000 ms dividido entre 60 frames.`},{tipo:`verdadero-falso`,enunciado:"`gl.info.render.triangles` mide el coste del fragment shader.",correcta:!1,explicacion:`Mide vértices procesados; el relleno de píxeles es otra etapa.`},{tipo:`multiple`,enunciado:"¿Qué se puede leer de `gl.info`?",opciones:[`Draw calls`,`Triángulos`,`Geometrías y texturas en memoria`,`El tiempo exacto de GPU`],correctas:[0,1,2],explicacion:`El tiempo de GPU no está expuesto en WebGL estándar.`},{tipo:`unica`,enunciado:`¿Por qué el overdraw no aparece en las métricas?`,opciones:[`Porque es trabajo de píxeles, no de objetos`,`Porque three lo oculta`,`Porque solo pasa en móvil`,`Porque no existe`],correcta:0,explicacion:`Los contadores cuentan objetos y vértices, no píxeles sombreados.`}],recursos:[{titulo:`three: WebGLRenderer.info`,url:`https://threejs.org/docs/#api/en/renderers/WebGLRenderer.info`,nota:`Qué contiene exactamente el objeto con las cifras.`},{titulo:`R3F: useFrame`,url:`https://r3f.docs.pmnd.rs/api/hooks#useframe`,nota:`El bucle donde se mide y donde se anima.`},{titulo:`Chrome DevTools: rendering`,url:`https://developer.chrome.com/docs/devtools/rendering/`,nota:`Paint flashing y FPS meter: las dos herramientas que el panel no sustituye.`}],ejercicio:{reto:`Calcula la holgura de un frame: recibe los milisegundos que ha costado y devuelve cuántos sobran (o faltan, en negativo) respecto a 16,67 ms, redondeado a dos decimales.`,inicial:`export function holgura(ms: number): number {
  // TODO: 16,67 menos lo medido.
  return 0
}

console.log(holgura(12.4), holgura(21))`,solucion:`export function holgura(ms: number): number {
  return Number((16.67 - ms).toFixed(2))
}

console.log(holgura(12.4), holgura(21))`,pistas:[`La resta es 16,67 − ms: positiva significa que sobra tiempo.`,`Redondea solo el resultado.`,`Si sale negativa, el frame no cabe a 60 fps.`]}},{id:`12.2`,modulo:12,titulo:`Re-renders`,objetivo:`Distinguir el render de React del dibujado de la escena, y eliminar los renders que no cambian nada.`,nivel:`alto`,minutos:60,bloques:[{tipo:`parrafo`,texto:"React y la escena corren a relojes distintos. React renderiza cuando cambia el estado: reconcilia el árbol, compara props y, si algo difiere, escribe en los objetos de three. La escena se dibuja 60 veces por segundo pase lo que pase. Un `setState` no dibuja nada; lo que hace es reconstruir el árbol de componentes, y eso cuesta. La pregunta útil no es «cuántos frames voy», sino «cuántas veces se ha ejecutado este componente sin que nada de lo que pinta haya cambiado»."},{tipo:`demo`,id:`m12-renders`,titulo:`Dos cajas que giran igual, con cuentas distintas`},{tipo:`codigo`,lenguaje:`tsx`,titulo:`Animar sin re-renderizar`,codigo:`// Mal: un render de React por frame.
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
})`},{tipo:`destacado`,tono:`porque`,titulo:"Por qué `useFrame` es más barato que un estado",texto:"Cambiar estado dispara reconciliación: React vuelve a ejecutar el componente, compara el árbol y decide qué propiedades de three actualizar. Escribir `ref.current.rotation.y` es una asignación a un número. En un frame a 60 Hz, la diferencia entre las dos es la diferencia entre 60 renders por segundo y cero."},{tipo:`lista`,items:[`Estado para lo que el usuario ve y cambia: selección, modo, valores de un formulario.`,"`ref` y `useFrame` para lo que se anima cada frame.","`memo` en componentes hijos con props estables; sin props cambiantes no se re-renderizan.","`useMemo` para geometrías, materiales y arrays que se recrearían en cada render.",`Coloca el estado lo más cerca posible de quien lo consume: arriba del todo, todo se re-renderiza.`]}],errores:[{sintoma:`La escena va a tirones cuando se mueve un deslizador.`,causa:`El valor del deslizador vive en el padre y re-renderiza medio árbol por cada píxel.`,arreglo:"Aísla el control en un componente propio o pasa el valor por `ref` al `useFrame`."},{sintoma:"`memo` no evita los renders.",causa:`Se le pasa una prop nueva en cada render (un objeto, un array o una función inline).`,arreglo:`Memoriza esa prop o sácala fuera del componente.`},{sintoma:`La geometría se recrea cada vez que cambia cualquier cosa.`,causa:"Se instancia con `new` en el cuerpo del componente.",arreglo:"Envuélvela en `useMemo` con sus dependencias reales."}],quiz:[{tipo:`unica`,enunciado:`¿Cuántas veces se dibuja la escena por segundo si React no re-renderiza nunca?`,opciones:[`Sesenta, el bucle sigue`,`Cero`,`Una`,`Depende del estado`],correcta:0,explicacion:`El dibujado lo dispara R3F en cada frame, no React.`},{tipo:`verdadero-falso`,enunciado:"Cambiar un `ref` provoca un render de React.",correcta:!1,explicacion:`Un ref es una caja mutable: escribir dentro no avisa a React.`},{tipo:`multiple`,enunciado:`¿Qué evita renders innecesarios?`,opciones:["`memo` con props estables","Animar con `useFrame`","`useMemo` para objetos creados en el render","Llamar a `setState` en cada frame"],correctas:[0,1,2],explicacion:"`setState` por frame es justo lo que hay que evitar."},{tipo:`unica`,enunciado:"¿Cuándo un `memo` deja de servir?",opciones:[`Cuando recibe props nuevas en cada render`,`Cuando el componente no tiene props`,"Cuando usa `useFrame`","Cuando devuelve `null`"],correcta:0,explicacion:`La comparación superficial falla si la prop cambia de identidad.`}],recursos:[{titulo:`React: memo`,url:`https://react.dev/reference/react/memo`,nota:`Cuándo ayuda de verdad y cuándo es ruido.`},{titulo:`R3F: scaling performance`,url:`https://r3f.docs.pmnd.rs/advanced/scaling-performance`,nota:`La guía oficial de rendimiento de React Three Fiber.`},{titulo:`React: useMemo`,url:`https://react.dev/reference/react/useMemo`,nota:`Para objetos caros que no deben recrearse.`}],ejercicio:{reto:`Cuenta los renders de un árbol: recibe cuántas veces cambia el padre, cuántos hijos tiene y si están memorizados, y devuelve el total de ejecuciones de componentes.`,inicial:`export function renders(cambios: number, hijos: number, memo: boolean): number {
  // TODO: el padre siempre; los hijos solo si no hay memo.
  return 0
}

console.log(renders(10, 3, false), renders(10, 3, true))`,solucion:`export function renders(cambios: number, hijos: number, memo: boolean): number {
  const porCambio = memo ? 1 : 1 + hijos
  return cambios * porCambio
}

console.log(renders(10, 3, false), renders(10, 3, true))`,pistas:[`Cada cambio ejecuta el padre una vez.`,"Sin `memo`, cada hijo se ejecuta también una vez por cambio.",`Multiplica el coste de un cambio por el número de cambios.`]}},{id:`12.3`,modulo:12,titulo:`Instancing`,objetivo:"Reducir miles de objetos a un puñado de llamadas de dibujado con `InstancedMesh` y `BatchedMesh`.",nivel:`alto`,minutos:60,bloques:[{tipo:`parrafo`,texto:"Cada malla de la escena es una llamada de dibujado: la CPU prepara el estado, enlaza buffers y le dice a la GPU «dibuja esto». Con cien objetos no se nota; con diez mil, la CPU se pasa el frame entero preparando llamadas y no le queda tiempo para nada más. `InstancedMesh` guarda todas las copias de una geometría en un solo búfer y las dibuja de golpe. `BatchedMesh` hace lo mismo pero admite varias geometrías distintas en la misma llamada."},{tipo:`demo`,id:`m12-instancing`,titulo:`250, 1 000, 4 000 y 10 000 objetos, tres estrategias`},{tipo:`codigo`,lenguaje:`ts`,titulo:`Las dos APIs, sin misterio`,codigo:`// 1. Una geometría, muchas copias.
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

escena.add(lote)`},{tipo:`tabla`,cabecera:[`Estrategia`,`Draw calls`,`Geometrías distintas`,`Cuándo`],filas:[[`Mallas sueltas`,`Una por objeto`,`Todas`,`Pocos objetos o cada uno único`],["`InstancedMesh`",`Una por geometría`,`No (una sola)`,`Multitudes iguales: árboles, balas, partículas`],["`BatchedMesh`",`Una en total`,`Sí`,`Multitudes variadas: rocas, muebles, escombros`]]},{tipo:`destacado`,tono:`ojo`,titulo:`Instanciar no ahorra memoria`,texto:`Los vértices siguen en la GPU y las matrices de cada instancia ocupan su sitio. Lo que se ahorra es trabajo de CPU: preparar el estado y enviar la llamada. Si el cuello de botella es el relleno de píxeles o la resolución, instanciar no arregla nada. Es una optimización de CPU, y conviene saber qué está sufriendo antes de aplicarla.`},{tipo:`lista`,items:[`Usa instancing cuando el mismo objeto se repite decenas o cientos de veces.`,"Cada instancia necesita su matriz: `setMatrixAt` y `needsUpdate = true`.","Cambiar el color por instancia se hace con `setColorAt`, no con un material por objeto.","Las instancias no se pueden animar con `useFrame` por objeto: se mueve la matriz.","En R3F, `<instancedMesh args={[geometria, material, cantidad]} />` es la vía corta."]}],errores:[{sintoma:`Las instancias aparecen todas en el mismo sitio.`,causa:"No se escribió ninguna matriz o falta `instanceMatrix.needsUpdate`.",arreglo:"Recorre las instancias con `setMatrixAt` y marca el búfer como sucio."},{sintoma:"`BatchedMesh` lanza «Reserved space request exceeds the maximum buffer size».",causa:`El presupuesto de vértices o de índices es menor que la suma de las geometrías.`,arreglo:`Suma los vértices e índices de todas las geometrías antes de construir el lote.`},{sintoma:`Al cambiar la cantidad de objetos, la escena parpadea o se queda a medias.`,causa:`El búfer de instancias se dimensiona al construirse y no crece.`,arreglo:"Reconstruye el `InstancedMesh` cuando cambie el número máximo."}],quiz:[{tipo:`unica`,enunciado:"¿Qué ahorra `InstancedMesh`?",opciones:[`Llamadas de dibujado`,`Vértices en GPU`,`Texturas`,`Píxeles sombreados`],correcta:0,explicacion:`Los vértices siguen ahí; se reduce el trabajo de CPU.`},{tipo:`verdadero-falso`,enunciado:"`BatchedMesh` admite varias geometrías distintas en una sola llamada.",correcta:!0,explicacion:"Es su diferencia principal frente a `InstancedMesh`."},{tipo:`multiple`,enunciado:`¿Qué hay que hacer al usar instancing?`,opciones:[`Escribir una matriz por instancia`,"Marcar `instanceMatrix.needsUpdate`",`Dimensionar el búfer al máximo previsto`,`Crear un material por instancia`],correctas:[0,1,2],explicacion:`El material es único y compartido.`},{tipo:`unica`,enunciado:`¿Cuándo NO conviene instanciar?`,opciones:[`Cuando el límite es el relleno de píxeles`,`Cuando hay miles de objetos iguales`,`Cuando hay pocas geometrías`,`Cuando los objetos comparten material`],correcta:0,explicacion:`Ese coste no depende del número de llamadas.`}],recursos:[{titulo:`three: InstancedMesh`,url:`https://threejs.org/docs/#api/en/objects/InstancedMesh`,nota:`Matrices, colores por instancia y límites.`},{titulo:`three: BatchedMesh`,url:`https://threejs.org/docs/#api/en/objects/BatchedMesh`,nota:`Presupuesto de vértices e índices, y cuándo usarlo.`},{titulo:`Ejemplo oficial de instancing`,url:`https://threejs.org/examples/?q=instancing`,nota:`Comparación directa con mallas sueltas.`}],ejercicio:{reto:`Calcula cuántas llamadas de dibujado hace una escena: recibe el total de objetos, el número de geometrías distintas y la estrategia, y devuelve el número de draw calls.`,inicial:`type Estrategia = 'mallas' | 'instanciado' | 'batched'

export function llamadas(total: number, geometrias: number, estrategia: Estrategia): number {
  // TODO: mallas = una por objeto; instanciado = una por geometría; batched = 1.
  return 0
}

console.log(llamadas(10000, 4, 'mallas'), llamadas(10000, 4, 'instanciado'))`,solucion:`type Estrategia = 'mallas' | 'instanciado' | 'batched'

export function llamadas(total: number, geometrias: number, estrategia: Estrategia): number {
  if (total === 0) return 0
  if (estrategia === 'mallas') return total
  if (estrategia === 'instanciado') return geometrias
  return 1
}

console.log(llamadas(10000, 4, 'mallas'), llamadas(10000, 4, 'instanciado'))`,pistas:[`Con cero objetos no se dibuja nada.`,`En modo instanciado hay una llamada por geometría distinta.`,`El lote agrupado siempre es una sola llamada.`]}},{id:`12.4`,modulo:12,titulo:`LOD y culling`,objetivo:`Elegir qué se dibuja según la distancia y la posición, y distinguir el culling automático del que hay que programar.`,nivel:`alto`,minutos:50,bloques:[{tipo:`parrafo`,texto:"El frustum culling ya viene puesto: three descarta lo que queda fuera de la cámara comparando la esfera envolvente de cada objeto con el volumen de visión. No hay que programarlo, solo no estorbarlo. El nivel de detalle es otra cosa: el objeto está en pantalla, pero a treinta metros ocupa diez píxeles, así que no necesita la misma geometría que a dos metros. `LOD` de three y `Detailed` de drei hacen ese cambio por distancia."},{tipo:`demo`,id:`m12-lod`,titulo:`Bosque con LOD y culling conmutables`},{tipo:`codigo`,lenguaje:`tsx`,titulo:`Tres niveles y un descarte`,codigo:`import { Detailed } from '@react-three/drei'

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
<mesh frustumCulled={false}>…</mesh>   // solo para depurar`},{tipo:`tabla`,cabecera:[`Técnica`,`Decide`,`Coste`,`Cuándo usarla`],filas:[[`Frustum culling`,`Si está en pantalla`,`Automático`,`Siempre`],[`LOD`,`Cuánta geometría`,`Comparación por distancia`,`Objetos repetidos a varias distancias`],[`Culling por distancia`,`Si se dibuja`,`Una comprobación tuya`,`Multitudes enormes`],[`Oclusión`,`Si algo tapa al objeto`,`Consulta a la GPU`,`Escenas urbanas densas`]]},{tipo:`destacado`,tono:`truco`,titulo:`El LOD se mide en píxeles, no en metros`,texto:"Las distancias de `Detailed` son metros del mundo, pero lo que importa es el tamaño en pantalla. Un árbol a treinta metros en un móvil ocupa menos píxeles que el mismo árbol a treinta metros en un monitor 4K. Si tu proyecto se va a ver en pantallas muy distintas, ajusta los umbrales por `camera.aspect` o por tamaño de la ventana, o acepta que el LOD es una aproximación."},{tipo:`lista`,items:[`No desactives el culling sin motivo: es gratis y funciona.`,`El LOD cambia triángulos, no draw calls: son dos presupuestos distintos.`,`Cada nivel extra es un objeto más en el árbol, aunque no se dibuje.`,`Un LOD mal calibrado se nota como un salto visible al acercarse.`,`Los objetos transparentes y los que proyectan sombras merecen más cuidado.`]}],errores:[{sintoma:`El bosque entero se dibuja siempre, gires como gires.`,causa:"Alguna malla tiene `frustumCulled={false}`.",arreglo:`Quita esa propiedad de las mallas que no estés depurando.`},{sintoma:"`Detailed` no cambia de nivel nunca.",causa:`Las distancias están en el orden equivocado o la cámara no se mueve.`,arreglo:`El primer hijo es el nivel cercano; las distancias van de menor a mayor.`},{sintoma:`Los árboles lejanos aparecen y desaparecen de golpe.`,causa:`Histéresis desactivada o umbrales demasiado juntos.`,arreglo:"Usa `hysteresis` o separa más las distancias."}],quiz:[{tipo:`unica`,enunciado:`¿Qué hace el frustum culling?`,opciones:[`Descartar lo que queda fuera de la cámara`,`Reducir los segmentos de la geometría`,`Comprimir texturas`,`Unir draw calls`],correcta:0,explicacion:`Compara la esfera envolvente con el volumen de visión.`},{tipo:`verdadero-falso`,enunciado:`El LOD reduce el número de draw calls.`,correcta:!1,explicacion:`Cambia la geometría que se dibuja, no cuántas llamadas hay.`},{tipo:`multiple`,enunciado:`¿Qué técnicas deciden no dibujar algo?`,opciones:[`Frustum culling`,`Culling por distancia`,`Oclusión`,`LOD`],correctas:[0,1,2],explicacion:`El LOD sigue dibujando el objeto, con menos detalle.`},{tipo:`unica`,enunciado:"¿Cuál es el primer hijo de un `LOD`?",opciones:[`El nivel de más detalle, el más cercano`,`El más lejano`,`El que menos pesa`,`Da igual el orden`],correcta:0,explicacion:`Las distancias se evalúan de menor a mayor.`}],recursos:[{titulo:`three: LOD`,url:`https://threejs.org/docs/#api/en/objects/LOD`,nota:"La implementación que envuelve `Detailed`."},{titulo:`drei: Detailed`,url:`https://drei.pmnd.rs/?path=/docs/abstractions-detailed--docs`,nota:`Props y ejemplo de uso con JSX.`},{titulo:`three: frustum culling`,url:`https://threejs.org/docs/#api/en/core/Object3D.frustumCulled`,nota:`Qué significa exactamente la propiedad y cuándo desactivarla.`}],ejercicio:{reto:`Elige el nivel de detalle: recibe un array de distancias ordenado y la distancia actual, y devuelve el índice del nivel que toca.`,inicial:`export function nivel(distancias: number[], distancia: number): number {
  // TODO: el último umbral que no supere la distancia.
  return 0
}

console.log(nivel([0, 15, 30], 22), nivel([0, 15, 30], 4))`,solucion:`export function nivel(distancias: number[], distancia: number): number {
  let elegido = 0
  for (let i = 0; i < distancias.length; i += 1) {
    if (distancia >= distancias[i]) elegido = i
  }
  return elegido
}

console.log(nivel([0, 15, 30], 22), nivel([0, 15, 30], 4))`,pistas:[`Recorre los umbrales y quédate con el último que se cumpla.`,`Con distancia 22 y umbrales 0, 15 y 30, toca el índice 1.`,`No hace falta ordenar: el array ya viene ordenado.`]}},{id:`12.5`,modulo:12,titulo:`Presupuesto móvil`,objetivo:`Fijar un presupuesto por dispositivo y degradar en el orden correcto hasta cumplirlo.`,nivel:`alto`,minutos:55,bloques:[{tipo:`parrafo`,texto:"El mismo proyecto que va sobrado en un portátil puede ir a 22 fps en un móvil de gama media, y no por la escena: por los píxeles. Una pantalla de móvil tiene más densidad que la mayoría de los monitores, y el `dpr` por defecto de R3F llega a 2. Eso son cuatro veces los píxeles de un `dpr` de 1. Antes de tocar la escena, toca la resolución, luego las sombras y, al final, el postprocesado. En ese orden, porque es el orden en que cada palanca devuelve más fps por unidad de esfuerzo."},{tipo:`demo`,id:`m12-movil`,titulo:`Degradar dpr, sombras y postprocesado en vivo`},{tipo:`codigo`,lenguaje:`tsx`,titulo:`Degradar desde React`,codigo:`function Resolucion({ dpr }: { dpr: number }) {
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
const dpr = Math.min(window.devicePixelRatio, 2)`},{tipo:`tabla`,cabecera:[`Palanca`,`Qué quita`,`Fps que devuelve`,`Coste visual`],filas:[["`dpr` a 1 o 0,75",`Píxeles`,`El mayor`,`Bordes menos finos`],[`Sombras`,`Una pasada por luz`,`Alto`,`Pérdida de profundidad`],[`Postprocesado`,`Pases de pantalla completa`,`Medio-alto`,`Menos brillo y ambiente`],[`Menos objetos`,`Draw calls`,`Depende`,`Menos mundo`],[`Texturas más pequeñas`,`Memoria y ancho de banda`,`Bajo en escritorio`,`Detalle de cerca`]]},{tipo:`destacado`,tono:`ojo`,titulo:`El emulador de móvil miente`,texto:"Redimensionar la ventana cambia el tamaño del lienzo, pero no la GPU. Un iPhone de verdad tiene menos memoria, menos ancho de banda y un límite térmico que aparece a los dos minutos. La única medición que vale es en el dispositivo, con la escena real y durante varios minutos seguidos. Si solo puedes probar en escritorio, mide con `dpr` alto y resolución alta: al menos verás la tendencia."},{tipo:`lista`,items:[`Fija el presupuesto antes de modelar: 60 fps en escritorio, 30 estables en móvil.`,`Degrada por pasos y comprueba el resultado de cada uno.`,`Guarda el modo elegido: repetir la detección en cada visita gasta batería.`,`Un móvil caliente baja de vueltas: deja margen sobre el objetivo.`,`Si el usuario pidió movimiento reducido, casi siempre quiere menos efectos, no más.`]}],errores:[{sintoma:`El lienzo se ve borroso en un monitor de alta densidad.`,causa:"El `dpr` se ha limitado a 1 para todos.",arreglo:"Limita por dispositivo: `Math.min(devicePixelRatio, 2)` y baja solo en móvil."},{sintoma:`Al desactivar el postprocesado la pantalla se queda en negro un instante.`,causa:"El composer se reconstruye sin `key` y reutiliza pases con otra estructura.",arreglo:"Cambia la `key` al alternar entre encendido y apagado."},{sintoma:`Las sombras desaparecen y no vuelven.`,causa:"Se desactivó `shadowMap` del renderer en lugar de la luz.",arreglo:"Alterna `castShadow` en la luz; el renderer se configura al crear el canvas."}],quiz:[{tipo:`unica`,enunciado:`¿Qué palanca devuelve más fps en móvil?`,opciones:["Bajar el `dpr`",`Quitar una luz`,`Reducir texturas`,`Unir materiales`],correcta:0,explicacion:`Los píxeles son el coste dominante en pantallas pequeñas y densas.`},{tipo:`verdadero-falso`,enunciado:`El emulador de móvil del navegador mide el rendimiento real del dispositivo.`,correcta:!1,explicacion:`Cambia el tamaño, no la GPU ni el límite térmico.`},{tipo:`multiple`,enunciado:`¿En qué orden conviene degradar?`,opciones:[`Resolución`,`Sombras`,`Postprocesado`,`Número de objetos de la escena`],correctas:[0,1,2],explicacion:`El contenido es lo último que se toca: es lo que da sentido a la escena.`},{tipo:`unica`,enunciado:"¿Qué hace `setDpr`?",opciones:[`Cambia la densidad de píxeles del renderer`,`Cambia el tamaño del canvas en CSS`,`Recarga la escena`,`Reinicia el bucle de render`],correcta:0,explicacion:`El tamaño del lienzo en CSS es otra cosa.`}],recursos:[{titulo:"R3F: Canvas y `dpr`",url:`https://r3f.docs.pmnd.rs/api/canvas`,nota:`Cómo se elige la densidad de píxeles y cómo cambiarla en caliente.`},{titulo:`web.dev: rendimiento en móvil`,url:`https://web.dev/articles/optimizing-content-efficiency`,nota:`Contexto general del presupuesto en dispositivos móviles.`},{titulo:`three: WebGLRenderer.setPixelRatio`,url:`https://threejs.org/docs/#api/en/renderers/WebGLRenderer.setPixelRatio`,nota:"La llamada que hay detrás de `setDpr`."}],ejercicio:{reto:"Calcula los píxeles que dibuja el renderer: recibe ancho y alto en CSS y el `dpr`, y devuelve el total redondeado a miles.",inicial:`export function pixeles(ancho: number, alto: number, dpr: number): number {
  // TODO: el área crece con el cuadrado del dpr.
  return 0
}

console.log(pixeles(390, 844, 1), pixeles(390, 844, 3))`,solucion:`export function pixeles(ancho: number, alto: number, dpr: number): number {
  const total = ancho * dpr * alto * dpr
  return Math.round(total / 1000) * 1000
}

console.log(pixeles(390, 844, 1), pixeles(390, 844, 3))`,pistas:[`Multiplica ancho y alto por el dpr cada uno.`,`Pasar de dpr 1 a 3 multiplica los píxeles por nueve.`,`Redondea a miles para que la cifra se lea.`]}},{id:`12.6`,modulo:12,titulo:"Memoria y `dispose`",objetivo:"Liberar geometrías, materiales y texturas propias, y leer en `gl.info.memory` si de verdad se han liberado.",nivel:`alto`,minutos:55,bloques:[{tipo:`parrafo`,texto:"La memoria de la GPU no la recoge el recolector de basura. Cuando una malla desaparece de la escena, JavaScript puede olvidarse de ella, pero el búfer de vértices y la textura siguen ocupando sitio hasta que alguien llama a `dispose()`. R3F libera lo que ha creado él a partir del JSX: si escribes `<boxGeometry />`, se limpia al desmontar. Si escribes `new BoxGeometry()` dentro de un `useMemo`, esa geometría es tuya y también es tu responsabilidad."},{tipo:`demo`,id:`m12-memoria`,titulo:`Crear y destruir con y sin liberación`},{tipo:`codigo`,lenguaje:`tsx`,titulo:`Crear a mano, liberar a mano`,codigo:`const recursos = useMemo(() => {
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
gl.info.memory.textures`},{tipo:`tabla`,cabecera:[`Recurso`,"Tiene `dispose`",`Lo libera R3F`,`Nota`],filas:[[`Geometría`,`Sí`,`Solo si la creó él`,"Cada `new` es tuya"],[`Material`,`Sí`,`Solo si lo creó él`,`No libera sus texturas`],[`Textura`,`Sí`,`Solo si la creó él`,`Compartida entre materiales`],[`Render target`,`Sí`,`No`,"`useFBO` lo gestiona; a mano, tú"],[`Escena clonada`,`No`,`No`,`Comparte geometrías y materiales con el original`]]},{tipo:`destacado`,tono:`porque`,titulo:`Una fuga no se nota hasta que se nota`,texto:"Cuarenta recursos huidos son irrelevantes. El problema aparece cuando una vista se abre y se cierra cien veces en una sesión larga: cada visita deja su rastro y llega un momento en que el contexto WebGL se queda sin memoria y el navegador mata el lienzo. La comprobación es barata: abre y cierra la vista veinte veces y mira `gl.info.memory`. Si sube y no baja, hay una fuga."},{tipo:`lista`,items:["Todo lo que creas con `new` lo liberas tú, en el `return` de un `useEffect`.","Libera también las texturas: `material.dispose()` no las toca.",`No liberes recursos compartidos: si dos mallas usan la misma geometría, se libera una vez.`,"`gl.info.memory` cuenta lo subido a GPU; es la cifra que se acerca a la realidad.",`Antes de añadir cachés, comprueba que no estás guardando copias que nadie libera.`]}],errores:[{sintoma:`El contador de geometrías sube y no baja nunca.`,causa:"Se crean recursos con `new` y no se llama a `dispose`.",arreglo:`Devuelve una función de limpieza que libere geometría, material y textura.`},{sintoma:`Al cambiar de vista, la GPU se queda sin memoria y el lienzo se pierde.`,causa:`Fuga acumulada de texturas o render targets.`,arreglo:`Libera en el desmontaje y comprueba con el contador tras abrir y cerrar varias veces.`},{sintoma:`Al liberar, otra parte de la escena se queda en negro.`,causa:`Se liberó un recurso compartido que otra malla seguía usando.`,arreglo:`Libera solo recursos propios o usa un contador de referencias.`}],quiz:[{tipo:`unica`,enunciado:"¿Quién libera una geometría creada con `new` dentro de un componente?",opciones:["Tú, con `dispose`",`El recolector de basura`,`R3F automáticamente`,`El navegador`],correcta:0,explicacion:`La memoria de GPU no la gestiona el GC.`},{tipo:`verdadero-falso`,enunciado:"`material.dispose()` libera también sus texturas.",correcta:!1,explicacion:`Las texturas pueden compartirse; hay que liberarlas aparte.`},{tipo:`multiple`,enunciado:`¿Qué recursos hay que liberar a mano?`,opciones:["Geometrías creadas con `new`","Materiales creados con `new`","Texturas creadas con `new`",`Los que crea R3F desde JSX`],correctas:[0,1,2],explicacion:`R3F ya se encarga de los que ha creado él.`},{tipo:`unica`,enunciado:"¿Qué mide `gl.info.memory.geometries`?",opciones:[`Geometrías subidas a la GPU`,`Geometrías en el estado de React`,`Triángulos dibujados`,`Materiales compilados`],correcta:0,explicacion:`Es memoria del renderer, no del árbol de React.`}],recursos:[{titulo:`three: BufferGeometry.dispose`,url:`https://threejs.org/docs/#api/en/core/BufferGeometry.dispose`,nota:`Qué libera exactamente y cuándo llamarlo.`},{titulo:`three: Material.dispose`,url:`https://threejs.org/docs/#api/en/materials/Material.dispose`,nota:`Advertencia sobre texturas compartidas.`},{titulo:`R3F: dispose`,url:`https://r3f.docs.pmnd.rs/api/objects#dispose`,nota:"La prop `dispose` y el comportamiento por defecto de R3F."}],ejercicio:{reto:`Calcula cuántos recursos sobreviven: recibe cuántas vistas se abren, cuántos recursos crea cada una y cuántos se liberan al cerrarse, y devuelve los que quedan vivos.`,inicial:`export function vivos(vistas: number, porVista: number, liberados: number): number {
  // TODO: cada vista deja los que no se liberan.
  return 0
}

console.log(vivos(20, 40, 40), vivos(20, 40, 0))`,solucion:`export function vivos(vistas: number, porVista: number, liberados: number): number {
  const fuga = Math.max(0, porVista - liberados)
  return vistas * fuga
}

console.log(vivos(20, 40, 40), vivos(20, 40, 0))`,pistas:[`Lo que queda por vista es la diferencia entre creados y liberados.`,"No puede ser negativo: `Math.max(0, …)`.",`Multiplica por el número de visitas.`]}}]},{numero:13,titulo:`Estado y arquitectura`,descripcion:`Cuando la demo pasa a ser producto: una tienda global que no re-renderiza el mundo, carpetas con reglas, pantallas de carga que no parpadean, sonido colocado en el espacio, fallos que no se llevan la página por delante y una escena que se puede usar sin ratón.`,lecciones:[{id:`13.1`,modulo:13,titulo:`Zustand`,objetivo:`Compartir estado entre la interfaz y la escena sin re-renderizar componentes que no lo necesitan.`,nivel:`medio`,minutos:55,bloques:[{tipo:`parrafo`,texto:"El problema de una escena con interfaz no es dónde guardar los datos, es cuántos componentes se enteran de cada cambio. Con `useState` en el padre, mover un deslizador re-renderiza la lección entera. Con un contexto, pasa lo mismo: cualquier consumidor se re-renderiza cuando cambia el valor, aunque solo use un campo. Zustand es una caja fuera de React con suscripciones por selector: cada componente dice exactamente qué campo le interesa, y solo se despierta cuando ese campo cambia. Nada más."},{tipo:`demo`,id:`m13-zustand`,titulo:`Un cubo, una esfera y un anillo leyendo la misma tienda`},{tipo:`codigo`,lenguaje:`ts`,titulo:`Tienda, suscripción y lectura sin suscripción`,codigo:`import { create } from 'zustand'

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
}`},{tipo:`tabla`,cabecera:[`Dónde vive el estado`,`Quién se re-renderiza`,`Cuándo usarlo`],filas:[["`useState` local",`El componente y sus hijos`,`Un control que solo afecta a su demo`],[`Contexto`,`Todos los consumidores`,`Valores que casi nunca cambian: tema, idioma`],[`Zustand`,`Cada componente según su selector`,`Escena + interfaz + varias pantallas`],["`useRef`",`Nadie`,`Animación por frame y datos que no se pintan`]]},{tipo:`destacado`,tono:`porque`,titulo:"Por qué `getState()` dentro de `useFrame` es la combinación más barata",texto:"`useFrame` corre sesenta veces por segundo: si dentro de él se usara un hook de suscripción, se pagarían sesenta renders por segundo. `getState()` lee el valor actual sin registrar dependencia, así que el componente se monta una vez y el bucle lee lo que haya en ese instante. Es exactamente lo contrario de lo que hace falta en la interfaz, donde el valor debe pintarse. Dos ritmos, dos formas de leer."},{tipo:`lista`,items:["Cada selector devuelve un campo primitivo: comparar objetos con `===` provoca renders que no esperabas.","Si necesitas varias cosas, varios selectores; o `useShallow` cuando de verdad es un objeto.","Las acciones (`fijarColor`) se leen del estado y son estables: no cambian entre renders.","Nunca llames a `set` dentro del render: hazlo en eventos, efectos o `useFrame`.",`Guarda en la tienda lo que varias piezas comparten; lo demás, local.`]}],errores:[{sintoma:`Todos los componentes se re-renderizan al mover un deslizador.`,causa:`El componente padre se suscribe a la tienda y pasa valores por props.`,arreglo:`Que cada control y cada consumidor se suscriban por su cuenta.`},{sintoma:`El selector devuelve un objeto nuevo cada vez y hay bucles de renders.`,causa:"`useTienda((estado) => ({ a: estado.a, b: estado.b }))` crea un objeto distinto cada vez.",arreglo:"Usa dos selectores de campos primitivos o `useShallow`."},{sintoma:`Animando con la tienda, el framerate se hunde.`,causa:"El valor animado está en la tienda y se lee con un hook dentro de `useFrame`.",arreglo:"Lee con `getState()` o guarda el valor en un `ref`."}],quiz:[{tipo:`unica`,enunciado:`¿Qué determina que un componente se re-renderice con Zustand?`,opciones:[`El valor que devuelve su selector`,`El número de campos de la tienda`,`El tamaño del componente`,`La posición en el árbol`],correcta:0,explicacion:`Las suscripciones se comparan por el resultado del selector.`},{tipo:`verdadero-falso`,enunciado:`Cambiar un valor de la tienda re-renderiza todos los componentes que la importan.`,correcta:!1,explicacion:`Solo los que se suscriben al campo que ha cambiado.`},{tipo:`multiple`,enunciado:`¿Qué formas hay de leer una tienda de Zustand?`,opciones:[`Con un hook y un selector`,"Con `getState()` fuera del render","Suscribiéndose a mano con `subscribe`","Con `useState`"],correctas:[0,1,2],explicacion:"`useState` es de React y no conoce la tienda."},{tipo:`unica`,enunciado:`¿Qué selector provoca renders de más?`,opciones:[`Uno que devuelve un objeto nuevo en cada llamada`,`Uno que devuelve un número`,`Uno que devuelve un booleano`,`Uno que devuelve una función estable`],correcta:0,explicacion:`La comparación por identidad falla con objetos nuevos.`}],recursos:[{titulo:`Zustand: documentación`,url:`https://zustand.docs.pmnd.rs/getting-started/introduction`,nota:"Selectores, `useShallow` y suscripciones manuales."},{titulo:`Zustand: actualizaciones transitorias`,url:`https://zustand.docs.pmnd.rs/guides/prevent-rerenders-with-use-shallow`,nota:"El patrón de leer sin re-renderizar, que es el de `useFrame`."},{titulo:`R3F: gestión de estado`,url:`https://r3f.docs.pmnd.rs/getting-started/installation`,nota:`Contexto de R3F como proveedor de su propio estado interno.`}],ejercicio:{reto:"Escribe un selector que, dado el estado `{ color, altura, girando }`, devuelva solo si la pieza es «alta» (altura mayor o igual que 1,5). Debe devolver un booleano, no un objeto.",inicial:`type Estado = { color: string; altura: number; girando: boolean }

export function selectorAlta(estado: Estado): boolean {
  // TODO: un booleano, no un objeto.
  return false
}

console.log(selectorAlta({ color: '#fff', altura: 2, girando: true }))`,solucion:`type Estado = { color: string; altura: number; girando: boolean }

export function selectorAlta(estado: Estado): boolean {
  return estado.altura >= 1.5
}

console.log(selectorAlta({ color: '#fff', altura: 2, girando: true }))`,pistas:[`Un selector es una función del estado al valor que quieres escuchar.`,`Los booleanos se comparan por valor: no hay falsos positivos.`,`Devuelve la comparación, no un objeto con ella dentro.`]}},{id:`13.2`,modulo:13,titulo:`Estructura de un proyecto real`,objetivo:`Separar entrada, pantallas, escena y datos, con el sentido de los imports en una sola dirección.`,nivel:`medio`,minutos:45,bloques:[{tipo:`parrafo`,texto:`Un proyecto de R3F se estropea por dos sitios: la escena acaba importando la interfaz y la interfaz acaba creando objetos de three. Cuando eso pasa, cada cambio pequeño arrastra medio proyecto y ya no hay forma de reutilizar nada. La regla que lo evita es sencilla: cuatro capas, y las flechas van en un solo sentido. La entrada monta pantallas, las pantallas componen escena, la escena lee datos, y los datos no saben que existe nada de lo anterior.`},{tipo:`widget`,id:`m13-arquitectura`,titulo:`El mapa de capas, navegable`},{tipo:`codigo`,lenguaje:`ts`,titulo:`La carpeta, en cuatro líneas`,codigo:`src/
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
} as const`},{tipo:`destacado`,tono:`ojo`,titulo:`El import invertido`,texto:"Si `estado/tienda.ts` importa `three` para guardar un `Vector3`, ya no se puede probar sin WebGL ni reutilizar en el servidor. Si `tres/DemoCanvas.tsx` importa una pantalla, la escena depende de la navegación. El síntoma llega tarde: un ciclo de imports que solo se nota cuando el bundler devuelve `undefined` en tiempo de ejecución."},{tipo:`lista`,items:[`Las rutas de assets viven en un solo archivo: si mañana cambia la carpeta, se cambia una vez.`,`Un registro por módulo evita que dos personas editen el mismo archivo de demos.`,`La escena recibe datos por props o los lee de la tienda; nunca consulta la URL ni el router.`,"La persistencia (`localStorage`) se concentra en un módulo, no se reparte por componentes.","Los tipos compartidos van en un archivo aparte: `tipos.ts` no importa nada de nadie."]}],errores:[{sintoma:"El bundler avisa de un ciclo de imports y alguna constante llega `undefined`.",causa:`Dos capas se importan mutuamente.`,arreglo:`Mueve el tipo o la constante compartida a una capa inferior.`},{sintoma:`No hay manera de probar la lógica sin abrir un navegador.`,causa:`El módulo de estado importa three o R3F.`,arreglo:`Guarda números y cadenas en el estado; convierte a vectores en la escena.`},{sintoma:`Cambiar una ruta de assets rompe media web.`,causa:`Las rutas están escritas a mano en cada demo.`,arreglo:"Centralízalas en `rutas.ts` y usa `rutaAsset`."}],quiz:[{tipo:`unica`,enunciado:`¿Qué capa no debe importar three?`,opciones:[`Datos y estado`,`Escena`,`Pantallas`,`Entrada`],correcta:0,explicacion:`El estado debe poder existir sin WebGL.`},{tipo:`verdadero-falso`,enunciado:"Una pantalla puede crear objetos de three como `new Vector3()`.",correcta:!1,explicacion:`Eso es trabajo de la capa de escena.`},{tipo:`multiple`,enunciado:`¿Qué se gana con un registro por módulo?`,opciones:[`Menos conflictos al trabajar en paralelo`,`Cargas perezosas por demo`,`Un único lugar donde buscar cada id`,`Menos memoria en la GPU`],correctas:[0,1,2],explicacion:`La memoria depende de los recursos, no de cómo se registren.`},{tipo:`unica`,enunciado:"¿Dónde se resuelve la ruta de un `.glb`?",opciones:[`En un único módulo de rutas`,`En cada demo, a mano`,`En el HTML`,`En el router`],correcta:0,explicacion:"Una sola fuente de verdad para el `base` de Vite."}],recursos:[{titulo:`R3F: estructura de proyecto`,url:`https://r3f.docs.pmnd.rs/getting-started/installation`,nota:`Cómo organiza pmndrs sus propios ejemplos.`},{titulo:"Vite: `base` y assets",url:`https://vite.dev/guide/build.html#public-base-path`,nota:`Por qué una ruta absoluta se rompe en GitHub Pages.`},{titulo:`TypeScript: ciclos de imports`,url:`https://www.typescriptlang.org/docs/handbook/modules/reference.html`,nota:`Qué pasa con las constantes cuando dos módulos se importan entre sí.`}],ejercicio:{reto:"Detecta si un import va en sentido contrario: recibe el índice de la capa que importa y el de la importada (0 = entrada, 3 = datos) y devuelve `true` si el import está permitido.",inicial:`export function permitido(desde: number, hacia: number): boolean {
  // TODO: solo se puede importar de la propia capa o de una inferior.
  return true
}

console.log(permitido(2, 3), permitido(3, 1))`,solucion:`export function permitido(desde: number, hacia: number): boolean {
  return hacia >= desde
}

console.log(permitido(2, 3), permitido(3, 1))`,pistas:[`Los índices crecen hacia abajo: 0 es la entrada.`,`Importar de una capa inferior está bien.`,`Importar de una capa superior es el error.`]}},{id:`13.3`,modulo:13,titulo:`Carga de assets y pantallas de carga`,objetivo:"Usar `useProgress`, `Suspense` y la precarga para que la espera se sienta corta y no parpadee.",nivel:`medio`,minutos:50,bloques:[{tipo:`parrafo`,texto:"Un `.glb` de veinte megas tarda lo que tarda, y no hay truco que lo acelere. Lo que sí se controla es lo que ocurre mientras llega: si la pantalla está vacía, la persona piensa que la web está rota. `Suspense` resuelve la mecánica (no se monta lo que aún no tiene datos) y `useProgress` da las cifras, porque todos los cargadores de three comparten el mismo gestor: `DefaultLoadingManager`. La pantalla se retira cuando el gestor termina y ha pasado un tiempo mínimo, para que no aparezca y desaparezca en un parpadeo."},{tipo:`demo`,id:`m13-carga`,titulo:`Tres modelos, una barra y un tiempo mínimo`},{tipo:`codigo`,lenguaje:`tsx`,titulo:`El esqueleto de una pantalla de carga`,codigo:`import { Suspense } from 'react'
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
</Canvas>`},{tipo:`tabla`,cabecera:[`Concepto`,`Qué hace`,`Qué no hace`],filas:[["`Suspense`",`Retiene el subárbol hasta que hay datos`,`No muestra nada por sí solo`],["`useProgress`",`Porcentaje y archivo en vuelo`,"No conoce descargas hechas con `fetch`"],["`preload`",`Lanza la descarga antes de montar`,`No evita esperar si el archivo es grande`],["Caché de `useGLTF`",`La segunda vez es instantánea`,`No crece sola: hay que vaciarla a mano`]]},{tipo:`destacado`,tono:`truco`,titulo:`Tiempo mínimo, no tiempo máximo`,texto:`Retrasar la retirada de la pantalla 300 o 400 ms evita el destello cuando todo está en caché. Pero un tiempo mínimo solo se pone si el contenido tarda: si tu pantalla de carga dura dos segundos porque lo has decidido tú, la estás usando para tapar una escena lenta. Con un límite inferior pequeño basta; el resto del trabajo es optimizar el peso.`},{tipo:`lista`,items:["Carga siempre con los cargadores de three (`useGLTF`, `useTexture`, `HDRLoader`): comparten gestor.",`Reserva el hueco: un contenedor con la altura final evita el salto de layout.`,`Precarga lo que sabes que viene en la siguiente lección o en el siguiente paso.`,`Muestra el nombre del archivo solo si es útil; a la persona no le dice nada un hash.`,`Si el progreso se queda en 0 y no avanza, hay una descarga fuera del gestor.`]}],errores:[{sintoma:`La pantalla de carga se queda al 0 % para siempre.`,causa:"El asset se descarga con `fetch` e se pasa a `useLoader` cuando ya está.",arreglo:`Deja que el cargador haga la descarga para que el gestor la cuente.`},{sintoma:`La escena aparece vacía y luego salta de golpe.`,causa:"No hay `Suspense` y el componente se monta sin geometría.",arreglo:"Envuelve el contenido que carga en un `Suspense`."},{sintoma:`Al volver a la lección ya no se ve la pantalla de carga.`,causa:"`useGLTF` guarda el resultado en caché.",arreglo:"Es lo deseado. Para probar la pantalla, vacía la caché con `useGLTF.clear`."}],quiz:[{tipo:`unica`,enunciado:"¿Qué hace `Suspense` con un componente que aún no tiene su modelo?",opciones:[`No lo monta hasta que los datos están`,`Lo monta con una caja de prueba`,`Lo monta sin geometría`,`Cancela la descarga`],correcta:0,explicacion:`El subárbol espera; el fallback sustituye al contenido.`},{tipo:`verdadero-falso`,enunciado:"`useProgress` cuenta también las descargas hechas con `fetch`.",correcta:!1,explicacion:`Solo ve lo que pasa por el gestor de carga de three.`},{tipo:`multiple`,enunciado:`¿Qué mejora la sensación de espera?`,opciones:[`Una barra con el porcentaje`,`Reservar el hueco del contenido`,`Precargar los assets siguientes`,`Alargar la pantalla cinco segundos`],correctas:[0,1,2],explicacion:`Alargarla sin motivo solo hace la espera más larga.`},{tipo:`unica`,enunciado:`¿Por qué la segunda visita carga al instante?`,opciones:["Por la caché de `useGLTF`",`Porque el modelo se ha reducido`,`Porque el navegador desactiva Draco`,"Porque ya no hay `Suspense`"],correcta:0,explicacion:`El resultado resuelto se guarda por URL.`}],recursos:[{titulo:"drei: `useProgress`",url:`https://drei.pmnd.rs/?path=/docs/loaders-useprogress--docs`,nota:`Los campos que devuelve y su origen.`},{titulo:"three: `LoadingManager`",url:`https://threejs.org/docs/#api/en/loaders/managers/LoadingManager`,nota:"El gestor compartido que hay detrás de `useProgress`."},{titulo:"React: `Suspense`",url:`https://react.dev/reference/react/Suspense`,nota:`Qué significa exactamente «suspender» un componente.`}],ejercicio:{reto:`Traduce bytes descargados a porcentaje entero: recibe descargados y totales, y devuelve 0–100 sin pasarse de 100 ni bajar de 0.`,inicial:`export function porcentaje(descargados: number, total: number): number {
  // TODO: redondeado y acotado.
  return 0
}

console.log(porcentaje(512, 2048), porcentaje(3000, 2048))`,solucion:`export function porcentaje(descargados: number, total: number): number {
  if (total <= 0) return 0
  return Math.min(100, Math.round((descargados / total) * 100))
}

console.log(porcentaje(512, 2048), porcentaje(3000, 2048))`,pistas:[`Si el total es cero, no hay porcentaje que calcular.`,`Redondea después de dividir.`,"Acota el resultado a 100 con `Math.min`."]}},{id:`13.4`,modulo:13,titulo:`Audio posicional`,objetivo:`Colocar sonido en el espacio 3D, entender que el oyente es la cámara y arrancarlo con un gesto del usuario.`,nivel:`medio`,minutos:50,bloques:[{tipo:`parrafo`,texto:"Un sonido normal suena igual a la derecha que a la izquierda. Uno posicional tiene coordenadas: se atenúa con la distancia al oyente y se reparte entre los dos oídos según de dónde venga. En three, `PositionalAudio` es un objeto de escena más, como una malla: se coloca, se mueve y se le cuelga un búfer. El oyente no lo eliges: es la cámara. Por eso orbitar alrededor de la fuente cambia el volumen sin tocar el volumen."},{tipo:`demo`,id:`m13-audio`,titulo:`Una fuente entre cuatro pilares`},{tipo:`codigo`,lenguaje:`tsx`,titulo:`Colocar y arrancar`,codigo:`import { PositionalAudio } from '@react-three/drei'

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
}`},{tipo:`tabla`,cabecera:[`Tipo`,`Dónde suena`,`Cuándo`],filas:[["`<audio>` HTML",`Igual en los dos oídos`,`Música de fondo, avisos de interfaz`],["`THREE.Audio`",`En todas partes, sin posición`,`Ambiente global y locución`],["`THREE.PositionalAudio`",`Colocado y atenuado por distancia`,`Motores, pasos, máquinas, naturaleza`]]},{tipo:`destacado`,tono:`ojo`,titulo:`La política de reproducción automática no es un bug`,texto:"Ningún navegador deja sonar audio sin una interacción previa. Un `play()` en el montaje no falla con un error visible: devuelve una promesa que no se cumple y el contexto se queda suspendido. Por eso hay que arrancar desde un `onClick` y llamar a `resume()` antes de `play()`. Si además el usuario lleva auriculares, el efecto envolvente se nota el triple: prueba la demo con ellos."},{tipo:`lista`,items:["Un solo `AudioListener` por escena: dos oyentes dan resultados incoherentes.","La atenuación se ajusta con `distance` (distancia de referencia) y `rolloff`.",`Los bucles necesitan un número entero de ciclos o se oye el corte.`,"En móvil, el audio se corta al bloquear: escucha `visibilitychange` y pausa.",`Comprime a mono 22 kHz para efectos cortos: pesa la mitad y no se nota.`]}],errores:[{sintoma:`No suena nada y no hay ningún error.`,causa:`El contexto de audio está suspendido por falta de gesto del usuario.`,arreglo:"Arranca desde un clic y llama a `context.resume()` antes de `play()`."},{sintoma:`El sonido no se atenúa al alejarse.`,causa:"Se está usando `THREE.Audio` en vez de `PositionalAudio`, o no hay listener.",arreglo:"Comprueba el componente y que la cámara tenga su `AudioListener`."},{sintoma:`El bucle hace un chasquido cada vez que reinicia.`,causa:`El archivo no empieza y acaba en el mismo punto de la onda.`,arreglo:`Recorta el bucle en un cruce por cero o usa un número entero de ciclos.`}],quiz:[{tipo:`unica`,enunciado:`¿Quién es el oyente en una escena de R3F?`,opciones:[`La cámara`,`El origen de coordenadas`,`La primera luz`,`El centro de la escena`],correcta:0,explicacion:"drei cuelga el `AudioListener` de la cámara."},{tipo:`verdadero-falso`,enunciado:`Un sonido posicional suena igual en los dos oídos si la fuente está centrada.`,correcta:!0,explicacion:`El balance solo se desplaza si la fuente sale del eje.`},{tipo:`multiple`,enunciado:`¿Qué hace falta para que suene un audio en el navegador?`,opciones:[`Un gesto del usuario`,`Un contexto reanudado`,`Un búfer cargado`,"Un `AudioListener` por malla"],correctas:[0,1,2],explicacion:`Basta con un oyente por escena.`},{tipo:`unica`,enunciado:"¿Qué controla `distance` en `PositionalAudio`?",opciones:[`La distancia a la que el sonido está a volumen de referencia`,`El alcance máximo del sonido`,`El volumen general`,`El número de altavoces`],correcta:0,explicacion:`Es la distancia de referencia del modelo de atenuación.`}],recursos:[{titulo:"three: `PositionalAudio`",url:`https://threejs.org/docs/#api/en/audio/PositionalAudio`,nota:`Atenuación, distancia de referencia y orientación.`},{titulo:"drei: `PositionalAudio`",url:`https://drei.pmnd.rs/?path=/docs/abstractions-positionalaudio--docs`,nota:`Props y el ejemplo con listener en cámara.`},{titulo:`MDN: política de reproducción automática`,url:`https://developer.mozilla.org/en-US/docs/Web/Media/Guides/Autoplay`,nota:`Por qué el sonido necesita un clic.`}],ejercicio:{reto:`Calcula la atenuación inversa: recibe la distancia y la distancia de referencia, y devuelve el factor de volumen (1 en la referencia, la mitad al doble de distancia), sin bajar de 0.`,inicial:`export function atenuacion(distancia: number, referencia: number): number {
  // TODO: modelo inverso simple, acotado a 0.
  return 1
}

console.log(atenuacion(2, 2), atenuacion(4, 2))`,solucion:`export function atenuacion(distancia: number, referencia: number): number {
  if (distancia <= 0) return 1
  return Math.max(0, referencia / distancia)
}

console.log(atenuacion(2, 2), atenuacion(4, 2))`,pistas:[`El modelo inverso es referencia dividido entre distancia.`,`A distancia igual a la referencia, el factor es 1.`,`Al doble de distancia, la mitad: 0,5.`]}},{id:`13.5`,modulo:13,titulo:`Robustez`,objetivo:`Detectar la falta de WebGL, aislar los fallos por demo y reaccionar a la pérdida de contexto.`,nivel:`alto`,minutos:50,bloques:[{tipo:`parrafo`,texto:`Una escena 3D puede fallar de cuatro maneras: el navegador no tiene WebGL2, la GPU entra en lista negra y el contexto no se crea, el contexto se pierde a mitad de sesión (pestaña en segundo plano, driver que se reinicia, memoria), o un dato del modelo no es el que esperabas. Las tres primeras no son errores de tu código; la cuarta sí. En los cuatro casos la página debe seguir siendo usable, porque el contenido de la lección no depende de que se dibuje un cubo.`},{tipo:`widget`,id:`m13-robusto`,titulo:`Comprobación real y límite de error`},{tipo:`codigo`,lenguaje:`tsx`,titulo:`Detectar, aislar y escuchar la pérdida`,codigo:`// 1. Comprobar de verdad: crear un contexto desechable.
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
})`},{tipo:`tabla`,cabecera:[`Fallo`,`Síntoma`,`Qué hacer`],filas:[[`Sin WebGL2`,"El contexto devuelve `null`",`Mensaje claro y contenido alternativo`],[`Contexto perdido`,`El lienzo se queda congelado`,"`preventDefault`, pausar, reconstruir al volver"],[`Fuga de memoria`,`El contexto se pierde al rato`,"`dispose` de lo creado a mano"],[`Modelo corrupto`,"`useGLTF` rechaza la promesa",`Límite de error con reintento`]]},{tipo:`destacado`,tono:`porque`,titulo:`Un límite de error no captura todo`,texto:"Los límites de React atrapan errores del render y del ciclo de vida. No atrapan errores asíncronos, ni los de un `setTimeout`, ni los de un listener de eventos, ni la pérdida de contexto WebGL. Por eso hacen falta las dos cosas: el límite para los fallos de montaje y los listeners para lo que ocurre después. Confundirlos es la razón de que una demo se quede en negro sin mensaje."},{tipo:`lista`,items:["Comprueba creando un contexto, no mirando si existe la clase `WebGL2RenderingContext`.",`Un límite por demo, no uno por aplicación: aísla el fallo sin matar la página.`,`El mensaje de error debe decir qué pasó y qué puede hacer la persona.`,`El límite de contextos del navegador es real: no dejes lienzos olvidados.`,"Prueba con WebGL desactivado (`chrome://flags`) al menos una vez."]}],errores:[{sintoma:`La página entera se queda en blanco por una demo.`,causa:`No hay límite de error alrededor de la escena.`,arreglo:`Envuelve cada demo en su propio límite con mensaje y reintento.`},{sintoma:"`!!window.WebGLRenderingContext` es `true` pero el canvas no arranca.",causa:`La API existe aunque el contexto no se pueda crear.`,arreglo:`Intenta crear el contexto y comprueba el resultado.`},{sintoma:`Al volver de otra pestaña la escena está en negro.`,causa:`El contexto se perdió y nadie lo escuchó.`,arreglo:"Maneja `webglcontextlost` y `webglcontextrestored`."}],quiz:[{tipo:`unica`,enunciado:`¿Cómo se comprueba si hay WebGL2?`,opciones:["Creando un contexto y mirando si es `null`","Mirando si existe `window.WebGL2RenderingContext`",`Comprobando el user agent`,"Preguntando a `navigator.gpu`"],correcta:0,explicacion:`La existencia de la API no garantiza el contexto.`},{tipo:`verdadero-falso`,enunciado:`Un límite de error de React captura la pérdida de contexto WebGL.`,correcta:!1,explicacion:`Llega como evento, no como excepción de render.`},{tipo:`multiple`,enunciado:`¿Qué hay que hacer al perder el contexto?`,opciones:["Llamar a `preventDefault` en el evento",`Pausar el bucle`,`Reconstruir los recursos al restaurarse`,`Recargar la página entera`],correctas:[0,1,2],explicacion:`Recargar es el último recurso, no el primero.`},{tipo:`unica`,enunciado:`¿Por qué un límite por demo y no uno global?`,opciones:[`Para que un fallo no tumbe el resto de la página`,`Porque React solo permite uno`,`Porque ocupa menos memoria`,`Porque el global no funciona con R3F`],correcta:0,explicacion:`El aislamiento es el objetivo del límite.`}],recursos:[{titulo:"MDN: `webglcontextlost`",url:`https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/webglcontextlost_event`,nota:`El evento y su pareja de restauración.`},{titulo:`React: límites de error`,url:`https://react.dev/reference/react/Component#catching-rendering-errors-with-an-error-boundary`,nota:`Qué capturan y qué no.`},{titulo:`three: gestión de contexto`,url:`https://threejs.org/docs/#api/en/renderers/WebGLRenderer`,nota:"`dispose` y el ciclo de vida del renderer."}],ejercicio:{reto:"Decide si merece la pena reintentar: recibe el número de intentos ya hechos y devuelve `true` hasta tres intentos inclusive.",inicial:`export function reintentar(intentos: number): boolean {
  // TODO: como mucho tres intentos.
  return true
}

console.log(reintentar(1), reintentar(4))`,solucion:`export function reintentar(intentos: number): boolean {
  return intentos <= 3
}

console.log(reintentar(1), reintentar(4))`,pistas:[`«Hasta tres intentos inclusive» significa que el 3 todavía cuenta.`,`Es una comparación simple.`,`Sin bucles ni acumuladores.`]}},{id:`13.6`,modulo:13,titulo:`Accesibilidad en 3D`,objetivo:`Hacer usable una escena con teclado, lector de pantalla y movimiento reducido, sin renunciar a la escena.`,nivel:`medio`,minutos:55,bloques:[{tipo:`parrafo`,texto:"Un `<canvas>` es una imagen opaca para un lector de pantalla: no hay nodos que anunciar. Eso no se arregla con `aria-label` en el lienzo; se arregla con la interfaz de al lado. Si la escena se puede manipular con botones HTML de verdad, entonces se puede usar con teclado, con lector y con switch. Además hay una preferencia que se ignora casi siempre: `prefers-reduced-motion`. No es un capricho; hay personas a las que el movimiento en pantalla les provoca mareo o migraña."},{tipo:`demo`,id:`m13-accesible`,titulo:`Mover el rover con botones y con el teclado`},{tipo:`codigo`,lenguaje:`tsx`,titulo:`Preferencia del sistema y movimiento que se adapta`,codigo:`function useMovimientoReducido() {
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
<p aria-live="polite">posición {x.toFixed(1)} , {z.toFixed(1)}</p>`},{tipo:`tabla`,cabecera:[`Barrera`,`Por qué`,`Solución`],filas:[[`Sin ratón`,`Arrastrar una cámara no tiene equivalente con teclado`,`Botones HTML que mueven o giran`],[`Sin visión`,`El canvas no expone estructura`,"Descripción en texto y estado con `aria-live`"],[`Movimiento`,`Interpolación y balanceos marean`,"`prefers-reduced-motion`: saltos, sin vaivén"],[`Contraste`,`Escenas oscuras con controles tenues`,`Controles con contraste 4,5:1 sobre el fondo`],[`Solo color`,`Elegir por color deja fuera a quien no lo distingue`,`Forma, texto o patrón además del color`]]},{tipo:`destacado`,tono:`porque`,titulo:`El canvas es decorativo; el contenido no`,texto:"En todas las demos de este curso hay un párrafo `sr-only` que describe la escena, porque el lienzo no dice nada por sí mismo. Si la pieza central de tu web es un configurador, la descripción no basta: hace falta que la configuración se pueda completar sin verla. Es más trabajo, y es la diferencia entre una web que se ve y una que se usa."},{tipo:`lista`,items:["No pongas manejadores en `window` para el teclado: secuestran la página entera.","Usa botones de verdad (`<button>`) antes que `div` con `onClick`.","Visibiliza el foco con `focus-visible`: el navegador ya sabe cuándo dibujarlo.",'Anuncia los cambios con `aria-live="polite"`, no en cada frame de la animación.',`Con movimiento reducido, quita el vaivén y la interpolación; el resultado debe seguir siendo el mismo.`]}],errores:[{sintoma:`El lienzo no se puede usar con teclado.`,causa:"Toda la interacción depende de `pointermove` y arrastre.",arreglo:`Añade controles HTML con foco que hagan lo mismo.`},{sintoma:`El lector de pantalla lee «lienzo» y nada más.`,causa:`No hay texto alternativo ni estado anunciado.`,arreglo:"Describe la escena y publica el estado en una región `aria-live`."},{sintoma:`El estado se anuncia sesenta veces por segundo.`,causa:"La región `aria-live` se actualiza dentro de `useFrame`.",arreglo:`Anuncia solo cambios de intención: posición final, selección, modo.`}],quiz:[{tipo:`unica`,enunciado:"¿Qué hace `prefers-reduced-motion`?",opciones:[`Indica que la persona prefiere menos movimiento`,`Desactiva WebGL`,`Reduce la resolución del lienzo`,`Bloquea las animaciones de CSS`],correcta:0,explicacion:`Es una preferencia que tu código decide respetar.`},{tipo:`verdadero-falso`,enunciado:"Un `aria-label` en el `<canvas>` hace la escena accesible.",correcta:!1,explicacion:`El lienzo no expone estructura interna; hace falta interfaz alternativa.`},{tipo:`multiple`,enunciado:`¿Qué mejora la accesibilidad de una escena 3D?`,opciones:[`Controles HTML con foco`,`Descripción textual de la escena`,"Estado anunciado con `aria-live`",`Más animación de fondo`],correctas:[0,1,2],explicacion:`La animación extra es justo lo contrario.`},{tipo:`unica`,enunciado:`¿Dónde deben vivir los atajos de teclado de una demo?`,opciones:[`En el contenedor de la demo, con foco`,"En `window`","En `document.body`","En el `<canvas>` sin foco"],correcta:0,explicacion:`Así no se secuestra el teclado del resto de la página.`}],recursos:[{titulo:"MDN: `prefers-reduced-motion`",url:`https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion`,nota:`Cómo se activa y qué se espera de tu código.`},{titulo:`WCAG: movimiento de la interacción`,url:`https://www.w3.org/WAI/WCAG22/Understanding/animation-from-interactions.html`,nota:`El criterio que pide poder desactivar el movimiento.`},{titulo:`W3C: accesibilidad de canvas`,url:`https://www.w3.org/WAI/tutorials/images/`,nota:`Alternativas textuales y contenido equivalente.`}],ejercicio:{reto:`Decide la duración de una transición: recibe la duración normal en milisegundos y si hay movimiento reducido, y devuelve 0 en ese caso.`,inicial:`export function duracion(ms: number, reducido: boolean): number {
  // TODO: con movimiento reducido, la transición no existe.
  return ms
}

console.log(duracion(400, false), duracion(400, true))`,solucion:`export function duracion(ms: number, reducido: boolean): number {
  return reducido ? 0 : Math.max(0, ms)
}

console.log(duracion(400, false), duracion(400, true))`,pistas:[`Cero significa salto instantáneo, no «sin transición definida».`,`Es una elección entre dos valores.`,`No hace falta tocar la duración normal.`]}}]},{numero:14,titulo:`Proyecto final: Taller K-7`,descripcion:`Ocho fases guiadas para construir un configurador-explorador de un rover lunar dentro de un taller: modelos, PBR, selección, física, shaders, audio, medición y despliegue. Todo lo que has practicado, junto y funcionando.`,lecciones:[{id:`14.0`,modulo:14,titulo:`Presentación y checklist`,objetivo:`Entender qué vas a construir, con qué criterios se evalúa y en qué orden hacerlo sin bloquearte.`,nivel:`intro`,minutos:20,bloques:[{tipo:`parrafo`,texto:`El proyecto final no es un ejercicio nuevo: es el mismo temario, aplicado de una vez. Un **configurador-explorador** de un rover lunar dentro de un taller. La escena es un diorama con plataforma giratoria, mesa de trabajo, estantería y un ventanal al paisaje lunar. Eliges módulos (ruedas, panel solar, brazo, antena), los montas, seleccionas piezas con el cursor y puedes soltar tuercas que caen con física. No hay ningún requisito pegado con cinta: la física tiene excusa narrativa (un taller), el estado es el corazón del producto y el audio tiene un sitio donde sonar.`},{tipo:`destacado`,tono:`porque`,titulo:`Por qué este proyecto y no un portfolio`,texto:"Un portfolio 3D queda muy bien y no obliga a casi nada: ni física, ni piezas intercambiables, ni estado complejo. Una escena de scroll es más lucida todavía y usa aún menos interacción real. El taller, en cambio, obliga a las tres cosas que cuestan: un grafo de nodos que se manipula, un estado que se comparte entre HTML y escena, y una simulación que se tiene que estabilizar. Y como los modelos son propios, recorres el pipeline completo en vez de descargar un `.glb` de Sketchfab."},{tipo:`parrafo`,texto:`Abajo tienes el resultado terminado, corriendo en esta página con el mismo código que vas a escribir. Pruébalo antes de empezar: monta y desmonta módulos, mira cómo cambia la ficha técnica, pasa el cursor por las piezas, vuela a los cuatro encuadres y suelta un par de tuercas. Saber a dónde vas hace que las ocho fases se lean distinto.`},{tipo:`demo`,id:`m14-taller`,titulo:`El proyecto terminado, no una captura`},{tipo:`tabla`,cabecera:[`Requisito del enunciado`,`Dónde se cumple`,`Módulo`],filas:[[`Modelos propios con Draco y KTX2, cargados con gltfjsx`,`Rover y taller generados, comprimidos y medidos`,`8`],[`Animaciones y partes intercambiables`,`Clips del brazo y los nodos de cada módulo`,`8.5 · 5.5`],[`PBR, HDRI y sombras`,"`Environment` local + direccional con sombra + foco",`4 · 7`],[`Raycasting, selección y cámara animada`,`Hover, resaltado y cuatro encuadres`,`6`],[`Física con Rapier`,`Tuercas que caen y se asientan`,`10`],[`Postprocesado y shader propio`,`Bloom, viñeta y plano de escaneo`,`11`],[`Estado global con Zustand`,`Módulos, selección y vista`,`13.1`],[`UI HTML sobre el canvas`,`Panel de módulos y ficha técnica`,`9.4 · 13.1`],[`Audio posicional`,`Motor anclado al rover`,`13.4`],[`Carga, móvil y rendimiento medido`,`Caché, dpr y panel de métricas`,`12 · 13.3`],[`Desplegado en la web`,`Build estático con rutas relativas`,`14.H`]]},{tipo:`pasos`,items:[{titulo:`Una rama, ocho commits`,texto:`Crea una rama por fase o un commit por fase con el mensaje de la fase. Si una fase sale mal, vuelves a un punto que funcionaba: eso es lo que separa un proyecto de un experimento.`},{titulo:`No pases de fase sin checkpoint`,texto:`Cada lección termina con una lista de comprobación. Si no pasa, no sigas: los errores se esconden mejor cuando hay menos cosas encima.`},{titulo:`Mide desde la fase B`,texto:`Abre el panel de métricas en cuanto haya escena. Un proyecto que empieza a medir en la fase G descubre tarde que el problema estaba en la fase C.`},{titulo:`Deja el README para el final, pero escríbelo`,texto:`Un proyecto sin instrucciones no se puede evaluar. En la fase H se pide URL, capturas y la tabla de presupuesto.`}]},{tipo:`checkpoint`,titulo:`Antes de empezar, comprueba que tienes esto`,items:["Node 20 o superior y `npm` funcionando.","El proyecto del curso arrancando en local (`npm install && npm run dev`).","Las versiones verificadas: `three` 0.187, `@react-three/fiber` 9.8, `drei` 10.7.",`Una cuenta de GitHub (o Vercel/Netlify) para el despliegue de la fase H.`,`Ganas de mirar la consola del navegador: no es opcional.`]},{tipo:`destacado`,tono:`ojo`,titulo:`Qué NO se evalúa`,texto:`No se evalúa que tu rover sea bonito ni que el taller tenga más props que el de referencia. Se evalúa que la escena cargue sin errores, que el estado esté en un sitio coherente, que la física no explote, que la medición exista y que la URL pública funcione en un móvil. Un proyecto feo y correcto aprueba; uno precioso que pierde el contexto WebGL al cambiar de módulo, no.`}],errores:[{sintoma:`Empiezas por los efectos y a la semana no hay escena.`,causa:`El postprocesado y los shaders son lo más vistoso y lo menos estructural.`,arreglo:`Respeta el orden A–H. Bloom sobre una escena vacía no impresiona a nadie.`},{sintoma:`Copias el código de la solución y no sabes qué cambia qué.`,causa:`Se lee el resultado, no el proceso.`,arreglo:`Escribe cada fase desde el código de partida y compara después. La solución está para desbloquearte.`},{sintoma:`Todo funciona en tu portátil y en el móvil no.`,causa:`Nunca se probó en móvil ni se midió el presupuesto.`,arreglo:`Prueba en un móvil real desde la fase B, no en la H.`}],quiz:[{tipo:`unica`,enunciado:`¿Qué hace que la física del taller no sea un requisito artificial?`,opciones:[`Que las piezas se montan y caen, y eso tiene sentido en un taller`,`Que Rapier es más rápido que Cannon`,`Que la gravedad se puede desactivar`,`Que las tuercas son instanced`],correcta:0,explicacion:`La simulación tiene una excusa narrativa, no es un adorno técnico.`},{tipo:`verdadero-falso`,enunciado:`El proyecto final introduce conceptos que no se han visto en ningún módulo anterior.`,correcta:!1,explicacion:`Todo se ha practicado antes; el proyecto los junta.`},{tipo:`multiple`,enunciado:`¿Qué debe existir al terminar cada fase?`,opciones:[`Un checkpoint que se pueda comprobar`,`Un commit o rama con ese estado`,`Una medición o una comprobación en consola`,`Un despliegue nuevo en producción`],correctas:[0,1,2],explicacion:`Se despliega una vez, en la fase H; no en cada fase.`}],recursos:[{titulo:`React Three Fiber: documentación`,url:`https://r3f.docs.pmnd.rs/getting-started/introduction`,nota:`El punto de partida de todo el proyecto.`},{titulo:`drei: catálogo de helpers`,url:`https://drei.pmnd.rs/`,nota:"`Environment`, `OrbitControls`, `PositionalAudio`, `useProgress`."},{titulo:`Rapier: documentación`,url:`https://rapier.rs/docs/`,nota:`Colliders, masas y estabilidad.`}],ejercicio:{reto:"Suma el peso de los módulos activos. `PESOS` ya está dado; devuelve el total redondeado a un decimal.",inicial:`export type Modulo = 'ruedas' | 'panel' | 'brazo' | 'antena'

const PESOS: Record<Modulo, number> = { ruedas: 12.4, panel: 9.1, brazo: 6.8, antena: 3.2 }

export function peso(modulos: Record<Modulo, boolean>): number {
  // TODO: suma solo los activos y redondea a un decimal.
  return 0
}

console.log(peso({ ruedas: true, panel: true, brazo: false, antena: false }))`,solucion:`export type Modulo = 'ruedas' | 'panel' | 'brazo' | 'antena'

const PESOS: Record<Modulo, number> = { ruedas: 12.4, panel: 9.1, brazo: 6.8, antena: 3.2 }

export function peso(modulos: Record<Modulo, boolean>): number {
  const activos = (Object.keys(PESOS) as Modulo[]).filter((modulo) => modulos[modulo])
  const total = activos.reduce((suma, modulo) => suma + PESOS[modulo], 0)
  return Math.round(total * 10) / 10
}

console.log(peso({ ruedas: true, panel: true, brazo: false, antena: false }))`,pistas:["`Object.keys` devuelve cadenas: hay que decirle a TypeScript que son `Modulo`.",`Filtra antes de sumar, o multiplica por 0 y 1.`,"Redondear a un decimal es `Math.round(x * 10) / 10`."]}},{id:`14.A`,modulo:14,titulo:`Fase A — Planificación y estructura`,objetivo:`Definir los contratos de datos y las carpetas antes de escribir una sola malla, con los imports en un solo sentido.`,nivel:`medio`,minutos:45,bloques:[{tipo:`parrafo`,texto:"La fase A no produce nada visible y ahorra la mitad de los problemas. Se decide qué datos existen y quién puede tocar a quién. En este proyecto hay cuatro capas, como en la lección 13.2: entrada, pantallas, escena y datos. La regla es que una capa solo importa de las de abajo. Si la escena importa la pantalla, el proyecto se convierte en un círculo y el bundler empieza a devolver `undefined` en sitios imposibles."},{tipo:`codigo`,lenguaje:`ts`,titulo:`El contrato antes del código`,codigo:`// src/taller/estado/tienda.ts — no importa three, ni R3F, ni nada visual.
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
}`},{tipo:`pasos`,items:[{titulo:`Crea la carpeta y los tres límites`,texto:"`src/taller/estado`, `src/taller/escena`, `src/taller/ui`. Si un archivo no encaja en ninguno, probablemente está en el sitio equivocado."},{titulo:`Escribe los tipos antes que las funciones`,texto:"`Modulo`, `Vista`, `Ficha`. Cuando los tipos están claros, las funciones se escriben solas y los errores salen en `tsc`, no en el navegador."},{titulo:`Centraliza las rutas de assets`,texto:"Un único `rutas.ts` con `rutaAsset`. Con `base: './'` en Vite, una barra inicial se rompe al desplegar en un subdirectorio."},{titulo:`Monta el panel con la escena vacía`,texto:"Un panel de módulos que escribe en la tienda y un `<Canvas>` sin nada dentro. Si el panel cambia el estado, la fase A está hecha."}]},{tipo:`checkpoint`,titulo:`Checkpoint de la fase A`,items:[`El proyecto arranca y muestra un canvas vacío con el panel al lado.`,"`npx tsc --noEmit` pasa sin errores ni variables sin usar.","`src/taller/estado/tienda.ts` no importa `three` ni `@react-three/fiber`.","Las rutas de los `.glb` salen todas de un único archivo.",`Puedes decir en voz alta qué capa importa de cuál, sin mirar el código.`]},{tipo:`destacado`,tono:`truco`,titulo:`Los nombres de nodo son un contrato`,texto:"La ficha guarda cadenas (`rueda_del_izq`), no referencias a objetos. Eso mantiene el estado serializable, comprobable en una consola y válido fuera del navegador. El día que el modelo cambie de nombre, `tsc` no te salvará: por eso la fase C incluye listar los nodos reales antes de dar por buena la ficha."}],errores:[{sintoma:"El estado guarda un `Vector3` y el módulo de estado deja de ser testeable.",causa:"Se importó `three` en la capa de datos.",arreglo:"Guarda `{ x, y, z }` o números; convierte en la escena."},{sintoma:`Al desplegar, los modelos dan 404 y en local funcionan.`,causa:"Rutas absolutas (`/modelos/rover.glb`) con `base` relativo.",arreglo:"Usa `import.meta.env.BASE_URL` en un único helper."},{sintoma:"Dos archivos se importan entre sí y una constante llega `undefined`.",causa:`Se rompió el sentido de las capas.`,arreglo:`Baja el tipo compartido a la capa de datos.`}],quiz:[{tipo:`unica`,enunciado:`¿Qué guarda la ficha de un módulo para referirse al modelo?`,opciones:[`Los nombres de los nodos del glTF`,"Una referencia al `Object3D`","Un `Mesh` clonado",`Una textura`],correcta:0,explicacion:`Cadenas: serializables, comparables y sin dependencia de three.`},{tipo:`verdadero-falso`,enunciado:`La capa de estado puede importar la de escena si solo usa tipos.`,correcta:!1,explicacion:`Un import de tipos se borra, pero la dependencia conceptual sigue ahí y acaba siendo real.`},{tipo:`multiple`,enunciado:`¿Qué entra en la fase A?`,opciones:[`Tipos y contratos de datos`,`Carpetas y límites entre capas`,`Helper de rutas de assets`,`El shader de escaneo`],correctas:[0,1,2],explicacion:`Los efectos son fase F, y con razón.`}],recursos:[{titulo:`Vite: base path`,url:`https://vite.dev/guide/build.html#public-base-path`,nota:"Por qué `base: './'` cambia cómo se escriben las rutas."},{titulo:`TypeScript: módulos`,url:`https://www.typescriptlang.org/docs/handbook/modules/reference.html`,nota:`Imports de tipos y ciclos.`},{titulo:`Zustand: TypeScript`,url:`https://zustand.docs.pmnd.rs/guides/typescript`,nota:`Tipar la tienda sin castings.`}],ejercicio:{reto:"Escribe `problemas(config)`: devuelve una lista con los módulos incompatibles. El brazo necesita el tren de ruedas y la antena necesita el panel.",inicial:`export type Modulo = 'ruedas' | 'panel' | 'brazo' | 'antena'
export type Config = Record<Modulo, boolean>

export function problemas(config: Config): string[] {
  // TODO: devuelve [] si todo es compatible.
  return []
}

console.log(problemas({ ruedas: false, panel: true, brazo: true, antena: false }))`,solucion:`export type Modulo = 'ruedas' | 'panel' | 'brazo' | 'antena'
export type Config = Record<Modulo, boolean>

export function problemas(config: Config): string[] {
  const fallos: string[] = []
  if (config.brazo && !config.ruedas) fallos.push('el brazo necesita el tren de ruedas')
  if (config.antena && !config.panel) fallos.push('la antena necesita el panel solar')
  return fallos
}

console.log(problemas({ ruedas: false, panel: true, brazo: true, antena: false }))`,pistas:[`Es una función pura: recibe datos y devuelve datos.`,`Un array vacío significa «sin problemas».`,`Las dos reglas son independientes: pueden fallar las dos.`]}},{id:`14.B`,modulo:14,titulo:`Fase B — Escena base, cámara y luces`,objetivo:`Levantar el diorama navegable con un presupuesto de luces que se sostenga en móvil, y límites de cámara que no dejen mirar debajo del suelo.`,nivel:`medio`,minutos:50,bloques:[{tipo:`parrafo`,texto:"Una escena se encuadra antes de decorarse. Tres cosas y ninguna más: el `<Canvas>` con su `dpr`, una cámara con límites de órbita, y **una** luz que proyecta sombra. La tentación es poner cinco luces, cuatro con sombra, y descubrir en un móvil que el frame dura 60 ms. La regla del presupuesto: una direccional con sombra de 1024, un foco sin sombra y un ambiente. Todo lo demás es HDRI, que cuesta una textura una sola vez."},{tipo:`codigo`,lenguaje:`tsx`,titulo:`Escena mínima con presupuesto de luces`,codigo:`import { Canvas } from '@react-three/fiber'
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
</Canvas>`},{tipo:`tabla`,cabecera:[`Luz`,`Coste`,`Para qué`],filas:[[`Ambiente`,`Casi cero`,`Que las sombras no sean negras`],[`Direccional con sombra`,`Medio (un pase extra por sombra)`,`Sombra principal y volumen`],[`Foco sin sombra`,`Bajo`,`Un punto cálido de interés`],[`Puntual`,`Bajo`,`Relleno de color`],[`HDRI`,`Una textura, una vez`,`Reflejos y luz indirecta creíble`]]},{tipo:`destacado`,tono:`porque`,titulo:"`maxPolarAngle` no es un detalle",texto:"Sin límite polar, arrastrar hacia arriba mete la cámara debajo del suelo y el diorama se ve por dentro: paredes sin cara interior, sombras invertidas, sensación de estar roto. Dos números (`0.2` y `PI/2 - 0.06`) bastan para que la cámara nunca haga algo que el decorado no soporta. Es más barato limitar la cámara que modelar el suelo por las dos caras."},{tipo:`checkpoint`,titulo:`Checkpoint de la fase B`,items:[`Se puede orbitar el taller y la cámara no atraviesa el suelo ni las paredes.`,`La plataforma proyecta y recibe sombra, y la sombra no tiene dientes raros.`,`El panel de métricas marca 60 fps o el máximo del monitor con la escena base.`,`Quitar el HDRI oscurece los metales: eso demuestra que el entorno está iluminando.`,"El `Canvas` no parpadea al cambiar de tamaño la ventana."]}],errores:[{sintoma:`La sombra tiene bordes dentados o separada del objeto.`,causa:"`shadow-camera` demasiado grande o `shadow-bias` mal ajustado.",arreglo:"Ajusta el frustum al tamaño real de la escena y usa `-0.0005`."},{sintoma:`Todo se ve planchado y sin reflejos.`,causa:"No hay `Environment`, solo luces.",arreglo:"Añade un HDRI local con `environmentIntensity` bajo."},{sintoma:`En móvil la escena va a 20 fps con cuatro objetos.`,causa:"Varias luces con sombra y `dpr` fijo en 2.",arreglo:"Una sola sombra y `dpr={[1, 2]}`."}],quiz:[{tipo:`unica`,enunciado:`¿Cuántas luces deberían proyectar sombra en este proyecto?`,opciones:[`Una`,`Todas`,`Ninguna`,`Una por objeto`],correcta:0,explicacion:`Cada sombra es un pase de render adicional.`},{tipo:`verdadero-falso`,enunciado:"`Environment` ilumina la escena aunque no se ponga `background`.",correcta:!0,explicacion:`Son dos usos independientes del mismo mapa.`},{tipo:`multiple`,enunciado:`¿Qué evita que la cámara se meta debajo del suelo?`,opciones:["`maxPolarAngle`","`minDistance` / `maxDistance`","`enablePan={false}`","`dpr={[1, 2]}`"],correctas:[0,1,2],explicacion:"El `dpr` afecta a la resolución, no a la órbita."}],recursos:[{titulo:`three: luces y sombras`,url:`https://threejs.org/manual/#en/lights`,nota:`Qué hace cada tipo y cuánto cuesta.`},{titulo:"drei: `Environment`",url:`https://drei.pmnd.rs/?path=/docs/staging-environment--docs`,nota:`HDRI local, intensidad y fondo.`},{titulo:"drei: `OrbitControls`",url:`https://drei.pmnd.rs/?path=/docs/controls-orbitcontrols--docs`,nota:`Límites de órbita: los cuatro que importan.`}],ejercicio:{reto:"Limita el ángulo polar de la cámara entre 0,2 y `PI/2 − 0,06` radianes.",inicial:`export function limitarPolar(angulo: number): number {
  // TODO: recorta el valor al rango permitido.
  return angulo
}

console.log(limitarPolar(-1), limitarPolar(0.5), limitarPolar(3))`,solucion:`export function limitarPolar(angulo: number): number {
  const minimo = 0.2
  const maximo = Math.PI / 2 - 0.06
  return Math.min(maximo, Math.max(minimo, angulo))
}

console.log(limitarPolar(-1), limitarPolar(0.5), limitarPolar(3))`,pistas:[`Dos comparaciones: no bajar del mínimo, no pasar del máximo.`,"`Math.max` con el mínimo y `Math.min` con el máximo.",`El orden da igual aquí, pero encadenarlos como en la solución se lee mejor.`]}},{id:`14.C`,modulo:14,titulo:`Fase C — Modelos y materiales`,objetivo:`Cargar el rover y el taller, clonarlos para poder manipularlos y comprobar los nombres reales de los nodos.`,nivel:`medio`,minutos:60,bloques:[{tipo:`parrafo`,texto:"Llega el momento que más se atasca a los principiantes: el modelo carga, se ve, y a partir de ahí no sabes qué tocar. El `scene` que devuelve `useGLTF` es un `Object3D` normal, con nombre y jerarquía, pero **es compartido**: si lo usas tal cual, ocultar un nodo lo oculta en todas las demos. La solución es `clone(true)`, que copia el árbol y comparte geometrías. Los materiales siguen compartidos, así que si quieres resaltar una pieza hay que clonar también el material: es barato y evita efectos colaterales."},{tipo:`codigo`,lenguaje:`tsx`,titulo:`Clonar, recorrer y quedarse con los nombres`,codigo:`import { useMemo } from 'react'
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
}`},{tipo:`tabla`,cabecera:[`Nodo del rover`,`Qué es`,`Módulo al que pertenece`],filas:[["`chasis`, `blindaje`, `bandeja`",`Estructura fija`,`—`],["`rueda_del_izq` … `rueda_tras_der`",`Cuatro ruedas`,`ruedas`],["`buje_*`",`Los cubos de las ruedas`,`ruedas`],["`panel_pivote`",`Pivote del panel; sus hijos cuelgan de él`,`panel`],["`brazo_base`, `brazo_art1/2`, `pinza_*`",`Brazo articulado`,`brazo`],["`antena_mastil`, `antena_plato`",`Antena de banda X`,`antena`],["`faro_izq`, `faro_der`","Emisivos: cuidado al tocar `emissive`",`—`]]},{tipo:`destacado`,tono:`ojo`,titulo:`Ocultar un padre oculta a sus hijos`,texto:"`panel_pivote` no es una malla: es un grupo con el panel y tres celdas dentro. Poner `visible = false` en el grupo apaga todo lo que cuelga de él, que es justo lo que quieres. Pero si tu resaltado recorre solo mallas (`isMesh`), seleccionar el grupo no encontrará nada: hay que comprobar si el nombre está en algún antecesor. Ese detalle es la diferencia entre «se selecciona» y «a veces no hace nada»."},{tipo:`checkpoint`,titulo:`Checkpoint de la fase C`,items:[`Todos los nodos del rover se pueden listar por nombre desde la consola.`,`El taller y el rover llevan sombra y no aparecen negros ni transparentes.`,"Puedes ocultar `panel_pivote` a mano y el panel desaparece entero.","No hay avisos de texturas 404 ni de `colorSpace` en la consola.","El peso total de los `.glb` está anotado en tu README."]}],errores:[{sintoma:`Al ocultar una pieza desaparece también en otras vistas.`,causa:"Se está usando el `scene` compartido de `useGLTF`.",arreglo:"Clona con `scene.clone(true)` una vez, en `useMemo`."},{sintoma:`Resaltar una pieza pinta de azul media escena.`,causa:`El material es compartido entre mallas del glTF.`,arreglo:"Clona el material por malla antes de tocar `emissive`."},{sintoma:`El modelo aparece a escala diminuta o gigante.`,causa:`Unidades del exportador (centímetros o metros).`,arreglo:"Mide el `Box3` y normaliza la escala en el grupo que lo envuelve."}],quiz:[{tipo:`unica`,enunciado:"¿Qué comparte y qué copia `scene.clone(true)`?",opciones:[`Copia el árbol de nodos y comparte geometrías y materiales`,`Copia todo, incluidos materiales`,`Comparte el árbol y copia las geometrías`,`No copia nada: devuelve el mismo objeto`],correcta:0,explicacion:`Por eso hay que clonar el material a mano si se va a modificar.`},{tipo:`verdadero-falso`,enunciado:"Seleccionar `panel_pivote` requiere mirar si el nombre está en un antecesor de la malla.",correcta:!0,explicacion:`El pivote es un grupo, no una malla.`},{tipo:`multiple`,enunciado:`¿Qué se comprueba en esta fase?`,opciones:[`Los nombres reales de los nodos`,`Que las sombras funcionan en el modelo`,`Que no hay 404 ni avisos de color`,`Que el shader compila`],correctas:[0,1,2],explicacion:`El shader llega en la fase F.`}],recursos:[{titulo:"R3F: `useGLTF`",url:`https://r3f.docs.pmnd.rs/api/hooks#usegltf`,nota:"Caché, precarga y `clear`."},{titulo:"three: `Object3D.traverse`",url:`https://threejs.org/docs/#api/en/core/Object3D.traverse`,nota:`El recorrido que se usa para todo.`},{titulo:`gltf-transform`,url:`https://gltf-transform.dev/`,nota:"Inspeccionar y optimizar el `.glb` desde la terminal."}],ejercicio:{reto:"Recorre un árbol de nodos y devuelve los nombres que empiezan por un prefijo. Es la misma lógica que `traverse`, sin three.",inicial:`export type Nodo = { nombre: string; hijos?: Nodo[] }

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

console.log(conPrefijo(rover, 'rueda_'))`,solucion:`export type Nodo = { nombre: string; hijos?: Nodo[] }

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

console.log(conPrefijo(rover, 'rueda_'))`,pistas:[`Una función interna recursiva es más limpia que pasar el acumulador.`,`Comprueba el nodo antes de bajar a los hijos.`,"`hijos?.forEach` se salta los nodos hoja sin `if`."]}},{id:`14.D`,modulo:14,titulo:`Fase D — Interacción y estado`,objetivo:`Sincronizar el panel HTML con la escena: selección por cursor, resaltado de la pieza y ficha técnica calculada.`,nivel:`medio`,minutos:60,bloques:[{tipo:`parrafo`,texto:`Aquí el proyecto deja de ser una escena y empieza a ser una aplicación. El flujo va en los dos sentidos: el panel escribe en la tienda y la escena reacciona; el cursor escribe en la tienda y el panel reacciona. La clave para que no se pise es que **solo la tienda decide**. La escena no guarda copia del estado, y el panel no calcula totales por su cuenta: los dos leen de la misma fuente.`},{tipo:`codigo`,lenguaje:`tsx`,titulo:`Selección que no re-renderiza el mundo`,codigo:`// Estado: un nombre de nodo, no un objeto 3D.
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
}, [clon, seleccion])`},{tipo:`destacado`,tono:`truco`,titulo:`Evita notificar cuando el valor no cambia`,texto:"`onPointerMove` se dispara decenas de veces por segundo, casi siempre con el mismo nombre de nodo. Si la acción de la tienda crea un objeto de estado nuevo cada vez, React vuelve a renderizar sin que nada haya cambiado y el resaltado recorre el árbol en balde. Una línea lo arregla: si el valor es el mismo, devuelve el estado actual y Zustand no notifica a nadie."},{tipo:`checkpoint`,titulo:`Checkpoint de la fase D`,items:[`Elegir un módulo en el panel cambia la escena, y al revés: seleccionar una pieza en la escena se refleja en el panel.`,`La ficha técnica (masa y consumo) cambia al montar y desmontar, y los números cuadran a mano.`,`Pasar el cursor por una pieza la resalta; salir del rover la deselecciona.`,`Un módulo desmontado no se puede seleccionar (no está visible).`,"El panel funciona con teclado: tabulador y `Enter`."]}],errores:[{sintoma:`Al mover el ratón la escena va a tirones.`,causa:"Cada `pointermove` provoca renders y recorridos del árbol.",arreglo:`No notifiques si el valor no cambia y no guardes objetos en el estado.`},{sintoma:`El panel y la escena se desincronizan.`,causa:`Hay dos copias del estado: una en el panel y otra en la escena.`,arreglo:`Una sola tienda; todo lo demás deriva de ella.`},{sintoma:`El resaltado se queda pegado tras desmontar un módulo.`,causa:`La selección apunta a un nodo que ya no es visible.`,arreglo:`Limpia la selección al cambiar de módulos.`}],quiz:[{tipo:`unica`,enunciado:`¿Qué se guarda en la tienda al seleccionar una pieza?`,opciones:[`El nombre del nodo`,"El objeto `Mesh`",`El material`,`La posición en pantalla`],correcta:0,explicacion:`Cadenas: comparables, serializables y sin three.`},{tipo:`verdadero-falso`,enunciado:`Sincronizar panel y escena exige dos estados independientes que se copian.`,correcta:!1,explicacion:`Exige un único estado y dos consumidores.`},{tipo:`multiple`,enunciado:`¿Qué evita renders innecesarios al mover el cursor?`,opciones:[`No notificar cuando el valor no cambia`,"Leer con `getState()` dentro de `useFrame`",`Guardar primitivos en la tienda`,`Duplicar el estado en la escena`],correctas:[0,1,2],explicacion:`Duplicar el estado es la causa del problema, no la solución.`}],recursos:[{titulo:`R3F: eventos`,url:`https://r3f.docs.pmnd.rs/api/events`,nota:`Qué objeto llega en cada evento y cómo parar la propagación.`},{titulo:`Zustand: selectores`,url:`https://zustand.docs.pmnd.rs/guides/prevent-rerenders-with-use-shallow`,nota:`Suscripciones finas.`},{titulo:"React: `useEffect`",url:`https://react.dev/reference/react/useEffect`,nota:`Cuándo sincronizar con algo externo.`}],ejercicio:{reto:`Calcula la ficha técnica a partir de los módulos activos: masa total, consumo y cuántos van montados.`,inicial:`export type Modulo = 'ruedas' | 'panel' | 'brazo' | 'antena'
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

console.log(ficha({ ruedas: true, panel: true, brazo: false, antena: false }))`,solucion:`export type Modulo = 'ruedas' | 'panel' | 'brazo' | 'antena'
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

console.log(ficha({ ruedas: true, panel: true, brazo: false, antena: false }))`,pistas:[`Empieza por la base y suma encima.`,"El panel resta: su `w` es negativo.","`montados` es la longitud de la lista de activos."]}},{id:`14.E`,modulo:14,titulo:`Fase E — Animación y física`,objetivo:`Disparar clips al montar un módulo y hacer que las piezas caigan y se asienten sin vibrar.`,nivel:`alto`,minutos:60,bloques:[{tipo:`parrafo`,texto:"Dos animaciones distintas conviven aquí y conviene no confundirlas. La del **clip** viene del glTF y la reproduce un `AnimationMixer`: tiene duración, se puede mezclar y no la controla React. La de **física** la calcula Rapier en su propio mundo: tú solo creas cuerpos y lees posiciones. Si intentas animar un cuerpo rígido con `useFrame` y `position.set`, la simulación se pelea contigo y aparece el temblor."},{tipo:`codigo`,lenguaje:`tsx`,titulo:`Mezclar clips y soltar una tuerca`,codigo:`import { useAnimations } from '@react-three/drei'
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
</Physics>`},{tipo:`tabla`,cabecera:[`Síntoma`,`Causa habitual`,`Arreglo`],filas:[[`La tuerca vibra en el suelo`,`Collider más pequeño que la malla`,`Ajusta el collider o sube la fricción`],[`Atraviesa el suelo`,`Falta el collider fijo del suelo`,"Añade un `CuboidCollider` estático"],[`El clip no arranca`,"Se llama a `play()` antes de que exista la acción","Comprueba `actions[nombre]`"],[`El personaje se queda a medias entre dos clips`,"`crossFade` sin `reset()`","`reset().fadeIn().play()`"]]},{tipo:`destacado`,tono:`porque`,titulo:`Por qué la tuerca no debe animarse con código`,texto:"Un cuerpo rígido tiene posición, rotación y velocidad gestionadas por el solver. Si además le escribes `position.set` cada frame, el solver corrige lo que tú acabas de escribir y el resultado es un temblor de un píxel que no se quita con más frames. La regla es simple: si tiene `RigidBody`, lo mueves con impulsos (`applyImpulse`, `setLinvel`) o lo dejas en paz."},{tipo:`checkpoint`,titulo:`Checkpoint de la fase E`,items:[`Montar un módulo dispara su clip y desmontarlo lo repliega, con mezcla suave.`,`Una tuerca soltada cae, bota un par de veces y se queda quieta.`,`Ninguna pieza atraviesa la plataforma ni el suelo.`,`Con ocho tuercas el framerate no baja de 55 fps.`,`Recoger las tuercas las elimina del mundo de física, no solo de la pantalla.`]}],errores:[{sintoma:`El primer clic en un módulo no anima nada.`,causa:`El clip solo se dispara al cambiar el estado, no al montar.`,arreglo:`Dispara el estado inicial en un efecto de montaje o asume el clip «plegado».`},{sintoma:`Las tuercas se hunden en la plataforma.`,causa:`El collider de la plataforma está desplazado respecto a la malla.`,arreglo:"Coloca el `CuboidCollider` en la misma posición que la geometría."},{sintoma:`Con veinte cuerpos la simulación va a tirones.`,causa:`Se crean cuerpos nuevos cada frame en lugar de reciclar.`,arreglo:"Limita la lista (`slice(-11)`) y reutiliza posiciones."}],quiz:[{tipo:`unica`,enunciado:`¿Quién manda en un cuerpo rígido?`,opciones:[`El solver de física`,"`useFrame`",`React`,"El `AnimationMixer`"],correcta:0,explicacion:`Escribir la posición a mano pelea con el solver.`},{tipo:`verdadero-falso`,enunciado:"Para cambiar de clip basta con llamar a `play()` del nuevo.",correcta:!1,explicacion:"Sin `fadeIn`/`fadeOut` el cambio es un corte seco."},{tipo:`multiple`,enunciado:`¿Qué ayuda a que una pieza se asiente sin vibrar?`,opciones:[`Fricción alta`,`Restitución baja`,`Un collider que coincida con la malla`,`Escribir su posición cada frame`],correctas:[0,1,2],explicacion:`Escribir la posición es justo lo que provoca el temblor.`}],recursos:[{titulo:"drei: `useAnimations`",url:`https://drei.pmnd.rs/?path=/docs/abstractions-useanimations--docs`,nota:`Acciones, mezcla y nombres de clip.`},{titulo:`Rapier: colliders`,url:`https://rapier.rs/docs/user_guides/javascript/colliders/`,nota:`Formas, masas y sensores.`},{titulo:"three: `AnimationMixer`",url:`https://threejs.org/docs/#api/en/animation/AnimationMixer`,nota:"`crossFadeTo` y pesos."}],ejercicio:{reto:"Calcula los pesos de una mezcla entre dos clips: a `t = 0` manda el primero, a `t = 1` el segundo, y `t` se recorta a [0, 1].",inicial:`export function pesos(t: number): [number, number] {
  // TODO: devuelve [pesoEntrante, pesoSaliente].
  return [1, 0]
}

console.log(pesos(-0.5), pesos(0.25), pesos(1.4))`,solucion:`export function pesos(t: number): [number, number] {
  const s = Math.min(1, Math.max(0, t))
  return [1 - s, s]
}

console.log(pesos(-0.5), pesos(0.25), pesos(1.4))`,pistas:[`Recorta primero y calcula después.`,`Los dos pesos suman 1.`,`Devuelve una tupla: el tipo ya lo dice.`]}},{id:`14.F`,modulo:14,titulo:`Fase F — Efectos, sonido y pulido`,objetivo:`Añadir bloom y viñeta con criterio, escribir el shader de escaneo y colocar el audio en el espacio.`,nivel:`alto`,minutos:55,bloques:[{tipo:`parrafo`,texto:`Los efectos son la parte que más se disfruta y la que más se descontrola. Tres reglas: el postprocesado entra al final, con la escena ya correcta; cada efecto se justifica por lo que comunica, no por lo que impresiona; y todo lo que se enciende tiene que poder apagarse en un ajuste de calidad. En el taller quedan tres: bloom (los faros y el foco parecen luces), viñeta (centra la mirada en el rover) y un plano de escaneo con shader propio (dice qué pieza has seleccionado).`},{tipo:`codigo`,lenguaje:`glsl`,titulo:`El shader del escáner, sin misterio`,codigo:`// Fragment: franjas que suben y bordes suaves. No hay luces ni texturas.
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
}`},{tipo:`codigo`,lenguaje:`tsx`,titulo:`Composer y audio posicional`,codigo:`import { Bloom, EffectComposer, Vignette } from '@react-three/postprocessing'
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
}`},{tipo:`destacado`,tono:`ojo`,titulo:`El bloom miente sobre el brillo`,texto:"Con `luminanceThreshold` bajo, cualquier superficie clara brilla y la escena parece de neón. Con un umbral alto, solo los emisivos florecen y la luz se lee como luz. Si el suelo te brilla y no quieres, el problema no es el bloom: es que el suelo es demasiado blanco. Arregla el material antes de bajar el umbral."},{tipo:`checkpoint`,titulo:`Checkpoint de la fase F`,items:[`Al seleccionar una pieza, el plano de escaneo la barre y se apaga al deseleccionar.`,`El bloom solo afecta a los emisivos y al foco, no al suelo.`,`El motor suena anclado al rover y se apaga al alejar la cámara.`,`El audio solo arranca tras un gesto del usuario y no hay errores de política de reproducción.`,`Se puede desactivar el postprocesado sin que la escena se rompa (ajuste de calidad).`]}],errores:[{sintoma:`El shader no compila y la consola no dice nada útil.`,causa:"Un `uniform` mal declarado o una precisión ausente.",arreglo:"Declara `precision highp float;` y revisa nombres y tipos."},{sintoma:`El plano de escaneo tapa todo el rover.`,causa:"Alfa alto sin mezcla: `transparent` sin `depthWrite={false}`.",arreglo:"Marca `transparent`, desactiva la escritura de profundidad y baja el alfa."},{sintoma:"`play()` no suena y no hay error.",causa:`Contexto de audio suspendido por falta de gesto.`,arreglo:"Llama a `context.resume()` desde un `onClick`."}],quiz:[{tipo:`unica`,enunciado:"¿Qué hace `fract` en GLSL?",opciones:[`Devuelve la parte decimal`,`Redondea al entero más cercano`,`Recorta a [0, 1]`,`Invierte el signo`],correcta:0,explicacion:`Es la base de los patrones repetidos y las franjas.`},{tipo:`verdadero-falso`,enunciado:`Un plano con shader personalizado necesita luces para verse.`,correcta:!1,explicacion:`El shader decide el color; no usa luces si no las consulta.`},{tipo:`multiple`,enunciado:`¿Qué hace falta para que un sonido posicional suene bien?`,opciones:["Un `AudioListener` (lo pone drei en la cámara)",`Un gesto del usuario para reanudar el contexto`,`Una distancia de referencia razonable`,`Un oyente por cada malla`],correctas:[0,1,2],explicacion:`Un oyente por escena, no por malla.`}],recursos:[{titulo:`The Book of Shaders`,url:`https://thebookofshaders.com/`,nota:"`fract`, `smoothstep` y patrones, desde cero."},{titulo:"drei: `shaderMaterial`",url:`https://drei.pmnd.rs/?path=/docs/shaders-shadermaterial--docs`,nota:`La forma corta de escribir un material propio.`},{titulo:`postprocessing: efectos disponibles`,url:`https://pmndrs.github.io/postprocessing/public/docs/`,nota:`Qué existe y qué cuesta cada efecto.`}],ejercicio:{reto:"Reproduce en TypeScript la franja del shader: `fract(y * 18 - tiempo * 1.4)` y luego `smoothstep(0.35, 0.65, x)`.",inicial:`function fract(valor: number): number {
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

console.log(franja(0.3, 1), franja(0.6, 1))`,solucion:`function fract(valor: number): number {
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

console.log(franja(0.3, 1), franja(0.6, 1))`,pistas:[`Es literalmente la misma expresión que en el fragment shader.`,`Primero el ciclo, después el suavizado.`,"`smoothstep` no recorta el ciclo: ya lo hace `fract`."]}},{id:`14.G`,modulo:14,titulo:`Fase G — Optimización y rendimiento`,objetivo:`Medir con cifras, cumplir un presupuesto escrito y saber qué recortar primero en móvil.`,nivel:`alto`,minutos:50,bloques:[{tipo:`parrafo`,texto:"Optimizar sin medir es cambiar cosas al azar. El proyecto se mide con el panel de la lección 12.1: fps, milisegundos por frame, draw calls, triángulos y memoria. Con `EffectComposer` hay que desactivar el autoreset de `gl.info` y reiniciarlo a mano cada frame, o solo se lee el último pase (un cuadrilátero) y las cifras mienten. Con eso claro, el presupuesto del taller es: 60 fps en escritorio, 30 fps en móvil de gama media, y **menos de 130 draw calls con la escena completa**, que incluye el pase de sombras."},{tipo:`codigo`,lenguaje:`tsx`,titulo:`Medir de verdad, dentro del bucle`,codigo:`const gl = useThree((estado) => estado.gl)

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
})`},{tipo:`tabla`,cabecera:[`Recorte`,`Cuándo`,`Qué se gana`],filas:[["`dpr` adaptativo",`Móvil o GPU integrada`,`Hasta un 40 % de tiempo de frame`],[`Instancing de props repetidos`,`Más de 20 copias del mismo objeto`,`De N draw calls a 1`],[`LOD en objetos lejanos`,`Escena con profundidad`,`Triángulos, sobre todo en sombras`],[`Sombras a 1024 y frustum ajustado`,`Siempre`,`Nitidez y menos pase de sombra`],[`Apagar el composer`,`Móvil de gama baja`,`Uno o dos pases completos`],['`frameloop="never"` fuera de pantalla',`Siempre`,`GPU a cero al hacer scroll`]]},{tipo:`destacado`,tono:`porque`,titulo:`Los draw calls importan más que los triángulos`,texto:"Una escena con 300 000 triángulos y 40 draw calls va mejor que otra con 30 000 y 400. Cada draw call es trabajo de CPU y de driver: validar estado, enlazar buffers, lanzar. Por eso `BatchedMesh` o `<Instances>` ganan tanto con objetos repetidos, y por eso el taller instancia las tuercas del suelo en lugar de crear cuarenta mallas. Los triángulos preocupan cuando ya no puedes bajar el número de llamadas."},{tipo:`checkpoint`,titulo:`Checkpoint de la fase G`,items:[`El README tiene una tabla con fps, ms y draw calls medidos en escritorio y en móvil.`,`El objetivo de 60 fps se cumple en escritorio con la escena completa.`,`Los draw calls están por debajo de 130 sin contar los objetos instanciados.`,"En móvil, el `dpr` baja y el postprocesado se puede desactivar desde un ajuste.","Ningún objeto del proyecto se ha quedado sin `dispose` al desmontarse."]}],errores:[{sintoma:`El panel marca 1 draw call y 1 triángulo.`,causa:"`gl.info.autoReset` activo con `EffectComposer`.",arreglo:"Desactívalo y llama a `gl.info.reset()` al final de cada frame."},{sintoma:`Los fps se hunden al añadir el bloom.`,causa:"Blooms con `mipmapBlur` a resolución completa en un móvil.",arreglo:"Baja el `dpr` o apaga el composer por debajo de un umbral."},{sintoma:`La memoria de geometrías sube y no baja nunca.`,causa:"Geometrías creadas a mano sin `dispose` al desmontar.",arreglo:"Libera en el `cleanup` del efecto, como en la lección 12.6."}],quiz:[{tipo:`unica`,enunciado:"¿Por qué hay que reiniciar `gl.info` a mano con postprocesado?",opciones:[`Porque cada pase lo reinicia y solo leerías el último`,`Porque el composer lo desactiva`,`Porque los fps se calculan aparte`,`Porque three lo bloquea en WebGL2`],correcta:0,explicacion:`El último pase es un cuadrilátero a pantalla completa.`},{tipo:`verdadero-falso`,enunciado:`Reducir triángulos siempre mejora más que reducir draw calls.`,correcta:!1,explicacion:`Casi siempre es al contrario cuando hay objetos repetidos.`},{tipo:`multiple`,enunciado:`¿Qué es un presupuesto de rendimiento útil?`,opciones:[`Un número de fps objetivo por dispositivo`,`Un límite de draw calls`,`Un tamaño máximo de assets`,`Una corazonada de que «va fluido»`],correctas:[0,1,2],explicacion:`Sin cifras no hay presupuesto, solo esperanza.`}],recursos:[{titulo:"three: `WebGLRenderer.info`",url:`https://threejs.org/docs/#api/en/renderers/WebGLRenderer.info`,nota:`Qué cuenta y cuándo se reinicia.`},{titulo:`R3F: performance`,url:`https://r3f.docs.pmnd.rs/advanced/scaling-performance`,nota:"`frameloop`, `dpr` y patrones de escala."},{titulo:"three: `InstancedMesh`",url:`https://threejs.org/docs/#api/en/objects/InstancedMesh`,nota:`Una malla, muchas copias.`}],ejercicio:{reto:`Decide si una medición cumple el presupuesto del taller: al menos 55 fps en escritorio y como mucho 130 draw calls.`,inicial:`export function cumple(fps: number, llamadas: number): boolean {
  // TODO: ambas condiciones a la vez.
  return true
}

console.log(cumple(60, 114), cumple(40, 114), cumple(60, 200))`,solucion:`export function cumple(fps: number, llamadas: number): boolean {
  return fps >= 55 && llamadas <= 130
}

console.log(cumple(60, 114), cumple(40, 114), cumple(60, 200))`,pistas:["Dos condiciones unidas con `&&`.",`El margen de 55 sobre 60 absorbe el ruido de la medición.`,`Devuelve la comparación directamente.`]}},{id:`14.H`,modulo:14,titulo:`Fase H — Despliegue y revisión final`,objetivo:`Publicar el proyecto con rutas que funcionen en un subdirectorio y cerrar con una revisión honesta.`,nivel:`medio`,minutos:40,bloques:[{tipo:`parrafo`,texto:"Desplegar una SPA con tres.js tiene dos trampas y ninguna es de React. La primera: las rutas de los assets. Con `base: './'` en Vite todo se resuelve contra la URL del documento, así que funciona en la raíz y en `/mi-repo/`. Con rutas absolutas (`/modelos/rover.glb`) funciona en local y da 404 en GitHub Pages. La segunda: el router. Con rutas por hash (`#/leccion/1.1`) no hay que configurar nada en el servidor; con rutas por path hace falta una reescritura a `index.html` en cada host."},{tipo:`codigo`,lenguaje:`bash`,titulo:`Construir, comprobar y publicar`,codigo:`# 1. Construir. Si hay errores de tipos, no sigas.
npm run build

# 2. Servir el resultado tal como lo verá el servidor.
npx vite preview --port 4173

# 3. Comprobar en la URL de preview:
#    - los modelos cargan (pestaña Red, sin 404)
#    - el router por hash funciona al recargar
#    - el canvas se ve en una ventana de 390 x 844

# 4. Publicar en GitHub Pages (rama gh-pages) o en Vercel/Netlify.
#    En GitHub Pages, el repo se sirve en /nombre-del-repo/:
#    por eso \`base: './'\` y \`rutaAsset()\` no son opcionales.`},{tipo:`codigo`,lenguaje:`texto`,titulo:`GitHub Actions: build y despliegue en Pages`,codigo:`name: desplegar

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
      - uses: actions/deploy-pages@v4`},{tipo:`destacado`,tono:`ojo`,titulo:`Lighthouse mide la página, no la escena`,texto:`Un 95 en Lighthouse con la escena sin cargar no significa nada. Mide con el proyecto ya hidratado y con el canvas visible: el rendimiento de WebGL no lo ve Lighthouse, así que el número de fps lo aportas tú con el panel. Las dos cifras juntas —Lighthouse y fps medidos— son la entrega; por separado, ninguna de las dos dice si el proyecto va bien.`},{tipo:`checkpoint`,titulo:`Checkpoint de la fase H (y del curso)`,items:[`URL pública funcionando, con los modelos cargando sin 404.`,`Recargar en cualquier ruta por hash devuelve la misma página, no un 404 del servidor.`,`En un móvil real: se puede girar la cámara, montar módulos y el texto se lee.`,`Lighthouse ≥ 90 en accesibilidad y en buenas prácticas con la escena cargada.`,`El README explica cómo arrancar, cómo desplegar y qué se ha medido.`,`La tabla de trazabilidad está rellena: cada parte del proyecto apunta a su módulo.`]}],errores:[{sintoma:`En GitHub Pages los modelos dan 404 y el resto carga.`,causa:"Rutas absolutas en lugar de `import.meta.env.BASE_URL`.",arreglo:"Pasa todas las rutas por `rutaAsset()`."},{sintoma:`Al recargar en una ruta interna el host devuelve 404.`,causa:"Router por path sin reescritura a `index.html`.",arreglo:`Usa rutas por hash o configura el fallback del host.`},{sintoma:`La build pasa y la página se queda en blanco.`,causa:"Un `import` dinámico con una ruta que no existe en producción.",arreglo:"Prueba siempre con `vite preview`, no con el servidor de desarrollo."}],quiz:[{tipo:`unica`,enunciado:"¿Por qué `base: './'` evita el 404 en un subdirectorio?",opciones:[`Porque las rutas se resuelven contra la URL del documento`,`Porque comprime los assets`,`Porque cambia el nombre de los archivos`,`Porque desactiva el router`],correcta:0,explicacion:`Las rutas relativas funcionan en la raíz y en un subdirectorio.`},{tipo:`verdadero-falso`,enunciado:`Lighthouse mide los fps de una escena WebGL.`,correcta:!1,explicacion:"Mide la página; los fps se miden con `gl.info` o un contador propio."},{tipo:`multiple`,enunciado:`¿Qué hay que probar en la URL publicada?`,opciones:[`Que los modelos cargan sin 404`,`Que recargar en una ruta interna funciona`,`Que se puede usar en un móvil real`,`Que el bundle pesa menos de 10 kB`],correctas:[0,1,2],explicacion:`El tamaño del bundle de three no baja de 10 kB ni queriendo.`}],recursos:[{titulo:`Vite: desplegar en GitHub Pages`,url:`https://vite.dev/guide/static-deploy.html#github-pages`,nota:"El `base` y el flujo con Actions."},{titulo:`GitHub: publicar sitios con Actions`,url:`https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site`,nota:`Origen de publicación y permisos.`},{titulo:`Lighthouse: cómo se mide`,url:`https://developer.chrome.com/docs/lighthouse/overview`,nota:`Qué evalúa y qué no.`}],ejercicio:{reto:"Compón la ruta de un asset a partir de un `base` que puede acabar en barra o no, sin duplicar separadores.",inicial:`export function urlAsset(base: string, ruta: string): string {
  // TODO: une sin barras dobles y sin perder la barra final del base.
  return base + ruta
}

console.log(urlAsset('./', 'modelos/rover.glb'), urlAsset('/curso', '/modelos/rover.glb'))`,solucion:`export function urlAsset(base: string, ruta: string): string {
  const izquierda = base.endsWith('/') ? base : base + '/'
  const derecha = ruta.replace(/^\\/+/, '')
  return izquierda + derecha
}

console.log(urlAsset('./', 'modelos/rover.glb'), urlAsset('/curso', '/modelos/rover.glb'))`,pistas:["Normaliza el `base` a que acabe en barra.",`Quita las barras iniciales de la ruta con una expresión regular.`,"No uses `path.join`: esto corre en el navegador."]}}]}],y=v.flatMap(e=>e.lecciones),b=new Map(y.map(e=>[e.id,e])),x=new Map(v.map(e=>[e.numero,e]));function S(e){return b.get(e)}function C(e){return x.get(e)}function w(e){let t=b.get(e);return t?x.get(t.modulo):void 0}function T(e){return y.findIndex(t=>t.id===e)}function E(e){let t=T(e);if(!(t<0))return y[t+1]}function D(e){let t=T(e);if(!(t<=0))return y[t-1]}function O(e){return y.find(t=>!e[t.id])??y[0]}function k(e,t){let n=e.lecciones.length,r=e.lecciones.filter(e=>t[e.id]).length;return{completadas:r,total:n,porcentaje:n===0?0:Math.round(r/n*100)}}function A(e){let t=y.length,n=y.filter(t=>e[t.id]),r=y.reduce((e,t)=>e+t.minutos,0),i=n.reduce((e,t)=>e+t.minutos,0);return{completadas:n.length,total:t,porcentaje:t===0?0:Math.round(n.length/t*100),minutosTotales:r,minutosHechos:i}}var ee=y.reduce((e,t)=>e+t.minutos,0);function te(e){let t=j(e);if(t.length<2)return[];let n=[];for(let e of v)for(let r of e.lecciones){let i=j(r.titulo).includes(t),a=j(r.objetivo).includes(t),o=r.id.startsWith(t),s;!i&&!a&&!o&&(s=M(r,t),!s)||n.push({leccion:r,modulo:e,contexto:s})}return n.sort((e,n)=>+!j(e.leccion.titulo).includes(t)-!j(n.leccion.titulo).includes(t))}function j(e){return e.toLowerCase().normalize(`NFD`).replace(/[\u0300-\u036f]/g,``).trim()}function M(e,t){for(let n of e.bloques){let e=N(n);if(!e)continue;let r=j(e).indexOf(t);if(r>=0){let t=Math.max(0,r-45);return(t>0?`… `:``)+e.slice(t,r+70).trim()+` …`}}}function N(e){switch(e.tipo){case`parrafo`:return e.texto;case`destacado`:return`${e.titulo??``} ${e.texto}`;case`lista`:return e.items.join(` `);case`pasos`:return e.items.map(e=>`${e.titulo} ${e.texto}`).join(` `);case`checkpoint`:return e.items.join(` `);case`codigo`:return e.codigo;default:return}}var P=r(),F=/(`[^`]+`|\*\*[^*]+\*\*)/g;function I({children:e}){return(0,P.jsx)(P.Fragment,{children:e.split(F).map((e,t)=>e.length>2&&e.startsWith("`")&&e.endsWith("`")?(0,P.jsx)(`code`,{className:`rounded bg-superficie-alta px-1 py-px font-mono text-[0.9em] text-acento normal-case`,children:e.slice(1,-1)},t):e.length>4&&e.startsWith(`**`)&&e.endsWith(`**`)?(0,P.jsx)(`strong`,{className:`font-semibold text-texto`,children:e.slice(2,-2)},t):(0,P.jsx)(o.Fragment,{children:e},t))})}var L=[{href:`#/playground`,texto:`Playground libre`,icono:`◈`},{href:`#/visor`,texto:`Visor de modelos`,icono:`◎`},{href:`#/proyecto`,texto:`Proyecto final`,icono:`★`},{href:`#/progreso`,texto:`Mi progreso`,icono:`▤`},{href:`#/creditos`,texto:`Créditos y licencias`,icono:`©`}];function R({leccionActiva:e,moduloActivo:t,alNavegar:n}){let r=f(e=>e.completadas),i=O(r);return(0,P.jsxs)(`div`,{className:`flex h-full flex-col`,children:[(0,P.jsx)(`div`,{className:`p-3`,children:(0,P.jsxs)(`a`,{href:h(i.id),onClick:n,className:`block rounded-caja border border-acento/30 bg-acento/5 p-3 transition hover:border-acento/60 hover:bg-acento/10`,children:[(0,P.jsxs)(`span`,{className:`font-mono text-[10px] uppercase tracking-widest text-acento`,children:[`Continuar · `,i.id]}),(0,P.jsx)(`span`,{className:`mt-0.5 block text-sm font-semibold leading-snug`,children:(0,P.jsx)(I,{children:i.titulo})})]})}),(0,P.jsx)(`nav`,{"aria-label":`Módulos del curso`,className:`flex-1 overflow-y-auto px-2 pb-4`,children:v.map(i=>{let a=k(i,r);return(0,P.jsxs)(`section`,{className:`mb-1`,children:[(0,P.jsxs)(`a`,{href:g(i.numero),onClick:n,className:`group flex items-center gap-2 rounded-lg px-2 py-1.5 transition hover:bg-superficie ${t===i.numero?`bg-superficie`:``}`,children:[(0,P.jsx)(`span`,{className:`grid size-5 shrink-0 place-items-center rounded border border-borde font-mono text-[10px] text-texto-tenue group-hover:border-acento/40 group-hover:text-acento`,children:i.numero}),(0,P.jsx)(`span`,{className:`min-w-0 flex-1 truncate text-xs font-semibold uppercase tracking-wider text-texto-suave group-hover:text-texto`,children:(0,P.jsx)(I,{children:i.titulo})}),(0,P.jsxs)(`span`,{className:`font-mono text-[10px] text-texto-tenue`,children:[a.completadas,`/`,a.total]})]}),(0,P.jsx)(`div`,{className:`mx-2 mb-1 ml-4 h-px bg-borde/60`,"aria-hidden":!0}),(0,P.jsx)(`div`,{className:`mb-1 ml-4 h-0.5 overflow-hidden rounded-full bg-borde/50`,role:`progressbar`,"aria-valuenow":a.porcentaje,"aria-valuemin":0,"aria-valuemax":100,"aria-label":`Progreso del módulo ${i.numero}`,children:(0,P.jsx)(`div`,{className:`h-full rounded-full bg-acento transition-all`,style:{width:`${a.porcentaje}%`}})}),(0,P.jsx)(`ul`,{className:`space-y-0.5`,children:i.lecciones.map(t=>{let i=t.id===e,a=!!r[t.id];return(0,P.jsx)(`li`,{children:(0,P.jsxs)(`a`,{href:h(t.id),onClick:n,"aria-current":i?`page`:void 0,className:`flex items-start gap-2 rounded-lg py-1 pl-4 pr-2 text-[13px] leading-snug transition ${i?`bg-acento/10 text-texto ring-1 ring-inset ring-acento/30`:`text-texto-suave hover:bg-superficie hover:text-texto`}`,children:[(0,P.jsx)(`span`,{className:`mt-0.5 w-7 shrink-0 font-mono text-[10px] ${i?`text-acento`:`text-texto-tenue`}`,children:t.id}),(0,P.jsx)(`span`,{className:`min-w-0 flex-1`,children:(0,P.jsx)(I,{children:t.titulo})}),a&&(0,P.jsx)(`span`,{"aria-label":`completada`,className:`mt-0.5 text-[10px] text-exito`,children:`✓`})]})},t.id)})})]},i.numero)})}),(0,P.jsx)(`div`,{className:`border-t border-borde p-2`,children:(0,P.jsx)(`ul`,{className:`space-y-0.5`,children:L.map(e=>(0,P.jsx)(`li`,{children:(0,P.jsxs)(`a`,{href:e.href,onClick:n,className:`flex items-center gap-2 rounded-lg px-2 py-1.5 text-[13px] text-texto-suave transition hover:bg-superficie hover:text-texto`,children:[(0,P.jsx)(`span`,{"aria-hidden":!0,className:`w-4 text-center text-acento/70`,children:e.icono}),e.texto]})},e.href))})})]})}var z=12;function B({abierto:e,alCerrar:t}){let[n,r]=(0,o.useState)(``),[i,a]=(0,o.useState)(0),s=(0,o.useRef)(null),c=(0,o.useMemo)(()=>te(n).slice(0,z),[n]);if((0,o.useEffect)(()=>{if(!e)return;r(``),a(0);let t=window.setTimeout(()=>s.current?.focus(),30);return()=>window.clearTimeout(t)},[e]),(0,o.useEffect)(()=>{if(!e)return;let n=e=>{e.key===`Escape`&&(e.preventDefault(),t())};window.addEventListener(`keydown`,n);let r=document.body.style.overflow;return document.body.style.overflow=`hidden`,()=>{window.removeEventListener(`keydown`,n),document.body.style.overflow=r}},[e,t]),!e)return null;function l(e){let n=c[e];n&&(window.location.hash=h(n.leccion.id),t())}return(0,P.jsx)(`div`,{className:`fixed inset-0 z-50 flex items-start justify-center bg-fondo/70 p-4 pt-[10vh] backdrop-blur-sm`,onClick:t,children:(0,P.jsxs)(`div`,{role:`dialog`,"aria-modal":`true`,"aria-label":`Buscar en el curso`,onClick:e=>e.stopPropagation(),className:`w-full max-w-xl overflow-hidden rounded-caja border border-borde bg-superficie shadow-flotante`,children:[(0,P.jsxs)(`div`,{className:`flex items-center gap-2 border-b border-borde px-3`,children:[(0,P.jsxs)(`svg`,{"aria-hidden":!0,width:`16`,height:`16`,viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,strokeWidth:`2`,className:`text-texto-tenue`,children:[(0,P.jsx)(`circle`,{cx:`11`,cy:`11`,r:`7`}),(0,P.jsx)(`path`,{d:`m20 20-3.5-3.5`,strokeLinecap:`round`})]}),(0,P.jsx)(`input`,{ref:s,value:n,onChange:e=>{r(e.target.value),a(0)},onKeyDown:e=>{e.key===`ArrowDown`?(e.preventDefault(),a(e=>Math.min(e+1,c.length-1))):e.key===`ArrowUp`?(e.preventDefault(),a(e=>Math.max(e-1,0))):e.key===`Enter`&&(e.preventDefault(),l(i))},placeholder:`Busca «useFrame», «Draco», «sombras»…`,"aria-label":`Término de búsqueda`,className:`h-12 flex-1 bg-transparent text-sm outline-none placeholder:text-texto-tenue`}),(0,P.jsx)(`kbd`,{className:`rounded border border-borde px-1.5 py-0.5 font-mono text-[10px] text-texto-tenue`,children:`Esc`})]}),(0,P.jsxs)(`div`,{className:`max-h-[55vh] overflow-y-auto p-2`,children:[n.trim().length<2&&(0,P.jsx)(`p`,{className:`px-3 py-6 text-center text-xs text-texto-tenue`,children:`Escribe al menos dos letras. Se busca en títulos, objetivos y texto de las lecciones.`}),n.trim().length>=2&&c.length===0&&(0,P.jsx)(`p`,{className:`px-3 py-6 text-center text-xs text-texto-tenue`,children:`Nada por aquí. Prueba con el nombre de la API o el concepto.`}),c.map((e,t)=>(0,P.jsxs)(`button`,{type:`button`,onClick:()=>l(t),onMouseEnter:()=>a(t),className:`block w-full rounded-lg px-3 py-2 text-left transition ${t===i?`bg-acento/10 ring-1 ring-acento/30`:`hover:bg-superficie-alta`}`,children:[(0,P.jsxs)(`span`,{className:`flex items-baseline gap-2`,children:[(0,P.jsx)(`span`,{className:`font-mono text-[10px] text-acento`,children:e.leccion.id}),(0,P.jsx)(`span`,{className:`text-sm font-medium`,children:(0,P.jsx)(I,{children:e.leccion.titulo})})]}),(0,P.jsxs)(`span`,{className:`mt-0.5 block truncate text-xs text-texto-tenue`,children:[`Módulo `,e.modulo.numero,` · `,(0,P.jsx)(I,{children:e.modulo.titulo}),e.contexto?` — ${e.contexto}`:``]})]},e.leccion.id))]})]})})}function V({alAbrirMenu:e,alAbrirBuscador:t}){let n=f(e=>e.tema),r=f(e=>e.alternarTema),i=A(f(e=>e.completadas));return(0,P.jsx)(`header`,{className:`sticky top-0 z-40 border-b border-borde bg-fondo/80 backdrop-blur-md`,children:(0,P.jsxs)(`div`,{className:`mx-auto flex h-14 max-w-[1500px] items-center gap-3 px-3 sm:px-5`,children:[(0,P.jsx)(`button`,{type:`button`,onClick:e,"aria-label":`Abrir el índice del curso`,className:`-ml-1 grid size-9 place-items-center rounded-lg text-texto-suave transition hover:bg-superficie hover:text-texto lg:hidden`,children:(0,P.jsx)(`svg`,{width:`18`,height:`18`,viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,strokeWidth:`2`,children:(0,P.jsx)(`path`,{d:`M4 7h16M4 12h16M4 17h16`,strokeLinecap:`round`})})}),(0,P.jsxs)(`a`,{href:`#/`,className:`group flex min-w-0 items-center gap-2.5`,children:[(0,P.jsx)(`span`,{"aria-hidden":!0,className:`grid size-8 shrink-0 place-items-center rounded-lg border border-acento/40 bg-acento/10 font-mono text-[13px] font-bold text-acento transition group-hover:bg-acento/20`,children:`R3F`}),(0,P.jsxs)(`span`,{className:`min-w-0`,children:[(0,P.jsx)(`span`,{className:`block truncate text-sm font-semibold leading-tight`,children:`React Three Fiber`}),(0,P.jsx)(`span`,{className:`block truncate text-[11px] leading-tight text-texto-tenue`,children:`Curso práctico · de cero a avanzado`})]})]}),(0,P.jsxs)(`div`,{className:`ml-auto flex items-center gap-1.5`,children:[(0,P.jsxs)(`button`,{type:`button`,onClick:t,"aria-label":`Buscar en el curso`,className:`flex items-center gap-2 rounded-lg border border-borde bg-superficie/60 px-2.5 py-1.5 text-xs text-texto-tenue transition hover:border-texto-tenue hover:text-texto`,children:[(0,P.jsxs)(`svg`,{width:`14`,height:`14`,viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,strokeWidth:`2`,children:[(0,P.jsx)(`circle`,{cx:`11`,cy:`11`,r:`7`}),(0,P.jsx)(`path`,{d:`m20 20-3.5-3.5`,strokeLinecap:`round`})]}),(0,P.jsx)(`span`,{className:`hidden sm:inline`,children:`Buscar`}),(0,P.jsx)(`kbd`,{className:`hidden rounded border border-borde px-1 font-mono text-[10px] sm:inline`,children:`Ctrl K`})]}),(0,P.jsxs)(`a`,{href:`#/progreso`,className:`hidden items-center gap-2 rounded-lg border border-borde px-2.5 py-1.5 text-xs text-texto-suave transition hover:border-texto-tenue hover:text-texto sm:flex`,title:`Ver tu progreso`,children:[(0,P.jsxs)(`span`,{className:`font-mono text-[11px] text-acento`,children:[i.porcentaje,`%`]}),(0,P.jsx)(`span`,{className:`hidden md:inline`,children:`completado`})]}),(0,P.jsx)(`button`,{type:`button`,onClick:r,"aria-label":n===`oscuro`?`Cambiar a tema claro`:`Cambiar a tema oscuro`,className:`grid size-9 place-items-center rounded-lg text-texto-suave transition hover:bg-superficie hover:text-texto`,children:n===`oscuro`?(0,P.jsxs)(`svg`,{width:`17`,height:`17`,viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,strokeWidth:`2`,children:[(0,P.jsx)(`circle`,{cx:`12`,cy:`12`,r:`4`}),(0,P.jsx)(`path`,{d:`M12 2v2m0 16v2M2 12h2m16 0h2M4.9 4.9l1.4 1.4m11.4 11.4 1.4 1.4M19.1 4.9l-1.4 1.4M6.3 17.7l-1.4 1.4`,strokeLinecap:`round`})]}):(0,P.jsx)(`svg`,{width:`17`,height:`17`,viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,strokeWidth:`2`,children:(0,P.jsx)(`path`,{d:`M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z`,strokeLinejoin:`round`})})})]})]})})}var H=[{recurso:`Modelos del curso (caja, tuerca, lámpara, robot, rover, taller)`,autor:`Curso R3F`,licencia:`CC BY 4.0`,nota:`Generados con un escritor de glTF en Node (assets-src/modelos/) y comprimidos con Draco. 66 KB en total.`}],U=[{recurso:`estudio.hdr, exterior.hdr, luna.hdr`,autor:`Curso R3F`,licencia:`CC BY 4.0`,nota:`Cielos equirectangulares sintéticos escritos en Radiance RGBE (assets-src/hdri.mjs). No son fotografías.`}],W=[{recurso:`Hormigón, madera, metal y rejilla (color, normales, rugosidad)`,autor:`Curso R3F`,licencia:`CC BY 4.0`,nota:`Codificador PNG propio con ruido fBm (assets-src/texturas.mjs). 10 ficheros, 720 KB.`},{recurso:`hormigon-color.ktx2`,autor:`Curso R3F (derivado del PNG anterior)`,licencia:`CC BY 4.0`,nota:`Comprimido con toktx 4.4.2 (KTX-Software, Apache 2.0): ETC1S con mipmaps, 23 KB.`}],G=[{recurso:`clic, paso, alerta, éxito y motor (bucle)`,autor:`Curso R3F`,licencia:`CC BY 4.0`,nota:`Sintetizados en assets-src/audio.mjs. WAV PCM 16 bits mono a 22 050 Hz.`}],K=[{recurso:`Roboto 400 y 700 (woff)`,autor:`The Roboto Project Authors / Google`,licencia:`OFL 1.1`,fuente:`https://fonts.google.com/specimen/Roboto`,nota:`Copiadas de @fontsource/roboto 5.3.0. El texto de la licencia se sirve en public/fuentes/OFL.txt.`}],ne=[{recurso:`three.js`,autor:`mrdoob y colaboradores`,licencia:`MIT`,fuente:`https://threejs.org/`},{recurso:`React y React DOM`,autor:`Meta`,licencia:`MIT`,fuente:`https://react.dev/`},{recurso:`@react-three/fiber, drei, postprocessing (react)`,autor:`pmndrs`,licencia:`MIT`,fuente:`https://github.com/pmndrs`},{recurso:`@react-three/rapier`,autor:`pmndrs`,licencia:`MIT`,fuente:`https://github.com/pmndrs/react-three-rapier`},{recurso:`Rapier (@dimforge/rapier3d-compat)`,autor:`Dimforge`,licencia:`Apache-2.0`,fuente:`https://rapier.rs/`},{recurso:`postprocessing (vanilla)`,autor:`vanruesc`,licencia:`Zlib`,fuente:`https://github.com/pmndrs/postprocessing`},{recurso:`Zustand`,autor:`pmndrs`,licencia:`MIT`,fuente:`https://zustand.docs.pmnd.rs/`},{recurso:`Vite`,autor:`Evan You y colaboradores`,licencia:`MIT`,fuente:`https://vite.dev/`},{recurso:`Tailwind CSS`,autor:`Tailwind Labs`,licencia:`MIT`,fuente:`https://tailwindcss.com/`},{recurso:`Sandpack`,autor:`CodeSandbox`,licencia:`Apache-2.0`,fuente:`https://sandpack.codesandbox.io/`},{recurso:`Draco (decodificador en public/draco/)`,autor:`Google`,licencia:`Apache-2.0`,fuente:`https://github.com/google/draco`},{recurso:`Basis Universal (transcoder en public/basis/)`,autor:`Binomial / Khronos`,licencia:`Apache-2.0`,fuente:`https://github.com/BinomialLLC/basis_universal`},{recurso:`TypeScript`,autor:`Microsoft`,licencia:`Apache-2.0`,fuente:`https://www.typescriptlang.org/`}];function q({titulo:e,filas:t}){return(0,P.jsxs)(`section`,{className:`mt-8`,children:[(0,P.jsx)(`h2`,{className:`text-lg font-semibold`,children:e}),(0,P.jsx)(`div`,{className:`mt-3 overflow-x-auto rounded-caja border border-borde`,children:(0,P.jsxs)(`table`,{className:`w-full border-collapse text-left text-sm`,children:[(0,P.jsx)(`thead`,{children:(0,P.jsx)(`tr`,{className:`bg-superficie-alta/60`,children:[`Recurso`,`Autor`,`Licencia`,`Fuente`].map(e=>(0,P.jsx)(`th`,{scope:`col`,className:`px-3 py-2 text-xs uppercase tracking-wider text-texto-tenue`,children:e},e))})}),(0,P.jsx)(`tbody`,{children:t.map(e=>(0,P.jsxs)(`tr`,{className:`border-t border-borde/60 align-top`,children:[(0,P.jsxs)(`td`,{className:`px-3 py-2`,children:[(0,P.jsx)(`span`,{className:`block text-texto`,children:e.recurso}),e.nota&&(0,P.jsx)(`span`,{className:`block text-xs text-texto-tenue`,children:e.nota})]}),(0,P.jsx)(`td`,{className:`px-3 py-2 text-texto-suave`,children:e.autor}),(0,P.jsx)(`td`,{className:`whitespace-nowrap px-3 py-2 font-mono text-xs text-acento`,children:e.licencia}),(0,P.jsx)(`td`,{className:`px-3 py-2 text-xs`,children:e.fuente?(0,P.jsx)(`a`,{href:e.fuente,target:`_blank`,rel:`noreferrer noopener`,className:`text-frio hover:underline`,children:e.fuente.replace(`https://`,``)}):(0,P.jsx)(`span`,{className:`text-texto-tenue`,children:`—`})})]},e.recurso))})]})})]})}function J(){return(0,P.jsxs)(`div`,{className:`mx-auto max-w-4xl px-4 pb-16 pt-8 sm:px-6 lg:px-8`,children:[(0,P.jsx)(`h1`,{className:`text-3xl font-bold tracking-tight`,children:`Créditos y licencias`}),(0,P.jsxs)(`p`,{className:`mt-2 max-w-2xl text-sm leading-6 text-texto-suave`,children:[`Este curso solo empaqueta recursos con licencia libre y verificable. Los modelos, las texturas, los HDRIs y el audio se generan desde cero con los scripts de `,(0,P.jsx)(`code`,{className:`font-mono text-xs`,children:`assets-src/`}),`, lo que elimina cualquier duda de licencia y permite que los nombres de nodo sean los que cada lección necesita. El inventario completo, con estado de cada fichero, está en`,` `,(0,P.jsx)(`code`,{className:`font-mono text-xs`,children:`ASSETS.md`}),`.`]}),(0,P.jsx)(q,{titulo:`Modelos 3D`,filas:H}),(0,P.jsx)(q,{titulo:`Entornos HDRI`,filas:U}),(0,P.jsx)(q,{titulo:`Texturas`,filas:W}),(0,P.jsx)(q,{titulo:`Audio`,filas:G}),(0,P.jsx)(q,{titulo:`Tipografías`,filas:K}),(0,P.jsx)(q,{titulo:`Código y dependencias`,filas:ne}),(0,P.jsxs)(`section`,{className:`mt-8 rounded-caja border border-borde bg-superficie p-4`,children:[(0,P.jsx)(`h2`,{className:`text-sm font-semibold`,children:`Fuentes que se recomiendan pero no se empaquetan`}),(0,P.jsxs)(`p`,{className:`mt-1 text-xs leading-5 text-texto-suave`,children:[(0,P.jsx)(`strong`,{children:`Quaternius`}),` usa la licencia QAL v1.0, que permite usar sus assets en un producto pero prohíbe redistribuir los ficheros como assets. Este curso es, literalmente, una distribución de assets, así que se enlaza como recurso para tus proyectos pero no se incluye.`,(0,P.jsx)(`strong`,{children:` Poly Pizza`}),` y `,(0,P.jsx)(`strong`,{children:`Sketchfab`}),` tienen licencia por modelo: hay que comprobar el badge de cada fichero antes de usarlo.`]})]}),(0,P.jsx)(`p`,{className:`mt-8 text-xs text-texto-tenue`,children:`Los textos del curso son originales. Las fuentes de conocimiento se enlazan en «Para profundizar» de cada lección y nunca se copian.`})]})}var Y=[{nombre:`Completa`,detalle:`Módulos 0 → 14`,para:`Quien quiere dominar el ecosistema entero, del canvas al despliegue.`},{nombre:`Express`,detalle:`0, 3, 4, 5, 6, 8.1–8.5, 9, 13.1`,para:`Quien ya sabe three.js y quiere producir con R3F cuanto antes.`},{nombre:`Solo modelos`,detalle:`0.2, 1.2, 3.2, 7, 8, 9.3, 12.3`,para:`Artistas técnicos que llegan con modelos ya hechos.`},{nombre:`Solo rendimiento`,detalle:`5.1, 5.6, 12, 11.1, 13.1`,para:`Quien tiene una escena que ya funciona pero va lenta.`}];function X(){let e=f(e=>e.completadas),t=A(e),n=O(e),r=t.completadas>0;return(0,P.jsxs)(`div`,{className:`mx-auto max-w-5xl px-4 pb-16 pt-8 sm:px-6 lg:px-8`,children:[(0,P.jsxs)(`section`,{className:`relative overflow-hidden rounded-2xl border border-borde bg-superficie p-6 sm:p-10`,children:[(0,P.jsx)(`div`,{"aria-hidden":!0,className:`fondo-plano absolute inset-0 opacity-40`}),(0,P.jsxs)(`div`,{className:`relative`,children:[(0,P.jsx)(`p`,{className:`font-mono text-[11px] uppercase tracking-[0.2em] text-acento`,children:`Curso práctico · en español`}),(0,P.jsx)(`h1`,{className:`mt-3 max-w-2xl text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl`,children:`React Three Fiber, de cero a un mundo 3D interactivo`}),(0,P.jsxs)(`p`,{className:`mt-4 max-w-2xl text-[15px] leading-7 text-texto-suave`,children:[y.length,` lecciones con demo en vivo, ejercicio editable, errores típicos y quiz. Incluye el pipeline completo de modelos 3D — Blender, glTF, Draco y KTX2 — y un proyecto final integrador desplegable.`]}),(0,P.jsxs)(`div`,{className:`mt-7 flex flex-wrap items-center gap-3`,children:[(0,P.jsx)(`a`,{href:h(n.id),className:`rounded-lg bg-acento px-5 py-2.5 text-sm font-semibold text-fondo transition hover:bg-acento-alto`,children:r?`Continuar: ${n.id}`:`Empezar por el principio`}),(0,P.jsx)(`a`,{href:`#/proyecto`,className:`rounded-lg border border-borde px-5 py-2.5 text-sm font-medium transition hover:bg-superficie-alta`,children:`Ver el proyecto final`})]}),(0,P.jsx)(`dl`,{className:`mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4`,children:[{valor:String(v.length),etiqueta:`módulos`},{valor:String(y.length),etiqueta:`lecciones`},{valor:`${Math.round(ee/60)} h`,etiqueta:`de trabajo`},{valor:`${t.porcentaje}%`,etiqueta:`completado`}].map(e=>(0,P.jsxs)(`div`,{children:[(0,P.jsx)(`dt`,{className:`sr-only`,children:e.etiqueta}),(0,P.jsxs)(`dd`,{children:[(0,P.jsx)(`span`,{className:`block text-2xl font-semibold tabular-nums`,children:e.valor}),(0,P.jsx)(`span`,{className:`text-xs uppercase tracking-wider text-texto-tenue`,children:e.etiqueta})]})]},e.etiqueta))}),r&&(0,P.jsxs)(`div`,{className:`mt-6`,children:[(0,P.jsx)(`div`,{className:`h-1.5 overflow-hidden rounded-full bg-borde/60`,role:`progressbar`,"aria-valuenow":t.porcentaje,"aria-valuemin":0,"aria-valuemax":100,"aria-label":`Progreso del curso`,children:(0,P.jsx)(`div`,{className:`h-full rounded-full bg-acento transition-all`,style:{width:`${t.porcentaje}%`}})}),(0,P.jsxs)(`p`,{className:`mt-2 text-xs text-texto-tenue`,children:[t.completadas,` de `,t.total,` lecciones · `,t.minutosHechos,` min invertidos de `,t.minutosTotales]})]})]})]}),(0,P.jsxs)(`section`,{className:`mt-10`,children:[(0,P.jsx)(`h2`,{className:`text-lg font-semibold`,children:`Ruta de aprendizaje recomendada`}),(0,P.jsx)(`p`,{className:`mt-1 text-sm text-texto-suave`,children:`Si es tu primera vez, empieza por el módulo 0 y sigue el orden. Cada módulo da por sabido lo anterior.`}),(0,P.jsx)(`div`,{className:`mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4`,children:Y.map((e,t)=>(0,P.jsxs)(`div`,{className:`rounded-caja border p-4 ${t===0?`border-acento/40 bg-acento/5`:`border-borde bg-superficie`}`,children:[(0,P.jsxs)(`p`,{className:`text-sm font-semibold`,children:[e.nombre,t===0&&(0,P.jsx)(`span`,{className:`ml-2 text-[10px] uppercase text-acento`,children:`recomendada`})]}),(0,P.jsx)(`p`,{className:`mt-1 font-mono text-[11px] text-texto-tenue`,children:e.detalle}),(0,P.jsx)(`p`,{className:`mt-2 text-xs leading-5 text-texto-suave`,children:e.para})]},e.nombre))})]}),(0,P.jsxs)(`section`,{className:`mt-10`,children:[(0,P.jsx)(`h2`,{className:`text-lg font-semibold`,children:`Módulos`}),(0,P.jsx)(`ul`,{className:`mt-4 grid gap-3 sm:grid-cols-2`,children:v.map(t=>{let n=k(t,e);return(0,P.jsx)(`li`,{children:(0,P.jsxs)(`a`,{href:g(t.numero),className:`group flex h-full flex-col rounded-caja border border-borde bg-superficie p-4 transition hover:border-acento/40 hover:bg-superficie-alta`,children:[(0,P.jsxs)(`div`,{className:`flex items-center justify-between gap-2`,children:[(0,P.jsxs)(`span`,{className:`font-mono text-[10px] uppercase tracking-widest text-texto-tenue`,children:[`Módulo `,t.numero]}),(0,P.jsxs)(`span`,{className:`font-mono text-[10px] text-texto-tenue`,children:[t.lecciones.length,` lecciones`]})]}),(0,P.jsx)(`h3`,{className:`mt-1 text-base font-semibold group-hover:text-acento`,children:(0,P.jsx)(I,{children:t.titulo})}),(0,P.jsx)(`p`,{className:`mt-1 flex-1 text-xs leading-5 text-texto-suave`,children:t.descripcion}),(0,P.jsx)(`div`,{className:`mt-3 h-1 overflow-hidden rounded-full bg-borde/60`,children:(0,P.jsx)(`div`,{className:`h-full rounded-full bg-acento`,style:{width:`${n.porcentaje}%`}})})]})},t.numero)})})]})]})}var Z={intro:`intro`,medio:`medio`,alto:`alto`};function re({numero:e}){let t=C(e),n=f(e=>e.completadas);if(!t)return(0,P.jsxs)(`div`,{className:`p-8`,children:[(0,P.jsx)(`h1`,{className:`text-2xl font-semibold`,children:`Módulo no encontrado`}),(0,P.jsxs)(`p`,{className:`mt-2 text-texto-suave`,children:[`No existe el módulo `,e,`.`]}),(0,P.jsx)(`a`,{href:`#/`,className:`mt-4 inline-block text-acento underline`,children:`Volver al inicio`})]});let r=k(t,n),i=t.lecciones.reduce((e,t)=>e+t.minutos,0);return(0,P.jsxs)(`div`,{className:`mx-auto max-w-4xl px-4 pb-16 pt-6 sm:px-6 lg:px-8`,children:[(0,P.jsxs)(`nav`,{"aria-label":`Migas de pan`,className:`text-xs text-texto-tenue`,children:[(0,P.jsx)(`a`,{href:`#/`,className:`hover:text-texto`,children:`Curso`}),` `,(0,P.jsx)(`span`,{"aria-hidden":!0,children:`/`}),` Módulo `,t.numero]}),(0,P.jsxs)(`header`,{className:`mt-3 border-b border-borde pb-6`,children:[(0,P.jsxs)(`p`,{className:`font-mono text-[11px] uppercase tracking-[0.2em] text-acento`,children:[`Módulo `,t.numero,` · `,t.lecciones.length,` lecciones · ≈ `,i,` min`]}),(0,P.jsx)(`h1`,{className:`mt-2 text-3xl font-bold tracking-tight sm:text-4xl`,children:(0,P.jsx)(I,{children:t.titulo})}),(0,P.jsx)(`p`,{className:`mt-3 max-w-2xl text-[15px] leading-7 text-texto-suave`,children:t.descripcion}),(0,P.jsxs)(`div`,{className:`mt-5 flex items-center gap-3`,children:[(0,P.jsx)(`div`,{className:`h-1.5 flex-1 overflow-hidden rounded-full bg-borde/60`,role:`progressbar`,"aria-valuenow":r.porcentaje,"aria-valuemin":0,"aria-valuemax":100,"aria-label":`Progreso del módulo ${t.numero}`,children:(0,P.jsx)(`div`,{className:`h-full rounded-full bg-acento transition-all`,style:{width:`${r.porcentaje}%`}})}),(0,P.jsxs)(`span`,{className:`font-mono text-xs text-texto-tenue`,children:[r.completadas,`/`,r.total,` · `,r.porcentaje,`%`]})]})]}),(0,P.jsx)(`ol`,{className:`mt-6 space-y-2`,children:t.lecciones.map((e,t)=>{let r=!!n[e.id];return(0,P.jsx)(`li`,{children:(0,P.jsxs)(`a`,{href:h(e.id),className:`group flex items-start gap-4 rounded-caja border border-borde bg-superficie p-4 transition hover:border-acento/40 hover:bg-superficie-alta`,children:[(0,P.jsx)(`span`,{className:`grid size-9 shrink-0 place-items-center rounded-lg border border-borde font-mono text-xs text-texto-tenue group-hover:border-acento/40 group-hover:text-acento`,children:r?(0,P.jsx)(`span`,{className:`text-exito`,children:`✓`}):String(t+1).padStart(2,`0`)}),(0,P.jsxs)(`span`,{className:`min-w-0 flex-1`,children:[(0,P.jsxs)(`span`,{className:`flex flex-wrap items-center gap-2`,children:[(0,P.jsx)(`span`,{className:`text-sm font-semibold group-hover:text-acento`,children:(0,P.jsx)(I,{children:e.titulo})}),(0,P.jsxs)(`span`,{className:`font-mono text-[10px] uppercase tracking-wider text-texto-tenue`,children:[Z[e.nivel],` · `,e.minutos,` min`]})]}),(0,P.jsx)(`span`,{className:`mt-1 block text-xs leading-5 text-texto-suave`,children:(0,P.jsx)(I,{children:e.objetivo})})]})]})},e.id)})})]})}function ie(){let e=f(e=>e.completadas),t=f(e=>e.quizzes),n=f(e=>e.fases),r=f(e=>e.reiniciar),i=A(e),a=Object.entries(t),o=a.reduce((e,[,t])=>e+t.aciertos,0),s=a.reduce((e,[,t])=>e+t.total,0),c=Object.values(n).filter(Boolean).length;return(0,P.jsxs)(`div`,{className:`mx-auto max-w-3xl px-4 pb-16 pt-8 sm:px-6 lg:px-8`,children:[(0,P.jsx)(`h1`,{className:`text-3xl font-bold tracking-tight`,children:`Mi progreso`}),(0,P.jsx)(`p`,{className:`mt-2 text-sm text-texto-suave`,children:`Todo se guarda en este navegador (localStorage). Si borras los datos del sitio, se pierde.`}),(0,P.jsx)(`div`,{className:`mt-6 grid gap-3 sm:grid-cols-3`,children:[{valor:`${i.porcentaje}%`,etiqueta:`del curso`,detalle:`${i.completadas} de ${i.total} lecciones`},{valor:s>0?`${Math.round(o/s*100)}%`:`—`,etiqueta:`en los quizzes`,detalle:s>0?`${o} aciertos de ${s} preguntas`:`Aún no has hecho ningún quiz`},{valor:`${c}/8`,etiqueta:`fases del proyecto`,detalle:`Taller K-7`}].map(e=>(0,P.jsxs)(`div`,{className:`rounded-caja border border-borde bg-superficie p-4`,children:[(0,P.jsx)(`p`,{className:`text-2xl font-semibold tabular-nums`,children:e.valor}),(0,P.jsx)(`p`,{className:`text-xs uppercase tracking-wider text-texto-tenue`,children:e.etiqueta}),(0,P.jsx)(`p`,{className:`mt-1 text-xs text-texto-suave`,children:e.detalle})]},e.etiqueta))}),(0,P.jsxs)(`section`,{className:`mt-10`,children:[(0,P.jsx)(`h2`,{className:`text-lg font-semibold`,children:`Por módulo`}),(0,P.jsx)(`ul`,{className:`mt-4 space-y-3`,children:v.map(t=>{let n=k(t,e);return(0,P.jsx)(`li`,{children:(0,P.jsxs)(`a`,{href:g(t.numero),className:`block rounded-caja p-2 transition hover:bg-superficie`,children:[(0,P.jsxs)(`div`,{className:`flex items-baseline justify-between gap-3`,children:[(0,P.jsxs)(`span`,{className:`text-sm`,children:[(0,P.jsxs)(`span`,{className:`font-mono text-[11px] text-texto-tenue`,children:[t.numero,` · `]}),(0,P.jsx)(I,{children:t.titulo})]}),(0,P.jsxs)(`span`,{className:`font-mono text-xs text-texto-tenue`,children:[n.completadas,`/`,n.total]})]}),(0,P.jsx)(`div`,{className:`mt-1.5 h-1.5 overflow-hidden rounded-full bg-borde/60`,children:(0,P.jsx)(`div`,{className:`h-full rounded-full bg-acento`,style:{width:`${n.porcentaje}%`}})})]})},t.numero)})})]}),a.length>0&&(0,P.jsxs)(`section`,{className:`mt-10`,children:[(0,P.jsx)(`h2`,{className:`text-lg font-semibold`,children:`Últimos quizzes`}),(0,P.jsx)(`ul`,{className:`mt-3 divide-y divide-borde rounded-caja border border-borde bg-superficie text-sm`,children:a.slice(-8).reverse().map(([e,t])=>(0,P.jsxs)(`li`,{className:`flex items-center justify-between gap-3 px-3 py-2`,children:[(0,P.jsxs)(`span`,{className:`font-mono text-xs text-texto-tenue`,children:[`Lección `,e]}),(0,P.jsxs)(`span`,{className:`tabular-nums`,children:[t.aciertos,`/`,t.total]})]},e))})]}),(0,P.jsxs)(`section`,{className:`mt-10 rounded-caja border border-error/30 bg-error/5 p-4`,children:[(0,P.jsx)(`h2`,{className:`text-sm font-semibold text-error`,children:`Zona de peligro`}),(0,P.jsx)(`p`,{className:`mt-1 text-xs text-texto-suave`,children:`Borra lecciones completadas, resultados de quiz y fases del proyecto. No se puede deshacer.`}),(0,P.jsx)(`button`,{type:`button`,onClick:()=>{window.confirm(`¿Seguro que quieres borrar todo tu progreso?`)&&r()},className:`mt-3 rounded-lg border border-error/50 px-3 py-1.5 text-xs font-medium text-error transition hover:bg-error/10`,children:`Reiniciar mi progreso`})]})]})}var ae=(0,o.lazy)(()=>t(()=>import(`./PaginaLeccion-D4qNbRRA.js`).then(e=>({default:e.PaginaLeccion})),__vite__mapDeps([0,1,2,3,4,5]),import.meta.url)),oe=(0,o.lazy)(()=>t(()=>import(`./PaginaPlayground-Dl5p6qxH.js`).then(e=>({default:e.PaginaPlayground})),__vite__mapDeps([6,1,7,4,2,5,8]),import.meta.url)),se=(0,o.lazy)(()=>t(()=>import(`./PaginaProyecto-DUX_KibE.js`).then(e=>({default:e.PaginaProyecto})),__vite__mapDeps([9,3,1,2,4,5]),import.meta.url)),Q=(0,o.lazy)(()=>t(()=>import(`./Visor-DQdpxXPm.js`),__vite__mapDeps([10,1,7,4,2]),import.meta.url));function ce({que:e}){return(0,P.jsx)(`div`,{className:`grid min-h-[60vh] place-items-center`,children:(0,P.jsxs)(`p`,{role:`status`,className:`text-sm text-texto-tenue`,children:[`Cargando `,e,`…`]})})}var le={leccion:`la lección`,playground:`el playground`,visor:`el visor`,proyecto:`el proyecto`};function ue(){let{ruta:e}=_(),t=f(e=>e.tema),[n,r]=(0,o.useState)(!1),[i,a]=(0,o.useState)(!1);(0,o.useEffect)(()=>{p(t)},[t]),(0,o.useEffect)(()=>{let e=e=>{(e.ctrlKey||e.metaKey)&&e.key.toLowerCase()===`k`&&(e.preventDefault(),a(e=>!e))};return window.addEventListener(`keydown`,e),()=>window.removeEventListener(`keydown`,e)},[]),(0,o.useEffect)(()=>{r(!1)},[e]);let s=e.nombre===`leccion`?e.id:void 0,c=e.nombre===`modulo`?e.numero:void 0;return(0,P.jsxs)(`div`,{className:`min-h-dvh`,children:[(0,P.jsx)(V,{alAbrirMenu:()=>r(!0),alAbrirBuscador:()=>a(!0)}),(0,P.jsxs)(`div`,{className:`mx-auto flex max-w-[1500px]`,children:[(0,P.jsx)(`aside`,{className:`sticky top-14 hidden h-[calc(100dvh-3.5rem)] w-[286px] shrink-0 overflow-y-auto border-r border-borde lg:block`,children:(0,P.jsx)(R,{leccionActiva:s,moduloActivo:c})}),(0,P.jsx)(`main`,{className:`min-w-0 flex-1`,children:(0,P.jsx)(o.Suspense,{fallback:(0,P.jsx)(ce,{que:le[e.nombre]??`la página`}),children:(0,P.jsx)(de,{ruta:e})})})]}),n&&(0,P.jsxs)(`div`,{className:`fixed inset-0 z-50 lg:hidden`,children:[(0,P.jsx)(`button`,{type:`button`,"aria-label":`Cerrar el índice`,onClick:()=>r(!1),className:`absolute inset-0 bg-fondo/70 backdrop-blur-sm`}),(0,P.jsxs)(`div`,{className:`absolute inset-y-0 left-0 w-[86%] max-w-[320px] animate-[aparecer_0.2s_ease-out] border-r border-borde bg-fondo shadow-flotante`,children:[(0,P.jsxs)(`div`,{className:`flex items-center justify-between border-b border-borde px-3 py-2.5`,children:[(0,P.jsx)(`span`,{className:`text-xs font-semibold uppercase tracking-wider text-texto-tenue`,children:`Índice del curso`}),(0,P.jsx)(`button`,{type:`button`,onClick:()=>r(!1),"aria-label":`Cerrar`,className:`grid size-8 place-items-center rounded-lg text-texto-suave hover:bg-superficie`,children:`✕`})]}),(0,P.jsx)(`div`,{className:`h-[calc(100%-3rem)] overflow-y-auto`,children:(0,P.jsx)(R,{leccionActiva:s,moduloActivo:c,alNavegar:()=>r(!1)})})]})]}),(0,P.jsx)(B,{abierto:i,alCerrar:()=>a(!1)})]})}function de({ruta:e}){switch(e.nombre){case`inicio`:return(0,P.jsx)(X,{});case`leccion`:return(0,P.jsx)(ae,{id:e.id});case`modulo`:return(0,P.jsx)(re,{numero:e.numero});case`playground`:return(0,P.jsx)(oe,{});case`visor`:return(0,P.jsx)(Q,{});case`proyecto`:return(0,P.jsx)(se,{});case`progreso`:return(0,P.jsx)(ie,{});case`creditos`:return(0,P.jsx)(J,{});case`no-encontrada`:return(0,P.jsxs)(`div`,{className:`mx-auto max-w-xl px-6 py-16 text-center`,children:[(0,P.jsx)(`p`,{className:`font-mono text-xs uppercase tracking-widest text-acento`,children:`404`}),(0,P.jsx)(`h1`,{className:`mt-2 text-2xl font-semibold`,children:`Esa página no existe`}),(0,P.jsxs)(`p`,{className:`mt-2 text-sm text-texto-suave`,children:[`La ruta `,(0,P.jsx)(`code`,{className:`font-mono`,children:e.ruta}),` no corresponde a ninguna sección del curso.`]}),(0,P.jsx)(`a`,{href:`#/`,className:`mt-5 inline-block rounded-lg bg-acento px-4 py-2 text-sm font-semibold text-fondo`,children:`Volver al inicio`})]})}}var $=document.getElementById(`root`);if(!$)throw Error(`No se encontró el elemento #root`);(0,s.createRoot)($).render((0,P.jsx)(o.StrictMode,{children:(0,P.jsx)(ue,{})}));export{w as a,f as c,E as i,S as n,h as o,D as r,g as s,I as t};
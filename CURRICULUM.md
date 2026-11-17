# CURRICULUM.md — Temario del curso

**React Three Fiber: de cero a un mundo 3D interactivo**

90 lecciones · 14 módulos + proyecto final · ~50 h de trabajo estimado
Cada lección: 1 concepto nuevo, 1 demo en vivo, 1 ejercicio, 1 quiz, errores típicos, recursos.

---

## Cómo leer este temario

Cada lección se describe con cinco datos:

- **Objetivo** — qué sabrá hacer el alumno al terminar (una frase).
- **Demo** — la demo interactiva que se renderiza en la propia página.
- **Nivel** — `intro` · `medio` · `alto`.
- **Tiempo** — estimación realista de trabajo (leer + hacer el ejercicio).
- **Requisito** — la lección anterior de la que depende, cuando no es la inmediatamente previa.

### Reglas de progresión

1. **Un concepto nuevo por lección.** Si una lección necesita dos ideas nuevas, se parte.
2. **Nada se usa antes de explicarse.** El único préstamo permitido es una luz mínima en el módulo 3, y se avisa
   explícitamente («esto se explica en el módulo 4; por ahora basta con saber que sin luz no se ve nada»).
3. **Resultado visual en la primera lección del módulo.** Cada módulo abre con algo que se ve.
3-bis. **Gancho visual en los primeros 15 minutos.** La lección 0.1 ya muestra el mismo cubo en WebGL crudo y en
   R3F funcionando, y la 0.2 es una demo R3F interactiva. El alumno no espera al módulo 3 para ver React Three
   Fiber en acción: el módulo 1 usa three.js puro solo para construir el modelo mental, no para retrasar la
   recompensa.
4. **Repaso espaciado.** Un concepto reaparece en un contexto distinto tres lecciones después y otra vez en el
   proyecto final. La tabla de la sección final mapea cada módulo a la parte del proyecto que lo usa.
5. **30 % teoría / 70 % práctica.** Las lecciones son cortas a propósito: la mayor parte del tiempo se va en el
   editor.

### Ruta recomendada

| Ruta | Módulos | Para quién |
|---|---|---|
| **Completa** (recomendada) | 0 → 14 | Quien quiere dominar el ecosistema entero |
| **Express** | 0, 3, 4, 5, 6, 8.1–8.5, 9, 13.1 → proyecto | Quien ya sabe three.js y quiere R3F productivo |
| **Solo modelos 3D** | 0.2, 1.2, 3.2, 7, 8, 9.3, 12.3 | Artistas técnicos que llegan con modelos hechos |
| **Solo rendimiento** | 5.1, 5.6, 12, 11.1, 13.1 | Quien tiene una escena que va lenta |

---

## Módulo 0 — Prerrequisitos (3 lecciones · 1 h 20)

> No es un módulo de relleno: es donde se decide si el resto del curso tiene sentido. El objetivo es que el
> alumno entienda **qué capa hace qué** antes de escribir la primera línea de 3D.

| # | Lección | Objetivo | Demo | Nivel | Tiempo |
|---|---|---|---|---|---|
| 0.1 | El mapa: WebGL → three.js → R3F | Situar las tres capas y saber qué problema resuelve cada una. | Diagrama interactivo por capas + el mismo triángulo en WebGL crudo y en R3F, lado a lado | intro | 15 min |
| 0.2 | React que necesitas (y solo ese) | Usar componentes, props, `useState`, `useEffect`, `useRef`, `useMemo` con soltura suficiente para R3F. | Contador 3D: el estado de React cambia el color de un cubo (todavía sin `useFrame`) | intro | 30 min |
| 0.3 | Qué es un canvas y cómo se dibuja 60 veces por segundo | Explicar el bucle `requestAnimationFrame`, el doble buffer y por qué existe el `delta`. | Canvas 2D a mano: un cuadrado que rebota, con el `delta` visible en pantalla | intro | 35 min |

**Punto de fricción típico:** creer que R3F «renderiza React dentro de un canvas». No: R3F usa React como
*descriptor* de una escena three.js. El DOM solo contiene un `<canvas>`.

---

## Módulo 1 — Fundamentos 3D (6 lecciones · 4 h 30)

> Todo este módulo se hace con **three.js puro**, a propósito. Si aprendes primero R3F, la magia tapa el modelo
> mental. Aquí construyes el modelo mental; en el módulo 2 lo traduces.

| # | Lección | Objetivo | Demo | Nivel | Tiempo |
|---|---|---|---|---|---|
| 1.1 | El trípode: escena, cámara, renderer | Montar una escena mínima y entender la relación entre los tres objetos y el canvas. | Escena vacía con un cubo; se puede desactivar cámara/luz y ver qué desaparece y por qué | intro | 40 min |
| 1.2 | Coordenadas, unidades y el eje Y | Leer una posición `[x, y, z]` y predecir dónde aparece el objeto. | Rejilla con ejes X/Y/Z y un objeto movido por sliders; las unidades marcadas en metros | intro | 45 min |
| 1.3 | Vectores: posición, dirección y distancia | Calcular una dirección, normalizarla y medir distancias. | Un dron que persigue un punto: se ve el vector de dirección dibujado con una flecha | intro | 45 min |
| 1.4 | Rotaciones con Euler (y el gimbal lock) | Rotar en radianes y reconocer el bloqueo de ejes. | Tres sliders de rotación + un indicador que se ilumina rojo cuando se pierde un grado de libertad | intro | 50 min |
| 1.5 | Cuaterniones sin miedo | Interpolar orientaciones con `slerp` y saber cuándo usar cuaternión en vez de Euler. | Dos orientaciones y un slider de `slerp` entre ellas; comparación con lerp de Euler | medio | 50 min |
| 1.6 | Jerarquía, pivote y escala | Construir un grafo de objetos y mover el pivote para rotar alrededor de un punto. | Sistema solar de tres niveles: el padre rota, los hijos orbitan, la luna orbita el planeta | medio | 40 min |

**Punto de fricción típico:** el gimbal lock. Se explica **visualmente** (se pierde un eje) antes de nombrarlo.

---

## Módulo 2 — Three.js puro vs R3F (3 lecciones · 2 h)

> El mismo resultado, dos paradigmas. El alumno debe poder mirar código de three.js y traducirlo a R3F sin ayuda.

| # | Lección | Objetivo | Demo | Nivel | Tiempo |
|---|---|---|---|---|---|
| 2.1 | El mismo cubo, dos veces | Escribir el mismo cubo en imperative three.js y en declarative R3F, y ver la equivalencia línea a línea. | Dos canvas gemelos sincronizados con el mismo cubo, y el código de cada uno al lado | intro | 45 min |
| 2.2 | Qué hace R3F por ti | Explicar reconciliación, `attach`, el mapeo props→setter y el `dispose` automático. | Inspector en vivo del árbol three.js que genera un JSX dado | medio | 45 min |
| 2.3 | Cuándo bajar a three.js puro | Usar `useThree`, refs y `<primitive>` para casos que R3F no cubre. | El mismo efecto hecho con objetos three.js creados a mano e inyectados en la escena | medio | 30 min |

**Concepto clave que se repite luego:** `args` son argumentos de constructor; el resto de props son setters. Esto
explica el 80 % de los errores de sintaxis de R3F.

---

## Módulo 3 — Tu primer `<Canvas>` (5 lecciones · 4 h)

| # | Lección | Objetivo | Demo | Nivel | Tiempo |
|---|---|---|---|---|---|
| 3.1 | `<Canvas>`: el componente que lo cambia todo | Montar un canvas responsive y entender `dpr`, `camera`, `shadows` y `gl`. | El mismo cubo con un selector de `dpr` y de `frameloop` que muestra el coste en FPS | intro | 45 min |
| 3.2 | Mallas: geometría + material | Componer un `<mesh>` y saber qué hace cada hijo. | Selector de geometría × material que recompone la malla en vivo | intro | 50 min |
| 3.3 | Geometrías y su costo | Elegir geometría según forma y presupuesto de triángulos. | Contador de triángulos y FPS al subir los segmentos de una esfera | intro | 45 min |
| 3.4 | Materiales: basic, standard, physical | Elegir el material correcto y entender por qué `standard` necesita luz. | Tres esferas con los tres materiales y un interruptor de luces que revela el porqué | intro | 50 min |
| 3.5 | Checkpoint: tu primera escena | Componer una escena con cinco objetos, jerarquía y tres materiales. | Escena de referencia que se puede comparar con la del alumno | intro | 50 min |

**Punto de fricción típico:** «mi `meshStandardMaterial` se ve negro». Se resuelve en 3.4 con el interruptor de
luces, y se refuerza en 4.1.

---

## Módulo 4 — Luces, sombras y entornos (6 lecciones · 5 h)

| # | Lección | Objetivo | Demo | Nivel | Tiempo |
|---|---|---|---|---|---|
| 4.1 | Tipos de luz | Elegir entre ambiente, direccional, puntual, foco y hemisférica según el resultado buscado. | Cinco escenas idénticas, una por tipo de luz, con un slider de intensidad | intro | 55 min |
| 4.2 | Intensidad, color y unidades | Ajustar intensidad en unidades físicas y color de luz sin quemar la escena. | Termostato de exposición y temperatura de color sobre la misma escena | medio | 45 min |
| 4.3 | Sombras | Configurar `castShadow`, `receiveShadow`, `mapSize`, `bias` y el frustum de la luz. | Panel de sombras con los cuatro parámetros y su efecto visible (incluido el *shadow acne*) | medio | 60 min |
| 4.4 | HDRI e iluminación basada en imagen | Iluminar con un entorno real y separar `background` de `environment`. | Cambio entre tres HDRI locales con control de `environmentIntensity` | medio | 50 min |
| 4.5 | Estudio: Stage, ContactShadows, AccumulativeShadows | Montar una presentación de producto con drei y elegir la técnica según el caso. | Tres montajes de estudio comparados en el mismo canvas | medio | 50 min |
| 4.6 | Checkpoint: depurar una escena mal iluminada | Diagnosticar una escena oscura o quemada en menos de cinco pasos. | Escena «rota» con cinco fallos sembrados, y una checklist de diagnóstico | medio | 50 min |

---

## Módulo 5 — Animación (6 lecciones · 5 h)

| # | Lección | Objetivo | Demo | Nivel | Tiempo |
|---|---|---|---|---|---|
| 5.1 | `useFrame` y el render loop | Animar mutando refs, y explicar por qué `setState` por frame es un error. | Dos cubos idénticos: uno con `useFrame`, otro con `setState`; contador de renders y FPS | intro | 50 min |
| 5.2 | Delta y velocidad independiente | Escribir animaciones que se muevan igual a 30, 60 o 144 Hz. | Slider de FPS simulado que demuestra la diferencia entre `+= 0.01` y `+= delta` | intro | 45 min |
| 5.3 | Interpolación y damping | Suavizar movimientos con `lerp`, `damp` y easing. | Comparador de cuatro curvas de suavizado sobre el mismo objeto | medio | 55 min |
| 5.4 | react-spring: animación declarativa | Animar props como estados, con física de muelle. | Selector de rigidez/amortiguación sobre una caja que se mueve al hacer clic | medio | 55 min |
| 5.5 | Coreografía y secuencias | Encadenar animaciones con tiempos y estados. | Secuencia de apertura de un cofre: 4 pasos encadenados con easing propio | alto | 55 min |
| 5.6 | `frameloop="demand"` e `invalidate` | Ahorrar GPU cuando la escena está quieta. | El mismo canvas con y sin `demand`, con el contador de frames dibujados | alto | 40 min |

**Concepto clave:** *el loop es la GPU, React es la UI*. Un `setState` por frame significa 60 reconciliaciones de
React por segundo.

---

## Módulo 6 — Interacción (7 lecciones · 6 h)

| # | Lección | Objetivo | Demo | Nivel | Tiempo |
|---|---|---|---|---|---|
| 6.1 | Eventos de puntero | Manejar `onClick`, `onPointerOver`, `onPointerOut` y leer el objeto del evento. | Galería de objetos que reaccionan al hover y al clic con distintos efectos | intro | 50 min |
| 6.2 | Raycasting | Explicar el raycast, su costo y cómo limitarlo por capas. | Visualización del rayo desde el puntero hasta el objeto, con el número de intersecciones | medio | 55 min |
| 6.3 | Controles de cámara | Configurar `OrbitControls` y `CameraControls` con límites útiles. | Escena con dos juegos de controles conmutables y sus límites dibujados | intro | 50 min |
| 6.4 | Transiciones de cámara | Mover la cámara a un objetivo con suavizado y sin marear. | Tres puntos de vista entre los que se vuela con una transición distinta cada uno | medio | 55 min |
| 6.5 | Teclado y estado sin re-render | Leer teclado en refs y mover un objeto sin provocar renders. | Nave espacial controlable con WASD y el contador de renders a la vista | medio | 55 min |
| 6.6 | `ScrollControls` | Sincronizar el scroll de la página con la escena. | Página de tres secciones donde la cámara y los objetos cambian con el scroll | medio | 60 min |
| 6.7 | Arrastrar objetos en el plano | Convertir el puntero en una posición 3D sobre un plano. | Piezas arrastrables sobre una mesa, con límites | alto | 60 min |

---

## Módulo 7 — Texturas y materiales PBR (6 lecciones · 5 h 30)

| # | Lección | Objetivo | Demo | Nivel | Tiempo |
|---|---|---|---|---|---|
| 7.1 | UVs | Entender el mapeo 2D→3D y ajustar `repeat`, `offset` y `wrap`. | Inspector de UVs sobre una caja: se ve la textura y su despiece | medio | 55 min |
| 7.2 | Cargar texturas | Cargar imágenes con `useTexture`, `Suspense` y configurar filtros. | Cuatro texturas locales con control de `anisotropy` y `minFilter` | intro | 45 min |
| 7.3 | `colorSpace` | Distinguir mapas de color (sRGB) de mapas de datos (lineal) y corregir el aspecto lavado. | Mismo objeto, mismo mapa, dos `colorSpace`: el error y la corrección | medio | 50 min |
| 7.4 | Mapas PBR | Aplicar color, normal, roughness, metalness, AO y emissive en conjunto. | Despiece de una esfera con cada mapa activable por separado | medio | 60 min |
| 7.5 | Materiales físicos avanzados | Usar clearcoat, transmission, sheen e iridiscencia con criterio. | Cuatro materiales avanzados sobre la misma geometría, con coste en FPS | alto | 60 min |
| 7.6 | Checkpoint: objeto con cinco mapas | Montar un material completo y verificado. | Comparador entre material «de principiante» y material correcto | medio | 60 min |

---

## Módulo 8 — Modelos 3D: el flujo completo (10 lecciones · 9 h)

> El corazón del curso. Es el módulo que casi ningún curso de R3F cubre bien: aquí se va **del archivo a la escena
> y de la escena al archivo**, incluida la guía de modelado en Blender (con `.glb` descargables para practicar)
> y su optimización medida.

| # | Lección | Objetivo | Demo | Nivel | Tiempo |
|---|---|---|---|---|---|
| 8.1 | Anatomía de un modelo y formatos | Describir qué hay dentro de un `.glb` y por qué glTF es el estándar web. | Visor de estructura de un GLB del curso: nodos, mallas, materiales, animaciones, accessors | intro | 60 min |
| 8.2 | Cargar con `useGLTF` | Cargar un modelo con `Suspense`, precargarlo y resolver rutas en Vite. | Carga real de un modelo con estados de carga, error y reintento | intro | 55 min |
| 8.3 | `gltfjsx` | Convertir un GLB en un componente React y entender el código que genera. | Comparación entre `<primitive>` y el componente generado, con el código lado a lado | medio | 55 min |
| 8.4 | Inspeccionar y manipular el grafo | Recorrer nodos, cambiar materiales, clonar y aislar piezas. | Selector de piezas de un modelo real: resaltar, ocultar, recolorar, clonar | medio | 65 min |
| 8.5 | Animaciones con `useAnimations` | Reproducir, mezclar y encadenar clips. | Máquina de estados de animación con `fadeIn`/`crossFade` entre clips | alto | 70 min |
| 8.6 | Blender I: modelado básico | Modelar una pieza sencilla con extrusión, loop cuts, bisel y modificador espejo. | Guía paso a paso + `tuerca.glb` y `caja.glb` descargables para importar + visor | medio | 90 min |
| 8.7 | Blender II: UVs y materiales PBR | Desplegar UVs, pintar un material metallic‑roughness y exportar bien. | Diagramas de desplegado + comparación de exportaciones correcta/incorrecta | medio | 90 min |
| 8.8 | Blender III: rigging y animación | Riggear con armature, pesar vértices y exportar clips con nombre. | Guía + `robot.glb` y `rover.glb` descargables + reproductor de los clips exportados | alto | 100 min |
| 8.9 | Optimizar: gltf-transform, Draco y KTX2 | Reducir peso sin destruir calidad, y **medir** el resultado. | Tablas medidas con las herramientas reales: original vs Draco por modelo, y PNG vs KTX2 ETC1S/UASTC por textura | alto | 80 min |
| 8.10 | Los 10 errores con modelos | Diagnosticar los fallos clásicos con un procedimiento. | Las 10 escenas rotas, una por error, con su síntoma y su arreglo | medio | 70 min |

**Punto de fricción típico:** el alumno descarga un modelo y no sabe qué contiene. La lección 8.4 y el **visor de
modelos** de la web (arrastrar un `.glb` y ver estructura, animaciones, peso y polígonos) están diseñados como
herramienta permanente, no como demo de una lección.

---

## Módulo 9 — Drei y utilidades (6 lecciones · 4 h 15)

| # | Lección | Objetivo | Demo | Nivel | Tiempo |
|---|---|---|---|---|---|
| 9.1 | Drei: el mapa de atajos | Saber qué problema resuelve drei y cómo importar sin inflar el bundle. | Buscador de componentes de drei con una demo mínima de cada uno | intro | 40 min |
| 9.2 | Texto en 3D | Escribir texto en la escena con `Text` y `Text3D`. | Tipómetro 3D con tipografías locales, alineación y anclaje | medio | 50 min |
| 9.3 | Helpers de escena | Usar `Center`, `Bounds`, `Float`, `Environment` y `Stage` sin abusar. | Modelo descolocado que se endereza y encuadra con `Center` + `Bounds` | medio | 50 min |
| 9.4 | `Html`: UI anclada a objetos | Anclar HTML a un punto 3D y conocer sus límites. | Etiquetas HTML sobre piezas de un modelo, con `occlude` y `transform` | medio | 45 min |
| 9.5 | `Instances`, `Clone` y `Preload` | Repetir geometría y precargar assets de forma eficiente. | 1 000 instancias frente a 1 000 mallas, con draw calls y FPS | alto | 45 min |
| 9.6 | `View`: varios viewports, un canvas | Renderizar dos cámaras en un mismo contexto WebGL. | Comparador entre dos canvas y un `View` doble: memoria y draw calls | alto | 45 min |

---

## Módulo 10 — Física con Rapier (6 lecciones · 5 h 30)

| # | Lección | Objetivo | Demo | Nivel | Tiempo |
|---|---|---|---|---|---|
| 10.1 | Física en el navegador y Rapier | Explicar qué simula Rapier, por qué es WASM y qué no debe simularse. | Caída libre comparada: cinemática a mano vs Rapier | intro | 45 min |
| 10.2 | `Physics` y `RigidBody` | Configurar el mundo y los tres tipos de cuerpo. | Tres cuerpos (dinámico, fijo, cinemático) ante el mismo impulso | intro | 55 min |
| 10.3 | Colliders | Elegir forma de collider y ajustarla a la malla. | Un mismo objeto con cinco colliders distintos y su comportamiento visible | medio | 60 min |
| 10.4 | Fuerzas e impulsos | Aplicar impulsos, fuerzas y velocidad con criterio. | Lanzador de cajas con control de impulso, masa y gravedad | medio | 55 min |
| 10.5 | Eventos y sensores | Detectar colisiones y usar sensores sin reventar el rendimiento. | Zona de meta con sensor que cuenta objetos y dispara una reacción | medio | 55 min |
| 10.6 | Estabilidad y rendimiento | Evitar tunneling, jitter y físicas caras. | Comparador de `timestep`/substeps con 200 cuerpos y FPS en vivo | alto | 60 min |

---

## Módulo 11 — Postprocesado, shaders y render targets (8 lecciones · 7 h 40)

| # | Lección | Objetivo | Demo | Nivel | Tiempo |
|---|---|---|---|---|---|
| 11.1 | `EffectComposer` | Entender el render a textura y montar la cadena de efectos. | Interruptor de postprocesado con el coste en ms por frame | medio | 55 min |
| 11.2 | Efectos: bloom, SSAO, DoF, viñeta | Elegir y ordenar efectos según la intención. | Panel con seis efectos activables y su impacto medido | medio | 60 min |
| 11.3 | GLSL: el pipeline | Explicar vertex/fragment, uniforms, varyings y precisión. | Shader mínimo editable que pinta un patrón y muestra las UVs | alto | 70 min |
| 11.4 | `shaderMaterial` en R3F | Crear un material propio con uniforms animados y `extend`. | Material con uniforms controlables por sliders | alto | 65 min |
| 11.5 | Efectos prácticos | Implementar fresnel, dissolve, scan holográfico y desplazamiento. | Cuatro efectos conmutables sobre el mismo modelo | alto | 75 min |
| 11.6 | `onBeforeCompile` | Modificar un material estándar sin perder luces ni sombras. | Comparación entre material propio y material estándar parcheado | alto | 65 min |
| 11.7 | Render targets y `useFBO` | Renderizar a una textura y usarla como fuente (espejos, portales, minimapas). | Minimapa en vivo con `useFBO` y espejo real con `MeshReflectorMaterial` | alto | 55 min |
| 11.8 | WebGPU y TSL: el mapa del futuro | Situar WebGPU y Three Shading Language sin depender de ellos. | Escena idéntica en WebGL y, si el navegador lo soporta, WebGPU | alto | 45 min |

---

## Módulo 12 — Rendimiento (6 lecciones · 5 h 25)

| # | Lección | Objetivo | Demo | Nivel | Tiempo |
|---|---|---|---|---|---|
| 12.1 | Anatomía de un frame | Medir antes de optimizar: draw calls, CPU, GPU y overdraw. | Escena de prueba con métricas en vivo (draw calls, triángulos, ms) | alto | 55 min |
| 12.2 | Re-renders | Detectar y eliminar renders innecesarios de React. | Escena instrumentada que muestra qué componente re-renderiza y por qué | alto | 60 min |
| 12.3 | Instancing | Dibujar miles de objetos con una sola llamada. | 10 000 objetos: mallas sueltas vs `InstancedMesh` vs `BatchedMesh` | alto | 60 min |
| 12.4 | LOD y culling | Reducir lo que se dibuja cuando no se ve o no hace falta. | Bosque con `Detailed` y culling activable | alto | 50 min |
| 12.5 | Presupuesto móvil | Fijar y respetar un presupuesto de rendimiento por dispositivo. | Modo móvil simulado con dpr, sombras y postprocesado degradables | alto | 55 min |
| 12.6 | Memoria y `dispose` | Liberar geometrías, materiales y texturas sin fugas. | Escena que crea y destruye objetos: memoria del navegador con y sin `dispose` | alto | 55 min |

---

## Módulo 13 — Estado y arquitectura (6 lecciones · 4 h 55)

| # | Lección | Objetivo | Demo | Nivel | Tiempo |
|---|---|---|---|---|---|
| 13.1 | Zustand | Compartir estado entre UI y escena sin re-renderizar el mundo. | Panel HTML que controla la escena y contador de renders por componente | medio | 55 min |
| 13.2 | Estructura de un proyecto real | Organizar carpetas, límites y tipos entre escena, UI y estado. | Mapa navegable de la arquitectura del proyecto final | medio | 45 min |
| 13.3 | Carga de assets y pantallas de carga | Usar `useProgress`, `Suspense` y precarga para que la espera se sienta rápida. | Pantalla de carga real con progreso y transición | medio | 50 min |
| 13.4 | Audio posicional | Colocar sonido en el espacio 3D y controlarlo desde React. | Fuente de sonido que se mueve y se atenúa al alejar la cámara | medio | 50 min |
| 13.5 | Robustez | Manejar errores, ausencia de WebGL y límites de memoria. | Fallback accesible cuando no hay WebGL, y error boundary que no mata la página | alto | 50 min |
| 13.6 | Accesibilidad en 3D | Hacer una experiencia 3D usable con teclado, lector de pantalla y movimiento reducido. | Panel de controles alternativos que opera la escena sin ratón, y `prefers-reduced-motion` | medio | 55 min |

---

## Módulo 14 — Proyecto final integrador (9 lecciones · 7 h)

> Ver la sección **Proyecto final** más abajo para el detalle completo.

| # | Lección | Entregable |
|---|---|---|
| 14.0 | Presentación y checklist | Comprensión del alcance y de los criterios de evaluación |
| 14.A | Fase A — Planificación y estructura | Repositorio con arquitectura y contratos de datos |
| 14.B | Fase B — Escena base, cámara y luces | Diorama navegable con iluminación correcta |
| 14.C | Fase C — Modelos y materiales | Modelos optimizados cargados, con PBR correcto |
| 14.D | Fase D — Interacción y estado | Selección, configuración y UI sincronizada |
| 14.E | Fase E — Animación y física | Piezas animadas y física estable |
| 14.F | Fase F — Efectos, sonido y pulido | Postprocesado, shader propio y audio |
| 14.G | Fase G — Optimización | Presupuesto de rendimiento cumplido y medido |
| 14.H | Fase H — Despliegue y revisión | Build desplegado y revisión final |

---

# PROYECTO FINAL — «Taller K‑7»

## La idea

**Un configurador‑explorador de un rover de exploración lunar dentro de un taller.**

La escena es un diorama de taller: una plataforma giratoria con el chasis del rover, una estantería de piezas, una
mesa de herramientas, un foco de trabajo y un ventanal con el paisaje lunar al fondo. El alumno **configura** el
rover eligiendo módulos (ruedas, panel solar, brazo robótico, antena) y **explora** el taller seleccionando
objetos, moviendo la cámara y lanzando piezas al suelo con física.

### Por qué esta idea y no otra

Se evaluaron tres candidatos:

| Candidato | A favor | En contra |
|---|---|---|
| Portfolio 3D (el clásico de los cursos) | Atractivo, bien conocido | No justifica física, ni estado complejo, ni piezas intercambiables; el alumno acaba copiando |
| Escena de scroll cinematográfica | Muy lucida | Casi no usa interacción real, ni física, ni configuración; el estado es trivial |
| **Configurador de producto (showroom)** — la sugerencia del enunciado | Fuerza estado, UI, selección, cámara | La física queda pegada con cinta adhesiva: no hay razón narrativa para que las cosas caigan |
| **Taller K‑7 (elegida)** | Es un showroom **que además tiene un taller**: la física es diegética (las piezas se montan y caen), las piezas intercambiables son la razón de ser del producto, el estado es el corazón de la app, y el audio posicional tiene un lugar natural (servos, golpes, ambiente) | Requiere producir modelos propios, lo que **es** una ventaja pedagógica porque obliga a recorrer el pipeline completo |

**Decisión:** el taller es un showroom con una excusa narrativa para cada requisito técnico. Ningún requisito queda
como un ejercicio artificial.

## Requisitos y cómo los cumple

| Requisito | Cómo se cumple | Módulo que lo enseña |
|---|---|---|
| Modelos propios optimizados con Draco/KTX2, cargados con gltfjsx | Rover y taller generados por un escritor de glTF propio en Node (script reproducible, nombres de nodo reales), exportados a GLB, comprimidos con Draco y medidos | 8 |
| Animaciones y partes intercambiables | Brazo con clip *deploy/stow*, ruedas con giro, cuatro slots de módulo | 8.5, 5.5 |
| Materiales PBR + HDRI + sombras | HDRI CC0 local, `Environment`, `ContactShadows` + sombra direccional | 4, 7 |
| Raycasting, selección, cámara y transiciones animadas | Hover/resaltado, selección por clic, vuelo de cámara por slot | 6 |
| Física con Rapier | Piezas que caen y encajan, cajas lanzables, modo «suelta tuercas» | 10 |
| Postprocesado + shader propio | Bloom, viñeta, DoF condicional + shader de escaneo holográfico y polvo volumétrico falso | 11 |
| Zustand | Selección, configuración, modo de cámara, progreso de montaje | 13.1 |
| UI HTML sobre el canvas sincronizada | Panel de módulos, ficha técnica con peso/energía calculados, tooltips anclados | 9.4, 13.1 |
| Audio posicional | Servos del brazo, golpes de pieza, ambiente del taller | 13.4 |
| Pantalla de carga con progreso + móvil | `useProgress`, `Suspense`, degradación de calidad | 13.3, 12.5 |
| Rendimiento medido | Instancing de tuercas y rocas, LOD de props, objetivo **60 fps en escritorio / 30 fps en móvil de gama media**, medido | 12 |
| Despliegue | Build estático con hash routing, desplegable en Vercel/Netlify/GitHub Pages | 14.H |

## Fases (mini‑curso)

| Fase | Objetivo | Checkpoint verificable |
|---|---|---|
| **A** — Planificación y estructura | Definir contratos de datos, estructura de carpetas y límites escena/UI | El proyecto arranca y muestra un canvas vacío con la UI del panel | |
| **B** — Escena base, cámara y luces | Diorama navegable, cámara con límites, iluminación y sombras | Se puede orbitar el taller y las sombras caen correctamente | |
| **C** — Modelos y materiales | Rover y taller cargados, PBR correcto, piezas identificables | Todos los nodos del rover se pueden listar por nombre desde consola | |
| **D** — Interacción y estado | Selección, hover, vuelo de cámara, panel de configuración | Elegir un módulo desde el HTML cambia la escena, y viceversa | |
| **E** — Animación y física | Animaciones de montaje, piezas que caen, giro de ruedas | Montar un módulo dispara su clip y la pieza se asienta sin vibrar | |
| **F** — Efectos, sonido y pulido | Postprocesado, shader de escaneo, audio posicional, transiciones | Seleccionar una pieza la escanea visualmente y suena en su posición | |
| **G** — Optimización | Instancing, LOD, dpr adaptativo, medición | 60 fps en escritorio con la escena completa; < 30 draw calls sin contar instancias | |
| **H** — Despliegue y revisión | Build, despliegue, accesibilidad, revisión final | URL pública funciona en móvil; Lighthouse ≥ 90 | |

Al final de cada fase el alumno tiene un **checkpoint** que puede comprobar por sí mismo, y el proyecto completo
está disponible como código de solución navegable en la web.

---

## Tabla de trazabilidad: ¿qué módulo usa cada parte del proyecto?

| Parte del proyecto | Módulos |
|---|---|
| `Canvas`, `dpr`, `frameloop`, tamaño responsive | 3.1, 5.6, 12.5 |
| Cámara, límites, transiciones | 1.1, 1.2, 6.3, 6.4 |
| Jerarquía del rover, pivotes de las ruedas | 1.6, 1.2 |
| Luces, sombras, HDRI | 4.1, 4.3, 4.4, 4.5 |
| Materiales PBR de las piezas | 3.4, 7.4, 7.5 |
| Texturas y `colorSpace` | 7.1, 7.2, 7.3 |
| Carga de GLB, `Suspense`, `gltfjsx` | 8.2, 8.3, 13.3 |
| Inspección del grafo, piezas intercambiables | 8.4 |
| Animaciones del brazo y las ruedas | 8.5, 5.5, 5.4 |
| Modelado del rover: guía de Blender + pipeline de modelos del curso | 8.6, 8.7, 8.8 |
| Draco y KTX2 | 8.9 |
| Hover, clic, selección, arrastre | 6.1, 6.2, 6.7 |
| Teclado (modo prueba) | 6.5 |
| Scroll de la ficha técnica | 6.6 |
| `Text` y etiquetas `Html` | 9.2, 9.4 |
| `Instances`, `Clone`, `Bounds` | 9.5, 9.3 |
| Segundo viewport / minimapa del taller | 9.6, 11.7 |
| Memoria y limpieza al cambiar de configuración | 12.6 |
| Accesibilidad de los paneles y del canvas | 13.6 |
| Nota sobre WebGPU (por qué el proyecto se queda en WebGL) | 11.8 |
| Física de piezas y cajas | 10.2, 10.3, 10.4, 10.5 |
| Estabilidad de la simulación | 10.6 |
| Bloom, viñeta, DoF | 11.1, 11.2 |
| Shader de escaneo | 11.3, 11.4, 11.5 |
| Animar materiales del rover con shader | 11.6 |
| Estado global y UI sincronizada | 13.1, 13.2 |
| Pantalla de carga | 13.3 |
| Audio posicional | 13.4 |
| Fallbacks y errores | 13.5 |
| Instancing, LOD, presupuesto | 12.1, 12.3, 12.4, 12.5 |
| Despliegue | 14.H |

## Retos extra (opcionales)

1. **Modo noche:** el taller se apaga y solo iluminan el panel solar y las luces de estado (bloom + luces puntuales).
2. **Segundo rover:** comparar dos configuraciones lado a lado con `View` y un canvas compartido.
3. **Guardar configuración:** serializar el estado en la URL para compartir un rover configurado.
4. **Modo cámara cinematográfica:** un recorrido automático con `CatmullRomCurve3` y cortes en los slots.
5. **XR:** abrir el taller en WebXR con `@react-three/xr` (solo si hay dispositivo).
6. **Editor de piezas:** permitir al alumno subir su propio `.glb` y asignarlo a un slot.
7. **Multijugador de vitrina:** sincronizar la configuración con otros usuarios (fuera del alcance del curso, se
   documenta el camino).

---

## Alcance real del curso: qué entra y qué queda fuera (a propósito)

Prometer «todo el ecosistema» obliga a decir también qué no entra. Es más honesto acotar que fingir cobertura.

**Entra con lección propia:** WebGL y el pipeline, three.js, R3F completo (Canvas, hooks, eventos, reconciliación),
drei, Rapier, postprocesado, shaders GLSL, render targets, instancing y LOD, memoria y `dispose`, Zustand, audio
posicional, accesibilidad, el pipeline completo de modelos (Blender → glTF → Draco/KTX2), despliegue y una
panorámica de WebGPU/TSL.

**Queda fuera, y se dice en la lección 11.8 y en el README:**

| Fuera | Por qué | Qué se ofrece en su lugar |
|---|---|---|
| Three.js Journey y Wawa Sensei | Son fuentes de conocimiento, no assets ni código | Enlaces en «Para profundizar» de cada lección |
| `@react-three/xr` (VR/AR) | Requiere hardware; no evaluable en navegador de escritorio | Reto extra nº 5 con punto de partida |
| Servidor autoritativo multijugador | Es otro curso | Reto extra nº 7 + enlaces |
| `@react-three/offscreen` y Web Workers | Caso avanzado poco común, API inestable | Mención en 12.1 |
| SSR de `<Canvas>` con React 19 | Frágil hoy; el curso es una SPA | Nota explícita en 13.5 y en el README |
| Animación facial / morph targets avanzados | Nicho | Mención en 8.1 y 8.8 |

## Formato de las lecciones (y por qué son cortas)

Cada lección ocupa entre **250 y 500 palabras de teoría**: no es una versión resumida, es el formato correcto
para aprender haciendo. La estructura fija es:

1. Objetivo de aprendizaje (1–2 frases)
2. Explicación con una analogía concreta
3. **Demo interactiva** en vivo + código a la vista
4. **«Pruébalo tú»**: reto concreto en el editor en vivo
5. Errores típicos y cómo depurarlos
6. Mini‑quiz (3–5 preguntas)
7. «Para profundizar» (enlaces a las fuentes de `RESEARCH.md`)
8. Tiempo estimado y dificultad

Las demos se construyen sobre una **biblioteca de componentes parametrizables** compartida (una docena de piezas
reutilizadas con distintas props). Eso no reduce la cobertura: evita duplicar código y hace que el alumno vea el
mismo concepto con otro vestido, que es exactamente el repaso espaciado que buscamos.


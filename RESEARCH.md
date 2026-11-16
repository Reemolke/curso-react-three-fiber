# RESEARCH.md — Investigación previa al curso

> Fecha de la investigación: **6 de noviembre de 2026**
> Autor del curso: equipo de desarrollo (orquestador + especialistas)
> Alcance: ecosistema React Three Fiber / three.js, pipeline de modelos 3D, fuentes de assets y pedagogía.

Este documento resume **qué se comprobó, con qué fuente y qué decisiones se tomaron**. Todo el texto está
parafraseado: no se ha copiado contenido ni código de los cursos de referencia. Los enlaces a las fuentes
originales se repiten en cada lección bajo el epígrafe «Para profundizar».

---

## 1. Método

La investigación se hizo en tres frentes:

1. **Verificación empírica de versiones y compatibilidad** contra el registro de npm (`npm view`), que es la
   fuente de verdad de lo que se puede instalar hoy. Los resultados están en el apartado 2.
2. **Lectura de documentación oficial** (R3F, drei, three.js, glTF, Blender, Sandpack) y de la estructura
   pública de los cursos de referencia.
3. **Comprobación de licencias** de cada fuente de assets antes de decidir usarla.

Todas las URLs citadas en este documento se comprobaron con una petición HTTP antes de escribirlas
(las que devolvieron error se sustituyeron por su repositorio oficial). Se indica cuando algo **no** se pudo
verificar y se explica cómo se resolvió.

---

## 2. Versiones verificadas y matriz de compatibilidad

Salida real de `npm view <paquete> version` en el equipo de desarrollo (Node 22.13.0, npm 11.6.1):

| Paquete | Versión verificada | Nota |
|---|---|---|
| `react` / `react-dom` | **19.3.1** | Fiber 9 exige `>=19 <19.4`; 19.3.1 cumple justo |
| `three` | **0.187.0** | peer de fiber: `>=0.156`; drei: `>=0.159` |
| `@react-three/fiber` | **9.8.2** | renderer para React 19 |
| `@react-three/drei` | **10.7.9** | peer `@react-three/fiber ^9` |
| `@react-three/rapier` | **2.2.0** | peer `@react-three/fiber ^9.0.4` |
| `@react-three/postprocessing` | **3.2.2** | peer `postprocessing ^6.36` |
| `postprocessing` | **6.39.6** | |
| `zustand` | **5.1.0** | |
| `@react-spring/three` / `@react-spring/web` | **10.1.2** | |
| `vite` | **8.3.6** | |
| `@vitejs/plugin-react` | **6.2.1** | peer `vite ^8` |
| `tailwindcss` / `@tailwindcss/vite` | **4.3.5** | configuración CSS-first (`@theme`) |
| `typescript` | **5.9.3** (fijado) | `latest` es 7.0.2, pero se descarta por riesgo de toolchain; ver 6.2 |
| `@types/three` | **0.187.0** | |
| `@gltf-transform/cli` | **4.5.1** | |
| `sharp` | **0.35.5** | dependencia de `gltf-transform` para texturas |
| `maath` | **0.10.8** | utilidades de easing/geometría |
| `three-stdlib` | **2.36.1** | |
| `troika-three-text` | **0.53.1** | motor de texto de drei `<Text>` |
| `leva` | **0.10.1** | panel de debug (se usa en lecciones de depuración) |

### 2.1 Conjunto mutuamente compatible que usa el curso

```
react 19.3.1 · react-dom 19.3.1 · three 0.187.0
@react-three/fiber 9.8.2 · @react-three/drei 10.7.9
@react-three/rapier 2.2.0 · @react-three/postprocessing 3.2.2 · postprocessing 6.39.6
zustand 5.1.0 · @react-spring/three 10.1.2
vite 8.3.6 · @vitejs/plugin-react 6.2.1 · tailwindcss 4.3.5 · typescript 5.9.3
```

**Regla del curso:** estas versiones se fijan con `~`/exactas en `package.json` y no se actualizan a mitad de
curso. Cualquier lección que necesite otra versión lo dice explícitamente.

### 2.2 Cambios importantes recientes que afectan al material didáctico

- **Fiber 8 vs Fiber 9.** El salto de major está atado a React: Fiber 8 ↔ React 18, **Fiber 9 ↔ React 19**.
  La documentación oficial lo dice sin rodeos: «Fiber es un renderer de React y debe emparejarse con una
  versión mayor de React». Consecuencia para el curso: **todos los tutoriales de 2023‑2024 que usan Fiber 8
  están desfasados en el `package.json`**, aunque el 90 % de la API siga siendo idéntica.
- **`three` ya no publica builds CommonJS sanos para bundlers de navegador.** Desde `three@0.186.0` la entrada
  CommonJS llama a `process.emitWarning`, que el bundler en el navegador de Sandpack no implementa. Está
  documentado por el propio equipo de pmndrs. Ver el conflicto en 6.1: es el hallazgo que más condiciona la
  arquitectura de los ejercicios interactivos.
- **Tono de color e intensidades.** El flujo moderno de three es `outputColorSpace = SRGBColorSpace` (por
  defecto) y luces en unidades físicas. Los tutoriales antiguos que ponían `renderer.outputEncoding` o
  `physicallyCorrectLights` están obsoletos; esas propiedades ya no existen con esos nombres.
- **Drei creció hasta ser casi un framework.** Componentes que antes se escribían a mano (`Environment`,
  `ContactShadows`, `Bounds`, `Center`, `Instances`, `ScrollControls`, `useGLTF`) hoy son una línea. El curso
  enseña primero el concepto a mano y **después** el atajo de drei, para que el atajo no sea magia.
- **Rapier 2** consolidó `<Physics>`, `<RigidBody>` y los hooks de paso de física; el paquete ya no expone
  el API de `usePlane`/`useBox` de la v1.
- **`@react-three/postprocessing` 3** exige `postprocessing 6.36+` y Fiber 9.7+. Mezclar la v2 con Fiber 9
  produce errores de tipos y de contexto de render; se avisa en la lección 11.1.

---

## 3. Qué enseñan los buenos cursos y en qué orden

### 3.1 Referencias analizadas

| Fuente | Qué se extrajo |
|---|---|
| **Three.js Journey** (Bruno Simon) — <https://threejs-journey.com/> | Es el referente de profundidad: enseña WebGL por dentro, shaders, y trata el modelo 3D como ciudadano de primera (importar, optimizar, comprimir, animar). Confirma que **los shaders y el glTF no son “avanzado opcional”: son parte del núcleo**. |
| **Wawa Sensei — React Three Fiber: The Ultimate Guide** — <https://wawasensei.dev/courses/react-three-fiber> | Es la referencia más cercana a nuestro objetivo (R3F puro). Su índice público muestra el orden real: *Fundamentals* (setup, objetos, transforms, cámara, debug, luces, sombras, hooks de React, hooks de R3F) → *Core* (controles, eventos, **modelos 3D**, texturas de imagen y vídeo, HTML, texto, pantalla de carga, scroll, animaciones, física) → *Master* (staging, views, camera controls, render target, postprocesado, optimización) → *Shaders* → *VFX*. Cierra con un portfolio completo. **Nuestro temario sigue este esqueleto y lo amplía con el pipeline de modelos 3D, que allí es una sola lección de 15 min.** |
| **Discover three.js** — <https://www.discoverthreejs.com/> | Aporta el enfoque “un proyecto, muchos capítulos” y la idea de construir primero el *esqueleto* de la app y luego rellenarlo. De ahí tomamos la estructura del proyecto final en fases. |
| **Manual de three.js** — <https://threejs.org/manual/> | Orden canónico de conceptos: fundamentos → primitivas → grafo de escena → materiales → texturas → luces → cámaras → sombras → niebla → geometría propia → instancing → animación → skinning → optimización → carga de glTF. Nuestros módulos 1–7 son una traducción de ese orden al mundo React. |
| **Ejemplos oficiales** — <https://threejs.org/examples/> | Catálogo de lo que el motor sabe hacer; se usa como «para profundizar» y como referencia visual de lo alcanzable. |
| **Drei** — <https://drei.docs.pmnd.rs/> | El índice de componentes es, de facto, el mapa de utilidades que un proyecto real acaba necesitando. Inspira el módulo 9. |
| **Codrops** — <https://tympanus.net/codrops/> | Referencia de ambición visual y de *timing* en animaciones de cámara y scroll. |
| **pmndrs** — <https://github.com/pmndrs> | Ejemplos reales de producción; los repos de `react-three-fiber`, `drei`, `gltfjsx`, `react-three-rapier` y `react-postprocessing` son la documentación de último recurso. |

### 3.2 Consenso de orden

Las cuatro fuentes coinciden en este esqueleto, y el curso lo respeta:

```
mental model (qué es WebGL / escena-cámara-renderer)
  → transformaciones (posición, rotación, escala)
  → cámara
  → luz
  → sombra
  → materiales y texturas
  → interacción
  → assets externos (modelos)
  → animación
  → física
  → postprocesado y shaders
  → rendimiento
  → proyecto completo
```

**Divergencia detectada:** Wawa Sensei coloca «3D Models» **antes** de texturas de imagen y animación; Three.js
Journey coloca la importación de modelos **después** de dominar materiales y luces. Criterio seguido: **después
de materiales y luces** (módulo 8 tras 4 y 7). Motivo: un modelo importado sin saber qué es un mapa de normales
ni por qué se ve negro es el escenario donde más gente abandona; con el módulo 7 hecho, el 8 se convierte en
«aplicar lo que ya sabes».

### 3.3 Dónde se atasca la gente (y por eso el curso lo ataca de frente)

Cada punto se convierte en una sección de «Errores típicos» de la lección correspondiente.

1. **Rotación con Euler y gimbal lock** — se intenta animar con tres ejes y el objeto «se traba». → 1.4, 1.5.
2. **Sistema de coordenadas y unidades** — el modelo importado mide 100 unidades, o aparece tumbado.
   Es el choque Blender (Z arriba, a veces cm) contra glTF (Y arriba, metros). → 1.2, 8.10.
3. **“No se ve nada”** — cámara dentro del objeto, `near/far` mal, objeto en el origen pero cámara mirando a
   otro lado, material sin luz. → 1.1, 3.1, 4.6.
4. **Todo negro con `meshStandardMaterial`** — no hay luces o no hay entorno. Es el error nº 1 del principiante
   que viene de `meshBasicMaterial`. → 3.4, 4.1.
5. **Texturas lavadas o oscuras** — `colorSpace` mal: el mapa de color debe ser sRGB, los mapas de datos
   (normal, roughness, AO) **no**. → 7.3.
6. **Shadow acne / sombras que no aparecen** — `castShadow`/`receiveShadow` olvidados, `shadow.camera` recortando
   la escena, `bias` mal ajustado, `mapSize` desproporcionado. → 4.3.
7. **Animar con `setState`** — 60 renders de React por segundo, la app se arrastra. La regla es `useFrame` +
   mutación de refs. → 5.1, 12.2.
8. **Re-render en cascada** — un store global que cambia y vuelve a renderizar toda la escena. → 12.2, 13.1.
9. **El modelo no carga** — ruta mal (Vite: `public/` se sirve desde `/`, no desde `src/`), CORS, mayúsculas,
   o falta el decodificador Draco. → 8.2, 8.10.
10. **Modelo gigante o enano** — el export de Blender no estaba en metros, o el alumno no sabe que 1 unidad = 1 m.
    → 8.10, 9.3 (`Center` + `Bounds`).
11. **Texturas invertidas (V flip)** — convención de UV de Blender/glTF contra otras herramientas. → 7.1, 8.10.
12. **Materiales rotos tras importar** — modificadores sin aplicar, materiales no exportables, texturas perdidas
    al mover el `.glb` sin embeber. → 8.7, 8.10.
13. **No saber qué hay dentro del modelo** — el alumno no puede seleccionar una pieza porque no conoce el grafo
    de nodos ni los nombres. → 8.4 (y el visor de modelos de la web).
14. **Draw calls** — 500 objects sueltos en vez de un `InstancedMesh`. → 12.1, 12.3.
15. **Física inestable** — colliders que no coinciden con la malla, masas absurdas, `trimesh` para todo. → 10.3, 10.6.
16. **Postprocesado que rompe el color** — orden de efectos, `toneMapping` duplicado, `multisampling` en WebGL2,
    pérdida de rendimiento en móvil. → 11.1, 11.2.
17. **Móvil** — `dpr` a 3, sombras de 4096, bloom a pantalla completa. → 12.5.

---

## 4. Pipeline de modelos 3D: hallazgos

### 4.1 glTF 2.0 (verificado en la especificación de Khronos)

Fuente: <https://registry.khronos.org/glTF/specs/2.0/glTF-2.0.html>

- glTF es un **formato de transmisión en tiempo de ejecución**, no de autoría: está diseñado para ser compacto
  y rápido de cargar, y deliberadamente **descarta** la información de autoría.
- Un asset glTF es un JSON (`.gltf`) + binarios (`.bin`) + imágenes; o todo empaquetado en un **GLB** (contenedor
  binario con chunks: JSON + BIN). En GLB no hay base64, así que es más pequeño que embeber en el JSON.
- **Sistema de coordenadas:** mano derecha, **Y hacia arriba**, y la unidad recomendada es el **metro**.
  Esto es la raíz del 90 % de los problemas de escala y orientación al venir de Blender (Z arriba).
- Estructura conceptual que el alumno debe dominar: `scene → nodes (jerarquía + transform) → mesh → primitives →
  accessors → bufferViews → buffers`. Un `accessor` describe *cómo leer* un trozo de binario (tipo, componente,
  count, min/max); un `bufferView` es la ventana sobre el buffer. Entender esto es lo que permite responder
  «¿por qué mi modelo pesa 40 MB?».
- **Animaciones:** canales que apuntan a un nodo y a una propiedad (`translation`, `rotation`, `scale`, `weights`),
  con samplers que interpolan (`STEP`, `LINEAR`, `CUBICSPLINE`). Las rotaciones se interpolan con **slerp**.
- **Skins:** joints + `inverseBindMatrices` + atributos `JOINTS_0`/`WEIGHTS_0`. El rigging no es magia: es una
  matriz por hueso mezclada por vértice.
- **Materiales:** el núcleo es **metallic‑roughness** (baseColor, metallic, roughness, normal, occlusion,
  emissive). Todo lo demás son extensiones (`KHR_materials_clearcoat`, `transmission`, `sheen`, `iridescence`…).
- **Extensiones clave para la web:** `KHR_draco_mesh_compression` (geometría comprimida),
  `KHR_texture_basisu` (texturas KTX2/Basis), `KHR_mesh_quantization`, `EXT_meshopt_compression`.
- **`extensionsRequired` vs `extensionsUsed`:** si una extensión está en `required` y el cargador no la soporta,
  el asset **no se puede** cargar. Es la causa de «este modelo no abre en three.js pero sí en Blender».

### 4.2 Por qué glTF y no FBX/OBJ

- **OBJ**: solo geometría (+ materiales MTL rudimentarios). Sin animación, sin skinning, sin PBR, sin jerarquía.
- **FBX**: formato de autoría propietario, verboso, con animación y rigging, pero pesado y con un parser enorme.
  Se usa como *intercambio entre herramientas*, no como formato de entrega web. (Existe `FBX2glTF` justamente
  para convertirlo.)
- **glTF/GLB**: estándar abierto de Khronos, pensado para runtime, con compresión, PBR y animación. Es lo que
  three.js y R3F cargan de forma nativa. **Decisión del curso: glTF/GLB exclusivamente**, y una nota de cómo
  convertir FBX/OBJ con Blender o gltf-transform.

### 4.3 Blender → glTF

Blender **4.5.15 LTS** está instalado y verificado en el equipo de desarrollo (`blender --version` →
`Blender 4.5.15 LTS`, build 2026‑10‑22). En vez de fiarme de la documentación (la URL del manual del exportador
de glTF devolvió 404 en la fecha de la investigación), **verifiqué las opciones del exportador consultando el RNA
del propio addon en Blender headless**. Las conclusiones prácticas:

- Exportar en **GLB** (un archivo, sin base64), con **`export_yup=True`** (conversión Z→Y incluida).
- **Aplicar modificadores** antes de exportar (`export_apply=True`): si no, el `Mirror`/`Subdivision` no viaja.
- **Normales y tangentes**: las tangentes solo se exportan si el material usa normal map; sin ellas, el normal map
  se ve raro o directamente plano.
- **Draco** está integrado en el exportador de Blender (`export_draco_mesh_compression_enable`), pero **el curso
  comprime después con `gltf-transform`**, para poder medir el antes/después y para aplicar también texturas
  (que Blender no convierte a KTX2).
- **Animación**: exportar en modo *Actions* para obtener un clip por acción con nombre; *NLA Tracks* cuando se
  quieren varias pistas combinadas; *Scene* para una sola animación horneada.
- **Gotchas documentados en el curso:** escala de la armature, `Apply Scale` antes de riggear, UVs fuera de 0–1,
  texturas no empaquetadas, materiales con nodos no soportados (se exportan como PBR aproximado), y el eje
  «hacia delante» distinto entre Blender y glTF.

### 4.4 gltfjsx y gltf-transform

- `gltfjsx` (pmndrs) convierte un `.glb` en un componente React con la jerarquía ya escrita y `useGLTF` cableado.
  Se verificará su salida real en el prototipo (flags y forma del componente) antes de escribir la lección 8.3.
- `gltf-transform` (Don McCurdy) es la navaja suiza de optimización. Comandos que usa el curso:
  `inspect`, `optimize`, `draco`, `uastc`, `etc1s`, `webp`, `resize`, `weld`, `prune`, `dedup`, `join`.
  El curso **mide** el efecto de cada uno sobre nuestros propios modelos (peso, triángulos, tiempo de carga) en
  lugar de repetir cifras de marketing.

### 4.5 Draco y KTX2

- **Draco** comprime geometría. Es *lossy* en la práctica si se baja la cuantización. Cuesta CPU al decodificar
  (WASM) y **necesita los ficheros del decodificador servidos en la app**. Alternativa sin decodificador:
  `EXT_meshopt_compression`.
- **KTX2 / Basis Universal** comprime texturas y las transcodifica en el dispositivo al formato nativo de la GPU
  (ETC/BC/ASTC). `ETC1S` comprime más y es más difuminado; `UASTC` conserva más calidad y ocupa más.
  Necesita el *transcoder* `basis_transcoder.wasm` en el cliente.
- **Verificado en el equipo:** `KTX-Software 4.4.2` instalado, `toktx.exe` disponible en
  `C:\Program Files\KTX-Software\bin`. Eso permite generar KTX2 reales y medir el resultado.

---

## 5. Fuentes de assets con licencia libre

Comprobado en la web oficial de cada fuente (no de terceros):

| Fuente | Licencia | Atribución | Uso comercial | Qué usamos |
|---|---|---|---|---|
| **Poly Haven** <https://polyhaven.com/> · <https://polyhaven.com/license> | **CC0** | No requerida | Sí | HDRIs de estudio y taller, alguna textura PBR |
| **Kenney** <https://kenney.nl/> · <https://kenney.nl/support> | **CC0** | No requerida | Sí | SFX de interfaz y de impacto |
| **Quaternius** <https://quaternius.com/> · <https://quaternius.com/license.html> | **QAL v1.0** (equivalente a CC0 en uso, **pero prohíbe redistribuir los assets como assets**) | No requerida | Sí | **Solo referencia visual**, no se redistribuyen sus ficheros |
| **ambientCG** <https://ambientcg.com/> | **CC0** | No requerida | Sí | Texturas PBR (hormigón, metal) |
| **Poly Pizza** <https://poly.pizza/> | **Varía por modelo** (CC0 y CC‑BY mezclados) | Depende del modelo | Depende | **No se usa**: licencia por fichero, riesgo alto |
| Modelos de ejemplo de Khronos | Variada por modelo | Depende | Depende | **No se usa** como asset del curso |

**Decisiones tomadas:**

1. **Todos los modelos del curso se crean desde cero en Blender mediante scripts**, con licencia del propio curso
   (CC BY 4.0 sobre los ficheros que generamos). Esto elimina cualquier duda de licencia, permite garantizar la
   topología, los nombres de nodos y las animaciones exactas que la lección necesita, y hace el curso
   reproducible: cualquiera puede regenerar los assets con el script incluido.
2. **Quaternius queda fuera del paquete descargable** aunque su licencia permita usarlos en un producto: su QAL
   prohíbe redistribuir los ficheros como assets, y este curso **es** una distribución de assets. Se citan como
   recurso externo recomendado para el alumno, no se empaquetan.
3. **Poly Pizza queda fuera** porque su licencia es por modelo y su ToS no permite descartar licencias
   no comerciales. Se menciona en `ASSETS.md` como fuente a revisar caso por caso.
4. **HDRIs, texturas y SFX** vienen de Poly Haven, ambientCG y Kenney (CC0), y se registran uno a uno en
   `ASSETS.md` con autor y licencia.

---

## 6. Conflictos entre fuentes y criterio adoptado

### 6.1 El conflicto importante: `three` 0.187 en el sitio vs `three` en el editor en vivo

**Hecho:** el stack verificado del curso usa `three@0.187.0`. Pero la documentación de pmndrs para Sandpack
(<https://docs.pmnd.rs/authoring/sandpack>) advierte que **`three` 0.186.0 o superior rompe el preview de
Sandpack**, porque su entrada CommonJS llama a `process.emitWarning`, que el bundler del navegador no
implementa. La propia documentación fija automáticamente `three` a **0.185.1** en esos sandboxes.

**Criterio adoptado:**

- Los **demos del sitio** compilan con Vite y usan `three@0.187.0` (versión verificada del curso).
- Los **ejercicios «Pruébalo tú»** usan Sandpack con `three@0.185.1`, `@react-three/fiber@9`, `@react-three/drei@10`.
- El código de ejemplo se escribe contra la **intersección** de ambas versiones: solo API estable, sin nada
  introducido en 0.186/0.187. Así el mismo snippet funciona en los dos entornos.
- Se avisa en la lección 0.3 y en el README: si un ejercicio en vivo falla por dependencias, es el bundler del
  sandbox, no el código.

Esta es una **divergencia deliberada y documentada**, no un descuido de versiones.

### 6.2 TypeScript: se fija 5.9.3, no la 7

`npm view typescript version` devuelve **7.0.2** (el compilador nativo), pero:
- No hay documentación pública de su compatibilidad con `@vitejs/plugin-react@6`.
- La resolución de tipos del JSX de R3F (`ThreeElements`, el namespace `JSX` de React 19) depende de cómo el
  compilador interpreta `jsxImportSource`; es justo el punto donde un cambio de compilador rompe más.
- El objetivo nº 1 del curso es que `npm install && npm run dev` funcione a la primera.

**Criterio:** `typescript` se fija en **5.9.3** (última 5.x estable, `npm view typescript@5.9.3 version`), que es la
rama con soporte probado por todo el ecosistema. La 7 se probará en una rama aparte cuando el toolchain la
soporte, y solo entonces se actualizará. La versión queda anotada en el README y en el `package.json`.

### 6.3 `<Environment preset="...">` de drei

Los *presets* de drei descargan el HDRI de un CDN externo en tiempo de ejecución. Dos fuentes lo dan por
supuesto y ninguna lo destaca como riesgo. **Criterio:** el curso **no usa presets**; sirve los HDRI como ficheros
locales en `public/hdr/` y usa `files="/hdr/…hdr"`. Motivo: el curso debe funcionar sin conexión, sin CORS
sorpresa y sin depender de la disponibilidad de un CDN ajeno.

---

## 7. Decisiones de arquitectura de la web (derivadas de la investigación)

| Decisión | Elección | Por qué |
|---|---|---|
| Bundler | **Vite 8** | Es lo que la propia doc de R3F recomienda para R3F, arranque instantáneo, `import.meta.glob` para indexar contenido |
| Contenido | **TypeScript estructurado** (no MDX) | Cada lección necesita demos, quizzes y sandboxes tipados; el contenido en `.ts` permite validar el temario con `tsc` y evita un compilador extra. La estructura de bloques hace trivial «añadir una lección» |
| Estilos | **Tailwind 4 CSS‑first** | Menos configuración, tokens en CSS, y control total del tema oscuro/claro |
| Router | **Hash router propio (~60 líneas)** | Cero dependencias, funciona en Vercel, Netlify y GitHub Pages sin rewrites ni `404.html` |
| Estado | **Zustand + persist** | Es la misma herramienta que enseña el módulo 13; el alumno puede leer el código del sitio como material |
| Editor en vivo | **Sandpack** con deps fijadas | Es la única opción que instala npm en el navegador sin backend propio; ver 6.1 |
| Canvas 3D | **Un `<Canvas>` por demo, montado solo al entrar en viewport, y `frameloop` pausado al salir** | Evita 8 contextos WebGL vivos en una misma página |
| Modelos | **glTF/GLB propios, comprimidos con Draco + KTX2** | Ver 5 |

---

## 8. Fuentes (lista completa)

**Documentación oficial**
1. React Three Fiber — <https://r3f.docs.pmnd.rs/> (instalación, Canvas, hooks, eventos, rendimiento, pitfalls)
2. Drei — <https://drei.docs.pmnd.rs/>
3. three.js — <https://threejs.org/docs/> · Manual — <https://threejs.org/manual/> · Ejemplos — <https://threejs.org/examples/>
4. glTF 2.0 Specification (Khronos) — <https://registry.khronos.org/glTF/specs/2.0/glTF-2.0.html>
5. Khronos glTF — <https://www.khronos.org/gltf/> · repo — <https://github.com/KhronosGroup/glTF>
6. Blender Manual — <https://docs.blender.org/manual/en/latest/>
7. KTX-Software — <https://github.com/KhronosGroup/KTX-Software>
8. MDN WebGL API — <https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API>

**Repositorios / librerías**
9. `pmndrs/react-three-fiber` — <https://github.com/pmndrs/react-three-fiber>
10. `pmndrs/drei` — <https://github.com/pmndrs/drei>
11. `pmndrs/gltfjsx` — <https://github.com/pmndrs/gltfjsx>
12. `pmndrs/react-three-rapier` — <https://github.com/pmndrs/react-three-rapier>
13. `pmndrs/react-postprocessing` — <https://github.com/pmndrs/react-postprocessing>
14. `donmccurdy/glTF-Transform` — <https://github.com/donmccurdy/glTF-Transform>
15. Sandpack — <https://sandpack.codesandbox.io/> · guía pmndrs — <https://docs.pmnd.rs/authoring/sandpack>

**Cursos y recursos de referencia (parafraseados, nunca copiados)**
16. Three.js Journey — <https://threejs-journey.com/>
17. Discover three.js — <https://www.discoverthreejs.com/>
18. Wawa Sensei — <https://wawasensei.dev/> · curso R3F — <https://wawasensei.dev/courses/react-three-fiber>
19. Codrops — <https://tympanus.net/codrops/>

**Assets**
20. Poly Haven — <https://polyhaven.com/> (licencia: <https://polyhaven.com/license>)
21. Kenney — <https://kenney.nl/> (licencia: <https://kenney.nl/support>)
22. ambientCG — <https://ambientcg.com/>
23. Quaternius — <https://quaternius.com/> (licencia: <https://quaternius.com/license.html>)
24. Poly Pizza — <https://poly.pizza/>

---

## 9. Lo que no se pudo verificar

- **Orden exacto del índice del manual de three.js**: la página se sirve como SPA y no expone el TOC en el HTML;
  el repo tampoco respondió en la ruta esperada. Se usa el orden conceptual (fundamentos → primitivas → grafo →
  materiales → texturas → luces → cámaras → sombras → geometría → instancing → animación → skinning →
  optimización → carga de glTF), que coincide con el de las otras tres fuentes.
- **Documentación del exportador glTF de Blender**: la URL del manual devolvió 404. Resuelto consultando el RNA
  del addon en Blender 4.5.15 headless (evidencia más fiable que la doc).
- **Compatibilidad de TypeScript 7 con el toolchain**: sin documentación pública. Se valida empíricamente en la
  fase de prototipo.

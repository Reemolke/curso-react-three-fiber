# Curso práctico de React Three Fiber y three.js

Web de aprendizaje en español (España, tuteo) que va de **cero absoluto a nivel avanzado** en 3D para la web.
No es un temario para leer: cada concepto tiene una demo viva, un editor donde escribir código y un proyecto
final que obliga a usarlo todo junto.

- **14 módulos · 90 lecciones · proyecto final en 8 fases.**
- Cada lección: objetivo, explicación corta, demo R3F real, «Pruébalo tú» con Sandpack, errores típicos,
  quiz de 3–5 preguntas, recursos y tiempo/nivel.
- Todo el 3D que se ve está generado por el propio proyecto (**66 KB de modelos, 720 KB de texturas,
  401 KB de HDRIs, 146 KB de audio**), sin assets de terceros y con la licencia registrada en `ASSETS.md`.

---

## 1. Arrancar

Requisitos: **Node 20 o superior** y npm.

```bash
npm install
npm run dev        # http://localhost:5173
```

Para comprobar el build de producción tal y como lo verá el servidor:

```bash
npm run build      # tsc --noEmit + vite build
npm run preview    # http://localhost:4173
```

> `npm run build` **falla si hay un error de tipos**. El proyecto compila con `strict`, `noUnusedLocals`,
> `noUnusedParameters` y `verbatimModuleSyntax`; no hay forma de colar código muerto.

### Scripts

| Script | Qué hace |
|---|---|
| `npm run dev` | Servidor de desarrollo con HMR |
| `npm run build` | Typecheck completo y build estático en `dist/` |
| `npm run preview` | Sirve `dist/` en el puerto 4173 |
| `npm run typecheck` | Solo `tsc --noEmit` |
| `npm run assets:modelos` | Genera los 6 `.glb` desde cero (escritor de glTF propio) |
| `npm run assets:optimizar` | Aplica Draco a los `.glb` y los deja en `public/modelos/` |
| `npm run assets:texturas` | Genera los 10 PNG (codificador PNG propio + ruido fBm) |
| `npm run assets:hdri` | Genera los 3 `.hdr` (escritor Radiance RGBE propio) |
| `npm run assets:audio` | Genera los 5 WAV (síntesis, PCM 16 mono 22 050 Hz) |
| `npm run assets:fuentes` | Copia Roboto 400/700 desde `@fontsource/roboto` |

Los assets ya están versionados en `public/`: no hace falta ejecutar los scripts para arrancar el curso.
Sirven para reproducirlos y para entender el pipeline (módulo 8).

---

## 2. Versiones verificadas

El curso está escrito y probado contra estas versiones; las lecciones citan sus APIs concretas.

| Paquete | Versión |
|---|---|
| `react` / `react-dom` | 19.3.1 |
| `three` | 0.187.0 |
| `@react-three/fiber` | 9.8.2 |
| `@react-three/drei` | 10.7.9 |
| `@react-three/rapier` | 2.2.0 |
| `@react-three/postprocessing` + `postprocessing` | 3.2.2 · 6.39.6 |
| `zustand` | 5.1.0 |
| `vite` | 8.3.6 |
| `tailwindcss` | 4.3.5 |
| `typescript` | 5.9.3 |

**Excepción documentada:** los ejercicios de Sandpack fijan `three@0.185.1`. A partir de `three 0.186` el
preview de Sandpack se rompe por cómo resuelve el bundle de tres; el código de los ejercicios se escribe contra
la intersección de ambas versiones. Está explicado en `RESEARCH.md` §6.1 y en la lección 1.4.

---

## 3. Mapa del proyecto

```
├── src/
│   ├── contenido/          # El temario, en TypeScript (no MDX)
│   │   ├── tipos.ts        # Unión `Bloque`, `Leccion`, `Modulo`, `Pregunta`
│   │   ├── modulos.ts      # Array de los 14 módulos, en orden
│   │   ├── indice.ts       # Derivados: buscar lección, siguiente, porcentajes
│   │   └── m00.ts … m14.ts # Una lección = un objeto; añadir lección = añadir objeto
│   ├── demos/              # Demos 3D, una carpeta por módulo
│   │   ├── registro.ts     # `demos3d` y `widgets`: id → componente lazy
│   │   ├── marco.tsx       # `DemoEscena`, `Deslizador`, `Interruptor`, `GrupoOpciones`
│   │   └── m00/ … m14/     # `registro.ts` de cada módulo + sus demos
│   ├── tres/               # Infraestructura 3D compartida
│   │   ├── DemoCanvas.tsx  # Canvas lazy + IntersectionObserver + pausa + ErrorBoundary
│   │   ├── rutas.ts        # `rutaAsset()`, MODELOS, TEXTURAS, HDRIS, AUDIO, FUENTES
│   │   └── gltf.ts         # `useGLTF` con decodificador Draco ya configurado
│   ├── proyecto-final/     # El capstone: tienda, escena, shader y página
│   ├── estado/progreso.ts  # localStorage: lecciones, quizzes, proyecto
│   ├── ui/                 # Layout, sidebar, buscador, quiz, bloques, páginas
│   ├── playground/         # Escena libre editable
│   ├── visor/              # Arrastrar un .glb y ver estructura, animaciones y peso
│   └── router/             # Router propio por hash (~70 líneas)
├── public/                 # Assets servidos tal cual (ver ASSETS.md)
├── assets-src/             # Generadores: modelos, texturas, HDRIs, audio, fuentes
├── RESEARCH.md             # Fuentes, versiones y hallazgos de la investigación
├── CURRICULUM.md           # Temario detallado y especificación del proyecto final
├── ASSETS.md               # Licencias y procedencia de cada fichero de public/
└── AUTHORING.md            # Guía de estilo para escribir lecciones
```

Rutas de la web (todas por hash, sin configuración de servidor):

```
#/                           inicio + ruta recomendada
#/leccion/0.1                una lección
#/modulo/8                   índice de un módulo
#/playground                 escena libre
#/visor                      visor de .glb por arrastre
#/proyecto                   el proyecto final y sus 8 fases
#/progreso                   tu progreso guardado
#/creditos                   licencias y atribuciones
```

---

## 4. Cómo añadir una lección

El contenido es TypeScript, no MDX: el temario se valida con `tsc` y una lección mal escrita no compila.

**1. Añade el objeto al módulo** (`src/contenido/m07.ts`, por ejemplo):

```ts
{
  id: '7.7',
  modulo: 7,
  titulo: 'Anisotropía',
  objetivo: 'Entender cuándo subir la anisotropía de una textura y cuánto cuesta.',
  nivel: 'medio',          // 'intro' | 'medio' | 'alto'
  minutos: 40,
  bloques: [
    { tipo: 'parrafo', texto: 'Texto con **negritas** y `código` en línea.' },
    { tipo: 'demo', id: 'm07-anisotropia', titulo: 'Opcional' },
    { tipo: 'codigo', lenguaje: 'tsx', codigo: '...' },
    { tipo: 'checkpoint', titulo: 'Lo que debe funcionar', items: ['...'] },
  ],
  errores: [{ sintoma: '...', causa: '...', arreglo: '...' }],
  quiz: [{ tipo: 'unica', enunciado: '...', opciones: ['a', 'b'], correcta: 0, explicacion: '...' }],
  recursos: [{ titulo: 'three: Texture', url: 'https://threejs.org/docs/#api/en/textures/Texture' }],
  ejercicio: { reto: '...', inicial: '...', solucion: '...', pistas: ['...'] },
}
```

La lista completa de bloques está en `src/contenido/tipos.ts`: `parrafo`, `destacado`, `lista`, `codigo`,
`demo`, `widget`, `demo-doble`, `tabla`, `pasos`, `imagen`, `visor`, `descarga` y `checkpoint`.

**2. Si la lección lleva demo**, créala en `src/demos/m07/` y regístrala:

```ts
// src/demos/m07/registro.ts
export const demosM07: RegistroDemos = {
  'm07-anisotropia': lazy(() => import('./Anisotropia')),
}
```

**3. Nada más.** El sidebar, el buscador, el progreso, el «siguiente» y los porcentajes se recalculan solos
porque todos derivan de `src/contenido/modulos.ts`.

### Reglas de las demos

- Usa `DemoEscena` de `src/demos/marco.tsx`: ya trae el marco, el estado de carga, el `ErrorBoundary` y los
  controles debajo del canvas.
- **Nunca** renderices HTML dentro de `<Canvas>`. Para controles usa la prop `controles` (debajo) y para HUD
  superpuesto la prop `capa` (encima, absoluta y con `pointer-events` bien puestos).
- Los canvas se montan con `IntersectionObserver` y se pausan fuera de pantalla; no hace falta gestionarlo.
- Si un ejercicio de Sandpack necesita un asset de `public/` o una dependencia nueva, **no funcionará**: ahí solo
  hay `three`, R3F, drei y React. Los módulos 7, 8, 9 y 13 usan por eso ejercicios procedurales en TypeScript.

---

## 5. Assets: todo se genera

No se descarga ni un modelo. `assets-src/` contiene los generadores:

| Generador | Salida | Técnica |
|---|---|---|
| `modelos/` | 6 `.glb` con Draco | Escritor de glTF propio sobre Node (`gltf.mjs`) + geometrías paramétricas |
| `texturas.mjs` | 10 PNG | Codificador PNG propio (filtrado adaptativo) + ruido fBm de 3 octavas |
| `hdri.mjs` | 3 `.hdr` | Escritor Radiance RGBE propio, proyección equirectangular |
| `audio.mjs` | 5 WAV | Síntesis aditiva con envolventes, PCM 16 mono 22 050 Hz |
| `toktx` 4.4.2 (externo) | 1 `.ktx2` | ETC1S con mipmaps a partir del PNG de hormigón: 70,3 → 23,0 KB |
| `fuentes/copiar.mjs` | 2 `.woff` | Copia desde `@fontsource/roboto` (OFL 1.1) |

Para inspeccionar los modelos sin abrir el navegador:

```bash
node assets-src/modelos/inspeccionar.mjs          # todos
node assets-src/modelos/inspeccionar.mjs rover    # uno
```

Licencias, autoría y cifras exactas: **`ASSETS.md`**.

---

## 6. Rendimiento medido

Medido con el panel de la lección 12.1 (dentro del bucle de render, escribiendo en el DOM y no en el estado de
React):

| Escena | fps | ms/frame | Draw calls | Triángulos |
|---|---|---|---|---|
| Escena base (12.1) | 180 | 5,56 | 151 | 18,0 k |
| Instancing (12.3) | 180 | 5,56 | 5 (1 + suelo) | 114,1 k |
| Sin instancing (12.4) | 180 | 5,55 | 91 | 1,1 k |
| **Capstone (Taller K-7)** | 180 | 5,6 | 128 | 4,8 k |

Entorno: Windows 11, Chrome, NVIDIA RTX 4060 Ti, canvas de 702 × 470. Los 180 fps son el tope del monitor:
la cifra útil es el tiempo de frame, no el número.

Detalles que cambian la medición y están explicados en el curso:

- Con `EffectComposer`, `gl.info.autoReset` debe desactivarse y llamar a `gl.info.reset()` cada frame. Si no,
  solo se lee el último pase (1 draw call, 1 triángulo) y las cifras mienten.
- En el build de producción `StrictMode` no duplica renders; los contadores de las demos son fiables ahí, no en
  el servidor de desarrollo.
- El suelo de la demo de instancing es una malla aparte: los draw calls reales son «estrategia + 1».

**Medido en escritorio, no en hardware móvil.** El proyecto implementa las medidas (`dpr={[1, 2]}`, pausa fuera
de pantalla, sombras a 1024, postprocesado desactivable) y la fase G pide la tabla móvil, pero las cifras de esta
tabla son de un PC. Lo que sí está medido en perfil móvil es el arranque y la carga: Lighthouse emula una CPU
4× más lenta y una red lenta, y son las cifras de §6.1. Un teléfono real con GPU integrada dará otros números, y
no se inventan.

### 6.1 Lighthouse (móvil, sobre `npm run preview`)

Medido con Lighthouse 12 sobre el build de producción, perfil móvil por defecto: pantalla de 412 × 823,
CPU 4× más lenta (`cpuSlowdownMultiplier: 4`) y red simulada de 1,6 Mbps con 150 ms de RTT. Es emulación, no un
teléfono real, y las cifras se presentan como tales.

| Categoría | Puntuación |
|---|---|
| Rendimiento | **93** |
| Accesibilidad | **100** |
| Buenas prácticas | **100** |
| SEO | **100** |

Números del informe: FCP 2,6 s · LCP 2,6 s · TBT 0 ms · CLS 0.

Lo que hizo falta para llegar ahí, y que sirve como lección de rendimiento real:

1. **Nada de three.js en la primera pantalla.** `PaginaLeccion`, `PaginaPlayground` y `PaginaProyecto` son
   `lazy()` en `src/App.tsx`. Si se importan de forma estática, Vite precarga el chunk de three (1,2 MB
   comprimido) antes de pintar y el primer render se va a 10 s en móvil.
2. **El helper de precarga de Vite, en su propio chunk.** `manualChunks` de `vite.config.ts` asigna
   `vite/preload-helper` y el polyfill a un chunk `arranque` de 2 KB. Sin esa regla, rolldown los metía dentro del
   chunk de Sandpack y la entrada importaba el editor de código entero (268 kB) solo para pedir un `<link>`.
3. **Sandpack fuera de la precarga** (`build.modulePreload.resolveDependencies`) y cargado solo al pulsar
   «Abrir editor en vivo»: ~266 kB que no descarga quien solo lee.
4. **`public/robots.txt` real.** Sin él, el servidor devolvía el `index.html` en `/robots.txt` y Lighthouse lo
   marcaba como inválido.

Carga inicial resultante: ~290 kB comprimidos (185 kB de aplicación + 85 kB de React + 10 kB de CSS).

---

## 7. Despliegue

`vite.config.ts` usa `base: './'` y el router es por hash. Eso significa que **el mismo `dist/` funciona en la
raíz de un dominio, en un subdirectorio y en GitHub Pages** (`/nombre-del-repo/`) sin tocar nada ni configurar
rewrites.

### GitHub Pages (incluido)

El workflow está en `.github/workflows/desplegar.yml`. Al empujar a `main`:

1. `npm ci` y `npm run build`.
2. Sube `dist/` como artefacto de Pages y lo publica.

Solo hay que activar *Settings → Pages → Source: GitHub Actions* en el repositorio.

### Vercel / Netlify

Build: `npm run build` · Directorio de salida: `dist`. No hace falta ninguna reescritura.

### Antes de dar por bueno un despliegue

- [ ] `npm run build` pasa sin errores de tipos.
- [ ] `npx vite preview` y los modelos cargan sin 404 en la pestaña Red.
- [ ] Recargar en `#/leccion/8.4` devuelve la misma página.
- [ ] En una ventana de 390 × 844 se puede orbitar, montar módulos y leer el texto.

---

## 8. Accesibilidad

- Navegación completa por teclado, con foco visible y `aria-pressed` en los botones de estado.
- Los paneles HTML sobre el canvas son DOM normal: se tabulan y se activan con `Enter`.
- `prefers-reduced-motion` se respeta de verdad (lecciones 13.6 y capstone): la cámara salta en vez de volar,
  el plato deja de girar y las animaciones ambientales se detienen.
- Los cambios de estado que importan se anuncian con `aria-live="polite"`.
- Si no hay WebGL2, la demo lo dice y el resto de la lección sigue disponible.
- Contraste de texto conforme a AA en los dos temas (claro y oscuro). Verificado con Lighthouse, no a ojo: la
  auditoría `color-contrast` da 0 nodos problemáticos y accesibilidad puntúa 100.

---

## 9. Limitaciones conocidas (honestas)

| Limitación | Por qué | Dónde se explica |
|---|---|---|
| No se distribuyen `.blend` de práctica | No hay binario de Blender en el entorno de desarrollo | 8.6–8.8: guía paso a paso, enlaces oficiales, visor, y `.glb` descargables para importar en Blender |
| Los modelos no tienen esqueleto | Geometría paramétrica; el rigging se enseña, no se empaqueta | 8.5, 8.8 |
| Sandpack va con `three@0.185.1` | `three >= 0.186` rompe el preview de Sandpack | `RESEARCH.md` §6.1, lección 1.4 |
| El chunk de `three` pesa ~1,19 MB | Es three + drei + stdlib entero; va aparte y solo se descarga al abrir una ruta con 3D | 12.7 |

---

## 10. Documentación del proyecto

- `RESEARCH.md` — fuentes consultadas, versiones verificadas y contradicciones encontradas (con el criterio usado).
- `CURRICULUM.md` — temario completo, dependencias entre lecciones y especificación del proyecto final.
- `ASSETS.md` — licencias, autoría y cifras de todo lo que hay en `public/`.
- `AUTHORING.md` — guía de estilo para escribir lecciones nuevas con el mismo tono y estructura.

Licencias del software: three.js, R3F, drei, Rapier y postprocessing son **MIT**; los decodificadores Draco y
Basis que distribuye three son **Apache 2.0**; Roboto es **OFL 1.1**. Los assets propios son **CC BY 4.0**.
Detalle completo en `ASSETS.md` y en la página `#/creditos`.

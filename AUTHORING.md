# Cómo escribir lecciones y demos

Contrato de autoría para cualquiera (persona o agente) que añada contenido a este curso.
Si sigues esto, tu módulo entra sin tocar el trabajo de los demás.

---

## 1. Qué archivos son tuyos

Cada módulo `NN` tiene exactamente dos zonas de escritura:

```
src/contenido/mNN.ts            ← el texto de las lecciones
src/demos/mNN/*.tsx             ← los componentes de demo
src/demos/mNN/registro.ts       ← el registro de esas demos
```

**No toques nunca** (los cablea el integrador, en serie, al final):

- `src/contenido/modulos.ts`
- `src/demos/registro.ts`
- `package.json`, `vite.config.ts`, `tsconfig.json`
- `src/ui/**`, `src/tres/**`, `src/estado/**`, `src/router/**`, `src/contenido/tipos.ts`

Tampoco crees carpetas nuevas fuera de `src/demos/mNN/`. Si necesitas un asset, no lo inventes:
descríbelo en un comentario y avisa en el informe final.

---

## 2. Modelo de contenido

El temario son objetos TypeScript, no MDX. La fuente de verdad de los tipos es
`src/contenido/tipos.ts`; `src/contenido/m00.ts` es el ejemplo canónico de estilo y
estructura — léelo entero antes de escribir.

```ts
export const moduloN: Modulo = {
  numero: N,
  titulo: '…',
  descripcion: 'Una frase que venda el módulo.',
  lecciones: [ /* … */ ],
}
```

### Campos obligatorios de cada lección

| Campo | Regla |
| --- | --- |
| `id` | `'N.1'`, `'N.2'`… exactamente como en `CURRICULUM.md`. Sin ceros a la izquierda. |
| `modulo` | El número del módulo. |
| `titulo` | El de `CURRICULUM.md`, sin cambios. |
| `objetivo` | 1–2 frases: qué sabrá *hacer* al terminar. Verbo en infinitivo. |
| `nivel` | `'intro' \| 'medio' \| 'alto'` según `CURRICULUM.md`. |
| `minutos` | El de `CURRICULUM.md`. |
| `bloques` | El cuerpo. Ver §3. |
| `errores` | 3 filas mínimo: síntoma → causa → arreglo. Concretos, no genéricos. |
| `quiz` | 4 preguntas mínimo, mezclando `unica`, `multiple` y `verdadero-falso`. |
| `recursos` | 2–3 enlaces reales a documentación oficial. |
| `ejercicio` | Obligatorio. Ver §5. |

### Bloques disponibles

`parrafo`, `destacado` (`tono: info | ojo | truco | porque`), `lista`, `codigo`,
`demo`, `widget`, `demo-doble`, `tabla`, `pasos`, `imagen`, `visor`, `descarga`,
`checkpoint`.

Orden recomendado: párrafo de enganche → demo/widget → explicación con analogía →
`destacado` de tipo `porque` → código → lista o tabla → `destacado` de tipo `ojo` o `truco`.

---

## 3. Reglas de escritura

- **Español de España**, tuteo, tono directo. Sin «vosotros» forzado ni «ustedes».
- **Máximo 30 % teoría.** Por cada idea nueva, el alumno tiene que hacer algo: mirar una
  demo interactiva, tocar un control, leer código, resolver el ejercicio.
- **Un concepto nuevo por lección.** Si algo pertenece a un módulo posterior, nómbralo en
  una línea y di «esto se ve en el módulo X»; no lo uses como si estuviera explicado.
- **Analogías concretas**, no decorativas: «una luz direccional es el sol; una puntual es
  una bombilla» sirve, «la luz es como la vida» no.
- **Sin copiar.** Nada de pegar texto de la documentación. Parafrasea y enlaza.
- **Cifras verificables.** Si dices «cuesta X ms», o lo mides o no lo dices.
- Nada de emojis. Sí se permite `→`, `≈`, `·`, `✓` dentro de texto.
- Los acentos y la ñ importan: `posición`, `cámara`, `año`, `también`.

Extensión sana por lección: 250–500 palabras de prosa (sin contar código ni quiz).

---

## 4. Demos

### 4.1 Dónde va cada tipo

- **`demo`** — usa WebGL (`<Canvas>`). Registro: `demosMNN`.
- **`widget`** — no usa WebGL: diagramas, canvas 2D, simulaciones de UI. Registro: `widgetsMNN`.

Si dudas, pregúntate: ¿necesito `three`? Si la respuesta es no, es un `widget` y arranca
mucho más rápido.

### 4.2 API disponible

```ts
import { Marco, DemoEscena, GrupoOpciones, Deslizador, Interruptor } from '../marco'
```

- `<Marco titulo="…">{children}</Marco>` — marco para demos sin WebGL. Cabecera ya incluida.
- `<DemoEscena titulo descripcion controles? alto? camara? fov? sombras? nota?>`
  — canvas 3D perezoso + controles HTML debajo. `descripcion` es obligatoria y va a
  lectores de pantalla. Los `controles` van **fuera** del canvas, siempre.
- `<GrupoOpciones etiqueta valor opciones onChange />` — botones excluyentes.
- `<Deslizador etiqueta valor min max paso? sufijo? onChange />`.
- `<Interruptor etiqueta activo onChange />`.

Reglas duras:

1. **Nunca** un `<Canvas>` suelto: siempre a través de `DemoEscena`. Así la demo se monta
   solo al acercarse, se pausa fuera de pantalla y no tumba la lección si falla.
2. Los controles son React normal, fuera del canvas. No metas `<div>` dentro de `<Canvas>`.
3. Estado que cambia a 60 fps → `useFrame` + `ref`. Estado que cambia al pulsar → `useState`.
4. Cada demo lleva un `descripcion` que diga qué se ve y qué se puede hacer.
5. Componente con `export default`. Nada de props obligatorias: la demo se instancia sola.

### 4.3 Registro del módulo

```ts
// src/demos/mNN/registro.ts
import { lazy } from 'react'
import type { RegistroDemos } from '../registro'

export const demosMNN: RegistroDemos = {
  'mi-demo': lazy(() => import('./MiDemo')),
}

export const widgetsMNN: RegistroDemos = {
  'mi-widget': lazy(() => import('./MiWidget')),
}
```

Los ids son `kebab-case` y únicos en todo el curso: prefíjalos con el módulo si hay riesgo
(`m3-selector-geometria`, no `selector`).

### 4.4 Prohibiciones en demos

- **Nada de assets externos.** No hay HDRIs, texturas ni modelos en `public/` todavía.
  No uses `<Environment preset="…">` de drei: descarga HDRIs de un CDN externo.
  Si una demo necesita un modelo, usa geometría procedural.
- **Nada de dependencias nuevas.** Solo lo que ya está en `package.json`: `three`,
  `@react-three/fiber`, `@react-three/drei`, `@react-three/rapier`,
  `@react-three/postprocessing`, `postprocessing`, `zustand`, `@react-spring/three`.
- **Nada de red en tiempo de ejecución.** Ni fetch, ni texturas remotas, ni fuentes remotas.
- **Sin `Math.random()` en el render** (provoca parpadeos): genera los datos en `useMemo`.

### 4.5 Compatibilidad Sandpack

El código que muestres en `bloques` de tipo `codigo` y en `ejercicio` se escribe contra
`three@0.185.1`. Evita APIs introducidas después de esa versión. No importes
`three/addons/…` en snippets: usa `three/examples/jsm/…` o, mejor, drei.

---

## 5. Ejercicios «Pruébalo tú»

```ts
ejercicio: {
  reto: 'Una frase imperativa y concreta.',
  inicial: `…código que compila y arranca…`,
  solucion: `…código completo y correcto…`,
  pistas: ['3 pistas progresivas, de vaga a casi la respuesta'],
}
```

- `inicial` debe **ejecutarse** aunque no esté terminado: un `// TODO` y un resultado
  visible a medias. Nunca código roto a propósito (errores de sintaxis, imports que no
  existen).
- `solucion` debe ser la versión correcta y autosuficiente.
- Ambos son el contenido de `App.tsx` del sandbox: export por defecto, sin `ReactDOM`.
- Nada de estilos con Tailwind: el sandbox no lo tiene. `style={{}}` en línea.

---

## 6. Progresión: qué se puede usar en cada módulo

| Módulo | Puede dar por sabido |
| --- | --- |
| 0 | React básico: componente, props, `useState`, `useRef`, `useEffect` |
| 1 | Escena, cámara, renderer; coordenadas; vectores; Euler/cuaterniones; jerarquía |
| 2 | Reconciliación de R3F, `useThree`, refs, `<primitive>` |
| 3 | `<Canvas>`, `mesh`, geometrías, materiales básicos |
| 4 | Luces, sombras, HDRI, estudio con drei |
| 5 | `useFrame`, delta, lerp/damp, react-spring, secuencias, `invalidate` |
| 6 | Eventos de puntero, raycasting, `OrbitControls`, transiciones, teclado, scroll |
| 7 | UVs, texturas, `colorSpace`, mapas PBR, materiales avanzados |
| 8 | glTF, `useGLTF`, `gltfjsx`, grafo, `useAnimations`, Blender, optimización |
| 9 | drei: `Text`, `Center`, `Bounds`, `Html`, `Instances`, `View` |
| 10 | Rapier: cuerpos, colliders, impulsos, sensores, estabilidad |
| 11 | Postprocesado, GLSL, `shaderMaterial`, `onBeforeCompile`, FBO |
| 12 | Métricas, re-renders, instancing, LOD, presupuesto móvil, `dispose` |
| 13 | Zustand, estructura, carga de assets, audio, robustez, accesibilidad |

Si una demo necesita algo de un módulo posterior, no lo uses: cambia el ejemplo.

---

## 7. Verificación antes de entregar

```powershell
npm run typecheck      # debe salir limpio, sin warnings
npm run build          # debe compilar
```

`tsc` corre con `strict`, `noUnusedLocals`, `noUnusedParameters` y
`verbatimModuleSyntax`: los imports de tipos van con `import type`.

Comprueba además, a mano:

- [ ] Todos los ids de `CURRICULUM.md` para tus módulos existen, con su título exacto.
- [ ] Cada `{ tipo: 'demo' }` / `{ tipo: 'widget' }` tiene su entrada en `registro.ts`.
- [ ] Ninguna lección usa un concepto de un módulo posterior sin avisar.
- [ ] Ninguna demo importa assets de `public/` ni hace peticiones de red.
- [ ] Los quizzes se pueden corregir sin ambigüedad (una sola respuesta defendible).
- [ ] No has editado ningún archivo de la lista prohibida de §1.

Para ver tu módulo en la web hace falta cablearlo en `modulos.ts` y en `demos/registro.ts`.
Eso lo hace el integrador; tú entrega los archivos y di en el informe qué ids has añadido.

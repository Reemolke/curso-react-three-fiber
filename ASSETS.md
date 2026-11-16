# ASSETS.md — Licencias y procedencia de todos los recursos

> Última revisión: **17 de noviembre de 2026**, con el proyecto terminado y los ficheros de `public/` contados uno a uno.
> Estado de cada recurso: `planificado` → `generado` → `verificado`.

Este documento es el registro legal del curso: **todo lo que se sirve desde `public/` está aquí**, con autor,
licencia, fuente y si exige atribución.

---

## 1. Regla del curso

1. Nada entra en `public/` sin estar en este documento.
2. Si un recurso exige atribución, la atribución aparece **también en la interfaz** (página `/creditos`).
3. Los recursos con licencia ambigua **no se empaquetan**, aunque se citen como recomendación externa.
4. Los recursos propios se publican bajo **CC BY 4.0** y son reproducibles con los scripts de `assets-src/`.

---

## 2. Resumen por licencia

| Licencia | Recursos | Atribución | Redistribuir | Uso comercial |
|---|---|---|---|---|
| **CC BY 4.0** | Modelos, texturas, HDRIs, audio y tipografías generadas por el curso | Sí (`Curso R3F`) | Sí | Sí |
| **SIL OFL 1.1** | Tipografía Roboto (`@fontsource/roboto`) | Sí, con la licencia | Sí, con la licencia | Sí |
| **Apache 2.0** | Decodificadores Draco y Basis Universal que distribuye three.js; `toktx` 4.4.2 (herramienta de compilación, no se redistribuye) | Sí, con el aviso | Sí | Sí |
| **MIT** | three.js, React Three Fiber, drei, Rapier, postprocessing | No requerida | Sí | Sí |

**Decisión de diseño (y no solo legal):** los modelos **no se descargan de Sketchfab ni de Poly Pizza**. Se generan
con un escritor de glTF propio en Node (`assets-src/modelos/`). Así los nombres de nodo son los que la lección
necesita (`rueda_del_izq`, `panel_pivote`, `brazo_art1`), la topología es predecible y el alumno puede reproducir
cualquier asset con `npm run assets:modelos`. El precio es que no hay modelos orgánicos ni personajes con esqueleto;
se dice en la lección 8.5 y no se disimula.

---

## 3. Modelos 3D — `public/modelos/`

Todos **originales**, generados por `assets-src/modelos/generar.mjs` (geometría en `geometrias.mjs`, escritor glTF en
`gltf.mjs`, contenido en `modelos.mjs`). Licencia **CC BY 4.0**, autoría «Curso R3F».
Compresión **Draco** (malla) vía `npm run assets:optimizar`. Cifras medidas con `node assets-src/modelos/inspeccionar.mjs`.

| Fichero | Descripción | Nodos | Mallas | Triángulos | Peso | Animaciones |
|---|---|---|---|---|---|---|
| `caja.glb` | Cubo con UVs correctas (lecciones 8.1, 8.2) | 15 | 5 | 60 | 5,3 KB | — |
| `tuerca.glb` | Tuerca hexagonal; la usa la física de 10.x y el capstone | 2 | 1 | 96 | 1,6 KB | — |
| `lampara.glb` | Lámpara de taller con jerarquía de nodos con nombre (8.3) | 13 | 8 | 596 | 10,5 KB | — |
| `robot.glb` | Robot con dos piezas animadas (8.4, 11.5) | 20 | 11 | 324 | 11,9 KB | `hombro_der`, `cabeza` |
| `rover.glb` | Rover lunar completo, 4 módulos intercambiables | 29 | 16 | 444 | 16,8 KB | `panel_pivote`, `antena_mastil` |
| `taller.glb` | Diorama del proyecto final: suelo, paredes, mesa, estantería, bidones, plataforma | 30 | 19 | 1 108 | 19,9 KB | — |
| **Total** | | | | **2 628** | **66,0 KB** | |

Los nombres de nodo del rover son contrato público: `chasis`, `blindaje`, `bandeja`, `parachoques_del`,
`parachoques_tras`, `rueda_del_izq/der`, `rueda_tras_izq/der`, `buje_*`, `panel_pivote`, `panel_solar`, `celda_1..3`,
`brazo_base`, `brazo_art1/2`, `pinza_izq/der`, `antena_mastil`, `antena_plato`, `faro_izq/der`. La fase C del
proyecto final pide listarlos antes de dar la ficha por buena.

---

## 4. Texturas — `public/texturas/`

Generadas por `assets-src/texturas.mjs`: codificador PNG propio (filtrado adaptativo) y ruido fBm de tres octavas.
Nada de descargas. Licencia **CC BY 4.0**.

| Fichero | Resolución | Peso | Uso |
|---|---|---|---|
| `hormigon-color.png` | 512 × 512 | 70,3 KB | Mapa de color del suelo del taller |
| `hormigon-normal.png` | 256 × 256 | 90,9 KB | Normales del hormigón |
| `madera-color.png` | 512 × 512 | 134,0 KB | Vetas de la madera (mesa, banco, baldas) |
| `madera-normal.png` | 256 × 256 | 112,9 KB | Normales de la madera |
| `metal-color.png` | 512 × 512 | 56,0 KB | Metal cepillado |
| `metal-normal.png` | 256 × 256 | 150,1 KB | Normales del metal |
| `metal-rugosidad.png` | 256 × 256 | 14,9 KB | Mapa de rugosidad (canal R) |
| `rejilla-color.png` | 512 × 512 | 43,2 KB | Rejilla industrial |
| `rejilla-normal.png` | 256 × 256 | 47,0 KB | Normales de la rejilla |
| `emisivo-rejilla.png` | 256 × 256 | 0,6 KB | Emisivo de las luminarias |
| **Total** | | **719,9 KB** | |

Las normales van en espacio tangente y **sin flip de canal Y** (convención glTF/OpenGL); el detalle está en la
lección 7.3 como error típico.

### 4.1 Derivados KTX2 — `public/texturas/*.ktx2`

Comprimidos con **`toktx` 4.4.2** (KTX-Software, Apache 2.0) a partir de los PNG de arriba, con los comandos
exactos que aparecen en la lección 8.9. No se descargan de terceros: son el mismo píxel, otro formato.

| Fichero | Formato | Resolución | Peso | PNG de origen | Uso |
|---|---|---|---|---|---|
| `hormigon-color.ktx2` | ETC1S + mips | 512 × 512 | 23,0 KB | 70,3 KB | Comparativa PNG/KTX2 de la lección 8.9 |

| Medición | PNG | KTX2 | Diferencia |
|---|---|---|---|
| `hormigon-color`, sin mips | 70,3 KB | 13,7 KB | −80 % |
| `hormigon-color`, con mips | 70,3 KB | 23,0 KB | −67 % |
| `hormigon-normal` (ETC1S, `--normal_mode`) | 90,9 KB | 18,8 KB | −79 % |
| `madera-color` (UASTC + zstd) | 134,0 KB | 148,5 KB | +11 % |

La normal y la variante UASTC se midieron para la tabla de la lección pero **no se empaquetan**: solo se sirve el
`.ktx2` de color, que es el que usa la demo. La carga necesita el transcoder de Basis de `public/basis/`.

---

## 5. HDRIs — `public/hdri/`

Generadas por `assets-src/hdri.mjs`: escritor Radiance RGBE propio, proyección equirectangular. Licencia
**CC BY 4.0**. Son cielos sintéticos (estudio, exterior nublado y superficie lunar), no fotografías.

| Fichero | Resolución | Peso | Uso |
|---|---|---|---|
| `estudio.hdr` | 512 × 256 | 59,2 KB | Iluminación de estudio de las demos y del capstone |
| `exterior.hdr` | 1024 × 512 | 172,8 KB | Exterior nublado (lección 4.5) |
| `luna.hdr` | 1024 × 512 | 168,8 KB | Paisaje lunar (ventanal del taller) |
| **Total** | | **400,8 KB** | |

En tres.js se cargan con `HDRLoader` (no `RGBELoader`): el objeto que devuelve ya expone `width`, `height` y `data`.

---

## 6. Audio — `public/audio/`

Generado por `assets-src/audio.mjs`: síntesis aditiva y envolventes escritas a mano, WAV PCM 16 bits mono a
22 050 Hz. Licencia **CC BY 4.0**.

| Fichero | Duración | Peso | Uso |
|---|---|---|---|
| `clic.wav` | 0,09 s | 3,9 KB | Interacción de UI (13.4) |
| `paso.wav` | 0,28 s | 12,1 KB | Pisadas |
| `alerta.wav` | 0,62 s | 26,7 KB | Aviso de error / límite |
| `exito.wav` | 0,90 s | 38,8 KB | Confirmación de montaje |
| `motor-bucle.wav` | 1,50 s | 64,6 KB | Motor del rover, en bucle, con `PositionalAudio` |
| **Total** | | **146,2 KB** | |

Ninguno es una grabación de terceros: no hay atribución externa que arrastrar.

---

## 7. Tipografías — `public/fuentes/`

Copiadas del paquete **`@fontsource/roboto` 5.3.0** (SIL Open Font License 1.1) por
`npm run assets:fuentes` (`assets-src/fuentes/copiar.mjs`). La licencia completa viaja en
`node_modules/@fontsource/roboto/LICENSE` y se enlaza desde `/creditos`.

| Fichero | Peso | Uso |
|---|---|---|
| `roboto-400.woff` | 20,6 KB | Texto normal |
| `roboto-700.woff` | 20,7 KB | Títulos y énfasis |

Se sirven como `woff` suelto en lugar de con `@font-face` generado por Vite para que funcionen con `base: './'`
en GitHub Pages. En la lección 9.2 se explica por qué **no** se distribuye el `*.typeface.json` de `Text3D`:
es una fuente convertida con una herramienta de three que ya no se mantiene activamente, y el curso no la
necesita para enseñar `Text3D` con `Text` de drei.

---

## 8. Código de terceros empaquetado — `public/draco/` y `public/basis/`

Copiados de la distribución de **three.js 0.187.0** (`three/examples/jsm/libs/`). Licencia **Apache 2.0**.
No se modifican; se sirven tal cual porque el decodificador de Draco y el transcoder de Basis tienen que
resolverse como ficheros estáticos.

| Fichero | Peso | Para qué |
|---|---|---|
| `draco/draco_decoder.js` + `.wasm` + `draco_wasm_wrapper.js` | 1,1 MB | Fallback del decodificador |
| `draco/gltf/*` | 763 KB | Decodificador que usa `useGLTF` (`DRACO` en `src/tres/rutas.ts`) |
| `basis/basis_transcoder.js` + `.wasm` | 585 KB | `KTX2Loader`, necesario en la lección 8.9 |

> Los `.wasm` son grandes porque son binarios. Se cargan **solo** cuando hay un modelo comprimido, no al abrir la
> página. Aun así son el mayor peso estático del proyecto y se dice en la lección 12.7.

---

## 9. Qué se cita pero no se empaqueta

| Recurso | Por qué no está en `public/` |
|---|---|
| Modelos de Sketchfab, Poly Pizza, Kenney, Quaternius | El curso no los usa, pero se enlazan como alternativa en 8.5 con su licencia |
| HDRIs de Poly Haven | Se enlazan como fuente de HDRIs reales; los del curso son sintéticos y reproducibles |
| Texturas de ambientCG | Igual: se enlazan, no se descargan |
| Fuente `*.typeface.json` para `Text3D` | Herramienta en desuso; se explica la alternativa |
| Modelos `.blend` de práctica | No se distribuyen: no hay binario de Blender en el entorno de desarrollo. Las lecciones 8.6–8.8 son guías con enlaces oficiales, el visor de modelos y un `.glb` descargable para practicar la importación |

---

## 10. Checklist legal

- [x] Todo fichero de `public/` aparece en este documento.
- [x] Cada recurso tiene licencia explícita y, si la exige, atribución visible en `/creditos`.
- [x] Los recursos propios declaran autoría y licencia (CC BY 4.0).
- [x] Los binarios de terceros conservan su licencia (Apache 2.0) y su `README.md` original.
- [x] No hay recursos de licencia ambigua empaquetados.
- [x] Los scripts de `assets-src/` reproducen el 100 % de los recursos propios.

/**
 * Rutas de los assets del curso.
 *
 * Todo lo que se carga en tiempo de ejecución (modelos, texturas, HDRIs, audio)
 * pasa por aquí. La razón es `base: './'` en `vite.config.ts`: la web tiene que
 * funcionar servida desde la raíz y desde un subdirectorio (GitHub Pages), así
 * que una ruta absoluta como `/modelos/rover.glb` se rompería en producción.
 * `import.meta.env.BASE_URL` resuelve a `./` y el navegador la compone contra la
 * URL del documento.
 *
 * Los assets viven en `public/`, se generan con los scripts `assets:*` y su
 * licencia está en `ASSETS.md`. No se carga nada de red externa.
 */

const RAIZ = import.meta.env.BASE_URL

/** Compone una ruta absoluta de `public/` respetando el `base` de Vite. */
export function rutaAsset(ruta: string): string {
  return `${RAIZ}${ruta.replace(/^\/+/, '')}`
}

/**
 * Carpeta de decodificadores de Draco. Los `.wasm` se copiaron con
 * `npm run assets:draco`; sin esto, `useGLTF` falla al leer los modelos.
 */
export const DRACO = rutaAsset('draco/')

/** Modelos glTF binarios. Cifras medidas con `node assets-src/modelos/inspeccionar.mjs`. */
export const MODELOS = {
  /** 29 nodos · 2 clips (`desplegar_panel`, `girar_antena`) */
  rover: rutaAsset('modelos/rover.glb'),
  /** 30 nodos · sin animación · el diorama del proyecto final */
  taller: rutaAsset('modelos/taller.glb'),
  /** 13 nodos · 1 clip (`plegar`) · jerarquía de pivotes */
  lampara: rutaAsset('modelos/lampara.glb'),
  /** 15 nodos · sin animación */
  caja: rutaAsset('modelos/caja.glb'),
  /** 2 nodos · la pieza más pequeña del curso */
  tuerca: rutaAsset('modelos/tuerca.glb'),
  /** 20 nodos · 2 clips (`saludar`, `asentir`) */
  robot: rutaAsset('modelos/robot.glb'),
} as const

/** Texturas procedurales, todas según el estándar glTF. */
export const TEXTURAS = {  rejillaColor: rutaAsset('texturas/rejilla-color.png'),
  rejillaNormal: rutaAsset('texturas/rejilla-normal.png'),
  metalColor: rutaAsset('texturas/metal-color.png'),
  metalRugosidad: rutaAsset('texturas/metal-rugosidad.png'),
  metalNormal: rutaAsset('texturas/metal-normal.png'),
  maderaColor: rutaAsset('texturas/madera-color.png'),
  maderaNormal: rutaAsset('texturas/madera-normal.png'),
  hormigonColor: rutaAsset('texturas/hormigon-color.png'),
  hormigonNormal: rutaAsset('texturas/hormigon-normal.png'),
  emisivoRejilla: rutaAsset('texturas/emisivo-rejilla.png'),
} as const

/**
 * La misma textura de hormigón comprimida a KTX2 (ETC1S, con mipmaps).
 *
 * 512 × 512 · 23,0 KB frente a los 70,3 KB del PNG. No la carga `useTexture`:
 * `.ktx2` necesita `KTX2Loader` y el transcoder de Basis Universal, que se
 * sirve desde `public/basis/` (ver `BASIS`).
 */
export const KTX2 = {
  hormigonColor: rutaAsset('texturas/hormigon-color.ktx2'),
} as const

/** Carpeta del transcoder de Basis Universal (`.ktx2` → formato nativo de la GPU). */
export const BASIS = rutaAsset('basis/')

/** Mapas de entorno equirectangulares en Radiance `.hdr`. */export const HDRIS = {
  /** Estudio oscuro con tres softboxes: el mejor para ver reflejos. */
  estudio: rutaAsset('hdri/estudio.hdr'),
  /** Cielo con sol: iluminación de exterior. */
  exterior: rutaAsset('hdri/exterior.hdr'),
  /** Noche lunar: casi sin ambiente, para el proyecto final. */
  luna: rutaAsset('hdri/luna.hdr'),
} as const

/** Fuentes tipográficas locales para las demos de texto en 3D. */
export const FUENTES = {
  /** Roboto 400, subconjunto latino, SIL OFL 1.1. */
  regular: rutaAsset('fuentes/roboto-400.woff'),
  /** Roboto 700, para contraste de pesos. */
  negrita: rutaAsset('fuentes/roboto-700.woff'),
} as const

/** Efectos de sonido sintetizados. */
export const AUDIO = {
  clic: rutaAsset('audio/clic.wav'),
  paso: rutaAsset('audio/paso.wav'),
  /** Bucle de 1,5 s con un número entero de ciclos. */
  motor: rutaAsset('audio/motor-bucle.wav'),
  alerta: rutaAsset('audio/alerta.wav'),
  exito: rutaAsset('audio/exito.wav'),
} as const

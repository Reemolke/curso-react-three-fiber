/**
 * Definición de los modelos del curso.
 *
 * Cada función devuelve un `Modelo` listo para guardar. Los nombres de nodo son
 * parte del temario: las lecciones 8.4 y 8.5 los listan literalmente, así que no
 * se renombran sin actualizar el contenido.
 *
 * Licencia del resultado: CC BY 4.0, autor el propio curso (ver ASSETS.md).
 */

import { Modelo } from './gltf.mjs'
import { caja, cilindro, esfera, toro } from './geometrias.mjs'

// --------------------------------------------------------------------------- //
// Paleta (coincide con los tokens de la web)
// --------------------------------------------------------------------------- //

const PALETA = {
  estructura: '#8b93a3',
  oscuro: '#3a4150',
  acero: '#b9c2d0',
  acento: '#f5a524',
  azul: '#4d8df6',
  verde: '#3fbf87',
  madera: '#8a6242',
  maderaClara: '#a97c55',
  hormigon: '#5a616e',
  negro: '#1b1f27',
  halogeno: '#ffe9c4',
}

const GRIS_CLARO = '#d9dee8'
const COBRE = '#b5723a'
const PANEL_SOLAR = '#1d2a44'

// --------------------------------------------------------------------------- //
// 1. Rover lunar — protagonista del proyecto final
// --------------------------------------------------------------------------- //

export function construirRover() {
  const m = new Modelo('rover')

  const chasis = m.material({ nombre: 'rover_chasis', color: PALETA.estructura, metal: 0.75, rugosidad: 0.42 })
  const acento = m.material({ nombre: 'rover_acento', color: PALETA.acento, metal: 0.35, rugosidad: 0.38 })
  const oscuro = m.material({ nombre: 'rover_oscuro', color: PALETA.oscuro, metal: 0.6, rugosidad: 0.55 })
  const goma = m.material({ nombre: 'rover_rueda', color: PALETA.negro, metal: 0.15, rugosidad: 0.85 })
  const panel = m.material({ nombre: 'rover_panel_solar', color: PANEL_SOLAR, metal: 0.55, rugosidad: 0.22 })
  const cobre = m.material({ nombre: 'rover_cobre', color: COBRE, metal: 1, rugosidad: 0.32 })
  const luz = m.material({
    nombre: 'rover_faro',
    color: '#fff4d6',
    metal: 0,
    rugosidad: 0.3,
    emisivo: '#ffd88a',
    fuerza: 6,
  })

  const raiz = m.vacio('rover')

  // --- chasis --------------------------------------------------------------
  m.malla('chasis', caja([1.45, 0.28, 1.0]), chasis, { posicion: [0, 0.52, 0], padre: raiz })
  m.malla('blindaje', caja([1.12, 0.16, 0.86]), acento, { posicion: [0, 0.74, 0], padre: raiz })
  m.malla('bandeja', caja([0.98, 0.05, 0.74]), oscuro, { posicion: [0, 0.845, 0], padre: raiz })
  m.malla('parachoques_del', caja([0.1, 0.12, 0.98]), oscuro, { posicion: [0.76, 0.42, 0], padre: raiz })
  m.malla('parachoques_tras', caja([0.1, 0.12, 0.98]), oscuro, { posicion: [-0.76, 0.42, 0], padre: raiz })

  // --- ruedas --------------------------------------------------------------
  // El cilindro nace con eje Y; se gira 90° sobre X para que el eje sea Z.
  const ruedas = [
    ['rueda_del_izq', 0.46, 0.56],
    ['rueda_del_der', 0.46, -0.56],
    ['rueda_tras_izq', -0.5, 0.56],
    ['rueda_tras_der', -0.5, -0.56],
  ]

  for (const [nombre, x, z] of ruedas) {
    m.malla(nombre, cilindro(0.3, 0.17, { lados: 20 }), goma, {
      posicion: [x, 0.3, z],
      rotacion: [90, 0, 0],
      padre: raiz,
    })
    m.malla(`buje_${nombre.slice(6)}`, cilindro(0.12, 0.19, { lados: 14 }), cobre, {
      posicion: [x, 0.3, z],
      rotacion: [90, 0, 0],
      padre: raiz,
    })
  }

  // --- panel solar plegable ------------------------------------------------
  // Pivote en el borde trasero. Plegado = 90° (de pie); desplegado = 0° (tumbado).
  const pivotePanel = m.vacio('panel_pivote', { posicion: [-0.5, 0.87, 0], rotacion: [0, 0, 90], padre: raiz })
  m.malla('panel_solar', caja([0.96, 0.035, 0.7]), panel, { posicion: [0.48, 0, 0], padre: pivotePanel })

  for (let i = 0; i < 3; i += 1) {
    m.malla(`celda_${i + 1}`, caja([0.02, 0.04, 0.7]), cobre, {
      posicion: [0.18 + i * 0.3, 0.002, 0],
      padre: pivotePanel,
    })
  }

  // --- brazo robótico ------------------------------------------------------
  m.malla('brazo_base', cilindro(0.09, 0.12, { lados: 14 }), oscuro, { posicion: [0.62, 0.9, -0.28], padre: raiz })
  m.malla('brazo_art1', caja([0.08, 0.36, 0.08]), acento, { posicion: [0.62, 1.14, -0.28], padre: raiz })
  m.malla('brazo_art2', caja([0.3, 0.07, 0.07]), acento, { posicion: [0.78, 1.3, -0.28], padre: raiz })
  m.malla('pinza_izq', caja([0.09, 0.09, 0.03]), cobre, { posicion: [0.94, 1.3, -0.31], padre: raiz })
  m.malla('pinza_der', caja([0.09, 0.09, 0.03]), cobre, { posicion: [0.94, 1.3, -0.25], padre: raiz })

  // --- antena --------------------------------------------------------------
  m.malla('antena_mastil', cilindro(0.022, 0.62, { lados: 10 }), oscuro, { posicion: [-0.62, 1.14, -0.36], padre: raiz })

  const plato = m.malla(
    'antena_plato',
    cilindro(0.19, 0.14, { lados: 20, radioSuperior: 0.04 }),
    oscuro,
    { posicion: [-0.62, 1.46, -0.36], padre: raiz },
  )
  // Alimentador asimétrico: sin él, girar el plato sobre Y no se notaría.
  m.malla('antena_alimentador', caja([0.16, 0.02, 0.02]), cobre, {
    posicion: [0.08, 0.1, 0],
    padre: plato,
  })

  // --- faros ---------------------------------------------------------------
  m.malla('faro_izq', caja([0.06, 0.1, 0.16]), luz, { posicion: [0.72, 0.62, 0.36], padre: raiz })
  m.malla('faro_der', caja([0.06, 0.1, 0.16]), luz, { posicion: [0.72, 0.62, -0.36], padre: raiz })

  // --- animaciones ---------------------------------------------------------
  m.animacion('desplegar_panel', [
    {
      nodo: pivotePanel,
      claves: [
        { t: 0, rotacion: [0, 0, 90] },
        { t: 0.73, rotacion: [0, 0, 0] },
        { t: 1.13, rotacion: [0, 0, 12] },
        { t: 1.73, rotacion: [0, 0, 0] },
      ],
    },
  ])

  m.animacion('girar_antena', [
    {
      nodo: plato,
      interpolacion: 'LINEAR',
      claves: [
        { t: 0, rotacion: [0, 0, 0] },
        { t: 3.2, rotacion: [0, 360, 0] },
      ],
    },
  ])

  return m
}

// --------------------------------------------------------------------------- //
// 2. Taller — el diorama del proyecto final
// --------------------------------------------------------------------------- //

export function construirTaller() {
  const m = new Modelo('taller')

  const hormigon = m.material({ nombre: 'taller_hormigon', color: PALETA.hormigon, metal: 0.05, rugosidad: 0.92 })
  const pared = m.material({ nombre: 'taller_pared', color: '#6d7482', metal: 0, rugosidad: 0.95 })
  const metal = m.material({ nombre: 'taller_metal', color: PALETA.estructura, metal: 0.7, rugosidad: 0.48 })
  const madera = m.material({ nombre: 'taller_madera', color: PALETA.madera, metal: 0, rugosidad: 0.75 })
  const maderaClara = m.material({ nombre: 'taller_madera_clara', color: PALETA.maderaClara, metal: 0, rugosidad: 0.7 })
  const acento = m.material({ nombre: 'taller_acento', color: PALETA.acento, metal: 0.3, rugosidad: 0.45 })
  const azul = m.material({ nombre: 'taller_azul', color: PALETA.azul, metal: 0.4, rugosidad: 0.5 })
  const oscuro = m.material({ nombre: 'taller_oscuro', color: PALETA.negro, metal: 0.3, rugosidad: 0.7 })
  const luz = m.material({
    nombre: 'taller_luz',
    color: PALETA.halogeno,
    metal: 0,
    rugosidad: 0.4,
    emisivo: PALETA.halogeno,
    fuerza: 8,
  })

  const raiz = m.vacio('taller')

  // --- arquitectura --------------------------------------------------------
  m.malla('suelo', caja([8, 0.2, 8]), hormigon, { posicion: [0, -0.1, 0], padre: raiz })
  m.malla('pared_norte', caja([8, 3.4, 0.2]), pared, { posicion: [0, 1.7, 3.9], padre: raiz })
  m.malla('pared_oeste', caja([0.2, 3.4, 8]), pared, { posicion: [-3.9, 1.7, 0], padre: raiz })
  m.malla('zocalo_norte', caja([8, 0.18, 0.06]), oscuro, { posicion: [0, 0.09, 3.77], padre: raiz })
  m.malla('zocalo_oeste', caja([0.06, 0.18, 8]), oscuro, { posicion: [-3.77, 0.09, 0], padre: raiz })

  // --- mesa de trabajo -----------------------------------------------------
  m.malla('mesa_tablero', caja([2.4, 0.1, 1.2]), maderaClara, { posicion: [0.7, 0.92, -0.6], padre: raiz })
  const patas = [
    [1.78, -1.12],
    [1.78, -0.08],
    [0.38, -1.12],
    [0.38, -0.08],
  ]
  patas.forEach(([x, z], i) => {
    m.malla(`mesa_pata_${i + 1}`, caja([0.08, 0.9, 0.08]), metal, { posicion: [x, 0.45, z], padre: raiz })
  })

  // --- estantería ----------------------------------------------------------
  m.malla('estante_lat_izq', caja([0.06, 2.0, 0.5]), metal, { posicion: [-3.5, 1.0, -1.4], padre: raiz })
  m.malla('estante_lat_der', caja([0.06, 2.0, 0.5]), metal, { posicion: [-3.5, 1.0, 0.6], padre: raiz })
  ;[0.45, 1.0, 1.55, 1.95].forEach((y, i) => {
    m.malla(`estante_balda_${i + 1}`, caja([0.06, 0.05, 2.0]), madera, { posicion: [-3.5, y, -0.4], padre: raiz })
  })

  // --- banco y cajas -------------------------------------------------------
  m.malla('banco_trabajo', caja([1.6, 0.12, 0.6]), madera, { posicion: [-1.9, 1.0, 2.6], padre: raiz })
  m.malla('banco_pata_izq', caja([0.1, 0.95, 0.5]), metal, { posicion: [-2.6, 0.48, 2.6], padre: raiz })
  m.malla('banco_pata_der', caja([0.1, 0.95, 0.5]), metal, { posicion: [-1.2, 0.48, 2.6], padre: raiz })
  m.malla('caja_herramientas', caja([0.7, 0.28, 0.4]), acento, { posicion: [-1.9, 1.2, 2.6], padre: raiz })
  m.malla('caja_asa', caja([0.34, 0.06, 0.05]), oscuro, { posicion: [-1.9, 1.4, 2.6], padre: raiz })

  // --- bidones -------------------------------------------------------------
  ;[
    [-2.9, -2.4],
    [-2.2, -2.4],
  ].forEach(([x, z], i) => {
    m.malla(`bidon_${i + 1}`, cilindro(0.28, 0.85, { lados: 18 }), azul, { posicion: [x, 0.43, z], padre: raiz })
    m.malla(`bidon_aro_${i + 1}`, toro(0.28, 0.03, { segmentos: 18, anillos: 6 }), metal, {
      posicion: [x, 0.72, z],
      padre: raiz,
    })
  })

  // --- iluminación de techo (geometría emisiva, no luces reales) ----------
  m.malla('luminaria', caja([1.8, 0.06, 0.28]), luz, { posicion: [0.4, 3.0, 0.9], padre: raiz })
  m.malla('luminaria_soporte', caja([0.06, 0.4, 0.06]), metal, { posicion: [0.4, 3.2, 0.9], padre: raiz })

  // --- plataforma de montaje ----------------------------------------------
  m.malla('plataforma', cilindro(1.6, 0.12, { lados: 40 }), metal, { posicion: [0.7, 0.06, 0.9], padre: raiz })
  m.malla('plataforma_aro', toro(1.6, 0.035, { segmentos: 40, anillos: 6 }), acento, {
    posicion: [0.7, 0.12, 0.9],
    padre: raiz,
  })

  return m
}

// --------------------------------------------------------------------------- //
// 3. Lámpara articulada — jerarquía y pivotes
// --------------------------------------------------------------------------- //

export function construirLampara() {
  const m = new Modelo('lampara')

  const base = m.material({ nombre: 'lampara_base', color: PALETA.oscuro, metal: 0.8, rugosidad: 0.35 })
  const brazo = m.material({ nombre: 'lampara_brazo', color: PALETA.acero, metal: 0.9, rugosidad: 0.28 })
  const pantalla = m.material({ nombre: 'lampara_pantalla', color: PALETA.acento, metal: 0.2, rugosidad: 0.5 })
  const bombilla = m.material({
    nombre: 'lampara_bombilla',
    color: '#fff6dd',
    metal: 0,
    rugosidad: 0.2,
    emisivo: '#fff0c0',
    fuerza: 12,
  })
  const tornillo = m.material({ nombre: 'lampara_tornillo', color: '#2c313c', metal: 0.7, rugosidad: 0.4 })

  const raiz = m.vacio('lampara')

  m.malla('base', cilindro(0.24, 0.06, { lados: 28 }), base, { posicion: [0, 0.03, 0], padre: raiz })
  m.malla('pulsador', cilindro(0.035, 0.03, { lados: 10 }), pantalla, { posicion: [0.14, 0.075, 0], padre: raiz })

  const pivoteInferior = m.vacio('pivote_inferior', { posicion: [0, 0.06, 0], padre: raiz })
  m.malla('brazo_inferior', caja([0.055, 0.9, 0.055]), brazo, { posicion: [0, 0.45, 0], padre: pivoteInferior })

  const pivoteMedio = m.vacio('pivote_medio', { posicion: [0, 0.9, 0], rotacion: [0, 0, -12], padre: pivoteInferior })
  m.malla('brazo_superior', caja([0.05, 0.82, 0.05]), brazo, { posicion: [0, 0.41, 0], padre: pivoteMedio })

  const pivoteCabeza = m.vacio('pivote_cabeza', { posicion: [0, 0.82, 0], rotacion: [0, 0, -78], padre: pivoteMedio })

  // La pantalla nace con eje Y; se gira -90° sobre Z para que apunte hacia +X.
  m.malla('pantalla', cilindro(0.2, 0.2, { lados: 22, radioSuperior: 0.09 }), pantalla, {
    posicion: [0.04, 0, 0],
    rotacion: [0, 0, -90],
    padre: pivoteCabeza,
  })
  m.malla('bombilla', esfera(0.075, { segmentos: 14, anillos: 10 }), bombilla, {
    posicion: [0.14, 0, 0],
    padre: pivoteCabeza,
  })

  m.malla('tornillo_inferior', cilindro(0.035, 0.09, { lados: 10 }), tornillo, {
    posicion: [0, 0, 0.04],
    rotacion: [90, 0, 0],
    padre: pivoteInferior,
  })
  m.malla('tornillo_medio', cilindro(0.035, 0.09, { lados: 10 }), tornillo, {
    posicion: [0, 0, 0.035],
    rotacion: [90, 0, 0],
    padre: pivoteMedio,
  })
  m.malla('tornillo_cabeza', cilindro(0.03, 0.08, { lados: 10 }), tornillo, {
    posicion: [0, 0, 0.03],
    rotacion: [90, 0, 0],
    padre: pivoteCabeza,
  })

  m.animacion('plegar', [
    {
      nodo: pivoteMedio,
      claves: [
        { t: 0, rotacion: [0, 0, -12] },
        { t: 1.0, rotacion: [0, 0, -52] },
        { t: 2.0, rotacion: [0, 0, -12] },
      ],
    },
  ])

  return m
}

// --------------------------------------------------------------------------- //
// 4. Caja de carga
// --------------------------------------------------------------------------- //

export function construirCaja() {
  const m = new Modelo('caja')

  const madera = m.material({ nombre: 'caja_madera', color: PALETA.madera, metal: 0, rugosidad: 0.8 })
  const liston = m.material({ nombre: 'caja_liston', color: PALETA.maderaClara, metal: 0, rugosidad: 0.75 })
  const metal = m.material({ nombre: 'caja_metal', color: PALETA.oscuro, metal: 0.85, rugosidad: 0.4 })
  const marca = m.material({ nombre: 'caja_marca', color: PALETA.acento, metal: 0.1, rugosidad: 0.6 })

  const raiz = m.vacio('caja')

  m.malla('cuerpo', caja([0.52, 0.52, 0.52]), madera, { padre: raiz })

  const caras = [
    ['norte', [0, 0, 0.265], [0.54, 0.09, 0.02]],
    ['sur', [0, 0, -0.265], [0.54, 0.09, 0.02]],
    ['este', [0.265, 0, 0], [0.02, 0.09, 0.54]],
    ['oeste', [-0.265, 0, 0], [0.02, 0.09, 0.54]],
  ]

  for (const [nombre, posicion, tamano] of caras) {
    ;[-0.16, 0.16].forEach((y, i) => {
      m.malla(`liston_${nombre}_${i + 1}`, caja(tamano), liston, {
        posicion: [posicion[0], y, posicion[2]],
        padre: raiz,
      })
    })
  }

  ;[
    [0.255, 0.255],
    [0.255, -0.255],
    [-0.255, 0.255],
    [-0.255, -0.255],
  ].forEach(([x, z], i) => {
    m.malla(`esquinera_${i + 1}`, caja([0.06, 0.56, 0.06]), metal, { posicion: [x, 0, z], padre: raiz })
  })

  m.malla('etiqueta', caja([0.2, 0.12, 0.005]), marca, { posicion: [0, 0.02, 0.273], padre: raiz })

  return m
}

// --------------------------------------------------------------------------- //
// 5. Tuerca — pieza pequeña para física
// --------------------------------------------------------------------------- //

export function construirTuerca() {
  const m = new Modelo('tuerca')
  const acero = m.material({ nombre: 'tuerca_acero', color: PALETA.acero, metal: 1, rugosidad: 0.3 })

  const raiz = m.vacio('tuerca')
  m.malla('cuerpo', toro(0.09, 0.035, { segmentos: 6, anillos: 8 }), acero, { padre: raiz })

  return m
}

// --------------------------------------------------------------------------- //
// 6. Robot — animación con `useAnimations`
// --------------------------------------------------------------------------- //

export function construirRobot() {
  const m = new Modelo('robot')

  const cuerpo = m.material({ nombre: 'robot_cuerpo', color: GRIS_CLARO, metal: 0.25, rugosidad: 0.45 })
  const junta = m.material({ nombre: 'robot_junta', color: PALETA.oscuro, metal: 0.8, rugosidad: 0.35 })
  const acento = m.material({ nombre: 'robot_acento', color: PALETA.azul, metal: 0.3, rugosidad: 0.4 })
  const visor = m.material({
    nombre: 'robot_visor',
    color: '#7fe3ff',
    metal: 0.1,
    rugosidad: 0.2,
    emisivo: '#5fd8ff',
    fuerza: 5,
  })
  const piloto = m.material({
    nombre: 'robot_piloto',
    color: PALETA.verde,
    metal: 0,
    rugosidad: 0.3,
    emisivo: PALETA.verde,
    fuerza: 4,
  })

  const raiz = m.vacio('robot')

  m.malla('cuerpo', caja([0.44, 0.52, 0.32]), cuerpo, { posicion: [0, 0.95, 0], padre: raiz })
  m.malla('pecho', caja([0.02, 0.2, 0.3]), acento, { posicion: [0.22, 0.99, 0], padre: raiz })
  m.malla('cuello', cilindro(0.07, 0.08, { lados: 14 }), junta, { posicion: [0, 1.24, 0], padre: raiz })

  const cabeza = m.malla('cabeza', caja([0.3, 0.26, 0.26]), cuerpo, { posicion: [0, 1.4, 0], padre: raiz })
  m.malla('visor', caja([0.02, 0.08, 0.22]), visor, { posicion: [0.15, 1.42, 0], padre: raiz })
  m.malla('antena', cilindro(0.012, 0.2, { lados: 8 }), junta, { posicion: [0, 1.62, 0], padre: raiz })
  m.malla('piloto', esfera(0.028, { segmentos: 10, anillos: 8 }), piloto, { posicion: [0, 1.73, 0], padre: raiz })

  // --- brazos --------------------------------------------------------------
  const hombroIzq = m.vacio('hombro_izq', { posicion: [0, 1.14, 0.24], padre: raiz })
  m.malla('brazo_izq', caja([0.09, 0.42, 0.09]), cuerpo, { posicion: [0, -0.21, 0], padre: hombroIzq })
  m.malla('mano_izq', caja([0.1, 0.1, 0.1]), junta, { posicion: [0, -0.48, 0], padre: hombroIzq })

  const hombroDer = m.vacio('hombro_der', { posicion: [0, 1.14, -0.24], padre: raiz })
  m.malla('brazo_der', caja([0.09, 0.42, 0.09]), cuerpo, { posicion: [0, -0.21, 0], padre: hombroDer })
  m.malla('mano_der', caja([0.1, 0.1, 0.1]), junta, { posicion: [0, -0.48, 0], padre: hombroDer })

  // --- piernas -------------------------------------------------------------
  for (const [lado, z] of [['izq', 0.13], ['der', -0.13]]) {
    const cadera = m.vacio(`cadera_${lado}`, { posicion: [0, 0.7, z], padre: raiz })
    m.malla(`pierna_${lado}`, caja([0.13, 0.5, 0.13]), cuerpo, { posicion: [0, -0.25, 0], padre: cadera })
    m.malla(`pie_${lado}`, caja([0.2, 0.09, 0.22]), junta, { posicion: [0.03, -0.54, 0], padre: cadera })
  }

  // --- animaciones ---------------------------------------------------------
  // El brazo cuelga sobre -Y; girar -105° sobre Z lo sube por delante.
  m.animacion('saludar', [
    {
      nodo: hombroDer,
      claves: [
        { t: 0, rotacion: [0, 0, 0] },
        { t: 0.47, rotacion: [0, 0, -105] },
        { t: 0.87, rotacion: [0, 0, -88] },
        { t: 1.33, rotacion: [0, 0, -105] },
        { t: 2.0, rotacion: [0, 0, 0] },
      ],
    },
  ])

  m.animacion('asentir', [
    {
      nodo: cabeza,
      claves: [
        { t: 0, rotacion: [0, 0, 0] },
        { t: 0.33, rotacion: [0, 0, 14] },
        { t: 0.67, rotacion: [0, 0, -6] },
        { t: 1.0, rotacion: [0, 0, 0] },
      ],
    },
  ])

  return m
}

export const MODELOS = {
  rover: construirRover,
  taller: construirTaller,
  lampara: construirLampara,
  caja: construirCaja,
  tuerca: construirTuerca,
  robot: construirRobot,
}

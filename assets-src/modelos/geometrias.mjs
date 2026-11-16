/**
 * Generadores de geometría para el pipeline de assets.
 *
 * Todo devuelve `{ posiciones, normales }` con triángulos sin indexar: cada
 * vértice lleva su normal. Es la representación más simple de serializar y la
 * que mejor comprime Draco después.
 *
 * Convenio: Y es arriba, X es delante, Z es lateral (el mismo que usa three.js).
 */

function quad(a, b, c, d, normal) {
  const n = normal
  const posiciones = [...a, ...b, ...c, ...a, ...c, ...d]
  const normales = [...n, ...n, ...n, ...n, ...n, ...n]
  return { posiciones, normales }
}

function normalizar(v) {
  const longitud = Math.hypot(v[0], v[1], v[2]) || 1
  return [v[0] / longitud, v[1] / longitud, v[2] / longitud]
}

function normalDeTriangulo(a, b, c) {
  const u = [b[0] - a[0], b[1] - a[1], b[2] - a[2]]
  const v = [c[0] - a[0], c[1] - a[1], c[2] - a[2]]
  return normalizar([
    u[1] * v[2] - u[2] * v[1],
    u[2] * v[0] - u[0] * v[2],
    u[0] * v[1] - u[1] * v[0],
  ])
}

/** Caja centrada en el origen. `tamano` es [ancho X, alto Y, fondo Z]. */
export function caja([ancho, alto, fondo] = [1, 1, 1]) {
  const x = ancho / 2
  const y = alto / 2
  const z = fondo / 2

  const caras = [
    // +X
    quad([x, -y, z], [x, -y, -z], [x, y, -z], [x, y, z], [1, 0, 0]),
    // -X
    quad([-x, -y, -z], [-x, -y, z], [-x, y, z], [-x, y, -z], [-1, 0, 0]),
    // +Y
    quad([-x, y, z], [x, y, z], [x, y, -z], [-x, y, -z], [0, 1, 0]),
    // -Y
    quad([-x, -y, -z], [x, -y, -z], [x, -y, z], [-x, -y, z], [0, -1, 0]),
    // +Z
    quad([-x, -y, z], [x, -y, z], [x, y, z], [-x, y, z], [0, 0, 1]),
    // -Z
    quad([x, -y, -z], [-x, -y, -z], [-x, y, -z], [x, y, -z], [0, 0, -1]),
  ]

  return {
    posiciones: caras.flatMap((cara) => cara.posiciones),
    normales: caras.flatMap((cara) => cara.normales),
  }
}

/**
 * Cilindro o cono truncado con eje Y, centrado en el origen.
 * `radioInferior` y `radioSuperior` distintos dan un cono.
 */
export function cilindro(
  radioInferior,
  alto,
  { lados = 24, radioSuperior = radioInferior, tapas = true } = {},
) {
  const posiciones = []
  const normales = []
  const yInferior = -alto / 2
  const ySuperior = alto / 2
  const pendiente = radioSuperior - radioInferior

  for (let i = 0; i < lados; i += 1) {
    const a1 = (i / lados) * Math.PI * 2
    const a2 = ((i + 1) / lados) * Math.PI * 2

    const c1 = Math.cos(a1)
    const s1 = Math.sin(a1)
    const c2 = Math.cos(a2)
    const s2 = Math.sin(a2)

    const p1 = [radioInferior * c1, yInferior, radioInferior * s1]
    const p2 = [radioInferior * c2, yInferior, radioInferior * s2]
    const p3 = [radioSuperior * c2, ySuperior, radioSuperior * s2]
    const p4 = [radioSuperior * c1, ySuperior, radioSuperior * s1]

    // Normal analítica del lateral (ver nota en el README del pipeline).
    const n1 = normalizar([alto * c1, -pendiente, alto * s1])
    const n2 = normalizar([alto * c2, -pendiente, alto * s2])

    posiciones.push(...p1, ...p2, ...p3, ...p1, ...p3, ...p4)
    normales.push(...n1, ...n2, ...n2, ...n1, ...n2, ...n1)

    if (tapas) {
      // Tapa superior
      const centroSuperior = [0, ySuperior, 0]
      posiciones.push(...centroSuperior, ...p4, ...p3)
      normales.push(0, 1, 0, 0, 1, 0, 0, 1, 0)

      // Tapa inferior
      const centroInferior = [0, yInferior, 0]
      posiciones.push(...centroInferior, ...p2, ...p1)
      normales.push(0, -1, 0, 0, -1, 0, 0, -1, 0)
    }
  }

  return { posiciones, normales }
}

/** Esfera UV con normales suaves. */
export function esfera(radio, { segmentos = 24, anillos = 16 } = {}) {
  const posiciones = []
  const normales = []

  const punto = (i, j) => {
    const theta = (i / segmentos) * Math.PI * 2
    const phi = (j / anillos) * Math.PI
    const senoPhi = Math.sin(phi)
    return [
      senoPhi * Math.cos(theta),
      Math.cos(phi),
      senoPhi * Math.sin(theta),
    ]
  }

  for (let i = 0; i < segmentos; i += 1) {
    for (let j = 0; j < anillos; j += 1) {
      const a = punto(i, j)
      const b = punto(i + 1, j)
      const c = punto(i + 1, j + 1)
      const d = punto(i, j + 1)

      // `a` y `d` son el mismo polo en el primer/último anillo: se evita el
      // triángulo degenerado.
      const tri1 = j === 0 ? null : [a, b, c]
      const tri2 = j === anillos - 1 ? null : [a, c, d]

      for (const triangulo of [tri1, tri2]) {
        if (!triangulo) continue
        for (const p of triangulo) {
          posiciones.push(p[0] * radio, p[1] * radio, p[2] * radio)
          normales.push(p[0], p[1], p[2])
        }
      }
    }
  }

  return { posiciones, normales }
}

/** Toro con eje Y (el anillo queda en el plano XZ). */
export function toro(radioMayor, radioMenor, { segmentos = 24, anillos = 10 } = {}) {
  const posiciones = []
  const normales = []

  const punto = (i, j) => {
    const theta = (i / segmentos) * Math.PI * 2
    const phi = (j / anillos) * Math.PI * 2
    const cosPhi = Math.cos(phi)
    const senPhi = Math.sin(phi)
    const cosTheta = Math.cos(theta)
    const senTheta = Math.sin(theta)

    return {
      p: [(radioMayor + radioMenor * cosPhi) * cosTheta, radioMenor * senPhi, (radioMayor + radioMenor * cosPhi) * senTheta],
      n: [cosPhi * cosTheta, senPhi, cosPhi * senTheta],
    }
  }

  for (let i = 0; i < segmentos; i += 1) {
    for (let j = 0; j < anillos; j += 1) {
      const a = punto(i, j)
      const b = punto(i + 1, j)
      const c = punto(i + 1, j + 1)
      const d = punto(i, j + 1)

      posiciones.push(...a.p, ...b.p, ...c.p, ...a.p, ...c.p, ...d.p)
      normales.push(...a.n, ...b.n, ...c.n, ...a.n, ...c.n, ...d.n)
    }
  }

  return { posiciones, normales }
}

/** Plano horizontal (normal +Y), útil para suelos. */
export function plano(ancho, fondo) {
  return caja([ancho, 0.001, fondo])
}

/** Une varias geometrías ya transformadas en una sola. */
export function unir(geometrias) {
  return {
    posiciones: geometrias.flatMap((g) => g.posiciones),
    normales: geometrias.flatMap((g) => g.normales),
  }
}

export { normalDeTriangulo, normalizar }

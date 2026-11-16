/**
 * Lector mínimo de la estructura de un `.glb`.
 *
 * Un GLB es un contenedor binario con un encabezado de 12 bytes y una lista de
 * chunks. El primero es JSON y contiene todo el grafo: nodos, mallas,
 * materiales, animaciones y accessors. El segundo es el búfer binario con los
 * vértices. Aquí solo se lee el JSON y se cuentan cosas; no se decodifica Draco
 * ni se sube nada a la GPU.
 */

const MAGIA = 0x46546c67
const CHUNK_JSON = 0x4e4f534a

type Accessor = { count: number; type?: string; componentType?: number }
type Primitiva = { indices?: number; attributes: Record<string, number>; mode?: number }
type Malla = { name?: string; primitives: Primitiva[] }

type GltfJson = {
  asset?: { generator?: string; version?: string }
  nodes?: { name?: string; mesh?: number; children?: number[] }[]
  meshes?: Malla[]
  materials?: { name?: string }[]
  animations?: { name?: string; channels?: unknown[]; samplers?: unknown[] }[]
  accessors?: Accessor[]
  textures?: unknown[]
  images?: unknown[]
  buffers?: { byteLength?: number }[]
  extensionsUsed?: string[]
  extensionsRequired?: string[]
}

export type ResumenGlb = {
  bytes: number
  version: number
  generador: string
  nodos: number
  mallas: number
  materiales: number
  animaciones: string[]
  triangulos: number
  accessors: number
  texturas: number
  imagenes: number
  extensiones: string[]
  nombresDeNodos: string[]
}

export async function leerGlb(url: string): Promise<ResumenGlb> {
  const respuesta = await fetch(url)
  if (!respuesta.ok) throw new Error(`No se pudo descargar ${url} (${respuesta.status})`)

  const buffer = await respuesta.arrayBuffer()
  const vista = new DataView(buffer)

  if (vista.getUint32(0, true) !== MAGIA) throw new Error('El archivo no es un GLB')

  const version = vista.getUint32(4, true)
  const bytes = vista.getUint32(8, true)

  let desplazamiento = 12
  let json: GltfJson | null = null

  while (desplazamiento < bytes) {
    const longitud = vista.getUint32(desplazamiento, true)
    const tipo = vista.getUint32(desplazamiento + 4, true)
    const inicio = desplazamiento + 8

    if (tipo === CHUNK_JSON) {
      const texto = new TextDecoder().decode(new Uint8Array(buffer, inicio, longitud))
      json = JSON.parse(texto) as GltfJson
      break
    }

    desplazamiento = inicio + longitud
  }

  if (!json) throw new Error('El GLB no tiene chunk JSON')

  const accessors = json.accessors ?? []
  let triangulos = 0

  for (const malla of json.meshes ?? []) {
    for (const primitiva of malla.primitives) {
      // El modo 4 es TRIANGLES; el resto (líneas, puntos) no cuenta como triángulo.
      if (primitiva.mode !== undefined && primitiva.mode !== 4) continue

      const indice = primitiva.indices
      const posicion = primitiva.attributes.POSITION

      if (indice !== undefined) {
        triangulos += Math.floor((accessors[indice]?.count ?? 0) / 3)
      } else if (posicion !== undefined) {
        triangulos += Math.floor((accessors[posicion]?.count ?? 0) / 3)
      }
    }
  }

  return {
    bytes,
    version,
    generador: json.asset?.generator ?? 'no declarado',
    nodos: json.nodes?.length ?? 0,
    mallas: json.meshes?.length ?? 0,
    materiales: json.materials?.length ?? 0,
    animaciones: (json.animations ?? []).map((animacion) => animacion.name ?? 'sin nombre'),
    triangulos,
    accessors: accessors.length,
    texturas: json.textures?.length ?? 0,
    imagenes: json.images?.length ?? 0,
    extensiones: json.extensionsUsed ?? [],
    nombresDeNodos: (json.nodes ?? []).map((nodo) => nodo.name ?? '(sin nombre)'),
  }
}

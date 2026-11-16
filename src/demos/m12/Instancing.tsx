import { useEffect, useMemo, useState } from 'react'
import {
  BatchedMesh,
  BoxGeometry,
  ConeGeometry,
  Euler,
  Group,
  InstancedMesh,
  Matrix4,
  Mesh,
  MeshStandardMaterial,
  Quaternion,
  SphereGeometry,
  TorusGeometry,
  Vector3,
  type Object3D,
} from 'three'
import { DemoEscena, GrupoOpciones } from '../marco'
import { Medidor, PanelMetricas, useSalidas } from './medicion'

type Modo = 'mallas' | 'instanciado' | 'batched'

const MODOS: { valor: Modo; texto: string }[] = [
  { valor: 'mallas', texto: 'mallas sueltas' },
  { valor: 'instanciado', texto: 'InstancedMesh' },
  { valor: 'batched', texto: 'BatchedMesh' },
]

const CANTIDADES: { valor: string; texto: string }[] = [
  { valor: '250', texto: '250' },
  { valor: '1000', texto: '1 000' },
  { valor: '4000', texto: '4 000' },
  { valor: '10000', texto: '10 000' },
]

/** Ruido determinista: la misma escena en cada recarga, para poder comparar. */
function sembrado(semilla: number) {
  let estado = semilla
  return () => {
    estado |= 0
    estado = (estado + 0x6d2b79f5) | 0
    let t = Math.imul(estado ^ (estado >>> 15), 1 | estado)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

type Punto = { x: number; y: number; z: number; giro: number; escala: number }

function repartir(cantidad: number): Punto[] {
  const azar = sembrado(1337)
  return Array.from({ length: cantidad }, () => {
    const angulo = azar() * Math.PI * 2
    const radio = Math.sqrt(azar()) * 9
    return {
      x: Math.cos(angulo) * radio,
      y: 0.45 + azar() * 0.5,
      z: Math.sin(angulo) * radio,
      giro: azar() * Math.PI * 2,
      escala: 0.6 + azar() * 0.7,
    }
  })
}

function colocar(objeto: Object3D, punto: Punto): void {
  objeto.position.set(punto.x, punto.y, punto.z)
  objeto.rotation.y = punto.giro
  objeto.scale.setScalar(punto.escala)
}

/** Dentro del canvas: construye el grafo de la escena según el modo. */
function Escena({
  modo,
  cantidad,
  salidas,
}: {
  modo: Modo
  cantidad: number
  salidas: ReturnType<typeof useSalidas>
}) {
  const geometrias = useMemo(
    () => [
      new BoxGeometry(0.55, 0.55, 0.55),
      new SphereGeometry(0.36, 12, 8),
      new ConeGeometry(0.36, 0.7, 10),
      new TorusGeometry(0.28, 0.11, 8, 16),
    ],
    [],
  )

  const material = useMemo(
    () => new MeshStandardMaterial({ color: '#5b8ef0', roughness: 0.4, metalness: 0.25 }),
    [],
  )

  useEffect(
    () => () => {
      geometrias.forEach((geometria) => geometria.dispose())
      material.dispose()
    },
    [geometrias, material],
  )

  const grupo = useMemo(() => {
    const raiz = new Group()
    const puntos = repartir(cantidad)
    const matriz = new Matrix4()
    const posicion = new Vector3()
    const quaternion = new Quaternion()
    const escala = new Vector3()

    if (modo === 'mallas') {
      // Una malla por objeto: una llamada de dibujado por objeto.
      for (let indice = 0; indice < cantidad; indice += 1) {
        const malla = new Mesh(geometrias[indice % 4], material)
        colocar(malla, puntos[indice])
        raiz.add(malla)
      }
    } else if (modo === 'instanciado') {
      // Una malla instanciada por geometría: cuatro llamadas en total.
      for (let forma = 0; forma < 4; forma += 1) {
        const indices: number[] = []
        for (let indice = forma; indice < cantidad; indice += 4) indices.push(indice)
        if (indices.length === 0) continue

        const malla = new InstancedMesh(geometrias[forma], material, indices.length)
        indices.forEach((indice, hueco) => {
          const punto = puntos[indice]
          posicion.set(punto.x, punto.y, punto.z)
          quaternion.setFromEuler(new Euler(0, punto.giro, 0))
          escala.setScalar(punto.escala)
          matriz.compose(posicion, quaternion, escala)
          malla.setMatrixAt(hueco, matriz)
        })
        malla.instanceMatrix.needsUpdate = true
        malla.computeBoundingSphere()
        raiz.add(malla)
      }
    } else {
      // BatchedMesh: varias geometrías distintas, una sola llamada.
      const maxVertices = geometrias.reduce(
        (total, geometria) => total + geometria.getAttribute('position').count,
        0,
      )
      const maxIndices = geometrias.reduce(
        (total, geometria) => total + (geometria.getIndex()?.count ?? 0),
        0,
      )

      const agrupada = new BatchedMesh(cantidad, maxVertices, maxIndices, material)
      const ids = geometrias.map((geometria) => agrupada.addGeometry(geometria))

      for (let indice = 0; indice < cantidad; indice += 1) {
        const punto = puntos[indice]
        posicion.set(punto.x, punto.y, punto.z)
        quaternion.setFromEuler(new Euler(0, punto.giro, 0))
        escala.setScalar(punto.escala)
        matriz.compose(posicion, quaternion, escala)

        const instancia = agrupada.addInstance(ids[indice % 4])
        agrupada.setMatrixAt(instancia, matriz)
      }

      agrupada.computeBoundingSphere()
      raiz.add(agrupada)
    }

    return raiz
  }, [modo, cantidad, geometrias, material])

  useEffect(() => {
    return () => {
      grupo.clear()
    }
  }, [grupo])

  return (
    <>
      <ambientLight intensity={0.55} />
      <directionalLight position={[6, 9, 5]} intensity={2.3} />
      <directionalLight position={[-6, 3, -5]} intensity={0.5} color="#9fc2ff" />

      <primitive object={grupo} />

      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
        <circleGeometry args={[11, 64]} />
        <meshStandardMaterial color="#141b2a" roughness={0.96} />
      </mesh>

      <Medidor salidas={salidas} />
    </>
  )
}

/**
 * Miles de objetos, tres estrategias.
 *
 * En «mallas sueltas» cada objeto es una `Mesh`: los objetos quedan en el árbol
 * de escena y el renderer hace una llamada por cada una. `InstancedMesh` mete
 * todas las copias de **una** geometría en una `BufferGeometry` y las dibuja de
 * golpe con una sola llamada. `BatchedMesh` hace lo mismo pero admite varias
 * geometrías distintas en la misma llamada, que es lo que hace falta cuando el
 * bosque no son todo cajas.
 */
export default function Instancing() {
  const [modo, setModo] = useState<Modo>('instanciado')
  const [cantidad, setCantidad] = useState('1000')
  const salidas = useSalidas()
  const total = Number(cantidad)

  return (
    <DemoEscena
      titulo="Mallas sueltas, InstancedMesh y BatchedMesh"
      descripcion="El mismo número de objetos repartidos en un círculo, dibujados de tres maneras distintas. Con mallas sueltas hay un draw call por objeto; con InstancedMesh, cuatro (una por geometría); con BatchedMesh, uno solo. El panel mide fps, draw calls, triángulos y memoria."
      alto={400}
      camara={[0, 13, 15.5]}
      controles={
        <div className="w-full space-y-3">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
            <GrupoOpciones etiqueta="estrategia" valor={modo} opciones={MODOS} onChange={setModo} />
            <GrupoOpciones
              etiqueta="objetos"
              valor={cantidad}
              opciones={CANTIDADES}
              onChange={setCantidad}
            />
            <span className="ml-auto font-mono text-[11px] text-texto-tenue">
              {modo === 'mallas' && `${total + 1} draw calls (${total} + suelo)`}
              {modo === 'instanciado' &&
                `${Math.min(4, total) + 1} draw calls (${Math.min(4, total)} + suelo)`}
              {modo === 'batched' && '2 draw calls (1 + suelo)'}
            </span>
          </div>
          <PanelMetricas salidas={salidas} />
        </div>
      }
      nota="Con 250 objetos la diferencia es anecdótica; con 10 000, la escena de mallas sueltas tarda en montar y el fps se hunde. InstancedMesh y BatchedMesh dibujan lo mismo con una fracción del coste de CPU. Ojo: la memoria de GPU no baja, los vértices siguen ahí. Lo que se ahorra es el trabajo de preparar y enviar cada objeto."
    >
      <Escena modo={modo} cantidad={total} salidas={salidas} />
    </DemoEscena>
  )
}

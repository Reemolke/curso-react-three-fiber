import { useMemo, useState } from 'react'
import { Detailed, OrbitControls } from '@react-three/drei'
import { MeshStandardMaterial } from 'three'
import { DemoEscena, Deslizador, Interruptor } from '../marco'
import { Medidor, PanelMetricas, useSalidas } from './medicion'

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

type Posicion = { x: number; z: number; escala: number }

function repartir(arboles: number): Posicion[] {
  const azar = sembrado(42)
  return Array.from({ length: arboles }, () => ({
    x: (azar() - 0.5) * 24,
    z: (azar() - 0.5) * 24,
    escala: 0.7 + azar() * 0.8,
  }))
}

/**
 * Un árbol con tres niveles de detalle.
 *
 * `Detailed` de drei envuelve un `LOD` de three: elige el hijo según la
 * distancia a la cámara. Con el interruptor apagado se dibuja siempre el nivel
 * alto, que es lo que pasa cuando no hay LOD.
 */
function Arbol({
  posicion,
  lod,
  culling,
  material,
}: {
  posicion: Posicion
  lod: boolean
  culling: boolean
  material: MeshStandardMaterial
}) {
  const altura = 0.95 * posicion.escala
  const escala = posicion.escala

  if (!lod) {
    return (
      <mesh
        position={[posicion.x, altura, posicion.z]}
        scale={escala}
        material={material}
        frustumCulled={culling}
      >
        <coneGeometry args={[0.66, 2, 12]} />
      </mesh>
    )
  }

  return (
    <Detailed distances={[0, 15, 30]} position={[posicion.x, altura, posicion.z]} scale={escala}>
      <mesh material={material} frustumCulled={culling}>
        <coneGeometry args={[0.66, 2, 12]} />
      </mesh>
      <mesh material={material} frustumCulled={culling}>
        <coneGeometry args={[0.66, 2, 6]} />
      </mesh>
      <mesh material={material} frustumCulled={culling}>
        <coneGeometry args={[0.66, 2, 3]} />
      </mesh>
    </Detailed>
  )
}

/** Dentro del canvas: bosque, luces y medidor. */
function Escena({
  arboles,
  lod,
  culling,
  salidas,
}: {
  arboles: number
  lod: boolean
  culling: boolean
  salidas: ReturnType<typeof useSalidas>
}) {
  const material = useMemo(
    () => new MeshStandardMaterial({ color: '#2f8a63', roughness: 0.82, metalness: 0.05 }),
    [],
  )
  const posiciones = useMemo(() => repartir(arboles), [arboles])

  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight position={[8, 12, 6]} intensity={2.3} />
      <directionalLight position={[-8, 4, -6]} intensity={0.5} color="#9fc2ff" />

      {posiciones.map((posicion, indice) => (
        <Arbol
          key={indice}
          posicion={posicion}
          lod={lod}
          culling={culling}
          material={material}
        />
      ))}

      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[60, 60]} />
        <meshStandardMaterial color="#14202c" roughness={0.95} />
      </mesh>

      <OrbitControls makeDefault enablePan={false} minDistance={4} maxDistance={40} target={[0, 1, 0]} />

      <Medidor salidas={salidas} />
    </>
  )
}

/**
 * Lo que no se ve no debería costar.
 *
 * Dos ahorros independientes: el nivel de detalle (menos triángulos por árbol
 * lejano) y el culling por frustum (no dibujar lo que queda fuera de cámara).
 * Gira con el ratón y observa los draw calls: con el culling apagado, siguen
 * ahí aunque el árbol esté detrás de ti.
 */
export default function Lod() {
  const [arboles, setArboles] = useState(90)
  const [lod, setLod] = useState(true)
  const [culling, setCulling] = useState(true)
  const salidas = useSalidas()

  return (
    <DemoEscena
      titulo="Bosque con LOD y culling conmutable"
      descripcion="Un bosque de conos. Con LOD activo, los árboles lejanos se dibujan con menos segmentos; sin él, todos usan el modelo completo. El interruptor de culling decide si se descarta lo que queda fuera de la cámara. Se puede girar la vista arrastrando con el ratón."
      alto={420}
      camara={[0, 9, 21]}
      controles={
        <div className="w-full space-y-3">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
            <Deslizador
              etiqueta="árboles"
              valor={arboles}
              min={12}
              max={220}
              paso={2}
              onChange={setArboles}
            />
            <Interruptor etiqueta="LOD" activo={lod} onChange={setLod} />
            <Interruptor etiqueta="culling" activo={culling} onChange={setCulling} />
            <span className="ml-auto font-mono text-[11px] text-texto-tenue">
              arrastra para girar la cámara
            </span>
          </div>
          <PanelMetricas salidas={salidas} />
        </div>
      }
      nota="Gira la cámara 180 grados con el culling apagado y mira los draw calls: no bajan, porque el renderer sigue enviando los árboles que ya no ves. Con el culling encendido, bajan al instante. El LOD no cambia los draw calls, cambia los triángulos: es el otro eje del presupuesto."
    >
      <Escena arboles={arboles} lod={lod} culling={culling} salidas={salidas} />
    </DemoEscena>
  )
}

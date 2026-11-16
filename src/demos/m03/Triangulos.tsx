import { useEffect, useRef, useState } from 'react'
import type { Mesh } from 'three'
import { DemoEscena, Deslizador, Interruptor } from '../marco'
import { MedidorFps } from './medidor'

/**
 * Lee el número de triángulos directamente del índice de la geometría.
 *
 * No es una estimación: `geometry.index.count` es el número de índices, y cada
 * triángulo gasta tres. La esfera es indexada, así que la cuenta es exacta.
 */
function Esfera({
  segmentos,
  alambre,
  alContar,
}: {
  segmentos: number
  alambre: boolean
  alContar: (triangulos: number) => void
}) {
  const malla = useRef<Mesh>(null)
  const anillos = Math.max(2, Math.round(segmentos / 2))

  useEffect(() => {
    const indice = malla.current?.geometry.index
    if (indice) alContar(indice.count / 3)
  }, [segmentos, alContar])

  return (
    <mesh ref={malla} position={[0, 1, 0]}>
      <sphereGeometry args={[0.95, Math.round(segmentos), anillos]} />
      <meshStandardMaterial color="#4d8df6" roughness={0.4} metalness={0.15} wireframe={alambre} />
    </mesh>
  )
}

export default function Triangulos() {
  const [segmentos, setSegmentos] = useState(24)
  const [alambre, setAlambre] = useState(false)
  const [triangulos, setTriangulos] = useState(0)
  const [fps, setFps] = useState(0)

  return (
    <DemoEscena
      titulo="Cuántos triángulos cuesta una esfera"
      descripcion="Una esfera azul cuyo número de segmentos se puede subir y bajar. Se muestran los triángulos reales de su geometría y los frames dibujados por segundo."
      alto={340}
      camara={[0, 1.6, 3.4]}
      controles={
        <>
          <Deslizador
            etiqueta="segmentos"
            valor={segmentos}
            min={4}
            max={64}
            paso={1}
            onChange={setSegmentos}
          />
          <Interruptor etiqueta="alambre" activo={alambre} onChange={setAlambre} />
          <span className="font-mono text-xs text-texto">{triangulos.toLocaleString('es-ES')} triángulos</span>
          <span className="ml-auto font-mono text-xs text-texto">{fps} fps</span>
        </>
      }
      nota="Con `wireframe` se ven las aristas: cada cuadrilátero son dos triángulos, y el polo los junta en abanico. Subir segmentos multiplica la cuenta casi al cuadrado (ancho × alto × 2)."
    >
      <MedidorFps alMedir={setFps} />
      <ambientLight intensity={0.4} />
      <directionalLight position={[3, 5, 2]} intensity={2.2} />
      <directionalLight position={[-3, 1.5, -2]} intensity={0.6} color="#93b8ff" />

      <Esfera segmentos={segmentos} alambre={alambre} alContar={setTriangulos} />

      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[10, 10]} />
        <meshStandardMaterial color="#161c2c" roughness={0.95} />
      </mesh>
    </DemoEscena>
  )
}

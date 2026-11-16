import { useEffect, useState } from 'react'
import { DemoEscena, Deslizador, Interruptor } from '../marco'

const DOS_PI = Math.PI * 2

/**
 * 1.6 — Jerarquía, pivote y escala.
 *
 * Tres niveles de grupos: el sistema rota, dentro de él rota la órbita del
 * planeta y, dentro de esa órbita, la luna rota alrededor del planeta. La luna
 * no conoce la posición absoluta del planeta: solo conoce su posición local.
 */
export default function Jerarquia() {
  const [automatico, setAutomatico] = useState(true)
  const [angulo, setAngulo] = useState(0)
  const [radioPlaneta, setRadioPlaneta] = useState(2.1)
  const [radioLuna, setRadioLuna] = useState(0.7)

  useEffect(() => {
    if (!automatico) return

    let raf = 0
    let anterior = performance.now()

    const paso = (ahora: number) => {
      const delta = Math.min((ahora - anterior) / 1000, 0.05)
      anterior = ahora
      setAngulo((valor) => (valor + delta * 0.7) % DOS_PI)
      raf = requestAnimationFrame(paso)
    }

    raf = requestAnimationFrame(paso)
    return () => cancelAnimationFrame(raf)
  }, [automatico])

  return (
    <DemoEscena
      titulo="Sistema solar de tres niveles: la jerarquía en acción"
      descripcion="Un sol en el centro, un planeta que orbita el sol y una luna que orbita el planeta. Los deslizadores cambian los radios de las órbitas y el interruptor detiene o reanuda el movimiento."
      alto={380}
      camara={[5.2, 4.2, 6.3]}
      controles={
        <>
          <Interruptor etiqueta="Automático" activo={automatico} onChange={setAutomatico} />
          <Deslizador etiqueta="Órbita" valor={angulo} min={0} max={DOS_PI} paso={0.01} onChange={setAngulo} />
          <Deslizador etiqueta="Radio planeta" valor={radioPlaneta} min={1.4} max={2.8} paso={0.05} sufijo=" m" onChange={setRadioPlaneta} />
          <Deslizador etiqueta="Radio luna" valor={radioLuna} min={0.3} max={1.2} paso={0.05} sufijo=" m" onChange={setRadioLuna} />
        </>
      }
      nota="Desactiva «Automático» para mover la órbita con el deslizador. La luna siempre orbita el planeta, no el sol: su posición es local al grupo del planeta."
    >
      <group rotation={[0, angulo, 0]}>
        <mesh>
          <sphereGeometry args={[0.6, 24, 24]} />
          <meshBasicMaterial color="#f5a524" />
        </mesh>
        <mesh>
          <sphereGeometry args={[0.78, 24, 24]} />
          <meshBasicMaterial color="#f5a524" transparent opacity={0.12} />
        </mesh>

        <group rotation={[0, angulo * 2, 0]}>
          <mesh rotation={[-Math.PI / 2, 0, 0]}>
            <ringGeometry args={[radioPlaneta - 0.015, radioPlaneta + 0.015, 96]} />
            <meshBasicMaterial color="#2e3a52" transparent opacity={0.9} />
          </mesh>

          <mesh position={[radioPlaneta, 0, 0]} rotation={[0, angulo * 3, 0]}>
            <icosahedronGeometry args={[0.42, 1]} />
            <meshNormalMaterial />
          </mesh>

          <group position={[radioPlaneta, 0, 0]} rotation={[0, angulo * 5, 0]}>
            <mesh rotation={[-Math.PI / 2, 0, 0]}>
              <ringGeometry args={[radioLuna - 0.012, radioLuna + 0.012, 64]} />
              <meshBasicMaterial color="#2e3a52" transparent opacity={0.9} />
            </mesh>
            <mesh position={[radioLuna, 0, 0]}>
              <sphereGeometry args={[0.16, 16, 16]} />
              <meshBasicMaterial color="#c9d4ea" />
            </mesh>
          </group>
        </group>
      </group>
    </DemoEscena>
  )
}

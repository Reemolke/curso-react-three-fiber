import { useEffect, useMemo, useState } from 'react'
import * as THREE from 'three'
import { DemoEscena, Deslizador } from '../marco'

/**
 * Crea un grupo de three.js «a mano»: una hélice de esferas y una línea que las
 * une. Nada de JSX: son objetos reales, con sus geometrías y materiales.
 */
function crearConstelacion(): THREE.Group {
  const grupo = new THREE.Group()

  const geometriaEsfera = new THREE.SphereGeometry(0.09, 8, 8)
  const materialEsfera = new THREE.MeshBasicMaterial({ color: '#f5a524' })
  const puntos: THREE.Vector3[] = []

  for (let i = 0; i < 36; i += 1) {
    const t = i / 35
    const angulo = t * Math.PI * 4
    const radio = 0.45 + t * 1.15
    const punto = new THREE.Vector3(
      Math.cos(angulo) * radio,
      (t - 0.5) * 2.2,
      Math.sin(angulo) * radio,
    )
    puntos.push(punto)

    const esfera = new THREE.Mesh(geometriaEsfera, materialEsfera)
    esfera.position.copy(punto)
    grupo.add(esfera)
  }

  const linea = new THREE.Line(
    new THREE.BufferGeometry().setFromPoints(puntos),
    new THREE.LineBasicMaterial({ color: '#4d8df6', transparent: true, opacity: 0.8 }),
  )
  grupo.add(linea)

  return grupo
}

/**
 * 2.3 — Cuándo bajar a three.js puro.
 *
 * El grupo se crea una vez con useMemo y se inyecta con <primitive>. R3F no lo
 * reconstruye en cada render ni lo destruye al desmontar: la limpieza es nuestra.
 */
export default function Primitive() {
  const [giro, setGiro] = useState(0.4)
  const grupo = useMemo(crearConstelacion, [])

  useEffect(() => {
    return () => {
      const geometrias = new Set<THREE.BufferGeometry>()
      const materiales = new Set<THREE.Material>()

      grupo.traverse((objeto) => {
        if (objeto instanceof THREE.Mesh || objeto instanceof THREE.Line) {
          geometrias.add(objeto.geometry)
          const lista = Array.isArray(objeto.material) ? objeto.material : [objeto.material]
          lista.forEach((material) => materiales.add(material))
        }
      })

      geometrias.forEach((geometria) => geometria.dispose())
      materiales.forEach((material) => material.dispose())
    }
  }, [grupo])

  return (
    <DemoEscena
      titulo="Un grupo de three.js inyectado con <primitive>"
      descripcion="Una hélice de esferas ámbar unidas por una línea azul. El grupo se ha construido con clases de three.js, no con JSX, y se inyecta en la escena con primitive."
      alto={340}
      camara={[4.6, 3.4, 5.4]}
      controles={
        <>
          <Deslizador etiqueta="Giro" valor={giro} min={-Math.PI} max={Math.PI} paso={0.01} onChange={setGiro} />
          <span className="font-mono text-[11px] text-texto-tenue">36 esferas + 1 línea creadas fuera de React</span>
        </>
      }
      nota="El grupo vive fuera de React. R3F lo coloca en la escena tal cual: no clona, no recrea y tampoco lo destruye al desmontar. Por eso el efecto de limpieza recorre y libera geometrías y materiales."
    >
      <group rotation={[0.15, giro, 0]}>
        <primitive object={grupo} />
      </group>
    </DemoEscena>
  )
}

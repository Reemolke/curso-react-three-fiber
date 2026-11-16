import { useMemo, useState } from 'react'
import { useTexture } from '@react-three/drei'
import * as THREE from 'three'
import { TEXTURAS } from '../../tres/rutas'
import { DemoEscena, Interruptor } from '../marco'

/**
 * El mismo archivo, dos espacios de color.
 *
 * A la izquierda la textura se declara como dato lineal (`NoColorSpace`), que es
 * el valor por defecto de un `Texture` en three. Como el archivo está guardado
 * en sRGB, los valores se interpretan mal y la madera sale lavada. A la derecha
 * se declara `SRGBColorSpace` y el renderer hace la conversión al muestrear.
 */
function Plano({
  base,
  posicion,
  corregido,
}: {
  base: THREE.Texture
  posicion: [number, number, number]
  corregido: boolean
}) {
  const textura = useMemo(() => {
    const copia = base.clone()
    copia.colorSpace = corregido ? THREE.SRGBColorSpace : THREE.NoColorSpace
    copia.wrapS = THREE.RepeatWrapping
    copia.wrapT = THREE.RepeatWrapping
    copia.repeat.set(1.6, 1.6)
    copia.needsUpdate = true
    return copia
  }, [base, corregido])

  return (
    <group position={posicion}>
      {/* Marco oscuro: separa las dos versiones sin depender de la luz. */}
      <mesh position={[0, 0, -0.02]}>
        <planeGeometry args={[2, 2]} />
        <meshBasicMaterial color="#10141f" />
      </mesh>

      <mesh>
        <planeGeometry args={[1.9, 1.9]} />
        <meshStandardMaterial map={textura} roughness={0.55} metalness={0.05} />
      </mesh>

      {/* Barra inferior: verde si el espacio de color es el correcto. */}
      <mesh position={[0, -1.14, 0.01]}>
        <planeGeometry args={[1.9, 0.16]} />
        <meshBasicMaterial color={corregido ? '#3fbf87' : '#e0574f'} />
      </mesh>
    </group>
  )
}

export default function ColorSpace() {
  const base = useTexture(TEXTURAS.maderaColor)
  const [corregido, setCorregido] = useState(false)

  return (
    <DemoEscena
      titulo="sRGB frente a lineal, con el mismo PNG"
      descripcion="Dos planos con la misma textura de madera. El de la izquierda la interpreta como dato lineal; el de la derecha, como sRGB. Un interruptor corrige el de la izquierda."
      alto={340}
      camara={[0, 0.4, 5]}
      controles={
        <Interruptor
          etiqueta="corregir el plano izquierdo"
          activo={corregido}
          onChange={setCorregido}
        />
      }
      nota="Izquierda (barra roja): `colorSpace = NoColorSpace`, lavada. Derecha (barra verde): `colorSpace = SRGBColorSpace`, correcta. La diferencia no es de brillo: es que los valores guardados no significan lo mismo en los dos espacios."
    >
      <ambientLight intensity={0.7} />
      <directionalLight position={[2, 4, 3]} intensity={2} />

      <Plano base={base} posicion={[-1.15, 0.6, 0]} corregido={corregido} />
      <Plano base={base} posicion={[1.15, 0.6, 0]} corregido />
    </DemoEscena>
  )
}

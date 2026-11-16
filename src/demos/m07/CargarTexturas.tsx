import { useMemo, useState } from 'react'
import { useTexture } from '@react-three/drei'
import { useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { TEXTURAS } from '../../tres/rutas'
import { DemoEscena, Deslizador, GrupoOpciones } from '../marco'

type Filtro = 'lineal' | 'mipmap' | 'nearest'

const FILTROS: { valor: Filtro; texto: string }[] = [
  { valor: 'lineal', texto: 'Linear' },
  { valor: 'mipmap', texto: 'Mipmap' },
  { valor: 'nearest', texto: 'Nearest' },
]

/**
 * Un plano casi en rasante para que la anisotropía se note.
 *
 * `anisotropy` es el número de muestras que el hardware puede tomar a lo largo
 * del eje comprimido. A 1, un plano visto de canto se convierte en una mancha;
 * al máximo del dispositivo, la textura aguanta mucho más lejos.
 */
function Plano({ filtro, anisotropia }: { filtro: Filtro; anisotropia: number }) {
  const gl = useThree((estado) => estado.gl)
  const base = useTexture(TEXTURAS.metalColor)
  const maximo = gl.capabilities.getMaxAnisotropy()

  const textura = useMemo(() => {
    const copia = base.clone()
    copia.wrapS = THREE.RepeatWrapping
    copia.wrapT = THREE.RepeatWrapping
    copia.repeat.set(8, 8)
    copia.colorSpace = THREE.SRGBColorSpace
    copia.anisotropy = Math.min(anisotropia, maximo)

    if (filtro === 'lineal') {
      copia.minFilter = THREE.LinearFilter
      copia.generateMipmaps = false
    }
    if (filtro === 'mipmap') copia.minFilter = THREE.LinearMipmapLinearFilter
    if (filtro === 'nearest') copia.minFilter = THREE.NearestFilter

    copia.needsUpdate = true
    return copia
  }, [base, filtro, anisotropia, maximo])

  return (
    <mesh rotation={[-Math.PI / 2 + 0.18, 0, 0]} position={[0, 0.9, 0]}>
      <planeGeometry args={[7, 5]} />
      <meshStandardMaterial map={textura} roughness={0.45} metalness={0.35} />
    </mesh>
  )
}

export default function CargarTexturas() {
  const [filtro, setFiltro] = useState<Filtro>('mipmap')
  const [anisotropia, setAnisotropia] = useState(1)

  return (
    <DemoEscena
      titulo="Filtros y anisotropía sobre un plano en rasante"
      descripcion="Un plano inclinado con una textura de metal repetida ocho veces. Los controles cambian el filtro de minificación y el número de muestras anisotrópicas."
      alto={360}
      camara={[0, 2.2, 4.6]}
      controles={
        <>
          <GrupoOpciones etiqueta="minFilter" valor={filtro} opciones={FILTROS} onChange={setFiltro} />
          <Deslizador
            etiqueta="anisotropy"
            valor={anisotropia}
            min={1}
            max={16}
            paso={1}
            onChange={setAnisotropia}
          />
        </>
      }
      nota="Con `Linear` sin mipmaps y anisotropía 1, la parte lejana brilla y parpadea al mover la vista. Con mipmaps y anisotropía alta, la transición es estable. El máximo real lo pone la GPU: el deslizador no puede pasar de ahí."
    >
      <ambientLight intensity={0.55} />
      <directionalLight position={[2, 4, 3]} intensity={2.4} />
      <Plano filtro={filtro} anisotropia={anisotropia} />
    </DemoEscena>
  )
}

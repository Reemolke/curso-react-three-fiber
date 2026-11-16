import { useCallback, useEffect, useState } from 'react'
import type { ThreeEvent } from '@react-three/fiber'
import { DemoEscena } from '../marco'

type Tipo = 'color' | 'escala' | 'salto' | 'giro' | 'alambre'

type PiezaProps = {
  nombre: string
  posicion: [number, number, number]
  color: string
  tipo: Tipo
  onAviso: (texto: string) => void
}

/**
 * Una pieza de la galería. Cada tipo usa un efecto distinto para el hover y
 * otro para el clic, para que se vea que los handlers son independientes del
 * aspecto del objeto.
 */
function Pieza({ nombre, posicion, color, tipo, onAviso }: PiezaProps) {
  const [hover, setHover] = useState(false)
  const [alterno, setAlterno] = useState(false)

  const entrar = (evento: ThreeEvent<PointerEvent>) => {
    // Sin esto, el suelo que hay detrás también recibiría el evento.
    evento.stopPropagation()
    setHover(true)
    document.body.style.cursor = 'pointer'
    onAviso(`Sobre ${nombre} a ${evento.distance.toFixed(1)} unidades`)
  }

  const salir = (evento: ThreeEvent<PointerEvent>) => {
    evento.stopPropagation()
    setHover(false)
    document.body.style.cursor = 'auto'
  }

  const pulsar = (evento: ThreeEvent<MouseEvent>) => {
    evento.stopPropagation()
    setAlterno((valor) => !valor)
    const punto = evento.point
    onAviso(
      `${nombre} · clic en x ${punto.x.toFixed(1)}, z ${punto.z.toFixed(1)}`,
    )
  }

  const escala = tipo === 'escala' && hover ? 1.3 : 1
  const salto = tipo === 'salto' && hover ? 0.4 : 0
  const giro =
    tipo === 'giro'
      ? (hover ? 0.7 : 0) + (alterno ? Math.PI / 2 : 0)
      : tipo === 'escala' && alterno
        ? Math.PI / 4
        : 0

  const colorFinal =
    tipo === 'color' && hover
      ? '#f5a524'
      : tipo === 'salto' && alterno
        ? '#4d8df6'
        : tipo === 'alambre' && alterno
          ? '#3fbf87'
          : color

  let geometria
  if (tipo === 'color') {
    geometria = <boxGeometry args={[0.8, 0.8, 0.8]} />
  } else if (tipo === 'escala') {
    geometria = <sphereGeometry args={[0.52, 24, 24]} />
  } else if (tipo === 'salto') {
    geometria = <coneGeometry args={[0.46, 0.9, 24]} />
  } else if (tipo === 'giro') {
    geometria = <torusGeometry args={[0.42, 0.16, 16, 32]} />
  } else {
    geometria = <icosahedronGeometry args={[0.52, 0]} />
  }

  return (
    <mesh
      name={nombre}
      position={[posicion[0], posicion[1] + salto, posicion[2]]}
      scale={escala}
      rotation={[0, giro, 0]}
      onPointerOver={entrar}
      onPointerOut={salir}
      onClick={pulsar}
    >
      {geometria}
      <meshStandardMaterial
        color={colorFinal}
        roughness={0.35}
        metalness={0.12}
        wireframe={tipo === 'alambre' && (hover || alterno)}
      />
    </mesh>
  )
}

export default function GaleriaEventos() {
  const [aviso, setAviso] = useState('Pasa el puntero por una pieza')

  const avisar = useCallback((texto: string) => setAviso(texto), [])

  // El cursor es global: si la demo se desmonta con el puntero encima,
  // se quedaría como una mano para el resto de la página.
  useEffect(() => {
    return () => {
      document.body.style.cursor = 'auto'
    }
  }, [])

  return (
    <DemoEscena
      titulo="Galería de eventos: hover y clic"
      descripcion="Cinco piezas geométricas reaccionan al puntero y al clic con efectos distintos. El rótulo inferior indica qué objeto ha recibido el evento y dónde ha sido el clic. El suelo también escucha, pero las piezas cortan la propagación."
      alto={360}
      camara={[0, 2.4, 6]}
      fov={38}
      controles={
        <p className="w-full text-xs text-texto-suave" aria-live="polite">
          <span className="mr-2 font-mono text-[10px] uppercase tracking-widest text-texto-tenue">
            último evento
          </span>
          {aviso}
        </p>
      }
      nota="Cubo: color al pasar y color alternativo al clic. Esfera: crece y gira un cuarto de vuelta. Cono: se eleva y cambia de color. Toro: gira al pasar y otro cuarto de vuelta al clic. Icosaedro: alambre al pasar y alambre fijo al clic. El suelo de detrás recibe clics y muestra sus coordenadas."
    >
      <ambientLight intensity={0.7} />
      <directionalLight position={[4, 6, 4]} intensity={2.2} />

      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -0.02, 0]}
        onPointerOver={() => avisar('Suelo · las piezas han cortado la propagación')}
        onClick={(evento) =>
          avisar(`Suelo · clic en x ${evento.point.x.toFixed(1)}, z ${evento.point.z.toFixed(1)}`)
        }
      >
        <planeGeometry args={[14, 9]} />
        <meshStandardMaterial color="#161a24" roughness={0.95} />
      </mesh>

      <Pieza
        nombre="cubo"
        posicion={[-2.35, 0.55, 0.2]}
        color="#e05a8a"
        tipo="color"
        onAviso={avisar}
      />
      <Pieza
        nombre="esfera"
        posicion={[-1.18, 0.55, -0.1]}
        color="#4d8df6"
        tipo="escala"
        onAviso={avisar}
      />
      <Pieza
        nombre="cono"
        posicion={[0, 0.55, 0.15]}
        color="#3fbf87"
        tipo="salto"
        onAviso={avisar}
      />
      <Pieza
        nombre="toro"
        posicion={[1.18, 0.55, -0.1]}
        color="#f5a524"
        tipo="giro"
        onAviso={avisar}
      />
      <Pieza
        nombre="icosaedro"
        posicion={[2.35, 0.55, 0.2]}
        color="#b48ef5"
        tipo="alambre"
        onAviso={avisar}
      />
    </DemoEscena>
  )
}

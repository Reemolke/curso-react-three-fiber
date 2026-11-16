import { useRef, useState } from 'react'
import { extend, useFrame } from '@react-three/fiber'
import { shaderMaterial } from '@react-three/drei'
import { Color, DoubleSide, type ShaderMaterial } from 'three'
import { DemoEscena, Deslizador, GrupoOpciones } from '../marco'

type Paleta = 'azul' | 'verde' | 'fuego'

const PALETAS: { valor: Paleta; texto: string }[] = [
  { valor: 'azul', texto: 'azul' },
  { valor: 'verde', texto: 'verde' },
  { valor: 'fuego', texto: 'fuego' },
]

const COLORES: Record<Paleta, [string, string]> = {
  azul: ['#123a7a', '#7fc2ff'],
  verde: ['#0f4d3a', '#7ff0c4'],
  fuego: ['#5a1a12', '#ffc46b'],
}

const VERTEX = /* glsl */ `
uniform float uTiempo;
uniform float uAmplitud;
varying float vOnda;
varying vec2 vUv;

void main() {
  vUv = uv;
  vec3 pos = position;

  float onda = sin(pos.x * 5.0 + uTiempo * 2.0) * cos(pos.y * 4.0 - uTiempo * 1.3);
  pos += normal * onda * uAmplitud;

  vOnda = onda;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}
`

const FRAGMENT = /* glsl */ `
precision highp float;

uniform vec3 uColorA;
uniform vec3 uColorB;
varying float vOnda;
varying vec2 vUv;

void main() {
  float t = clamp(vOnda * 0.5 + 0.5, 0.0, 1.0);
  vec3 color = mix(uColorA, uColorB, t);

  // Un poco de sombreado falso con la UV para que no parezca plano.
  color *= 0.82 + 0.18 * smoothstep(0.0, 1.0, vUv.y);

  gl_FragColor = vec4(color, 1.0);
}
`

const MaterialOnda = shaderMaterial(
  {
    uTiempo: 0,
    uAmplitud: 0.22,
    uColorA: new Color('#123a7a'),
    uColorB: new Color('#7fc2ff'),
  },
  VERTEX,
  FRAGMENT,
)

extend({ MaterialOnda })

declare module '@react-three/fiber' {
  interface ThreeElements {
    materialOnda: ThreeElements['shaderMaterial']
  }
}

/** Dentro del canvas: uniforms animados en `useFrame`. */
function Esfera({
  paleta,
  amplitud,
  velocidad,
}: {
  paleta: Paleta
  amplitud: number
  velocidad: number
}) {
  const material = useRef<ShaderMaterial>(null)
  const tiempo = useRef(0)

  useFrame((_, delta) => {
    const actual = material.current
    if (!actual) return
    tiempo.current += delta * velocidad
    actual.uniforms.uTiempo.value = tiempo.current
    actual.uniforms.uAmplitud.value = amplitud
    ;(actual.uniforms.uColorA.value as Color).set(COLORES[paleta][0])
    ;(actual.uniforms.uColorB.value as Color).set(COLORES[paleta][1])
  })

  return (
    <mesh>
      <sphereGeometry args={[1.2, 96, 64]} />
      <materialOnda ref={material} side={DoubleSide} />
    </mesh>
  )
}

/**
 * `shaderMaterial` de drei: un material de React con uniforms.
 *
 * El material se declara una vez con `shaderMaterial(...)` y se registra con
 * `extend`. A partir de ahí se usa como cualquier etiqueta. Los uniforms no se
 * pasan como props en cada frame: se mutan desde `useFrame`, porque cambiar un
 * número de uniform no debe provocar un render de React.
 */
export default function MaterialPropio() {
  const [paleta, setPaleta] = useState<Paleta>('azul')
  const [amplitud, setAmplitud] = useState(0.22)
  const [velocidad, setVelocidad] = useState(1)

  return (
    <DemoEscena
      titulo="Material propio con uniforms animados"
      descripcion="Una esfera deformada por un shader propio. Los deslizadores cambian la amplitud, la velocidad y la paleta de colores sin recrear el material."
      alto={380}
      camara={[0, 0.6, 3.6]}
      controles={
        <>
          <Deslizador
            etiqueta="amplitud"
            valor={amplitud}
            min={0}
            max={0.6}
            paso={0.01}
            onChange={setAmplitud}
          />
          <Deslizador
            etiqueta="velocidad"
            valor={velocidad}
            min={0}
            max={3}
            paso={0.05}
            onChange={setVelocidad}
          />
          <GrupoOpciones etiqueta="paleta" valor={paleta} opciones={PALETAS} onChange={setPaleta} />
        </>
      }
      nota="`extend({ MaterialOnda })` registra la clase y la hace disponible como `<materialOnda />`, en minúscula. Si la escribes en mayúscula, R3F la trata como componente de React y falla. Ojo: este material no recibe luces; si las necesitas, usa `meshStandardMaterial` parcheado (lección 11.6)."
    >
      <Esfera paleta={paleta} amplitud={amplitud} velocidad={velocidad} />
    </DemoEscena>
  )
}

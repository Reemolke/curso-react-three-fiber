import { useRef } from 'react'
import { extend, useFrame } from '@react-three/fiber'
import { shaderMaterial } from '@react-three/drei'
import { Color, DoubleSide, MathUtils, type Mesh, type ShaderMaterial } from 'three'

/**
 * Shader propio del proyecto final: un plano de escaneo holográfico.
 *
 * Es el mismo patrón de la lección 11.5 (`shaderMaterial` + `extend`), aplicado a
 * algo que el proyecto necesita: cuando se selecciona una pieza, un plano con
 * franjas la barre para decir «esto es lo que has elegido». No usa luces ni
 * texturas: solo la UV y el tiempo.
 */

const VERTEX = /* glsl */ `
varying vec2 vUv;

void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`

const FRAGMENT = /* glsl */ `
precision highp float;

uniform float uTiempo;
uniform float uOpacidad;
uniform vec3 uColor;

varying vec2 vUv;

void main() {
  // Franjas que suben: la lectura de «está escaneando».
  float franja = smoothstep(0.35, 0.65, fract(vUv.y * 18.0 - uTiempo * 1.4));

  // Los bordes se apagan para que el plano no tenga un corte duro.
  float bordeX = smoothstep(0.0, 0.12, vUv.x) * (1.0 - smoothstep(0.88, 1.0, vUv.x));
  float bordeY = smoothstep(0.0, 0.08, vUv.y) * (1.0 - smoothstep(0.92, 1.0, vUv.y));

  float alfa = (0.10 + franja * 0.55) * bordeX * bordeY * uOpacidad;
  vec3 color = uColor * (0.55 + franja * 1.1);

  gl_FragColor = vec4(color, alfa);
}
`

const MaterialEscaner = shaderMaterial(
  { uTiempo: 0, uOpacidad: 0, uColor: new Color('#4ff0c4') },
  VERTEX,
  FRAGMENT,
)

extend({ MaterialEscaner })

declare module '@react-three/fiber' {
  interface ThreeElements {
    materialEscaner: ThreeElements['shaderMaterial']
  }
}

type Props = {
  /** Si hay algo seleccionado, el plano barre; si no, se apaga. */
  activo: boolean
  /** Centro del barrido, en coordenadas de mundo. */
  centro: [number, number, number]
  /** Media anchura del recorrido. */
  alcance?: number
}

export function Escaner({ activo, centro, alcance = 1.15 }: Props) {
  const material = useRef<ShaderMaterial>(null)
  const malla = useRef<Mesh>(null)
  const opacidad = useRef(0)

  useFrame((estado, delta) => {
    const shader = material.current
    const nodo = malla.current
    if (!shader || !nodo) return

    const objetivo = activo ? 0.95 : 0
    opacidad.current = MathUtils.damp(opacidad.current, objetivo, 7, delta)

    shader.uniforms.uTiempo.value = estado.clock.elapsedTime
    shader.uniforms.uOpacidad.value = opacidad.current
    nodo.visible = opacidad.current > 0.02

    // Barrido de ida y vuelta, sin corte al llegar al extremo.
    const ciclo = (estado.clock.elapsedTime * 0.42) % 2
    const t = ciclo <= 1 ? ciclo : 2 - ciclo
    nodo.position.x = centro[0] - alcance + t * alcance * 2
  })

  return (
    <mesh ref={malla} position={centro} rotation={[0, -0.45, 0]} visible={false}>
      <planeGeometry args={[alcance * 1.9, 1.6]} />
      <materialEscaner ref={material} transparent depthWrite={false} side={DoubleSide} toneMapped={false} />
    </mesh>
  )
}

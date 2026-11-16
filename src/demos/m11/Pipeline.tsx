import { useMemo, useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import type { ShaderMaterial } from 'three'
import { DemoEscena, Deslizador, GrupoOpciones } from '../marco'

type Forma = 'plano' | 'esfera' | 'toro'

const FORMAS: { valor: Forma; texto: string }[] = [
  { valor: 'plano', texto: 'plano' },
  { valor: 'esfera', texto: 'esfera' },
  { valor: 'toro', texto: 'toro' },
]

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
uniform float uFrecuencia;
uniform float uModo;
varying vec2 vUv;

void main() {
  // Modo 0: las UV tal cual, rojo = u, verde = v.
  vec3 uv = vec3(vUv, 0.25);

  // Modo 1: patrón animado a partir de las mismas UV.
  vec3 patron = 0.5 + 0.5 * cos(uTiempo + vUv.xyx * uFrecuencia + vec3(0.0, 2.0, 4.0));

  float rejilla = step(0.97, fract(vUv.x * uFrecuencia)) +
                  step(0.97, fract(vUv.y * uFrecuencia));

  vec3 color = mix(uv, patron + rejilla * 0.4, step(0.5, uModo));
  gl_FragColor = vec4(color, 1.0);
}
`

/** Dentro del canvas: aquí sí se puede usar `useFrame`. */
function Superficie({
  forma,
  frecuencia,
  modo,
  animar,
}: {
  forma: Forma
  frecuencia: number
  modo: number
  animar: boolean
}) {
  const material = useRef<ShaderMaterial>(null)
  const tiempo = useRef(0)

  const uniforms = useMemo(
    () => ({
      uTiempo: { value: 0 },
      uFrecuencia: { value: 6 },
      uModo: { value: 1 },
    }),
    [],
  )

  useFrame((_, delta) => {
    if (animar) tiempo.current += delta
    const actual = material.current
    if (!actual) return
    actual.uniforms.uTiempo.value = tiempo.current
    actual.uniforms.uFrecuencia.value = frecuencia
    actual.uniforms.uModo.value = modo
  })

  return (
    <mesh>
      {forma === 'plano' && <planeGeometry args={[2.6, 2.6, 1, 1]} />}
      {forma === 'esfera' && <sphereGeometry args={[1.45, 48, 32]} />}
      {forma === 'toro' && <torusGeometry args={[1.05, 0.45, 32, 64]} />}
      <shaderMaterial
        ref={material}
        uniforms={uniforms}
        vertexShader={VERTEX}
        fragmentShader={FRAGMENT}
      />
    </mesh>
  )
}

/**
 * El pipeline mínimo: vertex y fragment.
 *
 * El vertex shader coloca cada vértice y pasa la UV al fragment. El fragment
 * decide el color de cada píxel. Aquí el mismo shader se aplica a tres
 * geometrías: la UV de un plano es una cuadrícula limpia, la de una esfera se
 * estira en los polos y la de un toro da la vuelta. Eso es lo que hace que una
 * textura «se vea mal» en un objeto y bien en otro.
 */
export default function Pipeline() {
  const [forma, setForma] = useState<Forma>('plano')
  const [frecuencia, setFrecuencia] = useState(6)
  const [modo, setModo] = useState(1)
  const [animar, setAnimar] = useState(true)

  return (
    <DemoEscena
      titulo="UV como color y patrón animado"
      descripcion="Una superficie pintada por un shader propio. En modo UV, el rojo es la coordenada u y el verde la v. En modo patrón, las mismas UV generan un dibujo animado. Se puede cambiar la geometría para ver cómo se deforma la UV."
      alto={380}
      camara={[1.6, 1.3, 3.6]}
      controles={
        <>
          <GrupoOpciones etiqueta="geometría" valor={forma} opciones={FORMAS} onChange={setForma} />
          <Deslizador
            etiqueta="frecuencia"
            valor={frecuencia}
            min={1}
            max={20}
            paso={0.5}
            onChange={setFrecuencia}
          />
          <GrupoOpciones
            etiqueta="modo"
            valor={modo}
            opciones={[
              { valor: 0, texto: 'UV' },
              { valor: 1, texto: 'patrón' },
            ]}
            onChange={setModo}
          />
          <label className="flex cursor-pointer items-center gap-2 text-xs text-texto-suave">
            <input
              type="checkbox"
              checked={animar}
              onChange={(evento) => setAnimar(evento.target.checked)}
              className="size-3.5 accent-acento"
            />
            animar
          </label>
        </>
      }
      nota="El vertex shader corre una vez por vértice; el fragment una vez por píxel. Por eso el patrón es «gratis» en vértices y caro en píxeles: la cuenta se repite en cada fragmento de la pantalla. `vUv` se pasa como `varying`: el vertex la escribe, la GPU la interpola y el fragment la lee."
    >
      <Superficie forma={forma} frecuencia={frecuencia} modo={modo} animar={animar} />
    </DemoEscena>
  )
}

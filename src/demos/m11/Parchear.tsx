import { useEffect, useMemo, useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { shaderMaterial } from '@react-three/drei'
import {
  Color,
  type Mesh,
  type MeshStandardMaterial,
  type WebGLProgramParametersWithUniforms,
} from 'three'
import { DemoEscena, Deslizador, Interruptor } from '../marco'

const VERTEX_PROPIO = /* glsl */ `
uniform float uTiempo;
uniform float uAmplitud;
varying float vOnda;

void main() {
  vec3 pos = position;
  float onda = sin(pos.x * 5.0 + uTiempo * 2.0) * cos(pos.y * 4.0 - uTiempo * 1.2);
  pos += normal * onda * uAmplitud;
  vOnda = onda;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}
`

const FRAGMENT_PROPIO = /* glsl */ `
precision highp float;

uniform vec3 uBorde;
varying float vOnda;

void main() {
  // Sin luces: el color sale solo de la onda. Plano y honesto.
  float t = clamp(vOnda * 0.5 + 0.5, 0.0, 1.0);
  gl_FragColor = vec4(mix(vec3(0.06, 0.09, 0.14), uBorde, t), 1.0);
}
`

const MaterialSimple = shaderMaterial(
  {
    uTiempo: 0,
    uAmplitud: 0.12,
    uBorde: new Color('#e05f7a'),
  },
  VERTEX_PROPIO,
  FRAGMENT_PROPIO,
)

/** Dentro del canvas: parche, uniforms y giro. */
function Esferas({
  amplitud,
  parcheado,
  girar,
}: {
  amplitud: number
  parcheado: boolean
  girar: boolean
}) {
  const estandar = useRef<MeshStandardMaterial>(null)
  const programa = useRef<WebGLProgramParametersWithUniforms | null>(null)
  const izquierda = useRef<Mesh>(null)
  const derecha = useRef<Mesh>(null)
  const tiempo = useRef(0)

  const materialSimple = useMemo(() => new MaterialSimple(), [])

  useEffect(() => {
    const material = estandar.current
    if (!material) return

    material.onBeforeCompile = (shader) => {
      shader.uniforms.uTiempo = { value: 0 }
      shader.uniforms.uAmplitud = { value: 0.12 }

      shader.vertexShader = `uniform float uTiempo;
uniform float uAmplitud;
varying vec3 vPosOnda;
${shader.vertexShader}`

      shader.vertexShader = shader.vertexShader.replace(
        '#include <begin_vertex>',
        `#include <begin_vertex>
  vPosOnda = position;
  float onda = sin(position.x * 5.0 + uTiempo * 2.0) * cos(position.y * 4.0 - uTiempo * 1.2);
  transformed += objectNormal * onda * uAmplitud;`,
      )

      shader.fragmentShader = `uniform float uTiempo;
varying vec3 vPosOnda;
${shader.fragmentShader}`

      shader.fragmentShader = shader.fragmentShader.replace(
        '#include <dithering_fragment>',
        `#include <dithering_fragment>
  float franja = step(0.62, fract(vPosOnda.y * 7.0 - uTiempo * 1.6));
  gl_FragColor.rgb += vec3(0.10, 0.30, 0.75) * franja * 0.5;`,
      )

      programa.current = shader
    }

    material.customProgramCacheKey = () => 'onda-parcheada-v1'
    material.needsUpdate = true

    return () => {
      material.onBeforeCompile = () => {}
      programa.current = null
    }
  }, [])

  useEffect(() => () => materialSimple.dispose(), [materialSimple])

  useFrame((_, delta) => {
    tiempo.current += delta
    if (girar) {
      if (izquierda.current) izquierda.current.rotation.y += delta * 0.35
      if (derecha.current) derecha.current.rotation.y += delta * 0.35
    }

    const shader = programa.current
    if (shader) {
      shader.uniforms.uTiempo.value = tiempo.current
      shader.uniforms.uAmplitud.value = parcheado ? amplitud : 0
    }

    materialSimple.uniforms.uTiempo.value = tiempo.current
    materialSimple.uniforms.uAmplitud.value = amplitud
  })

  return (
    <>
      <mesh ref={izquierda} position={[-1.3, 0.35, 0]} castShadow receiveShadow>
        <sphereGeometry args={[1.05, 96, 64]} />
        <meshStandardMaterial
          ref={estandar}
          color="#7d8aa8"
          metalness={0.65}
          roughness={0.32}
        />
      </mesh>

      <mesh ref={derecha} position={[1.3, 0.35, 0]}>
        <sphereGeometry args={[1.05, 96, 64]} />
        <primitive object={materialSimple} attach="material" />
      </mesh>

      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.78, 0]} receiveShadow>
        <planeGeometry args={[14, 10]} />
        <meshStandardMaterial color="#151b2a" roughness={0.94} />
      </mesh>
    </>
  )
}

/**
 * Comparación: material estándar parcheado frente a material propio.
 *
 * A la izquierda, un `meshStandardMaterial` normal al que se le inyecta código
 * con `onBeforeCompile`: conserva luces, sombras y PBR. A la derecha, un
 * `shaderMaterial` propio que hace la misma onda pero no sabe nada de luces. La
 * diferencia en pantalla es el argumento de la lección.
 */
export default function Parchear() {
  const [amplitud, setAmplitud] = useState(0.12)
  const [parcheado, setParcheado] = useState(true)
  const [girar, setGirar] = useState(true)

  return (
    <DemoEscena
      titulo="Estándar parcheado frente a material propio"
      descripcion="Dos esferas con la misma onda. La de la izquierda es un material estándar al que se le inyecta código con onBeforeCompile y conserva luces y sombras. La de la derecha es un shader propio sin iluminación."
      alto={400}
      camara={[0, 0.75, 5.4]}
      sombras
      controles={
        <>
          <Deslizador
            etiqueta="amplitud"
            valor={amplitud}
            min={0}
            max={0.28}
            paso={0.005}
            onChange={setAmplitud}
          />
          <Interruptor etiqueta="parchear" activo={parcheado} onChange={setParcheado} />
          <Interruptor etiqueta="girar" activo={girar} onChange={setGirar} />
          <span className="ml-auto font-mono text-[11px] text-texto-tenue">
            izq: estándar + onBeforeCompile · der: shader propio
          </span>
        </>
      }
      nota="`onBeforeCompile` recibe el shader ya montado y permite sustituir trozos por sus `#include`. Se conserva todo el material original —luces, sombras, tonemapping— y se añade lo propio. El precio es la fragilidad: si three renombra un `#include`, el parche deja de aplicarse. Fíjate en que la esfera derecha no tiene sombra propia ni reflejos: eso es lo que se pierde con un shader a mano."
    >
      <ambientLight intensity={0.45} />
      <directionalLight position={[-3, 5, 3]} intensity={2.6} castShadow />
      <directionalLight position={[4, 2, -3]} intensity={0.55} color="#9fc2ff" />

      <Esferas amplitud={amplitud} parcheado={parcheado} girar={girar} />
    </DemoEscena>
  )
}

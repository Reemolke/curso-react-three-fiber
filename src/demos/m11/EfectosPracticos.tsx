import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { shaderMaterial } from '@react-three/drei'
import { Color, type Mesh, type Object3D } from 'three'
import { useGLTF } from '../../tres/gltf'
import { MODELOS } from '../../tres/rutas'
import { DemoEscena, Deslizador, GrupoOpciones } from '../marco'

type Efecto = 0 | 1 | 2 | 3

const EFECTOS: { valor: Efecto; texto: string }[] = [
  { valor: 0, texto: 'fresnel' },
  { valor: 1, texto: 'dissolve' },
  { valor: 2, texto: 'holograma' },
  { valor: 3, texto: 'desplazar' },
]

const VERTEX = /* glsl */ `
uniform float uTiempo;
uniform float uDesplazamiento;

varying vec3 vNormalMundo;
varying vec3 vPosMundo;
varying vec3 vPosLocal;

void main() {
  vec3 pos = position;

  // Ruido barato a partir de las tres coordenadas: no hace falta una textura.
  float onda = sin(pos.x * 7.0 + uTiempo * 2.2)
             * cos(pos.y * 5.0 - uTiempo * 1.3)
             * sin(pos.z * 4.0 + uTiempo * 0.9);
  pos += normal * onda * uDesplazamiento;

  vPosLocal = pos;
  vec4 mundo = modelMatrix * vec4(pos, 1.0);
  vPosMundo = mundo.xyz;
  vNormalMundo = normalize(mat3(modelMatrix) * normal);

  gl_Position = projectionMatrix * viewMatrix * mundo;
}
`

const FRAGMENT = /* glsl */ `
precision highp float;

uniform float uModo;
uniform float uTiempo;
uniform float uUmbral;
uniform vec3 uColor;
uniform vec3 uBorde;

varying vec3 vNormalMundo;
varying vec3 vPosMundo;
varying vec3 vPosLocal;

// Ruido por celda: da bloques, no una nube. Es el look del dissolve.
float ruido(vec3 p) {
  return fract(sin(dot(p, vec3(12.9898, 78.233, 37.719))) * 43758.5453);
}

void main() {
  vec3 normal = normalize(vNormalMundo);
  vec3 vista = normalize(cameraPosition - vPosMundo);
  float fresnel = pow(1.0 - clamp(dot(normal, vista), 0.0, 1.0), 2.4);

  // Luz falsa: un solo foco fijo. Sin esto el modelo es una silueta negra,
  // porque un shader propio no recibe las luces de la escena.
  float luz = clamp(dot(normal, normalize(vec3(0.35, 0.85, 0.45))), 0.0, 1.0);
  vec3 color = uColor * (0.42 + 0.75 * luz);

  if (uModo < 0.5) {
    // Fresnel: el borde se enciende según el ángulo de visión.
    color += uBorde * fresnel * 0.85;
  } else if (uModo < 1.5) {
    // Dissolve: cada celda desaparece según el umbral; el filo se ilumina.
    float n = ruido(floor(vPosLocal * 26.0));
    if (n < uUmbral) discard;
    float filo = smoothstep(uUmbral, uUmbral + 0.06, n);
    color = mix(uBorde, uColor * (0.5 + 0.7 * luz), filo);
  } else if (uModo < 2.5) {
    // Holograma: franjas que suben y borde brillante.
    float franja = step(0.45, fract(vPosLocal.y * 38.0 - uTiempo * 2.4));
    color = uColor * (0.35 + 0.65 * franja) * (0.55 + 0.7 * luz) + uBorde * fresnel * 1.5;
  } else {
    // Desplazamiento: el color sube con la altura, para ver la deformación.
    float altura = clamp(vPosLocal.y * 0.8 + 0.5, 0.0, 1.0);
    color = mix(uColor, uBorde, altura) * (0.6 + 0.5 * luz) + uBorde * fresnel * 0.4;
  }

  gl_FragColor = vec4(color, 1.0);
}
`

const MaterialEfecto = shaderMaterial(
  {
    uTiempo: 0,
    uModo: 0,
    uUmbral: 0.35,
    uDesplazamiento: 0,
    uColor: new Color('#2a4f86'),
    uBorde: new Color('#8fd0ff'),
  },
  VERTEX,
  FRAGMENT,
)

/** Dentro del canvas: carga el modelo, le pone el material y lo anima. */
function Rover({
  efecto,
  umbral,
  amplitud,
  girar,
}: {
  efecto: Efecto
  umbral: number
  amplitud: number
  girar: boolean
}) {
  const { scene } = useGLTF(MODELOS.rover)
  const copia = useMemo(() => scene.clone(true), [scene])
  const material = useMemo(() => new MaterialEfecto(), [])
  const grupo = useRef<Object3D>(null)
  const tiempo = useRef(0)

  useLayoutEffect(() => {
    copia.traverse((objeto) => {
      const malla = objeto as Mesh
      if (malla.isMesh) malla.material = material
    })
  }, [copia, material])

  useEffect(() => () => material.dispose(), [material])

  useFrame((_, delta) => {
    tiempo.current += delta
    material.uniforms.uTiempo.value = tiempo.current
    material.uniforms.uModo.value = efecto
    material.uniforms.uUmbral.value = umbral
    material.uniforms.uDesplazamiento.value = efecto === 3 ? amplitud : 0
    if (girar && grupo.current) grupo.current.rotation.y += delta * 0.45
  })

  return (
    <>
      <primitive object={copia} ref={grupo} position={[0, -0.55, 0]} />
      <gridHelper args={[8, 8, '#2b3554', '#1d2338']} position={[0, -0.72, 0]} />
    </>
  )
}

/**
 * Cuatro efectos de shader sobre el mismo modelo.
 *
 * Fresnel, dissolve, holograma y desplazamiento comparten un solo material y un
 * solo uniform `uModo`: no son cuatro materiales distintos, son cuatro ramas del
 * mismo fragment shader. El rover se clona porque los materiales del glTF son
 * compartidos entre demos: si se modificara el original, el fallo se vería en
 * cualquier otra lección.
 */
export default function EfectosPracticos() {
  const [efecto, setEfecto] = useState<Efecto>(0)
  const [umbral, setUmbral] = useState(0.2)
  const [amplitud, setAmplitud] = useState(0.06)
  const [girar, setGirar] = useState(true)

  return (
    <DemoEscena
      titulo="Fresnel, dissolve, holograma y desplazamiento"
      descripcion="Un rover lunar pintado por un shader propio. Cuatro botones cambian el efecto: borde fresnel, disolución por ruido, holograma con franjas o deformación de los vértices. Los deslizadores ajustan el umbral y la amplitud."
      alto={420}
      camara={[2.0, 1.45, 3.1]}
      controles={
        <>
          <GrupoOpciones etiqueta="efecto" valor={efecto} opciones={EFECTOS} onChange={setEfecto} />
          {efecto === 1 && (
            <Deslizador
              etiqueta="umbral"
              valor={umbral}
              min={0}
              max={0.95}
              paso={0.01}
              onChange={setUmbral}
            />
          )}
          {efecto === 3 && (
            <Deslizador
              etiqueta="amplitud"
              valor={amplitud}
              min={0}
              max={0.22}
              paso={0.005}
              onChange={setAmplitud}
            />
          )}
          <label className="ml-auto flex cursor-pointer items-center gap-2 text-xs text-texto-suave">
            <input
              type="checkbox"
              checked={girar}
              onChange={(evento) => setGirar(evento.target.checked)}
              className="size-3.5 accent-acento"
            />
            girar
          </label>
        </>
      }
      nota="Los cuatro efectos son ramas de un mismo shader, no cuatro materiales: cambian una comparación y se acabó. Fresnel usa el ángulo entre la normal y la vista; el dissolve descarta píxeles por ruido; el holograma multiplica por franjas; el desplazamiento mueve vértices en el vertex shader, antes de proyectar. Ese último es el único que cambia la silueta."
    >
      <ambientLight intensity={0.4} />
      <Rover efecto={efecto} umbral={umbral} amplitud={amplitud} girar={girar} />
    </DemoEscena>
  )
}

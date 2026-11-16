import { useCallback, useEffect, useState } from 'react'
import { useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { DemoEscena, GrupoOpciones } from '../marco'

type NodoArbol = {
  etiqueta: string
  hijos: NodoArbol[]
}

const SNIPPETS = [
  {
    id: 'cubo',
    nombre: 'Un cubo',
    codigo: `<mesh position={[0, 0, 0]}>
  <boxGeometry args={[1, 1, 1]} />
  <meshNormalMaterial />
</mesh>`,
  },
  {
    id: 'grupo',
    nombre: 'Un grupo',
    codigo: `<group rotation={[0, 0.6, 0]}>
  <mesh position={[-0.7, 0, 0]}>
    <boxGeometry args={[0.8, 0.8, 0.8]} />
    <meshBasicMaterial color="#f5a524" />
  </mesh>
  <mesh position={[0.7, 0, 0]}>
    <sphereGeometry args={[0.5, 16, 16]} />
    <meshBasicMaterial color="#4d8df6" />
  </mesh>
</group>`,
  },
  {
    id: 'anidado',
    nombre: 'Anidado con nombre',
    codigo: `<group name="constelacion">
  <mesh name="nucleo">
    <icosahedronGeometry args={[0.5, 0]} />
    <meshNormalMaterial />
  </mesh>
  <group name="satelites" position={[0.9, 0, 0]}>
    <mesh name="satelite">
      <boxGeometry args={[0.3, 0.3, 0.3]} />
      <meshBasicMaterial color="#3fbf87" />
    </mesh>
  </group>
</group>`,
  },
] as const

function Contenido({ id }: { id: string }) {
  if (id === 'cubo') {
    return (
      <mesh>
        <boxGeometry args={[1, 1, 1]} />
        <meshNormalMaterial />
      </mesh>
    )
  }

  if (id === 'grupo') {
    return (
      <group rotation={[0, 0.6, 0]}>
        <mesh position={[-0.7, 0, 0]}>
          <boxGeometry args={[0.8, 0.8, 0.8]} />
          <meshBasicMaterial color="#f5a524" />
        </mesh>
        <mesh position={[0.7, 0, 0]}>
          <sphereGeometry args={[0.5, 16, 16]} />
          <meshBasicMaterial color="#4d8df6" />
        </mesh>
      </group>
    )
  }

  return (
    <group name="constelacion">
      <mesh name="nucleo">
        <icosahedronGeometry args={[0.5, 0]} />
        <meshNormalMaterial />
      </mesh>
      <group name="satelites" position={[0.9, 0, 0]}>
        <mesh name="satelite">
          <boxGeometry args={[0.3, 0.3, 0.3]} />
          <meshBasicMaterial color="#3fbf87" />
        </mesh>
      </group>
    </group>
  )
}

function serializar(objeto: THREE.Object3D): NodoArbol {
  const extras: NodoArbol[] = []

  if (objeto instanceof THREE.Mesh) {
    extras.push({ etiqueta: `geometry → ${objeto.geometry.type}`, hijos: [] })
    const materiales = Array.isArray(objeto.material) ? objeto.material : [objeto.material]
    materiales.forEach((material) => {
      extras.push({ etiqueta: `material → ${material.type}`, hijos: [] })
    })
  }

  const hijos = objeto.children.map((hijo) => serializar(hijo))
  return {
    etiqueta: `${objeto.type}${objeto.name ? ` «${objeto.name}»` : ''}`,
    hijos: [...extras, ...hijos],
  }
}

function textoArbol(nodo: NodoArbol, nivel = 0): string {
  const sangria = '  '.repeat(nivel)
  const descendientes = nodo.hijos.map((hijo) => textoArbol(hijo, nivel + 1)).join('')
  return `${sangria}${nodo.etiqueta}\n${descendientes}`
}

/** Puente entre el canvas y el HTML: lee la escena real y la manda fuera. */
function PuenteArbol({ clave, onArbol }: { clave: string; onArbol: (arbol: NodoArbol) => void }) {
  const escena = useThree((estado) => estado.scene)

  useEffect(() => {
    // Se espera un frame para que R3F haya aplicado el árbol nuevo.
    const id = requestAnimationFrame(() => onArbol(serializar(escena)))
    return () => cancelAnimationFrame(id)
  }, [escena, clave, onArbol])

  return null
}

/**
 * 2.2 — Qué hace R3F por ti.
 *
 * El JSX de la izquierda se renderiza de verdad. Un componente puente lee la
 * escena con useThree y serializa los objetos que R3F ha creado. La geometría y
 * el material no aparecen como hijos: están «attachados» a la malla.
 */
export default function Inspector() {
  const [activo, setActivo] = useState<string>('cubo')
  const [arbol, setArbol] = useState<NodoArbol | null>(null)
  const recibir = useCallback((nuevo: NodoArbol) => setArbol(nuevo), [])

  const snippet = SNIPPETS.find((entrada) => entrada.id === activo) ?? SNIPPETS[0]

  return (
    <DemoEscena
      titulo="Inspector: del JSX al árbol de three.js"
      descripcion="Un pequeño cubo o grupo se dibuja en la escena. Debajo, el JSX que lo describe y el árbol de objetos three.js que React Three Fiber ha creado a partir de él."
      alto={250}
      camara={[3.2, 2.6, 4]}
      controles={
        <div className="w-full">
          <GrupoOpciones
            etiqueta="JSX"
            valor={activo}
            opciones={SNIPPETS.map((entrada) => ({ valor: entrada.id, texto: entrada.nombre }))}
            onChange={setActivo}
          />

          <div className="mt-3 grid gap-3 md:grid-cols-2">
            <div>
              <p className="mb-1 font-mono text-[10px] uppercase tracking-widest text-texto-tenue">JSX</p>
              <pre className="overflow-x-auto rounded-lg border border-borde bg-fondo p-2 font-mono text-[10px] leading-relaxed text-texto-suave">
                {snippet.codigo}
              </pre>
            </div>
            <div>
              <p className="mb-1 font-mono text-[10px] uppercase tracking-widest text-texto-tenue">
                Árbol de three.js
              </p>
              <pre className="min-h-28 overflow-x-auto rounded-lg border border-borde bg-fondo p-2 font-mono text-[10px] leading-relaxed text-texto-suave">
                {arbol ? textoArbol(arbol) : 'Leyendo la escena…'}
              </pre>
            </div>
          </div>
        </div>
      }
      nota="Fíjate en que boxGeometry y meshNormalMaterial no son hijos del Mesh: son su geometría y su material. Eso es el attach de R3F."
    >
      <Contenido id={activo} />
      <PuenteArbol clave={activo} onArbol={recibir} />
    </DemoEscena>
  )
}

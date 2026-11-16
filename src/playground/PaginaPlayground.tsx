import { Canvas } from '@react-three/fiber'
import { ContactShadows, Grid, OrbitControls, RoundedBox } from '@react-three/drei'
import { useState } from 'react'
import { Codigo } from '../ui/Codigo'
import { GrupoOpciones, Interruptor } from '../demos/marco'

type Material = 'estandar' | 'metal' | 'plastico'

const MATERIALES: Record<Material, { color: string; metalness: number; roughness: number }> = {
  estandar: { color: '#d8dbe3', metalness: 0.1, roughness: 0.6 },
  metal: { color: '#b8c0cc', metalness: 0.95, roughness: 0.28 },
  plastico: { color: '#f5a524', metalness: 0, roughness: 0.45 },
}

export function PaginaPlayground() {
  const [material, setMaterial] = useState<Material>('estandar')
  const [rejilla, setRejilla] = useState(true)
  const [girar, setGirar] = useState(true)

  const ajustes = MATERIALES[material]

  return (
    <div className="mx-auto max-w-5xl px-4 pb-16 pt-6 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold tracking-tight">Playground libre</h1>
      <p className="mt-2 max-w-2xl text-sm leading-relaxed text-texto-suave">
        Una escena base para experimentar sin romper ninguna lección: luces, sombras, materiales,
        controles de cámara y una rejilla de referencia. Arrastra para orbitar, rueda para acercarte.
      </p>

      <div className="mt-6 overflow-hidden rounded-caja border border-borde bg-fondo-alto">
        <div className="h-[min(60vh,520px)] w-full">
          <Canvas shadows camera={{ position: [5, 4, 7], fov: 45 }} dpr={[1, 2]}>
            <color attach="background" args={['#14171f']} />
            <fog attach="fog" args={['#14171f', 12, 26]} />

            <ambientLight intensity={0.35} />
            <directionalLight
              position={[5, 9, 4]}
              intensity={2.4}
              castShadow
              shadow-mapSize={[2048, 2048]}
              shadow-camera-left={-8}
              shadow-camera-right={8}
              shadow-camera-top={8}
              shadow-camera-bottom={-8}
            />
            <pointLight position={[-6, 4, -4]} intensity={22} color="#4d8df6" distance={18} />

            <group position={[0, 0.75, 0]}>
              <RoundedBox args={[1.6, 1.6, 1.6]} radius={0.12} smoothness={4} castShadow receiveShadow>
                <meshStandardMaterial {...ajustes} />
              </RoundedBox>
            </group>

            <mesh position={[-2.1, 0.6, 1]} castShadow receiveShadow>
              <sphereGeometry args={[0.6, 48, 32]} />
              <meshStandardMaterial color="#3fbf87" metalness={0.2} roughness={0.4} />
            </mesh>

            <mesh position={[2.2, 0.55, -0.6]} rotation={[0.4, 0.2, 0]} castShadow receiveShadow>
              <torusKnotGeometry args={[0.42, 0.15, 128, 24]} />
              <meshStandardMaterial color="#4d8df6" metalness={0.7} roughness={0.25} />
            </mesh>

            <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
              <planeGeometry args={[26, 26]} />
              <meshStandardMaterial color="#1c2028" roughness={0.9} metalness={0.1} />
            </mesh>

            <ContactShadows position={[0, 0.01, 0]} opacity={0.5} scale={14} blur={2.4} far={5} />

            {rejilla && (
              <Grid
                position={[0, 0.02, 0]}
                args={[24, 24]}
                cellSize={0.5}
                cellThickness={0.6}
                cellColor="#2c3240"
                sectionSize={2}
                sectionThickness={1}
                sectionColor="#3d4657"
                fadeDistance={26}
                infiniteGrid
              />
            )}

            <OrbitControls
              makeDefault
              autoRotate={girar}
              autoRotateSpeed={0.6}
              minDistance={2.5}
              maxDistance={18}
              maxPolarAngle={Math.PI / 2.05}
              target={[0, 0.8, 0]}
            />
          </Canvas>
        </div>

        <div className="flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-borde bg-superficie/40 px-3 py-2.5">
          <GrupoOpciones
            etiqueta="Material"
            valor={material}
            opciones={[
              { valor: 'estandar', texto: 'Estándar' },
              { valor: 'metal', texto: 'Metal' },
              { valor: 'plastico', texto: 'Plástico' },
            ]}
            onChange={setMaterial}
          />
          <Interruptor etiqueta="Rejilla" activo={rejilla} onChange={setRejilla} />
          <Interruptor etiqueta="Giro automático" activo={girar} onChange={setGirar} />
        </div>
      </div>

      <section className="mt-8 grid gap-4 lg:grid-cols-2">
        <div>
          <h2 className="text-lg font-semibold">La escena mínima, para copiar</h2>
          <p className="mt-1 text-sm text-texto-suave">
            Este es el esqueleto que usarás en todos los ejercicios. Cópialo a un archivo del proyecto
            y empieza a cambiar cosas: es la mejor forma de aprender qué hace cada línea.
          </p>
          <div className="mt-3">
            <Codigo
              lenguaje="tsx"
              titulo="Escena base"
              codigo={`<Canvas shadows camera={{ position: [5, 4, 7], fov: 45 }}>
  <ambientLight intensity={0.35} />
  <directionalLight position={[5, 9, 4]} intensity={2.4} castShadow />

  <mesh castShadow receiveShadow>
    <boxGeometry args={[1.6, 1.6, 1.6]} />
    <meshStandardMaterial color="#d8dbe3" roughness={0.6} />
  </mesh>

  <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
    <planeGeometry args={[26, 26]} />
    <meshStandardMaterial color="#1c2028" />
  </mesh>

  <OrbitControls makeDefault />
</Canvas>`}
            />
          </div>
        </div>

        <div>
          <h2 className="text-lg font-semibold">Ideas para probar ahora</h2>
          <ul className="mt-2 space-y-2 text-sm text-texto-suave">
            {[
              'Cambia el color y observa cómo cambia la percepción de la forma.',
              'Sube metalness a 1 y baja roughness: el objeto necesita un entorno para reflejar algo.',
              'Añade un segundo directionalLight desde el otro lado y mira si las sombras se pelean.',
              'Desactiva el giro automático y orbita a mano: así se siente el control real.',
              'Duplica la caja y colócala en position={[2, 0.75, 0]}.',
            ].map((idea) => (
              <li key={idea} className="flex gap-2">
                <span aria-hidden className="text-acento">
                  →
                </span>
                {idea}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  )
}

import { useEffect, useMemo, useState } from 'react'
import { DoubleSide, MeshStandardMaterial, PlaneGeometry, SphereGeometry } from 'three'
import { DemoEscena, Deslizador } from '../marco'
import { Medidor, PanelMetricas, useSalidas, type Salidas } from './medicion'

/** Dentro del canvas: la escena de prueba y el medidor. */
function Escena({
  objetos,
  detalle,
  capas,
  salidas,
}: {
  objetos: number
  detalle: number
  capas: number
  salidas: Salidas
}) {
  // Una sola geometría y un solo material para todas las mallas. Compartir es
  // lo normal en una escena real: no hay una copia por objeto.
  const geometria = useMemo(
    () => new SphereGeometry(0.32, Math.max(3, detalle), Math.max(2, Math.round(detalle / 2))),
    [detalle],
  )
  const material = useMemo(
    () => new MeshStandardMaterial({ color: '#4d8df6', roughness: 0.42, metalness: 0.18 }),
    [],
  )

  // Capas transparentes grandes: cada una obliga a sombrear la pantalla entera.
  const capa = useMemo(
    () =>
      new MeshStandardMaterial({
        color: '#5fa8ff',
        transparent: true,
        opacity: 0.07,
        depthWrite: false,
        side: DoubleSide,
      }),
    [],
  )
  const plano = useMemo(() => new PlaneGeometry(10, 10), [])

  useEffect(
    () => () => {
      geometria.dispose()
      material.dispose()
      capa.dispose()
      plano.dispose()
    },
    [geometria, material, capa, plano],
  )

  const posiciones = useMemo(() => {
    const lado = Math.ceil(Math.sqrt(objetos))
    const centro = (lado - 1) / 2
    return Array.from({ length: objetos }, (_, indice) => {
      const columna = indice % lado
      const fila = Math.floor(indice / lado)
      return [(columna - centro) * 0.74, 0.34, (fila - centro) * 0.74] as [number, number, number]
    })
  }, [objetos])

  return (
    <>
      <ambientLight intensity={0.55} />
      <directionalLight position={[5, 8, 4]} intensity={2.2} />
      <directionalLight position={[-5, 3, -4]} intensity={0.5} color="#9fc2ff" />

      <gridHelper args={[26, 26, '#2b3554', '#1d2338']} />

      {posiciones.map((posicion, indice) => (
        <mesh key={indice} geometry={geometria} material={material} position={posicion} />
      ))}

      {Array.from({ length: capas }, (_, indice) => (
        <mesh
          key={`capa-${indice}`}
          geometry={plano}
          material={capa}
          position={[0, 1.6, 3.4 - indice * 0.42]}
          renderOrder={10 + indice}
        />
      ))}

      <Medidor salidas={salidas} />
    </>
  )
}

/**
 * Anatomía de un frame: qué se puede medir y qué no.
 *
 * Tres controles mueven las tres magnitudes que de verdad cambian el coste: el
 * número de objetos (draw calls), el detalle de la geometría (triángulos) y las
 * capas transparentes (overdraw). El panel enseña lo que el renderer reporta.
 * El tiempo de GPU no aparece: WebGL no lo expone sin extensiones.
 */
export default function Metricas() {
  const [objetos, setObjetos] = useState(150)
  const [detalle, setDetalle] = useState(12)
  const [capas, setCapas] = useState(0)
  // Las referencias se crean fuera del canvas y se comparten con el medidor.
  const salidas = useSalidas()

  return (
    <DemoEscena
      titulo="Anatomía de un frame, con las cifras del renderer"
      descripcion="Una escena de esferas sobre una rejilla. Los controles cambian cuántas esferas hay, cuántos segmentos tiene cada una y cuántas capas transparentes se apilan delante de la cámara. Un panel mide fps, milisegundos por frame, draw calls, triángulos y memoria de GPU."
      alto={400}
      camara={[9, 8, 11]}
      controles={
        <div className="w-full space-y-3">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
            <Deslizador
              etiqueta="objetos"
              valor={objetos}
              min={1}
              max={400}
              paso={1}
              onChange={setObjetos}
            />
            <Deslizador
              etiqueta="detalle"
              valor={detalle}
              min={3}
              max={48}
              paso={1}
              onChange={setDetalle}
            />
            <Deslizador
              etiqueta="capas"
              valor={capas}
              min={0}
              max={8}
              paso={1}
              onChange={setCapas}
            />
          </div>
          <PanelMetricas salidas={salidas} />
        </div>
      }
      nota="Sube los objetos y mira los draw calls: uno por malla. Sube el detalle y mira los triángulos con los draw calls quietos. Sube las capas y mira el fps: no hay más objetos ni más triángulos, solo más píxeles sombreados. Eso es el overdraw, y es la razón de que una interfaz con paneles translúcidos pueda costar más que el modelo que hay detrás."
    >
      <Escena objetos={objetos} detalle={detalle} capas={capas} salidas={salidas} />
    </DemoEscena>
  )
}

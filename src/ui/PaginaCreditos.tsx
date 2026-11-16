type Fila = { recurso: string; autor: string; licencia: string; fuente?: string; nota?: string }

const MODELOS: Fila[] = [
  {
    recurso: 'Modelos del curso (caja, tuerca, lámpara, robot, rover, taller)',
    autor: 'Curso R3F',
    licencia: 'CC BY 4.0',
    nota: 'Generados con un escritor de glTF en Node (assets-src/modelos/) y comprimidos con Draco. 66 KB en total.',
  },
]

const ENTORNOS: Fila[] = [
  {
    recurso: 'estudio.hdr, exterior.hdr, luna.hdr',
    autor: 'Curso R3F',
    licencia: 'CC BY 4.0',
    nota: 'Cielos equirectangulares sintéticos escritos en Radiance RGBE (assets-src/hdri.mjs). No son fotografías.',
  },
]

const TEXTURAS: Fila[] = [
  {
    recurso: 'Hormigón, madera, metal y rejilla (color, normales, rugosidad)',
    autor: 'Curso R3F',
    licencia: 'CC BY 4.0',
    nota: 'Codificador PNG propio con ruido fBm (assets-src/texturas.mjs). 10 ficheros, 720 KB.',
  },
  {
    recurso: 'hormigon-color.ktx2',
    autor: 'Curso R3F (derivado del PNG anterior)',
    licencia: 'CC BY 4.0',
    nota: 'Comprimido con toktx 4.4.2 (KTX-Software, Apache 2.0): ETC1S con mipmaps, 23 KB.',
  },
]

const AUDIO: Fila[] = [
  {
    recurso: 'clic, paso, alerta, éxito y motor (bucle)',
    autor: 'Curso R3F',
    licencia: 'CC BY 4.0',
    nota: 'Sintetizados en assets-src/audio.mjs. WAV PCM 16 bits mono a 22 050 Hz.',
  },
]

const TIPOGRAFIAS: Fila[] = [
  {
    recurso: 'Roboto 400 y 700 (woff)',
    autor: 'The Roboto Project Authors / Google',
    licencia: 'OFL 1.1',
    fuente: 'https://fonts.google.com/specimen/Roboto',
    nota: 'Copiadas de @fontsource/roboto 5.3.0. El texto de la licencia se sirve en public/fuentes/OFL.txt.',
  },
]

const CODIGO: Fila[] = [
  { recurso: 'three.js', autor: 'mrdoob y colaboradores', licencia: 'MIT', fuente: 'https://threejs.org/' },
  { recurso: 'React y React DOM', autor: 'Meta', licencia: 'MIT', fuente: 'https://react.dev/' },
  {
    recurso: '@react-three/fiber, drei, postprocessing (react)',
    autor: 'pmndrs',
    licencia: 'MIT',
    fuente: 'https://github.com/pmndrs',
  },
  {
    recurso: '@react-three/rapier',
    autor: 'pmndrs',
    licencia: 'MIT',
    fuente: 'https://github.com/pmndrs/react-three-rapier',
  },
  {
    recurso: 'Rapier (@dimforge/rapier3d-compat)',
    autor: 'Dimforge',
    licencia: 'Apache-2.0',
    fuente: 'https://rapier.rs/',
  },
  {
    recurso: 'postprocessing (vanilla)',
    autor: 'vanruesc',
    licencia: 'Zlib',
    fuente: 'https://github.com/pmndrs/postprocessing',
  },
  { recurso: 'Zustand', autor: 'pmndrs', licencia: 'MIT', fuente: 'https://zustand.docs.pmnd.rs/' },
  { recurso: 'Vite', autor: 'Evan You y colaboradores', licencia: 'MIT', fuente: 'https://vite.dev/' },
  { recurso: 'Tailwind CSS', autor: 'Tailwind Labs', licencia: 'MIT', fuente: 'https://tailwindcss.com/' },
  {
    recurso: 'Sandpack',
    autor: 'CodeSandbox',
    licencia: 'Apache-2.0',
    fuente: 'https://sandpack.codesandbox.io/',
  },
  {
    recurso: 'Draco (decodificador en public/draco/)',
    autor: 'Google',
    licencia: 'Apache-2.0',
    fuente: 'https://github.com/google/draco',
  },
  {
    recurso: 'Basis Universal (transcoder en public/basis/)',
    autor: 'Binomial / Khronos',
    licencia: 'Apache-2.0',
    fuente: 'https://github.com/BinomialLLC/basis_universal',
  },
  {
    recurso: 'TypeScript',
    autor: 'Microsoft',
    licencia: 'Apache-2.0',
    fuente: 'https://www.typescriptlang.org/',
  },
]

function Tabla({ titulo, filas }: { titulo: string; filas: Fila[] }) {
  return (
    <section className="mt-8">
      <h2 className="text-lg font-semibold">{titulo}</h2>
      <div className="mt-3 overflow-x-auto rounded-caja border border-borde">
        <table className="w-full border-collapse text-left text-sm">
          <thead>
            <tr className="bg-superficie-alta/60">
              {['Recurso', 'Autor', 'Licencia', 'Fuente'].map((c) => (
                <th key={c} scope="col" className="px-3 py-2 text-xs uppercase tracking-wider text-texto-tenue">
                  {c}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filas.map((fila) => (
              <tr key={fila.recurso} className="border-t border-borde/60 align-top">
                <td className="px-3 py-2">
                  <span className="block text-texto">{fila.recurso}</span>
                  {fila.nota && <span className="block text-xs text-texto-tenue">{fila.nota}</span>}
                </td>
                <td className="px-3 py-2 text-texto-suave">{fila.autor}</td>
                <td className="whitespace-nowrap px-3 py-2 font-mono text-xs text-acento">{fila.licencia}</td>
                <td className="px-3 py-2 text-xs">
                  {fila.fuente ? (
                    <a href={fila.fuente} target="_blank" rel="noreferrer noopener" className="text-frio hover:underline">
                      {fila.fuente.replace('https://', '')}
                    </a>
                  ) : (
                    <span className="text-texto-tenue">—</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}

export function PaginaCreditos() {
  return (
    <div className="mx-auto max-w-4xl px-4 pb-16 pt-8 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold tracking-tight">Créditos y licencias</h1>
      <p className="mt-2 max-w-2xl text-sm leading-6 text-texto-suave">
        Este curso solo empaqueta recursos con licencia libre y verificable. Los modelos, las texturas, los
        HDRIs y el audio se generan desde cero con los scripts de <code className="font-mono text-xs">assets-src/</code>,
        lo que elimina cualquier duda de licencia y permite que los nombres de nodo sean los que cada lección
        necesita. El inventario completo, con estado de cada fichero, está en{' '}
        <code className="font-mono text-xs">ASSETS.md</code>.
      </p>

      <Tabla titulo="Modelos 3D" filas={MODELOS} />
      <Tabla titulo="Entornos HDRI" filas={ENTORNOS} />
      <Tabla titulo="Texturas" filas={TEXTURAS} />
      <Tabla titulo="Audio" filas={AUDIO} />
      <Tabla titulo="Tipografías" filas={TIPOGRAFIAS} />
      <Tabla titulo="Código y dependencias" filas={CODIGO} />

      <section className="mt-8 rounded-caja border border-borde bg-superficie p-4">
        <h2 className="text-sm font-semibold">Fuentes que se recomiendan pero no se empaquetan</h2>
        <p className="mt-1 text-xs leading-5 text-texto-suave">
          <strong>Quaternius</strong> usa la licencia QAL v1.0, que permite usar sus assets en un
          producto pero prohíbe redistribuir los ficheros como assets. Este curso es, literalmente, una
          distribución de assets, así que se enlaza como recurso para tus proyectos pero no se incluye.
          <strong> Poly Pizza</strong> y <strong>Sketchfab</strong> tienen licencia por modelo: hay que
          comprobar el badge de cada fichero antes de usarlo.
        </p>
      </section>

      <p className="mt-8 text-xs text-texto-tenue">
        Los textos del curso son originales. Las fuentes de conocimiento se enlazan en «Para
        profundizar» de cada lección y nunca se copian.
      </p>
    </div>
  )
}

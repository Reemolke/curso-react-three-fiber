import fs from 'node:fs'

/**
 * Aplica <Texto> a los títulos, objetivos, errores y quiz que hoy se pintan
 * en crudo (con `backticks` y **negritas** visibles).
 */
const cambios = {
  'src/ui/Quiz.tsx': [
    ['import { useProgreso } from \'../estado/progreso\'', "import { useProgreso } from '../estado/progreso'\nimport { Texto } from './Texto'"],
    ['<span>{pregunta.enunciado}</span>', '<span>\n                <Texto>{pregunta.enunciado}</Texto>\n              </span>'],
    ['<span>{opcion}</span>', '<span>\n                      <Texto>{opcion}</Texto>\n                    </span>'],
    ['{pregunta.explicacion}', '<Texto>{pregunta.explicacion}</Texto>'],
  ],
  'src/ui/PaginaLeccion.tsx': [
    ['import { Quiz } from \'./Quiz\'', "import { Quiz } from './Quiz'\nimport { Texto } from './Texto'"],
    ['>{leccion.titulo}</h1>', '>\n        <Texto>{leccion.titulo}</Texto>\n      </h1>'],
    ['{leccion.objetivo.charAt(0).toLowerCase() + leccion.objetivo.slice(1)}', '<Texto>{leccion.objetivo.charAt(0).toLowerCase() + leccion.objetivo.slice(1)}</Texto>'],
    ['{error.sintoma}', '<Texto>{error.sintoma}</Texto>'],
    ['{error.causa}', '<Texto>{error.causa}</Texto>'],
    ['{error.arreglo}', '<Texto>{error.arreglo}</Texto>'],
    ['{recurso.titulo}', '<Texto>{recurso.titulo}</Texto>'],
    ['{anterior.titulo}', '<Texto>{anterior.titulo}</Texto>'],
    ['{siguiente.titulo}', '<Texto>{siguiente.titulo}</Texto>'],
    ['{siguiente.titulo}</span>', '<Texto>{siguiente.titulo}</Texto></span>'],
  ],
  'src/ui/PaginaModulo.tsx': [
    ['import { enlaceLeccion } from \'../router/rutas\'', "import { enlaceLeccion } from '../router/rutas'\nimport { Texto } from './Texto'"],
    ['>{modulo.titulo}</h1>', '>\n          <Texto>{modulo.titulo}</Texto>\n        </h1>'],
    ['{leccion.titulo}', '<Texto>{leccion.titulo}</Texto>'],
    ['{leccion.objetivo}', '<Texto>{leccion.objetivo}</Texto>'],
  ],
  'src/ui/BarraLateral.tsx': [
    ['import { enlaceLeccion, enlaceModulo } from \'../router/rutas\'', "import { enlaceLeccion, enlaceModulo } from '../router/rutas'\nimport { Texto } from './Texto'"],
    ['{pendiente.titulo}', '<Texto>{pendiente.titulo}</Texto>'],
    ['{modulo.titulo}', '<Texto>{modulo.titulo}</Texto>'],
    ['<span className="min-w-0 flex-1">{leccion.titulo}</span>', '<span className="min-w-0 flex-1">\n                          <Texto>{leccion.titulo}</Texto>\n                        </span>'],
  ],
  'src/ui/Buscador.tsx': [
    ['import { enlaceLeccion } from \'../router/rutas\'', "import { enlaceLeccion } from '../router/rutas'\nimport { Texto } from './Texto'"],
    ['{resultado.leccion.titulo}', '<Texto>{resultado.leccion.titulo}</Texto>'],
    ['{resultado.modulo.titulo}', '<Texto>{resultado.modulo.titulo}</Texto>'],
  ],
  'src/ui/PaginaProgreso.tsx': [
    ['{modulo.titulo}', '<Texto>{modulo.titulo}</Texto>'],
  ],
  'src/ui/PaginaInicio.tsx': [
    ['{modulo.titulo}', '<Texto>{modulo.titulo}</Texto>'],
  ],
}

for (const [ruta, lista] of Object.entries(cambios)) {
  let s = fs.readFileSync(ruta, 'utf8')
  let ok = 0
  for (const [antes, despues] of lista) {
    if (!s.includes(antes)) {
      console.log(`${ruta} NO ENCONTRADO: ${JSON.stringify(antes).slice(0, 80)}`)
      continue
    }
    s = s.split(antes).join(despues)
    ok++
  }
  // Import de Texto si no estaba declarado y se ha usado.
  if (s.includes('<Texto>') && !s.includes("import { Texto }")) {
    const lineas = s.split('\n')
    const ultimoImport = lineas.reduce((acc, l, i) => (l.startsWith('import ') ? i : acc), -1)
    lineas.splice(ultimoImport + 1, 0, "import { Texto } from './Texto'")
    s = lineas.join('\n')
    console.log(`${ruta}: import añadido al final`)
  }
  fs.writeFileSync(ruta, s)
  console.log(`${ruta}: ${ok}/${lista.length}`)
}

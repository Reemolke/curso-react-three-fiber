import fs from 'node:fs'

const ruta = 'src/ui/Bloques.tsx'
let s = fs.readFileSync(ruta, 'utf8')

const cambios = [
  [
    "<p className=\"text-[15px] leading-7 text-texto-suave\">{bloque.texto}</p>",
    "<p className=\"text-[15px] leading-7 text-texto-suave\">\n        <Texto>{bloque.texto}</Texto>\n      </p>",
  ],
  [
    "<p className=\"mt-1.5 text-sm leading-6 text-texto-suave\">{bloque.texto}</p>",
    "<p className=\"mt-1.5 text-sm leading-6 text-texto-suave\">\n            <Texto>{bloque.texto}</Texto>\n          </p>",
  ],
  ['<span>{item}</span>', '<span>\n                <Texto>{item}</Texto>\n              </span>'],
  ['{celda}\n                  </th>', '<Texto>{celda}</Texto>\n                  </th>'],
  ['{celda}\n                    </td>', '<Texto>{celda}</Texto>\n                    </td>'],
  [
    '<p className="text-sm font-semibold">{paso.titulo}</p>',
    '<p className="text-sm font-semibold">\n                  <Texto>{paso.titulo}</Texto>\n                </p>',
  ],
  [
    '<p className="mt-0.5 text-sm leading-6 text-texto-suave">{paso.texto}</p>',
    '<p className="mt-0.5 text-sm leading-6 text-texto-suave">\n                  <Texto>{paso.texto}</Texto>\n                </p>',
  ],
  ['{bloque.pie}', '<Texto>{bloque.pie}</Texto>'],
  ['{archivo.descripcion}', '<Texto>{archivo.descripcion}</Texto>'],
  ['{item}\n              </li>', '<Texto>{item}</Texto>\n              </li>'],
  ["{bloque.titulo ?? 'Checkpoint'}", "<Texto>{bloque.titulo ?? 'Checkpoint'}</Texto>"],
  ["import { Codigo } from './Codigo'", "import { Codigo } from './Codigo'\nimport { Texto } from './Texto'"],
]

let aplicados = 0
for (const [antes, despues] of cambios) {
  if (!s.includes(antes)) {
    console.log('NO ENCONTRADO:', JSON.stringify(antes).slice(0, 90))
    continue
  }
  s = s.split(antes).join(despues)
  aplicados++
}

fs.writeFileSync(ruta, s)
console.log(`aplicados ${aplicados}/${cambios.length}`)

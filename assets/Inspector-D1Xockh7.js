import{a as e}from"./rolldown-runtime-BWaJ3C7D.js";import{_ as t,f as n}from"./react-C2KsiCsq.js";import{St as r,et as i}from"./three-BVG2VSL3.js";import{r as a,t as o}from"./marco-BJJtGvB-.js";var s=e(t(),1),c=n(),l=[{id:`cubo`,nombre:`Un cubo`,codigo:`<mesh position={[0, 0, 0]}>
  <boxGeometry args={[1, 1, 1]} />
  <meshNormalMaterial />
</mesh>`},{id:`grupo`,nombre:`Un grupo`,codigo:`<group rotation={[0, 0.6, 0]}>
  <mesh position={[-0.7, 0, 0]}>
    <boxGeometry args={[0.8, 0.8, 0.8]} />
    <meshBasicMaterial color="#f5a524" />
  </mesh>
  <mesh position={[0.7, 0, 0]}>
    <sphereGeometry args={[0.5, 16, 16]} />
    <meshBasicMaterial color="#4d8df6" />
  </mesh>
</group>`},{id:`anidado`,nombre:`Anidado con nombre`,codigo:`<group name="constelacion">
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
</group>`}];function u({id:e}){return e===`cubo`?(0,c.jsxs)(`mesh`,{children:[(0,c.jsx)(`boxGeometry`,{args:[1,1,1]}),(0,c.jsx)(`meshNormalMaterial`,{})]}):e===`grupo`?(0,c.jsxs)(`group`,{rotation:[0,.6,0],children:[(0,c.jsxs)(`mesh`,{position:[-.7,0,0],children:[(0,c.jsx)(`boxGeometry`,{args:[.8,.8,.8]}),(0,c.jsx)(`meshBasicMaterial`,{color:`#f5a524`})]}),(0,c.jsxs)(`mesh`,{position:[.7,0,0],children:[(0,c.jsx)(`sphereGeometry`,{args:[.5,16,16]}),(0,c.jsx)(`meshBasicMaterial`,{color:`#4d8df6`})]})]}):(0,c.jsxs)(`group`,{name:`constelacion`,children:[(0,c.jsxs)(`mesh`,{name:`nucleo`,children:[(0,c.jsx)(`icosahedronGeometry`,{args:[.5,0]}),(0,c.jsx)(`meshNormalMaterial`,{})]}),(0,c.jsx)(`group`,{name:`satelites`,position:[.9,0,0],children:(0,c.jsxs)(`mesh`,{name:`satelite`,children:[(0,c.jsx)(`boxGeometry`,{args:[.3,.3,.3]}),(0,c.jsx)(`meshBasicMaterial`,{color:`#3fbf87`})]})})]})}function d(e){let t=[];e instanceof r&&(t.push({etiqueta:`geometry → ${e.geometry.type}`,hijos:[]}),(Array.isArray(e.material)?e.material:[e.material]).forEach(e=>{t.push({etiqueta:`material → ${e.type}`,hijos:[]})}));let n=e.children.map(e=>d(e));return{etiqueta:`${e.type}${e.name?` «${e.name}»`:``}`,hijos:[...t,...n]}}function f(e,t=0){let n=`  `.repeat(t),r=e.hijos.map(e=>f(e,t+1)).join(``);return`${n}${e.etiqueta}\n${r}`}function p({clave:e,onArbol:t}){let n=i(e=>e.scene);return(0,s.useEffect)(()=>{let e=requestAnimationFrame(()=>t(d(n)));return()=>cancelAnimationFrame(e)},[n,e,t]),null}function m(){let[e,t]=(0,s.useState)(`cubo`),[n,r]=(0,s.useState)(null),i=(0,s.useCallback)(e=>r(e),[]),d=l.find(t=>t.id===e)??l[0];return(0,c.jsxs)(o,{titulo:`Inspector: del JSX al árbol de three.js`,descripcion:`Un pequeño cubo o grupo se dibuja en la escena. Debajo, el JSX que lo describe y el árbol de objetos three.js que React Three Fiber ha creado a partir de él.`,alto:250,camara:[3.2,2.6,4],controles:(0,c.jsxs)(`div`,{className:`w-full`,children:[(0,c.jsx)(a,{etiqueta:`JSX`,valor:e,opciones:l.map(e=>({valor:e.id,texto:e.nombre})),onChange:t}),(0,c.jsxs)(`div`,{className:`mt-3 grid gap-3 md:grid-cols-2`,children:[(0,c.jsxs)(`div`,{children:[(0,c.jsx)(`p`,{className:`mb-1 font-mono text-[10px] uppercase tracking-widest text-texto-tenue`,children:`JSX`}),(0,c.jsx)(`pre`,{className:`overflow-x-auto rounded-lg border border-borde bg-fondo p-2 font-mono text-[10px] leading-relaxed text-texto-suave`,children:d.codigo})]}),(0,c.jsxs)(`div`,{children:[(0,c.jsx)(`p`,{className:`mb-1 font-mono text-[10px] uppercase tracking-widest text-texto-tenue`,children:`Árbol de three.js`}),(0,c.jsx)(`pre`,{className:`min-h-28 overflow-x-auto rounded-lg border border-borde bg-fondo p-2 font-mono text-[10px] leading-relaxed text-texto-suave`,children:n?f(n):`Leyendo la escena…`})]})]})]}),nota:`Fíjate en que boxGeometry y meshNormalMaterial no son hijos del Mesh: son su geometría y su material. Eso es el attach de R3F.`,children:[(0,c.jsx)(u,{id:e}),(0,c.jsx)(p,{clave:e,onArbol:i})]})}export{m as default};
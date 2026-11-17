import{a as e}from"./rolldown-runtime-BWaJ3C7D.js";import{_ as t,f as n}from"./react-C2KsiCsq.js";import{$ as r}from"./three-BVG2VSL3.js";import{n as i,r as a,t as o}from"./marco-BJJtGvB-.js";var s=e(t(),1),c=n(),l=[{valor:`plano`,texto:`plano`},{valor:`esfera`,texto:`esfera`},{valor:`toro`,texto:`toro`}],u=`
varying vec2 vUv;

void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`,d=`
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
`;function f({forma:e,frecuencia:t,modo:n,animar:i}){let a=(0,s.useRef)(null),o=(0,s.useRef)(0),l=(0,s.useMemo)(()=>({uTiempo:{value:0},uFrecuencia:{value:6},uModo:{value:1}}),[]);return r((e,r)=>{i&&(o.current+=r);let s=a.current;s&&(s.uniforms.uTiempo.value=o.current,s.uniforms.uFrecuencia.value=t,s.uniforms.uModo.value=n)}),(0,c.jsxs)(`mesh`,{children:[e===`plano`&&(0,c.jsx)(`planeGeometry`,{args:[2.6,2.6,1,1]}),e===`esfera`&&(0,c.jsx)(`sphereGeometry`,{args:[1.45,48,32]}),e===`toro`&&(0,c.jsx)(`torusGeometry`,{args:[1.05,.45,32,64]}),(0,c.jsx)(`shaderMaterial`,{ref:a,uniforms:l,vertexShader:u,fragmentShader:d})]})}function p(){let[e,t]=(0,s.useState)(`plano`),[n,r]=(0,s.useState)(6),[u,d]=(0,s.useState)(1),[p,m]=(0,s.useState)(!0);return(0,c.jsx)(o,{titulo:`UV como color y patrón animado`,descripcion:`Una superficie pintada por un shader propio. En modo UV, el rojo es la coordenada u y el verde la v. En modo patrón, las mismas UV generan un dibujo animado. Se puede cambiar la geometría para ver cómo se deforma la UV.`,alto:380,camara:[1.6,1.3,3.6],controles:(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)(a,{etiqueta:`geometría`,valor:e,opciones:l,onChange:t}),(0,c.jsx)(i,{etiqueta:`frecuencia`,valor:n,min:1,max:20,paso:.5,onChange:r}),(0,c.jsx)(a,{etiqueta:`modo`,valor:u,opciones:[{valor:0,texto:`UV`},{valor:1,texto:`patrón`}],onChange:d}),(0,c.jsxs)(`label`,{className:`flex cursor-pointer items-center gap-2 text-xs text-texto-suave`,children:[(0,c.jsx)(`input`,{type:`checkbox`,checked:p,onChange:e=>m(e.target.checked),className:`size-3.5 accent-acento`}),`animar`]})]}),nota:"El vertex shader corre una vez por vértice; el fragment una vez por píxel. Por eso el patrón es «gratis» en vértices y caro en píxeles: la cuenta se repite en cada fragmento de la pantalla. `vUv` se pasa como `varying`: el vertex la escribe, la GPU la interpola y el fragment la lee.",children:(0,c.jsx)(f,{forma:e,frecuencia:n,modo:u,animar:p})})}export{p as default};
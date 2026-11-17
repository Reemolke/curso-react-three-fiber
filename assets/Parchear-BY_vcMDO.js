import{a as e}from"./rolldown-runtime-BWaJ3C7D.js";import{_ as t,f as n}from"./react-C2KsiCsq.js";import{$ as r,W as i,ct as a}from"./three-BVG2VSL3.js";import{i as o,n as s,t as c}from"./marco-BJJtGvB-.js";var l=e(t(),1),u=n(),d=i({uTiempo:0,uAmplitud:.12,uBorde:new a(`#e05f7a`)},`
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
`,`
precision highp float;

uniform vec3 uBorde;
varying float vOnda;

void main() {
  // Sin luces: el color sale solo de la onda. Plano y honesto.
  float t = clamp(vOnda * 0.5 + 0.5, 0.0, 1.0);
  gl_FragColor = vec4(mix(vec3(0.06, 0.09, 0.14), uBorde, t), 1.0);
}
`);function f({amplitud:e,parcheado:t,girar:n}){let i=(0,l.useRef)(null),a=(0,l.useRef)(null),o=(0,l.useRef)(null),s=(0,l.useRef)(null),c=(0,l.useRef)(0),f=(0,l.useMemo)(()=>new d,[]);return(0,l.useEffect)(()=>{let e=i.current;if(e)return e.onBeforeCompile=e=>{e.uniforms.uTiempo={value:0},e.uniforms.uAmplitud={value:.12},e.vertexShader=`uniform float uTiempo;
uniform float uAmplitud;
varying vec3 vPosOnda;
${e.vertexShader}`,e.vertexShader=e.vertexShader.replace(`#include <begin_vertex>`,`#include <begin_vertex>
  vPosOnda = position;
  float onda = sin(position.x * 5.0 + uTiempo * 2.0) * cos(position.y * 4.0 - uTiempo * 1.2);
  transformed += objectNormal * onda * uAmplitud;`),e.fragmentShader=`uniform float uTiempo;
varying vec3 vPosOnda;
${e.fragmentShader}`,e.fragmentShader=e.fragmentShader.replace(`#include <dithering_fragment>`,`#include <dithering_fragment>
  float franja = step(0.62, fract(vPosOnda.y * 7.0 - uTiempo * 1.6));
  gl_FragColor.rgb += vec3(0.10, 0.30, 0.75) * franja * 0.5;`),a.current=e},e.customProgramCacheKey=()=>`onda-parcheada-v1`,e.needsUpdate=!0,()=>{e.onBeforeCompile=()=>{},a.current=null}},[]),(0,l.useEffect)(()=>()=>f.dispose(),[f]),r((r,i)=>{c.current+=i,n&&(o.current&&(o.current.rotation.y+=i*.35),s.current&&(s.current.rotation.y+=i*.35));let l=a.current;l&&(l.uniforms.uTiempo.value=c.current,l.uniforms.uAmplitud.value=t?e:0),f.uniforms.uTiempo.value=c.current,f.uniforms.uAmplitud.value=e}),(0,u.jsxs)(u.Fragment,{children:[(0,u.jsxs)(`mesh`,{ref:o,position:[-1.3,.35,0],castShadow:!0,receiveShadow:!0,children:[(0,u.jsx)(`sphereGeometry`,{args:[1.05,96,64]}),(0,u.jsx)(`meshStandardMaterial`,{ref:i,color:`#7d8aa8`,metalness:.65,roughness:.32})]}),(0,u.jsxs)(`mesh`,{ref:s,position:[1.3,.35,0],children:[(0,u.jsx)(`sphereGeometry`,{args:[1.05,96,64]}),(0,u.jsx)(`primitive`,{object:f,attach:`material`})]}),(0,u.jsxs)(`mesh`,{rotation:[-Math.PI/2,0,0],position:[0,-.78,0],receiveShadow:!0,children:[(0,u.jsx)(`planeGeometry`,{args:[14,10]}),(0,u.jsx)(`meshStandardMaterial`,{color:`#151b2a`,roughness:.94})]})]})}function p(){let[e,t]=(0,l.useState)(.12),[n,r]=(0,l.useState)(!0),[i,a]=(0,l.useState)(!0);return(0,u.jsxs)(c,{titulo:`Estándar parcheado frente a material propio`,descripcion:`Dos esferas con la misma onda. La de la izquierda es un material estándar al que se le inyecta código con onBeforeCompile y conserva luces y sombras. La de la derecha es un shader propio sin iluminación.`,alto:400,camara:[0,.75,5.4],sombras:!0,controles:(0,u.jsxs)(u.Fragment,{children:[(0,u.jsx)(s,{etiqueta:`amplitud`,valor:e,min:0,max:.28,paso:.005,onChange:t}),(0,u.jsx)(o,{etiqueta:`parchear`,activo:n,onChange:r}),(0,u.jsx)(o,{etiqueta:`girar`,activo:i,onChange:a}),(0,u.jsx)(`span`,{className:`ml-auto font-mono text-[11px] text-texto-tenue`,children:`izq: estándar + onBeforeCompile · der: shader propio`})]}),nota:"`onBeforeCompile` recibe el shader ya montado y permite sustituir trozos por sus `#include`. Se conserva todo el material original —luces, sombras, tonemapping— y se añade lo propio. El precio es la fragilidad: si three renombra un `#include`, el parche deja de aplicarse. Fíjate en que la esfera derecha no tiene sombra propia ni reflejos: eso es lo que se pierde con un shader a mano.",children:[(0,u.jsx)(`ambientLight`,{intensity:.45}),(0,u.jsx)(`directionalLight`,{position:[-3,5,3],intensity:2.6,castShadow:!0}),(0,u.jsx)(`directionalLight`,{position:[4,2,-3],intensity:.55,color:`#9fc2ff`}),(0,u.jsx)(f,{amplitud:e,parcheado:n,girar:i})]})}export{p as default};
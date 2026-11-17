import{a as e}from"./rolldown-runtime-BWaJ3C7D.js";import{_ as t,f as n}from"./react-C2KsiCsq.js";import{$ as r,Q as i,W as a,ct as o}from"./three-BVG2VSL3.js";import{n as s,r as c,t as l}from"./marco-BJJtGvB-.js";var u=e(t(),1),d=n(),f=[{valor:`azul`,texto:`azul`},{valor:`verde`,texto:`verde`},{valor:`fuego`,texto:`fuego`}],p={azul:[`#123a7a`,`#7fc2ff`],verde:[`#0f4d3a`,`#7ff0c4`],fuego:[`#5a1a12`,`#ffc46b`]},m=a({uTiempo:0,uAmplitud:.22,uColorA:new o(`#123a7a`),uColorB:new o(`#7fc2ff`)},`
uniform float uTiempo;
uniform float uAmplitud;
varying float vOnda;
varying vec2 vUv;

void main() {
  vUv = uv;
  vec3 pos = position;

  float onda = sin(pos.x * 5.0 + uTiempo * 2.0) * cos(pos.y * 4.0 - uTiempo * 1.3);
  pos += normal * onda * uAmplitud;

  vOnda = onda;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}
`,`
precision highp float;

uniform vec3 uColorA;
uniform vec3 uColorB;
varying float vOnda;
varying vec2 vUv;

void main() {
  float t = clamp(vOnda * 0.5 + 0.5, 0.0, 1.0);
  vec3 color = mix(uColorA, uColorB, t);

  // Un poco de sombreado falso con la UV para que no parezca plano.
  color *= 0.82 + 0.18 * smoothstep(0.0, 1.0, vUv.y);

  gl_FragColor = vec4(color, 1.0);
}
`);i({MaterialOnda:m});function h({paleta:e,amplitud:t,velocidad:n}){let i=(0,u.useRef)(null),a=(0,u.useRef)(0);return r((r,o)=>{let s=i.current;s&&(a.current+=o*n,s.uniforms.uTiempo.value=a.current,s.uniforms.uAmplitud.value=t,s.uniforms.uColorA.value.set(p[e][0]),s.uniforms.uColorB.value.set(p[e][1]))}),(0,d.jsxs)(`mesh`,{children:[(0,d.jsx)(`sphereGeometry`,{args:[1.2,96,64]}),(0,d.jsx)(`materialOnda`,{ref:i,side:2})]})}function g(){let[e,t]=(0,u.useState)(`azul`),[n,r]=(0,u.useState)(.22),[i,a]=(0,u.useState)(1);return(0,d.jsx)(l,{titulo:`Material propio con uniforms animados`,descripcion:`Una esfera deformada por un shader propio. Los deslizadores cambian la amplitud, la velocidad y la paleta de colores sin recrear el material.`,alto:380,camara:[0,.6,3.6],controles:(0,d.jsxs)(d.Fragment,{children:[(0,d.jsx)(s,{etiqueta:`amplitud`,valor:n,min:0,max:.6,paso:.01,onChange:r}),(0,d.jsx)(s,{etiqueta:`velocidad`,valor:i,min:0,max:3,paso:.05,onChange:a}),(0,d.jsx)(c,{etiqueta:`paleta`,valor:e,opciones:f,onChange:t})]}),nota:"`extend({ MaterialOnda })` registra la clase y la hace disponible como `<materialOnda />`, en minúscula. Si la escribes en mayúscula, R3F la trata como componente de React y falla. Ojo: este material no recibe luces; si las necesitas, usa `meshStandardMaterial` parcheado (lección 11.6).",children:(0,d.jsx)(h,{paleta:e,amplitud:n,velocidad:i})})}export{g as default};
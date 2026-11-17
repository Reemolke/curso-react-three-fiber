import{a as e}from"./rolldown-runtime-BWaJ3C7D.js";import{_ as t,f as n}from"./react-C2KsiCsq.js";import{$ as r,H as i,W as a,ct as o}from"./three-BVG2VSL3.js";import"./gltf-mBx_MGuL.js";import{s}from"./rutas-DZ0AlAW-.js";import{n as c,r as l,t as u}from"./marco-BJJtGvB-.js";var d=e(t(),1),f=n(),p=[{valor:0,texto:`fresnel`},{valor:1,texto:`dissolve`},{valor:2,texto:`holograma`},{valor:3,texto:`desplazar`}],m=a({uTiempo:0,uModo:0,uUmbral:.35,uDesplazamiento:0,uColor:new o(`#2a4f86`),uBorde:new o(`#8fd0ff`)},`
uniform float uTiempo;
uniform float uDesplazamiento;

varying vec3 vNormalMundo;
varying vec3 vPosMundo;
varying vec3 vPosLocal;

void main() {
  vec3 pos = position;

  // Ruido barato a partir de las tres coordenadas: no hace falta una textura.
  float onda = sin(pos.x * 7.0 + uTiempo * 2.2)
             * cos(pos.y * 5.0 - uTiempo * 1.3)
             * sin(pos.z * 4.0 + uTiempo * 0.9);
  pos += normal * onda * uDesplazamiento;

  vPosLocal = pos;
  vec4 mundo = modelMatrix * vec4(pos, 1.0);
  vPosMundo = mundo.xyz;
  vNormalMundo = normalize(mat3(modelMatrix) * normal);

  gl_Position = projectionMatrix * viewMatrix * mundo;
}
`,`
precision highp float;

uniform float uModo;
uniform float uTiempo;
uniform float uUmbral;
uniform vec3 uColor;
uniform vec3 uBorde;

varying vec3 vNormalMundo;
varying vec3 vPosMundo;
varying vec3 vPosLocal;

// Ruido por celda: da bloques, no una nube. Es el look del dissolve.
float ruido(vec3 p) {
  return fract(sin(dot(p, vec3(12.9898, 78.233, 37.719))) * 43758.5453);
}

void main() {
  vec3 normal = normalize(vNormalMundo);
  vec3 vista = normalize(cameraPosition - vPosMundo);
  float fresnel = pow(1.0 - clamp(dot(normal, vista), 0.0, 1.0), 2.4);

  // Luz falsa: un solo foco fijo. Sin esto el modelo es una silueta negra,
  // porque un shader propio no recibe las luces de la escena.
  float luz = clamp(dot(normal, normalize(vec3(0.35, 0.85, 0.45))), 0.0, 1.0);
  vec3 color = uColor * (0.42 + 0.75 * luz);

  if (uModo < 0.5) {
    // Fresnel: el borde se enciende según el ángulo de visión.
    color += uBorde * fresnel * 0.85;
  } else if (uModo < 1.5) {
    // Dissolve: cada celda desaparece según el umbral; el filo se ilumina.
    float n = ruido(floor(vPosLocal * 26.0));
    if (n < uUmbral) discard;
    float filo = smoothstep(uUmbral, uUmbral + 0.06, n);
    color = mix(uBorde, uColor * (0.5 + 0.7 * luz), filo);
  } else if (uModo < 2.5) {
    // Holograma: franjas que suben y borde brillante.
    float franja = step(0.45, fract(vPosLocal.y * 38.0 - uTiempo * 2.4));
    color = uColor * (0.35 + 0.65 * franja) * (0.55 + 0.7 * luz) + uBorde * fresnel * 1.5;
  } else {
    // Desplazamiento: el color sube con la altura, para ver la deformación.
    float altura = clamp(vPosLocal.y * 0.8 + 0.5, 0.0, 1.0);
    color = mix(uColor, uBorde, altura) * (0.6 + 0.5 * luz) + uBorde * fresnel * 0.4;
  }

  gl_FragColor = vec4(color, 1.0);
}
`);function h({efecto:e,umbral:t,amplitud:n,girar:a}){let{scene:o}=i(s.rover),c=(0,d.useMemo)(()=>o.clone(!0),[o]),l=(0,d.useMemo)(()=>new m,[]),u=(0,d.useRef)(null),p=(0,d.useRef)(0);return(0,d.useLayoutEffect)(()=>{c.traverse(e=>{let t=e;t.isMesh&&(t.material=l)})},[c,l]),(0,d.useEffect)(()=>()=>l.dispose(),[l]),r((r,i)=>{p.current+=i,l.uniforms.uTiempo.value=p.current,l.uniforms.uModo.value=e,l.uniforms.uUmbral.value=t,l.uniforms.uDesplazamiento.value=e===3?n:0,a&&u.current&&(u.current.rotation.y+=i*.45)}),(0,f.jsxs)(f.Fragment,{children:[(0,f.jsx)(`primitive`,{object:c,ref:u,position:[0,-.55,0]}),(0,f.jsx)(`gridHelper`,{args:[8,8,`#2b3554`,`#1d2338`],position:[0,-.72,0]})]})}function g(){let[e,t]=(0,d.useState)(0),[n,r]=(0,d.useState)(.2),[i,a]=(0,d.useState)(.06),[o,s]=(0,d.useState)(!0);return(0,f.jsxs)(u,{titulo:`Fresnel, dissolve, holograma y desplazamiento`,descripcion:`Un rover lunar pintado por un shader propio. Cuatro botones cambian el efecto: borde fresnel, disolución por ruido, holograma con franjas o deformación de los vértices. Los deslizadores ajustan el umbral y la amplitud.`,alto:420,camara:[2,1.45,3.1],controles:(0,f.jsxs)(f.Fragment,{children:[(0,f.jsx)(l,{etiqueta:`efecto`,valor:e,opciones:p,onChange:t}),e===1&&(0,f.jsx)(c,{etiqueta:`umbral`,valor:n,min:0,max:.95,paso:.01,onChange:r}),e===3&&(0,f.jsx)(c,{etiqueta:`amplitud`,valor:i,min:0,max:.22,paso:.005,onChange:a}),(0,f.jsxs)(`label`,{className:`ml-auto flex cursor-pointer items-center gap-2 text-xs text-texto-suave`,children:[(0,f.jsx)(`input`,{type:`checkbox`,checked:o,onChange:e=>s(e.target.checked),className:`size-3.5 accent-acento`}),`girar`]})]}),nota:`Los cuatro efectos son ramas de un mismo shader, no cuatro materiales: cambian una comparación y se acabó. Fresnel usa el ángulo entre la normal y la vista; el dissolve descarta píxeles por ruido; el holograma multiplica por franjas; el desplazamiento mueve vértices en el vertex shader, antes de proyectar. Ese último es el único que cambia la silueta.`,children:[(0,f.jsx)(`ambientLight`,{intensity:.4}),(0,f.jsx)(h,{efecto:e,umbral:n,amplitud:i,girar:o})]})}export{g as default};
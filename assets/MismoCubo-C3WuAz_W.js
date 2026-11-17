import{a as e}from"./rolldown-runtime-BWaJ3C7D.js";import{_ as t,f as n}from"./react-C2KsiCsq.js";import{Ct as r,Et as i,Nt as a,St as o,at as s,tt as c}from"./three-BVG2VSL3.js";import{a as l,t as u}from"./marco-BJJtGvB-.js";var d=e(t(),1),f=n(),p=`const escena = new THREE.Scene()
const camara = new THREE.PerspectiveCamera(45, 1, 0.1, 100)
camara.position.set(2.6, 2, 3.4)
camara.lookAt(0, 0, 0)

const cubo = new THREE.Mesh(
  new THREE.BoxGeometry(1.3, 1.3, 1.3),
  new THREE.MeshBasicMaterial({ color: '#f5a524' }),
)
escena.add(cubo)

const renderer = new THREE.WebGLRenderer({ canvas, antialias: true })
renderer.setSize(ancho, alto, false)

function frame(ahora) {
  cubo.rotation.y = ahora / 1000 * 0.8
  renderer.render(escena, camara)
  requestAnimationFrame(frame)
}`,m=`function Cubo() {
  const [giro, setGiro] = useState(0)

  useEffect(() => {
    const id = setInterval(() => {
      setGiro((valor) => valor + 0.033)
    }, 33)
    return () => clearInterval(id)
  }, [])

  return (
    <mesh rotation={[giro * 0.3, giro * 0.8, 0]}>
      <boxGeometry args={[1.3, 1.3, 1.3]} />
      <meshBasicMaterial color="#f5a524" />
    </mesh>
  )
}

// El <Canvas> pone la escena, la cámara y el renderer.
<Canvas camera={{ position: [2.6, 2, 3.4], fov: 45 }}>
  <Cubo />
</Canvas>`;function h(){let e=(0,d.useRef)(null);return(0,d.useEffect)(()=>{let t=e.current;if(!t)return;let n=new c({canvas:t,antialias:!0,alpha:!0});n.setPixelRatio(Math.min(window.devicePixelRatio,2));let l=new a,u=new i(45,1,.1,100);u.position.set(2.6,2,3.4),u.lookAt(0,0,0);let d=new s(1.3,1.3,1.3),f=new r({color:`#f5a524`}),p=new o(d,f);l.add(p);let m=()=>{let e=Math.max(t.clientWidth,1),r=Math.max(t.clientHeight,1);n.setSize(e,r,!1),u.aspect=e/r,u.updateProjectionMatrix()};m();let h=new ResizeObserver(m);h.observe(t);let g=0,_=performance.now(),v=e=>{let t=(e-_)/1e3;p.rotation.y=t*.8,p.rotation.x=t*.3,n.render(l,u),g=requestAnimationFrame(v)};return g=requestAnimationFrame(v),()=>{cancelAnimationFrame(g),h.disconnect(),d.dispose(),f.dispose(),n.dispose()}},[]),(0,f.jsx)(`div`,{style:{height:210},children:(0,f.jsx)(`canvas`,{ref:e,className:`block size-full`,"aria-label":`Cubo girando en un canvas de three.js puro`})})}function g(){let[e,t]=(0,d.useState)(0);return(0,d.useEffect)(()=>{let e=window.setInterval(()=>t(e=>e+.033),33);return()=>window.clearInterval(e)},[]),(0,f.jsxs)(`mesh`,{rotation:[e*.3,e*.8,0],children:[(0,f.jsx)(`boxGeometry`,{args:[1.3,1.3,1.3]}),(0,f.jsx)(`meshBasicMaterial`,{color:`#f5a524`})]})}function _(){return(0,f.jsxs)(`div`,{className:`grid gap-3 md:grid-cols-2`,children:[(0,f.jsxs)(l,{titulo:`three.js puro: describes los pasos`,children:[(0,f.jsx)(h,{}),(0,f.jsx)(`pre`,{className:`overflow-x-auto border-t border-borde bg-fondo p-3 font-mono text-[10px] leading-relaxed text-texto-suave`,children:p})]}),(0,f.jsxs)(`div`,{children:[(0,f.jsx)(u,{titulo:`React Three Fiber: describes el resultado`,descripcion:`El mismo cubo ámbar girando, esta vez descrito con JSX y sin crear un renderer a mano.`,alto:210,camara:[2.6,2,3.4],children:(0,f.jsx)(g,{})}),(0,f.jsx)(`pre`,{className:`mt-1 overflow-x-auto rounded-b-caja border border-t-0 border-borde bg-fondo p-3 font-mono text-[10px] leading-relaxed text-texto-suave`,children:m})]})]})}export{_ as default};
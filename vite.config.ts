import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

/**
 * `base: './'` es lo que permite que el mismo build funcione en Vercel, Netlify y
 * GitHub Pages (que sirve desde /nombre-del-repo/) sin tocar nada.
 * El router por hash no necesita rewrites en el servidor.
 */
export default defineConfig({
  base: './',
  plugins: [react(), tailwindcss()],
  server: { port: 5173, open: false },
  build: {
    target: 'es2022',
    cssCodeSplit: true,
    chunkSizeWarningLimit: 900,
    /*
     * Sandpack solo lo necesita quien abre un «Pruébalo tú», pero su chunk
     * acaba en la lista de precarga del HTML y todas las visitas descargan
     * 268 kB comprimidos antes de pintar. Se filtra de la precarga: el
     * `lazy()` de `Sandbox.tsx` lo pide igual cuando hace falta.
     */
    modulePreload: {
      resolveDependencies: (_archivo, dependencias) =>
        dependencias.filter((dependencia) => !dependencia.includes('sandpack')),
    },
    rollupOptions: {
      output: {
        manualChunks(id) {
          /*
           * El helper de precarga y el polyfill de módulos son dos trozos de
           * código que genera Vite (ids virtuales, no están en node_modules) y
           * que usan casi todos los chunks. Sin regla propia, rolldown los
           * metía dentro del chunk de Sandpack y la entrada acababa importando
           * 268 kB comprimidos de editor de código solo para pedir un `<link>`.
           * Con chunk propio son ~1 kB.
           */
          if (id.includes('vite/preload-helper') || id.includes('modulepreload-polyfill')) {
            return 'arranque'
          }
          if (!id.includes('node_modules')) return
          if (id.includes('@codesandbox/sandpack') || id.includes('codemirror')) return 'sandpack'
          if (id.includes('three')) return 'three'
          if (id.includes('@react-three')) return 'r3f'
          if (id.includes('react')) return 'react'
        },
      },
    },
  },
})

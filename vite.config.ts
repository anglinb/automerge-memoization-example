// vite.config.ts
import { defineConfig } from "vite"
import react from '@vitejs/plugin-react-swc'
import wasm from "vite-plugin-wasm"
import topLevelAwait from "vite-plugin-top-level-await"

export default defineConfig({
  plugins: [topLevelAwait(), wasm(), react()],

  worker: {
    format: "es",
    plugins: [wasm()],
  },

  optimizeDeps: {
    // This is necessary because otherwise `vite dev` includes two separate
    // versions of the JS wrapper. This causes problems because the JS
    // wrapper has a module level variable to track JS side heap
    // allocations, and initializing this twice causes horrible breakage
    exclude: [
      "@automerge/automerge-wasm",
      "@automerge/automerge-wasm/bundler/bindgen_bg.wasm",
      "@syntect/wasm",
    ],
  },
})

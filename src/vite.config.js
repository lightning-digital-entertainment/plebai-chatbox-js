import { defineConfig } from "vite";

export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        dir: "./lib",
        entryFileNames: "plebai.js",
        assetFileNames: "styles.css",
        chunkFileNames: "chunk.js",
        manualChunks: undefined,
      },
    },
  },
});

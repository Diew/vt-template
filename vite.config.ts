import { defineConfig } from 'vite'
import { defineConfig as defineVitestConfig, mergeConfig } from 'vitest/config'

const viteConfig = defineConfig({
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      output: {
        entryFileNames: 'assets/[name].[hash].js',
        chunkFileNames: 'assets/[name].[hash].js',
        assetFileNames: 'assets/[name].[hash].[ext]'
      }
    }
  }
})

export default mergeConfig(viteConfig, defineVitestConfig({
  test: {
    environment: 'jsdom',
    globals: true,
  },
}))

import { defineConfig } from 'vitepress'
import path from 'path'

export default defineConfig({
  base: '/eBricks-AI/',
  title: "eBricks-AI",
  description: "803 Series Edge AI Modular Ecosystem",
  srcDir: '.',
  port: 8080,
  themeConfig: {
    // Custom theme config
  },
  vite: {
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '../../src'),
      }
    }
  }
})

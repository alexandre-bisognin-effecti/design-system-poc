import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue2'
import path from 'path'

export default defineConfig({
  plugins: [vue()],
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: 'MeUIVue2',
      fileName: (format) => `ui-vue2.${format}.js`
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        globals: {
          vue: 'Vue'
        },
        assetFileNames: 'style.css'
      }
    }
  },
  server: {
    port: 5174,
  },
  test: {
    globals: true,
    environment: 'jsdom',
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules/',
        'src/dev-main.ts',
        '**/*.spec.ts',
        '**/*.test.ts',
        '**/dist/**',
      ]
    }
  }
})

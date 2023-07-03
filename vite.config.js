/// <reference types="vitest" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    coverage: {
      reporters: ["lcov", "text", "html"],
    },
    environment: "jsdom",
    setupFiles: ["vitest.setup.js"],
  }
})

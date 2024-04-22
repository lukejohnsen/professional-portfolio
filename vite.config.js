import { defineConfig } from 'vite'
import react from 'react'

// https://vitejs.dev/config/
export default defineConfig({
  base: "./",
  plugins: [react()],
})

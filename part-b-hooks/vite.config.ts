import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import mockApi from './mock-api.js'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), mockApi()],
})

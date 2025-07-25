import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 5173,     // Порт для dev сервера
    strictPort: true,
    hmr: {
      clientPort: 5173,
      host: 'localhost'
    }
  },
})

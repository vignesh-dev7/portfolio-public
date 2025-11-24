import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: [
      '@common-ui/app-provider',
      '@common-ui/theme-provider'
    ],
  }

})

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      { find: '@', replacement: '/src' },
      { find: '@layut', replacement: '/src/layout' },
      { find: '@pages', replacement: '/src/pages' },
      { find: '@interface', replacement: '/src/types/interface' },
      
      { find: '@coocse', replacement: '/src/utils/cocies.ts' },
      {find: "@service-auth" , replacement: "/src/service/auth"},
    ]
  }
})

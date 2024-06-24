import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      { find: '@', replacement: '/src' },
      { find: '@layout', replacement: '/src/layout' },
      { find: '@pages', replacement: '/src/pages' },
      { find: '@interface', replacement: '/src/types/interface' },
      { find: '@ui', replacement: '/src/components/ui' },
      { find: '@modals', replacement: '/src/components/modals' },
      
      { find: '@cookie', replacement: '/src/utils/cookie.ts' },
      {find: "@service-auth" , replacement: "/src/service/auth"},

      { find: '@company', replacement: '/src/service/company' },
      { find: '@country', replacement: '/src/service/country' },


      { find: '@stor-company', replacement: '/src/stor/stor-company'},
      { find: '@stor-country', replacement: '/src/stor/stor-country'},

    ]
  }
})

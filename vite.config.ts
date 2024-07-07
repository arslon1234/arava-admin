import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      { find: '@', replacement: '/src' },
      { find: '@layout', replacement: '/src/layout' },
      { find: '@pages', replacement: '/src/pages' },
      { find: '@validations', replacement: '/src/validations' },
      { find: '@interface', replacement: '/src/types/interface' },
      { find: '@ui', replacement: '/src/components/ui' },
      { find: '@modals', replacement: '/src/components/modals' },
      { find: '@drawers', replacement: '/src/components/drawers' },

      { find: '@cookie', replacement: '/src/utils/cookie.ts' },
      {find: "@service-auth" , replacement: "/src/service/auth"},

      { find: '@company', replacement: '/src/service/company' },
      { find: '@country', replacement: '/src/service/country' },
      { find: '@banner', replacement: '/src/service/banner' },
      { find: '@brand', replacement: '/src/service/brand' },
      { find: '@brand-type', replacement: '/src/service/brand-type' },
      { find: '@city', replacement: '/src/service/city' },
      { find: '@сouriers', replacement: '/src/service/сouriers' },
      { find: '@region', replacement: '/src/service/region' },
      { find: '@branch', replacement: '/src/service/branch' },
      { find: '@cuisines', replacement: '/src/service/cuisines' },



      { find: '@store', replacement: '/src/store'},

    ]
  },
  // define: {
  //   'process.env': process.env
  // }

})

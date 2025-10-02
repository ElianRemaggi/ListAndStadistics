import { fileURLToPath, URL } from 'node:url'
import { defineNuxtConfig } from 'nuxt/config'
import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  // Configuración esencial para SPA
  ssr: false,

  // Resto de tu configuración
  alias: {
    '@': fileURLToPath(new URL('./', import.meta.url))
  },

  devtools: { enabled: true },
  css: ['@/assets/css/main.css', 'vue3-easy-data-table/dist/style.css' ],
  modules: ['lenis/nuxt'],
  app: {
    baseURL: '/build/',
    buildAssetsDir: '_nuxt'
  },
  nitro: {
    preset: 'static' 
  },
  vite: {
    plugins: [tailwindcss()],
    base: '/build/',
    server: {
      proxy: {
        "/api": {
          target: "http://localhost:8080/sgh/sistemas/Laboratorio/EstadisticasSedes/api",
          changeOrigin: true,
          secure: false,
          rewrite: (path: string) => path.replace(/^\/api/, ""),
        },
      },
      cors: {
        origin: '*',
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        preflightContinue: true,
        optionsSuccessStatus: 204,
      }
    }
  },

  srcDir: './',
  compatibilityDate: '2025-06-13',
})
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: ['@nuxt/icon'],
    ssr: false,
  app: {
    baseURL: '/',
  },
  nitro: {
    preset: 'static',
  }
})
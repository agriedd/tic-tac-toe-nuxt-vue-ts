// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },
  modules: ["@nuxtjs/tailwindcss"],
  imports: {
    dirs: [
      'composables/**'
    ]
  },
  devServer: {
    host: '192.168.1.9'
  }
})
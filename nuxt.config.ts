// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  devtools: { enabled: false },
  ssr: false,
  modules: ["@nuxtjs/tailwindcss", "@vueuse/nuxt"],
  imports: {
    dirs: ["composables/**"],
  },
  // devServer: {
  //   host: "192.168.1.9",
  // },
  app: {
    baseURL: '/tic-tac-toe-nuxt-vue-ts',
  },
  vite: {
    optimizeDeps: {
      include: ["howler"],
    },
  },
  nitro: {
    prerender: {
      // crawlLinks: false,
      // routes: [
      // ],

    },
  }
});

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },
  ssr: false,
  app: {
    baseURL: '/tic-tac-toe-nuxt-vue-ts',
    // buildAssetsDir: 
  },
  modules: ["@nuxtjs/tailwindcss", "@vueuse/nuxt"],
  imports: {
    dirs: ["composables/**"],
  },
  // devServer: {
  //   host: "192.168.1.9",
  // },
  vite: {
    optimizeDeps: {
      include: ["howler"],
    },
  },
  // nitro: {
  //   prerender: {
  //     // crawlLinks: false,
  //     // routes: [
  //     // ],

  //   },
  // }
});

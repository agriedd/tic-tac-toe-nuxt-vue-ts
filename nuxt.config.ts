// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },
  ssr: false,
  app: {
    baseURL: "/tic-tac-toe-nuxt-vue-ts",
    buildAssetsDir: "/tic-tac-toe-nuxt-vue-ts/_nuxt",
  },
  modules: ["@nuxtjs/tailwindcss", "@vueuse/nuxt"],
  imports: {
    dirs: ["composables/**"],
  },
  vite: {
    optimizeDeps: {
      include: ["howler"],
    },
  },
  nitro: {
    runtimeConfig: {
      app: {
        baseURL: "/tic-tac-toe-nuxt-vue-ts",
        buildAssetsDir: "/tic-tac-toe-nuxt-vue-ts/_nuxt",
      },
    },
    prerender: {},
    experimental: {
      // websocket: true,
      // tasks: true,
    },
  },
  runtimeConfig: {
    public: {
      // wsBase: 'ws://localhost:4000'
      wsBase: 'wss://games.gmitdiaspora.org:4000'
    }
  }
});

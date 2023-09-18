// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@nuxtjs/tailwindcss", "nuxt-swiper", "@pinia/nuxt"],
  css: ["~/assets/scss/style.scss"],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  runtimeConfig: {
    apiSecret: process.env.NUXT_BASE_API_KEY,
    public: {
      apiBase: process.env.NUXT_BASE_API_URL,
    },
  },
  vite: {
    css: {
      preprocessorOptions: {
        sass: {
          additionalData: '@import "~/assets/scss/variables.scss"',
        },
      },
    },
  },
  swiper: {
    // Swiper options
    //----------------------
    prefix: "Swiper",
    styleLang: "scss",
    modules: ["navigation", "pagination"], // all modules are imported by default
  },
});

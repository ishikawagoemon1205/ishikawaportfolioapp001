// https://nuxt.com/docs/api/configuration/nuxt-config

import { defineNuxtModule } from 'nuxt'

export default defineNuxtConfig({
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  modules: ['@ant-design-vue/nuxt', 'nuxt-swiper', '@nuxtjs/google-fonts'],
  googleFonts: {
    families: {
      'Zen Dots': true,
      'BIZ UDPGothic': true,
    }
  },
  runtimeConfig: {
    public: {
      firebaseConfig: {
        apiKey: "AIzaSyAfl5kr8ovZtFa83nwhIpSBDloxZ4pHwow",
        authDomain: "may-portfolio-site.firebaseapp.com",
        projectId: "may-portfolio-site",
        storageBucket: "may-portfolio-site.appspot.com",
        messagingSenderId: "296087985826",
        appId: "1:296087985826:web:1a543018c5aea1c0c241fb",
        measurementId: "G-NNJFKLG5C3"
      },
    },
  },
});
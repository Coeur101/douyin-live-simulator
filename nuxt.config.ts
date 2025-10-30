// https://nuxt.com/docs/api/configuration/nuxt-config
import { fileURLToPath } from 'url'
import { dirname, resolve } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
    '@vueuse/nuxt',
    '@nuxt/icon'
  ],
  css: ['~/assets/css/main.css'],
  alias: {
    '~': resolve(__dirname),
    '@': resolve(__dirname)
  },
  vite: {
    resolve: {
      alias: {
        '~': resolve(__dirname),
        '@': resolve(__dirname)
      }
    }
  },
  app: {
    head: {
      title: '抖音直播间模拟器',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: '抖音直播间UI模拟器，支持弹幕、点赞、礼物特效' }
      ]
    }
  }
})

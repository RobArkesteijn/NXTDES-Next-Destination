// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'format-detection', content: 'telephone=no' },
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon-default.svg' },
        {
          rel: 'icon',
          type: 'image/x-icon',
          href: '/favicon-white.svg',
          media: '(prefers-color-scheme:dark)',
        },
        {
          rel: 'icon',
          type: 'image/x-icon',
          href: '/favicon-black.svg',
          media: '(prefers-color-scheme:light)',
        },
      ],
    },
  },
  build: {
    transpile: ['gsap'],
  },
  colorMode: {
    preference: 'light',
  },
  devtools: { enabled: true },
  eslint: {
    lintOnStart: false,
  },
  extends: ['@nuxt/ui-pro'],
  image: {
    dir: 'assets/images',
    formats: ['webp'],
    quality: 80,
  },
  modules: [
    '@nuxtjs/eslint-module',
    'nuxt-svgo',
    '@nuxtjs/fontaine',
    '@nuxt/ui',
    '@nuxtjs/strapi',
    '@nuxt/image',
  ],
  plugins: [{ src: '@/plugins/gsap', mode: 'client' }],
  srcDir: './src',
  svgo: {
    defaultImport: 'component',
  },
  tailwindcss: {
    viewer: false,
  },
  ui: {
    icons: ['material-symbols', 'mdi', 'twemoji'],
  },
});

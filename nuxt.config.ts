// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'format-detection', content: 'telephone=no' },
        { name: 'theme-color', content: '#233746' },
      ],
      link: [
        { rel: 'icon', href: '/favicon-default.svg' },
        {
          rel: 'icon',
          href: '/favicon-white.svg',
          media: '(prefers-color-scheme:dark)',
        },
        {
          rel: 'icon',
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
    config: {
      stylistic: true,
    },
  },
  extends: ['@nuxt/ui-pro'],
  future: {
    compatibilityVersion: 4,
  },
  i18n: {
    baseUrl: 'https://www.nxtdes.com',
    vueI18n: './i18n.config.ts',
    defaultLocale: 'en',
    locales: [
      {
        code: 'en',
        iso: 'en-US',
        name: 'English',
        dir: 'ltr',
      },
    ],
    detectBrowserLanguage: {
      useCookie: false,
    },
  },
  image: {
    dir: 'assets/images',
    formats: ['webp'],
    quality: 80,
    strapi: {
      baseURL: process.env.STRAPI_BASE_URL,
    },
  },
  linkChecker: {
    enabled: false,
  },
  mapbox: {
    accessToken: process.env.MAPBOX_ACCESS_TOKEN,
  },
  modules: [
    '@nuxt/eslint',
    '@nuxt/image',
    '@nuxt/ui',
    '@nuxt/content',
    '@nuxtjs/fontaine',
    '@nuxtjs/i18n',
    '@nuxtjs/seo',
    '@nuxtjs/strapi',
    '@nuxthq/studio',
    'nuxt-mapbox',
    'nuxt-svgo',
  ],
  ogImage: {
    enabled: false,
  },
  plugins: [
    // Activate plugin once you start working with gsap
    // { src: '@/plugins/gsap', mode: 'client' },
  ],
  robots: {
    enabled: false,
  },
  runtimeConfig: {
    public: {
      weatherApiUrl: 'https://weatherapi-com.p.rapidapi.com',
      currencyApiUrl: 'https://currency-converter18.p.rapidapi.com/api/v1',
      xRapidWeatherApiHost: process.env.NUXT_PUBLIC_X_RAPID_WEATHER_API_HOST,
      xRapidCurrencyApiHost: process.env.NUXT_PUBLIC_X_RAPID_CURRENCY_API_HOST,
      xRapidApiKey: process.env.NUXT_PUBLIC_X_RAPID_WEATHER_API_KEY,
    },
  },
  seo: {
    redirectToCanonicalSiteUrl: true,
  },
  site: {
    url: 'https://www.nxtdes.com',
    name: 'Next Destination',
    description: 'Step into the world of your Next Destination',
  },
  sitemap: {
    enabled: false,
  },
  svgo: {
    defaultImport: 'component',
  },
  tailwindcss: {
    editorSupport: true,
  },
  ui: {
    icons: ['material-symbols', 'mdi', 'twemoji', 'tabler'],
  },
})

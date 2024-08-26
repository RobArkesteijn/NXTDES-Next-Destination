// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  $production: {
    seo: {
      redirectToCanonicalSiteUrl: true,
    },
  },

  app: {
    head: {
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'theme-color', content: '#4394b1' },
      ],
      link: [
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
    pageTransition: { name: 'page', mode: 'out-in' },
  },

  build: {
    transpile: ['gsap'],
  },

  colorMode: {
    preference: 'light',
  },

  device: {
    refreshOnResize: true,
  },

  devtools: {
    enabled: true,
  },

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
    baseUrl: import.meta.env.NUXT_PUBLIC_SITE_URL,
    defaultLocale: 'en',
    langDir: 'lang/',
    lazy: true,
    locales: [
      {
        code: 'en',
        language: 'en-GB',
        file: 'en-GB.ts',
      },
      {
        code: 'nl',
        language: 'nl-NL',
        file: 'nl-NL.ts',
      },
    ],
    strategy: 'prefix',
  },

  image: {
    dir: 'assets/images',
    formats: ['webp'],
    quality: 80,
    strapi: {
      baseURL: import.meta.env.STRAPI_BASE_URL,
    },
  },

  linkChecker: {
    report: {
      markdown: true,
    },
  },

  mapbox: {
    accessToken: import.meta.env.MAPBOX_ACCESS_TOKEN,
  },

  modules: [
    '@nuxt/eslint',
    '@nuxt/image',
    '@nuxt/test-utils/module',
    '@nuxt/ui',
    '@nuxtjs/fontaine',
    '@nuxtjs/i18n',
    '@nuxtjs/seo',
    '@nuxtjs/strapi',
    '@nuxtjs/stylelint-module',
    '@vueuse/nuxt',
    'nuxt-mapbox',
    'nuxt-svgo',
  ],

  ogImage: {
    fonts: [
      {
        name: 'thermite',
        weight: 900,
        path: '/fonts/thermite.otf',
      },
      {
        name: 'brixton',
        weight: 900,
        path: '/fonts/Brixton-Bold.ttf',
      },
    ],
  },

  robots: {
    groups: [
      {
        userAgent: '*',
      },
    ],
    sitemap: 'https://nxtdes.com/sitemap.xml',
  },

  runtimeConfig: {
    public: {
      siteUrl: import.meta.env.NUXT_PUBLIC_SITE_URL,
      weatherApiUrl: 'https://weatherapi-com.p.rapidapi.com',
      currencyApiUrl: 'https://currency-converter18.p.rapidapi.com/api/v1',
      xRapidWeatherApiHost: import.meta.env.NUXT_PUBLIC_X_RAPID_WEATHER_API_HOST,
      xRapidCurrencyApiHost: import.meta.env.NUXT_PUBLIC_X_RAPID_CURRENCY_API_HOST,
      xRapidApiKey: import.meta.env.NUXT_PUBLIC_X_RAPID_WEATHER_API_KEY,
    },
  },

  schemaOrg: {
    identity: {
      type: 'Organization',
      name: 'NXTDES',
      url: import.meta.env.NUXT_PUBLIC_SITE_URL,
      logo: '/logo.svg',
    },
  },

  svgo: {
    defaultImport: 'component',
  },

  tailwindcss: {
    editorSupport: true,
    viewer: false,
  },

  ui: {
    icons: ['material-symbols', 'mdi', 'twemoji', 'tabler'],
  },

  compatibilityDate: '2024-07-04',
})

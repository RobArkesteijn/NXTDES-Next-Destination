// Types for the env vars accessed via `import.meta.env` in nuxt.config.ts.
// Nuxt 3.13's generated tsconfig does not augment ImportMeta.env, so we do it here.
interface ImportMetaEnv {
  readonly STRAPI_BASE_URL?: string
  readonly MAPBOX_ACCESS_TOKEN?: string
  readonly [key: string]: string | undefined
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

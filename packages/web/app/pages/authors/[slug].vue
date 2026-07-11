<script setup lang="ts">
import type { AuthorAttributes } from '@/types/Author'

defineI18nRoute({
  paths: {
    uk: '/authors/[slug]',
    nl: '/auteurs/[slug]',
  },
})

const route = useRoute()
const { fullPath, params } = route
const { slug } = params
const { t } = useI18n()

const { data } = await useAsyncData(fullPath, async () => {
  const { find } = useStrapi()
  const response = await find<AuthorAttributes>('authors', {
    populate: '*',
    filters: { name: { $eqi: (slug as string).split('-').join(' ') } },
  })
  return response
})

if (!data.value) {
  throw createError({
    statusCode: 404,
    statusMessage: t('error.404.statusMessage'),
    message: t('error.404.message'),
  })
}

console.log(data.value)

useSchemaOrg({
  '@type': 'ItemList',
})
</script>

<template>
  <div>
    <h1>{{ data?.data[0]?.attributes.name }}</h1>
  </div>
</template>

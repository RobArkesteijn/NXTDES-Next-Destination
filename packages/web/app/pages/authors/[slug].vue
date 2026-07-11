<script setup lang="ts">
import type { AuthorAttributes } from '@/types/Author'
import { strings } from '@/constants/strings'

const route = useRoute()
const { fullPath, params } = route
const { slug } = params

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
    statusMessage: strings.error.notFound.statusMessage,
    message: strings.error.notFound.message,
  })
}

useSchemaOrg({
  '@type': 'ItemList',
})
</script>

<template>
  <div>
    <h1>{{ data?.data[0]?.attributes.name }}</h1>
  </div>
</template>

<template>
  <!-- @TODO: Check why description comes with an array instead of string -->
  <BlogsHeader
    v-if="content"
    :data="content"
  />
</template>

<script setup lang="ts">
import type { Strapi4ResponseMany } from '@nuxtjs/strapi'
import type { BlogsAttributes } from '@/types/Blogs'

const route = useRoute()
const { fullPath } = route
const { slug } = route.params

const { data } = await useAsyncData(fullPath, async () => {
  const { find } = useStrapi()

  const response = await find<BlogsAttributes>('blogs', {
    populate: {
      author: {
        populate: '*',
      },
      hero_image: {
        populate: '*',
      },
    },
    filters: { title: { $eqi: (slug as string).split('-').join(' ') } },
  })
  return response
})

const content = computed(
  () => (data.value as Strapi4ResponseMany<BlogsAttributes>).data[0]?.attributes,
)
</script>

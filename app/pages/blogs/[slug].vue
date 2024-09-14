<script setup lang="ts">
import type { Strapi4ResponseMany } from '@nuxtjs/strapi'
import type { BlogsAttributes } from '@/types/Blogs'

const route = useRoute()
const { fullPath } = route
const { slug } = route.params
const { t } = useI18n()

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

if (!content.value) {
  throw createError({
    statusCode: 404,
    statusMessage: t('error.404.statusMessage'),
    message: t('error.404.message'),
  })
}

useSchemaOrg([
  defineArticle({
    '@type': 'BlogPosting',
    'image': content.value?.hero_image?.data.attributes.url,
    'datePublished': content.value?.publishedAt,
    'dateModified': content.value?.updatedAt,
    'author': [
      {
        name: content.value?.author?.data.attributes.name,
      },
    ],
  }),
])

defineOgImageComponent('ContentPage', {
  imageUrl: content.value?.hero_image?.data.attributes.url,
  title: 'Blog Post',
  description: content.value?.title,
})
</script>

<template>
  <!-- @TODO: Check why description comes with an array instead of string -->
  <BlogsHeader
    v-if="content"
    :data="content"
  />
</template>

<template>
  <div>
    <HomeHero
      v-if="heroImage"
      :hero-image="heroImage"
    />
    <HomeIntro
      v-if="introTitle || introDescription"
      :intro-title="introTitle"
      :intro-description="introDescription"
    />
    <HomeHighlightedSelection
      v-if="contentData.data.attributes.Highlighted"
      :highlighted-headline="highlightedHeadline"
      :highlighted-title="highlightedTitle"
      :highlighted-description="highlightedDescription"
      :highlighted-countries="highlightedCountries"
    />
  </div>
</template>

<script setup lang="ts">
import type { Strapi4ResponseSingle } from '@nuxtjs/strapi'
import type { HomeAttributes } from '@/types/Home'

definePageMeta({
  breadcrumb: {
    icon: 'i-material-symbols-home-rounded',
  },
})

const route = useRoute()
const { fullPath } = route
const { t } = useI18n()

useHead({
  title: t('home.meta_title'),
})

const { data } = await useAsyncData(fullPath, async () => {
  const { findOne } = useStrapi()
  const response = await findOne<HomeAttributes>('home', {
    populate: {
      hero_image: {
        populate: '*',
      },
      Highlighted: {
        populate: {
          countries: {
            populate: '*',
          },
        },
      },
    },
  })
  return response
})

const contentData = computed(() => data.value as Strapi4ResponseSingle<HomeAttributes>)
const heroImage = computed(() => contentData.value?.data.attributes.hero_image)
const introTitle = computed(() => contentData.value?.data.attributes.title)
const introDescription = computed(() => contentData.value?.data.attributes?.intro)
const highlightedHeadline = computed(() => contentData.value?.data.attributes.Highlighted.headline)
const highlightedTitle = computed(() => contentData.value?.data.attributes.Highlighted.title)
const highlightedDescription = computed(
  () => contentData.value?.data.attributes.Highlighted.description,
)
const highlightedCountries = computed(
  () => contentData.value?.data.attributes.Highlighted.countries,
)
</script>

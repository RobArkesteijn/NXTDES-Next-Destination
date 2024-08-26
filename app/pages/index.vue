<template>
  <div>
    <SectionDivider :side="['bottom']">
      <HomeHero
        v-if="heroImage"
        :hero-image="heroImage"
      />
    </SectionDivider>
    <HomeIntro
      v-if="introTitle || introDescription"
      :intro-title="introTitle"
      :intro-description="introDescription"
    />
    <SectionDivider>
      <HomeHighlightedSelection
        v-if="contentData.data.attributes.Highlighted"
        :highlighted-headline="highlightedHeadline"
        :highlighted-title="highlightedTitle"
        :highlighted-description="highlightedDescription"
        :highlighted-countries="highlightedCountries"
      />
    </SectionDivider>
  </div>
</template>

<script setup lang="ts">
import type { Strapi4ResponseSingle } from '@nuxtjs/strapi'
import type { HomeAttributes } from '@/types/Home'

const route = useRoute()
const { fullPath } = route
const { t } = useI18n()

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

if (!data.value) {
  throw createError({
    statusCode: 500,
    statusMessage: t('error.500.statusMessage'),
    message: t('error.500.message'),
  })
}

defineOgImageComponent('ContentPage', {
  title: 'NXTDES',
})

definePageMeta({
  breadcrumb: {
    icon: 'i-material-symbols-home-rounded',
  },
})

useSeoMeta({
  title: t('home.meta_title'),
})
</script>

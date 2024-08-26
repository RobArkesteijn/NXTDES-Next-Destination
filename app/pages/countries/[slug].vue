<template>
  <div v-if="content">
    <SectionDivider :side="['bottom']">
      <CountryHero
        :content="content"
      />
    </SectionDivider>
    <CountryWeather />
    <SectionDivider :side="['bottom', 'top']">
      <CurrencyCalculator :currency="content.currency ?? 'EUR'" />
    </SectionDivider>
    <CountryAttractions
      v-if="content.attractions?.length"
      :attractions="content.attractions"
    />
  </div>
</template>

<script setup lang="ts">
import type { Strapi4ResponseMany } from '@nuxtjs/strapi'
import type { CountriesAttributes } from '@/types/Countries'

defineI18nRoute({
  paths: {
    dk: '/lande/[slug]',
    de: '/lander/[slug]',
    uk: '/countries/[slug]',
    es: '/paises/[slug]',
    fr: '/pays/[slug]',
    no: '/land/[slug]',
    nl: '/landen/[slug]',
    pt: '/paises/[slug]',
    se: '/lander/[slug]',
  },
})

const route = useRoute()
const { fullPath } = route
const { slug } = route.params
const { t } = useI18n()

const { data } = await useAsyncData(fullPath, async () => {
  const { find } = useStrapi()
  const response = await find<CountriesAttributes>('countries', {
    populate: {
      attractions: {
        populate: '*',
      },
      hero_image: {
        populate: '*',
      },
      flag_image: {
        populate: '*',
      },
    },
    filters: { country: { $eqi: slug } },
  })
  return response
})

const content = computed(
  () => (data.value as Strapi4ResponseMany<CountriesAttributes>)?.data[0]?.attributes,
)

if (!content.value) {
  throw createError({
    statusCode: 404,
    statusMessage: t('error.404.statusMessage'),
    message: t('error.404.message'),
  })
}

defineOgImageComponent('ContentPage', {
  imageUrl: content.value.hero_image?.data.attributes.url,
  icon: `i-twemoji-flag-${content.value?.country?.toLowerCase()}`,
  description: content.value.title,
})
</script>

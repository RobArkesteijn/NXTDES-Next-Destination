<template>
  <div v-if="content">
    <CountryHero
      :content="content"
    />
    <CountryWeather />
    <CurrencyCalculator :currency="content.currency ?? 'EUR'" />
    <CountryAttractions
      v-if="content.attractions?.length"
      :attractions="content.attractions"
    />
  </div>
</template>

<script setup lang="ts">
import type { Strapi4ResponseMany } from '@nuxtjs/strapi'
import type { CountriesAttributes } from '@/types/Countries'

const route = useRoute()
const { fullPath } = route
const { slug } = route.params

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
</script>

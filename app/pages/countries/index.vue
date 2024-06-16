<template>
  <CountryGridDisplay :data="alphabeticalContent" />
</template>

<script setup lang="ts">
import type { Strapi4ResponseMany } from '@nuxtjs/strapi'
import type { CountriesAttributes } from '@/types/Countries'

const route = useRoute()
const { fullPath } = route

const { data } = await useAsyncData(fullPath, async () => {
  const { find } = useStrapi()
  const response = await find<CountriesAttributes>('countries', {
    populate: '*',
  })
  return response
})

const content = computed(() => (data.value as Strapi4ResponseMany<CountriesAttributes>)?.data)

const alphabeticalContent = computed(() => {
  const contentArray = content.value || []

  const sortedContent = contentArray.slice().sort((a, b) => {
    const countryA = (a.attributes && a.attributes.country) || ''
    const countryB = (b.attributes && b.attributes.country) || ''

    return countryA.localeCompare(countryB)
  })

  return sortedContent
})
</script>

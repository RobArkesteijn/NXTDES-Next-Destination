<script setup lang="ts">
import type { Strapi4ResponseMany } from '@nuxtjs/strapi'
import type { CountriesAttributes } from '@/types/Countries'
import { strings } from '@/constants/strings'

const route = useRoute()
const { fullPath } = route
const site = useSiteConfig()

const { data } = await useAsyncData(fullPath, async () => {
  const { find } = useStrapi()
  const response = await find<CountriesAttributes>('countries', {
    populate: '*',
    pagination: {
      start: 0,
      limit: 100,
    },
  })
  return response
})

if (!data.value) {
  throw createError({
    statusCode: 500,
    statusMessage: strings.error.serverError.statusMessage,
    message: strings.error.serverError.message,
  })
}

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

definePageMeta({
  breadcrumb: {
    icon: 'i-material-symbols-globe',
  },
})

defineOgImageComponent('ContentPage')

const listItemSchemas = alphabeticalContent.value.map((country, index) => {
  return {
    '@type': 'ListItem',
    'position': index + 1,
    'name': country.attributes.country,
    'url': `${site.url}/countries/${country.attributes.country?.toLowerCase()}`,
  }
})

useSchemaOrg({
  '@type': 'ItemList',
  'itemListElement': listItemSchemas,
  'numberOfItems': content.value.length,
})
</script>

<template>
  <CountryGridDisplay :data="alphabeticalContent" />
</template>

<script setup lang="ts">
import type { Strapi4ResponseMany } from '@nuxtjs/strapi'
import type { CountriesAttributes } from '@/types/Countries'

defineI18nRoute({
  paths: {
    uk: '/countries',
    nl: '/landen',
  },
})

const route = useRoute()
const { fullPath } = route
const { t } = useI18n()

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

if (!data.value) {
  throw createError({
    statusCode: 500,
    statusMessage: t('error.500.statusMessage'),
    message: t('error.500.message'),
  })
}

definePageMeta({
  breadcrumb: {
    icon: 'i-material-symbols-globe',
  },
})

defineOgImageComponent('ContentPage')
</script>

<template>
  <CountryGridDisplay :data="alphabeticalContent" />
</template>

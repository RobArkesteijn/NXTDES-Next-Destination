<script lang="ts" setup>
import type { Strapi4ResponseMany } from '@nuxtjs/strapi'
import type CountriesNavigationAttributes from '@/types/Navigation'
import { strings } from '@/constants/strings'

const route = useRoute()

const { data: countriesData } = await useAsyncData('navigation', async () => {
  const { find } = useStrapi()
  const response = await find<CountriesNavigationAttributes>('countries', {
    pagination: {
      start: 0,
      limit: 100,
    },
    fields: ['country', 'continent'],
  })
  return response
})

const countriesChildren = (countriesData.value as Strapi4ResponseMany<CountriesNavigationAttributes>).data.map((country) => {
  const countryName = country.attributes.country ?? ''

  return {
    label: countryName,
    to: `/countries/${countryName.toLowerCase()}`,
    icon: `i-twemoji-flag-${countryName.toLowerCase()}`,
  }
}).sort((a, b) => a.label.localeCompare(b.label))

const links = computed(() => [
  {
    label: strings.nav.authors,
    icon: 'i-material-symbols-article',
    to: '/authors',
    active: route.path.startsWith('/authors'),
  },
  {
    label: strings.nav.blogs,
    icon: 'i-material-symbols-article',
    to: '/blogs',
    active: route.path.startsWith('/blogs'),
  },
  {
    label: strings.nav.contact,
    icon: 'i-material-symbols-article',
    to: '/contact',
    active: route.path.startsWith('/contact'),
  },
  {
    label: strings.nav.countries,
    icon: 'i-material-symbols-globe',
    to: '/countries',
    active: route.path.startsWith('/countries'),
    children: countriesChildren,
  },
  {
    label: strings.nav.interactiveMap,
    icon: 'i-material-symbols-map',
    to: '/interactive-map',
    active: route.path.startsWith('/interactive-map'),
  },
])
</script>

<template>
  <UHeader
    class="header"
    to="/"
  >
    <template #logo>
      <SvgoLogo
        class="header__logo logo"
      />
    </template>

    <template #right>
      <UHeaderLinks :links="links" />
      <div class="header__toggles">
        <ClientOnly>
          <UColorModeToggle
            size="xl"
            :ui="{
              active: 'dark:bg-boston-blue-400',
              inactive: 'bg-shark-300',
              container: {
                base: 'bg-copper-50 dark:bg-shark-700',
              },
              icon: {
                on: 'dark:text-copper-50',
                off: 'text-boston-blue-400',
              },
            }"
          />
        </ClientOnly>
      </div>
    </template>

    <template #panel>
      <UNavigationTree
        :links="links"
        :level="0"
        default-open
      />
      <div class="header__sidemenu-background" />
    </template>
  </UHeader>
</template>

<style scoped lang="postcss">
.header {
  &__logo {
    width: auto;
    height: 3.5rem;
  }

  &__sidemenu-background {
    flex-grow: 1;

    @apply bg-boston-blue-400/30 backdrop-blur
  }

  &__toggles {
    display: flex;
    gap: .5rem;
  }
}
</style>

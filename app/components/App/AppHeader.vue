<template>
  <UHeader
    class="header"
    :to="localePath('/')"
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
        <LanguageSwitcher />
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

<script lang="ts" setup>
import type { Strapi4ResponseMany } from '@nuxtjs/strapi'
import type CountriesNavigationAttributes from '@/types/Navigation'

const localePath = useLocalePath()
const route = useRoute()
const i18n = useI18n()
const { t } = useI18n()

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

const currentLocale = i18n.locale.value

const countriesChildren = (countriesData.value as Strapi4ResponseMany<CountriesNavigationAttributes>).data.map((country) => {
  const countryName = country.attributes.country ?? ''

  return {
    label: countryName,
    to: `/${currentLocale}/${t('countries.url')}/${countryName.toLowerCase()}`,
    icon: `i-twemoji-flag-${countryName.toLowerCase()}`,
  }
}).sort((a, b) => a.label.localeCompare(b.label))

const links = computed(() => [
  {
    label: t('authors.title'),
    icon: 'i-material-symbols-article',
    to: `/${currentLocale}/${t('authors.url')}`,
    active: route.path.startsWith(`/${t('authors.url')}`),
  },
  {
    label: t('blogs.title'),
    icon: 'i-material-symbols-article',
    to: `/${currentLocale}/${t('blogs.url')}`,
    active: route.path.startsWith(`/${t('blogs.url')}`),
  },
  {
    label: t('countries.title'),
    icon: 'i-material-symbols-globe',
    to: `/${currentLocale}/${t('countries.url')}`,
    active: route.path.startsWith(`/${t('countries.url')}`),
    children: countriesChildren,
  },
  {
    label: t('interactive_map.title'),
    icon: 'i-material-symbols-map',
    to: `/${currentLocale}/${t('interactive_map.url')}`,
    active: route.path.startsWith(`/${t('interactive_map.url')}`),
  },
])
</script>

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

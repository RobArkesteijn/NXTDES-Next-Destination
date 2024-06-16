<template>
  <UHeader
    :links="links"
    class="header"
  >
    <template #logo>
      <SvgoLogo class="header__logo logo" />
    </template>

    <template #right>
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
    </template>

    <template #panel>
      <UNavigationTree :links="links" />
      <div class="header__sidemenu-background" />
    </template>
  </UHeader>
</template>

<script lang="ts" setup>
const route = useRoute()

const BLOG_PATH = '/blogs'
const BOOKINGS_PATH = '/bookings'
const COUNTRIES_PATH = '/countries'
const FLIGHT_INFO_PATH = '/flight-info'
const INTERACTIVE_MAP_PATH = '/interactive-map'

const links = computed(() => [
  {
    label: 'Blogs',
    icon: 'i-material-symbols-article',
    to: BLOG_PATH,
    active: route.path.startsWith(BLOG_PATH),
  },
  {
    label: 'Bookings',
    icon: 'i-material-symbols-hotel',
    to: BOOKINGS_PATH,
    active: route.path.startsWith(BOOKINGS_PATH),
  },
  {
    label: 'Countries',
    icon: 'i-material-symbols-globe',
    to: COUNTRIES_PATH,
    active: route.path.startsWith(COUNTRIES_PATH),
  },
  {
    label: 'Flight Info',
    icon: 'i-material-symbols-info-outline',
    to: FLIGHT_INFO_PATH,
    active: route.path.startsWith(FLIGHT_INFO_PATH),
  },
  {
    label: 'Interactive Map',
    icon: 'i-material-symbols-map',
    to: INTERACTIVE_MAP_PATH,
    active: route.path.startsWith(INTERACTIVE_MAP_PATH),
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
}
</style>

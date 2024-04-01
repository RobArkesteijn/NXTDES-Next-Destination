<template>
  <UHeader :links="links">
    <template #logo>
      <SvgoLogo class="w-auto h-14 logo" />
    </template>

    <template #right>
      <ClientOnly>
        <UColorModeToggle size="lg" />
      </ClientOnly>
    </template>

    <template #panel>
      <UNavigationTree :links="links" />
    </template>
  </UHeader>
</template>

<script lang="ts" setup>
const links = computed(() => [
  {
    label: 'Blogs',
    icon: 'i-material-symbols-article',
    to: '/blogs',
  },
  {
    label: 'Bookings',
    icon: 'i-material-symbols-hotel',
    to: '/bookings',
  },
  {
    label: 'Countries',
    icon: 'i-material-symbols-globe',
    to: '/countries',
  },
  {
    label: 'Flight Info',
    icon: 'i-material-symbols-info-outline',
    to: '/flight-info',
  },
  {
    label: 'Interactive Map',
    icon: 'i-material-symbols-map',
    to: '/interactive-map',
  },
  {
    label: 'Upc. Destinations',
    icon: 'i-material-symbols-event-upcoming',
    to: '/upc-destination',
  },
]);
</script>

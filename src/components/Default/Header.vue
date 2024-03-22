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
const route = useRoute();
const { fullPath } = route;

const { data } = await useAsyncData(fullPath, async () => {
  const { find } = useStrapi();
  try {
    const countries = await find('countries', {
      fields: ['country', 'icon', 'continent'],
    });
    const upcDestinations = await find('upc-destinations', {
      fields: ['destination', 'icon', 'continent'],
    });
    return {
      countries,
      upcDestinations,
    };
  } catch (e) {
    return showError('Unknown error');
  }
});

const countries = computed(() => data.value?.countries?.data);
const countriesLinksChildren: ComputedRef<any[]> = computed(() =>
  countries.value?.map((country: any) => ({
    label: country?.attributes?.country,
    icon: country?.attributes?.icon,
    to: `/countries/${country?.attributes?.country?.toLowerCase()}`,
    description: 'Europe',
  })),
);

const upcDestinations = computed(() => data.value?.upcDestinations?.data);
const upcDestinationsLinksChildren: ComputedRef<any[]> = computed(() =>
  upcDestinations.value?.map((destination: any) => ({
    label: destination?.attributes?.destination,
    icon: destination?.attributes?.icon,
    to: `/upc-destination/${destination?.attributes?.destination?.toLowerCase()}`,
    description: 'Europe',
  })),
);

const links = computed(() => [
  {
    label: 'Blogs',
    icon: 'i-material-symbols-article',
    to: '/blogs/some-blog',
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
    children: countriesLinksChildren.value,
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
    children: upcDestinationsLinksChildren.value,
  },
]);
</script>

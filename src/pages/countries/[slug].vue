<template>
  <CountryHero :content="content" />
  <CountryWeather />
  <CurrencyCalculator :currency="content.currency ?? 'EUR'" />
  <CountryAttractions v-if="content.attractions?.length" :attractions="content.attractions" />
</template>

<script setup lang="ts">
import type { CountriesAttributes } from '@/types/Countries';
import type { Strapi4ResponseMany } from '@nuxtjs/strapi';

const route = useRoute();
const { fullPath } = route;
const { slug } = route.params;

const { data } = await useAsyncData(fullPath, async () => {
  const { find } = useStrapi();
  try {
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
    });
    return response;
  } catch (e) {
    return showError('Unknown error');
  }
});

const content = computed(
  () => (data.value as Strapi4ResponseMany<CountriesAttributes>)?.data[0].attributes,
);
</script>

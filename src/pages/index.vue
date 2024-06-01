<template>
  <HomeHero :hero-image="heroImage" />
  <HomeIntro :intro-title="introTitle" :intro-description="introDescription" />
  <HomeHighlightedSelection
    :highlighted-headline="highlightedHeadline"
    :highlighted-title="highlightedTitle"
    :highlighted-description="highlightedDescription"
    :highlighted-countries="highlightedCountries"
  />
</template>

<script setup lang="ts">
import type { Strapi4ResponseSingle } from '@nuxtjs/strapi';
import type { HomeAttributes } from '@/types/Home';

const route = useRoute();
const { fullPath } = route;

const { data } = await useAsyncData(fullPath, async () => {
  const { findOne } = useStrapi();
  try {
    const response = await findOne<HomeAttributes>('home', {
      populate: {
        hero_image: {
          populate: '*',
        },
        Highlighted: {
          populate: {
            countries: {
              populate: '*',
            },
          },
        },
      },
    });
    return response;
  } catch (e: any) {
    return showError(e);
  }
});

const contentData = computed(() => data.value as Strapi4ResponseSingle<HomeAttributes>);
const heroImage = computed(() => contentData.value?.data.attributes.hero_image);
const introTitle = computed(() => contentData.value?.data.attributes.title);
const introDescription = computed(() => contentData.value?.data.attributes?.intro);
const highlightedHeadline = computed(() => contentData.value?.data.attributes.Highlighted.headline);
const highlightedTitle = computed(() => contentData.value?.data.attributes.Highlighted.title);
const highlightedDescription = computed(
  () => contentData.value?.data.attributes.Highlighted.description,
);
const highlightedCountries = computed(
  () => contentData.value?.data.attributes.Highlighted.countries,
);
</script>

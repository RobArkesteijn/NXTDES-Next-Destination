<template>
  <HomeHero :hero-image="heroImage" />
  <HomeIntro :intro-title="introTitle" :intro-description="introDescription" />
  <HomeHighlightedSelection
    :highlighted-headline="highlightedHeadline"
    :highlighted-title="highlightedTitle"
    :highlighted-description="highlightedDescription"
    :highlighted-countries="highlightedCountries"
  />
  <!-- <HomeObscureDestination /> -->
</template>

<script setup lang="ts">
const route = useRoute();
const { fullPath } = route;

const { data } = await useAsyncData(fullPath, async () => {
  const { find } = useStrapi();
  try {
    const contentData = await find('home', {
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
    return {
      content: contentData,
    };
  } catch (e) {
    return showError('Unknown error');
  }
});

const content = computed(() => data.value?.content);
const heroImage = computed(() => content.value?.data?.attributes?.hero_image);
const introTitle = computed(() => content.value?.data?.attributes?.title);
const introDescription = computed(() => content.value?.data?.attributes?.intro);
const highlightedHeadline = computed(() => content.value?.data?.attributes?.Highlighted?.headline);
const highlightedTitle = computed(() => content.value?.data?.attributes?.Highlighted?.title);
const highlightedDescription = computed(
  () => content.value?.data?.attributes?.Highlighted?.description,
);
const highlightedCountries = computed(
  () => content.value?.data?.attributes?.Highlighted?.countries,
);
</script>

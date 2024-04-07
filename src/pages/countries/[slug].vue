<template>
  <CountryHero :content="content" />
  <CountryAttractions :attractions="content.attractions" />
</template>

<script setup lang="ts">
const route = useRoute();
const { fullPath } = route;
const { slug } = route.params;

const { data } = await useAsyncData(fullPath, async () => {
  const { find } = useStrapi();
  try {
    const response = await find('countries', {
      populate: {
        attractions: {
          populate: '*',
        },
        hero_image: {
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

const content = computed(() => data.value?.data[0]?.attributes);
</script>

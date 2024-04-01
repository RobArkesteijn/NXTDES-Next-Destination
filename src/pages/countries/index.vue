<template>
  <CountryGridDisplay :data="alphabeticalContent" />
</template>

<script setup lang="ts">
const route = useRoute();
const { fullPath } = route;

const { data } = await useAsyncData(fullPath, async () => {
  const { find } = useStrapi();
  try {
    const response = await find('countries', {
      populate: '*',
    });
    return response;
  } catch (e) {
    return showError('Unknown error');
  }
});

const content = computed(() => data.value?.data);

const alphabeticalContent = computed(() => {
  const contentArray: any = content.value || [];

  const sortedContent = contentArray.slice().sort((a: any, b: any) => {
    const countryA = (a.attributes && a.attributes.country) || '';
    const countryB = (b.attributes && b.attributes.country) || '';

    return countryA.localeCompare(countryB);
  });

  return sortedContent;
});
</script>

<style scoped></style>

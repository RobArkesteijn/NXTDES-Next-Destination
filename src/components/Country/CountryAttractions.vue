<template>
  <div class="country-attractions">
    <h2 class="country-attractions__title">Top Attractions of {{ slug }}</h2>
    <ULandingSection
      v-for="(attraction, index) in attractions"
      :title="attraction.attraction"
      :description="attraction.description"
      :align="index % 2 === 0 ? 'left' : 'right'"
      :links="buttonLink(index)"
      class="country-attractions__attraction"
      :ui="{
        wrapper: 'py-8 sm:py-12 ',
        container: 'gap-8 sm:gap-y-8 lg:gap-16',
      }"
    >
      <NuxtImg
        v-if="attraction.image.data[0]"
        :src="attraction.image.data[0].attributes.url"
        :alt="attraction.image.data[0].attributes.alternativeText"
        class="w-full rounded-md shadow-xl ring-1 ring-gray-300 dark:ring-gray-700"
      />
    </ULandingSection>
  </div>
</template>

<script setup lang="ts">
const route = useRoute();
const { slug } = route.params;

const props = defineProps({
  attractions: {
    type: Array as PropType<any[]>,
    default: () => [],
  },
});

const buttonLink = (index: number): any[] => [
  {
    label: 'Explore Attraction',
    to: `/countries/${slug}/${props.attractions[index].attraction.toLowerCase()}`,
    color: 'primary',
    'trailing-icon': 'i-heroicons-arrow-right',
    size: 'lg',
  },
];
</script>

<style scoped lang="postcss">
.country-attractions {
  @apply bg-boston-blue-100 dark:bg-boston-blue-900 shapedivider shapedivider--top;

  &__title {
    @apply text-2xl sm:text-4xl lg:text-5xl text-shark-900 dark:text-white font-bold text-center pb-8 sm:pb-12 pt-16 sm:pt-24 px-4 sm:px-6 lg:px-8;
  }
}
</style>

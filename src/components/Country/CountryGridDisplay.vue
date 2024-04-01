<template>
  <div class="country-grid-display">
    <NuxtLink
      v-for="item in data"
      class="country-grid-display__item"
      :style="backgroundStyles(item.attributes?.hero_image?.data?.attributes?.url)"
      :to="`/countries/${item.attributes?.country.toLowerCase()}`"
    >
      <div class="country-grid-display__cta">
        <h2 class="country-grid-display__title">{{ item.attributes?.country }}</h2>
        <UIcon name="i-mdi-arrow-right-circle" class="country-grid-display__icon" />
      </div>
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
defineProps({
  data: {
    type: Object as PropType<any>,
    required: true,
  },
});

const img = useImage();
const backgroundStyles = (url: string) => {
  const imgUrl = img(url);
  return { backgroundImage: `url('${imgUrl}')`, backgroundSize: 'cover' };
};
</script>

<style scoped lang="postcss">
.country-grid-display {
  @apply grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 min-h-[200vh] md:min-h-[150vh] lg:min-h-screen overflow-hidden;

  &__item {
    @apply w-full h-full flex items-end relative shadow;

    &::before {
      @apply absolute inset-0 w-full h-full transition-opacity bg-boston-blue-400 dark:bg-boston-blue-800;
      z-index: 1;
      content: '';
      opacity: 0.2;
    }

    &:hover {
      &::before {
        @apply lg:opacity-0;
      }
    }
  }

  &__cta {
    @apply w-full flex justify-between items-stretch text-shark-50 dark:text-shark-50 text-5xl p-4 drop-shadow-lg;
  }
}
</style>

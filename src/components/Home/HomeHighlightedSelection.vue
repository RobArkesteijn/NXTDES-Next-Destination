<template>
  <ULandingSection
    :headline="highlightedHeadline ?? undefined"
    :title="highlightedTitle ?? undefined"
    :description="highlightedDescription ?? undefined"
    :links="buttonLinks"
    align="left"
    class="home-highlighted-section"
    :ui="{
      wrapper: 'bg-boston-blue-100 dark:bg-boston-blue-900 shapedivider shapedivider--top',
    }"
  >
    <div class="flex flex-col gap-6">
      <NuxtLink
        v-for="item in highlightedCountries"
        :to="`/countries/${item.country?.toLowerCase()}`"
        class="home-highlighted-section__image-wrapper"
      >
        <NuxtImg
          :src="item.image?.data.attributes.url"
          :alt="item.image ? (item.image.data.attributes.alternativeText as string) : undefined"
          class="home-highlighted-section__image"
        />
        <span class="home-highlighted-section__image-card-content">
          <h3 class="home-highlighted-section__image-card-text">{{ item.country }}</h3>
          <UIcon
            name="i-mdi-arrow-right-circle"
            class="home-highlighted-section__image-card-text"
          />
        </span>
      </NuxtLink>
    </div>
  </ULandingSection>
</template>

<script setup lang="ts">
import type { Country } from '@/types/Home';

defineProps({
  highlightedHeadline: {
    type: String as PropType<string | null>,
    default: '',
  },
  highlightedTitle: {
    type: String as PropType<string | null>,
    default: '',
  },
  highlightedDescription: {
    type: String as PropType<string | null>,
    default: '',
  },
  highlightedCountries: {
    type: Array as PropType<Country[]>,
    default: () => [],
  },
});

const buttonLinks: any[] = [
  {
    label: 'Explore Destinations',
    to: '/countries',
    color: 'boston-blue',
    'trailing-icon': 'i-heroicons-arrow-right',
    size: 'lg',
  },
];
</script>

<style scoped lang="postcss">
.home-highlighted-section {
  position: relative;

  &__image-wrapper {
    @apply w-full h-[300px] rounded-md shadow-xl ring-1 ring-gray-300 dark:ring-gray-700 overflow-hidden relative;
  }

  &__image {
    @apply w-full h-full object-cover transition-transform hover:scale-105;
  }

  &__image-card-content {
    @apply w-full p-4 absolute bottom-0 left-0 flex justify-between pointer-events-none;
  }

  &__image-card-text {
    @apply text-gray-50 drop-shadow text-3xl;
  }

  &__decorative-image {
    @apply absolute  bottom-0 left-0 w-[180px] sm:w-[250px] md:w-[300px] lg:w-[350px] xl:w-[400px] h-auto z-10;
  }
}
</style>

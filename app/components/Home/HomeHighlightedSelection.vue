<template>
  <ULandingSection
    :headline="highlightedHeadline ?? undefined"
    :title="highlightedTitle ?? undefined"
    :description="highlightedDescription ?? undefined"
    :links="[
      {
        label: 'Explore Destinations',
        to: '/countries',
        color: 'boston-blue',
        trailingIcon: 'i-heroicons-arrow-right',
        size: 'lg',
      },
    ]"
    align="left"
    class="home-highlighted-section"
    :ui="{
      wrapper: 'bg-copper-100 dark:bg-boston-blue-900 shapedivider shapedivider--top',
    }"
  >
    <div class="flex flex-col gap-6">
      <NuxtLink
        v-for="item in highlightedCountries"
        :key="`highlightedCountry-${item.id}`"
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
import type { Country } from '@/types/Home'

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
})
</script>

<style scoped lang="postcss">
.home-highlighted-section {
  position: relative;

  &__image-wrapper {
    width: 100%;
    height: 300px;
    border-radius: 0.375rem;
    overflow: hidden;
    position: relative;

    @apply shadow-xl ring-1 ring-gray-300 dark:ring-gray-700;
  }

  &__image {
    width: 100%;
    height: 100%;
    object-fit: cover;

    @apply transition-transform hover:scale-105;
  }

  &__image-card-content {
    width: 100%;
    padding: 1rem;
    position: absolute;
    bottom: 0;
    left: 0;
    display: flex;
    justify-content: space-between;
    pointer-events: none
  }

  &__image-card-text {
    @apply text-gray-50 drop-shadow text-3xl;
  }

  &__decorative-image {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 180px;
    height: auto;
    z-index: 10;

    @media screen(sm) {
      width: 250px;
    }

    @media screen(md) {
      width: 300px;
    }

    @media screen(lg) {
      width: 350px;
    }

    @media screen(xl) {
      width: 400px;
    }
  }
}
</style>

<template>
  <div class="country-hero">
    <div
      class="w-full lg:w-[45%] lg:mt-auto p-4 sm:p-6 lg:p-8 flex flex-col gap-2 md:gap-4 lg:gap-6"
    >
      <span class="country-hero__toponym-wrapper">
        <UIcon
          :name="heroIcon"
          dynamic
          class="country-hero__toponym-icon"
        />
        <h1 class="country-hero__toponym">{{ heroCountry }} ({{ heroCountryNative }})</h1>
      </span>
      <h2
        v-if="heroTitle"
        class="country-hero__title"
      >
        {{ heroTitle }}
      </h2>
      <p
        v-if="heroDescription"
        class="country-hero__description"
      >
        {{ heroDescription }}
      </p>
    </div>
    <div class="country-hero__image-wrapper shapedivider shapedivider--bottom lg:shapedivider--left">
      <NuxtImg
        v-if="heroImageURL"
        :src="heroImageURL"
        :alt="heroImageALT"
        class="country-hero__image"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { CountriesAttributes } from '@/types/Countries'

const props = defineProps({
  content: {
    type: Object as PropType<CountriesAttributes>,
    required: true,
  },
})

const heroTitle = computed(() => props.content.title)
const heroCountry = computed(() => props.content.country)
const heroDescription = computed(() => props.content.description)
const heroIcon = computed(() => `i-twemoji-flag-${heroCountry.value?.toLowerCase()}`)
const heroCountryNative = computed(() => props.content.country_native)
const heroImageURL = computed(() => props.content.hero_image?.data.attributes.url)
const heroImageALT = computed(
  () => props.content.hero_image?.data.attributes.alternativeText ?? undefined,
)
</script>

<style lang="postcss" scoped>
.country-hero {
  display: flex;
  flex-direction: column-reverse;
  height: 100vh;

  @media screen(lg) {
    flex-direction: row;
  }

  &__toponym-wrapper {
    display: flex;
    gap: 0.5rem;
    padding-block: 0.5rem;
    align-items: stretch;
    justify-content: center;

    @apply text-2xl;

    @media screen(lg) {
      justify-content: flex-start;
    }
  }

  &__toponym {
    @apply text-gray-950 dark:text-gray-50;
  }

  &__title {
    font-weight: 700;

    @apply text-2xl text-gray-950 dark:text-gray-50;

    @media screen(sm) {
      @apply text-4xl;
    }

    @media screen(lg) {
      @apply text-6xl;
    }
  }

  &__description {
    @apply md:text-xl lg:text-2xl;
  }

  &__image-wrapper {
    height: 100%;
    width: 100%;

    @media screen(lg) {
      width: 55%;
    }
  }

  &__image {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}
</style>

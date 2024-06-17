<template>
  <div class="country-hero">
    <div class="country-hero__wrapper">
      <div
        class="country-hero__intro-container"
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
          class="country-hero__description country-hero__description--desktop"
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
    <p
      v-if="heroDescription"
      class="country-hero__description country-hero__description--mobile"
    >
      {{ heroDescription }}
    </p>
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
  &__wrapper {
    display: flex;
    flex-direction: column-reverse;
    height: 100dvh;

    @media screen(lg) {
      flex-direction: row;
      height: 100vh;
    }
  }

  &__intro-container {
    width: 100%;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;

    @media screen(sm) {
      padding: 1.5rem 1.5rem .5rem;
    }

    @media screen(md) {
      gap: 1rem;
    }

    @media screen(lg) {
      gap: 1.5rem;
      margin-top: auto;
      width: 45%;
      padding: 2rem;
    }
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
    text-align: center;
    font-weight: 700;

    @apply text-2xl text-gray-950 dark:text-gray-50;

    @media screen(sm) {
      @apply text-4xl;
    }

    @media screen(lg) {
      text-align: left;

      @apply text-6xl;
    }
  }

  &__description {
    @apply md:text-xl lg:text-2xl;

    &--desktop {
      display: none;

      @media screen(lg) {
        display: block;
      }
    }

    &--mobile {
      padding: 0 1rem 1rem;

      @media screen(sm) {
        padding: 0 1.5rem 1.5rem;
      }

      @media screen(lg) {
        display: none;
      }
    }
  }

  &__image-wrapper {
    flex-grow: 1;
    width: 100%;

    @media screen(lg) {
      width: 55%;
      height: 100%;
      flex-grow: 0;
    }
  }

  &__image {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}
</style>

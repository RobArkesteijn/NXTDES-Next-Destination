<script setup lang="ts">
import type { Attraction } from '@/types/Countries'

const route = useRoute()
const { slug } = route.params

defineProps({
  attractions: {
    type: Array as PropType<Attraction[]>,
    default: () => [],
  },
})
</script>

<template>
  <div class="country-attractions">
    <!-- @TODO: Potential side image via strapi?  -->
    <!-- <img src="/images/banana-leafs.webp" alt=""
      class="country-attractions__decorative-image" /> -->
    <h2 class="country-attractions__title">
      Top Attractions of {{ slug }}
    </h2>
    <ULandingSection
      v-for="(attraction, index) in attractions"
      :key="`attraction-${attraction.id}`"
      :title="attraction.attraction ?? undefined"
      :description="attraction.description ?? undefined"
      :align="index % 2 === 0 ? 'left' : 'right'"
      :links="[
        {
          label: 'Explore Attraction',
          to: `/${$i18n.locale}/${$t('countries.url')}/${slug}/${attractions[index]?.attraction?.toLowerCase().split(' ').join('-')}`,
          color: 'boston-blue',
          trailingIcon: 'i-heroicons-arrow-right',
          size: 'lg',
        },
      ]"
      class="country-attractions__attraction"
      :ui="{
        wrapper: 'py-8 sm:py-12 ',
        container: 'gap-8 sm:gap-y-8 lg:gap-16',
        title: 'dark:text-copper-50',
        description: 'dark:text-copper-50',
      }"
    >
      <NuxtImg
        v-if="attraction.image?.data"
        :src="attraction.image.data.attributes.url"
        :alt="attraction.image.data.attributes.alternativeText ?? ''"
        class="country-attractions__image"
      />
    </ULandingSection>
  </div>
</template>

<style scoped lang="postcss">
.country-attractions {
  position: relative;

  &__title {
    font-weight: bold;
    text-align: center;
    padding: 4rem 1rem 2rem;

    @apply text-2xl text-gray-900 dark:text-copper-50;

    @media screen(sm) {
      padding: 6rem 1.5rem 3rem;

      @apply text-4xl;
    }

    @media screen(lg) {
      padding-inline: 2rem;

      @apply text-5xl;
    }
  }

  &__decorative-image {
    position: absolute;
    inset: -20px;
    top: -120px;
    width: 180px;
    height: auto;
    z-index: 10;

    @media screen(sm) {
      inset: -40px;
      top: -160px;
      width: 250px;
    }

    @media screen(md) {
      top: -240px;
      width: 300px;
    }

    @media screen(lg) {
      width: 350px;
    }

    @media screen(xl) {
      width: 400px;
    }
  }

  &__image {
    width: 100%;
    height: 100%;
    min-height: 300px;
    object-fit: cover;
    border-radius: 0.375rem;

    @apply shadow-xl ring-1 ring-shark-300 dark:ring-gray-700;
  }
}
</style>

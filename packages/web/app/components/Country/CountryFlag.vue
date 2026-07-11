<script setup lang="ts">
import type { StrapiImage } from '@/types/Strapi'

defineProps({
  flagImage: {
    type: Object as PropType<StrapiImage>,
    required: true,
  },
})
</script>

<template>
  <div class="country-flag">
    <div class="country-flag__container">
      <NuxtImg
        class="country-flag__image"
        :src="flagImage.data.attributes.url"
        :alt="flagImage.data.attributes.alternativeText ?? ''"
      />
    </div>
  </div>
</template>

<style scoped lang="postcss">
.country-flag {
  height: 25vh;

  @media screen(lg) {
    height: 60vh;
  }

  &__container {
    position: relative;
    height: 100%;
    width: 100%;

    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-image: linear-gradient(to bottom, rgba(35, 41, 41, 0.75), rgba(35, 41, 41, 0) 50%);
    }
  }

  &__image {
    object-fit: fill;
    height: 100%;
    width: 100%;
  }
}
</style>

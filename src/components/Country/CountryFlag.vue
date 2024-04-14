<template>
  <div class="country-flag">
    <div class="country-flag__container">
      <NuxtImg class="country-flag__image" :src="flagImage.url" :alt="flagImage.alternativeText" />
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  flagImage: {
    type: Object,
    required: true,
  },
});
</script>

<style scoped lang="postcss">
.country-flag {
  @apply shapedivider shapedivider--bottom h-[25vh] lg:h-[40vh];

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
      background-image: linear-gradient(to bottom, rgba(35, 41, 41, 1), rgba(35, 41, 41, 0) 50%);
    }
  }

  &__image {
    @apply object-top object-cover h-full w-full;
  }
}
</style>

<template>
  <ULandingSection
    headline="Obscure Destination"
    title="Whitewashed cliffs and blue domes"
    description="Santorini, a Greek paradise in the Aegean Sea, enchants with its iconic whitewashed architecture, perched atop dramatic cliffs. Famous for breathtaking sunsets, crystal-clear waters, and vibrant local culture, it beckons travelers to explore its timeless charm and discover the allure of this idyllic island escape."
    :ui="{
      wrapper: 'shapedivider shapedivider--top shapedivider--top-blue',
    }"
  >
    <NuxtLink to="/countries/greence" class="image-wrapper">
      <NuxtImg src="/santorini.webp" alt="" class="image" />
      <span class="image-card-content">
        <h3 class="image-card-text">Greece</h3>
        <UIcon name="i-mdi-arrow-right-circle" class="image-card-text" />
      </span>
    </NuxtLink>
  </ULandingSection>
</template>

<style scoped lang="postcss">
.image-wrapper {
  @apply w-full h-[66vh] rounded-md shadow-xl ring-1 ring-shark-300 dark:ring-shark-700 overflow-hidden relative;
}

.image {
  @apply w-full h-full object-cover transition-transform hover:scale-105;
}

.image-card-content {
  @apply w-full p-4 absolute bottom-0 left-0 flex justify-between pointer-events-none;
}

.image-card-text {
  @apply text-shark-50 drop-shadow text-4xl;
}
</style>

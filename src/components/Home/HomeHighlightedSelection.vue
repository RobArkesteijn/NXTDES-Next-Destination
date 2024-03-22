<template>
  <ULandingSection
    headline="Higlighted"
    title="Broughten Your Horizon"
    description="Embrace the thrill of the unknown. Dive into vibrant cultures, savor exotic flavors, and create memories that linger long after you return. This is your invitation to step outside your comfort zone, uncover hidden gems, and immerse yourself in the rich tapestry of global wonders. With each new destination, you're not just traveling; you're unlocking a world of unforgettable experiences and stories waiting to be written."
    :links="buttonLinks"
    align="left"
    class=""
    :ui="{
      wrapper: 'bg-boston-blue-100 dark:bg-boston-blue-900 shapedivider-top',
    }"
  >
    <div class="flex flex-col gap-6">
      <NuxtLink to="/countries/vietnam" class="image-wrapper">
        <NuxtImg src="/ho_chi_minh_city.webp" alt="" class="image" />
        <span class="image-card-content">
          <h3 class="image-card-text">Vietnam</h3>
          <UIcon name="i-mdi-arrow-right-circle" class="image-card-text" />
        </span>
      </NuxtLink>
      <NuxtLink to="/countries/monaco" class="image-wrapper">
        <NuxtImg src="/monaco.webp" alt="" class="image" />
        <span class="image-card-content">
          <h3 class="image-card-text">Monaco</h3>
          <UIcon name="i-mdi-arrow-right-circle" class="image-card-text" />
        </span>
      </NuxtLink>
      <NuxtLink to="/countries/austria" class="image-wrapper">
        <NuxtImg src="/austria.webp" alt="" class="image" />
        <span class="image-card-content">
          <h3 class="image-card-text">Austria</h3>
          <UIcon name="i-mdi-arrow-right-circle" class="image-card-text" />
        </span>
      </NuxtLink>
    </div>
  </ULandingSection>
</template>

<script setup lang="ts">
const buttonLinks: any[] = [
  {
    label: 'Explore Destinations',
    to: '/countries',
    color: 'gray',
    'trailing-icon': 'i-heroicons-arrow-right',
    size: 'lg',
  },
];
</script>

<style scoped lang="postcss">
.image-wrapper {
  @apply w-full h-[300px] rounded-md shadow-xl ring-1 ring-shark-300 dark:ring-shark-700 overflow-hidden relative;
}

.image {
  @apply w-full h-full object-cover transition-transform hover:scale-105;
}

.image-card-content {
  @apply w-full p-4 absolute bottom-0 left-0 flex justify-between pointer-events-none;
}

.image-card-text {
  @apply text-shark-50 drop-shadow text-3xl;
}
</style>

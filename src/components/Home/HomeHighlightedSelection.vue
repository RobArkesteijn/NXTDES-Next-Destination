<template>
  <ULandingSection
    :headline="highlightedHeadline"
    :title="highlightedTitle"
    :description="highlightedDescription"
    :links="buttonLinks"
    align="left"
    :ui="{
      wrapper: 'bg-boston-blue-100 dark:bg-boston-blue-900 shapedivider shapedivider--top',
    }"
  >
    <div class="flex flex-col gap-6">
      <NuxtLink
        v-for="item in highlightedCountries"
        :to="`/countries/${item.country.toLowerCase()}`"
        class="image-wrapper"
      >
        <NuxtImg
          :src="item.image.data.attributes.url"
          :alt="item.image.data.attributes.alternativeText"
          class="image"
        />
        <span class="image-card-content">
          <h3 class="image-card-text">{{ item.country }}</h3>
          <UIcon name="i-mdi-arrow-right-circle" class="image-card-text" />
        </span>
      </NuxtLink>
    </div>
  </ULandingSection>
</template>

<script setup lang="ts">
defineProps({
  highlightedHeadline: {
    type: String as PropType<string>,
    default: 'Higlighted',
  },
  highlightedTitle: {
    type: String as PropType<string>,
    default: 'Broughten Your Horizon',
  },
  highlightedDescription: {
    type: String as PropType<string>,
    default: '',
  },
  highlightedCountries: {
    type: Array as PropType<any[]>,
    default: [],
  },
});

const buttonLinks: any[] = [
  {
    label: 'Explore Destinations',
    to: '/countries',
    color: 'primary',
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

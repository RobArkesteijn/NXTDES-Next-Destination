<template>
  <div class="country-grid-display">
    <NuxtLink
      v-for="item in data"
      class="country-grid-display__item"
      :style="backgroundStyles(item.attributes.hero_image?.data.attributes.url ?? undefined)"
      :to="`/countries/${item.attributes.country?.toLowerCase()}`"
    >
      <div class="country-grid-display__cta">
        <h2 class="country-grid-display__title">{{ item.attributes?.country }}</h2>
        <UIcon name="i-mdi-arrow-right-circle" class="country-grid-display__icon" />
      </div>
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
import type { CountriesAttributes } from '@/types/Countries';
import type { Strapi4ResponseData } from '@nuxtjs/strapi';

defineProps({
  data: {
    type: Object as PropType<Strapi4ResponseData<CountriesAttributes>[]>,
    required: true,
  },
});

const img = useImage();

const backgroundStyles = (url: string | undefined) => {
  if (!url) {
    return;
  }

  const imgUrl = img(url);
  // eslint-disable-next-line consistent-return
  return { backgroundImage: `url('${imgUrl}')`, backgroundSize: 'cover' };
};
</script>

<style scoped lang="postcss">
.country-grid-display {
  @apply grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 lg:min-h-screen overflow-hidden mt-[var(--header-height)] lg:mt-[unset];

  &__item {
    @apply w-full flex items-end relative shadow h-[calc(33.33vh-(var(--header-height)/3))] md:h-[calc(50vh-(var(--header-height)/2))] lg:h-[50vh];

    &::before {
      @apply absolute inset-0 w-full h-full transition-opacity bg-boston-blue-400 dark:bg-boston-blue-800;
      z-index: 1;
      content: '';
      opacity: 0.2;
    }

    &:hover {
      &::before {
        @apply lg:opacity-0;
      }

      .country-grid-display__icon {
        transform: scale(1.1);
      }
    }
  }

  &__cta {
    @apply w-full flex justify-between items-stretch text-gray-50 dark:text-gray-50 text-5xl p-4 drop-shadow-lg;
  }

  &__icon {
    @apply transition-transform;
  }
}
</style>

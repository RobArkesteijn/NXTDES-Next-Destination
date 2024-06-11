<template>
  <div class="country-grid-display">
    <NuxtLink
      v-for="(item, index) in data"
      :key="`country-${item.id}`"
      class="country-grid-display__item"
      loading="lazy"
      :class="
        data.length % 3 !== 0 && index === data.length - 1
          ? `country-grid-display--${data.length % 3 === 1 ? 'last-row-one' : 'last-row-two'}`
          : ''
      "
      :style="backgroundStyles(item.attributes.hero_image?.data.attributes.url ?? undefined)"
      :to="`/countries/${item.attributes.country?.toLowerCase()}`"
    >
      <div class="country-grid-display__cta">
        <h2 class="country-grid-display__title">
          {{ item.attributes?.country }}
        </h2>
        <UIcon
          name="i-mdi-arrow-right-circle"
          class="country-grid-display__icon"
        />
      </div>
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
import type { Strapi4ResponseData } from '@nuxtjs/strapi'
import type { CountriesAttributes } from '@/types/Countries'

defineProps({
  data: {
    type: Object as PropType<Strapi4ResponseData<CountriesAttributes>[]>,
    required: true,
  },
})

const img = useImage()

const backgroundStyles = (url: string | undefined) => {
  if (!url) {
    return
  }

  const imgUrl = img(url)

  return { backgroundImage: `url('${imgUrl}')`, backgroundSize: 'cover' }
}
</script>

<style scoped lang="postcss">
.country-grid-display {
  display: grid;
  grid-template-columns: repeat(1, minmax(0, 1fr));
  overflow: hidden;
  margin-top: var(--header-height);

  @media screen(md) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media screen(lg) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
    min-height: 100vh;
    margin-top: unset;
  }

  &__item {
    width: 100%;
    display: flex;
    align-items: flex-end;
    position: relative;
    height: calc(33.33vh - (var(--header-height) / 3));

    @apply shadow;

    @media screen(md) {
      height: calc(50vh - (var(--header-height) / 2));
    }

    @media screen(lg) {
      height: 50vh;
    }

    &::before {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      z-index: 1;
      content: '';
      opacity: 0.2;

      @apply transition-opacity bg-copper-600 dark:bg-copper-800;
    }

    &:hover {
      &::before {
        @media screen(lg) {
          opacity: 0;
        }
      }

      .country-grid-display__icon {
        transform: scale(1.1);
      }
    }
  }

  &--last-row-one {
    @media screen(md) {
      grid-column: span 2;
    }

    @media screen(lg) {
      grid-column: span 3;
    }
  }

  &--last-row-two {
    @media screen(lg) {
      grid-column: span 1.5;
    }
  }

  &__cta {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: stretch;
    padding: 1rem;

    @apply text-gray-50 dark:text-gray-50 text-5xl drop-shadow-lg;
  }

  &__icon {
    @apply transition-transform;
  }
}
</style>

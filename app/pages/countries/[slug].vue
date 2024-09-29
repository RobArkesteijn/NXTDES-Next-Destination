<script setup lang="ts">
import type { Strapi4ResponseMany } from '@nuxtjs/strapi'
import type { CountriesAttributes } from '@/types/Countries'

defineI18nRoute({
  paths: {
    uk: '/countries/[slug]',
    nl: '/landen/[slug]',
  },
})

const route = useRoute()
const { fullPath } = route
const { slug } = route.params
const { t } = useI18n()

const { data } = await useAsyncData(fullPath, async () => {
  const { find } = useStrapi()
  const response = await find<CountriesAttributes>('countries', {
    populate: {
      attractions: {
        populate: '*',
      },
      hero_image: {
        populate: '*',
      },
      flag_image: {
        populate: '*',
      },
    },
    filters: { country: { $eqi: slug } },
  })
  return response
})

const content = computed(
  () => (data.value as Strapi4ResponseMany<CountriesAttributes>)?.data[0]?.attributes,
)

if (!content.value) {
  throw createError({
    statusCode: 404,
    statusMessage: t('error.404.statusMessage'),
    message: t('error.404.message'),
  })
}

defineOgImageComponent('ContentPage', {
  imageUrl: content.value.hero_image?.data.attributes.url,
  icon: `i-twemoji-flag-${content.value?.country?.toLowerCase()}`,
  description: content.value.title,
})
</script>

<template>
  <div
    v-if="content"
    class="country-detail"
  >
    <div
      ref="countryTransitionOverlayRef"
      class="country-transition-overlay"
    >
      <UIcon
        v-if="nextCountry"
        class="country-transition-overlay__icon"
        dynamic
        :name="nextCountryIcon"
      />
    </div>
    <div class="country-content">
      <SectionDivider :side="isDesktop ? ['bottom'] : []">
        <CountryHero
          :content="content"
        />
      </SectionDivider>
      <CountryWeather />
      <SectionDivider :side="['bottom', 'top']">
        <CurrencyCalculator :currency="content.currency ?? 'EUR'" />
      </SectionDivider>
      <CountryAttractions
        v-if="content.attractions?.length"
        :attractions="content.attractions"
      />
    </div>
  </div>
</template>

<style lang="postcss" scoped>
.country-detail {
  position: relative;
}

.country-transition-overlay {
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100vw;
  backdrop-filter: blur(10px);
  display: flex;
  opacity: 0;
  pointer-events: none;

  @apply z-20 bg-boston-blue-500/[.5] dark:bg-boston-blue-500/[.4];

  &__icon {
    margin: auto;
    height: 200px;
    width: 200px;

    @apply drop-shadow-lg;

    @media screen(md) {
      height: 300px;
      width: 300px;
    }

    @media screen(lg) {
      height: 400px;
      width: 400px;
    }
  }
}

.country-enter-active,
.country-leave-active {
  transition: opacity 0.2s, filter 0.2s;
}
.country-enter-from,
.country-leave-to {
  opacity: 0;
  filter: blur(1rem);
}
</style>

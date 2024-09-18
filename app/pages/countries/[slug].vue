<script setup lang="ts">
import { gsap } from 'gsap'
import type { Strapi4ResponseMany } from '@nuxtjs/strapi'
import type { CountriesAttributes } from '@/types/Countries'

definePageMeta({
  pageTransition: {
    name: 'country',
    mode: 'out-in',
    onEnter: (el, done) => {
      const transitionOverlay = el.querySelector('.country-transition-overlay') as HTMLElement
      gsap.to(transitionOverlay, {
        opacity: 1,
        duration: 0.2,
        onComplete: () => {
          done()
        },
      })
    },
    onAfterEnter: (el) => {
      const transitionOverlay = el.querySelector('.country-transition-overlay') as HTMLElement
      gsap.to(transitionOverlay, {
        opacity: 0,
        delay: 0.8,
        duration: 0.4,
      })
    },
  },
  middleware(to) {
    const nexyCountry = useNextCountry()
    nexyCountry.value = to.params.slug as string
  },
})

defineI18nRoute({
  paths: {
    uk: '/countries/[slug]',
    nl: '/landen/[slug]',
  },
})

const route = useRoute()
const { t } = useI18n()
const { fullPath } = route
const { slug } = route.params
const { isDesktop } = useUIHelper()
const nextCountry = useNextCountry()
const countryTransitionOverlayRef = ref<HTMLElement | null>()

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

const countryIcon = `i-twemoji-flag-${content.value?.country?.toLowerCase()}`
const nextCountryIcon = computed(() => `i-twemoji-flag-${nextCountry.value}`)

defineOgImageComponent('ContentPage', {
  imageUrl: content.value.hero_image?.data.attributes.url,
  icon: countryIcon,
  description: content.value.title,
})

const touristAttractionSchemas = content.value.attractions?.map((attraction) => {
  return {
    '@type': 'TouristAttraction',
    'name': attraction.attraction,
    'description': attraction.description?.split('.')[0], // Only pick first sentence for description
  }
})

useSchemaOrg([
  {
    '@type': 'TouristDestination',
    'name': content.value.country,
    'description': content.value.description,
    'containsPlace': touristAttractionSchemas,
  },
])

useSeoMeta({
  description: content.value.title,
})
</script>

<template>
  <div v-if="content">
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
.country-transition-overlay {
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
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

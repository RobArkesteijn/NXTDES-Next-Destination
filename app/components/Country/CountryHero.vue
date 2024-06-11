<template>
  <div class="country-hero flex flex-col-reverse lg:flex-row h-[100vh] country-hero">
    <div
      class="w-full lg:w-[45%] lg:mt-auto p-4 sm:p-6 lg:p-8 flex flex-col gap-2 md:gap-4 lg:gap-6"
    >
      <span class="flex gap-2 py-2 items-stretch justify-center lg:justify-start text-2xl">
        <UIcon
          :name="heroIcon"
          dynamic
        />
        <h1 class="text-gray-950 dark:text-gray-50">{{ heroCountry }} ({{ heroCountryNative }})</h1>
      </span>
      <h2
        v-if="heroTitle"
        class="text-2xl sm:text-4xl lg:text-6xl font-bold text-gray-950 dark:text-gray-50"
      >
        {{ heroTitle }}
      </h2>
      <p
        v-if="heroDescription"
        class="md:text-xl lg:text-2xl"
      >
        {{ heroDescription }}
      </p>
    </div>
    <div class="h-full w-full lg:w-[55%] shapedivider shapedivider--bottom lg:shapedivider--left">
      <NuxtImg
        v-if="heroImageURL"
        :src="heroImageURL"
        :alt="heroImageALT"
        class="w-full h-full object-cover"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { CountriesAttributes } from '@/types/Countries'

const props = defineProps({
  content: {
    type: Object as PropType<CountriesAttributes>,
    required: true,
  },
})

const heroTitle = computed(() => props.content.title)
const heroCountry = computed(() => props.content.country)
const heroDescription = computed(() => props.content.description)
const heroIcon = computed(() => `i-twemoji-flag-${heroCountry.value?.toLowerCase()}`)
const heroCountryNative = computed(() => props.content.country_native)
const heroImageURL = computed(() => props.content.hero_image?.data.attributes.url)
const heroImageALT = computed(
  () => props.content.hero_image?.data.attributes.alternativeText ?? undefined,
)
</script>

<style lang="postcss" scoped>
.country-hero {
}
</style>
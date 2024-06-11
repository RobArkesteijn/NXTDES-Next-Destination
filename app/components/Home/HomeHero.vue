<template>
  <div class="shapedivider shapedivider--bottom">
    <ULandingHero
      :style="backgroundStyles"
      class="bg-no-repeat bg-cover h-[calc(100dvh-100px)] md:h-[calc(100dvh-132px)] lg:h-[calc(100dvh-144px)] hero-gradient"
    >
      <template #headline>
        <LogoWhite class="h-40 md:h-60 lg:h-80 mix-blend-difference z-10" />
      </template>
    </ULandingHero>
  </div>
</template>

<script setup lang="ts">
import type { StrapiImage } from '@/types/Strapi'
import LogoWhite from '@/assets/icons/logo-white.svg'

const props = defineProps({
  heroImage: {
    type: Object as PropType<StrapiImage | null>,
    required: true,
  },
})

const img = useImage()
const backgroundStyles = computed(() => {
  const imgUrl = img(`${props.heroImage?.data.attributes.url}`)
  return { backgroundImage: `url('${imgUrl}')` }
})
</script>

<style scoped lang="postcss">
.hero-gradient {
  @apply relative;
}

.hero-gradient:before {
  @apply content-[''] absolute top-0 left-0 h-full w-full opacity-30 lg:bg-gradient-to-r from-transparent via-gray-950 to-transparent;
}
</style>

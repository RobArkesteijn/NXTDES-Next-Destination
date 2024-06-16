<template>
  <div class="home-hero shapedivider shapedivider--bottom">
    <ULandingHero
      class="home-hero__landing-hero"
      :style="backgroundStyles"
    >
      <template #headline>
        <LogoWhite class="home-hero__logo" />
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
.home-hero {
  &__landing-hero {
    background-repeat: no-repeat;
    background-size: cover;
    height: calc(100dvh - 100px);
    position: relative;

    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      opacity: 0.3;

      @apply from-transparent via-gray-950 to-transparent;

      @media screen(lg) {
        @apply bg-gradient-to-r;
      }
    }

    @media screen(md) {
      height: calc(100dvh - 132px);
    }

    @media screen(lg) {
      height: calc(100dvh - 144px);
    }
  }

  &__logo {
    height: 10rem;
    mix-blend-mode: difference;

    @apply z-10;

    @media screen(md) {
      height: 15rem;
    }

    @media screen(lg) {
      height: 20rem;
    }
  }
}
</style>

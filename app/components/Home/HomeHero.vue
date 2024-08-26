<template>
  <div class="home-hero">
    <ULandingHero
      class="home-hero__landing-hero"
      :style="heroImage?.data.attributes.mime.startsWith('image') ? backgroundStyles : ''"
    >
      <template #headline>
        <LogoWhite class="home-hero__logo" />
      </template>

      <template
        v-if="heroImage?.data.attributes.mime.startsWith('video')"
        #default
      >
        <video
          class="home-hero__video"
          autoplay
          muted
          loop
          playsinline
        >
          <source
            :src="heroImage?.data.attributes.url"
            :type="heroImage?.data.attributes.mime"
          >
        </video>
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
    height: calc(100dvh - 132px);
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

    @media screen(lg) {
      height: calc(100vh - 144px);
    }
  }

  &__video {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  &__logo {
    height: 10rem;
    mix-blend-mode: difference;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

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

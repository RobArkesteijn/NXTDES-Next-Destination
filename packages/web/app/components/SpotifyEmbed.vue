<template>
  <ULandingCTA
    title="Check out our spotify playlist"
    class="spotify-embed"
    :ui="{
      title: 'text-teak-950 dark:text-teak-950',
      description: 'max-w-7xl my-12 mx-auto shadow-lg shadow-teak-950 ring-2 ring-teak-400 rounded-xl',
    }"
    :card="false"
  >
    <UIcon
      name="i-mdi-spotify"
      class="spotify-embed__icon"
    />
    <template #description>
      <iframe
        style="border-radius:12px"
        src="https://open.spotify.com/embed/playlist/7zcx9QwYRTeiICNEB4CJFP?utm_source=generator&theme=0"
        width="100%"
        height="400"
        frameBorder="0"
        allowfullscreen="true"
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
      />
    </template>
  </ULandingCTA>
</template>

<style lang="postcss" scoped>
.spotify-embed {
  position: relative;

  @apply bg-teak-300 dark:bg-teak-200;

  &__icon {
    position: absolute;
    top: 40px;
    right: 16px;

    @apply w-14 h-14 text-teak-100 dark:text-teak-500;

    @media screen(sm) {
      top: 80px;
      right: 40px;

      @apply w-24 h-24;
    }
  }

  &__iframe-wrapper {
    margin-inline: auto;

    @apply max-w-7xl py-24 sm:py-32;
  }
}
</style>

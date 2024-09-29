<script setup lang="ts">
import { SpeedInsights } from '@vercel/speed-insights/nuxt'
</script>

<template>
  <Html>
    <Body>
      <SpeedInsights />
      <AppHeader />
      <NuxtLoadingIndicator
        color="#4394b1"
        :height="5"
      />
      <UMain>
        <slot />
      </UMain>
      <AppFooter />
    </Body>
  </Html>
</template>

<style scoped lang="postcss">
.nuxt-loading-indicator {
  @apply top-[var(--header-height)] !important;
}
</style>

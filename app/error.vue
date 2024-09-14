<script setup lang="ts">
import type { NuxtError } from '#app'

useSeoMeta({
  title: 'Error',
})

defineProps({
  error: Object as () => NuxtError,
})
</script>

<template>
  <NuxtLayout>
    <UPageError
      :status="error?.statusCode"
      :name="error?.statusMessage"
      :message="error?.message"
    />
  </NuxtLayout>
</template>

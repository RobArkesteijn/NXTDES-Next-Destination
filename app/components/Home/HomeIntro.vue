<template>
  <ULandingSection
    :title="introTitle ?? 'Placeholder title'"
    :description="introDescription ?? 'Placeholder description'"
    :ui="{
      wrapper: 'sm:py-12 py-8',
      description: 'mt-12',
    }"
  />
</template>

<script setup lang="ts">
defineProps({
  introTitle: {
    type: String as PropType<string | null>,
    required: true,
  },
  introDescription: {
    type: String as PropType<string | null>,
    required: true,
  },
});
</script>

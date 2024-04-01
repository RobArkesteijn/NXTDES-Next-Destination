<template>
  <ULandingSection
    title="Unveil the Next Destination"
    description="Step into the world of Next Destination, where each click brings you closer to achieving your next extraordinary adventure. Unveil the possibilities, discover dream destinations, and seamlessly plan your journey with us. From captivating attractions to essential flight details, we're here to help you turn your travel aspirations into reality. Embrace the excitement and embark on the path to accomplishing your next sought-after destination. Your journey begins with NXTDES – where dreams take flight!"
    :ui="{
      wrapper: 'sm:py-12 py-8',
      description: 'mt-12',
    }"
  />
</template>

<script setup lang="ts">
defineProps({
  introTitle: {
    type: String as PropType<string>,
    required: true,
  },
  introDescription: {
    type: String as PropType<string>,
    required: true,
  },
});
</script>

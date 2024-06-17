<template>
  <MapboxMap
    map-id="map-1"
    class="w-full h-full"
    :options="{
      style: 'mapbox://styles/rob-arkesteijn/clx7creqv00ck01qqcka7fmjj',
      center: [20, 30],
      zoom: 2,
    }"
  />
</template>

<script setup lang="ts">
const { t } = useI18n()

useHead({
  title: t('interactive_map.meta_title'),
})
</script>

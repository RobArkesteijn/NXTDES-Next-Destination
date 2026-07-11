<script setup lang="ts">
defineI18nRoute({
  paths: {
    uk: '/interactive-map',
    nl: '/interactieve-kaart',
  },
})
</script>

<template>
  <MapboxMap
    map-id="map-1"
    :options="{
      style: 'mapbox://styles/rob-arkesteijn/clx7creqv00ck01qqcka7fmjj',
      center: [20, 30],
      zoom: 2,
    }"
  />
</template>

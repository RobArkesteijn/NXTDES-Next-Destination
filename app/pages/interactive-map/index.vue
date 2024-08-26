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

<script setup lang="ts">
defineI18nRoute({
  paths: {
    dk: '/interaktivt-kort',
    de: '/interaktive-karte',
    uk: '/interactive-map',
    es: '/mapa-interactivo',
    fr: '/carte-interactive',
    no: '/interaktivt-kart',
    nl: '/interactieve-kaart',
    pt: '/mapa-interativo',
    se: '/interaktiv-karta',
  },
})
</script>

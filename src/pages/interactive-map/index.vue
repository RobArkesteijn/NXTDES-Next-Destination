<template>
  <MapboxMap
    map-id="{ID}"
    class="w-full h-full"
    :options="{
      style: 'mapbox://styles/mapbox/light-v11',
      center: [-68.137343, 45.137451],
      zoom: 5,
    }"
  />
</template>

<script setup lang="ts"></script>

<style scoped></style>

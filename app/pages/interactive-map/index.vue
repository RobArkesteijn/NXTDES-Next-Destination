<template>
  <MapboxMap
    map-id="{ID}"
    class="w-full h-full"
    :options="{
      style: 'mapbox://styles/rob-arkesteijn/clx7creqv00ck01qqcka7fmjj',
      center: [20, 30],
      zoom: 2,
    }"
  />
</template>

<script setup lang="ts"></script>

<style scoped></style>

<template>
  <div v-if="data" class="country-weather">
    <!-- <h3 class="country-weather__location">
      <span v-if="data.location.name">{{ data.location.name }}</span>
      <span v-if="data.location.region"> / {{ data.location.region }}</span>
    </h3> -->
    <div class="country-weather__data">
      <span v-if="data.current.temp_c" class="country-weather__weather">
        <img
          class="country-weather__weather-icon"
          :alt="data.current.condition.text"
          :src="`/meteocons/${getWeatherIcon(data.current.condition.text, data.current.is_day, data.current.clouds)}.svg`"
        />
        <span class="country-weather__weather-value">
          {{ Math.round(data.current.temp_c) }} °C
        </span>
      </span>
      <span v-if="data.current.gust_kph" class="country-weather__gust">
        <img
          class="country-weather__gust-icon"
          :alt="`Wind power ${getGustPower(data.current.gust_kph)}`"
          :src="`/meteocons/wind-beaufort-${getGustPower(Math.round(data.current.gust_kph))}.svg`"
        />
        <span class="country-weather__gust-value">
          {{ Math.round(data.current.gust_kph) }} km/h
        </span>
      </span>
      <span v-if="data.current.humidity" class="country-weather__humidity">
        <img
          class="country-weather__humidity-icon"
          alt="Humidity"
          :src="`/meteocons/humidity.svg`"
        />
        <span class="country-weather__humidity-value">{{ data.current.humidity }} %</span>
      </span>
      <span v-if="data.current.uv" class="country-weather__uv">
        <img
          class="country-weather__uv-icon"
          :alt="`UV power ${data.current.uv}`"
          :src="`/meteocons/uv-index-${data.current.uv}.svg`"
        />
        <span class="country-weather__uv-value">UV index</span>
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
const route = useRoute();
const { slug } = route.params;
const config = useRuntimeConfig();

const { data } = await useFetch(`${config.public.apiUrl}/current.json`, {
  method: 'GET',
  params: { q: slug },
  headers: {
    'X-RapidAPI-Key': config.public.xRapidApiKey,
    'X-RapidAPI-Host': config.public.xRapidApiHost,
  },
});

const { getWeatherIcon, getGustPower } = useWeather();
</script>

<style scoped lang="postcss">
.country-weather {
  @apply py-8 sm:py-12 px-4 sm:px-6 lg:px-8 text-center text-xl sm:text-2xl;

  &__data {
    @apply flex justify-around;
  }

  &__weather,
  &__gust,
  &__humidity,
  &__uv {
    @apply flex flex-col items-center gap-2;
  }

  &__weather-icon,
  &__gust-icon,
  &__humidity-icon,
  &__uv-icon {
    width: 50px;
  }
}
</style>

<template>
  <div
    v-if="weatherData"
    class="country-weather"
  >
    <h3 class="country-weather__location">
      <UIcon name="i-material-symbols-location-on" />
      <span v-if="weatherData.location.name">{{ weatherData.location.name }}</span>
      <span v-if="weatherData.location.region"> / {{ weatherData.location.region }}</span>
    </h3>
    <div class="country-weather__data">
      <span
        v-if="weatherData.current.temp_c"
        class="country-weather__weather"
      >
        <img
          class="country-weather__weather-icon"
          :alt="weatherData.current.condition.text"
          :src="`/meteocons/${getWeatherIcon(weatherData.current.condition.text, weatherData.current.is_day, weatherData.current.cloud)}.svg`"
        >
        <span class="country-weather__weather-value">
          {{ Math.round(weatherData.current.temp_c) }} °C
        </span>
      </span>
      <span
        v-if="weatherData.current.gust_kph"
        class="country-weather__gust"
      >
        <img
          class="country-weather__gust-icon"
          :alt="`Wind power ${getGustPower(weatherData.current.gust_kph)}`"
          :src="`/meteocons/wind-beaufort-${getGustPower(Math.round(weatherData.current.gust_kph))}.svg`"
        >
        <span class="country-weather__gust-value">
          {{ Math.round(weatherData.current.gust_kph) }} km/h
        </span>
      </span>
      <span
        v-if="weatherData.current.humidity"
        class="country-weather__humidity"
      >
        <img
          class="country-weather__humidity-icon"
          alt="Humidity"
          :src="`/meteocons/humidity.svg`"
        >
        <span class="country-weather__humidity-value">{{ weatherData.current.humidity }} %</span>
      </span>
      <span
        v-if="weatherData.current.uv"
        class="country-weather__uv"
      >
        <img
          class="country-weather__uv-icon"
          :alt="`UV power ${weatherData.current.uv}`"
          :src="`/meteocons/uv-index-${weatherData.current.uv}.svg`"
        >
        <span class="country-weather__uv-value">UV index</span>
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { type WeatherData } from '@/types/Weather'

const route = useRoute()
const { slug } = route.params
const config = useRuntimeConfig()

const { data } = await useFetch(`${config.public.weatherApiUrl}/current.json`, {
  method: 'GET',
  params: { q: slug },
  headers: {
    'X-RapidAPI-Key': config.public.xRapidApiKey,
    'X-RapidAPI-Host': config.public.xRapidWeatherApiHost,
  },
})

const { getWeatherIcon, getGustPower } = useWeather()

const weatherData = computed(() => data.value as WeatherData)
</script>

<style scoped lang="postcss">
.country-weather {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  padding: 2rem 1rem;
  text-align: center;

  @apply sm:py-12 sm:px-6 lg:px-8 text-center text-xl sm:text-2xl;

  &__location {
    display: flex;
    justify-content: center;
    align-items: flex-start;
    gap: 8px;
    font-size: 36px;
    @apply text-gray-950 dark:text-gray-50;

    span {
      line-height: 1.3;
    }
  }

  &__data {
    display: flex;
    justify-content: space-around;
  }

  &__weather,
  &__gust,
  &__humidity,
  &__uv {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
    @apply transition-transform drop-shadow-sm;

    &:hover {
      @apply scale-110;
    }
  }

  &__weather-icon,
  &__gust-icon,
  &__humidity-icon,
  &__uv-icon {
    width: 50px;
  }
}
</style>

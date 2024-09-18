import type { WeatherData } from '@/types/Weather'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const query = getQuery(event)
  const slug = query.slug

  return await $fetch<WeatherData>(`${config.public.weatherApiUrl}/current.json`, {
    method: 'GET',
    params: { q: slug },
    headers: {
      'X-RapidAPI-Key': config.public.xRapidApiKey,
      'X-RapidAPI-Host': config.public.xRapidWeatherApiHost,
    },
  })
})

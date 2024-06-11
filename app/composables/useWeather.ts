export default function useWeather() {
  const getWeatherIcon = (status: string, isDay: number, cloudsPercentage: number) => {
    const dayStatus = isDay === 1 ? 'day' : 'night'

    if (status === 'Sunny' || status === 'Clear') {
      return `clear-${dayStatus}`
    }
    if (status === 'Partly Cloudy' || status === 'Partly cloudy') {
      return `partly-cloudy-${dayStatus}`
    }
    if (status === 'Overcast') {
      return cloudsPercentage < 75 ? `overcast-${dayStatus}` : 'overcast'
    }
    if (status === 'Patchy rain nearby') {
      return cloudsPercentage < 75 ? `partly-cloudy-${dayStatus}-rain` : 'drizzle'
    }
    if (status === 'Light drizzle') {
      return cloudsPercentage < 75 ? `drizzle-${dayStatus}` : 'drizzle'
    }
    if (status === 'Light rain shower') {
      return cloudsPercentage < 75 ? `drizzle-${dayStatus}` : 'drizzle'
    }
    if (status === 'Light rain') {
      return cloudsPercentage < 75 ? `drizzle-${dayStatus}` : 'drizzle'
    }
    if (status === 'Moderate rain') {
      return cloudsPercentage < 75 ? `overcast-${dayStatus}-rain` : 'overcast-rain'
    }
    if (status === 'Mist') {
      return 'mist'
    }

    return 'not-available'
  }

  const getGustPower = (gustSpeed: number) => {
    if (gustSpeed > 0 && gustSpeed <= 1) {
      return 0
    }
    if (gustSpeed > 1 && gustSpeed <= 5) {
      return 1
    }
    if (gustSpeed >= 6 && gustSpeed <= 11) {
      return 2
    }
    if (gustSpeed >= 12 && gustSpeed <= 19) {
      return 3
    }
    if (gustSpeed >= 20 && gustSpeed <= 28) {
      return 4
    }
    if (gustSpeed >= 29 && gustSpeed <= 38) {
      return 5
    }
    if (gustSpeed >= 39 && gustSpeed <= 49) {
      return 6
    }
    if (gustSpeed >= 50 && gustSpeed <= 61) {
      return 7
    }
    if (gustSpeed >= 62 && gustSpeed <= 74) {
      return 8
    }
    if (gustSpeed >= 75 && gustSpeed <= 88) {
      return 9
    }
    if (gustSpeed >= 89 && gustSpeed <= 102) {
      return 10
    }
    if (gustSpeed >= 103 && gustSpeed <= 117) {
      return 11
    }

    return 12
  }

  return {
    getWeatherIcon,
    getGustPower,
  }
}

import type { StrapiDefaultAttributes, StrapiImage } from '@/types/Strapi'

export interface CountriesAttributes extends StrapiDefaultAttributes {
  attractions: Attraction[] | null
  continent: string | null
  country: string | null
  country_native: string | null
  currency: string | null
  description: string | null
  flag_image: StrapiImage | null
  hero_image: StrapiImage | null
  title: string | null
}

export interface Attraction {
  attraction: string | null
  description: string | null
  image: StrapiImage | null
  id: number
}

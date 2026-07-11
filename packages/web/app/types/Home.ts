import type { StrapiDefaultAttributes, StrapiImage } from '@/types/Strapi'

export interface HomeAttributes extends StrapiDefaultAttributes {
  Highlighted: HomeHighlighted
  hero_image: StrapiImage | null
  intro: string | null
  title: string | null
}

export interface HomeHighlighted {
  countries: Country[]
  description: string | null
  headline: string | null
  id: number
  title: string | null
}

export interface Country {
  country: string | null
  id: number | null
  image: StrapiImage | null
}

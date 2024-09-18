import type { StrapiDefaultAttributes } from '@/types/Strapi'

export interface FaqAttributes extends StrapiDefaultAttributes {
  question: string
  answer: string
}

import type { StrapiDefaultAttributes, StrapiImage } from '@/types/Strapi'
import type { BlogsAttributes } from '@/types/Blogs'

export interface AuthorAttributes extends StrapiDefaultAttributes {
  avatar: StrapiImage | null
  blogs: BlogsAttributes[] | null
  createdAt: string
  name: string | null
  publishedAt: string
  updatedAt: string
}

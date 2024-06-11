import type { StrapiDefaultAttributes, StrapiImage } from '@/types/Strapi';
import type { AuthorAttributes } from '@/types/Author';

export interface BlogsAttributes extends StrapiDefaultAttributes {
  author: Author;
  date: string | null;
  description: string | null;
  hero_image: StrapiImage | null;
  label: string | null;
  title: string | null;
}

export interface Author {
  data: {
    attributes: AuthorAttributes;
    id: number;
  };
}

export interface StrapiDefaultAttributes {
  createdAt: string;
  locale?: string;
  publishedAt: string;
  updatedAt: string;
}

export interface StrapiImage {
  data: {
    attributes: {
      alternativeText: string | null;
      caption: string | null;
      createdAt: string;
      ext: string;
      formats: {
        large: StrapiImageFormat;
        medium: StrapiImageFormat;
        small: StrapiImageFormat;
        thumbnail: StrapiImageFormat;
      };
      hash: string;
      height: number;
      mime: string;
      name: string;
      previewUrl: string | null;
      provider: string;
      provider_metadata: any;
      related: StrapiImageRelated[];
      size: number;
      updatedAt: string;
      url: string;
      width: number;
    };
  };
  id: number;
}

export interface StrapiImageFormat {
  ext: string;
  hash: string;
  height: number;
  mime: string;
  name: string;
  path: string | null;
  size: number;
  sizeInBytes: number;
  url: string;
  width: number;
}

export interface StrapiImageRelated {
  createdAt: string;
  id: number;
  intro: string;
  locale: string;
  publishedAt: string;
  title: string;
  updatedAt: string;
  __type: string;
}

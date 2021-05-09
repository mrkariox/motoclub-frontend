import { SupportedImageSizes } from '~/types/SupportedImageSizes'

export type Image = {
  id: number,
  name: string;
  alt: string;
  title: string;
  url: string;
  sizes: SupportedImageSizes;
}

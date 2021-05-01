import { SupportedImageSizes } from '~/types/SupportedImageSizes'

export type Image = {
  name: string;
  alt: string;
  title: string;
  url: string;
  sizes: SupportedImageSizes;
}

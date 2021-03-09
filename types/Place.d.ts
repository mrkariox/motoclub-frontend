import { ImageStandard } from '~/types/ImageStandard'

export type Place = {
  id: string;
  name: string;
  description: string;
  lat: string;
  lng: string;
  gallery: ImageStandard[];
}

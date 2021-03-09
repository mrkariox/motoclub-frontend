import { Image } from '~/types/Image'

export type Place = {
  id: string;
  name: string;
  description: string;
  lat: string;
  lng: string;
  gallery: Image[];
}

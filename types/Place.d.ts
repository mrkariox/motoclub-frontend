import { Image } from '~/types/Image'

export type Place = {
  id: number;
  name: string;
  description: string;
  lat: number;
  lng: number;
  gallery: Image[];
}

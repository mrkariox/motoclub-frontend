import { Image } from '~/types/Image'
import { PlaceConstructor } from '~/types/PlaceConstructor'

export default class Place {
  private id: number;
  private name: string;
  private description: string;
  private lat: number;
  private lng: number;
  private gallery: Image[] | [];

  constructor ({ description, gallery, id, lat, lng, name }: PlaceConstructor) {
    this.id = id
    this.name = name
    this.description = description
    this.lat = lat
    this.lng = lng
    this.gallery = gallery
  }
}

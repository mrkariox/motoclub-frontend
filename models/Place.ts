import { Image } from '~/types/Image'
import { PlaceConstructor } from '~/types/PlaceConstructor'

export default class Place {
  public readonly id: number;
  public readonly name: string;
  public readonly description: string;
  public readonly lat: number;
  public readonly lng: number;
  public readonly gallery: Image[];

  constructor ({ description, gallery, id, lat, lng, name }: PlaceConstructor) {
    this.id = id
    this.name = name
    this.description = description
    this.lat = lat
    this.lng = lng
    this.gallery = gallery
  }
}

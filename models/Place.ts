import { Image } from '~/types/Image'
import { PlaceConstructor } from '~/types/PlaceConstructor'

export default class Place {
  public readonly id: number;
  public readonly name: string;
  public readonly description: string|null;
  public readonly lat: number|null;
  public readonly lng: number|null;
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

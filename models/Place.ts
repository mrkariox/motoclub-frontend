import { Image } from '~/types/Image'
import { PlaceConstructor } from '~/types/PlaceConstructor'

export default class Place {
  public readonly id: number;
  public readonly name: string;
  public readonly description: string|null;
  public readonly lat: number;
  public readonly lng: number;
  public readonly gallery: Image[];
  public readonly tripId: number;
  public readonly order: number;

  constructor ({ description, gallery, id, lat, lng, name, tripId, order }: PlaceConstructor) {
    this.id = id
    this.name = name
    this.description = description
    this.lat = lat
    this.lng = lng
    this.gallery = gallery
    this.tripId = tripId
    this.order = order
  }
}

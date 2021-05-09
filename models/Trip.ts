import { TripConstructor } from '~/types/TripConstructor'
import { PlaceGroup } from '~/types/PlaceGroup'

export default class Trip {
  public readonly id: number;
  public readonly name: string;
  public readonly places: PlaceGroup;

  constructor ({ id, name, places }: TripConstructor) {
    this.id = id
    this.name = name
    this.places = places
  }
}

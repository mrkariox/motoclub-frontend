import { PlaceGroup } from '~/types/PlaceGroup'

export type TripConstructor = {
  id: number;
  name: string;
  places: PlaceGroup;
}

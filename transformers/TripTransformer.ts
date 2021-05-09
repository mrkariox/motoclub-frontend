import { PlaceGroup } from '~/types/PlaceGroup'
import Trip from '~/models/Trip'

export default class TripTransformer {
  public static tripArrayToPlacesGroup (trips: Trip[]): PlaceGroup {
    let placeGroup = {} as PlaceGroup

    trips.forEach((trip) => {
      placeGroup = { ...placeGroup, ...trip.places }
    })

    return placeGroup
  }
}

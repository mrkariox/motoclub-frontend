import { PlaceGroup } from '~/types/PlaceGroup'
import Place from '~/models/Place'
import Trip from '~/models/Trip'

export default class MotoclubClientResponseTransformer {
  public static apiResponseToTripArray (response: any): Trip[] {
    const trips = [] as Trip[]
    if (!response.data.data.trips || !response.data.data.trips.length || response.data.data.trips.length < 1) {
      return trips
    }
    const responseTrips = response.data.data.trips as Array<any>

    return responseTrips.map((trip) => {
      const tripPlaces = trip.places as {[key: number]: any}
      const places = {} as PlaceGroup

      for (const placeId in tripPlaces) {
        if (Object.prototype.hasOwnProperty.call(tripPlaces, placeId)) {
          places[placeId] = new Place({
            description: trip.places[placeId].description,
            gallery: trip.places[placeId].gallery,
            id: trip.places[placeId].id,
            lat: trip.places[placeId].lat,
            lng: trip.places[placeId].lng,
            name: trip.places[placeId].name,
            tripId: trip.places[placeId].tripId,
            order: trip.places[placeId].order
          })
        }
      }

      return new Trip({ id: trip.id, name: trip.name, places })
    })
  }
}

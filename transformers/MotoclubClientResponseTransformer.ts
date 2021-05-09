import { PlaceGroup } from '~/types/PlaceGroup'
import Place from '~/models/Place'
import Trip from '~/models/Trip'

export default class MotoclubClientResponseTransformer {
  public static apiResponseToPlaceGroup (response: any): PlaceGroup {
    if (!response) {
      throw new Error('Empty input passed')
    }
    return response.reduce((m: PlaceGroup, elem: any) => {
      m[elem.id] = new Place({
        id: elem.id,
        name: elem.title?.rendered,
        description: elem.content?.rendered,
        lat: elem.ACF?.map_marker?.lat,
        lng: elem.ACF?.map_marker?.lng,
        gallery: (elem.ACF?.gallery && Array.isArray(elem.ACF?.gallery))
          ? elem.ACF?.gallery?.map((image: any) => {
            return {
              id: image.id,
              name: image.name,
              alt: image.alt,
              title: image.title,
              url: image.url,
              sizes: image.sizes
            }
          })
          : [],
        tripId: 0 // wrong - but cant get this id from this endpoint
      })
      return m
    }, {})
  }

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
            tripId: trip.places[placeId].tripId
          })
        }
      }

      return new Trip({ id: trip.id, name: trip.name, places })
    })
  }
}

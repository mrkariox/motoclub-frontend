import { MapMarkerData } from '~/types/MapMarkerData'
import { PlaceGroup } from '~/types/PlaceGroup'
import { Cords } from '~/types/Cords'
import Place from '~/models/Place'

export default class PlaceTransformer {
  public static placesGroupToMapMarkerDataArray (places: PlaceGroup): MapMarkerData[] {
    const output = []
    for (const placeId in places) {
      if (
        !Object.prototype.hasOwnProperty.call(places, placeId) ||
        !places[placeId].lat || places[placeId].lat === null ||
        !places[placeId].lng || places[placeId].lng === null
      ) {
        continue
      }
      output.push({
        placeId: places[placeId].id,
        position: {
          lat: places[placeId].lat as number,
          lng: places[placeId].lng as number
        }
      })
    }
    return output
  }

  public static placesGroupToSortedByOrderArray (places: PlaceGroup): Place[] {
    const placesArray = []
    for (const placeId in places) {
      placesArray.push(places[placeId])
    }
    return placesArray.sort((placeA, placeB) => {
      return placeA.order - placeB.order
    })
  }

  public static placesGroupToCoordsArray (places: PlaceGroup): Cords[] {
    return this.placesGroupToSortedByOrderArray(places).map((place) => {
      return {
        lat: place.lat,
        lng: place.lng
      }
    })
  }
}

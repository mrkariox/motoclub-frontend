import { MapMarkerData } from '~/types/MapMarkerData'
import { PlaceGroup } from '~/types/PlaceGroup'
import { Cords } from '~/types/Cords'

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

  public static placesGroupToCoordsArray (places: PlaceGroup): Cords[] {
    const placesArray = []
    for (const placeId in places) {
      placesArray.push({
        lat: places[placeId].lat,
        lng: places[placeId].lng
      })
    }
    return placesArray
  }
}

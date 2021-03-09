import { MapMarkerData } from '~/types/MapMarkerData'
import { PlaceGroup } from '~/types/PlaceGroup'

export default class PlaceTransformer {
  public static placesGroupToMapMarkerDataArray (places: PlaceGroup): MapMarkerData[] {
    const output = []
    for (const placeId in places) {
      if (
        !Object.prototype.hasOwnProperty.call(places, placeId) ||
        !places[placeId].lat ||
        !places[placeId].lng
      ) {
        continue
      }
      output.push({
        placeId: places[placeId].id,
        position: {
          lat: places[placeId].lat,
          lng: places[placeId].lng
        }
      })
    }
    return output
  }
}

import Place from '~/models/Place'

export default class MotoclubClientResponseTransformer {
  getPlaceModelsArray (response) {
    if (!response) {
      return []
    }
    return response.map((elem) => {
      return new Place({
        name: elem.title?.rendered,
        lat: elem.ACF?.map_marker?.lat,
        lng: elem.ACF?.map_marker?.lng
      })
    })
  }
}

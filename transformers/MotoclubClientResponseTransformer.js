import Place from '~/models/Place'
import Image from '~/models/Image'

export default class MotoclubClientResponseTransformer {
  getPlaceModels (response) {
    if (!response) {
      return []
    }
    return response.reduce((m, elem) => {
      m[elem.id] = new Place({
        id: elem.id,
        name: elem.title?.rendered,
        description: elem.content?.rendered,
        lat: elem.ACF?.map_marker?.lat,
        lng: elem.ACF?.map_marker?.lng,
        gallery: elem.ACF?.gallery?.map((image) => {
          return new Image({
            name: image.name,
            alt: image.alt,
            title: image.title,
            url: image.url,
            sizes: image.sizes
          })
        })
      })
      return m
    }, {})
  }
}

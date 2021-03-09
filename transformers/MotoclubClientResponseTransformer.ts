import { PlaceGroup } from '~/types/PlaceGroup'

export default class MotoclubClientResponseTransformer {
  public static apiResponseToPlaceGroup (response: any): PlaceGroup {
    if (!response) {
      throw new Error('Empty input passed')
    }
    return response.reduce((m: PlaceGroup, elem: any) => {
      m[elem.id] = {
        id: elem.id,
        name: elem.title?.rendered,
        description: elem.content?.rendered,
        lat: elem.ACF?.map_marker?.lat,
        lng: elem.ACF?.map_marker?.lng,
        gallery: (elem.ACF?.gallery && Array.isArray(elem.ACF?.gallery))
          ? elem.ACF?.gallery?.map((image: any) => {
            return {
              name: image.name,
              alt: image.alt,
              title: image.title,
              url: image.url,
              sizes: image.sizes
            }
          })
          : []
      }
      return m
    }, {})
  }
}

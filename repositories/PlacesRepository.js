import Motoclub from '~/clients/Motoclub'
import MotoclubClientResponseTransformer from '~/transformers/MotoclubClientResponseTransformer'

export default class PlacesRepository {
  constructor () {
    this.client = new Motoclub()
    this.transformer = new MotoclubClientResponseTransformer()
  }

  async getPlaces () {
    const response = await this.client.getPosts()
    return this.transformer.getPlaceModelsArray(response.data)
  }
}

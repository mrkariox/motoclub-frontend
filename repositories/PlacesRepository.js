import MotoclubClientResponseTransformer from '~/transformers/MotoclubClientResponseTransformer'

export default class PlacesRepository {
  constructor ($motoclubClient) {
    this.client = $motoclubClient
    this.transformer = new MotoclubClientResponseTransformer()
  }

  async getPlaces () {
    const response = await this.client.getPosts()
    return this.transformer.getPlaceModels(response.data)
  }
}

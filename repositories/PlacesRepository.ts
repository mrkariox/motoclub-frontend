import MotoclubClientResponseTransformer from '~/transformers/MotoclubClientResponseTransformer'
import Motoclub from '~/clients/Motoclub'
import { PlaceGroup } from '~/types/PlaceGroup'

export default class PlacesRepository {
  private client: Motoclub;
  private transformer: MotoclubClientResponseTransformer;

  constructor ($motoclubClient: Motoclub) {
    this.client = $motoclubClient
    this.transformer = new MotoclubClientResponseTransformer()
  }

  async getPlaces (): Promise<PlaceGroup> {
    const response = await this.client.getPosts()
    return this.transformer.getPlaceModels(response.data)
  }
}

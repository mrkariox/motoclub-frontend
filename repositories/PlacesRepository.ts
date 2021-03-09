import MotoclubClientResponseTransformer from '~/transformers/MotoclubClientResponseTransformer'
import Motoclub from '~/clients/Motoclub'
import { PlaceGroup } from '~/types/PlaceGroup'

export default class PlacesRepository {
  private client: Motoclub;

  constructor ($motoclubClient: Motoclub) {
    this.client = $motoclubClient
  }

  async getPlaces (): Promise<PlaceGroup> {
    const response = await this.client.getPosts()
    return MotoclubClientResponseTransformer.apiResponseToPlaceGroup(response.data)
  }
}

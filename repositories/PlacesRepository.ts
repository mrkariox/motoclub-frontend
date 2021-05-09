import MotoclubClientResponseTransformer from '~/transformers/MotoclubClientResponseTransformer'
import Motoclub from '~/clients/Motoclub'
import { PlaceGroup } from '~/types/PlaceGroup'
import Trip from '~/models/Trip'

export default class PlacesRepository {
  private client: Motoclub;

  constructor ($motoclubClient: Motoclub) {
    this.client = $motoclubClient
  }

  async getPlaces (): Promise<PlaceGroup> {
    const response = await this.client.getPosts()
    return MotoclubClientResponseTransformer.apiResponseToPlaceGroup(response.data)
  }

  async getTrips (): Promise<Trip[]> {
    const response = await this.client.getTrips()
    return MotoclubClientResponseTransformer.apiResponseToTripArray(response)
  }
}

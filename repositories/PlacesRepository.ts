import MotoclubClientResponseTransformer from '~/transformers/MotoclubClientResponseTransformer'
import Motoclub from '~/clients/Motoclub'
import Trip from '~/models/Trip'

export default class PlacesRepository {
  private client: Motoclub;

  constructor ($motoclubClient: Motoclub) {
    this.client = $motoclubClient
  }

  async getTrips (): Promise<Trip[]> {
    const response = await this.client.getTrips()
    return MotoclubClientResponseTransformer.apiResponseToTripArray(response)
  }
}

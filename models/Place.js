import Model from '~/models/Model'

export default class Place extends Model {
  constructor (data) {
    super()
    this.name = data?.name
    this.lat = data?.lat
    this.lng = data?.lat
  }
}

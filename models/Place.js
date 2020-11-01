export default class Place {
  constructor (data) {
    this.name = data?.name
    this.lat = data?.lat
    this.lng = data?.lng
  }
}

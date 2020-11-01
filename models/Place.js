export default class Place {
  constructor (data) {
    this.name = data?.name
    this.description = data?.description
    this.lat = data?.lat
    this.lng = data?.lng
    this.gallery = data?.gallery // array of Image
  }
}

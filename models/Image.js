export default class Image {
  constructor (data) {
    this.name = data?.name
    this.alt = data?.alt
    this.title = data?.title
    this.url = data?.url
    this.sizes = data?.sizes
  }
}

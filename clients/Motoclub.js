export default class Motoclub {
  constructor ($axios) {
    this.http = $axios.create({
      baseURL: process.env.API_URL + '/wp-json/wp/v2',
      headers: { Accept: 'application/json' }
    })
  }

  getPosts () {
    return this.http({
      method: 'get',
      url: '/posts'
    })
  }
}

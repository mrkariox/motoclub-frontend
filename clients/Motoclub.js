import axios from 'axios'

export default class Motoclub {
  constructor () {
    this.http = axios.create({
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

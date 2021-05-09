import { NuxtAxiosInstance } from '@nuxtjs/axios'

export default class Motoclub {
  private readonly http: NuxtAxiosInstance;

  constructor ($axios: NuxtAxiosInstance) {
    this.http = $axios.create({
      baseURL: process.env.NUXT_ENV_API_URL + '/wp-json',
      headers: { Accept: 'application/json' }
    })
  }

  getPosts () {
    return this.http({
      method: 'get',
      url: '/wp/v2/posts'
    })
  }

  getTrips () {
    return this.http({
      method: 'get',
      url: '/motoclub/trips'
    })
  }
}

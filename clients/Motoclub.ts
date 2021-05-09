import { NuxtAxiosInstance } from '@nuxtjs/axios'

export default class Motoclub {
  private readonly http: NuxtAxiosInstance;

  constructor ($axios: NuxtAxiosInstance) {
    this.http = $axios.create({
      baseURL: process.env.NUXT_ENV_API_URL + '/wp-json/motoclub',
      headers: { Accept: 'application/json' }
    })
  }

  getTrips () {
    return this.http({
      method: 'get',
      url: '/trips'
    })
  }
}

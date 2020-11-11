import { NuxtAxiosInstance } from '@nuxtjs/axios'

export default class Motoclub {
  private readonly http: NuxtAxiosInstance;

  constructor ($axios: NuxtAxiosInstance) {
    // @ts-ignore
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

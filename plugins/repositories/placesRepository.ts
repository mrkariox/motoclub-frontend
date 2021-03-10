import { Plugin } from '@nuxt/types'
import PlacesRepository from '@/repositories/PlacesRepository'
import Motoclub from '@/clients/Motoclub'

declare module 'vue/types/vue' {
  interface Vue {
    $placesRepository: PlacesRepository
  }
}

const placesRepository: Plugin = ({ $axios }, inject) => {
  inject('placesRepository', new PlacesRepository(new Motoclub($axios)))
}

export default placesRepository

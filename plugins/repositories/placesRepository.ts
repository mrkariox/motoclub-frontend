import { Plugin } from '@nuxt/types'
import PlacesRepository from '@/repositories/PlacesRepository'
import Motoclub from '@/clients/Motoclub'

declare module 'vue/types/vue' {
  interface Vue {
    $placesRepository: PlacesRepository
  }
}

declare module 'vuex/types/index' {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars,no-unused-vars
  interface Store<S> {
    $placesRepository: PlacesRepository
  }
}

const placesRepository: Plugin = ({ $axios }, inject) => {
  inject('placesRepository', new PlacesRepository(new Motoclub($axios)))
}

export default placesRepository

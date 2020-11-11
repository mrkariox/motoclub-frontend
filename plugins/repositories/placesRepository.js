import PlacesRepository from '@/repositories/PlacesRepository'
import Motoclub from '@/clients/Motoclub'

export default function ({ $axios }, inject) {
  inject('placesRepository', new PlacesRepository(new Motoclub($axios)))
}

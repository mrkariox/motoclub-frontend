import { ActionTree, MutationTree } from 'vuex'
import { PlaceGroup } from '~/types/PlaceGroup'

export const state = () => ({
  places: {} as PlaceGroup
})

export type PlacesState = ReturnType<typeof state>

export const mutations: MutationTree<PlacesState> = {
  SET_PLACES (state, places: PlaceGroup) {
    state.places = places
  }
}

export const actions: ActionTree<PlacesState, PlacesState> = {
  fetchPlaces ({ commit }): void {
    this.$placesRepository.getPlaces().then((places) => {
      commit('SET_PLACES', places)
    })
  }
}

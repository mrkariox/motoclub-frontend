import { ActionTree, MutationTree } from 'vuex'
import { PlaceGroup } from '~/types/PlaceGroup'

export const state = () => ({
  places: {} as PlaceGroup,
  activePlaceId: null as unknown as number
})

export type PlacesState = ReturnType<typeof state>

export const mutations: MutationTree<PlacesState> = {
  SET_PLACES (state, places: PlaceGroup) {
    state.places = places
  },
  SET_ACTIVE_PLACE (state, placeId: number) {
    state.activePlaceId = placeId
  }
}

export const actions: ActionTree<PlacesState, PlacesState> = {
  fetchPlaces ({ commit }): Promise<void> {
    return this.$placesRepository.getPlaces().then((places) => {
      commit('SET_PLACES', places)
    })
  },
  setActivePlace ({ commit }, placeId: number) {
    commit('SET_ACTIVE_PLACE', placeId)
  }
}

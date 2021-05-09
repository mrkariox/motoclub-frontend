import { ActionTree, MutationTree } from 'vuex'
import { PlaceGroup } from '~/types/PlaceGroup'
import { Cords } from '~/types/Cords'

export const state = () => ({
  places: {} as PlaceGroup,
  activePlaceId: null as unknown as number,
  isPolylineShown: false as boolean,
  placesForPolyline: [] as unknown as Array<Cords>
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
  setActivePlace ({ state, commit }, placeId: number) {
    // if place with specific ID exists in state set it as active
    if (state.places[placeId]) {
      commit('SET_ACTIVE_PLACE', placeId)
    }
  }
}

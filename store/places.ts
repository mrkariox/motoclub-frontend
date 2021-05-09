import { ActionTree, MutationTree } from 'vuex'
import { PlaceGroup } from '~/types/PlaceGroup'
import Trip from '~/models/Trip'
import TripTransformer from '~/transformers/TripTransformer'

export const state = () => ({
  places: {} as PlaceGroup,
  activePlaceId: null as unknown as number,
  trips: [] as unknown as Trip[]
})

export type PlacesState = ReturnType<typeof state>

export const mutations: MutationTree<PlacesState> = {
  SET_PLACES (state, places: PlaceGroup) {
    state.places = places
  },
  SET_ACTIVE_PLACE (state, placeId: number) {
    state.activePlaceId = placeId
  },
  SET_TRIPS (state, trips: Trip[]) {
    state.trips = trips
  }
}

export const actions: ActionTree<PlacesState, PlacesState> = {
  setActivePlace ({ state, commit }, placeId: number) {
    // if place with specific ID exists in state set it as active
    if (state.places[placeId]) {
      commit('SET_ACTIVE_PLACE', placeId)
    }
  },
  fetchTrips ({ commit }) : Promise<Trip[]> {
    return this.$placesRepository.getTrips().then((trips) => {
      commit('SET_TRIPS', trips)
      commit('SET_PLACES', TripTransformer.tripArrayToPlacesGroup(trips))
      return trips
    })
  }
}

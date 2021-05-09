import { ActionTree, MutationTree } from 'vuex'
import { Cords } from '~/types/Cords'

export const state = () => ({
  isPolylineShown: false as boolean,
  placesForPolyline: [] as unknown as Array<Cords>,
  currentTripId: null as unknown as number
})

export type MapState = ReturnType<typeof state>

export const mutations: MutationTree<MapState> = {
  CHANGE_IS_POLYLINE_SHOWN_FLAG (state, flag: boolean) {
    state.isPolylineShown = flag
  },
  SET_PLACES_FOR_POLYLINE (state, placesForPolyline: Array<Cords>) {
    state.placesForPolyline = placesForPolyline
  },
  SET_CURRENT_TRIP_ID (state, tripId: number) {
    state.currentTripId = tripId
  }
}

export const actions: ActionTree<MapState, MapState> = {
  setPlacesForPolyline ({ commit }, placesForPolyLine: Array<Cords>) {
    commit('SET_PLACES_FOR_POLYLINE', placesForPolyLine)
  },
  changeIsPolylineShownFlag ({ commit }, flag: boolean) {
    commit('CHANGE_IS_POLYLINE_SHOWN_FLAG', flag)
  },
  togglePolyline ({ state, commit }) {
    commit('CHANGE_IS_POLYLINE_SHOWN_FLAG', !state.isPolylineShown)
  },
  setCurrentTripId ({ commit }, tripId: number) {
    commit('SET_CURRENT_TRIP_ID', tripId)
  }
}

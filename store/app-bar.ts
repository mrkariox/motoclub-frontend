import { ActionTree, MutationTree } from 'vuex'

export const state = () => ({
  isNavButtonVisible: false as boolean
})

export type AppBarState = ReturnType<typeof state>

export const mutations: MutationTree<AppBarState> = {
  CHANGE_NAV_BUTTON_VISIBILITY (state, isVisible: boolean) {
    state.isNavButtonVisible = isVisible
  }
}

export const actions: ActionTree<AppBarState, AppBarState> = {
  changeNavButtonVisibility ({ commit, state }, isVisible: boolean) {
    if (state.isNavButtonVisible !== isVisible) {
      commit('CHANGE_NAV_BUTTON_VISIBILITY', isVisible)
    }
  }
}

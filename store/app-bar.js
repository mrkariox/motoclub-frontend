export const state = () => ({
  isNavButtonVisible: false
})

export const mutations = {
  CHANGE_NAV_BUTTON_VISIBILITY (state, isVisible) {
    state.isNavButtonVisible = isVisible
  }
}

export const actions = {
  changeNavButtonVisibility ({ commit, state }, isVisible) {
    if (state.isNavButtonVisible !== isVisible) {
      commit('CHANGE_NAV_BUTTON_VISIBILITY', isVisible)
    }
  }
}

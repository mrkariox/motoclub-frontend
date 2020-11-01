export const state = () => ({
  isActive: false,
  asideComponent: null
})

export const mutations = {
  TOGGLE_ASIDE_BAR (state) {
    state.isActive = !state.isActive
  },
  CHANGE_ASIDE_COMPONENT (state, component) {
    state.asideComponent = component
  },
  CHANGE_ASIDE_BAR_ACTIVE_STATE (state, isActive) {
    state.isActive = isActive
  }
}

export const actions = {
  toggleAsideBar ({ commit }) {
    commit('TOGGLE_ASIDE_BAR')
  },
  changeAsideComponent ({ commit }, component) {
    commit('CHANGE_ASIDE_COMPONENT', component)
  },
  changeAsideBarActiveState ({ commit }, isActive) {
    commit('CHANGE_ASIDE_BAR_ACTIVE_STATE', isActive)
  }
}

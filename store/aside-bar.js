export const state = () => ({
  isActive: false,
  asideComponent: null,
  asideComponentProps: {}
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
  },
  CHANGE_ASIDE_COMPONENT_PROPS (state, props) {
    state.asideComponentProps = props
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
  },
  changeAsideComponentProps ({ commit }, props) {
    commit('CHANGE_ASIDE_COMPONENT_PROPS', props)
  }
}

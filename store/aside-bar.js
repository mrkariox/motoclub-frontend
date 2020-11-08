export const state = () => ({
  isActive: false,
  asideComponent: null,
  asideComponentProps: {},
  isAsideComponentReady: false
})

export const mutations = {
  CHANGE_ASIDE_BAR_ACTIVE_STATE (state, isActive) {
    state.isActive = isActive
  },
  TOGGLE_ASIDE_BAR (state) {
    state.isActive = !state.isActive
  },
  CHANGE_ASIDE_COMPONENT (state, component) {
    state.asideComponent = component
  },
  CHANGE_ASIDE_COMPONENT_PROPS (state, props) {
    state.asideComponentProps = props
  },
  CHANGE_ASIDE_COMPONENT_READY_STATUS (state, isReady) {
    state.isAsideComponentReady = isReady
  }
}

export const actions = {
  changeAsideBarActiveState ({ commit, state }, isActive) {
    if (state.isActive !== isActive) {
      commit('CHANGE_ASIDE_BAR_ACTIVE_STATE', isActive)
    }
  },
  toggleAsideBar ({ commit }) {
    commit('TOGGLE_ASIDE_BAR')
  },
  changeAsideComponent ({ commit }, { props, component }) {
    commit('CHANGE_ASIDE_COMPONENT_READY_STATUS', false)
    if (component) {
      commit('CHANGE_ASIDE_COMPONENT', component)
    }
    if (props) {
      commit('CHANGE_ASIDE_COMPONENT_PROPS', props)
    }
    commit('CHANGE_ASIDE_COMPONENT_READY_STATUS', true)
  }
}

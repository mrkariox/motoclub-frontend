import { ActionTree, MutationTree } from 'vuex'

export const state = () => ({
  isActive: false as boolean,
  asideComponent: null as string | null,
  asideComponentProps: {} as {[key: string]: any},
  isAsideComponentReady: false as boolean
})

export type AsideBarState = ReturnType<typeof state>

export const mutations: MutationTree<AsideBarState> = {
  CHANGE_ASIDE_BAR_ACTIVE_STATE (state, isActive: boolean) {
    state.isActive = isActive
  },
  TOGGLE_ASIDE_BAR (state) {
    state.isActive = !state.isActive
  },
  CHANGE_ASIDE_COMPONENT (state, component: string) {
    state.asideComponent = component
  },
  CHANGE_ASIDE_COMPONENT_PROPS (state, props: {[key: string]: any}) {
    state.asideComponentProps = props
  },
  CHANGE_ASIDE_COMPONENT_READY_STATUS (state, isReady: boolean) {
    state.isAsideComponentReady = isReady
  }
}

export const actions: ActionTree<AsideBarState, AsideBarState> = {
  changeAsideBarActiveState ({ commit, state }, isActive: boolean) {
    if (state.isActive !== isActive) {
      commit('CHANGE_ASIDE_BAR_ACTIVE_STATE', isActive)
    }
  },
  toggleAsideBar ({ commit }) {
    commit('TOGGLE_ASIDE_BAR')
  },
  changeAsideComponent ({ commit }, { props, component }: {props?: {[key: string]: any}, component?: string}) {
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

const state = {
  isFullScreen: false,
}

const getters = {
  isFullScreen: (state) => state.isFullScreen,
}

const mutations = {
  CHANGE_FULL_SCREEN: (state, flag) => {
    state.isFullScreen = flag
  }
}

const actions = {
  changeFullScreen: ({ commit }, flag) => {
    commit('CHANGE_FULL_SCREEN', flag)
  }
}

export default {
  getters,
  state,
  mutations,
  actions
}
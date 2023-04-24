import { createStore } from 'vuex'
export default createStore({
  state: {
    randomSelectedActions: []
  },
  getters: {
    getRandomSelectedActions(state) {
      return state.randomSelectedActions;
    }
  },
  mutations: {
    ADD_ACTIONS(state, payload) {
      payload.forEach(el => {
        // add isActive key to make action acitve/inactive
        el.isActive = true;
        state.randomSelectedActions.push(el);
      })
    }
  },
  actions: {
    addActionToSidebar({commit}, payload) {
      commit('ADD_ACTIONS', payload);
    }
  }
})

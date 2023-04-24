import { createStore } from 'vuex'
import { uuid } from 'vue3-uuid';

export default createStore({
  state: {
    randomSelectedActions: [],
    selectedStore: {}
  },
  getters: {
    getRandomSelectedActions(state) {
      return state.randomSelectedActions;
    },
    getSelectedStore(state) {
      return state.selectedStore;
    }
  },
  mutations: {
    ADD_ACTIONS(state, payload) {
      payload.forEach(el => {
        el.isActive = true;
        el.id = uuid.v4();
        el.data = [];
        state.randomSelectedActions.push(JSON.parse(JSON.stringify(el)));
      })
    },
    SET_SELECTED_STORE(state, payload) {
      state.selectedStore = payload;
    },
    SET_SELECTED_STORE_DATA(state, payload) {
      state.randomSelectedActions.forEach(el=> {
        if(el.id === state.selectedStore.id) {
          el.data.push(payload);
          state.selectedStore = el;
        }
      })
    },
    DELETE_TAG(state, payload) {
      state.randomSelectedActions.forEach(el=> {
        if(el.id === state.selectedStore.id) {
          el.data = el.data.filter(el=> {
            if(el.tagId === payload) {
              return null;
            }
            return el;
          });
          state.selectedStore = el;
        }
      })
    },
    SET_ACTION_STATE(state){
      state.randomSelectedActions.forEach(el=> {
        if(el.id === state.selectedStore.id) {
          el.isActive = false;
        }
      })
    },
    DELETE_ACTION(state){
      state.randomSelectedActions = state.randomSelectedActions.filter(el=> {
        if(el.id === state.selectedStore.id) {
          return null;
        }
        return el;
      })
    }
  },
  actions: {
    addActionToSidebar({commit}, payload) {
      commit('ADD_ACTIONS', payload);
    },
    setSelectedStore({commit}, payload) {
      commit('SET_SELECTED_STORE', payload);
    },
    setSelectedActionData({commit}, payload) {
      commit('SET_SELECTED_STORE_DATA', payload);
    },
    deleteTagInSelectedAction({commit}, payload) {
      commit('DELETE_TAG', payload);
    },
    makeActionInActive({commit}) {
      commit('SET_ACTION_STATE');
    },
    deleteAction({commit}) {
      commit('DELETE_ACTION');
    }
  }
})

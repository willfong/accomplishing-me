import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    activities: {},
  },
  mutations: {
    ACTIVITIES_NEW(state, activity) {
      state.activities = {...state.activities, ...activity};
    }
  },
  actions: {
    activitiesNew({commit}, activity) {
      commit('ACTIVITIES_NEW', activity);
    }
  },
  getters: {
    activities: state => state.activities,
  }
})

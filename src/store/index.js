import Vue from 'vue'
import Vuex from 'vuex'
import idb from '@/store/idb';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    activities: {},
  },
  mutations: {
    async IDB_ACTIVITIES(state) {
      state.activities = await idb.read('activities');
    },
  },
  actions: {
    async activitiesGet({commit}) {
      commit('IDB_ACTIVITIES');
    },
    async activitiesNew({commit, state}, activity) {
      await idb.write({id: 'activities', value: {...state.activities, ...activity}});
      commit('IDB_ACTIVITIES');
    }
  },
  getters: {
    activities: state => state.activities,
  }
})

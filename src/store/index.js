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
			// TODO: Wonder if there's a cleaner way of doing this?
			const activities = await idb.read('activities');
      state.activities = (activities && 'value' in activities) ? activities['value'] : {};
    },
  },
  actions: {
    async activitiesGet({commit}) {
      commit('IDB_ACTIVITIES');
    },
    async activitiesNew({commit, state}, activity) {
      await idb.write({id: 'activities', value: {...state.activities, ...activity}});
      commit('IDB_ACTIVITIES');
		},
		async deleteAllData() {
			await idb.reset();
		},
  },
  getters: {
    activities: state => state.activities,
  }
})

import Vue from 'vue'
import Vuex from 'vuex'
import moment from 'moment'

// We are using IndexedDB as a simple key/value storage.
// This allows us to easily migrate different databases, like
// cloud hosted solutions in the future if needed.
// Just get used to dealing with it!

import idb from '@/store/idb';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
		selectedDate: new Date(),
		activities: {},
  },
  mutations: {
		SELECTED_DATE(state, newDate) {
			state.selectedDate = newDate;
		},
    async IDB_ACTIVITIES(state) {
			// TODO: Wonder if there's a cleaner way of doing this?
			// Don't really like the two step approach
			// Also don't like having idb in mutations and actions.
			const activities = await idb.read(`activities_${moment(state.selectedDate).format('YYMMDD')}`);
      state.activities = (activities && 'value' in activities) ? activities['value'] : {};
    },
  },
  actions: {
		updateSelectedDate({commit}, newDate) {
			commit('SELECTED_DATE', newDate);
		},
    async activitiesGet({commit}) {
      commit('IDB_ACTIVITIES');
    },
    async activitiesNew({commit, state}, activity) {
      await idb.write({id: `activities_${moment(state.selectedDate).format('YYMMDD')}`, value: {...state.activities, ...activity}});
      commit('IDB_ACTIVITIES');
		},
		async deleteAllData() {
			await idb.reset();
		},
  },
  getters: {
		activities: state => state.activities,
		selectedDate: state => state.selectedDate,
  }
})

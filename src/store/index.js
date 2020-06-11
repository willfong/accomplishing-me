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
		tasks: {},
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
    async IDB_TASKS(state) {
			const tasks = await idb.read('tasks');
			state.tasks = (tasks && 'value' in tasks) ? tasks['value'] : {};
		},
		TASKS_COMPLETE(state, id) {
			state.tasks[id]['completed'] = true;
		},
  },
  actions: {
		async deleteAllData() {
			await idb.reset();
		},
		updateSelectedDate({commit}, newDate) {
			commit('SELECTED_DATE', newDate);
		},
    async activitiesGet({commit}) {
      commit('IDB_ACTIVITIES');
    },
    async activitiesNew({commit, state}, activity) {
			// TODO: Investigate if there is a way state is different than what is on IDB?
      await idb.write({id: `activities_${moment(state.selectedDate).format('YYMMDD')}`, value: {...state.activities, ...activity}});
      commit('IDB_ACTIVITIES');
		},
		async tasksGet({commit}) {
			commit('IDB_TASKS');
		},
		async tasksNew({commit, state}, task) {
			await idb.write({id: 'tasks', value: {...state.tasks, ...task}});
			commit('IDB_TASKS');
		},
		taskComplete({commit, state}, taskId) {
			commit('TASKS_COMPLETE', taskId);
			idb.write({id: 'tasks', value: state.tasks});
		},
  },
  getters: {
		activities: state => state.activities,
		selectedDate: state => state.selectedDate,
		tasks: state => state.tasks,
  }
})

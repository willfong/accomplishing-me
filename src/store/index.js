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
		routines: {},
  },
  mutations: {
		// IDB is the source of truth. To modify state, modify IDB which then gets pulled into state.
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
		async IDB_ROUTINES(state) {
			const routines = await idb.read('routines');
			state.routines = (routines && 'value' in routines) ? routines['value'] : {};
		},
  },
  actions: {
		async deleteAllData() {
			// IDB is the source of truth. Deleting from IDB will eventually reset all state.
			await idb.reset();
		},
		updateSelectedDate({commit}, newDate) {
			commit('SELECTED_DATE', newDate);
		},
    activitiesGet({commit}) {
      commit('IDB_ACTIVITIES');
    },
    async activitiesNew({commit, state}, activity) {
      await idb.write({id: `activities_${moment(state.selectedDate).format('YYMMDD')}`, value: {...state.activities, ...activity}});
      commit('IDB_ACTIVITIES');
		},
		tasksGet({commit}) {
			commit('IDB_TASKS');
		},
		async tasksNew({commit, state}, task) {
			await idb.write({id: 'tasks', value: {...state.tasks, ...task}});
			commit('IDB_TASKS');
		},
		async taskComplete({commit, state}, id) {
			let tasks = state.tasks;
			tasks[id]['completed'] = true;
			await idb.write({id: 'tasks', value: tasks});
			commit('IDB_TASKS');
		},
		routinesGet({commit}) {
			commit('IDB_ROUTINES');
		},
		async routinesAdd({commit, state}, routine) {
			await idb.write({id: 'routines', value: {...state.routines, ...routine}});
			commit('IDB_ROUTINES');
		},
		async routinesDelete({commit, state}, routineId) {
			let routines = state.routines;
			delete routines[routineId];
			await idb.write({id: 'routines', value: routines});
			commit('IDB_ROUTINES');
		},
  },
  getters: {
		activities: state => state.activities,
		selectedDate: state => state.selectedDate,
		tasks: state => state.tasks,
		routines: state => state.routines,
		routinesList: state => {
			let r = [];
			Object.keys(state.routines).forEach(key => {
				let routine = state.routines[key];
				routine['id'] = key;
				r.push(routine);
			});
			return r;
		}
  }
})

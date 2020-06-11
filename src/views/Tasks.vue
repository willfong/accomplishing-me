<template>
  <div class="container">
    <h1 class="subtitle">Tasks</h1>
		<button class="button is-primary" @click="newModalActive = true">Add New Task</button>
		<div class="field">
			<b-checkbox v-model="showAllTasks">
				Show All
			</b-checkbox>
		</div>
		<div class="box" v-for="task in shownTasks" :key="task.id">
			<h1 class="subtitle">{{task.name}} <button class="button is-pulled-right" v-if="!task.completed" @click="completeTask(task.id)">Complete</button><span class="is-pulled-right has-text-grey-light" v-if="task.completed">Completed!</span></h1>
		</div>
		<p v-if="shownTasks.length == 0">No pending tasks! Do something with your life!</p>

		<b-modal :active.sync="newModalActive">
			<div class="box">
				<h1 class="title">Add New Task</h1>
				<hr />
				<b-field label="Task">
            <b-input v-model="newTaskName"></b-input>
        </b-field>
				<b-field label="Notes">
            <b-input maxlength="200" type="textarea" v-model="newTaskNotes"></b-input>
        </b-field>
				<div class="field is-grouped">
					<div class="control">
						<button class="button is-link" @click="submitNewTask">Submit</button>
					</div>
					<div class="control">
						<button class="button is-link is-light" @click="newModalActive = false">Cancel</button>
					</div>
				</div>
			</div>
		</b-modal>
		<hr />
		<p class="has-text-grey-light">{{tasks}}</p>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
	name: 'Tasks',
	computed: {
		...mapGetters([
		"tasks",
		]),
		shownTasks() {
			if (!this.tasks) return [];
			let shown = [];
			Object.keys(this.tasks).forEach(key => {
				let v = this.tasks[key];
				if (!this.showAllTasks && v.completed) return;
				v['id'] = key;
				shown.push(v);
			});
			return shown;
		},
	},
  components: {	
		
	},
	data() {
		return {
			newModalActive: false,
			newTaskName: null,
			newTaskNotes: null,
			showAllTasks: false,
		}
	},
	methods: {
		submitNewTask() {
			const currentTs = Date.now();
      let task = {};
      task[currentTs] = {name: this.newTaskName, notes: this.newTaskNotes, completed: false};
			this.$store.dispatch('tasksNew', task);
			this.newModalActive = false;
		},
		completeTask(id) {
			this.$store.dispatch('taskComplete', id);
		},
	},
	mounted() {
		this.$store.dispatch('tasksGet');
	}
}
</script>

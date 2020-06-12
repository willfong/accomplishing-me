<template>
  <div class="container">
    <h1 class="subtitle">Tasks</h1>
		<p>Tasks are one-time actions that you need to do. Focus on the urgent and important tasks first.</p>
		<p>For recurring tasks, please put them under routines.</p>
		<p>https://jamesclear.com/eisenhower-box</p>
		<button class="button is-primary" @click="newModalActive = true">Add New Task</button>
		<div class="field">
			<b-checkbox v-model="showAllTasks">
				Show All
			</b-checkbox>
		</div>
		<div class="field">
			<b-checkbox v-model="showLowPriority" :disabled="showAllTasks">
				Show Low Priority
			</b-checkbox>
		</div>
		<div class="notification" v-for="task in shownTasks" :key="task.id">
			<h1 class="subtitle">
				{{task.name}} 
				<b-tag type="is-danger" v-if="task.important">Important</b-tag>
				<b-tag type="is-warning" v-if="task.urgent">Urgent</b-tag>
				<button class="button is-pulled-right" v-if="!task.completed" @click="completeTask(task.id)">Complete</button>
				<span class="is-pulled-right has-text-grey-light" v-if="task.completed">Completed!</span>
			</h1>
		</div>
		<!--
		<div class="box" v-for="task in shownTasks" :key="task.id">
			<h1 class="subtitle">{{task.name}} <button class="button is-pulled-right" v-if="!task.completed" @click="completeTask(task.id)">Complete</button><span class="is-pulled-right has-text-grey-light" v-if="task.completed">Completed!</span></h1>
		</div>
		-->
		<p v-if="shownTasks.length == 0">No pending tasks! Do something with your life!</p>

		<b-modal :active.sync="newModalActive">
			<div class="box">
				<h1 class="title">Add New Task</h1>
				<hr />
				<div class="columns">
					<div class="column">
						<b-field label="Task">
								<b-input v-model="newTaskName"></b-input>
						</b-field>
						<div class="field is-grouped">
							<b-field>
									<div class="control">
											<b-switch v-model="newTaskImportant">Important?</b-switch>
									</div>
							</b-field>
							<b-field>
									<div class="control">
											<b-switch v-model="newTaskUrgent">Urgent?</b-switch>
									</div>
							</b-field>
						</div>
						<b-field label="Due Date">
								<b-datepicker
										placeholder="Optional"
										icon="calendar-today"
										v-model="newTaskDue"
										trap-focus>
								</b-datepicker>
						</b-field>
					</div>
					<div class="column">
						<b-field label="Notes">
								<b-input maxlength="2000" type="textarea" v-model="newTaskNotes" rows="6"></b-input>
						</b-field>
					</div>
				</div>
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
		<p class="has-text-grey-light">{{shownTasks}}</p>
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
			const allTasks = Object.keys(this.tasks).map(key => {
				let v = this.tasks[key];
				v['id'] = key;
				return v;
			});
			if (this.showAllTasks) return allTasks;
			if (this.showLowPriority) return allTasks.filter(task => !task.completed);
			return allTasks.filter(task => !task.completed && (task.urgent || task.important));
			/*
			let shown = [];
			Object.keys(this.tasks).forEach(key => {
				let v = this.tasks[key];
				if (!this.showAllTasks && v.completed) return;
				v['id'] = key;
				shown.push(v);
			});
			return shown;
			*/
		},
	},
  components: {	
		
	},
	data() {
		return {
			newModalActive: false,
			newTaskName: null,
			newTaskNotes: null,
			newTaskImportant: false,
			newTaskUrgent: false,
			newTaskDue: null,
			showAllTasks: false,
			showLowPriority: false,
		}
	},
	methods: {
		submitNewTask() {
			const currentTs = Date.now();
      let task = {};
      task[currentTs] = {name: this.newTaskName, notes: this.newTaskNotes, important: this.newTaskImportant, urgent: this.newTaskUrgent, due: this.newTaskDue, completed: false};
			this.$store.dispatch('tasksNew', task);
			this.newModalActive = false;
			this.newTaskName = null;
			this.newTaskNotes = null;
			this.newTaskImportant = false;
			this.newTaskUrgent = false;
			this.newTaskDue = null;
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

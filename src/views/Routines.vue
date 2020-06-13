<template>
  <div class="container">
    <h1 class="subtitle">Routines</h1>
		<div class="buttons">
			<b-button 
					class="button" 
					:class="{'is-primary': showWeekly}" 
					@click="showWeekly = true" icon-left="calendar-range">
					Weekly
			</b-button>
			<b-button 
					class="button" 
					:class="{'is-primary': !showWeekly}" 
					@click="showWeekly = false" icon-left="view-list">
					List
			</b-button>
      <b-button @click="newModalActive = true">Add Routine</b-button>
    </div>
		<RoutinesWeekly v-if="showWeekly" @edit-routine="editRoutine = $event" />
		<RoutinesList v-if="!showWeekly" @edit-routine="editRoutine = $event" />

		<b-modal :active.sync="newModalActive">
			<div class="box">
				<h1 class="title">Add New Routine</h1>
				<hr />

				<b-field label="Routine">
						<b-input v-model="newRoutineName"></b-input>
				</b-field>

        <div class="block">
            <b-checkbox v-model="newRoutineDays"
                native-value="d1">
                Monday
            </b-checkbox>
            <b-checkbox v-model="newRoutineDays"
                native-value="d2">
                Tuesday
            </b-checkbox>
            <b-checkbox v-model="newRoutineDays"
                native-value="d3">
                Wednesday
            </b-checkbox>
            <b-checkbox v-model="newRoutineDays"
                native-value="d4">
                Thursday
            </b-checkbox>
            <b-checkbox v-model="newRoutineDays"
                native-value="d5">
                Friday
            </b-checkbox>
            <b-checkbox v-model="newRoutineDays"
                native-value="d6">
                Saturday
            </b-checkbox>
            <b-checkbox v-model="newRoutineDays"
                native-value="d0">
                Sunday
            </b-checkbox>
        </div>
				<div class="field is-grouped">
					<b-field label="Repetitions">
						<b-input v-model="newRoutineReps" placeholder="optional"></b-input>
					</b-field>
					<b-checkbox v-model="newRoutineAddNote">
                Add note when completed
          </b-checkbox>
				</div>
				

				<div class="field is-grouped">
					<div class="control">
						<button class="button is-link" @click="submitRoutine">Add</button>
					</div>
					<div class="control">
						<button class="button is-link is-light" @click="newModalActive = false">Cancel</button>
					</div>
				</div>
			</div>
		</b-modal>
		<b-modal :active.sync="editModalActive">
			<div class="box">
				<h1 class="title">Edit Routine</h1>
				<hr />
				<div class="field">
            <b-switch v-model="newRoutineEnabled">
                {{ newRoutineEnabled ? 'This routine is enabled' : 'This routine is disabled' }}
            </b-switch>
        </div>
				<b-field label="Routine">
						<b-input v-model="newRoutineName"></b-input>
				</b-field>

        <div class="block">
            <b-checkbox v-model="newRoutineDays"
                native-value="d1">
                Monday
            </b-checkbox>
            <b-checkbox v-model="newRoutineDays"
                native-value="d2">
                Tuesday
            </b-checkbox>
            <b-checkbox v-model="newRoutineDays"
                native-value="d3">
                Wednesday
            </b-checkbox>
            <b-checkbox v-model="newRoutineDays"
                native-value="d4">
                Thursday
            </b-checkbox>
            <b-checkbox v-model="newRoutineDays"
                native-value="d5">
                Friday
            </b-checkbox>
            <b-checkbox v-model="newRoutineDays"
                native-value="d6">
                Saturday
            </b-checkbox>
            <b-checkbox v-model="newRoutineDays"
                native-value="d0">
                Sunday
            </b-checkbox>
        </div>

				<div class="field is-grouped">
					<b-field label="Repetitions">
						<b-input v-model="newRoutineReps" placeholder="optional"></b-input>
					</b-field>
					<b-checkbox v-model="newRoutineAddNote">
                Add note when completed
          </b-checkbox>
				</div>

				<div class="field is-grouped">
					<div class="control">
						<button class="button is-link" @click="submitRoutine">Update</button>
					</div>
					<div class="control">
						<button class="button is-link is-light" @click="editModalActive = false">Cancel</button>
					</div>
					<div class="control">
						<button class="button is-danger is-outlined" @click="deleteRoutine">Delete</button>
					</div>
				</div>
			</div>
		</b-modal>
		<!--
		<hr />
		<p class="has-text-grey-light">{{routines}}</p>
		<p class="has-text-grey-light">{{routinesList}}</p>
		<p>{{editRoutine}}</p>
		-->
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import RoutinesWeekly from "@/components/RoutinesWeekly.vue"
import RoutinesList from "@/components/RoutinesList.vue"

export default {
	name: 'Routines',
	computed: {
		...mapGetters([
		"selectedDate",
		"routines",
		"routinesList",
		]),
	},
	data() {
		return {
			showWeekly: false,
			newModalActive: false,
			newRoutineName: null,
			newRoutineDays: [],
			newRoutineReps: null,
			newRoutineAddNote: false,
			newRoutineEnabled: true,
			editRoutine: false,
			editModalActive: false,
		}
	},
  components: {	
    RoutinesWeekly, RoutinesList
	},
	watch: {
		editRoutine() {
			this.editModalActive = this.editRoutine ? true : false;
			if (this.editRoutine) {
				this.newRoutineName = this.routines[this.editRoutine].name;
				let days = []
				if (this.routines[this.editRoutine].d0) days.push('d0');
				if (this.routines[this.editRoutine].d1) days.push('d1');
				if (this.routines[this.editRoutine].d2) days.push('d2');
				if (this.routines[this.editRoutine].d3) days.push('d3');
				if (this.routines[this.editRoutine].d4) days.push('d4');
				if (this.routines[this.editRoutine].d5) days.push('d5');
				if (this.routines[this.editRoutine].d6) days.push('d6');
				this.newRoutineDays = days;
				this.newRoutineReps = this.routines[this.editRoutine].reps;
				this.newRoutineAddNote = this.routines[this.editRoutine].addNote;
			}
		},
		editModalActive() {
			if (!this.editModalActive) this.resetForm();
		},
		newModalActive() {
			if (!this.newModalActive) this.resetForm();
		},
	},
	methods: {
		submitRoutine() {
			let ts = 0;
			if (this.newModalActive) {
				ts = Date.now();
			} else {
				ts = this.editRoutine;
			}
			let routine = {}
			routine[ts] = {
				name: this.newRoutineName,
				d0: this.newRoutineDays.includes("d0"),
				d1: this.newRoutineDays.includes("d1"),
				d2: this.newRoutineDays.includes("d2"),
				d3: this.newRoutineDays.includes("d3"),
				d4: this.newRoutineDays.includes("d4"),
				d5: this.newRoutineDays.includes("d5"),
				d6: this.newRoutineDays.includes("d6"),
				reps: this.newRoutineReps,
				addNote: this.newRoutineAddNote,
				enabled: this.newRoutineEnabled,
			};
			this.$store.dispatch("routinesAdd", routine);
			this.resetForm();
		},
		deleteRoutine() {
			this.$store.dispatch("routinesDelete", this.editRoutine);
			this.resetForm();
		},
		resetForm() {
			this.newModalActive = false;
			this.newRoutineName = null;
			this.newRoutineDays = [];
			this.editRoutine = false;
			this.editModalActive = false;
		},
	},
	mounted() {
		this.$store.dispatch('routinesGet');
	}
}
</script>

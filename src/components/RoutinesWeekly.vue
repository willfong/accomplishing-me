<template>
  <div class="container">
		<div class="box">
			<div class="columns">
				<div class="column is-3">
					<h1 class="title">Monday</h1>
				</div>
				<div class="column">
					<RoutinesDetails v-for="routine in routines('d1')" :key="routine.id" :routine="routine" />
				</div>
			</div>
		</div>
		<div class="box">
			<div class="columns">
				<div class="column is-3">
					<h1 class="title">Tuesday</h1>
				</div>
				<div class="column">
					<RoutinesDetails v-for="routine in routines('d2')" :key="routine.id" :routine="routine" />
				</div>
			</div>
		</div>
		<div class="box">
			<div class="columns">
				<div class="column is-3">
					<h1 class="title">Wednesday</h1>
				</div>
				<div class="column">
					<RoutinesDetails v-for="routine in routines('d3')" :key="routine.id" :routine="routine" />
				</div>
			</div>
		</div>
		<div class="box">
			<div class="columns">
				<div class="column is-3">
					<h1 class="title">Thursday</h1>
				</div>
				<div class="column">
					<RoutinesDetails v-for="routine in routines('d4')" :key="routine.id" :routine="routine" />
				</div>
			</div>
		</div>
		<div class="box">
			<div class="columns">
				<div class="column is-3">
					<h1 class="title">Friday</h1>
				</div>
				<div class="column">
					<RoutinesDetails v-for="routine in routines('d5')" :key="routine.id" :routine="routine" />
				</div>
			</div>
		</div>
		<div class="box">
			<div class="columns">
				<div class="column is-3">
					<h1 class="title">Saturday</h1>
				</div>
				<div class="column">
					<RoutinesDetails v-for="routine in routines('d6')" :key="routine.id" :routine="routine" />
				</div>
			</div>
		</div>
		<div class="box">
			<div class="columns">
				<div class="column is-3">
					<h1 class="title">Sunday</h1>
				</div>
				<div class="column">
					<RoutinesDetails v-for="routine in routines('d0')" :key="routine.id" :routine="routine" />
				</div>
			</div>
		</div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import RoutinesDetails from "@/components/RoutinesDetails.vue"

export default {
	name: 'RoutinesWeekly',
	computed: {
		...mapGetters([
		"routinesList",
		]),
	},
	methods: {
		routines(day) {
			return this.routinesList.filter(routine => routine[day]);
		},
	},
	components: {
		RoutinesDetails
	},

}
</script>

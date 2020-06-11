<template>
  <div class="container">
    <h1 class="subtitle">
			<button class="button is-info-light" @click="changeDay('-1')">
				<b-icon icon="arrow-left"></b-icon>
			</button>
			{{moment(selectedDate).format('MMMM Do YYYY')}}
			<button class="button is-info-light" @click="changeDay('+1')">
				<b-icon icon="arrow-right"></b-icon>
			</button>
		</h1>
    <div class="columns">
      <div class="column">
        <TodaysTasks />
      </div>
      <div class="column">
        <TodaysActivity />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import TodaysTasks from '@/components/TodaysTasks.vue'
import TodaysActivity from '@/components/TodaysActivity.vue'

export default {
	name: 'Today',
	computed: {
		...mapGetters([
		"selectedDate",
		])
	},
  components: {	
    TodaysTasks, TodaysActivity
	},
	methods: {
		datePicker() {
			console.log("Picked!");
		},
		changeDay(amount) {
			let newDay = this.moment(this.selectedDate).add(amount, 'days');
			this.$store.dispatch('updateSelectedDate', newDay);
		}
	}
}
</script>

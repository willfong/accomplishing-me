<template>
  <div class="container">
    <h1 class="subtitle">{{moment().format('MMMM Do YYYY')}}</h1>
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
import TodaysTasks from '@/components/TodaysTasks.vue'
import TodaysActivity from '@/components/TodaysActivity.vue'

export default {
  name: 'Today',
  components: {	
    TodaysTasks, TodaysActivity
  }
}
</script>

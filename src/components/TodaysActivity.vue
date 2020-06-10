<template>
  <div>
    <p>Today's Activity</p>
    <div class="field has-addons">
        <div class="control">
            <input class="input" type="text" v-model="newActivity" placeholder="New Activity">
        </div>
        <div class="control">
            <a class="button is-info" @click="addNewActivity">Add</a>
        </div>
    </div>
    <ul>
        <li v-for="ts in Object.keys(activities)" :key="ts">{{activities[ts]}} <small>{{ts}}</small></li>
    </ul>
    <hr />
    <p class="has-text-grey-light">New Activity: {{newActivity}}</p>
    <p class="has-text-grey-light">Activities: {{activities}}</p>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
    name: 'TodaysActivity',
    computed: {
        ...mapGetters([
        "activities",
        ])
    },
    data() {
        return {
            newActivity: null,
        }
  },
  methods: {
    addNewActivity() {
        console.log(`Adding new activity: ${this.newActivity}`);
        const currentTs = Math.floor(Date.now() / 1000)
        let activity = {};
        activity[currentTs] = this.newActivity;
        this.$store.dispatch('activitiesNew', activity);
        this.newActivity = null;
    }
  },
}
</script>

<template>
  <div>
    <h1 class="subtitle">Today's Activity</h1>
    <div class="field has-addons">
        <div class="control is-expanded">
            <input class="input" type="text" ref="newActivity" v-model="newActivity" placeholder="New Activity" v-on:keyup.enter="addNewActivity">
        </div>
        <div class="control">
            <a class="button is-info" @click="addNewActivity">Add</a>
        </div>
    </div>
    <ul>
        <li v-for="ts in Object.keys(activities)" :key="ts">{{activities[ts]}} <small class="is-pulled-right">{{moment(parseInt(ts, 10)).fromNow()}}</small></li>
    </ul>
    <!--
    <hr />
    <p class="has-text-grey-light">New Activity: {{newActivity}}</p>
    <p class="has-text-grey-light">Activities: {{activities}}</p>
    -->
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
        const currentTs = Date.now();
        let activity = {};
        activity[currentTs] = this.newActivity;
        this.$store.dispatch('activitiesNew', activity);
        this.newActivity = null;
    }
  },
  mounted() {
    this.$store.dispatch('activitiesGet');
    this.$nextTick(() => this.$refs.newActivity.focus())
  }
}
</script>

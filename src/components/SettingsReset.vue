<template>
  <div class="box">
    <h1 class="subtitle is-4">Reset All</h1>
    <p class="has-text-danger has-text-weight-bold">This will delete all your data!</p>
    <button class="button is-danger" @click="reset">DELETE ALL DATA</button>
  </div>
</template>

<script>
export default {
	name: 'SettingsReset',
  methods: {
    reset() {
			this.$store.dispatch('deleteAllData');
			this.$router.push("/");
    }
  },
}
</script>

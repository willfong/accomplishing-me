<template>
  <div class="container">
		<div class="notification">{{routine.name}}</div>
  </div>
</template>

<script>
export default {
	name: 'RoutinesDetails',
	props: ["routine"]

}
</script>

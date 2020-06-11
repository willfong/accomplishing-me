<template>
  <div id="app">
    <nav class="level">
      <p class="level-item has-text-centered">
        <span class="title">Accomplishing Me</span>
      </p>
      <p class="level-item has-text-centered">
        <router-link to="/" class="link is-info">Today</router-link>
      </p>
      <p class="level-item has-text-centered">
        <router-link to="/tasks" class="link is-info">Tasks</router-link>
      </p>
      <p class="level-item has-text-centered">
        <router-link to="/settings" class="link is-info">Settings</router-link>
      </p>
    </nav>
    <router-view/>
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>

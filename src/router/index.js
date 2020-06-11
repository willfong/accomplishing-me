import Vue from 'vue'
import VueRouter from 'vue-router'
import Today from '@/views/Today.vue'
import Settings from '@/views/Settings.vue'
import Tasks from '@/views/Tasks.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Today',
    component: Today
  },
  {
    path: '/settings',
    name: 'Settings',
    component: Settings
	},
  {
    path: '/tasks',
    name: 'Tasks',
    component: Tasks
  },
]

const router = new VueRouter({
  routes
})

export default router

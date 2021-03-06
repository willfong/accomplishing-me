import Vue from 'vue'
import VueRouter from 'vue-router'
import Today from '@/views/Today.vue'
import Settings from '@/views/Settings.vue'
import Tasks from '@/views/Tasks.vue'
import Routines from '@/views/Routines.vue'
import Goals from '@/views/Goals.vue'
import Projects from '@/views/Projects.vue'
import Cv from '@/views/Cv.vue'

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
	{
    path: '/goals',
    name: 'Goals',
    component: Goals
	},
  {
    path: '/routines',
    name: 'Routines',
    component: Routines
	},
	{
    path: '/cv',
    name: 'Cv',
    component: Cv
	},
  {
    path: '/projects',
    name: 'Projects',
    component: Projects
  },
]

const router = new VueRouter({
  routes
})

export default router

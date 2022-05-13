import { createRouter, createWebHashHistory } from 'vue-router'

// Components
import Home from '../pages/Home/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
import { createRouter, createWebHashHistory } from 'vue-router'

// Components
import Home from '../pages/Home/Home.vue'
import MintPage from '../pages/Mint/MintPage.vue'
import ProfilePage from '../pages/Profile/ProfilePage.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  }, {
    path: '/mint',
    name: 'MintPage',
    component: MintPage
  }, {
    path: '/profile',
    name: 'ProfilePage',
    component: ProfilePage
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
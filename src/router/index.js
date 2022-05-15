import { createRouter, createWebHashHistory } from 'vue-router'

// Components
import Home from '../pages/Home/Home.vue'
import MintPage from '../pages/Mint/MintPage.vue'
import UserPage from '../pages/UserPage/UserPage.vue'
import ProfilePage from '../pages/UserPage/Profile/ProfilePage.vue'
import SettingPage from '../pages/UserPage/Setting/SettingPage.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/mint',
    name: 'MintPage',
    component: MintPage
  },
  {
    path: '/user/:id',
    name: 'UserPage',
    component: UserPage,
    children: [
      {
        path: 'profile',
        name: 'ProfilePage',
        component: ProfilePage
      },
      {
        path: 'setting',
        name: 'SettingPage',
        component: SettingPage
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router

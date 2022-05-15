import { createRouter, createWebHashHistory } from 'vue-router'

// Components
import Home from '../pages/home/Home.vue'
import MintProcessPage from '../pages/mint-process/MintProcessPage.vue'
import UserPage from '../pages/user/UserPage.vue'
import ProfilePage from '../pages/user/profile/ProfilePage.vue'
import SettingPage from '../pages/user/setting/SettingPage.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/mint',
    name: 'MintProcessPage',
    component: MintProcessPage,
    children: [
      {
        path: 'choose-avatar',
        name: 'ChooseAvatarPage',
        component: ProfilePage
      },
      {
        path: 'enter-info',
        name: 'ChooseAvatarPage',
        component: ProfilePage
      },
      {
        path: 'mint',
        name: 'ChooseAvatarPage',
        component: ProfilePage
      }
    ]
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

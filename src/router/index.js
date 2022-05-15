import { createRouter, createWebHashHistory } from 'vue-router'

// Components
import Home from '../pages/home/Home.vue'
import MintProcessPage from '../pages/mint-process/MintProcessPage.vue'
import ChooseAvatarPage from '../pages/mint-process/choose-avatar/ChooseAvatarPage.vue'
import EnterInfoPage from '../pages/mint-process/enter-info/EnterInfoPage.vue'
import MintPage from '../pages/mint-process/mint/MintPage.vue'
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
    path: '/mint-process',
    name: 'MintProcessPage',
    component: MintProcessPage,
    children: [
      {
        path: '',
        redirect: '/mint-process/choose-avatar'
      },
      {
        path: 'choose-avatar',
        name: 'ChooseAvatarPage',
        component: ChooseAvatarPage
      },
      {
        path: 'enter-info',
        name: 'EnterInfoPage',
        component: EnterInfoPage
      },
      {
        path: 'mint',
        name: 'MintPage',
        component: MintPage
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

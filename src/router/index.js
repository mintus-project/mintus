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
import UploadAvatarPage from '../pages/upload-avatar/UploadAvatarPage.vue'

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
    path: '/',
    name: 'UserPage',
    component: UserPage,
    children: [
      {
        path: '/profile/:address',
        name: 'ProfilePage',
        component: ProfilePage
      },
      {
        path: '/setting/:address',
        name: 'SettingPage',
        component: SettingPage
      }
    ]
  },
  {
    path: '/upload-avatar',
    name: 'UploadAvatarPage',
    component: UploadAvatarPage
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})
router.beforeEach(async (to) => {
  console.log(to)
  const toProfile = to.path.split('/').includes('profile')
  const toSetting = to.path.split('/').includes('setting')
  const address = to.params.address
  if (toProfile) {
    // address是否买过nft
    return true
  }
  if (toSetting) {
    // address是否买过nft(暂时默认true)
    // 访问的是否是当前连接钱包地址对应的setting
    if (window.ethereum) {
      const { ethereum } = window
      if (ethereum) {
        // 如果已授权会返回钱包地址
        try {
          const accounts = await ethereum.request({ method: 'eth_accounts' })
          if (accounts.length !== 0) {
            return address.toLowerCase() === accounts[0].toLowerCase()
              ? true
              : { name: 'Home' }
          } else {
            return { name: 'Home' }
          }
        } catch (error) {
          console.error(error)
        }
      }
      return { name: 'Home' }
    }
  }
})
export default router

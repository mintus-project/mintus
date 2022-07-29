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
import contract from '@/services/contract'

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

// 守卫
router.beforeEach(async (to, from) => {
  const address = to.params.address
  //TODO: 错误页面
  // if(!checkChain())
  //   return { name: 'Home' }
  if (to.path.split('/').includes('profile')) {
    // 访问的地址是否购买过nft
    //TODO:请求等待页面
    const { avatarString } = await contract.getRecord(address)
    if (avatarString) {
      return true //这时候Pinia还没有create，所以不能设置profileInfo
    } else {
      return { name: 'Home' }
    }
  } else if (to.path.split('/').includes('setting')) {
    // 访问的是不是当前连接钱包地址对应的setting
    if (window.ethereum) {
      const { ethereum } = window
      if (ethereum) {
        // 如果已授权会返回钱包地址
        try {
          const accounts = await ethereum.request({ method: 'eth_accounts' })
          if (accounts.length !== 0) {
            return address.toLowerCase() === accounts[0].toLowerCase()
          } else {
            return false
          }
        } catch (error) {
          console.error(error)
        }
      }
      return { name: 'Home' }
    }
  } else if (to.path === '/mint-process/enter-info') {
    if (
      from.path === '/mint-process/choose-avatar' ||
      from.path === '/mint-process/mint'
    ) {
      return true
    } else {
      return { path: '/mint-process/choose-avatar' }
    }
  } else if (to.path === '/mint-process/mint') {
    if (from.path === '/mint-process/enter-info') {
      return true
    } else {
      return { path: '/mint-process/choose-avatar' }
    }
  }
})

router.afterEach((to, from) => {
  const isFromChooseAvatarToEnterInfo =
    from.path === '/mint-process/choose-avatar' &&
    to.path === '/mint-process/enter-info'
  const isFromEnterInfoToMint =
    from.path === '/mint-process/enter-info' && to.path === '/mint-process/mint'
  const isFromEnterInfoToChooseAvatar =
    from.path === '/mint-process/enter-info' &&
    to.path === '/mint-process/choose-avatar'
  const isFromMintToEnterInfo =
    from.path === '/mint-process/mint' && to.path === '/mint-process/enter-info'

  if (isFromChooseAvatarToEnterInfo || isFromEnterInfoToMint) {
    to.meta.transitionName = 'slide-left'
  } else if (isFromEnterInfoToChooseAvatar || isFromMintToEnterInfo) {
    to.meta.transitionName = 'slide-right'
  }
})

export default router

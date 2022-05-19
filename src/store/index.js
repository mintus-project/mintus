import { defineStore } from 'pinia'
// import { useStorage } from '@vueuse/core'

export const useStore = defineStore('main', {
  state: () => {
    return {
      walletInfo: {
        type: '',
        address: ''
      },
      userInfo: {
        connected: false,
        purchase: false
      }
    }
  },
  getters: {
    addressHidden(state) {
      // return `${state.walletInfo.address.slice(0, 6)}...${state.walletInfo.address.slice(-4)}`
      const addr = state.walletInfo.address.toString()
      return `${addr.slice(0, 6)}...${addr.slice(-4)}`
    }
  },
  actions: {
    //
  }
})

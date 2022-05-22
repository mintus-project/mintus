import { defineStore } from 'pinia'
import abi from '@/utils/Contract.json'

export const useStore = defineStore('main', {
  state: () => {
    return {
      walletInfo: {
        type: '',
        address: ''
      },
      userInfo: {
        connected: false,
        purchased: false
      },
      contractInfo: {
        address: '0x5fbdb2315678afecb367f032d93f642f64180aa3',
        abi: abi.abi
      }
    }
  },
  getters: {
    getShortAddress(state) {
      // return `${state.walletInfo.address.slice(0, 6)}...${state.walletInfo.address.slice(-4)}`
      const addr = state.walletInfo.address.toString()
      return `${addr.slice(0, 6)}...${addr.slice(-4)}`
    }
  },
  actions: {
    //
  }
})

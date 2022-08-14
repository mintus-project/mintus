import { defineStore } from 'pinia'
import { getChainInfoByChainId } from '@/services/utils'

export const useStore = defineStore('main', {
  state: () => {
    return {
      chainInfo: {
        chainId: '',
        currencySymbol: 'unknown'
      },
      walletInfo: {
        type: '',
        address: ''
      },
      userInfo: {
        connected: false,
        purchased: false,
        avatarString: ''
      },
      mintInfo: {
        avatarString: '',
        avatarConfig: [0, 0, 0, 0, 0, 0, 0],
        avatarBase64: '',
        canvas: {},
        username: '',
        domains: [],
        addresses: [],
        payAddress: ''
      },
      profileInfo: {
        avatarString: '',
        avatarConfig: [],
        username: '',
        domains: ['ddddd', 'bbbbbb'],
        addresses: []
      }
    }
  },
  getters: {
    getShortAddress(state) {
      const addr = state.walletInfo.address.toString()
      return `${addr.slice(0, 6)}...${addr.slice(-4)}`
    }
  },
  actions: {
    setUserInfo(newUserInfo) {
      this.userInfo = {...this.userInfo, ...newUserInfo}
    },
    setWalletInfo(newWalletInfo) {
      this.walletInfo = {...this.walletInfo, ...newWalletInfo}
    },
    async setChainInfo(id) {
      if (id) {
        this.chainInfo.chainId = Number.parseInt(id)
        const currentChain = await getChainInfoByChainId(this.chainInfo.chainId)
        this.chainInfo.currencySymbol = currentChain.nativeCurrency.symbol 
      }
    }
  }
})

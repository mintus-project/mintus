import { defineStore } from 'pinia'
import detectEthereumProvider from '@metamask/detect-provider'
import { getChainInfoByChainId } from '@/services/utils'
import { updateContract } from '@/services/contract'

export const useStore = defineStore('main', {
  state: () => {
    return {
      chainInfo: {
        chainId: '',
        currencySymbol: ''
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
        domains: [],
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
    // 在App.vue中调用
    async initWalletInfo() {
      const { ethereum } = window
      if (ethereum) {
        // 如果已经启用了Metamask
        try {
          await ethereum.request({ method: 'eth_accounts' })
          ethereum.on('accountsChanged', this.updateWalletChainContract)
          ethereum.on('chainChanged', this.updateWalletChainContract)
        } catch (error) {
          console.error(error)
        }
      }
    },
    async connectMetaMask() {
      try {
        const provider = await detectEthereumProvider()
        if (provider) {
          if (provider === window.ethereum) {
            const { ethereum } = window
            ethereum
              // 先取消之前的授权
              .request({
                method: 'wallet_requestPermissions',
                params: [
                  {
                    eth_accounts: {}
                  }
                ]
              })
              // 再重新询问用户是否授权登录
              .then(() =>
                ethereum.request({
                  method: 'eth_requestAccounts'
                })
              )
              .then(this.updateWalletChainContract)
              .catch((err) => {
                if (err.code === 4001) {
                  // EIP-1193 userRejectedRequest error
                  // If this happens, the user rejected the connection request.
                  throw new Error('Please connect to MetaMask.')
                } else {
                  throw err
                }
              })
          } else {
            throw new Error('Do you have multiple wallets installed?')
          }
        } else {
          throw new Error('Please install MetaMask!')
        }
      } catch (err) {
        throw new Error(err)
      }
    },
    async updateWalletChainContract() {
      const { ethereum } = window
      // 先更新Contract实例（将其绑定到新账户对应的Signer）
      await updateContract()
      if (ethereum.selectedAddress !== null) {
        this.walletInfo.address = ethereum.selectedAddress
        this.walletInfo.type = 'metamask'  
        this.userInfo.connected = true
      } else {
        this.userInfo.connected = false
      }
      // 更新chain信息
      this.chainInfo.chainId = Number.parseInt(ethereum.chainId)
      const chainInfo = await getChainInfoByChainId(this.chainInfo.chainId)
      this.chainInfo.currencySymbol = chainInfo.nativeCurrency.symbol
    }
  }
})

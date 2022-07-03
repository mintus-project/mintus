import { defineStore } from 'pinia'
import detectEthereumProvider from '@metamask/detect-provider'
import { getChainInfoByChainId } from '@/services'

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
        // 如果已授权会返回钱包地址
        try {
          await ethereum.request({ method: 'eth_accounts' })
          ethereum.on('accountsChanged', async (accounts) => {
            console.log('accountsChanged', accounts)
            if (accounts.length !== 0) {
              await this.setWalletAndChain(accounts)
              this.userInfo.connected = true
            } else {
              this.userInfo.connected = false
            }
          })
          ethereum.on('chainChanged', async (chainId) => {
            this.chainInfo.chainId = chainId
            const chainInfo = await getChainInfoByChainId(
              Number.parseInt(chainId)
            )
            this.chainInfo.currencySymbol = chainInfo.nativeCurrency.symbol
          })
        } catch (error) {
          console.error(error)
        }
      } else {
        console.log('Please install Metamask or other wallets!')
      }
    },
    async connectMetaMask() {
      try {
        const provider = await detectEthereumProvider()
        if (provider) {
          if (provider == window.ethereum) {
            const { ethereum } = window
            // 询问用户是否授权当前网站获取钱包地址
            ethereum
              .request({
                method: 'wallet_requestPermissions',
                params: [
                  {
                    eth_accounts: {}
                  }
                ]
              })
              .then(() =>
                ethereum.request({
                  method: 'eth_requestAccounts'
                })
              )
              .then(async (accounts) => {
                await this.setWalletAndChain(accounts)
                this.userInfo.connected = true
              })
              .catch((err) => {
                if (err.code === 4001) {
                  // EIP-1193 userRejectedRequest error
                  // If this happens, the user rejected the connection request.
                  console.log('Please connect to MetaMask.')
                } else {
                  console.error(err)
                }
              })
          } else {
            console.error('Do you have multiple wallets installed?')
          }
        } else {
          console.log('Please install MetaMask!')
        }
      } catch (err) {
        console.error(err)
      }
    },
    async setWalletAndChain(accounts) {
      const { ethereum } = window
      this.walletInfo.address = accounts[0]
      this.walletInfo.type = 'metamask'
      this.chainInfo.chainId = Number.parseInt(ethereum.chainId)
      const chainInfo = await getChainInfoByChainId(this.chainInfo.chainId)
      this.chainInfo.currencySymbol = chainInfo.nativeCurrency.symbol
    }
  }
})

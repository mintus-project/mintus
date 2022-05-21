<template>
  <div class="w-full" @click="state.openModal = true">
    <slot></slot>
  </div>
  <MUModal
    v-if="state.openModal"
    :open="state.openModal"
    close-icon
    @close="handleClose"
  >
    <template #header>
      <h2>Connect to Your Wallet</h2>
    </template>
    <template #content>
      <div class="flex flex-col items-stretch gap-2">
        <MUWalletButton
          v-for="(type, index) in walletList"
          :key="index"
          @click="handleConnect(type)"
        >
          <MUWalletType show-name :type="type" />
          <Icon icon="material-symbols:arrow-forward-ios-rounded" />
        </MUWalletButton>
      </div>
    </template>
  </MUModal>
</template>

<script setup>
  import { reactive } from 'vue'
  import { useStore } from '@/store/index.js'
  import MUModal from '@/components/feedback/MUModal.vue'
  import MUWalletType from '../common/MUWalletType.vue'
  import { Icon } from '@iconify/vue'
  import detectEthereumProvider from '@metamask/detect-provider'
  import MUWalletButton from '../common/MUWalletButton.vue'

  const store = useStore()
  const state = reactive({ openModal: false })
  const walletList = ['metamask', 'coinbase', 'fortmatic']

  const handleClose = () => {
    state.openModal = false
  }

  const handleConnect = (type) => {
    switch (type) {
      case 'metamask':
        connectMetaMask()
        break
      case 'coinbase':
        conncetCoinbase()
        break
      case 'formatic':
        conncetFormatic()
        break
      default:
        break
    }
    handleClose()
  }
  const connectMetaMask = async () => {
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
            .then((accounts) => {
              handleAccountsChanged(accounts)
              ethereum.on('accountsChanged', handleAccountsChanged)
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
  }
  const conncetCoinbase = () => {}
  const conncetFormatic = () => {}

  const handleAccountsChanged = (accounts) => {
    if (accounts.length === 0) {
      // MetaMask is locked or the user has not connected any accounts
      console.log('Please connect to MetaMask.')
    } else if (accounts[0] !== store.walletInfo.address) {
      console.log('found accounts with addresses', accounts)
      store.walletInfo.address = accounts[0]
      store.userInfo.connected = true
      store.walletInfo.type = 'metamask'
    }
  }
</script>
<style scoped></style>

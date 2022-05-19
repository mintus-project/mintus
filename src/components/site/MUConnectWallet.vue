<template>
  <div @click="state.openModal = true">
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
        <button
          v-for="(type, index) in walletList"
          :key="index"
          class="btn gap-2"
          @click="handleConnect(type)"
        >
          <MUWalletType show-name :type="type" />
          <Icon icon="material-symbols:arrow-forward-ios-rounded" />
        </button>
      </div>
    </template>
  </MUModal>
</template>

<script setup>
  import { defineProps, reactive } from 'vue'
  import { useStore } from '@/store/index.js'
  import MUButton from '../common/MUButton.vue'
  // import MUModal from '../feedback/MUModal.vue'
  import MUModal from '@/components/feedback/MUModal.vue'
  import MUWalletType from '../common/MUWalletType.vue'
  import { Icon } from '@iconify/vue'
  // import {ethers} from 'ethers'

  const props = defineProps({
    btnType: String
  })
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
      // 由Metamask植入
      const { ethereum } = window
      if (ethereum) {
        console.log('metamask is available')
      } else {
        alert('please install metamask')
      }
      // 询问用户是否授权当前网站获取钱包地址
      const accounts = await ethereum.request({
        method: 'eth_requestAccounts'
      })
      // 调用metamask的eth-accounts API，如果已授权会返回钱包地址
      const ethAccounts = await ethereum.request({ method: 'eth_accounts' })
      if (ethAccounts.length !== 0) {
        const account = accounts[0]
        console.log('found account with address', account)
        store.walletInfo.address = accounts[0]
        // TODO: 容易出错，better way is 用全局常量 or 枚举值
        store.walletInfo.type = 'metamask'
        store.userInfo.connected = true
      } else {
        console.log('no authorized account')
      }
    } catch (err) {
      console.error(err)
    }
  }
  const conncetCoinbase = () => {}
  const conncetFormatic = () => {}
</script>
<style scoped></style>

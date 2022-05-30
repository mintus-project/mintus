<template>
  <div class="w-full" @click="state.openModal = true">
    <slot></slot>
  </div>
  <MUModal v-if="state.openModal" close-icon @close="handleClose">
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
  // import detectEthereumProvider from '@metamask/detect-provider'
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
        store.connectMetaMask()
        break
      case 'coinbase':
        connectCoinbase()
        break
      case 'formatic':
        connectFormatic()
        break
      default:
        break
    }
    handleClose()
  }
  const connectCoinbase = () => {}
  const connectFormatic = () => {}
</script>
<style scoped></style>

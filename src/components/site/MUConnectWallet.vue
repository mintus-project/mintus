<template>
  <div class="w-full" @click="handleClick">
    <slot></slot>
  </div>
  <MUModal v-if="openModal" close-icon @close="handleClose">
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
  import { ref } from 'vue'
  import { useStore } from '@/store/index.js'
  import MUModal from '@/components/feedback/MUModal.vue'
  import MUWalletType from '../common/MUWalletType.vue'
  import { Icon } from '@iconify/vue'
  import MUWalletButton from '../common/MUWalletButton.vue'
  import { useMessage } from 'naive-ui'
  import { MSG_DURATION } from '@/utils/constant'

  const message = useMessage()
  const store = useStore()
  const openModal = ref(false)
  const walletList = ['metamask', 'coinbase', 'fortmatic']

  const handleClick = () => {
    openModal.value = true
  }
  const handleClose = () => {
    openModal.value = false
  }

  const handleConnect = (type) => {
    try {
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
    } catch (e) {
      message.error(e.message, { duration: MSG_DURATION })
    }
    handleClose()
  }
  const connectCoinbase = () => {}
  const connectFormatic = () => {}
</script>
<style scoped></style>

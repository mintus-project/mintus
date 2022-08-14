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
  import MUModal from '@/components/feedback/MUModal.vue'
  import MUWalletType from '../common/MUWalletType.vue'
  import { Icon } from '@iconify/vue'
  import MUWalletButton from '../common/MUWalletButton.vue'
  import { useMessage } from 'naive-ui'
  import { MSG_DURATION } from '@/utils/constant'
  import { detectProviders, connectWallet } from '@/services/wallet'

  const message = useMessage()
  const openModal = ref(false)
  const walletList = Object.keys(detectProviders()).map((e) => e.toLowerCase())

  const handleClick = () => {
    openModal.value = true
  }
  const handleClose = () => {
    openModal.value = false
  }

  const handleConnect = async (type) => {
    try {
      // [['MetaMask', Web3Provider],['Coinbase', Web3Provider],['Binance', Web3Provider]]
      const providerList = Object.entries(detectProviders())
      window.selectedProvider = providerList.filter(
        // type: 'metamask'
        // entry: ['MetaMask', Web3Provider]
        (entry) => entry[0].toLowerCase() === type
      )[0][1]

      // store.walletInfo.type = type
      await connectWallet()
      handleClose()
    } catch (e) {
      message.error(e.message, { duration: MSG_DURATION })
      console.error(e.message)
    }
  }
</script>
<style scoped></style>

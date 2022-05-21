<template>
  <div class="flex flex-col gap-2 text-sm">
    <div v-if="props.label" class="font-bold">
      {{ props.label }}
      <span v-if="props.required" class="text-pink-500">*</span>
    </div>
    <div class="flex justify-between items-center gap-2">
      <MUConnectWallet v-if="!store.userInfo.connected">
        <MUButton class="full-btn" btn-type="outline">Connect wallet</MUButton>
      </MUConnectWallet>
      <div
        v-else
        class="font-bold text-[#727272] w-full flex items-center justify-between gap-5"
      >
        <MUWalletType :type="store.walletInfo.type" show-name />
        <MUWalletAddr :addr="store.walletInfo.address" show-badge />
        <MUConnectWallet>
          <MUButton class="full-btn" btn-type="outline">Change</MUButton>
        </MUConnectWallet>
      </div>
      <!-- <MUAccount class="" :class="{ invalid: errorMessage }" /> -->
    </div>
    <span
      v-if="props.showErrorMessage"
      class="text-pink-500 text-xs mt-[-.25rem]"
      >Please connect your wallet</span
    >
  </div>
</template>

<script setup>
  import { defineProps } from 'vue'
  import { useStore } from '@/store'
  import MUConnectWallet from '../site/MUConnectWallet.vue'
  import MUButton from '../common/MUButton.vue'
  import MUWalletType from '../common/MUWalletType.vue'
  import MUWalletAddr from '../common/MUWalletAddr.vue'
  const props = defineProps({
    disabled: Boolean,
    required: Boolean,
    showErrorMessage: Boolean,
    label: {
      type: String
    }
  })
  const store = useStore()
</script>

<style scoped>
  .full-btn {
    @apply px-4 w-full;
  }
</style>

<template>
  <div v-if="!store.userInfo.connected">
    <MUConnectWallet>
      <MUButton>Connect Wallet</MUButton>
    </MUConnectWallet>
  </div>
  <div v-else class="flex items-center gap-8">
    <div v-if="store.userInfo.purchased" class="avatar">
      <div class="w-[2.875rem] h-[2.875rem] rounded-full">
        <img :src="nftSrc" />
      </div>
    </div>
    <div class="flex items-center gap-5">
      <MUCoin :type="coinType" show-name />
      <MUWalletDropdown />
    </div>
  </div>
</template>

<script setup>
  import { useStore } from '@/store/index.js'
  import MUCoin from '../common/MUCoin.vue'
  import MUWalletDropdown from '../site/MUWalletDropdown.vue'
  import MUConnectWallet from './MUConnectWallet.vue'
  import MUButton from '../common/MUButton.vue'

  const store = useStore()

  //TODO: 获取逻辑
  const nftSrc = 'https://api.lorem.space/image/face?hash=92310'
  const coinType = 'eth'
</script>

<style scoped></style>

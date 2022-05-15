<template>
  <MUButton v-if="!props.connected" btn-type="default">Connect Wallet</MUButton>
  <div v-else class="flex items-center gap-8">
    <div v-if="props.purchased" class="avatar">
      <div class="w-[2.875rem] h-[2.875rem] rounded-full">
        <img :src="nftSrc" />
      </div>
    </div>
    <div class="flex items-center gap-5">
      <MUCoin :type="coinType" show-name />
      <MUWalletAddr :addr="walletAddr"></MUWalletAddr>
    </div>
  </div>
</template>

<script setup>
  import { defineProps } from 'vue'
  import MUButton from '../common/MUButton.vue'
  import MUCoin from '../common/MUCoin.vue'
  import MUWalletAddr from '../common/MUWalletAddr.vue'

  const props = defineProps({
    connected: Boolean,
    purchased: Boolean
  })
  //TODO: 获取逻辑
  const nftSrc = 'https://api.lorem.space/image/face?hash=92310'
  const walletAddr = '0xd83039Ff4B0D7022281769eDb509b32F6c390867'
  const coinType = 'eth'
</script>

<style scoped></style>

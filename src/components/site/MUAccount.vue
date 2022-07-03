<template>
  <div v-if="!store.userInfo.connected">
    <MUConnectWallet>
      <MUButton>Connect Wallet</MUButton>
    </MUConnectWallet>
  </div>
  <div v-else class="flex items-center gap-8">
    <div v-if="store.userInfo.purchased" class="avatar">
      <div class="w-[2.875rem] h-[2.875rem] rounded-full">
        <canvas ref="canvas"></canvas>
      </div>
    </div>
    <div class="flex items-center gap-5">
      <MUCoin :type="store.chainInfo.currencySymbol.toLowerCase()" show-name />
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
  import { ref, watchEffect } from 'vue'
  import { getRecord } from '@/services'
  import {
    drawAvatar,
    fromAvatarStringToAvatarConfig
  } from '@/utils/generateAvatar'
  import { useMessage } from 'naive-ui'
  import { MSG_DURATION } from '@/utils/constant'

  const message = useMessage()
  const canvas = ref(null)

  const store = useStore()
  watchEffect(async () => {
    try {
      if (store.userInfo.connected) {
        const res = await getRecord(store.walletInfo.address)
        // 如果用户有购买过我们的 nft 头像
        if (res?.avatarString) {
          store.userInfo.avatarString = res?.avatarString
          store.userInfo.purchased = true
          drawAvatar(
            canvas,
            fromAvatarStringToAvatarConfig(store.userInfo.avatarString),
            46
          )
        } else {
          store.userInfo.avatarString = ''
          store.userInfo.purchased = false
        }
      }
    } catch (e) {
      message.error(e.message, { duration: MSG_DURATION })
    }
  })
</script>

<style scoped></style>

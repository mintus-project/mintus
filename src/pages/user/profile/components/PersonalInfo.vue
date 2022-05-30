<template>
  <div class="flex flex-col items-center gap-6">
    <div class="avatar">
      <div class="w-[12.5rem] rounded-2xl border-4 border-white shadow-lg">
        <canvas ref="canvas"></canvas>
      </div>
    </div>
    <span class="font-bold text-3xl">{{ store.profileInfo.username }}</span>
    <!-- <span>wallet address</span> -->
    <div class="flex border border-gray-200 rounded-full py-2 px-4 gap-2">
      <MUCoin type="eth" />
      <MUWalletAddr
        class="text-sm text-[#727272]"
        :addr="$route.params.address"
      />
    </div>
    <div class="flex gap-4">
      <MUIconButton
        v-if="isOwnerRef"
        @click="$router.push(`/setting/${store.walletInfo.address}`)"
      >
        <template #icon
          ><Icon height="16" icon="material-symbols:settings-outline-rounded"
        /></template>
        <template #default>Setting</template>
      </MUIconButton>
      <MUButton @click="handleDownloadAvatar">Download Avatar</MUButton>
    </div>
  </div>
</template>

<script setup>
  import { computed, ref, watchEffect } from 'vue'
  import MUIconButton from '../../../../components/common/MUIconButton.vue'
  import MUButton from '../../../../components/common/MUButton.vue'
  import { Icon } from '@iconify/vue'
  import MUWalletAddr from '@/components/common/MUWalletAddr.vue'
  import { useStore } from '@/store'
  import { useRoute } from 'vue-router'
  import MUCoin from '@/components/common/MUCoin.vue'
  import {
    drawAvatar,
    fromAvatarStringToAvatarConfig
  } from '@/utils/generateAvatar'

  const store = useStore()
  const route = useRoute()

  const canvas = ref(null)

  const isOwnerRef = computed(() => {
    if (store.userInfo.connected && store.walletInfo.address) {
      return (
        store.walletInfo.address.toLowerCase() ==
        route.params.address.toLowerCase()
      )
    } else {
      return false
    }
  })

  watchEffect(() => {
    if (store.profileInfo.avatarString) {
      drawAvatar(
        canvas,
        fromAvatarStringToAvatarConfig(store.profileInfo.avatarString),
        200
      )
    }
  })

  const downloadImageFromCanvas = (canvas, name) => {
    const aTag = document.createElement('a')
    aTag.href = canvas.value.toDataURL()
    aTag.download = name
    aTag.click()
  }

  const handleDownloadAvatar = () => {
    downloadImageFromCanvas(canvas, store.profileInfo.avatarString)
  }
</script>

<style lang="scss" scoped></style>

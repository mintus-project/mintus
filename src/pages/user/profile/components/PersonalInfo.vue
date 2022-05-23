<template>
  <div class="flex flex-col items-center gap-6">
    <div class="avatar">
      <div class="w-[12.5rem] rounded-2xl border-4 border-white shadow-lg">
        <img src="https://api.lorem.space/image/face?hash=92048" />
      </div>
    </div>
    <span class="font-bold text-3xl">Username</span>
    <!-- <span>wallet address</span> -->
    <div class="flex border border-gray-200 rounded-full py-2 px-4 gap-2">
      <MUCoin type="eth" />
      <MUWalletAddr :addr="$route.params.address" />
    </div>
    <div class="flex gap-4">
      <MUIconButton v-if="isOwnerRef" @click="$router.push(`/setting/${store.walletInfo.address}`)">
        <template #icon
          ><Icon height="16" icon="material-symbols:settings-outline-rounded"
        /></template>
        <template #default>Setting</template>
      </MUIconButton>
      <MUButton>Download Avatar</MUButton>
    </div>
  </div>
</template>

<script setup>
  import { computed } from 'vue'
  import MUIconButton from '../../../../components/common/MUIconButton.vue'
  import MUButton from '../../../../components/common/MUButton.vue'
  import { Icon } from '@iconify/vue'
  import MUWalletAddr from '@/components/common/MUWalletAddr.vue'
  import { useStore } from '@/store'
  import { useRoute } from 'vue-router'
  import MUCoin from '@/components/common/MUCoin.vue'

  const store = useStore()
  const route = useRoute()
  const isOwnerRef = computed(() => {
    if (store.userInfo.connected && store.walletInfo.address) {
      return store.walletInfo.address.toLowerCase() == route.params.address.toLowerCase()
    } else {
      return false
    }
  })
</script>

<style lang="scss" scoped></style>

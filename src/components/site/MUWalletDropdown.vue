<template>
  <div class="dropdown z-10">
    <div tabindex="0">
      <MUWalletAddr :addr="store.walletInfo.address" show-badge />
    </div>
    <div
      tabindex="0"
      class="dropdown-content card card-compact p-2 shadow bg-white"
    >
      <div class="card-body flex-col items-center">
        <MUWalletType
          :type="store.walletInfo.type"
          show-name
          class="text-sm font-normal text-[#000000]"
        />

        <div class="badge badge-lg bg-[#C4C4C4] border-0 align-between"></div>
        <MUWalletAddr :addr="store.walletInfo.address" show-copy />

        <div class="divider"></div>
        <div id="options">
          <MUConnectWallet>
            <div class="font-bold text-base cursor-pointer">Change Wallet</div>
          </MUConnectWallet>
          <div class="font-bold text-base">Disconnect</div>
        </div>
        <div class="divider"></div>
        <div>
          <MUButton @click="$router.push('/user/id-10304/profile')"
            >My Profile</MUButton
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  // import { defineProps} from 'vue'
  import { useStore } from '@/store/index.js'
  import MUWalletAddr from '../common/MUWalletAddr.vue'
  import MUWalletType from '../common/MUWalletType.vue'
  import MUButton from '../common/MUButton.vue'
  import MUConnectWallet from './MUConnectWallet.vue'

  const store = useStore()
</script>

<style scoped></style>

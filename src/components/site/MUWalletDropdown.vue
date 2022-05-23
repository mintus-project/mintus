<template>
  <div class="dropdown dropdown-end z-10">
    <div tabindex="0" class="cursor-pointer rounded-xl bg-gray-500/[0.1] py-2 px-4">
      <MUWalletAddr :addr="store.walletInfo.address" show-badge />
    </div>
    <div
      tabindex="0"
      class="dropdown-content card card-compact w-52 shadow bg-white mt-3"
    >
      <div class="card-body flex-col items-center">
        <MUWalletType
          :type="store.walletInfo.type"
          show-name
          class="text-sm font-normal text-[#000000]"
        />

        <div class="badge badge-lg bg-[#C4C4C4] border-0 rounded-full h-8 w-8"></div>
        <MUWalletAddr :addr="store.walletInfo.address" show-copy />

        <div class="divider my-0"></div>

        <div id="options" class="flex flex-col gap-6 items-center">
          <MUConnectWallet>
            <div class="font-bold text-base cursor-pointer">Change Wallet</div>
          </MUConnectWallet>
          <div
            class="font-bold text-base cursor-pointer"
            @click="handleDisconnect"
          >
            Disconnect
          </div>
        </div>

        <div class="divider my-0"></div>
        <div>
          <MUButton
            :disabled="!store.userInfo.purchased"
            @click="$router.push('/profile/0xd83039Ff4B0D7022281769eDb509b32F6c390867')"
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

  const handleDisconnect = () => {
    store.walletInfo = {
      type: '',
      address: ''
    }
    store.userInfo.connected = false
  }
</script>

<style scoped></style>

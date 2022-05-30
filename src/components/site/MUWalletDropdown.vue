<template>
  <div class="dropdown dropdown-end z-10">
    <div
      tabindex="0"
      class="cursor-pointer rounded-xl bg-gray-500/[0.1] hover:bg-gray-500/[0.15] py-2 px-4"
    >
      <MUWalletAddr
        class="font-bold text-sm text-[#727272] cursor-pointer"
        :addr="store.walletInfo.address"
        show-badge
      />
    </div>
    <div
      tabindex="0"
      class="dropdown-content card card-compact w-52 shadow bg-white mt-3"
    >
      <div class="card-body flex flex-col items-center gap-5">
        <div class="flex flex-col items-center justify-between gap-5">
          <MUWalletType
            :type="store.walletInfo.type"
            show-name
            class="text-sm font-normal text-[#000000]"
          />

          <div
            class="badge badge-lg bg-[#C4C4C4] border-0 rounded-full h-8 w-8"
          ></div>
          <MUWalletAddr
            class="font-bold text-sm"
            :addr="store.walletInfo.address"
            show-copy
          />
        </div>

        <div class="border-t border-gray-200 w-[200%]"></div>

        <div id="options" class="flex flex-col gap-6 items-center">
          <MUConnectWallet>
            <div class="font-bold text-sm cursor-pointer">Change Wallet</div>
          </MUConnectWallet>
          <div
            class="font-bold text-sm cursor-pointer"
            @click="handleDisconnect"
          >
            Disconnect
          </div>
        </div>

        <div class="border-t border-gray-200 w-[200%]"></div>

        <MUButton
          class="w-full"
          :disabled="!store.userInfo.purchased"
          @click="
            $router.push(`/profile/${store.walletInfo.address}`)
          "
          >My Profile</MUButton
        >
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

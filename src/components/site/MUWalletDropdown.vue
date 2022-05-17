<template>
  <div class="dropdown">
    <div tabindex="0">
      <MUWalletAddr :addr="wallet.address" show-badge />
    </div>
    <div
      tabindex="0"
      class="dropdown-content card card-compact p-2 shadow bg-white"
    >
      <div class="card-body flex-col items-center">
        <MUWalletType
          :type="wallet.type"
          show-name
          class="text-sm font-normal text-[#000000]"
        />

        <div class="badge badge-lg bg-[#C4C4C4] border-0 align-between"></div>
        <MUWalletAddr :addr="wallet.address" show-copy />

        <div class="divider"></div>
        <div id="options">
          <div class="font-bold text-base">Change Wallet</div>
          <div class="font-bold text-base">Disconnect</div>
        </div>
        <div class="divider"></div>
        <div>
          <MUButton @click="$router.push('/user/id-10304/profile')">My Profile</MUButton>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  // import { defineProps} from 'vue'
  import MUWalletAddr from '../common/MUWalletAddr.vue'
  import MUWalletType from '../common/MUWalletType.vue'
  import MUButton from '../common/MUButton.vue'

  // const props = defineProps({})

  //TODO: 应该是个全局的状态
  const wallet = {
    type: 'metamask',
    address: '0xd83039Ff4B0D7022281769eDb509b32F6c390867'
  }
</script>

<style scoped></style>

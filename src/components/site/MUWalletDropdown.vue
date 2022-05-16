<template>
  <div class="dropdown">
    <div tabindex="0"><MUWalletAddr :addr="shortAddress"></MUWalletAddr></div>
    <div
      tabindex="0"
      class="dropdown-content card card-compact flex-col justify-items-center w-50 p-2 shadow bg-white"
    >
      <div class="card-body flex-col">
        <MUWalletType
          :type="wallet.type"
          show-name
          class="text-sm font-normal text-[#000000]"
        ></MUWalletType>
        <div class="badge badge-lg bg-[#C4C4C4] border-0 align-between"></div>
        <div class="flex items-center gap-3">
          <span class="font-bold text-base">{{ shortAddress }}</span>
          <Icon icon="bx:copy" class="w-4"></Icon>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  // import { defineProps} from 'vue'
  import MUWalletAddr from '../common/MUWalletAddr.vue'
  import MUWalletType from '../common/MUWalletType.vue'
  import { Icon } from '@iconify/vue'

  // const props = defineProps({})

  //TODO: 应该是个全局的状态
  const wallet = {
    type: 'metamask',
    address: '0xd83039Ff4B0D7022281769eDb509b32F6c390867'
  }
  const shortAddress = `${wallet.address.slice(0, 6)}...${wallet.address.slice(
    -4
  )}`
</script>

<style scoped></style>

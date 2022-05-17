<template>
  <MUButton :type="props.btnType" @click="state.openModal = true"
    >Conncet Wallet</MUButton
  >
  <MUModal v-if="state.openModal" :open="state.openModal" @close="handleClose">
    <template #header>
      <h2>Connect to Your Wallet</h2>
    </template>
    <template #content>
      <div class="flex flex-col items-stretch gap-2">
        <button
          v-for="(item, index) in walletList"
          :key="index"
          class="btn gap-2"
        >
          <MUWalletType show-name :type="item" />
          <Icon icon="material-symbols:arrow-forward-ios-rounded" />
        </button>
      </div>
    </template>
  </MUModal>
</template>
<script setup>
  import { defineProps, reactive } from 'vue'
  import MUButton from '../common/MUButton.vue'
  import MUModal from '../common/MUModal.vue'
  import MUWalletType from '../common/MUWalletType.vue'
  import { Icon } from '@iconify/vue'

  const props = defineProps({
    btnType: String
  })
  const state = reactive({ openModal: false })
  const walletList = ['metamask', 'coinbase', 'fortmatic']

  const handleClose = () => {
    state.openModal = false
  }
</script>
<style scoped></style>

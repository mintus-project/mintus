<template>
  <div class="flex items-center gap-3">
    <Icon
      :icon="AllWalletTypes[props.type].icon"
      :color="AllWalletTypes[props.type].color"
      height="20"
    />
    <span v-if="showName">{{ AllWalletTypes[props.type].text }}</span>
  </div>
</template>

<script setup>
  import { defineProps } from 'vue'
  import { Icon } from '@iconify/vue'
  const props = defineProps({
    showName: Boolean,
    type: {
      type: String,
      validator(value) {
        const allTypes = ['metamask', 'coinbase', 'fortmatic']
        return allTypes.includes(value)
      }
    }
  })

  const AllWalletTypes = {
    metamask: { text: 'MetaMask', icon: 'logos:metamask-icon', color: '' },
    // icon库没搜到，暂时用这些
    coinbase: {
      text: 'Coinbase Wallet',
      icon: 'arcticons:coinbase',
      color: '#2D65F8'
    },
    fortmatic: { text: 'Fortmatic', icon: 'mdi:wallet', color: '#617BFF' }
  }
</script>

<style scoped></style>

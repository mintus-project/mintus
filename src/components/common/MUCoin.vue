<template>
  <div class="flex items-center gap-1">
    <Icon
      :icon="AllCoins[props.type].icon"
      height="24"
      :color="AllCoins[props.type].color"
      class="inline-block"
    />
    <span v-if="props.showName" class="font-bold text-sm text-[#727272]">{{
      AllCoins[props.type].text
    }}</span>
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
        const allTypes = [
          'btc',
          'eth',
          'bsc',
          'polygon',
          'avalan',
          'cchain',
          'fantom',
          'opera',
          'arbitrum',
          'optimism',
          'tbnb'
        ]
        return allTypes.includes(value)
      }
    }
  })

  const AllCoins = {
    btc: { text: 'BTC', icon: 'mdi:bitcoin', color: '#6b8cef' },
    eth: { text: 'ETH', icon: 'mdi:ethereum', color: '#6b8cef' },
    bsc: { text: 'BSC', icon: 'ph:coins-fill', color: '#6b8cef' },
    polygon: { text: 'Polygon', icon: 'ph:coins-fill', color: '#6b8cef' },
    avalan: { text: 'Avalan', icon: 'ph:coins-fill', color: '#6b8cef' },
    cchain: { text: 'che C-Chain', icon: 'ph:coins-fill', color: '#6b8cef' },
    fantom: { text: 'Fantom', icon: 'ph:coins-fill', color: '#6b8cef' },
    opera: { text: 'Opera', icon: 'mdi:opera', color: '#6b8cef' },
    arbitrum: { text: 'Arbitrum One', icon: 'ph:coins-fill', color: '#6b8cef' },
    optimism: { text: 'Optimism', icon: 'ph:coins-fill', color: '#6b8cef' },
    tbnb: { text: 'tBNB', icon: 'ph:coins-fill', color: '#6b8cef' }
  }
</script>

<style scoped></style>

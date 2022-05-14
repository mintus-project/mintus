<template>
  <div class="items-center">
    <svg width="16" height="24" viewBox="0 0 16 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="inline-block m-2">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M8.00099 0V8.87189L1.43842 11.8054L8.00099 8.87365V16.5763L0.505263 12.2225L0.505023 12.2226L0.505103 12.2224L0.505023 12.2224L0.505183 12.2223L8.00099 0ZM8.00299 0L15.4998 12.2223L15.5 12.2224L15.4999 12.2224L15.5 12.2226L15.4998 12.2225L8.00299 16.5763V8.87365L14.5664 11.8054L8.00299 8.87189V0ZM8.00099 17.9718V24L0.5 13.6188L8.00099 17.9718ZM8.00299 24V17.9707L15.5 13.6188L8.00299 24Z" fill="#6B8CEF"/>
    </svg>
    <span v-if="props.showName" class="font-bold text-sm text-[#727272]">{{AllCoins[props.type].text}}</span>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'
const props = defineProps({
  showName: Boolean,  
  type: {
    type: String,
    validator(value) {
      const allTypes = ['btc','eth','bsc','polygon','avalan','cchain','fantom','opera','arbitrum','optimism']  
      return allTypes.includes(value)
    }
  }
})

const AllCoins = {
    btc: {text:'BTC',icon: 'xx'},
    eth: {text:'ETH',icon: 'xx'},
    bsc: {text:'BSC',icon: 'xx'},
    polygon: {text:'Polygon',icon: 'xx'},
    avalan: {text:'Avalan',icon: 'xx'},
    cchain: {text:'che C-Chain',icon: 'xx'},
    fantom: {text:'Fantom',icon: 'xx'},
    opera: {text:'Opera',icon: 'xx'},
    arbitrum: {text:'Arbitrum One',icon: 'xx'},
    optimism: {text:'Optimism',icon: 'xx'},
};
</script>

<style scoped>
</style>

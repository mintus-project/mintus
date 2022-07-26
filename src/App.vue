<script setup>
  import { useStore } from './store'
  import { initContract } from './services/contract'

  const store = useStore()
  store.initWalletInfo()
  
  initContract()
</script>

<template>
  <n-message-provider>
    <router-view></router-view>
  </n-message-provider>
</template>

<style></style>

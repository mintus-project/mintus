<script setup>
  import { initContract } from './services/contract'
  import { initWallet } from './services/wallet'

  initWallet()
  initContract()
</script>

<template>
  <n-message-provider>
    <router-view></router-view>
  </n-message-provider>
</template>

<style></style>

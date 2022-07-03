<script setup>
  import { useStore } from './store'

  const store = useStore()
  store.initWalletInfo()
</script>

<template>
  <n-message-provider>
    <router-view></router-view>
  </n-message-provider>
</template>

<style></style>

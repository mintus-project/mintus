<script setup>
  import { useStore } from './store'
  const store = useStore()
  store.initWalletInfo()
</script>

<template>
  <router-view></router-view>
</template>

<style></style>

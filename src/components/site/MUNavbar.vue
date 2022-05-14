<template>
  <div
    class="w-full bg-transparent px-12 py-3 flex justify-between items-center"
  >
    <span class="text-3xl font-black text-[#5D5FEF] cursor-pointer" @click="$router.push('/')">MintUs</span>
    <MUButton>Connect Wallet</MUButton>
  </div>
</template>

<script setup>
  import MUButton from '../common/MUButton.vue'
</script>

<style lang="scss" scoped></style>

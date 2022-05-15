<template>
  <div
    class="w-full h-20 bg-transparent backdrop-blur-3xl px-12 py-3 flex justify-between items-center z-10"
  >
    <span
      class="text-3xl font-black text-[#5D5FEF] cursor-pointer"
      @click="$router.push('/')"
      >MintUs</span
    >
    <MUCoin type="btc" show-name="true" />
    <MUCoin type="eth" :show-name="false" />
    <MUCoin type="polygon" />
    <MUButton>what</MUButton>
  </div>
</template>

<script setup>
  import MUButton from '../common/MUButton.vue'
  import MUCoin from '../common/MUCoin.vue'
</script>

<style lang="scss" scoped></style>

<template>
  <div
    class="w-full h-20 bg-transparent backdrop-blur-3xl px-12 py-3 flex justify-between items-center z-10"
  >
<<<<<<< HEAD
    <span
      class="text-3xl font-black text-[#5D5FEF] cursor-pointer"
      @click="$router.push('/')"
      >MintUs</span
    >
    <MUCoin type="btc" show-name="true" />
    <MUCoin type="eth" :show-name="false" />
    <MUCoin type="polygon" />
    <MUButton>what</MUButton>
=======
    <span class="text-3xl font-black text-[#5D5FEF] cursor-pointer" @click="$router.push('/')">MintUs</span>
    
    <MUAccount connected="true" purchased="true"/>
>>>>>>> feat-connect-wallet
  </div>
</template>

<script setup>
  import MUButton from '../common/MUButton.vue'
<<<<<<< HEAD
  import MUCoin from '../common/MUCoin.vue'
=======
  import MUAccount from '../site/MUAccount.vue'
>>>>>>> feat-connect-wallet
</script>

<style lang="scss" scoped></style>

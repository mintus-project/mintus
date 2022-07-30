<template>
  <div class="flex flex-col items-center gap-6">
    <div class="avatar">
      <div
        class="w-[12.5rem] rounded-2xl border-4 border-white shadow-lg bg-gray-100"
      ></div>
    </div>
    <span class="font-bold text-3xl">Unknown User</span>
    <div class="flex border border-gray-200 rounded-full py-2 px-4 gap-2">
      <MUCoin type="eth" />
      <MUWalletAddr
        class="text-sm text-[#727272]"
        :addr="$route.params.address"
      />
    </div>
  </div>
</template>

<script setup>
  import MUWalletAddr from '@/components/common/MUWalletAddr.vue'
  import MUCoin from '@/components/common/MUCoin.vue'
</script>

<style lang="scss" scoped></style>

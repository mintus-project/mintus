<template>
  <div
    class="w-full h-20 bg-transparent backdrop-blur-3xl px-12 py-3 flex justify-between items-center z-10"
  >
    <span
      class="text-3xl font-black text-[#5D5FEF] cursor-pointer"
      @click="$router.push('/')"
    >
      <img src="@/assets/mintUs.svg" />
    </span>

    <MUAccount />
  </div>
</template>

<script setup>
  import MUAccount from '../site/MUAccount.vue'
</script>

<style lang="scss" scoped></style>

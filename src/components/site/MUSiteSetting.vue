<template>
  <div class="h-screen flex flex-col">
    <MUNavbar class="border-b border-[#F2F2F2]"></MUNavbar>
    <div class="flex-1 flex">
      <div class="w-64 border-r p-4 border-[#F2F2F2] flex flex-col gap-4">
        <slot name="sidebar"></slot>
      </div>
      <div class="flex-1 flex flex-col items-center justify-center">
        <slot name="content"></slot>
      </div>
    </div>
    <MUFooter class=""></MUFooter>
  </div>
</template>

<script setup>
  import MUNavbar from './MUNavbar.vue'
  import MUFooter from './MUFooter.vue'
</script>

<style scoped></style>

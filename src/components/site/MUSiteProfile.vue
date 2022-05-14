<template>
  <div>
    <MUNavbar class="fixed bg-[#F9F9F9] border-b border-[#F2F2F2]"></MUNavbar>
    <div class="min-h-screen flex flex-col items-center">
      <div class="w-full h-72 bg-[#F9F9F9]"></div>
      <slot></slot>
    </div>
  </div>
</template>

<script setup>
  import MUNavbar from './MUNavbar.vue'
</script>

<style scoped></style>

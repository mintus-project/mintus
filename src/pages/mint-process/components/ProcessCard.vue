<template>
  <div class="flex flex-col items-center gap-8">
    <div class="flex flex-col items-center gap-4">
      <h1 class="text-[2.5rem] font-extrabold leading-10 text-black">
        <slot name="title"></slot>
      </h1>
      <h2 class="text-[#727272] leading-6">
        <slot name="subtitle"></slot>
      </h2>
    </div>
    <div class="flex flex-col gap-8">
      <!-- card -->
      <div class="min-w-[16rem] min-h-[23rem] bg-white rounded-xl my-shadow">
        <slot name="content"></slot>
      </div>
      <!-- back & next -->
      <div class="flex justify-end gap-4">
        <slot name="footer"></slot>
      </div>
    </div>
  </div>
</template>

<script setup></script>

<style scoped>
  .my-shadow {
    box-shadow: 0px 30px 50px rgba(0, 0, 0, 0.02),
      0px 8px 8px rgba(0, 0, 0, 0.0290085);
  }
</style>

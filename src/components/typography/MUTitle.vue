<template>
  <div class="flex flex-col items-center gap-4">
    <h1 class="text-[2.5rem] font-extrabold leading-10 text-black">
      <slot name="title"></slot>
    </h1>
    <span class="text-[#727272] text-base leading-6">
      <slot name="subtitle"></slot>
    </span>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped></style>

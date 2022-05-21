<template>
  <button
    class="my-btn"
    :class="{
      'btn-default': !props.active,
      'btn-active': props.active
    }"
    :disabled="props.disabled"
  >
    <slot></slot>
  </button>
</template>

<script setup>
  import { defineProps } from 'vue'

  const props = defineProps({
    disabled: Boolean,
    active: Boolean
  })
</script>

<style scoped>
  .my-btn {
    @apply box-border font-bold py-4 px-6 flex items-center justify-between rounded-xl border border-[#EEEEEE] transition;
  }

  .btn-default {
    @apply bg-white text-[#727272] hover:bg-[#D7D8FC] hover:border-[#D7D8FC] hover:text-[#5D5FEF] active:bg-[#D7D8FC] active:text-[#5D5FEF] disabled:opacity-40 disabled:bg-white disabled:text-black;
  }

  .btn-active {
    @apply bg-[#D7D8FC] border-[#D7D8FC] text-[#5D5FEF];
  }
</style>

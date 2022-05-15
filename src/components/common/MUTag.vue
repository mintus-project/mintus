<template>
  <button
    class="btn"
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
  .btn {
    @apply box-border text-xs font-bold py-2 px-4 flex items-center justify-center rounded-lg border border-[#EEEEEE] transition;
  }

  .btn-default {
    @apply bg-white text-black hover:bg-[#D7D8FC] hover:border-[#D7D8FC] hover:text-[#5D5FEF] active:bg-[#D7D8FC] disabled:opacity-40 disabled:bg-white disabled:text-black;
  }

  .btn-active {
    @apply bg-[#D7D8FC] border-[#D7D8FC] text-[#5D5FEF];
  }
</style>

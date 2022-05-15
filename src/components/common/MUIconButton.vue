<template>
  <button
    class="btn"
    :class="{ 'btn-default': !props.disabled, 'btn-disabled': props.disabled }"
    :disabled="props.disabled"
  >
    <slot></slot>
  </button>
</template>

<script setup>
  import { defineProps } from 'vue'

  const props = defineProps({
    disabled: Boolean
  })
</script>

<style scoped>
  .btn {
    @apply box-border text-sm font-bold py-3 px-4 flex items-center justify-center rounded-lg bg-white text-black border border-[#EEEEEE] transition;
  }

  .btn-default {
    @apply hover:bg-[#F8F8F8] hover:border-[#EEEEEE] active:bg-[#F8F8F8];
  }

  .btn-disabled {
    @apply opacity-40;
  }
</style>

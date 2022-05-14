<template>
  <button 
    :class="{'btn-default': !props.disabled, 'btn-disabled': props.disabled}"
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
  @apply box-border text-xs font-bold py-2 px-4 flex items-center justify-center rounded-lg bg-white text-black border border-[#EEEEEE] transition;
}

.btn-default {
  @apply btn hover:bg-[#D7D8FC] hover:border-[#D7D8FC] hover:text-[#5D5FEF] active:bg-[#D7D8FC];
}

.btn-disabled {
  @apply btn opacity-40;
}
</style>

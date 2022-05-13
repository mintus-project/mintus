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
  @apply box-border text-sm font-bold py-3 px-8 flex items-center justify-center rounded-xl bg-[#5D5FEF] text-white;
}

.btn-default {
  @apply btn hover:bg-[#7879F1] active:bg-[#7879F1];
}

.btn-disabled {
  @apply btn opacity-40;
}
</style>

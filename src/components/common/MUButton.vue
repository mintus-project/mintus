<template>
  <button
    :disabled="props.disabled || props.isLoading"
    class="my-btn"
    :class="{
      'btn-default': props.btnType === 'default',
      'btn-outline': props.btnType === 'outline',
      'btn-ghost': props.btnType === 'ghost'
    }"
  >
    <span :class="{ 'opacity-0': props.isLoading }">
      <slot></slot>
    </span>
    <div v-if="props.isLoading" class="my-btn-spin">
      <Icon height="25" icon="gg:spinner" class="animate-spin" />
    </div>
  </button>
</template>

<script setup>
  import { Icon } from '@iconify/vue'
  import { defineProps } from 'vue'

  const props = defineProps({
    disabled: Boolean,
    isLoading: {
      type: Boolean,
      default: false
    },
    btnType: {
      type: String,
      default: 'default',
      validator(value) {
        return ['default', 'outline', 'ghost'].includes(value)
      }
    }
  })
</script>

<style scoped>
  .my-btn {
    @apply box-border text-sm font-bold py-3 px-8 flex items-center justify-center rounded-xl border transition relative overflow-hidden;
  }

  .btn-default {
    @apply bg-[#5D5FEF] border-[#5D5FEF] text-white hover:bg-[#7879F1] hover:border-[#7879F1] active:bg-[#7879F1] active:border-[#7879F1] disabled:opacity-40 disabled:bg-[#5D5FEF];
  }

  .btn-outline {
    @apply bg-transparent border-[#5D5FEF] text-[#5D5FEF] hover:bg-[#D7D8FC] hover:border-[#5D5FEF] hover:text-[#5D5FEF] active:bg-[#D7D8FC] disabled:opacity-40 disabled:bg-[#C6C6FF] disabled:border-[#EEEEEE] disabled:text-[#5D5FEF];
  }

  .btn-ghost {
    /* @apply bg-transparent border-transparent text-[#5D5FEF] hover:bg-[#EEEEEE] hover:border-[#EEEEEE] active:bg-[#EEEEEE] disabled:opacity-40 disabled:bg-transparent disabled:border-transparent disabled:text-[#5D5FEF]; */
    @apply bg-transparent border-transparent text-[#5D5FEF] hover:bg-[#555555]/[.1] active:bg-[#555555]/[.1] disabled:opacity-40 disabled:bg-transparent disabled:border-transparent disabled:text-[#5D5FEF];
  }

  .my-btn-spin {
    @apply absolute top-0 bottom-0 left-0 right-0 flex justify-center items-center;
  }
</style>

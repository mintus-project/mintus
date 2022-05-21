<template>
  <div class="flex flex-col gap-2 text-sm">
    <div v-if="props.label" class="font-bold">
      {{ props.label }}
      <span v-if="props.required" class="text-pink-500">*</span>
    </div>
    <div class="flex justify-between items-center gap-2">
      <slot name="before"></slot>
      <MUAccount class="" :class="{ invalid: errorMessage }" />
      <slot name="after"></slot>
    </div>
    <span class="text-pink-500 text-xs mt-[-.25rem]">{{ errorMessage }}</span>
  </div>
</template>

<script setup>
  import { defineProps } from 'vue'
  import MUAccount from '../site/MUAccount.vue'
  const props = defineProps({
    disabled: Boolean,
    required: Boolean,
    label: {
      type: String
    }
  })
</script>

<style scoped></style>

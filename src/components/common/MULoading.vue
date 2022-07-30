<template>
  <div
    v-if="props.isLoading"
    class="w-screen h-screen bg-white/80 fixed z-20 flex justify-center items-center"
  >
    <Icon icon="gg:spinner" class="animate-spin text-5xl text-[#5d5fef]" />
  </div>
  <slot></slot>
</template>

<script setup>
  import { Icon } from '@iconify/vue'
  import { defineProps } from 'vue'

  const props = defineProps({
    isLoading: Boolean
  })
</script>

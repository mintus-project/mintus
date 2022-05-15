<template>
  <div
    class="w-[9.5rem] h-[2.875rem] rounded-xl bg-black/[.05] px-2 py-3 flex items-center justify-center gap-2"
  >
    <div class="badge badge-lg bg-[#C4C4C4] border-0"></div>
    <span class="font-bold text-sm text-[#727272]">{{
      `${pre}...${tail}`
    }}</span>
  </div>
</template>

<script setup>
  import { defineProps } from 'vue'
  const props = defineProps({
    addr: {
      type: String,
      validator(value) {
        console.log(value)
        return value.length > 10
      }
    }
  })
  const pre = props.addr.slice(0, 6)
  const tail = props.addr.slice(-4)
</script>

<style scoped></style>

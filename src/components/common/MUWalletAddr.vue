<template>
  <div class="w-148 h-46 rounded-xl bg-[#EEEEEE]">
    <div class="mx-2 my-3 flex items-center gap-2">
      <div class="badge badge-lg bg-[#C4C4C4] border-0"></div>
      <span class="font-bold text-sm text-[#727272]">{{`${pre}...${tail}`}}</span>
    </div>
  </div>
</template>

<script setup>
import { defineProps} from 'vue'
  const props = defineProps({
    addr: {
      type: String,
      validator(value) {
        console.log(value)
        return value.length > 10
      }
    }
  })
  const pre = props.addr.slice(0,6)
  const tail = props.addr.slice(-4)
</script>

<style scoped></style>
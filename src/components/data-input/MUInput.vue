<template>
  <div class="flex flex-col gap-2 text-sm">
    <div v-if="props.label" class="font-bold">
      {{ props.label }}
      <span v-if="props.required" class="text-pink-500">*</span>
    </div>
    <input
      :type="props.type"
      :placeholder="props.placeholder"
      class="block w-full px-4 py-3 bg-white border border-[#EEEEEE] rounded-xl text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#D7D8FC] focus:border-[#D7D8FC] active:border-[#5D5FEF] disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none invalid:border-pink-200 invalid:text-pink-500 active:invalid:border-pink-400 focus:invalid:ring-pink-200 focus:invalid:border-pink-200 transition"
    />
  </div>
</template>

<script setup>
  import { defineProps } from 'vue'
  const props = defineProps({
    disabled: Boolean,
    required: Boolean,
    type: {
      type: String,
      default: 'text',
      validator(value) {
        return ['password', 'text', 'email', 'phone'].includes(value)
      }
    },
    label: {
      type: String
    },
    placeholder: {
      type: String,
      default: ''
    }
  })
</script>

<style scoped></style>

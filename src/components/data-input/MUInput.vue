<template>
  <div class="flex flex-col gap-2 text-sm">
    <div v-if="props.label" class="font-bold">
      {{ props.label }}
      <span v-if="props.required" class="text-pink-500">*</span>
    </div>
    <div class="flex justify-between items-center gap-2">
      <slot name="before"></slot>
      <input
        v-model="value"
        :name="props.name"
        :type="props.type"
        :placeholder="props.placeholder"
        class="mu-input flex-1"
        :class="{ invalid: errorMessage }"
      />
      <slot name="after"></slot>
    </div>
    <span class="text-pink-500 text-xs mt-[-.25rem]">{{ errorMessage }}</span>
  </div>
</template>

<script setup>
  import { defineProps } from 'vue'
  import { useField } from 'vee-validate'

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
    name: {
      type: String,
      required: true,
      default: 'field'
    },
    label: {
      type: String
    },
    placeholder: {
      type: String,
      default: ''
    },
    validator: {
      type: Function,
      default: () => true
    }
  })

  // validator
  function validator(value) {
    // required
    if (props.required && ((value && value.length === 0) || !value)) {
      return 'this field is required'
    }
    return props.validator(value)
  }

  // value, error message
  const { value, errorMessage } = useField(props.name, validator)
</script>

<style scoped>
  .invalid {
    @apply border-pink-200 text-pink-500 active:border-pink-400 focus:ring-pink-200 focus:border-pink-200;
  }
</style>

<template>
  <MUInput
    :name="props.name"
    :disabled="props.disabled"
    :required="props.required"
    :label="props.label"
    :type="props.type"
    :placeholder="props.placeholder"
    :validator="props.validator"
  >
    <template #before>
      <select
        v-model="coinType"
        :name="`${props.name}-coinType`"
        class="text-sm mu-input"
      >
        <option value="ETH">ETH</option>
        <option value="BTC">BTC</option>
        <option value="ABC">ABC</option>
        <option value="CDE">CDE</option>
        <option value="FGH">FGH</option>
      </select>
    </template>
    <template #after>
      <slot name="after"></slot>
    </template>
  </MUInput>
</template>

<script setup>
  import MUInput from './MUInput.vue'
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
  const { value: coinType } = useField(`${props.name}-coinType`)
  coinType.value = 'ETH'
</script>

<style scoped></style>

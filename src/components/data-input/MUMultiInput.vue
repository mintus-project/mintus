<template>
  <div class="flex flex-col gap-2">
    <component
      :is="props.component"
      :name="`${props.name}-0`"
      :label="props.label"
      :placeholder="props.placeholder"
      :validator="props.validator"
      :default-value="props.defaultValueArray[0]"
    ></component>
    <!-- more domains -->
    <div
      v-for="(item, index) in inputComponentArr"
      :key="item"
      class="flex items-center justify-between gap-2"
    >
      <component
        :is="props.component"
        class="flex-1"
        :name="`${props.name}-${item}`"
        :placeholder="props.placeholder"
        :validator="props.validator"
        required
        :default-value="props.defaultValueArray[index + 1]"
      >
        <template #after>
          <Icon
            icon="ic:round-remove-circle"
            height="20"
            class="inline-block cursor-pointer addAndDelete"
            @click="inputComponentArr.splice(index, 1)"
          />
        </template>
      </component>
    </div>
    <!-- add more -->
    <div
      class="flex items-center gap-2 cursor-pointer addAndDelete"
      @click="handleAddMore"
    >
      <Icon
        icon="material-symbols:add-circle"
        height="20"
        class="inline-block"
      />
      <span>Add More</span>
    </div>
  </div>
</template>

<script>
  import MUInput from './MUInput.vue'
  import MUWalletAddressInput from './MUWalletAddressInput.vue'

  export default {
    components: {
      MUInput,
      MUWalletAddressInput
    }
  }
</script>

<script setup>
  import { ref, defineProps } from 'vue'
  import { Icon } from '@iconify/vue'

  const props = defineProps({
    component: {
      type: String,
      default: 'MUInput',
      validator(value) {
        return ['MUInput', 'MUWalletAddressInput'].includes(value)
      }
    },
    disabled: Boolean,
    required: Boolean,
    defaultValueArray: {
      type: Array,
      default: () => []
    },
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

  const inputComponentArr = ref(new Array((props.defaultValueArray.length || 1) - 1))

  const handleAddMore = () => {
    const tempArr = inputComponentArr.value
    const length = tempArr.length
    inputComponentArr.value.push(length === 0 ? 1 : tempArr[length - 1] + 1)
  }
</script>

<style scoped>
  .addAndDelete {
    @apply hover:text-[#727272];
  }
</style>

<template>
  <div class="flex items-center justify-center gap-2">
    <div
      v-if="props.showBadge"
      class="badge badge-lg bg-[#C4C4C4] border-0 rounded-full h-6 w-6"
    ></div>
    <div class="flex items-center gap-3">
      <span class="font-bold text-sm text-[#727272]">{{ addrRef }}</span>
      <span v-show="props.showCopy" class="w-4">
        <Icon icon="bx:copy" @click="copy(props.addr)" />
      </span>
    </div>
  </div>
</template>

<script setup>
  import { computed, defineProps } from 'vue'
  import { useClipboard } from '@vueuse/core'
  import { Icon } from '@iconify/vue'
  const props = defineProps({
    addr: {
      type: String,
      validator(value) {
        console.log(value)
        return value.length > 10
      }
    },
    showCopy: {
      type: Boolean,
      default: false
    },
    showFullAddr: {
      type: Boolean,
      default: false
    },
    showBadge: {
      type: Boolean,
      default: false
    }
  })
  const { copy } = useClipboard()
  const addrRef = computed(() => {
    return props.showFullAddr
      ? props.addr
      : `${props.addr.slice(0, 6)}...${props.addr.slice(-4)}`
  })
</script>

<style scoped></style>

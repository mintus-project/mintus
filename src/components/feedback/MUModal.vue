<template>
  <Teleport to="body">
    <div
      class="fixed top-0 left-0 bg-black/5 backdrop-blur-sm w-full h-full z-[100] flex items-center justify-center"
      @click.self="
        (e) => {
          e.stopPropagation()
          emit('close')
        }
      "
    >
      <!-- card -->
      <div
        class="min-w-[23rem] max-w-[23rem] bg-white rounded-xl my-shadow px-6 pt-4 pb-8 flex flex-col gap-4 items-stretch"
      >
        <div class="flex justify-between items-center font-bold text-xl">
          <slot name="header">default header</slot>
          <Icon
            v-if="props.closeIcon"
            class="w-4 h-4 cursor-pointer hover:rotate-90 duration-300"
            icon="material-symbols:close-rounded"
            @click="emit('close')"
          />
        </div>
        <slot name="content"></slot>
        <slot name="footer"></slot>
      </div>
    </div>
  </Teleport>
</template>
<script setup>
  import { defineProps } from 'vue'
  import { Icon } from '@iconify/vue'
  const props = defineProps({
    closeIcon: {
      type: Boolean,
      default: false
    }
  })
  // eslint-disable-next-line no-undef
  const emit = defineEmits(['close'])
</script>
<style scoped></style>

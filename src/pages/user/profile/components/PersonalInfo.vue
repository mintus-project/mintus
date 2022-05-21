<template>
  <div class="flex flex-col items-center gap-6">
    <div class="avatar">
      <div class="w-[12.5rem] rounded-2xl border-4 border-white shadow-lg">
        <img src="https://api.lorem.space/image/face?hash=92048" />
      </div>
    </div>
    <span class="font-bold text-3xl">{{ $route.params.id }}</span>
    <span>wallet address</span>
    <div class="flex gap-4">
      <MUIconButton @click="$router.push('setting')">
        <template #icon><Icon height="16" icon="material-symbols:settings-outline-rounded" /></template>
        <template #default>Setting</template>
      </MUIconButton>
      <MUButton>Download Avatar</MUButton>
    </div>
  </div>
</template>

<script setup>
  import MUIconButton from '../../../../components/common/MUIconButton.vue'
  import MUButton from '../../../../components/common/MUButton.vue'
  import { Icon } from '@iconify/vue'
</script>

<style lang="scss" scoped></style>

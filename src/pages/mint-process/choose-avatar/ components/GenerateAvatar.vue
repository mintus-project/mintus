<template>
  <div class="p-8 flex items-stretch gap-12">
    <!-- result board -->
    <div class="w-56 aspect-square flex flex-col gap-8">
      <!-- avatar -->
      <div class="avatar">
        <div class="w-56 rounded-xl">
          <img src="https://api.lorem.space/image/face?hash=64318" />
        </div>
      </div>
      <div class="flex flex-col gap-4">
        <MUIconButton>
          <template #icon>
            <Icon icon="fe:loop" height="16" />
          </template>
          <template #default> Reset </template>
        </MUIconButton>
        <MUIconButton>
          <template #icon>
            <Icon icon="ps:random" height="14" />
          </template>
          <template #default> Random </template>
        </MUIconButton>
      </div>
    </div>
    <!-- pick board -->
    <div class="flex flex-col justify-between">
      <!-- select bar -->
      <div class="flex gap-2">
        <MUTag v-for="item in tabs" :key="item.tabName">
          {{ item.tabName }}
        </MUTag>
      </div>
      <!-- style grid -->
      <div class="h-[19.75rem] rounded-xl grid grid-cols-6 gap-2 overflow-auto">
        <div
          v-for="(item, index) in 30"
          :key="index"
          class="avatar rounded-xl cursor-pointer hover:scale-[0.96] duration-300 ease-in-out"
        >
          <div class="w-[6.25rem] rounded-xl">
            <img src="https://api.lorem.space/image/face?hash=64318" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import MUIconButton from '@/components/common/MUIconButton.vue'
  import { Icon } from '@iconify/vue'
  import MUTag from '@/components/common/MUTag.vue'

  const tabs = [
    {
      tabName: 'Base'
    },
    {
      tabName: 'Hair'
    },
    {
      tabName: 'Clothes'
    },
    {
      tabName: 'Eyes'
    },
    {
      tabName: 'Noses'
    },
    {
      tabName: 'Mouths'
    },
    {
      tabName: 'Background'
    }
  ]
</script>

<style lang="scss" scoped></style>

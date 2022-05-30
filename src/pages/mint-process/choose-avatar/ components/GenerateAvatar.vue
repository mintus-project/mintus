<template>
  <div class="p-8 flex items-stretch gap-12">
    <!-- result board -->
    <div class="w-56 aspect-square flex flex-col gap-8">
      <!-- avatar -->
      <div class="avatar">
        <div class="w-56 rounded-xl">
          <canvas ref="canvas"></canvas>
        </div>
      </div>
      <div class="flex flex-col gap-4">
        <MUIconButton
          @click="
            () => {
              store.mintInfo.avatarConfig = [0, 0, 0, 0, 0, 0, 0]
            }
          "
        >
          <template #icon>
            <Icon icon="fe:loop" height="16" />
          </template>
          <template #default> Reset </template>
        </MUIconButton>
        <MUIconButton
          @click="
            () => {
              store.mintInfo.avatarConfig = generateRandomAvatarConfig()
            }
          "
        >
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
        <MUTag
          v-for="item in tabs"
          :key="item.tabName"
          :active="item.active"
          @click="handleTabClick(item)"
        >
          {{ item.tabName }}
        </MUTag>
      </div>
      <!-- style grid -->
      <div
        class="h-[19.75rem] p-2 rounded-xl grid grid-cols-6 items-start gap-2 overflow-auto"
      >
        <div
          v-for="(item, index) in materials[currentTab].matPathArr"
          :key="index"
          class="avatar rounded-xl border-4 border-white my-shadow-sm cursor-pointer hover:scale-[0.96] hover:border-gray-100 duration-200 ease-in-out"
          :class="{
            pickedMaterial:
              index ===
              store.mintInfo.avatarConfig[7 - materials[currentTab].level]
          }"
          @click="
            () => {
              store.mintInfo.avatarConfig[7 - materials[currentTab].level] =
                index
            }
          "
        >
          <div class="w-[6.25rem] rounded-lg">
            <img :src="item" />
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
  import { ref, watchEffect } from 'vue'
  import materials from '@/utils/materials'
  import {
    drawAvatar,
    generateRandomAvatarConfig
  } from '@/utils/generateAvatar'
  import { useStore } from '@/store'

  const store = useStore()

  // refs
  const canvas = ref(null)

  store.mintInfo.canvas = canvas

  // data
  const tabs = ref([
    {
      tabName: 'Body',
      active: true
    },
    {
      tabName: 'Hair',
      active: false
    },
    {
      tabName: 'Cloth',
      active: false
    },
    {
      tabName: 'Eyes',
      active: false
    },
    {
      tabName: 'Nose',
      active: false
    },
    {
      tabName: 'Mouth',
      active: false
    },
    {
      tabName: 'Background',
      active: false
    }
  ])

  const currentTab = ref('body')

  // method
  const handleTabClick = (item) => {
    tabs.value.forEach((e) => {
      e.active = false
    })
    item.active = true

    currentTab.value = item.tabName.toLowerCase()
  }

  watchEffect(() => {
    drawAvatar(canvas, [...store.mintInfo.avatarConfig])
  })
</script>

<style scoped>
  .pickedMaterial {
    @apply border-4 border-gray-300 hover:scale-100 hover:border-gray-300;
  }
</style>

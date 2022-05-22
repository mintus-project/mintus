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
              avatarConfig = [0, 0, 0, 0, 0, 0, 0]
              drawAvatar(avatarConfig)
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
              avatarConfig = generateRandomAvatarConfig()
              drawAvatar(avatarConfig)
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
          class="avatar rounded-xl border border-[#EEEEEE] my-shadow-sm cursor-pointer hover:scale-[0.96] duration-300 ease-in-out"
        >
          <div class="w-[6.25rem] rounded-xl">
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
  import { ref } from 'vue'
  import materials from '@/utils/materials'
  import randomFromTo from '@/utils/randomFromTo'

  // refs
  const canvas = ref(null)

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

  const avatarConfig = ref([1, 1, 1, 1, 1, 1, 1])

  // method
  const handleTabClick = (item) => {
    tabs.value.forEach((e) => {
      e.active = false
    })
    item.active = true

    currentTab.value = item.tabName.toLowerCase()
  }

  const contextDraw = (images) => {
    const ctx = canvas.value.getContext('2d')
    canvas.value.width = 224
    canvas.value.height = 224

    images.forEach((img) => {
      ctx.drawImage(img, 0, 0, 224, 224)
    })
  }

  const createImages = (avatarConfig) => {
    const orderArr = [
      'background',
      'cloth',
      'body',
      'mouth',
      'nose',
      'eyes',
      'hair'
    ]
    const arr = []
    orderArr.forEach((e, i) => {
      const img = new Image()
      img.src = materials[e].matPathArr[avatarConfig[i]]
      arr.push(img)
    })
    return arr
  }

  const imagesSetOnLoad = (images) => {
    images.forEach((img) => {
      img.onload = () => {
        contextDraw(images)
      }
    })
  }

  const drawAvatar = (avatarConfig) => {
    const images = createImages(avatarConfig)
    imagesSetOnLoad(images)
  }

  const generateRandomAvatarConfig = () => {
    const arr = [
      randomFromTo(0, materials.background.matPathArr.length - 1),
      randomFromTo(0, materials.cloth.matPathArr.length - 1),
      randomFromTo(0, materials.body.matPathArr.length - 1),
      randomFromTo(0, materials.mouth.matPathArr.length - 1),
      randomFromTo(0, materials.nose.matPathArr.length - 1),
      randomFromTo(0, materials.eyes.matPathArr.length - 1),
      randomFromTo(0, materials.hair.matPathArr.length - 1)
    ]
    // materials.forEach((e) => {
    //   arr.push(randomFromTo(0, e.matPathArr.length - 1))
    // })
    console.log(arr)
    return arr
  }
</script>

<style lang="scss" scoped></style>

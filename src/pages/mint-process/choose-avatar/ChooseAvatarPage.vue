<template>
  <ProcessCard>
    <template #title>Customize A Unique Avatar</template>
    <template #subtitle>
      Every avatar is a unique NFT that only belongs to you.
    </template>
    <template #content>
      <GenerateAvatar></GenerateAvatar>
    </template>
    <template #footer>
      <MUButton @click="handleNextClick">Next</MUButton>
    </template>
  </ProcessCard>
</template>

<script setup>
  import ProcessCard from '../components/ProcessCard.vue'
  import MUButton from '../../../components/common/MUButton.vue'
  import GenerateAvatar from './ components/GenerateAvatar.vue'
  import { fromAvatarConfigToAvatarString } from '@/utils/generateAvatar'
  // import { useRouter } from 'vue-router'
  import { useStore } from '@/store'
  import { useRouter } from 'vue-router'

  const router = useRouter()
  const store = useStore()

  const handleNextClick = () => {
    // console.log('111', store.mintInfo.avatarConfig)
    // const avatarString = fromAvatarConfigToAvatarString(
    //   store.mintInfo.avatarConfig
    // )
    // const avatarConfig = fromAvatarStringToAvatarConfig(avatarString)
    // console.log('222', avatarConfig, avatarString)

    // 设置 avatar string
    store.mintInfo.avatarString = fromAvatarConfigToAvatarString(
      store.mintInfo.avatarConfig
    )
    store.mintInfo.avatarBase64 = store.mintInfo.canvas.toDataURL('image/png', 1)
    router.push('enter-info')
  }
</script>

<style scoped></style>

<template>
  <div>
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
    <MUModal
      v-if="openModal"
      close-icon
      @close="
        () => {
          openModal = false
        }
      "
    >
      <template #header>
        <h2>This avatar has been registered</h2>
      </template>
      <template #content>
        <div>This avatar has been taken. Please choose a new avatar.</div>
      </template>
    </MUModal>
  </div>
</template>

<script setup>
  import { ref } from 'vue'
  import ProcessCard from '../components/ProcessCard.vue'
  import MUButton from '../../../components/common/MUButton.vue'
  import MUModal from '@/components/feedback/MUModal.vue'
  import GenerateAvatar from './ components/GenerateAvatar.vue'
  import { fromAvatarConfigToAvatarString } from '@/utils/generateAvatar'
  // import { useRouter } from 'vue-router'
  import { useStore } from '@/store'
  import { useRouter } from 'vue-router'
  import { getOwner } from '@/services'

  const router = useRouter()
  const store = useStore()
  const openModal = ref(false)

  const handleNextClick = async () => {
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
    store.mintInfo.avatarBase64 = store.mintInfo.canvas.toDataURL(
      'image/png',
      1
    )
    try {
      console.log(store.mintInfo.avatarString)
      const res = await getOwner(store.mintInfo.avatarString)
      if (res && res === '0x0000000000000000000000000000000000000000') {
        router.push('enter-info')
      } else if (res) {
        openModal.value = true
      }
    } catch (e) {
      console.error(e)
    }
  }
</script>

<style scoped></style>

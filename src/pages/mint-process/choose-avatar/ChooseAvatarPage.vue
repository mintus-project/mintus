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
        <MUButton :is-loading="isLoading" @click="handleNextClick"
          >Next</MUButton
        >
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
  import { useStore } from '@/store'
  import { useRouter } from 'vue-router'
  import contractServices from '@/services/contract'
  import { useMessage } from 'naive-ui'
  import { MSG_DURATION } from '@/utils/constant'

  const message = useMessage()

  const router = useRouter()
  const store = useStore()
  const openModal = ref(false)
  const isLoading = ref(false)

  const handleNextClick = async () => {
    // 设置 avatar string
    isLoading.value = true
    store.mintInfo.avatarString = fromAvatarConfigToAvatarString(
      store.mintInfo.avatarConfig
    )
    store.mintInfo.avatarBase64 = store.mintInfo.canvas.toDataURL(
      'image/png',
      1
    )
    try {
      const res = await contractServices.getOwner(store.mintInfo.avatarString)
      if (res && res === '0x0000000000000000000000000000000000000000') {
        router.push('enter-info')
      } else if (res) {
        openModal.value = true
      }
    } catch (e) {
      message.error(e.message, { duration: MSG_DURATION })
      console.error(e)
    }
    isLoading.value = false
  }
</script>

<style scoped></style>

<template>
  <div>
    <MUSiteProfile>
      <PersonalInfo></PersonalInfo>
      <Exhibition></Exhibition>
    </MUSiteProfile>
  </div>
</template>

<script setup>
  import MUSiteProfile from '../../../components/site/MUSiteProfile.vue'
  import PersonalInfo from './components/PersonalInfo.vue'
  import Exhibition from './components/Exhibition.vue'
  import { useStore } from '@/store'
  import { useRoute } from 'vue-router'
  import contract from '@/services/contract'
  import { useMessage } from 'naive-ui'
  import { MSG_DURATION } from '@/utils/constant'
import { fromAvatarString5to7 } from '@/utils/generateAvatar'

  const message = useMessage()
  const store = useStore()
  const route = useRoute()
  const setProfile = async () => {
    try {
      const { avatarString, username, domains, addresses } = await contract.getRecord(
        route.params.address
      )
      const avatarString7 = fromAvatarString5to7(avatarString)
      store.profileInfo = {
        ...store.profileInfo,
        avatarString: avatarString7,
        username,
        domains,
        addresses
      }
    } catch (e) {
      message.error(e.message, { duration: MSG_DURATION })
    }
  }
  setProfile()
</script>

<style lang="scss" scoped></style>

<template>
  <MULoading :is-loading="isLoading">
    <MUSiteProfile>
      <PersonalInfo v-if="isThisUserExist && !isLoading" />
      <Exhibition v-if="isThisUserExist && !isLoading" />
      <NonExistPersonalInfo v-if="!isThisUserExist && !isLoading" />
    </MUSiteProfile>
  </MULoading>
</template>

<script setup>
  import { ref } from 'vue'
  import MUSiteProfile from '../../../components/site/MUSiteProfile.vue'
  import PersonalInfo from './components/PersonalInfo.vue'
  import Exhibition from './components/Exhibition.vue'
  import { useStore } from '@/store'
  import { useRoute } from 'vue-router'
  import contract from '@/services/contract'
  import { useMessage } from 'naive-ui'
  import { MSG_DURATION } from '@/utils/constant'
  import { fromAvatarString5to7 } from '@/utils/generateAvatar'
  import MULoading from '@/components/common/MULoading.vue'
  import NonExistPersonalInfo from './components/NonExistPersonalInfo.vue'

  const message = useMessage()
  const store = useStore()
  const route = useRoute()

  const isLoading = ref(false)
  const isThisUserExist = ref(true)

  const setProfile = async () => {
    console.log(
      '🚀 ~ file: ProfilePage.vue ~ line 56 ~ setProfile ~ setProfile',
      '-------setProfile+++++++'
    )
    try {
      isLoading.value = true
      const { avatarString, username, domains, addresses } =
        await contract.getRecord(route.params.address)
      isLoading.value = false

      if (avatarString) {
        const avatarString7 = fromAvatarString5to7(avatarString)
        store.profileInfo = {
          ...store.profileInfo,
          avatarString: avatarString7,
          username,
          domains,
          addresses
        }
      } else {
        isThisUserExist.value = false
      }
    } catch (e) {
      message.error(e.message, { duration: MSG_DURATION })
    }
  }
  setProfile()
</script>

<style lang="scss" scoped></style>

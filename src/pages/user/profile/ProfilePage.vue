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
  import { ref, watch } from 'vue'
  import MUSiteProfile from '../../../components/site/MUSiteProfile.vue'
  import PersonalInfo from './components/PersonalInfo.vue'
  import Exhibition from './components/Exhibition.vue'
  import { useStore } from '@/store'
  import { useRoute } from 'vue-router'
  import contractServices from '@/services/contract'
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
    try {
      // 防止路由跳转时因为路由参数中address=undefined而导致请求报错
      if (!route.params.address) return
      isLoading.value = true
      const { avatarString, username, domains, addresses } =
        await contractServices.getRecord(route.params.address)
      isLoading.value = false

      if (avatarString) {
        isThisUserExist.value = true
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
      console.error(e.message)
    }
  }
  // 防止路径参数中的address改变时页面没有及时刷新
  watch(() => route.params.address, setProfile, { immediate: true, deep: true })
</script>

<style lang="scss" scoped></style>

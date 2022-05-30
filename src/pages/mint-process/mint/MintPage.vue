<template>
  <div>
    <ProcessCard>
      <template #title>Ready to Mint?</template>
      <template #subtitle>
        Your unique NFT will be delivered to the connected wallet address.
      </template>
      <template #content>
        <div class="w-full p-6 flex flex-col items-center gap-6">
          <div class="avatar">
            <div class="w-[13.75rem] rounded-xl">
              <img src="https://api.lorem.space/image/face?hash=92048" />
            </div>
          </div>
          <span class="font-bold text-xl">{{ store.mintInfo.username }}</span>
          <div class="border px-3 py-2 rounded-full flex items-center gap-1">
            <MUCoin type="eth"></MUCoin>
            <span class="text-[#727272] font-normal">{{
              store.getShortAddress
            }}</span>
          </div>
        </div>
      </template>
      <template #footer>
        <MUButton btn-type="ghost" @click="$router.back()">Back</MUButton>
        <MUButton @click="handleMint"> Mint It </MUButton>
      </template>
    </ProcessCard>
    <BillModal
      v-if="state.billModal"
      @cancel="state.billModal = false"
      @confirm="handleConfirm"
    />
    <!-- Dialog Modal (Success / Failed) -->
    <MUPayResult
      v-if="state.dialogModal"
      :title="payResultConfig[resultModalType].title"
      :description="payResultConfig[resultModalType].description"
      :type="payResultConfig[resultModalType].type"
      :button-text="payResultConfig[resultModalType].buttonText"
      :close-callback="payResultConfig[resultModalType].closeCallback"
      :button-callback="payResultConfig[resultModalType].buttonCallback"
    />
  </div>
</template>

<script setup>
  import { reactive } from 'vue'
  import { useStore } from '@/store'
  import ProcessCard from '../components/ProcessCard.vue'
  import MUButton from '../../../components/common/MUButton.vue'
  import MUCoin from '../../../components/common/MUCoin.vue'
  import MUPayResult from '@/components/feedback/MUPayResult.vue'
  import { useRouter } from 'vue-router'
  import { computed } from '@vue/reactivity'
  import BillModal from '../components/BillModal.vue'

  const router = useRouter()

  const store = useStore()
  const state = reactive({
    billModal: false,
    completed: false,
    dialogModal: false
  })
  const handleMint = () => {
    state.billModal = true
  }
  const handleConfirm = async () => {
    const res = await addNft()
    state.billModal = false
    state.dialogModal = true
    if (res) {
      state.completed = true
      store.userInfo.purchased = true
    } else {
      state.completed = false
    }
  }
  const addNft = async () => {
    try {
      const { username, domains, addresses } = store.mintInfo
      console.log(
        111111,
        'avatarString',
        username,
        JSON.stringify(domains),
        JSON.stringify(addresses)
      )
      let tx = await store.mintContract.register(
        'avatarString',
        username,
        JSON.stringify(domains),
        JSON.stringify(addresses)
      ) // transaction
      await tx.wait() // 确定上链后
      const res = await store.mintContract.getRecord(store.walletInfo.address)
      store.profileInfo = {
        avatar: res[0],
        username: res[1],
        domains: JSON.parse(res[2]),
        addresses: JSON.parse(res[3])
      }
      console.log(222222, store.profileInfo)
      return true
    } catch (err) {
      return false
    }
  }

  const resultModalType = computed(() => {
    return state.completed ? 'success' : 'failed'
  })

  const payResultConfig = {
    success: {
      title: 'Success',
      description: 'Transaction completed successfully',
      type: 'success',
      buttonText: 'View my profile',
      closeCallback: () => {
        state.dialogModal = false
        router.push(`/profile/${store.walletInfo.address}`)
      },
      buttonCallback: () => {
        state.dialogModal = false
        router.push(`/profile/${store.walletInfo.address}`)
      }
    },
    failed: {
      title: 'Failed',
      description: 'Sorry, your transaction failed',
      type: 'failed',
      buttonText: 'Close',
      closeCallback: () => {
        state.dialogModal = false
      },
      buttonCallback: () => {
        state.dialogModal = false
      }
    }
  }
</script>

<style scoped></style>

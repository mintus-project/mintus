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
              <img :src="store.mintInfo.avatarBase64" />
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
      :gas-fee="state.gasFee"
      :service-fee="contract.registerServiceFee"
      :total-fee="state.totalFee"
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
  import contractServices from '@/services/contract'
  import contract from '@/utils/Contract.json'
  import { useMessage } from 'naive-ui'
  import { MSG_DURATION } from '@/utils/constant'
  import { fromAvatarString7to5 } from '@/utils/generateAvatar'

  const message = useMessage()
  const router = useRouter()

  const store = useStore()
  const state = reactive({
    billModal: false,
    gasFee: '0',
    totalFee: '0',
    completed: false,
    dialogModal: false
  })

  const handleMint = async () => {
    try {
      const { avatarString, username, domains, addresses } = store.mintInfo
      const res = await contractServices.checkBalance(
        store.walletInfo.address,
        contract.registerServiceFee
      )
      if (res) {
        const avatarString5 = fromAvatarString7to5(avatarString)
        const res = await contractServices.estimateRegisterGas(
          avatarString5,
          username,
          domains,
          addresses
        )
        state.gasFee = res[0]
        state.totalFee = res[1]
        state.billModal = true
      } else {
        throw new Error('Insufficient funds.')
      }
    } catch (e) {
      message.error(e.message)
      console.error(e.message)
    }
  }
  const handleConfirm = async () => {
    const res = await mintIt()
    state.dialogModal = true
    if (res) {
      state.completed = true
      store.userInfo.purchased = true
    } else {
      state.completed = false
    }
  }
  const mintIt = async () => {
    try {
      const { avatarString, username, domains, addresses } = store.mintInfo
      const avatarString5 = fromAvatarString7to5(avatarString)
      const res = await contractServices.register(
        avatarString5,
        username,
        domains,
        addresses
      )

      if (res) {
        const profile = await contractServices.getRecord(
          store.walletInfo.address
        )
        store.profileInfo = { ...store.profileInfo, ...profile }
        return true
      } else {
        return false
      }
    } catch (e) {
      message.error(e.message, { duration: MSG_DURATION })
      console.error(e.message)
    }
    state.billModal = false
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

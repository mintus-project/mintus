<template>
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
        <span class="font-bold text-xl">Username</span>
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
  import { ethers } from 'ethers'

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
    //TODO: 钱包支付逻辑

    const res = await addNft() // 支付结果
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
      // 先判断ethereum是否可用
      const { ethereum } = window
      if (!ethereum) {
        alert('Please install metamask')
        return false
      }
      // ethereum -> provider -> signer(执行合约的签名方)
      const provider = new ethers.providers.Web3Provider(ethereum)
      const signer = provider.getSigner()
      // 建立一个合约的实体（合约地址、合约ABI(之前由hardhat编译生成的Counter.json文件)、签名方）
      const CounterContract = new ethers.Contract(
        store.contractInfo.address,
        store.contractInfo.abi,
        signer
      )
      let tx = await CounterContract.add() // transaction
      await tx.wait() // 确定上链后
      const counts = await CounterContract.getCounts() // 值很大，通过对象返回了
      console.log('链上的count:', counts)
      return true
    } catch (err) {
      console.error(err)
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
        // router.push('/user/id-10304/profile')
      },
      buttonCallback: () => {
        state.dialogModal = false
        router.push(`/profile/${store.walletInfo.address}`)
        // router.push('/user/id-10304/profile')
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

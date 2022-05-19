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
          <span class="text-[#727272] font-normal">0x5B55...5f55</span>
        </div>
      </div>
    </template>
    <template #footer>
      <MUButton btn-type="ghost" @click="$router.back()">Back</MUButton>
      <MUButton @click="handleMint"> Mint It </MUButton>
    </template>
  </ProcessCard>
  <MUModal
    v-if="state.billModal"
    key="bill"
    :open="state.billModal"
    @close="state.billModal = false"
  >
    <template #header>Check the Bill</template>
    <template #content>
      <div class="flex justify-evenly">
        <MUWalletType show-name :type="store.walletInfo.type" />
        <MUWalletAddr :addr="store.walletInfo.address" show-badge />
      </div>
      <div class="divider my-0"></div>
      <div>xxx fe(Estimated) 0.1ETH</div>
      <div class="divider my-0"></div>
      <div>Total(Estimated) 4.12ETH</div>
    </template>
    <template #footer>
      <div class="flex justify-evenly">
        <MUButton btn-type="outline" @click="state.billModal = false"
          >Cancel</MUButton
        >
        <MUButton @click="handleConfirm">Confirm</MUButton>
      </div>
    </template>
  </MUModal>
  <div v-if="state.dialogModal">
    <MUModal
      key="suc"
      :open="state.completed"
      close-icon
      @close="
        () => {
          state.dialogModal = false
          $router.push('/user/id-10304/profile')
        }
      "
    >
      <template #header>Success</template>
      <template #content>
        <div>
          <svg
            width="68"
            height="68"
            viewBox="0 0 68 68"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M67.3332 33.9994C67.3332 52.4088 52.4093 67.3327 33.9998 67.3327H3.97883C1.03377 67.3327 -0.441126 63.7422 1.64135 61.6423L8.16483 55.0643C3.47765 49.3226 0.666504 41.9893 0.666504 33.9994C0.666504 15.5899 15.5903 0.666016 33.9998 0.666016C52.4093 0.666016 67.3332 15.5899 67.3332 33.9994ZM46.3569 29.6897C47.6586 28.388 47.6586 26.2774 46.3569 24.9757C45.0551 23.6739 42.9446 23.6739 41.6428 24.9757L30.6665 35.952L26.3569 31.6423C25.0551 30.3406 22.9446 30.3406 21.6428 31.6423C20.3411 32.9441 20.3411 35.0546 21.6428 36.3564L28.3095 43.023C28.9346 43.6482 29.7824 43.9994 30.6665 43.9994C31.5506 43.9994 32.3984 43.6482 33.0235 43.023L46.3569 29.6897Z"
              fill="#31C440"
            />
          </svg>
          <p>Transaction completed successfuly</p>
        </div>
      </template>
      <template #footer>
        <MUButton
          @click="
            () => {
              state.dialogModal = false
              $router.push('/user/id-10304/profile')
            }
          "
          >View my profile</MUButton
        >
      </template>
    </MUModal>
    <MUModal
      key="failed"
      :open="!state.completed"
      close-icon
      @close="state.dialogModal = false"
    >
      <template #header>Failed</template>
      <template #content>
        <div>
          <svg
            width="68"
            height="68"
            viewBox="0 0 68 68"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M67.3334 33.9994C67.3334 52.4088 52.4096 67.3327 34.0001 67.3327H3.97907C1.03401 67.3327 -0.440881 63.7422 1.64159 61.6423L8.16507 55.0643C3.47789 49.3226 0.666748 41.9893 0.666748 33.9994C0.666748 15.5899 15.5906 0.666016 34.0001 0.666016C52.4096 0.666016 67.3334 15.5899 67.3334 33.9994ZM44.6904 23.309C45.9922 24.6107 45.9922 26.7213 44.6904 28.023L38.7141 33.9994L44.6904 39.9757C45.9922 41.2774 45.9922 43.388 44.6904 44.6897C43.3887 45.9915 41.2781 45.9915 39.9764 44.6897L34.0001 38.7134L28.0238 44.6897C26.722 45.9915 24.6115 45.9915 23.3097 44.6897C22.008 43.388 22.008 41.2774 23.3097 39.9757L29.286 33.9994L23.3097 28.023C22.008 26.7213 22.008 24.6107 23.3097 23.309C24.6115 22.0072 26.722 22.0072 28.0238 23.309L34.0001 29.2853L39.9764 23.309C41.2781 22.0072 43.3887 22.0072 44.6904 23.309Z"
              fill="#FF3333"
            />
          </svg>
          <p>Sorry, your transaction failed</p>
        </div>
      </template>
      <template #footer>
        <MUButton @click="state.dialogModal = false">Close</MUButton>
      </template>
    </MUModal>
  </div>
</template>

<script setup>
  import { reactive } from 'vue'
  import { useStore } from '@/store'
  import ProcessCard from '../components/ProcessCard.vue'
  import MUButton from '../../../components/common/MUButton.vue'
  import MUCoin from '../../../components/common/MUCoin.vue'
  import MUModal from '@/components/feedback/MUModal.vue'
  import MUWalletType from '@/components/common/MUWalletType.vue'
  import MUWalletAddr from '@/components/common/MUWalletAddr.vue'
  // import { Icon } from '@iconify/vue'

  const store = useStore()
  const state = reactive({
    billModal: false,
    completed: false,
    dialogModal: false
  })
  const handleMint = () => {
    state.billModal = true
  }
  const handleConfirm = () => {
    //TODO: 钱包支付逻辑
    const suc = true // 支付结果
    state.billModal = false
    state.dialogModal = true
    if (suc) {
      state.completed = true
      store.userInfo.purchased = true
    } else {
      state.completed = false
    }
  }
</script>

<style scoped></style>

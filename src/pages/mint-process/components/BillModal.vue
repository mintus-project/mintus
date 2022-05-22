<template>
  <MUModal @close="emit('cancel')">
    <template #header>Check the Bill</template>
    <template #content>
      <div class="flex justify-evenly">
        <MUWalletType show-name :type="store.walletInfo.type" />
        <MUWalletAddr :addr="store.walletInfo.address" show-badge />
      </div>
      <div class="divider my-0"></div>
      <div class="flex justify-between">
        <p>xxx fe(Estimated)</p>
        <p>{{`${transInfo.basFee} ETH`}}</p>
      </div>
       <div class="flex justify-between">
        <p>xxx fe(Estimated)</p>
        <p>{{`${transInfo.priorityFee} ETH`}}</p>
      </div>
      <div class="divider my-0"></div>
      <div class="flex justify-between">
        <p>Total (Estimated)</p>
        <p>{{`${transInfo.total} ETH`}}</p>
      </div>
    </template>
    <template #footer>
      <div class="flex justify-evenly">
        <MUButton btn-type="outline" @click="emit('cancel')"
          >Cancel</MUButton
        >
        <MUButton @click="emit('confirm')">Confirm</MUButton>
      </div>
    </template>
  </MUModal>
</template>
<script setup>
  import { reactive } from 'vue'
  import { useStore } from '@/store'
  import MUModal from '@/components/feedback/MUModal.vue'
  import MUWalletType from '@/components/common/MUWalletType.vue'
  import MUWalletAddr from '@/components/common/MUWalletAddr.vue'
  import MUButton from '../../../components/common/MUButton.vue'
  const store = useStore()
  const transInfo = reactive({
    basFee: '0.1',
    priorityFee: '0.5',
    total: '4.12'
  })
  // eslint-disable-next-line no-undef
  const emit = defineEmits(['confirm', 'cancel'])

  // onMounted(() => {
  //   // getGasOracle
  // })

</script>
<style scoped></style>
<template>
  <MUModal @close="emit('cancel')">
    <template #header>Check the Bill</template>
    <template #content>
      <div class="py-8 flex justify-between">
        <MUWalletType
          show-name
          :type="store.walletInfo.type"
          class="text-[#727272] font-bold"
        />
        <MUWalletAddr :addr="store.walletInfo.address" show-badge />
      </div>

      <div class="border-t-[1px] my-2"></div>

      <div class="flex flex-col gap-6">
        <div class="flex justify-between items-center text-sm">
          <span>xxx fe (Estimated)</span>
          <span class="text-base font-bold">
            {{ `${transInfo.basFee} ETH` }}
          </span>
        </div>
        <div class="flex justify-between items-center text-sm">
          <span>xxx fe (Estimated)</span>
          <span class="text-base font-bold">
            {{ `${transInfo.priorityFee} ETH` }}
          </span>
        </div>
      </div>

      <div class="border-t-[1px] my-2"></div>

      <div class="flex justify-between items-center text-sm mb-8">
        <span>Total (Estimated)</span>
        <span class="text-xl font-bold">
          {{ `${transInfo.total} ETH` }}
        </span>
      </div>
    </template>
    <template #footer>
      <div class="flex justify-evenly">
        <MUButton btn-type="outline" @click="emit('cancel')">Cancel</MUButton>
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

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
      <MUButton @click="$router.push('/user/id-10304/profile')">
        Mint It
      </MUButton>
    </template>
  </ProcessCard>
</template>

<script setup>
  import ProcessCard from '../components/ProcessCard.vue'
  import MUButton from '../../../components/common/MUButton.vue'
  import MUCoin from '../../../components/common/MUCoin.vue'
</script>

<style scoped></style>

<template>
  <ProcessCard>
    <template #title>Ready to Mint?</template>
    <template #subtitle>
      Your unique NFT will be delivered to the connected wallet address.
    </template>
    <template #content></template>
    <template #footer>
      <MUButton btn-type="ghost" @click="$router.back()">Back</MUButton>
      <MUButton @click="$router.push('/user/id-10304/profile')">Mint It</MUButton>
    </template>
  </ProcessCard>
</template>

<script setup>
  import ProcessCard from '../components/ProcessCard.vue'
  import MUButton from '../../../components/common/MUButton.vue'
</script>

<style scoped></style>

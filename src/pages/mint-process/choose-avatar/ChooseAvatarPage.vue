<template>
  <ProcessCard>
    <template #title>Customize A Unique Avatar</template>
    <template #subtitle>
      Every avatar is a unique NFT that only belongs to you.
    </template>
    <template #content></template>
    <template #footer>
      <MUButton @click="$router.push('enter-info')">Next</MUButton>
    </template>
  </ProcessCard>
</template>

<script setup>
  import ProcessCard from '../components/ProcessCard.vue'
  import MUButton from '../../../components/common/MUButton.vue'
</script>

<style scoped></style>

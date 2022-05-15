<template>
  <ProcessCard>
    <template #title>Edit Your Profile</template>
    <template #subtitle>
      These information will display on your profile page.
    </template>
    <template #content></template>
    <template #footer>
      <MUButton btn-type="ghost" @click="$router.back()">Back</MUButton>
      <MUButton @click="$router.push('mint')">Next</MUButton>
    </template>
  </ProcessCard>
</template>

<script setup>
  import ProcessCard from '../components/ProcessCard.vue'
  import MUButton from '../../../components/common/MUButton.vue'
</script>

<style scoped></style>

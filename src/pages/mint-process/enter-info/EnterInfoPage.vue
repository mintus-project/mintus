<template>
  <ProcessCard>
    <template #title>Edit Your Profile</template>
    <template #subtitle>
      These information will display on your profile page.
    </template>
    <template #content>
      <form class="px-12 py-8 flex flex-col gap-4">
        <MUInput
          label="Username"
          placeholder="Please input your username"
          required
          class="w-96"
        ></MUInput>
        <MUInput
          label="Domain"
          placeholder="Please input your Domain"
          class="w-96"
        ></MUInput>
      </form>
    </template>
    <template #footer>
      <MUButton btn-type="ghost" @click="$router.back()">Back</MUButton>
      <MUButton @click="$router.push('mint')">Next</MUButton>
    </template>
  </ProcessCard>
</template>

<script setup>
  import ProcessCard from '../components/ProcessCard.vue'
  import MUButton from '../../../components/common/MUButton.vue'
  import MUInput from '../../../components/data-input/MUInput.vue'
</script>

<style scoped></style>

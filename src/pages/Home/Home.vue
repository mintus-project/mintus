<template>
  <div class="flex justify-center gap-2 p-10">
    <MUButton @click="$router.push('/mint-process/choose-avatar')"
      >Mint</MUButton
    >
    <MUButton btn-type="outline" @click="$router.push('/mint-process/choose-avatar')">
      Mint
    </MUButton>
  </div>
</template>

<script setup>
  import MUButton from '../../components/common/MUButton.vue'
</script>

<style lang="scss" scoped></style>

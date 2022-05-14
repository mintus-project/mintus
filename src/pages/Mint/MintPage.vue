<template>
  <div>
    <MUSiteMInt>
      <MUButton @click="$router.push('/profile')">Go to profile</MUButton>
    </MUSiteMInt>
  </div>
</template>

<script setup>
  import MUSiteMInt from '../../components/site/MUSiteMInt.vue'
  import MUButton from '../../components/common/MUButton.vue'
</script>

<style lang="scss" scoped></style>

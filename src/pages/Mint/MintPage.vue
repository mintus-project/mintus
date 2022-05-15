<template>
  <div>
    <MUSiteMInt>
      <MUButton @click="$router.push('/user/user1/profile')">Go to user1 profile</MUButton>
      <br/>
      <MUButton @click="$router.push('/user/user2/profile')">Go to user2 profile</MUButton>
    </MUSiteMInt>
  </div>
</template>

<script setup>
  import MUSiteMInt from '../../components/site/MUSiteMInt.vue'
  import MUButton from '../../components/common/MUButton.vue'
</script>

<style lang="scss" scoped></style>

<template>
  <div>
    <MUSiteProfile>
      <PersonalInfo></PersonalInfo>
      <Exhibition></Exhibition>
    </MUSiteProfile>
  </div>
</template>

<script setup>
  import MUSiteProfile from '../../components/site/MUSiteProfile.vue'
  import PersonalInfo from './components/PersonalInfo.vue'
  import Exhibition from './components/Exhibition.vue'
</script>

<style lang="scss" scoped></style>

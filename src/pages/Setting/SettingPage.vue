<template>
  <div>
    <MUSiteSetting>
      <template #sidebar>
        <button class="sidebar-item">Dashboard</button>
        <button class="sidebar-item active">Edit Profile</button>
      </template>
      <template #content>jjj</template>
    </MUSiteSetting>
  </div>
</template>

<script setup>
  import MUSiteSetting from '../../components/site/MUSiteSetting.vue'
</script>

<style scoped>
  .sidebar-item {
    @apply w-full font-bold text-sm py-4 px-8 rounded-xl text-left  hover:bg-[#EEEEEE] transition;
  }

  .active {
    @apply bg-[#EEEEEE];
  }
</style>

<template>
  <div class="flex flex-col items-center gap-10">
    <h1 class="font-black text-9xl">Enter Info</h1>
    <button class="btn" @click="$router.back()">back</button>
    <router-link class="btn" to="mint">confirm</router-link>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped></style>

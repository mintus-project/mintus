<template>
  <div class="overflow-x-auto shadow rounded-xl">
    <table class="table w-[40rem] text-sm">
      <tbody>
        <tr v-for="(item, index) in domains" :key="index">
          <th>{{ item }}</th>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
  import { ref } from 'vue'

  const domains = ref([
    'Domain111.eth',
    'Domain111.eth',
    'Domain111.eth',
    'Domain111.eth',
    'Domain111.eth',
    'Domain111.eth',
    'Domain111.eth',
    'Domain111.eth'
  ])
</script>

<style lang="scss" scoped></style>

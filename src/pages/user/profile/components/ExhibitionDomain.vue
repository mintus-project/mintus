<template>
  <div class="overflow-x-auto shadow rounded-xl">
    <table class="table w-[40rem] text-sm">
      <tbody
        v-if="store.profileInfo.domains.length === 0"
        class="flex justify-center p-4 text-sm text-gray-300"
      >
        - Empty -
      </tbody>
      <tbody v-else>
        <tr v-for="(item, index) in store.profileInfo.domains" :key="index">
          <th>{{ item }}</th>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
  import { useStore } from '@/store'

  const store = useStore()
</script>

<style lang="scss" scoped></style>

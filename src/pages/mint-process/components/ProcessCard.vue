<template>
  <div class="flex flex-col items-center gap-8">
    <MUTitle>
      <template #title>
        <slot name="title"></slot>
      </template>
      <template #subtitle>
        <slot name="subtitle"></slot>
      </template>
    </MUTitle>
    <div class="flex flex-col gap-8">
      <!-- card -->
      <div
        class="min-w-[16rem] min-h-[23rem] max-h-[55vh] overflow-auto bg-white rounded-xl my-shadow"
      >
        <slot name="content"></slot>
      </div>
      <!-- back & next -->
      <div class="flex justify-end gap-4">
        <slot name="footer"></slot>
      </div>
    </div>
  </div>
</template>

<script setup>
import MUTitle from '@/components/typography/MUTitle.vue';</script>

<style scoped></style>

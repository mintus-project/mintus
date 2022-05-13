<script setup>
  import MUButton from './components/common/MUButton.vue'
  import MUTag from './components/common/MUTag.vue'
  import MUIconButton from './components/common/MUIconButton.vue'
</script>

<template>
  <button>{{ $t('message1') }}</button>
  <MUButton :disabled="false">{{ $t('message1') }}</MUButton>
  <br />
  <MUButton :disabled="true">Next</MUButton>
  <br />
  <MUTag :disabled="false">Hair</MUTag>
  <br />
  <MUTag :disabled="true">Hair</MUTag>
  <br />
  <MUIconButton :disabled="false">Setting</MUIconButton>
  <br />
  <MUIconButton :disabled="true">Setting</MUIconButton>

  <router-view></router-view>
</template>

<style></style>

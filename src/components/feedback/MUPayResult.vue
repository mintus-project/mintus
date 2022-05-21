<template>
  <MUModal open close-icon @close="props.closeCallback">
    <template #header>{{ props.title }}</template>
    <template #content>
      <div class="flex flex-col items-center justify-evenly gap-3 h-52">
        <svg
          v-if="props.type === 'success'"
          width="68"
          height="68"
          viewBox="0 0 68 68"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M67.3332 33.9994C67.3332 52.4088 52.4093 67.3327 33.9998 67.3327H3.97883C1.03377 67.3327 -0.441126 63.7422 1.64135 61.6423L8.16483 55.0643C3.47765 49.3226 0.666504 41.9893 0.666504 33.9994C0.666504 15.5899 15.5903 0.666016 33.9998 0.666016C52.4093 0.666016 67.3332 15.5899 67.3332 33.9994ZM46.3569 29.6897C47.6586 28.388 47.6586 26.2774 46.3569 24.9757C45.0551 23.6739 42.9446 23.6739 41.6428 24.9757L30.6665 35.952L26.3569 31.6423C25.0551 30.3406 22.9446 30.3406 21.6428 31.6423C20.3411 32.9441 20.3411 35.0546 21.6428 36.3564L28.3095 43.023C28.9346 43.6482 29.7824 43.9994 30.6665 43.9994C31.5506 43.9994 32.3984 43.6482 33.0235 43.023L46.3569 29.6897Z"
            fill="#31C440"
          />
        </svg>

        <svg
          v-if="props.type === 'failed'"
          width="68"
          height="68"
          viewBox="0 0 68 68"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M67.3334 33.9994C67.3334 52.4088 52.4096 67.3327 34.0001 67.3327H3.97907C1.03401 67.3327 -0.440881 63.7422 1.64159 61.6423L8.16507 55.0643C3.47789 49.3226 0.666748 41.9893 0.666748 33.9994C0.666748 15.5899 15.5906 0.666016 34.0001 0.666016C52.4096 0.666016 67.3334 15.5899 67.3334 33.9994ZM44.6904 23.309C45.9922 24.6107 45.9922 26.7213 44.6904 28.023L38.7141 33.9994L44.6904 39.9757C45.9922 41.2774 45.9922 43.388 44.6904 44.6897C43.3887 45.9915 41.2781 45.9915 39.9764 44.6897L34.0001 38.7134L28.0238 44.6897C26.722 45.9915 24.6115 45.9915 23.3097 44.6897C22.008 43.388 22.008 41.2774 23.3097 39.9757L29.286 33.9994L23.3097 28.023C22.008 26.7213 22.008 24.6107 23.3097 23.309C24.6115 22.0072 26.722 22.0072 28.0238 23.309L34.0001 29.2853L39.9764 23.309C41.2781 22.0072 43.3887 22.0072 44.6904 23.309Z"
            fill="#FF3333"
          />
        </svg>
        <p>{{ props.description }}</p>
      </div>
    </template>
    <template #footer>
      <MUButton @click="props.buttonCallback">{{ props.buttonText }}</MUButton>
    </template>
  </MUModal>
</template>
<script setup>
  import MUModal from './MUModal.vue'
  import MUButton from '../common/MUButton.vue'
  import { defineProps } from 'vue'
  const props = defineProps({
    closeCallback: {
      required: true,
      type: Function,
      default: () => {}
    },
    title: {
      required: true,
      type: String,
      default: 'Success'
    },
    description: {
      type: String,
      default: 'Transaction completed successfully'
    },
    type: {
      required: true,
      type: String,
      default: 'success',
      validator(value) {
        return ['success', 'failed'].includes(value)
      }
    },
    buttonCallback: {
      required: true,
      type: Function,
      default: () => {}
    },
    buttonText: {
      required: true,
      type: String,
      default: 'View my profile'
    }
  })
</script>
<style scoped></style>

<template>
  <div>
    <MUSiteDynamicBackground>
      <router-view v-slot="{ Component, route }" class="mt-[15vh] mb-[18vh]">
        <transition :name="route.meta.transitionName">
          <component :is="Component" />
        </transition>
      </router-view>
    </MUSiteDynamicBackground>
  </div>
</template>

<script setup>
  import MUSiteDynamicBackground from '../../components/site/MUSiteDynamicBackground.vue'
</script>

<style scoped>
  .slide-left-leave-active {
    transition: .6s ease-in-out;
  }
  .slide-left-enter-active {
    transition: 2.5s;
  }
  .slide-left-enter-from {
    transform: translate(100vw, 0);
    opacity: 0;
  }
  .slide-left-leave-to {
    transform: translate(-100vw, 0);
    opacity: 0;
  }


  .slide-right-leave-active {
    transition: .6s ease-in-out;
  }
  .slide-right-enter-active {
    transition: 2.5s;
  }
  .slide-right-enter-from {
    transform: translate(-100vw, 0);
    opacity: 0;
  }
  .slide-right-leave-to {
    transform: translate(100vw, 0);
    opacity: 0;
  }
</style>

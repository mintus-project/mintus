<template>
  <div>
    <MUNavbar class="fixed"></MUNavbar>
    <div
      class="dynamic-background min-h-screen pt-[20vh] flex flex-col items-center"
    >
      <slot></slot>
    </div>
  </div>
</template>

<script setup>
  import MUNavbar from './MUNavbar.vue'
</script>

<style scoped>
  .dynamic-background {
    background-color: #ffffff;
    background-image: radial-gradient(
        closest-side,
        rgb(255, 228, 222),
        rgba(246, 228, 255, 0)
      ),
      radial-gradient(closest-side, rgb(255, 230, 247), rgba(211, 211, 255, 0)),
      radial-gradient(closest-side, rgb(212, 230, 243), rgba(239, 251, 255, 0)),
      radial-gradient(closest-side, rgb(220, 212, 243), rgba(221, 208, 255, 0)),
      radial-gradient(closest-side, rgb(246, 231, 255), rgba(224, 247, 255, 0));
    background-size: 130vmax, 130vmax, 80vmax, 80vmax, 90vmax, 90vmax, 110vmax,
      110vmax, 90vmax, 90vmax;
    background-position: -80vmax -80vmax, 60vmax -30vmax, 10vmax 10vmax,
      -30vmax -10vmax, 50vmax 50vmax;
    background-repeat: no-repeat;
    animation: 8s movement linear infinite;
    text-shadow: 0px 0px 1px rgba(255, 255, 255, 0.6),
      0px 4px 4px rgba(0, 0, 0, 0.05);
  }

  @keyframes movement {
    0%,
    100% {
      background-size: 130vmax 130vmax, 80vmax 80vmax, 90vmax 90vmax,
        110vmax 110vmax, 90vmax 90vmax;
      background-position: -80vmax -80vmax, 60vmax -30vmax, 10vmax 10vmax,
        -30vmax -10vmax, 50vmax 50vmax;
    }
    25% {
      background-size: 100vmax 100vmax, 90vmax 90vmax, 100vmax 100vmax,
        90vmax 90vmax, 60vmax 60vmax;
      background-position: -60vmax -90vmax, 50vmax -40vmax, 0vmax -20vmax,
        -40vmax -20vmax, 40vmax 60vmax;
    }
    50% {
      background-size: 80vmax 80vmax, 110vmax 110vmax, 80vmax 80vmax,
        60vmax 60vmax, 80vmax 80vmax;
      background-position: -50vmax -70vmax, 40vmax -30vmax, 10vmax 0vmax,
        20vmax 10vmax, 30vmax 70vmax;
    }
    75% {
      background-size: 90vmax 90vmax, 90vmax 90vmax, 100vmax 100vmax,
        90vmax 90vmax, 70vmax 70vmax;
      background-position: -50vmax -40vmax, 50vmax -30vmax, 20vmax 0vmax,
        -10vmax 10vmax, 40vmax 60vmax;
    }
  }
</style>

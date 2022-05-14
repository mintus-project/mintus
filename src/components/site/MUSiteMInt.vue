<template>
  <div>
    <MUNavbar class="fixed"></MUNavbar>
    <div
      class="dynamic-background pt-14 min-h-screen flex flex-col items-center justify-center"
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
    background-color: #c1d5ef;
    background-image: radial-gradient(
        closest-side,
        rgb(236, 211, 205),
        rgba(235, 105, 78, 0)
      ),
      radial-gradient(
        closest-side,
        rgb(246, 209, 234),
        rgba(243, 11, 164, 0)
      ),
      radial-gradient(
        closest-side,
        rgb(243, 238, 212),
        rgba(254, 234, 131, 0)
      ),
      radial-gradient(
        closest-side,
        rgb(220, 212, 243),
        rgba(170, 142, 245, 0)
      ),
      radial-gradient(
        closest-side,
        rgb(242, 213, 190),
        rgba(248, 192, 147, 0)
      );
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

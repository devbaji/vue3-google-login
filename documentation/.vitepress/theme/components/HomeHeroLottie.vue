<script setup>
import { withBase } from 'vitepress'
</script>

<template>
  <ClientOnly>
    <lottie-player
      class="home-hero-lottie"
      :src="withBase('/images/vue-google-login.json')"
      background="transparent"
      speed="1"
      autoplay
    />
  </ClientOnly>
</template>

<style scoped>
.home-hero-lottie {
  width: 300px;
  height: auto;
}
</style>

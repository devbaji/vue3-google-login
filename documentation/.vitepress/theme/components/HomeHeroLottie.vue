<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { withBase } from 'vitepress'

const container = ref(null)
let animation = null

onMounted(async () => {
  const initializeLottie = async () => {
    if (!container.value) {
      return
    }

    const lottie = await import('lottie-web/build/player/lottie_light')
    animation = lottie.default.loadAnimation({
      container: container.value,
      renderer: 'svg',
      loop: false,
      autoplay: true,
      path: withBase('/images/vue-google-login.json'),
      rendererSettings: {
        preserveAspectRatio: 'xMidYMid meet',
      },
    })
  }

  if ('requestIdleCallback' in window) {
    window.requestIdleCallback(() => {
      initializeLottie()
    })
    return
  }

  window.setTimeout(() => {
    initializeLottie()
  }, 0)
})

onBeforeUnmount(() => {
  animation?.destroy()
})
</script>

<template>
  <ClientOnly>
    <div class="home-hero-lottie-wrap" aria-hidden="true">
      <div ref="container" class="home-hero-lottie" />
    </div>
  </ClientOnly>
</template>

<style scoped>
.home-hero-lottie-wrap {
  width: 300px;
  min-height: 300px;
}

.home-hero-lottie {
  width: 300px;
  height: 300px;
}

@media (max-width: 768px) {
  .home-hero-lottie-wrap {
    margin-bottom: 40px;
  }
}
</style>

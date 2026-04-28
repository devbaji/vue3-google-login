<script setup>
import DefaultTheme from 'vitepress/theme'
import { useData, withBase } from 'vitepress'
import HomeHeroLottie from './components/HomeHeroLottie.vue'

const { isDark } = useData()
const { Layout } = DefaultTheme

const toggleAppearance = () => {
  isDark.value = !isDark.value
}
</script>

<template>
  <Layout>
    <template #home-hero-image>
      <HomeHeroLottie />
    </template>
    <template #nav-bar-content-after>
      <div class="my-navbar">
        <button
          class="mobile-theme-toggle mobile-only"
          type="button"
          :aria-label="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
          @click="toggleAppearance"
        >
          {{ isDark ? '☀' : '🌙' }}
        </button>
        <a href="https://github.com/devbaji/vue3-google-login" target="_blank" aria-label="GitHub">
          <img :src="withBase('/images/github.svg')" alt="GitHub" class="action-icon github-icon">
        </a>
        <a href="https://www.buymeacoffee.com/developerbaji" target="_blank">
          <img :src="withBase('/images/buyme-coffee.webp')" alt="Buy Me A Coffee" class="action-icon buy-me-coffee desktop-only">
          <img :src="withBase('/images/buyme-coffee-small.webp')" alt="Buy Me A Coffee" class="action-icon buy-me-coffee mobile-only">
        </a>
        <a href="https://paypal.me/devbaji" target="_blank">
          <img :src="withBase('/images/paypal.png')" alt="Paypal" class="action-icon paypal desktop-only">
          <img :src="withBase('/images/paypal-small.png')" alt="Paypal" class="action-icon paypal mobile-only">
        </a>
      </div>
    </template>
  </Layout>
</template>

<style>
.my-navbar {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-left: 8px;
}
.action-icon {
  height: 32px;
  width: auto;
}
.github-icon {
  height: 24px;
}
.paypal {
  border-radius: 5px;
}
.mobile-only {
  display: none;
}
.mobile-theme-toggle {
  border: 0;
  background: transparent;
  color: var(--vp-c-text-1);
  cursor: pointer;
  font-size: 14px;
  line-height: 1;
  padding: 0;
}
@media (max-width: 768px) {
  .VPNavBarTitle .title {
    font-size: 14px;
  }

  .VPNavBar .content-body {
    position: relative;
  }

  .my-navbar a {
    display: flex;
    align-items: flex-start;
    border-radius: 3px;
    overflow: hidden;
  }

  .my-navbar img {
    height: 17px;
  }
  .desktop-only {
    display: none;
  }
  .mobile-only {
    display: inline-block;
  }
  .mobile-theme-toggle.mobile-only {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 14px;
    height: 14px;
  }

  .action-icon {
    height: 20px;
  }

  .DocSearch-Button {
    width: auto;
  }


  /* Keep only search icon + custom action row in mobile header. */
  .VPNavBarHamburger {
    display: none !important;
  }

  /* Hide default appearance switch; use custom mobile toggle instead. */
  .VPSwitchAppearance {
    display: none !important;
  }
}
</style>

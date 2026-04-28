<script setup>
import DefaultTheme from 'vitepress/theme'
import { withBase } from 'vitepress'
const { Layout } = DefaultTheme
</script>

<template>
  <Layout>
    <template #nav-bar-content-after>
      <div class="my-navbar">
        <a href="https://www.buymeacoffee.com/developerbaji" target="_blank">
          <img :src="withBase('/images/buyme-coffee.webp')" alt="Buy Me A Coffee" class="buy-me-coffee">
          <img :src="withBase('/images/buyme-coffee-small.webp')" alt="Buy Me A Coffee" class="buy-me-coffee-small">
        </a>
        <a href="https://paypal.me/devbaji" target="_blank">
          <img :src="withBase('/images/paypal.png')" alt="Paypal" class="paypal">
          <img :src="withBase('/images/paypal-small.png')" alt="Paypal" class="paypal-small">
        </a>
      </div>
    </template>
  </Layout>
</template>

<style>
.my-navbar {
  display: flex;
  align-items: center;
  gap: 6px;
  margin-left: 8px;
}
.buy-me-coffee {
  height: 32px;
  width: auto;
}
.paypal {
  height: 32px;
  width: auto;
  border-radius: 5px;
}
.buy-me-coffee-small,
.paypal-small {
  display: none;
  height: 22px;
  width: auto;
  border-radius: 4px;
}
@media (max-width: 768px) {
  .buy-me-coffee,
  .paypal {
    display: none;
  }
  .buy-me-coffee-small,
  .paypal-small {
    display: inline-block;
  }
}
</style>

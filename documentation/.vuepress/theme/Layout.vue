<script setup>
import ParentLayout from "@vuepress/theme-default/lib/client/layouts/Layout.vue";
</script>

<template>
  <ParentLayout>
    <template #navbar-after>
      <div class="my-navbar">
        <a href="https://www.buymeacoffee.com/developerbaji" target="_blank"><img src="/images/buyme-coffee.webp" alt="Buy Me A Coffee" class="buy-me-coffee"></a>
        <a href="https://paypal.me/devbaji" target="_blank"><img src="/images/paypal.png" alt="Paypal" class="paypal"></a>
        <a href="https://www.buymeacoffee.com/developerbaji" target="_blank"><img src="/images/buyme-coffee-small.webp" alt="Buy Me A Coffee" class="buy-me-coffee-small"></a>
        <a href="https://paypal.me/devbaji" target="_blank"><img src="/images/paypal-small.png" alt="Paypal" class="paypal-small"></a>
        <a href="https://github.com/devbaji/vue3-google-login/">
          <img src="https://devbaji.github.io/images/github.svg?sdsd=45" />
          GitHub
        </a>
      </div>
    </template>
    <template #page-bottom>
      <div class="my-footer">
        MIT Licensed | Copyright © 2022-present <a href="https://devbaji.github.io">Ananthakrishnan Baji</a>
      </div>
    </template>
  </ParentLayout>
</template>

<style lang="css">
.buy-me-coffee {
  height: 32px;
  margin-right: 5px;
  width: auto !important;
}
.paypal {
  height: 32px;
  width: auto !important;
  border-radius: 5px;
  margin-right: 5px;
  overflow: hidden;
}
.paypal-small, .buy-me-coffee-small {
  display: none;
  width: 20px !important;
  border-radius: 5px;
  margin-right: 5px;
  overflow: hidden;
}
div[class*="language-"] .copy-code-pure-button {
  z-index: 2;
  opacity: 0;
  background-color: transparent;
  padding: 5px;
  border-radius: 2px;
  transition: opacity 0.3s;
  margin-top: 5px;
}
div[class*="language-"]:hover .copy-code-pure-button {
  opacity: 1;
}
.my-footer {
  text-align: center;
  margin-top: -40px;
}
.my-navbar {
  margin-top: 2px;
}
.my-navbar img {
  width: 20px;
  margin-top: -4px;
  vertical-align: middle;
}
.suggestions {
  position: fixed;
  max-width: calc(100vw - 3rem) !important;
  width: 500px;
}
.suggestion-row .page-title {
  display: none;
}
.suggestion-row .suggestion-content {
  width: 100% !important;
}
@media only screen and (max-width: 600px) {
  .search-box {
    display: none;
  }
  .my-navbar {
    font-size: 9px;
    margin-right: -15px;
    margin-top: 2px;
  }
  .my-navbar img {
    width: 15px;
  }
  .paypal, .buy-me-coffee {
    display: none;
  }
  .paypal-small, .buy-me-coffee-small {
    display: inline-block;
  }
  .site-name {
    font-size: 17px !important;
  }
}
</style>

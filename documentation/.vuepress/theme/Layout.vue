<script setup>
import ParentLayout from "@vuepress/theme-default/lib/client/layouts/Layout.vue";
</script>

<template>
  <ParentLayout>
    <template #navbar-after>
      <div class="my-navbar">
        <a href="https://github.com/devbaji/vue3-google-login/">
          <img src="https://devbaji.github.io/images/github.svg?sdsd=45" />
          GitHub
        </a>
      </div>
    </template>
    <template #page-bottom>
      <div class="my-footer">
        MIT Licensed | Copyright © 2022-present
        <a href="https://devbaji.github.io">Ananthakrishnan Baji</a>
      </div>
    </template>
  </ParentLayout>
</template>

<style lang="css">
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
@media only screen and (max-width: 600px) {
  .my-navbar {
    font-size: 9px;
    margin-right: -15px;
    margin-top: 2px;
  }
  .my-navbar img {
    width: 15px;
  }
}
</style>

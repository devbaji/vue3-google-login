---
title: Nuxt 3 / Nuxt 4
order: 6
---

# Nuxt 3 / Nuxt 4

## Using the Nuxt Module (Recommended)

The easiest way to use vue3-google-login in a Nuxt app is via **[nuxt-vue3-google-login](https://www.npmjs.com/package/nuxt-vue3-google-login)** — compatible with both Nuxt 3 and Nuxt 4. It handles SSR safety, auto-imports components and utility functions, and requires zero boilerplate.

```bash
npx nuxi@latest module add nuxt-vue3-google-login
```

Then add your Client ID to `nuxt.config.ts`:

```ts
export default defineNuxtConfig({
  modules: ['nuxt-vue3-google-login'],
  googleLogin: {
    clientId: 'YOUR_GOOGLE_CLIENT_ID',
  },
})
```

All components and utility functions are auto-imported — no import statements needed:

```vue
<template>
  <GoogleLogin :callback="onSuccess" />
</template>

<script setup>
function onSuccess(response) {
  const user = decodeCredential(response.credential)
}
</script>
```

## Manual Setup (Without the Nuxt Module)

If you prefer to set it up manually, create a file named `vue3-google-login.client.ts` inside the `plugins` directory. This will register the `GoogleLogin` component globally.

> :exclamation: Make sure to use the `.client` suffix in the file name to load the plugin only on the client side.

```js
// plugins/vue3-google-login.client.ts
import vue3GoogleLogin from 'vue3-google-login'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(vue3GoogleLogin, {
    clientId: 'YOUR_GOOGLE_CLIENT_ID'
  })
});
```

Then wrap `<GoogleLogin>` in Nuxt's [`<ClientOnly>`](https://nuxt.com/docs/api/components/client-only) component to prevent SSR errors:

```vue
<ClientOnly>
  <GoogleLogin :callback="callback" client-id="YOUR_GOOGLE_CLIENT_ID"/>
</ClientOnly>
```

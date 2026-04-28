---
title: No SSR Support
order: 7
---

# No SSR Support

The [GoogleLogin component](./getting-started#using-the-googlelogin-component)  doesn't render properly on the server side because the Google login button relies on an iframe provided by Google and needs the [Google 3P Authorization JavaScript Library](https://developers.google.com/identity/oauth2/web/guides/load-3p-authorization-library) to be loaded on the client side. If you are using SSR-supporting frameworks like Nuxt or Quasar, make sure the GoogleLogin component is rendered on the client side.

> :bulb: You can also directly import the GoogleLogin component and use the `client-id` prop if you don't wish to initialize the plugin globally at the framework entry point.

## Quasar in SSR Mode

You can use the [`QNoSsr` component](https://quasar.dev/vue-components/no-ssr/) for rendering the login button on the client side while running a Quasar app in SSR mode:

```vue
<q-no-ssr>
  <GoogleLogin :callback="callback" client-id="YOUR_GOOGLE_CLIENT_ID"/>
</q-no-ssr>
```

## Vike

In Vike applications, you can use the [clientOnly helper](https://vike.dev/clientOnly#vue), which renders a component only on the client side:

```vue
<template>
  <GoogleLogin :callback="callback" client-id="YOUR_GOOGLE_CLIENT_ID"/>
</template>

<script setup lang="ts">
import { clientOnly } from 'vike-vue/clientOnly'
const GoogleLogin = clientOnly(async () => (await import('vue3-google-login')).GoogleLogin);
</script>
```

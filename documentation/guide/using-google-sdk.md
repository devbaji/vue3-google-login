---
title: Using Google SDK
order: 3
---

# Using Google SDK

If you want to directly use the API provided by [Google Identity Services JavaScript SDK](https://developers.google.com/identity/oauth2/web/guides/load-3p-authorization-library) without even initializing the plugin, you can use the `googleSdkLoaded` wrapper function. This will run an action in which you can use the API directly, and under the hood it will make sure that this action is performed only after the SDK library is fully loaded.

Here is an example showing how we can use `googleSdkLoaded` to create a custom login button:

```vue
<script setup>
import { googleSdkLoaded } from "vue3-google-login"
const login = () => {
  googleSdkLoaded((google) => {
    google.accounts.oauth2.initCodeClient({
      client_id: 'YOUR_GOOGLE_CLIENT_ID',
      scope: 'email profile openid',
      callback: (response) => {
        console.log("Handle the response", response)
      }
    }).requestCode()
  })
}
</script>

<template>
  <button @click="login">Login Using Google</button>
</template>
```

> :bulb: You can find the docs on how to use this SDK [here](https://developers.google.com/identity/oauth2/web/reference/js-reference) and [here](https://developers.google.com/identity/gsi/web/reference/js-reference)

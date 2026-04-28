---
title: TypeScript
order: 4
---

# TypeScript

If you are using Vue 3 with TypeScript you may need to add a type to the callback function triggered by the [GoogleLogin component](../guide/getting-started#using-the-googlelogin-component). You can do this by importing `CallbackTypes`.

> :warning: If you are trying to implement a custom button and one-tap login using the GoogleLogin component alone [like this](./server-side-validation#combination-of-one-tap-prompt-and-custom-button), you cannot add a type to the callback.  Instead you can add `any` type to the callback response, or the recommended way is to implement this using `googleOneTap` and `googleAuthCodeLogin`/`googleTokenLogin` functions.

## CredentialCallback

Use `CredentialCallback` type for the callback of the Google rendered login button using the [GoogleLogin component](../guide/getting-started#using-the-googlelogin-component). You can also use this type for the callback from One-Tap/Automatic Login prompts:

```vue
<script setup lang="ts">
import type { CallbackTypes } from "vue3-google-login";
const callback: CallbackTypes.CredentialCallback = (response) => {
  // This callback will be triggered when the user selects or login to
  // his Google account from the popup
  console.log("Credential JWT string", response.credential);
};
</script>

<template>
  <GoogleLogin :callback="callback" />
</template>
```

## CodeResponseCallback

Use `CodeResponseCallback` type for the callback triggered by the [GoogleLogin component](../guide/getting-started#using-the-googlelogin-component) when a [custom button is kept as slot](../guide/custom-button#custom-button-as-slot):

```vue
<script setup lang="ts">
import type { CallbackTypes } from "vue3-google-login";
const callback: CallbackTypes.CodeResponseCallback = (response) => {
  console.log("Authorisation code", response.code);
};
</script>

<template>
  <GoogleLogin :callback="callback">
    <button>Login Using Google</button>
  </GoogleLogin>
</template>
```

## TokenResponseCallback

Use `TokenResponseCallback` type for the callback triggered by the [GoogleLogin component](../guide/getting-started#using-the-googlelogin-component) when a [custom button is kept as slot](../guide/custom-button#custom-button-as-slot) and `popup-type` prop is set to `TOKEN`:

```vue
<script setup lang="ts">
import type { CallbackTypes } from "vue3-google-login";
const callback: CallbackTypes.TokenResponseCallback = (response) => {
  console.log("Access token", response.access_token);
};
</script>

<template>
  <GoogleLogin :callback="callback" popup-type="TOKEN">
    <button>Login Using Google</button>
  </GoogleLogin>
</template>
```

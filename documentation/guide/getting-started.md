---
title: Getting Started
order: 1
---


# Getting Started

## Installation

Install the vue3-google-login package using your preferred package manager:

::: code-group

```sh [npm]
npm install vue3-google-login
```

```sh [pnpm]
pnpm add vue3-google-login
```

```sh [yarn]
yarn add vue3-google-login
```

```sh [bun]
bun add vue3-google-login
```

:::

**CDN:**
If you prefer to use vue3-google-login via a CDN, you can include the following script in your HTML file:
```html
<script src="https://cdn.jsdelivr.net/npm/vue3-google-login@2.0.36/dist/index.umd.min.js"></script>
```

## Initialize the Plugin

Initialize the vue3-google-login plugin in your `main.js` or `main.ts` file. This will register the `GoogleLogin` component globally and configure Google OAuth2 authentication for your Vue 3 application:

```javascript
import { createApp } from 'vue'
import App from './App.vue'
import vue3GoogleLogin from 'vue3-google-login'

const app = createApp(App)

app.use(vue3GoogleLogin, {
  clientId: 'YOUR_GOOGLE_CLIENT_ID'
})

app.mount('#app')
```

> 💡 **Tip:** If you don't want to initialize and register the `GoogleLogin` component globally, you can directly import it from `vue3-google-login` package and use the `client-id` prop. Some functions also accept a `clientId` option to avoid initializing the plugin. See the [Options](../reference/options) page for more details.

## Using the GoogleLogin Component

Once the plugin is installed and initialized, you can use the `GoogleLogin` component anywhere in your Vue 3 application. This component renders a Google sign-in button that opens a popup for Google OAuth2 authentication:

```vue
<script setup>
const callback = (response) => {
  // This callback will be triggered when the user selects or login to
  // his Google account from the popup
  console.log("Handle the response", response)
}
</script>

<template>
  <GoogleLogin :callback="callback"/>
</template>
```

Here is an image showing the Google sign-in button rendered by Google Identity Services:
<p align="center">
  <img 
    src="/images/sign-in-with-google.svg"
    alt="Sign in with Google Button"
  >
</p>

## One Tap Prompt

For this feature set the prop `prompt` to true, this will open a prompt with the list of logged in Google accounts of the user, now user can just tap on his prefered account to easily login to your application

```vue
<script setup>
const callback = (response) => {
  // This callback will be triggered when user click on the One Tap prompt
  // This callback will be also triggered when user click on login button 
  // and selects or login to his Google account from the popup
  console.log("Handle the response", response)
}
</script>

<template>
  <GoogleLogin :callback="callback" prompt/>
</template>
```

Or use `googleOneTap` function

```vue
<script setup>
import { onMounted } from "vue"
import { googleOneTap } from "vue3-google-login"

onMounted(() => {
  googleOneTap()
    .then((response) => {
      // This promise is resolved when user selects an account from the the One Tap prompt
      console.log("Handle the response", response)
    })
    .catch((error) => {
      console.log("Handle the error", error)
    })
})

</script>

<template>
  <div>One-Tap prompt will be shown once this component is mounted</div>
</template>
```

> :information_source: If the user closes the One Tap prompt manually, the One Tap prompt will be suppressed, see [here](https://developers.google.com/identity/gsi/web/guides/features#exponential_cooldown) for more info

Here is an image showing the Google One Tap prompt in action:

<p align="center">
  <img 
    src="https://devbaji.github.io/vue3-google-login/images/one-tap-prompt.gif"
    alt="Google One Tap Login Prompt Demo"
    width="250"
  >
</p>

## Use of googleLogout Function

While using One-tap feature, a [dead-loop UX issue](https://developers.google.com/identity/gsi/web/guides/automatic-sign-in-sign-out#sign-out) may occur. To resolve this issue, in your logout function run `googleLogout` function

```javascript
import { googleLogout } from "vue3-google-login"
const yourLogoutFunction = () => {
  // your logout logics
  googleLogout()
}
```

> :exclamation: Function `googleLogout` is used to temporarily disable One Tap Automatic sign-in for one day. This API does not sign out your users out of your website or any Google websites.

## Automatic Login

To enable this feature, set the prop `autoLogin` to true, this will automatically detects whether only one Google account is logged in, if yes then prompt will automatically log in and will trigger the callback without any user interactions, to make this work `prompt` must be set to true

```vue
<script setup>
const callback = (response) => {
  // This callback will be triggered automatically 
  // if one single Google account is already logged in
  console.log("Handle the response", response)
}
</script>

<template>
  <GoogleLogin :callback="callback" prompt auto-login/>
</template>
```

Or use `googleOneTap` function and set `autoLogin` option to true

```vue
<script setup>
import { onMounted } from "vue"
import { googleOneTap } from "vue3-google-login"

onMounted(() => {
  googleOneTap({ autoLogin: true })
    .then((response) => {
      // This promise is resolved when user selects an account from the the One Tap prompt
      console.log("Handle the response", response)
    })
    .catch((error) => {
      console.log("Handle the error", error)
    })
})
</script>

<template>
  <div>One-Tap prompt will be shown once this component is mounted</div>
</template>
```

Here is an image showing how the Google One Tap prompt automatically detects the logged-in Google account and logs in without user interaction:

<p align="center">
  <img 
    src="https://devbaji.github.io/vue3-google-login/images/auto-login.gif"
    alt="Automatic Google Login Demo - Vue 3 Google Login"
    width="250"
  >
</p>

## Get User Data

In the triggered callback after login you will get a JWT credential string which can be decoded using decodeCredential function to retrive users basic data

```vue
<script setup>
import { decodeCredential } from 'vue3-google-login'
const callback = (response) => {
  // decodeCredential will retrive the JWT payload from the credential
  const userData = decodeCredential(response.credential)
  console.log("Handle the userData", userData)
}
</script>

<template>
  <GoogleLogin :callback="callback" prompt auto-login/>
</template>
```

> :exclamation: You cannot use decodeCredential function to retrive user data when you are using a [Custom Login Button](./custom-button), because it doesn't give a JWT credential, instead it gives an authorization code or access token. [See here for more info](../reference/server-side-validation#combination-of-one-tap-prompt-and-custom-button)

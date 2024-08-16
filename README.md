<h1 align="center">Vue 3 Google Login</h1>
<p align="center">
  <img 
    src="https://devbaji.github.io/vue3-google-login/images/auto-login.gif"
    width="300"
  >
</p>

<p align="center">
  <a href="https://npmcharts.com/compare/vue3-google-login" target="_blank">
    <img src="https://img.shields.io/npm/dw/vue3-google-login.svg" alt="downloads"/>
  </a>&nbsp;
  <a href="https://www.npmjs.com/package/vue3-google-login" target="_blank">
    <img src="https://img.shields.io/npm/v/vue3-google-login.svg" alt="npm"/>
  </a>&nbsp;
  <a href="https://bundlephobia.com/package/vue3-google-login" target="_blank">
    <img src="https://img.shields.io/bundlephobia/minzip/vue3-google-login" alt="bundlephobia"/>
  </a>&nbsp;
</p>

<p align="center">
  <a href="https://www.buymeacoffee.com/developerbaji" target="_blank"><img src="https://img.shields.io/badge/Buy%20Me%20a%20Coffee-ffdd00?style=for-the-badge&logo=buy-me-a-coffee&logoColor=black" alt="Buy Me A Coffee"></a>
  <a href="https://paypal.me/devbaji" target="_blank"><img src="https://img.shields.io/badge/PayPal-00457C?style=for-the-badge&logo=paypal&logoColor=white" alt="Paypal" ></a>
</p>

## Overview

This is a lightweight plugin to implement log-in and sign-up flows using [Google Identity Services](https://developers.google.com/identity) with the help of [Google 3P Authorization JavaScript Library](https://developers.google.com/identity/oauth2/web/guides/load-3p-authorization-library)

This allows you to implement the following features

- Login with Google button
- Login using One Tap prompt
- Automatic Login without any user interaction
- Login with Google using a custom button



## Documentation

https://devbaji.github.io/vue3-google-login/


## Basic Setup

### Installation

Installation via NPM

```sh
npm install vue3-google-login
```
Installation via Yarn
```sh
yarn add vue3-google-login
```
Installation via CDN

If you prefer to use vue3-google-login via a CDN, you can include the following script in your HTML file:
```html
<script src="https://cdn.jsdelivr.net/npm/vue3-google-login@2.0.31/dist/index.umd.min.js"></script>
```

### Initialize the plugin

Initialize the vue3-google-login plugin in main.js, this will register a component `GoogleLogin` globally


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

> :bulb: If you dont want to initialize and register `GoogleLogin` component, you can directly import this from `vue3-google-login` package and use the client-id prop, also some functions accepts a clientId option which can be used to avoid initialising the plugin, see [here](https://devbaji.github.io/vue3-google-login/#options) for more info
> 
### GoogleLogin component

Once the plugin is installed you can use the component `GoogleLogin` anywhere in your project, this will render a log in button which opens a popup for Google login

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
<br>

> ### For more advanced usages see the [docs](https://devbaji.github.io/vue3-google-login/)

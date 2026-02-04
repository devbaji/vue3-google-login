<h1 align="center">Vue 3 Google Login - Google Sign In for Vue 3</h1>
<p align="center">
  <img 
    src="https://devbaji.github.io/vue3-google-login/images/auto-login.gif"
    width="300"
    alt="Vue 3 Google Login - Automatic Google Sign In Demo"
  >
</p>

<p align="center">
  <a href="https://npmcharts.com/compare/vue3-google-login" target="_blank">
    <img src="https://img.shields.io/npm/dw/vue3-google-login.svg" alt="npm downloads"/>
  </a>&nbsp;
  <a href="https://www.npmjs.com/package/vue3-google-login" target="_blank">
    <img src="https://img.shields.io/npm/v/vue3-google-login.svg" alt="npm version"/>
  </a>&nbsp;
  <a href="https://bundlephobia.com/package/vue3-google-login" target="_blank">
    <img src="https://img.shields.io/bundlephobia/minzip/vue3-google-login" alt="bundle size"/>
  </a>&nbsp;
</p>

<p align="center">
  <a href="https://www.buymeacoffee.com/developerbaji" target="_blank"><img src="https://img.shields.io/badge/Buy%20Me%20a%20Coffee-ffdd00?style=for-the-badge&logo=buy-me-a-coffee&logoColor=black" alt="Buy Me A Coffee"></a>
  <a href="https://paypal.me/devbaji" target="_blank"><img src="https://img.shields.io/badge/PayPal-00457C?style=for-the-badge&logo=paypal&logoColor=white" alt="Paypal" ></a>
</p>

## Overview

**vue3-google-login** is a lightweight, easy-to-use Vue 3 plugin for implementing Google Sign In and authentication in your Vue 3 applications. This package provides seamless integration with [Google Identity Services](https://developers.google.com/identity) and the [Google 3P Authorization JavaScript Library](https://developers.google.com/identity/oauth2/web/guides/load-3p-authorization-library), enabling you to add Google OAuth2 login functionality to your Vue 3 projects with minimal setup.

Perfect for Vue 3 developers looking for a simple solution to add Google login, Google signin, or Google OAuth2 authentication to their applications. Supports TypeScript and works with Vue 3.0.3+.

### Features

- **Login with Google button** - Pre-styled Google sign-in button component
- **One Tap prompt** - Quick Google account selection for faster login
- **Automatic Login** - Seamless authentication without user interaction
- **Custom Login Button** - Use your own button design with Google authentication
- **TypeScript Support** - Full TypeScript definitions included
- **Lightweight** - Minimal bundle size, maximum performance



## Documentation

📚 **Full documentation available at:** https://devbaji.github.io/vue3-google-login/

## Quick Start - Vue 3 Google Login Setup

### Installation

Install the vue3-google-login package using your preferred package manager:

**NPM:**
```sh
npm install vue3-google-login
```

**Yarn:**
```sh
yarn add vue3-google-login
```

**CDN:**
If you prefer to use vue3-google-login via a CDN, you can include the following script in your HTML file:
```html
<script src="https://cdn.jsdelivr.net/npm/vue3-google-login@2.0.36/dist/index.umd.min.js"></script>
```

### Initialize the Plugin

Initialize the vue3-google-login plugin in your `main.js` or `main.ts` file. This will register the `GoogleLogin` component globally and configure Google OAuth2 authentication:


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

> 💡 **Tip:** If you don't want to initialize and register the `GoogleLogin` component globally, you can directly import it from `vue3-google-login` package and use the `client-id` prop. Some functions also accept a `clientId` option to avoid initializing the plugin. See the [full documentation](https://devbaji.github.io/vue3-google-login/#options) for more details.

### Using the GoogleLogin Component

Once the plugin is installed and initialized, you can use the `GoogleLogin` component anywhere in your Vue 3 application. This component renders a Google sign-in button that opens a popup for Google authentication:

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

## Additional Features

This Vue 3 Google Login plugin supports many advanced features:

- **One Tap Login** - Show Google One Tap prompt for faster authentication
- **Automatic Sign In** - Auto-login users with a single Google account
- **Custom Buttons** - Create your own Google login button design
- **OAuth2 Support** - Full support for OAuth2 authorization code and access token flows
- **Server-side Validation** - Complete examples for validating credentials on your backend
- **Nuxt 3 Support** - Works seamlessly with Nuxt 3 applications
- **TypeScript** - Full TypeScript support with type definitions

> 📖 **For complete documentation, examples, and advanced usage, visit:** [https://devbaji.github.io/vue3-google-login/](https://devbaji.github.io/vue3-google-login/)

## Why Choose vue3-google-login?

- ✅ **Vue 3 Native** - Built specifically for Vue 3 with Composition API support
- ✅ **Lightweight** - Minimal bundle size, no unnecessary dependencies
- ✅ **Easy Integration** - Simple setup, works out of the box
- ✅ **TypeScript Ready** - Full TypeScript support included
- ✅ **Flexible** - Support for custom buttons, One Tap, and automatic login
- ✅ **Well Maintained** - Active development and community support

# How to use

This plugin helps you to add Sign In With Google feature to your Vue 3 application
<p>
  <a href="https://npm-stat.com/charts.html?package=vue3-google-login"><img src="https://img.shields.io/npm/dm/vue3-google-login.svg" alt="npm"/></a>&nbsp;
  <a href="https://www.npmjs.com/package/vue3-google-login"><img src="https://img.shields.io/npm/v/vue3-google-login.svg" alt="npm"/></a>
</p>

## Overview

This is a lightweigh plugin for implementing sign-in and sign-up flows using <a href="https://developers.google.com/identity/oauth2/web" target="_blank"> Google Identity Services</a> with the help of <a href="https://developers.google.com/identity/oauth2/web/guides/load-3p-authorization-library" target="_blank">Google 3P Authorization JavaScript Library</a>

This allows you to implement the following features

- Sign in with Google button
- Sign in using One Tap prompt
- Sign in with Google using a custom button

## Prerequisites

- This plugin needs vue version 3.0.3 or above to work properly
- To enable Sign In With Google on your website, you first need to set up your Google API client ID. To do so, <a href="https://developers.google.com/identity/gsi/web/guides/get-google-api-clientid" target="_blank">follow these steps</a>

## Basic Setup

### Installation

First step is to install it using `npm`

```bash
npm install vue3-google-login
```

### Initialize the plugin

Initialize the vue3-google-login plugin in main.js

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

### GoogleLogin component

Once the plugin is installed you can use the component `GoogleLogin` anywhere in your project, this will render a sign in button which opens a popup for google login

```vue
<script setup>
const callback = (response) => {
  /* This callback will be triggered when user selects or login to
     his google account from the popup */
  console.log("Server call to handle the response", response)
}
</script>

<template>
  <GoogleLogin client-id="YOUR_GOOGLE_CLIENT_ID" :callback="callback"/>
</template>
```
Here is an image showing sign in button rendered by google
<p align="center">
  <img 
    src="/images/google-rendered-button.png"
  >
</p>

>  You can omit `client-id` prop if it is <a href="#initialize-the-plugin">initialized in main.js</a>

### One Tap prompt

For this feature set the prop `prompt` to true, this will open a prompt on page load with the list of logged in google accounts of the user, now user can just tap on these accounts to easily login to our application

```vue
<script setup>
const callback = (response) => {
  // This callback will be triggered when user click on the One Tap prompt
  /* This callback will be also triggered when user click on login button and selects or login to
     his google account from the popup */
  console.log("Server call to handle the response", response)
}
</script>

<template>
  <GoogleLogin client-id="YOUR_GOOGLE_CLIENT_ID" :callback="callback" :prompt="true"/>
</template>
```

Here is an image showing One Tap prompt 
<p align="center">
  <img 
    src="/images/one-tap-prompt.png"
  >
</p>

### Options

These options can be either used at <a href="#initialize-the-plugin">initializing in main.js</a> or as prop values in <a href="#googlelogin-component">GoogleLogin component</a>

| Prop            |   Type   |                                                                                                                                                                                                                        Description |
| --------------- | :------: | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
| clientId        |  String  |                                                                                                                                                                                                               Google API client ID |
| prompt          | Boolean  |                                                                                                                                                                                     Set this to true to display the One Tap prompt |
| callback        | Function |                                                                                                                                     The callback function which will be trigger with a response object once the login is completed |
| idConfiguration |  Object  |     IdConfiguration object for initializing, <a href="https://developers.google.com/identity/gsi/web/reference/js-reference#IdConfiguration" target="_blank"> see list of  fields and descriptions of the IdConfiguration here</a> |
| buttonConfig    |  Object  | Configuration of the login button rendered by google, <a href="https://developers.google.com/identity/gsi/web/reference/js-reference#GsiButtonConfiguration">see list of  fields and descriptions of these configurations here</a> |


## Custom Sign In Button

Some times you may not need the default button rendered by google, you can create your own button and can make it behave like a login with Google button

Here is an image showing how a custom button opens the Google login popup 
<p align="center">
  <img 
    width="300"
    src="/images/custom-login-button.gif"
  >
</p>
This can be done in two ways

### Custom button inside <a href="#googlelogin-component">GoogleLogin component</a>

Create your own button component and wrap it around <a href="#googlelogin-component">GoogleLogin component</a>

```vue
<script setup>
const callback = (response) => {
  console.log("Server call to handle the response", response)
}
</script>

<template>
  <GoogleLogin :idConfiguration="{ cancel_on_tap_outside: true }" :callback="callback">
    <button>Login Using Google</button>
  </GoogleLogin>
</template>
```

### Using `gLoginPopup` function

You can use `gLoginPopup` function to dynamically trigger the opening of login popup, also you can use `useLibraryLoaded`  composable function get a boolean state showing whether the <a href="https://developers.google.com/identity/oauth2/web/guides/load-3p-authorization-library" target="_blank">Google 3P Authorization JavaScript Library</a> is loaded or not

```vue
<script setup>
import { useLibraryLoaded, gLoginPopup } from 'vue3-google-login'

const gLibraryLoaded = useLibraryLoaded()

const callback = (response) => {
  console.log("Server call to handle the", response)
}

const onButtonClick = () => {
  gLoginPopup({ callback })
}
</script>

<template>
  <button @click="onButtonClick" :disabled="!gLibraryLoaded">Login Using Google</button>
</template>
```
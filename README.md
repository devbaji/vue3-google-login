# Vue 3 Google Login Docs

This plugin helps you to add Login With Google feature to your Vue 3 application

<p>
  <a href="https://npm-stat.com/charts.html?package=vue3-google-login" target="_blank">
    <img src="https://img.shields.io/npm/dm/vue3-google-login.svg" alt="npm"/></a>&nbsp;
  <a href="https://www.npmjs.com/package/vue3-google-login" target="_blank">
    <img src="https://img.shields.io/npm/v/vue3-google-login.svg" alt="npm"/>
  </a>
</p>

<!-- ## Documentation

<a href="https://yobaji.github.io/vue3-google-login/" target="_blank">https://yobaji.github.io/vue3-google-login/</a> -->

## Overview

This is a lightweigh plugin for implementing log-in and sign-up flows using <a href="https://developers.google.com/identity/oauth2/web" target="_blank"> Google Identity Services</a> with the help of <a href="https://developers.google.com/identity/oauth2/web/guides/load-3p-authorization-library" target="_blank">Google 3P Authorization JavaScript Library</a>

This allows you to implement the following features

- Login with Google button
- Login using One Tap prompt
- Automatic Login without any user interaction
- Login with Google using a custom button

## Prerequisites

- This plugin needs vue version 3.0.3 or above to work properly
- To enable Login With Google on your website, you first need to set up your Google API client ID. To do so, <a href="https://developers.google.com/identity/gsi/web/guides/get-google-api-clientid" target="_blank">follow these steps</a>

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

Once the plugin is installed you can use the component `GoogleLogin` anywhere in your project, this will render a log in button which opens a popup for google login

```vue
<script setup>
const callback = (response) => {
  /* This callback will be triggered when user selects or login to
     his google account from the popup */
  console.log("Handle the response", response)
}
</script>

<template>
  <GoogleLogin client-id="YOUR_GOOGLE_CLIENT_ID" :callback="callback"/>
</template>
```

>  :information_source: You can omit `client-id` prop if it is <a href="#user-content-initialize-the-plugin">initialized in main.js</a>

Here is an image showing log in button rendered by google
<p align="center">
  <img 
    src="https://yobaji.github.io/vue3-google-login/images/google-rendered-button.png"
  >
</p>

### One Tap prompt

For this feature set the prop `prompt` to true, this will open a prompt with the list of logged in google accounts of the user, now user can just tap on his prefered account to easily login to our application

```vue
<script setup>
const callback = (response) => {
  // This callback will be triggered when user click on the One Tap prompt
  /* This callback will be also triggered when user click on login button and selects or login to
     his google account from the popup */
  console.log("Handle the response", response)
}
</script>

<template>
  <GoogleLogin :callback="callback" :prompt="true"/>
</template>
```

> :information_source: If the user closes the One Tap prompt manually, the One Tap prompt is suppressed, see <a href="https://developers.google.com/identity/gsi/web/guides/features#exponential_cooldown" target="_blank">here</a> for more info


Here is an image showing One Tap prompt 

<p align="center">
  <img 
    src="https://yobaji.github.io/vue3-google-login/images/one-tap-prompt.gif"
  >
</p>

### Automatic Login
For this feature set the prop `autoLogin` to true, this will automatically detects whether only one google account is logged in, if yes then prompt will automatically log in and will trigger the callback without any user interactions, to make this work `prompt` must be set to true

```vue
<script setup>
const callback = (response) => {
  // This callback will be triggered automatically if only one google account is logged in
  console.log("Handle the response", response)
}
</script>

<template>
  <GoogleLogin :callback="callback" :prompt="true" :autoLogin="true"/>
</template>
```

Here is an image showing the prompt automatically detects the logged in Google account and logs in automatically

<p align="center">
  <img 
    src="https://yobaji.github.io/vue3-google-login/images/auto-login.gif"
  >
</p>

### Options

These options can be either used at <a href="#user-content-initialize-the-plugin">initializing in main.js</a> or as prop values in <a href="#user-content-googlelogin-component">GoogleLogin component</a>

| Prop            |   Type   |                                                                                                                                                                                                                                                                                                                                                               Description |
| --------------- | :------: | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| clientId        |  String  |                                                                                                                                                                                                                                                                                                                                                      Google API client ID |
| prompt          | Boolean  |                                                       Set this to true to display the One Tap prompt<br/><br/>Setting this value as a prop of <a href="#user-content-googlelogin-component">GoogleLogin component</a> will be ignored if this is set as option on <a href="#user-content-initialize-the-plugin">initializing the plugin</a> |
| autoLogin       | Boolean  | Setting this value to true will make the prompt to automatically log in without any user interactions<br/><br/>For this to work `prompt` must be set to true<br/><br/>Setting this value as a prop of <a href="#user-content-googlelogin-component">GoogleLogin component</a> will be ignored if this is set as option on <a href="#user-content-initialize-the-plugin">initializing the plugin</a> |
| callback        | Function |                                                                                                                                                                                                                                                                            The callback function which will be trigger with a response object once the login is completed |
| idConfiguration |  Object  |                                                                                                                                            IdConfiguration object for initializing, <a href="https://developers.google.com/identity/gsi/web/reference/js-reference#IdConfiguration" target="_blank"> see list of  fields and descriptions of the IdConfiguration here</a> |
| buttonConfig    |  Object  |                                                                                                                                        Configuration of the login button rendered by Google, <a href="https://developers.google.com/identity/gsi/web/reference/js-reference#GsiButtonConfiguration" target="_blank">see list of  fields and descriptions of these configurations here</a> |


## Custom Login Button

Some times you may not need the default button rendered by Google, you can create your own button and can make it behave like a login with Google button

Here is an image showing how a custom button opens the Google login popup 
<p align="center">
  <img 
    width="300"
    src="https://yobaji.github.io/vue3-google-login/images/custom-login-button.gif"
  >
</p>
This can be done in two ways


>  :warning: For custom buttons this plugin use `google.accounts.oauth2.initTokenClient` under the hoods which gives an <a href="https://developers.google.com/identity/oauth2/web/guides/use-code-model#auth_code_handling" target="_blank">OAuth2 authorization code</a> in the callback response, but Google rendered login button and One Tap prompt gives a <a href="https://developers.google.com/identity/gsi/web/reference/js-reference#CredentialResponse" target="_blank">CredentialResponse</a> with a JWT credential field, so if you are using a combination of these, validating your callback response on server-side can be a little tricky, this is more explained <a href="#user-content-server-side-validation">here</a>

### Wrap around GoogleLogin

Create your own button component and wrap it around <a href="#user-content-googlelogin-component">GoogleLogin component</a>, default slot content of this component is considered as a custom login button and it will act as a login with Google button 

```vue
<script setup>
const callback = (response) => {
  console.log("Handle the response", response)
}
</script>

<template>
  <GoogleLogin :callback="callback">
    <button>Login Using Google</button>
  </GoogleLogin>
</template>
```

### gLoginPopup function

You can use `gLoginPopup` function to dynamically trigger the opening of login popup, also you can use `useLibraryLoaded`  composable function get a boolean state showing whether the <a href="https://developers.google.com/identity/oauth2/web/guides/load-3p-authorization-library" target="_blank">Google 3P Authorization JavaScript Library</a> is loaded or not

```vue
<script setup>
import { useLibraryLoaded, gLoginPopup } from 'vue3-google-login'

const gLibraryLoaded = useLibraryLoaded()

const callback = (response) => {
  console.log("Handle the response", response)
}

const onButtonClick = () => {
  gLoginPopup({ callback })
}
</script>

<template>
  <button @click="onButtonClick" :disabled="!gLibraryLoaded">Login Using Google</button>
</template>
```

### Sign-In JavaScript API

Once the <a href="https://developers.google.com/identity/oauth2/web/guides/load-3p-authorization-library" target="_blank">Google 3P Authorization JavaScript Library</a> is loaded, Sign-In JavaScript API will be available in window scope and it can be accessed using `window.google`, see <a href="https://developers.google.com/identity/gsi/web/reference/js-reference" target="_blank">Sign-In JavaScript API</a> and <a href="https://developers.google.com/identity/oauth2/web/guides/use-token-model" target="_blank">Token model</a> for more info on Sign-In JavaScript API

Here is how we can use this Sign-In JavaScript API to create a custom login button

```vue
<script setup>
import { useLibraryLoaded } from 'vue3-google-login'

const gLibraryLoaded = useLibraryLoaded()

const callback = (response) => {
  console.log("Handle the response", response)
}

const onButtonClick = () => {
  if (gLibraryLoaded) {
    window.google.accounts.oauth2.initTokenClient({
      client_id: 'YOUR_GOOGLE_CLIENT_ID',
      scope: 'email profile',
      callback
    }).requestAccessToken();
  }
}
</script>

<template>
  <button @click="onButtonClick" :disabled="!gLibraryLoaded">Login Using Google</button>
</template>
```

## Server-side Validation

Once the callback is triggered you need to validate the callback response using your Server-side endpoints, but this is done differently for the callback triggered by Google rendered login button/One Tap prompts and callback triggered by Custom Login Button

### Google rendered login button/One Tap prompts

Callback will be triggered with a <a href="https://developers.google.com/identity/gsi/web/reference/js-reference#CredentialResponse" target="_blank">CredentialResponse</a> with a JWT credential string

Here is a sample Node.js code snippet for validating the JWT credential string

```javascript
const { OAuth2Client } = require('google-auth-library')
const client = new OAuth2Client("YOUR_GOOGLE_CLIENT_ID");

// Call this function to validate the JWT credential sent from client-side
async function verifyCredentials(credential) {
  const ticket = await client.verifyIdToken({
    idToken: credential,
  });
  const payload = ticket.getPayload();
  return payload
}

verifyCredentials('JWT_CREDENTIAL_STRING_FROM_CLIENT_SIDE').then((userInfo) => {
  // use userInfo and do your server-side logics here
}).catch((error) => {
  // validation failed and userinfo was not obtained
});
```

### Custom Login Button

Callback will be triggered with a response containing an <a href="https://developers.google.com/identity/oauth2/web/guides/use-code-model#auth_code_handling" target="_blank">OAuth2 authorization code</a>

Here is a sample Node.js code snippet for validating the OAuth2 authorization code

```javascript
const { OAuth2Client } = require('google-auth-library')
const client = new OAuth2Client(
  {
    clientId: 'YOUR_GOOGLE_CLIENT_ID',
    clientSecret: 'YOUR_GOOGLE_CLIENT_SECRET',
    redirectUri: 'YOUR_GOOGLE_REDIRECT_URI'
  }
);

// Call this function to validate OAuth2 authorization code sent from client-side
async function verifyCode(code) {
  let { tokens } = await client.getToken(code)
  client.setCredentials({ access_token: tokens.access_token })
  const userinfo = await client.request({
    url: 'https://www.googleapis.com/oauth2/v3/userinfo'
  });
  return userinfo.data
}

verifyCode('AUTHORIZATION_CODE_FROM_CLIENT_SIDE').then((userInfo) => {
  // use userInfo and do your server-side logics here
}).catch((error) => {
  // validation failed and userinfo was not obtained
});
```

### Combination of One Tap Prompt and Custom Button

If you are using the combination of these like below, then the response caught in callback function can be different based on the user action, you can handle this by making serverside endpoints which accepts both type of responses and in callback function conditionally call these endpoints

```vue
<script setup>
const callback = (response) => {
  if(response.credential) {
    console.log("Call the endpoint which validates JWT credential string");
  } else {
    console.log("Call the endpoint which validates authorization code");
  }
}
</script>

<template>
  <GoogleLogin :callback="callback" :prompt="true" :autoLogin="true">
    <button>Add</button>
  </GoogleLogin>
</template>
```
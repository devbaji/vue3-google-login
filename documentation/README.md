# vue3-google-login

Add Sign In With Google feature to your Vue 3 application
<p>
  <a href="https://npm-stat.com/charts.html?package=vue3-google-login"><img src="https://img.shields.io/npm/dm/vue3-google-login.svg" alt="npm"/></a>&nbsp;
  <a href="https://www.npmjs.com/package/vue3-google-login"><img src="https://img.shields.io/npm/v/vue3-google-login.svg" alt="npm"/></a>
</p>

## Overview

This is a lightweigh plugin for implementing sign-in and sign-up flows using <a href="https://developers.google.com/identity/oauth2/web" target="_blank"> Google Identity Services.</a> This allows us to implement the following features

- Custom sign-in button 
- One tap sign in 
- One tap and Automatic sign in 

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

Install the vue3-google-login plugin in main.js

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

Once the plugin is installed you can use the component `GoogleLogin` anywhere in your project

```vue
<script setup>
const callback = (response) => {
  console.log("Server call to handle the response", response);
}
</script>

<template>
  <GoogleLogin client-id="YOUR_GOOGLE_CLIENT_ID" :callback="callback"/>
</template>
```

>  You can omit `client-id` if it is <a href="#initialize-the-plugin">initialized in main.js</a>

### Options

These options can be either used at <a href="#initialize-the-plugin">initializing in main.js</a> or as prop values in <a href="#googlelogin-component">GoogleLogin component</a>

| Prop            |   Type   |                                                                                                                                                                                                                        Description |
| --------------- | :------: | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
| clientId        |  String  |                                                                                                                                                                                                               Google API client ID |
| prompt          | Boolean  |                                                                                                                                                                                     Set this to true to display the One Tap prompt |
| callback        | Function |                                                                                                                                     The callback function which will be trigger with a response object once the login is completed |
| idConfiguration |  Object  |     IdConfiguration object for initializing, <a href="https://developers.google.com/identity/gsi/web/reference/js-reference#IdConfiguration" target="_blank"> see list of  fields and descriptions of the IdConfiguration here</a> |
| buttonConfig    |  Object  | Configuration of the login button rendered by google, <a href="https://developers.google.com/identity/gsi/web/reference/js-reference#GsiButtonConfiguration">see list of  fields and descriptions of these configurations here</a> |
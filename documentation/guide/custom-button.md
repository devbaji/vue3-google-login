---
title: Custom Login Button
order: 2
---

# Custom Login Button

> :exclamation: For custom buttons this plugin uses `google.accounts.oauth2.initCodeClient` and `google.accounts.oauth2.initTokenClient` under the hood, which gives an [OAuth2 authorization code](https://developers.google.com/identity/oauth2/web/guides/use-code-model#auth_code_handling) and [Access Token](https://developers.google.com/identity/oauth2/web/guides/use-token-model) respectively in the callback response. The Google rendered login button and One Tap prompt give a [CredentialResponse](https://developers.google.com/identity/gsi/web/reference/js-reference#CredentialResponse) with a JWT credential field. If you use a combination of these, validating the callback on the server side can be tricky — [see here for more info](../reference/server-side-validation#combination-of-one-tap-prompt-and-custom-button).

Sometimes you may not need the default button rendered by Google. You can create your own button and make it behave like a login with Google button.

This can be done in three ways:

## Custom Button As Slot

Create your own button component and keep it inside the [GoogleLogin component](./getting-started#using-the-googlelogin-component). The default slot content of the GoogleLogin component is treated as a custom login button and will act as a login with Google button:

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

> :bulb: By default this will give an [Auth code](https://developers.google.com/identity/oauth2/web/guides/use-code-model#auth_code_handling) in the response. You can use the prop `popup-type="TOKEN"` to get an [Access Token](https://developers.google.com/identity/oauth2/web/guides/use-token-model) instead.

## googleAuthCodeLogin Function

You can use `googleAuthCodeLogin` function to dynamically trigger the opening of the login popup. The response will contain an [OAuth2 authorization code](https://developers.google.com/identity/oauth2/web/guides/use-code-model#auth_code_handling):

```vue
<script setup>
import { googleAuthCodeLogin } from "vue3-google-login"
const login = () => {
  googleAuthCodeLogin().then((response) => {
    console.log("Handle the response", response)
  })
}
</script>

<template>
  <button @click="login">Login Using Google</button>
</template>
```

## googleTokenLogin Function

Just like [googleAuthCodeLogin function](#googleauthcodelogin-function), you can use `googleTokenLogin` to trigger the login popup that gives an [Access Token](https://developers.google.com/identity/oauth2/web/guides/use-token-model) instead of an Auth code:

```vue
<script setup>
import { googleTokenLogin } from "vue3-google-login"
const login = () => {
  googleTokenLogin().then((response) => {
    console.log("Handle the response", response)
  })
}
</script>

<template>
  <button @click="login">Login Using Google</button>
</template>
```

Here is an image showing how a custom button opens the Google OAuth2 login popup:
<p align="center">
  <img 
    width="300"
    src="https://vue3-google-login.pages.dev/images/custom-login-button.gif"
    alt="Custom Google Login Button Demo - Vue 3 Google Login"
  >
</p>

## Disabling Until SDK Is Ready

When building a fully custom button it's a good practice to disable it until the Google SDK is fully loaded. You can use the `useGoogleSdk` composable which exposes a reactive `isLoaded` boolean for this purpose:

```vue
<script setup>
import { useGoogleSdk, googleAuthCodeLogin } from "vue3-google-login"

const { isLoaded } = useGoogleSdk()

const login = async () => {
  const response = await googleAuthCodeLogin()
  console.log("Handle the response", response)
}
</script>

<template>
  <button :disabled="!isLoaded" @click="login">
    Sign in with Google
  </button>
</template>
```

> :bulb: `isLoaded` is a Vue computed ref that becomes `true` once the Google Identity Services script is fully loaded and ready. Until then, the button stays disabled, preventing users from clicking before the SDK initializes.

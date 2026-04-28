---
title: Server-side Validation
order: 5
---

# Server-side Validation

Once the callback is triggered you need to validate the callback response using your server-side endpoints. This is done differently depending on whether the callback was triggered by a Google rendered login button/One Tap prompt or a Custom Login Button.

## Google Rendered Button / One Tap

The callback will be triggered with a [CredentialResponse](https://developers.google.com/identity/gsi/web/reference/js-reference#CredentialResponse) containing a JWT credential string.

Here is a sample Node.js code snippet for validating the JWT credential string:

```javascript
const { OAuth2Client } = require('google-auth-library')
const client = new OAuth2Client("YOUR_GOOGLE_CLIENT_ID")

// Call this function to validate the JWT credential sent from client-side
async function verifyCredentials(credential) {
  const ticket = await client.verifyIdToken({
    idToken: credential,
  })
  const payload = ticket.getPayload()
  return payload
}

verifyCredentials('JWT_CREDENTIAL_STRING_FROM_CLIENT_SIDE').then((userInfo) => {
  // use userInfo and do your server-side logics here
}).catch((error) => {
  // validation failed and userinfo was not obtained
})
```

## Custom Login Button

### Validating Auth Code

If you are using the [googleAuthCodeLogin function](../guide/custom-button#googleauthcodelogin-function) or [google.accounts.oauth2.initCodeClient](https://developers.google.com/identity/oauth2/web/reference/js-reference#google.accounts.oauth2.initCodeClient), the response on successful login contains an [OAuth2 authorization code](https://developers.google.com/identity/oauth2/web/guides/use-code-model#auth_code_handling).

Here is a sample Node.js code snippet for validating this OAuth2 authorization code:

```javascript
const { OAuth2Client } = require('google-auth-library')
const client = new OAuth2Client(
  {
    clientId: 'YOUR_GOOGLE_CLIENT_ID',
    clientSecret: 'YOUR_GOOGLE_CLIENT_SECRET',
    redirectUri: 'YOUR_GOOGLE_REDIRECT_URI'
  }
)

// Call this function to validate OAuth2 authorization code sent from client-side
async function verifyCode(code) {
  let { tokens } = await client.getToken(code)
  client.setCredentials({ access_token: tokens.access_token })
  const userinfo = await client.request({
    url: 'https://www.googleapis.com/oauth2/v3/userinfo'
  })
  return userinfo.data
}

verifyCode('AUTHORIZATION_CODE_FROM_CLIENT_SIDE').then((userInfo) => {
  // use userInfo and do your server-side logics here
}).catch((error) => {
  // validation failed and userinfo was not obtained
})
```

### Validating Access Token

If you are using the [googleTokenLogin function](../guide/custom-button#googletokenlogin-function) or [google.accounts.oauth2.initTokenClient](https://developers.google.com/identity/oauth2/web/reference/js-reference#google.accounts.oauth2.initTokenClient), the response on successful login contains an [Access Token](https://developers.google.com/identity/oauth2/web/guides/use-token-model).

Here is a sample Node.js code snippet for validating this Access Token:

```javascript
const { OAuth2Client } = require("google-auth-library")
const client = new OAuth2Client()

// Call this function to validate OAuth2 access token sent from client-side
async function verifyToken(token) {
  client.setCredentials({ access_token: token })
  const userinfo = await client.request({
    url: "https://www.googleapis.com/oauth2/v3/userinfo",
  });
  return userinfo.data
}

verifyToken("ACCESS_TOKEN_FROM_CLIENT_SIDE")
  .then((userInfo) => {
    console.log(userInfo)
  })
  .catch((error) => {
    console.log(error)
  })
```

## Combination of One Tap Prompt and Custom Button

If you are using a combination of both, the response caught in the callback function can be different based on the user action. You can handle this by making server-side endpoints that accept both types of responses, and in the callback function conditionally call these endpoints:

```vue
<script setup>
const callback = (response) => {
  if(response.credential) {
    console.log("Call the endpoint which validates JWT credential string")
  } else {
    console.log("Call the endpoint which validates authorization code")
  }
}
</script>

<template>
  <GoogleLogin :callback="callback" prompt auto-login>
    <button>Add</button>
  </GoogleLogin>
</template>
```

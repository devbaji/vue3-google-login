<script setup>
  import { CallbackTypes, GoogleLogin } from "./plugin"
const callback = (response) => {
  // This callback will be triggered automatically 
  // if one single Google account is already logged in
  console.log("Handle the response", response)
}
</script>

<template>
  <GoogleLogin client-id="352931034399-ht1i7mqefgrbsn67a4b1nm991bvat47l.apps.googleusercontent.com" :callback="callback" prompt auto-login>
      <button>Login With Google</button>
    </GoogleLogin>
</template>

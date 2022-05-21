<script setup>
const callback = (response) => {
  // This callback will be triggered automatically 
  // if one single Google account is already logged in
  console.log("Handle the response", response)
}
</script>

<template>
  <GoogleLogin :callback="callback" prompt auto-login>
    <button>Login With Google</button>
  </GoogleLogin>
</template>

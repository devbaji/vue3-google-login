<script setup>
const callback = (response) => {
  console.log("Server call to handle the", response);
}
</script>

<template>
  <GoogleLogin :idConfiguration="{ cancel_on_tap_outside: true }" :prompt="true" :callback="callback">
  </GoogleLogin>
</template>

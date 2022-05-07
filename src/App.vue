<script setup>
const callback = (response) => {
  console.log("Server call to handle the", response);
}
</script>

<template>
  <GoogleLogin :callback="callback"/>
</template>

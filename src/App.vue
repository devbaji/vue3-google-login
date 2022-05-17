<script setup lang="ts">
const callback = (response: any) => {
  console.log(response);
};
</script>

<template>
  <GoogleLogin :callback="callback"/>
</template>

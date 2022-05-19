<script setup lang="ts">
const callback = (response: any) => {
  console.log(response);
};
</script>

<template>
  <GoogleLogin :callback="callback" popup-type="TOKEN">
  <button>Ok</button>
  </GoogleLogin>
</template>

<script setup lang="ts">
import { CallbackTypes } from "./plugin";
const callback: CallbackTypes.CredentialCallback = (response) => {
  // This callback will be triggered when the user selects or login to
  // his Google account from the popup
  console.log("Credential JWT string", response.credential);
};
</script>

<template>
  <GoogleLogin :callback="callback" />
</template>
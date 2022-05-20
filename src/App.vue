<script setup lang="ts">
import { googleTokenLogin } from "./plugin"
const login = async() => {
  const r = await googleTokenLogin()
  console.log(r.access_token);
  
}
const callback = (response: any) => {
  console.log(response);
};
</script>

<template>
  <button @click="login">Ok</button>
</template>

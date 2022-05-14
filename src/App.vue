<script setup lang="ts">
const callback = (response: any) => {
  console.log(response);
};

</script>

<template>
  <GoogleLogin client-id='352931034399-ht1i7mqefgrbsn67a4b1nm991bvat47l.apps.googleusercontent.com' :callback="callback"/>
</template>

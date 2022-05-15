<script setup lang="ts">
import {gLoginPopup} from './plugin'
const callback = (response: any) => {
  console.log(response);
};
gLoginPopup({clientId:'ssd'},'code')
</script>

<template>
  <GoogleLogin client-id='352931034399-ht1i7mqefgrbsn67a4b1nm991bvat47l.apps.googleusercontent.com' :callback="callback"/>
</template>

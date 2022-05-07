<script setup>
import { useLibraryLoaded, gLoginPopup } from './plugin'

const gLibraryLoaded = useLibraryLoaded()

const callback = (response) => {
  console.log("Server call to handle the", response)
}

const onButtonClick = () => {
  gLoginPopup({ callback })
}
</script>

<template>
  <button @click="onButtonClick" :disabled="!gLibraryLoaded">Login Using Google</button>
</template>

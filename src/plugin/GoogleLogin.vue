<script setup>
import { onMounted, useSlots, watch } from 'vue';
import { uuidv4, renderLoginButton, openPopup, mergeWithGlobalOptions } from './utils'
import state from './state';

const slots = useSlots()
const hasSlot = slots.default ? true : false

const props = defineProps({
  clientId: String,
  popupType: {
    validator(value) {
      return ['code', 'token'].includes(value)
    }
  },
  prompt: {
    type: Boolean,
    default: false
  },
  idConfiguration: Object,
  buttonConfig: Object,
  callback: Function
})

const options = mergeWithGlobalOptions(props)

const IdConfiguration = {
  client_id: options.clientId,
  callback: options.callback,
  ...options.idConfiguration
}

const buttonId = `g-btn-${uuidv4()}`
console.log(">>",options);
onMounted(() => {
  if (!window.google) {
    watch(() => state.apiLoaded, (loaded) => {
      loaded && renderLoginButton(window.google, IdConfiguration, buttonId, options.buttonConfig, options.prompt, hasSlot)
    }
    )
  } else {
    renderLoginButton(window.google, IdConfiguration, buttonId, options.buttonConfig, options.prompt, hasSlot)
  }
})
</script>

<template>
  <div class="g-btn-wrapper" :class="[!state.apiLoaded && 'api-loading']" @click="hasSlot && openPopup(options)">
    <span v-if="!hasSlot" :id="buttonId" class="g-btn"></span>
    <slot></slot>
  </div>
</template>

<style scoped>
.g-btn-wrapper {
  display: inline-block;
}

.g-btn-wrapper.api-loading {
  opacity: 0.5;
  pointer-events: none;
}
</style>
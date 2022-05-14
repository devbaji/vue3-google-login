<script setup lang="ts">
import { onMounted, useSlots } from "vue";
import * as types from "./types";
import * as utils from "./utils";
import state from "./state";

const slots = useSlots();
const hasSlot: boolean = slots.default ? true : false;

const props = withDefaults(
  defineProps<{
    clientId?: types.clientId;
    prompt?: boolean;
    autoLogin?: boolean;
    popupType?: types.popupTypes;
    idConfiguration?: types.idConfiguration | null;
    buttonConfig?: types.buttonConfig;
    callback?: types.callback;
  }>(),
  {
    prompt: false,
    autoLogin: false,
    popupType: 'code',
  }
);

const options: types.options = utils.mergeObjects(state, props);

const idConfiguration: types.idConfiguration = {
  client_id: options.clientId || null,
  auto_select: options.autoLogin || false,
  callback: options.callback,
  ...options.idConfiguration,
};

const buttonId: types.buttonId = `g-btn-${utils.uuidv4()}`;

onMounted(() => {
  utils.onMount(idConfiguration, buttonId, options, hasSlot);
});

const popupOptions: types.popupOptions = {
  clientId: options.clientId || null,
  popupType: options.popupType,
  callback: options.callback
};
</script>

<template>
  <div
    class="g-btn-wrapper"
    :class="[!state.apiLoaded && 'api-loading']"
    @click="hasSlot && utils.openPopup(popupOptions)"
  >
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

<script setup lang="ts">
import { onMounted, useSlots } from "vue";
import * as types from "./types";
import * as utils from "./utils";
import state, { libraryState } from "./state";

const slots = useSlots();
const hasSlot: boolean = slots.default ? true : false;

const props = withDefaults(
  defineProps<{
    /**Your Google API client ID, to create one [follow these steps](https://developers.google.com/identity/gsi/web/guides/get-google-api-clientid)*/
    clientId?: types.clientId;
    /** To show the One-tap and Automatic-Login prompt */
    prompt?: boolean;
    /** Boolean value showing whether the  google client library is loaded or not */
    autoLogin?: boolean;
    /** Type of popup, if set to 'code' will give an Auth code in the popup call back and if set to 'token' the popup callback will give as an access token */
    popupType?: types.popupTypes;
    /** IdConfiguration object for initializing, see list of fields and descriptions of the IdConfiguration [here](https://developers.google.com/identity/gsi/web/reference/js-reference#IdConfiguration) */
    idConfiguration?: types.idConfiguration;
    /** Configuration of the login button rendered by Google, see list of fields and descriptions of these configurations [here](https://developers.google.com/identity/gsi/web/reference/js-reference#GsiButtonConfiguration) */
    buttonConfig?: types.buttonConfig;
    /** Callback function to triggered on successfull login */
    callback?: types.callback;
  }>(),
  {
    prompt: false,
    autoLogin: false,
    popupType: "code",
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

const popupOptions: types.loginConfig<types.popupTypeCode> = {
  clientId: options.clientId || null,
  callback: options.callback as types.codeCallback | types.tokenCallback,
};
</script>

<template>
  <div
    class="g-btn-wrapper"
    :class="[!libraryState.apiLoaded && 'api-loading']"
    @click="
      hasSlot &&
        (options.popupType === 'token'
          ? utils.openToken(popupOptions)
          : utils.openCode(popupOptions))
    "
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

<script setup lang="ts">
import { onMounted, useSlots } from "vue";
import * as types from "./types";
import * as utils from "./utils";
import { CredentialCallback } from "./callbackTypes";
import state, { libraryState } from "./state";

const slots = useSlots();
const hasSlot: boolean = slots.default ? true : false;

const props = withDefaults(
  defineProps<{
    /**Your Google API client ID, to create one [follow these steps](https://developers.google.com/identity/gsi/web/guides/get-google-api-clientid)*/
    clientId?: string;
    /** To show the One-tap and Automatic-Login prompt */
    prompt?: boolean;
    /** Boolean value showing whether the  google client library is loaded or not */
    autoLogin?: boolean;
    /** Type of popup, if set to 'code' will give an Auth code in the popup call back and if set to 'token' the popup callback will give as an access token */
    popupType?: "CODE" | "TOKEN";
    /** IdConfiguration object for initializing, see list of fields and descriptions of the IdConfiguration [here](https://developers.google.com/identity/gsi/web/reference/js-reference#IdConfiguration) */
    idConfiguration?: object;
    /** Configuration of the login button rendered by Google, see list of fields and descriptions of these configurations [here](https://developers.google.com/identity/gsi/web/reference/js-reference#GsiButtonConfiguration) */
    buttonConfig?: object;
    /** Callback function to triggered on successfull login */
    callback?: Function;
  }>(),
  {
    prompt: false,
    autoLogin: false,
    popupType: "CODE",
  }
);

const options: types.Options = utils.mergeObjects(state, props);

const idConfiguration: types.IdConfiguration = {
  client_id: options.clientId || null,
  auto_select: options.autoLogin || false,
  callback: options.callback as CredentialCallback,
  ...options.idConfiguration,
};

const buttonId: types.ButtonId = `g-btn-${utils.uuidv4()}`;

const openPopup = (type?: types.PopupTypes) => {
  if (type === "TOKEN") {
    utils.googleTokenLogin(options.clientId).then((response) => {
      options.callback && options.callback(response);
    });
  } else {
    utils.googleAuthCodeLogin(options.clientId).then((response) => {
      options.callback && options.callback(response);
    });
  }
};

onMounted(() => {
  utils.onMount(idConfiguration, buttonId, options, hasSlot);
});
</script>

<template>
  <div
    class="g-btn-wrapper"
    :class="[!libraryState.apiLoaded && 'api-loading']"
    @click="hasSlot && openPopup(options.popupType)"
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

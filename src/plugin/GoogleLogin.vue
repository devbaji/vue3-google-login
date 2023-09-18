<script setup lang="ts">
import { onMounted, ref, useSlots } from "vue";
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
    /** Set this to true if you want the one-tap promt to automatically login */
    autoLogin?: boolean;
    /** Type of popup, if set to 'code' will give an Auth code in the popup call back and if set to 'token' the popup callback will give as an access token */
    popupType?: "CODE" | "TOKEN";
    /** IdConfiguration object for initializing, see list of fields and descriptions of the IdConfiguration [here](https://developers.google.com/identity/gsi/web/reference/js-reference#IdConfiguration) */
    idConfiguration?: object;
    /** Configuration of the login button rendered by Google, see list of fields and descriptions of these configurations [here](https://developers.google.com/identity/gsi/web/reference/js-reference#GsiButtonConfiguration) */
    buttonConfig?: object;
    /** Callback function to triggered on successfull login */
    callback?: Function;
    /** Callback function to triggered on popup returning with invalid response or when the one-tap prompt fails */
    error?: Function;
  }>(),
  {
    prompt: false,
    autoLogin: false,
  }
);

const options: types.Options = utils.mergeObjects(state, props);

const idConfiguration: types.IdConfiguration = {
  client_id: options.clientId || null,
  auto_select: options.autoLogin || false,
  callback: options.callback as CredentialCallback,
  ...options.idConfiguration,
};

const buttonRef = ref<HTMLElement | undefined>();

const openPopup = (type?: types.PopupTypes) => {
  if (type === "TOKEN") {
    utils
      .googleTokenLogin({ clientId: options.clientId })
      .then((response) => {
        options.callback && options.callback(response);
      })
      .catch((error) => {
        options.error && options.error(error);
      });
  } else {
    utils
      .googleAuthCodeLogin({ clientId: options.clientId })
      .then((response) => {
        options.callback && options.callback(response);
      })
      .catch((error) => {
        options.error && options.error(error);
      });
  }
};

onMounted(() => {
  utils.onMount(idConfiguration, buttonRef, options, hasSlot);
  if(props.popupType && !hasSlot) {
    console.warn("Option 'popupType' is ignored since a slot which act as a custom login button was not found!!!")
  }
});
</script>

<template>
  <div
    class="g-btn-wrapper"
    @click="hasSlot && openPopup(options.popupType)"
  >
    <span v-if="!hasSlot" ref="buttonRef" class="g-btn"></span>
    <slot></slot>
  </div>
</template>

<style scoped>
.g-btn-wrapper {
  display: inline-block;
}
</style>

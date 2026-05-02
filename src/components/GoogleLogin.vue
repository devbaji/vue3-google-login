<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import type { PropType } from "vue";
import type * as types from "@/types";
import type { CredentialCallback } from "@/callbackTypes";
import { mergeObjects } from "@/utils/mergeOptions";
import {
  onMount,
  googleAuthCodeLogin,
  googleTokenLogin,
} from "@/google/client";
import state from "@/state";
import config from "@/config";

export default defineComponent({
  name: "GoogleLogin",
  props: {
    /** Your Google API client ID */
    clientId: String as PropType<string | undefined>,
    /** To show the One-tap and Automatic-Login prompt */
    prompt: { type: Boolean, default: false },
    /** Set this to true if you want the one-tap prompt to automatically login */
    autoLogin: { type: Boolean, default: false },
    /** Type of popup: CODE (auth code) or TOKEN (access token) */
    popupType: String as PropType<types.PopupTypes | undefined>,
    /** IdConfiguration for GIS initialize */
    idConfiguration: Object as PropType<Record<string, unknown> | undefined>,
    /** GsiButtonConfiguration for the rendered button */
    buttonConfig: Object as PropType<Record<string, unknown> | undefined>,
    /** Success callback */
    callback: Function as PropType<Function | undefined>,
    /** Error callback */
    error: Function as PropType<Function | undefined>,
  },
  setup(props, { slots }) {
    if (typeof window === "undefined") {
      throw new Error(config.ssrError);
    }

    const hasSlot = Boolean(slots.default);
    const options: types.Options = mergeObjects(state, props);

    const idConfiguration: types.IdConfiguration = {
      client_id: options.clientId || null,
      auto_select: options.autoLogin || false,
      callback: options.callback as CredentialCallback,
      ...(options.idConfiguration &&
      typeof options.idConfiguration === "object"
        ? options.idConfiguration
        : {}),
    };

    const buttonRef = ref<HTMLElement | undefined>();

    const openPopup = (type?: types.PopupTypes) => {
      if (type === "TOKEN") {
        googleTokenLogin({ clientId: options.clientId })
          .then((response) => {
            options.callback && options.callback(response);
          })
          .catch((error) => {
            options.error && options.error(error);
          });
      } else {
        googleAuthCodeLogin({ clientId: options.clientId })
          .then((response) => {
            options.callback && options.callback(response);
          })
          .catch((error) => {
            options.error && options.error(error);
          });
      }
    };

    onMounted(() => {
      onMount(idConfiguration, buttonRef, options, hasSlot);
      if (props.popupType && !hasSlot) {
        console.warn(
          "Option 'popupType' is ignored since a slot which act as a custom login button was not found!!!"
        );
      }
    });

    return {
      buttonRef,
      hasSlot,
      options,
      openPopup,
    };
  },
});
</script>

<template>
  <div class="g-btn-wrapper" @click="hasSlot && openPopup(options.popupType)">
    <span v-if="!hasSlot" ref="buttonRef" class="g-btn"></span>
    <slot></slot>
  </div>
</template>

<style scoped>
.g-btn-wrapper {
  display: inline-block;
}
</style>

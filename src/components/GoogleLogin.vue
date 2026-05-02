<script lang="ts">
import { defineComponent, onMounted, ref, useSlots } from "vue";
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

function buildIdConfiguration(
  options: types.Options
): types.IdConfiguration {
  const idConfiguration: types.IdConfiguration = {
    client_id: options.clientId || null,
    auto_select: options.autoLogin || false,
    callback: options.callback as CredentialCallback,
  };
  if (
    options.idConfiguration &&
    typeof options.idConfiguration === "object"
  ) {
    Object.assign(idConfiguration, options.idConfiguration);
  }
  return idConfiguration;
}

export default defineComponent({
  name: "GoogleLogin",
  props: {
    clientId: String as PropType<string | undefined>,
    prompt: { type: Boolean, default: false },
    autoLogin: { type: Boolean, default: false },
    popupType: String as PropType<types.PopupTypes | undefined>,
    idConfiguration: Object as PropType<Record<string, unknown> | undefined>,
    buttonConfig: Object as PropType<Record<string, unknown> | undefined>,
    callback: Function as PropType<Function | undefined>,
    error: Function as PropType<Function | undefined>,
  },
  setup(props) {
    if (typeof window === "undefined") {
      throw new Error(config.ssrError);
    }

    const slots = useSlots();
    const hasSlot = Boolean(slots.default);
    const options: types.Options = mergeObjects(state, props);

    const idConfiguration = buildIdConfiguration(options);

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

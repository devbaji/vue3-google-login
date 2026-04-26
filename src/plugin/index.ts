import type { App } from "vue";
import type { IdConfiguration, InstallOptions } from "./types";
import * as CallbackTypes from "./callbackTypes";
import {
  loadGApi,
  decodeCredential,
  googleOneTap,
  googleLogout,
  googleTokenLogin,
  googleAuthCodeLogin,
  googleSdkLoaded,
} from "./utils";
import { setState } from "./state";
import { useGoogleSdk } from "./composables";
import GoogleLogin from "./GoogleLogin.vue";

export {
  GoogleLogin,
  CallbackTypes,
  decodeCredential,
  googleOneTap,
  googleLogout,
  googleTokenLogin,
  googleAuthCodeLogin,
  googleSdkLoaded,
  useGoogleSdk,
};

export default {
  install: (app: App, options: InstallOptions) => {
    options && setState(options);
    loadGApi().then(() => {
      if (options.clientId) {
        const idConfiguration: IdConfiguration = {
          client_id: options.clientId,
          auto_select: options.autoLogin === true,
          callback: options.callback,
          use_fedcm_for_prompt: true,
          ...options.idConfiguration,
        };
        window.google.accounts.id.initialize(idConfiguration);
        options.prompt && window.google.accounts.id.prompt();
      }
    }).catch((e) => {
      if (!options.error) {
        throw e;
      }
      options.error(e);
    });
    app.component("GoogleLogin", GoogleLogin);
  },
};

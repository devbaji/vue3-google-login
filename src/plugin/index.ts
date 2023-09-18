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
};

export default {
  install: (app: App, options: InstallOptions) => {
    options && setState(options);
    loadGApi.then(() => {
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
    });
    app.component("GoogleLogin", GoogleLogin);
  },
};

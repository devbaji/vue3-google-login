import { App } from "vue";
import { Options } from "./types";
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
import { setState, libraryState } from "./state";
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
  install: (app: App, options: Options) => {
    options && setState(options);
    loadGApi.then(() => {
      if (options.clientId) {
        const idConfiguration = {
          client_id: options.clientId,
          auto_select: options.autoLogin === true,
          callback: options.callback,
          ...options.idConfiguration,
        };
        window.google.accounts.id.initialize(idConfiguration);
        options.prompt && window.google.accounts.id.prompt();
      }
    });
    app.component("GoogleLogin", GoogleLogin);
  },
};

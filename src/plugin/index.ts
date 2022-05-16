import { App, Ref, ref, watch, Component } from "vue";
import * as types from "./types";
import * as utils from "./utils";
import { setState, libraryState } from "./state";
import GoogleLoginComponent from "./GoogleLogin.vue";

export const googleSdkLoaded = utils.libraryLoaded;

export const googleAuthCodeLogin = utils.openCode;

export const googleTokenLogin = utils.openToken;

export const googleOneTap = utils.prompt;

export const googleLogout = utils.logout;

export const decodeCredential = utils.parseJwt;

export const GoogleLogin: Component = GoogleLoginComponent;

/**
 * A composable function to get a boolean state showing whether the google [client library](https://developers.google.com/identity/gsi/web/guides/client-library) is loaded or not
 * @returns a boolean state which changes to true once google [client library](https://developers.google.com/identity/gsi/web/guides/client-library) is loaded
 */
export const useLibraryLoaded = (): Ref<boolean> => {
  const loaded = ref(false);
  watch(
    () => libraryState.apiLoaded,
    (n) => {
      loaded.value = n;
    }
  );
  return loaded;
};

export default {
  install: (app: App, options: types.options) => {
    options && setState(options);
    utils.loadGApi.then(() => {
      options && utils.initOptions(options);
    });
    app.component("GoogleLogin", GoogleLoginComponent);
  },
};

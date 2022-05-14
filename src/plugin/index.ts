import { App } from "vue";
import * as types from "./types";
import * as utils from "./utils";
import state, { setState } from "./state";
import GoogleLogin from "./GoogleLogin.vue";

export const gLoginPopup = utils.openPopup;

export const decodeCredential = utils.parseJwt;

export default {
  install: (app: App, options: types.options) => {
    options && setState(options);
    utils.loadGApi.then(() => {
      state.apiLoaded = true;
      options && utils.initOptions(options);
    });
    app.component("GoogleLogin", GoogleLogin);
  },
};

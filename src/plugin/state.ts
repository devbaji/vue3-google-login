import { reactive } from "vue";
import type * as types from "./types";
import config from "./config";

const state: types.Options = reactive({
  clientId: null,
  popupType: "CODE",
  prompt: false,
  autoLogin: false,
  idConfiguration: null,
  buttonConfig: config.defaultButtonConfig,
  callback: () => {},
  error: null,
});

export default state;

export const libraryState: types.LibraryState = reactive({
  apiLoaded: false,
  apiLoadIntitited: false,
});

export const setState = (options: types.Options | types.InstallOptions): void => {
  options.clientId && (state.clientId = options.clientId);
  options.popupType && (state.popupType = options.popupType);
  options.prompt != undefined && (state.prompt = options.prompt);
  options.autoLogin != undefined && (state.autoLogin = options.autoLogin);
  options.idConfiguration && (state.idConfiguration = options.idConfiguration);
  options.buttonConfig && (state.buttonConfig = options.buttonConfig);
  options.callback && (state.callback = options.callback);
};

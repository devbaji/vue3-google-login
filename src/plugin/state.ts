import { reactive } from "vue";
import * as types from "./types";
import config from "./config";

const state: types.options = reactive({
  clientId: null,
  popupType: 'code',
  prompt: false,
  autoLogin: false,
  idConfiguration: null,
  buttonConfig: config.defaultButtonConfig,
  callback: () => {},
});

export default state;

export const libraryState: types.libraryState = reactive({
  apiLoaded: false,
  apiLoadIntitited: false
})


export const setState = (options: types.options): void => {
  options.clientId && (state.clientId = options.clientId);
  options.popupType && (state.popupType = options.popupType);
  options.prompt != undefined && (state.prompt = options.prompt);
  options.autoLogin != undefined && (state.autoLogin = options.autoLogin);
  options.idConfiguration && (state.idConfiguration = options.idConfiguration);
  options.buttonConfig && (state.buttonConfig = options.buttonConfig);
  options.callback && (state.callback = options.callback);
};

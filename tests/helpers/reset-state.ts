import state, { libraryState } from "../../src/plugin/state";
import config from "../../src/plugin/config";
import type { Google } from "../../src/plugin/types";

export function resetPluginAndLibraryState(): void {
  libraryState.apiLoaded = false;
  libraryState.apiLoadIntitited = false;

  state.clientId = null;
  state.popupType = "CODE";
  state.prompt = false;
  state.autoLogin = false;
  state.idConfiguration = null;
  Object.assign(state.buttonConfig, config.defaultButtonConfig);
  state.callback = () => {};
  state.error = null;

  delete (window as unknown as { google?: Google }).google;
}

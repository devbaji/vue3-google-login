import state, { libraryState } from "@/state";
import config from "@/config";
import type { Google } from "@/types";

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

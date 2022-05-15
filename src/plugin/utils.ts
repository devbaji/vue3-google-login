import { watch } from "vue";
import config from "./config";
import * as types from "./types";
import state from "./state";

declare global {
  interface Window {
    google: any;
  }
}

export const uuidv4 = (): string => {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

/**
 *  For retriving the JWT payload from the credential
 * @param token JWT credential string
 * @returns Decoded payload from the JWT credential string
 */
export const parseJwt = (token: string) => {
  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map(function (c) {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join("")
    );
    return JSON.parse(jsonPayload);
  } catch (error) {
    throw "JWT provided is invalid";
  }
};

export const loadGApi = new Promise((resolve) => {
  const script = document.createElement("script");
  script.addEventListener("load", () => {
    resolve(true);
  });
  script.src = config.library;
  script.async = true;
  script.defer = true;
  document.head.appendChild(script);
});

export const initOptions = (options: types.options): void => {
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
};

export const mergeObjects = (obj1: any, obj2: any): types.options => {
  const mergedObj = { ...obj1 };
  for (const key in obj2) {
    obj2[key] !== undefined && (mergedObj[key] = obj2[key]);
  }
  return mergedObj;
};

export const renderLoginButton = (
  idConfiguration: types.idConfiguration,
  buttonId: types.buttonId,
  buttonConfig: types.buttonConfig,
  prompt: boolean = false,
  hasSlot: boolean
) => {
  window.google.accounts.id.initialize(idConfiguration);
  !hasSlot &&
    window.google.accounts.id.renderButton(
      document.getElementById(buttonId),
      buttonConfig
    );
  prompt && window.google.accounts.id.prompt();
};

export const onMount = (
  idConfiguration: types.idConfiguration,
  buttonId: types.buttonId,
  options: types.options,
  hasSlot: boolean
): void => {
  if (!idConfiguration?.client_id) {
    throw new Error("A valid Google API client ID must be provided");
  }
  if (!window.google) {
    watch(
      () => state.apiLoaded,
      (loaded) => {
        loaded &&
          renderLoginButton(
            idConfiguration,
            buttonId,
            options.buttonConfig,
            options.prompt,
            hasSlot
          );
      }
    );
  } else {
    renderLoginButton(
      idConfiguration,
      buttonId,
      options.buttonConfig,
      options.prompt,
      hasSlot
    );
  }
};

/**
 * A helper function to trigger login popup using google.accounts.oauth2.initCodeClient and google.accounts.oauth2.initTokenClient functions under the hoods
 * @param options To see available options check [here](https://developers.google.com/identity/oauth2/web/guides/use-code-model)
 * @param popupType Popup reponse type, should be either 'code' or 'token'
 */
export const openPopup: types.openPopup = (
  options: types.popupOptions = {},
  popupType: types.popupTypes = "code"
) => {
  if (!options?.clientId && !state?.clientId) {
    throw new Error("clientId is required");
  }
  if (!window.google) {
    throw new Error(
      "Client library is not loaded, use useLibraryLoaded composible function to check if it is loaded before calling this function"
    );
  }

  if (popupType === "code") {
    return new Promise((resolve) => {
      window.google.accounts.oauth2
        .initCodeClient({
          client_id: options?.clientId || state.clientId,
          scope: "email profile",
          ux_mode: "popup",
          callback: (response: types.codePopupResponse) => {
            options?.callback && options.callback(response);
            resolve(response);
          },
        })
        .requestCode();
    });
  } else {
    return new Promise((resolve) => {
      window.google.accounts.oauth2
        .initTokenClient({
          client_id: options?.clientId || state.clientId,
          scope: "email profile",
          ux_mode: "popup",
          callback: (response: types.tokenPopupResponse) => {
            options?.callback && options.callback(response);
            resolve(response);
          },
        })
        .requestAccessToken();
    });
  }
};

export const prompt = (
  options: types.promptOptions = {}
): Promise<types.credentialPopupResponse> => {
  if (!options?.clientId && !state?.clientId) {
    throw new Error("clientId is required");
  }
  if (!window.google) {
    throw new Error(
      "Client library is not loaded, use useLibraryLoaded composible function to check if it is loaded before calling this function"
    );
  }

  const initOptions: types.idConfiguration = {};
  options.clientId && (initOptions.client_id = options.clientId);
  !options.clientId &&
    state.clientId &&
    (initOptions.client_id = state.clientId);
  options.context && (initOptions.context = options.context);
  options.autoLogin && (initOptions.auto_select = options.autoLogin);
  options.cancelOnTapOutside &&
    (initOptions.cancel_on_tap_outside = options.cancelOnTapOutside);

  return new Promise((resolve, reject) => {
    initOptions.callback = (response) => {
      resolve(response);
    };
    window.google.accounts.id.initialize(initOptions);
    window.google.accounts.id.prompt(
      (notification: types.promptNotification) => {
        options.onNotification && options.onNotification(notification);
        if (notification.isNotDisplayed()) {
          if (notification.getNotDisplayedReason() === "suppressed_by_user") {
            reject(
              `Prompt was suppressed by user'. Refer https://developers.google.com/identity/gsi/web/guides/features#exponential_cooldown for more info`
            );
          } else {
            reject(
              `Prompt was not displayed, reason for not displaying:${notification.getNotDisplayedReason()}, you see more`
            );
          }
        }
        if (notification.isSkippedMoment()) {
          reject(
            `Prompt was skipped, reason for skipping:${notification.getSkippedReason()}, you see more`
          );
        }
      }
    );
  });
};

import { type Ref, watch } from "vue";
import config from "./config";
import type * as types from "./types";
import type * as callbackTypes from "./callbackTypes";
import state, { libraryState } from "./state";

declare global {
  interface Window extends types._Window {}
}

/**
 * For retriving the JWT payload from the credential
 * @param token JWT credential string
 * @returns Decoded payload from the JWT credential string
 */
export const decodeCredential: types.DecodeCredential = (
  token: string
): object => {
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

export const loadGApi = new Promise<types.Google>((resolve) => {
  // To resolve errors in nuxt3
  const isRunningInBrowser = typeof window !== "undefined";

  if (!libraryState.apiLoadIntitited && isRunningInBrowser) {
    const script = document.createElement("script");
    libraryState.apiLoadIntitited = true;
    script.addEventListener("load", () => {
      libraryState.apiLoaded = true;
      resolve(window.google);
    });
    script.src = config.library;
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);
  }
});

export const mergeObjects = (obj1: any, obj2: any): types.Options => {
  const mergedObj = { ...obj1 };
  for (const key in obj2) {
    obj2[key] !== undefined &&
      obj2[key] !== null &&
      (mergedObj[key] = obj2[key]);
  }
  return mergedObj;
};

export const renderLoginButton = (
  idConfiguration: types.IdConfiguration,
  buttonRef: Ref<HTMLElement | undefined>,
  buttonConfig: types.ButtonConfig,
  hasSlot: boolean,
  error: Function | null
) => {
  if (error) {
    const callback = idConfiguration.callback;
    idConfiguration.callback = ((response) => {
      if (!response.credential) {
        error(response);
      } else {
        callback && callback(response);
      }
    }) as callbackTypes.CredentialCallback;
  }
  window.google.accounts.id.initialize(idConfiguration);
  const button = buttonRef.value;
  if (button) {
    !hasSlot && window.google.accounts.id.renderButton(button, buttonConfig);
  }
};

/**
 * A wrapper function which makes sure google Client Library is loaded and then give an access to the SDK api
 * @param action A function to execute some actions only after google Client Library is loaded
 */
export const googleSdkLoaded: types.GoogleSdkLoaded = (action) => {
  if (!libraryState.apiLoadIntitited) {
    loadGApi.then((google) => {
      action(google);
    });
  } else if (!libraryState.apiLoaded) {
    watch(
      () => libraryState.apiLoaded,
      (loaded) => {
        loaded && action(window.google);
      }
    );
  } else {
    action(window.google);
  }
};

export const onMount = (
  idConfiguration: types.IdConfiguration,
  buttonRef: Ref<HTMLElement | undefined>,
  options: types.Options,
  hasSlot: boolean
): void => {
  if (!idConfiguration.client_id) {
    throw new Error(
      "Prop client id required since plugin is not initialized with a client id"
    );
  }
  googleSdkLoaded(() => {
    renderLoginButton(
      idConfiguration,
      buttonRef,
      options.buttonConfig,
      hasSlot,
      options.error
    );
    options.prompt &&
      googleOneTap({
        clientId: options.clientId,
        callback: options.callback as callbackTypes.CredentialCallback,
        error: options.error,
        autoLogin: options.autoLogin
      });
  });
};

/**
 * A helper function to trigger login popup using google.accounts.oauth2.initCodeClient function under the hoods
 * @param options Optionally you can add clientId in this option if not initialized on plugin install
 * @returns A promise which get resolved with an auth code once user login through the popup
 */
export const googleAuthCodeLogin: types.GoogleAuthCodeLogin = (options?) => {
  return new Promise((resolve, reject) => {
    googleSdkLoaded((google) => {
      if ((!options || !options.clientId) && !state.clientId) {
        throw new Error(
          "clientId is required since the plugin is not initialized with a Client Id"
        );
      }
      google.accounts.oauth2
        .initCodeClient({
          client_id: (options && options.clientId) || state.clientId || "",
          scope: config.scopes,
          ux_mode: "popup",
          callback: (response: callbackTypes.CodePopupResponse) => {
            if (response.code) {
              resolve(response);
            } else {
              reject(response);
            }
          },
          error_callback: (response: callbackTypes.ErrorPopupResponse) => {
            reject(response);
          },
        })
        .requestCode();
    });
  });
};

/**
 * A helper function to trigger login popup using google.accounts.oauth2.initTokenClient function under the hoods
 * @param options Optionally you can add clientId in this option if not initialized on plugin install
 * @returns A promise which get resolved with an access token once user login through the popup
 */
export const googleTokenLogin: types.GoogleTokenLogin = (options) => {
  return new Promise((resolve, reject) => {
    googleSdkLoaded((google) => {
      if ((!options || !options.clientId) && !state.clientId) {
        throw new Error(
          "clientId is required since the plugin is not initialized with a Client Id"
        );
      }
      google.accounts.oauth2
        .initTokenClient({
          client_id: (options && options.clientId) || state.clientId || "",
          scope: config.scopes,
          callback: (response: callbackTypes.TokenPopupResponse) => {
            if (response.access_token) {
              resolve(response);
            } else {
              reject(response);
            }
          },
          error_callback: (response) => {
            reject(response);
          },
        })
        .requestAccessToken();
    });
  });
};

const handlePromptError = (options: types.PromptErrorOptions) => {
  const notification = options.notification;
  let errorMessage: string = "";
  if (notification.isNotDisplayed()) {
    if (notification.getNotDisplayedReason() === "suppressed_by_user") {
      errorMessage = `Prompt was suppressed by user'. Refer https://developers.google.com/identity/gsi/web/guides/features#exponential_cooldown for more info`;
    } else {
      errorMessage = `Prompt was not displayed, reason for not displaying: ${notification.getNotDisplayedReason()}`;
    }
  }
  if (notification.isSkippedMoment()) {
    errorMessage = `Prompt was skipped, reason for skipping: ${notification.getSkippedReason()}`;
  }
  
  if (errorMessage.length) {
    if (options.error) {
      options.error(errorMessage);
    } else {
      options.reject(errorMessage);
    }
  }
};

/**
 * A function to open one-tap and automatic log-in prompt
 * @param options Options to customise the behavior of one-tap and automatic log-in prompt
 * @returns A promise which get resolved once user login through the prompt
 */
export const googleOneTap: types.GoogleOneTap = (
  options?: types.OneTapOptions
): Promise<callbackTypes.CredentialPopupResponse> => {
  !options && (options = {});
  if (!options.clientId && !state.clientId) {
    throw new Error("clientId is required");
  }

  const idConfig: types.IdConfiguration = {};
  options.clientId && (idConfig.client_id = options.clientId);
  !options.clientId && state.clientId && (idConfig.client_id = state.clientId);
  options.context && (idConfig.context = options.context);
  options.autoLogin != undefined && (idConfig.auto_select = options.autoLogin);
  options.cancelOnTapOutside != undefined &&
    (idConfig.cancel_on_tap_outside = options.cancelOnTapOutside);

  return new Promise((resolve, reject) => {
    idConfig.callback = (response: callbackTypes.CredentialPopupResponse) => {
      options && options.callback && options.callback(response);
      if (response.credential) {
        resolve(response);
      } else {
        reject(response);
      }
    };
    googleSdkLoaded((google) => {
      google.accounts.id.initialize(idConfig);
      google.accounts.id.prompt((notification: types.PromptNotification) => {
        options &&
          options.onNotification &&
          options.onNotification(notification);
        handlePromptError({
          notification,
          reject,
          error: options && options.error,
        });
      });
    });
  });
};

/**
 * This will make user to login and select account again by disabling auto select
 */
export const googleLogout: types.Logout = (): void => {
  googleSdkLoaded((google) => {
    google.accounts.id.disableAutoSelect();
  });
};

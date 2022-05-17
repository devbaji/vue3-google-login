import { watch } from "vue";
import config from "./config";
import * as types from "./types";
import state, { libraryState } from "./state";

declare global {
  interface Window extends types.Window {}
}

export const uuidv4 = (): string => {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

export const parseJwt: types.parseJWT = (token: string): object => {
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

export const loadGApi = new Promise<types.google>((resolve) => {
  if (!libraryState.apiLoadIntitited) {
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
  const button = document.getElementById(buttonId);
  if (button) {
    !hasSlot && window.google.accounts.id.renderButton(button, buttonConfig);
  }
  prompt && window.google.accounts.id.prompt();
};

export const libraryLoaded: types.libraryLoaded = (action) => {
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
  idConfiguration: types.idConfiguration,
  buttonId: types.buttonId,
  options: types.options,
  hasSlot: boolean
): void => {
  if (!idConfiguration.client_id) {
    throw new Error("A valid Google API client ID must be provided");
  }
  libraryLoaded(() => {
    renderLoginButton(
      idConfiguration,
      buttonId,
      options.buttonConfig,
      options.prompt,
      hasSlot
    );
  });
};

export const openCode: types.openCode = (options = {}) => {
  return new Promise((resolve, reject) => {
    libraryLoaded((google) => {
      if (!options.clientId && !state.clientId) {
        throw new Error(
          "clientId is required since the plugin is not initialized with a Client Id"
        );
      }
      google.accounts.oauth2
        .initCodeClient({
          client_id: options.clientId || state.clientId || "",
          scope: "email profile",
          ux_mode: "popup",
          callback: (response: types.codePopupResponse) => {
            options.callback && options.callback(response);
            if (response.code) {
              resolve(response);
            } else {
              reject(response);
            }
          },
        })
        .requestCode();
    });
  });
};

export const openToken: types.openToken = (options = {}) => {
  return new Promise((resolve, reject) => {
    libraryLoaded((google) => {
      if (!options.clientId && !state.clientId) {
        throw new Error(
          "clientId is required since the plugin is not initialized with a Client Id"
        );
      }
      google.accounts.oauth2
        .initTokenClient({
          client_id: options.clientId || state.clientId || "",
          scope: "email profile",
          callback: (response: types.tokenPopupResponse) => {
            options.callback && options.callback(response);
            if (response.access_token) {
              resolve(response);
            } else {
              reject(response);
            }
          },
        })
        .requestAccessToken();
    });
  });
};

export const prompt: types.prompt = (
  options: types.promptOptions = {}
): Promise<types.credentialPopupResponse> => {
  if (!options.clientId && !state.clientId) {
    throw new Error("clientId is required");
  }

  const initOptions: types.idConfiguration = {};
  options.clientId && (initOptions.client_id = options.clientId);
  !options.clientId &&
    state.clientId &&
    (initOptions.client_id = state.clientId);
  options.context && (initOptions.context = options.context);
  options.autoLogin != undefined &&
    (initOptions.auto_select = options.autoLogin);
  options.cancelOnTapOutside != undefined &&
    (initOptions.cancel_on_tap_outside = options.cancelOnTapOutside);

  return new Promise((resolve, reject) => {
    initOptions.callback = (response) => {
      options.callback && options.callback(response);
      if(response.credential) {
        resolve(response);
      } else {
        reject(response);
      }
    };
    libraryLoaded((google) => {
      google.accounts.id.initialize(initOptions);
      google.accounts.id.prompt((notification: types.promptNotification) => {
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
            `Prompt was skipped, reason for skipping: ${notification.getSkippedReason()}, you see more`
          );
        }
      });
    });
  });
};

export const logout: types.logout = (): void => {
  libraryLoaded((google) => {
    google.accounts.id.disableAutoSelect();
  });
};

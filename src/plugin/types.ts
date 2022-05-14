export type popupTypes = "code" | "token"

export type callback = (response: object) => void;

export type buttonConfig = object | null;

export type clientId = string | null;

export interface idConfiguration {
  client_id: clientId;
  auto_select: boolean;
  callback: callback;
}

export interface options {
  /**Your Google API client ID */
  clientId?: clientId;
  prompt?: boolean;
  autoLogin?: boolean;
  apiLoaded: boolean;
  popupType?: popupTypes;
  idConfiguration: idConfiguration | null;
  buttonConfig: buttonConfig;
  callback: callback;
}

export interface popupOptions {
  /**Your Google API client ID */
  clientId: clientId;
  /**Popup reponse type */
  popupType?: popupTypes;
  /**Callback to be triggered on user selects accopunt from popup */
  callback?: callback;
}

export type buttonId = string;

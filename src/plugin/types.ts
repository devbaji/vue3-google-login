export type popupTypeCode = "code";
export type popupTypeToken = "token";

export type popupTypes = popupTypeCode | popupTypeToken;

export type callback = (response: credentialPopupResponse) => void;
export type tokenCallback = (response: tokenPopupResponse) => void;
export type codeCallback = (response: codePopupResponse) => void;

export interface buttonConfig {
  /** The button [type](https://developers.google.com/identity/gsi/web/reference/js-reference#type): icon, or standard button */
  type?: "standard" | "icon";
  /** The button [theme](https://developers.google.com/identity/gsi/web/reference/js-reference#theme). For example, filled_blue or filled_black */
  theme?: "outline" | "filled_blue" | "filled_black";
  /** The button [size](https://developers.google.com/identity/gsi/web/reference/js-reference#size). For example, small or large */
  size?: "large" | "medium" | "small";
  /** The button [text](https://developers.google.com/identity/gsi/web/reference/js-reference#text). For example, "Sign in with Google" or "Sign up with Google" */
  text?: "signin_with" | "signup_with" | "continue_with" | "signin";
  /**	The button [shape](https://developers.google.com/identity/gsi/web/reference/js-reference#shape). For example, rectangular or circular */
  shape?: "rectangular" | "pill" | "circle" | "square";
  /**	The Google [logo alignment](https://developers.google.com/identity/gsi/web/reference/js-reference#logo_alignment): left or center */
  logo_alignment?: "left" | "center";
  /** The button [width](https://developers.google.com/identity/gsi/web/reference/js-reference#width), in pixels */
  width?: string;
  /** If set, then the button [language](https://developers.google.com/identity/gsi/web/reference/js-reference#locale) is rendered */
  locale?: string;
}

export type clientId = string | null;

export type buttonId = string;

export type context = "signin" | "signup" | "use";

export interface idConfiguration {
  /**Your Google API client ID */
  client_id?: clientId;
  /** Enables automatic selection on Google One Tap */
  auto_select?: boolean;
  /** ID token callback handler */
  callback?: callback;
  /** The Sign In With Google button UX flow */
  ux_mode?: "popup" | "redirect";
  /** The URL of your login endpoint */
  login_uri?: string;
  /** The URL of your password credential handler endpoint */
  native_login_uri?: string;
  /** The JavaScript password credential handler function name */
  native_callback?: (response: { id: string; password: string }) => void;
  /** Controls whether to cancel the prompt if the user clicks outside of the prompt */
  cancel_on_tap_outside?: boolean;
  /** The DOM ID of the One Tap prompt container element */
  prompt_parent_id?: string;
  /** A random string for ID tokens */
  nonce?: string;
  /** The title and words in the One Tap prompt */
  context?: context;
  /** If you need to call One Tap in the parent domain and its subdomains, pass the parent domain to this attribute so that a single shared cookie is used. */
  state_cookie_domain?: string;
  /** The origins that are allowed to embed the intermediate iframe. One Tap will run in the intermediate iframe mode if this attribute presents */
  allowed_parent_origin?: string | string[];
  /**	Overrides the default intermediate iframe behavior when users manually close One Tap */
  intermediate_iframe_close_callback?: () => void;
  /** Enables upgraded One Tap UX on ITP browsers */
  itp_support?: boolean;
  /**
   * If your application knows the Workspace domain the user belongs to,
   * use this to provide a hint to Google. For more information,
   * see the [hd](https://developers.google.com/identity/protocols/oauth2/openid-connect#authenticationuriparameters)
   * field in the OpenID Connect docs.
   */
  hosted_domain?: string;
}

export interface options {
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
  clientId?: clientId;
  /**Callback to be triggered on user selects accopunt from popup */
  callback?: Function;
}

export interface codePopupResponse {
  authuser?: string;
  /** The authorization code of a successful token response */
  code?: string;
  /** Type of prompt presented to the user */
  prompt?: string;
  /**	A space-delimited list of scopes that are approved by the user */
  scope?: string;
}

export interface tokenPopupResponse {
  /** The access token of a successful token response. */
  access_token?: string;
  authuser?: string;
  /** The lifetime in seconds of the access token. */
  expires_in?: string;
  /** Type of prompt presented to the user */
  prompt?: string;
  /** A space-delimited list of scopes that are approved by the user. */
  scope?: string;
  /** The type of the token issued. */
  token_type?: string;
}

export interface credentialPopupResponse {
  clientId?: string;
  /** JWT credential string */
  credential?: string;
  /** This field sets how the credential is selected */
  select_by?:
    | "auto"
    | "user"
    | "user_1tap"
    | "user_2tap"
    | "btn"
    | "btn_confirm"
    | "brn_add_session"
    | "btn_confirm_add_session";
}

type openPopupResponse<T extends popupTypeCode | popupTypeToken> =
  T extends popupTypeCode ? codePopupResponse : tokenPopupResponse;

export interface openPopup {
  <T extends popupTypeCode | popupTypeToken>(
    options?: popupOptions,
    popupType?: T
  ): Promise<openPopupResponse<T>>;
}
export interface promptNotification {
  /** Is this notification for a display moment? */
  isDisplayMoment: () => boolean;
  /** Is this notification for a display moment, and the UI is displayed? */
  isDisplayed: () => boolean;
  /** Is this notification for a display moment, and the UI isn't displayed? */
  isNotDisplayed: () => boolean;
  /** The detailed reason why the UI isn't displayed */
  getNotDisplayedReason: () =>
    | "browser_not_supported"
    | "invalid_client"
    | "missing_client_id"
    | "opt_out_or_no_session"
    | "secure_http_required"
    | "suppressed_by_user"
    | "unregistered_origin"
    | "unknown_reason";
  /** Is this notification for a skipped moment? */
  isSkippedMoment: () => boolean;
  /** The detailed reason for the skipped moment */
  getSkippedReason: () =>
    | "auto_cancel"
    | "user_cancel"
    | "tap_outside"
    | "issuing_failed";
  /** Is this notification for a dismissed moment? */
  isDismissedMoment: () => boolean;
  /** The detailed reason for the dismissal */
  getDismissedReason: () =>
    | "credential_returned"
    | "cancel_called"
    | "flow_restarted";
  /** Return a string for the moment type */
  getMomentType: () => "display" | "skipped" | "dismissed";
}

export type onPromptNotification = (
  promptNotification: promptNotification
) => void;

export interface promptOptions {
  /**Your Google API client ID */
  clientId?: clientId;
  /** The title and words in the One Tap prompt */
  context?: context;
  /** Boolean value showing whether the  google client library is loaded or not */
  autoLogin?: boolean;
  /** Controls whether to cancel the prompt if the user clicks outside of the prompt */
  cancelOnTapOutside?: boolean;
  /** A callback triggered on recieving notifications on the prompt UI status  */
  onNotification?: onPromptNotification;
}
declare const GoogleLogin: import("vue").DefineComponent<__VLS_WithDefaults<__VLS_TypePropsToRuntimeProps<{
    /**Your Google API client ID, to create one [follow these steps](https://developers.google.com/identity/gsi/web/guides/get-google-api-clientid)*/
    clientId?: string | undefined;
    /** To show the One-tap and Automatic-Login prompt */
    prompt?: boolean | undefined;
    /** Boolean value showing whether the  google client library is loaded or not */
    autoLogin?: boolean | undefined;
    /** Type of popup, if set to 'code' will give an Auth code in the popup call back and if set to 'token' the popup callback will give as an access token */
    popupType?: "code" | "token" | undefined;
    /** IdConfiguration object for initializing, see list of fields and descriptions of the IdConfiguration [here](https://developers.google.com/identity/gsi/web/reference/js-reference#IdConfiguration) */
    idConfiguration?: object | undefined;
    /** Configuration of the login button rendered by Google, see list of fields and descriptions of these configurations [here](https://developers.google.com/identity/gsi/web/reference/js-reference#GsiButtonConfiguration) */
    buttonConfig?: object | undefined;
    /** Callback function to triggered on successfull login */
    callback?: Function | undefined;
}>, {
    prompt: boolean;
    autoLogin: boolean;
    popupType: string;
}>, {}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<__VLS_WithDefaults<__VLS_TypePropsToRuntimeProps<{
    /**Your Google API client ID, to create one [follow these steps](https://developers.google.com/identity/gsi/web/guides/get-google-api-clientid)*/
    clientId?: string | undefined;
    /** To show the One-tap and Automatic-Login prompt */
    prompt?: boolean | undefined;
    /** Boolean value showing whether the  google client library is loaded or not */
    autoLogin?: boolean | undefined;
    /** Type of popup, if set to 'code' will give an Auth code in the popup call back and if set to 'token' the popup callback will give as an access token */
    popupType?: "code" | "token" | undefined;
    /** IdConfiguration object for initializing, see list of fields and descriptions of the IdConfiguration [here](https://developers.google.com/identity/gsi/web/reference/js-reference#IdConfiguration) */
    idConfiguration?: object | undefined;
    /** Configuration of the login button rendered by Google, see list of fields and descriptions of these configurations [here](https://developers.google.com/identity/gsi/web/reference/js-reference#GsiButtonConfiguration) */
    buttonConfig?: object | undefined;
    /** Callback function to triggered on successfull login */
    callback?: Function | undefined;
}>, {
    prompt: boolean;
    autoLogin: boolean;
    popupType: string;
}>>>, {
    popupType: "code" | "token";
    prompt: boolean;
    autoLogin: boolean;
}>;
export default GoogleLogin;
declare type __VLS_NonUndefinedable<T> = T extends undefined ? never : T;
declare type __VLS_TypePropsToRuntimeProps<T> = {
    [K in keyof T]-?: {} extends Pick<T, K> ? {
        type: import('vue').PropType<__VLS_NonUndefinedable<T[K]>>;
    } : {
        type: import('vue').PropType<T[K]>;
        required: true;
    };
};
declare type __VLS_WithDefaults<P, D> = {
    [K in keyof Pick<P, keyof P>]: K extends keyof D ? P[K] & {
        default: D[K];
    } : P[K];
};
declare module "@vue/runtime-core" {
  export interface GlobalComponents {
    GoogleLogin: typeof GoogleLogin;
  }
}
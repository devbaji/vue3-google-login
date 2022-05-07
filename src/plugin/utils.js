import config from './config'
import state from './state'

export const loadGApi = new Promise(resolve => {
  const script = document.createElement("script")
  script.addEventListener("load", () => {
    resolve(window.google)
  });
  script.src = config.library
  document.head.appendChild(script)
})

export const uuidv4 = () => {
  return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
    (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
  );
}

export const renderLoginButton = (google, idConfiguration, buttonId, buttonConfig, prompt = false, hasSlot) => {  
  google.accounts.id.initialize(idConfiguration);
  !hasSlot && google.accounts.id.renderButton(
    document.getElementById(buttonId),
    buttonConfig
  );
  prompt && google.accounts.id.prompt();
}

export const openPopup = (props) => {
  const type = props.popupType || 'code'
  if (window.google) {
    if (type === 'code') {
      window.google.accounts.oauth2.initCodeClient({
        client_id: props.clientId || state.clientId,
        scope: 'email profile',
        ux_mode: 'popup',
        ...props
      }).requestCode()
    } else {
      window.google.accounts.oauth2.initTokenClient({
        client_id: props.clientId || state.clientId,
        scope: 'email profile',
        ux_mode: 'popup',
        ...props
      }).requestAccessToken()
    }
  }
}

export const mergeWithGlobalOptions = (props) => {
  const mergedOptions = { ...props }
  props.clientId || (mergedOptions.clientId = state.clientId)
  props.popupType || (mergedOptions.popupType = state.popupType)
  props.prompt || (mergedOptions.prompt = state.prompt)
  props.idConfiguration || (mergedOptions.idConfiguration = state.idConfiguration)
  props.buttonConfig || (mergedOptions.buttonConfig = state.buttonConfig)
  props.callback || (mergedOptions.callback = state.callback)
  return mergedOptions
}

export const initOptions = (options) => {
  if (options.clientId) {
    const idConfiguration = {
      client_id: options.clientId,
      callback: options.callback,
      ...options.idConfiguration
    }
    google.accounts.id.initialize(idConfiguration)
    options.prompt && window.google.accounts.id.prompt()
  }
}
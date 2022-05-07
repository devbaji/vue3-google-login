import { reactive } from 'vue'
import config from './config'

const state = reactive({
  apiLoaded: false,
  clientId: null,
  popupType: 'code',
  prompt: false,
  idConfiguration: null,
  buttonConfig: config.defaultButtonConfig,
  callback: null
})

export default state

export const setState = (options) => {
  options.clientId && (state.clientId = options.clientId)
  options.popupType && (state.popupType = options.popupType)
  options.prompt != undefined && (state.prompt = options.prompt)
  options.idConfiguration && (state.idConfiguration = options.idConfiguration)
  options.buttonConfig && (state.buttonConfig = options.buttonConfig)
  options.callback && (state.callback = options.callback)
}
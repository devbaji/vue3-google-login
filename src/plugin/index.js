import { ref, watch } from 'vue'
import GoogleLogin from './GoogleLogin.vue'
import state, { setState } from './state'
import { loadGApi, initOptions, openPopup } from './utils'

export const gLoginPopup = openPopup

export const useLibraryLoaded = () => {
  const loaded = ref(false)
  watch(() => state.apiLoaded, (n) => {
    loaded.value = n
  })
  return loaded
}

export default {
  install: (app, options) => {
    options && setState(options)
    loadGApi.then(() => {
      state.apiLoaded = true
      options && initOptions(options)
    })
    app.component('GoogleLogin', GoogleLogin)
  }
}
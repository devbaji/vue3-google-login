import { createApp } from 'vue'
import App from './App.vue'
import plugin from './plugin'

const app = createApp(App)

app.use(plugin, {
  clientId: 'YOUR_GOOGLE_CLIENT_ID', 
  prompt:true
})

app.mount('#app')

import { createApp } from 'vue'
import App from './App.vue'

import plugin from "./plugin"

const app = createApp(App)

app.use(plugin,{
  clientId:'352931034399-ht1i7mqefgrbsn67a4b1nm991bvat47l.apps.googleusercontent.com'
})

app.mount("#app");

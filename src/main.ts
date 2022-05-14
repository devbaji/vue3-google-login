import { createApp } from 'vue'
import App from './App.vue'

import plugin from "./plugin"

const app = createApp(App)

app.use(plugin)

app.mount("#app");

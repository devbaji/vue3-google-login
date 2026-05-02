/// <reference types="vite/client" />
import { createApp } from "vue";
import App from "@/App.vue";

import plugin from "@/index";

const app = createApp(App);

app.use(plugin, {
  clientId: import.meta.env.VITE_GOOGLE_CLIENT_ID,
});

app.mount("#app");

import type { ButtonConfig } from "@/types";

const defaultButtonConfig: ButtonConfig = { theme: "outline", size: "large" };
const ssrError = "vue3-google-login cannot be executed on the server side. See here for more info https://vue3-google-login.pages.dev/#no-ssr-support"

export default {
  library: "https://accounts.google.com/gsi/client",
  defaultButtonConfig,
  scopes: "email profile openid",
  ssrError
};

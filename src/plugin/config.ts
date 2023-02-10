import type { ButtonConfig } from "./types";

const defaultButtonConfig: ButtonConfig = { theme: "outline", size: "large" };

export default {
  library: "https://accounts.google.com/gsi/client",
  defaultButtonConfig: defaultButtonConfig,
  scopes: "email profile openid",
};

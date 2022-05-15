import { buttonConfig } from "./types";

const defaultButtonConfig: buttonConfig = { theme: "outline", size: "large" };

export default {
  library: "https://accounts.google.com/gsi/client",
  defaultButtonConfig: defaultButtonConfig,
};

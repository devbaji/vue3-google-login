import { path } from "@vuepress/utils";
import { defineUserConfig } from "vuepress";
import { localTheme } from "./theme";

export default defineUserConfig({
  title: "vue3-google-login",
  base: "/vue3-google-login/",
  head: [["link", { rel: "icon", href: "images/favicon.ico" }]],
  theme: localTheme({
    contributors: false,
    lastUpdated: false,
  }),
});

import { defineUserConfig } from "vuepress";
import { localTheme } from "./theme";

export default defineUserConfig({
  title: "vue3-google-login",
  base: "/vue3-google-login/",
  head: [
    ["link", { rel: "icon", href: "images/favicon.ico" }],
    [
      "meta",
      {
        name: "description",
        content:
          "How to add 'Login With Google' button in your Vue 3 application using the plugin vue3-google-login",
      },
    ],
    [
      "meta",
      {
        name: "robots",
        content:
          "vue 3, vue.js, login with google, login using google, npm, vue3-google-login, vue-google-login, vue-google-oauth2, google identity services",
      },
    ],
    [
      "meta",
      {
        name: "googlebot",
        content:
          "vue 3, vue.js, login with google, login using google, npm, vue3-google-login, vue-google-login, vue-google-oauth2, google identity services",
      },
    ],
    [
      "meta",
      {
        name: "google-site-verification",
        content: "IUHi0oL16YV--ZcBFM5VbJba3XjjLJgR_tvH-afMeyE",
      },
    ],
    [
      "meta",
      {
        name: "viewport",
        content:
          "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0",
      },
    ],
    [
      "script",
      {
        async: true,
        src: "https://www.googletagmanager.com/gtag/js?id=G-90C8T90JGH",
      },
    ],
    [
      "script",
      {},
      `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
      
          gtag('config', 'G-90C8T90JGH');
      `,
    ],
  ],
  theme: localTheme({
    contributors: false,
    lastUpdated: false,
  }),
});

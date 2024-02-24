import { defineUserConfig } from "vuepress";
import { localTheme } from "./theme";
import { copyCodePlugin } from "vuepress-plugin-copy-code2";
import fullTextSearchPlugin from "vuepress-plugin-full-text-search2";

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
          "This is a lightweight Vue 3 plugin to implement log-in and sign-up flows using Google Identity Services with the help of Google 3P Authorization JavaScript Library",
      },
    ],
    [
      "meta",
      {
        name: "robots",
        content:
          "vue 3, vuejs, one tap sign up, automatic sign in, login with google, login using google, one tap sign up and sign in, npm, vue3-google-login, google identity services, gsi, client library, sign in with google, gsi client, example, example code, tutorial, accounts.google.com, javaScript sdk",
      },
    ],
    [
      "meta",
      {
        name: "googlebot",
        content:
          "vue 3, vuejs, one tap sign up, automatic sign in, login with google, login using google, one tap sign up and sign in, npm, vue3-google-login, google identity services, gsi, client library, sign in with google, gsi client, example, example code, tutorial, accounts.google.com, javaScript sdk",
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
  plugins: [
    fullTextSearchPlugin,
    copyCodePlugin({
      pure: true,
    }),
  ],
});

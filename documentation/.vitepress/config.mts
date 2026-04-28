import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'Vue 3 Google Login',
  description: 'A lightweight Vue 3 plugin to implement log-in and sign-up flows using Google Identity Services',
  base: '/vue3-google-login/',

  head: [
    ['link', { rel: 'icon', href: '/vue3-google-login/images/favicon.ico' }],
    ['meta', { name: 'description', content: 'This is a lightweight Vue 3 plugin to implement log-in and sign-up flows using Google Identity Services with the help of Google 3P Authorization JavaScript Library' }],
    ['meta', { name: 'robots', content: 'vue 3, vuejs, one tap sign up, automatic sign in, login with google, login using google, one tap sign up and sign in, npm, vue3-google-login, google identity services, gsi, client library, sign in with google, gsi client, example, example code, tutorial, accounts.google.com, javaScript sdk' }],
    ['meta', { name: 'google-site-verification', content: 'IUHi0oL16YV--ZcBFM5VbJba3XjjLJgR_tvH-afMeyE' }],
    ['meta', { name: 'viewport', content: 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0' }],
    ['script', { async: '', src: 'https://www.googletagmanager.com/gtag/js?id=G-90C8T90JGH' }],
    ['script', {}, `window.dataLayer = window.dataLayer || [];function gtag(){dataLayer.push(arguments);}gtag('js', new Date());gtag('config', 'G-90C8T90JGH');`],
  ],

  themeConfig: {
    search: {
      provider: 'local',
    },

    sidebar: [
      {
        text: 'Guide',
        collapsed: false,
        items: [
          { text: 'Overview', link: '/guide/overview' },
          { text: 'Getting Started', link: '/guide/getting-started' },
          { text: 'Custom Login Button', link: '/guide/custom-button' },
          { text: 'Using Google SDK', link: '/guide/using-google-sdk' },
          { text: 'Nuxt 3 / Nuxt 4', link: '/guide/nuxt' },
          { text: 'No SSR Support', link: '/guide/no-ssr' },
        ],
      },
      {
        text: 'Reference',
        collapsed: false,
        items: [
          { text: 'TypeScript', link: '/reference/typescript' },
          { text: 'Server-side Validation', link: '/reference/server-side-validation' },
          { text: 'Options', link: '/reference/options' },
        ],
      },
    ],

    outline: 2,
    outlineTitle: 'On this page',

    socialLinks: [
      { icon: 'github', link: 'https://github.com/devbaji/vue3-google-login' },
    ],

    footer: {
      message: 'MIT Licensed',
      copyright: 'Copyright © 2022-present <a href="https://devbaji.github.io">Ananthakrishnan Baji</a>',
    },
  },
})

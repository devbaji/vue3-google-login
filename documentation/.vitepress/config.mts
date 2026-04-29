import { defineConfig } from 'vitepress'

export default defineConfig({
  lang: 'en-US',
  title: 'Vue 3 Google Login',
  description: 'Vue 3 Google Login plugin for Google Sign-In, One Tap, and OAuth2 flows. Learn how to integrate Google login in Vue 3 apps with production-ready examples.',
  base: '/vue3-google-login/',
  transformHead: ({ pageData }) => {
    const site = 'https://devbaji.github.io'
    const base = '/vue3-google-login/'
    const relativePath = pageData.relativePath || 'index.md'
    const routePath = relativePath
      .replace(/(^|\/)index\.md$/, '/')
      .replace(/\.md$/, '')
    const normalizedRoute = routePath.startsWith('/') ? routePath : `/${routePath}`
    const canonicalPath =
      normalizedRoute === '/' ? base : `${base}${normalizedRoute.replace(/^\//, '')}`
    const canonicalUrl = `${site}${canonicalPath}`

    return [
      ['link', { rel: 'canonical', href: canonicalUrl }],
      ['meta', { property: 'og:url', content: canonicalUrl }],
    ]
  },

  head: [
    ['link', { rel: 'icon', href: '/vue3-google-login/images/favicon.ico' }],
    ['meta', { name: 'description', content: 'Vue 3 Google Login plugin for integrating Google Sign-In, One Tap, and OAuth2 flows using Google Identity Services in Vue 3 applications.' }],
    ['meta', { name: 'keywords', content: 'vue3 google login, vue 3 google login, integrate google login in vue3, how to integrate google login in vue3, google sign in vue3, google identity services vue' }],
    ['meta', { name: 'robots', content: 'index, follow, max-image-preview:large' }],
    ['meta', { property: 'og:site_name', content: 'Vue3 Google Login' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:title', content: 'Vue3 Google Login - Google Sign-In for Vue 3' }],
    ['meta', { property: 'og:description', content: 'Integrate Google login in Vue 3 with One Tap, Sign-In Button, and OAuth2 flows using this lightweight plugin.' }],
    ['meta', { property: 'og:image', content: 'https://devbaji.github.io/vue3-google-login/images/cover-og.jpg' }],
    ['meta', { property: 'og:image:alt', content: 'Vue3 Google Login documentation cover image' }],
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
    ['meta', { name: 'twitter:title', content: 'Vue3 Google Login - Google Sign-In for Vue 3' }],
    ['meta', { name: 'twitter:description', content: 'Learn how to integrate Google login in Vue 3 apps with One Tap and OAuth2 flows.' }],
    ['meta', { name: 'twitter:image', content: 'https://devbaji.github.io/vue3-google-login/images/cover-og.jpg' }],
    ['meta', { name: 'google-site-verification', content: 'IUHi0oL16YV--ZcBFM5VbJba3XjjLJgR_tvH-afMeyE' }],
    ['meta', { name: 'viewport', content: 'width=device-width, initial-scale=1.0' }],
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

    footer: {
      message: 'MIT Licensed',
      copyright: 'Copyright © 2022-present <a href="https://devbaji.github.io/" target="_blank" rel="noopener noreferrer">Ananthakrishnan Baji</a>',
    },
  },
})

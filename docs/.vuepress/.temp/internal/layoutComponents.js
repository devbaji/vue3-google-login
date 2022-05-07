import { defineAsyncComponent } from 'vue'

export const layoutComponents = {
  "404": defineAsyncComponent(() => import("/home/ananthakrishnan/baji/projects/vue3-google-login/node_modules/@vuepress/theme-default/lib/client/layouts/404.vue")),
  "Layout": defineAsyncComponent(() => import("/home/ananthakrishnan/baji/projects/vue3-google-login/node_modules/@vuepress/theme-default/lib/client/layouts/Layout.vue")),
}

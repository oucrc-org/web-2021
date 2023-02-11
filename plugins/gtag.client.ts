import VueGtag from 'vue-gtag-next'
import { defineNuxtPlugin, useRuntimeConfig } from '#imports'

export default defineNuxtPlugin((nuxtApp) => {
  const runtimeConfig = useRuntimeConfig()
  nuxtApp.vueApp.use(VueGtag, {
    property: {
      id: runtimeConfig.public.GTAG_ID,
    },
  })
})

import VueGtag from 'vue-gtag-next'

export default defineNuxtPlugin((nuxtApp) => {
  const runtimeConfig = useRuntimeConfig()
  nuxtApp.vueApp.use(VueGtag, {
    property: {
      id: runtimeConfig.public.GTAG_ID,
    },
  })
})

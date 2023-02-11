import Particles from 'vue3-particles'
import { defineNuxtPlugin } from '#imports'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(Particles, {})
})

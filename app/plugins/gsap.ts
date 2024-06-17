import { gsap } from 'gsap-trial'
import { ScrollSmoother } from 'gsap-trial/ScrollSmoother'
import { defineNuxtPlugin } from 'nuxt/app'

export default defineNuxtPlugin(() => {
  gsap.registerPlugin(ScrollSmoother)
  gsap.config({ trialWarn: false })
})

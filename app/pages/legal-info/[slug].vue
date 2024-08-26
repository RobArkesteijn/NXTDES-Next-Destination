<template>
  <div>
    Legal Info
  </div>
</template>

<script setup lang="ts">
defineI18nRoute({
  paths: {
    dk: '/juridisk-information/[slug]',
    de: '/rechtliche-informationen/[slug]',
    uk: '/legal-info/[slug]',
    es: '/informacion-legal/[slug]',
    fr: '/infos-legales/[slug]',
    no: '/juridisk-informasjon/[slug]',
    nl: '/juridische-informatie/[slug]',
    pt: '/informacoes-legais/[slug]',
    se: '/juridisk-information/[slug]',
  },
})
</script>

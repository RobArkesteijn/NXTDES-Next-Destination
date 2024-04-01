<template>
  <Html lang="en">
    <Head>
      <Meta name="viewport" content="width=device-width, initial-scale=1" />
      <Meta name="theme-color" content="#233746" />
      <Title>{{ 'NXTDES | Next Destination' }}</Title>
    </Head>
    <Body>
      <DefaultHeader />
      <UMain>
        <slot />
      </UMain>
      <DefaultFooter />
    </Body>
  </Html>
</template>

<script setup lang="ts">
// @TODO: Add after initliazing i18n
// const head = useLocaleHead({
//   addDirAttribute: true,
//   identifierAttribute: 'id',
//   addSeoAttributes: true,
// });
</script>

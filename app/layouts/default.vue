<template>
  <Html lang="en">
    <Head>
      <Meta
        name="viewport"
        content="width=device-width, initial-scale=1"
      />
      <Meta
        name="theme-color"
        content="#233746"
      />
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

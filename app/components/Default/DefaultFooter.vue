<template>
  <UFooter class="footer">
    <template #left>
      <p class="footer__copywright">
        Copyright © 2022-{{ new Date().getFullYear() }} NXTDES -
        <NuxtLink
          class="hover:underline"
          to="https://github.com/RobArkesteijn"
          external
        >
          MIT License
        </NuxtLink>
      </p>
    </template>

    <template #right>
      <UButton
        to="https://www.linkedin.com/in/rob-arkesteijn-394550267/"
        external
        icon="i-mdi-linkedin"
        color="gray"
        variant="ghost"
      />
      <UButton
        to="https://github.com/RobArkesteijn"
        external
        icon="i-mdi-github"
        color="gray"
        variant="ghost"
      />
    </template>
  </UFooter>
</template>

<style scoped lang="postcss">
.footer {
  @apply text-gray-700 dark:text-gray-300 text-sm;
}
</style>

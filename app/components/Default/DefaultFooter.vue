<template>
  <UFooter>
    <template #left>
      <p class="text-gray-700 dark:text-gray-300 text-sm">
        Copyright © 2022-{{ new Date().getFullYear() }} NXTDES -
        <NuxtLink
          class="hover:underline"
          to="https://github.com/RobArkesteijn"
          target="_blank"
        >
          MIT License
        </NuxtLink>
      </p>
    </template>

    <template #right>
      <UButton
        to="https://www.linkedin.com/in/rob-arkesteijn-394550267/"
        target="_blank"
        icon="i-mdi-linkedin"
        color="gray"
        variant="ghost"
      />
      <UButton
        to="https://github.com/RobArkesteijn"
        target="_blank"
        icon="i-mdi-github"
        color="gray"
        variant="ghost"
      />
    </template>
  </UFooter>
</template>

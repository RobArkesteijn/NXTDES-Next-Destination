<template>
  <UFooter class="footer">
    <template #top>
      <UFooterColumns :links="links">
        <template #right>
          <UFormGroup
            name="email"
            label="Subscribe to our newsletter"
            size="lg"
          >
            <UInput
              type="email"
              :ui="{ icon: { trailing: { pointer: '' } } }"
            >
              <template #trailing>
                <UButton
                  type="submit"
                  size="2xs"
                  color="black"
                  label="Subscribe"
                />
              </template>
            </UInput>
          </UFormGroup>
        </template>
      </UFooterColumns>
    </template>
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

<script setup lang="ts">
const links = [{
  label: 'About us',
  children: [{
    label: 'Frequently Asked Questions',
    to: '/about-us/faq',
  }, {
    label: 'The Story',
    to: '/about-us/the-story',
  }, {
    label: 'The Goal',
    to: '/about-us/the-goal',
  }],
}, {
  label: 'Legal Info',
  children: [{
    label: 'Privacy Statement',
    to: '/legal-info/privacy-statement',
  }, {
    label: 'Terms & Conditions',
    to: '/legal-info/terms-and-conditions',
  }],
}]
</script>

<style scoped lang="postcss">
.footer {
  @apply text-gray-700 dark:text-gray-300 text-sm;
}
</style>

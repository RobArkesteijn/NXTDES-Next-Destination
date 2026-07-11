<script setup lang="ts">
import { strings } from '@/constants/strings'

const links = computed(() => {
  return [{
    label: strings.nav.aboutUs,
    children: [{
      label: strings.nav.faq,
      to: '/faq',
    }, {
      label: strings.nav.theStory,
      to: '/the-story',
    }, {
      label: strings.nav.theGoal,
      to: '/the-goal',
    }],
  }, {
    label: strings.nav.legalInfo,
    children: [{
      label: strings.nav.privacyStatement,
      to: '/privacy-statement',
    }, {
      label: strings.nav.termsAndConditions,
      to: '/terms-and-conditions',
    }],
  }]
})
</script>

<template>
  <UFooter
    class="footer"
  >
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
        <SiteLink
          class="hover:underline"
          to="https://github.com/RobArkesteijn"
          external
        >
          MIT License
        </SiteLink>
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

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

<script setup lang="ts">
const { t } = useI18n()
const i18n = useI18n()

const currentLocale = i18n.locale.value

const links = computed(() => {
  return [{
    label: t('about_us.title'),
    children: [{
      label: t('faq.title'),
      to: `/${currentLocale}/faq`,
    }, {
      label: t('the_story.title'),
      to: `/${currentLocale}/${t('the_story.url')}`,
    }, {
      label: t('the_goal.title'),
      to: `/${currentLocale}/${t('the_goal.url')}`,
    }],
  }, {
    label: t('legal_info.title'),
    children: [{
      label: t('privacy_statement.title'),
      to: `/${currentLocale}/${t('privacy_statement.url')}`,
    }, {
      label: t('terms_and_conditions.title'),
      to: `/${currentLocale}/${t('terms_and_conditions.url')}`,
    }],
  }]
})
</script>

<style scoped lang="postcss">
.footer {
  @apply text-gray-700 dark:text-gray-300 text-sm;
}
</style>

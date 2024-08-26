<script setup lang="ts">
const switchLocalePath = useSwitchLocalePath()
</script>

<template>
  <div
    class="language-switcher"
  >
    <NuxtLink
      v-for="locale in $i18n.locales"
      :key="`locale-${locale.language}`"
      class="language-switcher__locale"
      :class="{ 'language-switcher__locale--active': $i18n.locale === locale.code }"
      :to="switchLocalePath(locale.code)"
    >
      <p class="language-switcher__locale-text">
        {{ locale.code.toUpperCase() }}
      </p>
    </NuxtLink>
  </div>
</template>

<style lang="postcss" scoped>
.language-switcher {
  display: flex;
  border-width: 1px;
  border-style: solid;
  border-radius: 20px;
  margin-bottom: 1.5px;

  @apply border-boston-blue-400;

  &__locale {
    padding-inline: .5rem;
    padding-block: .15rem;

    @apply text-shark-900 dark:text-copper-50 bg-shark-300 dark:bg-shark-700;

    &:first-child {
      border-top-left-radius: 20px;
      border-bottom-left-radius: 20px;
    }

    &:nth-child(2) {
      border-top-right-radius: 20px;
      border-bottom-right-radius: 20px;
    }

    &--active {
      @apply bg-primary-500 dark:bg-boston-blue-400 text-copper-50;
    }
  }

  &__locale-text {
    margin-bottom: -3px;

    @apply font-thermite;
  }
}
</style>

<script setup lang="ts">
import type { AuthorAttributes } from '@/types/Author'

defineI18nRoute({
  paths: {
    uk: '/authors',
    nl: '/auteurs',
  },
})

const route = useRoute()
const { fullPath } = route
const { t, locale } = useI18n()

const { data } = await useAsyncData(fullPath, async () => {
  const { find } = useStrapi()
  const response = await find<AuthorAttributes>('authors', {
    populate: {
      name: '*',
      avatar: '*',
    },
  })
  return response
})

if (!data.value) {
  throw createError({
    statusCode: 500,
    statusMessage: t('error.500.statusMessage'),
    message: t('error.500.message'),
  })
}

const authors = data.value.data

const listItemSchemas = authors.map((author, index) => {
  return {
    '@type': 'ListItem',
    'position': index + 1,
    'name': author.attributes.name,
    'url': `https://nxtdes.eu/${locale.value}/${t('authors.url')}/${author.attributes.name?.split(' ').join('-').toLowerCase()}`,
  }
})

useSchemaOrg({
  '@type': 'ItemList',
  'itemListElement': listItemSchemas,
  'numberOfItems': authors.length,
})
</script>

<template>
  <div class="authors">
    <SectionDivider>
      <ULandingSection
        headline="Authors"
        title="The authors of this site"
        description="Read more about the authors and their works."
        :ui="{
          wrapper: 'bg-boston-blue-100 dark:bg-boston-blue-900',
        }"
      />
    </SectionDivider>
    <ULandingSection
      v-for="(author, index) in authors"
      :key="`author-${author.id}`"
      :title="author.attributes.name ?? undefined"
      :headline="'Founder & Chief Explorer'"
      :description="'Meet Rob Arkesteijn, the visionary behind Next Destination. As the Founder & Chief Explorer, Rob combines a passion for travel with an eye for uncovering the world’s most extraordinary adventures. With countless journeys across continents and a deep love for discovering new cultures, Rob set out to create a platform that not only inspires wanderlust but also makes the process of planning seamless and enjoyable.'"
      :align="index % 2 === 0 ? 'left' : 'right'"
      :links="[
        {
          label: 'Check out author',
          to: `/${locale}/${t('authors.url')}/${author.attributes.name?.split(' ').join('-').toLowerCase()}`,
          color: 'boston-blue',
          trailingIcon: 'i-heroicons-arrow-right',
          size: 'lg',
        },
      ]"
      class="authors__section"
      :ui="{
        wrapper: 'py-8 sm:py-12 ',
        container: 'gap-8 sm:gap-y-8 lg:gap-16',
      }"
    >
      <NuxtImg
        v-if="author.attributes.avatar"
        :src="author.attributes.avatar.data.attributes.url"
        :alt="author.attributes.avatar.data.attributes.alternativeText ?? ''"
        class="authors__image"
      />
    </ULandingSection>
  </div>
</template>

<style scoped lang="postcss">
.authors {
  position: relative;

  &__title {
    font-weight: bold;
    text-align: center;
    padding: 4rem 1rem 2rem;

    @apply text-2xl text-gray-900 dark:text-copper-50;

    @media screen(sm) {
      padding: 6rem 1.5rem 3rem;

      @apply text-4xl;
    }

    @media screen(lg) {
      padding-inline: 2rem;

      @apply text-5xl;
    }
  }

  &__image {
    width: 100%;
    height: 100%;
    min-height: 300px;
    object-fit: cover;
    border-radius: 0.375rem;

    @apply shadow-xl ring-1 ring-shark-300 dark:ring-gray-700;
  }
}
</style>

<script setup lang="ts">
import type { Strapi4ResponseMany } from '@nuxtjs/strapi'
import type { BlogsAttributes } from '@/types/Blogs'

const route = useRoute()
const { fullPath } = route
const { t, locale } = useI18n()
const config = useRuntimeConfig()

const { data } = await useAsyncData(fullPath, async () => {
  const { find } = useStrapi()
  const response = await find<BlogsAttributes>('blogs', {
    populate: {
      author: {
        populate: '*',
      },
      hero_image: {
        populate: '*',
      },
    },
  })
  return response
})

const content = (data.value as Strapi4ResponseMany<BlogsAttributes>).data
const sortedContent = content.sort((a, b) => {
  const dateA = new Date(a.attributes.createdAt)
  const dateB = new Date(b.attributes.createdAt)
  return dateB.getTime() - dateA.getTime()
})

if (!data.value) {
  throw createError({
    statusCode: 500,
    statusMessage: t('error.500.statusMessage'),
    message: t('error.500.message'),
  })
}

defineOgImageComponent('ContentPage')

const listItemSchemas = sortedContent.map((blog, index) => {
  return {
    '@type': 'ListItem',
    'position': index + 1,
    'name': blog.attributes.title,
    'url': `${config.public.i18n.baseUrl}/${locale.value}/${t('blogs.url')}/${blog.attributes.title?.split(' ').join('-').toLowerCase()}`,
  }
})

useSchemaOrg({
  '@type': 'ItemList',
  'itemListElement': listItemSchemas,
  'numberOfItems': sortedContent.length,
})
</script>

<template>
  <UBlogList orientation="horizontal">
    <UBlogPost
      v-for="post in sortedContent"
      :key="`blogPost-${post.id}`"
      :to="`/${$i18n.locale}/blogs/${post.attributes.title?.split(' ').join('-').toLowerCase()}`"
      :ui="{
        wrapper: 'gap-y-0 rounded-lg ring-1 ring-copper-500 dark:ring-copper-300',
        // Error below is a Nuxt UI bug. Remove if this is no longer the case.
        // @ts-ignore
        image: {
          wrapper: 'ring-0',
        },
      }"
    >
      <template #image>
        <SectionDivider
          :side="['bottom']"
          size="sm"
        >
          <NuxtImg
            :src="post.attributes.hero_image?.data.attributes.url"
            :alt="
              post.attributes.hero_image
                ? (post.attributes.hero_image?.data.attributes.alternativeText as string)
                : ''
            "
            class="blogs__main-image"
          />
          <span class="blogs__avatar">
            <NuxtImg
              :src="post.attributes.author.data.attributes.avatar?.data.attributes.url"
              :alt="
                post.attributes.author.data.attributes.avatar
                  ? (post.attributes.author.data.attributes.avatar?.data.attributes.alternativeText as string)
                  : ''
              "
              quality="20"
              width="40px"
              class="blogs__avatar-image"
            />
          </span>
        </SectionDivider>
      </template>
      <template #default>
        <div class="blogs__default">
          <h2
            v-if="post.attributes.title"
            class="blogs__title"
          >
            {{ post.attributes.title }}
          </h2>
          <p
            v-if="post.attributes.date"
            class="blogs__date"
          >
            {{ post.attributes.date }}
          </p>
        </div>
      </template>
    </UBlogPost>
  </UBlogList>
</template>

<style scoped lang="postcss">
.blogs {
  &__main-image {
    object-fit: cover;
    object-position: top;
    width: 100%;
    height: 100%;
    transition-duration: 200ms;

    @apply transform transition-transform group-hover:scale-105;
  }

  &__avatar {
    position: absolute;
    display: flex;
    flex-direction: column;
    align-items: center;
    inset-inline-start: 0;
    inset-block-start: 0;
    padding: 0.5rem;
  }

  &__avatar-image {
    border-radius: 9999px;
    object-fit: cover;
    pointer-events: visible;
    z-index: 1;
    aspect-ratio: 1/1.2;

    @apply ring-1 border-copper-100 border-solid border ring-copper-800 drop-shadow-xl;
  }

  &__default {
    display: flex;
    gap: 20px;
    justify-content: space-between;
    padding: 1rem;
  }

  &__title {
    @apply text-shark-950 dark:text-shark-50;
  }

  &__date {
    @apply text-shark-900 dark:text-shark-100;
  }
}
</style>
